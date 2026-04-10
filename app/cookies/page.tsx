import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description:
    "Learn how Digital Upstream uses cookies, affiliate tracking, and analytics, and how to control your preferences.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <main id="content" className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">
              Policy
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Cookies policy
            </h1>
            <p className="text-base text-foreground/80 sm:text-lg">
              This policy explains how Digital Upstream uses cookies and similar
              technologies, including affiliate tracking, and how you can manage
              your choices.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/70">
              <Link
                href="/privacy"
                className="link-underline-rtl text-foreground"
              >
                Privacy policy
              </Link>
              <Link
                href="/terms"
                className="link-underline-rtl text-foreground"
              >
                Terms of service
              </Link>
              <Link
                href="/work#contact"
                className="link-underline-rtl text-foreground"
              >
                Contact
              </Link>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">
              What we use
            </h2>
            <p className="text-foreground/80">
              We only use analytics when you accept in the cookie banner. We may
              also use affiliate tracking cookies when you click on affiliate
              links. This helps us understand aggregated usage and track
              affiliate relationships.
            </p>
            <div className="space-y-2 text-foreground/80">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <p>
                  Google Analytics (provided by Google) to measure traffic and
                  usage trends. Only loaded when you accept analytics cookies.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <p>
                  Affiliate tracking cookies to credit referrals. These may be
                  set by affiliate partners when you click on affiliate links.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <p>
                  A preference record that remembers your consent choice.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">Your choices</h2>
            <p className="text-foreground/80">
              You must accept or decline before continuing to use the site. If you
              decline, we do not load Google Analytics or affiliate tracking
              cookies. If you accept, we load these tools to help improve the
              site and track affiliate relationships.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Third-party processing
            </h2>
            <p className="text-foreground/80">
              When enabled, Google Analytics and our affiliate partners may
              process data on our behalf. The data collected may include
              information about your device and how you interact with the site.
              Affiliate partners may process data in different countries. For
              details, review their respective privacy policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Affiliate links
            </h2>
            <p className="text-foreground/80">
              Some links on this site are affiliate links. When you click an
              affiliate link, the affiliate partner may set a cookie to track
              the referral. This is standard practice for affiliate marketing.
              We disclose affiliate relationships clearly within our content in
              accordance with advertising standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">
              How to change your preference
            </h2>
            <p className="text-foreground/80">
              You can reset your choice at any time by clearing this site&apos;s
              data in your browser. The banner will appear again on your next
              visit.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">Contact</h2>
            <p className="text-foreground/80">
              Questions about this policy can be sent to{" "}
              <a
                href="mailto:contact@digital-upstream.com"
                className="link-underline-rtl text-foreground"
              >
                contact@digital-upstream.com
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
      <Script id="cookies-webpage-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Cookies Policy",
          url: "https://digital-upstream.com/cookies",
          description:
            "Learn how Digital Upstream uses cookies, affiliate tracking, and analytics, and how to control your preferences.",
          isPartOf: {
            "@type": "WebSite",
            name: "Digital Upstream",
            url: "https://digital-upstream.com",
          },
        })}
      </Script>
    </main>
  );
}
