// components/EmailManager.js - Email management and preview for admin
import { useState } from 'react';

export default function EmailManager() {
  const [newsletterPreview, setNewsletterPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [message, setMessage] = useState('');

  const generatePreview = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/admin/newsletter-preview');
      const data = await response.json();
      
      if (data.success) {
        setNewsletterPreview(data);
        setMessage('✅ Preview generated successfully!');
      } else {
        setMessage(`❌ Failed to generate preview: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const sendTestEmail = async () => {
    if (!testEmail) {
      setMessage('❌ Please enter a test email address');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/send-test-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail })
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('✅ Test email sent successfully!');
      } else {
        setMessage(`❌ Failed to send test email: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const sendNewsletter = async () => {
    if (!confirm('Are you sure you want to send the newsletter to all subscribers?')) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/send-newsletter', {
        method: 'POST'
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage(`✅ Newsletter sent to ${data.successCount} subscribers!`);
      } else {
        setMessage(`❌ Failed to send newsletter: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={generatePreview}
          disabled={loading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm font-medium"
        >
          {loading ? '⏳ Generating...' : '🔍 Generate Preview'}
        </button>
        
        <div className="flex-1 flex gap-2">
          <input
            type="email"
            placeholder="test@example.com"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
          <button
            onClick={sendTestEmail}
            disabled={loading || !testEmail}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 transition-colors text-sm font-medium whitespace-nowrap"
          >
            📧 Test
          </button>
        </div>
        
        <button
          onClick={sendNewsletter}
          disabled={loading}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors text-sm font-medium"
        >
          {loading ? '📤 Sending...' : '🚀 Send to All'}
        </button>
      </div>

      {/* Status Message */}
      {message && (
        <div className={`p-4 rounded-lg text-sm ${
          message.includes('✅') 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800' 
            : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-800'
        }`}>
          {message}
        </div>
      )}

      {/* Newsletter Preview */}
      {newsletterPreview && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Newsletter Preview</h3>
          
          {/* Preview Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{newsletterPreview.totalArticles}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{newsletterPreview.totalSubscribers}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {newsletterPreview.quote ? '✓' : '✗'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Quote/Image</div>
            </div>
          </div>

          {/* Quote Preview */}
          {newsletterPreview.quote && (
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Today's Inspiration:</h4>
              <blockquote className="italic text-gray-700 dark:text-gray-300">
                "{newsletterPreview.quote.text}"
              </blockquote>
              <cite className="block text-sm text-gray-600 dark:text-gray-400 mt-2">
                — {newsletterPreview.quote.author}
              </cite>
            </div>
          )}

          {/* Image Preview */}
          {newsletterPreview.image && (
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Featured Image:</h4>
              <div className="relative inline-block">
                <img
                  src={newsletterPreview.image.thumbnailUrl}
                  alt={newsletterPreview.image.description}
                  className="max-w-sm w-full h-48 object-cover rounded-lg shadow-md"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-lg">
                  Photo by {newsletterPreview.image.photographer}
                </div>
              </div>
            </div>
          )}

          {/* Articles Preview */}
          {newsletterPreview.articles && newsletterPreview.articles.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Featured Articles:</h4>
              <div className="space-y-3">
                {newsletterPreview.articles.slice(0, 3).map((article, index) => (
                  <div key={index} className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <h5 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                      {article.title}
                    </h5>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {article.content?.substring(0, 120)}...
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-blue-600 dark:text-blue-400">
                        {article.source || 'NCBG'}
                      </span>
                      {article.imageUrl && (
                        <span className="text-xs text-green-600 dark:text-green-400">📸 Has Image</span>
                      )}
                    </div>
                  </div>
                ))}
                {newsletterPreview.articles.length > 3 && (
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    + {newsletterPreview.articles.length - 3} more articles
                  </div>
                )}
              </div>
            </div>
          )}

          {/* HTML Preview */}
          {newsletterPreview.html && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Email Preview:</h4>
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <iframe
                  srcDoc={newsletterPreview.html}
                  className="w-full h-96 bg-white"
                  title="Newsletter Preview"
                  sandbox="allow-same-origin"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
