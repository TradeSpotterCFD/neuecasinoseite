
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface GameCategoriesCheckboxesProps {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

export function GameCategoriesCheckboxes({ 
  selectedCategories, 
  onChange 
}: GameCategoriesCheckboxesProps) {
  const [allCategories, setAllCategories] = useState<Array<{ value: string; label: string; translationKey?: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGameCategories = async () => {
      setIsLoading(true);
      
      // In a production environment, these should come from an API or database
      // Each category has a value, display label, and an optional translationKey for i18n support
      const gameCategories = [
        { value: "slots", label: "Slots", translationKey: "game_category.slots" },
        { value: "table_games", label: "Tischspiele", translationKey: "game_category.table_games" },
        { value: "live_casino", label: "Live Casino", translationKey: "game_category.live_casino" },
        { value: "jackpot_games", label: "Jackpot-Spiele", translationKey: "game_category.jackpot_games" },
        { value: "video_poker", label: "Video Poker", translationKey: "game_category.video_poker" },
        { value: "scratch_cards", label: "Rubbellose", translationKey: "game_category.scratch_cards" },
        { value: "bingo", label: "Bingo", translationKey: "game_category.bingo" },
        { value: "keno", label: "Keno", translationKey: "game_category.keno" },
        { value: "virtual_sports", label: "Virtuelle Sportarten", translationKey: "game_category.virtual_sports" },
        { value: "crash_games", label: "Crash-Spiele", translationKey: "game_category.crash_games" },
        { value: "game_shows", label: "Game Shows", translationKey: "game_category.game_shows" },
        { value: "arcade_games", label: "Arcade-Spiele", translationKey: "game_category.arcade_games" },
      ];
      
      setAllCategories(gameCategories);
      setIsLoading(false);
    };

    fetchGameCategories();
  }, []);

  const handleCheckboxChange = (category: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedCategories, category]);
    } else {
      onChange(selectedCategories.filter(c => c !== category));
    }
  };

  const handleSelectAll = () => {
    onChange(allCategories.map(category => category.value));
  };

  const handleClearAll = () => {
    onChange([]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2">Lade Spielkategorien...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={handleSelectAll}
          className="text-xs"
        >
          Alle auswählen
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={handleClearAll}
          className="text-xs"
        >
          Alle abwählen
        </Button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {allCategories.map((category) => (
          <div 
            key={category.value} 
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
            onClick={() => handleCheckboxChange(category.value, !selectedCategories.includes(category.value))}
          >
            <Checkbox
              id={`category-${category.value}`}
              checked={selectedCategories.includes(category.value)}
              onCheckedChange={(checked) => 
                handleCheckboxChange(category.value, checked === true)
              }
              className="cursor-pointer"
            />
            <Label
              htmlFor={`category-${category.value}`}
              className="text-sm font-medium leading-none cursor-pointer w-full"
            >
              {category.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
