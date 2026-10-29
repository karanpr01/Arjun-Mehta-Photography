import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { ResponsiveImage } from "~/components/gallery/ResponsiveImage";
import type { ProjectImage } from "~/data/projects";

type Props = {
    images: ProjectImage[];
    index: number;
    open: boolean;
    onClose: () => void;
    onIndexChange: (index: number) => void;
};

const iconButton =
    "inline-flex size-12 items-center justify-center transition-colors hover:text-on-image-accent";

export function Lightbox({ images, index, open, onClose, onIndexChange }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const many = images.length > 1;
    const image = images[index];

    // Open or close the native dialog to match the "open" prop.
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    function go(step: number) {
        onIndexChange((index + step + images.length) % images.length);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
        if (!many) return;
        if (event.key === "ArrowRight") {
            event.preventDefault();
            go(1);
        }
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            go(-1);
        }
    }

    return (
        <dialog
            ref={dialogRef}
            aria-label="Image viewer"
            onClose={onClose}
            onKeyDown={handleKeyDown}
            // Clicking the dark area around the photo (the dialog itself) closes the viewer.
            onClick={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
            className="text-on-image m-0 h-dvh max-h-none w-dvw max-w-none overflow-y-auto border-0 bg-[#050505]/95 p-4 backdrop:bg-transparent open:flex"
        >
            <button
                type="button"
                aria-label="Close image viewer"
                onClick={onClose}
                className={`${iconButton} absolute top-4 right-4`}
            >
                <X size={24} strokeWidth={1.25} aria-hidden="true" />
            </button>

            {/* Photos are only put in the page while the viewer is open, so closed viewers load nothing. */}
            {open && image && (
                <div className="m-auto flex max-h-full max-w-full flex-col items-center gap-4">
                    <ResponsiveImage
                        key={image.id}
                        id={image.id}
                        alt={image.alt}
                        sizes="100vw"
                        priority
                        className="h-auto max-h-[62svh] w-auto max-w-full object-contain"
                    />
                    {(image.title || image.note) && (
                        <div className="max-w-2xl text-center">
                            <p className="label-caps text-on-image-accent">
                                {image.plate ? `Plate ${image.plate} // ` : ""}
                                {image.title}
                            </p>
                            {image.time && <p className="label-caps text-on-image/70 mt-1">{image.time}</p>}
                            {image.note && <p className="text-on-image/85 mt-3 text-sm">{image.note}</p>}
                            {image.kit && <p className="label-caps text-on-image/60 mt-3">{image.kit}</p>}
                        </div>
                    )}

                    {many && (
                        <div className="flex items-center gap-4">
                            <button type="button" aria-label="Previous image" onClick={() => go(-1)} className={iconButton}>
                                <ChevronLeft size={24} strokeWidth={1.25} aria-hidden="true" />
                            </button>
                            <p aria-live="polite" className="label-caps min-w-28 text-center">
                                Image {index + 1} of {images.length}
                            </p>
                            <button type="button" aria-label="Next image" onClick={() => go(1)} className={iconButton}>
                                <ChevronRight size={24} strokeWidth={1.25} aria-hidden="true" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </dialog>
    );
}