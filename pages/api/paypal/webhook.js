// pages/api/paypal/webhook.js - PayPal donation webhook handler
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
  }
  return db;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const database = await getDB();
    
    // For demo purposes, we'll handle a simplified donation record
    // In production, you would verify PayPal webhook signature here
    const { 
      paypalTransactionId,
      amount, 
      currency = 'USD',
      userToken,
      donorEmail,
      donorName 
    } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid donation amount'
      });
    }

    let userId = null;

    // If user token is provided, verify it and get user ID
    if (userToken) {
      try {
        const decoded = jwt.verify(userToken, JWT_SECRET);
        userId = decoded.userId;
      } catch (error) {
        console.warn('Invalid user token in donation:', error.message);
      }
    }

    // If no user ID but have donor email, try to find existing user
    if (!userId && donorEmail) {
      const existingUser = await database.get(
        'SELECT id FROM users WHERE email = ?',
        [donorEmail.toLowerCase()]
      );
      if (existingUser) {
        userId = existingUser.id;
      }
    }

    // Create anonymous donation record if no user found
    if (!userId && (donorEmail || donorName)) {
      // Create a guest user record for tracking
      const result = await database.run(
        'INSERT INTO users (name, email, role, subscriptionStatus) VALUES (?, ?, ?, ?)',
        [donorName || 'Anonymous Donor', donorEmail || null, 'guest', 'none']
      );
      userId = result.lastID;
    }

    if (userId) {
      // Record the donation
      await database.run(
        'INSERT INTO donations (userId, amount, currency, paypalTransactionId, status) VALUES (?, ?, ?, ?, ?)',
        [userId, amount, currency, paypalTransactionId, 'completed']
      );

      // Update user's total donations
      const totalResult = await database.get(
        'SELECT COALESCE(SUM(amount), 0) as total FROM donations WHERE userId = ? AND status = "completed"',
        [userId]
      );

      await database.run(
        'UPDATE users SET totalDonations = ? WHERE id = ?',
        [totalResult.total, userId]
      );

      res.status(200).json({
        success: true,
        message: 'Donation recorded successfully',
        donationId: paypalTransactionId,
        amount: amount,
        totalDonations: totalResult.total
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Unable to process donation - missing user information'
      });
    }

  } catch (error) {
    console.error('PayPal webhook error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
