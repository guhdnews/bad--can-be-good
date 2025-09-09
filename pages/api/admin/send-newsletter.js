// pages/api/admin/send-newsletter.js - Send newsletter to all subscribers
import nodemailer from 'nodemailer';
import clientPromise from '../../../lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('news');
    
    // Get recent articles for newsletter
    const articles = await db.collection('articles')
      .find({})
      .sort({ pubDate: -1 })
      .limit(5)
      .toArray();
    
    if (articles.length === 0) {
      return res.status(400).json({ message: 'No articles available for newsletter' });
    }
    
    // Get all subscribers
    const subscribers = await db.collection('subscribers').find({}).toArray();
    
    if (subscribers.length === 0) {
      return res.status(400).json({ message: 'No subscribers found' });
    }
    
    // Create email transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    // Generate newsletter HTML
    const newsletterHtml = generateNewsletterHTML(articles);
    
    // Send to all subscribers
    let successCount = 0;
    let failedCount = 0;
    
    for (const subscriber of subscribers) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: subscriber.email,
          subject: `News Can Be Good - ${new Date().toLocaleDateString()} Edition`,
          html: newsletterHtml
        });
        successCount++;
      } catch (error) {
        console.error(`Failed to send to ${subscriber.email}:`, error);
        failedCount++;
      }
    }
    
    res.status(200).json({
      message: `Newsletter sent successfully to ${successCount} subscribers${failedCount > 0 ? `, ${failedCount} failed` : ''}`,
      successCount,
      failedCount,
      totalArticles: articles.length
    });
    
  } catch (error) {
    console.error('Newsletter API Error:', error);
    res.status(500).json({ 
      message: 'Failed to send newsletter',
      error: error.message 
    });
  }
}

function generateNewsletterHTML(articles) {
  const articlesHtml = articles.map(article => `
    <div style="margin-bottom: 30px; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
      <h3 style="color: #333; margin-bottom: 10px;">${article.title}</h3>
      <p style="color: #666; line-height: 1.6; margin-bottom: 10px;">${article.content}</p>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        ${article.link && article.link !== '#' ? `<a href="${article.link}" style="color: #3b82f6; text-decoration: none;">Read Full Article →</a>` : ''}
        <small style="color: #888;">${article.source || 'News Can Be Good'}</small>
      </div>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>News Can Be Good Newsletter</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <header style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2563eb;">News Can Be Good</h1>
        <p style="color: #666;">Your daily dose of positive news</p>
      </header>
      
      <main>
        <h2 style="color: #333; margin-bottom: 20px;">Today's Good News</h2>
        ${articlesHtml}
      </main>
      
      <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
        <p style="color: #888; font-size: 14px;">
          You're receiving this because you subscribed to News Can Be Good.<br>
          Visit our website: <a href="http://newscanbegood.com" style="color: #3b82f6;">newscanbegood.com</a>
        </p>
      </footer>
    </body>
    </html>
  `;
}
