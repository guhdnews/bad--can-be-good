import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Head from 'next/head';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // For now, just show success message
    // In the future, this could send an actual email
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Head>
        <title>Contact - News Can Be Good</title>
        <meta name="description" content="Get in touch with News Can Be Good. Share your positive news stories, feedback, or questions with our team." />
      </Head>
      
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-200">
              Have a positive story to share? Questions about our mission? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">Send us a Message</h2>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">Thank you for reaching out. We'll get back to you soon!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                    >
                      <option value="">Select a subject</option>
                      <option value="story-submission">Story Submission</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="technical">Technical Issue</option>
                      <option value="general">General Question</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      placeholder="Tell us more about your message..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-8 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info & FAQ */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-200">Email</h4>
                      <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">hello@newscanbeggood.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-200">Response Time</h4>
                      <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">We typically respond within 24-48 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Frequently Asked Questions */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">Quick Questions</h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">How can I submit a positive news story?</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">Use the contact form above with "Story Submission" as the subject and include the story details or link.</p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">How often do you publish new stories?</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">We update our site with fresh positive news daily and send out weekly newsletter digests.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Can I partner with News Can Be Good?</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">Absolutely! Contact us with "Partnership Inquiry" as the subject to discuss collaboration opportunities.</p>
                  </div>
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
                <p className="mb-6 text-white/90">
                  Don't miss out on daily doses of positivity. Subscribe to our newsletter for the latest good news.
                </p>
                <a 
                  href="/#newsletter" 
                  className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Subscribe Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
