// app/admin/page.js - Modern Admin Console with sunshine theme and App Router
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header.js'
import Footer from '../../components/Footer.js'

export default function AdminConsolePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [stats, setStats] = useState({
    articlesCount: 0,
    subscribersCount: 0,
    todayViews: 0,
    weeklyGrowth: 0
  })
  const [articles, setArticles] = useState([])
  const [subscribers, setSubscribers] = useState([])

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊', color: 'from-yellow-400 to-orange-500' },
    { id: 'articles', name: 'Articles', icon: '📰', color: 'from-orange-500 to-red-500' },
    { id: 'subscribers', name: 'Subscribers', icon: '👥', color: 'from-amber-500 to-yellow-500' },
    { id: 'newsletter', name: 'Newsletter', icon: '✉️', color: 'from-red-500 to-pink-500' },
    { id: 'settings', name: 'Settings', icon: '⚙️', color: 'from-gray-500 to-gray-600' }
  ]

  useEffect(() => {
    // Check if user is admin (simplified auth for demo)
    const isAdmin = localStorage.getItem('admin_token') || false
    if (!isAdmin) {
      // Redirect to login or show auth form
      setIsAuthenticated(false)
    } else {
      setIsAuthenticated(true)
      fetchStats()
    }
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      // Mock data for demonstration
      setStats({
        articlesCount: 250,
        subscribersCount: 1847,
        todayViews: 3421,
        weeklyGrowth: 12.5
      })
      setArticles([
        {
          id: '1',
          title: 'Community Garden Brings Neighbors Together',
          source: 'Good News Network',
          pubDate: new Date().toISOString(),
          category: 'Community',
          views: 142
        },
        {
          id: '2', 
          title: 'Scientists Develop Clean Energy Breakthrough',
          source: 'Positive News',
          pubDate: new Date(Date.now() - 86400000).toISOString(),
          category: 'Environment',
          views: 289
        },
        {
          id: '3',
          title: 'Local Teen Raises $10K for Animal Shelter',
          source: 'Upworthy',
          pubDate: new Date(Date.now() - 172800000).toISOString(),
          category: 'Kindness',
          views: 67
        }
      ])
    } catch (error) {
      console.error('Error fetching stats:', error)
      setMessage('❌ Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const fetchNews = async () => {
    try {
      setLoading(true)
      setMessage('🌞 Fetching latest positive news...')
      // Simulate API call
      setTimeout(() => {
        setMessage('✅ Successfully fetched 15 new positive stories!')
        fetchStats()
      }, 2000)
    } catch (error) {
      setMessage('❌ Failed to fetch news')
    } finally {
      setLoading(false)
    }
  }

  const sendNewsletter = async () => {
    if (!confirm('Send sunshine newsletter to all subscribers?')) return
    
    try {
      setLoading(true)
      setMessage('📧 Sending sunshine newsletter...')
      setTimeout(() => {
        setMessage('✅ Newsletter sent to 1,847 sunshine subscribers!')
      }, 2000)
    } catch (error) {
      setMessage('❌ Failed to send newsletter')
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ title, value, change, icon, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-orange-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-1 flex items-center ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-1">{change > 0 ? '📈' : '📉'}</span>
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  )

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-100 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
            ☀️ Admin Console
          </h1>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Admin Password"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value === 'sunshine') {
                  localStorage.setItem('admin_token', 'true')
                  setIsAuthenticated(true)
                }
              }}
            />
            <button
              onClick={() => {
                const password = document.querySelector('input[type="password"]').value
                if (password === 'sunshine') {
                  localStorage.setItem('admin_token', 'true')
                  setIsAuthenticated(true)
                }
              }}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Access Console
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Demo password: "sunshine"
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <Header />
      
      <main className="container mx-auto px-4 py-16" style={{ paddingTop: 'var(--header-height)' }}>
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              ☀️ Sunshine Admin Console
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your positive news platform and spread more sunshine!
            </p>
          </div>

          {/* Message Banner */}
          {message && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-xl">
              <p className="text-green-800">{message}</p>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-2 text-lg">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    title="Total Articles"
                    value={stats.articlesCount}
                    change={8.2}
                    icon="📰"
                    color="from-yellow-400 to-orange-500"
                  />
                  <StatCard
                    title="Subscribers"
                    value={stats.subscribersCount.toLocaleString()}
                    change={12.5}
                    icon="👥"
                    color="from-orange-500 to-red-500"
                  />
                  <StatCard
                    title="Today's Views"
                    value={stats.todayViews.toLocaleString()}
                    change={15.3}
                    icon="👀"
                    color="from-amber-500 to-yellow-500"
                  />
                  <StatCard
                    title="Happiness Score"
                    value="98.5%"
                    change={2.1}
                    icon="😊"
                    color="from-green-500 to-emerald-500"
                  />
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-orange-100 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    🚀 Quick Actions
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <button
                      onClick={fetchNews}
                      disabled={loading}
                      className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {loading ? '🔄' : '📰'} Fetch News
                    </button>
                    <button
                      onClick={sendNewsletter}
                      disabled={loading}
                      className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {loading ? '🔄' : '📧'} Send Newsletter
                    </button>
                    <button
                      onClick={() => setMessage('🌟 Analytics refreshed!')}
                      className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      📊 Refresh Stats
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-orange-100 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    🌞 Recent Sunshine Activity
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <span className="text-2xl mr-4">✅</span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Newsletter sent successfully</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">1,847 subscribers received today's sunshine</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <span className="text-2xl mr-4">📰</span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">15 new articles fetched</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">All positive stories with perfect sunshine rating</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                      <span className="text-2xl mr-4">👥</span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">23 new subscribers today</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Growing our sunshine community daily</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Articles Tab */}
            {activeTab === 'articles' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-orange-100 dark:border-gray-700">
                <div className="p-8 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    📰 Article Management
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Manage your sunshine stories and positive news articles
                  </p>
                </div>
                <div className="p-8">
                  <div className="space-y-4">
                    {articles.map((article) => (
                      <div key={article.id} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{article.title}</h4>
                          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>📅 {new Date(article.pubDate).toLocaleDateString()}</span>
                            <span>🏷️ {article.category}</span>
                            <span>👀 {article.views} views</span>
                            <span>📰 {article.source}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            Edit
                          </button>
                          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Newsletter Tab */}
            {activeTab === 'newsletter' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-orange-100 dark:border-gray-700 p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  📧 Sunshine Newsletter Management
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h4>
                    <div className="space-y-3">
                      <button 
                        onClick={sendNewsletter}
                        className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                      >
                        📧 Send Today's Sunshine Newsletter
                      </button>
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                        👀 Preview Newsletter
                      </button>
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                        📊 View Send History
                      </button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Newsletter Stats</h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                        <div className="flex justify-between">
                          <span>📊 Open Rate</span>
                          <span className="font-bold">87.3%</span>
                        </div>
                      </div>
                      <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                        <div className="flex justify-between">
                          <span>👆 Click Rate</span>
                          <span className="font-bold">42.1%</span>
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                        <div className="flex justify-between">
                          <span>😊 Happiness Score</span>
                          <span className="font-bold">98.5%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}