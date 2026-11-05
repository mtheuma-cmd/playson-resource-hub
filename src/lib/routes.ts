export function withBase(path: string) {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const trimmed = path.replace(/^\//, "");
  return trimmed ? `${base}${trimmed}` : base;
}

function pathWithoutBase(pathname: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (!base || !pathname.startsWith(base)) return pathname;
  const rest = pathname.slice(base.length);
  return rest.startsWith("/") ? rest : `/${rest}`;
}

export function isDesignSystemPath(pathname: string) {
  return pathWithoutBase(pathname).replace(/\/$/, "") === "/design-system";
}

export function deckSlugFromPath(pathname: string) {
  const match = pathWithoutBase(pathname)
    .replace(/\/$/, "")
    .match(/^\/decks\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}
