// pages/admin.js - Admin dashboard for website management
import { useState, useEffect } from 'react';

export default function Admin() {
  const [articles, setArticles] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [stats, setStats] = useState({ articlesCount: 0, subscribersCount: 0 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('articles');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      setMessage('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/articles');
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles || []);
      }
    } catch (error) {
      setMessage('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/subscribers');
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers || []);
      }
    } catch (error) {
      setMessage('Failed to fetch subscribers');
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (articleId) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    
    try {
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setMessage('Article deleted successfully');
        fetchArticles();
        fetchStats();
      }
    } catch (error) {
      setMessage('Failed to delete article');
    }
  };

  const sendNewsletter = async () => {
    if (!confirm('Send newsletter to all subscribers?')) return;
    
    try {
      setLoading(true);
      const response = await fetch('/api/admin/send-newsletter', {
        method: 'POST'
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Failed to send newsletter');
    } finally {
      setLoading(false);
    }
  };

  const refreshNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/fetch-news', { method: 'POST' });
      const data = await response.json();
      setMessage(data.message);
      fetchStats();
      if (activeTab === 'articles') fetchArticles();
    } catch (error) {
      setMessage('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'articles' && articles.length === 0) fetchArticles();
    if (activeTab === 'subscribers' && subscribers.length === 0) fetchSubscribers();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <a href="/" className="text-blue-600 hover:text-blue-800">← Back to Site</a>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Articles</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.articlesCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Email Subscribers</h3>
            <p className="text-3xl font-bold text-green-600">{stats.subscribersCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <div className="space-y-2">
              <button 
                onClick={refreshNews}
                disabled={loading}
                className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Fetching...' : 'Fetch New Articles'}
              </button>
              <button 
                onClick={sendNewsletter}
                disabled={loading || stats.subscribersCount === 0}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Send Newsletter
              </button>
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">{message}</p>
            <button 
              onClick={() => setMessage('')}
              className="text-blue-600 underline text-sm mt-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['articles', 'subscribers'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Articles Tab */}
            {activeTab === 'articles' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Manage Articles</h2>
                {articles.length === 0 ? (
                  <p className="text-gray-600">No articles found. Click "Fetch New Articles" to get started.</p>
                ) : (
                  <div className="space-y-4">
                    {articles.map((article, index) => (
                      <div key={article._id || index} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg flex-1">{article.title}</h3>
                          <div className="flex space-x-2 ml-4">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {article.source || 'Unknown'}
                            </span>
                            <button
                              onClick={() => deleteArticle(article._id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{article.content?.substring(0, 150)}...</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Published: {article.pubDate ? new Date(article.pubDate).toLocaleDateString() : 'Unknown'}</span>
                          {article.link && article.link !== '#' && (
                            <a 
                              href={article.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              View Original →
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Subscribers Tab */}
            {activeTab === 'subscribers' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Email Subscribers</h2>
                {subscribers.length === 0 ? (
                  <p className="text-gray-600">No subscribers yet.</p>
                ) : (
                  <div className="space-y-2">
                    {subscribers.map((subscriber, index) => (
                      <div key={subscriber._id || index} className="border rounded p-3 flex justify-between items-center">
                        <span>{subscriber.email}</span>
                        <span className="text-xs text-gray-500">
                          Joined: {subscriber.createdAt ? new Date(subscriber.createdAt).toLocaleDateString() : 'Unknown'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
