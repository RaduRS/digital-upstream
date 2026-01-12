"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Multiplier applied to element's distance from viewport center */
  strength?: number; // smaller = subtler
  /** Maximum translation in pixels */
  maxTranslate?: number;
  /** Axis to translate on */
  axis?: "y" | "x";
};

export default function Parallax({
  children,
  className,
  strength = 0.06,
  maxTranslate = 24,
  axis = "y",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return; // respect reduced motion

    let rafId = 0;
    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const viewportW = window.innerWidth;
      const elCenterY = rect.top + rect.height / 2;
      const elCenterX = rect.left + rect.width / 2;
      const viewCenterY = viewportH / 2;
      const viewCenterX = viewportW / 2;

      const deltaY = elCenterY - viewCenterY;
      const deltaX = elCenterX - viewCenterX;
      const delta = axis === "y" ? deltaY : deltaX;
      const translate = clamp(delta * strength, -maxTranslate, maxTranslate);

      if (axis === "y") {
        el.style.transform = `translate3d(0, ${translate}px, 0)`;
      } else {
        el.style.transform = `translate3d(${translate}px, 0, 0)`;
      }
      rafId = 0;
    };

    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      if (!rafId) rafId = window.requestAnimationFrame(update);
    };

    // initial position
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId) window.cancelAnimationFrame(rafId);
      el.style.transform = "";
    };
  }, [strength, maxTranslate, axis]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}