"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

const SHARED = ["Sign-in", "Roles", "Audit log", "Company separation", "Files", "Background jobs"];

const MODULES = [
  { n: "01", area: "Payroll", name: "Payflow", state: "In use", href: "/products/payflow" },
  { n: "02", area: "Sales", name: "CRM", state: "In development", href: "/products/crm" },
  { n: "03", area: "Purchasing", name: "Procurement", state: "In development", href: "/products/procurement" },
  { n: "04", area: "Your process", name: "Custom module", state: "Built to order", href: "/services", custom: true },
];

/**
 * ERP hero diagram: the shared platform on top, a bus running down the left,
 * and each module plugged into it. Built in HTML so every label stays real
 * text at phone sizes.
 */
export function ErpRack() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set(el, { visibility: "visible" });
        const intro = gsap.timeline({ defaults: { ease: "dc-out" }, delay: 0.35 });
        intro
          .from(q("[data-rack-head] > *"), { autoAlpha: 0, y: 8, duration: 0.6, stagger: 0.06 })
          .from(q("[data-rack-shared]"), { autoAlpha: 0, y: 6, duration: 0.45, stagger: 0.04 }, 0.2)
          .from(q("[data-rack-bus]"), { scaleY: 0, transformOrigin: "50% 0%", duration: 1.1, ease: "dc-inout" }, 0.45)
          .from(q("[data-rack-term]"), { scale: 0, duration: 0.4, stagger: 0.14, ease: "back.out(2.4)" }, 0.75)
          .from(q("[data-rack-stub]"), { scaleX: 0, transformOrigin: "0% 50%", duration: 0.35, stagger: 0.14 }, 0.85)
          .from(q("[data-rack-row]"), { autoAlpha: 0, x: -14, duration: 0.7, stagger: 0.14 }, 0.9)
          .from(q("[data-rack-out]"), { autoAlpha: 0, y: 8, duration: 0.6 }, 1.6);

        // Idle: a packet runs down the bus, as data moves between modules.
        const packet = q("[data-rack-packet]");
        const loop = gsap
          .timeline({ repeat: -1, repeatDelay: 0.9, paused: true })
          .set(packet, { top: "0%", autoAlpha: 0 })
          .to(packet, { autoAlpha: 1, duration: 0.2 })
          .to(packet, { top: "100%", duration: 2.4, ease: "power1.inOut" }, 0)
          .to(packet, { autoAlpha: 0, duration: 0.25 }, 2.2);
        intro.call(() => loop.play());

        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            if (intro.progress() < 1) return;
            if (self.isActive) loop.play();
            else loop.pause();
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="hero-pre board relative overflow-hidden p-4 sm:p-5 md:p-7">
      <div aria-hidden className="bg-dots absolute inset-0 opacity-40" />
      <div className="relative">
        {/* The platform every module shares */}
        <div className="rounded-2xl bg-navy-900 p-4 text-mist ring-1 ring-navy-800 md:p-5">
          <div data-rack-head className="flex items-baseline justify-between gap-3">
            <p className="mono text-[0.68rem] uppercase tracking-[0.14em] text-navy-200">Dcode platform</p>
            <p className="mono hidden text-[0.68rem] uppercase tracking-[0.1em] text-navy-400 sm:block">Shared by every module</p>
          </div>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {SHARED.map((s) => (
              <li
                key={s}
                data-rack-shared
                className="rounded-md border border-navy-700 bg-navy-850 px-2.5 py-1 text-[0.8rem] font-medium text-mist"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* The bus and the modules plugged into it */}
        <div className="pl-9 pt-5 md:pl-11">
          <div className="relative">
            {/* Runs from the platform down to the middle of the last module */}
            <div aria-hidden className="absolute -left-[21px] -top-5 bottom-[37px] w-[2px] md:-left-[25px]">
              <div data-rack-bus className="absolute inset-0 rounded-full bg-navy-700 dark:bg-navy-400" />
              <span
                data-rack-packet
                className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red opacity-0 ring-[3px] ring-card"
              />
            </div>
            <ol className="space-y-2.5">
              {MODULES.map((m) => (
                <li key={m.n} className="relative">
                  <span
                    aria-hidden
                    data-rack-stub
                    className="absolute -left-[21px] top-1/2 h-[2px] w-[21px] bg-navy-700 md:-left-[25px] md:w-[25px] dark:bg-navy-400"
                  />
                  <span
                    aria-hidden
                    data-rack-term
                    className="absolute -left-[25px] top-1/2 -mt-[5px] h-[10px] w-[10px] rounded-full bg-navy-700 ring-4 ring-card md:-left-[29px] dark:bg-navy-400"
                  />
                  <Link
                    href={m.href}
                    data-rack-row
                    className={`group block rounded-xl border px-4 py-3 transition-colors ${
                      m.custom
                        ? "border-dashed border-line-2 hover:border-ink"
                        : "border-line bg-card hover:border-line-2"
                    }`}
                  >
                    {/* Two fixed lines per row, so the bus always ends on the last terminal */}
                    <span className="mono flex items-baseline justify-between gap-3 whitespace-nowrap text-[0.62rem] uppercase tracking-[0.06em] text-muted sm:text-[0.66rem] sm:tracking-[0.12em]">
                      <span>
                        <span className="text-red">{m.n}</span> · {m.area}
                      </span>
                      <span>{m.state}</span>
                    </span>
                    <span className="mt-1 block font-display text-[1.08rem] font-semibold tracking-tight text-ink transition-colors group-hover:text-red">
                      {m.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          {/* Where the money ends up */}
          <div data-rack-out className="mt-5 flex items-center gap-3 border-t border-line pt-4">
            <svg width="22" height="10" viewBox="0 0 22 10" aria-hidden="true" className="shrink-0 text-red">
              <line x1="1" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="17" cy="5" r="3.5" fill="currentColor" />
            </svg>
            <p className="text-[0.9rem] text-body">
              Journals and matched invoices post to <span className="font-semibold text-ink">Zoho Books</span>, which
              stays your accounting system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
