
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Info, ChevronRight, ArrowRight, ExternalLink, Cherry, Spade } from "lucide-react";
import CasinoQuickInfo from "@/components/CasinoQuickInfo";
import CasinoKeyFeatures from "@/components/CasinoKeyFeatures";
import CasinoAtGlance from "@/components/CasinoAtGlance";
import CasinoBonus from "@/components/CasinoBonus";
import CasinoGames from "@/components/CasinoGames";
import CasinoTableOfContents from "@/components/CasinoTableOfContents";
import CasinoScreenshotsCarousel from "@/components/CasinoScreenshotsCarousel";
import { supabase } from "@/integrations/supabase/client";
import { GameIcons } from "@/components/GameIcons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const CasinoReviewTemplate = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [screenshots, setScreenshots] = useState<{
    src: string;
    alt: string;
  }[]>([]);
  
  // Get current year for the review
  const currentYear = new Date().getFullYear();
  
  useEffect(() => {
    // In a real implementation, you would fetch this from the database
    // based on the casino ID and current language
    setScreenshots([{
      src: "/lovable-uploads/375a337e-d597-4bf8-baf7-2b38f21b8c99.png",
      alt: "Casino interface screenshot"
    }, {
      src: "/lovable-uploads/7d53243d-42fe-479a-b2dc-cc5c5c2bc9ab.png",
      alt: "Bonus offers screenshot"
    }, {
      src: "/lovable-uploads/c84de0d5-23b4-4eb6-982f-ec36def26a44.png",
      alt: "Game selection screenshot"
    }, {
      src: "/lovable-uploads/31496eef-2635-4751-95eb-fd3010479c61.png",
      alt: "Mobile interface screenshot"
    }, {
      src: "/lovable-uploads/ad9caa5f-5364-46a1-af60-5db370b0ab0e.png",
      alt: "Payment options screenshot"
    }]);
  }, []);

  // Game categories with improved icons
  const gameCategories = [{
    name: "Slots",
    icon: <Cherry className="h-8 w-8 text-red-500" />,
    description: "Thousands of slot machines"
  }, {
    name: "Roulette",
    icon: <GameIcons.RouletteIcon />,
    description: "European and French roulette"
  }, {
    name: "Blackjack",
    icon: <GameIcons.BlackjackIcon />,
    description: "Classic and multihand variants"
  }, {
    name: "Jackpot",
    icon: <span className="text-2xl">💰</span>,
    description: "Progressive jackpot slots"
  }, {
    name: "Live Casino",
    icon: <span className="text-2xl">👨‍💼</span>,
    description: "With professional dealers"
  }, {
    name: "Baccarat",
    icon: <GameIcons.BaccaratIcon />,
    description: "Various baccarat variants"
  }, {
    name: "Casino Hold'em",
    icon: <Spade className="h-8 w-8 text-black" />,
    description: "Poker against the house"
  }, {
    name: "Bingo",
    icon: <GameIcons.BingoIcon />,
    description: "Online bingo games"
  }, {
    name: "Video Poker",
    icon: <GameIcons.VideoPokerIcon />,
    description: "Digital poker variants"
  }, {
    name: "Sports Betting",
    icon: <GameIcons.SoccerBallIcon />,
    description: "Betting on sporting events"
  }];

  // Popular slot games
  const popularSlots = [{
    name: "Book of Dead",
    image: "/lovable-uploads/31496eef-2635-4751-95eb-fd3010479c61.png"
  }, {
    name: "Starburst",
    image: "/lovable-uploads/c84de0d5-23b4-4eb6-982f-ec36def26a44.png"
  }, {
    name: "Gonzo's Quest",
    image: "/lovable-uploads/ad9caa5f-5364-46a1-af60-5db370b0ab0e.png"
  }, {
    name: "Mega Moolah",
    image: "/lovable-uploads/7d53243d-42fe-479a-b2dc-cc5c5c2bc9ab.png"
  }, {
    name: "El Torero",
    image: "/lovable-uploads/375a337e-d597-4bf8-baf7-2b38f21b8c99.png"
  }];
  
  const casino = {
    id: "infinity-casino",
    name: "Infinity Casino",
    logo: "/lovable-uploads/375a337e-d597-4bf8-baf7-2b38f21b8c99.png",
    rating: 4.6,
    bonus: "€500 + 200 Free Spins",
    description: "Infinity offers all the important casino games, including various versions of roulette and blackjack.",
    url: "https://www.infinity.com",
    yearEstablished: 2023,
    licenseInfo: "Curaçao eGaming",
    features: ["Large game selection", "Fast payouts", "Attractive bonus offers", "24/7 Customer support", "User-friendly mobile platform"],
    paymentMethods: ["Visa", "Mastercard", "PayPal", "Skrill", "Bitcoin"],
    minDeposit: 20,
    withdrawalRate: "95.84%",
    company: "Rabidi N.V.",
    headquarters: "Curaçao",
    gameProviders: ["NetEnt", "Play'n GO", "Evolution Gaming", "Pragmatic Play", "Microgaming"],
    gameCount: "10,120+ Games",
    rtpTest: "eCOGRA",
    playerProtection: "GamCare, Gamblers Anonymous, Gamble Aware",
    customerService: "24/7 Live-Chat and Email Support",
    bonusRequirements: "Wagering requirement - 35x Bonus + Deposit",
    bonusValidity: "10 days",
    // Example of available game categories
    gameCategories: ["slots", "roulette", "blackjack", "jackpot", "live_casino", "baccarat", "video_poker"]
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      {/* Hero Section with Casino Header - Updated to match design */}
      <div className="bg-[#2a3377] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-2/3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {casino.name} - Online Casino Review {currentYear}
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {casino.features.map((feature, index) => <div key={index} className="flex items-center gap-2 text-sm bg-white/10 px-3 py-1.5 rounded-full">
                    <Check className="h-4 w-4 text-green-400" />
                    {feature}
                  </div>)}
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {Array.from({
                  length: 5
                }).map((_, i) => <span key={i} className="text-2xl">
                      {i < Math.floor(casino.rating) ? "★" : i < casino.rating ? "★" : "☆"}
                    </span>)}
                </div>
                <span className="text-xl font-bold ml-2">{casino.rating}</span>
              </div>
              
              <p className="text-white/90 mb-8 text-lg">
                In this {casino.name} review, you'll discover why this casino stands out with its extensive bonus offers, diverse game selection, and high security standards.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href={casino.url} className="inline-flex items-center justify-center rounded-md bg-[#8b4ac2] hover:bg-[#7b3eb2] px-8 py-3 font-medium text-white transition-colors">
                  Visit Casino
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white p-4 rounded-lg shadow-lg mb-6 w-full max-w-sm mx-auto">
                <img src={casino.logo} alt={`${casino.name} logo`} className="w-full h-auto object-contain" />
              </div>
              
              <div className="bg-[#22c777] text-white rounded-lg p-6 w-full max-w-sm mx-auto">
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-2xl font-bold mb-4">{casino.bonus}</h3>
                  <a href={casino.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md bg-white hover:bg-white/90 px-6 py-2 font-medium text-[#22c777] transition-colors mb-4">
                    Play Now
                  </a>
                  <p className="text-xs text-white/90">
                    +18+. Bonus applies to new customers. Maximum amount €500. Wagering requirement: 35x within 10 days. Further bonus conditions on the website. Play responsibly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content area */}
            <div className="lg:w-3/4">
              {/* Features Summary - Now hidden */}
              <CasinoKeyFeatures features={casino.features} hidden={true} />

              {/* Casino at a glance section */}
              <CasinoAtGlance casino={casino} />

              {/* Casino description */}
              <div className="mb-12">
                <p className="text-gray-700 mb-4">
                  In meinem {casino.name} Review erfährst du, warum dieses Casino mit seinen umfangreichen Bonusangeboten, seiner vielfältigen Spielauswahl und seinen hohen Sicherheitsstandards überzeugt. Besonders hervorzuheben ist die große Anzahl an Spielen und lizenzierten Anbietern, die für faire und zufällige Spielausgänge sorgen. {casino.name} nimmt Sicherheit ernst, unterstützt durch eine seriöse Lizenz und effektiven Spielerschutz.
                </p>
              </div>

              {/* Casino Screenshots Carousel */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Casino Screenshots</h2>
                <CasinoScreenshotsCarousel images={screenshots} className="w-full" />
              </div>

              {/* Customer Support Section */}
              <div className="mb-12">
                <p className="text-gray-700 mb-6">
                  Nachdem ich dir einen Überblick über die Spiele und Boni gegeben habe, möchte ich nun auf den Kundensupport und meine Erfahrungen mit den {casino.name} Zahlungsmethoden eingehen. Der {casino.name} Kundendienst ist rund um die Uhr über Live-Chat und E-Mail erreichbar. Das Support-Team ist bekannt für seine schnellen und hilfreichen Antworten, sodass du bei Fragen oder Problemen <strong>gut aufgehoben bist</strong>.
                </p>
              </div>

              {/* Casino Bonus Section */}
              <CasinoBonus casino={casino} />

              {/* Casino Games Section */}
              <CasinoGames gameCategories={gameCategories} popularSlots={popularSlots} availableCategories={casino.gameCategories} />
              
              {/* Mobile Casino Section */}
              <div id="mobile-casino" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 scroll-mt-24">Mobile Casino</h2>
                <p className="text-gray-700 mb-4">
                  Es bedarf keiner Revolution App, um Spielautomaten über ein Smartphone oder Tablet bedienen zu können. Das Gleiche gilt für Live Spiele. Wer viel unterwegs ist, der kann die Casino Webseite ganz einfach über einen modernen HTML-Browser aufrufen und bekommt das volle Programm. Es ist auch überhaupt kein Problem Zahlungen mit dem Handy zu tätigen.
                </p>
                <p className="text-gray-700 mb-4">
                  Die mobile Webseite wurde perfekt für ein Android-Gerät und iOS optimiert. Das Spiel an einem Slot läuft flüssig, ohne Ruckler und Verzögerungen. Die Benutzeroberfläche ist logisch aufgebaut und dank einer modernen Software auch einfach zu navigieren. Für die benutzerfreundliche Mobile Casino Webseite gibt es von mir definitiv eine positive Revolution Bewertung.
                </p>
              </div>
              
              {/* Software Providers Section */}
              <div id="software-providers" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 scroll-mt-24">Software Providers</h2>
                <p className="text-gray-700 mb-4">
                  Dank der großen Auswahl an Spielen bester Software Provider ist für jeden Typ Spieler eine positive Revolution Erfahrung fast schon sicher. Du findest auf der Casinoseite Anbieter wie NetEnt, Play'n GO, Pragmatic Play, Evolution, Red Tiger, Gamomat und viele mehr. Jeder Slot eines dieser Software Studios glänzt mit ganz besonderen Merkmalen. Das <strong>macht das Spielerlebnis so einzigartig</strong>.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {/* Pragmatic Play */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="h-16 flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/cebedfb0-d672-479a-8818-2b91c6987820.png" alt="Pragmatic Play logo" className="h-12 object-contain" />
                    </div>
                    <p className="text-gray-700 text-sm mb-4">
                      Pragmatic Play entwickelt nicht nur Slots, sondern auch Live Dealer Spiele.
                    </p>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors w-full">
                      Mehr über Pragmatic Play
                    </button>
                  </div>
                  
                  {/* Wazdan */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="h-16 flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/cebedfb0-d672-479a-8818-2b91c6987820.png" alt="Wazdan logo" className="h-12 object-contain" />
                    </div>
                    <p className="text-gray-700 text-sm mb-4">
                      Viele tolle Spiele mit einzigartigen Features und hohen Return to Player Werten für große Gewinnausszahlungen.
                    </p>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors w-full">
                      Mehr über Wazdan
                    </button>
                  </div>
                  
                  {/* GAMOMAT */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="h-16 flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/cebedfb0-d672-479a-8818-2b91c6987820.png" alt="GAMOMAT logo" className="h-12 object-contain" />
                    </div>
                    <p className="text-gray-700 text-sm mb-4">
                      Ein Softwareentwickler, bekannt für seine lohnenden fruchtigen Slots und gut zahlenden Spielautomaten mit alt-ägyptischen Themen.
                    </p>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors w-full">
                      Mehr über GAMOMAT
                    </button>
                  </div>
                  
                  {/* NetEnt */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="h-16 flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/cebedfb0-d672-479a-8818-2b91c6987820.png" alt="NetEnt logo" className="h-12 object-contain" />
                    </div>
                    <p className="text-gray-700 text-sm mb-4">
                      NetEnt bietet eine vielfältige Auswahl an innovativen Slots und spannenden Casino-Spielen mit beeindruckender Grafik und packenden Soundeffekten.
                    </p>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors w-full">
                      Mehr über NetEnt
                    </button>
                  </div>
                  
                  {/* AMATIC */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="h-16 flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/cebedfb0-d672-479a-8818-2b91c6987820.png" alt="AMATIC logo" className="h-12 object-contain" />
                    </div>
                    <p className="text-gray-700 text-sm mb-4">
                      Der Software Provider bietet mit seinen Online Spielautomaten eine faszinierende Welt mit großen Überraschungen für jeden Spielertyp.
                    </p>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors w-full">
                      Mehr über AMATIC
                    </button>
                  </div>
                  
                  {/* Triple Edge Studios */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="h-16 flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/cebedfb0-d672-479a-8818-2b91c6987820.png" alt="Triple Edge Studios logo" className="h-12 object-contain" />
                    </div>
                    <p className="text-gray-700 text-sm mb-4">
                      Top Softwareentwickler für Online Slots mit bestem Design, attraktiven Bonus Features und hohen RTPs.
                    </p>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors w-full">
                      Mehr über Triple Edge Studios
                    </button>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    Übersicht aller Slot Provider
                  </button>
                </div>
                
                <p className="text-gray-700 mt-8">
                  Mein Revolution Test hat gezeigt, <strong>wie wichtig beste Softwareanbieter für Online Casinos sind</strong>. Die Qualität der Online Slots spiegelt das Image wider, welches sich ein Provider über die Jahre angeeignet hat. Für Spieler sind Anbieter mit Spielautomaten der besten Entwickler daher auch immer die bessere Wahl. Sie bekommen hier neben dem besonderen Casino-Erlebnis auch mehr Chancen auf große Echtgeld Gewinne.
                </p>
              </div>
              
              {/* Payment Methods Section */}
              <div id="payment-methods" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 scroll-mt-24">Payment Methods</h2>
                
                <p className="text-gray-700 mb-4">
                  Bei Revolution kannst du dich auf <a href="#" className="text-blue-600 hover:underline">sichere Zahlungsmittel</a> verlassen. Der Anbieter erlaubt Ein- und Auszahlungen mit Fiat-Währungen und Kryptowährungen wie Bitcoin, Litecoin und Ethereum. <strong>Kryptos gelten als besonders sicher</strong> und sind für die schnellsten Einzahlungen in Online Casinos verantwortlich.
                </p>
                
                {/* Payment options detail box */}
                <div className="bg-gray-100 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4 text-center">Zahlungsoptionen im Detail</h3>
                  
                  <div className="overflow-hidden">
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-4 font-medium">Zahlungsmethoden:</td>
                          <td className="py-3 px-4">
                            Giropay, Deutsche Bank, Deutsche Postbank, Commerzbank, Sparkasse, Bank Transfer,
                            Instant Pay, Sofortüberweisung, Visa, Mastercard, CashToCode, Jeton, MiFinity, Tether,
                            Litecoin, Ethereum, USD Coin, BNB Chain, Dogecoin, Solana, Shiba Inu, BUSD, TRON,
                            Bitcoin
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-4 font-medium">Mindesteinzahlung:</td>
                          <td className="py-3 px-4">10€</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-4 font-medium">Gebühren:</td>
                          <td className="py-3 px-4">–</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-4 font-medium">Akz. Währungen:</td>
                          <td className="py-3 px-4">EURO</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium">Auszahlungsoptionen:</td>
                          <td className="py-3 px-4">
                            Bank Transfer, Visa, Mastercard, Jeton, MiFinity, Visa via Bank Transfer, Tether, Litecoin,
                            Ethereum, USD Coin, BNB Chain, Dogecoin, Solana, Shiba Inu, BUSD, TRON, Bitcoin
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-6 text-center">Beliebte Zahlungsmittel bei Revolution</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Mastercard */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 flex flex-col items-center">
                      <img src="/lovable-uploads/07dc55be-634f-4b09-acd3-0cfee685c9f1.png" alt="Mastercard" className="h-12 object-contain mb-6" />
                      <div className="w-full">
                        <div className="flex justify-between mb-2">
                          <span>Einzahlung:</span>
                          <span className="text-green-500">✓</span>
                        </div>
                        <div className="flex justify-between mb-4">
                          <span>Auszahlung:</span>
                          <span className="text-green-500">✓</span>
                        </div>
                      </div>
                      <Button className="w-full bg-[#703d98] hover:bg-[#5c3180]">
                        Mastercard Casinos
                      </Button>
                    </div>
                  </div>
                  
                  {/* Jeton */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 flex flex-col items-center">
                      <img src="/lovable-uploads/8130b250-758b-4557-a573-63dffd334866.png" alt="Jeton" className="h-12 object-contain mb-6" />
                      <div className="w-full">
                        <div className="flex justify-between mb-2">
                          <span>Einzahlung:</span>
                          <span className="text-green-500">✓</span>
                        </div>
                        <div className="flex justify-between mb-4">
                          <span>Auszahlung:</span>
                          <span className="text-green-500">✓</span>
                        </div>
                      </div>
                      <Button className="w-full bg-[#703d98] hover:bg-[#5c3180]">
                        Jeton Casinos
                      </Button>
                    </div>
                  </div>
                  
                  {/* Bank Transfer */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 flex flex-col items-center">
                      <div className="h-12 flex items-center justify-center mb-6">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-md mr-2">
                            <span className="text-white text-xl">🏛️</span>
                          </div>
                          <span className="font-bold text-lg">BANK ÜBERWEISUNG</span>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between mb-2">
                          <span>Einzahlung:</span>
                          <span className="text-green-500">✓</span>
                        </div>
                        <div className="flex justify-between mb-4">
                          <span>Auszahlung:</span>
                          <span className="text-green-500">✓</span>
                        </div>
                      </div>
                      <Button className="w-full bg-[#703d98] hover:bg-[#5c3180]">
                        Banküberweisung Casinos
                      </Button>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">
                  Nicht nur die Revolution Einzahlungsmethoden sind sicher und verlässlich. Auch die sichere Revolution Auszahlung erfolgt meist innerhalb weniger Stunden. Es gibt aber auch Zahlungsmethoden, bei denen der Überweisungsprozess bis zu 5 Werktage in Anspruch nehmen kann. Für die Zahlungssicherheit ist die <strong>moderne SSL-Verschlüsselung</strong> verantwortlich. Sie minimiert das Risiko, dass Zahlungen auf einem unbefugten Konto landen.
                </p>
              </div>
              
              {/* License & Security Section - NEW */}
              <div id="casino-license" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 scroll-mt-24">Casino License & Security</h2>
                
                <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6 flex gap-4">
                  <img src="/lovable-uploads/05994598-ce96-494c-8769-0916d17e3c87.png" alt="Casino license" className="w-16 h-16 object-contain" />
                  <div>
                    <p className="text-gray-700">
                      Revolution besitzt eine gültige Glücksspiel Lizenz der Antillephone N.V. Dadurch kann die Sicherheit und der Spielerschutz bestmöglich und zu jeder Zeit gewährleistet werden.
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">
                  Dank der strengen Auflagen für <strong>Besitzer einer EU-Lizenz</strong> kann Spielern seitens dieser Anbieter ein umfangreicher Spielerschutz gewährleistet werden. Der Glücksspielanbieter Revolution verfügt über eine Glücksspiellizenz der Antillephone N.V. und gilt daher als eines der sichersten Online Casinos. Zahlungen und persönliche Daten werden im vollen Umfang geschützt und Spieler werden bei abweichendem Spielverhalten immer betreut.
                </p>
                
                <p className="text-gray-700 mb-6">
                  Der <strong>Spieler- und Datenschutz hat höchste Priorität</strong>. Für eine hohe Revolution Sicherheit bedarf es einer sicheren Casinosoftware, einer modernen Verschlüsselungstechnologie und einer regelmäßigen Prüfung der Zufallsgeneratoren. Zwar sind diese Maßnahmen mit hohen finanziellen Aufwendungen verbunden, doch haben seriöse Online Casinos stets die Sicherheit der Spieler als oberste Priorität.
                </p>
              </div>
              
              {/* Customer Support Section - NEW */}
              <div id="customer-support" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 scroll-mt-24">Customer Support</h2>
                
                <p className="text-gray-700 mb-4">
                  Den Revolution Kundendienst erreichst du via <strong>24/7 Live Chat</strong>. Bei dringenden Fragen ist der Chat die schnellste Kontaktmöglichkeit. Die professionellen und höflichen Mitarbeiter sind der deutschen Sprache mächtig und können dir bei deinem Problem beste Lösungen bieten.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-500 text-2xl">💬</span>
                      </div>
                      <h3 className="font-bold text-lg">Live Chat</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>24/7 verfügbar</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Schnellste Antwortzeit</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Deutschsprachige Mitarbeiter</span>
                      </li>
                    </ul>
                    <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
                      Zum Live Chat
                    </Button>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-500 text-2xl">✉️</span>
                      </div>
                      <h3 className="font-bold text-lg">E-Mail Kontakt</h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Bei größeren Anliegen empfiehlt sich der E-Mail Kontakt. Hier kannst du dein Problem auch auf einem Word Dokument schildern und als PDF mit Bildern anheften und versenden.
                    </p>
                    <Button className="w-full mt-4 bg-purple-500 hover:bg-purple-600">
                      E-Mail senden
                    </Button>
                  </div>
                </div>
                
                <p className="text-gray-700">
                  Insgesamt ist der Revolution Kundendienst einer der besseren im Vergleich zu anderen Online Casinos. Die schnellen Antwortzeiten und die kompetenten Mitarbeiter sorgen dafür, dass Probleme rasch gelöst werden können und du dich als Spieler gut aufgehoben fühlst.
                </p>
              </div>
              
              {/* Our Rating Section - NEW - UPDATED with real photo */}
              <div id="our-rating" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 scroll-mt-24">Our Rating</h2>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Reviewer information - Updated with the real photo */}
                    <div className="md:w-1/4">
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="w-24 h-24 mb-3">
                          <AvatarImage src="/lovable-uploads/2ee13871-e515-438e-91b1-9497cf70ff27.png" alt="William Brooks" />
                          <AvatarFallback>WB</AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-lg">William Brooks</h3>
                        <p className="text-gray-500 text-sm">Casino Expert</p>
                        <div className="flex mt-2">
                          <Rating value={4.6} max={5} size="sm" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Rating details */}
                    <div className="md:w-3/4">
                      <div className="space-y-4">
                        <p className="text-gray-700">
                          Nach meinem ausführlichen Revolution Test kann ich das Online Casino wärmstens empfehlen. Der Anbieter überzeugt mit einer breiten Palette an Spielen, einer tollen mobilen App, attraktiven Bonusangeboten und einem hervorragenden Kundenservice.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-lg mb-2">Stärken</h4>
                            <ul className="space-y-1">
                              <li className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-500 mt-1" />
                                <span>Über 10.000 Spiele</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-500 mt-1" />
                                <span>Attraktive Bonusangebote</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-500 mt-1" />
                                <span>Schnelle Auszahlungen</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-500 mt-1" />
                                <span>Hochwertige mobile Plattform</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-500 mt-1" />
                                <span>Kundenservice in Deutsch</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-lg mb-2">Bewertung nach Kategorie</h4>
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">Spielangebot</span>
                                  <span className="text-sm font-medium">9.6/10</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-green-500 h-2 rounded-full" style={{width: '96%'}}></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">Bonusangebote</span>
                                  <span className="text-sm font-medium">9.2/10</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">Kundenservice</span>
                                  <span className="text-sm font-medium">9.8/10</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-green-500 h-2 rounded-full" style={{width: '98%'}}></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">Zahlungsmethoden</span>
                                  <span className="text-sm font-medium">9.4/10</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-green-500 h-2 rounded-full" style={{width: '94%'}}></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">Benutzerfreundlichkeit</span>
                                  <span className="text-sm font-medium">9.5/10</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-green-500 h-2 rounded-full" style={{width: '95%'}}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-gray-600 text-sm">Gesamtbewertung:</span>
                              <span className="ml-2 font-bold text-xl">9.5/10</span>
                            </div>
                            <Button>
                              Casino besuchen
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* FAQ Section */}
              <div id="faq" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 scroll-mt-24">Frequently Asked Questions</h2>
                
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-lg mb-2">Is {casino.name} a legitimate online casino?</h3>
                    <p className="text-gray-700">
                      Yes, {casino.name} is a legitimate online casino licensed by {casino.licenseInfo}. They adhere to strict regulatory standards to ensure fair gaming and player protection.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-lg mb-2">How do I claim the welcome bonus at {casino.name}?</h3>
                    <p className="text-gray-700">
                      To claim the welcome bonus, simply register an account, make a qualifying deposit of at least {casino.minDeposit}€, and the bonus will be credited to your account automatically. Remember that the bonus comes with a {casino.bonusRequirements}.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-lg mb-2">What payment methods are available at {casino.name}?</h3>
                    <p className="text-gray-700">
                      {casino.name} offers a wide range of payment methods including credit cards (Visa, Mastercard), e-wallets (PayPal, Skrill), bank transfers, and cryptocurrencies. All transactions are secured with SSL encryption.
                    </p>
                  </div>
                </div>
              </div>
              
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-4">
                {/* Quick Casino Info Card */}
                <CasinoQuickInfo casino={casino} />
                
                {/* Table of Contents */}
                <CasinoTableOfContents casino={casino} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CasinoReviewTemplate;
