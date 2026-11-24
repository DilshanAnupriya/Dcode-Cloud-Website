"use client";

import { useRef } from "react";
import { Reveal } from "@/components/reveal";
import { gsap, PLAY_ONCE, MOTION_OK, useGSAP } from "@/lib/gsap";

const FIGURES = [
  { value: 8, unit: "%", label: "EPF, employee", note: "deducted from pay" },
  { value: 12, unit: "%", label: "EPF, employer", note: "on the same base" },
  { value: 3, unit: "%", label: "ETF", note: "employer only" },
  { value: 25, unit: "LKR", label: "Stamp duty", note: "per payslip over 25,000", prefix: true },
];

const VERSIONS = [
  { label: "2024/25 tables", state: "Used by payslips up to Mar 2025" },
  { label: "2025/26 tables", state: "In use today", current: true },
  { label: "Next budget", state: "Loaded as a new version" },
];

export function SriLanka() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: q("[data-figures]")[0], start: "top 80%", toggleActions: PLAY_ONCE } });
        (q("[data-fig]") as HTMLElement[]).forEach((fig, i) => {
          const out = fig.querySelector<HTMLElement>("[data-fig-num]");
          const target = Number(fig.dataset.fig);
          const n = { v: 0 };
          if (out) out.textContent = "0";
          tl.from(fig, { autoAlpha: 0, y: 24, duration: 0.9, ease: "dc-out" }, i * 0.1).to(
            n,
            {
              v: target,
              duration: 1.2,
              ease: "power3.out",
              onUpdate: () => {
                if (out) out.textContent = String(Math.round(n.v));
              },
            },
            i * 0.1 + 0.1,
          );
        });
        gsap.from(q("[data-version]"), {
          autoAlpha: 0,
          x: -16,
          duration: 0.8,
          ease: "dc-out",
          stagger: 0.12,
          scrollTrigger: { trigger: q("[data-versions]")[0], start: "top 85%", toggleActions: PLAY_ONCE },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden py-24 md:py-32">
      <div className="container-x">
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p data-reveal className="eyebrow">
              Made for Sri Lanka
            </p>
            <h2 data-split className="h-section mt-6">
              Local rules, built in from the start.
            </h2>
          </div>
          <p data-reveal className="lede md:col-span-5 md:pb-2">
            Payflow was designed around EPF, ETF, APIT and stamp duty from day one, with LKR amounts and pay periods on
            Colombo time.
          </p>
        </Reveal>

        <dl data-figures className="mt-16 grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {FIGURES.map((f, i) => (
            <div
              key={f.label}
              data-fig={f.value}
              // Explicit per-column classes: pseudo-class variants fight over specificity here.
              className={`flex flex-col border-b border-line py-8 pr-4 ${i % 2 === 0 ? "border-r pl-0" : "pl-6"} ${i === 0 ? "lg:pl-0" : "lg:pl-6"} ${i < FIGURES.length - 1 ? "lg:border-r" : "lg:border-r-0"}`}
            >
              <dt className="order-2 mt-5 font-semibold text-ink">{f.label}</dt>
              <dd className="order-1 flex items-start font-display font-semibold leading-[0.85] tracking-[-0.06em] text-ink">
                {f.prefix && <span className="mono mr-2 mt-2 text-[0.85rem] font-medium tracking-normal text-muted">{f.unit}</span>}
                <span data-fig-num className="num text-[clamp(4rem,10vw,8.5rem)]">
                  {f.value}
                </span>
                {!f.prefix && <span className="mt-[0.15em] text-[clamp(1.6rem,3.6vw,3rem)] text-red">{f.unit}</span>}
              </dd>
              <dd className="order-3 mt-1 text-[0.9rem] text-muted">{f.note}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="text-[1.5rem] font-semibold tracking-tight">When the budget changes the rates</h3>
            <p className="mt-4 text-body">
              Payflow keeps rates and APIT tables as dated versions. A new budget means loading new tables, and every
              past payslip keeps a record of the version it was calculated with, so history never gets rewritten.
            </p>
            <ul className="mono mt-6 flex flex-wrap gap-2 text-[0.72rem] text-muted">
              {["APIT tables 1 and 2", "SLIPS bank files", "EPF C-Form", "ETF return", "T-10 certificates"].map((t) => (
                <li key={t} className="rounded-full border border-line-2 px-2.5 py-1">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <ol data-versions className="relative space-y-3 lg:col-span-6 lg:col-start-7">
            <div aria-hidden className="absolute bottom-6 left-[11px] top-6 w-[2px] bg-line" />
            {VERSIONS.map((v) => (
              <li
                key={v.label}
                data-version
                className={`relative flex items-center gap-4 rounded-2xl border p-4 pl-3 ${
                  v.current ? "border-ink bg-card" : "border-dashed border-line-2"
                }`}
              >
                <span
                  className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full ${v.current ? "bg-red" : "border-2 border-line-2 bg-paper"}`}
                >
                  {v.current && <span className="h-2 w-2 rounded-full bg-white" />}
                </span>
                <span className="mono text-[0.85rem] font-medium text-ink">{v.label}</span>
                <span className="ml-auto text-right text-[0.85rem] text-muted">{v.state}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
