// app/mission/page.js - Our Mission page with App Router architecture and sunshine theme
import Header from '../../components/Header.js'
import Footer from '../../components/Footer.js'

export const metadata = {
  title: 'Our Mission - News Can Be Good',
  description: 'Learn about our mission to spread happiness through positive journalism and counter negativity bias in media with sunshine-inspired news.',
  openGraph: {
    title: 'Our Mission - News Can Be Good',
    description: 'Spreading happiness through journalism by curating positive stories that inspire hope and celebrate human kindness.',
    type: 'website',
  },
}

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 py-20 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-white bg-opacity-10" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }} />
        <div className="relative container mx-auto px-4 text-center" style={{ paddingTop: 'var(--header-height)' }}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Our Mission
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-md">
            ☀️ To spread sunshine through journalism by curating positive stories that inspire hope, celebrate human kindness, and showcase the good happening in our world every day.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
          <div className="w-72 h-72 bg-yellow-400/40 rounded-full blur-3xl" />
        </div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
          <div className="w-72 h-72 bg-orange-400/40 rounded-full blur-3xl" />
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        {/* Mission Statement */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 border border-orange-100 dark:border-gray-700 transition-colors duration-200 hover:shadow-2xl transition-shadow">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 transition-colors duration-200">
              🌟 Why We Exist
            </h2>
            <div className="space-y-6">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-200">
                In a world where negative news dominates headlines, we believe there's a crucial need for balance. 
                Research shows that consuming too much negative media can impact mental health, create anxiety, 
                and distort our perception of reality.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-200">
                News Can Be Good exists to counteract this negativity bias by highlighting the countless positive 
                stories that often go unnoticed. We don't ignore the world's challenges, but we choose to focus 
                on solutions, progress, and the inherent goodness in humanity.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 transition-colors duration-200">
            🌞 Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-yellow-100 dark:border-gray-700 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">Authenticity</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-200">
                Every story we share is real, verified, and genuinely positive. No fake news, no exaggeration—just authentic good news that brightens your day.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-orange-100 dark:border-gray-700 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">Impact</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-200">
                We curate stories that not only make you smile but inspire action, foster hope, and create positive change in communities worldwide.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-amber-100 dark:border-gray-700 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">Global Perspective</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-200">
                Positive news happens everywhere. We share uplifting stories from around the world, celebrating our shared humanity and global sunshine.
              </p>
            </div>
          </div>
        </section>

        {/* The Science Behind Positive News */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-yellow-100 via-orange-100 to-amber-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 transition-colors duration-200 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8 transition-colors duration-200">
              🧠 The Science Behind Sunshine News
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-200">
                  Mental Health Benefits ☀️
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-3 mt-1 text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 transition-colors duration-200">Reduces anxiety and stress levels significantly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-3 mt-1 text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 transition-colors duration-200">Improves overall mood and daily outlook</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-3 mt-1 text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 transition-colors duration-200">Increases feelings of hope and optimism</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3 mt-1 text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 transition-colors duration-200">Promotes prosocial behavior and empathy</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-200">
                  Social Impact 🌟
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-3 mt-1 text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 transition-colors duration-200">Inspires community engagement and participation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-3 mt-1 text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 transition-colors duration-200">Encourages volunteer activities and giving</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-3 mt-1 text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 transition-colors duration-200">Builds trust in humanity and institutions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3 mt-1 text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 transition-colors duration-200">Creates ripple effects of kindness worldwide</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 border border-orange-100 dark:border-gray-700 transition-colors duration-200">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">
              🚀 Join Our Sunshine Mission
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed transition-colors duration-200">
              Help us spread happiness through journalism. Subscribe to our newsletter and be part of a community that believes news can indeed be good—and as bright as sunshine!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/#newsletter"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-yellow-500 hover:to-orange-600"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Subscribe to Newsletter
              </a>
              <a 
                href="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-orange-500 text-orange-600 dark:text-orange-400 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.418 8-9.899 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.418-8 9.899-8s9.899 3.582 9.899 8z" />
                </svg>
                Get In Touch
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}