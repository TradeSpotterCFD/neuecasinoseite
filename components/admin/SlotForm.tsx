import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import { LANGUAGES } from "@/components/CasinoReviewForm"; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

// Provider list
const slotProviders = [
  "NetEnt", "Microgaming", "Play’n GO", "Pragmatic Play", "Yggdrasil Gaming", 
  "Quickspin", "Betsoft", "Novomatic", "IGT", "Red Tiger Gaming", "ELK Studios", 
  "Thunderkick", "Blueprint Gaming", "Push Gaming", "Relax Gaming", "Habanero", 
  "Playson", "Wazdan", "Spinomenal", "Playtech", "Amatic Industries", "Endorphina", 
  "Tom Horn Gaming", "Hacksaw Gaming", "NoLimit City", "Big Time Gaming", 
  "iSoftBet", "Bally Technologies", "Aristocrat", "Evoplay"
];

// Volatility levels
const volatilities = ["low", "medium", "high"]; 

// Zod Schema for translatable fields (NEW: Meta Title, Meta Desc, Short Desc)
const slotTranslationSchema = z.object({
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  shortDescription: z.string().max(300, { message: "Maximum 300 characters" }).optional(),
});

// Zod Schema for the main form
const slotFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  slug: z.string().min(1, { message: "Slug is required" }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Slug must contain only lowercase letters, numbers, and hyphens" }),
  // Non-translatable content fields moved back here
  fullDescription: z.string().min(300, { message: "Minimum 300 characters" }).max(3000, { message: "Maximum 3000 characters (approx. 500 words)" }).optional(),
  features: z.string().optional(), 
  theme: z.string().optional(), 
  // Other fields
  providers: z.array(z.string()).min(1, { message: "At least one provider is required" }),
  rtp: z.coerce.number().min(0).max(100, { message: "RTP must be between 0 and 100" }).optional(),
  volatility: z.enum(["low", "medium", "high"]).optional(), 
  maxPayout: z.coerce.number().min(0).optional(),
  reels: z.coerce.number().int().min(1).optional(),
  rows: z.coerce.number().int().min(1).optional(),
  paylines: z.string().optional(), 
  releaseYear: z.coerce.number().int().min(1990).max(new Date().getFullYear() + 1).optional(),
  screenshotUrl: z.string().url({ message: "Invalid URL" }).or(z.string().length(0)).optional(),
  demoLink: z.string().url({ message: "Invalid URL" }).or(z.string().length(0)).optional(),
  // Boolean/Number fields
  hasMobileVersion: z.boolean().default(false),
  hasAutoplay: z.boolean().default(false),
  has3dGraphics: z.boolean().default(false),
  isPartOfSeries: z.boolean().default(false),
  seriesName: z.string().optional(), 
  winBothWays: z.boolean().default(false),
  minBet: z.coerce.number().min(0).optional(),
  maxBet: z.coerce.number().min(0).optional(),
  minBetLine: z.coerce.number().min(0).optional(),
  maxBetLine: z.coerce.number().min(0).optional(),
  // Translations object
  translations: z.record(slotTranslationSchema), 
});

// Type based on the schema
type SlotFormValues = z.infer<typeof slotFormSchema>;

