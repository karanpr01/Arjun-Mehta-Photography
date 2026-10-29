import { useState } from "react";
import { ResponsiveImage } from "~/components/gallery/ResponsiveImage";
import { archive } from "~/data/archive";

// A table of earlier work. On devices with a mouse, a small preview photo follows the pointer.
// The preview is decoration only: everything it shows is also in the table.
export function ArchiveIndex() {
    const [preview, setPreview] = useState<string | null>(null);
    const [point, setPoint] = useState({ x: 0, y: 0 });

    return (
        <div
            onMouseMove={(event) => setPoint({ x: event.clientX, y: event.clientY })}
            onMouseLeave={() => setPreview(null)}
        >
            <div className="overflow-x-auto">
                <table className="w-full min-w-160 border-collapse text-left">
                    <caption className="sr-only">Archive of earlier work</caption>
                    <thead>
                        <tr className="label-caps text-muted border-line border-b">
                            <th scope="col" className="py-3 pr-4 font-normal">
                                No.
                            </th>
                            <th scope="col" className="py-3 pr-4 font-normal">
                                Project
                            </th>
                            <th scope="col" className="py-3 pr-4 font-normal">
                                Category
                            </th>
                            <th scope="col" className="py-3 pr-4 font-normal">
                                Client
                            </th>
                            <th scope="col" className="py-3 font-normal">
                                Year
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {archive.map((row) => (
                            <tr
                                key={row.no}
                                onMouseEnter={() => setPreview(row.image)}
                                className="border-line hover:bg-surface border-b transition-colors"
                            >
                                <td className="label-caps text-accent py-4 pr-4">{row.no}</td>
                                <th scope="row" className="py-4 pr-4 font-serif text-xl font-normal">
                                    {row.title}
                                </th>
                                <td className="text-muted py-4 pr-4 text-sm">{row.category}</td>
                                <td className="text-muted py-4 pr-4 text-sm">{row.client}</td>
                                <td className="label-caps text-muted py-4">{row.year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-muted mt-4 text-sm">
                Hover a row to preview. The full archive is available on request.
            </p>

            {preview && (
                <div
                    aria-hidden="true"
                    className="border-line pointer-events-none fixed z-50 hidden h-85 w-65 overflow-hidden border [@media(hover:hover)]:block"
                    style={{ left: point.x + 24, top: point.y - 170 }}
                >
                    <ResponsiveImage
                        id={preview}
                        alt=""
                        sizes="260px"
                        className="h-full w-full object-cover"
                    />
                </div>
            )}
        </div>
    );
}