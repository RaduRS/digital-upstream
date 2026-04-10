import type { MetadataRoute } from "next";
import { sql } from "@/lib/db";
import type { BlogPostSummary } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://digital-upstream.com";
  const now = new Date();

  // Fetch blog posts for dynamic blog URLs
  let blogPosts: Pick<BlogPostSummary, "slug" | "published_at" | "updated_at">[] = [];
  try {
    const posts = await sql`
      SELECT slug, published_at, updated_at
      FROM blog
      WHERE source = 'digital-upstream'
      ORDER BY published_at DESC NULLS LAST
    `;
    blogPosts = posts as typeof blogPosts;
  } catch {
    // If DB fails, return static sitemap
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/work`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Add blog post URLs
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.updated_at ?? now,
    changeFrequency: "weekly",
    priority: post.published_at ? 0.8 : 0.6,
  }));

  // Add work sub-pages
  const workRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/work/freshmeal`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/work/vocalenda`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/work/automan`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/work/chat-smith`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/work/famlymemo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/work/valid-spark`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/work/summaraize`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [...staticRoutes, ...blogRoutes, ...workRoutes];
}