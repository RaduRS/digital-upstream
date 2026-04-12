import Link from "next/link";
import { sql } from "@/lib/db";
import type { BlogPostSummary } from "@/lib/blog";
import { FileText, ArrowRight } from "lucide-react";
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
        created_at, updated_at
      FROM blog
      WHERE source = 'digital-upstream'
      ORDER BY published_at DESC NULLS LAST
    `;
    return posts as BlogPostSummary[];
  } catch {
    return [];
  }
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
  const posts = await getPosts();
  const featured = posts[0];
  const latest = posts.slice(1, 7);

  return (
    <main id="content" className="min-h-screen">

      {/* Site Header */}
      <section className="pt-12 pb-10 sm:pt-16 sm:pb-12 border-b border-foreground/10">
        <Container>
          <div className="max-w-3xl mx-auto w-full">
            {/* Publication identity */}
            <div className="flex items-center gap-2 mb-6">
              <FileText className="h-3 w-3 text-foreground/30" />
              <span className="text-xs uppercase tracking-[0.2em] text-foreground/40 font-sans">
                Publication
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-foreground mb-4">
              Digital Upstream
            </h1>
            <p className="text-base sm:text-lg text-foreground/55 leading-relaxed font-sans">
              Honest takes on AI coding tools, web development, and building products that hold up under scrutiny.
              By Radu — founder and developer.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="py-10 sm:py-14">
          <Container>
            <div className="max-w-3xl mx-auto w-full">
              {/* Date + section label */}
              <div className="flex items-center gap-3 mb-6">
                <time
                  dateTime={formatDateISO(featured.published_at)}
                  className="text-xs text-foreground/40 font-sans"
                >
                  {formatDate(featured.published_at)}
                </time>
                <span className="w-1 h-1 rounded-full bg-foreground/20" />
                <span className="text-xs text-foreground/40 font-sans">Latest</span>
              </div>

              <Link href={`/blog/${featured.slug}`} className="group block">
                <article>
                  {/* Cover image */}
                  {featured.cover_image_url && (
                    <div className="aspect-[16/9] w-full overflow-hidden rounded-lg mb-6 bg-foreground/5">
                      <img
                        src={featured.cover_image_url}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-foreground mb-3 group-hover:text-foreground/70 transition-colors">
                    {featured.title}
                  </h2>

                  {/* Excerpt */}
                  {featured.meta_description && (
                    <p className="text-base sm:text-lg text-foreground/55 leading-relaxed mb-5">
                      {featured.meta_description}
                    </p>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-2 font-sans text-sm text-foreground/50 group-hover:text-foreground transition-colors">
                    <span className="text-sm">Read article</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </article>
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* Divider */}
      {featured && posts.length > 1 && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <hr className="border-foreground/10" />
        </div>
      )}

      {/* All Posts — Clean list */}
      {posts.length > 0 && (
        <section className="pb-16 sm:pb-24">
          <Container>
            <div className="max-w-3xl mx-auto w-full">
              <div className="pt-8 sm:pt-10">
                <h2 className="sr-only">All Articles</h2>
                <div className="space-y-0">
                  {posts.map((post, index) => (
                    <div key={post.id}>
                      {index > 0 && (
                        <hr className="border-foreground/10" />
                      )}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group block py-7 sm:py-8"
                      >
                        <article>
                          {/* Date */}
                          <div className="flex items-center gap-2 mb-2">
                            <time
                              dateTime={formatDateISO(post.published_at)}
                              className="text-xs text-foreground/40 font-sans"
                            >
                              {formatDate(post.published_at)}
                            </time>
                          </div>

                          {/* Title */}
                          <h3 className="font-serif text-xl sm:text-2xl font-medium leading-snug tracking-tight text-foreground group-hover:text-foreground/70 transition-colors mb-1.5">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          {post.meta_description && (
                            <p className="text-sm text-foreground/50 leading-relaxed line-clamp-2">
                              {post.meta_description}
                            </p>
                          )}
                        </article>
                      </Link>
                    </div>
                  ))}
                </div>
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

      {/* JSON-LD — WebSite + Blog schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Digital Upstream",
              url: "https://digital-upstream.com",
              description:
                "Honest takes on AI coding tools, web development, and building products that hold up under scrutiny.",
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
              description:
                "Honest takes on AI coding tools, web development, and building products.",
              author: {
                "@type": "Person",
                name: "Radu",
                url: "https://digital-upstream.com/about",
              },
              publisher: {
                "@type": "Person",
                name: "Radu",
              },
            },
          ]),
        }}
      />
    </main>
  );
}