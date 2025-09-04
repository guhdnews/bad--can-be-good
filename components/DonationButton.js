import Link from 'next/link';

       export default function DonationButton() {
         return (
           <Link href="/donate">
             <button className="bg-nur-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto">
               Support Our Mission
             </button>
           </Link>
         );
       }