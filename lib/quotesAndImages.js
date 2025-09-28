// lib/quotesAndImages.js - API service for positive quotes and images
export async function getPositiveQuote() {
  try {
    // Using ZenQuotes API for inspirational quotes
    const response = await fetch('https://zenquotes.io/api/today', {
      headers: {
        'User-Agent': 'NewsCanBeGood/1.0'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data && data[0]) {
        return {
          text: data[0].q,
          author: data[0].a,
          source: 'ZenQuotes'
        };
      }
    }
  } catch (error) {
    console.error('Error fetching quote:', error);
  }

  // Fallback quotes if API fails
  const fallbackQuotes = [
    { text: "The best way to find out if you can trust somebody is to trust them.", author: "Ernest Hemingway" },
    { text: "Kindness is a language which the deaf can hear and the blind can see.", author: "Mark Twain" },
    { text: "No act of kindness, no matter how small, is ever wasted.", author: "Aesop" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "In a world where you can be anything, be kind.", author: "Unknown" },
    { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" }
  ];

  const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
  return {
    text: randomQuote.text,
    author: randomQuote.author,
    source: 'NCBG Collection'
  };
}

export async function getPositiveImage() {
  try {
    // Using Unsplash API for positive images
    const topics = ['happiness', 'nature', 'success', 'friendship', 'love', 'peace', 'hope', 'joy'];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${randomTopic}&orientation=landscape&content_filter=high`, {
      headers: {
        'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY || 'demo'}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return {
        url: data.urls.regular,
        thumbnailUrl: data.urls.small,
        description: data.alt_description || `Beautiful ${randomTopic} image`,
        photographer: data.user.name,
        photographerUrl: data.user.links.html,
        source: 'Unsplash'
      };
    }
  } catch (error) {
    console.error('Error fetching image:', error);
  }

  // Fallback images if API fails
  const fallbackImages = [
    {
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600',
      thumbnailUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300',
      description: 'Beautiful nature landscape',
      photographer: 'Nature Collection',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600',
      thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300',
      description: 'Peaceful mountain sunrise',
      photographer: 'Nature Collection',
      source: 'Unsplash'
    }
  ];

  const randomImage = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  return randomImage;
}

// Get both quote and image for newsletter
export async function getNewsletterContent() {
  try {
    const [quote, image] = await Promise.all([
      getPositiveQuote(),
      getPositiveImage()
    ]);

    return { quote, image };
  } catch (error) {
    console.error('Error getting newsletter content:', error);
    return {
      quote: await getPositiveQuote(),
      image: await getPositiveImage()
    };
  }
}
