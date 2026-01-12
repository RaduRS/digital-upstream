import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://digital-upstream.com";
  const now = new Date();
  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/projects/freshmeal`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/projects/vocalenda`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/projects/automan`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/projects/chat-smith`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
