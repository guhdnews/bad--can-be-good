// components/Hero.js - Beautiful hero section
export default function Hero({ onRefreshNews, loading, message, onClearMessage }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 py-20 sm:py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-white bg-opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Headline */}
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            News Can Be
            <span className="block bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">
              Good
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-blue-100 sm:text-2xl">
            Discover uplifting stories that restore faith in humanity. Get your daily dose of positive journalism from around the world.
          </p>

          {/* Stats */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white">1K+</div>
                <div className="text-sm text-blue-200">Positive Stories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-blue-200">Happy Readers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">Daily</div>
                <div className="text-sm text-blue-200">Fresh Content</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={onRefreshNews}
              disabled={loading}
              className="group relative inline-flex items-center overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-xl transition-all duration-300 hover:bg-blue-50 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center">
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Finding Good News...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Get Latest Good News
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
            
            <a
              href="#stories"
              className="text-lg font-semibold leading-6 text-white hover:text-blue-200 transition-colors duration-200"
            >
              Browse Stories 
              <span aria-hidden="true" className="ml-2">↓</span>
            </a>
          </div>

          {/* Message Display */}
          {message && (
            <div className="mt-8 mx-auto max-w-md">
              <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-white font-medium">{message}</p>
                  <button
                    onClick={onClearMessage}
                    className="ml-4 text-white/70 hover:text-white transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce">
            <svg className="mx-auto h-8 w-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
        <div className="w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
        <div className="w-72 h-72 bg-green-500/30 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
