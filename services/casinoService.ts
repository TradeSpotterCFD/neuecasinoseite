import { supabase } from "@/integrations/supabase/client"; // Import supabase client
import { Casino, CasinoCategory, Country, PaymentMethod } from "@/types";

// Mock database
const categories: CasinoCategory[] = [
  { id: "slots", name: "Slots", icon: "SlotsIcon", count: 42 },
  { id: "table-games", name: "Table Games", icon: "TableIcon", count: 36 },
  { id: "live-dealer", name: "Live Dealer", icon: "LiveDealerIcon", count: 28 },
  { id: "poker", name: "Poker", icon: "PokerIcon", count: 23 },
  { id: "sports-betting", name: "Sports Betting", icon: "SportsBettingIcon", count: 18 },
  { id: "jackpot", name: "Jackpot Games", icon: "JackpotIcon", count: 15 },
  { id: "crypto", name: "Crypto Casinos", icon: "CryptoIcon", count: 12 },
  { id: "new", name: "New Casinos", icon: "NewIcon", count: 8 },
];

const countries: Country[] = [
  { id: "us", name: "United States", flag: "🇺🇸", count: 24 },
  { id: "ca", name: "Canada", flag: "🇨🇦", count: 36 },
  { id: "uk", name: "United Kingdom", flag: "🇬🇧", count: 48 },
  { id: "au", name: "Australia", flag: "🇦🇺", count: 32 },
  { id: "de", name: "Germany", flag: "🇩🇪", count: 28 },
  { id: "fr", name: "France", flag: "🇫🇷", count: 26 },
  { id: "it", name: "Italy", flag: "🇮🇹", count: 22 },
  { id: "es", name: "Spain", flag: "🇪🇸", count: 20 },
];

const paymentMethods: PaymentMethod[] = [
  { id: "visa", name: "Visa", icon: "VisaIcon" },
  { id: "mastercard", name: "MasterCard", icon: "MastercardIcon" },
  { id: "paypal", name: "PayPal", icon: "PaypalIcon" },
  { id: "skrill", name: "Skrill", icon: "SkrillIcon" },
  { id: "neteller", name: "Neteller", icon: "NetellerIcon" },
  { id: "bitcoin", name: "Bitcoin", icon: "BitcoinIcon" },
  { id: "ethereum", name: "Ethereum", icon: "EthereumIcon" },
  { id: "bank-transfer", name: "Bank Transfer", icon: "BankTransferIcon" },
];

