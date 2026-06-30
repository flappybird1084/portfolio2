import type { MetadataRoute } from "next";
import { projects } from "./lib/data";
import { getAllPosts } from "./lib/posts";

const BASE = "https://rianbutala.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/projects", "/blog", "/contact"].map(
    (path) => ({
      url: `${BASE}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const projectRoutes = projects.map((p) => ({
    url: `${BASE}/projects/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const postRoutes = getAllPosts().map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : undefined,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
