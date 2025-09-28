'use client'

// components/Logo.js - Sunshine & Happiness themed logo for News Can Be Good
import React from 'react'

export default function Logo({ size = 'default', className = '', showText = true }) {
  const sizes = {
    small: { logo: 'w-8 h-8', text: 'text-sm' },
    default: { logo: 'w-14 h-14', text: 'text-xl' },
    large: { logo: 'w-20 h-20', text: 'text-2xl' },
    xlarge: { logo: 'w-32 h-32', text: 'text-4xl' }
  }

  const currentSize = sizes[size] || sizes.default

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Sunshine Logo SVG */}
      <div className={`${currentSize.logo} relative`}>
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full drop-shadow-lg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradient definitions */}
          <defs>
            <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF176" />
              <stop offset="60%" stopColor="#FFB74D" />
              <stop offset="100%" stopColor="#FF8A65" />
            </radialGradient>
            <linearGradient id="rayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFCC02" />
              <stop offset="50%" stopColor="#FF9800" />
              <stop offset="100%" stopColor="#F57C00" />
            </linearGradient>
            <linearGradient id="newsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4FC3F7" />
              <stop offset="50%" stopColor="#29B6F6" />
              <stop offset="100%" stopColor="#0288D1" />
            </linearGradient>
          </defs>

          {/* Sun rays (outer) */}
          <g className="animate-spin" style={{ transformOrigin: '50px 50px', animationDuration: '20s' }}>
            {/* Long rays */}
            <path d="M50 5 L52 15 L48 15 Z" fill="url(#rayGradient)" opacity="0.8" />
            <path d="M85.36 14.64 L83.66 17.32 L80.98 15.62 Z" fill="url(#rayGradient)" opacity="0.8" />
            <path d="M95 50 L85 52 L85 48 Z" fill="url(#rayGradient)" opacity="0.8" />
            <path d="M85.36 85.36 L80.98 84.38 L83.66 82.68 Z" fill="url(#rayGradient)" opacity="0.8" />
            <path d="M50 95 L48 85 L52 85 Z" fill="url(#rayGradient)" opacity="0.8" />
            <path d="M14.64 85.36 L17.32 83.66 L19.02 86.34 Z" fill="url(#rayGradient)" opacity="0.8" />
            <path d="M5 50 L15 48 L15 52 Z" fill="url(#rayGradient)" opacity="0.8" />
            <path d="M14.64 14.64 L19.02 15.62 L17.32 17.32 Z" fill="url(#rayGradient)" opacity="0.8" />
            
            {/* Short rays */}
            <circle cx="50" cy="12" r="2" fill="url(#rayGradient)" opacity="0.6" />
            <circle cx="78" cy="22" r="1.5" fill="url(#rayGradient)" opacity="0.6" />
            <circle cx="88" cy="50" r="2" fill="url(#rayGradient)" opacity="0.6" />
            <circle cx="78" cy="78" r="1.5" fill="url(#rayGradient)" opacity="0.6" />
            <circle cx="50" cy="88" r="2" fill="url(#rayGradient)" opacity="0.6" />
            <circle cx="22" cy="78" r="1.5" fill="url(#rayGradient)" opacity="0.6" />
            <circle cx="12" cy="50" r="2" fill="url(#rayGradient)" opacity="0.6" />
            <circle cx="22" cy="22" r="1.5" fill="url(#rayGradient)" opacity="0.6" />
          </g>

          {/* Main sun circle */}
          <circle 
            cx="50" 
            cy="50" 
            r="22" 
            fill="url(#sunGradient)" 
            className="drop-shadow-md"
          />

          {/* Inner glow */}
          <circle 
            cx="50" 
            cy="50" 
            r="18" 
            fill="rgba(255, 255, 255, 0.3)" 
          />

          {/* News elements - stylized newspaper/document */}
          <g transform="translate(42, 42)">
            {/* Small document/news icon */}
            <rect 
              x="0" 
              y="0" 
              width="16" 
              height="16" 
              rx="2" 
              fill="url(#newsGradient)" 
              opacity="0.9"
              className="drop-shadow-sm"
            />
            {/* Text lines */}
            <rect x="2" y="3" width="8" height="1.5" rx="0.5" fill="white" opacity="0.8" />
            <rect x="2" y="6" width="12" height="1" rx="0.5" fill="white" opacity="0.6" />
            <rect x="2" y="8.5" width="10" height="1" rx="0.5" fill="white" opacity="0.6" />
            <rect x="2" y="11" width="9" height="1" rx="0.5" fill="white" opacity="0.6" />
            <rect x="2" y="13.5" width="11" height="1" rx="0.5" fill="white" opacity="0.6" />
          </g>

          {/* Sparkle effects */}
          <g className="animate-pulse" style={{ animationDuration: '2s' }}>
            <circle cx="65" cy="35" r="1" fill="#FFF59D" opacity="0.8" />
            <circle cx="35" cy="65" r="0.8" fill="#FFE082" opacity="0.6" />
            <circle cx="70" cy="60" r="0.6" fill="#FFCC02" opacity="0.7" />
            <circle cx="30" cy="40" r="1.2" fill="#FFF176" opacity="0.5" />
          </g>

          {/* Subtle smile - very minimal */}
          <path 
            d="M42 55 Q50 62 58 55" 
            stroke="rgba(255, 152, 0, 0.4)" 
            strokeWidth="1.5" 
            fill="none" 
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <div className={`${currentSize.text} font-bold bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 bg-clip-text text-transparent leading-tight`}>
            News Can Be Good
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1 font-medium">
            ☀️ Spreading Sunshine Through Stories
          </div>
        </div>
      )}
    </div>
  )
}

// Compact version for mobile/small spaces
export function LogoCompact({ className = '' }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="w-10 h-10 relative">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full drop-shadow-md"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="sunGradientCompact" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF176" />
              <stop offset="60%" stopColor="#FFB74D" />
              <stop offset="100%" stopColor="#FF8A65" />
            </radialGradient>
          </defs>

          {/* Simplified sun rays */}
          <g className="animate-spin" style={{ transformOrigin: '50px 50px', animationDuration: '30s' }}>
            <path d="M50 10 L52 20 L48 20 Z" fill="#FFCC02" opacity="0.7" />
            <path d="M90 50 L80 52 L80 48 Z" fill="#FFCC02" opacity="0.7" />
            <path d="M50 90 L48 80 L52 80 Z" fill="#FFCC02" opacity="0.7" />
            <path d="M10 50 L20 48 L20 52 Z" fill="#FFCC02" opacity="0.7" />
          </g>

          {/* Main sun */}
          <circle cx="50" cy="50" r="25" fill="url(#sunGradientCompact)" />
          <circle cx="50" cy="50" r="20" fill="rgba(255, 255, 255, 0.2)" />
          
          {/* Simple smile */}
          <path d="M40 58 Q50 68 60 58" stroke="rgba(255, 152, 0, 0.6)" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold bg-gradient-to-r from-yellow-600 to-orange-500 bg-clip-text text-transparent">NCBG</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Good News</span>
      </div>
    </div>
  )
}