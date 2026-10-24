import { data } from "react-router";
import type { Route } from "./+types/not-found";
import { NotFoundContent } from "~/components/sections/NotFoundContent";

// Tell browsers and search engines this really is a 404, not a normal page.
export function loader() {
  return data(null, { status: 404 });
}

export function meta({ }: Route.MetaArgs) {
  return [{ title: "Page not found | Arjun Mehta Photography" }];
}

export default function NotFound() {
  return <NotFoundContent />;
}