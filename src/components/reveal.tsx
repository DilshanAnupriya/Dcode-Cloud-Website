"use client";

import { useRef } from "react";
import { gsap, PLAY_ONCE, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

/**
 * Scroll reveal for section intros. Children marked data-split rise line by
 * line out of a mask; children marked data-reveal fade up in a short stagger.
 * Content is visible in the HTML; the hidden state only exists once JS runs
 * and motion is allowed.
 */
export function Reveal({
  children,
  className,
  start = "top 82%",
}: {
  children: React.ReactNode;
  className?: string;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start, toggleActions: PLAY_ONCE } });
        el.querySelectorAll<HTMLElement>("[data-split]").forEach((node) => {
          SplitText.create(node, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) => {
              const t = gsap.from(self.lines, { yPercent: 105, duration: 1.05, ease: "dc-out", stagger: 0.09 });
              tl.add(t, 0);
              return t;
            },
          });
        });
        const items = el.querySelectorAll("[data-reveal]");
        if (items.length) {
          tl.from(items, { autoAlpha: 0, y: 22, duration: 0.95, ease: "dc-out", stagger: 0.08 }, 0.15);
        }
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
