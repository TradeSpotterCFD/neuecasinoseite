import { z } from "zod";
import { Casino } from "@/types";

// Define the languages for multilingual fields
export const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "pt-BR", name: "Português (Brasil)", flag: "🇧🇷" },
  { code: "pt-PT", name: "Português (Portugal)", flag: "🇵🇹" },
];

// Define the list of game providers (Kopiert aus CasinoForm.tsx)
export const gameProvidersList = [
  "888 Holdings", "Ainsworth Game Technology", "Amatic Industries", "Amaya Gaming",
  "Amusnet (ehemals EGT)", "Aristocrat Leisure Limited", "Ash Gaming", "Bally Technologies",
  "Bally Wulff", "Barcrest", "Betsoft", "Big Time Gaming", "Blueprint Gaming",
  "Cryptologic", "EGT Interactive", "Elk Studios", "Endorphina", "Evolution Gaming",
  "Evoplay Entertainment", "GameArt", "Gamesys", "Habanero", "High 5 Games",
  "IGT (International Game Technology)", "iSoftBet", "Konami Gaming", "Leander Games",
  "Lightning Box Games", "Merkur Gaming", "Microgaming", "NetEnt", "NextGen Gaming",
  "Novomatic", "Play'n GO", "Playson", "Playtech", "Pragmatic Play", "Push Gaming",
  "Quickspin", "Red Tiger Gaming", "Reel Time Gaming", "Relax Gaming", "Rival Gaming",
  "Scientific Games", "Spinomenal", "StakeLogic", "Thunderkick", "Wazdan",
  "WGS Technology", "WMS Gaming", "Yggdrasil Gaming",
].sort();

// Define the list of RTP testing labs (Kopiert aus CasinoForm.tsx)
export const rtpLabsList = [
  "eCOGRA", "iTech Labs", "GLI", "QUINEL", "SIQ", "BMM Testlabs", "Trisigma",
  "NMi Gaming", "SKL", "TST", "Deloitte", "PricewaterhouseCoopers (PwC)",
].sort();

// Define the list of licensing authorities (Kopiert aus CasinoForm.tsx)
export const licensingAuthoritiesList = [
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

// Type for multilingual fields
export type MultilangField = Record<string, string>;

// New type for game types/features available in the casino
export type GameTypesField = Record<string, string[]>;

// Main form data schema
export const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  logo: z.any().optional(),
  rating: z.coerce.number().min(0).max(10).optional(),
  minDeposit: z.coerce.number().min(0).optional(),
  // Added missing fields
  company: z.string().optional(),
  headquarters: z.string().optional(),
  licenseInfo: z.array(z.string()).optional(),
  yearEstablished: z.coerce.number().optional(),
  withdrawalRate: z.string().optional(),
  gameProviders: z.array(z.string()).optional(),
  gameCount: z.string().optional(),
  rtpTest: z.array(z.string()).optional(),
  // Multilingual fields
  descriptions: z.record(z.string().optional()),
  bonuses: z.record(z.string().optional()),
  reviewTexts: z.record(z.string().optional()),
  introTexts: z.record(z.string().optional()),
  additionalIntroTexts: z.record(z.string().optional()),
  // New games section text field
  gamesSectionTexts: z.record(z.string().optional()),
  // New bonus text fields
  bonusIntroTexts: z.record(z.string().optional()),
  bonusConclusionTexts: z.record(z.string().optional()),
  // Multilingual reload bonus fields
  reloadBonuses: z.record(z.string().optional()),
  reloadBonusRates: z.record(z.string().optional()),
  reloadBonusMaxAmounts: z.record(z.string().optional()),
  reloadBonusValidities: z.record(z.string().optional()),
  reloadBonusRequirements: z.record(z.string().optional()),
  reloadBonusDisclaimers: z.record(z.string().optional()),
  // Add new field for game types
  gameTypes: z.record(z.array(z.string()).optional()),
  // New fields for slot machines, jackpot slots, table games and payout rates
  slotMachineTexts1: z.record(z.string().optional()),
  slotMachineTexts2: z.record(z.string().optional()),
  jackpotSlotsTexts: z.record(z.string().optional()),
  tableGamesTexts: z.record(z.string().optional()),
  payoutRatesTexts1: z.record(z.string().optional()),
  payoutRatesTexts2: z.record(z.string().optional()),
});

export interface CasinoReviewFormProps {
  initialData?: Partial<Casino>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}
