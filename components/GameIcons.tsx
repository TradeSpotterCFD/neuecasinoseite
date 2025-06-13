
import React from "react";

// Baccarat Icon
const BaccaratIcon = () => (
  <div className="flex items-center justify-center">
    <div className="relative w-8 h-8">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-7 bg-red-600 rounded-md"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3.5 h-3.5 bg-white rounded-full border-2 border-red-600"></div>
      </div>
    </div>
  </div>
);

// Poker Chip Icon
const PokerChipIcon = () => (
  <div className="flex items-center justify-center">
    <div className="relative w-8 h-8">
      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-red-600 rounded-full"></div>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-1.5 bg-white transform rotate-45"></div>
        <div className="w-8 h-1.5 bg-white transform -rotate-45"></div>
      </div>
    </div>
  </div>
);

// Roulette Icon - improved design
const RouletteIcon = () => (
  <div className="flex items-center justify-center">
    <div className="relative w-8 h-8">
      {/* Outer wheel ring */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-700 flex items-center justify-center border-2 border-yellow-800">
        {/* Main wheel with pockets */}
        <div className="w-6 h-6 rounded-full overflow-hidden relative flex items-center justify-center">
          {/* Red pockets */}
          <div className="absolute w-full h-full">
            <div className="absolute top-0.5 left-2.5 w-1.5 h-1.5 bg-red-600 transform rotate-45"></div>
            <div className="absolute top-2.5 right-0.5 w-1.5 h-1.5 bg-red-600 transform rotate-45"></div>
            <div className="absolute bottom-0.5 right-2.5 w-1.5 h-1.5 bg-red-600 transform rotate-45"></div>
            <div className="absolute bottom-2.5 left-0.5 w-1.5 h-1.5 bg-red-600 transform rotate-45"></div>
          </div>
          
          {/* Black pockets */}
          <div className="absolute w-full h-full">
            <div className="absolute top-1/4 left-0 w-1.5 h-1.5 bg-black transform rotate-45"></div>
            <div className="absolute top-0 right-1/4 w-1.5 h-1.5 bg-black transform rotate-45"></div>
            <div className="absolute bottom-1/4 right-0 w-1.5 h-1.5 bg-black transform rotate-45"></div>
            <div className="absolute bottom-0 left-1/4 w-1.5 h-1.5 bg-black transform rotate-45"></div>
          </div>
          
          {/* Green zero pockets */}
          <div className="absolute top-0 left-0 w-1 h-1 bg-green-600 transform translate-x-1 translate-y-1"></div>
          <div className="absolute bottom-0 right-0 w-1 h-1 bg-green-600 transform -translate-x-1 -translate-y-1"></div>
        </div>
        
        {/* Inner wheel center */}
        <div className="absolute w-3.5 h-3.5 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
          {/* Center spinner */}
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 border border-yellow-600"></div>
        </div>
        
        {/* Ball */}
        <div className="absolute w-1.5 h-1.5 rounded-full bg-white border border-gray-200 shadow-sm top-1 right-1.5"></div>
      </div>
    </div>
  </div>
);

// Blackjack Icon
const BlackjackIcon = () => (
  <div className="flex items-center justify-center">
    <div className="relative">
      <div className="w-7 h-9 bg-white rounded-md border border-gray-400 shadow-sm transform -rotate-6 absolute -left-1">
        <div className="absolute top-0 left-0 w-2.5 h-2.5 flex items-center justify-center text-[10px] font-bold text-red-600">A</div>
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 flex items-center justify-center text-[10px] font-bold text-red-600 transform rotate-180">A</div>
      </div>
      <div className="w-7 h-9 bg-white rounded-md border border-gray-400 shadow-sm transform rotate-6 z-10">
        <div className="absolute top-0 left-0 w-2.5 h-2.5 flex items-center justify-center text-[10px] font-bold">A</div>
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 flex items-center justify-center text-[10px] font-bold transform rotate-180">A</div>
      </div>
    </div>
  </div>
);

// Bingo Icon with bingo balls
const BingoIcon = () => (
  <div className="flex items-center justify-center">
    <div className="relative w-8 h-8">
      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
        {/* Pink bingo ball */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 bg-pink-300 rounded-full flex items-center justify-center">
          <span className="text-[8px] font-bold text-white">9</span>
        </div>
        {/* Smaller pink bingo ball */}
        <div className="absolute bottom-2 right-3 w-2.5 h-2.5 bg-pink-400 rounded-full flex items-center justify-center">
          <span className="text-[6px] font-bold text-white">6</span>
        </div>
      </div>
    </div>
  </div>
);

// Video Poker Icon with poker chip
const VideoPokerIcon = () => (
  <div className="flex items-center justify-center">
    <div className="relative w-8 h-8">
      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
        <div className="w-6 h-6 bg-white rounded-full border-4 border-red-600 flex items-center justify-center">
          {/* Diamond symbol in the middle */}
          <div className="w-2 h-2 bg-red-600 rotate-45"></div>
        </div>
      </div>
    </div>
  </div>
);

// Soccer Ball Icon for Sports Betting
const SoccerBallIcon = () => (
  <div className="flex items-center justify-center">
    <div className="relative w-8 h-8">
      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
        <div className="w-6 h-6 bg-white rounded-full border border-gray-300 flex items-center justify-center relative">
          {/* Soccer ball pattern with black dots */}
          <div className="absolute top-0.5 left-2.5 w-1 h-1 bg-gray-800 rounded-full"></div>
          <div className="absolute top-2.5 left-0.5 w-1 h-1 bg-gray-800 rounded-full"></div>
          <div className="absolute top-2.5 right-0.5 w-1 h-1 bg-gray-800 rounded-full"></div>
          <div className="absolute bottom-0.5 left-2.5 w-1 h-1 bg-gray-800 rounded-full"></div>
          <div className="absolute bottom-2.5 right-0.5 w-1 h-1 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
);

// Dice Icon for Craps and other dice games
const DiceIcon = () => (
  <div className="flex items-center justify-center">
    <div className="relative w-8 h-8">
      <div className="w-7 h-7 bg-white rounded-md border border-gray-300 shadow-sm flex items-center justify-center">
        {/* Dice dots */}
        <div className="grid grid-cols-3 grid-rows-3 w-5 h-5">
          <div className="flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
          </div>
          <div></div>
          <div className="flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
          </div>
          <div></div>
          <div className="flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
          </div>
          <div></div>
          <div className="flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
          </div>
          <div></div>
          <div className="flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Slots Icon
const SlotsIcon = () => (
  <div className="flex items-center justify-center">
    <div className="relative w-8 h-8">
      <div className="w-7 h-7 bg-gradient-to-b from-gray-200 to-gray-300 rounded-md border border-gray-400 flex items-center justify-center overflow-hidden">
        {/* Slot reels */}
        <div className="flex gap-0.5">
          <div className="w-1.5 h-5 bg-white flex flex-col items-center justify-center">
            <span className="text-[6px] font-bold text-red-600">7</span>
          </div>
          <div className="w-1.5 h-5 bg-white flex flex-col items-center justify-center">
            <span className="text-[6px] font-bold text-yellow-500">$</span>
          </div>
          <div className="w-1.5 h-5 bg-white flex flex-col items-center justify-center">
            <span className="text-[6px] font-bold text-red-600">7</span>
          </div>
        </div>
        {/* Slot handle */}
        <div className="absolute right-0 h-7 w-1 bg-gradient-to-b from-red-500 to-red-600 rounded-r-md"></div>
      </div>
    </div>
  </div>
);

// Card Games Icon for other card games
const CardGamesIcon = () => (
  <div className="flex items-center justify-center">
    <div className="relative w-8 h-8">
      <div className="absolute top-1 left-1 w-6 h-7 bg-white rounded-md border border-gray-300 shadow-sm transform -rotate-6">
        <div className="absolute top-0 left-0 w-1.5 h-1.5 text-[6px] font-bold text-red-600 flex items-center justify-center">
          ♥
        </div>
      </div>
      <div className="absolute top-1 right-1 w-6 h-7 bg-white rounded-md border border-gray-300 shadow-sm transform rotate-6">
        <div className="absolute top-0 left-0 w-1.5 h-1.5 text-[6px] font-bold text-black flex items-center justify-center">
          ♠
        </div>
      </div>
    </div>
  </div>
);

export const GameIcons = {
  BaccaratIcon,
  PokerChipIcon,
  RouletteIcon,
  BlackjackIcon,
  BingoIcon,
  VideoPokerIcon,
  SoccerBallIcon,
  DiceIcon,      // Added missing icon
  SlotsIcon,     // Added missing icon
  CardGamesIcon  // Added missing icon
};
