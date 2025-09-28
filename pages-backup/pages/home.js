import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert('Subscription failed');
    }
  };

  // Static articles - no server-side fetching at all
  const articles = [
    {
      _id: '1',
      title: 'Welcome to Daily Positive News!',
      content: 'Your source for uplifting news and positive stories from around the world. We are currently setting up our news feed.',
    },
    {
      _id: '2', 
      title: 'Site Successfully Deployed',
      content: 'Great news! The website has been successfully deployed and is now live. We are working on integrating the full news feed.',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Daily Positive News</h1>
            <div className="space-x-4">
              <a href="/quiz" className="text-blue-600 hover:text-blue-800">Quiz</a>
              <a href="/donate" className="text-blue-600 hover:text-blue-800">Donate</a>
            </div>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Daily Positive News</h1>
        
        <form onSubmit={handleSubscribe} className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-2 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Subscribe for daily news"
            className="border border-gray-300 p-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto">
            Subscribe
          </button>
        </form>
        
        <div className="grid gap-6 max-w-4xl mx-auto">
          {articles.map((article) => (
            <article key={article._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3 text-gray-900">{article.title}</h2>
              <p className="text-gray-700 leading-relaxed">{article.content}</p>
            </article>
          ))}
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p>&copy; 2025 Daily Positive News. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// NO getServerSideProps function at all - this eliminates any server-side fetching