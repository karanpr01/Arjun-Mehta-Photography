import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ThemeToggle } from "~/components/layout/ThemeToggle";
import { Container } from "~/components/ui/Container";
import { mainNav } from "~/data/navigation";
import { site } from "~/data/site";

export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the menu whenever the visitor lands on a new page.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  // If the window is widened to desktop size, the menu is no longer needed.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) dialogRef.current?.close();
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => {
          dialogRef.current?.showModal();
          setOpen(true);
        }}
        className="hover:text-accent inline-flex size-11 items-center justify-center transition-colors md:hidden"
      >
        <Menu size={22} strokeWidth={1.25} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        className="bg-bg text-fg m-0 h-dvh max-h-none w-dvw max-w-none overflow-y-auto border-0 p-0 open:flex open:flex-col"
      >
        <Container className="border-line flex items-center justify-between border-b py-4">
          <span className="font-serif text-2xl leading-none">{site.shortName}</span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => dialogRef.current?.close()}
              className="hover:text-accent inline-flex size-11 items-center justify-center transition-colors"
            >
              <X size={22} strokeWidth={1.25} aria-hidden="true" />
            </button>
          </div>
        </Container>

        <Container className="flex flex-1 flex-col justify-between gap-10 py-8">
          <nav aria-label="Mobile">
            <ol>
              {mainNav.map((link, index) => (
                <li key={link.to} className="border-line border-b">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between gap-4 py-5 ${isActive ? "text-accent" : ""}`
                    }
                  >
                    <span>
                      <span className="label-caps text-accent block">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="block font-serif text-4xl leading-tight">{link.label}</span>
                      <span className="text-muted block text-sm">{link.hint}</span>
                    </span>
                    <ArrowRight size={20} strokeWidth={1.25} aria-hidden="true" />
                  </NavLink>
                </li>
              ))}
            </ol>
          </nav>

          <div>
            <Link
              to="/contact"
              className="bg-btn text-btn-fg hover:bg-btn-hover label-caps block px-8 py-4 text-center transition-colors"
            >
              Enquire
            </Link>
            <a href={`mailto:${site.email}`} className="text-muted mt-6 block text-center">
              {site.email}
            </a>
            <p className="mt-4 text-center">
              <Link to="/privacy" className="text-muted hover:text-accent text-sm underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </Container>
      </dialog>
    </>
  );
}