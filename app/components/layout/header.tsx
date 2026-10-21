import { Link, NavLink } from "react-router";
import { Container } from "~/components/ui/Container";
import { site } from "~/data/site";

const links = [
  { to: "/portfolio", label: "Work" },
  { to: "/services", label: "Services & Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="bg-veil border-line sticky top-0 z-40 border-b backdrop-blur-md">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
        <Link to="/" className="font-serif text-2xl leading-none">
          {site.shortName}
        </Link>

        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {links.map((link) => (
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
          <Link
            to="/contact"
            className="border-line hover:border-accent label-caps border px-4 py-2 transition-colors"
          >
            Enquire
          </Link>
        </nav>
      </Container>
    </header>
  );
}