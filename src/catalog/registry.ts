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
  /** Local calendar date YYYY-MM-DD. The category is hidden on this date and after. */
  removeOn?: string;
}

// Data classification: INTERNAL — sales deck catalog.
// Publish a deck by adding one entry here, then pushing this repository.
export const catalogCategories: CatalogCategory[] = [
  { label: "Power Pack" },
  { label: "Blitz Mode" },
  { label: "Blasts & Races", removeOn: "2027-06-01" },
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

export function categoryRemovalDate(label: string): string | undefined {
  return catalogCategories.find((item) => item.label === label)?.removeOn;
}

export function isCategoryRemoved(label: string, today = localCalendarDate()): boolean {
  const removeOn = categoryRemovalDate(label);
  return Boolean(removeOn && today >= removeOn);
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
