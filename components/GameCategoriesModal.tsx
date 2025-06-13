
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { GameIcons } from "@/components/GameIcons";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Define the available game categories
export const GAME_CATEGORIES = [
  { id: "slots", name: "Slots", icon: <GameIcons.PokerChipIcon />, description: "Thousands of slot machines" },
  { id: "roulette", name: "Roulette", icon: <GameIcons.RouletteIcon />, description: "European and French roulette" },
  { id: "blackjack", name: "Blackjack", icon: <GameIcons.BlackjackIcon />, description: "Classic and multihand variants" },
  { id: "jackpot", name: "Jackpot", icon: <span className="text-2xl">💰</span>, description: "Progressive jackpot slots" },
  { id: "live_casino", name: "Live Casino", icon: <span className="text-2xl">👨‍💼</span>, description: "With professional dealers" },
  { id: "baccarat", name: "Baccarat", icon: <GameIcons.BaccaratIcon />, description: "Various baccarat variants" },
  { id: "casino_holdem", name: "Casino Hold'em", icon: <span className="text-2xl">♠️</span>, description: "Poker against the house" },
  { id: "bingo", name: "Bingo", icon: <GameIcons.BingoIcon />, description: "Online bingo games" },
  { id: "video_poker", name: "Video Poker", icon: <GameIcons.VideoPokerIcon />, description: "Digital poker variants" },
  { id: "sports_betting", name: "Sports Betting", icon: <GameIcons.SoccerBallIcon />, description: "Betting on sporting events" }
];

interface GameCategoriesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  casinoId: string;
  initialCategories?: string[];
  onCategoriesUpdated?: () => void;
}

export function GameCategoriesModal({
  open,
  onOpenChange,
  casinoId,
  initialCategories = [],
  onCategoriesUpdated
}: GameCategoriesModalProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setSelectedCategories(initialCategories);
    }
  }, [open, initialCategories]);

  const handleCheckboxChange = (categoryId: string, e?: React.MouseEvent) => {
    // Prevent default behavior and propagation if event is provided
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleSubmit = async (e?: React.MouseEvent) => {
    // Prevent default behavior if event is provided
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!casinoId) return;
    
    try {
      setIsSubmitting(true);
      
      // Update the database with the correct field name 'game_categories'
      const { error } = await supabase
        .from('casinos')
        .update({ game_categories: selectedCategories })
        .eq('id', casinoId);
        
      if (error) throw error;
      
      toast({
        title: "Game categories updated",
        description: "The casino's game categories have been successfully updated.",
      });
      
      if (onCategoriesUpdated) {
        onCategoriesUpdated();
      }
      
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error updating game categories:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update game categories",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Manage Game Categories</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <p className="text-sm text-muted-foreground mb-2">
            Select the game categories this casino offers. Unchecked categories will appear dimmed on the casino page.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {GAME_CATEGORIES.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`category-${category.id}`} 
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCheckboxChange(category.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <Label 
                  htmlFor={`category-${category.id}`}
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCheckboxChange(category.id, e);
                  }}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    {category.icon}
                  </div>
                  <span>{category.name}</span>
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={(e) => handleSubmit(e)} 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
