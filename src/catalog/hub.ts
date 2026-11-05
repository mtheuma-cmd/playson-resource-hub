import {
  activeCategoryLabels,
  categoryParent,
  categoryRemovalDate,
  type CatalogDeck,
  type CatalogLink,
} from "./registry";

export interface HubCard {
  id: string;
  category: string;
  parentCategory?: string;
  title: string;
  summary: string;
  href: string;
  external: boolean;
  meta: string;
  action: string;
  draft: boolean;
  removeOn?: string;
}

export interface HubCategory {
  id: string;
  label: string;
  count: number;
  parentId?: string;
  removeOn?: string;
}

export function hubCards(entries: CatalogDeck[]): HubCard[] {
  return entries.map((entry) => ({
    id: entry.slug,
    category: entry.category,
    parentCategory: categoryParent(entry.category),
    title: entry.deck.meta.title,
    summary: entry.summary,
    href: `/decks/${entry.slug}`,
    external: false,
    meta: `${entry.deck.meta.date} · ${entry.deck.slides.length} slides`,
    action: "Open deck",
    draft: entry.status === "draft",
    removeOn: categoryRemovalDate(entry.category),
  }));
}

export function hubLinkCards(entries: CatalogLink[]): HubCard[] {
  return entries.map((entry) => ({
    id: entry.id,
    category: entry.category,
    parentCategory: categoryParent(entry.category),
    title: entry.title,
    summary: entry.summary,
    href: entry.href,
    external: true,
    meta: entry.meta,
    action: entry.action,
    draft: entry.status === "draft",
    removeOn: categoryRemovalDate(entry.category),
  }));
}

export function hubCategories(cards: HubCard[]): HubCategory[] {
  const counts = new Map<string, number>();
  for (const label of activeCategoryLabels()) counts.set(label, 0);
  for (const card of cards) {
    counts.set(card.category, (counts.get(card.category) ?? 0) + 1);
    if (card.parentCategory) {
      counts.set(card.parentCategory, (counts.get(card.parentCategory) ?? 0) + 1);
    }
  }
  return [
    { id: "all", label: "All", count: cards.length },
    ...[...counts.entries()].map(([label, count]) => ({
      id: label,
      label,
      count,
      parentId: categoryParent(label),
      removeOn: categoryRemovalDate(label),
    })),
  ];
}
