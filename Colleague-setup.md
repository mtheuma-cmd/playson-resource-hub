# Work on the Playson Resource Hub

This is a Vite + React + TypeScript project. The hub lists sales decks. Each deck lives in this same repository.

## 1. Open it in Cursor

1. Install [Cursor](https://cursor.com/download) and sign in.
2. Open this project folder in Cursor.

## 2. Run it locally

You need Node.js 20+ and npm.

```bash
npm install
npm run dev
```

- Resource hub: `http://127.0.0.1:5173/`
- Promo Tools deck: `http://127.0.0.1:5173/decks/promo-tools`
- Design system (local development only): `http://127.0.0.1:5173/design-system`

## 3. What to edit

| Task | File |
| --- | --- |
| Publish or hide a deck | `src/catalog/registry.ts` |
| Promo Tools slide copy | `src/decks/promo-tools-deck.ts` |
| Slide layouts | `src/deck/templates/index.tsx` and `templates.css` |
| Hub page | `src/pages/HubPage.tsx` |
| Mobile / player behaviour | `src/deck/DeckPlayer.tsx` |
| Design-system page | `src/pages/DesignSystemPage.tsx` |

Do not commit `node_modules`, `dist`, credentials, or secrets.

## 4. Publish a deck

Add the deck module under `src/decks/`, then add one published entry in `src/catalog/registry.ts`. Push the repository. The hub shows the new deck after that push. Set `status: "draft"` to keep a deck off the published hub while you work on it locally.

## 5. View without cloning

Once this repository is on GitHub with Pages enabled, the hosted hub is the Pages site for the repo. GitHub Pages deploys from `main` after a push.

## 6. Share your changes

Create a branch, commit, push, and open a pull request against `main`. If GitHub asks for a verified commit, run `1auth --secure-my-git` on your machine (Playson 1Password signing).
