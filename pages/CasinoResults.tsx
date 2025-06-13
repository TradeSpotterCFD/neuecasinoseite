import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Casino } from "@/types";
import { CasinoChip } from "@/components/ui/casino-chip";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext
} from "@/components/ui/pagination";
import { Slider } from "@/components/ui/slider";
import { Heart, MapPin, Calendar, Coins, Star, Diamond, Dices, Badge, BadgeDollarSign, Filter, ChevronDown, ChevronRight } from "lucide-react";
// Import the function to fetch from Supabase
import { fetchCasinosFromSupabase } from "@/services/casinoService";
import { Link, useNavigate } from "react-router-dom";
import { Rating } from "@/components/ui/rating";
import { useQuery } from "@tanstack/react-query";
import { PaymentMethodsDropdown } from "@/components/PaymentMethodsDropdown"; // Import hinzugefügt

const CasinoResults = () => {
  const navigate = useNavigate();
  const [bonusRange, setBonusRange] = useState([0, 1000]);
  const [casinoNameFilter, setCasinoNameFilter] = useState(""); // Changed initial state to empty string

  // Fetch casinos data using React Query from Supabase
  const { data: casinos = [], isLoading } = useQuery<Casino[]>({ // Explicitly type the data
    queryKey: ['casinos'],
    queryFn: fetchCasinosFromSupabase // Use the new function
  });

  // Filter casinos based on the casino name input
  const filteredCasinos = casinos.filter(casino =>
    casino.name.toLowerCase().includes(casinoNameFilter.toLowerCase())
  );

  console.log("Filtered Casinos:", JSON.stringify(filteredCasinos));

  // Pagination settings
  const resultsPerPage = 6;
  const totalResults = filteredCasinos.length; // Use filteredCasinos for total count

  // Get paginated casinos from the filtered list
  const casinosToDisplay = filteredCasinos; // Display all filtered casinos for now


  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4 border-b">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3 text-gray-400" />
            <span className="text-gray-900">Casino Results</span>
          </div>
        </div>
      </div>

      <main className="flex-grow bg-gray-50 py-8">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="w-full md:w-72 shrink-0">
              <div className="bg-white rounded-lg shadow p-5 sticky top-20">
                <h2 className="font-display text-xl font-bold mb-6">Filter Casinos</h2>

                {/* Search Box */}
                <div className="mb-6">
                  <label htmlFor="search" className="block font-medium mb-2">Casino Name</label>
                  <input
                    type="text"
                    id="search"
                    placeholder="Casino title, keywords..."
                    value={casinoNameFilter} // Bind value to state
                    onChange={(e) => setCasinoNameFilter(e.target.value)} // Update state on change
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Location */}
                <div className="mb-6">
                  <label className="block font-medium mb-2">Location</label>
                  <div className="relative">
                    <select className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                      <option>All Locations</option>
                      <option>Las Vegas</option>
                      <option>Macau</option>
                      <option>Atlantic City</option>
                      <option>Monte Carlo</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <label className="block font-medium mb-2">Categories</label>
                  <div className="relative">
                    <select className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                      <option>All Categories</option>
                      <option>Slots</option>
                      <option>Table Games</option>
                      <option>Live Dealer</option>
                      <option>Sports Betting</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Casino Types */}
                <div className="mb-6">
                  <label className="block font-medium mb-2">Casino Types</label>
                  <div className="relative">
                    <select className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                      <option>All Types</option>
                      <option>Online</option>
                      <option>Land-based</option>
                      <option>Mobile</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Bonus Range Slider */}
                <div className="mb-6">
                  <label className="block font-medium mb-2">Bonus Range: ${bonusRange[0]} - ${bonusRange[1]}</label>
                  <Slider
                    value={bonusRange}
                    min={0}
                    max={1000}
                    step={50}
                    onValueChange={setBonusRange}
                    className="my-4"
                  />
                </div>

                {/* Payment Methods - Ersetzt durch die neue Komponente */}
                <div className="mb-6">
                  <label className="block font-medium mb-2">Payment Methods</label>
                  <PaymentMethodsDropdown />
                </div>

                {/* Apply Filters Button */}
                <Button className="w-full" size="lg">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </aside>

            {/* Casino Results */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow p-5 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="font-display text-2xl font-bold mb-1">Casino Results</h1>
                    <p className="text-gray-600">Showing {casinosToDisplay.length > 0 ? 1 : 0} - {casinosToDisplay.length} of {totalResults} results</p>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                      <select className="w-full md:w-40 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                        <option>Sort By (Default)</option>
                        <option>Rating (High to Low)</option>
                        <option>Bonus (High to Low)</option>
                        <option>Newest First</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
                    </div>

                    <div className="relative">
                      <select className="w-20 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Casino Cards */}
              <div className="space-y-6">
                {isLoading ? (
                  Array(3).fill(0).map((_, index) => (
                    <div key={index} className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
                  ))
                ) : casinosToDisplay.length === 0 ? (
                  <div className="text-center py-8">No casinos found matching your criteria.</div>
                ) : (
                  casinosToDisplay.map((casino) => (
                    <div key={casino.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
                      <div className="p-5">
                        <div className="flex flex-col md:flex-row gap-5">
                          {/* Logo */}
                          <div className="w-full md:w-16 h-16 flex-shrink-0">
                            <img
                              src={casino.logo}
                              alt={casino.name}
                              className="w-16 h-16 object-contain rounded"
                            />
                          </div>

                          {/* Main Content */}
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div>
                                {/* Categories - using gameCategories and providing a fallback */}
                                <div className="text-sm text-green-600 font-medium mb-1">
                                  {(casino.gameCategories || []).map((category, idx) => (
                                    <span key={idx}>
                                      {idx > 0 && ", "}
                                      {category.replace(/[-_]/g, " ").split(" ").map(word =>
                                        word.charAt(0).toUpperCase() + word.slice(1)
                                      ).join(" ")}
                                    </span>
                                  ))}
                                </div>

                                {/* Casino Name */}
                                <h2 className="font-display text-xl font-bold mb-1 flex items-center gap-2">
                                  {casino.name}
                                  {/* Use optional chaining for isVerified property */}
                                  {/* Assuming isVerified is a boolean field in your Casino type */}
                                  {/* {casino.isVerified && (
                                    <span className="inline-flex items-center justify-center bg-purple-100 text-purple-800 w-5 h-5 rounded-full">
                                      <span className="sr-only">Verified</span>
                                      ✓
                                    </span>
                                  )} */}
                                </h2>

                                {/* License and Year */}
                                <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-500 mt-2">
                                  <div className="flex items-center">
                                    <Badge className="h-4 w-4 mr-1 flex-shrink-0" />
                                    {/* Display licenseInfo as a comma-separated string if it's an array */}
                                    {Array.isArray(casino.licenseInfo) ? casino.licenseInfo.join(', ') : casino.licenseInfo}
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                                    Est. {casino.yearEstablished}
                                  </div>
                                </div>
                              </div>

                              {/* Save Button */}
                              <button className="mt-2 md:mt-0 self-start text-gray-400 hover:text-red-500 transition-colors">
                                <Heart className="h-6 w-6" />
                              </button>
                            </div>

                            {/* Features Tags */}
                            <div className="flex flex-wrap gap-2 mt-4 mb-4">
                               {/* Display featureCategories */}
                              {(casino.featureCategories || []).map((feature, idx) => (
                                <span key={idx} className="py-1 px-3 rounded-full text-xs bg-gray-100 text-gray-800">
                                  {feature}
                                </span>
                              ))}
                              {/* Assuming isFeatured is a boolean field in your Casino type */}
                              {/* {casino.isFeatured && (
                                <span className="py-1 px-3 rounded-full text-xs bg-yellow-100 text-yellow-800">
                                  Featured
                                </span>
                              )} */}
                            </div>

                            {/* Bottom Section */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 pt-4 border-t border-gray-100">
                              <div className="flex items-center text-gray-700">
                                <BadgeDollarSign className="h-4 w-4 mr-1" />
                                <span className="font-medium">{casino.bonuses?.en}</span>
                              </div>

                              <div className="mt-2 md:mt-0 flex items-center gap-1">
                                <Rating value={casino.rating} size="sm" />
                                <span className="text-sm font-medium">{casino.rating?.toFixed(1)}</span>
                              </div>
                            </div>
                          </div>

                          {/* CTA Section */}
                          <div className="flex flex-col justify-center items-center gap-2 md:w-32">
                            <Button
                              onClick={() => navigate(`/casino/${casino.id}`)}
                              className="w-full"
                            >
                              Visit Casino
                            </Button>
                            <Link
                              to={`/casino/${casino.id}`}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              Read Review
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination - Removed temporarily for debugging */}
              {/* <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationLink isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink>2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div> */}

              {/* Casino Alert Box (Bottom) */}
              <div className="bg-white rounded-lg shadow p-5 mt-8">
                <h3 className="font-display text-xl font-bold mb-4">Casino Alert</h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="alertTitle" className="block font-medium mb-2">Title</label>
                    <input
                      type="text"
                      id="alertTitle"
                      placeholder="Enter casino search terms"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="alertFrequency" className="block font-medium mb-2">Email Frequency</label>
                    <div className="relative">
                      <select id="alertFrequency" className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <Button className="w-full">
                    Save Casino Alert
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CasinoResults;
