import type { Route } from "./+types/not-found";
import { NotFoundContent } from "~/components/sections/NotFoundContent";
import { pageMeta } from "~/lib/seo";

export function meta({ }: Route.MetaArgs) {
  return pageMeta({
    title: "Page not found",
    description: "This page could not be found.",
    path: "/404",
    noindex: true,
  });
}

export default function NotFound() {
  return <NotFoundContent />;
}