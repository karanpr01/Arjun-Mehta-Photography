import { Moon, Sun } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme ? `Switch to ${next} theme` : "Switch theme"}
      className="hover:text-accent inline-flex size-11 items-center justify-center transition-colors"
    >
      {theme === "dark" && <Sun size={18} strokeWidth={1.25} aria-hidden="true" />}
      {theme === "light" && <Moon size={18} strokeWidth={1.25} aria-hidden="true" />}
    </button>
  );
}