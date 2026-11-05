import { useState } from "react";
import { Countdown, removalDateLabel } from "../catalog/Countdown";
import { hubCards, hubCategories } from "../catalog/hub";
import type { CatalogDeck } from "../catalog/registry";
import { PlaysonParticles } from "../design-system/components";
import { brandAssets } from "../design-system/tokens";
import { asset } from "../lib/asset";
import { withBase } from "../lib/routes";
import "./hub-page.css";

export function HubPage({ entries }: { entries: CatalogDeck[] }) {
  const cards = hubCards(entries);
  const categories = hubCategories(cards);
  const [category, setCategory] = useState("all");
  const visible = cards.filter((card) => category === "all" || card.category === category);

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
              {categories.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-pressed={category === item.id}
                    onClick={() => setCategory(item.id)}
                  >
                    <span>{item.label}</span>
                    <span className="hub-categories__count">{item.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          {visible.length === 0 ? (
            <p className="hub-empty">Nothing is published in this category.</p>
          ) : (
            <ul className="hub-grid">
              {visible.map((card) => (
                <li key={card.id}>
                  <a className="hub-card" href={withBase(card.path)}>
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
