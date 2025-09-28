'use client'

// components/FeaturedSection.js - Featured articles showcase
import { useRouter } from 'next/navigation'
import { optimizeImageUrl } from '../lib/imageUtils'

export default function FeaturedSection({ articles = [] }) {
  const router = useRouter()

  const handleArticleClick = (article) => {
    if (article.link && article.link !== '#') {
      router.push(`/article?url=${encodeURIComponent(article.link)}`)
    }
  }

  if (!articles.length) return null

  const featuredArticle = articles[0]
  const sideArticles = articles.slice(1, 3)

  return (
    <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ☀️ Today's Sunshine Stories
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Handpicked stories that will brighten your day and restore your faith in humanity.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            <article 
              className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700"
              onClick={() => handleArticleClick(featuredArticle)}
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src={featuredArticle.imageUrl || optimizeImageUrl('https://images.unsplash.com/photo-1506905925346-21bda4d32df4')}
                  alt={featuredArticle.title}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Source Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-400 text-yellow-900">
                    ⭐ Featured Story
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-sm font-medium text-yellow-200 mb-2">
                    {featuredArticle.source || 'Positive News'}
                  </div>
                  <h3 className="text-2xl font-bold leading-tight mb-3 group-hover:text-yellow-200 transition-colors">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-gray-200 line-clamp-2 text-sm leading-relaxed">
                    {featuredArticle.content}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-gray-300">
                      {featuredArticle.pubDate ? new Date(featuredArticle.pubDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric'
                      }) : 'Today'}
                    </span>
                    <div className="flex items-center text-yellow-200 text-sm font-medium">
                      Read Story
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Side Articles */}
          <div className="space-y-6">
            {sideArticles.map((article, index) => (
              <article 
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 dark:border-gray-700"
                onClick={() => handleArticleClick(article)}
              >
                <div className="flex">
                  <div className="flex-shrink-0 w-24 h-24 relative overflow-hidden">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                      src={article.imageUrl || optimizeImageUrl('https://images.unsplash.com/photo-1441974231531-c6227db76b6e')}
                      alt={article.title}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&q=80'
                      }}
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="text-xs text-primary font-medium mb-1">
                      {article.source || 'Positive News'}
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                      {article.content}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {article.pubDate ? new Date(article.pubDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        }) : 'Today'}
                      </span>
                      <svg className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}