// pages/api/auth/register.js - User registration
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import clientPromise from '../../../lib/mongodb.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('news');
    const users = db.collection('users');

    // Check if user already exists
    const existingUser = await users.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'user',
      joinedAt: new Date(),
      lastLogin: new Date(),
      loginCount: 1,
      preferences: {
        newsletter: true,
        categories: [],
        theme: 'light'
      },
      subscription: {
        status: 'none',
        subscribedAt: null
      },
      donations: {
        total: 0,
        count: 0,
        history: []
      },
      favorites: [],
      readingHistory: []
    };

    const result = await users.insertOne(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: result.insertedId.toString(),
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data (excluding password)
    const userData = {
      id: result.insertedId.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      joinedAt: newUser.joinedAt,
      preferences: newUser.preferences,
      subscription: newUser.subscription
    };

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: userData
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
