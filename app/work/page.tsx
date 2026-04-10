import HeroSection from "@/components/sections/HeroSection";
import BlackSection from "@/components/sections/BlackSection";
import HowWeWorkSection from "@/components/sections/HowWeWorkSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Digital Upstream's portfolio of brand design and web development projects. Explore case studies in AI, SaaS, and consumer apps.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work | Digital Upstream",
    description:
      "Digital Upstream's portfolio of brand design and web development projects. Explore case studies in AI, SaaS, and consumer apps.",
    siteName: "Digital Upstream",
    url: "https://digital-upstream.com/work",
    images: [
      {
        url: "/digital-upstream-logo.png",
        width: 1200,
        height: 630,
        alt: "Digital Upstream Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work | Digital Upstream",
    description:
      "Digital Upstream's portfolio of brand design and web development projects.",
    images: ["/digital-upstream-logo.png"],
  },
};

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Digital Upstream Portfolio",
            description:
              "Brand design and web development portfolio featuring AI, SaaS, and consumer app projects.",
            url: "https://digital-upstream.com/work",
            author: {
              "@type": "Organization",
              name: "Digital Upstream",
              url: "https://digital-upstream.com",
            },
          }),
        }}
      />
      <main id="content">
        <HeroSection />
        <BlackSection />
        <HowWeWorkSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}
