import { Diamond } from "lucide-react";
import DGLabel from "./DGLabel";

export default function HeroSection() {
  return (
    <section
      className="min-h-screen flex items-center"
      aria-labelledby="hero-title"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-start w-full gap-y-12 md:gap-x-8">
        <div className="relative flex items-start justify-start px-4 sm:px-6 md:px-8 py-6 sm:py-8">
          <video
            src="https://digital-upstream.s3.eu-central-003.backblazeb2.com/video2.mp4"
            poster="/projects/poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            width={700}
            height={700}
            className="w-full aspect-square object-contain object-left sm:max-w-[700px] sm:max-h-[700px]"
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>

        <div className="flex items-start justify-start text-left relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 min-h-[360px] sm:min-h-[420px] md:min-h-[480px]">
          <div>
            <DGLabel
              Icon={Diamond}
              label="DU‑01"
              className="text-foreground/70"
            />
            {/* Accessible page heading; visually hidden to avoid visual changes */}
            <h1 id="hero-title" className="sr-only">
              Designing standout brands and seamless interfaces
            </h1>
            <p
              className="text-4xl sm:text-5xl tracking-tight"
              aria-describedby="hero-title"
            >
              Designing standout brands and seamless interfaces that turn
              attention into action.
            </p>
            <a
              href="#contact"
              className="mt-12 sm:mt-16 inline-block link-underline-hide-ltr text-lg sm:text-xl text-foreground/80 hover:text-foreground transition-colors"
              aria-label="Jump to contact section"
            >
              Contact me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
