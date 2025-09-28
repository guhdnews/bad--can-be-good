// pages/api/subscribe.js
import { getDb } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const db = await getDb();
    await db.collection('subscribers').insertOne({ email });
    res.status(200).json({ message: 'Subscribed successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}