"use client";

import { useRef } from "react";
import { buildCrmTimeline, CrmPipeline } from "@/illustrations/crm-pipeline";
import { buildPayrollTimeline, PayrollRun } from "@/illustrations/payroll-run";
import { buildProcurementTimeline, ProcurementMatch } from "@/illustrations/procurement-match";
import { gsap, PLAY_ONCE, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { ProductSlug } from "@/lib/site";

export const PRODUCT_ART: Record<
  ProductSlug,
  { Illustration: () => React.JSX.Element; build: (el: HTMLElement) => gsap.core.Timeline; speed: number }
> = {
  payflow: { Illustration: PayrollRun, build: buildPayrollTimeline, speed: 1.35 },
  crm: { Illustration: CrmPipeline, build: buildCrmTimeline, speed: 1 },
  procurement: { Illustration: ProcurementMatch, build: buildProcurementTimeline, speed: 1 },
};

/** Plays a product's workflow once it scrolls into view, with a replay control. */
export function ProductStory({ slug }: { slug: ProductSlug }) {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const { Illustration } = PRODUCT_ART[slug];

  useGSAP(
    () => {
      const el = ref.current?.firstElementChild as HTMLElement | null;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const t = PRODUCT_ART[slug].build(el).pause(0).timeScale(PRODUCT_ART[slug].speed);
        tl.current = t;
        ScrollTrigger.create({ trigger: el, start: "top 80%", animation: t, toggleActions: PLAY_ONCE });
        return () => {
          tl.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );


  return (
    <div>
      <div ref={ref}>
        <Illustration />
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 px-1">
        <p className="mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">Example data</p>
        <button
          type="button"
          onClick={() => tl.current?.restart()}
          className="mono inline-flex items-center gap-2 rounded-full border border-line-2 px-3 py-1.5 text-[0.72rem] uppercase tracking-[0.1em] text-ink transition-[transform,border-color] duration-150 hover:border-ink active:scale-[0.97] motion-reduce:hidden"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M2 6a4 4 0 1 0 1.2-2.85" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2 1.5v2.5h2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Replay
        </button>
      </div>
    </div>
  );
}
