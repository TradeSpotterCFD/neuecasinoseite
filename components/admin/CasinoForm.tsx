import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Image, Upload, X, Plus, Check, ChevronsUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "pt-BR", name: "Português (Brasil)", flag: "🇧🇷" },
  { code: "pt-PT", name: "Português (Portugal)", flag: "🇵🇹" },
];

import { useEffect } from "react"; // Import useEffect
import { supabase } from "@/integrations/supabase/client"; // Import supabase client

// Define the list of game providers
const gameProvidersList = [].sort(); // Initialize as empty array

// Define the list of RTP testing labs
const rtpLabsList = [
  "eCOGRA", "iTech Labs", "GLI", "QUINEL", "SIQ", "BMM Testlabs", "Trisigma",
  "NMi Gaming", "SKL", "TST", "Deloitte", "PricewaterhouseCoopers (PwC)",
].sort();

// Define the list of licensing authorities
const licensingAuthoritiesList = [
  "Malta Gaming Authority (MGA)", "UK Gambling Commission (UKGC)",
  "Gibraltar Licensing Authority (GLA)", "National Betting Authority (NBA Cyprus)",
  "Gemeinsame Glücksspielbehörde der Länder (GGL)", "Spelinspektionen (Swedish Gambling Authority)",
  "Spillemyndigheden (Danish Gambling Authority)", "Dirección General de Ordenación del Juego (DGOJ)",
  "Agenzia delle Dogane e dei Monopoli (ADM/AAMS)", "Autorité Nationale des Jeux (ANJ)",
  "Kansspelautoriteit (KSA)", "Belgian Gaming Commission", "Revenue Commissioners (Ireland)",
  "iGaming Ontario", "Kahnawake Gaming Commission", "Curaçao eGaming / Curaçao Gaming Authority (CGA)",
  "Junta de Control de Juegos (JCJ)", "Costa Rica Business License",
  "PAGCOR (Philippine Amusement and Gaming Corporation)", "Isle of Man Gambling Supervision Commission",
].sort();


type TranslationFields = {
  url: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  bonus: string;
  bonusRate: string;
  bonusAmount: string;
  bonusValidity: string;
  bonusRequirements: string;
  additionalBonuses: string;
  bonusDisclaimer: string;
  // Live Casino Cashback fields
  liveCasinoCashback: string;
  liveCasinoCashbackRate: string;
  liveCasinoCashbackMaxAmount: string;
  liveCasinoCashbackValidity: string;
  liveCasinoCashbackRequirements: string;
  liveCasinoCashbackDisclaimer: string;
  // Weekly Cashback fields
  weeklyCashback: string;
  weeklyCashbackRate: string;
  weeklyCashbackMaxAmount: string;
  weeklyCashbackValidity: string;
  weeklyCashbackRequirements: string;
  weeklyCashbackDisclaimer: string;
  // Reload Bonus fields
  reloadBonus: string;
  reloadBonusRate: string;
  reloadBonusMaxAmount: string;
  reloadBonusValidity: string;
  reloadBonusRequirements: string;
  reloadBonusDisclaimer: string;
  screenshots: File[];
  // Added language-dependent fields
  playerProtection: string;
  customerService: string;
};

