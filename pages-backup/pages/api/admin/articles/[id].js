// pages/api/admin/articles/[id].js - Delete individual article
import { ObjectId } from 'mongodb';
import clientPromise from '../../../../lib/mongodb.js';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const client = await clientPromise;
      const db = client.db('news');
      
      const result = await db.collection('articles').deleteOne({ 
        _id: new ObjectId(id) 
      });
      
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Article deleted successfully' });
      } else {
        res.status(404).json({ message: 'Article not found' });
      }
      
    } catch (error) {
      console.error('Delete Article Error:', error);
      res.status(500).json({ 
        message: 'Failed to delete article',
        error: error.message 
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
