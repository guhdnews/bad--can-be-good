import Head from 'next/head';
    import Header from '../components/Header';
    import Footer from '../components/Footer';

    export default function Donate() {
      return (
        <div className="min-h-screen bg-nur-light">
          <Header />
          <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-2xl">
            <Head>
              <title>Support Our Mission - News Can Be Good</title>
              <meta name="description" content="Donate to keep positive news free and authentic." />
            </Head>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Support Positive News</h1>
            <p className="mb-6 text-center text-gray-600">
              Your donations keep News Can Be Good ad-free and dedicated to spreading optimism. Every contribution helps us curate uplifting stories for everyone.
            </p>
            <div className="flex justify-center">
              <form action="https://www.paypal.com/donate" method="post" target="_top">
                <input type="hidden" name="hosted_button_id" value="MBF7NQU55ZL7L" />
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
              </form>
            </div>
            <p className="mt-4 text-sm text-center text-gray-500">
              Powered by PayPal, a trusted payment platform.
            </p>
          </div>
          <Footer />
        </div>
      );
    }