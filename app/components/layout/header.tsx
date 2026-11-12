import { Link, NavLink } from "react-router";
import { MobileMenu } from "~/components/layout/MobileMenu";
import { ThemeToggle } from "~/components/layout/ThemeToggle";
import { Container } from "~/components/ui/Container";
import { mainNav } from "~/data/navigation";
import { site } from "~/data/site";
import { useHeaderHidden } from "~/hooks/useHeaderHidden";

export function Header() {
  // The header slides away while you read down the page and returns when you scroll up.
  // It always stays visible while anything inside it has keyboard focus.
  const hidden = useHeaderHidden();

  return (
    <header
      className={`bg-veil border-line sticky top-0 z-40 border-b backdrop-blur-md transition-transform duration-300 focus-within:translate-y-0 motion-reduce:transition-none ${hidden ? "-translate-y-full" : ""
        }`}
    >
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link to="/" className="font-serif text-2xl leading-none">
          {site.shortName}
        </Link>

        <div className="flex items-center gap-2 md:gap-6">
          <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
            {mainNav.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `label-caps hover:text-accent transition-colors ${isActive ? "text-accent" : "text-fg"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <ThemeToggle />
          <Link
            to="/contact"
            className="border-line hover:border-accent label-caps hidden border px-4 py-2 transition-colors md:inline-block"
          >
            Enquire
          </Link>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}