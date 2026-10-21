// Invisible until a keyboard user presses Tab, then lets them jump past the menu.
export function SkipLink() {
  return (
    <a
      href="#main"
      className="bg-btn text-btn-fg label-caps sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-3"
    >
      Skip to main content
    </a>
  );
}