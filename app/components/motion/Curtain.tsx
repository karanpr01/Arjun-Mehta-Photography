import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { site } from "~/data/site";

gsap.registerPlugin(useGSAP);

// The entry curtain: the name, a counter and a line, then the whole panel slides up.
// It only shows when the page's head script added the "show-curtain" class, so it is skipped on
// later visits in the same session, away from the Home page, and for reduced motion.
// If anything goes wrong, a CSS failsafe in app.css hides it after four seconds.
export function Curtain() {
    const root = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const html = document.documentElement;
            const panel = root.current;
            if (!panel || !html.classList.contains("show-curtain")) return;

            const count = panel.querySelector<HTMLElement>("[data-count]");
            const line = panel.querySelector<HTMLElement>("[data-line]");
            const name = panel.querySelector<HTMLElement>("[data-name]");
            const progress = { value: 0 };

            const timeline = gsap.timeline({
                onComplete: () => {
                    try {
                        sessionStorage.setItem("curtain", "1");
                    } catch {
                        // Storage can be blocked. The curtain may then show again on the next visit.
                    }
                    html.classList.remove("show-curtain");
                },
            });

            timeline
                .fromTo(
                    name,
                    { autoAlpha: 0, y: 16 },
                    { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
                    0,
                )
                .to(
                    progress,
                    {
                        value: 100,
                        duration: 1.1,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            if (count) count.textContent = String(Math.round(progress.value)).padStart(3, "0");
                        },
                    },
                    0,
                )
                .to(line, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0)
                .to(panel, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, 1.3);
        },
        { scope: root },
    );

    return (
        <div
            ref={root}
            aria-hidden="true"
            className="curtain text-on-image fixed inset-0 z-100 bg-[#050505]"
        >
            <div className="grid h-full place-items-center">
                <div className="w-[min(22rem,80vw)] text-center">
                    <p data-name className="font-serif text-4xl">
                        {site.shortName}
                    </p>
                    <p className="label-caps text-on-image-accent mt-3">{site.role}</p>
                    <div className="bg-on-image/20 mt-10 h-px w-full">
                        <div data-line className="bg-on-image-accent h-px origin-left scale-x-0" />
                    </div>
                    <p data-count className="label-caps mt-3 text-right tabular-nums">
                        000
                    </p>
                </div>
            </div>
        </div>
    );
}