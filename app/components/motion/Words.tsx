import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    cloneElement,
    createElement,
    isValidElement,
    useRef,
    type ReactElement,
    type ReactNode,
} from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Turns text into words, each wrapped so it can slide up out of a hidden strip.
// Spaces stay as real text between the words, so screen readers still read it normally.
function split(node: ReactNode, path = "w"): ReactNode {
    if (typeof node === "string") {
        return node.split(/(\s+)/).map((part, index) =>
            part === "" || /^\s+$/.test(part) ? (
                part
            ) : (
                <span key={`${path}-${index}`} className="word">
                    <span className="word-inner">{part}</span>
                </span>
            ),
        );
    }
    if (Array.isArray(node)) {
        return node.map((child, index) => split(child, `${path}-${index}`));
    }
    if (isValidElement(node)) {
        const element = node as ReactElement<{ children?: ReactNode }>;
        return cloneElement(element, { key: path }, split(element.props.children, path));
    }
    return node;
}

type Props = {
    as?: "h1" | "h2" | "p";
    id?: string;
    className?: string;
    children: ReactNode;
    trigger?: "load" | "scroll"; // "load" plays when the page is ready, "scroll" when it comes into view
    delay?: number;
};

// A heading whose words rise into place. Fully readable with no JavaScript and for
// visitors who ask for reduced motion (the hidden starting look is set in app.css).
export function Words({
    as = "h2",
    id,
    className,
    children,
    trigger = "scroll",
    delay = 0,
}: Props) {
    const ref = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const element = ref.current;
            if (!element) return;

            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // On the first visit the entry curtain covers the page, so wait for it to lift.
                const curtainWait =
                    trigger === "load" && document.documentElement.classList.contains("show-curtain")
                        ? 1.9
                        : 0;

                gsap.fromTo(
                    element.querySelectorAll(".word-inner"),
                    { yPercent: 110 },
                    {
                        yPercent: 0,
                        duration: 1,
                        ease: "power4.out",
                        stagger: 0.06,
                        delay: delay + curtainWait,
                        scrollTrigger:
                            trigger === "scroll" ? { trigger: element, start: "top 88%", once: true } : undefined,
                    },
                );
            });

            return () => mm.revert();
        },
        { scope: ref },
    );

    return createElement(as, { ref, id, className, "data-words": "" }, split(children));
}