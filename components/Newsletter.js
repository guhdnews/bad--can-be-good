// components/Newsletter.js - Enhanced newsletter signup
'use client'

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Please enter your email address');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('🎉 Thank you for subscribing! You\'ll receive positive news daily.');
        setSubscribed(true);
        setEmail('');
      } else {
        setMessage(data.message || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="newsletter" className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl shadow-2xl overflow-hidden relative">
      <div className="px-8 py-16 sm:px-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          {!subscribed ? (
            <>
              {/* Icon */}
              <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              {/* Heading */}
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Never Miss Good News
              </h2>
              
              <p className="mt-6 text-xl leading-8 text-white/90">
                Join thousands of readers who start their day with positive stories. Get a curated dose of uplifting news delivered to your inbox every morning.
              </p>

              {/* Benefits */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3 text-sm text-white/80">
                <div className="flex items-center justify-center sm:justify-start">
                  <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Daily positive stories
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No spam, ever
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Unsubscribe anytime
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubscribe} className="mt-10">
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <div className="flex-1">
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full rounded-lg border-0 bg-white/20 backdrop-blur-sm px-4 py-4 text-white placeholder:text-white/70 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary text-lg"
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-shrink-0 rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-4 text-lg font-semibold text-white shadow-sm hover:shadow-lg hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 disabled:opacity-70 transition-all duration-200"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Subscribing...
                      </div>
                    ) : (
                      'Subscribe Free'
                    )}
                  </button>
                </div>
              </form>

              {/* Trust indicators */}
              <div className="mt-6 text-sm text-white/70">
                <p>Join 500+ readers who love starting their day with good news</p>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500">
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Welcome to the family! 🎉</h3>
              <p className="text-xl text-white/90 mb-6">
                You're all set to receive daily positive news. Check your email for a confirmation message.
              </p>
              <button
                onClick={() => {
                  setSubscribed(false);
                  setMessage('');
                }}
                className="text-white hover:text-white/80 underline transition-colors duration-200"
              >
                Subscribe another email →
              </button>
            </div>
          )}

          {/* Message */}
          {message && !subscribed && (
            <div className="mt-6">
              <p className={`text-sm font-medium ${
                message.includes('🎉') ? 'text-green-200' : 'text-red-200'
              }`}>
                {message}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.5'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
    </section>
  );
}
