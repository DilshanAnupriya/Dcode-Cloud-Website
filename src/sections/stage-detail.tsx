"use client";

import { useRef, useState } from "react";
import { Reveal } from "@/components/reveal";
import { DESKTOP, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { STAGES } from "@/lib/process";

function Bullet() {
  return (
    <span aria-hidden className="mt-[0.62em] flex shrink-0 items-center">
      <span className="h-[2px] w-2.5 bg-red/60" />
      <span className="h-1.5 w-1.5 rounded-full bg-red" />
    </span>
  );
}

function DocIcon() {
  return (
    <svg aria-hidden width="18" height="22" viewBox="0 0 18 22" className="shrink-0">
      <path d="M2 1.5h9l5 5v13a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-17a1 1 0 0 1 1-1Z" fill="#fff" stroke="#C9CEDB" />
      <path d="M11 1.5v5h5" fill="none" stroke="#C9CEDB" />
      <path d="M4.5 11h8M4.5 14h8M4.5 17h5" stroke="#C8102E" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/** Every stage in full. On desktop a sticky index tracks the stage in the middle of the screen. */
export function StageDetail() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        el.querySelectorAll<HTMLElement>("[data-stage]").forEach((stage, i) => {
          ScrollTrigger.create({
            trigger: stage,
            start: "top 50%",
            end: "bottom 50%",
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
        gsap.fromTo(
          el.querySelector("[data-index-fill]"),
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: el.querySelector("[data-stages]"), start: "top 50%", end: "bottom 50%", scrub: 0.4 } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="stages-heading" className="relative border-t border-line bg-card py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <aside className="hidden lg:col-span-4 lg:block">
          <nav aria-label="Stages" className="sticky top-28">
            <p id="stages-heading" className="eyebrow">
              The five stages
            </p>
            <ol className="relative mt-8">
              <span aria-hidden className="absolute bottom-5 left-[7px] top-5 w-[2px] bg-line" />
              <span data-index-fill aria-hidden className="absolute bottom-5 left-[7px] top-5 w-[2px] origin-top bg-red" />
              {STAGES.map((s, i) => {
                const on = i === active;
                const past = i < active;
                return (
                  <li key={s.key}>
                    <a href={`#${s.key}`} aria-current={on ? "step" : undefined} className="group relative flex items-baseline gap-4 py-3.5 pl-9">
                      <span
                        aria-hidden
                        className={`absolute left-0 top-[1.3rem] h-4 w-4 rounded-full border-2 transition-[background-color,border-color,transform] duration-300 ease-out-strong ${
                          on ? "scale-110 border-red bg-red" : past ? "border-red bg-card" : "border-line-2 bg-card"
                        }`}
                      />
                      <span className="mono text-[0.72rem] text-red">{String(i + 1).padStart(2, "0")}</span>
                      <span
                        className={`text-[1.4rem] font-semibold tracking-tight transition-colors duration-200 ${
                          on ? "text-ink" : "text-faint group-hover:text-body"
                        }`}
                      >
                        {s.name}
                      </span>
                      <span className="mono ml-auto whitespace-nowrap text-[0.7rem] text-muted">{s.time}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        <div data-stages className="min-w-0 lg:col-span-8">
          {STAGES.map((s, i) => (
            <article
              key={s.key}
              id={s.key}
              data-stage
              className="scroll-mt-28 border-t border-line py-14 first:border-t-0 first:pt-0 last:pb-0 md:py-16"
            >
              <Reveal>
                <p data-reveal className="mono text-[0.72rem] uppercase tracking-[0.14em] text-red">
                  {String(i + 1).padStart(2, "0")} · {s.time}
                </p>
                <h2 data-split className="h-chapter mt-4">
                  {s.name}
                </h2>
                <p data-reveal className="lede mt-5 max-w-2xl">
                  {s.body}
                </p>
                <div data-reveal className="mt-10 grid gap-10 md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">What happens</h3>
                    <ul className="mt-4 space-y-3.5">
                      {s.happens.map((h) => (
                        <li key={h} className="flex gap-3 text-[0.98rem] leading-relaxed text-body">
                          <Bullet />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">What you get</h3>
                    <ul className="mt-4 grid gap-2">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-3 rounded-xl border border-line bg-paper/60 px-4 py-3 text-[0.93rem] font-semibold text-ink">
                          <DocIcon />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p data-reveal className="mt-8 flex flex-col gap-1.5 rounded-2xl border border-dashed border-line-2 px-5 py-4 text-[0.95rem] text-body sm:flex-row sm:gap-4">
                  <span className="mono shrink-0 pt-[0.2em] text-[0.72rem] uppercase tracking-[0.14em] text-red">From you</span>
                  {s.you}
                </p>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
