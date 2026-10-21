import type { Route } from "./+types/contact";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Contact | Arjun Mehta Photography" }];
}

export default function Contact() {
  return (
    <div className="px-6 py-24 md:px-16">
      <p className="label-caps text-accent">Route: /contact</p>
      <h1 className="mt-4 text-5xl md:text-7xl">Contact</h1>
      <p className="text-muted mt-6">Stub page. Real content arrives later this week.</p>
    </div>
  );
}