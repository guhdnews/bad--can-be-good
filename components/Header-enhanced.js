// components/Header-enhanced.js - Modern responsive header
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Mission', href: '/mission' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-primary/20">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    News Can Be Good
                  </h1>
                  <p className="text-sm text-happiness-dark/60 hidden sm:block font-medium">Spreading happiness through journalism</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden ml-10 space-x-8 lg:block">
            {navigation.map((link) => (
              <Link key={link.name} href={link.href}>
                <span className="text-base font-medium text-happiness-dark hover:text-primary transition-colors duration-200 cursor-pointer">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/quiz">
              <span className="inline-flex items-center rounded-lg border border-primary/30 bg-white px-4 py-2 text-sm font-medium text-happiness-dark shadow-sm hover:bg-happiness-light cursor-pointer transition-colors duration-200">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Personalize
              </span>
            </Link>
            <Link href="/donate">
              <span className="inline-flex items-center rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-medium text-white shadow-lg hover:shadow-xl cursor-pointer transition-all duration-200 transform hover:scale-105">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Support
              </span>
            </Link>
            <Link href="/admin">
              <span className="text-gray-500 hover:text-gray-700 text-sm cursor-pointer transition-colors duration-200">
                Admin
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="border-t border-gray-200 px-2 py-3 space-y-1">
              {navigation.map((link) => (
                <Link key={link.name} href={link.href}>
                  <span 
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 cursor-pointer transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center space-x-3">
                  <Link href="/quiz">
                    <span 
                      className="block rounded-md bg-blue-50 px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-100 cursor-pointer transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Personalize Feed
                    </span>
                  </Link>
                  <Link href="/donate">
                    <span 
                      className="block rounded-md bg-blue-600 px-3 py-2 text-base font-medium text-white hover:bg-blue-700 cursor-pointer transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Support Us
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
