import manifest from "~/data/imageManifest.json";

type ImageEntry = { width: number; height: number; widths: number[] };
const images = manifest as Record<string, ImageEntry>;

type Props = {
  id: string; // the photo's file name without ".jpg", e.g. "hero"
  alt: string; // describes the photo for people who can't see it
  sizes: string; // how wide the image appears on screen, so the browser picks the right file
  priority?: boolean; // true ONLY for the big image at the top of a page
  className?: string;
};

export function ResponsiveImage({ id, alt, sizes, priority = false, className = "" }: Props) {
  const entry = images[id];

  // If the file hasn't been added yet, show a clear box instead of a broken image.
  if (!entry) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-surface border-line flex aspect-3/2 items-center justify-center border ${className}`}
      >
        <span className="label-caps text-muted">Missing image: {id}</span>
      </div>
    );
  }

  const srcSet = (ext: string) =>
    entry.widths.map((w) => `/images/${id}-${w}.${ext} ${w}w`).join(", ");
  const largest = entry.widths[entry.widths.length - 1];

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`/images/${id}-${largest}.jpg`}
        srcSet={srcSet("jpg")}
        sizes={sizes}
        width={entry.width}
        height={entry.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={className}
      />
    </picture>
  );
}