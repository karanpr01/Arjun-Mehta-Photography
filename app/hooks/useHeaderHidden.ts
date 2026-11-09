import { useEffect, useState } from "react";

// true while the visitor is scrolling DOWN the page, false when scrolling up or near the top.
export function useHeaderHidden(): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let waiting = false;

    const update = () => {
      const y = window.scrollY;
      const change = y - last;
      if (y < 120) {
        setHidden(false);
        last = y;
      } else if (change > 8) {
        setHidden(true);
        last = y;
      } else if (change < -8) {
        setHidden(false);
        last = y;
      }
      waiting = false;
    };

    const onScroll = () => {
      if (waiting) return;
      waiting = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}
