import { readFileSync, renameSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const siteId = "677bda6af407d3b963833347";
const instantViewsId = "68f9f6f2873523313594b281";
const gamesId = "67cb5de8ca05936bbd5efbf9";
const api = "https://api.webflow.com/v2";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const token = process.env.WEBFLOW_API_TOKEN;
if (!token) {
  console.error("The local hub cannot reach Webflow yet. Add the Webflow API token through 1Password, then try again.");
  process.exit(2);
}

async function webflow(path) {
  const response = await fetch(`${api}${path}`, {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Webflow returned ${response.status} for ${path.split("?")[0]}`);
  }
  return response.json();
}

async function listAll(path) {
  const rows = [];
  let offset = 0;
  for (;;) {
    const joiner = path.includes("?") ? "&" : "?";
    const page = await webflow(`${path}${joiner}limit=100&offset=${offset}`);
    rows.push(...(page.items ?? page.pages ?? []));
    const total = page.pagination?.total ?? rows.length;
    offset += 100;
    if (offset >= total) return rows;
  }
}

function clean(value) {
  return String(value ?? "")
    .replace(/[\u2028\u2029]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstSentence(value) {
  const text = clean(value);
  const match = text.match(/^.*?[.!]/);
  return match ? match[0] : text;
}

function releaseLabel(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getUTCDate()} ${months[date.getUTCMonth()]} Release`;
}

function quote(value) {
  return JSON.stringify(value);
}

function render(link) {
  return `  {
    id: ${quote(link.id)},
    title: ${quote(link.title)},
    summary: ${quote(link.summary)},
    category: ${quote(link.category)},
    href: ${quote(link.href)},
    meta: ${quote(link.meta)},
    action: "Open",
    status: "published",
  },`;
}

function instantViewTitle(item, mechanics) {
  const fields = item.fieldData ?? {};
  const title = clean(fields["main-title"] || fields.name);
  const mechanic = mechanics.get(fields["game-mechanic"]);
  if (mechanic && !title.toLowerCase().includes(mechanic.toLowerCase())) {
    return `${title}: ${mechanic}`;
  }
  return title;
}

async function instantViews() {
  const collection = await webflow(`/collections/${instantViewsId}`);
  const mechanicField = (collection.fields ?? []).find((field) => field.slug === "game-mechanic");
  const mechanics = new Map(
    (mechanicField?.validations?.options ?? []).map((option) => [option.id, option.name]),
  );
  const games = await listAll(`/collections/${gamesId}/items`);
  const released = new Map(games.map((game) => [game.id, game.fieldData?.released]));
  const items = await listAll(`/collections/${instantViewsId}/items`);
  return items
    .filter((item) => !item.isDraft && !item.isArchived && item.lastPublished)
    .sort((left, right) => String(right.lastPublished).localeCompare(String(left.lastPublished)))
    .map((item) => {
      const fields = item.fieldData ?? {};
      const summary = firstSentence(fields["game-description"]) || instantViewTitle(item, mechanics);
      const meta = releaseLabel(released.get(fields.game)) || "";
      return {
        id: fields.slug,
        title: instantViewTitle(item, mechanics),
        summary,
        category: "Instant Views",
        href: `https://more.playson.com/instant-views/${fields.slug}`,
        meta,
      };
    });
}

async function roadmapCopy(url) {
  const response = await fetch(url);
  if (!response.ok) return null;
  const html = await response.text();
  const text = clean(html.replace(/<[^>]+>/g, " "));
  const match = text.match(
    /(Q\d 2026 Games Roadmap(?: Greece)?) ((?:January|February|March|April|May|June|July|August|September|October|November|December) - (?:January|February|March|April|May|June|July|August|September|October|November|December))/,
  );
  if (!match) return null;
  return { title: match[1], summary: match[2] };
}

async function roadmaps() {
  const pages = await listAll(`/sites/${siteId}/pages`);
  const published = pages
    .filter(
      (page) =>
        !page.draft &&
        !page.archived &&
        typeof page.publishedPath === "string" &&
        page.publishedPath.startsWith("/roadmaps/2026/"),
    )
    .sort((left, right) => left.publishedPath.localeCompare(right.publishedPath));
  const links = [];
  for (const page of published) {
    const href = `https://more.playson.com${page.publishedPath}`;
    const copy = await roadmapCopy(href);
    const slug = page.publishedPath.split("/").filter(Boolean).at(-1);
    links.push({
      id: slug,
      title: copy?.title ?? clean(page.title),
      summary: copy?.summary ?? "2026",
      category: "Roadmaps",
      href,
      meta: "2026",
    });
  }
  return links;
}

const links = [...(await instantViews()), ...(await roadmaps())];
const registryPath = resolve("src/catalog/registry.ts");
const source = readFileSync(registryPath, "utf8");
const start = source.indexOf("// @webflow-sync start\n");
const end = source.indexOf("// @webflow-sync end\n");
if (start < 0 || end < 0 || end < start) {
  throw new Error("Webflow sync markers are missing from the catalog");
}
const block = `// @webflow-sync start
export const catalogLinks: CatalogLink[] = [
${links.map(render).join("\n")}
];
`;
const next = `${source.slice(0, start)}${block}${source.slice(end)}`;
const temporary = `${registryPath}.tmp`;
writeFileSync(temporary, next);
renameSync(temporary, registryPath);
console.log(JSON.stringify({ ok: true, count: links.length }));
