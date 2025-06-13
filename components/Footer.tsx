
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-casino-dark text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              CasinoRank
            </h3>
            <p className="text-gray-300 mb-4">
              Your trusted guide to the best online casino experiences. We review, compare, and rank online casinos so you can play with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Best Casinos</a></li>
              <li><a href="/bonuses" className="text-gray-300 hover:text-white transition-colors">Casino Bonuses</a></li>
              <li><a href="/payment-methods" className="text-gray-300 hover:text-white transition-colors">Payment Methods</a></li>
              <li><a href="/guides" className="text-gray-300 hover:text-white transition-colors">Casino Guides</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Casino Types</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Slots Casinos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Live Dealer Casinos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mobile Casinos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Crypto Casinos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">New Casinos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">All Casino Types</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Responsible Gaming</h4>
            <p className="text-gray-300 mb-4">
              We promote responsible gaming and encourage our visitors to play responsibly.
            </p>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Responsible Gaming</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Self-exclusion Tools</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Problem Gambling Help</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p className="mb-4">
            © {new Date().getFullYear()} CasinoRank. All rights reserved. Casino games are for entertainment purposes only.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
            <a href="#" className="hover:text-white transition-colors">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
