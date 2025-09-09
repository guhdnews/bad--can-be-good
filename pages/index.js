// pages/index.js
import { useState, useEffect } from 'react';
import { getArticlesFromDB } from '../lib/newsUtils';

export default function Home({ initialArticles }) {
  const [email, setEmail] = useState('');
  const [articles, setArticles] = useState(initialArticles);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      alert(data.message);
      setEmail(''); // Clear form on success
    } catch (error) {
      alert('Subscription failed');
    }
  };

  const refreshNews = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/fetch-news', { method: 'POST' });
      const data = await response.json();
      
      if (response.ok) {
        // Refresh the page to show new articles
        window.location.reload();
      } else {
        alert('Failed to fetch new articles: ' + data.message);
      }
    } catch (error) {
      alert('Error refreshing news');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">News Can Be Good</h1>
            <div className="space-x-4">
              <a href="/quiz" className="text-blue-600 hover:text-blue-800">Personalizer</a>
              <a href="/donate" className="text-blue-600 hover:text-blue-800">Support Our Mission</a>
            </div>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">News Can Be Good</h1>
        
        <form onSubmit={handleSubscribe} className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-2 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Subscribe for daily news"
            className="border border-gray-300 p-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto">
            Subscribe
          </button>
        </form>

        {/* Refresh News Button */}
        <div className="mb-8 text-center">
          <button 
            onClick={refreshNews}
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? 'Fetching News...' : 'Refresh Latest News'}
          </button>
        </div>

        {/* PayPal Donation Section */}
        <div className="mb-12 max-w-2xl mx-auto text-center bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Support Positive News</h2>
          <p className="text-gray-600 mb-6">
            Help us keep News Can Be Good ad-free and dedicated to spreading optimism.
          </p>
          
          <form action="https://www.paypal.com/donate" method="post" target="_top" className="inline-block">
            <input type="hidden" name="hosted_button_id" value="MBF7NQU55ZL7L" />
            <input 
              type="image" 
              src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" 
              border="0" 
              name="submit" 
              title="PayPal - The safer, easier way to pay online!" 
              alt="Donate with PayPal button" 
              className="hover:opacity-80 transition"
            />
          </form>
        </div>
        
        <div className="grid gap-6 max-w-4xl mx-auto">
          {articles.length > 0 ? (
            articles.map((article) => (
              <article key={article._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                {article.imageUrl && (
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                )}
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-semibold text-gray-900 flex-1">{article.title}</h2>
                  {article.source && (
                    <span className="text-sm text-blue-600 ml-4 bg-blue-50 px-2 py-1 rounded">
                      {article.source}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{article.content}</p>
                <div className="flex justify-between items-center">
                  {article.link && article.link !== '#' && (
                    <a 
                      href={article.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Read Full Article →
                    </a>
                  )}
                  {article.pubDate && (
                    <span className="text-sm text-gray-500">
                      {new Date(article.pubDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">No articles available yet</h3>
              <p className="text-gray-600 mb-6">Click "Refresh Latest News" to fetch positive stories!</p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p>&copy; 2025 News Can Be Good. All rights reserved.</p>
            <p className="mt-2 text-gray-400">newscanbegood.com - Spreading positivity, one story at a time</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    // Get articles from database
    const articles = await getArticlesFromDB(10);
    
    return { 
      props: { 
        initialArticles: articles
      } 
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    
    // Fallback to empty array if database fails
    return {
      props: {
        initialArticles: []
      }
    };
  }
}