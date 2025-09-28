// pages/account.js - User account dashboard
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleCard from '../components/ArticleCard';

export default function Account() {
  const { user, isLoggedIn, loading, updateUser } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [favorites, setFavorites] = useState([]);
  const [readingHistory, setReadingHistory] = useState([]);
  const [donations, setDonations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/');
    }
  }, [loading, isLoggedIn, router]);

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || '',
        email: user.email || ''
      });
      setFavorites(user.favorites || []);
      setReadingHistory(user.readingHistory || []);
      loadDonations();
    }
  }, [user]);

  const loadDonations = async () => {
    try {
      const response = await fetch('/api/user/donations', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('ncbg_token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setDonations(data.donations || []);
      }
    } catch (error) {
      console.error('Error loading donations:', error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('ncbg_token')}`
        },
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        const data = await response.json();
        updateUser(data.user);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const addToFavorites = async (article) => {
    try {
      const response = await fetch('/api/user/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('ncbg_token')}`
        },
        body: JSON.stringify({ article })
      });

      if (response.ok) {
        const data = await response.json();
        setFavorites(data.favorites);
        updateUser({ ...user, favorites: data.favorites });
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your account...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'favorites', name: 'Favorites', icon: '❤️' },
    { id: 'history', name: 'Reading History', icon: '📚' },
    { id: 'donations', name: 'Donations', icon: '💝' },
    { id: 'subscription', name: 'Subscription', icon: '📧' }
  ];

  return (
    <>
      <Head>
        <title>My Account - NCBG</title>
        <meta name="description" content="Manage your account, favorites, and donations" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Account</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Manage your profile, favorites, and subscription
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <div className="lg:w-1/4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                  {/* User Info */}
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {user.email}
                    </p>
                  </div>

                  {/* Navigation */}
                  <nav className="space-y-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                          activeTab === tab.id
                            ? 'bg-primary text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span className="mr-3">{tab.icon}</span>
                        {tab.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:w-3/4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                  
                  {/* Profile Tab */}
                  {activeTab === 'profile' && (
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                          Profile Information
                        </h2>
                        <button
                          onClick={() => setIsEditing(!isEditing)}
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                      </div>

                      {isEditing ? (
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={editForm.name}
                              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Email Address
                            </label>
                            <input
                              type="email"
                              value={editForm.email}
                              onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div className="flex gap-4">
                            <button
                              type="submit"
                              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              Save Changes
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsEditing(false)}
                              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                              <p className="text-lg font-medium text-gray-900 dark:text-white">
                                {user.name}
                              </p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                              <p className="text-lg font-medium text-gray-900 dark:text-white">
                                {user.email}
                              </p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <p className="text-sm text-gray-600 dark:text-gray-400">Total Donations</p>
                              <p className="text-lg font-medium text-green-600 dark:text-green-400">
                                ${user.totalDonations || 0}
                              </p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                              <p className="text-lg font-medium text-gray-900 dark:text-white">
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Favorites Tab */}
                  {activeTab === 'favorites' && (
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                        Favorite Articles
                      </h2>
                      {favorites.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="text-6xl mb-4">❤️</div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No favorites yet
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            Start adding articles to your favorites to see them here!
                          </p>
                        </div>
                      ) : (
                        <div className="grid gap-6 md:grid-cols-2">
                          {favorites.slice(0, 6).map((article, index) => (
                            <ArticleCard key={index} article={article} />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Reading History Tab */}
                  {activeTab === 'history' && (
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                        Reading History
                      </h2>
                      {readingHistory.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="text-6xl mb-4">📚</div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No reading history yet
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            Your reading history will appear here as you browse articles.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {readingHistory.slice(0, 10).map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Read on {new Date(item.readAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Donations Tab */}
                  {activeTab === 'donations' && (
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                        Donation History
                      </h2>
                      <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                              ${user.totalDonations || 0}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">Total Donated</p>
                          </div>
                          <div className="text-4xl">💝</div>
                        </div>
                      </div>

                      {donations.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="text-6xl mb-4">🎁</div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No donations yet
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Support positive journalism by making your first donation!
                          </p>
                          <a
                            href="/donate"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-all duration-300"
                          >
                            Make a Donation
                          </a>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {donations.map((donation, index) => (
                            <div key={index} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  ${donation.amount}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {new Date(donation.date).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-green-500">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Subscription Tab */}
                  {activeTab === 'subscription' && (
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                        Newsletter Subscription
                      </h2>
                      <div className="space-y-6">
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Newsletter Status
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300">
                                {user.subscriptionStatus === 'active' ? 'Subscribed' : 'Not Subscribed'}
                              </p>
                            </div>
                            <div className="text-4xl">📧</div>
                          </div>
                        </div>

                        <div className="p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                            Email Preferences
                          </h4>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={user.subscriptionStatus === 'active'}
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <span className="ml-2 text-gray-700 dark:text-gray-300">
                                Weekly positive news digest
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
