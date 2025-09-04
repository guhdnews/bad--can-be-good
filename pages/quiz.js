import { useState } from 'react';
  import Header from '../components/Header';
  import Footer from '../components/Footer';

  export default function Quiz() {
    const [preferences, setPreferences] = useState([]);
    const topics = ['community', 'environment', 'innovation', 'human achievements'];

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('/api/save-preferences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ preferences }),
        });
        const data = await response.json();
        alert(data.message);
      } catch (error) {
        alert('Failed to save preferences');
      }
    };

    return (
      <div className="min-h-screen bg-nur-light">
        <Header />
        <form onSubmit={handleSubmit} className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Feel-Good Personalizer</h1>
          <div className="space-y-4">
            {topics.map((topic) => (
              <label key={topic} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setPreferences((prev) =>
                      e.target.checked ? [...prev, topic] : prev.filter((t) => t !== topic)
                    )
                  }
                  className="h-5 w-5 text-nur-blue focus:ring-nur-blue"
                />
                <span className="text-gray-700 capitalize">{topic}</span>
              </label>
            ))}
          </div>
          <button type="submit" className="mt-6 bg-nur-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto">
            Save
          </button>
        </form>
        <Footer />
      </div>
    );
  }