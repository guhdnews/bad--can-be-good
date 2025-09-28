// pages/api/send-newsletter.js
import { getDb } from '../../lib/mongodb';
import { sendNewsletter } from '../../lib/sendNewsletter';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const db = await getDb();
    const subscribers = await db.collection('subscribers').find().toArray();
    const articles = await db
      .collection('articles')
      .find({ date: { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) } })
      .limit(3)
      .toArray();
    const quotes = await db.collection('quotes').aggregate([{ $sample: { size: 1 } }]).toArray();
    await sendNewsletter(subscribers, articles, quotes[0]);
    res.status(200).json({ message: 'Newsletter sent' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}