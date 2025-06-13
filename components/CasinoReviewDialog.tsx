import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CasinoReviewForm } from "@/components/CasinoReviewForm";
import { supabase } from "@/integrations/supabase/client";
import { Casino } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface CasinoReviewDialogProps {
  initialData?: Casino;
  onSubmit: () => void;
  trigger: React.ReactNode;
  open: boolean; // Add open prop
  onOpenChange: (open: boolean) => void; // Add onOpenChange prop
}

export function CasinoReviewDialog({
  initialData,
  onSubmit,
  trigger,
  open, // Receive open prop
  onOpenChange, // Receive onOpenChange prop
}: CasinoReviewDialogProps) {
  console.log("Rendering CasinoReviewDialog...", { open, initialData }); // Add log here
  // Removed internal open state, now controlled by parent via 'open' prop
  // const [open, setOpen] = useState(!!initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);

    try {
      // Prepare data for the main casinos table (only non-language-dependent fields)
      const casinoData: any = {
        name: formData.name,
        rating: formData.rating,
        min_deposit: formData.minDeposit,
        company: formData.company,
        headquarters: formData.headquarters,
        license_info: formData.licenseInfo,
        year_established: formData.yearEstablished,
        withdrawal_rate: formData.withdrawalRate,
        rtp_test: formData.rtpTest,
        game_providers: formData.gameProviders,
        game_count: formData.gameCount,
      };

      // Handle file upload for logo if changed
      let logoUrl = initialData?.logo_url || null; // Use logo_url from initialData

      if (formData.logo && typeof formData.logo !== 'string') {
        const timestamp = Date.now();
        const fileName = `casino-logo-${timestamp}`;
        const fileExtension = formData.logo.name.split('.').pop();
        const filePath = `${fileName}.${fileExtension}`;

        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('casino-media')
          .upload(filePath, formData.logo, {
            cacheControl: '3600',
            upsert: true
          });

        if (uploadError) {
          throw new Error(`Error uploading logo: ${uploadError.message}`);
        }

        const { data: { publicUrl } } = supabase
          .storage
          .from('casino-media')
          .getPublicUrl(filePath);

        logoUrl = publicUrl;
      }

      if (logoUrl) {
        casinoData.logo_url = logoUrl;
      }

      // Upsert casino data
      let response;

      if (initialData?.id) {
        // Update existing casino
        response = await supabase
          .from('casinos')
          .update(casinoData)
          .eq('id', initialData.id);
      } else {
        // Insert new casino
        response = await supabase
          .from('casinos')
          .insert(casinoData)
          .select('id')
          .single();
      }

      if (response.error) {
        throw response.error;
      }

      const casinoId = initialData?.id || response.data?.id;

      // Collect all new screenshot files from all languages
      const screenshotFilesToUpload: { file: File; lang: string; originalIndex: number }[] = [];
      const existingScreenshotUrls: { url: string; lang: string; originalIndex: number }[] = [];

      for (const lang of Object.keys(formData.translations)) {
        const translation = formData.translations[lang];
        if (translation.screenshots && Array.isArray(translation.screenshots)) {
          translation.screenshots.forEach((screenshotFile: File | string, index: number) => {
            if (typeof screenshotFile !== 'string') {
              screenshotFilesToUpload.push({ file: screenshotFile, lang, originalIndex: index });
            } else {
              existingScreenshotUrls.push({ url: screenshotFile, lang, originalIndex: index });
            }
          });
        }
      }

      // Upload all new screenshot files
      const uploadedScreenshotPaths: { path: string; lang: string; originalIndex: number }[] = [];
      for (const { file, lang, originalIndex } of screenshotFilesToUpload) {
        const timestamp = Date.now();
        const fileName = `casino-${casinoId}-${lang}-screenshot-${timestamp}`;
        const fileExtension = file.name.split('.').pop();
        const filePath = `${fileName}.${fileExtension}`;

        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('casino-media')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
          });

        if (uploadError) {
          console.error(`Error uploading screenshot for ${lang}:`, uploadError);
          // Log and skip this screenshot if upload fails
          continue;
        }
        uploadedScreenshotPaths.push({ path: uploadData.path, lang, originalIndex });
      }

      // Get public URLs for all uploaded screenshots
      const uploadedScreenshotUrls: { url: string; lang: string; originalIndex: number }[] = [];
      for (const { path, lang, originalIndex } of uploadedScreenshotPaths) {
         const { data: { publicUrl } } = supabase
           .storage
           .from('casino-media')
           .getPublicUrl(path);
         uploadedScreenshotUrls.push({ url: publicUrl, lang, originalIndex });
      }

      // Combine existing and new screenshot URLs and associate with translations
      const allScreenshotUrls: Record<string, string[]> = {};
      [...existingScreenshotUrls, ...uploadedScreenshotUrls].forEach(({ url, lang, originalIndex }) => {
         if (!allScreenshotUrls[lang]) {
            allScreenshotUrls[lang] = [];
         }
         // Ensure URLs are placed in their original order
         allScreenshotUrls[lang][originalIndex] = url;
      });


      // Process translations for each language
      for (const lang of Object.keys(formData.translations)) {
        const translation = formData.translations[lang];

        const translationData = {
          casino_id: casinoId,
          language_code: lang,
          url: translation.url,
          meta_title: translation.metaTitle,
          meta_description: translation.metaDescription,
          description: translation.description,
          bonus: translation.bonus,
          bonus_rate: translation.bonusRate,
          bonus_amount: translation.bonusAmount,
          bonus_validity: translation.bonusValidity,
          bonus_requirements: translation.bonusRequirements,
          additional_bonuses: translation.additionalBonuses,
          bonus_disclaimer: translation.bonusDisclaimer,
          live_casino_cashback: translation.liveCasinoCashback,
          live_casino_cashback_rate: translation.liveCasinoCashbackRate,
          live_casino_cashback_max_amount: translation.liveCasinoCashbackMaxAmount,
          live_casino_cashback_validity: translation.liveCasinoCashbackValidity,
          live_casino_cashback_requirements: translation.liveCasinoCashbackRequirements,
          live_casino_cashback_disclaimer: translation.liveCasinoCashbackDisclaimer,
          weekly_cashback: translation.weeklyCashback,
          weekly_cashback_rate: translation.weeklyCashbackRate,
          weekly_cashback_max_amount: translation.weeklyCashbackMaxAmount,
          weekly_cashback_validity: translation.weeklyCashbackValidity,
          weekly_cashback_requirements: translation.weeklyCashbackRequirements,
          weekly_cashback_disclaimer: translation.weeklyCashbackDisclaimers,
          reload_bonus: translation.reloadBonus,
          reload_bonus_rate: translation.reloadBonusRate,
          reload_bonus_max_amount: translation.reloadBonusMaxAmount,
          reload_bonus_validity: translation.reloadBonusValidity,
          reload_bonus_requirements: translation.reloadBonusRequirements,
          reload_bonus_disclaimer: translation.reloadBonusDisclaimers,
          player_protection: translation.playerProtection,
          customer_service: translation.customerService,
          screenshots: allScreenshotUrls[lang] || [], // Use the collected screenshot URLs
        };

        // Upsert translation
        const { error: translationError } = await supabase
          .from('casino_translations')
          .upsert({
            ...translationData,
          }, {
            onConflict: 'casino_id,language_code'
          });

        if (translationError) {
          throw translationError;
        }
      }

      toast({
        title: initialData ? "Casino aktualisiert" : "Casino erstellt",
        description: `${formData.name} wurde erfolgreich ${initialData ? "aktualisiert" : "erstellt"}.`,
      });

      onOpenChange(false); // Close dialog on success
      onSubmit();
    } catch (error: any) {
      console.error("Error saving casino:", error);
      toast({
        title: "Fehler",
        description: `Es ist ein Fehler aufgetreten: ${error.message}`,
        variant: "destructive",
      });
      onOpenChange(false); // Close dialog on error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}> {/* Use parent's open and onOpenChange */}
      <div onClick={() => onOpenChange(true)}>{trigger}</div> {/* Trigger uses onOpenChange */}
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-bold">
            {initialData ? `Edit ${initialData.name}` : "Create New Casino"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto p-6">
          <CasinoReviewForm
            initialData={initialData}
            onSubmit={handleFormSubmit}
            onCancel={() => onOpenChange(false)}
            isSubmitting={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
