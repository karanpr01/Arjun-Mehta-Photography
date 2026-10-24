// Makes the picture shown when a link to the site is shared (1200 x 630 pixels).
// It crops the hero photo. Run it with:  npm run og

import sharp from "sharp";

const SOURCE = "assets/images-src/hero.jpg";
const TARGET = "public/og-default.jpg";

await sharp(SOURCE)
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(TARGET);

console.log(`Wrote ${TARGET}`);