interface SlotFormProps {
  onSubmit: (data: SlotFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  initialData?: Partial<SlotFormValues>;
}

export function SlotForm({ onSubmit, onCancel, isSubmitting = false, initialData }: SlotFormProps) {
  const englishLang = LANGUAGES.find(l => l.code === 'en');
  const defaultLanguage = englishLang ? englishLang.code : LANGUAGES[0].code; 
  const [activeLanguage, setActiveLanguage] = useState(defaultLanguage);

  // Initialize translations for all languages
  const initialTranslations: Record<string, z.infer<typeof slotTranslationSchema>> = {};
  LANGUAGES.forEach((lang) => {
    initialTranslations[lang.code] = {
      metaTitle: initialData?.translations?.[lang.code]?.metaTitle || "", // Added
      metaDescription: initialData?.translations?.[lang.code]?.metaDescription || "", // Added
      shortDescription: initialData?.translations?.[lang.code]?.shortDescription || "",
    };
  });
  
  const form = useForm<SlotFormValues>({
    resolver: zodResolver(slotFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      // Non-translatable content fields
      fullDescription: initialData?.fullDescription || "", // Moved back
      features: initialData?.features || "", // Moved back
      theme: initialData?.theme || "", // Moved back
      // Other fields
      providers: initialData?.providers || [],
      rtp: initialData?.rtp,
      volatility: initialData?.volatility,
      maxPayout: initialData?.maxPayout,
      reels: initialData?.reels,
      rows: initialData?.rows,
      paylines: initialData?.paylines || "",
      releaseYear: initialData?.releaseYear,
      screenshotUrl: initialData?.screenshotUrl || "",
      demoLink: initialData?.demoLink || "",
      // Boolean/Number fields Defaults
      hasMobileVersion: initialData?.hasMobileVersion || false,
      hasAutoplay: initialData?.hasAutoplay || false,
      has3dGraphics: initialData?.has3dGraphics || false,
      isPartOfSeries: initialData?.isPartOfSeries || false,
      seriesName: initialData?.seriesName || "",
      winBothWays: initialData?.winBothWays || false,
      minBet: initialData?.minBet,
      maxBet: initialData?.maxBet,
      minBetLine: initialData?.minBetLine,
      maxBetLine: initialData?.maxBetLine,
      // Translations
      translations: initialTranslations,
    },
  });

  const isPartOfSeries = form.watch("isPartOfSeries"); 

  const handleFormSubmit = (values: SlotFormValues) => {
     if (!values.isPartOfSeries) {
       values.seriesName = ""; 
     }
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8"> 
        
        {/* Basic Information */}
        <h3 className="text-lg font-medium border-b pb-2">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slot Name*</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Book of Dead" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug*</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. book-of-dead" {...field} />
                </FormControl>
                <FormDescription>URL-friendly name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Translatable Content */}
         <h3 className="text-lg font-medium border-b pb-2">Translatable Content</h3>
         <Tabs value={activeLanguage} onValueChange={setActiveLanguage} className="w-full">
           <ScrollArea className="max-w-full pb-2">
             <TabsList className="mb-4 flex flex-nowrap justify-start">
               {LANGUAGES.map((lang) => (
                 <TabsTrigger key={lang.code} value={lang.code} className="px-4">
                   <span className="mr-2">{lang.flag}</span> {lang.name}
                 </TabsTrigger>
               ))}
             </TabsList>
           </ScrollArea>
           {LANGUAGES.map((lang) => (
             <TabsContent key={lang.code} value={lang.code} className="space-y-6 mt-0"> 
                <FormField
                 control={form.control}
                 name={`translations.${lang.code}.metaTitle`}
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Meta Title ({lang.name})</FormLabel>
                     <FormControl>
                       <Input placeholder="Meta Title for SEO..." {...field} />
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
                     <FormLabel>Meta Description ({lang.name})</FormLabel>
                     <FormControl>
                       <Textarea placeholder="Meta Description for SEO..." {...field} className="min-h-[80px]" />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
               <FormField
                 control={form.control}
                 name={`translations.${lang.code}.shortDescription`}
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Short Description ({lang.name})</FormLabel>
                     <FormControl>
                       <Textarea placeholder="Max. 300 characters..." {...field} className="min-h-[80px]" />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
             </TabsContent>
           ))}
         </Tabs>

        {/* Non-Translatable Content */}
        <h3 className="text-lg font-medium border-b pb-2">General Content</h3>
         <FormField
          control={form.control}
          name="fullDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Description (SEO)</FormLabel>
              <FormControl>
                <Textarea placeholder="300-500 words..." {...field} className="min-h-[150px]" />
              </FormControl>
              <FormDescription>Supports Markdown for **bold** and [links](url).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features (Comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Free Spins, Scatter, Wild" {...field} />
                  </FormControl>
                  <FormDescription>Main features.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme (Comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Egypt, Fruits" {...field} />
                  </FormControl>
                  <FormDescription>Main themes.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
         </div>


        {/* Providers */}
        <h3 className="text-lg font-medium border-b pb-2">Providers</h3>
        <FormField
          control={form.control}
          name="providers"
          render={() => ( 
            <FormItem>
              <FormLabel>Select Providers*</FormLabel>
              <ScrollArea className="h-40 w-full rounded-md border p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3"> 
                  {slotProviders.map((provider) => (
                    <FormField
                      key={provider}
                      control={form.control}
                      name="providers"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={provider}
                            className="flex flex-row items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(provider)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, provider])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== provider
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal cursor-pointer"> 
                              {provider}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
              </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Technical Details */}
        <h3 className="text-lg font-medium border-b pb-2">Technical Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6"> 
          <FormField
            control={form.control}
            name="rtp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RTP (%)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="e.g. 96.21" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="volatility"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Volatility</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {volatilities.map(vol => (
                      <SelectItem key={vol} value={vol} className="capitalize">{vol}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxPayout"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Payout (x Bet)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g. 5000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="releaseYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Release Year</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g. 2016" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Layout */}
        <h3 className="text-lg font-medium border-b pb-2">Layout</h3>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6"> 
           <FormField
            control={form.control}
            name="reels"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reels</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g. 5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rows"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rows</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g. 3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paylines"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paylines</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 10 or 243 ways" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Betting Options */}
        <h3 className="text-lg font-medium border-b pb-2">Betting Options</h3>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6"> 
           <FormField
            control={form.control}
            name="minBet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Bet (€)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="e.g. 0.10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxBet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Bet (€)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="e.g. 250" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="minBetLine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Bet / Line (€)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="e.g. 0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxBetLine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Bet / Line (€)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="e.g. 25" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Additional Options (Checkboxes) */}
        <h3 className="text-lg font-medium border-b pb-2">Additional Options</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="hasMobileVersion"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">Mobile Version Available</FormLabel>
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="hasAutoplay"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">Autoplay Option</FormLabel>
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="has3dGraphics"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">3D Graphics</FormLabel>
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="winBothWays"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">Win Both Ways</FormLabel>
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="isPartOfSeries"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">Part Of A Series</FormLabel>
              </FormItem>
            )}
          />
          {/* Conditional Series Name Input */}
          {isPartOfSeries && (
             <FormField
              control={form.control}
              name="seriesName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Series Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Big Bass Bonanza" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>


        {/* Optional Links */}
        <h3 className="text-lg font-medium border-b pb-2">Optional Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
          <FormField
            control={form.control}
            name="screenshotUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Screenshot URL</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="demoLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demo Link</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 pt-4"> 
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Slot"}
          </Button>
        </div>
      </form>
    </Form>
  );
}