// pages/api/article-proxy.js - Proxy API to fetch full articles with attribution
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: 'Article URL is required'
    });
  }

  try {
    // Add user agent to avoid blocking
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate',
      'Cache-Control': 'no-cache'
    };

    // Fetch the article page with timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(url, {
      headers,
      signal: controller.signal,
      redirect: 'follow'
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract content using common article selectors
    const extractContent = () => {
      // Common article content selectors
      const contentSelectors = [
        'article',
        '[role="main"]',
        '.article-content',
        '.post-content',
        '.entry-content',
        '.content',
        '.main-content',
        'main',
        '#content',
        '.story-body',
        '.article-body'
      ];

      let content = '';
      let title = '';
      let author = '';
      let publishDate = '';
      let image = '';

      // Extract title
      title = $('h1').first().text().trim() || 
              $('title').text().trim() ||
              $('[property="og:title"]').attr('content') || '';

      // Extract author
      author = $('[rel="author"]').text().trim() ||
               $('.author').first().text().trim() ||
               $('[name="author"]').attr('content') ||
               $('[property="article:author"]').attr('content') || '';

      // Extract publish date
      publishDate = $('time[datetime]').attr('datetime') ||
                   $('[property="article:published_time"]').attr('content') ||
                   $('.date').first().text().trim() || '';

      // Extract featured image
      image = $('[property="og:image"]').attr('content') ||
             $('img').first().attr('src') || '';

      // Make image URL absolute if relative
      if (image && !image.startsWith('http')) {
        const baseUrl = new URL(url).origin;
        image = new URL(image, baseUrl).href;
      }

      // Extract main content
      for (const selector of contentSelectors) {
        const element = $(selector).first();
        if (element.length) {
          // Remove unwanted elements
          element.find('script, style, nav, header, footer, .ads, .advertisement, .social-share, .comments').remove();
          
          content = element.text().trim();
          if (content.length > 200) { // Only use if substantial content
            break;
          }
        }
      }

      // Fallback to body content if no specific content found
      if (!content || content.length < 200) {
        $('script, style, nav, header, footer, .ads, .advertisement').remove();
        content = $('body').text().trim();
      }

      // Clean up content - limit to reasonable length
      if (content.length > 5000) {
        content = content.substring(0, 5000) + '...';
      }

      // Clean up whitespace
      content = content.replace(/\s+/g, ' ').trim();

      return {
        title,
        content,
        author,
        publishDate,
        image,
        sourceUrl: url,
        sourceDomain: new URL(url).hostname
      };
    };

    const articleData = extractContent();

    // Basic validation
    if (!articleData.title && !articleData.content) {
      return res.status(404).json({
        success: false,
        message: 'Unable to extract article content'
      });
    }

    res.status(200).json({
      success: true,
      article: articleData
    });

  } catch (error) {
    console.error('Article proxy error:', error);
    
    // Handle different types of errors
    if (error.name === 'AbortError') {
      return res.status(408).json({
        success: false,
        message: 'Request timeout - article took too long to load'
      });
    }
    
    if (error.name === 'FetchError') {
      return res.status(502).json({
        success: false,
        message: 'Unable to fetch article - site may be unavailable'
      });
    }
    
    if (error.code === 'ENOTFOUND') {
      return res.status(404).json({
        success: false,
        message: 'Article URL not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to fetch article content'
    });
  }
}
