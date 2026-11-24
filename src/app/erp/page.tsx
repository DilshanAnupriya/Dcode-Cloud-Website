import Link from "next/link";
import { ErpRack } from "@/components/erp-rack";
import { JsonLd } from "@/components/json-ld";
import { PageHeroMotion } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ScrollSort } from "@/components/scroll-sort";
import { TraceArrow } from "@/components/trace-arrow";
import { abs, breadcrumbLd, faqLd, graph, pageMeta, SITE_URL } from "@/lib/seo";
import { products } from "@/lib/site";
import { ClosingCta } from "@/sections/closing-cta";

export const metadata = pageMeta({
  title: "ERP system for growing companies in Sri Lanka",
  description:
    "Cloud ERP software from Dcode Cloud: payroll, sales and purchasing modules on one platform, with one sign-in, shared roles, an audit log and Zoho Books integration. Start with one module.",
  path: "/erp",
});

// What a company sets up once and every module reuses.
const SHARED = [
  ["One sign-in", "People sign in once and move between modules. A stolen refresh token is caught the moment it is reused."],
  ["Roles set once", "A payroll approver can approve runs, a sales rep sees their own deals, an employee sees only their own payslips."],
  ["Company separation", "PostgreSQL row-level security fences each company's data, so even a query with a missing filter cannot read another company's rows."],
  ["One audit log", "Sensitive actions in every module go to an append-only log. Nobody, including us, can edit an entry after it is written."],
  ["Zoho Books", "Payflow posts one balanced journal per payroll run. Procurement will sync matched invoices. Your accounts stay in Zoho Books."],
  ["Backups you can trust", "Daily backups, and restores we actually rehearse, for every module on the platform."],
] as const;

const STEPS = [
  ["Start with payroll", "Payflow is live today. Set up employees, pay components and approvers, and run your first month."],
  ["Add modules as they land", "CRM and Procurement switch on for the same company, with the same people and roles. Nothing is entered twice."],
  ["Build what is yours", "When a process is unique to your business, we build it as a custom module on the same platform, sharing sign-in, roles and audit."],
] as const;

const FAQ = [
  {
    q: "What is an ERP system?",
    a: "ERP (enterprise resource planning) software keeps a company's core processes, such as payroll, sales, purchasing and accounts, in one system with shared data. On the Dcode platform each process is a module, and people, roles and records are set up once for all of them.",
  },
  {
    q: "Can we start with payroll only?",
    a: "Yes. Payflow is live and works on its own. CRM and Procurement join the same sign-in and roles when they are released and when you are ready for them.",
  },
  {
    q: "Does it replace our accounting software?",
    a: "No. The modules post to Zoho Books, which stays your accounting system. Payflow posts one balanced journal per payroll run, and Procurement will sync matched invoices.",
  },
  {
    q: "Is it a cloud ERP?",
    a: "Yes. It runs in the browser on a multi-tenant platform. Each company's data is separated in the database, sensitive actions are written to an audit log, and backups are taken daily with restores we rehearse.",
  },
  {
    q: "Is it built for Sri Lankan rules?",
    a: "Payflow handles EPF, ETF, APIT and stamp duty, with LKR amounts and Asia/Colombo time. Rates are stored as dated versions, so a new budget never rewrites past payroll.",
  },
  {
    q: "Can you build modules for processes you don't cover?",
    a: "Yes. Custom modules are built on the same platform, so they share sign-in, roles and the audit log with the modules you already use.",
  },
];

