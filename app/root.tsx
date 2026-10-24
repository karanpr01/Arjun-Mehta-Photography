import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import "@fontsource-variable/eb-garamond";
import "@fontsource-variable/eb-garamond/wght-italic.css";
import "@fontsource-variable/manrope";
import "@fontsource-variable/outfit";

import ebGaramondLatin from "@fontsource-variable/eb-garamond/files/eb-garamond-latin-wght-normal.woff2?url";
import manropeLatin from "@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2?url";
import type { Route } from "./+types/root";
import { Footer } from "./components/layout/footer";
import { Header } from "./components/layout/header";
import { SkipLink } from "./components/layout/SkipLink";
import { NotFoundContent } from "~/components/sections/NotFoundContent";
import { themeInitScript } from "~/lib/themeInit";
import "./styles/app.css";

// Tell the browser about the two most important font files early, so text appears sooner.
// (Only the Latin letters of the two fonts used above the fold. More preloads would slow the photo.)
export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  {
    rel: "preload",
    href: ebGaramondLatin,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: manropeLatin,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  // A missing page (such as an unknown project) gets the designed 404, with the normal header and footer.
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <>
        <SkipLink />
        <Header />
        <main id="main" tabIndex={-1}>
          <NotFoundContent />
        </main>
        <Footer />
      </>
    );
  }
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
