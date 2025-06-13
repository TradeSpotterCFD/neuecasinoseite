import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { SlotForm } from "@/components/admin/SlotForm";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client"; 
import { LANGUAGES } from "@/components/CasinoReviewForm"; 

// Define the type for translatable fields (must match SlotForm's slotTranslationSchema)
type SlotTranslationValues = {
  metaTitle?: string; // Changed
  metaDescription?: string; // Changed
  shortDescription?: string; // Changed
};

// Define the type for the form data (must match SlotForm's slotFormSchema)
type SlotFormValues = {
  name: string; 
  slug: string; 
  // Non-translatable content fields
  fullDescription?: string; // Moved back
  features?: string; // Moved back
  theme?: string; // Moved back
  // Other fields
  providers: string[]; 
  rtp?: number;
  volatility?: "low" | "medium" | "high";
  maxPayout?: number;
  reels?: number;
  rows?: number;
  paylines?: string;
  releaseYear?: number;
  screenshotUrl?: string;
  demoLink?: string;
  hasMobileVersion: boolean;
  hasAutoplay: boolean;
  has3dGraphics: boolean;
  isPartOfSeries: boolean;
  seriesName?: string;
  winBothWays: boolean;
  minBet?: number;
  maxBet?: number;
  minBetLine?: number;
  maxBetLine?: number;
  translations: Record<string, SlotTranslationValues>; // Updated structure
};

interface AddSlotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSlotCreated?: () => void; 
}

export function AddSlotDialog({ 
  open, 
  onOpenChange,
  onSlotCreated
}: AddSlotDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const englishLang = LANGUAGES.find(l => l.code === 'en');
  const defaultLanguage = englishLang ? englishLang.code : LANGUAGES[0].code; 

  const handleSubmit = async (formData: SlotFormValues) => { 
    setIsSubmitting(true);
    console.log("Slot data to submit:", formData); 

    // Extract default language translations
    const defaultTranslation = formData.translations[defaultLanguage] || {};
    const otherTranslations = { ...formData.translations };
    delete otherTranslations[defaultLanguage];

    try {
      // --- Implement Supabase insert logic ---
      // 1. Insert into the main 'slots' table
      //    Ensure your 'slots' table has columns for the default language translatable fields
      //    and the non-translatable content fields.
      const { data: slotData, error: slotError } = await supabase
        .from('slots') 
        .insert({
          name: formData.name,
          slug: formData.slug,
          // Add default language translatable fields to main table
          meta_title: defaultTranslation.metaTitle, // Added
          meta_description: defaultTranslation.metaDescription, // Added
          short_description: defaultTranslation.shortDescription, 
          // Add non-translatable content fields
          full_description: formData.fullDescription, // Added
          features: formData.features, // Added
          theme: formData.theme, // Added
          // Other fields
          providers: formData.providers,
          rtp: formData.rtp,
          volatility: formData.volatility,
          max_payout: formData.maxPayout,
          reels: formData.reels,
          rows: formData.rows,
          paylines: formData.paylines,
          release_year: formData.releaseYear,
          screenshot_url: formData.screenshotUrl,
          demo_link: formData.demoLink,
          has_mobile_version: formData.hasMobileVersion,
          has_autoplay: formData.hasAutoplay,
          has_3d_graphics: formData.has3dGraphics,
          is_part_of_series: formData.isPartOfSeries,
          series_name: formData.seriesName,
          win_both_ways: formData.winBothWays,
          min_bet: formData.minBet,
          max_bet: formData.maxBet,
          min_bet_line: formData.minBetLine,
          max_bet_line: formData.maxBetLine,
        })
        .select()
        .single();

      if (slotError) {
        console.error("Error inserting slot:", slotError);
        if (slotError.code === '23505' && slotError.message.includes('slug')) {
           throw new Error(`Slug "${formData.slug}" already exists. Please choose a unique slug.`);
        }
        throw new Error(`Could not create slot: ${slotError.message}`);
      }

      const newSlotId = slotData.id;

      // 2. Insert into 'slot_translations' table for other languages
      //    Ensure your 'slot_translations' table has the correct columns.
      const translationInserts = Object.entries(otherTranslations)
        // Only insert if at least one translatable field has content
        .filter(([_, translation]) => 
            translation.metaTitle || 
            translation.metaDescription ||
            translation.shortDescription
        ) 
        .map(([langCode, translation]) => ({
          slot_id: newSlotId, 
          language_code: langCode,
          meta_title: translation.metaTitle, // Added
          meta_description: translation.metaDescription, // Added
          short_description: translation.shortDescription,
          // features and theme are no longer in translations table
        }));

      if (translationInserts.length > 0) {
        // Ensure 'slot_translations' table exists and has the correct columns
        const { error: translationError } = await supabase
          .from('slot_translations') // Replace if your table name is different
          .insert(translationInserts);

        if (translationError) {
          console.error("Error inserting slot translations:", translationError);
          toast({
            title: "Warning",
            description: "Slot created, but failed to save some translations.",
            variant: "destructive", 
          });
        }
      }

      toast({
        title: "Slot Created",
        description: `Slot "${formData.name}" has been successfully created.`,
      });
      
      onOpenChange(false); 
      if (onSlotCreated) {
        onSlotCreated(); 
      }

    } catch (error: any) {
      console.error("Error creating slot process:", error);
      toast({
        title: "Error",
        description: error.message || "Could not create slot.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Increased width using sm:max-w-4xl */}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl"> 
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Slot</DialogTitle>
        </DialogHeader>
        <div className="mt-4 pr-2"> 
          <SlotForm 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
            onCancel={() => onOpenChange(false)} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}