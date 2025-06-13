import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { CasinoForm } from "@/components/admin/CasinoForm"; // Import CasinoForm component
import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client'

import { GamepadIcon, ListChecksIcon, FileText, Upload, X, Image as ImageIcon, Trophy, Table as TableIcon } from "lucide-react"; // Added Icons
import { FeatureCategoriesCheckboxes } from "@/components/admin/FeatureCategoriesCheckboxes";
import { GAME_CATEGORIES } from "@/components/GameCategoriesModal";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"; // Added Input
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@/components/CasinoReviewForm";

// Define the type for translation fields within the form state (using File for uploads)
interface TranslationFormFields {
  url?: string;
  metaTitle?: string;
  metaDescription?: string;
  description?: string;
  bonus?: string;
  bonusRate?: string;
  bonusAmount?: string;
  bonusValidity?: string;
  bonusRequirements?: string;
  additionalBonuses?: string;
  bonusDisclaimer?: string;
  reviewText?: string;
  // Screenshots are handled separately in state before upload
  jackpotSlotsHeadline?: string;
  jackpotSlotsText?: string;
  tableGamesHeadline?: string;
  tableGamesText?: string;
  // Other translatable fields from CasinoForm
  liveCasinoCashback?: string;
  liveCasinoCashbackRate?: string;
  liveCasinoCashbackMaxAmount?: string;
  liveCasinoCashbackValidity?: string;
  liveCasinoCashbackRequirements?: string;
  liveCasinoCashbackDisclaimer?: string;
  weeklyCashback?: string;
  weeklyCashbackRate?: string;
  weeklyCashbackMaxAmount?: string;
  weeklyCashbackValidity?: string;
  weeklyCashbackRequirements?: string;
  weeklyCashbackDisclaimer?: string;
  reloadBonus?: string;
  reloadBonusRate?: string;
  reloadBonusMaxAmount?: string;
  reloadBonusValidity?: string;
  reloadBonusRequirements?: string;
  reloadBonusDisclaimer?: string;
  screenshots?: File[]; // Added screenshots here as it's part of CasinoForm's translation object
  // Added moved fields
  playerProtection?: string;
  customerService?: string;
}

// Define the type for the main form data passed from CasinoForm
// This should ideally match the structure defined in CasinoForm.tsx
interface CasinoBaseFormData {
  name: string;
  logo: File | null;
  rating: number;
  minDeposit: number;
  company: string;
  headquarters: string;
  licenseInfo: string[];
  yearEstablished: number;
  withdrawalRate: string;
  rtpTest: string[];
  gameProviders: string[];
  gameCount: string;
  translations: Record<string, Partial<TranslationFormFields>>;
  selectedSlotIds?: string[]; // Added selectedSlotIds here to match CasinoFormValues
}

// Define the displayed game types
const DISPLAYED_GAME_TYPES = [
  { id: 'slots', name: 'Slots' },
  { id: 'roulette', name: 'Roulette' },
  { id: 'blackjack', name: 'Blackjack' },
  { id: 'jackpot', name: 'Jackpot' },
  { id: 'live_casino', name: 'Live Casino' },
  { id: 'baccarat', name: 'Baccarat' },
  { id: 'casino_holdem', name: 'Casino Hold\'em' },
  { id: 'bingo', name: 'Bingo' },
  { id: 'video_poker', name: 'Video Poker' },
  { id: 'sports_betting', name: 'Sports Betting' }
];


interface CreateCasinoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCasinoCreated?: () => void;
}

