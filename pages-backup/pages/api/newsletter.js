// pages/api/newsletter.js
import { getDb } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const db = await getDb();
    const articles = await db
      .collection('articles')
      .find({ date: { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) } })
      .limit(3)
      .toArray();
    const quotes = await db.collection('quotes').aggregate([{ $sample: { size: 1 } }]).toArray();
    res.status(200).json({ articles, quote: quotes[0] });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}