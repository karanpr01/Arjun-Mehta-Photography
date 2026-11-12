import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = { value: number; suffix?: string };

// A number that counts up from zero when it scrolls into view.
// Screen readers get the final number straight away, never the counting.
// With no JavaScript, or reduced motion, the final number simply sits there.
export function CountUp({ value, suffix = "" }: Props) {
    const text = `${value}${suffix}`;
    const ref = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const element = ref.current;
            if (!element?.firstChild) return;
            const node = element.firstChild;

            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const counter = { n: 0 };
                node.nodeValue = `0${suffix}`;
                gsap.set(element, { visibility: "visible" });

                gsap.to(counter, {
                    n: value,
                    duration: 1.6,
                    ease: "power2.out",
                    scrollTrigger: { trigger: element, start: "top 92%", once: true },
                    onUpdate: () => {
                        node.nodeValue = `${Math.round(counter.n)}${suffix}`;
                    },
                });

                // If the animation is ever undone, put the real number back.
                return () => {
                    node.nodeValue = text;
                };
            });

            return () => mm.revert();
        },
        { scope: ref, dependencies: [value, suffix] },
    );

    return (
        <>
            <span ref={ref} aria-hidden="true" data-countup="">
                {text}
            </span>
            <span className="sr-only">{text}</span>
        </>
    );
}