const casinos: Casino[] = [
  {
    id: "royal-vegas",
    name: "Royal Vegas Casino",
    logo: "https://placehold.co/200x100/2563eb/FFF?text=Royal+Vegas",
    rating: 4.8,
    bonuses: { en: "100% up to $1,200 + 120 Free Spins" },
    descriptions: { en: "Royal Vegas offers an exceptional gaming experience with over 700 games, generous bonuses, and 24/7 support." },
    urls: { en: "https://example.com/royal-vegas" },
    minDeposit: 10,
    licenseInfo: ["Malta Gaming Authority"],
    yearEstablished: 2000,
    gameCategories: ["slots", "table-games", "live-dealer"],
    isFeatured: true,
    company: "Fortune Lounge Group",
    headquarters: "Malta",
    gameProviders: ["Microgaming", "NetEnt"],
    gameCount: "700+",
    rtpTest: ["eCOGRA"],
    playerProtections: { en: "Responsible Gaming tools available." },
    customerServices: { en: "24/7 Live Chat, Email, Phone" },
    bonusRequirements: { en: "Minimum deposit $10. Wagering requirements apply." },
    bonusValidities: { en: "Bonus valid for 7 days." },
    withdrawalRate: "Fast",
    additionalBonuses: { en: "Weekly promotions and loyalty rewards." },
    reviewTexts: { en: "A top-tier casino with a long history and excellent game selection." },
    reloadBonuses: { en: "Weekend Reload Bonus" },
    reloadBonusRates: { en: "50%" },
    reloadBonusMaxAmounts: { en: "$500" },
    reloadBonusValidities: { en: "Valid on weekends." },
    reloadBonusRequirements: { en: "Minimum deposit $20." },
    reloadBonusDisclaimers: { en: "Terms and conditions apply." },
    screenshots: { en: ["url1", "url2"] },
    introTexts: { en: "Welcome to Royal Vegas!" },
    additionalIntroTexts: { en: "Discover our amazing games." },
    gamesSectionTexts: { en: "Explore our game library." },
    bonusIntroTexts: { en: "Claim your welcome bonus!" },
    bonusConclusionTexts: { en: "Start playing now." },
    slotMachineTexts1: { en: "Huge selection of slots." },
    slotMachineTexts2: { en: "New slots added weekly." },
    jackpotSlotsTexts: { en: "Win big with our jackpot slots." },
    tableGamesTexts: { en: "Classic table games available." },
    payoutRatesTexts1: { en: "High payout rates." },
    payoutRatesTexts2: { en: "Regularly audited RTP." },
    gameTypes: { en: ["slots", "blackjack", "roulette"] },
  },
  {
    id: "spin-palace",
    name: "Spin Palace",
    logo: "https://placehold.co/200x100/6366f1/FFF?text=Spin+Palace",
    rating: 4.7,
    bonuses: { en: "$1,000 Welcome Package + 50 Free Spins" },
    descriptions: { en: "Spin Palace is known for its vast game selection, high payout rates, and excellent customer service." },
    urls: { en: "https://example.com/spin-palace" },
    minDeposit: 20,
    licenseInfo: ["Kahnawake Gaming Commission"],
    yearEstablished: 2001,
    gameCategories: ["slots", "jackpot", "live-dealer"],
    isFeatured: true,
    company: "Bayton Ltd.",
    headquarters: "Malta",
    gameProviders: ["Microgaming"],
    gameCount: "600+",
    rtpTest: ["eCOGRA"],
    playerProtections: { en: "Responsible Gaming options." },
    customerServices: { en: "24/7 Support" },
    bonusRequirements: { en: "Wagering requirements apply." },
    bonusValidities: { en: "Check terms." },
    withdrawalRate: "Fast",
    additionalBonuses: { en: "Loyalty rewards." },
    reviewTexts: { en: "A reliable casino with a great mobile experience." },
    reloadBonuses: { en: "Daily Deals" },
    reloadBonusRates: { en: "Varies" },
    reloadBonusMaxAmounts: { en: "Varies" },
    reloadBonusValidities: { en: "Daily" },
    reloadBonusRequirements: { en: "Check daily offer." },
    reloadBonusDisclaimers: { en: "Terms apply." },
    screenshots: { en: ["url3", "url4"] },
    introTexts: { en: "Welcome to Spin Palace!" },
    additionalIntroTexts: { en: "Play your favorite games." },
    gamesSectionTexts: { en: "Huge game library." },
    bonusIntroTexts: { en: "Get your welcome bonus!" },
    bonusConclusionTexts: { en: "Join the fun." },
    slotMachineTexts1: { en: "Classic and video slots." },
    slotMachineTexts2: { en: "Progressive jackpots." },
    jackpotSlotsTexts: { en: "Dream of winning big?" },
    tableGamesTexts: { en: "Variety of table games." },
    payoutRatesTexts1: { en: "High RTP games." },
    payoutRatesTexts2: { en: "Fair gaming certified." },
    gameTypes: { en: ["slots", "roulette", "poker"] },
  },
  {
    id: "jackpot-city",
    name: "Jackpot City",
    logo: "https://placehold.co/200x100/1ebea5/FFF?text=Jackpot+City",
    rating: 4.6,
    bonuses: { en: "Up to $1,600 Welcome Bonus" },
    descriptions: { en: "Jackpot City features a Vegas-style experience with more than 500 games and realistic graphics." },
    urls: { en: "https://example.com/jackpot-city" },
    paymentMethods: ["visa", "mastercard", "paypal", "skrill", "bitcoin", "bank-transfer"],
    minDeposit: 10,
    licenseInfo: ["Malta Gaming Authority"],
    yearEstablished: 1998,
    gameCategories: ["slots", "table-games", "jackpot"],
    isFeatured: false,
    company: "Bayton Ltd.",
    headquarters: "Malta",
    gameProviders: ["Microgaming"],
    gameCount: "500+",
    rtpTest: ["eCOGRA"],
    playerProtections: { en: "Player protection measures." },
    customerServices: { en: "24/7 Customer Support" },
    bonusRequirements: { en: "Terms and conditions apply." },
    bonusValidities: { en: "Check bonus terms." },
    withdrawalRate: "Fast",
    additionalBonuses: { en: "Promotions and loyalty program." },
    reviewTexts: { en: "A classic online casino with a great selection of jackpot games." },
    reloadBonuses: { en: "Match Bonuses" },
    reloadBonusRates: { en: "Varies" },
    reloadBonusMaxAmounts: { en: "Varies" },
    reloadBonusValidities: { en: "Promotional" },
    reloadBonusRequirements: { en: "Check promotions page." },
    reloadBonusDisclaimers: { en: "T&Cs apply." },
    screenshots: { en: ["url5", "url6"] },
    introTexts: { en: "Welcome to Jackpot City!" },
    additionalIntroTexts: { en: "Experience the thrill." },
    gamesSectionTexts: { en: "Play exciting games." },
    bonusIntroTexts: { en: "Claim your bonus!" },
    bonusConclusionTexts: { en: "Join today." },
    slotMachineTexts1: { en: "Popular slot titles." },
    slotMachineTexts2: { en: "New releases." },
    jackpotSlotsTexts: { en: "Hit the jackpot!" },
    tableGamesTexts: { en: "Variety of table games." },
    payoutRatesTexts1: { en: "Competitive payout rates." },
    payoutRatesTexts2: { en: "Audited for fairness." },
    gameTypes: { en: ["slots", "blackjack", "roulette"] },
  },
  {
    id: "betway",
    name: "Betway Casino",
    logo: "https://placehold.co/200x100/fbbf24/000?text=Betway",
    rating: 4.5,
    bonuses: { en: "100% match up to $1,000" },
    descriptions: { en: "Betway offers a premium gaming experience with a huge game library and sports betting options." },
    urls: { en: "https://example.com/betway" },
    paymentMethods: ["visa", "mastercard", "paypal", "neteller", "skrill"],
    minDeposit: 10,
    licenseInfo: ["UK Gambling Commission"],
    yearEstablished: 2006,
    gameCategories: ["slots", "sports-betting", "live-dealer"],
    isFeatured: true,
    company: "Betway Limited",
    headquarters: "Malta",
    gameProviders: ["Microgaming", "NetEnt", "Evolution Gaming"],
    gameCount: "400+",
    rtpTest: ["eCOGRA"],
    playerProtections: { en: "Responsible gambling tools." },
    customerServices: { en: "24/7 Live Chat" },
    bonusRequirements: { en: "Wagering requirements apply." },
    bonusValidities: { en: "Check terms." },
    withdrawalRate: "Standard",
    additionalBonuses: { en: "Regular promotions." },
    reviewTexts: { en: "A well-rounded platform for casino and sports betting." },
    reloadBonuses: { en: "Casino Promotions" },
    reloadBonusRates: { en: "Varies" },
    reloadBonusMaxAmounts: { en: "Varies" },
    reloadBonusValidities: { en: "Ongoing" },
    reloadBonusRequirements: { en: "Check promotions." },
    reloadBonusDisclaimers: { en: "Terms apply." },
    screenshots: { en: ["url7", "url8"] },
    introTexts: { en: "Welcome to Betway!" },
    additionalIntroTexts: { en: "Your gaming destination." },
    gamesSectionTexts: { en: "Explore our games." },
    bonusIntroTexts: { en: "Claim your welcome offer!" },
    bonusConclusionTexts: { en: "Bet and win." },
    slotMachineTexts1: { en: "Wide range of slots." },
    slotMachineTexts2: { en: "Popular titles." },
    jackpotSlotsTexts: { en: "Try your luck." },
    tableGamesTexts: { en: "Classic table games." },
    payoutRatesTexts1: { en: "Fair payout rates." },
    payoutRatesTexts2: { en: "Independently audited." },
    gameTypes: { en: ["slots", "sports-betting", "live-dealer"] },
  },
  {
    id: "888-casino",
    name: "888 Casino",
    logo: "https://placehold.co/200x100/ef4444/FFF?text=888+Casino",
    rating: 4.4,
    bonuses: { en: "$88 No Deposit Bonus + $100 Welcome Bonus" },
    descriptions: { en: "888 Casino is one of the oldest and most trusted online casinos with exclusive games you won't find elsewhere." },
    urls: { en: "https://example.com/888-casino" },
    paymentMethods: ["visa", "mastercard", "paypal", "bitcoin", "bank-transfer"],
    minDeposit: 20,
    licenseInfo: ["Gibraltar Gambling Commissioner"],
    yearEstablished: 1997,
    gameCategories: ["slots", "table-games", "poker"],
    isFeatured: false,
    company: "888 Holdings plc",
    headquarters: "Gibraltar",
    gameProviders: ["888 Holdings", "NetEnt", "Playtech"],
    gameCount: "1000+",
    rtpTest: ["eCOGRA"],
    playerProtections: { en: "Player safety and security." },
    customerServices: { en: "24/7 Support" },
    bonusRequirements: { en: "Wagering requirements apply." },
    bonusValidities: { en: "Check terms." },
    withdrawalRate: "Standard",
    additionalBonuses: { en: "Daily jackpots and promotions." },
    reviewTexts: { en: "A reputable casino with unique games." },
    reloadBonuses: { en: "Daily Bonuses" },
    reloadBonusRates: { en: "Varies" },
    reloadBonusMaxAmounts: { en: "Varies" },
    reloadBonusValidities: { en: "Daily" },
    reloadBonusRequirements: { en: "Check daily offer." },
    reloadBonusDisclaimers: { en: "T&Cs apply." },
    screenshots: { en: ["url9", "url10"] },
    introTexts: { en: "Welcome to 888 Casino!" },
    additionalIntroTexts: { en: "Play exclusive games." },
    gamesSectionTexts: { en: "Discover our games." },
    bonusIntroTexts: { en: "Claim your bonus!" },
    bonusConclusionTexts: { en: "Join the fun." },
    slotMachineTexts1: { en: "Exclusive slot titles." },
    slotMachineTexts2: { en: "Popular games." },
    jackpotSlotsTexts: { en: "Win big." },
    tableGamesTexts: { en: "Variety of table games." },
    payoutRatesTexts1: { en: "Fair payout rates." },
    payoutRatesTexts2: { en: "Certified RTP." },
    gameTypes: { en: ["slots", "blackjack", "roulette"] },
  },
  {
    id: "leovegas",
    name: "LeoVegas",
    logo: "https://placehold.co/200x100/f59e0b/FFF?text=LeoVegas",
    rating: 4.7,
    bonuses: { en: "Up to $1,000 + 200 Free Spins" },
    descriptions: { en: "LeoVegas is known as the King of Mobile Casino with an award-winning app and extensive game library." },
    urls: { en: "https://example.com/leovegas" },
    paymentMethods: ["visa", "mastercard", "paypal", "skrill", "neteller"],
    minDeposit: 10,
    licenseInfo: ["Malta Gaming Authority", "UK Gambling Commission"],
    yearEstablished: 2011,
    gameCategories: ["slots", "live-dealer", "table-games"],
    isFeatured: false,
    company: "LeoVegas Gaming plc",
    headquarters: "Malta",
    gameProviders: ["NetEnt", "Microgaming", "Evolution Gaming"],
    gameCount: "1500+",
    rtpTest: ["eCOGRA"],
    playerProtections: { en: "LeoSafePlay for responsible gaming." },
    customerServices: { en: "24/7 Support" },
    bonusRequirements: { en: "Wagering requirements apply." },
    bonusValidities: { en: "Check terms." },
    withdrawalRate: "Fast",
    additionalBonuses: { en: "Promotions and VIP program." },
    reviewTexts: { en: "Excellent mobile casino with a wide range of games." },
    reloadBonuses: { en: "Weekly Offers" },
    reloadBonusRates: { en: "Varies" },
    reloadBonusMaxAmounts: { en: "Varies" },
    reloadBonusValidities: { en: "Weekly" },
    reloadBonusRequirements: { en: "Check offers." },
    reloadBonusDisclaimers: { en: "T&Cs apply." },
    screenshots: { en: ["url11", "url12"] },
    introTexts: { en: "Welcome to LeoVegas!" },
    additionalIntroTexts: { en: "The King of Mobile Casino." },
    gamesSectionTexts: { en: "Explore our games." },
    bonusIntroTexts: { en: "Claim your welcome offer!" },
    bonusConclusionTexts: { en: "Play on the go." },
    slotMachineTexts1: { en: "Huge selection of mobile slots." },
    slotMachineTexts2: { en: "Top providers." },
    jackpotSlotsTexts: { en: "Mobile jackpot games." },
    tableGamesTexts: { en: "Play table games anywhere." },
    payoutRatesTexts1: { en: "High mobile RTP." },
    payoutRatesTexts2: { en: "Fair play certified." },
    gameTypes: { en: ["slots", "live-dealer", "blackjack"] },
  },
  {
    id: "casumo",
    name: "Casumo",
    logo: "https://placehold.co/200x100/8b5cf6/FFF?text=Casumo",
    rating: 4.6,
    bonuses: { en: "100% bonus up to $300 + 20 Free Spins" },
    descriptions: { en: "Casumo offers a unique adventure-style casino experience with rewards as you play." },
    urls: { en: "https://example.com/casumo" },
    paymentMethods: ["visa", "mastercard", "skrill", "neteller", "bitcoin"],
    minDeposit: 10,
    licenseInfo: ["Malta Gaming Authority", "UK Gambling Commission"],
    yearEstablished: 2012,
    gameCategories: ["slots", "table-games", "new"],
    isFeatured: true,
    company: "Casumo Services Limited",
    headquarters: "Malta",
    gameProviders: ["NetEnt", "Microgaming", "Play'n GO"],
    gameCount: "2000+",
    rtpTest: ["eCOGRA"],
    playerProtections: { en: "Play Okay tools." },
    customerServices: { en: "Fast and friendly support." },
    bonusRequirements: { en: "Wagering requirements apply." },
    bonusValidities: { en: "Check terms." },
    withdrawalRate: "Fast",
    additionalBonuses: { en: "Reel Races and promotions." },
    reviewTexts: { en: "An innovative and fun casino experience." },
    reloadBonuses: { en: "Promotional Bonuses" },
    reloadBonusRates: { en: "Varies" },
    reloadBonusMaxAmounts: { en: "Varies" },
    reloadBonusValidities: { en: "Promotional" },
    reloadBonusRequirements: { en: "Check promotions." },
    reloadBonusDisclaimers: { en: "T&Cs apply." },
    screenshots: { en: ["url13", "url14"] },
    introTexts: { en: "Welcome to Casumo!" },
    additionalIntroTexts: { en: "Start your adventure." },
    gamesSectionTexts: { en: "Explore our universe of games." },
    bonusIntroTexts: { en: "Claim your welcome bonus!" },
    bonusConclusionTexts: { en: "Join the adventure." },
    slotMachineTexts1: { en: "Wide variety of slots." },
    slotMachineTexts2: { en: "New games added regularly." },
    jackpotSlotsTexts: { en: "Chase the big win." },
    tableGamesTexts: { en: "Play classic table games." },
    payoutRatesTexts1: { en: "Transparent RTP." },
    payoutRatesTexts2: { en: "Fairness guaranteed." },
    gameTypes: { en: ["slots", "roulette", "blackjack"] },
  },
  {
    id: "mr-green",
    name: "Mr Green",
    logo: "https://placehold.co/200x100/10b981/FFF?text=Mr+Green",
    rating: 4.5,
    bonuses: { en: "$100 + 200 Free Spins Welcome Offer" },
    descriptions: { en: "Mr Green provides a gentlemanly gaming experience with a clean interface and unique features." },
    urls: { en: "https://example.com/mr-green" },
    paymentMethods: ["visa", "mastercard", "paypal", "skrill", "bank-transfer"],
    minDeposit: 20,
    licenseInfo: ["Malta Gaming Authority", "UK Gambling Commission"],
    yearEstablished: 2008,
    gameCategories: ["slots", "sports-betting", "live-dealer"],
    isFeatured: false,
    company: "Mr Green Limited",
    headquarters: "Malta",
    gameProviders: ["NetEnt", "Microgaming", "Play'n GO"],
    gameCount: "1000+",
    rtpTest: ["eCOGRA"],
    playerProtections: { en: "Green Gaming tools." },
    customerServices: { en: "24/7 Customer Support" },
    bonusRequirements: { en: "Wagering requirements apply." },
    bonusValidities: { en: "Check terms." },
    withdrawalRate: "Standard",
    additionalBonuses: { en: "Promotions and tournaments." },
    reviewTexts: { en: "A stylish and reliable online casino." },
    reloadBonuses: { en: "Weekly Offers" },
    reloadBonusRates: { en: "Varies" },
    reloadBonusMaxAmounts: { en: "Varies" },
    reloadBonusValidities: { en: "Weekly" },
    reloadBonusRequirements: { en: "Check offers." },
    reloadBonusDisclaimers: { en: "T&Cs apply." },
    screenshots: { en: ["url15", "url16"] },
    introTexts: { en: "Welcome to Mr Green!" },
    additionalIntroTexts: { en: "Enjoy a gentlemanly experience." },
    gamesSectionTexts: { en: "Explore our game selection." },
    bonusIntroTexts: { en: "Claim your welcome offer!" },
    bonusConclusionTexts: { en: "Play responsibly." },
    slotMachineTexts1: { en: "Popular slot titles." },
    slotMachineTexts2: { en: "Exclusive games." },
    jackpotSlotsTexts: { en: "Big jackpot wins." },
    tableGamesTexts: { en: "Variety of table games." },
    payoutRatesTexts1: { en: "Fair RTP." },
    payoutRatesTexts2: { en: "Certified payouts." },
    gameTypes: { en: ["slots", "live-dealer", "sports-betting"] },
  },
  {
    id: "infinity-casino",
    name: "Infinity Casino",
    logo: "https://placehold.co/200x100/000000/FFF?text=Infinity",
    rating: 5.0,
    bonuses: { en: "Infinite Bonus" },
    descriptions: { en: "Experience infinite possibilities at Infinity Casino." },
    urls: { en: "https://example.com/infinity" },
    paymentMethods: ["bitcoin", "ethereum"],
    minDeposit: 1,
    licenseInfo: ["Infinite Gaming License"],
    yearEstablished: 2025,
    gameCategories: ["slots", "blackjack", "live-dealer", "casino-holdem", "video-poker"],
    isFeatured: true,
    company: "Infinity Gaming Ltd.",
    headquarters: "The Cloud",
    gameProviders: ["All Providers"],
    gameCount: "Infinite",
    rtpTest: ["Perfect"],
    playerProtections: { en: "Absolute" },
    customerServices: { en: "24/7 Infinite Support" },
    bonusRequirements: { en: "None" },
    bonusValidities: { en: "Infinite" },
    withdrawalRate: "Instant",
    additionalBonuses: { en: "Endless promotions." },
    reviewTexts: { en: "The future of online casinos." },
    reloadBonuses: { en: "Infinite Reload" },
    reloadBonusRates: { en: "Infinite" },
    reloadBonusMaxAmounts: { en: "Infinite" },
    reloadBonusValidities: { en: "Always" },
    reloadBonusRequirements: { en: "None" },
    reloadBonusDisclaimers: { en: "No limits." },
    screenshots: { en: ["url17", "url18"] },
    introTexts: { en: "Welcome to Infinity Casino!" },
    additionalIntroTexts: { en: "Beyond your imagination." },
    gamesSectionTexts: { en: "Explore infinite games." },
    bonusIntroTexts: { en: "Claim your infinite bonus!" },
    bonusConclusionTexts: { en: "Play forever." },
    slotMachineTexts1: { en: "Infinite slots." },
    slotMachineTexts2: { en: "New games constantly." },
    jackpotSlotsTexts: { en: "Infinite jackpots." },
    tableGamesTexts: { en: "Every table game imaginable." },
    payoutRatesTexts1: { en: "Perfect RTP." },
    payoutRatesTexts2: { en: "Guaranteed payouts." },
    gameTypes: { en: ["slots", "blackjack", "roulette"] },
  },
];

