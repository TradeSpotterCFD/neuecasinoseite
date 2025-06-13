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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"; // Import Card components
import { formSchema } from "./constants-and-types";

// Define a type for the field names that are multilingual text areas
type MultilingualTextFieldNames =
  | 'descriptions'
  | 'bonuses'
  | 'reviewTexts'
  | 'introTexts'
  | 'additionalIntroTexts'
  | 'gamesSectionTexts'
  | 'bonusIntroTexts'
  | 'bonusConclusionTexts'
  | 'reloadBonuses'
  | 'reloadBonusRates'
  | 'reloadBonusMaxAmounts'
  | 'reloadBonusValidities'
  | 'reloadBonusRequirements'
  | 'reloadBonusDisclaimers'
  | 'slotMachineTexts1'
  | 'slotMachineTexts2'
  | 'jackpotSlotsTexts'
  | 'tableGamesTexts'
  | 'payoutRatesTexts1'
  | 'payoutRatesTexts2';


interface MultilingualTextareaFieldProps {
  langCode: string;
  fieldName: MultilingualTextFieldNames; // Use the specific type
  label: string;
  placeholder: string;
  cardTitle?: string; // Optional title for wrapping in a Card
  cardClassName?: string; // Optional className for the Card
}

export function MultilingualTextareaField({
  langCode,
  fieldName,
  label,
  placeholder,
  cardTitle,
  cardClassName,
}: MultilingualTextareaFieldProps) {
  const { control } = useFormContext<z.infer<typeof formSchema>>();

  const fieldPath = `${fieldName}.${langCode}` as const;

  const textareaField = (
    <FormField
      control={control}
      name={fieldPath}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  if (cardTitle) {
    return (
      <Card className={cardClassName}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">{cardTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          {textareaField}
        </CardContent>
      </Card>
    );
  }

  return textareaField;
}
