// components/Hero.js - Beautiful hero section
export default function Hero({ stats = {} }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 py-20 sm:py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-white bg-opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Headline */}
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-lg">
            News Can Be
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Good
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-white sm:text-2xl font-medium drop-shadow-md">
            ☀️ Spreading sunshine through stories. Discover uplifting news that brightens your day and restores faith in humanity.
          </p>

          {/* Mission Statement */}
          <div className="mx-auto mt-10 max-w-3xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Our Mission</h3>
                <p className="text-white/80 leading-relaxed">
                  To counteract the negativity bias in media by curating and sharing stories that highlight human kindness, innovation, and progress.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Display */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                {stats.totalArticles || '0'}
              </div>
              <div className="text-white/80 text-sm font-medium mt-1">
                Positive Stories
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                {stats.totalSubscribers || '0'}
              </div>
              <div className="text-white/80 text-sm font-medium mt-1">
                Happy Subscribers
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                Daily
              </div>
              <div className="text-white/80 text-sm font-medium mt-1">
                Fresh Updates
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#newsletter"
              className="group relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-orange-400/30"
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Subscribe to Newsletter
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>
            
            <a
              href="#stories"
              className="text-lg font-semibold leading-6 text-white hover:text-gray-200 transition-colors duration-200 drop-shadow-md"
            >
              Browse Stories 
              <span aria-hidden="true" className="ml-2">↓</span>
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce">
            <svg className="mx-auto h-8 w-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Decorative Elements - Sunshine theme */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
        <div className="w-72 h-72 bg-yellow-400/40 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
        <div className="w-72 h-72 bg-orange-400/40 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </section>
  );
}
