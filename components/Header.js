'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import ThemeToggle from './ThemeToggle'
import AuthModal from './AuthModal'
import Logo, { LogoCompact } from './Logo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { user, isLoggedIn, logout } = useAuth()

  return (
    <header 
      className="bg-editorial-bg border-b-2 border-editorial-border sticky top-0 z-50 transition-colors duration-200 shadow-editorial" 
      style={{ height: 'var(--header-height)' }}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:scale-105 transition-transform duration-300">
            <div className="hidden sm:block">
              <Logo size="default" />
            </div>
            <div className="sm:hidden">
              <LogoCompact />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-editorial-text hover:text-editorial-primary transition-colors font-mono text-sm font-medium tracking-wide">
              HOME
            </Link>
            <Link href="/about" className="text-editorial-text hover:text-editorial-primary transition-colors font-mono text-sm font-medium tracking-wide">
              ABOUT
            </Link>
            <Link href="/mission" className="text-editorial-text hover:text-editorial-primary transition-colors font-mono text-sm font-medium tracking-wide">
              MISSION
            </Link>
            <Link href="/contact" className="text-editorial-text hover:text-editorial-primary transition-colors font-mono text-sm font-medium tracking-wide">
              CONTACT
            </Link>
            <Link href="/donate" className="text-editorial-highlight hover:text-editorial-highlight transition-colors font-mono text-sm font-bold tracking-wide">
              DONATE
            </Link>
            <ThemeToggle />
            {isLoggedIn ? (
              <div className="flex items-center space-x-6">
                <Link 
                  href="/account" 
                  className="text-editorial-text hover:text-editorial-primary transition-colors font-mono text-sm font-medium tracking-wide"
                >
                  ACCOUNT
                </Link>
                <button 
                  onClick={logout}
                  className="text-editorial-muted hover:text-red-600 transition-colors font-mono text-sm font-medium tracking-wide"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="text-editorial-text hover:text-editorial-primary transition-colors font-mono text-sm font-medium tracking-wide"
                >
                  LOGIN
                </button>
                <Link 
                  href="/#newsletter" 
                  className="editorial-button-primary px-6 py-2 text-sm font-mono tracking-wide"
                >
                  SUBSCRIBE
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-editorial-bg-secondary transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            data-testid="mobile-menu-button"
            type="button"
          >
            <svg className="w-6 h-6 text-editorial-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t-2 border-editorial-border bg-editorial-bg shadow-editorial">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-editorial-text hover:text-editorial-primary transition-colors font-mono text-sm font-medium tracking-wide px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
              <Link 
                href="/about" 
                className="text-editorial-text hover:text-editorial-primary transition-colors font-mono text-sm font-medium tracking-wide px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link 
                href="/mission" 
                className="text-editorial-text hover:text-editorial-primary transition-colors font-mono text-sm font-medium tracking-wide px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                MISSION
              </Link>
              <Link 
                href="/contact" 
                className="text-editorial-text hover:text-editorial-primary transition-colors font-mono text-sm font-medium tracking-wide px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </Link>
              <Link 
                href="/donate" 
                className="text-editorial-highlight hover:text-editorial-highlight transition-colors font-mono text-sm font-bold tracking-wide px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                DONATE
              </Link>
              <div className="pt-2">
                <ThemeToggle />
              </div>
              
              {isLoggedIn ? (
                <>
                  <Link 
                    href="/account" 
                    className="text-editorial-text hover:text-editorial-primary transition-colors font-mono text-sm font-medium tracking-wide px-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ACCOUNT
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-editorial-muted hover:text-red-600 transition-colors font-mono text-sm font-medium tracking-wide text-left px-2"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="text-editorial-text hover:text-editorial-primary transition-colors font-mono text-sm font-medium tracking-wide text-left px-2"
                >
                  LOGIN
                </button>
              )}
              
              <div className="px-2 pt-2">
                <Link 
                  href="/#newsletter" 
                  className="editorial-button-primary block text-center py-3 font-mono text-sm tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SUBSCRIBE
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Authentication Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </header>
  );
}
