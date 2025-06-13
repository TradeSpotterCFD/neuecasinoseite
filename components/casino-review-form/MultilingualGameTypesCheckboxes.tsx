import React from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { GAME_CATEGORIES } from "@/components/GameCategoriesModal";
import { formSchema } from "./constants-and-types";

interface MultilingualGameTypesCheckboxesProps {
  langCode: string;
  langName: string;
}

export function MultilingualGameTypesCheckboxes({
  langCode,
  langName,
}: MultilingualGameTypesCheckboxesProps) {
  const { control, getValues, setValue, watch } = useFormContext<z.infer<typeof formSchema>>();

  // Helper function to handle game type checkbox changes
  const handleGameTypeToggle = (categoryName: string) => {
    const currentGameTypes = getValues(`gameTypes.${langCode}`) || [];
    const updatedGameTypes = currentGameTypes.includes(categoryName)
      ? currentGameTypes.filter(name => name !== categoryName)
      : [...currentGameTypes, categoryName];
    setValue(`gameTypes.${langCode}`, updatedGameTypes);
  };

  return (
    <Card className="border-2 p-4 rounded-lg bg-blue-50 border-blue-200 shadow-sm mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Game Types ({langName})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {GAME_CATEGORIES.map(category => (
            <div key={category.name} className="flex items-center space-x-2">
              <Checkbox
                id={`game-type-${langCode}-${category.name}`}
                checked={watch(`gameTypes.${langCode}`)?.includes(category.name)}
                onCheckedChange={() => handleGameTypeToggle(category.name)}
              />
              <label
                htmlFor={`game-type-${langCode}-${category.name}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
