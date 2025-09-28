// pages/api/cron/fetch-news.js - Automatic news fetching endpoint
import { fetchAndStoreNews } from '../../../lib/rssFetcher.js';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Starting automatic news fetch...');
    await fetchAndStoreNews();
    
    res.status(200).json({ 
      success: true, 
      message: 'News fetched and stored successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Automatic news fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch news', 
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
