import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { Lightbox } from "~/components/gallery/Lightbox";
import { ResponsiveImage } from "~/components/gallery/ResponsiveImage";
import type { ProjectImage } from "~/data/projects";

type Props = { images: ProjectImage[] };

const enlargeHint =
    "bg-veil text-fg absolute right-3 bottom-3 inline-flex size-10 items-center justify-center";

export function ProjectGallery({ images }: Props) {
    // null = viewer closed. A number = viewer open on that photo.
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [lead, ...rest] = images;

    if (!lead) return null;

    return (
        <>
            <figure className="flex justify-center">
                <button
                    type="button"
                    onClick={() => setOpenIndex(0)}
                    aria-label={`View larger: ${lead.alt}`}
                    className="relative inline-block max-w-full cursor-zoom-in"
                >
                    <ResponsiveImage
                        id={lead.id}
                        alt={lead.alt}
                        sizes="(min-width: 1440px) 1312px, 100vw"
                        priority
                        className="h-auto max-h-[85svh] w-auto max-w-full"
                    />
                    <span className={enlargeHint} aria-hidden="true">
                        <Maximize2 size={16} strokeWidth={1.5} />
                    </span>
                </button>
            </figure>

            {rest.length > 0 && (
                <ul className="mt-10 grid gap-6 md:grid-cols-2">
                    {rest.map((image, i) => (
                        <li key={image.id}>
                            <button
                                type="button"
                                onClick={() => setOpenIndex(i + 1)}
                                aria-label={`View larger: ${image.alt}`}
                                className="relative block w-full cursor-zoom-in"
                            >
                                <ResponsiveImage
                                    id={image.id}
                                    alt={image.alt}
                                    sizes="(min-width: 1440px) 636px, (min-width: 768px) 50vw, 100vw"
                                    className="h-auto w-full"
                                />
                                <span className={enlargeHint} aria-hidden="true">
                                    <Maximize2 size={16} strokeWidth={1.5} />
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <Lightbox
                images={images}
                index={openIndex ?? 0}
                open={openIndex !== null}
                onClose={() => setOpenIndex(null)}
                onIndexChange={setOpenIndex}
            />
        </>
    );
}