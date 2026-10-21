import type { Route } from "./+types/not-found";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Page not found | Arjun Mehta Photography" }];
}

export default function NotFound() {
  return (
    <div className="px-6 py-24 md:px-16">
      <p className="label-caps text-accent">Error 404</p>
      <h1 className="mt-4 text-5xl md:text-7xl">Page not found</h1>
      <p className="text-muted mt-6">Stub page. The designed 404 arrives on Day 4.</p>
    </div>
  );
}