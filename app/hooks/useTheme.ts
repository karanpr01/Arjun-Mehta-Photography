import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

// What is the page showing right now? Ask the <html> tag first, then the OS.
function readTheme(): Theme {
    const set = document.documentElement.dataset.theme;
    if(set === "light" || set === "dark") return set;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function useTheme() {
     // null = "not known yet". The server cannot know the visitor's theme,
  // so we only find out after the page loads in the browser.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === "dark" ? "light": "dark";
    document.documentElement.dataset.theme = next;
    try {
        localStorage.setItem("theme", next);
    } catch {
        // Storage can be blocked (private mode). The theme still switches for this visit.
    }
    setTheme(next);
  }, []);

  return {theme, toggle};
}