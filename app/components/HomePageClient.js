// app/components/HomePageClient.js - Client-side interactive components
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import EditorialArticleCard from '../../components/ui/editorial/ArticleCard.tsx'

export default function HomePageClient({ initialArticles }) {
  const router = useRouter()
  const [articles, setArticles] = useState(initialArticles)
  const [filteredArticles, setFilteredArticles] = useState(initialArticles)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Stories', icon: '📰' },
    { id: 'community', name: 'Community', icon: '🤝' },
    { id: 'environment', name: 'Environment', icon: '🌱' },
    { id: 'innovation', name: 'Innovation', icon: '🚀' },
    { id: 'health', name: 'Health', icon: '💚' },
    { id: 'education', name: 'Education', icon: '📚' }
  ]

  // Filter articles based on search and category
  useEffect(() => {
    let filtered = articles
    
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        article.content.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    }
    
    setFilteredArticles(filtered)
  }, [searchTerm, selectedCategory, articles])

  const featuredArticle = articles[0]
  const recentArticles = articles.slice(1, 7)

  // Navigate to article
  const handleArticleClick = (article) => {
    if (article.link && article.link !== '#') {
      // Use article proxy to display on-site
      router.push(`/article?url=${encodeURIComponent(article.link)}`)
    }
  }

  return (
    <>
      {/* Editorial Search and Filter Section */}
      <div className="mb-12 border-b border-editorial-border pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-editorial-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search positive stories..."
                className="block w-full pl-12 pr-4 py-4 border-2 border-editorial-border rounded-lg leading-5 bg-editorial-bg placeholder-editorial-muted focus:outline-none focus:ring-2 focus:ring-editorial-primary focus:border-editorial-primary shadow-sm text-lg text-editorial-text transition-all duration-200 font-mono"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter - Editorial Style */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border font-mono ${
                  selectedCategory === category.id
                    ? 'bg-editorial-primary text-white border-editorial-primary shadow-editorial'
                    : 'bg-editorial-bg text-editorial-text border-editorial-border hover:border-editorial-primary hover:text-editorial-primary hover:shadow-sm'
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
                        e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop'
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
          <div className="text-center mb-8">
            <h2 className="editorial-headline text-3xl mb-4">
              Latest Stories
            </h2>
            {searchTerm && (
              <p className="editorial-caption">
                {filteredArticles.length} results for "{searchTerm}"
              </p>
            )}
          </div>
          
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="mb-8">
                  <div className="w-24 h-24 mx-auto bg-editorial-bg-secondary border-2 border-editorial-border rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-editorial-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                    </svg>
                  </div>
                </div>
                <h3 className="editorial-subheadline text-xl mb-4">No stories found</h3>
                <p className="editorial-body text-base mb-8">
                  {searchTerm ? "Try adjusting your search or browse all categories" : "New positive stories are automatically added throughout the day. Check back soon!"}
                </p>
                <div className="space-y-4">
                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm('')
                        setSelectedCategory('all')
                      }}
                      className="editorial-button-primary inline-flex items-center hover:shadow-editorial transition-all duration-300"
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
                      className="inline-flex items-center text-editorial-primary hover:text-editorial-secondary transition-colors font-medium"
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
              {/* Editorial Article Grid */}
              <div className="space-y-8">
                {/* Featured Article */}
                {filteredArticles.length > 0 && (
                  <div className="mb-12">
                    <EditorialArticleCard 
                      article={filteredArticles[0]} 
                      onArticleClick={handleArticleClick}
                      variant="featured"
                    />
                  </div>
                )}
                
                {/* Article Grid */}
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                  {filteredArticles.slice(1, 9).map((article, index) => (
                    <div key={index} className="animate-slide-in-view">
                      <EditorialArticleCard 
                        article={article} 
                        onArticleClick={handleArticleClick}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {filteredArticles.length > 9 && (
                <div className="text-center mt-12 pt-8 border-t border-editorial-border">
                  <p className="editorial-caption mb-4">
                    Showing 8 of {filteredArticles.length} articles
                  </p>
                  <button className="editorial-button-secondary hover:bg-editorial-primary hover:text-white transition-all duration-300">
                    Load More Stories
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}