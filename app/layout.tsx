import type { Metadata, Viewport } from "next";
import { cookies, headers } from "next/headers";
import Script from "next/script";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeThemeScroll from "@/components/HomeThemeScroll";
import CookieConsent from "@/components/CookieConsent";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://digital-upstream.com"),
  title: {
    default: "Digital Upstream",
    template: "%s | Digital Upstream",
  },
  description: "Professional web development portfolio and services.",
  icons: {
    icon: [
      { url: "/digital-upstream-logo.svg", type: "image/svg+xml" },
      { url: "/digital-upstream-logo.png", type: "image/png" },
    ],
    apple: [{ url: "/digital-upstream-logo.png", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  keywords: [
    "web development",
    "frontend",
    "UI/UX",
    "Next.js",
    "React",
    "brand design",
    "portfolio",
  ],
  applicationName: "Digital Upstream",
  authors: [{ name: "Digital Upstream" }],
  openGraph: {
    title: "Digital Upstream",
    description: "Professional web development portfolio and services.",
    siteName: "Digital Upstream",
    url: "https://digital-upstream.com/",
    images: [
      {
        url: "/digital-upstream-logo.png",
        width: 1200,
        height: 630,
        alt: "Digital Upstream Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Upstream",
    description: "Professional web development portfolio and services.",
    images: ["/digital-upstream-logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F4F4" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("du_cookie_consent")?.value ?? null;
  const initialConsent =
    cookieValue === "granted" || cookieValue === "denied" ? cookieValue : null;
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="preconnect"
          href="https://digital-upstream.s3.eu-central-003.backblazeb2.com"
        />
        <link
          rel="dns-prefetch"
          href="https://digital-upstream.s3.eu-central-003.backblazeb2.com"
        />
        <link rel="preload" as="image" href="/projects/poster.jpg" />
      </head>
      <body
        className={`${jakartaSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased font-sans`}
      >
        <HomeThemeScroll />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 rounded px-3 py-2 bg-primary text-primary-foreground"
        >
          Skip to content
        </a>
        <CookieConsent initialConsent={initialConsent} scriptNonce={nonce} />
        <Header />
        {children}
        {/* JSON-LD: Organization */}
        <Script id="org-jsonld" type="application/ld+json" nonce={nonce}>
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Digital Upstream",
            url: "https://digital-upstream.com",
            logo: "https://digital-upstream.com/digital-upstream-logo.png",
            sameAs: ["https://www.tiktok.com/@digitalupstream"],
            contactPoint: [
              {
                "@type": "ContactPoint",
                email: "contact@digital-upstream.com",
                contactType: "customer service",
                availableLanguage: ["en"],
              },
            ],
          })}
        </Script>
        <Script id="service-jsonld" type="application/ld+json" nonce={nonce}>
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Digital Upstream",
            url: "https://digital-upstream.com",
            description: "Web development, UI/UX, and product design services.",
            email: "contact@digital-upstream.com",
            sameAs: ["https://www.tiktok.com/@digitalupstream"],
            areaServed: "Worldwide",
            serviceType: ["Web development", "UI/UX design", "Branding"],
          })}
        </Script>
        <Script id="website-jsonld" type="application/ld+json" nonce={nonce}>
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Digital Upstream",
            url: "https://digital-upstream.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://digital-upstream.com/?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </Script>
        <Footer />
      </body>
    </html>
  );
}
