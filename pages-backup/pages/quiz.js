import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

export default function Personalize() {
  const [preferences, setPreferences] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const topics = [
    { 
      id: 'community', 
      name: 'Community Stories', 
      icon: '🤝', 
      description: 'Heartwarming tales of neighbors helping neighbors and communities coming together' 
    },
    { 
      id: 'environment', 
      name: 'Environmental Wins', 
      icon: '🌱', 
      description: 'Positive environmental news, conservation successes, and green innovations' 
    },
    { 
      id: 'innovation', 
      name: 'Innovation & Tech', 
      icon: '🚀', 
      description: 'Breakthrough technologies and innovations that make the world better' 
    },
    { 
      id: 'health', 
      name: 'Health & Wellness', 
      icon: '💚', 
      description: 'Medical breakthroughs, mental health positivity, and wellness success stories' 
    },
    { 
      id: 'education', 
      name: 'Education & Learning', 
      icon: '📚', 
      description: 'Inspiring educational achievements and learning innovations' 
    },
    { 
      id: 'arts', 
      name: 'Arts & Culture', 
      icon: '🎨', 
      description: 'Creative achievements, cultural celebrations, and artistic inspirations' 
    },
    { 
      id: 'human-achievements', 
      name: 'Human Achievements', 
      icon: '⭐', 
      description: 'Individual accomplishments and extraordinary human feats' 
    },
    { 
      id: 'animal', 
      name: 'Animal Stories', 
      icon: '🐾', 
      description: 'Heartwarming animal rescue stories and wildlife conservation successes' 
    }
  ];

  const handleTogglePreference = (topicId) => {
    setPreferences(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleComplete = () => {
    // Save to localStorage for now
    localStorage.setItem('newsPreferences', JSON.stringify(preferences));
    setIsCompleted(true);
    
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  };

  if (isCompleted) {
    return (
      <>
        <Head>
          <title>Preferences Saved - News Can Be Good</title>
        </Head>
        
        <Header />
        
        <main className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">All Set!</h2>
              <p className="text-gray-600 mb-4">
                Your preferences have been saved. We'll personalize your positive news experience based on your interests.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting you to the homepage...
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Personalize Your News - News Can Be Good</title>
        <meta name="description" content="Customize your positive news experience by selecting your favorite topics and interests." />
      </Head>
      
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Personalize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Good News</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the topics that matter most to you, and we'll curate positive stories that align with your interests.
            </p>
          </div>

          {/* Topic Selection */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What kind of positive news interests you?</h2>
              <p className="text-gray-600">Select all that apply - you can change these anytime.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTogglePreference(topic.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    preferences.includes(topic.id)
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{topic.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.name}</h3>
                      <p className="text-gray-600 text-sm">{topic.description}</p>
                      {preferences.includes(topic.id) && (
                        <div className="mt-3 flex items-center text-primary text-sm font-medium">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Selected
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {preferences.length > 0 && (
              <div className="mt-8 p-4 bg-primary/5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">You've selected {preferences.length} topic{preferences.length !== 1 ? 's' : ''}:</h4>
                <div className="flex flex-wrap gap-2">
                  {preferences.map(prefId => {
                    const topic = topics.find(t => t.id === prefId);
                    return (
                      <span key={prefId} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary text-white">
                        {topic?.icon} {topic?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <button
              onClick={handleComplete}
              disabled={preferences.length === 0}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {preferences.length === 0 ? 'Select at least one topic' : `Save My Preferences (${preferences.length})`}
            </button>
            
            <div className="text-sm text-gray-500">
              Don't worry - you can always change your preferences later in your account settings.
            </div>
          </div>

          {/* Skip Option */}
          <div className="text-center mt-8">
            <button
              onClick={() => window.location.href = '/'}
              className="text-gray-500 hover:text-gray-700 transition-colors underline"
            >
              Skip for now and see all stories
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
