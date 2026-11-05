import { catalog } from "../src/catalog/registry";
import { validateDeck } from "../src/deck/schema";

const failures = catalog.flatMap((entry) =>
  validateDeck(entry.deck).map((error) => `${entry.slug}: ${error}`),
);

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

for (const entry of catalog) {
  console.log(
    `Valid deck: ${entry.deck.meta.title} (${entry.deck.slides.length} slides${
      entry.deck.mobileSlides ? `, ${entry.deck.mobileSlides.length} mobile` : ""
    }, ${entry.status})`,
  );
}
