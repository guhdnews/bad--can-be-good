// pages/api/fetch-news.js
import { fetchAndParseRSS, saveArticlesToDB } from '../../lib/newsUtils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    console.log('Starting news fetch process...');
    
    // Fetch news from RSS feeds
    const articles = await fetchAndParseRSS();
    console.log(`Fetched ${articles.length} articles`);
    
    if (articles.length > 0) {
      // Save to database
      await saveArticlesToDB(articles);
      res.status(200).json({ 
        message: `Successfully fetched and saved ${articles.length} articles`,
        articles: articles.slice(0, 5) // Return first 5 for preview
      });
    } else {
      res.status(200).json({ 
        message: 'No new positive articles found',
        articles: []
      });
    }
  } catch (error) {
    console.error('Error in fetch-news API:', error);
    res.status(500).json({ 
      message: 'Failed to fetch news',
      error: error.message 
    });
  }
}