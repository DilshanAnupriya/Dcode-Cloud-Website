import Image from "next/image";
import Link from "next/link";
import { products, site } from "@/lib/site";

const company = [
  { href: "/services", label: "Custom services" },
  { href: "/#platform", label: "The platform" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="on-dark relative overflow-hidden bg-navy-950 text-mist">
      <div aria-hidden className="bg-dots-dark absolute inset-0 opacity-60" />
      <div className="container-x relative grid gap-14 pb-10 pt-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image src="/brand/logo-full-dark.png" alt="Dcode Cloud" width={201} height={40} className="h-10 w-auto" />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-navy-200">
            An IT company in Sri Lanka. We build and run our own ERP and SaaS products, and we build custom
            software, SaaS applications and websites for other companies.
          </p>
          <p className="mono mt-6 text-[0.7rem] uppercase tracking-[0.16em] text-navy-400">{site.tagline}</p>
        </div>

        <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-3">
          <div>
            <h2 className="mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-navy-400">Products</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href="/erp" className="text-[0.95rem] text-mist transition-colors hover:text-white">
                  ERP system
                  <span className="ml-2 text-[0.8rem] text-navy-400">All modules</span>
                </Link>
              </li>
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="text-[0.95rem] text-mist transition-colors hover:text-white">
                    {p.name.replace("Dcode ", "")}
                    <span className="ml-2 text-[0.8rem] text-navy-400">{p.area}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-navy-400">Company</h2>
            <ul className="mt-5 space-y-3">
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-[0.95rem] text-mist transition-colors hover:text-white">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h2 className="mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-navy-400">Customers</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={site.appUrl} className="text-[0.95rem] text-mist transition-colors hover:text-white">
                  Sign in to Payflow
                </a>
              </li>
              <li>
                <Link href="/contact?interest=support" className="text-[0.95rem] text-mist transition-colors hover:text-white">
                  Get support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-x relative">
        <div className="flex flex-col gap-3 border-t border-navy-800 py-7 text-[0.85rem] text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dcode Cloud. Built in Sri Lanka.</p>
          <p className="mono text-[0.72rem] tracking-[0.08em]">Asia/Colombo · UTC+05:30</p>
        </div>
      </div>
    </footer>
  );
}
