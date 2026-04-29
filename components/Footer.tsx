import Container from "@/components/Container";
import Link from "next/link";

const NAVIGATE = [
  { href: "/#cases", label: "Cases" },
  { href: "/#method", label: "Method" },
  { href: "/#correspondence", label: "Contact" },
  { href: "/about", label: "About" },
];

const LEGAL = [
  { href: "/terms", label: "Terms of service" },
  { href: "/cookies", label: "Cookies policy" },
  { href: "/privacy", label: "Privacy policy" },
];

const SOCIAL = [
  { href: "https://www.tiktok.com/@digitalupstream", label: "TikTok", handle: "@digitalupstream" },
  { href: "https://www.instagram.com/digital.upstream", label: "Instagram", handle: "@digital.upstream" },
  { href: "https://x.com/Digi_Upstream", label: "X", handle: "@Digi_Upstream" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-dark)] text-[oklch(0.96_0.005_75)]">
      <Container className="py-16 sm:py-20">
        {/* Colophon strip */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="cat-label text-current/60">Digital Upstream — Colophon</p>
            <p
              className="mt-6 display"
              style={{ fontSize: "clamp(2rem, 5.4vw, 4.5rem)" }}
            >
              <span className="block">Independent studio,</span>
              <span className="block">
                <span
                  className="display-italic"
                  style={{ color: "var(--accent)" }}
                >
                  built carefully.
                </span>
              </span>
            </p>
          </div>

          <div className="col-span-6 lg:col-span-2">
            <p className="eyebrow text-current/55 mb-4">Navigate</p>
            <ul className="flex flex-col gap-2">
              {NAVIGATE.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-serif text-base hover:italic hover:text-[var(--accent)] transition-all"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 lg:col-span-3">
            <p className="eyebrow text-current/55 mb-4">Channels</p>
            <ul className="flex flex-col gap-2">
              {SOCIAL.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-baseline justify-between gap-3 group"
                  >
                    <span className="small-caps text-current/55">{l.label}</span>
                    <span className="font-serif text-sm group-hover:italic group-hover:text-[var(--accent)] transition-all">
                      {l.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 hairline-strong text-current opacity-25" />

        {/* Bottom row */}
        <div className="mt-8 grid grid-cols-12 gap-x-6 gap-y-6 items-center">
          <div className="col-span-12 md:col-span-4 small-caps text-current/55">
            © {new Date().getFullYear()} Digital Upstream
          </div>
          <nav
            aria-label="Legal"
            className="col-span-12 md:col-span-5 flex flex-wrap gap-x-6 gap-y-2 small-caps text-current/55"
          >
            {LEGAL.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-current transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="col-span-12 md:col-span-3 md:text-right small-caps text-current/40">
            Set in Fraunces &amp; Plus Jakarta
          </p>
        </div>

        <p className="mt-8 text-xs text-current/40 max-w-3xl leading-relaxed">
          This site contains affiliate links. If you click an affiliate link and make
          a purchase, we may earn a commission at no extra cost to you. We only
          recommend products and services we believe in. See our{" "}
          <Link href="/terms" className="link-underline-hide-ltr text-current/55 hover:text-current transition-colors">
            terms of service
          </Link>{" "}
          for details.
        </p>
      </Container>
    </footer>
  );
}
