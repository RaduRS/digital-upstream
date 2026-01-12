"use client";

import { Asterisk } from "lucide-react";
import Container from "@/components/Container";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import DGLabel from "./DGLabel";
import SectionHeading from "./SectionHeading";

export default function BlackSection() {
  return (
    <section
      id="black-section"
      className="min-h-screen flex items-center text-foreground"
      aria-labelledby="black-title"
    >
      <Container>
        <div className="max-w-7xl ml-auto text-right">
          <DGLabel
            Icon={Asterisk}
            label="DU‑02"
            className="text-foreground/70"
          />
          <Reveal>
            <Parallax strength={0.12} maxTranslate={32}>
              <SectionHeading
                title={
                  <>
                    <span className="block">Less,</span>
                    <span className="block">but better.</span>
                  </>
                }
                subtitle="Quiet, confident interfaces. Personal, precise, unmistakably yours."
                subtitleAlign="right"
                subtitleClassName="lg:whitespace-nowrap"
                align="right"
                id="black-title"
              />
            </Parallax>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
