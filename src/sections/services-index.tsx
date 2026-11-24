"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Reveal } from "@/components/reveal";
import { TraceArrow } from "@/components/trace-arrow";
import { ServiceArt } from "@/illustrations/service-art";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { services } from "@/lib/services";

export function ServicesIndex() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // On desktop the row crossing the middle of the screen becomes active.
  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        el.querySelectorAll<HTMLElement>("[data-service-row]").forEach((row, i) => {
          ScrollTrigger.create({
            trigger: row,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Swap the drawing in the sticky panel when the active row changes.
  useGSAP(
    () => {
      const p = panel.current;
      if (!p) return;
      const motion = window.matchMedia(MOTION_OK).matches;
      gsap.utils.toArray<HTMLElement>("[data-art]", p).forEach((art, i) => {
        if (i !== active) {
          gsap.to(art, { autoAlpha: 0, duration: 0.18, ease: "power1.out", overwrite: true });
          return;
        }
        gsap.to(art, { autoAlpha: 1, duration: 0.3, ease: "dc-out", overwrite: true });
        if (!motion) return;
        gsap.fromTo(
          art.querySelectorAll("[data-draw]"),
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 0.9, ease: "dc-inout", stagger: 0.04, overwrite: true },
        );
        gsap.fromTo(
          art.querySelectorAll("[data-pop]"),
          { autoAlpha: 0, scale: 0.92, transformOrigin: "50% 50%" },
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: "dc-out", stagger: 0.03, delay: 0.3, overwrite: true },
        );
      });
    },
    { scope: panel, dependencies: [active] },
  );

  return (
    <section ref={root} id="services" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p data-reveal className="eyebrow">
              Custom work
            </p>
            <h2 data-split className="h-section mt-6">
              We build software, websites and SaaS for other companies too.
            </h2>
          </div>
          <p data-reveal className="lede md:col-span-4 md:pb-2">
            Same team, same standards as our own products. You work with the engineers who build it.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <ol className="lg:col-span-7">
            {services.map((s, i) => {
              const on = i === active;
              return (
                <li
                  key={s.key}
                  data-service-row
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative border-t border-line py-8 last:border-b md:py-10"
                >
                  <span
                    aria-hidden
                    className={`absolute -left-1 top-[2.65rem] hidden h-[2px] origin-left bg-red transition-[transform,opacity] duration-300 ease-out-strong lg:block md:top-[3.2rem] ${
                      on ? "w-5 scale-x-100 opacity-100" : "w-5 scale-x-0 opacity-0"
                    }`}
                  />
                  <div className={`transition-transform duration-300 ease-out-strong ${on ? "lg:translate-x-8" : ""}`}>
                    <h3
                      className={`text-[1.65rem] font-semibold tracking-tight transition-colors duration-200 md:text-[2.1rem] ${
                        on ? "text-ink" : "text-ink lg:text-faint"
                      }`}
                    >
                      {s.name}
                    </h3>
                    <p className="mt-3 max-w-xl text-body">{s.body}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <li key={t} className="mono rounded-full border border-line-2 px-2.5 py-1 text-[0.7rem] text-muted">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 lg:hidden">
                      <div className="board overflow-hidden p-4">
                        <ServiceArt kind={s.key} />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div ref={panel} className="board relative aspect-[4/3] overflow-hidden">
                <div aria-hidden className="bg-dots absolute inset-0 opacity-60" />
                {services.map((s, i) => (
                  <div
                    key={s.key}
                    data-art
                    className="absolute inset-0 grid place-items-center p-8"
                    style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
                  >
                    <ServiceArt kind={s.key} />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <p className="mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">
                  {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")} · {services[active].name}
                </p>
                <Link href="/services" className="link-trace text-[0.95rem]">
                  <span>All services</span> <TraceArrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
