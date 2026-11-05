import type { DeckData } from "../deck/schema";
import { blastsRacesDeckData } from "../decks/blasts-races-deck";
import { blitzModeDeckData } from "../decks/blitz-mode-deck";
import { deck as promoToolsDeck } from "../decks/sample-deck";

export type CatalogStatus = "published" | "draft";

export interface CatalogDeck {
  slug: string;
  summary: string;
  category: string;
  status: CatalogStatus;
  deck: DeckData;
}

export interface CatalogCategory {
  label: string;
  /** When set, this category is shown under that parent in the hub sidebar. */
  parent?: string;
  /** Local calendar date YYYY-MM-DD. The category is hidden on this date and after. */
  removeOn?: string;
}

export interface CatalogLink {
  id: string;
  title: string;
  summary: string;
  category: string;
  href: string;
  meta: string;
  action: string;
  status: CatalogStatus;
}

// Data classification: INTERNAL — sales deck catalog.
// Publish a deck by adding one entry here, then pushing this repository.
export const catalogCategories: CatalogCategory[] = [
  { label: "Power Pack" },
  { label: "Blitz Mode" },
  { label: "Blasts & Races", removeOn: "2027-06-01" },
  { label: "Games" },
  { label: "Instant Views", parent: "Games" },
  { label: "Roadmaps", parent: "Games" },
];

export const catalog: CatalogDeck[] = [
  {
    slug: "promo-tools",
    summary: "Five measurable performance levers for Playson promo tools.",
    category: "Power Pack",
    status: "published",
    deck: promoToolsDeck,
  },
  {
    slug: "blitz-mode",
    summary: "Blitz Mode sales deck for desktop and mobile.",
    category: "Blitz Mode",
    status: "published",
    deck: blitzModeDeckData,
  },
  {
    slug: "blasts-races",
    summary: "Blasts & Races sales deck, July 2026 to June 2027.",
    category: "Blasts & Races",
    status: "published",
    deck: blastsRacesDeckData,
  },
];

export function localCalendarDate(date = new Date()): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

