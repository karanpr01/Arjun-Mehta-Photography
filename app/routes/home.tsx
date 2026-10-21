import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Arjun Mehta Photography"},
     { name: "description", content: "Placeholder description. We write the real one on Day 5." },
  ]
}

export default function Home(){
  return (
    <main className="p-8">
      <h1 className="text-3xl">Arjun Mehta Photography</h1>
      <p>Site Under Construction </p>
    </main>
  )
}