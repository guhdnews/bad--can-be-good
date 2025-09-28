// lib/newsletterGenerator.js - Newsletter HTML generator utility
export async function generateNewsletterHTML(articles, quote, image) {
  const articlesHtml = articles.map(article => {
    const truncatedContent = article.content ? 
      (article.content.length > 200 ? article.content.substring(0, 200) + '...' : article.content) 
      : 'Read this positive story!';
    
    return `
      <div style="margin-bottom: 25px; padding: 20px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        ${article.imageUrl ? `<img src="${article.imageUrl}" alt="Article image" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 15px;">` : ''}
        <h3 style="color: #1f2937; margin-bottom: 10px; font-size: 18px; line-height: 1.4;">${article.title}</h3>
        <p style="color: #6b7280; line-height: 1.6; margin-bottom: 15px; font-size: 14px;">${truncatedContent}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
          ${article.link && article.link !== '#' ? 
            `<a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://badcanbegood.com'}/article?url=${encodeURIComponent(article.link)}" style="color: #3b82f6; text-decoration: none; font-weight: 600; font-size: 14px;">Read Full Story →</a>` : ''}
          <small style="color: #9ca3af; font-size: 12px;">${article.source || 'NCBG'}</small>
        </div>
      </div>
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>✨ News Can Be Good Newsletter</title>
      <style>
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; padding: 10px !important; }
          .content { padding: 15px !important; }
        }
      </style>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #f3f4f6;">
      <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Header -->
        <header style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">✨ News Can Be Good ✨</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 16px;">Spreading positivity through journalism</p>
        </header>
        
        <!-- Inspirational Quote -->
        ${quote ? `
        <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 25px 20px; text-align: center;">
          <blockquote style="margin: 0; font-style: italic; font-size: 18px; color: #374151; line-height: 1.6;">
            "${quote.text}"
          </blockquote>
          <cite style="display: block; margin-top: 10px; font-size: 14px; color: #6b7280;">— ${quote.author}</cite>
        </div>
        ` : ''}
        
        <!-- Positive Image -->
        ${image ? `
        <div style="text-align: center; padding: 20px;">
          <img src="${image.url}" alt="${image.description}" style="width: 100%; max-width: 560px; height: 300px; object-fit: cover; border-radius: 12px;">
          <p style="margin: 10px 0 0 0; font-size: 12px; color: #9ca3af;">Photo by ${image.photographer} on ${image.source}</p>
        </div>
        ` : ''}
        
        <!-- Main Content -->
        <main class="content" style="padding: 30px 20px;">
          <h2 style="color: #1f2937; margin-bottom: 25px; font-size: 24px; text-align: center;">Today's Positive Stories</h2>
          ${articlesHtml}
          
          <!-- Call to Action -->
          <div style="text-align: center; margin: 40px 0; padding: 25px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px;">
            <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 20px;">Spread the Positivity! 🌟</h3>
            <p style="margin: 0 0 20px 0; color: #78350f; font-size: 14px;">Help us reach more people with good news</p>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://badcanbegood.com'}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Visit NCBG →</a>
          </div>
        </main>
        
        <!-- Footer -->
        <footer style="background-color: #f9fafb; padding: 25px 20px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
            You're receiving this because you subscribed to News Can Be Good
          </p>
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">
            Visit us: <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://badcanbegood.com'}" style="color: #3b82f6;">badcanbegood.com</a>
            | <a href="{{{unsubscribe}}}" style="color: #6b7280;">Unsubscribe</a>
          </p>
        </footer>
        
      </div>
    </body>
    </html>
  `;
}
