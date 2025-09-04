import DonationButton from './DonationButton';
    import Link from 'next/link';

    export default function Header() {
      return (
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <Link href="/">
            <h1 className="text-2xl font-bold text-gray-800">News Can Be Good</h1>
          </Link>
          <nav className="flex space-x-4 items-center">
            <Link href="/quiz" className="text-nur-blue hover:underline">
              Personalizer
            </Link>
            <DonationButton />
          </nav>
        </header>
      );
    }