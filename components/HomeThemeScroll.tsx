"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ThemeScroll from "@/components/ThemeScroll";

export default function HomeThemeScroll() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (isHome) return;
    document.documentElement.style.setProperty("--bg-ratio", "0%");
  }, [isHome]);

  if (!isHome) return null;

  return (
    <>
      <ThemeScroll
        targetSelector="#black-section"
        startVh={0.6}
        endVh={0.68}
        maxPercent={100}
      />
      <ThemeScroll
        targetSelector="#projects"
        rangePx={100}
        offsetPx={-520}
        fromPercent={100}
        toPercent={0}
        applyBeforeStart={false}
      />
    </>
  );
}

