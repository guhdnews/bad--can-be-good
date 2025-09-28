// pages/index.js - Enhanced modern homepage
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getArticlesFromDB } from '../lib/newsUtils.js';
import Header from '../components/Header.js';
import ArticleCard from '../components/ArticleCard.js';
import Hero from '../components/Hero.js';
import Newsletter from '../components/Newsletter.js';
import Footer from '../components/Footer.js';
import FlashingBanner from '../components/FlashingBanner.js';

export default function Home({ initialArticles }) {
  const router = useRouter();
  const [articles, setArticles] = useState(initialArticles);
  const [filteredArticles, setFilteredArticles] = useState(initialArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Stories', icon: '📰' },
    { id: 'community', name: 'Community', icon: '🤝' },
    { id: 'environment', name: 'Environment', icon: '🌱' },
    { id: 'innovation', name: 'Innovation', icon: '🚀' },
    { id: 'health', name: 'Health', icon: '💚' },
    { id: 'education', name: 'Education', icon: '📚' }
  ];

  // Filter articles based on search and category
  useEffect(() => {
    let filtered = articles;
    
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        article.content.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    
    setFilteredArticles(filtered);
  }, [searchTerm, selectedCategory, articles]);


  const featuredArticle = articles[0];
  // Show fewer articles for cleaner layout: 2-3 on mobile, 6 max on desktop
  const recentArticles = articles.slice(1, 7);

  // Navigate to article
  const handleArticleClick = (article) => {
    if (article.link && article.link !== '#') {
      // Use article proxy to display on-site
      router.push(`/article?url=${encodeURIComponent(article.link)}`);
    }
  };

  return (
    <>
      <Head>
        <title>News Can Be Good - Spreading Positivity Through Journalism</title>
        <meta name="description" content="Discover uplifting news stories that restore faith in humanity. Get your daily dose of positive journalism from around the world." />
        <meta name="keywords" content="positive news, good news, uplifting stories, inspiring journalism, hope, community" />
        <meta property="og:title" content="News Can Be Good - Positive News That Matters" />
        <meta property="og:description" content="Daily positive news stories that inspire and uplift. Join our community spreading hope through journalism." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://badcanbegood.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://badcanbegood.com" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
        <Header />
        
        {/* Flashing Banner */}
        <FlashingBanner />
        
        {/* Hero Section */}
        <Hero 
          stats={{
            totalArticles: articles.length,
            totalSubscribers: 'Growing'
          }}
        />

        <main className="container mx-auto px-4 py-12">
          {/* Search and Filter Section */}
          <div className="mb-12">
            <div className="max-w-4xl mx-auto">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search positive stories..."
                    className="block w-full pl-10 pr-3 py-4 border border-gray-200 dark:border-gray-600 rounded-xl leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm text-lg text-gray-900 dark:text-white transition-colors duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/10 hover:text-primary dark:hover:text-primary shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Article */}
          {featuredArticle && (
            <div className="mb-16">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Featured Story
                  </span>
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-1/2">
                      {featuredArticle.imageUrl ? (
                        <img 
                          className="h-64 md:h-full w-full object-cover" 
                          src={featuredArticle.imageUrl} 
                          alt={featuredArticle.title}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop';
                          }}
                        />
                      ) : (
                        <div className="h-64 md:h-full w-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center">
                          <div className="text-center text-white">
                            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                            </svg>
                            <p className="text-lg font-semibold">Good News</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-8 md:w-1/2 flex flex-col justify-center">
                      <div className="uppercase tracking-wide text-sm text-primary font-semibold mb-2">
                        {featuredArticle.source || 'Positive News'}
                      </div>
                      <h3 
                        className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight cursor-pointer hover:text-primary transition-colors duration-200"
                        onClick={() => handleArticleClick(featuredArticle)}
                      >
                        {featuredArticle.title}
                      </h3>
                      <p 
                        className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                        onClick={() => handleArticleClick(featuredArticle)}
                      >
                        {featuredArticle.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {featuredArticle.pubDate ? new Date(featuredArticle.pubDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : 'Recently'}
                        </span>
                        {featuredArticle.link && featuredArticle.link !== '#' && (
                          <a 
                            href={featuredArticle.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                          >
                            Read Full Story
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Articles Grid */}
          <div className="mb-16">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                More Positive Stories
                {searchTerm && (
                  <span className="block text-lg font-normal text-gray-600 dark:text-gray-400 mt-2">
                    {filteredArticles.length} results for "{searchTerm}"
                  </span>
                )}
              </h2>
              
              {filteredArticles.length === 0 ? (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="mb-6">
                      <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No stories found</h3>
                    <p className="text-gray-600 mb-6">
                      {searchTerm ? "Try adjusting your search or browse all categories" : "New positive stories are automatically added throughout the day. Check back soon!"}
                    </p>
                    <div className="space-y-4">
                      {searchTerm && (
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('all');
                          }}
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Show All Stories
                        </button>
                      )}
                      <div className="text-center">
                        <a
                          href="/#newsletter"
                          className="inline-flex items-center text-primary hover:text-secondary transition-colors font-medium"
                        >
                          Subscribe to get notified of new stories
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Responsive grid with article limits */}
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Mobile: show 3 articles, Desktop: show 6 articles */}
                    {filteredArticles.slice(0, 6).map((article, index) => {
                      // Hide articles beyond mobile limit on small screens
                      const hiddenOnMobile = index >= 3 ? 'hidden sm:block' : '';
                      return (
                        <div key={index} className={hiddenOnMobile}>
                          <ArticleCard article={article} onArticleClick={handleArticleClick} />
                        </div>
                      );
                    })}
                  </div>
                  
                  {filteredArticles.length > 6 && (
                    <div className="text-center mt-12">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Showing 6 of {filteredArticles.length} articles
                      </p>
                      <button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                        View All Articles
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Newsletter Section */}
          <Newsletter />
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const articles = await getArticlesFromDB(20);
    // Convert Date objects to strings for JSON serialization
    const serializedArticles = articles.map(article => ({
      ...article,
      pubDate: article.pubDate ? article.pubDate.toISOString() : null,
      createdAt: article.createdAt ? article.createdAt.toISOString() : null
    }));
    
    return { 
      props: { 
        initialArticles: serializedArticles || []
      } 
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        initialArticles: []
      }
    };
  }
}
