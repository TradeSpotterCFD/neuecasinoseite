import React, { useState } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, FileUp, X, AlertCircle } from "lucide-react"; // Removed unused icons
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox"; // Keep Checkbox for now if needed elsewhere
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Keep Tooltip for now if needed elsewhere
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { GAME_CATEGORIES } from "@/components/GameCategoriesModal"; // Keep for MultilingualGameTypesCheckboxes
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Keep for MultiSelectPopover
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"; // Keep for MultiSelectPopover
import { cn } from "@/lib/utils"; // Keep for MultiSelectPopover
import {
  LANGUAGES,
  gameProvidersList,
  rtpLabsList,
  licensingAuthoritiesList,
  MultilangField,
  GameTypesField,
  formSchema,
  CasinoReviewFormProps,
} from "./casino-review-form/constants-and-types";
import { MultiSelectPopover } from "./casino-review-form/MultiSelectPopover";
import { MultilingualTextareaField } from "./casino-review-form/MultilingualTextareaField"; // Import new component
import { MultilingualGameTypesCheckboxes } from "./casino-review-form/MultilingualGameTypesCheckboxes"; // Import new component

export function CasinoReviewForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: CasinoReviewFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(
    initialData?.logo || null
  );
  const [activeTab, setActiveTab] = useState("general");

  // State for multi-select popovers (Kopiert aus CasinoForm.tsx)
  const [gameProvidersPopoverOpen, setGameProvidersPopoverOpen] = useState(false);
  const [gameProvidersSearch, setGameProvidersSearch] = useState("");
  const [rtpPopoverOpen, setRtpPopoverOpen] = useState(false);
  const [rtpSearch, setRtpSearch] = useState("");
  const [licensePopoverOpen, setLicensePopoverOpen] = useState(false);
  const [licenseSearch, setLicenseSearch] = useState("");


  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("logo", file as any); // Cast to any for now, will refine type later if needed
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    form.setValue("logo", undefined); // Use undefined for optional fields
  };

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  // Filter lists based on search query (Kopiert aus CasinoForm.tsx)
  const filteredGameProviders = gameProvidersList.filter(provider =>
    provider.toLowerCase().includes(gameProvidersSearch.toLowerCase())
  );
  const filteredRtpLabs = rtpLabsList.filter(lab =>
    lab.toLowerCase().includes(rtpSearch.toLowerCase())
  );
  const filteredLicensingAuthorities = licensingAuthoritiesList.filter(authority =>
    authority.toLowerCase().includes(licenseSearch.toLowerCase())
  );


  return (
    <FormProvider {...form}> {/* Wrap with FormProvider */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Casino Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter casino name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Logo</FormLabel>
                <div className="flex flex-col gap-4">
                  {logoPreview ? (
                    <div className="relative w-64 h-32 mx-auto">
                      <img
                        src={logoPreview}
                        alt="Casino logo preview"
                        className="max-h-32 max-w-full rounded-md border border-gray-200 mx-auto"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white"
                        onClick={handleRemoveLogo}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-gray-300 p-8 text-center">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload</p>
                      <p className="text-xs text-gray-400 mt-1">(max. 1MB)</p>
                    </div>
                  )}
                  <div className="flex justify-center">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                      id="logo-upload"
                    />
                    <Button type="button" variant="outline" asChild>
                      <label htmlFor="logo-upload" className="cursor-pointer flex items-center justify-center w-32">
                        <FileUp className="h-4 w-4 mr-2" />Upload
                      </label>
                    </Button>
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Overall Rating (0-10)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="10" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minDeposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min. Deposit ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Added missing fields */}
              <FormField control={form.control} name="company" render={({ field }) => (<FormItem><FormLabel>Unternehmen</FormLabel><FormControl><Input placeholder="Name des Unternehmens" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="headquarters" render={({ field }) => (<FormItem><FormLabel>Hauptsitz</FormLabel><FormControl><Input placeholder="Ort des Hauptsitzes" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="yearEstablished" render={({ field }) => (<FormItem><FormLabel>Online seit</FormLabel><FormControl><Input type="number" placeholder="Gründungsjahr" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="withdrawalRate" render={({ field }) => (<FormItem><FormLabel>Auszahlungsrate (%)</FormLabel><FormControl><Input placeholder="z.B. 96.5%" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="gameCount" render={({ field }) => (<FormItem><FormLabel>Anzahl Spiele</FormLabel><FormControl><Input placeholder="z.B. 1000+" {...field} /></FormControl><FormMessage /></FormItem>)} />

              {/* Multi-Select fields */}
              <FormField
                control={form.control}
                name="licenseInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Glücksspiellizenz(en)</FormLabel>
                    <MultiSelectPopover
                      formField={field}
                      isPopoverOpen={licensePopoverOpen}
                      setPopoverOpenState={setLicensePopoverOpen}
                      searchValue={licenseSearch}
                      setSearchValue={setLicenseSearch}
                      allItemsList={licensingAuthoritiesList}
                      filteredItemsList={filteredLicensingAuthorities}
                      buttonTextSingular="Lizenz"
                      buttonTextPlural="Lizenzen"
                      placeholder="Lizenz(en) auswählen"
                      searchPlaceholder="Lizenz suchen..."
                      form={form}
                    />
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
                     <MultiSelectPopover
                      formField={field}
                      isPopoverOpen={gameProvidersPopoverOpen}
                      setPopoverOpenState={setGameProvidersPopoverOpen}
                      searchValue={gameProvidersSearch}
                      setSearchValue={setGameProvidersSearch} // Corrected prop
                      allItemsList={gameProvidersList}
                      filteredItemsList={filteredGameProviders}
                      buttonTextSingular="Anbieter"
                      buttonTextPlural="Anbieter"
                      placeholder="Spieleanbieter auswählen"
                      searchPlaceholder="Anbieter suchen..."
                      form={form}
                    />
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
                     <MultiSelectPopover
                      formField={field}
                      isPopoverOpen={rtpPopoverOpen}
                      setPopoverOpenState={setRtpPopoverOpen}
                      searchValue={rtpSearch}
                      setSearchValue={setRtpSearch} // Corrected prop
                      allItemsList={rtpLabsList}
                      filteredItemsList={filteredRtpLabs}
                      buttonTextSingular="Labor"
                      buttonTextPlural="Labore"
                      placeholder="RTP Testlabor(e) auswählen"
                      searchPlaceholder="Labor suchen..."
                      form={form}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
          </div>

          {/* Multilingual Fields Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Multilingual Fields</h2>
            <Tabs defaultValue="en">
              <ScrollArea className="max-w-full pb-2">
                <TabsList className="mb-4 flex flex-nowrap justify-start">
                  {LANGUAGES.map((lang) => (
                    <TabsTrigger key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>

              {LANGUAGES.map((lang) => (
                <TabsContent key={lang.code} value={lang.code} className="space-y-6">
                  {/* Description Field */}
                  <MultilingualTextareaField
                    langCode={lang.code}
                    fieldName="descriptions"
                    label={`Description (${lang.name})`}
                    placeholder={`Enter detailed description of the casino in ${lang.name}`}
                  />

                  {/* Bonus Field */}
                  <Alert variant="default" className="bg-blue-50 border border-blue-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Bonus fields are multilingual. Please provide translations for each language.
                    </AlertDescription>
                  </Alert>
                  <MultilingualTextareaField
                    langCode={lang.code}
                    fieldName="bonuses"
                    label={`Bonus (${lang.name})`}
                    placeholder={`Enter bonus information in ${lang.name}`}
                    cardClassName="border-2 p-4 rounded-lg bg-blue-50 border-blue-200 shadow-sm"
                  />

                  {/* Reload Bonus Fields */}
                  <MultilingualTextareaField
                    langCode={lang.code}
                    fieldName="reloadBonuses"
                    label={`Reload Bonus (${lang.name})`}
                    placeholder={`Enter reload bonus information in ${lang.name}`}
                    cardClassName="border-2 p-4 rounded-lg bg-blue-50 border-blue-200 shadow-sm mb-6"
                  />
                  {/* Add other reload bonus fields here */}
                   <MultilingualTextareaField
                    langCode={lang.code}
                    fieldName="reloadBonusRates"
                    label={`Reload Bonus Rate (${lang.name})`}
                    placeholder={`Enter reload bonus rate in ${lang.name}`}
                  />
                   <MultilingualTextareaField
                    langCode={lang.code}
                    fieldName="reloadBonusMaxAmounts"
                    label={`Reload Bonus Max Amount (${lang.name})`}
                    placeholder={`Enter reload bonus max amount in ${lang.name}`}
                  />
                   <MultilingualTextareaField
                    langCode={lang.code}
                    fieldName="reloadBonusValidities"
                    label={`Reload Bonus Validity (${lang.name})`}
                    placeholder={`Enter reload bonus validity in ${lang.name}`}
                  />
                   <MultilingualTextareaField
                    langCode={lang.code}
                    fieldName="reloadBonusRequirements"
                    label={`Reload Bonus Requirements (${lang.name})`}
                    placeholder={`Enter reload bonus requirements in ${lang.name}`}
                  />
                   <MultilingualTextareaField
                    langCode={lang.code}
                    fieldName="reloadBonusDisclaimers"
                    label={`Reload Bonus Disclaimer (${lang.name})`}
                    placeholder={`Enter reload bonus disclaimer in ${lang.name}`}
                  />


                  {/* Review Text Field */}
                  <Alert variant="default" className="bg-green-50 border border-green-200 mt-8">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Review text fields are multilingual. Please provide translations for each language.
                    </AlertDescription>
                  </Alert>
                  <Card className="border-2 p-4 rounded-lg bg-green-50 border-green-200 shadow-sm mb-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">Review Text ({lang.name})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MultilingualTextareaField
                        langCode={lang.code}
                        fieldName="reviewTexts"
                        label="Review Text"
                        placeholder={`Enter review text in ${lang.name}`}
                      />
                    </CardContent>
                  </Card>

                  {/* Intro Text Fields */}
                   <Card className="border-2 p-4 rounded-lg bg-green-50 border-green-200 shadow-sm mb-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">Intro Text ({lang.name})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MultilingualTextareaField
                        langCode={lang.code}
                        fieldName="introTexts"
                        label="Intro Text"
                        placeholder={`Enter intro text in ${lang.name}`}
                      />
                    </CardContent>
                  </Card>

                   <Card className="border-2 p-4 rounded-lg bg-green-50 border-green-200 shadow-sm mb-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">Additional Intro Text ({lang.name})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MultilingualTextareaField
                        langCode={lang.code}
                        fieldName="additionalIntroTexts"
                        label="Additional Intro Text"
                        placeholder={`Enter additional intro text in ${lang.name}`}
                      />
                    </CardContent>
                  </Card>

                  {/* Games Section Text Field */}
                   <Card className="border-2 p-4 rounded-lg bg-green-50 border-green-200 shadow-sm mb-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">Games Section Text ({lang.name})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MultilingualTextareaField
                        langCode={lang.code}
                        fieldName="gamesSectionTexts"
                        label="Games Section Text"
                        placeholder={`Enter games section text in ${lang.name}`}
                      />
                    </CardContent>
                  </Card>

                  {/* Slot Machine Text Fields */}
                   <Card className="border-2 p-4 rounded-lg bg-green-50 border-green-200 shadow-sm mb-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">Slot Machine Text 1 ({lang.name})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MultilingualTextareaField
                        langCode={lang.code}
                        fieldName="slotMachineTexts1"
                        label="Slot Machine Text 1"
                        placeholder={`Enter slot machine text 1 in ${lang.name}`}
                      />
                    </CardContent>
                  </Card>

                   <Card className="border-2 p-4 rounded-lg bg-green-50 border-green-200 shadow-sm mb-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">Slot Machine Text 2 ({lang.name})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MultilingualTextareaField
                        langCode={lang.code}
                        fieldName="slotMachineTexts2"
                        label="Slot Machine Text 2"
                        placeholder={`Enter slot machine text 2 in ${lang.name}`}
                      />
                    </CardContent>
                  </Card>

                  {/* Jackpot Slots Text Field */}
                   <Card className="border-2 p-4 rounded-lg bg-green-50 border-green-200 shadow-sm mb-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">Jackpot Slots Text ({lang.name})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MultilingualTextareaField
                        langCode={lang.code}
                        fieldName="jackpotSlotsTexts"
                        label="Jackpot Slots Text"
                        placeholder={`Enter jackpot slots text in ${lang.name}`}
                      />
                    </CardContent>
                  </Card>

                  {/* Table Games Text Field */}
                   <Card className="border-2 p-4 rounded-lg bg-green-50 border-green-200 shadow-sm mb-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">Table Games Text ({lang.name})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MultilingualTextareaField
                        langCode={lang.code}
                        fieldName="tableGamesTexts"
                        label="Table Games Text"
                        placeholder={`Enter table games text in ${lang.name}`}
                      />
                    </CardContent>
                  </Card>

                  {/* Payout Rates Text Fields */}
                   <Card className="border-2 p-4 rounded-lg bg-green-50 border-green-200 shadow-sm mb-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">Payout Rates Text 1 ({lang.name})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MultilingualTextareaField
                        langCode={lang.code}
                        fieldName="payoutRatesTexts1"
                        label="Payout Rates Text 1"
                        placeholder={`Enter payout rates text 1 in ${lang.name}`}
                      />
                    </CardContent>
                  </Card>

                   <Card className="border-2 p-4 rounded-lg bg-green-50 border-green-200 shadow-sm mb-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">Payout Rates Text 2 ({lang.name})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MultilingualTextareaField
                        langCode={lang.code}
                        fieldName="payoutRatesTexts2"
                        label="Payout Rates Text 2"
                        placeholder={`Enter payout rates text 2 in ${lang.name}`}
                      />
                    </CardContent>
                  </Card>

                  {/* Game Types Checkboxes */}
                  <MultilingualGameTypesCheckboxes
                    langCode={lang.code}
                    langName={lang.name}
                  />

                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Casino"}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider> {/* End FormProvider */}
  );
}
