// pages/api/admin/stats.js - Get website statistics
import clientPromise from '../../../lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('news');
    
    // Get article count
    const articlesCount = await db.collection('articles').countDocuments();
    
    // Get subscriber count
    const subscribersCount = await db.collection('subscribers').countDocuments();
    
    res.status(200).json({
      articlesCount,
      subscribersCount,
      lastUpdated: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Stats API Error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch stats',
      error: error.message 
    });
  }
}
