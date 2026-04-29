import Link from "next/link";
import Container from "@/components/Container";
import Logo from "@/components/Logo";

const NAV = [
  { href: "/#cases", label: "Cases", code: "DU/04" },
  { href: "/#method", label: "Method", code: "DU/03" },
  { href: "/about", label: "About", code: "DU/A" },
  { href: "/#correspondence", label: "Contact", code: "DU/05" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md">
      <Container className="flex items-center justify-between py-3 sm:py-4">
        <Link
          href="/"
          className="flex items-center gap-2 w-32 sm:w-40 md:w-56"
          aria-label="Digital Upstream — home"
        >
          <Logo className="p-1 sm:p-2" priority />
          <span className="sr-only">Digital Upstream</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-baseline gap-1.5"
                >
                  <span className="font-serif text-base text-foreground/70 group-hover:text-foreground group-hover:italic transition-all">
                    {item.label}
                  </span>
                  <span className="cat-label text-foreground/30 group-hover:text-[var(--accent)] transition-colors">
                    {item.code}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile: minimal anchor pair */}
        <nav aria-label="Primary mobile" className="md:hidden flex items-center gap-5">
          <Link
            href="/#cases"
            className="font-serif text-base text-foreground/75 hover:text-foreground transition-colors"
          >
            Cases
          </Link>
          <Link
            href="/#correspondence"
            className="font-serif italic text-base text-[var(--accent)]"
          >
            Contact
          </Link>
        </nav>
      </Container>
      <div className="hairline text-foreground" />
    </header>
  );
}
