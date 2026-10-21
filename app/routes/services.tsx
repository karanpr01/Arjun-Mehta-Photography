import type { Route } from "./+types/services";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Services & Pricing | Arjun Mehta Photography" }];
}

export default function Services() {
  return (
    <div className="px-6 py-24 md:px-16">
      <p className="label-caps text-accent">Route: /services</p>
      <h1 className="mt-4 text-5xl md:text-7xl">Services &amp; Pricing</h1>
      <p className="text-muted mt-6">Stub page. Real content arrives later this week.</p>
    </div>
  );
}