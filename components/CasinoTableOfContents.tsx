
import { Book, Eye, Gift, GamepadIcon, Percent, Headphones, Award, Shield, CreditCard, Star, HelpCircle, Smartphone } from "lucide-react";

interface CasinoTableOfContentsProps {
  casino: {
    name: string;
  };
}

const CasinoTableOfContents = ({ casino }: CasinoTableOfContentsProps) => {
  // Function to scroll to the top of the page when the casino name is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Function to scroll to a specific section by ID
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80; // Negative offset to position heading at top with some spacing
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm sticky top-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center">
          <Book className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="font-bold text-xl">Table of Contents</h3>
        </div>
      </div>
      
      <ul className="space-y-3">
        {/* Only the casino name gets the scroll to top functionality */}
        <li>
          <a 
            href="#top" 
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 group"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <span className="text-amber-500">
              <Star className="h-4 w-4" />
            </span>
            <span className="group-hover:underline">{casino.name}</span>
          </a>
        </li>
        
        {/* At a Glance with fixed scroll functionality */}
        <li>
          <a 
            href="#at-a-glance" 
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 group"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('at-a-glance');
            }}
          >
            <span className="text-blue-500">
              <Eye className="h-4 w-4" />
            </span>
            <span className="group-hover:underline">At a Glance</span>
          </a>
        </li>
        
        {/* Casino Bonus with scroll functionality */}
        <li>
          <a 
            href="#casino-bonus" 
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 group"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('casino-bonus');
            }}
          >
            <span className="text-green-500">
              <Gift className="h-4 w-4" />
            </span>
            <span className="group-hover:underline">Casino Bonus</span>
          </a>
        </li>
        
        {/* Game Selection with scroll functionality */}
        <li>
          <a 
            href="#game-selection" 
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 group"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('game-selection');
            }}
          >
            <span className="text-red-500">
              <GamepadIcon className="h-4 w-4" />
            </span>
            <span className="group-hover:underline">Game Selection</span>
          </a>
        </li>
        
        {/* Slot Games with scroll functionality */}
        <li>
          <a 
            href="#slot-games" 
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 group"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('slot-games');
            }}
          >
            <span className="text-purple-500">
              <GamepadIcon className="h-4 w-4" />
            </span>
            <span className="group-hover:underline">Slot Games</span>
          </a>
        </li>
        
        {/* Table Games with scroll functionality */}
        <li>
          <a 
            href="#table-games" 
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 group"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('table-games');
            }}
          >
            <span className="text-indigo-500">
              <GamepadIcon className="h-4 w-4" />
            </span>
            <span className="group-hover:underline">Table Games</span>
          </a>
        </li>
        
        {/* Payout Rates */}
        <li>
          <a 
            href="#payout-rates" 
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 group"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('payout-rates');
            }}
          >
            <span className="text-blue-400">
              <Percent className="h-4 w-4" />
            </span>
            <span className="group-hover:underline">Payout Rates</span>
          </a>
        </li>
        
        {/* Mobile Casino with scroll functionality */}
        <li>
          <a 
            href="#mobile-casino" 
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 group"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('mobile-casino');
            }}
          >
            <span className="text-teal-500">
              <Smartphone className="h-4 w-4" />
            </span>
            <span className="group-hover:underline">Mobile Casino</span>
          </a>
        </li>
        
        {/* Software Providers with scroll functionality */}
        <li>
          <a 
            href="#software-providers" 
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 group"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('software-providers');
            }}
          >
            <span className="text-pink-500">
              <Award className="h-4 w-4" />
            </span>
            <span className="group-hover:underline">Software Providers</span>
          </a>
        </li>
        
        {/* Payment Methods with scroll functionality */}
        <li>
          <a 
            href="#payment-methods" 
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 group"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('payment-methods');
            }}
          >
            <span className="text-blue-500">
              <CreditCard className="h-4 w-4" />
            </span>
            <span className="group-hover:underline">Payment Methods</span>
          </a>
        </li>
        
        {/* Casino License - UPDATED with scroll functionality */}
        <li>
          <a 
            href="#casino-license" 
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 group"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('casino-license');
            }}
          >
            <span className="text-yellow-500">
              <Shield className="h-4 w-4" />
            </span>
            <span className="group-hover:underline">Casino License</span>
          </a>
        </li>
        
        {/* Customer Support - UPDATED with scroll functionality */}
        <li>
          <a 
            href="#customer-support" 
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 group"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('customer-support');
            }}
          >
            <span className="text-cyan-500">
              <Headphones className="h-4 w-4" />
            </span>
            <span className="group-hover:underline">Customer Support</span>
          </a>
        </li>
        
        {/* Our Rating - UPDATED with scroll functionality */}
        <li>
          <a 
            href="#our-rating" 
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 group"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('our-rating');
            }}
          >
            <span className="text-amber-500">
              <Star className="h-4 w-4" />
            </span>
            <span className="group-hover:underline">Our Rating</span>
          </a>
        </li>
        
        {/* FAQ */}
        <li>
          <a href="#faq" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 group"
             onClick={(e) => {
               e.preventDefault();
               scrollToSection('faq');
             }}>
            <span className="text-blue-500">
              <HelpCircle className="h-4 w-4" />
            </span>
            <span className="group-hover:underline">Frequently Asked Questions</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default CasinoTableOfContents;
