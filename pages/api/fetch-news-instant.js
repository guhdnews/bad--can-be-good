// pages/api/fetch-news-instant.js - Instant RSS fetch without cron limitations
import Parser from 'rss-parser';
import clientPromise from '../../lib/mongodb.js';

const parser = new Parser({
  customFields: {
    item: ['description', 'pubDate', 'link', 'enclosure', 'media:content', 'media:thumbnail', 'content:encoded']
  },
  timeout: 10000 // 10 second timeout for instant fetch
});

// Enhanced list with reliable sources known to have images
const RSS_FEEDS = [
  'https://www.goodnewsnetwork.org/feed/',
  'https://www.upworthy.com/rss',
  'https://www.huffpost.com/section/good-news/feed',
  'https://www.positive.news/feed/',
  'https://feeds.feedburner.com/InspireMeToday'
];

const POSITIVE_KEYWORDS = [
  'breakthrough', 'success', 'achievement', 'progress', 'innovation',
  'helping', 'rescued', 'donated', 'volunteer', 'community',
  'healing', 'recovery', 'improvement', 'solution', 'hope',
  'celebration', 'milestone', 'triumph', 'inspiration', 'positive',
  'kindness', 'generous', 'miracle', 'amazing', 'wonderful',
  'heartwarming', 'uplifting', 'joy', 'happiness', 'love'
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    console.log('Starting instant news fetch...');
    const startTime = Date.now();
    
    // Fetch from multiple feeds with higher concurrency
    const feedPromises = RSS_FEEDS.map(async (feedUrl) => {
      try {
        console.log(`Fetching: ${feedUrl}`);
        const feed = await parser.parseURL(feedUrl);
        console.log(`Successfully parsed ${feed.items?.length || 0} items from ${feedUrl}`);
        return { success: true, feedUrl, items: (feed.items || []).slice(0, 5) }; // 5 items per feed
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
          
          // Enhanced positive check
          const content = (item.title + ' ' + item.description).toLowerCase();
          const isPositive = POSITIVE_KEYWORDS.some(keyword => content.includes(keyword));
          
          if (isPositive) {
            const imageUrl = extractImageUrl(item);
            if (imageUrl) {
              console.log(`✓ Found image for "${item.title.substring(0, 50)}...": ${imageUrl}`);
            } else {
              console.log(`✗ No image found for "${item.title.substring(0, 50)}..."`);
            }
            
            const article = {
              title: item.title,
              content: cleanDescription(item.description),
              link: item.link || '#',
              pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
              source: extractDomain(feedUrl),
              imageUrl: imageUrl,
              createdAt: new Date()
            };
            
            articles.push(article);
            console.log(`Added article: ${article.title} ${article.imageUrl ? '(with image)' : '(no image)'}`);
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
          const existing = await collection.findOne({ 
            $or: [
              { title: article.title },
              { link: article.link }
            ]
          });
          if (!existing) {
            uniqueArticles.push(article);
          }
        }
        
        if (uniqueArticles.length > 0) {
          await collection.insertMany(uniqueArticles, { ordered: false });
        }
        
        console.log(`Saved ${uniqueArticles.length} new articles`);
        
        // Return detailed stats
        const totalArticles = await collection.countDocuments({});
        const articlesWithImages = await collection.countDocuments({ imageUrl: { $exists: true, $ne: null } });
        
        res.status(200).json({ 
          message: `Successfully processed ${articles.length} articles, saved ${uniqueArticles.length} new ones`,
          articles: uniqueArticles.slice(0, 10), // Return first 10 for preview
          stats: {
            totalFetched: articles.length,
            newArticles: uniqueArticles.length,
            totalInDatabase: totalArticles,
            articlesWithImages: articlesWithImages,
            imageSuccessRate: totalArticles > 0 ? Math.round((articlesWithImages / totalArticles) * 100) : 0
          },
          executionTime: Date.now() - startTime
        });
        
      } catch (dbError) {
        console.error('Database save error:', dbError);
        res.status(200).json({ 
          message: `Fetched ${articles.length} articles but failed to save to database`,
          articles: articles.slice(0, 10),
          error: dbError.message,
          executionTime: Date.now() - startTime
        });
      }
    } else {
      res.status(200).json({ 
        message: 'No new positive articles found in current fetch',
        executionTime: Date.now() - startTime
      });
    }

  } catch (error) {
    console.error('Instant Fetch API Error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch news instantly',
      error: error.message 
    });
  }
}

