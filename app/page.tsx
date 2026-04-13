import Link from "next/link";
import { sql } from "@/lib/db";
import type { BlogPostSummary } from "@/lib/blog";
import { FileText, ArrowRight, Clock } from "lucide-react";
import Container from "@/components/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Upstream — AI Tools, Web Dev & Indie Builder Insights",
  description:
    "Honest reviews and perspectives on AI coding tools, web development, and building products that hold up under scrutiny. By Radu.",
  keywords: ["AI coding tools", "web development", "frontend", "indie founders", "SaaS", "brand design", "Cursor", "Copilot"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Digital Upstream",
    description:
      "Honest reviews and perspectives on AI coding tools, web development, and building products that hold up under scrutiny.",
    siteName: "Digital Upstream",
    url: "https://digital-upstream.com",
    type: "website",
    images: [{ url: "https://digital-upstream.com/digital-upstream-logo.png", width: 1200, height: 630, alt: "Digital Upstream" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Upstream",
    description:
      "Honest reviews and perspectives on AI coding tools, web development, and building products.",
    images: ["https://digital-upstream.com/digital-upstream-logo.png"],
  },
};

async function getPosts(): Promise<BlogPostSummary[]> {
  try {
    const posts = await sql`
      SELECT
        id, title, slug, meta_description, target_keywords,
        cover_image_url, source, original_url, published_at,
        created_at, updated_at,
        content
      FROM blog
      WHERE source = 'digital-upstream' AND status = 'published'
      ORDER BY published_at DESC NULLS LAST
    `;
    return posts as BlogPostSummary[];
  } catch {
    return [];
  }
}

// Simple in-memory slug cache to detect new posts
let cachedSlugs: string[] = [];

async function revalidateIfNewPosts() {
  const posts = await getPosts();
  const currentSlugs = posts.map(p => p.slug);

  const newSlugs = currentSlugs.filter(s => !cachedSlugs.includes(s));
  if (newSlugs.length > 0 && cachedSlugs.length > 0) {
    // New post detected — trigger revalidation
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "https://digital-upstream.com"}/api/revalidate`, {
        method: "POST",
        cache: "no-store",
      });
    } catch {
      // Silently fail — next request will retry
    }
  }

  cachedSlugs = currentSlugs;
}

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = (content || "").trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function formatDate(date: Date | string | null): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDateISO(date: Date | string | null): string {
  if (!date) return "";
  return new Date(date).toISOString();
}

export default async function BlogPage() {
  await revalidateIfNewPosts();
  const posts = await getPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main id="content" className="min-h-screen">

      {/* Site Header */}
      <section className="pt-10 pb-8 sm:pt-12 sm:pb-10 border-b border-foreground/10">
        <Container>
          <div className="max-w-3xl mx-auto w-full">
            <div className="flex items-center gap-2 mb-5">
              <FileText className="h-3 w-3 text-foreground/30" />
              <span className="text-xs uppercase tracking-[0.2em] text-foreground/40 font-sans">
                Publication
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium leading-[1.1] tracking-tight text-foreground mb-3">
              Digital Upstream
            </h1>
            <p className="text-sm sm:text-base text-foreground/50 leading-relaxed font-sans">
              Honest takes on AI coding tools, web development, and building products that hold up under scrutiny.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="py-8 sm:py-10">
          <Container>
            <div className="max-w-3xl mx-auto w-full">
              <Link href={`/blog/${featured.slug}`} className="group block">
                <article>
                  {/* Date + read time */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <time dateTime={formatDateISO(featured.published_at)} className="text-xs text-foreground/40 font-sans">
                      {formatDate(featured.published_at)}
                    </time>
                    <span className="flex items-center gap-1 text-xs text-foreground/40 font-sans">
                      <Clock className="h-3 w-3" />
                      {estimateReadTime((featured as any).content || "")} min
                    </span>
                  </div>

                  {/* Cover image */}
                  {featured.cover_image_url && (
                    <div className="aspect-[16/9] w-full overflow-hidden rounded-lg mb-5 bg-foreground/5">
                      <img
                        src={featured.cover_image_url}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium leading-[1.1] tracking-tight text-foreground mb-2 group-hover:text-foreground/70 transition-colors">
                    {featured.title}
                  </h2>

                  {/* Excerpt */}
                  {featured.meta_description && (
                    <p className="text-sm sm:text-base text-foreground/55 leading-relaxed mb-4">
                      {featured.meta_description}
                    </p>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-2 font-sans text-xs text-foreground/50 group-hover:text-foreground transition-colors">
                    <span>Read article</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </article>
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* All Posts — alternating layout */}
      {rest.length > 0 && (
        <section className="pb-14 sm:pb-20">
          <Container>
            <div className="max-w-3xl mx-auto w-full">
              <div className="pt-8 sm:pt-10 space-y-6 sm:space-y-8">

                {rest.map((post, index) => {
                  const isOdd = index % 2 === 0;

                  if (isOdd) {
                    // Left image, right text — image fills full height of content
                    return (
                      <div key={post.id}>
                        <hr className="border-foreground/10 mb-6 sm:mb-8" />
                        <Link href={`/blog/${post.slug}`} className="group block">
                          <article className="flex gap-4 sm:gap-6 items-stretch">
                            {/* Image left — height matches content */}
                            {post.cover_image_url && (
                              <div className="w-28 sm:w-36 shrink-0 overflow-hidden rounded-lg bg-foreground/5">
                                <img
                                  src={post.cover_image_url}
                                  alt=""
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                  style={{ height: "100%", minHeight: "80px" }}
                                />
                              </div>
                            )}
                            {/* Text right */}
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <time dateTime={formatDateISO(post.published_at)} className="text-xs text-foreground/40 font-sans">
                                  {formatDate(post.published_at)}
                                </time>
                                <span className="flex items-center gap-1 text-xs text-foreground/40 font-sans">
                                  <Clock className="h-3 w-3" />
                                  {estimateReadTime((post as any).content || "")} min
                                </span>
                              </div>
                              <h3 className="font-serif text-base sm:text-lg lg:text-xl font-medium leading-snug tracking-tight text-foreground group-hover:text-foreground/70 transition-colors mb-1">
                                {post.title}
                              </h3>
                              {post.meta_description && (
                                <p className="text-xs sm:text-sm text-foreground/50 leading-relaxed line-clamp-2">
                                  {post.meta_description}
                                </p>
                              )}
                            </div>
                          </article>
                        </Link>
                      </div>
                    );
                  } else {
                    // Image with gradient overlay, text at bottom
                    return (
                      <div key={post.id}>
                        <hr className="border-foreground/10 mb-6 sm:mb-8" />
                        <Link href={`/blog/${post.slug}`} className="group block">
                          <article className="relative overflow-hidden rounded-lg">
                            {/* Image */}
                            {post.cover_image_url && (
                              <div className="aspect-[16/9] w-full bg-foreground/5">
                                <img
                                  src={post.cover_image_url}
                                  alt=""
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                />
                              </div>
                            )}
                            {/* Gradient overlay with text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <time dateTime={formatDateISO(post.published_at)} className="text-xs text-white/60 font-sans">
                                  {formatDate(post.published_at)}
                                </time>
                                <span className="flex items-center gap-1 text-xs text-white/60 font-sans">
                                  <Clock className="h-3 w-3" />
                                  {estimateReadTime((post as any).content || "")} min
                                </span>
                              </div>
                              <h3 className="font-serif text-base sm:text-lg lg:text-xl font-medium leading-snug tracking-tight text-white group-hover:text-white/80 transition-colors mb-0.5">
                                {post.title}
                              </h3>
                              {post.meta_description && (
                                <p className="text-xs text-white/70 leading-relaxed line-clamp-1 hidden sm:block">
                                  {post.meta_description}
                                </p>
                              )}
                            </div>
                          </article>
                        </Link>
                      </div>
                    );
                  }
                })}

              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Empty state */}
      {posts.length === 0 && (
        <section className="py-24 sm:py-32">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-foreground/50 font-sans text-base">
                No articles yet. Check back soon.
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Digital Upstream",
              url: "https://digital-upstream.com",
              description: "Honest takes on AI coding tools, web development, and building products.",
              publisher: {
                "@type": "Person",
                name: "Radu",
                url: "https://digital-upstream.com/about",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://digital-upstream.com/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "Digital Upstream",
              url: "https://digital-upstream.com",
              description: "Honest takes on AI coding tools, web development, and building products.",
              author: {
                "@type": "Person",
                name: "Radu",
                url: "https://digital-upstream.com/about",
              },
            },
          ]),
        }}
      />
    </main>
  );
}