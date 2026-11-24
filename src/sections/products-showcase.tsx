"use client";

import Link from "next/link";
import { useRef } from "react";
import { Reveal } from "@/components/reveal";
import { TraceArrow } from "@/components/trace-arrow";
import { buildCrmTimeline, CrmPipeline } from "@/illustrations/crm-pipeline";
import { buildPayrollTimeline, PayrollRun } from "@/illustrations/payroll-run";
import { buildProcurementTimeline, ProcurementMatch } from "@/illustrations/procurement-match";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { products, type ProductSlug } from "@/lib/site";

const ART: Record<ProductSlug, { Illustration: () => React.JSX.Element; build: (el: HTMLElement) => gsap.core.Timeline }> = {
  payflow: { Illustration: PayrollRun, build: buildPayrollTimeline },
  crm: { Illustration: CrmPipeline, build: buildCrmTimeline },
  procurement: { Illustration: ProcurementMatch, build: buildProcurementTimeline },
};

export function ProductsShowcase() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          pinnable: "(min-width: 1024px) and (min-height: 820px)",
        },
        (ctx) => {
          const { motion, pinnable } = ctx.conditions as { motion: boolean; pinnable: boolean };
          if (!motion) return;
          el.querySelectorAll<HTMLElement>("[data-chapter]").forEach((chapter) => {
            const slug = chapter.dataset.chapter as ProductSlug;
            const boardEl = chapter.querySelector<HTMLElement>("[data-board] > *");
            if (!boardEl) return;
            const tl = ART[slug].build(boardEl);
            const pin = pinnable && chapter.dataset.pin === "true";
            ScrollTrigger.create({
              animation: tl,
              trigger: pin ? chapter : boardEl,
              start: pin ? "center center+=36" : "top 80%",
              end: pin ? "+=1400" : "bottom 62%",
              scrub: 0.8,
              pin,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            });
          });
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="products" className="relative bg-card py-24 md:py-32">
      <div className="container-x">
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p data-reveal className="eyebrow">
              Products
            </p>
            <h2 data-split className="h-section mt-6">
              Three products. One platform underneath.
            </h2>
          </div>
          <p data-reveal className="lede md:col-span-5 md:pb-2">
            Each product handles one part of the business properly. They share sign-in, roles, audit and integrations,
            so adding the next one is a matter of switching it on.
          </p>
        </Reveal>

        <div className="mt-12 md:mt-16">
          {products.map((p, i) => {
            const { Illustration } = ART[p.slug];
            const flip = i % 2 === 1;
            return (
              <article
                key={p.slug}
                data-chapter={p.slug}
                data-pin={p.slug === "payflow" ? "true" : "false"}
                className="grid items-center gap-10 border-t border-line py-16 lg:grid-cols-12 lg:gap-14 lg:py-20"
              >
                <Reveal className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`} start="top 80%">
                  <div data-reveal className="flex flex-wrap items-center gap-3">
                    <span className="mono text-[0.75rem] uppercase tracking-[0.14em] text-ink">{p.name}</span>
                    <span className="h-px w-6 bg-line-2" />
                    <span className="text-[0.85rem] text-muted">{p.area}</span>
                    <span className={`chip chip-dot ${p.status === "live" ? "chip-live" : "chip-build"}`}>{p.statusLabel}</span>
                  </div>
                  <h3 data-reveal className="h-chapter mt-6">
                    {p.headline}
                  </h3>
                  <p data-reveal className="mt-5 text-body">
                    {p.summary}
                  </p>
                  <ul data-reveal className="mt-7 space-y-3">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-3.5 text-[0.98rem] text-ink">
                        <svg className="mt-[0.45em] shrink-0" width="18" height="8" viewBox="0 0 18 8" aria-hidden="true">
                          <line x1="1" y1="4" x2="11" y2="4" stroke="#C8102E" strokeWidth="1.75" strokeLinecap="round" />
                          <circle cx="14" cy="4" r="3" fill="#C8102E" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div data-reveal className="mt-9 flex flex-wrap items-center gap-6">
                    <Link href={`/products/${p.slug}`} className="link-trace">
                      <span>{p.status === "live" ? `Explore ${p.name.replace("Dcode ", "")}` : `About ${p.name.replace("Dcode ", "")}`}</span>
                      <TraceArrow />
                    </Link>
                    {p.status === "building" && (
                      <Link href={p.cta.href} className="text-[0.95rem] font-semibold text-red hover:text-red-deep">
                        Join early access
                      </Link>
                    )}
                  </div>
                </Reveal>
                <div data-board className={`min-w-0 lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
                  <Illustration />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
