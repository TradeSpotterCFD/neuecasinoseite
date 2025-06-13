
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CasinoCard } from "@/components/CasinoCard";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";
import { CasinoChip } from "@/components/ui/casino-chip";
import { CasinoBrandsDropdown } from "@/components/CasinoBrandsDropdown";
import { PaymentMethodsDropdown } from "@/components/PaymentMethodsDropdown";
import { Casino, CasinoCategory } from "@/types";
import { ArrowRight, ChevronRight, Search, Trophy, Star, Clock, Shield, Zap, Globe, Filter } from "lucide-react";
import { fetchAllCasinos, fetchAllCategories, fetchFeaturedCasinos } from "@/services/casinoService";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [featuredCasinos, setFeaturedCasinos] = useState<Casino[]>([]);
  const [topCasinos, setTopCasinos] = useState<Casino[]>([]);
  const [categories, setCategories] = useState<CasinoCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [allCasinos, featured, allCategories] = await Promise.all([
          fetchAllCasinos(),
          fetchFeaturedCasinos(),
          fetchAllCategories()
        ]);
        
        // Sort casinos by rating for the top list
        const sortedCasinos = [...allCasinos].sort((a, b) => b.rating - a.rating).slice(0, 5);
        
        setTopCasinos(sortedCasinos);
        setFeaturedCasinos(featured);
        setCategories(allCategories);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleFindCasinos = () => {
    navigate('/casino-results');
  };

  const currentYear = new Date().getFullYear();
  const pageTitle = `Top Online Casinos ${currentYear} – Play & Win at Trusted Sites`;
  const pageDescription = `Discover the best online casinos in ${currentYear}. Read expert reviews, claim top bonuses & play safely at licensed, trusted gambling sites. Start winning today!`;
  const twitterImageUrl = "/images/twitter-card.jpg"; // Path relative to public folder

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {/* Open Graph Tags (optional but recommended) */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={twitterImageUrl} />
        <meta property="og:url" content={window.location.href} /> {/* Use current URL */}
        <meta property="og:type" content="website" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={twitterImageUrl} />
        {/* Optional: Add Twitter site handle if available */}
        {/* <meta name="twitter:site" content="@YourTwitterHandle" /> */}
      </Helmet>
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-hero-pattern bg-cover bg-center py-16 md:py-24">
        <div className="max-w-[1395px] mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="inline-block mb-6 animate-fade-in">
              <CasinoChip className="bg-white/20 backdrop-blur-sm border border-white/40 text-white">
                <Trophy className="h-3.5 w-3.5 mr-1" /> Top Rated Online Casinos
              </CasinoChip>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight animate-fade-in" style={{ animationDelay: "100ms" }}>
              Find The Best Online Casinos For You
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
              Expert reviews, exclusive bonuses, and a curated selection of the most trusted online casinos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Button size="lg" className="bg-white text-casino-dark hover:bg-white/90">
                Top Casinos <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Casino Guides
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="bg-white border-b">
        <div className="max-w-[1395px] mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto md:flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search for casinos, games, bonuses..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              {/* Casino Brands Dropdown */}
              <div className="w-full md:w-auto">
                <CasinoBrandsDropdown />
              </div>
              
              {/* Payment Methods Dropdown */}
              <div className="w-full md:w-auto">
                <PaymentMethodsDropdown />
              </div>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="flex gap-2 items-center">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
              <Button variant="default" onClick={handleFindCasinos}>Find Casinos</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
        {/* Top Casinos Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-[1395px] mx-auto px-4 md:px-6">
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h2 className="font-display text-3xl font-bold tracking-tight mb-2">Top Rated Casinos</h2>
                  <p className="text-gray-600">The highest-rated online casinos based on expert reviews and player feedback</p>
                </div>
                <Button variant="link" className="hidden md:flex items-center text-primary">
                  View All Top Casinos
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-6">
                {isLoading ? (
                  Array(3).fill(0).map((_, index) => (
                    <div key={index} className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
                  ))
                ) : (
                  topCasinos.slice(0, 3).map((casino, index) => (
                    <CasinoCard key={casino.id} casino={casino} rank={index + 1} />
                  ))
                )}
              </div>

              <div className="mt-8 text-center md:hidden">
                <Button variant="outline">
                  See More Casinos
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Casino Categories */}
        <section className="py-12 bg-white border-t border-b">
          <div className="max-w-[1395px] mx-auto px-4 md:px-6">
            <div>
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl font-bold tracking-tight mb-4">Browse by Category</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Find the perfect casino based on game type, payment options, or special features</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isLoading ? (
                  Array(8).fill(0).map((_, index) => (
                    <div key={index} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
                  ))
                ) : (
                  categories.map((category) => (
                    <a 
                      href={`/category/${category.id}`} 
                      key={category.id}
                      className="casino-card p-6 flex flex-col items-center text-center hover:border-primary/40 group"
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-primary/10 mb-3 transition-colors">
                        {/* We would use an actual icon here, but for now just show text */}
                        <span className="text-xl font-semibold text-gray-700 group-hover:text-primary">{category.icon.charAt(0)}</span>
                      </div>
                      <h3 className="font-display font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{category.count} Casinos</p>
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Casinos */}
        <section className="py-12 md:py-16">
          <div className="max-w-[1395px] mx-auto px-4 md:px-6">
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <h2 className="font-display text-3xl font-bold tracking-tight">Featured Casinos</h2>
                  </div>
                  <p className="text-gray-600">Our handpicked selection of top online casinos with exclusive bonuses</p>
                </div>
                <Button variant="link" className="hidden md:flex items-center text-primary">
                  View All Featured Casinos
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                  Array(4).fill(0).map((_, index) => (
                    <div key={index} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
                  ))
                ) : (
                  featuredCasinos.slice(0, 4).map((casino) => (
                    <CasinoCard key={casino.id} casino={casino} compact />
                  ))
                )}
              </div>

              <div className="mt-8 text-center md:hidden">
                <Button variant="outline">
                  View All Featured Casinos
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-16 bg-white border-t">
          <div className="max-w-[1395px] mx-auto px-4 md:px-6">
            <div>
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold tracking-tight mb-4">Why Choose CasinoRank</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We take the guesswork out of finding the perfect online casino
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Star className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">Expert Reviews</h3>
                  <p className="text-gray-600">Detailed analysis by our team of casino experts</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Zap className="h-7 w-7 text-purple-600" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">Exclusive Bonuses</h3>
                  <p className="text-gray-600">Special offers available only through our site</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Shield className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">Trusted Operations</h3>
                  <p className="text-gray-600">We only recommend licensed and regulated casinos</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                    <Clock className="h-7 w-7 text-amber-600" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">Updated Daily</h3>
                  <p className="text-gray-600">Fresh casino information and new promotions</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-gradient-casino text-white">
          <div className="max-w-[1395px] mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Casino?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Compare the best online casinos based on bonuses, game selection, payment methods, and more.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-casino-dark hover:bg-white/90" onClick={() => navigate('/casino-results')}>
                  Compare Top Casinos
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Get Exclusive Bonuses
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
