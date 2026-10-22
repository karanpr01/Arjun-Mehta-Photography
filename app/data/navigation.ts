// The main menu lives here once, so the desktop header and the mobile menu always match.
export const mainNav = [
  { to: "/portfolio", label: "Work", hint: "Selected projects and stories" },
  { to: "/services", label: "Services & Pricing", hint: "Commissions and packages" },
  { to: "/about", label: "About", hint: "Philosophy and approach" },
  { to: "/contact", label: "Contact", hint: "Start an enquiry" },
] as const;