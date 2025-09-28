// app/page.js - Completely rebuilt homepage with enhanced functionality
import { Suspense } from 'react'
import { getArticlesFromDB } from '../lib/newsUtils.js'
import Header from '../components/Header.js'
import Hero from '../components/Hero.js'
import Newsletter from '../components/Newsletter.js'
import Footer from '../components/Footer.js'
import HomePageClient from './components/HomePageClient'
import FeaturedSection from '../components/FeaturedSection.js'
import StatsSection from '../components/StatsSection.js'

// Metadata for SEO
export const metadata = {
  title: 'News Can Be Good - Spreading Positivity Through Journalism',
  description: 'Discover uplifting news stories that restore faith in humanity. Get your daily dose of positive journalism from around the world.',
  keywords: 'positive news, good news, uplifting stories, inspiring journalism, hope, community',
  openGraph: {
    title: 'News Can Be Good - Positive News That Matters',
    description: 'Daily positive news stories that inspire and uplift. Join our community spreading hope through journalism.',
    type: 'website',
    url: 'https://badcanbegood.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News Can Be Good - Positive News That Matters',
    description: 'Daily positive news stories that inspire and uplift. Join our community spreading hope through journalism.',
  },
  alternates: {
    canonical: 'https://badcanbegood.com',
  },
}

// Loading component for Suspense
function ArticlesLoading() {
  return (
    <div className="animate-pulse">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Server component to fetch articles
async function getArticles() {
  try {
    const articles = await getArticlesFromDB(20)
    // Serialize dates for client components
    return articles.map(article => ({
      ...article,
      pubDate: article.pubDate ? article.pubDate.toISOString() : null,
      createdAt: article.createdAt ? article.createdAt.toISOString() : null
    }))
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

// Main homepage component
export default async function HomePage() {
  const initialArticles = await getArticles()

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <Hero 
        stats={{
          totalArticles: initialArticles.length,
          totalSubscribers: 'Growing',
          dailyReaders: '1K+'
        }}
      />

      {/* Featured Articles Section */}
      <FeaturedSection articles={initialArticles.slice(0, 3)} />

      {/* Stats Section */}
      <StatsSection stats={{
        articles: initialArticles.length,
        sources: '5+ Trusted Sources',
        readers: '1K+ Daily Readers',
        positivity: '100% Positive'
      }} />

      <main className="container mx-auto px-4 py-12">
        {/* All Articles Section */}
        <section id="stories" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ✨ All Positive Stories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover more uplifting news from around the world, carefully curated to spread joy and hope.
            </p>
          </div>
          
          <Suspense fallback={<ArticlesLoading />}>
            <HomePageClient initialArticles={initialArticles} />
          </Suspense>
        </section>

        {/* Newsletter Section */}
        <Newsletter />
      </main>

      <Footer />
    </div>
  )
}
