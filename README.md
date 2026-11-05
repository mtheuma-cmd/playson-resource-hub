# Playson Resource Hub

A catalog of Playson sales decks. Each deck is a typed module in this repository. Register it in the catalog and push the repository to publish it on the hub.

## Run locally

```bash
npm install
npm run dev
```

- Resource hub: `http://127.0.0.1:5173/`
- Promo Tools deck: `http://127.0.0.1:5173/decks/promo-tools`
- Design-system reference (local development only): `http://127.0.0.1:5173/design-system`

## Publish a deck

1. Add the deck module under `src/decks/`. Copy `src/decks/promo-tools-deck.ts` as the starting point.
2. Keep the content typed against the slide variants in `src/deck/schema.ts`.
3. Add one entry to `src/catalog/registry.ts` with a `slug`, a `category`, a short `summary`, `status: "published"`, and the deck. Each entry is one card.
4. Push this repository. The hub lists every published entry. Draft entries (`status: "draft"`) appear only while `npm run dev` is running.

Open a deck at `/decks/<slug>`. Deep-link a slide with `/decks/<slug>#slide=<id>`.

Available templates:

- `cover`
- `section`
- `metrics`
- `insight`
- `resources`
- `roadmap`
- `ranking`
- `comparison`
- `index`
- `card-grid`
- `process`
- `tool-overview`
- `tool-player`
- `tool-config`
- `contact`
- `closing`

Each slide needs a unique `id`. The deck player supports arrow keys, Page Up/Down, Space,
Home/End, fullscreen, and a Hub control back to the catalog. Desktop slides use a
1440×810 canvas; screens up to 700px use an exact 9:16 portrait layout with touch controls, stacked
content, dedicated mobile comparison layouts, and automatic fitting without vertical scrolling.

## Share a hosted link

The local preview (`http://127.0.0.1:5173/`) only works on this machine. To send colleagues a
link, push this repo to GitHub and enable GitHub Pages. The site publishes to:

`https://<org>.github.io/<repo>/`

That Pages site should stay **private** (INTERNAL sales content). Colleagues with GitHub access
to the repo can open it.

## Pattern library

The design-system reference includes `PlaysonBackground`, resource tiles, release
cards, recommendation callouts, chart legends, roadmap steppers, ranked list rows, and comparison tables. See the
[pattern library](docs/pattern-library.md) for usage and content-handling guidance.

## Commands

```bash
npm run dev
npm run typecheck
npm run validate:deck
npm run build
npm run preview
npm run export-pdf
```

`npm run validate:deck` checks every deck in the catalog. The final slide of a deck downloads its
landscape desktop PDF when that deck includes one. Refresh
`public/playson-power-pack-sales-deck.pdf` with `npm run export-pdf` after Promo Tools slide or styling
changes.
