import Link from "next/link";
import { sql } from "@/lib/db";
import type { BlogPostSummary } from "@/lib/blog";
import { FileText, ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Upstream",
  description:
    "Thoughts, insights, and perspectives on web development, design, and building products.",
  keywords: ["web development", "design", "frontend", "UI/UX", "Next.js", "React", "brand design", "portfolio", "blog"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Digital Upstream",
    description:
      "Thoughts, insights, and perspectives on web development, design, and building products.",
    siteName: "Digital Upstream",
    url: "https://digital-upstream.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Upstream",
    description:
      "Thoughts, insights, and perspectives on web development, design, and building products.",
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
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();
  const featured = posts[0];
  const latest = posts.slice(1, 4);
  const remaining = posts.slice(4);

  return (
    <main id="content" className="min-h-screen">

      {/* Hero - Featured Article */}
      {featured && (
        <section className="pt-12 pb-8 sm:pt-16 sm:pb-10">
          <Container>
            <div className="max-w-5xl mx-auto w-full">
              {/* Section label */}
              <div className="flex items-center gap-2 mb-8 sm:mb-10">
                <FileText className="h-3 w-3 text-foreground/30" />
                <span className="text-xs uppercase tracking-[0.2em] text-foreground/40 font-sans">
                  Featured
                </span>
              </div>

              <Link href={`/blog/${featured.slug}`} className="group block">
                <article>
                  {featured.cover_image_url && (
                    <div className="aspect-[16/9] w-full overflow-hidden rounded-lg sm:rounded-xl mb-8 sm:mb-10">
                      <img
                        src={featured.cover_image_url}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                      />
                    </div>
                  )}
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-4">
                      <time className="text-xs uppercase tracking-[0.15em] text-foreground/40 font-sans">
                        {formatDate(featured.published_at)}
                      </time>
                      <span className="w-1 h-1 rounded-full bg-foreground/20" />
                      <span className="text-xs text-foreground/40 font-sans">
                        Author: Radu
                      </span>
                    </div>
                    <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight text-foreground mb-4 group-hover:text-foreground/70 transition-colors">
                      {featured.title}
                    </h2>
                    {featured.meta_description && (
                      <p className="text-lg sm:text-xl text-foreground/60 leading-relaxed">
                        {featured.meta_description}
                      </p>
                    )}
                    <div className="mt-6 flex items-center gap-2 font-serif text-sm text-foreground/50 group-hover:text-foreground transition-colors">
                      <span>Read article</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* Divider */}
      {featured && posts.length > 1 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <hr className="border-foreground/10" />
        </div>
      )}

      {/* Latest Articles - 3 column grid */}
      {latest.length > 0 && (
        <section className="py-10 sm:py-14">
          <Container>
            <div className="max-w-5xl mx-auto w-full">
              {/* Section header */}
              <div className="flex items-center justify-between mb-8 sm:mb-10">
                <h2 className="font-sans text-xs uppercase tracking-[0.15em] text-foreground/40">
                  Latest
                </h2>
                <div className="flex items-center gap-2 text-foreground/30">
                  <FileText className="h-3 w-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
                {latest.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <article className="space-y-4">
                      {post.cover_image_url && (
                        <div className="aspect-[16/10] w-full overflow-hidden rounded-lg">
                          <img
                            src={post.cover_image_url}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <time className="text-xs text-foreground/40 font-sans">
                            {formatDate(post.published_at)}
                          </time>
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl font-medium leading-snug tracking-tight text-foreground group-hover:text-foreground/70 transition-colors">
                          {post.title}
                        </h3>
                        {post.meta_description && (
                          <p className="text-sm text-foreground/55 leading-relaxed line-clamp-2">
                            {post.meta_description}
                          </p>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* More Articles - condensed list */}
      {remaining.length > 0 && (
        <>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <hr className="border-foreground/10" />
          </div>
          <section className="py-10 sm:py-14">
            <Container>
              <div className="max-w-5xl mx-auto w-full">
                <h2 className="font-sans text-xs uppercase tracking-[0.15em] text-foreground/40 mb-8 sm:mb-10">
                  More Stories
                </h2>
                <div className="space-y-8">
                  {remaining.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group block"
                    >
                      <article className="flex items-start gap-6">
                        {post.cover_image_url && (
                          <div className="w-32 h-20 sm:w-40 sm:h-28 shrink-0 overflow-hidden rounded-lg">
                            <img
                              src={post.cover_image_url}
                              alt=""
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <time className="text-xs text-foreground/40 font-sans">
                              {formatDate(post.published_at)}
                            </time>
                          </div>
                          <h3 className="font-serif text-lg sm:text-xl font-medium leading-snug tracking-tight text-foreground group-hover:text-foreground/70 transition-colors mb-1">
                            {post.title}
                          </h3>
                          {post.meta_description && (
                            <p className="text-sm text-foreground/50 leading-relaxed line-clamp-2">
                              {post.meta_description}
                            </p>
                          )}
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        </>
      )}

      {/* Empty state */}
      {posts.length === 0 && (
        <section className="py-24 sm:py-32">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <FileText className="h-12 w-12 text-foreground/20 mx-auto mb-6" />
              <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground/70 mb-4">
                Coming Soon
              </h1>
              <p className="text-foreground/50 font-sans">
                Thoughts, insights, and perspectives on web development, design, and building products. Check back soon.
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Digital Upstream",
            description:
              "Thoughts, insights, and perspectives on web development, design, and building products.",
            url: "https://digital-upstream.com",
          }),
        }}
      />
    </main>
  );
}