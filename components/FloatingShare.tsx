"use client";

import { useEffect, useState } from "react";
import { Twitter } from "lucide-react";

type FloatingShareProps = {
  title: string;
  slug: string;
};

export default function FloatingShare({ title, slug }: FloatingShareProps) {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const sy = window.scrollY;
      setScrollY(sy);
      setVisible(sy > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`https://digital-upstream.com/blog/${slug}`)}`;

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null;

  const viewportCenter = window.innerHeight / 2;
  const top = scrollY + viewportCenter;

  return (
    <div
      className="fixed z-40 hidden lg:block transition-all duration-500 ease-out"
      style={{
        transform: `translate3d(32px, ${top - 20}px, 0)`,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none" as "none" | "auto",
      }}
    >
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="flex items-center justify-center w-10 h-10 rounded-full border border-foreground/20 bg-background text-foreground/50 hover:text-foreground hover:border-foreground/40 transition-colors shadow-sm"
      >
        <Twitter className="h-4 w-4" />
      </a>
    </div>
  );
}