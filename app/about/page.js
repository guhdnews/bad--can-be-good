// app/about/page.js - About page with App Router architecture
import Header from '../../components/Header.js'
import Footer from '../../components/Footer.js'

export const metadata = {
  title: 'About - News Can Be Good',
  description: 'Learn about News Can Be Good - your source for positive news and uplifting stories from around the world.',
  openGraph: {
    title: 'About News Can Be Good',
    description: 'Discover our mission to spread positivity through journalism and uplifting news stories.',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200" style={{ paddingTop: 'var(--header-height)' }}>
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">News Can Be Good</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-200">
              Transforming the way we consume news by focusing on the positive stories that inspire, uplift, and remind us of the good in the world.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Our Story */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">Our Story</h2>
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 transition-colors duration-200">
                <p className="text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  In a world overwhelmed by negative news cycles, News Can Be Good was born from a simple belief:
                  there's more good happening around us than we realize. We created this platform to curate and 
                  share positive news stories that often get overshadowed by sensational headlines.
                </p>
                <p className="text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  Our mission is to provide a daily dose of optimism, showcasing human kindness, scientific 
                  breakthroughs, environmental victories, community triumphs, and heartwarming stories that 
                  remind us why hope matters.
                </p>
              </div>
            </section>

            {/* What We Do */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">What We Do</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-200">Curate Positive News</h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                    We actively search for and curate uplifting news stories from trusted sources around the globe, 
                    ensuring you get a balanced perspective on what's happening in the world.
                  </p>
                </div>
                
                <div>
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-200">Daily Newsletter</h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                    Start your day with positivity by subscribing to our daily newsletter featuring the most 
                    inspiring stories, delivered straight to your inbox every morning.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Values */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Hope</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">Inspiring optimism and belief in a better tomorrow through positive storytelling.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Unity</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">Highlighting stories that bring people together and showcase our shared humanity.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Authenticity</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">Sharing genuine, verified stories that truly make a positive impact.</p>
                </div>
              </div>
            </section>

            {/* Join Our Community */}
            <section className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
              <p className="text-lg mb-6 text-white/90">
                Be part of a growing community that believes in the power of positive news to create meaningful change.
              </p>
              <a 
                href="/#newsletter" 
                className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Subscribe to Our Newsletter
              </a>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}