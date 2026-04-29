import Link from "next/link";
import Container from "@/components/Container";

const ISSUE_DATE = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
}).format(new Date());

const TOC = [
  { id: "statement", label: "Statement", code: "DU/02" },
  { id: "method", label: "Method", code: "DU/03" },
  { id: "cases", label: "Cases", code: "DU/04" },
  { id: "correspondence", label: "Correspondence", code: "DU/05" },
];

export default function Masthead() {
  return (
    <section
      id="masthead"
      aria-labelledby="masthead-title"
      className="relative pt-12 sm:pt-20 pb-24 sm:pb-32"
    >
      <Container>
        {/* Top metadata strip */}
        <div className="flex items-center justify-between text-ink-faint">
          <div className="cat-label">
            <span>Volume 01 — {ISSUE_DATE}</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 small-caps">
            <span>An independent studio</span>
            <span aria-hidden="true">·</span>
            <span>Built &amp; written by Radu</span>
          </div>
        </div>

        <div className="hairline mt-4 sm:mt-6 text-ink" />

        {/* Headline + plate grid */}
        <div className="mt-12 sm:mt-20 grid grid-cols-12 gap-x-6 gap-y-12 lg:gap-y-0">
          {/* Left: oversized editorial display */}
          <div className="col-span-12 lg:col-span-8">
            <p className="cat-label mb-8 sm:mb-12">
              <span>DU/01 — Masthead</span>
            </p>

            <h1
              id="masthead-title"
              className="display text-foreground"
              style={{ fontSize: "clamp(3.25rem, 9.2vw, 9.5rem)" }}
            >
              <span className="block">Designing</span>
              <span className="block">
                <span className="display-italic" style={{ color: "var(--accent)" }}>
                  standout
                </span>{" "}
                brands
              </span>
              <span className="block">&amp; seamless</span>
              <span className="block">interfaces.</span>
            </h1>

            <div className="mt-10 sm:mt-12 max-w-xl">
              <p className="lede">
                Considered, restrained work that turns attention into action — for
                founders who care about the difference between “looks good” and{" "}
                <span style={{ fontStyle: "normal", color: "var(--ink)" }}>
                  feels right.
                </span>
              </p>
            </div>

            <div className="mt-10 sm:mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="#cases"
                className="inline-flex items-baseline gap-3 group"
                aria-label="Jump to case studies"
              >
                <span className="display-italic text-2xl sm:text-3xl text-foreground group-hover:text-[var(--accent)] transition-colors">
                  Begin reading
                </span>
                <span className="cat-label group-hover:text-foreground transition-colors">
                  ↓ DU/04
                </span>
              </Link>
              <Link
                href="#correspondence"
                className="link-underline-rtl small-caps text-foreground/70 hover:text-foreground transition-colors"
              >
                Or write to me
              </Link>
            </div>
          </div>

          {/* Right: TOC + plate */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-10 lg:pl-8 lg:border-l border-foreground/10">
            <div>
              <p className="eyebrow mb-4">In this issue</p>
              <ul className="divide-y divide-foreground/10">
                {TOC.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`#${item.id}`}
                      className="flex items-baseline justify-between py-3 group"
                    >
                      <span className="font-serif text-xl sm:text-2xl text-foreground group-hover:italic group-hover:text-[var(--accent)] transition-all">
                        {item.label}
                      </span>
                      <span className="cat-label">
                        <span>{item.code}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <figure className="relative">
              <div className="aspect-[4/5] w-full overflow-hidden bg-paper-deep relative grain">
                <video
                  src="https://digital-upstream.s3.eu-central-003.backblazeb2.com/video2.mp4"
                  poster="/projects/poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                  aria-hidden="true"
                  tabIndex={-1}
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between small-caps text-ink-faint">
                <span>Plate 01</span>
                <span>From the studio · Loop</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
