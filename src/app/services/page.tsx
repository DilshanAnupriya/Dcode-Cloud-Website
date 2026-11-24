import Link from "next/link";
import { ArtReveal } from "@/components/art-reveal";
import { JsonLd } from "@/components/json-ld";
import { PageHeroMotion } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ScrollSort } from "@/components/scroll-sort";
import { TraceArrow } from "@/components/trace-arrow";
import { abs, breadcrumbLd, graph, pageMeta, SITE_URL } from "@/lib/seo";
import { services } from "@/lib/services";
import { ClosingCta } from "@/sections/closing-cta";
import { Process } from "@/sections/process";

export const metadata = pageMeta({
  title: "Custom software, ERP and SaaS application development in Sri Lanka",
  description:
    "Dcode Cloud is an IT company in Sri Lanka building custom software, ERP modules, SaaS applications, websites, integrations and AI features, with the engineering that runs our own platform.",
  path: "/services",
});

// What every custom project gets, whatever its size.
const DEFAULTS = [
  ["Tests on every change", "Automated tests run before anything reaches production."],
  ["Code review", "A second engineer reads every change."],
  ["A preview link", "Each sprint ships to a preview you can click through."],
  ["Audit trail", "Sensitive actions are logged, the same way our products do it."],
  ["Backups you can trust", "Daily backups, and restores we actually rehearse."],
  ["Monitoring", "We hear about errors before your customers do."],
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-[112px] lg:pb-24 lg:pt-[150px]">
        <div
          aria-hidden
          className="bg-dots pointer-events-none absolute inset-0"
          style={{ maskImage: "radial-gradient(ellipse 60% 70% at 70% 30%, #000 30%, transparent 75%)" }}
        />
        <PageHeroMotion className="container-x relative">
          <p data-rise className="hero-pre eyebrow">
            Custom services
          </p>
          <h1 className="hero-pre h-display mt-7 max-w-[16ch]">Software, websites and SaaS, built for you.</h1>
          <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
            <p data-rise className="hero-pre lede md:col-span-6">
              We run a multi-tenant SaaS platform in production. When we build for you, you get the same engineering
              habits: tenant isolation, audit trails, background jobs, tests and monitoring.
            </p>
            <div data-rise className="hero-pre flex flex-wrap gap-3 md:col-span-6 md:justify-end">
              <Link href="/contact?interest=custom" className="btn btn-primary">
                Start a project <TraceArrow />
              </Link>
              <Link href="/how-we-work" className="btn btn-ghost">
                How we work
              </Link>
            </div>
          </div>
          <ul data-rise className="hero-pre mt-14 flex flex-wrap gap-2 border-t border-line pt-6">
            {services.map((s) => (
              <li key={s.key}>
                <a href={`#${s.key}`} className="mono inline-flex rounded-full border border-line-2 px-3 py-1.5 text-[0.75rem] text-ink transition-colors hover:border-ink">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </PageHeroMotion>
      </section>

      <section className="bg-card">
        <div className="container-x">
          {services.map((s, i) => (
            <article key={s.key} id={s.key} className="grid items-center gap-10 border-t border-line py-20 first:border-t-0 lg:grid-cols-12 lg:gap-16 lg:py-24">
              <Reveal className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
                <p data-reveal className="mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">
                  {s.tags.join(" · ")}
                </p>
                <h2 data-split className="h-chapter mt-5">
                  {s.name}
                </h2>
                <p data-reveal className="mt-5 max-w-xl text-[1.05rem] text-body">
                  {s.body}
                </p>
                <ul data-reveal className="mt-8 grid gap-3 sm:grid-cols-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-3 rounded-xl border border-line bg-paper/60 px-4 py-3 text-[0.92rem] text-ink">
                      <span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <div className={`min-w-0 lg:col-span-6 ${i % 2 ? "lg:order-1" : ""}`}>
                <ArtReveal kind={s.key} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-28">
        <div className="container-x">
          <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p data-reveal className="eyebrow">
                In every project
              </p>
              <h2 data-split className="h-section mt-6">
                The defaults we never skip.
              </h2>
            </div>
          </Reveal>
          <dl className="mt-14 grid gap-px overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {DEFAULTS.map(([title, body]) => (
              <div key={title} className="flex flex-col bg-card p-7">
                <dt className="text-[1.15rem] font-semibold tracking-tight text-ink">{title}</dt>
                <dd className="mt-2 text-[0.95rem] text-body">{body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Process />
      <div className="pt-24 md:pt-32">
        <ClosingCta />
      </div>
      <ScrollSort />
      <JsonLd
        data={graph(
          breadcrumbLd([{ name: "Services", path: "/services" }]),
          {
            "@type": "ItemList",
            name: "Dcode Cloud custom services",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Service",
                name: s.name,
                description: s.body,
                url: abs(`/services#${s.key}`),
                provider: { "@id": `${SITE_URL}/#organization` },
                areaServed: { "@type": "Country", name: "Sri Lanka" },
              },
            })),
          },
        )}
      />
    </>
  );
}
