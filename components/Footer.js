import DonationButton from './DonationButton';

       export default function Footer() {
         return (
           <footer className="p-4 text-center bg-gray-100 text-gray-600">
             <p>News Can Be Good is 100% ad-free, funded by donations and merchandise.</p>
             <div className="mt-2 flex justify-center">
               <DonationButton />
             </div>
           </footer>
         );
       }