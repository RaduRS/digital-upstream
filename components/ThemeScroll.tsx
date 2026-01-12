"use client";

import { useEffect } from "react";

// Blends the global background from the base white toward near-black in real time
// as the target section approaches the viewport top.
export default function ThemeScroll({
  targetSelector = "#black-section",
  maxPercent = 90,
  rangePx = 160,
  offsetPx = 0,
  startVh,
  endVh,
  fromPercent,
  toPercent,
  applyBeforeStart = true,
}: {
  targetSelector?: string;
  maxPercent?: number; // how far toward near-black to blend (0–100)
  rangePx?: number; // scroll distance over which blending occurs
  offsetPx?: number; // start offset relative to section top
  startVh?: number; // blend starts at scrollY = startVh * viewport height
  endVh?: number; // blend ends at scrollY = endVh * viewport height
  fromPercent?: number; // starting blend percentage (0–100)
  toPercent?: number; // ending blend percentage (0–100)
  applyBeforeStart?: boolean; // if false, do not set background until progress > 0
}) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const target = document.querySelector<HTMLElement>(targetSelector);
    if (!target) return;

    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
    let ticking = false;

    const computeTop = () => target.getBoundingClientRect().top + window.scrollY;
    let targetTop = computeTop();

    const update = () => {
      const y = window.scrollY;
      let progress: number;

      if (
        typeof startVh === "number" &&
        typeof endVh === "number" &&
        endVh > startVh
      ) {
        // Absolute thresholds based on viewport height multiples
        const start = startVh * window.innerHeight;
        const end = endVh * window.innerHeight;
        progress = clamp((y - start) / (end - start), 0, 1);
      } else {
        // Section-anchored thresholds
        const start = targetTop + offsetPx;
        progress = clamp((y - start) / rangePx, 0, 1);
      }

      const from = typeof fromPercent === "number" ? clamp(fromPercent, 0, 100) : 0;
      const to = typeof toPercent === "number"
        ? clamp(toPercent, 0, 100)
        : clamp(maxPercent, 0, 100);

      // If we should not apply before reaching the start threshold, skip updating
      if (!applyBeforeStart && progress <= 0) {
        ticking = false;
        return;
      }

      const value = from + progress * (to - from);
      const percentStr = `${value.toFixed(2)}%`;
      if (mq.matches) {
        // Reduced motion: jump at midpoint
        const jumpValue = progress >= 0.5 ? to : from;
        document.documentElement.style.setProperty("--bg-ratio", `${jumpValue}%`);
      } else {
        document.documentElement.style.setProperty("--bg-ratio", percentStr);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const onResize = () => {
      targetTop = computeTop();
      update();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [targetSelector, maxPercent, rangePx, offsetPx, startVh, endVh, fromPercent, toPercent, applyBeforeStart]);

  return null;
}