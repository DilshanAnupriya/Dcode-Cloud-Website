"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Child effects run before their parents, so triggers below a pinned section
 * can be created before the pin and miss its spacing. Rendered last on a page,
 * this re-sorts every trigger by position and recalculates once layout and
 * fonts have settled.
 */
export function ScrollSort() {
  useEffect(() => {
    const run = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    const id = requestAnimationFrame(run);
    document.fonts?.ready.then(run).catch(() => {});
    return () => cancelAnimationFrame(id);
  }, []);
  return null;
}
