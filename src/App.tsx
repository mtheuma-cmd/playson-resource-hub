import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Countdown } from "./catalog/Countdown";
import {
  categoryRemovalDate,
  findVisibleDeck,
  visibleCatalog,
  visibleCatalogLinks,
  type CatalogDeck,
} from "./catalog/registry";
import { DeckPlayer } from "./deck/DeckPlayer";
import type { DeckData } from "./deck/schema";
import { brandAssets } from "./design-system/tokens";
import { asset } from "./lib/asset";
import { deckSlugFromPath, isDesignSystemPath, withBase } from "./lib/routes";
import { HubPage, MissingDeck } from "./pages/HubPage";

const showInternalSections = import.meta.env.DEV;

const archivedSlides = showInternalSections
  ? (await import("./decks/archived-slides")).archivedSlides
  : undefined;

const DesignSystemPage = showInternalSections
  ? lazy(() =>
      import("./pages/DesignSystemPage").then((module) => ({
        default: module.DesignSystemPage,
      })),
    )
  : null;

function SyncWebflowButton() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function sync() {
    setPending(true);
    setMessage("");
    try {
      const response = await fetch("/__hub/sync-webflow", { method: "POST" });
      const body = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !body.ok) {
        setMessage(body.message || "Sync failed");
        setPending(false);
        return;
      }
      window.location.reload();
    } catch {
      setMessage("Sync failed");
      setPending(false);
    }
  }

  return (
    <>
      <button type="button" className="app-nav__link" onClick={() => void sync()} disabled={pending}>
        {pending ? "Syncing…" : "Sync Instant Views and Roadmaps"}
      </button>
      {message && <span className="app-nav__sync-status">{message}</span>}
    </>
  );
}

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const update = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  return pathname;
}

function readSection() {
  return new URLSearchParams(window.location.hash.replace(/^#/, "")).get("section");
}

function useDeckSection() {
  const [section, setSection] = useState(readSection);

  useEffect(() => {
    const update = () => setSection(readSection());
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  return section;
}

function deckWithArchive(entry: CatalogDeck): DeckData {
  if (entry.slug !== "promo-tools" || !archivedSlides) return entry.deck;
  return { ...entry.deck, archivedSlides };
}

function archivedDeck(source: DeckData): DeckData {
  return {
    ...source,
    slides: source.archivedSlides ?? [],
  };
}

export default function App() {
  const pathname = usePathname();
  const section = useDeckSection();
  const slug = deckSlugFromPath(pathname);
  const entry = slug ? findVisibleDeck(slug, showInternalSections) : undefined;
  const isDocs = showInternalSections && isDesignSystemPath(pathname);
  const isDeckRoute = slug !== null;
  const isArchive = Boolean(entry) && showInternalSections && section === "archive";
  const sourceDeck = useMemo(
    () => (entry ? deckWithArchive(entry) : undefined),
    [entry],
  );
  const activeDeck = useMemo(
    () => (sourceDeck && isArchive ? archivedDeck(sourceDeck) : sourceDeck),
    [isArchive, sourceDeck],
  );
  const decks = visibleCatalog(showInternalSections);
  const links = visibleCatalogLinks(showInternalSections);
  const removalDate = entry ? categoryRemovalDate(entry.category) : undefined;

  useEffect(() => {
    const title = entry
      ? `${entry.deck.meta.title} · Resource Hub`
      : isDeckRoute
        ? "Deck not found · Resource Hub"
        : "Playson Resource Hub";
    document.title = title;
  }, [entry, isDeckRoute]);

  useEffect(() => {
    if (!showInternalSections || !sourceDeck) return;
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const slideId = params.get("slide");
    if (!slideId || params.get("section") === "archive") return;
    if (sourceDeck.archivedSlides?.some((slide) => slide.id === slideId)) {
      params.set("section", "archive");
      window.location.hash = params.toString();
    }
  }, [sourceDeck]);

  return (
    <>
      <nav
        className={`app-nav ${isDeckRoute ? "" : "app-nav--hub"}`}
        aria-label="Main navigation"
      >
        <a className="app-nav__brand" href={withBase("/")}>
          <img src={asset(brandAssets.playsonLogoSrc)} alt="Playson" />
          <span>Resource Hub</span>
        </a>
        <div className="app-nav__links">
          {isDeckRoute && removalDate && <Countdown removeOn={removalDate} placement="nav" />}
          {isDeckRoute && (
            <a className="app-nav__cta" href={withBase("/")}>
              Back to home
            </a>
          )}
          {showInternalSections && !isDeckRoute && (
            <>
              <SyncWebflowButton />
              <a
                className="app-nav__link"
                href={withBase("/design-system")}
                aria-current={isDocs ? "page" : undefined}
              >
                Design system
              </a>
            </>
          )}
        </div>
      </nav>
      {isDocs && DesignSystemPage ? (
        <Suspense fallback={null}>
          <DesignSystemPage />
        </Suspense>
      ) : activeDeck ? (
        <DeckPlayer deck={activeDeck} hubHref={withBase("/")} />
      ) : isDeckRoute ? (
        <MissingDeck />
      ) : (
        <HubPage entries={decks} links={links} />
      )}
    </>
  );
}
