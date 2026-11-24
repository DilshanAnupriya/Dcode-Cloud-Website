"use client";

import { useRef } from "react";
import { Reveal } from "@/components/reveal";
import { gsap, PLAY_ONCE, ScrollTrigger, useGSAP } from "@/lib/gsap";

// The request lifecycle from the platform architecture, in plain words.
const CHECKS = [
  {
    title: "Who are you?",
    body: "A short-lived sign-in token is verified on every call. Sessions renew quietly, and a stolen refresh token is caught the moment it is reused.",
    tech: "JWT · 10 min · rotating refresh",
  },
  {
    title: "Which company?",
    body: "The company comes from the signed token, never from the browser. Switching companies issues a new token.",
    tech: "org_id from the token only",
  },
  {
    title: "Are you allowed?",
    body: "Roles per product. A payroll approver can approve runs. An employee sees only their own payslips.",
    tech: "@RequirePermission",
  },
  {
    title: "Database fence",
    body: "PostgreSQL row-level security. Even a query with a missing filter cannot read another company's rows.",
    tech: "RLS · FORCE · WITH CHECK",
  },
  {
    title: "Scoped query",
    body: "The application filters by company as well, so there are two independent locks on the same door.",
    tech: "tenant filter on every repository",
  },
  {
    title: "Recorded",
    body: "Sensitive actions go to an append-only audit log. Nobody, including us, can edit an entry after it is written.",
    tech: "audit_logs · no UPDATE grant",
  },
];

const ALSO = [
  "One sign-in across products",
  "Email and in-app notifications",
  "Encrypted file storage",
  "Background jobs with retries",
  "Zoho Books and Zoho CRM connectors",
  "Daily backups with tested restores",
];

export function PlatformChecks() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          wide: "(min-width: 1024px) and (min-height: 760px)",
        },
        (ctx) => {
          const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
          if (!motion) return;
          const cards = q("[data-check]") as HTMLElement[];
          const nodes = q("[data-gate]") as HTMLElement[];

          if (!wide) {
            cards.forEach((c) =>
              gsap.from(c, { autoAlpha: 0, y: 24, duration: 0.9, ease: "dc-out", scrollTrigger: { trigger: c, start: "top 88%", toggleActions: PLAY_ONCE } }),
            );
            return;
          }

          // Desktop: pin the six checks and walk a request through them.
          const packet = q("[data-packet]")[0];
          const lane = q("[data-lane]")[0] as HTMLElement;
          const tl = gsap.timeline({ defaults: { ease: "none" } });
          gsap.set(cards, { opacity: 0.32 });
          gsap.set(nodes, { backgroundColor: "#1B2B4F", borderColor: "#25376A" });
          tl.fromTo(q("[data-lane-fill]"), { scaleX: 0 }, { scaleX: 1, duration: CHECKS.length + 0.6 }, 0).fromTo(
            packet,
            { x: 0 },
            { x: () => lane.offsetWidth, duration: CHECKS.length + 0.6 },
            0,
          );
          cards.forEach((card, i) => {
            const at = i + 0.5;
            tl.to(nodes[i], { backgroundColor: "#E2374F", borderColor: "#E2374F", scale: 1.15, duration: 0.15 }, at)
              .to(nodes[i], { scale: 1, duration: 0.25 }, at + 0.15)
              .to(card, { opacity: 1, duration: 0.3 }, at - 0.05);
          });
          tl.from(q("[data-vault]"), { autoAlpha: 0.3, scale: 0.94, duration: 0.4, ease: "dc-out" }, CHECKS.length + 0.3);

          // Pin heading and checks together when they fit under the header;
          // on shorter screens pin from the bottom so the checks stay in view.
          const pinEl = q("[data-pin]")[0] as HTMLElement;
          const fits = () => pinEl.offsetHeight < window.innerHeight - 110;
          ScrollTrigger.create({
            animation: tl,
            trigger: pinEl,
            start: () => (fits() ? "top top+=88" : "bottom bottom-=16"),
            end: "+=1500",
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="platform" className="on-dark relative overflow-hidden bg-navy-950 text-mist">
      <div aria-hidden className="bg-dots-dark pointer-events-none absolute inset-0" />
      <div className="container-x relative py-24 md:py-28">
        <div data-pin>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p data-reveal className="eyebrow">
              The platform
            </p>
            <h2 data-split className="h-section mt-6 text-white">
              Every request passes six checks before it reaches your data.
            </h2>
          </div>
          <p data-reveal className="text-[1.05rem] leading-relaxed text-navy-200 lg:col-span-4 lg:pb-2">
            All Dcode products share one core for sign-in, company separation, permissions and audit. We put the same
            core under the custom SaaS products we build for clients.
          </p>
        </Reveal>

        {/* The lane the request travels along (desktop) */}
        <div className="relative mt-10 hidden lg:block" aria-hidden>
          <div className="flex items-center gap-4">
            <div className="mono shrink-0 rounded-full border border-navy-700 bg-navy-900 px-3 py-1.5 text-[0.72rem] text-navy-200">
              GET /payroll/payslips/0193…
            </div>
            <div data-lane className="relative h-[18px] flex-1">
              <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-navy-800" />
              <div data-lane-fill className="absolute inset-x-0 top-1/2 h-[2px] origin-left -translate-y-1/2 rounded-full bg-red-bright" />
              <div className="absolute inset-0 grid grid-cols-6">
                {CHECKS.map((c) => (
                  <div key={c.title} className="relative">
                    <span
                      data-gate
                      className="absolute left-1/2 top-1/2 block h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-bright bg-red-bright"
                    />
                  </div>
                ))}
              </div>
              <span
                data-packet
                className="absolute left-0 top-1/2 -ml-[9px] -mt-[9px] block h-[18px] w-[18px] rounded-full border-[3px] border-navy-950 bg-white shadow-[0_0_0_4px_rgba(226,55,79,0.35)]"
              />
            </div>
            <div
              data-vault
              className="mono flex shrink-0 items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[0.72rem] font-medium text-navy-900"
            >
              <span className="h-2 w-2 rounded-full bg-green" /> Your data
            </div>
          </div>
        </div>

        <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-8 lg:grid-cols-6">
          {CHECKS.map((c, i) => (
            <li key={c.title} data-check className="flex flex-col rounded-2xl border border-navy-800 bg-navy-900/70 p-5">
              <span className="mono text-[0.72rem] text-red-bright">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-[1.15rem] font-semibold tracking-tight text-white">{c.title}</h3>
              <p className="mt-2.5 text-[0.88rem] leading-relaxed text-navy-200">{c.body}</p>
              <p className="mono mt-auto pt-5 text-[0.68rem] leading-snug text-navy-400">{c.tech}</p>
            </li>
          ))}
        </ol>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-navy-800 pt-8 lg:flex-row lg:items-center">
          <p className="mono shrink-0 text-[0.72rem] uppercase tracking-[0.14em] text-navy-400">Also in the core</p>
          <ul className="flex flex-wrap gap-2">
            {ALSO.map((a) => (
              <li key={a} className="rounded-full border border-navy-800 px-3.5 py-1.5 text-[0.85rem] text-mist">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
