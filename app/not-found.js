// app/not-found.js - 404 page with App Router
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: '404 - Page Not Found | News Can Be Good',
  description: 'The page you are looking for does not exist. Return to News Can Be Good homepage.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-16" style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>
        <div className="max-w-md mx-auto text-center px-4">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
              <div className="text-6xl font-bold text-gray-300 dark:text-gray-600">404</div>
            </div>
          </div>
          
          {/* Content */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The page you're looking for doesn't exist. But don't worry - there are plenty of positive stories waiting for you on our homepage!
          </p>
          
          {/* Actions */}
          <div className="space-y-4">
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Return Home
            </Link>
            
            <div className="text-center">
              <Link 
                href="/about"
                className="text-primary hover:text-secondary transition-colors font-medium"
              >
                Learn About Us
              </Link>
              <span className="mx-2 text-gray-400">•</span>
              <Link 
                href="/#newsletter"
                className="text-primary hover:text-secondary transition-colors font-medium"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}