export function CreateCasinoDialog({
  open,
  onOpenChange,
  onCasinoCreated
}: CreateCasinoDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedGameCategories, setSelectedGameCategories] = useState<string[]>([]);
  const [selectedFeatureCategories, setSelectedFeatureCategories] = useState<string[]>([]);
  const [selectedDisplayedGameTypes, setSelectedDisplayedGameTypes] = useState<string[]>([]);

  const defaultLanguage = "en";
  // States for translatable text fields managed directly in this dialog
  // These seem redundant now as they should be part of CasinoForm's translations
  // Consider removing these if CasinoForm handles all translation inputs
  const [introTexts, setIntroTexts] = useState<Record<string, string>>({});
  const [additionalIntroTexts, setAdditionalIntroTexts] = useState<Record<string, string>>({});
  const [bonusIntroTexts, setBonusIntroTexts] = useState<Record<string, string>>({});
  const [bonusConclusionTexts, setBonusConclusionTexts] = useState<Record<string, string>>({});
  const [gamesSectionTexts, setGamesSectionTexts] = useState<Record<string, string>>({});
  const [slotMachinesSectionHeadline, setSlotMachinesSectionHeadline] = useState<Record<string, string>>({});
  const [slotMachinesSectionText1, setSlotMachinesSectionText1] = useState<Record<string, string>>({});
  const [slotMachinesSectionText2, setSlotMachinesSectionText2] = useState<Record<string, string>>({});
  const [jackpotSlotsHeadlines, setJackpotSlotsHeadlines] = useState<Record<string, string>>({});
  const [jackpotSlotsTexts, setJackpotSlotsTexts] = useState<Record<string, string>>({});
  const [tableGamesHeadlines, setTableGamesHeadlines] = useState<Record<string, string>>({});
  const [tableGamesTexts, setTableGamesTexts] = useState<Record<string, string>>({});

  // States for screenshots per language - These might also be redundant if handled within CasinoForm
  const [jackpotScreenshots, setJackpotScreenshots] = useState<Record<string, File[]>>({});
  const [jackpotScreenshotPreviews, setJackpotScreenshotPreviews] = useState<Record<string, string[]>>({});
  const [tableGameScreenshots, setTableGameScreenshots] = useState<Record<string, File[]>>({});
  const [tableGameScreenshotPreviews, setTableGameScreenshotPreviews] = useState<Record<string, string[]>>({});

  // State for game types per language (internal categories) - from CasinoForm
  const [gameTypesByLanguage, setGameTypesByLanguage] = useState<Record<string, string[]>>({});

  // State to track the active language
  const [activeLanguage, setActiveLanguage] = useState(defaultLanguage);

  // Initialize states for all languages - This might be simplified if CasinoForm handles defaults
  useEffect(() => {
    const initialTextState: Record<string, string> = {};
    const initialFileState: Record<string, File[]> = {};
    const initialPreviewState: Record<string, string[]> = {};
    LANGUAGES.forEach(lang => {
      initialTextState[lang.code] = "";
      initialFileState[lang.code] = [];
      initialPreviewState[lang.code] = [];
    });
    setIntroTexts({...initialTextState});
    setAdditionalIntroTexts({...initialTextState});
    setBonusIntroTexts({...initialTextState});
    setBonusConclusionTexts({...initialTextState});
    setGamesSectionTexts({...initialTextState});
    setSlotMachinesSectionHeadline({...initialTextState});
    setSlotMachinesSectionText1({...initialTextState});
    setSlotMachinesSectionText2({...initialTextState});
    setJackpotSlotsHeadlines({...initialTextState});
    setJackpotSlotsTexts({...initialTextState});
    setTableGamesHeadlines({...initialTextState});
    setTableGamesTexts({...initialTextState});
    setJackpotScreenshots({...initialFileState});
    setJackpotScreenshotPreviews({...initialPreviewState});
    setTableGameScreenshots({...initialFileState});
    setTableGameScreenshotPreviews({...initialPreviewState});
    const initialGameTypes: Record<string, string[]> = {};
     LANGUAGES.forEach(lang => {
       initialGameTypes[lang.code] = [];
     });
     setGameTypesByLanguage(initialGameTypes);

  }, []); // Run only once on mount

  // --- Screenshot Handling Functions --- (Keep if screenshots are managed here)
  const handleScreenshotChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    langCode: string,
    type: 'jackpot' | 'tableGame'
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const setScreenshots = type === 'jackpot' ? setJackpotScreenshots : setTableGameScreenshots;
    const setPreviews = type === 'jackpot' ? setJackpotScreenshotPreviews : setTableGameScreenshotPreviews;
    const currentScreenshots = (type === 'jackpot' ? jackpotScreenshots : tableGameScreenshots)[langCode] || [];

    const filesToAdd = files.slice(0, 2 - currentScreenshots.length);
    if (filesToAdd.length < files.length) {
       toast({ title: "Limit Reached", description: "You can only upload a maximum of 2 screenshots per section.", variant: "destructive" });
    }
    if (filesToAdd.length === 0) return;

    const newScreenshots = [...currentScreenshots, ...filesToAdd];
    setScreenshots(prev => ({ ...prev, [langCode]: newScreenshots }));

    const currentPreviews = (type === 'jackpot' ? jackpotScreenshotPreviews : tableGameScreenshotPreviews)[langCode] || [];
    const newPreviews = [...currentPreviews];
    let previewsLoadedCount = 0;

    filesToAdd.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        previewsLoadedCount++;
        if (previewsLoadedCount === filesToAdd.length) {
           setPreviews(prev => ({ ...prev, [langCode]: [...newPreviews] }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveScreenshot = (langCode: string, index: number, type: 'jackpot' | 'tableGame') => {
    const setScreenshots = type === 'jackpot' ? setJackpotScreenshots : setTableGameScreenshots;
    const setPreviews = type === 'jackpot' ? setJackpotScreenshotPreviews : setTableGameScreenshotPreviews;

    setScreenshots(prev => {
       const currentFiles = prev[langCode] || [];
       const updatedFiles = [...currentFiles];
       updatedFiles.splice(index, 1);
       return { ...prev, [langCode]: updatedFiles };
    });

    setPreviews(prev => {
       const currentPreviews = prev[langCode] || [];
       const updatedPreviews = [...currentPreviews];
       updatedPreviews.splice(index, 1);
       return { ...prev, [langCode]: updatedPreviews };
    });
  };

  // Function to upload screenshots to Supabase Storage
  const uploadScreenshots = async (files: File[], casinoId: string, langCode: string, section: 'jackpot' | 'tablegame'): Promise<string[]> => {
    if (!files || files.length === 0) return [];

    const uploadPromises = files.map(async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${casinoId}/${langCode}/${section}/${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('casino-screenshots') // Ensure this bucket exists in your Supabase project
        .upload(fileName, file);

      if (error) {
        console.error(`Error uploading screenshot ${fileName}:`, error);
        return null;
      }

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('casino-screenshots')
        .getPublicUrl(fileName);

      return publicUrlData.publicUrl;
    });

    const urls = await Promise.all(uploadPromises);
    return urls.filter(url => url !== null) as string[];
  };


  // Handle form submission
  const onSubmit = async (formData: CasinoBaseFormData) => {
    setIsSubmitting(true);
    try {
      // Upload logo first
      let logoUrl = null;
      if (formData.logo) {
        const fileExt = formData.logo.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from('casino-logos') // Ensure this bucket exists in your Supabase project
          .upload(fileName, formData.logo);

        if (error) {
          throw new Error(`Logo could not be uploaded: ${error.message}`);
        }
        // Get the public URL
        const { data: publicUrlData } = supabase.storage
          .from('casino-logos')
          .getPublicUrl(fileName);

        logoUrl = publicUrlData.publicUrl;
      }

      const casinoInsertData = {
         name: formData.name,
         logo_url: logoUrl,
         rating: formData.rating,
         min_deposit: formData.minDeposit,
         company: formData.company,
         headquarters: formData.headquarters,
         license_info: formData.licenseInfo, // Array
         year_established: formData.yearEstablished,
         withdrawal_rate: formData.withdrawalRate,
         rtp_test: formData.rtpTest, // Array
         game_providers: formData.gameProviders,
         game_count: formData.gameCount,
         // Removed language-dependent fields from here:
         // intro_text, additional_intro_text, bonus_intro_text, bonus_conclusion_text,
         // games_section_text, slot_machines_section_headline, slot_machines_section_text1,
         // slot_machines_section_text2, jackpot_slots_headline, jackpot_slots_text,
         // table_games_headline, table_games_text
         // Non-translatable arrays/objects from state
         game_categories: selectedGameCategories,
         feature_categories: selectedFeatureCategories,
         displayed_game_types: selectedDisplayedGameTypes,
      };

      // Create new casino entry in 'casinos' table
      const { data: casinoData, error: casinoError } = await supabase
        .from('casinos')
        .insert(casinoInsertData)
        .select()
        .single();

      if (casinoError) throw new Error(`Casino could not be created: ${casinoError.message}`);

      const casinoId = casinoData.id;

      // Insert selected slots into the casino_slots linking table
      if (formData.selectedSlotIds && formData.selectedSlotIds.length > 0) {
        const slotInserts = formData.selectedSlotIds.map(slotId => ({
          casino_id: casinoId,
          slot_id: slotId,
        }));
        const { error: slotInsertError } = await supabase
          .from('casino_slots')
          .insert(slotInserts);

        if (slotInsertError) {
          console.error(`Error inserting casino slots: ${slotInsertError.message}`);
          // Decide how to handle this error - maybe warn the user but still create the casino
          toast({ title: "Warning", description: `Casino created, but saving selected slots failed: ${slotInsertError.message}`, variant: "destructive", duration: 10000 });
        }
      }


      // Prepare and insert translations
      const translationInserts = [];
      for (const lang of LANGUAGES) {
         // Upload screenshots for this language and sections (if managed here)
         const jackpotScreenshotUrls = await uploadScreenshots(jackpotScreenshots[lang.code], casinoId, lang.code, 'jackpot');
         const tableGameScreenshotUrls = await uploadScreenshots(tableGameScreenshots[lang.code], casinoId, lang.code, 'tablegame');

         // Get translation data from the sub-form (CasinoForm)
         const formTranslation = formData.translations[lang.code] || {};

         const translationData: any = {
            casino_id: casinoId,
            language_code: lang.code,
            // Fields from CasinoForm's translations prop
            url: formTranslation.url || null,
            meta_title: formTranslation.metaTitle || null,
            meta_description: formTranslation.metaDescription || null,
            description: formTranslation.description || null,
            bonus_description: formTranslation.bonus || null,
            bonus_rate: formTranslation.bonusRate || null,
            bonus_amount: formTranslation.bonusAmount || null,
            bonus_validity: formTranslation.bonusValidity || null,
            bonus_requirements: formTranslation.bonusRequirements || null,
            additional_bonuses: formTranslation.additionalBonuses || null,
            bonus_disclaimer: formTranslation.bonusDisclaimer || null,
            review_text: formTranslation.reviewText || null,
            live_casino_cashback: formTranslation.liveCasinoCashback || null,
            live_casino_cashback_rate: formTranslation.liveCasinoCashbackRate || null,
            live_casino_cashback_max_amount: formTranslation.liveCasinoCashbackMaxAmount || null,
            live_casino_cashback_validity: formTranslation.liveCasinoCashbackValidity || null,
            live_casino_cashback_requirements: formTranslation.liveCasinoCashbackRequirements || null,
            live_casino_cashback_disclaimer: formTranslation.liveCasinoCashbackDisclaimer || null,
            weekly_cashback: formTranslation.weeklyCashback || null,
            weekly_cashback_rate: formTranslation.weeklyCashbackRate || null,
            weekly_cashback_max_amount: formTranslation.weeklyCashbackMaxAmount || null,
            weekly_cashback_validity: formTranslation.weeklyCashbackValidity || null,
            weekly_cashback_requirements: formTranslation.weeklyCashbackRequirements || null,
            weekly_cashback_disclaimer: formTranslation.weeklyCashbackDisclaimer || null,
            reload_bonus: formTranslation.reloadBonus || null,
            reload_bonus_rate: formTranslation.reloadBonusRate || null,
            reload_bonus_max_amount: formTranslation.reloadBonusMaxAmount || null,
            reload_bonus_validity: formTranslation.reloadBonusValidity || null, // Korrigierter Eigenschaftsname
            reload_bonus_requirements: formTranslation.reloadBonusRequirements || null, // Korrigierter Eigenschaftsname
            reload_bonus_disclaimer: formTranslation.reloadBonusDisclaimer || null, // Korrigierter Eigenschaftsname
            // Added moved fields
            player_protection: formTranslation.playerProtection || null,
            customer_service: formTranslation.customerService || null,
            // Fields from state managed in this dialog (Consider removing if handled by CasinoForm)
            // intro_text: introTexts[lang.code] || null, // Removed
            // additional_intro_text: additionalIntroTexts[lang.code] || null, // Removed
            // bonus_intro_text: bonusIntroTexts[lang.code] || null, // Removed
            // bonus_conclusion_text: bonusConclusionTexts[lang.code] || null, // Removed
            // games_section_text: gamesSectionTexts[lang.code] || null, // Removed
            // slot_machines_section_headline: slotMachinesSectionHeadline[lang.code] || null, // Removed
            // slot_machines_section_text1: slotMachinesSectionText1[lang.code] || null, // Removed
            // slot_machines_section_text2: slotMachinesSectionText2[lang.code] || null, // Removed
            // jackpot_slots_headline: jackpotSlotsHeadlines[lang.code] || null, // Removed
            // jackpot_slots_text: jackpotSlotsTexts[lang.code] || null, // Removed
            // table_games_headline: tableGamesHeadlines[lang.code] || null, // Removed
            // table_games_text: tableGamesTexts[lang.code] || null, // Removed
            // Screenshot URLs (if managed here)
            jackpot_screenshots: jackpotScreenshotUrls.length > 0 ? jackpotScreenshotUrls : null,
            table_game_screenshots: tableGameScreenshotUrls.length > 0 ? tableGameScreenshotUrls : null,
         };

         // Check if any value is actually present besides the IDs
         const hasContent = Object.entries(translationData).some(([key, val]) =>
             key !== 'casino_id' && key !== 'language_code' &&
             ( (Array.isArray(val) && val.length > 0) || (val !== null && val !== undefined && val !== '') )
         );

         if (hasContent) {
             translationInserts.push(translationData);
         }
      }

      if (translationInserts.length > 0) {
        const { error: translationError } = await supabase
          .from('casino_translations')
          .insert(translationInserts);

        if (translationError) {
          console.error(`Error saving translations: ${translationError.message}`);
          toast({ title: "Warning", description: `Casino created, but saving translations failed: ${translationError.message}`, variant: "destructive", duration: 10000 });
        }
      }

      toast({
        title: "Casino created",
        description: `Casino "${formData.name}" has been successfully created.`,
      });

      onOpenChange(false);
      if (onCasinoCreated) {
        onCasinoCreated();
      }
    } catch (error: any) {
      console.error("Error creating casino:", error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle game type selection for a specific language (internal categories)
  const handleGameTypeToggle = (langCode: string, categoryId: string) => {
    setGameTypesByLanguage(prev => {
      const currentTypes = prev[langCode] || [];
      const newTypes = currentTypes.includes(categoryId)
        ? currentTypes.filter(id => id !== categoryId)
        : [...currentTypes, categoryId];
      return { ...prev, [langCode]: newTypes };
    });
  };

  // Handle displayed game type selection
  const handleDisplayedGameTypeToggle = (typeId: string) => {
    setSelectedDisplayedGameTypes(prev => {
      const newTypes = prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId];
      return newTypes;
    });
  };

  // --- Helper to render screenshot uploader --- (Keep if screenshots are managed here)
  const renderScreenshotUploader = (langCode: string, type: 'jackpot' | 'tableGame') => {
     const previews = type === 'jackpot' ? jackpotScreenshotPreviews[langCode] : tableGameScreenshotPreviews[langCode];
     const files = type === 'jackpot' ? jackpotScreenshots[lang.code] : tableGameScreenshots[lang.code];
     const inputId = `screenshots-upload-${type}-${langCode}`;

     return (
       <div className="space-y-3">
         <Label htmlFor={inputId} className="text-md font-medium">
           Screenshots ({type === 'jackpot' ? 'Jackpot Slots' : 'Table Games'}) - Max 2
         </Label>
         <div className="grid grid-cols-2 gap-4">
           {previews?.map((preview, idx) => (
             <div key={idx} className="relative group border rounded">
               <img src={preview} alt={`Preview ${idx + 1}`} className="w-full h-24 object-cover rounded" />
               <Button
                 type="button"
                 variant="destructive"
                 size="icon"
                 className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                 onClick={() => handleRemoveScreenshot(langCode, idx, type)}
               >
                 <X className="h-4 w-4" />
               </Button>
             </div>
           ))}
           {(!files || files.length < 2) && (
             <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded h-24">
               <Button type="button" variant="outline" size="sm" asChild>
                 <label htmlFor={inputId} className="cursor-pointer flex items-center gap-2">
                   <Upload className="h-4 w-4" /> Upload
                 </label>
               </Button>
               <Input
                 id={inputId}
                 type="file"
                 accept="image/*"
                 multiple
                 onChange={(e) => handleScreenshotChange(e, langCode, type)}
                 className="hidden"
                 disabled={files?.length >= 2}
               />
             </div>
           )}
         </div>
       </div>
     );
   };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl md:max-w-5xl lg:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Create New Casino</DialogTitle>
        </DialogHeader>
        {/* Use CasinoForm component here */}
        <CasinoForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
          // Pass initialData if needed for editing
          // initialData={...}
        />
      </DialogContent>
    </Dialog>
  );
}
