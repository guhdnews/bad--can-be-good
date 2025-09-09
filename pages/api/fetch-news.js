// pages/api/fetch-news.js
import Parser from 'rss-parser';
import clientPromise from '../../lib/mongodb';

const parser = new Parser({
  customFields: {
    item: ['description', 'pubDate', 'link']
  },
  timeout: 3000 // 3 second timeout per feed
});

// Reduced to just 2 fastest/most reliable feeds to avoid timeout
const RSS_FEEDS = [
  'https://www.goodnewsnetwork.org/feed/',
  'https://www.upworthy.com/rss'
];

const POSITIVE_KEYWORDS = [
  'breakthrough', 'success', 'achievement', 'progress', 'innovation',
  'helping', 'rescued', 'donated', 'volunteer', 'community',
  'healing', 'recovery', 'improvement', 'solution', 'hope',
  'celebration', 'milestone', 'triumph', 'inspiration', 'positive'
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    console.log('Starting optimized news fetch...');
    const startTime = Date.now();
    
    // Fetch with Promise.allSettled to handle failures gracefully
    const feedPromises = RSS_FEEDS.map(async (feedUrl) => {
      try {
        console.log(`Fetching: ${feedUrl}`);
        const feed = await parser.parseURL(feedUrl);
        return { success: true, feedUrl, items: feed.items.slice(0, 3) }; // Only 3 items per feed
      } catch (error) {
        console.error(`Failed to fetch ${feedUrl}:`, error.message);
        return { success: false, feedUrl, error: error.message };
      }
    });

    const results = await Promise.allSettled(feedPromises);
    const articles = [];

    // Process successful feeds
    for (const result of results) {
      if (result.status === 'fulfilled' && result.value.success) {
        const { items, feedUrl } = result.value;
        
        for (const item of items) {
          if (!item.title || !item.description) continue;
          
          // Quick positive check
          const isPositive = POSITIVE_KEYWORDS.some(keyword => 
            item.title.toLowerCase().includes(keyword) ||
            item.description.toLowerCase().includes(keyword)
          );
          
          if (isPositive) {
            articles.push({
              title: item.title,
              content: cleanDescription(item.description),
              link: item.link || '#',
              pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
              source: extractDomain(feedUrl),
              createdAt: new Date()
            });
          }
        }
      }
    }

    console.log(`Processed ${articles.length} articles in ${Date.now() - startTime}ms`);

    if (articles.length > 0) {
      // Save to database quickly
      try {
        const client = await clientPromise;
        const db = client.db('news');
        const collection = db.collection('articles');
        
        // Use insertMany with ordered: false to continue on duplicates
        const uniqueArticles = [];
        for (const article of articles) {
          const existing = await collection.findOne({ title: article.title });
          if (!existing) {
            uniqueArticles.push(article);
          }
        }
        
        if (uniqueArticles.length > 0) {
          await collection.insertMany(uniqueArticles, { ordered: false });
        }
        
        console.log(`Saved ${uniqueArticles.length} new articles`);
      } catch (dbError) {
        console.error('Database save error:', dbError);
        // Continue anyway, return the articles we fetched
      }
    }

    const totalTime = Date.now() - startTime;
    console.log(`Total execution time: ${totalTime}ms`);

    res.status(200).json({ 
      message: `Successfully processed ${articles.length} articles in ${totalTime}ms`,
      articles: articles.slice(0, 5),
      executionTime: totalTime
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch news',
      error: error.message 
    });
  }
}

// Helper functions
function cleanDescription(description) {
  if (!description) return '';
  
  return description
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim()
    .substring(0, 200) + (description.length > 200 ? '...' : '');
}

function extractDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return 'Unknown Source';
  }
}