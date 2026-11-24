import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PageHeroMotion } from "@/components/page-hero";
import { ProductStory } from "@/components/product-story";
import { Reveal } from "@/components/reveal";
import { TraceArrow } from "@/components/trace-arrow";
import { breadcrumbLd, graph, pageMeta, PRODUCT_SEO, softwareLd } from "@/lib/seo";
import { getProduct, products, site } from "@/lib/site";
import { ClosingCta } from "@/sections/closing-cta";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return pageMeta({ ...PRODUCT_SEO[p.slug], path: `/products/${p.slug}` });
}

const PLATFORM = [
  "One sign-in across Dcode products",
  "Roles and permissions per product",
  "Company data separated in the database",
  "Append-only audit log",
  "Email and in-app notifications",
  "Zoho Books and Zoho CRM connectors",
];

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const short = p.name.replace("Dcode ", "");
  const others = products.filter((o) => o.slug !== p.slug);

  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-[112px] lg:pb-28 lg:pt-[140px]">
        <div
          aria-hidden
          className="bg-dots pointer-events-none absolute inset-0"
          style={{ maskImage: "radial-gradient(ellipse 60% 70% at 75% 40%, #000 30%, transparent 75%)" }}
        />
        <div className="container-x relative grid items-start gap-12 lg:grid-cols-12 lg:gap-12">
          <PageHeroMotion className="lg:sticky lg:top-28 lg:col-span-5">
            <nav aria-label="Breadcrumb" data-rise className="hero-pre mono text-[0.75rem] uppercase tracking-[0.12em] text-muted">
              <Link href="/#products" className="hover:text-ink">
                Products
              </Link>
              <span className="mx-2 text-faint">/</span>
              <span className="text-ink">{short}</span>
            </nav>
            <div data-rise className="hero-pre mt-8 flex flex-wrap items-center gap-3">
              <span className="mono text-[0.75rem] uppercase tracking-[0.14em] text-ink">{p.name}</span>
              <span className="h-px w-6 bg-line-2" />
              <span className="text-[0.85rem] text-muted">{p.area}</span>
              <span className={`chip chip-dot ${p.status === "live" ? "chip-live" : "chip-build"}`}>{p.statusLabel}</span>
            </div>
            <h1 className="hero-pre h-display mt-6 text-[clamp(2.4rem,4.4vw,4rem)] leading-[1.02]">{p.headline}</h1>
            <p data-rise className="hero-pre lede mt-7">
              {p.summary}
            </p>
            <div data-rise className="hero-pre mt-9 flex flex-wrap gap-3">
              {p.status === "live" ? (
                <>
                  <Link href={`/contact?interest=${p.slug}`} className="btn btn-primary">
                    Book a demo <TraceArrow />
                  </Link>
                  <a href={site.appUrl} className="btn btn-ghost">
                    Sign in
                  </a>
                </>
              ) : (
                <>
                  <Link href={p.cta.href} className="btn btn-primary">
                    Join early access <TraceArrow />
                  </Link>
                  <Link href="/products/payflow" className="btn btn-ghost">
                    See Payflow, live today
                  </Link>
                </>
              )}
            </div>
          </PageHeroMotion>
          <div className="min-w-0 lg:col-span-7">
            <ProductStory slug={p.slug} />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-card py-24 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p data-reveal className="eyebrow">
              {p.status === "live" ? "What's included" : "What we're building"}
            </p>
            <h2 data-split className="h-section mt-6">
              {p.status === "live" ? `Everything ${short} does today.` : `What ${short} will do at launch.`}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[22px] border border-line bg-line md:grid-cols-2">
            {p.groups.map((g, gi) => (
              <Reveal key={g.title} className="bg-card p-8 md:p-10" start="top 88%">
                <div data-reveal className="flex items-center gap-3">
                  <span className="mono grid h-8 w-8 place-items-center rounded-full bg-navy-900 text-[0.72rem] text-white">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[1.35rem] font-semibold tracking-tight">{g.title}</h3>
                </div>
                <ul data-reveal className="mt-6 space-y-3">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-3.5 text-[0.98rem] text-body">
                      <svg className="mt-[0.5em] shrink-0" width="18" height="8" viewBox="0 0 18 8" aria-hidden="true">
                        <line x1="1" y1="4" x2="11" y2="4" stroke="#C8102E" strokeWidth="1.75" strokeLinecap="round" />
                        <circle cx="14" cy="4" r="3" fill="#C8102E" />
                      </svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="on-dark relative overflow-hidden bg-navy-950 py-20 text-mist md:py-24">
        <div aria-hidden className="bg-dots-dark absolute inset-0" />
        <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <p data-reveal className="eyebrow">
              Underneath
            </p>
            <h2 data-split className="h-chapter mt-5 text-white">
              Built on the Dcode platform.
            </h2>
            <p data-reveal className="mt-5 text-navy-200">
              {short} shares its core with every other Dcode product, so security, sign-in and audit work the same way
              everywhere.
            </p>
            <div data-reveal className="mt-7">
              <Link href="/#platform" className="link-trace">
                <span>How the platform protects your data</span> <TraceArrow />
              </Link>
            </div>
          </Reveal>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {PLATFORM.map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-2xl border border-navy-800 bg-navy-900/70 px-5 py-4 text-[0.95rem] text-white">
                <span className="h-2 w-2 shrink-0 rounded-full bg-red-bright" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 md:py-28">
        <div className="container-x">
          <p className="eyebrow">Also on the platform</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {others.map((o) => (
              <Link key={o.slug} href={`/products/${o.slug}`} className="board group flex flex-col p-8 transition-transform duration-200 active:scale-[0.99] md:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="mono text-[0.72rem] uppercase tracking-[0.14em] text-ink">{o.name}</span>
                  <span className="text-[0.85rem] text-muted">{o.area}</span>
                  <span className={`chip chip-dot ${o.status === "live" ? "chip-live" : "chip-build"}`}>{o.statusLabel}</span>
                </div>
                <h3 className="mt-5 text-[1.5rem] font-semibold tracking-tight">{o.headline}</h3>
                <span className="link-trace mt-8">
                  <span>{`See ${o.name.replace("Dcode ", "")}`}</span> <TraceArrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
      <JsonLd data={graph(breadcrumbLd([{ name: p.name, path: `/products/${p.slug}` }]), softwareLd(p))} />
    </>
  );
}
