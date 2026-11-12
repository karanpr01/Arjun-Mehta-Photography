import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = { children: ReactNode; className?: string };

// A frame whose picture drifts slowly against the scroll. The picture is a little larger than the
// frame so its edges never show. With reduced motion it stays still and the extra size is removed.
export function Parallax({ children, className = "" }: Props) {
    const frame = useRef<HTMLDivElement>(null);
    const picture = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const box = frame.current;
            const target = picture.current;
            if (!box || !target) return;

            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.fromTo(
                    target,
                    { yPercent: -7 },
                    {
                        yPercent: 7,
                        ease: "none",
                        scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: true },
                    },
                );
            });

            return () => mm.revert();
        },
        { scope: frame },
    );

    return (
        <div ref={frame} className={`overflow-hidden ${className}`}>
            <div ref={picture} className="h-full w-full motion-safe:scale-[1.16]">
                {children}
            </div>
        </div>
    );
}