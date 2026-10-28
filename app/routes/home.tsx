import type { Route } from "./+types/home";
import { Hero } from "~/components/sections/Hero";
import { FeaturedWorks } from "~/components/sections/FeaturedWorks";
import { ServicePreview } from "~/components/sections/ServicePreview";
import { AboutSnippet } from "~/components/sections/AboutSnippet";
import { CtaBanner } from "~/components/sections/CtaBanner";
import { site } from "~/data/site";
import { pageMeta } from "~/lib/seo";
import { personSchema, websiteSchema } from "~/lib/structuredData";
import { Ticker } from "~/components/sections/Ticker";

export function meta({ }: Route.MetaArgs) {
  return pageMeta({
    title: site.name,
    description: site.description,
    path: "/",
    jsonLd: [websiteSchema(), personSchema()],
  });
}

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <FeaturedWorks />
      <AboutSnippet />
      <ServicePreview />
      <CtaBanner />
    </>
  )
}