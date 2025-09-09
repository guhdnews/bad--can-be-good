// lib/newsUtils.js
import Parser from 'rss-parser';
import clientPromise from './mongodb';

const parser = new Parser({
  customFields: {
    item: ['description', 'pubDate', 'link']
  }
});

// Positive news RSS feeds
const RSS_FEEDS = [
  'https://www.goodnewsnetwork.org/feed/',
  'https://www.positive.news/feed/',
  'https://www.happynews.com/rss.xml',
  'https://www.upworthy.com/rss',
  'https://www.optimistdaily.com/feed/'
];

// Keywords that indicate positive news
const POSITIVE_KEYWORDS = [
  'breakthrough', 'success', 'achievement', 'progress', 'innovation',
  'helping', 'rescued', 'donated', 'volunteer', 'community',
  'healing', 'recovery', 'improvement', 'solution', 'hope',
  'celebration', 'milestone', 'triumph', 'inspiration', 'positive'
];

export async function fetchAndParseRSS() {
  const articles = [];
  
  for (const feedUrl of RSS_FEEDS) {
    try {
      console.log(`Fetching from: ${feedUrl}`);
      const feed = await parser.parseURL(feedUrl);
      
      // Get recent articles (last 5 from each feed)
      const recentItems = feed.items.slice(0, 5);
      
      for (const item of recentItems) {
        // Filter for positive content
        const isPositive = POSITIVE_KEYWORDS.some(keyword => 
          item.title?.toLowerCase().includes(keyword) ||
          item.description?.toLowerCase().includes(keyword)
        );
        
        if (isPositive && item.title && item.description) {
          articles.push({
            title: item.title,
            content: cleanDescription(item.description),
            link: item.link || '#',
            pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
            source: extractDomain(feedUrl),
            imageUrl: extractImageFromContent(item.description) || null
          });
        }
      }
    } catch (error) {
      console.error(`Error fetching RSS from ${feedUrl}:`, error.message);
      continue; // Skip failed feeds, continue with others
    }
  }
  
  // Sort by publication date, most recent first
  return articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
}

export async function saveArticlesToDB(articles) {
  try {
    const client = await clientPromise;
    const db = client.db('news');
    const collection = db.collection('articles');
    
    for (const article of articles) {
      // Avoid duplicates by checking title
      const existing = await collection.findOne({ title: article.title });
      if (!existing) {
        await collection.insertOne({
          ...article,
          createdAt: new Date(),
          _id: undefined // Let MongoDB generate the ID
        });
      }
    }
    
    console.log(`Saved ${articles.length} articles to database`);
  } catch (error) {
    console.error('Error saving articles to DB:', error);
    throw error;
  }
}

export async function getArticlesFromDB(limit = 10) {
  try {
    const client = await clientPromise;
    const db = client.db('news');
    const collection = db.collection('articles');
    
    const articles = await collection
      .find({})
      .sort({ pubDate: -1 })
      .limit(limit)
      .toArray();
    
    // Convert MongoDB _id to string
    return articles.map(article => ({
      ...article,
      _id: article._id.toString()
    }));
  } catch (error) {
    console.error('Error fetching articles from DB:', error);
    return [];
  }
}

// Helper functions
function cleanDescription(description) {
  if (!description) return '';
  
  // Remove HTML tags and decode entities
  return description
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim()
    .substring(0, 300) + (description.length > 300 ? '...' : '');
}

function extractDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return 'Unknown Source';
  }
}

function extractImageFromContent(content) {
  if (!content) return null;
  
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = content.match(imgRegex);
  return match ? match[1] : null;
}