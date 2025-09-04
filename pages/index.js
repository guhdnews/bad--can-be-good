import { useState } from 'react';
       import Article from '../components/Article';
       import Header from '../components/Header';
       import Footer from '../components/Footer';

       export default function Home({ initialArticles }) {
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

         return (
           <div className="min-h-screen bg-nur-light">
             <Header />
             <main className="container mx-auto p-4 sm:p-6 lg:p-8">
               <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Daily Positive News</h1>
               <form onSubmit={handleSubscribe} className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-2 max-w-md mx-auto">
                 <input
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Subscribe for daily news"
                   className="border border-gray-300 p-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-nur-blue"
                   required
                 />
                 <button type="submit" className="bg-nur-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto">
                   Subscribe
                 </button>
               </form>
               <div className="grid gap-6">
                 {initialArticles.map((article) => (
                   <Article key={article._id} title={article.title} content={article.content} imageUrl={article.imageUrl} />
                 ))}
               </div>
             </main>
             <Footer />
           </div>
         );
       }

       export async function getServerSideProps() {
         const response = await fetch('http://localhost:3000/api/newsletter');
         const { articles } = await response.json();
         return { props: { initialArticles: articles } };
       }