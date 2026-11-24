"use client";

import Link from "next/link";
import { useRef } from "react";
import { Reveal } from "@/components/reveal";
import { TraceArrow } from "@/components/trace-arrow";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { STAGES } from "@/lib/process";

export function Process({ more = true }: { more?: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();
      mm.add({ motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 1024px)" }, (ctx) => {
        const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
        if (!motion) return;
        const list = q("[data-steps]")[0];
        const tl = gsap.timeline({ defaults: { ease: "none" } });
        // The rail runs down on phones and across on desktops.
        tl.fromTo(q("[data-rail-fill]"), wide ? { scaleX: 0 } : { scaleY: 0 }, { ...(wide ? { scaleX: 1 } : { scaleY: 1 }), duration: STAGES.length }, 0);
        q("[data-step]").forEach((step, i) => {
          tl.from(step.querySelector("[data-node]"), { scale: 0.4, backgroundColor: "#FFFFFF", duration: 0.25, ease: "back.out(2)" }, i + 0.1).from(
            step.querySelectorAll("[data-step-text]"),
            { autoAlpha: 0, y: 14, duration: 0.5, stagger: 0.06, ease: "dc-out" },
            i + 0.1,
          );
        });
        ScrollTrigger.create({ animation: tl, trigger: list, start: "top 78%", end: "bottom 60%", scrub: 0.6 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="process" className="relative border-t border-line bg-card py-24 md:py-32">
      <div className="container-x">
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p data-reveal className="eyebrow">
              How we work
            </p>
            <h2 data-split className="h-section mt-6">
              From the first call to running in production.
            </h2>
          </div>
          <p data-reveal className="lede md:col-span-5 md:pb-2">
            Five stages for every custom build. Fixed checkpoints, a preview you can click from the second sprint, and
            no handover to a different team at the end.
          </p>
        </Reveal>

        <ol data-steps className="relative mt-16 grid gap-10 md:mt-20 lg:grid-cols-5 lg:gap-6">
          {/* rail: vertical on small screens, horizontal on large */}
          <div aria-hidden className="absolute bottom-2 left-[9px] top-2 w-[2px] bg-line lg:bottom-auto lg:left-2 lg:right-2 lg:top-[9px] lg:h-[2px] lg:w-auto" />
          <div
            data-rail-fill
            aria-hidden
            className="absolute bottom-2 left-[9px] top-2 w-[2px] origin-top bg-red lg:bottom-auto lg:left-2 lg:right-2 lg:top-[9px] lg:h-[2px] lg:w-auto lg:origin-left"
          />
          {STAGES.map((s, i) => (
            <li key={s.name} data-step className="relative pl-10 lg:pl-0 lg:pt-12">
              <span
                data-node
                className="absolute left-0 top-0.5 block h-5 w-5 rounded-full border-[3px] border-red bg-red ring-[6px] ring-card lg:top-0"
              />
              <p data-step-text className="mono text-[0.72rem] uppercase tracking-[0.14em] text-red">
                {String(i + 1).padStart(2, "0")} · {s.time}
              </p>
              <h3 data-step-text className="mt-3 text-[1.6rem] font-semibold tracking-tight">
                {s.name}
              </h3>
              <p data-step-text className="mt-3 text-[0.95rem] leading-relaxed text-body">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
        {more && (
          <div className="mt-14 border-t border-line pt-8">
            <Link href="/how-we-work" className="link-trace text-[1rem]">
              <span>What happens in each stage</span> <TraceArrow />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
