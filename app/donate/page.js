// app/donate/page.js - Donate page with App Router architecture and sunshine theme
import Header from '../../components/Header.js'
import Footer from '../../components/Footer.js'

export const metadata = {
  title: 'Support Our Mission - News Can Be Good',
  description: 'Support News Can Be Good in spreading sunshine through positive journalism. Your donation helps us continue bringing uplifting news to the world.',
  openGraph: {
    title: 'Support Our Mission - News Can Be Good',
    description: 'Help us spread sunshine through positive journalism by supporting our mission to bring uplifting news to the world.',
    type: 'website',
  },
}

export default function DonatePage() {
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
            Support Our Mission
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-md">
            💝 Help us spread sunshine through positive journalism and bring more uplifting news to the world
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
        {/* Why Support Us */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 border border-orange-100 dark:border-gray-700 transition-colors duration-200">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 transition-colors duration-200">
              🌟 Why Your Support Matters
            </h2>
            <div className="space-y-6">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-200">
                In a world overwhelmed by negative news, your support helps us maintain a beacon of positivity. 
                Every donation directly contributes to our ability to curate, verify, and share uplifting stories 
                that inspire hope and celebrate the good in humanity.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-200">
                With your help, we can continue to spread sunshine through journalism, reaching more people 
                who need a daily dose of positivity in their lives.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 transition-colors duration-200">
            🌞 Your Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-yellow-100 dark:border-gray-700 text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">$10</h3>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-200">Sunshine Supporter</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-200">
                Helps us curate and share 50 positive stories to brighten people's days
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-orange-100 dark:border-gray-700 text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">$25</h3>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-200">Hope Ambassador</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-200">
                Powers our newsletter for 1,000 subscribers for a full week of positivity
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-amber-100 dark:border-gray-700 text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">☀️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">$50+</h3>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-200">Sunshine Champion</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-200">
                Enables new features and helps us expand our reach to spread more sunshine worldwide
              </p>
            </div>
          </div>
        </section>

        {/* Donation Options */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-yellow-100 via-orange-100 to-amber-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 transition-colors duration-200 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8 transition-colors duration-200">
              💖 Choose Your Sunshine Contribution
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* One-time Donation */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-colors duration-200">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center transition-colors duration-200">
                  One-Time Support
                </h3>
                <div className="space-y-4 mb-6">
                  {[10, 25, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      className="w-full py-3 px-6 border-2 border-orange-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-gray-700 transition-all duration-200 font-semibold"
                    >
                      ${amount}
                    </button>
                  ))}
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Custom amount"
                      className="w-full py-3 px-6 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors duration-200"
                    />
                    <span className="absolute left-4 top-3 text-gray-500 dark:text-gray-400">$</span>
                  </div>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Donate Now ☀️
                </button>
              </div>

              {/* Monthly Support */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-colors duration-200 border-2 border-orange-200 dark:border-orange-500">
                <div className="text-center mb-4">
                  <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    Most Popular ⭐
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center transition-colors duration-200">
                  Monthly Sunshine
                </h3>
                <div className="space-y-4 mb-6">
                  {[5, 10, 20, 35].map((amount) => (
                    <button
                      key={amount}
                      className="w-full py-3 px-6 border-2 border-orange-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-gray-700 transition-all duration-200 font-semibold"
                    >
                      ${amount}/month
                    </button>
                  ))}
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Custom monthly"
                      className="w-full py-3 px-6 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors duration-200"
                    />
                    <span className="absolute left-4 top-3 text-gray-500 dark:text-gray-400">$</span>
                    <span className="absolute right-4 top-3 text-gray-500 dark:text-gray-400">/mo</span>
                  </div>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Start Monthly Support 🌟
                </button>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                  Cancel anytime • Secure payments
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Other Ways to Help */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 transition-colors duration-200">
            🤝 Other Ways to Spread Sunshine
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-yellow-100 dark:border-gray-700 text-center transition-colors duration-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📢</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Share Our Stories</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">
                Help spread positivity by sharing our articles on social media
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-orange-100 dark:border-gray-700 text-center transition-colors duration-200">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">✍️</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Submit Good News</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">
                Know of a positive story? Send it our way and help us discover more sunshine
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-gray-700 text-center transition-colors duration-200">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Join Our Community</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">
                Follow us and engage with our content to build a positive community
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-amber-100 dark:border-gray-700 text-center transition-colors duration-200">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📰</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Subscribe & Share</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">
                Subscribe to our newsletter and encourage others to join too
              </p>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 border border-orange-100 dark:border-gray-700 transition-colors duration-200 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">
              🔒 Complete Transparency
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-200">
              <p className="text-lg">
                Your donations go directly toward maintaining our website, curating quality content, 
                and expanding our reach to spread more positive news around the world.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">60%</div>
                  <div className="text-sm">Content Curation & Research</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">25%</div>
                  <div className="text-sm">Website & Technology</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">15%</div>
                  <div className="text-sm">Operations & Growth</div>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                We are committed to using your donations responsibly and transparently. ☀️
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}