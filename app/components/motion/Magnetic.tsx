import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP);

type Props = { children: ReactNode; strength?: number };

// Makes a button lean a little toward the pointer, then settle back when it leaves.
// It only runs on devices with a real mouse, and never for visitors who prefer reduced motion.
export function Magnetic({ children, strength = 0.35 }: Props) {
    const outer = useRef<HTMLSpanElement>(null);
    const inner = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const box = outer.current;
            const target = inner.current;
            if (!box || !target) return;

            const mm = gsap.matchMedia();
            mm.add(
                "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
                () => {
                    const moveX = gsap.quickTo(target, "x", { duration: 0.5, ease: "power3.out" });
                    const moveY = gsap.quickTo(target, "y", { duration: 0.5, ease: "power3.out" });

                    const onMove = (event: PointerEvent) => {
                        // The outer box never moves, so the centre we measure is always stable.
                        const rect = box.getBoundingClientRect();
                        moveX((event.clientX - (rect.left + rect.width / 2)) * strength);
                        moveY((event.clientY - (rect.top + rect.height / 2)) * strength);
                    };
                    const onLeave = () => {
                        moveX(0);
                        moveY(0);
                    };

                    box.addEventListener("pointermove", onMove);
                    box.addEventListener("pointerleave", onLeave);
                    return () => {
                        box.removeEventListener("pointermove", onMove);
                        box.removeEventListener("pointerleave", onLeave);
                    };
                },
            );

            return () => mm.revert();
        },
        { scope: outer },
    );

    return (
        <span ref={outer} className="inline-block">
            <span ref={inner} className="inline-block">
                {children}
            </span>
        </span>
    );
}