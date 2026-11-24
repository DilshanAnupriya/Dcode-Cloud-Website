"use client";

import { useRef } from "react";
import { Reveal } from "@/components/reveal";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

const DAYS = ["M", "T", "W", "T", "F", "M", "T", "W", "T", "F"];

const NOTES = [
  ["Day 1", "Planning", "We agree what ships this sprint, written in your words, not ticket numbers."],
  ["Days 2 to 9", "Build", "Every change is reviewed by a second engineer and tested, then lands on the preview link the same day."],
  ["Day 10", "Demo and retro", "You click through what shipped. We note what to change next, and that becomes the next plan."],
] as const;

function RowLabel({ children }: { children: React.ReactNode }) {
  return <p className="mono text-[0.68rem] uppercase tracking-[0.14em] text-navy-400 md:pt-[0.7rem]">{children}</p>;
}

/** One two-week sprint as a calendar. A playhead scrubs through the days with scroll. */
export function SprintRhythm() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // One unit of time per working day.
        const tl = gsap.timeline({ defaults: { ease: "none" } });
        tl.fromTo(q("[data-sr-head]"), { left: "0%" }, { left: "100%", duration: 10 }, 0)
          .fromTo(q("[data-sr-plan]"), { autoAlpha: 0.25 }, { autoAlpha: 1, duration: 0.3 }, 0.2)
          .fromTo(q("[data-sr-build]"), { scaleX: 0 }, { scaleX: 1, duration: 8 }, 1)
          .fromTo(q("[data-sr-demo]"), { autoAlpha: 0.25 }, { autoAlpha: 1, duration: 0.3 }, 9.3);
        q("[data-sr-dot]").forEach((dot, i) => {
          tl.fromTo(dot, { scale: 0.3, autoAlpha: 0.2 }, { scale: 1, autoAlpha: 1, duration: 0.25, ease: "back.out(2)" }, i + 1.5);
        });
        const notes = q("[data-sr-note]");
        tl.fromTo(notes[0], { autoAlpha: 0.4 }, { autoAlpha: 1, duration: 0.3 }, 0.1)
          .fromTo(notes[1], { autoAlpha: 0.4 }, { autoAlpha: 1, duration: 0.3 }, 1)
          .fromTo(notes[2], { autoAlpha: 0.4 }, { autoAlpha: 1, duration: 0.3 }, 9.3);
        ScrollTrigger.create({ animation: tl, trigger: q("[data-sr-chart]")[0], start: "top 75%", end: "+=640", scrub: 0.6 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="on-dark relative overflow-hidden bg-navy-950 text-mist">
      <div aria-hidden className="bg-dots-dark pointer-events-none absolute inset-0" />
      <div className="container-x relative py-24 md:py-32">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p data-reveal className="eyebrow">
              Inside Build
            </p>
            <h2 data-split className="h-section mt-6 text-white">
              Two weeks, the same rhythm every time.
            </h2>
          </div>
          <p data-reveal className="text-[1.05rem] leading-relaxed text-navy-200 lg:col-span-5 lg:pb-2">
            Each sprint ends with software you can click, not a status report. The rhythm stays the same from the first
            sprint to the last, so you always know when the next demo is.
          </p>
        </Reveal>

        <figure className="mt-14">
          <div data-sr-chart className="relative rounded-[22px] border border-navy-800 bg-navy-900/70 p-5 md:p-8">
            {/* Calendar header */}
            <div className="grid md:grid-cols-[110px_minmax(0,1fr)] md:gap-x-6">
              <span className="hidden md:block" />
              <div>
                <div className="grid grid-cols-10 gap-1">
                  <p className="mono col-span-5 border-b border-navy-800 pb-2 text-[0.68rem] uppercase tracking-[0.14em] text-navy-400">Week 1</p>
                  <p className="mono col-span-5 border-b border-navy-800 pb-2 text-[0.68rem] uppercase tracking-[0.14em] text-navy-400">Week 2</p>
                </div>
                <div className="mt-2 grid grid-cols-10 gap-1">
                  {DAYS.map((d, i) => (
                    <p key={i} className="mono text-center text-[0.72rem] text-navy-200">
                      {d}
                      <span className="block text-[0.6rem] text-navy-400">{i + 1}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Rows */}
            <div className="relative mt-4 space-y-4 md:space-y-2">
              <div className="grid gap-1.5 md:grid-cols-[110px_minmax(0,1fr)] md:gap-x-6">
                <RowLabel>Plan</RowLabel>
                <div className="grid h-10 grid-cols-10 items-center gap-1">
                  <span
                    data-sr-plan
                    className="mono grid h-8 place-items-center rounded-lg bg-red-bright text-[0.62rem] uppercase tracking-[0.08em] text-white sm:text-[0.68rem]"
                    style={{ gridColumn: "1" }}
                  >
                    Plan
                  </span>
                </div>
              </div>
              <div className="grid gap-1.5 md:grid-cols-[110px_minmax(0,1fr)] md:gap-x-6">
                <RowLabel>Build</RowLabel>
                <div className="grid h-10 grid-cols-10 items-center gap-1">
                  <div className="relative h-8 overflow-hidden rounded-lg border border-dashed border-navy-700 bg-navy-900" style={{ gridColumn: "2 / 10" }}>
                    <div data-sr-build className="absolute inset-0 origin-left bg-[#2C4685]" />
                    <p className="mono relative flex h-full items-center px-3 text-[0.66rem] uppercase tracking-[0.1em] text-white sm:text-[0.7rem]">
                      Build · review · test
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-1.5 md:grid-cols-[110px_minmax(0,1fr)] md:gap-x-6">
                <RowLabel>Preview link</RowLabel>
                <div className="grid h-10 grid-cols-10 items-center gap-1">
                  {Array.from({ length: 9 }, (_, i) => (
                    <span key={i} className="grid place-items-center" style={{ gridColumn: String(i + 2) }}>
                      <span data-sr-dot className="block h-2.5 w-2.5 rounded-full bg-[#34D399] shadow-[0_0_0_4px_rgba(52,211,153,0.15)]" />
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-1.5 md:grid-cols-[110px_minmax(0,1fr)] md:gap-x-6">
                <RowLabel>Demo</RowLabel>
                <div className="grid h-10 grid-cols-10 items-center gap-1">
                  <span
                    data-sr-demo
                    className="mono grid h-8 place-items-center rounded-lg bg-white text-[0.62rem] uppercase tracking-[0.08em] text-navy-900 sm:text-[0.68rem]"
                    style={{ gridColumn: "10" }}
                  >
                    Demo
                  </span>
                </div>
              </div>

              {/* Playhead over the day columns */}
              <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 right-0 md:left-[134px]">
                <div data-sr-head className="absolute inset-y-[-8px] w-0" style={{ left: "100%" }}>
                  <span className="absolute inset-y-0 -left-px w-[2px] rounded-full bg-red-bright/80" />
                  <span className="absolute -left-[5px] -top-1 h-2.5 w-2.5 rounded-full bg-red-bright" />
                </div>
              </div>
            </div>
          </div>
          <figcaption className="sr-only">
            A two-week sprint: planning on day 1, building with review and tests on days 2 to 9 with the preview link
            updated each day, and a demo on day 10.
          </figcaption>
        </figure>

        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {NOTES.map(([when, title, body]) => (
            <li key={title} data-sr-note className="rounded-2xl border border-navy-800 bg-navy-900/50 p-6">
              <p className="mono text-[0.7rem] uppercase tracking-[0.14em] text-red-bright">{when}</p>
              <p className="mt-3 text-[1.2rem] font-semibold tracking-tight text-white">{title}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-navy-200">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
