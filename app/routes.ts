import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("portfolio", "routes/portfolio.tsx"),
    route("portfolio/:slug", "routes/project.tsx"),
    route("services", "routes/services.tsx"),
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
    route("privacy", "routes/privacy.tsx"),
    route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