export const fetchCasinosFromSupabase = async (): Promise<Casino[]> => {
  try {
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
          screenshots,
          intro_text,
          additional_intro_text,
          games_section_text,
          bonus_intro_text,
          bonus_conclusion_text,
          slot_machine_text_1,
          slot_machine_text_2,
          jackpot_slots_text,
          table_games_text,
          payout_rates_text_1,
          payout_rates_text_2,
          game_types
        )
      `)
      .order('name');

    if (error) throw error;

    // Map database objects to the Casino type with proper field transformation
    const casinosData: Casino[] = (data || []).map(casino => {
      // Transform nested translations array into a language-keyed object
      const translationsMap: Record<string, any> = (Array.isArray(casino.casino_translations) ? casino.casino_translations : []).reduce((acc: Record<string, any>, trans: any) => {
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
        gameProviders: Array.isArray(casino.game_providers) ? casino.game_providers : [], // Map game_providers (array)
        gameCount: casino.game_count || '', // Map game_count
        rtpTest: Array.isArray(casino.rtp_test) ? casino.rtp_test : [], // Map rtp_test as array
        gameCategories: Array.isArray(casino.game_categories) ? casino.game_categories : [], // Map game_categories (array)
        featureCategories: Array.isArray(casino.feature_categories) ? casino.feature_categories : [], // Map feature_categories (array)
        isVerified: casino.is_verified || false,
        isFeatured: casino.is_featured || false,

        // Map multilingual fields to the structure expected by CasinoReviewForm
        urls: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
          acc[langCode] = translationsMap[langCode].casino_url || '';
          return acc;
        }, {}),
        metaTitles: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
          acc[langCode] = translationsMap[langCode].meta_title || '';
          return acc;
        }, {}),
        metaDescriptions: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
          acc[langCode] = translationsMap[langCode].meta_description || '';
          return acc;
        }, {}),
        descriptions: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
          acc[langCode] = translationsMap[langCode].description || '';
          return acc;
        }, {}),
        bonuses: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
          acc[langCode] = translationsMap[langCode].general_bonus || '';
          return acc;
        }, {}),
        bonusRates: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
          acc[langCode] = translationsMap[langCode].bonus_rate || '';
          return acc;
        }, {}),
        bonusAmounts: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
          acc[langCode] = translationsMap[langCode].bonus_amount || '';
          return acc;
        }, {}),
        bonusValidities: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
          acc[langCode] = translationsMap[langCode].bonus_validity || '';
          return acc;
        }, {}),
        bonusRequirements: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
          acc[langCode] = translationsMap[langCode].bonus_conditions || '';
          return acc;
        }, {}),
        additionalBonuses: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
          acc[langCode] = translationsMap[langCode].more_bonuses || '';
          return acc;
        }, {}),
        bonusDisclaimers: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
          acc[langCode] = translationsMap[langCode].bonus_disclaimer || '';
          return acc;
        }, {}),
        reviewTexts: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
          acc[langCode] = translationsMap[langCode].review_text || '';
          return acc;
        }, {}),
        liveCasinoCashbacks: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].live_cashback || '';
           return acc;
        }, {}),
        liveCasinoCashbackRates: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].live_cashback_rate || '';
           return acc;
        }, {}),
        liveCasinoCashbackMaxAmounts: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].live_cashback_max_amount || '';
           return acc;
        }, {}),
        liveCasinoCashbackValidities: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].live_cashback_validity || '';
           return acc;
        }, {}),
        liveCasinoCashbackRequirements: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].live_cashback_conditions || '';
           return acc;
        }, {}),
        liveCasinoCashbackDisclaimers: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].live_cashback_disclaimer || '';
           return acc;
        }, {}),
        weeklyCashbacks: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].weekly_cashback || '';
           return acc;
        }, {}),
        weeklyCashbackRates: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].weekly_cashback_rate || '';
           return acc;
        }, {}),
        weeklyCashbackMaxAmounts: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].weekly_cashback_max_amount || '';
           return acc;
        }, {}),
        weeklyCashbackValidities: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].weekly_cashback_validity || '';
           return acc;
        }, {}),
        weeklyCashbackRequirements: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].weekly_cashback_conditions || '';
           return acc;
        }, {}),
        weeklyCashbackDisclaimers: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].weekly_cashback_disclaimer || '';
           return acc;
        }, {}),
        reloadBonuses: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
          acc[langCode] = translationsMap[langCode].reload_bonus || '';
          return acc;
        }, {}),
        reloadBonusRates: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
          acc[langCode] = translationsMap[langCode].reload_bonus_rate || '';
          return acc;
        }, {}),
        reloadBonusMaxAmounts: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
          acc[langCode] = translationsMap[langCode].reload_bonus_max_amount || '';
          return acc;
        }, {}),
        reloadBonusValidities: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
          acc[langCode] = translationsMap[langCode].reload_bonus_validity || '';
          return acc;
        }, {}),
        reloadBonusRequirements: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
          acc[langCode] = translationsMap[langCode].reload_bonus_requirements || '';
          return acc;
        }, {}),
        reloadBonusDisclaimers: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
          acc[langCode] = translationsMap[langCode].reload_bonus_disclaimer || '';
          return acc;
        }, {}),
        playerProtections: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].player_protection || '';
           return acc;
        }, {}),
        customerServices: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].customer_service || '';
           return acc;
        }, {}),
        screenshots: Object.keys(translationsMap).reduce((acc: Record<string, string[]>, langCode) => {
           acc[langCode] = Array.isArray(translationsMap[langCode].screenshots) ? translationsMap[langCode].screenshots : [];
           return acc;
        }, {}),
        introTexts: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].intro_text || '';
           return acc;
        }, {}),
        additionalIntroTexts: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].additional_intro_text || '';
           return acc;
        }, {}),
        gamesSectionTexts: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].games_section_text || '';
           return acc;
        }, {}),
        bonusIntroTexts: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].bonus_intro_text || '';
           return acc;
        }, {}),
        bonusConclusionTexts: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].bonus_conclusion_text || '';
           return acc;
        }, {}),
        slotMachineTexts1: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].slot_machine_text_1 || '';
           return acc;
        }, {}),
        slotMachineTexts2: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].slot_machine_text_2 || '';
           return acc;
        }, {}),
        jackpotSlotsTexts: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].jackpot_slots_text || '';
           return acc;
        }, {}),
        tableGamesTexts: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].table_games_text || '';
           return acc;
        }, {}),
        payoutRatesTexts1: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].payout_rates_text_1 || '';
           return acc;
        }, {}),
        payoutRatesTexts2: Object.keys(translationsMap).reduce((acc: Record<string, string>, langCode) => {
           acc[langCode] = translationsMap[langCode].payout_rates_text_2 || '';
           return acc;
        }, {}),
        gameTypes: Object.keys(translationsMap).reduce((acc: Record<string, string[]>, langCode) => {
           acc[langCode] = Array.isArray(translationsMap[langCode].game_types) ? translationsMap[langCode].game_types : [];
           return acc;
        }, {}),

         logo_url: casino.logo_url || '',
         created_at: casino.created_at,
         casino_translations: casino.casino_translations, // Keep raw translations for potential other uses
      };
    });

    return casinosData;
  } catch (error) {
    console.error("Error fetching casinos from Supabase:", error);
    // Depending on desired behavior, you might want to throw the error
    // or return an empty array or handle it differently.
    throw error;
  }
};


export const fetchAllCasinos = (): Promise<Casino[]> => {
  return Promise.resolve(casinos);
};

export const fetchFeaturedCasinos = (): Promise<Casino[]> => {
  return Promise.resolve(casinos.filter(casino => casino.isFeatured));
};

export const fetchCasinoById = (id: string): Promise<Casino | undefined> => {
  return Promise.resolve(casinos.find(casino => casino.id === id));
};

export const fetchAllCategories = (): Promise<CasinoCategory[]> => {
  return Promise.resolve(categories);
};

export const fetchCasinosByCategory = (categoryId: string): Promise<Casino[]> => {
  return Promise.resolve(casinos.filter(casino => casino.gameCategories.includes(categoryId)));
};

export const fetchAllCountries = (): Promise<Country[]> => {
  return Promise.resolve(countries);
};

export const fetchAllPaymentMethods = (): Promise<PaymentMethod[]> => {
  return Promise.resolve(paymentMethods);
};
