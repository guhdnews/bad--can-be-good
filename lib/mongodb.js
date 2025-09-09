// lib/mongodb.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!uri) {
  throw new Error('MONGODB_URI is not defined in .env');
}

// Only initialize MongoClient on the server
if (typeof window === 'undefined') {
  if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
}

export default clientPromise;

export async function getDb() {
  if (typeof window !== 'undefined') {
    throw new Error('getDb should only be called on the server');
  }
  const client = await clientPromise;
  return client.db('news');
}
