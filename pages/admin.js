// pages/admin.js - Enhanced admin dashboard with analytics
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function AdminDashboard() {
  const [articles, setArticles] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [stats, setStats] = useState({ articlesCount: 0, subscribersCount: 0 });
  const [analytics, setAnalytics] = useState({ dailyViews: [], topSources: [], categoryBreakdown: [] });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'articles', name: 'Articles', icon: '📰' },
    { id: 'subscribers', name: 'Subscribers', icon: '👥' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  useEffect(() => {
    fetchStats();
    fetchAnalytics();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      // Mock analytics data - you can replace with real data
      setAnalytics({
        dailyViews: [
          { date: '2025-01-01', views: 145 },
          { date: '2025-01-02', views: 189 },
          { date: '2025-01-03', views: 203 },
          { date: '2025-01-04', views: 178 },
          { date: '2025-01-05', views: 234 },
          { date: '2025-01-06', views: 267 },
          { date: '2025-01-07', views: 298 }
        ],
        topSources: [
          { source: 'goodnewsnetwork.org', count: 45 },
          { source: 'upworthy.com', count: 32 },
          { source: 'positive.news', count: 28 },
          { source: 'optimistdaily.com', count: 19 }
        ],
        categoryBreakdown: [
          { category: 'Community', count: 35, color: 'bg-blue-500' },
          { category: 'Environment', count: 28, color: 'bg-green-500' },
          { category: 'Innovation', count: 22, color: 'bg-purple-500' },
          { category: 'Health', count: 18, color: 'bg-pink-500' },
          { category: 'Education', count: 15, color: 'bg-yellow-500' }
        ]
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
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
        setMessage('✅ Article deleted successfully');
        fetchArticles();
        fetchStats();
      }
    } catch (error) {
      setMessage('❌ Failed to delete article');
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
      setMessage(`📧 ${data.message}`);
    } catch (error) {
      setMessage('❌ Failed to send newsletter');
    } finally {
      setLoading(false);
    }
  };

  const refreshNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/fetch-news', { method: 'POST' });
      const data = await response.json();
      setMessage(`📰 ${data.message}`);
      fetchStats();
      if (activeTab === 'articles') fetchArticles();
    } catch (error) {
      setMessage('❌ Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'articles' && articles.length === 0) fetchArticles();
    if (activeTab === 'subscribers' && subscribers.length === 0) fetchSubscribers();
  }, [activeTab]);

  const StatCard = ({ title, value, change, icon, color = "blue" }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold text-${color}-600 mt-2`}>{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last week
            </p>
          )}
        </div>
        <div className={`text-4xl opacity-20`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Admin Dashboard - News Can Be Good</title>
        <meta name="description" content="Admin dashboard for managing News Can Be Good website" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-sm text-gray-600">Manage your positive news platform</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={refreshNews}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {loading ? 'Fetching...' : 'Fetch News'}
                </button>
                <a
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m0 7h18" />
                  </svg>
                  Back to Site
                </a>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Message Display */}
          {message && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
              <p className="text-blue-800 font-medium">{message}</p>
              <button 
                onClick={() => setMessage('')}
                className="text-blue-600 hover:text-blue-800 ml-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="mb-8">
            <nav className="flex space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 shadow-sm border border-gray-200'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Articles"
                  value={stats.articlesCount}
                  change={12}
                  icon="📰"
                  color="blue"
                />
                <StatCard
                  title="Subscribers"
                  value={stats.subscribersCount}
                  change={8}
                  icon="👥"
                  color="green"
                />
                <StatCard
                  title="Daily Views"
                  value="1,234"
                  change={15}
                  icon="👀"
                  color="purple"
                />
                <StatCard
                  title="Engagement Rate"
                  value="89%"
                  change={3}
                  icon="❤️"
                  color="pink"
                />
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={refreshNews}
                    disabled={loading}
                    className="flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200 disabled:opacity-50"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Fetch Latest News
                  </button>
                  <button
                    onClick={sendNewsletter}
                    disabled={loading || stats.subscribersCount === 0}
                    className="flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 disabled:opacity-50"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Newsletter
                  </button>
                  <a
                    href="/"
                    className="flex items-center justify-center px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview Site
                  </a>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm text-gray-600">New article published: "Community garden brings neighbors together"</p>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-sm text-gray-600">Newsletter sent to 247 subscribers</p>
                    <span className="text-xs text-gray-400">1 day ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full"></div>
                    <p className="text-sm text-gray-600">12 new subscribers joined</p>
                    <span className="text-xs text-gray-400">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Articles Tab */}
          {activeTab === 'articles' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Manage Articles</h2>
              </div>
              <div className="p-6">
                {articles.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
                    <p className="text-gray-600 mb-4">Click "Fetch Latest News" to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {articles.map((article, index) => (
                      <div key={article._id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-lg text-gray-900 flex-1 mr-4">{article.title}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {article.source || 'Unknown'}
                            </span>
                            <button
                              onClick={() => deleteArticle(article._id)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.content?.substring(0, 200)}...</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Published: {article.pubDate ? new Date(article.pubDate).toLocaleDateString() : 'Unknown'}</span>
                          {article.link && article.link !== '#' && (
                            <a 
                              href={article.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline font-medium"
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
            </div>
          )}

          {/* Subscribers Tab */}
          {activeTab === 'subscribers' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Email Subscribers</h2>
                <button
                  onClick={sendNewsletter}
                  disabled={loading || stats.subscribersCount === 0}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
                >
                  Send Newsletter
                </button>
              </div>
              <div className="p-6">
                {subscribers.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No subscribers yet</h3>
                    <p className="text-gray-600">Subscribers will appear here when people sign up for the newsletter.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {subscribers.map((subscriber, index) => (
                          <tr key={subscriber._id || index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {subscriber.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {subscriber.createdAt ? new Date(subscriber.createdAt).toLocaleDateString() : 'Unknown'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              {/* Top Sources */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top News Sources</h3>
                <div className="space-y-3">
                  {analytics.topSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{source.source}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(source.count / analytics.topSources[0].count) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{source.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analytics.categoryBreakdown.map((category, index) => (
                    <div key={index} className="text-center p-4 rounded-lg bg-gray-50">
                      <div className={`w-16 h-16 ${category.color} rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-xl`}>
                        {category.count}
                      </div>
                      <h4 className="font-semibold text-gray-900">{category.category}</h4>
                      <p className="text-sm text-gray-600">stories</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">RSS Feed Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fetch Interval</label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                          <option>Every hour</option>
                          <option>Every 2 hours</option>
                          <option>Every 6 hours</option>
                          <option>Daily</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Articles per source</label>
                        <input type="number" defaultValue="5" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Newsletter Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Send frequency</label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                          <option>Daily</option>
                          <option>Weekly</option>
                          <option>Bi-weekly</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Articles per newsletter</label>
                        <input type="number" defaultValue="5" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
