import type { Metadata } from "next";
import Script from "next/script";
import Masthead from "@/components/sections/Masthead";
import Statement from "@/components/sections/Statement";
import Method from "@/components/sections/Method";
import Cases from "@/components/sections/Cases";
import Correspondence from "@/components/sections/Correspondence";

export const metadata: Metadata = {
  title: "Digital Upstream — Brand &amp; Interface Design Studio",
  description:
    "Independent studio for restrained, production-grade brand and interface work. Selected case studies in AI, SaaS, and consumer products.",
  alternates: { canonical: "/" },
  keywords: [
    "design studio",
    "brand design",
    "web development",
    "Next.js",
    "AI products",
    "SaaS",
    "portfolio",
  ],
  openGraph: {
    title: "Digital Upstream — Brand &amp; Interface Design Studio",
    description:
      "Independent studio for restrained, production-grade brand and interface work. Selected case studies in AI, SaaS, and consumer products.",
    siteName: "Digital Upstream",
    url: "https://digital-upstream.com",
    type: "website",
    images: [
      {
        url: "/digital-upstream-logo.png",
        width: 1200,
        height: 630,
        alt: "Digital Upstream",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Upstream",
    description:
      "Independent studio for restrained, production-grade brand and interface work.",
    images: ["/digital-upstream-logo.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <Script id="home-creativework-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "Digital Upstream",
          description:
            "Independent studio for restrained, production-grade brand and interface work.",
          url: "https://digital-upstream.com",
          author: {
            "@type": "Organization",
            name: "Digital Upstream",
            url: "https://digital-upstream.com",
          },
        })}
      </Script>
      <main id="content" className="grain">
        <Masthead />
        <Statement />
        <Method />
        <Cases />
        <Correspondence />
      </main>
    </>
  );
}
