"use client";

import { useEffect } from "react";

export default function SmoothScroll({ strength = 1.25, friction = 0.9, maxDelta = 120 }: { strength?: number; friction?: number; maxDelta?: number }) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let position = window.scrollY;
    let velocity = 0;
    let rafId = 0;

    function isScrollable(el: HTMLElement | null): boolean {
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        const overflowX = style.overflowX;
        const canScrollY = (overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight;
        const canScrollX = (overflowX === "auto" || overflowX === "scroll") && el.scrollWidth > el.clientWidth;
        if (canScrollY || canScrollX) return true;
        el = el.parentElement;
      }
      return false;
    }

    const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      position = clamp(position + velocity, 0, max);
      window.scrollTo({ top: position, behavior: "auto" });
      velocity *= friction; // inertia decay for ultra-smooth feel
      if (Math.abs(velocity) > 0.1) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };

    const onWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (isScrollable(target)) return; // allow native inside scroll areas

      e.preventDefault();
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 30; // line -> pixel
      delta = Math.max(Math.min(delta, maxDelta), -maxDelta);
      velocity += delta * strength; // immediate response + smooth inertia
      if (!rafId) rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel as EventListener);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [strength, friction, maxDelta]);

  return null;
}