import { Link } from "react-router";
import type { Route } from "./+types/portfolio";
import { projects } from "~/data/projects";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Portfolio | Arjun Mehta Photography" }];
}

export default function Portfolio() {
  return (
    <div className="px-6 py-24 md:px-16">
      <p className="label-caps text-accent">Route: /portfolio</p>
      <h1 className="mt-4 text-5xl md:text-7xl">Portfolio</h1>
      <ul className="mt-10 space-y-3">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link to={`/portfolio/${project.slug}`} className="hover:text-accent underline">
              {project.title}
            </Link>{" "}
            <span className="text-muted">
              ({project.category}, {project.location}, {project.year})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}