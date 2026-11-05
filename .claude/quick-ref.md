# Resource Hub quick reference

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run validate:deck
npm run build
npm run preview
npm run export-pdf
```

## Publish a deck

1. Add `src/decks/<name>-deck.ts` typed against `src/deck/schema.ts`.
2. Register it in `src/catalog/registry.ts` with a unique `slug`.
3. Run `npm run validate:deck`.
4. Open `http://127.0.0.1:5173/decks/<slug>`.
5. Push the repository to publish.

Use `status: "draft"` until the deck should appear on the hosted hub.

## Publish a link

1. Add the category in `catalogCategories`. Set `parent` when it belongs under another category.
2. Add the public URL to `catalogLinks`.
3. Push the repository to publish.

Games / Instant Views holds the game Instant View links.

## Local routes

- Hub: `http://127.0.0.1:5173/`
- Promo Tools: `http://127.0.0.1:5173/decks/promo-tools`
- Blitz Mode: `http://127.0.0.1:5173/decks/blitz-mode`
- Blasts & Races: `http://127.0.0.1:5173/decks/blasts-races` (hidden from 1 June 2027, local calendar date)
- Design system (dev only): `http://127.0.0.1:5173/design-system`
- Sync Instant Views and Roadmaps (dev only, local nav button): refreshes those cards from Webflow. The button is not in the GitHub Pages build.
- Archived Promo Tools slides (dev only): `http://127.0.0.1:5173/decks/promo-tools#section=archive`

## Hosting

Push to `main`. GitHub Actions builds `dist` and publishes GitHub Pages at `https://mtheuma-cmd.github.io/playson-resource-hub/`. The workflow sets `VITE_BASE` to the repository name.
