import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { TraceArrow } from "@/components/trace-arrow";

export function ClosingCta() {
  return (
    <section className="relative pb-24 md:pb-32">
      <div className="container-x">
        <div className="on-dark relative overflow-hidden rounded-[28px] bg-red px-6 py-16 text-white md:px-14 md:py-20">
          {/* The logo's traces, large and quiet, running off the edge */}
          <svg
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-10 h-[130%] w-auto opacity-[0.16]"
            viewBox="0 0 400 400"
            fill="none"
          >
            <path d="M40 360 H170 Q200 360 200 330 V160 Q200 130 230 130 H360" stroke="#fff" strokeWidth="14" strokeLinecap="round" />
            <path d="M90 300 H130 Q150 300 150 280 V100 Q150 70 180 70 H320" stroke="#fff" strokeWidth="14" strokeLinecap="round" />
            <circle cx="360" cy="130" r="22" fill="#fff" />
            <circle cx="320" cy="70" r="22" fill="#fff" />
            <circle cx="40" cy="360" r="22" fill="#fff" />
          </svg>
          <Reveal className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p data-reveal className="mono text-[0.75rem] uppercase tracking-[0.14em] text-white/75">
                Next step
              </p>
              <h2 data-split className="h-section mt-5 text-white">
                Tell us what you need built or fixed.
              </h2>
              <p data-reveal className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-white/85">
                A Payflow demo for your payroll team, early access to CRM or Procurement, or a custom system or website.
                One conversation is enough to tell you whether we are the right fit.
              </p>
            </div>
            <div data-reveal className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
              <Link href="/contact?interest=payflow" className="btn bg-white text-red hover:bg-paper">
                Book a Payflow demo <TraceArrow />
              </Link>
              <Link href="/contact?interest=custom" className="btn border-[1.5px] border-white/50 text-white hover:border-white">
                Start a custom project
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
