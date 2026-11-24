"use client";

import { useRef } from "react";
import { buildEngagementTimeline, EngagementTrace } from "@/illustrations/engagement-trace";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Hero art for /how-we-work: plays the five stages once, then keeps the Run
 * heartbeat going while on screen. Phones get the stacked layout so the
 * labels stay readable; the animation runs on whichever layout is showing.
 */
export function EngagementArt({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add({ motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 640px)" }, (ctx) => {
        const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
        if (!motion) return;
        gsap.set(el, { visibility: "visible" });
        const svg = el.querySelector(`[data-eg-layout='${wide ? "wide" : "tall"}']`);
        if (!svg) return;
        const { intro, beat } = buildEngagementTimeline(svg);
        intro.delay(0.45);
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            if (intro.progress() < 1) return;
            if (self.isActive) beat.play();
            else beat.pause();
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`hero-pre ${className ?? ""}`}>
      <div className="hidden sm:block">
        <EngagementTrace layout="wide" />
      </div>
      <div className="mx-auto max-w-[420px] sm:hidden">
        <EngagementTrace layout="tall" />
      </div>
    </div>
  );
}
