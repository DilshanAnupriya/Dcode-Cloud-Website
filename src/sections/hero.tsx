"use client";

import Link from "next/link";
import { useRef } from "react";
import { TraceArrow } from "@/components/trace-arrow";
import { PlatformBoard, PlatformBoardCompact } from "@/illustrations/platform-board";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

// The product line as a plain spec row: name, area, where it stands.
const LINE = [
  { name: "Payflow", area: "Payroll", state: "In use", href: "/products/payflow" },
  { name: "CRM", area: "Sales", state: "In development", href: "/products/crm" },
  { name: "Procurement", area: "Purchasing", state: "In development", href: "/products/procurement" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      // The board has a wide layout and a phone layout; animate whichever is showing.
      mm.add({ motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 768px)" }, (ctx) => {
        const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
        if (!motion) return;
        gsap.set(q(".hero-pre"), { visibility: "visible" });

        // Headline: words rise out of their own line masks. autoSplit re-splits
        // once the web font arrives so line breaks are measured on real glyphs.
        SplitText.create(q("h1")[0], {
          type: "lines,words",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, { yPercent: 115, duration: 1.15, ease: "dc-out", stagger: 0.05, delay: 0.12 }),
        });

        const board = q(`[data-board='${wide ? "wide" : "compact"}']`)[0];
        if (!board) return;
        const b = gsap.utils.selector(board);

        const intro = gsap.timeline({ defaults: { ease: "dc-out" } });
        intro
          .from(q("[data-hero='eyebrow']"), { autoAlpha: 0, y: 10, duration: 0.7 }, 0)
          .from(q("[data-hero='sub'], [data-hero='cta'] > *, [data-hero='meta'] > *"), {
            autoAlpha: 0,
            y: 16,
            duration: 0.9,
            stagger: 0.07,
          }, 0.55)
          // Board: core first, then traces draw outward, then the chips land on them.
          .from(b("[data-core]"), { autoAlpha: 0, scale: 0.94, transformOrigin: "50% 50%", duration: 1 }, 0.3)
          .from(b("[data-mod]"), { autoAlpha: 0, y: 5, duration: 0.5, stagger: 0.035 }, 0.6)
          .from(b("[data-track]"), { autoAlpha: 0, duration: 0.6, stagger: 0.06 }, 0.75)
          .fromTo(b("[data-trace]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.95, ease: "dc-inout", stagger: 0.08 }, 0.8)
          .from(b("[data-chip]"), { autoAlpha: 0, y: 14, duration: 0.9, stagger: 0.07 }, 1.15)
          .from(b("[data-term]"), { autoAlpha: 0, scale: 0.5, transformOrigin: "50% 50%", duration: 0.5, stagger: 0.06, ease: "back.out(2)" }, 1.35);

        // Idle loop: data moving through the platform. One payroll run posts a
        // journal to Zoho Books via the integrations module, people sign in,
        // the other products talk to the core.
        const trace = (k: string) => b(`[data-trace='${k}']`)[0] as unknown as SVGPathElement | undefined;
        const pulse = (k: string) => b(`[data-pulse='${k}']`)[0];
        const modBg = (m: string) => b(`[data-mod='${m}'] [data-mod-bg]`)[0];

        const travel = (k: string, inbound: boolean, duration = 1.1) => {
          const path = trace(k);
          const dot = pulse(k);
          if (!path || !dot) return gsap.timeline(); // the phone board has no custom-build chip
          return gsap
            .timeline()
            .set(dot, { autoAlpha: 1 })
            .to(dot, {
              duration,
              ease: "power1.inOut",
              motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: inbound ? 1 : 0, end: inbound ? 0 : 1 },
            })
            .to(dot, { autoAlpha: 0, duration: 0.2 });
        };

        // Flash back to whatever the theme paints the module, not a fixed colour.
        const flash = (m: string) => {
          const bg = modBg(m);
          return gsap
            .timeline()
            .to(bg, { fill: "#C8102E", duration: 0.12, ease: "none" })
            .to(bg, { fill: () => getComputedStyle(bg).getPropertyValue("--mod-bg").trim() || "#1B2B4F", duration: 0.9, ease: "power2.out" })
            .set(bg, { clearProps: "fill" });
        };

        const zohoIdle = b("[data-zoho-state='idle']");
        const zohoDone = b("[data-zoho-state='done']");

        const loop = gsap.timeline({ repeat: -1, repeatDelay: 0.8, paused: true });
        loop
          .set(zohoDone, { autoAlpha: 0 })
          .set(zohoIdle, { autoAlpha: 1 })
          .add(travel("payflow", true))
          .add(flash("integrations"), "-=0.25")
          .add(travel("zoho", false, 0.9), "-=0.7")
          .to(zohoIdle, { autoAlpha: 0, duration: 0.2 }, "-=0.2")
          .to(zohoDone, { autoAlpha: 1, duration: 0.35 })
          .add(travel("identity", true, 0.9), "+=0.3")
          .add(flash("identity"), "-=0.25")
          .add(travel("crm", true), "-=0.4")
          .add(flash("permissions"), "-=0.25")
          .add(travel("procurement", true, 1), "-=0.5")
          .add(flash("audit"), "-=0.25")
          .add(travel("custom", false, 0.6), "-=0.3")
          .add(flash("tenancy"), "<")
          .to({}, { duration: 1.2 });

        intro.call(() => loop.play(), [], ">-0.2");

        // Save the battery: the loop only runs while the hero is on screen.
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
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden pb-20 pt-[112px] lg:pb-28 lg:pt-[136px]">
      <div
        aria-hidden
        className="bg-dots pointer-events-none absolute inset-0"
        style={{ maskImage: "radial-gradient(ellipse 70% 80% at 72% 42%, #000 35%, transparent 78%)" }}
      />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="relative z-10 lg:col-span-6">
          <p data-hero="eyebrow" className="hero-pre eyebrow">
            IT company · ERP and SaaS · Sri Lanka
          </p>
          <h1 className="hero-pre h-display mt-7 max-w-[15ch] text-[clamp(2.5rem,5.4vw,4.75rem)]">
            ERP and SaaS software for companies outgrowing spreadsheets.
          </h1>
          <p data-hero="sub" className="hero-pre lede mt-8 max-w-[35rem]">
            We build and run our own ERP modules for payroll, sales and purchasing, and we design custom software, SaaS
            applications and websites for companies that need something made for them.
          </p>
          <div data-hero="cta" className="hero-pre mt-10 flex flex-wrap gap-3">
            <Link href="/#products" className="btn btn-primary">
              Explore the products <TraceArrow />
            </Link>
            <Link href="/contact?interest=custom" className="btn btn-ghost">
              Start a custom project
            </Link>
          </div>

          <div data-hero="meta" className="hero-pre mt-14 max-w-[35rem] border-t border-line pt-5">
            <div className="flex items-baseline justify-between gap-4">
              <p className="mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">ERP modules</p>
              <Link href="/erp" className="mono text-[0.68rem] uppercase tracking-[0.12em] text-ink underline-offset-4 hover:text-red hover:underline">
                How they fit together
              </Link>
            </div>
            <ul className="mt-4 grid grid-cols-3">
              {LINE.map((p, i) => (
                <li key={p.name} className={i === 0 ? "pr-4" : "border-l border-line px-4"}>
                  <Link href={p.href} className="group block">
                    <span className="block font-display text-[1.02rem] font-semibold tracking-tight text-ink transition-colors group-hover:text-red">
                      {p.name}
                    </span>
                    <span className="mt-0.5 block text-[0.82rem] text-muted">{p.area}</span>
                    <span className="mono mt-2 block text-[0.66rem] uppercase tracking-[0.12em] text-muted">{p.state}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero-pre relative min-w-0 lg:col-span-6 lg:-mr-6 xl:-mr-10">
          <div className="hidden md:block">
            <PlatformBoard />
          </div>
          <div className="mx-auto max-w-[440px] md:hidden">
            <PlatformBoardCompact />
          </div>
        </div>
      </div>
    </section>
  );
}
