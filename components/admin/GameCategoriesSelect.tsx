
import React from "react";
import { GAME_CATEGORIES } from "@/components/GameCategoriesModal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GameCategoriesSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function GameCategoriesSelect({ value, onValueChange }: GameCategoriesSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full bg-white border-gray-300">
        <SelectValue placeholder="Wählen Sie eine Spielkategorie" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel>Spielkategorien</SelectLabel>
          {GAME_CATEGORIES.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center">
                  {category.icon}
                </div>
                <span>{category.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
