// Turns every photo in assets/images-src/ into several sizes and formats in public/images/,
// and writes app/data/imageManifest.json so the site knows each image's shape.
// Run it with:  npm run images

import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "assets/images-src";
const OUTPUT_DIR = "public/images";
const MANIFEST_FILE = "app/data/imageManifest.json";

const SIZES = [480, 800, 1200, 1600, 2400]; // widths in pixels
const MAX_WIDTH = 2400;

const FORMATS = {
  avif: (image) => image.avif({ quality: 55 }),
  webp: (image) => image.webp({ quality: 76 }),
  jpg: (image) => image.jpeg({ quality: 78, mozjpeg: true }),
};

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = (await readdir(SOURCE_DIR)).filter((name) => /\.(jpe?g|png)$/i.test(name));
  if (files.length === 0) {
    console.log(`No photos found in ${SOURCE_DIR}/ yet.`);
    return;
  }

  const manifest = {};

  for (const file of files.sort()) {
    const id = path.parse(file).name;
    const sourcePath = path.join(SOURCE_DIR, file);

    // Phones store "rotate me" in the file. Respect it, or portrait photos come out sideways.
    const meta = await sharp(sourcePath).metadata();
    const turned = meta.orientation && meta.orientation >= 5;
    const sourceWidth = turned ? meta.height : meta.width;
    const sourceHeight = turned ? meta.width : meta.height;

    // Never enlarge a photo: a 1000px photo must not get a 2400px version.
    const widths = [
      ...new Set([...SIZES.filter((w) => w < sourceWidth), Math.min(sourceWidth, MAX_WIDTH)]),
    ].sort((a, b) => a - b);

    const largest = widths[widths.length - 1];
    manifest[id] = {
      width: largest,
      height: Math.round((largest * sourceHeight) / sourceWidth),
      widths,
    };

    const sourceTime = (await stat(sourcePath)).mtimeMs;
    let made = 0;

    for (const width of widths) {
      for (const [ext, encode] of Object.entries(FORMATS)) {
        const target = path.join(OUTPUT_DIR, `${id}-${width}.${ext}`);
        if ((await exists(target)) && (await stat(target)).mtimeMs > sourceTime) continue; // already up to date
        const image = sharp(sourcePath).rotate().resize({ width, withoutEnlargement: true });
        await encode(image).toFile(target);
        made += 1;
      }
    }

    console.log(`${id}: ${sourceWidth}x${sourceHeight} -> widths ${widths.join(", ")} (${made} new files)`);
  }

  await writeFile(MANIFEST_FILE, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\nWrote ${MANIFEST_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});