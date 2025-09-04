// pages/api/save-preferences.js
import { getDb } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { preferences } = req.body;
    if (!preferences) {
      return res.status(400).json({ message: 'Preferences are required' });
    }
    const db = await getDb();
    await db.collection('users').insertOne({ preferences });
    res.status(200).json({ message: 'Preferences saved' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}