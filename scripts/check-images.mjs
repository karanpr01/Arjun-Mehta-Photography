// Checks that every photo the site needs is in assets/images-src/ and big enough.
// Run it with:  npm run images:check

import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "assets/images-src";

// [file name without .jpg, smallest allowed long edge in pixels, where it is used]
const REQUIRED = [
  ["balloons", 2400, "Home slideshow, first slide"],
  ["hero", 2400, "Home slideshow, Solitude gallery"],
  ["solitude", 2400, "Solitude in Cappadocia (main photo)"],
  ["valley", 2400, "Solitude gallery"],
  ["spiti", 2400, "Spiti Solace, Home slideshow"],
  ["velvet", 2400, "Velvet Nocturne, Home slideshow"],
  ["subterr", 2400, "Subterranean Mirage"],
  ["rock", 1600, "Solitude gallery"],
  ["horse", 1600, "Solitude gallery"],
  ["oldman", 1600, "Solitude gallery"],
  ["fort", 1600, "Midnight at the Fort"],
  ["aura", 1600, "Aura of Silk & Stone"],
  ["ghats", 1600, "Varanasi Ghats, Echoes of the Monsoon"],
  ["monolith", 1600, "Monolithic Shadows"],
  ["ceramic", 1600, "The Ceramicist's Hands"],
  ["lookbook", 1600, "Services: Editorial & Fashion"],
  ["portrait2", 1600, "Services: Portraits"],
  ["arch", 1600, "Services: Architecture"],
  ["wedding", 1600, "Services: Weddings"],
  ["portrait", 1600, "Home and About: the photographer"],
  ["portbw", 1600, "About: black and white portrait"],
  ["field", 1600, "About: field note"],
  ["mumbai", 1600, "Contact: studio"],
  ["desk", 1600, "Contact: on location and remote"],
];

const files = (await readdir(SOURCE_DIR)).filter((name) =>
  /\.(jpe?g|png)$/i.test(name),
);
const byId = new Map(files.map((file) => [path.parse(file).name, file]));

let ok = 0;
let small = 0;
let missing = 0;

for (const [id, minEdge, usedFor] of REQUIRED) {
  const file = byId.get(id);
  if (!file) {
    missing += 1;
    console.log(`MISSING  ${id}.jpg`.padEnd(30), `(${usedFor})`);
    continue;
  }
  const meta = await sharp(path.join(SOURCE_DIR, file)).metadata();
  const turned = meta.orientation && meta.orientation >= 5;
  const width = turned ? meta.height : meta.width;
  const height = turned ? meta.width : meta.height;
  const longEdge = Math.max(width, height);
  if (longEdge < minEdge) {
    small += 1;
    console.log(
      `SMALL    ${file}`.padEnd(30),
      `${width}x${height}, wants ${minEdge}+ on the long edge`,
    );
  } else {
    ok += 1;
    console.log(`OK       ${file}`.padEnd(30), `${width}x${height}`);
  }
}

const needed = new Set(REQUIRED.map(([id]) => id));
const extra = files.filter((file) => !needed.has(path.parse(file).name));

console.log(
  `\n${ok} ready, ${small} too small, ${missing} missing, out of ${REQUIRED.length}.`,
);
if (extra.length > 0) {
  console.log(`\nNot used by the site (safe to delete): ${extra.join(", ")}`);
}
