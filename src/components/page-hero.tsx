"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

/** Entrance for inner-page heroes: headline lines rise, the rest follows. */
export function PageHeroMotion({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set(el.querySelectorAll(".hero-pre"), { visibility: "visible" });
        const h1 = el.querySelector("h1");
        if (h1) {
          SplitText.create(h1, {
            type: "lines,words",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) => gsap.from(self.words, { yPercent: 115, duration: 1.05, ease: "dc-out", stagger: 0.04, delay: 0.1 }),
          });
        }
        gsap.from(el.querySelectorAll("[data-rise]"), { autoAlpha: 0, y: 16, duration: 0.9, ease: "dc-out", stagger: 0.07, delay: 0.35 });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