export type CasinoFormValues = {
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
  translations: Record<string, TranslationFields>;
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Name ist erforderlich" }),
  rating: z.coerce.number().min(0).max(10),
  minDeposit: z.coerce.number().min(0).optional(),
  company: z.string().optional(),
  headquarters: z.string().optional(),
  licenseInfo: z.array(z.string()).optional(),
  yearEstablished: z.coerce.number().optional(),
  withdrawalRate: z.string().optional(),
  rtpTest: z.array(z.string()).optional(),
  gameProviders: z.array(z.string()).optional(),
  gameCount: z.string().optional(),
  translations: z.record(
    z.object({
      url: z.string().url({ message: "Bitte geben Sie eine gültige URL ein" }).or(z.string().length(0)),
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      description: z.string().optional(),
      bonus: z.string().optional(),
      bonusRate: z.string().optional(),
      bonusAmount: z.string().optional(),
      bonusValidity: z.string().optional(),
      bonusRequirements: z.string().optional(),
      additionalBonuses: z.string().optional(),
      bonusDisclaimer: z.string().optional(),
      // Add validation for Live Casino Cashback fields
      liveCasinoCashback: z.string().optional(),
      liveCasinoCashbackRate: z.string().optional(),
      liveCasinoCashbackMaxAmount: z.string().optional(),
      liveCasinoCashbackValidity: z.string().optional(),
      liveCasinoCashbackRequirements: z.string().optional(),
      liveCasinoCashbackDisclaimer: z.string().optional(),
      // Add validation for Weekly Cashback fields
      weeklyCashback: z.string().optional(),
      weeklyCashbackRate: z.string().optional(),
      weeklyCashbackMaxAmount: z.string().optional(),
      weeklyCashbackValidity: z.string().optional(),
      weeklyCashbackRequirements: z.string().optional(),
      weeklyCashbackDisclaimer: z.string().optional(),
      // Add validation for Reload Bonus fields
      reloadBonus: z.string().optional(),
      reloadBonusRate: z.string().optional(),
      reloadBonusMaxAmount: z.string().optional(),
      reloadBonusValidity: z.string().optional(),
      reloadBonusRequirements: z.string().optional(),
      reloadBonusDisclaimer: z.string().optional(),
      screenshots: z.any().optional(),
      // Added language-dependent fields validation
      playerProtection: z.string().optional(),
      customerService: z.string().optional(),
    })
  ),
});

