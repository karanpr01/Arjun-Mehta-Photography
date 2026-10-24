import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createElement, useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
    children: ReactNode;
    as?: "div" | "ol" | "ul";
    className?: string;
    stagger?: boolean; // true = animate the direct children one after another
};

// Fades and lifts content into place as it scrolls into view.
// Content is fully visible with no JavaScript, and for visitors who ask for reduced motion.
export function Reveal({ children, as = "div", className, stagger = false }: Props) {
    const ref = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const element = ref.current;
            if (!element) return;

            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // Already on screen when the page loaded? Leave it alone, so nothing flickers.
                if (element.getBoundingClientRect().top < window.innerHeight * 0.9) return;

                const targets = stagger ? Array.from(element.children) : element;
                gsap.from(targets, {
                    autoAlpha: 0,
                    y: 28,
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: stagger ? 0.12 : 0,
                    scrollTrigger: { trigger: element, start: "top 88%", once: true },
                });
            });

            return () => mm.revert();
        },
        { scope: ref },
    );

    return createElement(as, { ref, className }, children);
}