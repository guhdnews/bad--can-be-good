// app/article/page.js - Article display page with App Router
import { Suspense } from 'react'
import Header from '../../components/Header.js'
import Footer from '../../components/Footer.js'
import Article from '../../components/Article.js'

export const metadata = {
  title: 'Article - News Can Be Good',
  description: 'Read positive news stories that inspire and uplift.',
}

// Loading component
function ArticleLoading() {
  return (
    <div className="animate-pulse max-w-4xl mx-auto px-4 py-8">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
      <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      </div>
    </div>
  )
}

export default function ArticlePage({ searchParams }) {
  const articleUrl = searchParams.url

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <Header />
      
      <main className="container mx-auto px-4 py-8" style={{ paddingTop: 'var(--header-height)' }}>
        <Suspense fallback={<ArticleLoading />}>
          <Article url={articleUrl} />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}