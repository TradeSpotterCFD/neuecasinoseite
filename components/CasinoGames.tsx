import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { GameIcons } from "@/components/GameIcons";
import { GAME_CATEGORIES } from "@/components/GameCategoriesModal";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface GameCategory {
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface SlotGame {
  name: string;
  image: string;
}

interface CasinoGamesProps {
  gameCategories: GameCategory[];
  popularSlots: SlotGame[];
  availableCategories?: string[];
  // Add new prop for language-specific game types
  gameTypesByLanguage?: Record<string, string[]>;
  currentLanguage?: string;
  // Add a prop for the section texts
  gamesSectionText?: string;
}

const CasinoGames = ({
  gameCategories,
  popularSlots,
  availableCategories = [],
  gameTypesByLanguage = {},
  currentLanguage = "en",
  gamesSectionText
}: CasinoGamesProps) => {
  // Use language-specific game types if available, otherwise fall back to general availableCategories
  const effectiveAvailableCategories = 
    (gameTypesByLanguage[currentLanguage]?.length > 0)
      ? gameTypesByLanguage[currentLanguage]
      : availableCategories;

  // Map game categories to match the structure expected by the component
  const processedGameCategories = GAME_CATEGORIES.map(category => {
    const isAvailable = effectiveAvailableCategories.includes(category.id);
    return {
      id: category.id,
      name: category.name,
      icon: category.icon,
      description: category.description || "",
      isAvailable
    };
  });

  // Define the expanded list of popular slots with 5 more slots
  const allSlots = [{
    name: "Book of Dead",
    image: "/lovable-uploads/31496eef-2635-4751-95eb-fd3010479c61.png"
  }, {
    name: "Starburst",
    image: "/lovable-uploads/c84de0d5-23b4-4eb6-982f-ec36def26a44.png"
  }, {
    name: "Bonanza",
    image: "/lovable-uploads/ad9caa5f-5364-46a1-af60-5db370b0ab0e.png"
  }, {
    name: "Fire Joker",
    image: "/lovable-uploads/7d53243d-42fe-479a-b2dc-cc5c5c2bc9ab.png"
  }, {
    name: "Ramses Book",
    image: "/lovable-uploads/375a337e-d597-4bf8-baf7-2b38f21b8c99.png"
  },
  // 5 new slots
  {
    name: "Gonzo's Quest",
    image: "/lovable-uploads/31496eef-2635-4751-95eb-fd3010479c61.png"
  }, {
    name: "Dynamite Joe",
    image: "/lovable-uploads/375a337e-d597-4bf8-baf7-2b38f21b8c99.png"
  }, {
    name: "Dead or Alive",
    image: "/lovable-uploads/c84de0d5-23b4-4eb6-982f-ec36def26a44.png"
  }, {
    name: "Extra Chilli",
    image: "/lovable-uploads/7d53243d-42fe-479a-b2dc-cc5c5c2bc9ab.png"
  }, {
    name: "Riches of Ra",
    image: "/lovable-uploads/ad9caa5f-5364-46a1-af60-5db370b0ab0e.png"
  }];

  // RTP Data for the table
  const rtpData = [{
    game: "Gesamt",
    percentage: "96.50%"
  }, {
    game: "Roulette",
    percentage: "96.02%"
  }, {
    game: "Blackjack",
    percentage: "99.17%"
  }, {
    game: "Video-Poker",
    percentage: "97.23%"
  }, {
    game: "Baccarat",
    percentage: "98.86%"
  }, {
    game: "Craps",
    percentage: "99.55%"
  }, {
    game: "Slots",
    percentage: "95.42%"
  }, {
    game: "Andere Spiele",
    percentage: "94.30%"
  }];

  // Use the provided gamesSectionText or the default
  const displayGamesSectionText = gamesSectionText || `
    <h2 id="game-selection" className="text-3xl font-bold mb-6 text-center scroll-mt-24">Casino Games at Infinity</h2>
    
    <p className="text-gray-700 mb-6">
      Dich erwarten über 10.000 Spiele im Infinity Casino. Dazu gehören Tausende von Slots, <strong>zahlreiche Tischspiele wie Blackjack und Roulette</strong>, sowie ein umfangreiches Live Casino Angebot. Die Spiele stammen von renommierten Anbietern wie NetEnt, Play'n GO und Evolution Gaming, was eine hohe Qualität garantiert.
    </p>
    
    <p className="text-gray-700 mb-8">
      Ob du Slots, Tischspiele oder Live Dealer Spiele bevorzugst, hier findest du alles, was dein Herz begehrt. Erfahre mehr über die Spiele auf der Seite zu <a href="#" className="text-blue-600 hover:underline">Slots in Online Casinos</a> oder teste die Demo-Versionen der Casinospiele. Besonders beliebt sind die progressiven Jackpot-Slots, <strong>die sich durch sehr hohe potentielle Gewinne auszeichnen</strong>.
    </p>
  `;

  return <div className="mb-12">
      {/* Display the custom games section text with HTML support */}
      {gamesSectionText ? (
        <div dangerouslySetInnerHTML={{ __html: gamesSectionText }} />
      ) : (
        <>
          <h2 id="game-selection" className="text-3xl font-bold mb-6 text-center scroll-mt-24">Casino Games at Infinity</h2>
          
          <p className="text-gray-700 mb-6">
            Dich erwarten über 10.000 Spiele im Infinity Casino. Dazu gehören Tausende von Slots, <strong>zahlreiche Tischspiele wie Blackjack und Roulette</strong>, sowie ein umfangreiches Live Casino Angebot. Die Spiele stammen von renommierten Anbietern wie NetEnt, Play'n GO und Evolution Gaming, was eine hohe Qualität garantiert.
          </p>
          
          <p className="text-gray-700 mb-8">
            Ob du Slots, Tischspiele oder Live Dealer Spiele bevorzugst, hier findest du alles, was dein Herz begehrt. Erfahre mehr über die Spiele auf der Seite zu <a href="#" className="text-blue-600 hover:underline">Slots in Online Casinos</a> oder teste die Demo-Versionen der Casinospiele. Besonders beliebt sind die progressiven Jackpot-Slots, <strong>die sich durch sehr hohe potentielle Gewinne auszeichnen</strong>.
          </p>
        </>
      )}
      
      {/* Game Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
        {processedGameCategories.map((category, index) => {
          // Create component that will either be a regular div or a Link based on availability
          const Component = category.isAvailable ? Link : 'div';
          return <Component 
            key={index} 
            to={category.isAvailable ? `/games/${category.id}` : "#"} 
            className={cn("flex flex-col items-center bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center group transition-all", 
              category.isAvailable 
                ? "hover:shadow-md cursor-pointer" 
                : "opacity-50 grayscale cursor-not-allowed"
            )}
          >
            <div className={cn("w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 transition-transform", 
              category.isAvailable && "group-hover:scale-110"
            )}>
              {category.icon}
            </div>
            <h3 className="font-semibold mb-1">{category.name}</h3>
            <p className="text-xs text-gray-500">{category.description}</p>
          </Component>;
        })}
      </div>
      
      {/* Casino Promotion Box */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* Logo Section */}
          <div className="flex items-center justify-center p-6 bg-gray-50">
            <img src="/lovable-uploads/40b3e069-7cc2-4eed-a2c4-380bd860e91e.png" alt="Revolution Casino" className="h-16 object-contain" />
          </div>
          
          {/* Bonus Section */}
          <div className="flex flex-col justify-center items-center p-6 border-t md:border-t-0 md:border-l border-gray-200 text-center">
            <p className="text-sm text-green-600 font-medium mb-1">150% bis zu</p>
            <h3 className="text-3xl font-bold text-blue-900 mb-1">1500€</h3>
            <p className="text-sm">+ 200 Freispiele*</p>
          </div>
          
          {/* Features Section */}
          <div className="p-6 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-center">
            <div className="space-y-1 text-sm">
              <p className="font-medium">Spiele bester Provider</p>
              <p>Viele Jackpot Slots</p>
              <p>Großes Live Casino</p>
            </div>
          </div>
          
          {/* Button Section */}
          <div className="p-6 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-center">
            <Button className="w-full mb-2 bg-[#703d98]">
              Zum Casino
            </Button>
            <p className="text-xs text-gray-500 text-center">*18+. Geschäftsbedingungen gelten.</p>
          </div>
        </div>
      </div>
      
      <h3 id="slot-games" className="text-2xl font-bold mb-6 scroll-mt-24">Online Slot Machines</h3>
      
      <p className="text-gray-700 mb-4">
        The number of Revolution slot machines is over 6,000. These include many old school classics like
        the NetEnt slot Starburst and Book of Dead from Play'n GO. But also slot games like Gargantoonz and Reactoonz,
        which feature <strong>modern themes, innovative features and attractive payout rates</strong>, are abundantly
        available. Video slots are also available in demo version without prior registration.
      </p>
      
      {/* Popular Slots */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
        {allSlots.map((slot, index) => <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <img src={slot.image} alt={slot.name} className="w-full h-36 object-cover" />
            <div className="p-3 text-center">
              <h4 className="font-medium text-sm">{slot.name}</h4>
            </div>
          </div>)}
      </div>
      
      <p className="text-gray-700 mb-8">
        Neben den beiden Slots Book of Dead und Starburst bieten auch die Spiele Bonanza von Big Time Gaming, Fire
        Joker von Play'n GO und Ramses Book von Gamomat <strong>mit RTP-Werten von über 96%</strong> relativ <span className="text-blue-600 font-medium">hohe
        Auszahlungsquoten</span>. Wer lohnende Revolution Erfahrungen machen möchte, der kann mit einem extra
        Bonusguthaben auf dem Spielerkonto die Wahrscheinlichkeit auf einen Mega Gewinn zusätzlich steigern.
      </p>
      
      <h3 className="text-2xl font-bold mb-6">Jackpot Slots</h3>
      
      <div className="flex items-start gap-4 mb-8">
        <img src="/lovable-uploads/244e69f9-5c5e-40d6-b012-4acd28385763.png" alt="Jackpot Icon" className="w-24 h-24 object-contain" />
        <p className="text-gray-700">
          Revolution bietet neben attraktiven Spielautomaten und Live-Dealer-Spielen auch gut zahlende
          Jackpot Slots an. Sowohl für Low Stakes als auch High Roller sind diese Spiele sehr lukrativ, da
          maximale Gewinne deutlich höher ausfallen können als bei gewöhnlichen Videoslots. Es handelt sich
          hier nicht um progressive Jackpots, sondern um Slots mit einem fixen Jackpot-Feature, wie bei Narcos Mexico von
          NetEnt.
        </p>
      </div>
      
      {/* Existing Casino Tischspiele section - now moved before Live Casino */}
      <h1 id="table-games" className="text-3xl font-bold mb-6 text-navy-900 scroll-mt-24">Casino table games such as roulette, blackjack and more</h1>
      
      <p className="text-gray-700 mb-4">
        Bei Revolution findest du eine große <a href="#" className="text-blue-600 hover:underline">Casino Tischspiele</a> Auswahl mit über 100 Titel. Dazu gehören Spiele wie Roulette, Poker, 
        Blackjack, Baccarat, Keno, Sic Bo und Online Rubbellose. Es gibt sie in verschiedenen Varianten und mit unterschiedlichen 
        Setzlimits und Auszahlungsquoten. Man findet sie im Live Casino als auch im ganz normalen Spielsortiment.
      </p>
      
      <p className="text-gray-700 mb-4">
        Damit du immer die Gewissheit hast, dass die <strong>Ergebnisse nach jedem Spiel korrekt</strong> sind und nicht manipuliert wurden, prüfen 
        unabhängige Testlabore wie die Prüfstelle eCOGRA in regelmäßigen Abständen die Zufallsgeneratoren (Random Number 
        Generator). Sie stellen sicher, dass bei allen Spielen eine Folge von Zufallszahlen erzeugt wird.
      </p>
      
      {/* Table games images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <img src="/lovable-uploads/8a544a30-4c76-4985-895e-510b1a1108a8.png" alt="Blackjack table" className="w-full h-64 object-cover rounded-lg" />
        <img src="/lovable-uploads/89387ba1-270f-4ccb-a235-e4187c46321e.png" alt="Roulette table" className="w-full h-64 object-cover rounded-lg" />
      </div>
      
      {/* Revolution Auszahlungsquoten section - NOW MOVED BEFORE Live Casino */}
      <h3 id="payout-rates" className="text-2xl font-bold mb-6 scroll-mt-24">Revolution Payout Rates</h3>
      
      <p className="text-gray-700 mb-6">
        Die Revolution Auszahlung fällt häufiger recht hoch aus, weil der Anbieter über Slots mit hohen Auszahlungsquoten
        verfügt. Spiele mit einem höheren Random Number Generator erlauben sogar mit geringerem Einsatz attraktive
        Gewinnauszahlungen. Das macht sie für Spieler so beliebt. Wenn sich jemand als Low Stake definiert, kann er
        kleinen Einsätzen <strong>über einen längeren Zeitraum ordentliche Gewinne generieren</strong>.
      </p>
      
      {/* RTP Table */}
      <div className="mb-8 rounded-lg overflow-hidden">
        <Table className="border-collapse w-full">
          <TableBody>
            {rtpData.map((item, index) => <TableRow key={index} className={index % 2 === 0 ? "bg-gray-100 hover:bg-gray-200" : "bg-blue-400 bg-opacity-80 text-white hover:bg-blue-500"}>
                <TableCell className="p-3 border">
                  <div className="flex items-center gap-2">
                    {item.game === "Gesamt" && <span className="text-blue-600">♦♦</span>}
                    {item.game === "Roulette" && <span>🎮</span>}
                    {item.game === "Blackjack" && <span>🃏</span>}
                    {item.game === "Video-Poker" && <span>🎲</span>}
                    {item.game === "Baccarat" && <span>🎯</span>}
                    {item.game === "Craps" && <span>🎲</span>}
                    {item.game === "Slots" && <span>🎰</span>}
                    {item.game === "Andere Spiele" && <span>💎</span>}
                    {item.game}
                  </div>
                </TableCell>
                <TableCell className="p-3 border font-medium text-right">
                  {item.percentage}
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </div>
      
      <p className="text-gray-700 mb-8">
        <strong>Anbieter mit einem RNG-Zertifikat</strong> weisen damit ihre Integrität und Fairness in Bezug auf ihre Spielautomaten
        nach. Nur wenn die Ergebnisse ihrer Spiele nachweislich auf dem Zufallsprinzip basieren, erhalten Online Casinos ein
        solches Zertifikat. Du kannst bei Revolution also sicher sein, dass Slots wie Black Wolf oder Cash Pandas tatsächlich
        die RNG-Technologie nutzen.
      </p>
      
      {/* Live Casino section - NOW AFTER the Revolution Auszahlungsquoten section */}
      <h3 id="live-casino" className="text-2xl font-bold mb-6 scroll-mt-24">Live Casino Games</h3>
      
      <p className="text-gray-700 mb-4">
        Im Revolution Live Casino findest du verschiedene Poker-, Blackjack-, Baccarat- und Roulette-Varianten. Diese
        kannst du mehr sehr hohen Einsätzen spielen. Es gibt auch eine große Auswahl an <strong>Live Game Shows wie Crazy
        Time und Mega Wheel</strong>. Hier bekommst du zusätzlich auch noch jede Menge Unterhaltung geboten. Insgesamt
        bietet der Anbieter dir eine bunte Mischung der besten Tischspiele online.
      </p>
      
      {/* Live Casino game types - FIXED HERE TO REMOVE size PROPS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-full p-4 flex flex-col items-center shadow-sm border border-gray-200">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-2">
            <GameIcons.RouletteIcon />
          </div>
          <p className="font-medium text-center">Roulette</p>
        </div>
        
        <div className="bg-white rounded-full p-4 flex flex-col items-center shadow-sm border border-gray-200">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-2">
            <GameIcons.BlackjackIcon />
          </div>
          <p className="font-medium text-center">Blackjack</p>
        </div>
        
        <div className="bg-white rounded-full p-4 flex flex-col items-center shadow-sm border border-gray-200">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-2">
            <GameIcons.BaccaratIcon />
          </div>
          <p className="font-medium text-center">Baccarat</p>
        </div>
        
        <div className="bg-white rounded-full p-4 flex flex-col items-center shadow-sm border border-gray-200">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-2">
            <GameIcons.VideoPokerIcon />
          </div>
          <p className="font-medium text-center">Casino Hold'em</p>
        </div>
        
        <div className="bg-white rounded-full p-4 flex flex-col items-center shadow-sm border border-gray-200">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-2">
            <span className="text-2xl">🎲</span>
          </div>
          <p className="font-medium text-center">Craps</p>
        </div>
      </div>
      
      {/* Casino promotion with laptop/mobile image */}
      <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-8 px-[32px]">
            <div className="bg-white p-4 shadow-sm mb-4 w-40 py-[28px] mx-0 rounded-lg px-[16px]">
              <img src="/lovable-uploads/40b3e069-7cc2-4eed-a2c4-380bd860e91e.png" alt="Revolution Casino" className="h-10 object-fill" />
            </div>
            <div className="mb-4">
              <p className="text-sm text-green-600 font-medium mb-1">150% bis zu</p>
              <h3 className="text-3xl font-bold text-blue-900 mb-1">1500€</h3>
              <p className="text-sm">+ 200 Freispiele*</p>
            </div>
            <div className="space-y-2 mb-6">
              <p className="text-sm">✓ Spiele bester Provider</p>
              <p className="text-sm">✓ Viele Jackpot Slots</p>
              <p className="text-sm">✓ Großes Live Casino</p>
            </div>
            <Button className="w-full md:w-auto bg-[#703d98] text-base my-[20px]">Visit Casino</Button>
            <p className="text-gray-500 mt-2 text-xs font-normal py-0 mx-[8px] my-0">*18+. Geschäftsbedingungen gelten.</p>
          </div>
          <div className="p-4 flex items-center justify-center">
            <img src="/lovable-uploads/7bc6e761-db88-43ee-a8a5-0f2a9fe57776.png" alt="Live Casino on laptop and mobile" className="max-w-full h-auto" />
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 mb-6">
        Das Revolution Live Casino verfügt zu einem großen Teil über <strong>Live-Dealer-Spiele der renommierten Anbieter
        Evolution und Pragmatic Live</strong>. Beide Anbietern haben die beste Casinosoftware für Live-Spiele und sind seit Jahren
        Führer in diesem Segment. Ob Power Blackjack oder Power Up Roulette, jedes ihrer Spiele verspricht ein
        einzigartiges Casino Erlebnis online.
      </p>
      
    </div>;
};

export default CasinoGames;
