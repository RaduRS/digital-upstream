import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Brand design and web development for founders who care about the details. Strategy, design, and code — done right.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Digital Upstream",
    description:
      "Brand design and web development for founders who care about the details.",
    siteName: "Digital Upstream",
    url: "https://digital-upstream.com/about",
    type: "website",
  },
};

const movements = [
  {
    no: "01",
    title: "Strategy",
    body:
      "Define intent and the smallest path to it. No fluff, no extra deliverables. Just clarity on what needs to happen and why.",
  },
  {
    no: "02",
    title: "Design",
    body:
      "Strip noise, amplify signal. Typography, spacing, hierarchy — the details most people skip are the ones that make the difference.",
  },
  {
    no: "03",
    title: "Build",
    body:
      "Ship fast, maintainable, and accessible. Clean code, proper SEO, responsive everywhere. Work that holds up over time.",
  },
];

export default function AboutPage() {
  return (
    <main id="content" className="min-h-screen grain">
      {/* Masthead */}
      <section className="pt-16 sm:pt-24 pb-20 sm:pb-28">
        <Container>
          <div className="grid grid-cols-12 gap-x-6 items-end">
            <div className="col-span-12 lg:col-span-8">
              <p className="cat-label">DU/A — About</p>
              <Reveal>
                <h1
                  className="mt-8 display text-foreground"
                  style={{ fontSize: "clamp(2.75rem, 8vw, 8rem)" }}
                >
                  <span className="block">Less,</span>
                  <span className="block">
                    but{" "}
                    <span
                      className="display-italic"
                      style={{ color: "var(--accent)" }}
                    >
                      better.
                    </span>
                  </span>
                </h1>
              </Reveal>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:text-right small-caps text-foreground/45 mt-6 lg:mt-0">
              <span>An independent studio · Radu</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-20 border-t border-foreground/10">
        <Container>
          <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-12 lg:col-span-3 mb-10 lg:mb-0">
              <p className="cat-label">DU/A·1 — Story</p>
            </div>
            <div className="col-span-12 lg:col-span-9 space-y-8">
              <p className="lede">
                I am a brand designer and full-stack developer working with
                founders who need more than a website — they need something
                that holds up under scrutiny.
              </p>
              <p className="body-copy max-w-2xl">
                Digital Upstream exists for builders who are past the bootstrap
                stage and need work that reflects that. Not a template. Not a
                page builder output. Something considered — where every
                decision has a reason behind it.
              </p>
              <p className="body-copy max-w-2xl">
                My approach is simple: define the smallest path from intent to
                shipped, then build that exactly right. Strategy first, then
                design, then code. Skipping steps is how you end up with
                something that looks fine and converts poorly.
              </p>
              <p className="body-copy max-w-2xl">
                I have shipped products in SaaS, consumer apps, and developer
                tools. The work is mostly indie and early-stage — the kind
                where the founder needs someone who can think and build at the
                same time, not just execute.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* How I work */}
      <section className="py-16 sm:py-20 border-t border-foreground/10">
        <Container>
          <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-12 lg:col-span-3 mb-10 lg:mb-0">
              <p className="cat-label">DU/A·2 — How I work</p>
            </div>
            <ol className="col-span-12 lg:col-span-9 list-none p-0 m-0 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {movements.map((m) => (
                <li key={m.no} className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <span className="display-italic text-foreground/40 text-2xl">
                      {m.no}
                    </span>
                    <h3 className="display text-foreground text-2xl sm:text-3xl">
                      {m.title}
                    </h3>
                  </div>
                  <p className="body-copy">{m.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 border-t border-foreground/10">
        <Container>
          <div className="grid grid-cols-12 gap-x-6 items-end">
            <div className="col-span-12 lg:col-span-9">
              <p className="cat-label">DU/A·3 — Begin</p>
              <Reveal>
                <h2
                  className="mt-8 display text-foreground"
                  style={{ fontSize: "clamp(2.5rem, 6.4vw, 5.5rem)" }}
                >
                  <span className="block">Start a</span>
                  <span className="block">
                    <span
                      className="display-italic"
                      style={{ color: "var(--accent)" }}
                    >
                      project.
                    </span>
                  </span>
                </h2>
              </Reveal>
              <p className="mt-8 lede max-w-xl">
                Tell me about what you&rsquo;re working on. Timeline, goals,
                where you&rsquo;re stuck.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-3 lg:text-right mt-10 lg:mt-0">
              <Link
                href="mailto:contact@digital-upstream.com"
                className="inline-flex items-baseline gap-3 group"
              >
                <span className="display-italic text-2xl sm:text-3xl text-foreground group-hover:text-[var(--accent)] transition-colors">
                  Email me
                </span>
                <span className="cat-label group-hover:text-foreground transition-colors">
                  →
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