interface CasinoFormProps {
  onSubmit: (data: CasinoFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  initialData?: Partial<CasinoFormValues>;
}

export function CasinoForm({ onSubmit, onCancel, isSubmitting = false, initialData }: CasinoFormProps) {
  console.log("Rendering CasinoForm..."); // Add log here
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("general");
  const [screenshotPreviews, setScreenshotPreviews] = useState<Record<string, string[]>>({});
  const [gameProvidersPopoverOpen, setGameProvidersPopoverOpen] = useState(false);
  const [gameProvidersSearch, setGameProvidersSearch] = useState("");
  const [rtpPopoverOpen, setRtpPopoverOpen] = useState(false);
  const [rtpSearch, setRtpSearch] = useState("");
  const [licensePopoverOpen, setLicensePopoverOpen] = useState(false);
  const [licenseSearch, setLicenseSearch] = useState("");
  const [availableGameProviders, setAvailableGameProviders] = useState<string[]>([]); // State for fetched providers

  // Fetch game providers from the database on component mount
  useEffect(() => {
    console.log("Fetching game providers..."); // Log to check if effect runs
    const fetchGameProviders = async () => {
      console.log("Executing fetchGameProviders..."); // Log to check if function is called
      const { data, error } = await supabase
        .from('game_providers')
        .select('name')
        .order('name');

      if (error) {
        console.error("Error fetching game providers:", error);
      } else {
        setAvailableGameProviders(data?.map(provider => provider.name) || []);
      }
    };

    fetchGameProviders();
  }, [initialData]); // Add initialData to dependency array to refetch when editing a different casino

  // Prepare initial translations based on languages and initialData
  const initialTranslationsDefault = languages.reduce((acc, lang) => {
    acc[lang.code] = {
      url: "", metaTitle: "", metaDescription: "", description: "", bonus: "",
      bonusRate: "", bonusAmount: "", bonusValidity: "", bonusRequirements: "",
      additionalBonuses: "", bonusDisclaimer: "", liveCasinoCashback: "",
      liveCasinoCashbackRate: "", liveCasinoCashbackMaxAmount: "", liveCasinoCashbackValidity: "",
      liveCasinoCashbackRequirements: "", liveCasinoCashbackDisclaimer: "", weeklyCashback: "",
      weeklyCashbackRate: "", weeklyCashbackMaxAmount: "", weeklyCashbackValidity: "",
      weeklyCashbackRequirements: "", weeklyCashbackDisclaimer: "", reloadBonus: "",
      reloadBonusRate: "", reloadBonusMaxAmount: "", reloadBonusValidity: "",
      reloadBonusRequirements: "", reloadBonusDisclaimer: "", screenshots: [],
      playerProtection: "",
      customerService: "",
    };
    return acc; // Corrected: Added return statement
  }, {} as Record<string, TranslationFields>);

  const form = useForm<CasinoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      logo: initialData?.logo || null,
      rating: initialData?.rating || 0,
      minDeposit: initialData?.minDeposit || 0,
      company: initialData?.company || "",
      headquarters: initialData?.headquarters || "",
      licenseInfo: initialData?.licenseInfo || [],
      yearEstablished: initialData?.yearEstablished || new Date().getFullYear(),
      withdrawalRate: initialData?.withdrawalRate || "",
      rtpTest: initialData?.rtpTest || [],
      gameProviders: initialData?.gameProviders || [],
      gameCount: initialData?.gameCount || "",
      // Use the prepared initial translations, merging with initialData
      translations: languages.reduce((acc, lang) => {
        acc[lang.code] = {
          ...initialTranslationsDefault[lang.code], // Start with defaults
          ...(initialData?.translations?.[lang.code] || {}), // Override with initialData if present
        };
        return acc;
      }, {} as Record<string, TranslationFields>),
    },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
      form.setValue("logo", file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    form.setValue("logo", null);
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>, langCode: string) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const currentScreenshots = form.getValues(`translations.${langCode}.screenshots`) || [];
    const newScreenshots = [...currentScreenshots, ...files];
    form.setValue(`translations.${langCode}.screenshots`, newScreenshots); // Corrected: Use langCode
    const newPreviews = [...(screenshotPreviews[langCode] || [])];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        setScreenshotPreviews(prev => ({ ...prev, [langCode]: [...newPreviews] }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveScreenshot = (langCode: string, index: number) => {
    const screenshots = form.getValues(`translations.${langCode}.screenshots`) || []; // Corrected: Use langCode
    const newScreenshots = [...screenshots];
    newScreenshots.splice(index, 1);
    form.setValue(`translations.${langCode}.screenshots`, newScreenshots); // Corrected: Use langCode
    const newPreviews = [...(screenshotPreviews[langCode] || [])];
    newPreviews.splice(index, 1);
    setScreenshotPreviews(prev => ({ ...prev, [langCode]: newPreviews }));
  };


  const handleFormSubmit = (values: CasinoFormValues) => {
    onSubmit(values);
  };

  // Filter lists based on search query
  const filteredGameProviders = availableGameProviders.filter(provider => // Use fetched providers
    provider.toLowerCase().includes(gameProvidersSearch.toLowerCase())
  );
  const filteredRtpLabs = rtpLabsList.filter(lab =>
    lab.toLowerCase().includes(rtpSearch.toLowerCase())
  );
  const filteredLicensingAuthorities = licensingAuthoritiesList.filter(authority =>
    authority.toLowerCase().includes(licenseSearch.toLowerCase())
  );

  // Helper function to render multi-select popover
  const renderMultiSelectPopover = (
    formField: any, // Renamed from field
    isPopoverOpen: boolean, // Renamed from popoverOpen
    setPopoverOpenState: (open: boolean) => void, // Renamed from setPopoverOpen
    searchValue: string, // Renamed from search
    setSearchValue: (search: string) => void, // Renamed from setSearch
    allItemsList: string[], // Renamed from itemList
    filteredItemsList: string[], // Renamed from filteredItemList
    buttonTextSingular: string,
    buttonTextPlural: string,
    placeholder: string,
    searchPlaceholder: string
  ) => {
    return (
      <Popover open={isPopoverOpen} onOpenChange={setPopoverOpenState} modal={true}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isPopoverOpen}
              className={cn(
                "w-full justify-between",
                !formField.value || formField.value.length === 0 && "text-muted-foreground"
              )}
            >
              {formField.value && formField.value.length > 0
                ? `${formField.value.length} ${formField.value.length === 1 ? buttonTextSingular : buttonTextPlural} ausgewählt`
                : placeholder}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
          <Command>
            <CommandInput
              placeholder={searchPlaceholder}
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>Keine Einträge gefunden.</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="h-72">
                  {filteredItemsList.map((item) => (
                    <CommandItem
                      key={item}
                      value={item}
                      onSelect={() => {
                        const isSelected = formField.value?.includes(item);
                        const newValue = isSelected
                          ? formField.value?.filter((v: string) => v !== item)
                          : [...(formField.value || []), item];
                        formField.onChange(newValue);
                      }}
                    >
                      <Checkbox
                        className="mr-2"
                        checked={formField.value?.includes(item)}
                      />
                      {item}
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Grundlegende Casino Informationen Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Grundlegende Casino Informationen</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel className="font-medium">Name*</FormLabel><FormControl><Input placeholder="Name des Casinos" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <div className="space-y-2">
              <FormLabel className="font-medium">Logo</FormLabel>
              <div className="flex flex-col gap-4">
                {logoPreview ? (
                  <div className="relative w-64 mx-auto">
                    <img src={logoPreview} alt="Casino logo preview" className="max-h-32 max-w-full rounded-md border border-gray-200 mx-auto" />
                    <Button type="button" variant="outline" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white" onClick={handleRemoveLogo}><X className="h-4 w-4" /></Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-gray-300 p-8 text-center">
                    <Image className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Klicken zum Hochladen</p>
                    <p className="text-xs text-gray-400 mt-1">(max. 1MB)</p>
                  </div>
                )}
                <div className="flex justify-center">
                  <Input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" id="logo-upload" />
                  <Button type="button" variant="outline" asChild>
                    <label htmlFor="logo-upload" className="cursor-pointer flex items-center justify-center w-32"><Upload className="h-4 w-4 mr-2" />Hochladen</label>
                  </Button>
                </div>
              </div>
            </div>
            <FormField control={form.control} name="rating" render={({ field }) => (<FormItem><FormLabel className="font-medium">Gesamtbewertung (0-10)</FormLabel><FormControl><Input type="number" min="0" max="10" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="minDeposit" render={({ field }) => (<FormItem><FormLabel className="font-medium">Min. Einzahlung ($)</FormLabel><FormControl><Input type="number" min="0" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
<FormField control={form.control} name="company" render={({ field }) => (<FormItem><FormLabel className="font-medium">Unternehmen</FormLabel><FormControl><Input placeholder="Name des Unternehmens" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="headquarters" render={({ field }) => (<FormItem><FormLabel className="font-medium">Hauptsitz</FormLabel><FormControl><Input placeholder="Ort des Hauptsitzes" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="yearEstablished" render={({ field }) => (<FormItem><FormLabel className="font-medium">Online seit</FormLabel><FormControl><Input type="number" placeholder="Gründungsjahr" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="withdrawalRate" render={({ field }) => (<FormItem><FormLabel className="font-medium">Auszahlungsrate (%)</FormLabel><FormControl><Input placeholder="z.B. 96.5%" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="gameCount" render={({ field }) => (<FormItem><FormLabel className="font-medium">Anzahl Spiele</FormLabel><FormControl><Input placeholder="z.B. 1000+" {...field} /></FormControl><FormMessage /></FormItem>)} />

            {/* Fehlende Felder hinzugefügt */}
{/* Multi-Select Felder hinzugefügt */}
            <FormField
              control={form.control}
              name="licenseInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Glücksspiellizenz(en)</FormLabel>
                  {renderMultiSelectPopover(
                    field,
                    licensePopoverOpen,
                    setLicensePopoverOpen,
                    licenseSearch,
                    setLicenseSearch,
                    licensingAuthoritiesList,
                    filteredLicensingAuthorities,
                    "Lizenz",
                    "Lizenzen",
                    "Lizenz(en) auswählen",
                    "Lizenz suchen..."
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="gameProviders"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Spieleanbieter</FormLabel>
                  {renderMultiSelectPopover(
                    field,
                    gameProvidersPopoverOpen,
                    setGameProvidersPopoverOpen,
                    gameProvidersSearch,
                    setGameProvidersSearch,
                    availableGameProviders, // Use the fetched list
                    filteredGameProviders,
                    "Anbieter",
                    "Anbieter",
                    "Spieleanbieter auswählen",
                    "Anbieter suchen..."
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="rtpTest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">RTP Testlabor(e)</FormLabel>
                  {renderMultiSelectPopover(
                    field,
                    rtpPopoverOpen,
                    setRtpPopoverOpen,
                    rtpSearch,
                    setRtpSearch,
                    rtpLabsList,
                    filteredRtpLabs,
                    "Labor",
                    "Labore",
                    "RTP Testlabor(e) auswählen",
                    "Labor suchen..."
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="translations.en.playerProtection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Spielerschutz (EN)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Informationen zum Spielerschutz auf Englisch" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="translations.en.customerService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Kundenservice (EN)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Informationen zum Kundenservice auf Englisch" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Übersetzungen Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Übersetzungen</h2>
          </div>
          <Tabs defaultValue="en" className="w-full">
            <ScrollArea className="max-w-full pb-2">
              <TabsList className="flex w-full justify-start">
                {languages.map((lang) => (
                  <TabsTrigger key={lang.code} value={lang.code} onClick={() => setActiveTab(lang.code)}>
                    {lang.flag} {lang.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>
            {languages.map((lang) => (
              <TabsContent key={lang.code} value={lang.code} className="space-y-4 p-4 border rounded-md">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`translations.${lang.code}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">URL ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`URL für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.metaTitle`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Meta Titel ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Meta Titel für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.metaDescription`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Meta Beschreibung ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Textarea placeholder={`Meta Beschreibung für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Beschreibung ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Textarea placeholder={`Beschreibung für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.bonus`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Bonus Titel ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Bonus Titel für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.bonusRate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Bonus Rate ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Bonus Rate für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.bonusAmount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Bonus Betrag ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Bonus Betrag für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.bonusValidity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Bonus Gültigkeit ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Bonus Gültigkeit für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.bonusRequirements`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Bonus Bedingungen ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Textarea placeholder={`Bonus Bedingungen für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.additionalBonuses`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Zusätzliche Boni ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Textarea placeholder={`Zusätzliche Boni für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.bonusDisclaimer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Bonus Disclaimer ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Textarea placeholder={`Bonus Disclaimer für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   {/* Reload Bonus fields */}
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.reloadBonus`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Reload Bonus Titel ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Reload Bonus Titel für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.reloadBonusRate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Reload Bonus Rate ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Reload Bonus Rate für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.reloadBonusMaxAmount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Reload Bonus Max. Betrag ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Reload Bonus Max. Betrag für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.reloadBonusValidity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Reload Bonus Gültigkeit ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Reload Bonus Gültigkeit für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.reloadBonusRequirements`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Reload Bonus Bedingungen ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Textarea placeholder={`Reload Bonus Bedingungen für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.reloadBonusDisclaimer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Reload Bonus Disclaimer ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Textarea placeholder={`Reload Bonus Disclaimer für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   {/* Added language-dependent fields */}
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.playerProtection`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Spielerschutz ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Textarea placeholder={`Informationen zum Spielerschutz auf ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.customerService`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Kundenservice ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Textarea placeholder={`Informationen zum Kundenservice auf ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   {/* Live Casino Cashback fields */}
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.liveCasinoCashback`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Live Casino Cashback Titel ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Live Casino Cashback Titel für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.liveCasinoCashbackRate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Live Casino Cashback Rate ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Live Casino Cashback Rate für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.liveCasinoCashbackMaxAmount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Live Casino Cashback Max. Betrag ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Live Casino Cashback Max. Betrag für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.liveCasinoCashbackValidity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Live Casino Cashback Gültigkeit ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Live Casino Cashback Gültigkeit für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.liveCasinoCashbackRequirements`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Live Casino Cashback Bedingungen ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Textarea placeholder={`Live Casino Cashback Bedingungen für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.liveCasinoCashbackDisclaimer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Live Casino Cashback Disclaimer ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Textarea placeholder={`Live Casino Cashback Disclaimer für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   {/* Weekly Cashback fields */}
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.weeklyCashback`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Wöchentlicher Cashback Titel ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Wöchentlicher Cashback Titel für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.weeklyCashbackRate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Wöchentlicher Cashback Rate ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Wöchentlicher Cashback Rate für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.weeklyCashbackMaxAmount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Wöchentlicher Cashback Max. Betrag ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Wöchentlicher Cashback Max. Betrag für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.weeklyCashbackValidity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Wöchentlicher Cashback Gültigkeit ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Wöchentlicher Cashback Gültigkeit für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.weeklyCashbackRequirements`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Wöchentlicher Cashback Bedingungen ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Textarea placeholder={`Wöchentlicher Cashback Bedingungen für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.weeklyCashbackDisclaimer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Wöchentlicher Cashback Disclaimer ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Textarea placeholder={`Wöchentlicher Cashback Disclaimer für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   {/* Reload Bonus fields */}
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.reloadBonus`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Reload Bonus Titel ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Reload Bonus Titel für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.reloadBonusRate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Reload Bonus Rate ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Reload Bonus Rate für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.reloadBonusMaxAmount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Reload Bonus Max. Betrag ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Reload Bonus Max. Betrag für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.reloadBonusValidity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Reload Bonus Gültigkeit ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Input placeholder={`Reload Bonus Gültigkeit für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.reloadBonusRequirements`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Reload Bonus Bedingungen ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Textarea placeholder={`Reload Bonus Bedingungen für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.reloadBonusDisclaimer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Reload Bonus Disclaimer ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Textarea placeholder={`Reload Bonus Disclaimer für ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   {/* Added language-dependent fields */}
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.playerProtection`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Spielerschutz ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Textarea placeholder={`Informationen zum Spielerschutz auf ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`translations.${lang.code}.customerService`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Kundenservice ({lang.code.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Textarea placeholder={`Informationen zum Kundenservice auf ${lang.name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Screenshots field */}
                  <div className="space-y-2">
                    <FormLabel className="font-medium">Screenshots ({lang.code.toUpperCase()})</FormLabel>
                    <div className="flex flex-wrap gap-4">
                      {(screenshotPreviews[lang.code] || []).map((preview, index) => (
                        <div key={index} className="relative w-32 h-32">
                          <img src={preview} alt={`Screenshot preview ${index + 1}`} className="w-full h-full object-cover rounded-md border border-gray-200" />
                          <Button type="button" variant="outline" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white" onClick={() => handleRemoveScreenshot(lang.code, index)}><X className="h-4 w-4" /></Button>
                        </div>
                      ))}
                      <div className="flex flex-col items-center justify-center w-32 h-32 rounded-md border border-dashed border-gray-300 text-center">
                        <Image className="h-8 w-8 text-gray-400 mb-1" />
                        <p className="text-xs text-gray-500">Klicken zum Hochladen</p>
                        <Input type="file" accept="image/*" multiple onChange={(e) => handleScreenshotChange(e, lang.code)} className="hidden" id={`screenshot-upload-${lang.code}`} />
                        <Button type="button" variant="outline" size="sm" asChild className="mt-2">
                          <label htmlFor={`screenshot-upload-${lang.code}`} className="cursor-pointer flex items-center justify-center"><Upload className="h-3 w-3 mr-1" />Hochladen</label>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Submit und Cancel Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>Abbrechen</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Speichern..." : "Speichern"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
