// pages/api/admin/subscribers.js - Manage email subscribers
import clientPromise from '../../../lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('news');
      
      const subscribers = await db.collection('subscribers')
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      
      // Convert ObjectIds to strings and serialize dates
      const serializedSubscribers = subscribers.map(subscriber => ({
        ...subscriber,
        _id: subscriber._id.toString(),
        createdAt: subscriber.createdAt ? subscriber.createdAt.toISOString() : null
      }));
      
      res.status(200).json({ subscribers: serializedSubscribers });
      
    } catch (error) {
      console.error('Subscribers API Error:', error);
      res.status(500).json({ 
        message: 'Failed to fetch subscribers',
        error: error.message 
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
