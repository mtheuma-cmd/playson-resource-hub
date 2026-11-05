import { Countdown } from "../catalog/Countdown";
import { categoryRemovalDate } from "../catalog/registry";
import { blastsRaces } from "../design-system/tokens";
import { asset } from "../lib/asset";

const deckLink = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const palette = [
  ["Canvas", blastsRaces.canvas],
  ["Slide", blastsRaces.slide],
  ["Raised", blastsRaces.raised],
  ["Atmosphere", blastsRaces.atmosphere],
  ["Text", blastsRaces.text],
  ["Muted", blastsRaces.muted],
  ["Label", blastsRaces.label],
  ["Electric", blastsRaces.electric],
  ["Cyan", blastsRaces.cyan],
  ["Red", blastsRaces.red],
  ["Gold", blastsRaces.gold],
  ["Gold mid", blastsRaces.goldMid],
] as const;

const templates = [
  ["Hero", "01.png"],
  ["Overview", "02.png"],
  ["Mechanics", "03.png"],
  ["Activation and contact", "13.png"],
] as const;

const mechanics = [
  ["Power Blasts", "Instant rewards during gameplay"],
  ["Grand Race", "Weekly leaderboard competitions"],
  ["Turbo Races", "Multiple daily 20-minute prime-time races"],
] as const;

const segments = [
  ["VIPs & high rollers", "Grand Race"],
  ["Active players", "Power Blasts"],
  ["New & casual players", "Turbo Races"],
] as const;

const rewards = ["Cash", "Flexible Free Spins", "Multiplier", "Bonus Games"] as const;

export function BlastsRacesBoard() {
  const removeOn = categoryRemovalDate("Blasts & Races");

  return (
    <section className="br-board">
      <div className="br-intro">
        <div className="blitz-board__intro">
          <p>Blasts & Races</p>
          <h2>Campaign design system</h2>
          <span>
            Brand foundations, promotional components, engagement patterns, and the editable
            sales-slide templates. This section is removed on 1 June 2027.{" "}
            <a href={`${deckLink}decks/blasts-races`}>Open the Blasts & Races deck</a>
          </span>
        </div>
        {removeOn && <Countdown removeOn={removeOn} />}
      </div>

      <div className="br-chapter">
        <h3>Brand foundations & identity</h3>
        <div className="br-swatches">
          {palette.map(([name, value]) => (
            <div key={name}>
              <span style={{ background: value }} />
              <strong>{name}</strong>
              <code>{value}</code>
            </div>
          ))}
        </div>
        <div className="br-gradients">
          {(
            [
              ["Electric", blastsRaces.electricGradient],
              ["Reward", blastsRaces.rewardGradient],
              ["Glass", blastsRaces.glass],
            ] as const
          ).map(([name, value]) => (
            <div key={name}>
              <span style={{ background: value }} />
              <strong>{name}</strong>
            </div>
          ))}
        </div>
        <div className="br-scale">
          {blastsRaces.spacing.map((value) => (
            <div key={value}>
              <code>{value}</code>
              <span style={{ width: value }} />
            </div>
          ))}
        </div>
        <div className="br-radii">
          {blastsRaces.radii.map((value) => (
            <div key={value}>
              <span style={{ borderRadius: value }} />
              <code>{value}</code>
            </div>
          ))}
        </div>
      </div>

      <div className="br-chapter">
        <h3>Promotional component kit</h3>
        <div className="br-ctas">
          <div>
            <span>Default</span>
            <button type="button" className="br-cta">
              am@playson.com
            </button>
          </div>
          <div>
            <span>Hover</span>
            <button type="button" className="br-cta br-cta--hover">
              am@playson.com
            </button>
          </div>
          <div>
            <span>Focus</span>
            <button type="button" className="br-cta br-cta--focus">
              am@playson.com
            </button>
          </div>
          <div>
            <span>Disabled</span>
            <button type="button" className="br-cta br-cta--disabled" disabled>
              am@playson.com
            </button>
          </div>
        </div>
        <div className="br-meta">
          <span className="br-period">July 2026 - June 2027</span>
          <span className="br-new">New</span>
        </div>
      </div>

      <div className="br-chapter">
        <h3>Engagement & reward patterns</h3>
        <div className="br-cards">
          {mechanics.map(([title, line]) => (
            <article key={title} className="br-card">
              <strong>{title}</strong>
              <p>{line}</p>
            </article>
          ))}
        </div>
        <div className="br-cards">
          {segments.map(([title, line]) => (
            <article key={title} className="br-card">
              <strong>{title}</strong>
              <p>{line}</p>
            </article>
          ))}
        </div>
        <div className="br-rewards">
          {rewards.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>

      <div className="br-chapter">
        <h3>Editable sales-slide templates</h3>
        <div className="br-templates">
          {templates.map(([name, file]) => (
            <figure key={name}>
              <img src={asset(`/blasts-races/${file}`)} alt="" />
              <figcaption>
                <strong>{name}</strong>
                <span>1920 × 1080</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
