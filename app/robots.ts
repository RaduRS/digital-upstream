import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const host = "https://digital-upstream.com";
  return {
    rules: [
      { userAgent: "*", disallow: ["/admin", "/api/admin"] },
    ],
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
