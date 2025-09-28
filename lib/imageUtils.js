// lib/imageUtils.js - Enhanced image handling for articles
export function extractImageFromContent(content, title = '') {
  if (!content) return getDefaultImage(title)
  
  // Try different image extraction methods
  const imageSources = [
    // Standard img tags
    /<img[^>]+src=["']([^"']+)["'][^>]*>/gi,
    // Media enclosures in RSS
    /<media:content[^>]+url=["']([^"']+)["'][^>]*>/gi,
    // Thumbnail tags
    /<media:thumbnail[^>]+url=["']([^"']+)["'][^>]*>/gi,
    // Enclosure tags
    /<enclosure[^>]+url=["']([^"']+)["'][^>]*type=["']image\/[^"']+["'][^>]*>/gi
  ]
  
  for (const regex of imageSources) {
    const matches = Array.from(content.matchAll(regex))
    if (matches.length > 0) {
      const imageUrl = matches[0][1]
      if (isValidImageUrl(imageUrl)) {
        return imageUrl
      }
    }
  }
  
  return getDefaultImage(title)
}

export function isValidImageUrl(url) {
  if (!url) return false
  
  // Check if URL is valid
  try {
    new URL(url)
  } catch {
    return false
  }
  
  // Check if it's likely an image
  const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i
  const imageIndicators = /\/(image|photo|picture|img|thumbnail)/i
  
  return imageExtensions.test(url) || imageIndicators.test(url) || 
         url.includes('unsplash.com') || url.includes('pixabay.com') ||
         url.includes('pexels.com') || url.includes('picsum.photos')
}

export function getDefaultImage(title = '') {
  // Generate a beautiful default image based on the article title/content
  const positiveImageUrls = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80', // Sunrise
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80', // Forest path
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&q=80', // Mountain lake
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80', // Golden field
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&q=80', // Helping hands
    'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=600&fit=crop&q=80', // People celebrating
    'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&h=600&fit=crop&q=80', // Community garden
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&q=80', // Children playing
  ]
  
  // Use title to generate consistent image selection
  const hash = title.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  
  const index = Math.abs(hash) % positiveImageUrls.length
  return positiveImageUrls[index]
}

export function optimizeImageUrl(url, width = 800, height = 600) {
  if (!url) return null
  
  // If it's already an optimized URL, return as-is
  if (url.includes('w=') && url.includes('h=')) return url
  
  // If it's from Unsplash, optimize it
  if (url.includes('unsplash.com')) {
    return `${url}?w=${width}&h=${height}&fit=crop&q=80`
  }
  
  // For other sources, return original
  return url
}

export const FALLBACK_IMAGES = {
  news: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop&q=80',
  community: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&h=600&fit=crop&q=80',
  environment: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80',
  technology: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&q=80',
  health: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&q=80',
  education: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop&q=80'
}