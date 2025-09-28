// pages/api/user/profile.js - User profile management API
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
      // Get user profile
      const user = await database.get(
        'SELECT id, name, email, role, totalDonations, subscriptionStatus, favorites, readingHistory, createdAt, lastLogin FROM users WHERE id = ?',
        [decoded.userId]
      );

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const userProfile = {
        ...user,
        favorites: JSON.parse(user.favorites || '[]'),
        readingHistory: JSON.parse(user.readingHistory || '[]')
      };

      res.status(200).json({
        success: true,
        user: userProfile
      });

    } else if (req.method === 'PUT') {
      // Update user profile
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({
          success: false,
          message: 'Name and email are required'
        });
      }

      // Check if email is already taken by another user
      const existingUser = await database.get(
        'SELECT id FROM users WHERE email = ? AND id != ?',
        [email.toLowerCase(), decoded.userId]
      );

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email is already in use'
        });
      }

      // Update user
      await database.run(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email.toLowerCase(), decoded.userId]
      );

      // Get updated user
      const updatedUser = await database.get(
        'SELECT id, name, email, role, totalDonations, subscriptionStatus, favorites, readingHistory, createdAt, lastLogin FROM users WHERE id = ?',
        [decoded.userId]
      );

      const userProfile = {
        ...updatedUser,
        favorites: JSON.parse(updatedUser.favorites || '[]'),
        readingHistory: JSON.parse(updatedUser.readingHistory || '[]')
      };

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user: userProfile
      });

    } else {
      res.status(405).json({ success: false, message: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Profile API error:', error);
    if (error.message === 'No valid authorization token provided' || error.message === 'Invalid token') {
      res.status(401).json({ success: false, message: 'Unauthorized' });
    } else {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}
