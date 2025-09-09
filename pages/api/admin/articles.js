// pages/api/admin/articles.js - Manage articles
import clientPromise from '../../../lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get all articles
    try {
      const client = await clientPromise;
      const db = client.db('news');
      
      const articles = await db.collection('articles')
        .find({})
        .sort({ pubDate: -1 })
        .limit(50)
        .toArray();
      
      // Convert ObjectIds to strings
      const serializedArticles = articles.map(article => ({
        ...article,
        _id: article._id.toString(),
        pubDate: article.pubDate ? article.pubDate.toISOString() : null,
        createdAt: article.createdAt ? article.createdAt.toISOString() : null
      }));
      
      res.status(200).json({ articles: serializedArticles });
      
    } catch (error) {
      console.error('Articles API Error:', error);
      res.status(500).json({ 
        message: 'Failed to fetch articles',
        error: error.message 
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
