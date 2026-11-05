import { activeCategoryLabels, categoryRemovalDate, type CatalogDeck } from "./registry";

export interface HubCard {
  id: string;
  category: string;
  title: string;
  summary: string;
  path: string;
  meta: string;
  action: string;
  draft: boolean;
  removeOn?: string;
}

export interface HubCategory {
  id: string;
  label: string;
  count: number;
}

export function hubCards(entries: CatalogDeck[]): HubCard[] {
  return entries.map((entry) => ({
    id: entry.slug,
    category: entry.category,
    title: entry.deck.meta.title,
    summary: entry.summary,
    path: `/decks/${entry.slug}`,
    meta: `${entry.deck.meta.date} · ${entry.deck.slides.length} slides`,
    action: "Open deck",
    draft: entry.status === "draft",
    removeOn: categoryRemovalDate(entry.category),
  }));
}

export function hubCategories(cards: HubCard[]): HubCategory[] {
  const counts = new Map<string, number>();
  for (const label of activeCategoryLabels()) counts.set(label, 0);
  for (const card of cards) {
    counts.set(card.category, (counts.get(card.category) ?? 0) + 1);
  }
  return [
    { id: "all", label: "All", count: cards.length },
    ...[...counts.entries()].map(([label, count]) => ({ id: label, label, count })),
  ];
}
