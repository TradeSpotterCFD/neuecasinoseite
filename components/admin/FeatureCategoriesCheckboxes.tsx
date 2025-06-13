
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

// Define the available feature categories
export const FEATURE_CATEGORIES = [
  { id: "top_providers", name: "Games from top providers" },
  { id: "jackpot_slots", name: "Many jackpot slots" },
  { id: "large_live_casino", name: "Large live casino" },
  { id: "popular_software", name: "Popular software providers" },
  { id: "welcome_bonus", name: "Top welcome bonus" },
  { id: "quality_slots", name: "Quality online slots" },
  { id: "numerous_slots", name: "Numerous online slots" },
  { id: "fast_payout", name: "Fast payout" },
  { id: "valid_eu_licence", name: "Valid EU licence" },
  { id: "top_loyalty_programme", name: "Top loyalty programme" },
  { id: "cryptocurrencies_available", name: "Cryptocurrencies available" },
  { id: "great_welcome_bonus", name: "Great welcome bonus" },
  { id: "very_good_live_casino", name: "Very good live casino" },
  { id: "good_payout_ratios", name: "Good payout ratios" }
];

interface FeatureCategoriesCheckboxesProps {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
  maxSelections?: number;
}

export function FeatureCategoriesCheckboxes({ 
  selectedCategories, 
  onChange,
  maxSelections = 8
}: FeatureCategoriesCheckboxesProps) {
  const handleCheckboxChange = (category: string, checked: boolean) => {
    if (checked) {
      // Check if adding this would exceed the maximum allowed selections
      if (maxSelections && selectedCategories.length >= maxSelections) {
        toast({
          title: "Selection limit reached",
          description: `You can only select a maximum of ${maxSelections} categories.`,
          variant: "destructive",
        });
        return;
      }
      onChange([...selectedCategories, category]);
    } else {
      onChange(selectedCategories.filter(c => c !== category));
    }
  };

  const handleSelectAll = () => {
    // If maxSelections is set, only select up to that many categories
    const categoriesToSelect = maxSelections 
      ? FEATURE_CATEGORIES.slice(0, maxSelections).map(category => category.id)
      : FEATURE_CATEGORIES.map(category => category.id);
    
    onChange(categoriesToSelect);
    
    if (maxSelections && FEATURE_CATEGORIES.length > maxSelections) {
      toast({
        title: "Selection limited",
        description: `Only the first ${maxSelections} categories were selected due to the maximum limit.`,
      });
    }
  };

  const handleClearAll = () => {
    onChange([]);
  };

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
          Select All
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={handleClearAll}
          className="text-xs"
        >
          Clear All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {FEATURE_CATEGORIES.map((category) => (
          <div 
            key={category.id} 
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
            onClick={() => handleCheckboxChange(category.id, !selectedCategories.includes(category.id))}
          >
            <Checkbox
              id={`feature-${category.id}`}
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={(checked) => 
                handleCheckboxChange(category.id, checked === true)
              }
              className="cursor-pointer"
            />
            <Label
              htmlFor={`feature-${category.id}`}
              className="text-sm font-medium leading-none cursor-pointer w-full"
            >
              {category.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
