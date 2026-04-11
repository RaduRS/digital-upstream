import Link from "next/link";
import Container from "@/components/Container";
import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="z-50 bg-background/80 backdrop-blur">
      <Container className="flex items-start justify-between py-2 sm:py-3">
        <Link
          href="/"
          className="flex items-start gap-2 w-32 sm:w-40 md:w-64"
          aria-label="Digital Upstream logo"
        >
          <Logo className="p-1 sm:p-2" priority />
          <span className="sr-only">Digital Upstream</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/about"
                className="link-underline-rtl text-lg sm:text-xl text-foreground/50 hover:text-foreground transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <a
                href="https://newsletter.digital-upstream.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline-rtl text-lg sm:text-xl text-foreground/50 hover:text-foreground transition-colors"
              >
                Newsletter
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
