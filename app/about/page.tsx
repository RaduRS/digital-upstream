import { Asterisk, Hexagon } from "lucide-react";
import Container from "@/components/Container";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import DGLabel from "@/components/sections/DGLabel";
import SectionHeading from "@/components/sections/SectionHeading";
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

export default function AboutPage() {
  return (
    <main id="content" className="min-h-screen">
      {/* Hero */}
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-20">
        <Container>
          <div className="max-w-3xl mx-auto w-full">
            <div className="flex items-center gap-2 mb-10">
              <Asterisk className="h-3 w-3 text-foreground/30" />
              <span className="text-xs uppercase tracking-[0.2em] text-foreground/40 font-sans">
                About
              </span>
            </div>
            <Reveal>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight text-foreground mb-6">
                Less, but better.
              </h1>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl mx-auto w-full">
            <div className="prose-custom">
              <p>
                I am a brand designer and full-stack developer working with founders who need more than a website — they need something that holds up under scrutiny.
              </p>
              <p>
                Digital Upstream exists for builders who are past the bootstrap stage and need work that reflects that. Not a template. Not a page builder output. Something considered — where every decision has a reason behind it.
              </p>
              <p>
                My approach is simple: define the smallest path from intent to shipped, then build that exactly right. Strategy first, then design, then code. Skipping steps is how you end up with something that looks fine and converts poorly.
              </p>
              <p>
                I have shipped products in SaaS, consumer apps, and developer tools. The work is mostly indie and early-stage — the kind where the founder needs someone who can think and build at the same time, not just execute.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* How I work */}
      <section className="py-12 sm:py-20 border-t border-foreground/10">
        <Container>
          <div className="max-w-3xl mx-auto w-full">
            <div className="flex items-center gap-2 mb-12 sm:mb-16">
              <Hexagon className="h-3 w-3 text-foreground/30" />
              <span className="text-xs uppercase tracking-[0.2em] text-foreground/40 font-sans">
                How I work
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-foreground/30 font-serif text-xl">01</span>
                  <h3 className="font-serif text-xl text-foreground">Strategy</h3>
                </div>
                <p className="text-foreground/60 font-sans text-sm leading-relaxed">
                  Define intent and the smallest path to it. No fluff, no extra deliverables. Just clarity on what needs to happen and why.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-foreground/30 font-serif text-xl">02</span>
                  <h3 className="font-serif text-xl text-foreground">Design</h3>
                </div>
                <p className="text-foreground/60 font-sans text-sm leading-relaxed">
                  Strip noise, amplify signal. Typography, spacing, hierarchy — the details most people skip are the ones that make the difference.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-foreground/30 font-serif text-xl">03</span>
                  <h3 className="font-serif text-xl text-foreground">Build</h3>
                </div>
                <p className="text-foreground/60 font-sans text-sm leading-relaxed">
                  Ship fast, maintainable, and accessible. Clean code, proper SEO, responsive everywhere. Work that holds up over time.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 border-t border-foreground/10">
        <Container>
          <div className="max-w-3xl mx-auto w-full">
            <Reveal>
              <SectionHeading
                title={
                  <>
                    <span className="block">Start a project</span>
                  </>
                }
                subtitle="Tell me about what you're working on. Timeline, goals, where you're stuck."
                subtitleClassName="no-offset"
              />
            </Reveal>
            <div className="mt-10 flex items-center gap-6">
              <a
                href="mailto:contact@digital-upstream.com"
                className="inline-flex items-center justify-center rounded-md border border-foreground/15 px-6 py-3 text-base font-medium hover:border-foreground/30 transition-colors font-sans"
              >
                Email me
              </a>
              <a
                href="https://newsletter.digital-upstream.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline-hide-ltr text-foreground/80 hover:text-foreground transition-colors font-sans text-base"
              >
                Or follow the newsletter
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}