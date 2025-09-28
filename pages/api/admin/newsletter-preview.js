// pages/api/admin/newsletter-preview.js - Generate newsletter preview
import { getNewsletterContent } from '../../../lib/quotesAndImages.js';
import { getArticlesFromDB } from '../../../lib/newsUtils.js';
import { generateNewsletterHTML } from '../../../lib/newsletterGenerator.js';
import clientPromise from '../../../lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('news');
    
    // Get recent articles
    const articles = await getArticlesFromDB(5);
    
    // Get subscribers count (MongoDB)
    const totalSubscribers = await db.collection('subscribers').countDocuments({ email: { $exists: true, $ne: null } });
    
    // Get positive content
    const { quote, image } = await getNewsletterContent();
    
    // Generate newsletter HTML
    const html = await generateNewsletterHTML(articles, quote, image);
    
    res.status(200).json({
      success: true,
      totalArticles: articles.length,
      totalSubscribers,
      articles,
      quote,
      image,
      html,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Newsletter preview error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
