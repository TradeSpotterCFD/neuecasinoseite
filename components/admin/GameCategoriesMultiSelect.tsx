
import React, { useState } from "react";
import { X, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GAME_CATEGORIES } from "@/components/GameCategoriesModal";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface GameCategoriesMultiSelectProps {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

export function GameCategoriesMultiSelect({
  selectedCategories = [],
  onChange,
}: GameCategoriesMultiSelectProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (categoryId: string, e?: React.MouseEvent) => {
    // Prevent default behavior and propagation if event is provided
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (selectedCategories.includes(categoryId)) {
      onChange(selectedCategories.filter((id) => id !== categoryId));
    } else {
      onChange([...selectedCategories, categoryId]);
    }
  };

  const handleRemove = (categoryId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(selectedCategories.filter((id) => id !== categoryId));
  };

  // Function to select all categories
  const selectAll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(GAME_CATEGORIES.map(cat => cat.id));
  };

  // Function to clear all selections
  const clearAll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange([]);
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-[40px] bg-white border-gray-300 hover:bg-gray-50"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <span className="truncate">
              {selectedCategories.length > 0
                ? `${selectedCategories.length} Kategorien ausgewählt`
                : "Spielkategorien auswählen"}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 bg-white shadow-lg border-gray-200" align="start">
          <div className="flex justify-between items-center p-2 border-b">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={selectAll}
              className="text-xs hover:bg-blue-50 hover:text-blue-600"
            >
              Alle auswählen
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAll}
              className="text-xs hover:bg-red-50 hover:text-red-600"
            >
              Alle löschen
            </Button>
          </div>
          <Command>
            <CommandInput placeholder="Kategorie suchen..." className="border-none" />
            <CommandEmpty>Keine Kategorien gefunden.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {GAME_CATEGORIES.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.name}
                  onSelect={(value) => {
                    const cat = GAME_CATEGORIES.find(c => c.name.toLowerCase() === value.toLowerCase());
                    if (cat) handleSelect(cat.id);
                    setOpen(false);
                  }}
                  className="flex items-center cursor-pointer hover:bg-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSelect(category.id, e);
                  }}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-5 h-5 flex items-center justify-center">
                      {category.icon}
                    </div>
                    <span>{category.name}</span>
                    <div className="ml-auto">
                      {selectedCategories.includes(category.id) && (
                        <Check className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedCategories.map((categoryId) => {
            const category = GAME_CATEGORIES.find((c) => c.id === categoryId);
            if (!category) return null;
            return (
              <Badge key={categoryId} variant="secondary" className="flex items-center gap-1 py-1 px-2 bg-blue-50 text-blue-600 hover:bg-blue-100">
                <div className="w-4 h-4 flex items-center justify-center">
                  {category.icon}
                </div>
                {category.name}
                <X
                  className="h-3 w-3 cursor-pointer ml-1 hover:text-red-500"
                  onClick={(e) => handleRemove(categoryId, e)}
                />
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
