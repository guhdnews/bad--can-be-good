// app/contact/page.js - Enhanced contact page with App Router
import Header from '../../components/Header.js'
import Footer from '../../components/Footer.js'
import ContactForm from '../../components/ContactForm.js'

export const metadata = {
  title: 'Contact Us - News Can Be Good',
  description: 'Get in touch with News Can Be Good. Share your positive news stories, feedback, or questions with our team. We\'d love to hear from you!',
  keywords: 'contact, news can be good, positive news, story submission, feedback',
  openGraph: {
    title: 'Contact News Can Be Good',
    description: 'Share your positive stories, feedback, or questions with our team.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="py-16" style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">Connect</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              ☀️ Have a positive story to share? Questions about our mission? We'd love to hear from you and spread more sunshine together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Send us a Message</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              
              <ContactForm />
            </div>

            {/* Contact Info & Additional Content */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-3xl mr-3">📞</span>
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Email Us</h4>
                      <p className="text-gray-600 dark:text-gray-300">hello@newscanbeggood.com</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">We typically respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Response Time</h4>
                      <p className="text-gray-600 dark:text-gray-300">24-48 hours average</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Urgent matters get priority</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Location</h4>
                      <p className="text-gray-600 dark:text-gray-300">Global Team</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Spreading positivity worldwide</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-3xl mr-3">❓</span>
                  Quick Questions
                </h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-yellow-400 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">How can I submit a positive news story?</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Use our contact form with "Story Submission" as the subject and include the story details or link. We love hearing about good news!</p>
                  </div>
                  
                  <div className="border-l-4 border-green-400 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">How often do you publish new stories?</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">We update our site daily with fresh positive news and send weekly newsletter digests to our subscribers.</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-400 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Can I partner with News Can Be Good?</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Absolutely! Contact us with "Partnership Inquiry" to discuss collaboration opportunities and spread more positivity together.</p>
                  </div>
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-8 text-white text-center">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-2xl font-bold mb-4">Stay in the Sunshine Loop!</h3>
                <p className="mb-6 text-white/90 text-lg">
                  Don't miss out on daily doses of positivity. Subscribe to our newsletter for the latest sunshine stories.
                </p>
                <a 
                  href="/#newsletter" 
                  className="inline-flex items-center bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span>Subscribe Now</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}