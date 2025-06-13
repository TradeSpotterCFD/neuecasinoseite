import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, GamepadIcon, ListChecksIcon } from "lucide-react";
import { CreateCasinoDialog } from "@/components/admin/CreateCasinoDialog";
import { CasinoReviewDialog } from "@/components/CasinoReviewDialog";
import { GameCategoriesModal } from "@/components/GameCategoriesModal";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Casino } from "@/types";
import { FEATURE_CATEGORIES } from "@/components/admin/FeatureCategoriesCheckboxes";
// Removed incorrect import of eq

export default function AdminCasinos() {
  const [casinos, setCasinos] = useState<Casino[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [casinoToDelete, setCasinoToDelete] = useState<Casino | null>(null);
  const [casinoToEdit, setCasinoToEdit] = useState<Casino | null>(null);
  const [isGameCategoriesModalOpen, setIsGameCategoriesModalOpen] = useState(false);
  const [selectedCasinoForCategories, setSelectedCasinoForCategories] = useState<Casino | null>(null);

  const fetchCasinos = async () => {
    try {
      setIsLoading(true);
      // Fetch casinos and join with all translations
      const { data, error } = await supabase
        .from('casinos')
        .select(`
          *,
          casino_translations!left(
            language_code,
            casino_url,
            meta_title,
            meta_description,
            description,
            general_bonus,
            bonus_rate,
            bonus_amount,
            bonus_validity,
            bonus_conditions,
            more_bonuses,
            bonus_disclaimer,
            review_text,
            live_cashback,
            live_cashback_rate,
            live_cashback_max_amount,
            live_cashback_validity,
            live_cashback_conditions,
            live_cashback_disclaimer,
            weekly_cashback,
            weekly_cashback_rate,
            weekly_cashback_max_amount,
            weekly_cashback_validity,
            weekly_cashback_conditions,
            weekly_cashback_disclaimer,
            reload_bonus,
            reload_bonus_rate,
            reload_bonus_max_amount,
            reload_bonus_validity,
            reload_bonus_requirements,
            reload_bonus_disclaimer,
            player_protection,
            customer_service,
            screenshots
          )
        `)
        .order('name');

      if (error) throw error;

      // Map database objects to the Casino type with proper field transformation
      const casinosData: Casino[] = (data || []).map(casino => {
        // Transform nested translations array into a language-keyed object
        const translationsMap = (Array.isArray(casino.casino_translations) ? casino.casino_translations : []).reduce((acc: any, trans: any) => {
          acc[trans.language_code] = trans;
          return acc;
        }, {});

        return {
          id: casino.id,
          name: casino.name,
          logo: casino.logo_url || '', // Map logo_url to logo
          rating: casino.rating || 0, // Map rating
          minDeposit: casino.min_deposit || 0, // Map min_deposit
          yearEstablished: casino.year_established || 0, // Map year_established
          licenseInfo: Array.isArray(casino.license_info) ? casino.license_info : [],
          withdrawalRate: casino.withdrawal_rate || '', // Map withdrawal_rate
          company: casino.company || '', // Map company
          headquarters: casino.headquarters || '', // Map headquarters
          gameProviders: casino.game_providers || [], // Map game_providers (array)
          gameCount: casino.game_count || '', // Map game_count
          rtpTest: Array.isArray(casino.rtp_test) ? casino.rtp_test : [], // Map rtp_test as array
          gameCategories: casino.game_categories || [], // Map game_categories (array)
          featureCategories: casino.feature_categories || [], // Map feature_categories (array)
          // Map multilingual fields to the structure expected by CasinoReviewForm
          descriptions: Object.keys(translationsMap).reduce((acc: any, langCode) => {
            acc[langCode] = translationsMap[langCode].description || '';
            return acc;
          }, {}),
          bonuses: Object.keys(translationsMap).reduce((acc: any, langCode) => {
            acc[langCode] = translationsMap[langCode].general_bonus || '';
            return acc;
          }, {}),
          reviewTexts: Object.keys(translationsMap).reduce((acc: any, langCode) => {
            acc[langCode] = translationsMap[langCode].review_text || '';
            return acc;
          }, {}),
          introTexts: Object.keys(translationsMap).reduce((acc: any, langCode) => {
             // Assuming 'intro_text' exists in translations, otherwise map from a different source if needed
             acc[langCode] = translationsMap[langCode].intro_text || '';
             return acc;
          }, {}),
          additionalIntroTexts: Object.keys(translationsMap).reduce((acc: any, langCode) => {
             // Assuming 'additional_intro_text' exists in translations
             acc[langCode] = translationsMap[langCode].additional_intro_text || '';
             return acc;
          }, {}),
          gamesSectionTexts: Object.keys(translationsMap).reduce((acc: any, langCode) => {
             // Assuming 'games_section_text' exists in translations
             acc[langCode] = translationsMap[langCode].games_section_text || '';
             return acc;
          }, {}),
          bonusIntroTexts: Object.keys(translationsMap).reduce((acc: any, langCode) => {
             // Assuming 'bonus_intro_text' exists in translations
             acc[langCode] = translationsMap[langCode].bonus_intro_text || '';
             return acc;
          }, {}),
          bonusConclusionTexts: Object.keys(translationsMap).reduce((acc: any, langCode) => {
             // Assuming 'bonus_conclusion_text' exists in translations
             acc[langCode] = translationsMap[langCode].bonus_conclusion_text || '';
             return acc;
          }, {}),
          reloadBonuses: Object.keys(translationsMap).reduce((acc: any, langCode) => {
            acc[langCode] = translationsMap[langCode].reload_bonus || '';
            return acc;
          }, {}),
          reloadBonusRates: Object.keys(translationsMap).reduce((acc: any, langCode) => {
            acc[langCode] = translationsMap[langCode].reload_bonus_rate || '';
            return acc;
          }, {}),
          reloadBonusMaxAmounts: Object.keys(translationsMap).reduce((acc: any, langCode) => {
            acc[langCode] = translationsMap[langCode].reload_bonus_max_amount || '';
            return acc;
          }, {}),
          reloadBonusValidities: Object.keys(translationsMap).reduce((acc: any, langCode) => {
            acc[langCode] = translationsMap[langCode].reload_bonus_validity || '';
            return acc;
          }, {}),
          reloadBonusRequirements: Object.keys(translationsMap).reduce((acc: any, langCode) => {
            acc[langCode] = translationsMap[langCode].reload_bonus_requirements || '';
            return acc;
          }, {}),
          reloadBonusDisclaimers: Object.keys(translationsMap).reduce((acc: any, langCode) => {
            acc[langCode] = translationsMap[langCode].reload_bonus_disclaimer || '';
            return acc;
          }, {}),
          playerProtection: Object.keys(translationsMap).reduce((acc: any, langCode) => {
             acc[langCode] = translationsMap[langCode].player_protection || '';
             return acc;
          }, {}),
          customerService: Object.keys(translationsMap).reduce((acc: any, langCode) => {
             acc[langCode] = translationsMap[langCode].customer_service || '';
             return acc;
          }, {}),
          // Assuming screenshot URLs are stored in the translations table
          screenshots: Object.keys(translationsMap).reduce((acc: any, langCode) => {
             acc[langCode] = translationsMap[langCode].screenshots || [];
             return acc;
          }, {}),
          // Add other multilingual fields as needed, mapping from translationsMap
          // Example:
          // bonusRates: Object.keys(translationsMap).reduce((acc: any, langCode) => {
          //   acc[langCode] = translationsMap[langCode].bonus_rate || '';
          //   return acc;
          // }, {}),
          // bonusAmounts: Object.keys(translationsMap).reduce((acc: any, langCode) => {
          //   acc[langCode] = translationsMap[langCode].bonus_amount || '';
          //   return acc;
          // }, {}),
          // bonusValidities: Object.keys(translationsMap).reduce((acc: any, langCode) => {
          //   acc[langCode] = translationsMap[langCode].bonus_validity || '';
          //   return acc;
          // }, {}),
          // bonusRequirements: Object.keys(translationsMap).reduce((acc: any, langCode) => {
          //   acc[langCode] = translationsMap[langCode].bonus_conditions || '';
          //   return acc;
          // }, {}),
          // additionalBonuses: Object.keys(translationsMap).reduce((acc: any, langCode) => {
          //   acc[langCode] = translationsMap[langCode].more_bonuses || '';
          //   return acc;
          // }, {}),
          // bonusDisclaimers: Object.keys(translationsMap).reduce((acc: any, langCode) => {
          //   acc[langCode] = translationsMap[langCode].bonus_disclaimer || '';
          //   return acc;
          // }, {}),
          // liveCasino cashbacks: Object.keys(translationsMap).reduce((acc: any, langCode) => {
          //    acc[langCode] = translationsMap[langCode].live_cashback || '';
          //    return acc;
          // }, {}),
          // liveCasinoCashbackRates: Object.keys(translationsMap).reduce((acc: any, langCode) => {
          //    acc[langCode] = translationsMap[langCode].live_cashback_rate || '';
          //    return acc;
          // }, {}),
          // liveCasinoCashbackMaxAmounts: Object.keys(translationsMap).reduce((acc: any, langCode) => {
          //    acc[langCode] = translationsMap[langCode].live_cashback_max_amount || '';
          //    return acc;
          // }, {}),
          // liveCasinoCashbackValidities: Object.keys(translationsMap).reduce((acc: any, langCode) => {
          //    acc[langCode] = translationsMap[langCode].live_cashback_validity || '';
          //    return acc;
          // }, {}),
          // liveCasinoCashbackRequirements: Object.keys(translationsMap).reduce((acc: any, langCode) => {
          //    acc[langCode] = translationsMap[langCode].live_cashback_conditions || '';
          //    return acc;
          // }, {}),
          // liveCasinoCashbackDisclaimers: Object.keys(translationsMap).reduce((acc: any, langCode) => {
          //    acc[langCode] = translationsMap[langCode].live_cashback_disclaimer || '';
          //    return acc;
          // }, {}),
          // weeklyCashbacks: Object.keys(translationsMap).reduce((acc: any, langCode) => {
          //    acc[langCode] = translationsMap[langCode].weekly_cashback || '';
          //    return acc;
          // }, {}),
          // weeklyCashbackRates: Object.keys(translationsMap).reduce((acc: any, langCode) => {
          //    acc[langCode] = translationsMap[langCode].weekly_cashback_rate || '';
          //    return acc;
          // }, {}),
          // weeklyCashbackMaxAmounts: Object.keys(translationsMap).reduce((acc: any, langCode) => {
          //    acc[langCode] = translationsMap[langCode].weekly_cashback_max_amount || '';
          //    return acc;
          // }, {}),
          // weeklyCashbackValidities: Object.keys(translationsMap).reduce((acc: any, langCode) => {
          //    acc[langCode] = translationsMap[langCode].weekly_cashback_validity || '';
          //    return acc;
          // }, {}),
          // weeklyCashbackRequirements: Object.keys(translationsMap).reduce((acc: any, langCode) => {
          //    acc[langCode] = translationsMap[langCode].weekly_cashback_conditions || '';
          //    return acc;
          // }, {}),
          // weeklyCashbackDisclaimers: Object.keys(translationsMap).reduce((acc: any, langCode) => {
          //    acc[langCode] = translationsMap[langCode].weekly_cashback_disclaimer || '';
          //    return acc;
          // }, {}),
        };
      });

      console.log("Fetched casinos:", casinosData);
      // Log game providers for each fetched casino for debugging
      casinosData.forEach(casino => {
        console.log(`Casino "${casino.name}" game providers:`, casino.gameProviders);
      });
      setCasinos(casinosData);
    } catch (error: any) { // Explicitly type error
      console.error("Error fetching casinos:", error);
      toast({
        title: "Fehler",
        description: "Die Casinos konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCasino = async () => {
    if (!casinoToDelete) return;

    try {
      // Lösche zuerst die zugehörigen Übersetzungen
      await supabase
        .from('casino_translations')
        .delete()
        .eq('casino_id', casinoToDelete.id);

      // Dann lösche das Casino selbst
      const { error } = await supabase
        .from('casinos')
        .delete()
        .eq('id', casinoToDelete.id);

      if (error) throw error;

      toast({
        title: "Casino gelöscht",
        description: `Das Casino "${casinoToDelete.name}" wurde erfolgreich gelöscht.`,
      });

      fetchCasinos();
    } catch (error: any) { // Explicitly type error
      console.error("Error deleting casino:", error);
      toast({
        title: "Fehler",
        description: "Das Casino konnte nicht gelöscht werden.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setCasinoToDelete(null);
    }
  };

  const handleOpenGameCategoriesModal = (casino: Casino) => {
    setSelectedCasinoForCategories(casino);
    setIsGameCategoriesModalOpen(true);
  };

  const handleEditCasino = (casino: Casino) => {
    setCasinoToEdit(casino);
  };

  useEffect(() => {
    fetchCasinos();
  }, []);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Casinos</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Casino
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading casinos...</div>
      ) : casinos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No casinos found</p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Your First Casino
          </Button>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Min. Deposit</TableHead>
                <TableHead>Bonus</TableHead>
                <TableHead>Reload Bonus</TableHead>
                <TableHead>Game Categories</TableHead>
                <TableHead>Feature Categories</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {casinos.map((casino) => (
                <TableRow key={casino.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {casino.logo && (
                        <img
                          src={casino.logo}
                          alt={`${casino.name} logo`}
                          className="h-8 w-8 object-contain rounded"
                        />
                      )}
                      {casino.name}
                    </div>
                  </TableCell>
                  <TableCell>{casino.rating || '-'}</TableCell>
                  <TableCell>{casino.minDeposit ? `$${casino.minDeposit}` : '-'}</TableCell>
                  {/* Display English bonus and reload bonus for the table */}
                  <TableCell className="max-w-xs truncate">{casino.bonuses?.en || '-'}</TableCell>
                  <TableCell className="max-w-xs truncate">{casino.reloadBonuses?.en || '-'}</TableCell>
                  <TableCell>
                    {casino.gameCategories && casino.gameCategories.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-gray-600">{casino.gameCategories.length} categories</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">Not set</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {casino.featureCategories && casino.featureCategories.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-gray-600">{casino.featureCategories.length} features</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">Not set</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCasino(casino)}
                      >
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenGameCategoriesModal(casino)}
                      >
                        <GamepadIcon className="h-4 w-4 mr-1" /> Games
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => {
                          setCasinoToDelete(casino);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <CreateCasinoDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCasinoCreated={fetchCasinos}
      />

      {/* Add key prop to force re-mount when casinoToEdit changes */}
      {casinoToEdit && (
        <CasinoReviewDialog
          key={casinoToEdit.id}
          open={!!casinoToEdit} // Control open state from parent
          onOpenChange={(open) => { // Handle dialog close
            if (!open) {
              setCasinoToEdit(null); // Reset casinoToEdit when dialog closes
            }
            fetchCasinos(); // Refresh list after closing edit dialog
          }}
          initialData={casinoToEdit}
          onSubmit={() => {
            setCasinoToEdit(null); // Reset casinoToEdit on successful submit
            fetchCasinos();
          }}
          // Removed onCancel prop as it's not defined on CasinoReviewDialog
          trigger={<span style={{ display: "none" }}></span>}
        />
      )}

      {selectedCasinoForCategories && (
        <GameCategoriesModal
          open={isGameCategoriesModalOpen}
          onOpenChange={setIsGameCategoriesModalOpen}
          casinoId={selectedCasinoForCategories.id}
          initialCategories={selectedCasinoForCategories.gameCategories || []}
          onCategoriesUpdated={fetchCasinos}
        />
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Casino löschen</AlertDialogTitle>
            <AlertDialogDescription>
              Sind Sie sicher, dass Sie das Casino "{casinoToDelete?.name}" löschen möchten?
              Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCasino}
              className="bg-red-500 hover:bg-red-600"
            >
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
