import Link from "next/link";
import { EngagementArt } from "@/components/engagement-art";
import { JsonLd } from "@/components/json-ld";
import { PageHeroMotion } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ScrollSort } from "@/components/scroll-sort";
import { TraceArrow } from "@/components/trace-arrow";
import { STAGES } from "@/lib/process";
import { breadcrumbLd, faqLd, graph, pageMeta } from "@/lib/seo";
import { ClosingCta } from "@/sections/closing-cta";
import { SprintRhythm } from "@/sections/sprint-rhythm";
import { StageDetail } from "@/sections/stage-detail";

export const metadata = pageMeta({
  title: "How we work: custom software from discovery to production",
  description:
    "How Dcode Cloud runs a custom software project in five stages: discovery, prototype, two-week build sprints, launch and ongoing support, with one team from first call to production.",
  path: "/how-we-work",
});

const ASKS = [
  ["One decision-maker", "Someone who can say yes or no on scope and priorities, so questions never wait a week for an answer."],
  ["Access to how you work today", "Your spreadsheets, forms and current systems, plus sample data we can build and test against."],
  ["An hour every two weeks", "For the sprint demo. It is the fastest way to catch what we misunderstood, while it is still cheap to change."],
] as const;

const FAQ = [
  {
    q: "How long does a custom software project take?",
    a: "Discovery and the prototype take two to four weeks together. Build length depends on scope, and the discovery estimate sets it out sprint by sprint before you commit to building.",
  },
  {
    q: "How do you price custom work?",
    a: "After discovery you get a written scope and an estimate for the build, broken down by sprint, so you know the cost before you commit to it.",
  },
  {
    q: "Can you work with the systems we already use?",
    a: "Yes. We connect to tools like Zoho Books and Zoho CRM, and to other systems through their APIs. Discovery lists every integration and every set of data that needs to move.",
  },
  {
    q: "What happens after launch?",
    a: "The same engineers keep running it: monitoring, tested backups, security updates and changes as your business moves. There is no handover to a separate support team.",
  },
  {
    q: "Should we build custom software or use one of your products?",
    a: "If Payflow, CRM or Procurement covers what you need, a product is usually the faster start. When your process is unusual, we build on the same platform, and the two can share one sign-in.",
  },
  {
    q: "Do you work with teams outside Sri Lanka?",
    a: "We are based in Sri Lanka and work on Sri Lanka time (UTC+05:30). The process is the same for teams elsewhere: video calls, a shared preview link and a demo every two weeks.",
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-[112px] lg:pb-28 lg:pt-[150px]">
        <div
          aria-hidden
          className="bg-dots pointer-events-none absolute inset-0"
          style={{ maskImage: "radial-gradient(ellipse 60% 70% at 75% 40%, #000 30%, transparent 75%)" }}
        />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <PageHeroMotion className="lg:col-span-5">
            <p data-rise className="hero-pre eyebrow">
              How we work
            </p>
            <h1 className="hero-pre h-display mt-7 text-[clamp(2.6rem,5vw,4.4rem)]">One team from the first call to production.</h1>
            <p data-rise className="hero-pre lede mt-7 max-w-md">
              Five stages for every custom build. You see clickable screens before any code, working software every two
              weeks, and the engineers who built it keep running it.
            </p>
            <div data-rise className="hero-pre mt-10 flex flex-wrap gap-3">
              <Link href="/contact?interest=custom" className="btn btn-primary">
                Start a project <TraceArrow />
              </Link>
              <a href="#discovery" className="btn btn-ghost">
                See the five stages
              </a>
            </div>
            <ol data-rise className="hero-pre mt-12 flex flex-wrap gap-2 border-t border-line pt-6">
              {STAGES.map((s, i) => (
                <li key={s.key}>
                  <a
                    href={`#${s.key}`}
                    className="mono inline-flex items-center gap-2 rounded-full border border-line-2 px-3 py-1.5 text-[0.75rem] text-ink transition-colors hover:border-ink"
                  >
                    <span className="text-red">{String(i + 1).padStart(2, "0")}</span>
                    {s.name}
                  </a>
                </li>
              ))}
            </ol>
          </PageHeroMotion>
          <div className="min-w-0 lg:col-span-7">
            <div className="board overflow-hidden p-4 md:p-6">
              <EngagementArt />
            </div>
          </div>
        </div>
      </section>

      <StageDetail />
      <SprintRhythm />

      <section className="py-24 md:py-32">
        <div className="container-x">
          <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p data-reveal className="eyebrow">
                Your side
              </p>
              <h2 data-split className="h-section mt-6">
                What we need from you.
              </h2>
            </div>
            <p data-reveal className="lede md:col-span-5 md:pb-2">
              Not much, but it matters. Projects go well when these three are in place from the first week.
            </p>
          </Reveal>
          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {ASKS.map(([title, body], i) => (
              <li key={title} className="board relative flex flex-col p-7">
                <span className="mono grid h-9 w-9 place-items-center rounded-full border border-line-2 text-[0.75rem] text-ink">
                  {i + 1}
                </span>
                <p className="mt-6 text-[1.25rem] font-semibold tracking-tight text-ink">{title}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-body">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="border-t border-line bg-card py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p data-reveal className="eyebrow">
              Questions
            </p>
            <h2 id="faq-heading" data-split className="h-section mt-6">
              Asked before every project.
            </h2>
            <p data-reveal className="mt-6 text-body">
              Something else on your mind?{" "}
              <Link href="/contact?interest=custom" className="font-semibold text-red hover:text-red-deep">
                Ask us directly
              </Link>
              .
            </p>
          </Reveal>
          <div className="lg:col-span-8">
            {FAQ.map(({ q, a }) => (
              <details key={q} className="group border-t border-line last:border-b">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[1.12rem] font-semibold tracking-tight text-ink [&::-webkit-details-marker]:hidden">
                  {q}
                  <span
                    aria-hidden
                    className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-2 transition-[transform,border-color] duration-300 ease-out-strong group-open:rotate-45 group-open:border-ink"
                  >
                    <span className="absolute h-[2px] w-3 rounded-full bg-ink" />
                    <span className="absolute h-3 w-[2px] rounded-full bg-ink" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 text-[1rem] leading-relaxed text-body">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-24 md:pt-32">
        <ClosingCta />
      </div>
      <ScrollSort />
      <JsonLd data={graph(breadcrumbLd([{ name: "How we work", path: "/how-we-work" }]), faqLd(FAQ))} />
    </>
  );
}
