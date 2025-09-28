import Link from 'next/link';
import Head from 'next/head';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found - News Can Be Good</title>
        <meta name="description" content="Sorry, the page you're looking for doesn't exist, but there's still plenty of good news to discover!" />
      </Head>
      
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
              404
            </div>
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! This page got lost
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            But don't worry - there's still plenty of good news to discover!
          </p>
          <p className="text-gray-500 mb-8">
            The page you're looking for doesn't exist, but our homepage is full of positive stories waiting for you.
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Go to Homepage
            </Link>
            
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/about" className="text-primary hover:text-secondary transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-primary hover:text-secondary transition-colors">
                Contact
              </Link>
              <Link href="/#newsletter" className="text-primary hover:text-secondary transition-colors">
                Newsletter
              </Link>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">While you're here...</h3>
            <p className="text-gray-600 text-sm">
              Did you know that reading positive news can improve your mood and outlook on life? 
              Subscribe to our newsletter for daily doses of good news!
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
