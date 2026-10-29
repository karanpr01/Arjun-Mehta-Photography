import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { Lightbox } from "~/components/gallery/Lightbox";
import { ResponsiveImage } from "~/components/gallery/ResponsiveImage";
import type { ProjectImage } from "~/data/projects";

type Props = {
    images: ProjectImage[];
    captions?: boolean; // show the plate number, title, camera settings and note under each photo
};

const enlargeHint =
    "bg-veil text-fg absolute right-3 bottom-3 inline-flex size-10 items-center justify-center";

function Caption({ image }: { image: ProjectImage }) {
    if (!image.plate && !image.title) return null;
    return (
        <figcaption className="mt-4 space-y-2">
            <p className="label-caps flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <span className="text-accent">
                    Plate {image.plate} // {image.title}
                </span>
                {image.time && <span className="text-muted">{image.time}</span>}
            </p>
            {image.note && <p className="text-muted max-w-xl text-sm">{image.note}</p>}
            {image.kit && <p className="label-caps text-muted">{image.kit}</p>}
        </figcaption>
    );
}

export function ProjectGallery({ images, captions = false }: Props) {
    // null = viewer closed. A number = viewer open on that photo.
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [lead, ...rest] = images;

    if (!lead) return null;

    return (
        <>
            <figure>
                <div className="flex justify-center">
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
                </div>
                {captions && <Caption image={lead} />}
            </figure>

            {rest.length > 0 && (
                <ul className="mt-14 grid items-start gap-x-8 gap-y-14 md:grid-cols-2">
                    {rest.map((image, i) => (
                        <li key={image.id}>
                            <figure>
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
                                {captions && <Caption image={image} />}
                            </figure>
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