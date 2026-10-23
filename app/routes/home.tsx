import type { Route } from "./+types/home";
import { Hero } from "~/components/sections/Hero";
import { FeaturedWorks } from "~/components/sections/FeaturedWorks";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Arjun Mehta Photography" },
    { name: "description", content: "Placeholder description. We write the real one on Day 5." },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWorks />
    </>
  )
}