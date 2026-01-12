"use client";

import { Hexagon, Compass, PenTool, Code2 } from "lucide-react";
import Container from "@/components/Container";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import DGLabel from "./DGLabel";
import SectionHeading from "./SectionHeading";

export default function HowWeWorkSection() {
  return (
    <section
      id="dg-03"
      className="py-24 sm:py-32 text-foreground"
      aria-labelledby="how-title"
    >
      <Container>
        <div className="max-w-6xl mx-auto w-full text-left">
          <DGLabel Icon={Hexagon} label="DU‑03" className="text-foreground/70" />

          <Reveal>
            <Parallax strength={0.1} maxTranslate={28}>
              <SectionHeading id="how-title" title="How we work" subtitle="Three parts, one outcome: clarity." />
            </Parallax>
          </Reveal>

          <Reveal delay={100}>
            <Parallax strength={0.08} maxTranslate={24}>
              <div role="list" className="mt-12 sm:mt-16 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 md:divide-x divide-foreground/10">
                <Reveal threshold={0.2}>
                  <div role="listitem" className="space-y-3 md:space-y-4 pr-0 md:pr-8 text-left">
                    <div className="flex items-center gap-4 justify-start">
                      <Compass className="h-5 w-5 opacity-80" aria-hidden="true" />
                      <h3 className="text-xl sm:text-2xl">Strategy</h3>
                    </div>
                    <p className="text-sm sm:text-base opacity-70">
                      Define intent and the smallest path to it.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={120} threshold={0.2}>
                  <div role="listitem" className="space-y-3 md:space-y-4 md:px-8 text-center md:text-left">
                    <div className="flex items-center gap-4 justify-center md:justify-start">
                      <PenTool className="h-5 w-5 opacity-80" aria-hidden="true" />
                      <h3 className="text-xl sm:text-2xl">Design</h3>
                    </div>
                    <p className="text-sm sm:text-base opacity-70">Strip noise, amplify signal.</p>
                  </div>
                </Reveal>
                <Reveal delay={240} threshold={0.2}>
                  <div role="listitem" className="space-y-3 md:space-y-4 md:pl-8 text-right md:text-left">
                    <div className="flex items-center gap-4 justify-end md:justify-start">
                      <Code2 className="h-5 w-5 opacity-80" aria-hidden="true" />
                      <h3 className="text-xl sm:text-2xl">Build</h3>
                    </div>
                    <p className="text-sm sm:text-base opacity-70">Ship fast, maintainable, and accessible.</p>
                  </div>
                </Reveal>
              </div>
            </Parallax>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}