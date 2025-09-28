// pages/api/admin/users.js - Admin user management API
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

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
  try {
    const database = await getDB();

    if (req.method === 'GET') {
      // Get all users with their statistics
      const users = await database.all(`
        SELECT 
          u.id, 
          u.name, 
          u.email, 
          u.role, 
          u.totalDonations, 
          u.subscriptionStatus, 
          u.createdAt, 
          u.lastLogin,
          COUNT(d.id) as donationCount
        FROM users u
        LEFT JOIN donations d ON u.id = d.userId AND d.status = 'completed'
        GROUP BY u.id
        ORDER BY u.createdAt DESC
      `);

      res.status(200).json({
        success: true,
        users: users.map(user => ({
          ...user,
          totalDonations: user.totalDonations || 0,
          donationCount: user.donationCount || 0
        }))
      });

    } else if (req.method === 'PUT') {
      // Update user role or status
      const { userId, role, subscriptionStatus } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
      }

      const updates = [];
      const params = [];

      if (role) {
        updates.push('role = ?');
        params.push(role);
      }

      if (subscriptionStatus) {
        updates.push('subscriptionStatus = ?');
        params.push(subscriptionStatus);
      }

      if (updates.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No updates provided'
        });
      }

      params.push(userId);

      await database.run(
        `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
        params
      );

      res.status(200).json({
        success: true,
        message: 'User updated successfully'
      });

    } else if (req.method === 'DELETE') {
      // Delete user and their data
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
      }

      // Delete user's donations first (foreign key constraint)
      await database.run('DELETE FROM donations WHERE userId = ?', [userId]);
      
      // Delete user
      await database.run('DELETE FROM users WHERE id = ?', [userId]);

      res.status(200).json({
        success: true,
        message: 'User deleted successfully'
      });

    } else {
      res.status(405).json({ success: false, message: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Admin users API error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
