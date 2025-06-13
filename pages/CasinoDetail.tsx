import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Rating } from "@/components/ui/rating";
import { CasinoChip } from "@/components/ui/casino-chip";
import { Button } from "@/components/ui/button";
import { Casino } from "@/types"; // Ensure this type includes the new markdown fields
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCasinoById } from "@/services/casinoService"; // Ensure this service fetches the new markdown fields
import { ArrowRight, Clock, Info, Shield, Gift, CreditCard, Check, ChevronRight, ExternalLink } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeExternalLinks from 'rehype-external-links';

const CasinoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [casino, setCasino] = useState<Casino | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCasino = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        // Ensure fetchCasinoById retrieves all necessary fields, including the new markdown ones
        const data = await fetchCasinoById(id); 
        setCasino(data || null);
      } catch (error) {
        console.error("Error loading casino:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCasino();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Loading casino details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!casino) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Casino Not Found</h2>
            <p className="mb-6">The casino you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <a href="/">Return to Home</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Helper component for rendering Markdown safely
  const SafeMarkdown = ({ children }: { children: string | null | undefined }) => {
    if (!children) return null;
    return (
      <ReactMarkdown
        rehypePlugins={[
          rehypeRaw, // Allows safe HTML (like your <a> overrides)
          [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }] // Opens external links in new tab
        ]}
        // You might want to customize components further, e.g., styling links
        // components={{
        //   a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />
        // }}
      >
        {children}
      </ReactMarkdown>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Casino Header */}
      <section className="bg-gradient-casino py-12 text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg mb-4 w-full max-w-[240px] aspect-[3/2] flex items-center justify-center">
                  {casino.logo_url ? ( // Use logo_url from DB
                     <img 
                       src={casino.logo_url} 
                       alt={`${casino.name} logo`} 
                       className="max-w-full max-h-full object-contain"
                     />
                   ) : (
                     <div className="text-gray-400">No Logo</div> // Placeholder if no logo
                   )}
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Rating value={casino.rating || 0} /> {/* Handle potential null rating */}
                    <span className="font-semibold">{casino.rating || 0}/5</span>
                  </div>
                  <p className="text-sm text-white/80">Based on expert review</p>
                </div>
              </div>

              <div className="w-full md:w-2/3 text-center md:text-left">
                <div className="mb-4">
                  {/* Use optional chaining for isVerified property */}
                  {/* {casino.isVerified && ( // Assuming isVerified is not a standard field yet
                    <CasinoChip className="bg-white/20 backdrop-blur-sm border border-white/40 text-white mb-3">
                      <Shield className="h-3.5 w-3.5 mr-1" /> Verified & Trusted
                    </CasinoChip>
                  )} */}
                  <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{casino.name}</h1>
                  {/* Render description using Markdown */}
                  <div className="prose prose-invert max-w-none text-white/80">
                     <SafeMarkdown>{casino.description}</SafeMarkdown> 
                  </div>
                </div>

                {/* Features might need adjustment depending on how they are stored */}
                {/* <div className="flex flex-wrap gap-2 mb-6">
                  {casino.features?.map((feature, index) => ( // Assuming features is an array
                    <CasinoChip key={index} className="bg-white/10 text-white border border-white/30">
                      <Check className="h-3.5 w-3.5 mr-1" />
                      {feature}
                    </CasinoChip>
                  ))}
                </div> */}

                <div className="flex flex-col sm:flex-row gap-4 mt-6"> {/* Added mt-6 for spacing */}
                  <Button size="lg" className="bg-white text-casino-dark hover:bg-white/90" asChild>
                    <a href={casino.url || '#'} target="_blank" rel="noopener noreferrer"> {/* Use casino URL */}
                      Visit Casino
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  {/* Claim Bonus button might need specific logic */}
                  {/* <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Claim Bonus
                    <Gift className="ml-2 h-4 w-4" />
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow py-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto mb-8">
                <TabsTrigger 
                  value="overview" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="bonuses" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
                >
                  Bonuses
                </TabsTrigger>
                <TabsTrigger 
                  value="games" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
                >
                  Games
                </TabsTrigger>
                <TabsTrigger 
                  value="payments" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
                >
                  Payments
                </TabsTrigger>
                <TabsTrigger 
                  value="review" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
                >
                  Full Review
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="col-span-2">
                    <div className="bg-white rounded-lg border p-6 mb-8">
                      <h2 className="font-display text-2xl font-semibold mb-4">About {casino.name}</h2>
                      {/* Render description using Markdown */}
                      <div className="prose max-w-none text-gray-700 mb-6">
                        <SafeMarkdown>{casino.description}</SafeMarkdown>
                      </div>
                      
                      <h3 className="font-display text-xl font-semibold mb-3">Welcome Bonus</h3>
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Gift className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                          <div>
                            {/* Render bonus description using Markdown */}
                            <div className="prose prose-sm max-w-none font-semibold text-gray-900 mb-1">
                               <SafeMarkdown>{casino.bonus_description}</SafeMarkdown> {/* Assuming bonus_description field */}
                            </div>
                            <p className="text-sm text-gray-600">
                              New players can enjoy a generous welcome package to boost their initial gameplay
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Key Features might need adjustment */}
                      {/* <h3 className="font-display text-xl font-semibold mb-3">Key Features</h3>
                      <ul className="space-y-2 mb-6">
                        {casino.features?.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul> */}

                      {/* Removed "Read Full Review" button as content is now likely in this tab */}
                    </div>
                  </div>

                  <div className="col-span-1">
                    <div className="bg-white rounded-lg border p-6 mb-6">
                      <h3 className="font-display text-lg font-semibold mb-4">Casino Info</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Established</p>
                            <p className="font-medium">{casino.year_established || 'N/A'}</p> {/* Use year_established */}
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Shield className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">License</p>
                            <p className="font-medium">{casino.license_info || 'N/A'}</p> {/* Use license_info */}
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <CreditCard className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Min Deposit</p>
                            <p className="font-medium">${casino.min_deposit || 'N/A'}</p> {/* Use min_deposit */}
                          </div>
                        </div>
                      </div>

                      <div className="border-t my-4 pt-4">
                        <a
                          href={casino.url || '#'} // Use casino URL
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 text-primary hover:underline"
                        >
                          Visit Casino Website
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>

                    {/* Payment Methods might need adjustment */}
                    {/* <div className="bg-white rounded-lg border p-6">
                      <h3 className="font-display text-lg font-semibold mb-4">Payment Methods</h3>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {casino.paymentMethods?.slice(0, 6).map((method, index) => ( // Assuming paymentMethods is an array
                          <div key={index} className="bg-gray-100 rounded p-2 flex items-center justify-center">
                            <span className="text-xs text-gray-700">{method}</span>
                          </div>
                        ))}
                      </div>
                      {casino.paymentMethods?.length > 6 && (
                        <Button variant="link" className="text-sm w-full">
                          View All Payment Methods
                        </Button>
                      )}
                    </div> */}
                  </div>
                </div>
              </TabsContent>

              {/* Bonuses Tab */}
              <TabsContent value="bonuses" className="mt-0">
                <div className="bg-white rounded-lg border p-6">
                  <h2 className="font-display text-2xl font-semibold mb-4">Bonuses & Promotions</h2>
                  {/* Bonus Intro Text */}
                  <div className="prose max-w-none mb-6">
                     <SafeMarkdown>{casino.bonus_intro_text}</SafeMarkdown>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
                    <h3 className="font-display text-xl font-semibold mb-3">Welcome Bonus</h3>
                    {/* Bonus Description */}
                    <div className="prose prose-sm max-w-none text-lg font-medium text-gray-900 mb-2">
                       <SafeMarkdown>{casino.bonus_description}</SafeMarkdown>
                    </div>
                    {/* Add other bonus details if available */}
                    {/* <p className="text-gray-700 mb-4">...</p> */}
                    <Button asChild>
                       <a href={casino.url || '#'} target="_blank" rel="noopener noreferrer">
                         Claim Bonus
                         <ArrowRight className="ml-2 h-4 w-4" />
                       </a>
                    </Button>
                  </div>
                  {/* Bonus Conclusion Text */}
                  <div className="prose max-w-none text-gray-500 text-sm">
                     <SafeMarkdown>{casino.bonus_conclusion_text}</SafeMarkdown>
                  </div>
                  <p className="text-gray-500 text-sm mt-4">
                    * Terms and conditions apply. Please gamble responsibly.
                  </p>
                </div>
              </TabsContent>

              {/* Games Tab */}
              <TabsContent value="games" className="mt-0">
                <div className="bg-white rounded-lg border p-6">
                  <h2 className="font-display text-2xl font-semibold mb-4">Game Selection</h2>
                  {/* Games Section Text */}
                  <div className="prose max-w-none text-gray-700 mb-6">
                     <SafeMarkdown>{casino.games_section_text}</SafeMarkdown>
                  </div>

                  {/* Online Slot Machines Section */}
                  <div className="mt-8 border-t pt-6">
                     <div className="prose max-w-none mb-4">
                        <h3 className="font-display text-xl font-semibold">
                           <SafeMarkdown>{casino.slot_machines_section_headline}</SafeMarkdown>
                        </h3>
                        <SafeMarkdown>{casino.slot_machines_section_text1}</SafeMarkdown>
                        <SafeMarkdown>{casino.slot_machines_section_text2}</SafeMarkdown>
                     </div>
                  </div>

                  {/* Existing Game Categories (adjust if needed) */}
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> ... </div> */}
                </div>
              </TabsContent>

              {/* Payments Tab */}
              <TabsContent value="payments" className="mt-0">
                <div className="bg-white rounded-lg border p-6">
                  <h2 className="font-display text-2xl font-semibold mb-4">Payment Methods</h2>
                  <p className="text-gray-700 mb-6">
                    {casino.name} offers a variety of secure payment options for deposits and withdrawals.
                  </p>

                  {/* Payment Methods Grid (adjust if needed) */}
                  {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"> ... </div> */}

                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p>
                        Withdrawal times vary by payment method. E-wallets typically process within 24 hours, while card payments and bank transfers may take 3-5 business days.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Review Tab - Now uses Markdown fields */}
              <TabsContent value="review" className="mt-0">
                <div className="bg-white rounded-lg border p-6">
                  <h2 className="font-display text-2xl font-semibold mb-4">Expert Review</h2>
                  <div className="flex items-center gap-3 mb-6">
                    <Rating value={casino.rating || 0} size="lg" />
                    <span className="text-xl font-semibold">{casino.rating || 0}/5</span>
                  </div>
                  <div className="prose max-w-none">
                     {/* Render Intro Texts */}
                     <SafeMarkdown>{casino.intro_text}</SafeMarkdown>
                     <SafeMarkdown>{casino.additional_intro_text}</SafeMarkdown>
                     
                     {/* Render general description if needed, or other review parts */}
                     <SafeMarkdown>{casino.description}</SafeMarkdown> 

                     {/* You might want to add more specific review sections here */}
                     
                     {/* Example of rendering other potential fields */}
                     {/* 
                     <h3>Game Variety</h3>
                     <SafeMarkdown>{casino.review_game_variety_text}</SafeMarkdown> 
                     <h3>Customer Support</h3>
                     <SafeMarkdown>{casino.review_support_text}</SafeMarkdown> 
                     */}

                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                       <a href={casino.url || '#'} target="_blank" rel="noopener noreferrer">
                         Visit Casino
                         <ArrowRight className="ml-2 h-4 w-4" />
                       </a>
                    </Button>
                    {/* <Button size="lg" variant="outline">
                      Claim Bonus
                      <Gift className="ml-2 h-4 w-4" />
                    </Button> */}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CasinoDetail;
