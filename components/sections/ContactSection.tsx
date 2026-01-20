import Link from "next/link";
import { Mail } from "lucide-react";
import Container from "@/components/Container";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import DGLabel from "./DGLabel";
import SectionHeading from "./SectionHeading";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="h-screen flex items-center"
      aria-labelledby="contact-title"
    >
      <Container>
        <div className="max-w-4xl mx-auto w-full text-left">
          <DGLabel Icon={Mail} label="DU‑05" className="text-foreground/70" />

          <Reveal>
            <Parallax strength={0.1} maxTranslate={28}>
              <SectionHeading
                title={
                  <>
                    <span className="block">Get in touch</span>
                  </>
                }
                subtitle={
                  <span className="lg:whitespace-nowrap">
                    Tell us about your project, timeline, and goals.
                  </span>
                }
                id="contact-title"
              />
            </Parallax>
          </Reveal>

          <Reveal delay={120}>
            <Parallax strength={0.08} maxTranslate={24}>
              <div className="mt-12 sm:mt-16 w-full flex flex-wrap items-center justify-start gap-4 sm:gap-6">
                <Link
                  href="mailto:contact@digital-upstream.com"
                  className="inline-flex items-center justify-center rounded-md border border-foreground/15 px-5 py-3 text-lg sm:text-xl font-medium hover:border-foreground/30 transition-colors"
                  aria-label="Email Digital Upstream"
                >
                  Email us
                </Link>
                <Link
                  href="#projects"
                  className="inline-block text-lg sm:text-xl link-underline-hide-ltr link-underline-tight text-foreground/80 hover:text-foreground transition-colors"
                  aria-label="See our projects"
                >
                  See our work
                </Link>
              </div>
            </Parallax>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
