// pages/api/user/donations.js - User donation tracking API
import jwt from 'jsonwebtoken';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

let db;

async function getDB() {
  if (!db) {
    db = await open({
      filename: './database.db',
      driver: sqlite3.Database
    });

    // Create donations table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS donations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        amount REAL NOT NULL,
        currency TEXT DEFAULT 'USD',
        paypalTransactionId TEXT,
        status TEXT DEFAULT 'completed',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users (id)
      )
    `);
  }
  return db;
}

// Middleware to verify JWT token
function verifyToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No valid authorization token provided');
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export default async function handler(req, res) {
  try {
    // Verify user authentication
    const decoded = verifyToken(req);
    const database = await getDB();

    if (req.method === 'GET') {
      // Get user's donation history
      const donations = await database.all(
        'SELECT amount, currency, paypalTransactionId, status, createdAt as date FROM donations WHERE userId = ? ORDER BY createdAt DESC',
        [decoded.userId]
      );

      // Get total donations amount
      const totalResult = await database.get(
        'SELECT COALESCE(SUM(amount), 0) as total FROM donations WHERE userId = ? AND status = "completed"',
        [decoded.userId]
      );

      res.status(200).json({
        success: true,
        donations: donations,
        totalDonations: totalResult.total || 0
      });

    } else if (req.method === 'POST') {
      // Record a new donation
      const { amount, currency = 'USD', paypalTransactionId, status = 'completed' } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid donation amount'
        });
      }

      // Insert new donation
      await database.run(
        'INSERT INTO donations (userId, amount, currency, paypalTransactionId, status) VALUES (?, ?, ?, ?, ?)',
        [decoded.userId, amount, currency, paypalTransactionId, status]
      );

      // Update user's total donations
      const totalResult = await database.get(
        'SELECT COALESCE(SUM(amount), 0) as total FROM donations WHERE userId = ? AND status = "completed"',
        [decoded.userId]
      );

      await database.run(
        'UPDATE users SET totalDonations = ? WHERE id = ?',
        [totalResult.total, decoded.userId]
      );

      // Get updated donation history
      const donations = await database.all(
        'SELECT amount, currency, paypalTransactionId, status, createdAt as date FROM donations WHERE userId = ? ORDER BY createdAt DESC',
        [decoded.userId]
      );

      res.status(200).json({
        success: true,
        message: 'Donation recorded successfully',
        donations: donations,
        totalDonations: totalResult.total || 0
      });

    } else {
      res.status(405).json({ success: false, message: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Donations API error:', error);
    if (error.message === 'No valid authorization token provided' || error.message === 'Invalid token') {
      res.status(401).json({ success: false, message: 'Unauthorized' });
    } else {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}
