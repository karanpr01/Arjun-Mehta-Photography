import { Link } from "react-router";
import { Container } from "~/components/ui/Container";
import { site } from "~/data/site";

const indexLinks = [
  { to: "/portfolio", label: "Work" },
  { to: "/services", label: "Services & Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy", label: "Privacy Policy" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-line border-t">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-serif text-3xl">{site.name}</p>
            <p className="text-muted mt-4 max-w-sm">{site.tagline}</p>
            <p className="label-caps text-accent mt-8">Enquiries</p>
            <a href={`mailto:${site.email}`} className="mt-2 inline-block font-serif text-2xl hover:underline">
              {site.email}
            </a>
            <p className="text-muted mt-2">{site.location}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="label-caps text-accent">Index</p>
            <ul className="mt-4 space-y-2">
              {indexLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="label-caps text-accent">Follow</p>
            <ul className="mt-4 space-y-2">
              {site.social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-accent transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-line text-muted mt-16 flex flex-wrap justify-between gap-4 border-t pt-6 text-sm">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <Link to="/privacy" className="hover:text-accent transition-colors">
            Privacy Policy
          </Link>
        </div>
      </Container>
    </footer>
  );
}