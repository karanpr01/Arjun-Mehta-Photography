import type { Route } from "./+types/privacy";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Privacy Policy | Arjun Mehta Photography" }];
}

export default function Privacy() {
  return (
    <div className="px-6 py-24 md:px-16">
      <p className="label-caps text-accent">Route: /privacy</p>
      <h1 className="mt-4 text-5xl md:text-7xl">Privacy Policy</h1>
      <p className="text-muted mt-6">Stub page. Real content arrives later this week.</p>
    </div>
  );
}