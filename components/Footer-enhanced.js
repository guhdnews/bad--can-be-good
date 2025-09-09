// components/Footer-enhanced.js - Modern footer with social links
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Mission', href: '/mission' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' }
    ],
    resources: [
      { name: 'Latest Stories', href: '/' },
      { name: 'Categories', href: '/#categories' },
      { name: 'Newsletter', href: '/#newsletter' },
      { name: 'RSS Feed', href: '/rss.xml' }
    ],
    community: [
      { name: 'Submit Story', href: '/submit' },
      { name: 'Volunteer', href: '/volunteer' },
      { name: 'Partnership', href: '/partnership' },
      { name: 'Support Us', href: '/donate' }
    ]
  };

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/newscanbegood',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/newscanbegood',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/newscanbegood',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.291C3.85 14.473 3.014 12.44 3.014 10.21c0-2.229.836-4.262 2.112-5.486.875-.801 2.026-1.291 3.323-1.291 1.297 0 2.448.49 3.323 1.291 1.276 1.224 2.112 3.257 2.112 5.486 0 2.229-.836 4.263-2.112 5.487-.875.801-2.026 1.291-3.323 1.291zm7.055-5.486c0-1.893-.711-3.617-1.884-4.902-.851-.932-1.884-1.465-3.171-1.465s-2.32.533-3.171 1.465c-1.173 1.285-1.884 3.009-1.884 4.902s.711 3.617 1.884 4.902c.851.932 1.884 1.465 3.171 1.465s2.32-.533 3.171-1.465c1.173-1.285 1.884-3.009 1.884-4.902z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/newscanbegood',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  News Can Be Good
                </h3>
              </div>
            </div>
            <p className="text-gray-300 text-base leading-relaxed max-w-md">
              Dedicated to spreading positivity through journalism. We believe that good news has the power to inspire, unite, and create positive change in the world.
            </p>
            
            {/* Newsletter Signup Mini */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-white mb-2">Stay Updated</h4>
              <p className="text-xs text-gray-400 mb-3">Get weekly positive news in your inbox</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800"
                >
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-semibold text-white">Company</h3>
                <ul className="mt-6 space-y-3">
                  {footerLinks.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <span className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors duration-200">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-base font-semibold text-white">Resources</h3>
                <ul className="mt-6 space-y-3">
                  {footerLinks.resources.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <span className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors duration-200">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-semibold text-white">Community</h3>
                <ul className="mt-6 space-y-3">
                  {footerLinks.community.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <span className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors duration-200">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-base font-semibold text-white">Impact Stats</h3>
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="text-2xl font-bold text-blue-400">1K+</div>
                    <div className="text-xs text-gray-400">Positive stories shared</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">500+</div>
                    <div className="text-xs text-gray-400">Daily readers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">24/7</div>
                    <div className="text-xs text-gray-400">Spreading positivity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-gray-800 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-6">
              <p className="text-sm text-gray-400">
                &copy; {currentYear} News Can Be Good. All rights reserved.
              </p>
              <div className="hidden sm:flex items-center space-x-4 text-xs text-gray-500">
                <Link href="/privacy">
                  <span className="hover:text-gray-300 cursor-pointer transition-colors duration-200">Privacy</span>
                </Link>
                <span>•</span>
                <Link href="/terms">
                  <span className="hover:text-gray-300 cursor-pointer transition-colors duration-200">Terms</span>
                </Link>
                <span>•</span>
                <Link href="/cookies">
                  <span className="hover:text-gray-300 cursor-pointer transition-colors duration-200">Cookies</span>
                </Link>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-0">
              <div className="flex items-center text-sm text-gray-400">
                <span>Made with</span>
                <span className="text-red-500 mx-1">❤️</span>
                <span>for a better world</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
