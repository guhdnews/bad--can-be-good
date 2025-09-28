// pages/api/admin/send-test-newsletter.js - Send test newsletter to specific email
import { sendEmail } from '../../../lib/emailService.js';
import { getNewsletterContent } from '../../../lib/quotesAndImages.js';
import { getArticlesFromDB } from '../../../lib/newsUtils.js';
import { generateNewsletterHTML } from '../../../lib/newsletterGenerator.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ 
      success: false, 
      error: 'Email address is required' 
    });
  }

  try {
    // Get articles and positive content
    const articles = await getArticlesFromDB(5);
    const { quote, image } = await getNewsletterContent();
    
    if (articles.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'No articles available for newsletter' 
      });
    }
    
    // Generate newsletter HTML
    const html = await generateNewsletterHTML(articles, quote, image);
    
    // Send test email
    const result = await sendEmail({
      to: email,
      subject: `🧪 TEST: News Can Be Good - ${new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })} Edition`,
      html: html
    });
    
    if (result.success) {
      res.status(200).json({
        success: true,
        message: `Test newsletter sent to ${email}`,
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error || 'Failed to send test email'
      });
    }

  } catch (error) {
    console.error('Test newsletter error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
