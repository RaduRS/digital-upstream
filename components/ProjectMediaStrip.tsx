"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectMediaItem } from "@/lib/projects";

export default function ProjectMediaStrip({
  items,
  onItemClick,
}: {
  items: ProjectMediaItem[];
  onItemClick?: (index: number) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const hasMultiple = items.length > 1;
  const dots = useMemo(() => {
    const maxDots = 6;
    if (items.length <= maxDots) return items.map((_, i) => i);
    const raw = Array.from({ length: maxDots }, (_, i) =>
      Math.round((i * (items.length - 1)) / (maxDots - 1))
    );
    return raw.filter((v, i) => raw.indexOf(v) === i);
  }, [items]);

  const activeDot = useMemo(() => {
    if (dots.length === 0) return 0;
    let best = dots[0] ?? 0;
    let bestDist = Number.POSITIVE_INFINITY;
    for (const d of dots) {
      const dist = Math.abs(d - activeIndex);
      if (dist < bestDist) {
        bestDist = dist;
        best = d;
      }
    }
    return best;
  }, [activeIndex, dots]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);

      const children = Array.from(el.children) as HTMLElement[];
      if (children.length === 0) return;
      const viewportCenter = scrollLeft + clientWidth / 2;
      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      for (let i = 0; i < children.length; i++) {
        const child = children[i]!;
        const childCenter = child.offsetLeft + child.clientWidth / 2;
        const dist = Math.abs(childCenter - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }
      setActiveIndex(bestIdx);
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length]);

  const scrollByCards = (direction: -1 | 1) => {
    const next = Math.max(
      0,
      Math.min(items.length - 1, activeIndex + direction)
    );
    scrollToIndex(next);
  };

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children.item(index) as HTMLElement | null;
    if (!child) return;
    child.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  if (items.length === 0) return null;

  return (
    <div>
      <div className="relative">
        <div
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          ref={scrollerRef}
          aria-label="Project media carousel"
        >
          {items.map((m, index) => (
            <div
              key={`${m.kind}-${m.src}-${m.label ?? ""}`}
              className="min-w-[220px] sm:min-w-[240px] snap-start rounded-md border border-foreground/10 bg-background/30 overflow-hidden"
            >
              <div className="aspect-video bg-black/20">
                {m.kind === "video" ? (
                  <video
                    className="h-full w-full object-cover"
                    src={m.src}
                    controls
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <button
                    type="button"
                    className="relative h-full w-full cursor-zoom-in"
                    onClick={onItemClick ? () => onItemClick(index) : undefined}
                    aria-label={m.alt}
                  >
                    <Image
                      src={m.src}
                      alt={m.alt}
                      fill
                      unoptimized
                      sizes="240px"
                      className="object-contain"
                    />
                  </button>
                )}
              </div>
              {m.label ? (
                <div className="px-3 py-2">
                  <p className="text-sm text-foreground/70">{m.label}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {hasMultiple ? (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background/40 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background/40 to-transparent" />

            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll media left"
              className="absolute left-2 top-1/2 -translate-y-1/2 -mt-6 h-9 w-9 rounded-full border border-foreground/10 bg-background/70 backdrop-blur flex items-center justify-center text-foreground/80 transition-opacity disabled:opacity-0 hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              disabled={!canScrollRight}
              aria-label="Scroll media right"
              className="absolute right-2 top-1/2 -translate-y-1/2 -mt-6 h-9 w-9 rounded-full border border-foreground/10 bg-background/70 backdrop-blur flex items-center justify-center text-foreground/80 transition-opacity disabled:opacity-0 hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        ) : null}
      </div>

      {hasMultiple ? (
        <div
          className="mt-3 flex items-center justify-center gap-2"
          aria-label="Carousel position"
        >
          {dots.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to media ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === activeDot
                  ? "bg-foreground/70"
                  : "bg-foreground/20 hover:bg-foreground/35"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
