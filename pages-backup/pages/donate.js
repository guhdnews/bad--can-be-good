import Head from 'next/head';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

export default function Donate() {
  return (
    <>
      <Head>
        <title>Support Our Mission - News Can Be Good</title>
        <meta name="description" content="Help us spread positivity by supporting ad-free, authentic positive news coverage." />
      </Head>
      
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">
              Support <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Positive News</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-200">
              Help us keep spreading hope and positivity through authentic journalism, completely ad-free.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Why Support Us */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">Why Your Support Matters</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Ad-Free Experience</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">Your donations keep our platform completely free from advertisements, ensuring authentic, unbiased positive news.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Faster Updates</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">Support helps us improve our technology to bring you the latest positive news faster and more reliably.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Global Impact</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">Every contribution helps us reach more people worldwide, spreading hope and positive stories to those who need them most.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Donation Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">Make a Contribution</h2>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-200">
                  Your support helps us maintain our mission of spreading positivity through authentic journalism.
                </p>
                
                <div className="flex justify-center mb-6">
                  <form action="https://www.paypal.com/donate" method="post" target="_top">
                    <input type="hidden" name="hosted_button_id" value="MBF7NQU55ZL7L" />
                    <button 
                      type="submit" 
                      className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm1.659-3.943L7.939 19.02c-.042.268.178.49.442.49h2.826c.626 0 1.148-.456 1.244-1.077l.091-.578c.045-.286.254-.521.541-.608.78-.237 1.829-.755 2.204-2.549.324-1.555-.532-2.379-2.2-2.379-.302 0-.617.018-.955.054a4.71 4.71 0 0 1-.405.018c-.3 0-.545-.227-.582-.525-.044-.357.19-.67.543-.748.353-.078.728-.12 1.125-.127 1.898-.034 3.84 1.2 3.427 4.064-.453 3.155-2.31 4.47-5.427 4.47H5.898a1.326 1.326 0 0 1-1.31-1.577L6.81 4.07c.078-.495.515-.87 1.02-.87h7.46c1.98 0 3.24.43 3.86 1.238.687.897.687 2.07.127 3.609-.056.154-.116.309-.18.465-.983 2.42-2.794 3.45-5.427 3.45H10.32c-.524 0-.968.382-1.05.9l-.535 3.394z" />
                      </svg>
                      <span>Donate via PayPal</span>
                    </button>
                  </form>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  Secure payment powered by PayPal. Your information is protected.
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-200">Other Ways to Support</h4>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Share our stories on social media</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Subscribe to our newsletter</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Recommend us to friends and family</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thank You Section */}
          <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Thank You for Your Support!</h3>
            <p className="text-lg text-white/90">
              Every contribution, no matter the size, helps us continue our mission of spreading hope and positivity through authentic journalism.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
