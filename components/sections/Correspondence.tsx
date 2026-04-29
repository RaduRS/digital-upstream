import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

const channels = [
  {
    label: "Email",
    handle: "contact@digital-upstream.com",
    href: "mailto:contact@digital-upstream.com",
    primary: true,
  },
  {
    label: "TikTok",
    handle: "@digitalupstream",
    href: "https://www.tiktok.com/@digitalupstream",
  },
  {
    label: "Instagram",
    handle: "@digital.upstream",
    href: "https://www.instagram.com/digital.upstream",
  },
  {
    label: "X (Twitter)",
    handle: "@Digi_Upstream",
    href: "https://x.com/Digi_Upstream",
  },
];

export default function Correspondence() {
  return (
    <section
      id="correspondence"
      aria-labelledby="correspondence-title"
      className="relative py-32 sm:py-40"
    >
      <Container>
        <div className="grid grid-cols-12 gap-x-6 gap-y-16 items-start">
          {/* Headline + lede */}
          <div className="col-span-12 lg:col-span-7">
            <p className="cat-label">DU/05 — Correspondence</p>
            <Reveal threshold={0.2}>
              <h2
                id="correspondence-title"
                className="mt-8 display text-foreground"
                style={{ fontSize: "clamp(2.75rem, 8vw, 8rem)" }}
              >
                <span className="block">Write</span>
                <span className="block">
                  <span
                    className="display-italic"
                    style={{ color: "var(--accent)" }}
                  >
                    a letter,
                  </span>
                </span>
                <span className="block">not a brief.</span>
              </h2>
            </Reveal>

            <Reveal threshold={0.2} delay={120}>
              <p className="mt-10 lede max-w-xl">
                Tell me what you&rsquo;re building and what you&rsquo;re stuck on.
                Stage, deadline, the constraint that worries you. I read every
                one and reply within{" "}
                <span style={{ fontStyle: "normal", color: "var(--ink)" }}>
                  two business days.
                </span>
              </p>
            </Reveal>

            <Reveal threshold={0.2} delay={220}>
              <div className="mt-12 sm:mt-14">
                <Link
                  href="mailto:contact@digital-upstream.com?subject=New%20project%20enquiry"
                  className="inline-flex items-baseline gap-3 group"
                >
                  <span
                    className="display text-foreground group-hover:text-[var(--accent)] transition-colors"
                    style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.5rem)" }}
                  >
                    contact@digital-upstream.com
                  </span>
                  <span className="case-arrow cat-label group-hover:text-foreground transition-colors">
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Channel index */}
          <aside className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pl-8 lg:border-l border-foreground/10">
            <p className="eyebrow mb-6">Channels</p>
            <ul className="divide-y divide-foreground/10">
              {channels.map((ch) => (
                <li key={ch.label}>
                  <a
                    href={ch.href}
                    target={ch.href.startsWith("http") ? "_blank" : undefined}
                    rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-baseline justify-between py-4 group"
                  >
                    <span className="small-caps text-foreground/55 group-hover:text-foreground transition-colors">
                      {ch.label}
                    </span>
                    <span
                      className={
                        ch.primary
                          ? "font-serif text-lg sm:text-xl text-foreground group-hover:text-[var(--accent)] group-hover:italic transition-all"
                          : "font-serif text-lg text-foreground/80 group-hover:italic group-hover:text-[var(--accent)] transition-all"
                      }
                    >
                      {ch.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 hairline text-foreground/40" />

            <div className="mt-6 flex items-baseline justify-between">
              <span className="small-caps text-foreground/40">Studio</span>
              <span className="font-serif italic text-foreground/70">
                Open for Q3 2026
              </span>
            </div>
          </aside>
        </div>

        {/* Colophon strip */}
        <div className="mt-24 sm:mt-32 grid grid-cols-12 gap-x-6 items-end">
          <div className="col-span-12 lg:col-span-8">
            <p
              className="display-italic text-foreground/85"
              style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)" }}
            >
              &mdash; End of issue.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:text-right small-caps text-foreground/45 mt-4 lg:mt-0">
            <span>Set in Fraunces, Plus Jakarta &amp; Instrument Serif</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
