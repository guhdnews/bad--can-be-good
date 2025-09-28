// pages/api/admin/stats-mongo.js - MongoDB-compatible stats for admin dashboard
import clientPromise from '../../../lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('news');
    
    // Get articles count
    const articlesCount = await db.collection('articles').countDocuments();
    
    // Get subscribers count
    const subscribersCount = await db.collection('subscribers').countDocuments();
    
    res.status(200).json({
      articlesCount: articlesCount || 0,
      subscribersCount: subscribersCount || 0,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Stats API Error:', error);
    res.status(500).json({ 
      articlesCount: 0,
      subscribersCount: 0,
      error: error.message 
    });
  }
}