export default function ErpPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-[112px] lg:pb-28 lg:pt-[150px]">
        <div
          aria-hidden
          className="bg-dots pointer-events-none absolute inset-0"
          style={{ maskImage: "radial-gradient(ellipse 60% 70% at 75% 40%, #000 30%, transparent 75%)" }}
        />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <PageHeroMotion className="lg:col-span-6">
            <p data-rise className="hero-pre eyebrow">
              ERP system · Sri Lanka
            </p>
            <h1 className="hero-pre h-display mt-7 max-w-[14ch] text-[clamp(2.6rem,5vw,4.4rem)]">
              An ERP system you can start one module at a time.
            </h1>
            <p data-rise className="hero-pre lede mt-7 max-w-[34rem]">
              Payroll, sales and purchasing as modules on one cloud platform. Your team signs in once, roles are set
              once, every module writes to the same audit log, and the money side lands in Zoho Books.
            </p>
            <div data-rise className="hero-pre mt-10 flex flex-wrap gap-3">
              <Link href="/contact?interest=erp" className="btn btn-primary">
                Talk about your ERP <TraceArrow />
              </Link>
              <Link href="/products/payflow" className="btn btn-ghost">
                Start with Payflow
              </Link>
            </div>
          </PageHeroMotion>
          <div className="min-w-0 lg:col-span-6">
            <ErpRack />
          </div>
        </div>
      </section>

      {/* The modules */}
      <section aria-labelledby="modules-heading" className="border-t border-line py-24 md:py-32">
        <div className="container-x">
          <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p data-reveal className="eyebrow">
                The modules
              </p>
              <h2 id="modules-heading" data-split className="h-section mt-6">
                Each part of the business, on one platform.
              </h2>
            </div>
            <p data-reveal className="lede md:col-span-5 md:pb-2">
              Every module does one job properly and shares the rest. Payroll is in use today; sales and purchasing are
              in development with early access open.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {products.map((p) => (
              <article key={p.slug} className="board flex flex-col p-7 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">{p.area}</p>
                  <span className={`chip chip-dot ${p.status === "live" ? "chip-live" : "chip-build"}`}>{p.statusLabel}</span>
                </div>
                <h3 className="mt-5 text-[1.6rem] font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-3 text-body">{p.summary}</p>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[0.95rem] text-body">
                      <svg className="mt-[0.5em] shrink-0" width="18" height="8" viewBox="0 0 18 8" aria-hidden="true">
                        <line x1="1" y1="4" x2="12" y2="4" stroke="var(--color-red)" strokeWidth="1.6" strokeLinecap="round" />
                        <circle cx="14" cy="4" r="2.6" fill="var(--color-red)" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link href={`/products/${p.slug}`} className="link-trace mt-8 self-start">
                  <span>About {p.name.replace("Dcode ", "")}</span> <TraceArrow />
                </Link>
              </article>
            ))}
            <article className="flex flex-col rounded-[22px] border border-dashed border-line-2 p-7 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">Your process</p>
                <span className="chip">Built to order</span>
              </div>
              <h3 className="mt-5 text-[1.6rem] font-semibold tracking-tight">Custom modules</h3>
              <p className="mt-3 text-body">
                Inventory, field service, approvals, a customer portal: whatever runs your business and no product
                covers. We build it on the same platform, so it fits next to the modules you already use.
              </p>
              <Link href="/services" className="link-trace mt-auto self-start pt-8">
                <span>Custom software and ERP</span> <TraceArrow />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Shared by every module */}
      <section aria-labelledby="shared-heading" className="border-t border-line bg-card py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p data-reveal className="eyebrow">
              Set up once
            </p>
            <h2 id="shared-heading" data-split className="h-section mt-6">
              What every module shares.
            </h2>
            <p data-reveal className="mt-6 text-body">
              This is what makes it an ERP rather than a set of separate apps. The same platform runs our own products
              and the custom systems we build.
            </p>
          </Reveal>
          <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {SHARED.map(([title, body]) => (
              <div key={title} className="border-t border-line py-6">
                <dt className="font-display text-[1.15rem] font-semibold tracking-tight text-ink">{title}</dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-body">{body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How companies adopt it */}
      <section aria-labelledby="adopt-heading" className="border-t border-line py-24 md:py-32">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p data-reveal className="eyebrow">
              Getting started
            </p>
            <h2 id="adopt-heading" data-split className="h-section mt-6">
              No big-bang go-live.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {STEPS.map(([title, body], i) => (
              <li key={title} className="board relative flex flex-col p-7">
                <span className="mono text-[0.75rem] text-red">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-5 text-[1.25rem] font-semibold tracking-tight text-ink">{title}</p>
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
              About the ERP.
            </h2>
            <p data-reveal className="mt-6 text-body">
              Something else on your mind?{" "}
              <Link href="/contact?interest=erp" className="font-semibold text-red hover:text-red-deep">
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
      <JsonLd
        data={graph(
          {
            "@type": "WebPage",
            "@id": `${abs("/erp")}#webpage`,
            url: abs("/erp"),
            name: "ERP system for growing companies in Sri Lanka",
            about: { "@id": `${SITE_URL}/#organization` },
            isPartOf: { "@id": `${SITE_URL}/#website` },
            mainEntity: {
              "@type": "ItemList",
              name: "Dcode Cloud ERP modules",
              itemListElement: products.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: { "@id": `${abs(`/products/${p.slug}`)}#software`, name: p.name, url: abs(`/products/${p.slug}`) },
              })),
            },
          },
          breadcrumbLd([{ name: "ERP system", path: "/erp" }]),
          faqLd(FAQ),
        )}
      />
    </>
  );
}
