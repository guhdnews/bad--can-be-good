// pages/article.js - Display proxied articles on-site with attribution
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ArticlePage() {
  const router = useRouter();
  const { url } = router.query;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (url) {
      fetchArticle();
    }
  }, [url]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`/api/article-proxy?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      if (data.success) {
        setArticle(data.article);
      } else {
        setError(data.message || 'Failed to load article');
      }
    } catch (err) {
      setError('Unable to load article. Please try again later.');
      console.error('Article fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Article - NCBG</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <Header />
          <main className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-8"></div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Loading Article...</h1>
              <p className="text-gray-600 dark:text-gray-400">Please wait while we fetch the content for you.</p>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Article Not Found - NCBG</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <Header />
          <main className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-24 mx-auto mb-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Unable to Load Article</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">{error}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={fetchArticle}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Back to Home
                </button>
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Original
                  </a>
                )}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{article?.title ? `${article.title} - NCBG` : 'Article - NCBG'}</title>
        <meta name="description" content={article?.content?.substring(0, 160) || 'Read positive news on NCBG'} />
        {article?.image && <meta property="og:image" content={article.image} />}
        <meta property="og:title" content={article?.title || 'Article'} />
        <meta property="og:description" content={article?.content?.substring(0, 160) || ''} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />

        <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Article Header */}
            <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              
              {/* Attribution Banner - Mobile Optimized */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800 px-3 sm:px-6 py-2 sm:py-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-1 sm:space-x-2 text-blue-800 dark:text-blue-400 text-xs sm:text-sm">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span className="truncate">Originally from <strong>{article?.sourceDomain}</strong></span>
                  </div>
                  <a
                    href={article?.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-xs sm:text-sm flex-shrink-0"
                  >
                    View Original →
                  </a>
                </div>
              </div>

              {/* Featured Image */}
              {article?.image && (
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={article.image}
                    alt={article?.title}
                    className="w-full h-96 object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Article Content - Mobile Optimized */}
              <div className="p-4 sm:p-6 lg:p-8">
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
                  {article?.title}
                </h1>

                {/* Meta Information - Simplified for Mobile */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-700">
                  {article?.author && (
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>By {article.author}</span>
                    </div>
                  )}
                  {article?.publishDate && (
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="hidden sm:inline">{new Date(article.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                      <span className="sm:hidden">{new Date(article.publishDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span>{Math.ceil(article?.content?.split(' ').length / 200)} min read</span>
                  </div>
                </div>

                {/* Article Body - Mobile Optimized */}
                <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
                  <div className="text-gray-800 dark:text-gray-200 leading-relaxed text-base sm:text-lg whitespace-pre-wrap break-words">
                    {article?.content}
                  </div>
                </div>

                {/* Call to Action - Mobile Optimized */}
                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-4 sm:p-6 text-center">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                      Enjoyed this positive story? ✨
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                      Support our mission to spread positive news.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                      <a
                        href="/#newsletter"
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base"
                      >
                        Subscribe for More
                      </a>
                      <a
                        href="/donate"
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
                      >
                        Support Our Mission
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Back to Home - Mobile Optimized */}
            <div className="mt-6 sm:mt-8 text-center">
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m0 7h18" />
                </svg>
                <span className="hidden sm:inline">Back to More Positive Stories</span>
                <span className="sm:hidden">Back to Stories</span>
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
