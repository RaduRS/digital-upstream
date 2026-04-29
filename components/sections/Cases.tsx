import Link from "next/link";
import Script from "next/script";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { PROJECT_DETAILS, PROJECTS_FEATURED } from "@/lib/projects";

type Row = {
  href: string;
  slug: string;
  title: string;
  desc: string;
  cover: string | null;
  ref: string;
  tag: string;
};

function pickCover(slug: string): string | null {
  const media = PROJECT_DETAILS[slug]?.media ?? [];
  const firstImage = media.find((m) => m.kind === "image");
  return firstImage?.src ?? null;
}

const rows: Row[] = PROJECTS_FEATURED.map((p) => {
  const detail = PROJECT_DETAILS[p.slug];
  const tag = (detail?.techStack?.[0] ?? "Web").split(/[—,()/]/)[0]?.trim() ?? "Web";
  return {
    href: p.href,
    slug: p.slug,
    title: p.title,
    desc: p.desc,
    cover: pickCover(p.slug),
    ref: detail?.label?.replace(/\s+/g, "") ?? `CASE-${String(0).padStart(2, "0")}`,
    tag,
  };
});

export default function Cases() {
  return (
    <section
      id="cases"
      aria-labelledby="cases-title"
      className="relative py-32 sm:py-40"
    >
      <Container>
        {/* Header band */}
        <div className="grid grid-cols-12 gap-x-6 items-end mb-16 sm:mb-20">
          <div className="col-span-12 lg:col-span-8">
            <p className="cat-label">DU/04 — Cases</p>
            <h2
              id="cases-title"
              className="mt-8 display text-foreground"
              style={{ fontSize: "clamp(2.75rem, 7.4vw, 7rem)" }}
            >
              <span className="block">Selected</span>
              <span className="block">
                <span
                  className="display-italic"
                  style={{ color: "var(--accent)" }}
                >
                  works,
                </span>{" "}
                catalogued.
              </span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:text-right mt-6 lg:mt-0">
            <p className="lede">
              Real builds for founders &amp; teams.{" "}
              <span style={{ fontStyle: "normal", color: "var(--ink-faint)" }}>
                Click any title for the full case.
              </span>
            </p>
          </div>
        </div>

        {/* Index list */}
        <Reveal threshold={0.12}>
          <div className="text-foreground" role="list">
            {rows.map((row, i) => (
              <Link
                key={row.slug}
                href={row.href}
                className="case-row group"
                aria-label={`Open ${row.title} case study`}
                role="listitem"
              >
                {/* Catalogue number */}
                <div className="self-start pt-2 sm:pt-3">
                  <span className="case-meta block">
                    №&nbsp;{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="case-meta block mt-1.5 text-foreground/40">
                    {row.ref}
                  </span>
                </div>

                {/* Title + meta + description */}
                <div className="self-start">
                  <h3 className="case-title">
                    {row.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="case-meta">{row.tag}</span>
                    <span className="case-meta text-foreground/30" aria-hidden="true">
                      ·
                    </span>
                    <span className="display-italic text-foreground/65 text-base sm:text-lg">
                      {row.desc}
                    </span>
                  </div>
                </div>

                {/* Cover thumbnail */}
                <div className="hidden sm:flex items-center gap-6 self-center">
                  {row.cover ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={row.cover}
                      alt=""
                      className="case-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="case-cover bg-paper-deep" aria-hidden="true" />
                  )}
                  <span className="case-arrow case-meta text-foreground/60 group-hover:text-[var(--accent)] transition-colors">
                    Open →
                  </span>
                </div>

                {/* Mobile arrow */}
                <div className="sm:hidden self-center">
                  <span className="case-arrow case-meta text-foreground/60">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>

        {/* Footer note */}
        <div className="mt-12 sm:mt-16 flex flex-wrap items-baseline justify-between gap-4">
          <p className="small-caps text-foreground/45">
            {rows.length} pieces · Updated {new Date().getFullYear()}
          </p>
          <Link
            href="#correspondence"
            className="display-italic text-2xl sm:text-3xl text-foreground hover:text-[var(--accent)] transition-colors"
          >
            Have a project? →
          </Link>
        </div>
      </Container>

      <Script id="cases-itemlist-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: rows.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.title,
            url: `https://digital-upstream.com${p.href}`,
            description: p.desc,
          })),
        })}
      </Script>
    </section>
  );
}
