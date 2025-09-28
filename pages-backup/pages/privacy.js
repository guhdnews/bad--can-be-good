import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Head from 'next/head';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - News Can Be Good</title>
        <meta name="description" content="Learn how News Can Be Good protects your privacy and handles your personal information." />
      </Head>
      
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We respect your privacy and are committed to protecting your personal information.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  We collect information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us through our contact form</li>
                  <li>Create an account (if applicable)</li>
                  <li>Interact with our website</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  This information may include your name, email address, and any messages you send us.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Send you our newsletter with positive news updates</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our website and services</li>
                  <li>Send you important notices about our service</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>With your explicit consent</li>
                  <li>To trusted service providers who help us operate our website and conduct our business</li>
                  <li>When required by law or to protect our rights and safety</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. However, no method of 
                  transmission over the Internet or electronic storage is 100% secure.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Our website may use cookies and similar tracking technologies to improve your browsing experience. 
                  You can control cookies through your browser settings.
                </p>
                <p className="text-gray-700">
                  We may also use analytics services to understand how visitors interact with our website, 
                  which helps us improve our content and user experience.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Unsubscribe from our newsletter at any time</li>
                  <li>Object to certain processing of your information</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  To exercise these rights, please contact us at hello@badcanbegood.com.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Newsletter Subscriptions</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700">
                  When you subscribe to our newsletter, we will only send you content related to positive news 
                  and updates about our service. You can unsubscribe at any time by clicking the unsubscribe 
                  link in our emails or by contacting us directly.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700">
                  Our website is not intended for children under 13 years of age. We do not knowingly 
                  collect personal information from children under 13. If you are a parent and believe 
                  your child has provided us with personal information, please contact us.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the "Last updated" date 
                  at the top of this policy.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 font-medium">Email: hello@badcanbegood.com</p>
                  <p className="text-gray-700">Subject: Privacy Policy Inquiry</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
