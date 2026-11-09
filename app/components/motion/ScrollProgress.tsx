import { useEffect, useRef } from "react";

// A thin line at the very top of the screen that fills as you scroll down the page.
// It is decoration only, so screen readers skip it.
export function ScrollProgress() {
    const bar = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let waiting = false;

        const update = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
            if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
            waiting = false;
        };

        const onScroll = () => {
            if (waiting) return;
            waiting = true;
            window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <div
            ref={bar}
            aria-hidden="true"
            className="bg-accent pointer-events-none fixed top-0 left-0 z-60 h-0.5 w-full origin-left scale-x-0"
        />
    );
}