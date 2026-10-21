import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Portfolio | Arjun Mehta Photography" }];
}

export default function Portfolio(){
  return (
    <div className="px-6 py-24 md:px-16">
        <p className="label-caps text-accent">Route:/portfolio</p>
        <h1 className="mt-4 text-5xl md:text7xl">Portfolio</h1>
        <p className="text-muted mt-6">Stub Page. Real Content arrives later this week.</p>
    </div>
  )
}