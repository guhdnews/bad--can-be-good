// app/loading.js - Global loading UI for App Router
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      {/* Header skeleton */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50" style={{ height: 'var(--header-height)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="animate-pulse flex items-center space-x-3">
              <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              <div className="hidden sm:block">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-1"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              ))}
            </div>
            <div className="md:hidden">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <main className="container mx-auto px-4 py-8" style={{ paddingTop: '2rem' }}>
        <div className="animate-pulse">
          {/* Hero section skeleton */}
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
          </div>

          {/* Search bar skeleton */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl mb-8"></div>
            <div className="flex flex-wrap gap-3 justify-center">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
              ))}
            </div>
          </div>

          {/* Featured article skeleton */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-8"></div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-96 bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div className="p-8 md:w-1/2 space-y-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="flex justify-between items-center pt-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Articles grid skeleton */}
          <div className="max-w-7xl mx-auto mb-16">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-8"></div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer skeleton */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="animate-pulse grid md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 bg-gray-700 rounded w-32"></div>
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-700 rounded w-24"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}