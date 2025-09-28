// components/FlashingBanner.js - Flashing News Can Be Good banner
'use client'

import { useState, useEffect } from 'react';

export default function FlashingBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(prev => !prev);
    }, 2000); // Flash every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Main banner */}
      <div 
        className={`
          bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 
          dark:from-purple-700 dark:via-purple-800 dark:to-purple-900
          text-white py-3 px-4 text-center
          transition-all duration-700 ease-in-out
          ${isVisible ? 'opacity-100 transform scale-100' : 'opacity-70 transform scale-95'}
        `}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3">
            {/* Animated icon */}
            <div className={`
              transition-transform duration-700 ease-in-out
              ${isVisible ? 'rotate-0 scale-100' : 'rotate-12 scale-110'}
            `}>
              <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            
            {/* Main text */}
            <span className={`
              font-bold text-lg md:text-xl
              transition-all duration-700 ease-in-out
              ${isVisible ? 'text-white' : 'text-yellow-200'}
            `}>
              ✨ News Can Be Good ✨
            </span>
            
            {/* Animated sparkle */}
            <div className={`
              transition-all duration-700 ease-in-out
              ${isVisible ? 'opacity-100 rotate-0' : 'opacity-60 rotate-180'}
            `}>
              <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          
          {/* Subtitle */}
          <div className="mt-1">
            <span className={`
              text-xs md:text-sm text-purple-200 
              transition-opacity duration-700 ease-in-out
              ${isVisible ? 'opacity-100' : 'opacity-80'}
            `}>
              Spreading positivity through journalism
            </span>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-2 h-2 bg-yellow-300 rounded-full opacity-20
                transition-all duration-[${2000 + i * 200}ms] ease-in-out
                ${isVisible 
                  ? `transform translate-x-${i * 4} translate-y-${i * 2}` 
                  : `transform translate-x-${i * 6} translate-y-${i * 3} rotate-45`
                }
              `}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
                animationDelay: `${i * 300}ms`
              }}
            />
          ))}
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"></div>
    </div>
  );
}
