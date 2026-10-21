import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [{ title: "About | Arjun Mehta Photography" }];
}

export default function About() {
  return (
    <div className="px-6 py-24 md:px-16">
      <p className="label-caps text-accent">Route: /about</p>
      <h1 className="mt-4 text-5xl md:text-7xl">About</h1>
      <p className="text-muted mt-6">Stub page. Real content arrives later this week.</p>
    </div>
  );
}