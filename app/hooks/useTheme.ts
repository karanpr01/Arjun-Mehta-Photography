import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

// What is the page showing right now? Ask the <html> tag first, then the OS.
function readTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

// React calls this to be told when the theme changes: either the data-theme
// attribute on <html> changes, or the visitor's OS setting changes.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const media = window.matchMedia("(prefers-color-scheme: light)");
  media.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

// On the server we cannot know the visitor's theme, so we answer "unknown".
function getServerSnapshot(): Theme | null {
  return null;
}

export function useTheme() {
  // Every component that calls useTheme() reads the same single source of truth:
  // the <html data-theme> attribute. So two toggles on screen never disagree.
  const theme = useSyncExternalStore<Theme | null>(subscribe, readTheme, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private mode). The theme still switches for this visit.
    }
  }, []);

  return { theme, toggle };
}