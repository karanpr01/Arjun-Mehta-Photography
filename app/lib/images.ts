import manifest from "~/data/imageManifest.json";

type ImageEntry = { width: number; height: number; widths: number[] };
const images = manifest as Record<string, ImageEntry>;

// The path of a photo's JPG that is closest to (but not bigger than) the wanted width.
// Returns undefined if the photo has not been processed yet.
export function jpgPath(id: string, wantedWidth: number): string | undefined {
  const entry = images[id];
  if (!entry) return undefined;
  const fitting = entry.widths.filter((width) => width <= wantedWidth);
  const width =
    fitting.length > 0 ? fitting[fitting.length - 1] : entry.widths[0];
  return `/images/${id}-${width}.jpg`;
}
