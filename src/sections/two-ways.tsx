"use client";

import Link from "next/link";
import { useRef } from "react";
import { Reveal } from "@/components/reveal";
import { TraceArrow } from "@/components/trace-arrow";
import { Blueprint } from "@/illustrations/blueprint";
import { ProductsStack } from "@/illustrations/products-stack";
import { gsap, PLAY_ONCE, MOTION_OK, useGSAP } from "@/lib/gsap";

export function TwoWays() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Products panel: chips drop onto the base and their traces connect.
        gsap
          .timeline({ defaults: { ease: "dc-out" }, scrollTrigger: { trigger: q("[data-panel='products']")[0], start: "top 75%", toggleActions: PLAY_ONCE } })
          .from(q("[data-ps-base]"), { autoAlpha: 0, y: 16, duration: 0.8 })
          .from(q("[data-ps-chip]"), { autoAlpha: 0, y: -26, duration: 0.9, stagger: 0.1 }, 0.15)
          .from(q("[data-ps-track]"), { autoAlpha: 0, duration: 0.4, stagger: 0.1 }, 0.45)
          .fromTo(q("[data-ps-trace]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.7, ease: "dc-inout", stagger: 0.1 }, 0.5)
          .from(q("[data-ps-term]"), { autoAlpha: 0, scale: 0.4, transformOrigin: "50% 50%", duration: 0.45, stagger: 0.1, ease: "back.out(2.2)" }, 0.95)
          .from(q("[data-ps-bar]"), { scaleX: 0, transformOrigin: "0% 50%", duration: 1.2, ease: "dc-inout" }, 0.9);

        // Custom panel: the blueprint draws itself, then the motion path plays.
        const dot = q("[data-bp-dot]")[0];
        const path = q("[data-bp-path]")[0] as unknown as SVGPathElement | undefined;
        const bp = gsap.timeline({ defaults: { ease: "dc-out" }, scrollTrigger: { trigger: q("[data-panel='custom']")[0], start: "top 75%", toggleActions: PLAY_ONCE } });
        bp.fromTo(q("[data-bp-draw]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.1, ease: "dc-inout", stagger: 0.05 })
          .from(q("[data-bp-guide]"), { autoAlpha: 0, duration: 0.6, stagger: 0.04 }, 0.4)
          .from(q("[data-bp-block]"), { scaleX: 0, transformOrigin: "0% 50%", duration: 0.7, stagger: 0.07 }, 0.7)
          .fromTo(q("[data-bp-path]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.9, ease: "dc-inout" }, 1)
          .from(q("[data-bp-key]"), { autoAlpha: 0, scale: 0.5, transformOrigin: "50% 50%", duration: 0.4, stagger: 0.1 }, 1.3)
          .from(q("[data-bp-dim]"), { autoAlpha: 0, duration: 0.6 }, 1.2);
        if (dot && path) {
          gsap.set(dot, { autoAlpha: 0 });
          bp.set(dot, { autoAlpha: 1 }, 1.6).add(
            gsap.to(dot, {
              motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
              duration: 2.4,
              ease: "dc-inout",
              repeat: -1,
              yoyo: true,
              repeatDelay: 0.6,
            }),
            1.6,
          );
        } else if (dot) {
          gsap.set(dot, { autoAlpha: 0 });
        }
      });

      // Without motion the dot still needs a resting place on the path.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const dot = q("[data-bp-dot]")[0];
        if (dot) gsap.set(dot, { x: 452, y: 104 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p data-reveal className="eyebrow">
              Two ways to work with us
            </p>
            <h2 data-split className="h-section mt-6">
              Use our products, or have us build yours.
            </h2>
          </div>
          <p data-reveal className="lede md:col-span-5 md:pb-2">
            Both come from the same team and the same codebase habits: tenant isolation, audit trails, background jobs
            and tests that run before anything ships.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <article data-panel="products" className="board flex flex-col overflow-hidden">
            <div className="p-8 md:p-10">
              <p className="mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">ERP products</p>
              <h3 className="h-chapter mt-4">Run your business on Dcode.</h3>
              <p className="mt-4 max-w-md text-body">
                ERP modules that start with Payflow for payroll. CRM and Procurement join the same platform, so your
                team keeps one login, one set of roles and one audit trail as you add them.
              </p>
            </div>
            <div className="mt-auto border-t border-line bg-paper/60 px-6 pb-4 pt-8 md:px-10">
              <ProductsStack />
            </div>
            <div className="flex items-center justify-between border-t border-line px-8 py-5 md:px-10">
              <Link href="/erp" className="link-trace">
                <span>See the ERP</span> <TraceArrow />
              </Link>
              <span className="mono text-[0.72rem] text-muted">1 in use · 2 in development</span>
            </div>
          </article>

          <article data-panel="custom" className="on-dark relative flex flex-col overflow-hidden rounded-[22px] bg-navy-900 text-mist">
            <div aria-hidden className="bg-grid-dark absolute inset-0" />
            <div className="relative p-8 md:p-10">
              <p className="mono text-[0.72rem] uppercase tracking-[0.14em] text-navy-200">Custom</p>
              <h3 className="h-chapter mt-4 text-white">Have us build it.</h3>
              <p className="mt-4 max-w-md text-navy-200">
                Business systems, SaaS applications and websites from the team that keeps a multi-tenant platform running
                in production every day.
              </p>
            </div>
            <div className="relative mt-auto border-t border-navy-800 px-6 pb-4 pt-8 md:px-10">
              <Blueprint />
            </div>
            <div className="relative flex items-center justify-between border-t border-navy-800 px-8 py-5 md:px-10">
              <Link href="/services" className="link-trace">
                <span>See custom services</span> <TraceArrow />
              </Link>
              <span className="mono text-[0.72rem] text-navy-400">software · web · SaaS</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
