"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import ThemeScroll from "@/components/ThemeScroll";

const subscribe = (callback: () => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }
  const mq = window.matchMedia("(min-width: 768px)");
  const handler = () => callback();
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
};

const getSnapshot = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(min-width: 768px)").matches;
};

export default function HomeThemeScroll() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDesktop = useSyncExternalStore(subscribe, getSnapshot, () => false);

  useEffect(() => {
    if (isHome) return;
    document.documentElement.style.setProperty("--bg-ratio", "0%");
  }, [isHome]);

  if (!isHome || !isDesktop) return null;

  return (
    <>
      <ThemeScroll
        targetSelector="#statement"
        startVh={0.6}
        endVh={0.78}
        maxPercent={100}
      />
      <ThemeScroll
        targetSelector="#cases"
        rangePx={140}
        offsetPx={-560}
        fromPercent={100}
        toPercent={0}
        applyBeforeStart={false}
      />
    </>
  );
}