// Helper functions (same as before but with better error handling)
function cleanDescription(description) {
  if (!description) return '';
  
  return description
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#\d+;/g, '')
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

function extractImageUrl(item) {
  try {
    // 1. Check for enclosure (common in RSS)
    if (item.enclosure && item.enclosure.url && item.enclosure.type && item.enclosure.type.startsWith('image/')) {
      return validateImageUrl(item.enclosure.url);
    }
    
    // 2. Check for media:content (Media RSS) - handle arrays
    let mediaContent = item['media:content'];
    if (mediaContent) {
      if (Array.isArray(mediaContent)) {
        mediaContent = mediaContent[0];
      }
      if (mediaContent.$ && mediaContent.$.url) {
        if (mediaContent.$.medium === 'image' || (mediaContent.$.type && mediaContent.$.type.startsWith('image/'))) {
          return validateImageUrl(mediaContent.$.url);
        }
      }
    }
    
    // 3. Check for media:thumbnail - handle arrays
    let mediaThumbnail = item['media:thumbnail'];
    if (mediaThumbnail) {
      if (Array.isArray(mediaThumbnail)) {
        mediaThumbnail = mediaThumbnail[0];
      }
      if (mediaThumbnail.$ && mediaThumbnail.$.url) {
        return validateImageUrl(mediaThumbnail.$.url);
      }
    }
    
    // 4. Extract from content:encoded or description HTML
    const content = item['content:encoded'] || item.description || '';
    if (content && typeof content === 'string') {
      // Look for img tags with various quote styles
      const imgPatterns = [
        /<img[^>]+src=[\"']([^\"'>]+)[\"'][^>]*>/i,
        /<img[^>]+src=([^\\s>]+)[^>]*>/i,
        /<img[^>]*src\\s*=\\s*[\"']([^\"'>]+)[\"'][^>]*>/i
      ];
      
      for (const pattern of imgPatterns) {
        const match = content.match(pattern);
        if (match && match[1]) {
          const imageUrl = match[1].replace(/[\"\\']/g, '').trim();
          const validated = validateImageUrl(imageUrl);
          if (validated) return validated;
        }
      }
    }
    
    // 5. Check for featured image in custom fields
    if (item.featuredImage && typeof item.featuredImage === 'string') {
      return validateImageUrl(item.featuredImage);
    }
    
    // 6. Check for thumbnail in custom fields
    if (item.thumbnail && typeof item.thumbnail === 'string') {
      return validateImageUrl(item.thumbnail);
    }
    
  } catch (error) {
    console.log('Error extracting image URL:', error);
  }
  
  return null;
}

function validateImageUrl(url) {
  if (!url || typeof url !== 'string') return null;
  
  // Clean up the URL
  url = url.trim();
  
  // Basic URL validation
  try {
    new URL(url);
  } catch {
    return null;
  }
  
  // Check for common image extensions or patterns
  const imagePatterns = [
    /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i,
    /image/i,
    /photo/i,
    /wp-content\/uploads/i,
    /cdn/i,
    /media/i
  ];
  
  const isValidImage = imagePatterns.some(pattern => pattern.test(url));
  
  // Skip obviously bad URLs
  const badPatterns = [
    /gravatar/i,
    /avatar/i,
    /profile/i,
    /icon/i,
    /button/i,
    /logo/i,
    /badge/i
  ];
  
  const isBadImage = badPatterns.some(pattern => pattern.test(url));
  
  if (isValidImage && !isBadImage) {
    return url;
  }
  
  return null;
}
