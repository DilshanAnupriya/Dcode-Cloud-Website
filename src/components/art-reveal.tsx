"use client";

import { useRef } from "react";
import { ServiceArt } from "@/illustrations/service-art";
import { gsap, PLAY_ONCE, MOTION_OK, useGSAP } from "@/lib/gsap";
import type { ServiceKey } from "@/lib/services";

/** A service drawing that traces itself in when it scrolls into view. */
export function ArtReveal({ kind }: { kind: ServiceKey }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top 78%", toggleActions: PLAY_ONCE } })
          .fromTo(el.querySelectorAll("[data-draw]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1, ease: "dc-inout", stagger: 0.04 })
          .from(
            el.querySelectorAll("[data-pop]"),
            { autoAlpha: 0, scale: 0.92, transformOrigin: "50% 50%", duration: 0.5, ease: "dc-out", stagger: 0.03 },
            0.35,
          );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className="board relative overflow-hidden p-6 md:p-10">
      <div aria-hidden className="bg-dots absolute inset-0 opacity-50" />
      <div className="relative">
        <ServiceArt kind={kind} />
      </div>
    </div>
  );
}
