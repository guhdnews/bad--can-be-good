// pages/mission.js - Our Mission page
import Head from 'next/head';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

export default function Mission() {
  return (
    <>
      <Head>
        <title>Our Mission - News Can Be Good</title>
        <meta name="description" content="Learn about our mission to spread happiness through positive journalism and counter negativity bias in media." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-happiness-light via-white to-happiness-light dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
        <Header />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary dark:from-gray-800 dark:to-gray-700 py-20 transition-colors duration-200">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold font-display text-white mb-6">
              Our Mission
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              To spread happiness through journalism by curating positive stories that inspire hope, celebrate human kindness, and showcase the good happening in our world every day.
            </p>
          </div>
        </section>

        <main className="container mx-auto px-4 py-16">
          {/* Mission Statement */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 border border-primary/10 dark:border-gray-700 transition-colors duration-200">
              <h2 className="text-3xl font-bold font-display text-happiness-dark dark:text-white mb-8 text-center transition-colors duration-200">
                Why We Exist
              </h2>
              <div className="prose prose-lg max-w-none text-happiness-dark/80 dark:text-gray-300 leading-relaxed transition-colors duration-200">
                <p className="text-xl mb-6 text-happiness-dark/80 dark:text-gray-300 transition-colors duration-200">
                  In a world where negative news dominates headlines, we believe there's a crucial need for balance. 
                  Research shows that consuming too much negative media can impact mental health, create anxiety, 
                  and distort our perception of reality.
                </p>
                <p className="text-lg mb-6 text-happiness-dark/80 dark:text-gray-300 transition-colors duration-200">
                  News Can Be Good exists to counteract this negativity bias by highlighting the countless positive 
                  stories that often go unnoticed. We don't ignore the world's challenges, but we choose to focus 
                  on solutions, progress, and the inherent goodness in humanity.
                </p>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold font-display text-happiness-dark dark:text-white text-center mb-12 transition-colors duration-200">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-primary/10 dark:border-gray-700 text-center transform hover:scale-105 transition-all duration-200">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-xl font-bold text-happiness-dark dark:text-white mb-4 transition-colors duration-200">Authenticity</h3>
                <p className="text-happiness-dark/70 dark:text-gray-300 transition-colors duration-200">
                  Every story we share is real, verified, and genuinely positive. No fake news, no exaggeration—just authentic good news.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-primary/10 dark:border-gray-700 text-center transform hover:scale-105 transition-all duration-200">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary to-happiness-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">💝</span>
                </div>
                <h3 className="text-xl font-bold text-happiness-dark dark:text-white mb-4 transition-colors duration-200">Impact</h3>
                <p className="text-happiness-dark/70 dark:text-gray-300 transition-colors duration-200">
                  We curate stories that not only make you smile but inspire action, foster hope, and create positive change in communities.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-primary/10 dark:border-gray-700 text-center transform hover:scale-105 transition-all duration-200">
                <div className="w-16 h-16 bg-gradient-to-r from-happiness-blue to-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-bold text-happiness-dark dark:text-white mb-4 transition-colors duration-200">Global Perspective</h3>
                <p className="text-happiness-dark/70 dark:text-gray-300 transition-colors duration-200">
                  Positive news happens everywhere. We share uplifting stories from around the world, celebrating our shared humanity.
                </p>
              </div>
            </div>
          </section>

          {/* Our Impact */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 transition-colors duration-200">
              <h2 className="text-3xl font-bold font-display text-happiness-dark dark:text-white text-center mb-8 transition-colors duration-200">
                The Science Behind Positive News
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-happiness-dark dark:text-white mb-4 transition-colors duration-200">Mental Health Benefits</h3>
                  <ul className="space-y-3 text-happiness-dark/80 dark:text-gray-300 transition-colors duration-200">
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>
                      Reduces anxiety and stress levels
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>
                      Improves overall mood and outlook
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>
                      Increases feelings of hope and optimism
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>
                      Promotes prosocial behavior and empathy
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-happiness-dark dark:text-white mb-4 transition-colors duration-200">Social Impact</h3>
                  <ul className="space-y-3 text-happiness-dark/80 dark:text-gray-300 transition-colors duration-200">
                    <li className="flex items-start">
                      <span className="text-secondary mr-3 mt-1">✓</span>
                      Inspires community engagement
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-3 mt-1">✓</span>
                      Encourages volunteer activities
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-3 mt-1">✓</span>
                      Builds trust in humanity
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-3 mt-1">✓</span>
                      Creates ripple effects of kindness
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 border border-primary/10 dark:border-gray-700 transition-colors duration-200">
              <h2 className="text-3xl font-bold font-display text-happiness-dark dark:text-white mb-6 transition-colors duration-200">
                Join Our Mission
              </h2>
              <p className="text-xl text-happiness-dark/80 dark:text-gray-300 mb-8 max-w-2xl mx-auto transition-colors duration-200">
                Help us spread happiness through journalism. Subscribe to our newsletter and be part of a community that believes news can indeed be good.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/#newsletter"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Subscribe to Newsletter
                </a>
                <a 
                  href="/donate"
                  className="inline-flex items-center px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Support Our Mission
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
