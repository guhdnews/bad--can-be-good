// lib/rssFetcher.js
import Parser from 'rss-parser';
import { getDb } from './mongodb.js';
import dotenv from 'dotenv';

dotenv.config();

const parser = new Parser();

export async function fetchAndStoreNews() {
  const feeds = ['https://www.goodnewsnetwork.org/feed/', 'https://www.positive.news/feed/'];
  for (const feedUrl of feeds) {
    const feed = await parser.parseURL(feedUrl);
    const db = await getDb();
    for (const item of feed.items) {
      await db.collection('articles').updateOne(
        { title: item.title },
        { $set: { title: item.title, content: item.contentSnippet, imageUrl: item.enclosure?.url || 'https://source.unsplash.com/random/?positive', date: new Date(item.pubDate), category: 'general' } },
        { upsert: true }
      );
    }
  }
}