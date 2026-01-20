"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ProjectMediaStrip from "@/components/ProjectMediaStrip";
import type { ProjectMediaItem } from "@/lib/projects";

export default function ProjectMediaPanel({
  hero,
  gallery,
}: {
  hero: ProjectMediaItem;
  gallery: ProjectMediaItem[];
}) {
  const posterSrc = useMemo(() => {
    const pick =
      gallery.find((m) => m.kind === "image" && (m.label ?? "") !== "Logo") ??
      gallery.find((m) => m.kind === "image");
    return pick?.src;
  }, [gallery]);

  const allImages = useMemo(() => {
    const combined = [hero, ...gallery].filter((m) => m.kind === "image");
    const seen = new Set<string>();
    const unique: ProjectMediaItem[] = [];
    for (const m of combined) {
      const key = `${m.kind}-${m.src}-${m.label ?? ""}`;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(m);
    }
    return unique;
  }, [gallery, hero]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isOpen = lightboxIndex !== null;
  const currentIndex = lightboxIndex ?? 0;

  const slides = useMemo(
    () =>
      allImages.map((m) => ({
        src: m.src,
        alt: m.alt,
        title: m.label ?? m.alt,
        description: m.label ? m.alt : undefined,
      })),
    [allImages],
  );

  const openFromItem = (item: ProjectMediaItem) => {
    if (item.kind !== "image") return;
    const idx = allImages.findIndex(
      (m) =>
        m.kind === "image" &&
        m.src === item.src &&
        (m.label ?? "") === (item.label ?? ""),
    );
    setLightboxIndex(idx >= 0 ? idx : 0);
  };

  return (
    <>
      <div className="rounded-lg border border-foreground/10 bg-background/40 overflow-hidden">
        <div className="aspect-video w-full bg-black/20">
          {hero.kind === "video" ? (
            <video
              className="h-full w-full object-contain"
              src={hero.src}
              poster={posterSrc}
              controls
              playsInline
              preload="none"
            />
          ) : (
            <button
              type="button"
              className="relative h-full w-full cursor-zoom-in"
              onClick={() => openFromItem(hero)}
              aria-label={`Open ${hero.alt}`}
            >
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-contain"
              />
            </button>
          )}
        </div>
        <div className="px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between gap-4">
          <p className="text-sm uppercase tracking-wide text-foreground/60">
            Media
          </p>
          {hero.label ? (
            <p className="text-sm text-foreground/75">{hero.label}</p>
          ) : null}
        </div>
        {gallery.length > 0 ? (
          <div className="px-4 pb-4 sm:px-5 sm:pb-5">
            <ProjectMediaStrip
              items={gallery}
              onItemClick={(index: number) => {
                const item = gallery[index];
                if (!item) return;
                openFromItem(item);
              }}
            />
          </div>
        ) : null}
      </div>

      {slides.length > 0 ? (
        <Lightbox
          open={isOpen}
          close={() => setLightboxIndex(null)}
          index={currentIndex}
          slides={slides}
          plugins={[]}
          toolbar={{ buttons: ["close"] }}
          carousel={{ imageFit: "contain", padding: "5%" }}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
            slide: { padding: "6vh 5vw" },
          }}
        />
      ) : null}
    </>
  );
}
