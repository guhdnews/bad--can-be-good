// app/privacy/page.js - Privacy Policy page with App Router architecture and sunshine theme
import Header from '../../components/Header.js'
import Footer from '../../components/Footer.js'

export const metadata = {
  title: 'Privacy Policy - News Can Be Good',
  description: 'Learn how News Can Be Good protects your privacy and handles your personal information in our sunshine-focused news community.',
  openGraph: {
    title: 'Privacy Policy - News Can Be Good',
    description: 'We respect your privacy and are committed to protecting your personal information while spreading sunshine through positive news.',
    type: 'website',
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <Header />
      
      <main className="min-h-screen transition-colors duration-200" style={{ paddingTop: 'var(--header-height)' }}>
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-200">
              🔒 We respect your privacy and are committed to protecting your personal information while we spread sunshine through positive news.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 transition-colors duration-200">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-orange-100 dark:border-gray-700 space-y-10 transition-colors duration-200">
            
            <section>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Information We Collect</h2>
              </div>
              <div className="ml-16">
                <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-200">
                  We collect information you provide directly to us when spreading sunshine through our positive news community:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 transition-colors duration-200">
                  <li>Subscribe to our sunshine newsletter</li>
                  <li>Contact us through our contact form</li>
                  <li>Create an account to join our positive community</li>
                  <li>Interact with our website and articles</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4 transition-colors duration-200">
                  This information may include your name, email address, and any messages you send us.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">How We Use Your Information</h2>
              </div>
              <div className="ml-16">
                <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-200">
                  We use your information to brighten your day and enhance our sunshine community:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 transition-colors duration-200">
                  <li>Send you our newsletter with positive news updates ☀️</li>
                  <li>Respond to your inquiries and provide helpful support</li>
                  <li>Improve our website and spread more sunshine</li>
                  <li>Send you important notices about our service</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Information Sharing</h2>
              </div>
              <div className="ml-16">
                <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-200">
                  We protect your information like sunshine—we don't sell, trade, or transfer your personal information to third parties except:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 transition-colors duration-200">
                  <li>With your explicit consent</li>
                  <li>To trusted service providers who help us spread positive news</li>
                  <li>When required by law or to protect our community's safety</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Data Security</h2>
              </div>
              <div className="ml-16">
                <p className="text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  We implement strong security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. However, no method of 
                  transmission over the Internet or electronic storage is 100% secure—but we work as 
                  hard as sunshine works to brighten the world.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🍪</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Cookies and Tracking</h2>
              </div>
              <div className="ml-16">
                <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-200">
                  Our website may use cookies and similar tracking technologies to improve your browsing experience 
                  and help us deliver more sunshine to your day. You can control cookies through your browser settings.
                </p>
                <p className="text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  We may also use analytics services to understand how visitors interact with our website, 
                  which helps us improve our content and spread even more positivity.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Your Rights</h2>
              </div>
              <div className="ml-16">
                <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-200">
                  You have the right to control your information in our sunshine community:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 transition-colors duration-200">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Unsubscribe from our newsletter at any time (though we'd miss you!) ☀️</li>
                  <li>Object to certain processing of your information</li>
                </ul>
                <div className="mt-4 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-gray-700 dark:to-gray-600 rounded-lg transition-colors duration-200">
                  <p className="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-200">
                    📧 To exercise these rights, please contact us at: <span className="text-orange-600 dark:text-orange-400">hello@badcanbegood.com</span>
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📬</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Newsletter Subscriptions</h2>
              </div>
              <div className="ml-16">
                <p className="text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  When you subscribe to our sunshine newsletter, we will only send you content related to positive news 
                  and updates about our service. You can unsubscribe at any time by clicking the unsubscribe 
                  link in our emails or by contacting us directly. We promise to only send sunshine, not spam! ☀️
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">👶</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Children's Privacy</h2>
              </div>
              <div className="ml-16">
                <p className="text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  Our website is not intended for children under 13 years of age. We do not knowingly 
                  collect personal information from children under 13. If you are a parent and believe 
                  your child has provided us with personal information, please contact us and we'll address it promptly.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Changes to This Policy</h2>
              </div>
              <div className="ml-16">
                <p className="text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  We may update this Privacy Policy from time to time to keep it as bright and current as sunshine. 
                  We will notify you of any changes by posting the new Privacy Policy on this page and updating the 
                  "Last updated" date at the top of this policy.
                </p>
              </div>
            </section>

            {/* Contact Section */}
            <section className="bg-gradient-to-r from-yellow-100 via-orange-100 to-amber-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8 transition-colors duration-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📞</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Contact Us</h2>
              </div>
              <div className="ml-16">
                <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-200">
                  If you have any questions about this Privacy Policy, please contact us—we're here to help spread sunshine and clarity:
                </p>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-colors duration-200">
                  <div className="space-y-2">
                    <p className="text-gray-700 dark:text-gray-300 transition-colors duration-200">
                      <span className="font-semibold">Email:</span> <span className="text-orange-600 dark:text-orange-400">hello@badcanbegood.com</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 transition-colors duration-200">
                      <span className="font-semibold">Subject:</span> Privacy Policy Inquiry
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-200">
                      We'll respond as quickly as sunshine breaks through morning clouds! ☀️
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-orange-100 dark:border-gray-700 transition-colors duration-200">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">
                Ready to Join Our Sunshine Community? ☀️
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-200">
                Subscribe to our newsletter and start your day with positive news that brightens your world.
              </p>
              <a 
                href="/#newsletter"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Subscribe to Our Newsletter
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}