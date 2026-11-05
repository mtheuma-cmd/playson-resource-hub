import { useState } from "react";
import { Countdown, removalDateLabel } from "../catalog/Countdown";
import { hubCards, hubCategories, hubLinkCards, type HubCategory } from "../catalog/hub";
import type { CatalogDeck, CatalogLink } from "../catalog/registry";
import { PlaysonParticles } from "../design-system/components";
import { brandAssets } from "../design-system/tokens";
import { asset } from "../lib/asset";
import { withBase } from "../lib/routes";
import "./hub-page.css";

export function HubPage({ entries, links }: { entries: CatalogDeck[]; links: CatalogLink[] }) {
  const cards = [...hubCards(entries), ...hubLinkCards(links)];
  const categories = hubCategories(cards);
  const [category, setCategory] = useState("all");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const childCategories = categories.filter((item) => item.parentId === category);
  const visible = cards.filter((card) => category === "all" || card.category === category);

  function selectCategory(id: string) {
    const hasChildren = categories.some((item) => item.parentId === id);
    if (hasChildren) {
      setCategory(id);
      setOpenMenu((current) => (current === id && category === id ? null : id));
      return;
    }
    const parentId = categories.find((item) => item.id === id)?.parentId;
    setCategory(id);
    setOpenMenu(parentId ?? null);
  }

  return (
    <main className="hub">
      <PlaysonParticles />
      <header className="hub-intro">
        <h1>Resource Hub</h1>
        <p>All your Playson needs, in one place.</p>
      </header>
      {cards.length === 0 ? (
        <p className="hub-empty">No decks are published yet.</p>
      ) : (
        <div className="hub-layout">
          <nav className="hub-categories" aria-label="Categories">
            <h2>Categories</h2>
            <ul>
              {categories
                .filter((item) => !item.parentId)
                .map((item) => (
                  <li key={item.id}>
                    <CategoryButton
                      item={item}
                      selected={category === item.id}
                      expanded={openMenu === item.id}
                      hasChildren={categories.some((child) => child.parentId === item.id)}
                      onSelect={selectCategory}
                    />
                    <CategoryChildren
                      categories={categories}
                      parentId={item.id}
                      open={openMenu === item.id}
                      selected={category}
                      onSelect={selectCategory}
                    />
                  </li>
                ))}
            </ul>
          </nav>
          {childCategories.length > 0 ? (
            <ul className="hub-grid">
              {childCategories.map((item) => (
                <li key={item.id}>
                  <button type="button" className="hub-card" onClick={() => selectCategory(item.id)}>
                    <p className="hub-card__category">{category}</p>
                    <h2>{item.label}</h2>
                    <p className="hub-card__summary">{item.count} published</p>
                    <span className="hub-card__action">Open</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : visible.length === 0 ? (
            <p className="hub-empty">Nothing is published in this category.</p>
          ) : (
            <ul className="hub-grid">
              {visible.map((card) => (
                <li key={card.id}>
                  <a
                    className="hub-card"
                    href={card.external ? card.href : withBase(card.href)}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                  >
                    <p className="hub-card__category">{card.category}</p>
                    <h2>{card.title}</h2>
                    <p className="hub-card__summary">{card.summary}</p>
                    <p className="hub-card__meta">
                      <span>{card.meta}</span>
                      {card.draft && <span className="hub-card__draft">Draft</span>}
                    </p>
                    <span className="hub-card__action">{card.action}</span>
                  </a>
                  {card.removeOn && <HubClock removeOn={card.removeOn} />}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <footer className="hub-footer">
        <img src={asset(brandAssets.playsonLogoSrc)} alt="Playson" />
        <p>Resource Hub</p>
      </footer>
    </main>
  );
}

function CategoryButton({
  item,
  selected,
  expanded = false,
  hasChildren = false,
  onSelect,
}: {
  item: HubCategory;
  selected: boolean;
  expanded?: boolean;
  hasChildren?: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-expanded={hasChildren ? expanded : undefined}
      onClick={() => onSelect(item.id)}
    >
      <span className="hub-categories__name">
        <span>{item.label}</span>
        {item.removeOn && <CategoryTimer removeOn={item.removeOn} />}
      </span>
      <span className="hub-categories__aside">
        <span className="hub-categories__count">{item.count}</span>
        {hasChildren && (
          <svg className="hub-categories__chevron" viewBox="0 0 12 12" aria-hidden="true">
            <path
              d="M2.5 4.5 6 8l3.5-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
}

function CategoryTimer({ removeOn }: { removeOn: string }) {
  return (
    <span className="hub-categories__timer">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 7.5V12l3 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="hub-categories__timer-panel">
        <Countdown removeOn={removeOn} placement="pop" />
      </span>
    </span>
  );
}

function CategoryChildren({
  categories,
  parentId,
  open,
  selected,
  onSelect,
}: {
  categories: HubCategory[];
  parentId: string;
  open: boolean;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const children = categories.filter((item) => item.parentId === parentId);
  if (children.length === 0) return null;
  return (
    <div className={`hub-categories__menu${open ? " is-open" : ""}`}>
      <ul inert={open ? undefined : true}>
        {children.map((item) => (
          <li key={item.id}>
            <CategoryButton item={item} selected={selected === item.id} onSelect={onSelect} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function HubClock({ removeOn }: { removeOn: string }) {
  return (
    <div className="hub-clock">
      <button
        type="button"
        className="hub-clock__button"
        aria-label={`Countdown until ${removalDateLabel(removeOn)}`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 7.5V12l3 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="hub-clock__panel">
        <Countdown removeOn={removeOn} placement="pop" />
      </div>
    </div>
  );
}

export function MissingDeck() {
  return (
    <main className="hub">
      <PlaysonParticles />
      <header className="hub-intro">
        <h1>Deck not found</h1>
        <p>That deck is not on the hub.</p>
      </header>
      <a className="hub-back" href={withBase("/")}>
        Back to the hub
      </a>
    </main>
  );
}
