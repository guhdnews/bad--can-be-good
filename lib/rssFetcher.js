// lib/rssFetcher.js
import Parser from 'rss-parser';
import { getDb } from './mongodb.js';
import dotenv from 'dotenv';

dotenv.config();

const parser = new Parser();

export async function fetchAndStoreNews() {
  const feeds = [
    'https://www.goodnewsnetwork.org/feed/',
    'https://www.positive.news/feed/',
    'https://happinessandhope.com/feed/',
    'https://greatergood.berkeley.edu/feeds/gratefulnews',
    'https://www.inspiringquotes.us/feed',
    'https://www.upworthy.com/rss',
    'https://www.goodhousekeeping.com/uk/news/good-news/feed/',
    'https://www.huffpost.com/good-news/feed',
    'https://www.rd.com/good-news/feed/',
    'https://amp.cnn.com/cnn/2019/07/02/world/good-news-july-2-trnd/index.html'
  ];
  
  const positiveKeywords = [
    'rescued', 'helped', 'donated', 'volunteer', 'charity', 'breakthrough', 
    'success', 'achievement', 'healing', 'recovery', 'community', 'kindness',
    'inspiring', 'uplifting', 'positive', 'good news', 'heartwarming', 
    'celebration', 'winner', 'hero', 'miracle', 'hope', 'joy', 'love',
    'unity', 'progress', 'innovation', 'environmental', 'conservation',
    'education', 'scholarship', 'graduation', 'wedding', 'baby', 'reunion'
  ];
  
  for (const feedUrl of feeds) {
    try {
      console.log(`Fetching from: ${feedUrl}`);
      const feed = await parser.parseURL(feedUrl);
      const db = await getDb();
      
      for (const item of feed.items) {
        // Filter for positive content
        const titleLower = item.title?.toLowerCase() || '';
        const contentLower = item.contentSnippet?.toLowerCase() || '';
        const isPositive = positiveKeywords.some(keyword => 
          titleLower.includes(keyword) || contentLower.includes(keyword)
        );
        
        if (isPositive) {
          // Determine category based on content
          let category = 'general';
          if (titleLower.includes('environment') || titleLower.includes('climate') || titleLower.includes('green')) {
            category = 'environment';
          } else if (titleLower.includes('health') || titleLower.includes('medical') || titleLower.includes('doctor')) {
            category = 'health';
          } else if (titleLower.includes('community') || titleLower.includes('neighbor') || titleLower.includes('local')) {
            category = 'community';
          } else if (titleLower.includes('technology') || titleLower.includes('innovation') || titleLower.includes('invention')) {
            category = 'innovation';
          } else if (titleLower.includes('education') || titleLower.includes('school') || titleLower.includes('student')) {
            category = 'education';
          }
          
          await db.collection('articles').updateOne(
            { title: item.title },
            {
              $set: {
                title: item.title,
                content: item.contentSnippet || item.content || '',
                link: item.link || '#',
                source: feed.title || 'Positive News',
                imageUrl: item.enclosure?.url || `https://source.unsplash.com/800x600/?${category},positive`,
                pubDate: new Date(item.pubDate || Date.now()),
                category: category,
                createdAt: new Date()
              }
            },
            { upsert: true }
          );
        }
      }
      
      console.log(`Successfully processed feed: ${feed.title}`);
    } catch (error) {
      console.error(`Error fetching from ${feedUrl}:`, error.message);
      // Continue with other feeds even if one fails
    }
  }
  
  console.log('News fetching completed');
}
