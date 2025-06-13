
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navigation() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const mainLinks = [
    { name: "Casinos", path: "/" },
    { name: "Bonuses", path: "/bonuses" },
    { name: "Game Types", path: "/game-types" },
    { name: "Payment Methods", path: "/payment-methods" },
    { name: "Guides", path: "/guides" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="font-display text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-casino-blue to-casino-purple">
              CasinoSpotter
            </div>
          </Link>
          <nav className="hidden md:flex gap-6 ml-6">
            {mainLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <Button variant="outline" className="hidden md:flex gap-2" onClick={() => navigate("/compare")}>
            Compare Casinos
          </Button>
          <Button variant="default" onClick={() => navigate("/best-casinos")}>
            Best Casinos
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "md:hidden fixed inset-x-0 top-16 bg-white border-b z-40 transform transition-transform duration-300",
        isMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="container p-4 space-y-4">
          <div className="mb-4">
            <LanguageSwitcher />
          </div>
          <nav className="space-y-3">
            {mainLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block py-2 text-base font-medium text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t">
            <Button 
              className="w-full justify-start" 
              variant="ghost"
              onClick={() => {
                navigate("/compare");
                setIsMenuOpen(false);
              }}
            >
              Compare Casinos
            </Button>
            <Button 
              className="w-full justify-start mt-2" 
              onClick={() => {
                navigate("/best-casinos");
                setIsMenuOpen(false);
              }}
            >
              Best Casinos
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
