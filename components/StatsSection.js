// components/StatsSection.js - Statistics showcase section
export default function StatsSection({ stats }) {
  const statsData = [
    {
      icon: '📰',
      value: stats.articles || '50+',
      label: 'Positive Stories',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '🌟',
      value: stats.sources || '5+',
      label: 'Trusted Sources',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: '👥',
      value: stats.readers || '1K+',
      label: 'Daily Readers',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '☀️',
      value: stats.positivity || '100%',
      label: 'Positivity Rate',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Every day, we're spreading more sunshine and positive energy across the world through journalism that matters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-yellow-100 dark:border-gray-600"
            >
              {/* Icon */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Value */}
              <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span>Join Our Growing Community</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}