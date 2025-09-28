// lib/emailService.js - Email delivery service using SendGrid
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Email templates
export const EmailTemplates = {
  NEWSLETTER: 'newsletter',
  WELCOME: 'welcome',
  DONATION_THANK_YOU: 'donation-thank-you'
};

// Send individual email
export async function sendEmail({ to, subject, html, text, templateId = null, templateData = {} }) {
  try {
    // Fallback for development without SendGrid
    if (!process.env.SENDGRID_API_KEY) {
      console.log('📧 Email Service (Development Mode):');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`HTML Content: ${html?.substring(0, 200)}...`);
      return { success: true, messageId: 'dev-' + Date.now() };
    }

    const msg = {
      to,
      from: {
        email: process.env.FROM_EMAIL || 'news@badcanbegood.com',
        name: 'News Can Be Good'
      },
      subject,
      html: html || generateEmailHTML(subject, text || '', templateData),
      text: text || stripHTML(html || ''),
    };

    // Use template if provided
    if (templateId && process.env.SENDGRID_TEMPLATE_ID) {
      msg.templateId = process.env.SENDGRID_TEMPLATE_ID;
      msg.dynamicTemplateData = templateData;
      delete msg.html;
      delete msg.text;
    }

    const response = await sgMail.send(msg);
    return { 
      success: true, 
      messageId: response[0].headers['x-message-id'],
      statusCode: response[0].statusCode 
    };

  } catch (error) {
    console.error('Email send error:', error);
    return { 
      success: false, 
      error: error.message,
      code: error.code
    };
  }
}

// Send bulk emails (for newsletters)
export async function sendBulkEmails(emails) {
  try {
    // Fallback for development
    if (!process.env.SENDGRID_API_KEY) {
      console.log(`📧 Bulk Email Service (Development Mode): ${emails.length} emails`);
      return { 
        success: true, 
        sent: emails.length, 
        failed: 0,
        results: emails.map(email => ({ 
          email: email.to, 
          status: 'delivered',
          messageId: 'dev-' + Date.now()
        }))
      };
    }

    const messages = emails.map(email => ({
      to: email.to,
      from: {
        email: process.env.FROM_EMAIL || 'news@badcanbegood.com',
        name: 'News Can Be Good'
      },
      subject: email.subject,
      html: email.html,
      text: email.text || stripHTML(email.html || ''),
    }));

    const response = await sgMail.send(messages);
    
    return {
      success: true,
      sent: messages.length,
      failed: 0,
      results: response.map((res, index) => ({
        email: emails[index].to,
        status: res.statusCode === 202 ? 'delivered' : 'failed',
        messageId: res.headers['x-message-id']
      }))
    };

  } catch (error) {
    console.error('Bulk email send error:', error);
    return {
      success: false,
      sent: 0,
      failed: emails.length,
      error: error.message,
      results: emails.map(email => ({
        email: email.to,
        status: 'failed',
        error: error.message
      }))
    };
  }
}

// Generate basic HTML email template
function generateEmailHTML(subject, content, data = {}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        .quote { font-style: italic; background: #e8f4f8; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>✨ News Can Be Good ✨</h1>
        <p>Spreading positivity through journalism</p>
      </div>
      <div class="content">
        ${content}
        ${data.quote ? `<div class="quote">"${data.quote}"</div>` : ''}
        ${data.image ? `<img src="${data.image}" alt="Positive image" style="max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0;">` : ''}
      </div>
      <div class="footer">
        <p>News Can Be Good - Spreading positivity one story at a time</p>
        <p><a href="{{{unsubscribe}}}">Unsubscribe</a></p>
      </div>
    </body>
    </html>
  `;
}

// Strip HTML tags for plain text version
function stripHTML(html) {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

// Validate email address
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Rate limiting for email sending
const emailRateLimits = new Map();

export function checkEmailRateLimit(email, maxEmails = 5, windowMs = 3600000) { // 5 emails per hour
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!emailRateLimits.has(email)) {
    emailRateLimits.set(email, []);
  }
  
  const emailTimes = emailRateLimits.get(email).filter(time => time > windowStart);
  
  if (emailTimes.length >= maxEmails) {
    return false;
  }
  
  emailTimes.push(now);
  emailRateLimits.set(email, emailTimes);
  return true;
}