// @webflow-sync start
export const catalogLinks: CatalogLink[] = [
  {
    id: "x1000-xmas-teddy",
    title: "x1000 Xmas Teddy",
    summary: "Teddy puts on his Santa hat and gets ready to spread some holiday cheer!",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/x1000-xmas-teddy",
    meta: "3 December Release",
    action: "Open",
    status: "published",
  },
  {
    id: "thunder-coins-xxxl",
    title: "Thunder Coins XXXL: Hold and Win",
    summary: "Thunder Coins XXL expands the action with a 3×6 game field and the all-new MEGACOIN.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/thunder-coins-xxxl",
    meta: "26 November Release",
    action: "Open",
    status: "published",
  },
  {
    id: "x1500-sugar-teddy-2",
    title: "x1500 Sugar Teddy 2",
    summary: "The sweetest adventure returns with even more surprises, bringing back colorful cascades, playful visuals, and the irresistible charm players already love.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/x1500-sugar-teddy-2",
    meta: "19 November Release",
    action: "Open",
    status: "published",
  },
  {
    id: "multidiamond-xxl-spins-plus",
    title: "Multidiamond XXL: Spins+",
    summary: "The MULTIDIAMOND feature takes centre stage, collecting Diamond values in both Main and Bonus Games and applying Multipliers of up to x20 for greater winning potential.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/multidiamond-xxl-spins-plus",
    meta: "5 November Release",
    action: "Open",
    status: "published",
  },
  {
    id: "3-gems-of-vegas-super-wheel",
    title: "3 Gems of Vegas: Super Wheel",
    summary: "Bring the bright lights of Las Vegas to the reels, with an enhanced Super Wheel at the heart of the action.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/3-gems-of-vegas-super-wheel",
    meta: "29 October Release",
    action: "Open",
    status: "published",
  },
  {
    id: "lucky-pots-x1000",
    title: "Lucky Pots x1000",
    summary: "Every spin is packed with lucky surprises, combining fast-paced scatterpays gameplay with exciting Bonus opportunities on a vibrant 6x5 grid.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/lucky-pots-x1000",
    meta: "22 October Release",
    action: "Open",
    status: "published",
  },
  {
    id: "3-roaring-bells-hold-and-win",
    title: "3 Roaring Bells: Hold and Win",
    summary: "Classic slot action heats up on a fiery 3x3 grid, combining familiar fruit symbols with a feature-packed Bonus Game.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/3-roaring-bells-hold-and-win",
    meta: "15 October Release",
    action: "Open",
    status: "published",
  },
  {
    id: "beez-turn-wild",
    title: "Beez turn Wild",
    summary: "The Hives Are Abuzz With Wilds!",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/beez-turn-wild",
    meta: "24 September Release",
    action: "Open",
    status: "published",
  },
  {
    id: "thunder-coins-xxl-boostercells",
    title: "Thunder Coins XXL: BoosterCells",
    summary: "The popular Thunder Coins series gets another high-voltage upgrade, introducing a new way to build wins across its 3x5 grid.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/thunder-coins-xxl-boostercells",
    meta: "17 September Release",
    action: "Open",
    status: "published",
  },
  {
    id: "golden-penny-x1000-super-wheel",
    title: "Golden Penny x1000: Super Wheel",
    summary: "The next chapter of Playson's popular Irish adventure takes the excitement even further with thrilling cascading wins, powerful Multipliers up to x1000, and the new Super Wheel Feature.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/golden-penny-x1000-super-wheel",
    meta: "10 September Release",
    action: "Open",
    status: "published",
  },
  {
    id: "coin-strike-xxl-multicoin",
    title: "Coin Strike XXL: Multicoin",
    summary: "Coin Strike XXL: Multicoin expands one of Playson’s most successful slot series with a new MULTICOIN Feature layer, combining Coin collection with multipliers of up to x20.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/coin-strike-xxl-multicoin",
    meta: "27 August Release",
    action: "Open",
    status: "published",
  },
  {
    id: "4-supercharged-clovers-super-wheel",
    title: "4 Supercharged Clovers: Super Wheel",
    summary: "4 Supercharged Clovers: Super Wheel is the next chapter of a proven player favourite, taking the winning formula to a whole new level.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/4-supercharged-clovers-super-wheel",
    meta: "20 August Release",
    action: "Open",
    status: "published",
  },
  {
    id: "4-supershiny-diamonds",
    title: "4 Supershiny Diamonds: Hold and Win",
    summary: "4 Supershiny Diamonds: Hold and Win brings a sparkling evolution to Playson's diamond portfolio, combining Hold and Win gameplay with Multi, Charge, and Collect Diamond Features on a 5x3 grid.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/4-supershiny-diamonds",
    meta: "6 August Release",
    action: "Open",
    status: "published",
  },
  {
    id: "clover-smash",
    title: "Clover Smash",
    summary: "Clover Smash reimagines classic 3x3 gameplay with a modern twist.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/clover-smash",
    meta: "30 July Release",
    action: "Open",
    status: "published",
  },
  {
    id: "4-chili-pots-hold-and-win",
    title: "4 Chili Pots: Hold and Win",
    summary: "4 Chili Pots: Hold and Win brings players into a vibrant Mexican fiesta, where blazing peppers, golden coins, and colorful celebrations set the stage for feature-packed Hold and Win action.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/4-chili-pots-hold-and-win",
    meta: "16 July Release",
    action: "Open",
    status: "published",
  },
  {
    id: "3-thunder-coins",
    title: "3 Thunder Coins: Hold and Win",
    summary: "Strike it big in 3 Thunder Coins: Hold and Win, the next evolution of the hit Thunder Coins series.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/3-thunder-coins",
    meta: "25 June Release",
    action: "Open",
    status: "published",
  },
  {
    id: "pink-clovers-xxxl",
    title: "Pink Clovers XXXL: Hold and Win",
    summary: "Bigger, brighter, and bolder, Pink Clovers XXXL: Hold and Win expands the action onto a 3x6 grid bursting with vibrant clover energy.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/pink-clovers-xxxl",
    meta: "11 June Release",
    action: "Open",
    status: "published",
  },
  {
    id: "4-pots-riches-super-wheel",
    title: "4 Pots Riches: Super Wheel",
    summary: "4 Pots Riches: Super Wheel expands the original 4 Pots Riches series with the addition of the new Super Wheel mechanic, bringing extra momentum to the Bonus Game experience.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/4-pots-riches-super-wheel",
    meta: "18 June Release",
    action: "Open",
    status: "published",
  },
  {
    id: "pink-clovers-xxl",
    title: "Pink Clovers XXXL: Hold and Win",
    summary: "Bigger, brighter, and bolder, Pink Clovers XXXL: Hold and Win expands the action onto a 3x6 grid bursting with vibrant clover energy.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/pink-clovers-xxl",
    meta: "11 June Release",
    action: "Open",
    status: "published",
  },
  {
    id: "sugar-piggy",
    title: "Sugar Piggy: Hold and Win",
    summary: "Sugar Piggy: Hold and Win brings 8+ symbol Scatter Pays to a vibrant 6x5 cascading grid, leading into two Hold and Win bonus modes.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/sugar-piggy",
    meta: "28 May Release",
    action: "Open",
    status: "published",
  },
  {
    id: "3-supercharged-diamonds",
    title: "3 Supercharged Diamonds: Hold and Win",
    summary: "Classic charm shines vivid in 3 Supercharged Diamonds: Hold and Win.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/3-supercharged-diamonds",
    meta: "14 May Release",
    action: "Open",
    status: "published",
  },
  {
    id: "4-chili-amigos",
    title: "4 Chili Amigos: Hold and Win",
    summary: "4 Chili Amigos: Hold and Win delivers feature-driven gameplay on a 5x3 grid with 25 paylines, where colourful Chili Bonus symbols trigger Multi, Mystery, and Collect features within the Hold and Win Bonus Game.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/4-chili-amigos",
    meta: "30 April Release",
    action: "Open",
    status: "published",
  },
  {
    id: "rhino-coins",
    title: "Rhino Coins: Hit the Bonus™",
    summary: "Rhino Coins delivers high-intensity action through two distinct bonus flows — Coin Bonus and Rhino Bonus — with Super Bonus upgrades expanding the gameplay to a 5x5 grid.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/rhino-coins",
    meta: "16 April Release",
    action: "Open",
    status: "published",
  },
  {
    id: "4-scarab-coins-hold-and-win",
    title: "4 Scarab Coins: Hold and Win",
    summary: "The Queen returns in 4 Scarab Coins: Hold and Win, as Cleopatra invites players into a mystical Egyptian realm where Scarab Coins unlock remarkable treasures.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/4-scarab-coins-hold-and-win",
    meta: "26 March Release",
    action: "Open",
    status: "published",
  },
  {
    id: "thunder-coins-xxl-multicoin",
    title: "Thunder Coins XXL: Multicoin",
    summary: "Thunder Coins XXL Multicoin returns with a multiplier-driven upgrade and two Collect types: the classic Thunder symbol and a Multicoin symbol that triggers a random multiplier.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/thunder-coins-xxl-multicoin",
    meta: "19 March Release",
    action: "Open",
    status: "published",
  },
  {
    id: "timeless-diamonds",
    title: "Timeless Diamonds: Hold and Win",
    summary: "A compact gem of design, Timeless Diamonds delivers instant action with sparkling clarity.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/timeless-diamonds",
    meta: "5 March Release",
    action: "Open",
    status: "published",
  },
  {
    id: "sugar-teddy-x1000",
    title: "Sugar Teddy Х1000",
    summary: "Sugar Teddy brings sweet, high-energy action to a 6x5 scatterpays grid with cascading wins and the Sugar Teddy Feature.",
    category: "Instant Views",
    href: "https://more.playson.com/instant-views/sugar-teddy-x1000",
    meta: "19 February Release",
    action: "Open",
    status: "published",
  },
  {
    id: "q1",
    title: "Q1 2026 Games Roadmap",
    summary: "January - March",
    category: "Roadmaps",
    href: "https://more.playson.com/roadmaps/2026/q1",
    meta: "2026",
    action: "Open",
    status: "published",
  },
  {
    id: "q2",
    title: "Q2 2026 Games Roadmap",
    summary: "April - June",
    category: "Roadmaps",
    href: "https://more.playson.com/roadmaps/2026/q2",
    meta: "2026",
    action: "Open",
    status: "published",
  },
  {
    id: "q3-roadmap",
    title: "Q3 2026 Games Roadmap",
    summary: "July - September",
    category: "Roadmaps",
    href: "https://more.playson.com/roadmaps/2026/q3-roadmap",
    meta: "2026",
    action: "Open",
    status: "published",
  },
  {
    id: "q4",
    title: "Q4 2026 Games Roadmap",
    summary: "October - December",
    category: "Roadmaps",
    href: "https://more.playson.com/roadmaps/2026/q4",
    meta: "2026",
    action: "Open",
    status: "published",
  },
  {
    id: "q4-greece",
    title: "Q4 2026 Games Roadmap Greece",
    summary: "October - December",
    category: "Roadmaps",
    href: "https://more.playson.com/roadmaps/2026/q4-greece",
    meta: "2026",
    action: "Open",
    status: "published",
  },
];
// @webflow-sync end

