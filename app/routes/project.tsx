import type { Route } from "./+types/project";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `${params.slug} | Arjun Mehta Photography` }];
}

export default function Project({ params }: Route.ComponentProps) {
  return (
    <div className="px-6 py-24 md:px-16">
      <p className="label-caps text-accent">Route: /portfolio/:slug</p>
      <h1 className="mt-4 text-5xl md:text-7xl">Project: {params.slug}</h1>
      <p className="text-muted mt-6">Stub page. Real project stories arrive on Day 3.</p>
    </div>
  );
}