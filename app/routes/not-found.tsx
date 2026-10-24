import { data } from "react-router";
import type { Route } from "./+types/not-found";
import { NotFoundContent } from "~/components/sections/NotFoundContent";
import { pageMeta } from "~/lib/seo";

// Tell browsers and search engines this really is a 404, not a normal page.
export function loader() {
  return data(null, { status: 404 });
}

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