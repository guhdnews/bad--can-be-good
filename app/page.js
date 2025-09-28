// app/page.js - Editorial-themed homepage with world-class design
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

// Editorial-themed loading component
function ArticlesLoading() {
  return (
    <div className="editorial-container">
      <div className="editorial-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="editorial-card animate-pulse">
            <div className="h-48 shimmer-loading rounded-t-lg"></div>
            <div className="p-6">
              <div className="h-3 shimmer-loading rounded mb-3"></div>
              <div className="h-6 shimmer-loading rounded mb-4"></div>
              <div className="h-4 shimmer-loading rounded mb-2"></div>
              <div className="h-4 shimmer-loading rounded w-3/4"></div>
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
    <div className="min-h-screen bg-editorial-bg text-editorial-text transition-colors duration-300">
      <Header />
      
      {/* Hero Section - Editorial Style */}
      <section className="hero-section bg-gradient-to-b from-editorial-bg to-editorial-bg-secondary border-b border-editorial-border">
        <div className="editorial-container py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="editorial-headline text-5xl md:text-7xl mb-8 animate-fade-in">
              The News <span className="text-editorial-primary">Can Be Good</span>
            </h1>
            <p className="editorial-body text-xl md:text-2xl mb-12 text-editorial-text-muted animate-fade-in">
              World-class journalism focused on stories that inspire, uplift, and restore faith in humanity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
              <a href="#stories" className="editorial-button-primary px-8 py-4 text-lg">
                Read Today's Stories
              </a>
              <div className="flex items-center space-x-6 text-editorial-muted">
                <span className="flex items-center">
                  <span className="text-2xl font-bold text-editorial-primary mr-2">{initialArticles.length}</span>
                  <span className="text-sm">Stories Today</span>
                </span>
                <span className="flex items-center">
                  <span className="text-2xl font-bold text-editorial-primary mr-2">1K+</span>
                  <span className="text-sm">Daily Readers</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breaking News Banner */}
      <div className="breaking-news text-center py-2">
        <span className="inline-flex items-center space-x-2">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          <span className="font-bold">LIVE UPDATES</span>
          <span>Fresh positive stories added daily</span>
        </span>
      </div>

      {/* Featured Story Section */}
      {initialArticles.length > 0 && (
        <section className="py-16 bg-editorial-bg-secondary border-b border-editorial-border">
          <div className="editorial-container">
            <div className="text-center mb-12">
              <h2 className="editorial-headline text-4xl mb-4">Featured Story</h2>
              <div className="w-24 h-1 bg-editorial-highlight mx-auto"></div>
            </div>
            <FeaturedSection articles={initialArticles.slice(0, 1)} />
          </div>
        </section>
      )}

      {/* Main Content Grid */}
      <main className="editorial-container py-16">
        <div className="editorial-grid">
          {/* Main Articles */}
          <div className="editorial-main">
            <section id="stories">
              <div className="border-b border-editorial-border mb-8 pb-4">
                <h2 className="editorial-headline text-3xl mb-2">Latest Stories</h2>
                <p className="editorial-caption">Curated positive journalism from trusted sources worldwide</p>
              </div>
              
              <Suspense fallback={<ArticlesLoading />}>
                <HomePageClient initialArticles={initialArticles} />
              </Suspense>
            </section>
          </div>

          {/* Editorial Sidebar */}
          <div className="editorial-sidebar">
            {/* Newsletter */}
            <div className="editorial-card p-8">
              <h3 className="editorial-subheadline text-xl mb-4">Daily Good News</h3>
              <p className="editorial-caption mb-6">Get the best positive stories delivered to your inbox every morning.</p>
              <Newsletter />
            </div>

            {/* Stats Card */}
            <div className="editorial-card p-8">
              <h3 className="editorial-subheadline text-xl mb-4">Impact</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="editorial-caption">Stories Published</span>
                  <span className="font-bold text-editorial-primary">{initialArticles.length}+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="editorial-caption">Trusted Sources</span>
                  <span className="font-bold text-editorial-primary">5+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="editorial-caption">Daily Readers</span>
                  <span className="font-bold text-editorial-primary">1K+</span>
                </div>
                <div className="flex justify-between items-center border-t border-editorial-border pt-4 mt-4">
                  <span className="editorial-caption">Positivity Rate</span>
                  <span className="font-bold text-editorial-highlight">100%</span>
                </div>
              </div>
            </div>

            {/* Recent Articles Sidebar */}
            {initialArticles.length > 3 && (
              <div className="editorial-card p-8">
                <h3 className="editorial-subheadline text-xl mb-4">More Headlines</h3>
                <div className="space-y-4">
                  {initialArticles.slice(3, 8).map((article, index) => (
                    <div key={index} className="border-b border-editorial-border pb-3 last:border-b-0">
                      <h4 className="font-semibold text-sm leading-tight mb-1 hover:text-editorial-primary cursor-pointer transition-colors">
                        {article.title}
                      </h4>
                      <p className="editorial-caption text-xs">
                        {article.source || 'Editorial'} • {new Date(article.pubDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
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
