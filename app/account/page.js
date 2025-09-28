// app/account/page.js - Simplified account page with App Router architecture and sunshine theme
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header.js'
import Footer from '../../components/Footer.js'
import { useAuth } from '../../contexts/AuthContext'

export default function AccountPage() {
  const { user, isLoggedIn, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/')
    }
  }, [loading, isLoggedIn, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your sunshine account...</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'subscription', name: 'Newsletter', icon: '📧' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <Header />
      
      <main className="container mx-auto px-4 py-16" style={{ paddingTop: 'var(--header-height)' }}>
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
              My Sunshine Account ☀️
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 transition-colors duration-200">
              Manage your profile, newsletter preferences, and spread more sunshine
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-orange-100 dark:border-gray-700 transition-colors duration-200">
                {/* User Info */}
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-3xl font-bold text-white">
                      {user.name?.charAt(0)?.toUpperCase() || 'S'}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                    {user.name || 'Sunshine Friend'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">
                    {user.email}
                  </p>
                  <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 text-orange-800 dark:text-orange-200">
                    <span className="mr-1">🌟</span>
                    Sunshine Subscriber
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="mr-3 text-lg">{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-orange-100 dark:border-gray-700 transition-colors duration-200">
                
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-200">
                      Profile Information
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          value={user.name || ''}
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                          disabled
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={user.email || ''}
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                          disabled
                        />
                      </div>
                    </div>
                    
                    <div className="mt-8 p-6 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        🌟 Account Status
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Your account is active and you're part of our sunshine community! Thank you for choosing positive news.
                      </p>
                    </div>
                  </div>
                )}

                {/* Newsletter Tab */}
                {activeTab === 'subscription' && (
                  <div className="p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-200">
                      Newsletter Subscription
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="p-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl">
                        <div className="flex items-center mb-3">
                          <span className="text-2xl mr-3">✅</span>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            You're subscribed to our sunshine newsletter!
                          </h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          You'll receive daily positive news updates that brighten your day and spread sunshine.
                        </p>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <p>📧 Delivery frequency: Daily at 8:00 AM</p>
                          <p>📊 Stories delivered this month: 28</p>
                          <p>😊 Happiness level: Maximum Sunshine ☀️</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                          Update Preferences
                        </button>
                        <button className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                          Pause Subscription
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                  <div className="p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-200">
                      Preferences
                    </h2>
                    
                    <div className="space-y-8">
                      {/* Theme Preference */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          🎨 Theme Preference
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          <button className="p-4 border-2 border-orange-200 rounded-xl text-center hover:border-orange-500 transition-colors">
                            <span className="block text-2xl mb-2">☀️</span>
                            <span className="text-sm">Light</span>
                          </button>
                          <button className="p-4 border-2 border-gray-300 rounded-xl text-center hover:border-orange-500 transition-colors">
                            <span className="block text-2xl mb-2">🌙</span>
                            <span className="text-sm">Dark</span>
                          </button>
                          <button className="p-4 border-2 border-purple-200 rounded-xl text-center hover:border-orange-500 transition-colors">
                            <span className="block text-2xl mb-2">🌓</span>
                            <span className="text-sm">Auto</span>
                          </button>
                        </div>
                      </div>
                      
                      {/* Content Preferences */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          📰 Content Categories
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            { id: 'community', name: 'Community Stories', icon: '🏘️', enabled: true },
                            { id: 'environment', name: 'Environmental Good News', icon: '🌱', enabled: true },
                            { id: 'science', name: 'Scientific Breakthroughs', icon: '🔬', enabled: false },
                            { id: 'kindness', name: 'Acts of Kindness', icon: '💝', enabled: true },
                          ].map((category) => (
                            <div key={category.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                              <div className="flex items-center">
                                <span className="text-xl mr-3">{category.icon}</span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {category.name}
                                </span>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  defaultChecked={category.enabled}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 border border-orange-100 dark:border-gray-700 transition-colors duration-200 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">
                Love spreading sunshine? ☀️
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-200">
                Share our positive stories with friends and help us create a brighter world together!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/#newsletter"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span className="mr-2">📧</span>
                  Invite Friends
                </a>
                <a 
                  href="/donate"
                  className="inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-600 dark:text-orange-400 font-semibold rounded-xl hover:bg-orange-50 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <span className="mr-2">💝</span>
                  Support Our Mission
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}