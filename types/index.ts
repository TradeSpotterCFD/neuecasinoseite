
export interface Casino {
  id: string;
  name: string;
  logo?: string; // Logo URL
  rating?: number;
  minDeposit?: number;
  yearEstablished?: number;
  licenseInfo?: string[]; // Array of strings
  withdrawalRate?: string;
  company?: string;
  headquarters?: string;
  gameProviders?: string[]; // Array of strings
  gameCount?: string;
  rtpTest?: string[]; // Array of strings
  gameCategories?: string[]; // Array of strings
  featureCategories?: string[]; // Array of strings
  isVerified?: boolean;
  isFeatured?: boolean;

  // Multilingual fields (mapped from casino_translations)
  urls?: Record<string, string>;
  metaTitles?: Record<string, string>;
  metaDescriptions?: Record<string, string>;
  descriptions?: Record<string, string>;
  bonuses?: Record<string, string>; // Corresponds to general_bonus
  bonusRates?: Record<string, string>;
  bonusAmounts?: Record<string, string>;
  bonusValidities?: Record<string, string>;
  bonusRequirements?: Record<string, string>; // Corresponds to bonus_conditions
  additionalBonuses?: Record<string, string>; // Corresponds to more_bonuses
  bonusDisclaimers?: Record<string, string>;
  reviewTexts?: Record<string, string>;
  liveCasinoCashbacks?: Record<string, string>; // Corresponds to live_cashback
  liveCasinoCashbackRates?: Record<string, string>;
  liveCasinoCashbackMaxAmounts?: Record<string, string>;
  liveCasinoCashbackValidities?: Record<string, string>;
  liveCasinoCashbackRequirements?: Record<string, string>; // Corresponds to live_cashback_conditions
  liveCasinoCashbackDisclaimers?: Record<string, string>;
  weeklyCashbacks?: Record<string, string>; // Corresponds to weekly_cashback
  weeklyCashbackRates?: Record<string, string>;
  weeklyCashbackMaxAmounts?: Record<string, string>;
  weeklyCashbackValidities?: Record<string, string>;
  weeklyCashbackRequirements?: Record<string, string>; // Corresponds to weekly_cashback_conditions
  weeklyCashbackDisclaimers?: Record<string, string>;
  reloadBonuses?: Record<string, string>; // Corresponds to reload_bonus
  reloadBonusRates?: Record<string, string>;
  reloadBonusMaxAmounts?: Record<string, string>;
  reloadBonusValidities?: Record<string, string>;
  reloadBonusRequirements?: Record<string, string>; // Corresponds to reload_bonus_requirements
  reloadBonusDisclaimers?: Record<string, string>;
  playerProtections?: Record<string, string>; // Corresponds to player_protection
  customerServices?: Record<string, string>; // Corresponds to customer_service
  screenshots?: Record<string, string[]>; // Screenshots per language

  // Additional multilingual text fields (if used in CasinoReviewForm)
  introTexts?: Record<string, string>;
  additionalIntroTexts?: Record<string, string>;
  gamesSectionTexts?: Record<string, string>;
  bonusIntroTexts?: Record<string, string>;
  bonusConclusionTexts?: Record<string, string>;
  slotMachineTexts1?: Record<string, string>;
  slotMachineTexts2?: Record<string, string>;
  jackpotSlotsTexts?: Record<string, string>;
  tableGamesTexts?: Record<string, string>;
  payoutRatesTexts1?: Record<string, string>;
  payoutRatesTexts2?: Record<string, string>;

  // Game types for each language (if stored this way)
  gameTypes?: Record<string, string[]>;

  // Raw translations array from DB fetch (optional, for internal use)
  casino_translations?: any[];

  // Database fields (snake_case) - keep if still referenced directly
  logo_url?: string;
  created_at?: string;
}

export interface CasinoCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Country {
  id: string;
  name: string;
  flag: string;
  count: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

export interface CasinoBrand {
  id: string;
  name: string;
  source?: string;
}
