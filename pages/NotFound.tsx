
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CasinoBrandsDropdown } from "@/components/CasinoBrandsDropdown";
import { Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="max-w-[1395px] w-full mx-auto">
          <div className="max-w-md mx-auto text-center">
            <h1 className="font-display text-9xl font-bold text-gray-200">404</h1>
            <h2 className="font-display text-3xl font-bold mb-4 -mt-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="relative mb-6 max-w-sm mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search for casinos, games, bonuses..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="mb-6 max-w-sm mx-auto">
              <CasinoBrandsDropdown />
            </div>
            
            <div className="space-x-4">
              <Button asChild>
                <a href="/">Back to Home</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/best-casinos">Top Casinos</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
