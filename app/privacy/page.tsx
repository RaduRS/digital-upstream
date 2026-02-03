import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Digital Upstream handles personal data, analytics, and your privacy choices.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main id="content" className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">
              Policy
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Privacy policy
            </h1>
            <p className="text-base text-foreground/80 sm:text-lg">
              This policy explains what data Digital Upstream processes, why it
              is processed, and the choices you have.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/70">
              <Link
                href="/cookies"
                className="link-underline-rtl text-foreground"
              >
                Cookies policy
              </Link>
              <Link
                href="/#contact"
                className="link-underline-rtl text-foreground"
              >
                Contact
              </Link>
              <Link
                href="/projects"
                className="link-underline-rtl text-foreground"
              >
                Projects
              </Link>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Who we are (controller)
            </h2>
            <p className="text-foreground/80">
              Digital Upstream is responsible for the processing described in
              this policy.
            </p>
            <p className="text-foreground/80">
              You can reach us at{" "}
              <a
                href="mailto:contact@digital-upstream.com"
                className="link-underline-rtl text-foreground"
              >
                contact@digital-upstream.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">
              What we collect
            </h2>
            <div className="space-y-2 text-foreground/80">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <p>
                  Messages you send via email (your email address and the
                  content of your message).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <p>
                  Basic technical data required to serve the site (for example
                  IP address and user agent in standard server logs).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <p>
                  Aggregated usage data via Google Analytics, only if you
                  explicitly accept analytics cookies in the consent banner.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">Cookies</h2>
            <p className="text-foreground/80">
              We use cookies to remember your analytics preference and, if you
              opt in, to enable Google Analytics. Details are in the{" "}
              <Link
                href="/cookies"
                className="link-underline-rtl text-foreground"
              >
                cookies policy
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Why we use data (purposes)
            </h2>
            <div className="space-y-2 text-foreground/80">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <p>
                  To respond to inquiries and provide requested information.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <p>To operate, secure, and maintain the website.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <p>
                  To understand which pages are used and improve content and
                  performance (analytics is optional and consent-based).
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">Legal basis</h2>
            <div className="space-y-2 text-foreground/80">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <p>
                  Analytics cookies: your consent (you can accept or decline in
                  the banner).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <p>
                  Communications: steps at your request and our legitimate
                  interests in responding to inquiries.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <p>
                  Site operation and security: our legitimate interests in
                  running a secure, reliable website.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">Sharing</h2>
            <p className="text-foreground/80">
              We may share data with service providers that help us run the
              website. When analytics is enabled, Google acts as an analytics
              provider for aggregated usage measurement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">Retention</h2>
            <p className="text-foreground/80">
              We keep personal data only as long as needed for the purposes
              described above, unless a longer period is required by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">Your rights</h2>
            <p className="text-foreground/80">
              Depending on your location, you may have rights such as access,
              correction, deletion, objection, and data portability. To exercise
              rights, contact{" "}
              <a
                href="mailto:contact@digital-upstream.com"
                className="link-underline-rtl text-foreground"
              >
                contact@digital-upstream.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">Updates</h2>
            <p className="text-foreground/80">
              We may update this policy from time to time. The latest version
              will always be available on this page.
            </p>
          </section>
        </div>
      </Container>
      <Script id="privacy-webpage-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy",
          url: "https://digital-upstream.com/privacy",
          description:
            "Learn how Digital Upstream handles personal data, analytics, and your privacy choices.",
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
