
import { Gift, Clock, AlertCircle, ArrowRight, Scissors, Percent, CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CasinoBonusProps {
  casino: {
    name: string;
    bonus: string;
    bonusRequirements: string;
    bonusValidity: string;
    bonusRate?: string;
    bonusAmount?: string;
    additionalBonuses?: string;
    bonusDisclaimer?: string;
    // Reload Bonus fields
    reloadBonus?: string;
    reloadBonusRate?: string;
    reloadBonusMaxAmount?: string;
    reloadBonusValidity?: string;
    reloadBonusRequirements?: string;
    reloadBonusDisclaimer?: string;
  };
}

const CasinoBonus = ({ casino }: CasinoBonusProps) => {
  // Always show reload bonus section by default
  // The previous condition was checking for existence of all fields, which might not be provided
  // We'll make the reload bonus always show in the template
  
  return (
    <div className="mb-12">
      <h2 id="casino-bonus" className="text-3xl font-bold mb-6 text-center scroll-mt-24">The {casino.name} Bonus</h2>
      
      <p className="text-gray-700 mb-6">
        At Casino {casino.name}, you can look forward to a generous welcome package: On your first deposit, you'll receive a <strong>deposit bonus</strong>, as well as numerous free spins distributed over 10 days. In addition to this welcome bonus, the casino also offers <strong>regular reload bonuses</strong> that provide additional bonus money and free spins.
      </p>
      
      <p className="text-gray-700 mb-8">
        For loyal players, there's a VIP program that gives you <strong>weekly cashback of up to 15%</strong> and other exclusive offers. Additionally, Casino {casino.name} offers regular cashback promotions where you get back a portion of your losses, making your gaming sessions safer and more exciting.
      </p>
      
      {/* Horizontal bonus card layout - Welcome Bonus */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        {/* Top row with number indicator and heading */}
        <div className="flex items-center gap-2 mb-4 bg-white p-4 rounded-lg">
          <div className="flex-shrink-0">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">1</span>
          </div>
          <h3 className="text-xl font-semibold ml-2">Welcome Bonus</h3>
          
          <div className="flex-grow flex justify-between items-center ml-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Rate</p>
              <p className="text-xl font-bold">{casino.bonusRate || "100%"}</p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">Bonus</p>
              <p className="text-xl font-bold">{casino.bonusAmount || casino.bonus}</p>
            </div>
            
            <Button className="ml-4">
              Visit Casino
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Bottom row with additional information - Using smaller text-xs font size */}
        <div className="flex flex-wrap justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Scissors className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs font-medium">Validity:</p>
              <p className="text-xs">{casino.bonusValidity}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs font-medium">Bonus Conditions:</p>
              <p className="text-xs">{casino.bonusRequirements}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs font-medium">More Bonuses</p>
              <p className="text-xs">{casino.additionalBonuses || "Live Casino Cashback, Weekly Cashback, Reload Bonus"}</p>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          {casino.bonusDisclaimer || "*18+. Bonus applies to new customers. Maximum amount €500. Wagering requirement: 35x within 10 days. Further bonus conditions on the website. Play responsibly."}
        </div>
      </div>

      {/* Live Casino Cashback Bonus - Using smaller text-xs font size */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        {/* Top row with number indicator and heading */}
        <div className="flex items-center gap-2 mb-4 bg-white p-4 rounded-lg">
          <div className="flex-shrink-0">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">2</span>
          </div>
          <h3 className="text-xl font-semibold ml-2">Live Casino Cashback</h3>
          
          <div className="flex-grow flex justify-between items-center ml-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Rate</p>
              <p className="text-xl font-bold">25%</p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">Maximum Amount</p>
              <p className="text-xl font-bold text-blue-600">200€</p>
            </div>
            
            <Button className="ml-4">
              Visit Casino
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Bottom row with additional information - Using smaller text-xs font size */}
        <div className="flex justify-center items-center gap-16 py-3 mb-4">
          <div className="flex items-center gap-2">
            <Scissors className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs font-medium">Validity: <span className="font-normal">7 days</span></p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs font-medium">Bonus Conditions: <span className="font-normal">1x</span></p>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          *18+. Bonus applies to new customers. Maximum amount 200€. Wagering requirement: 1x within 7 days. Further bonus conditions on the website.
        </div>
      </div>

      {/* Weekly Cashback Bonus - Using smaller text-xs font size */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        {/* Top row with number indicator and heading */}
        <div className="flex items-center gap-2 mb-4 bg-white p-4 rounded-lg">
          <div className="flex-shrink-0">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">3</span>
          </div>
          <h3 className="text-xl font-semibold ml-2">Weekly Cashback</h3>
          
          <div className="flex-grow flex justify-between items-center ml-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Rate</p>
              <p className="text-xl font-bold">15%</p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">Maximum Amount</p>
              <p className="text-xl font-bold text-blue-600">500€</p>
            </div>
            
            <Button className="ml-4">
              Visit Casino
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Bottom row with additional information - Using smaller text-xs font size */}
        <div className="flex justify-center items-center gap-16 py-3 mb-4">
          <div className="flex items-center gap-2">
            <Scissors className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs font-medium">Validity: <span className="font-normal">14 days</span></p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs font-medium">Bonus Conditions: <span className="font-normal">3x</span></p>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          *18+. The weekly cashback is calculated every Monday for the previous week's losses. Maximum amount 500€. Wagering requirement: 3x within 14 days.
        </div>
      </div>
      
      {/* Reload Bonus - Always display in the template */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        {/* Top row with number indicator and heading */}
        <div className="flex items-center gap-2 mb-4 bg-white p-4 rounded-lg">
          <div className="flex-shrink-0">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">4</span>
          </div>
          <h3 className="text-xl font-semibold ml-2">Reload Bonus</h3>
          
          <div className="flex-grow flex justify-between items-center ml-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Rate</p>
              <p className="text-xl font-bold">{casino.reloadBonusRate || "50%"}</p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">Maximum Amount</p>
              <p className="text-xl font-bold text-blue-600">{casino.reloadBonusMaxAmount || "700€"} + 50 Free Spins*</p>
            </div>
            
            <Button className="ml-4">
              Visit Casino
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Bottom row with additional information */}
        <div className="flex justify-center items-center gap-16 py-3 mb-4">
          <div className="flex items-center gap-2">
            <Scissors className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs font-medium">Validity: <span className="font-normal">{casino.reloadBonusValidity || "10 days"}</span></p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs font-medium">Bonus Conditions: <span className="font-normal">{casino.reloadBonusRequirements || "35x"}</span></p>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          {casino.reloadBonusDisclaimer || "*18+. Bonus valid for new customers. Maximum amount 700€ + 50 free spins. Wagering requirement: 35x bonus + deposit within 10 days. Further bonus conditions on the website."}
        </div>
      </div>
      
      <p className="text-gray-700 mb-6">
        For the welcome bonus, you need to wager both the bonus amount and your deposit 35 times before you can make a {casino.name} withdrawal. Winnings from free spins are subject to a higher requirement and must be wagered 40 times. These <strong>conditions apply within a period of 10 days</strong>, and during this time, stakes per round must not exceed €5.
      </p>
      
      <p className="text-gray-700 mb-6">
        It's important to carefully observe the wagering requirements, as not all games contribute equally to fulfilling them. <strong>Slot machines typically count 100%</strong>, while table games and live casino games are only partially credited. The Casino {casino.name} bonus thus offers a good opportunity to increase your starting balance, but requires careful planning to successfully meet the conditions.
      </p>
    </div>
  );
};

export default CasinoBonus;
