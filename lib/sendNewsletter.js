// lib/sendNewsletter.js
import nodemailer from 'nodemailer';

export async function sendNewsletter(subscribers, articles, quote) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333;">News Can Be Good</h1>
      <p style="color: #666;">Your daily dose of positive news.</p>
      <hr style="border: 1px solid #eee;" />
      ${articles
        .map(
          (article) => `
            <div style="margin: 20px 0;">
              <img src="${article.imageUrl}" alt="${article.title}" style="width: 100%; max-height: 200px; object-fit: cover;" />
              <h2 style="color: #333;">${article.title}</h2>
              <p style="color: #666;">${article.content.slice(0, 150)}...</p>
              <a href="${article.url || '#'}">Read More</a>
            </div>
          `
        )
        .join('')}
      <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <h3 style="color: #333;">Inspiration of the Day</h3>
        <p style="font-style: italic; color: #666;">"${quote.text}"</p>
        <p style="color: #666;">— ${quote.author}</p>
      </div>
      <p style="color: #666; text-align: center; margin-top: 20px;">
        Keep us ad-free! <a href="https://newscanbegood.com/donate">Donate Now</a>
      </p>
    </div>
  `;

  for (const subscriber of subscribers) {
    await transporter.sendMail({
      from: '"News Can Be Good" <your-email@gmail.com>',
      to: subscriber.email,
      subject: 'Your Daily Positive News',
      html: htmlContent,
    });
  }
}