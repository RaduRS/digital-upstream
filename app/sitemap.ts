import type { MetadataRoute } from "next";
import { PROJECT_DETAILS } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://digital-upstream.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = Object.keys(PROJECT_DETAILS).map((slug) => ({
    url: `${base}/work/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: PROJECT_DETAILS[slug]?.featured ? 0.8 : 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
