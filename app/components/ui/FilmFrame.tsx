import { useState } from "react";

// A decorative "missing film frame". The focus ring follows the pointer, like a viewfinder.
// It is purely for atmosphere, so screen readers skip it.
export function FilmFrame() {
    const [point, setPoint] = useState({ x: 50, y: 50 });

    return (
        <div
            aria-hidden="true"
            onPointerMove={(event) => {
                const box = event.currentTarget.getBoundingClientRect();
                setPoint({
                    x: ((event.clientX - box.left) / box.width) * 100,
                    y: ((event.clientY - box.top) / box.height) * 100,
                });
            }}
            className="text-on-image relative aspect-4/3 w-full overflow-hidden border border-[#2c2c2c] bg-[#0b0b0b] select-none"
        >
            {/* Film edge markings */}
            <div className="label-caps text-on-image/60 absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3">
                <span>Tri-X 400</span>
                <span className="text-on-image-accent">Frame (missing)</span>
                <span>ISO 400</span>
            </div>

            {/* The big number */}
            <p className="text-on-image/15 absolute inset-0 flex items-center justify-center font-serif text-[clamp(6rem,18vw,12rem)] leading-none">
                404
            </p>

            {/* The viewfinder: a ring and a dot that follow the pointer */}
            <div
                className="absolute size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-on-image-accent/70 motion-safe:transition-[left,top] motion-safe:duration-300 motion-safe:ease-out"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
                <span className="absolute top-1/2 left-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-on-image-accent" />
            </div>

            <div className="label-caps text-on-image/60 absolute inset-x-0 bottom-0 flex items-end justify-between px-4 py-3">
                <span>
                    <span className="text-on-image-accent block">Void exposure</span>
                    <span className="font-serif text-xl tracking-normal normal-case">Frame #404</span>
                </span>
                <span>Darkroom slip B-12</span>
            </div>
        </div>
    );
}