export function categoryParent(label: string): string | undefined {
  return catalogCategories.find((item) => item.label === label)?.parent;
}

export function categoryRemovalDate(label: string): string | undefined {
  return catalogCategories.find((item) => item.label === label)?.removeOn;
}

export function isCategoryRemoved(label: string, today = localCalendarDate()): boolean {
  const removeOn = categoryRemovalDate(label);
  if (removeOn && today >= removeOn) return true;
  const parent = categoryParent(label);
  return parent ? isCategoryRemoved(parent, today) : false;
}

export function activeCategoryLabels(today = localCalendarDate()): string[] {
  return catalogCategories.filter((item) => !isCategoryRemoved(item.label, today)).map((item) => item.label);
}

export function visibleCatalog(includeDrafts: boolean, today = localCalendarDate()): CatalogDeck[] {
  return catalog.filter((entry) => {
    if (entry.status === "draft" && !includeDrafts) return false;
    return !isCategoryRemoved(entry.category, today);
  });
}

export function visibleCatalogLinks(includeDrafts: boolean, today = localCalendarDate()): CatalogLink[] {
  return catalogLinks.filter((entry) => {
    if (entry.status === "draft" && !includeDrafts) return false;
    return !isCategoryRemoved(entry.category, today);
  });
}

export function findVisibleDeck(
  slug: string,
  includeDrafts: boolean,
  today = localCalendarDate(),
): CatalogDeck | undefined {
  const entry = catalog.find((item) => item.slug === slug);
  if (!entry || (entry.status === "draft" && !includeDrafts)) return undefined;
  if (isCategoryRemoved(entry.category, today)) return undefined;
  return entry;
}
