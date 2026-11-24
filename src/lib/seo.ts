import type { Metadata } from "next";
import type { Product } from "./site";

/**
 * The public address of the site. Set NEXT_PUBLIC_SITE_URL per environment;
 * production builds fall back to dcode.cloud, everything else to localhost.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.NODE_ENV === "production" ? "https://dcode.cloud" : "http://localhost:3100")
).replace(/\/$/, "");

export const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export const ORG = {
  name: "Dcode Cloud",
  legalName: "Dcode Cloud",
  email: "hello@dcode.cloud",
  supportEmail: "support@dcode.cloud",
  country: "LK",
  locale: "en_LK",
  description:
    "An IT company in Sri Lanka that builds and runs ERP software for payroll, sales and purchasing, and develops custom software, SaaS applications and websites.",
};

/**
 * Metadata for one page: title, description, a canonical URL and matching
 * Open Graph fields. Images come from the opengraph-image file next to the page.
 */
export function pageMeta({
  title,
  description,
  path,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: ORG.name,
      locale: ORG.locale,
      url: path,
      title: absoluteTitle ? title : `${title} · ${ORG.name}`,
      description,
    },
  };
}

// Search titles lead with what people type: the job, then the country.
export const PRODUCT_SEO: Record<Product["slug"], { title: string; description: string }> = {
  payflow: {
    title: "Payflow: payroll software for Sri Lanka with EPF, ETF and APIT",
    description:
      "Monthly payroll for Sri Lankan companies: EPF, ETF and APIT worked out for you, approvals before anyone is paid, locked payslips and a journal posted to Zoho Books.",
  },
  crm: {
    title: "Dcode CRM: sales pipeline software for Sri Lankan teams",
    description:
      "A sales CRM built on the Dcode platform: weighted pipeline, stage gates your managers set, and one sign-in with Payflow and Procurement. In development, early access open.",
  },
  procurement: {
    title: "Dcode Procurement: purchase orders with three-way matching",
    description:
      "Purchase requests, approvals and purchase orders that match against goods received and the supplier invoice before anyone pays. In development, early access open.",
  },
};

/* ---------- Structured data (schema.org JSON-LD) ---------- */

type Ld = Record<string, unknown>;

export const organizationLd = (): Ld => ({
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: ORG.name,
  url: SITE_URL,
  description: ORG.description,
  knowsAbout: [
    "ERP systems",
    "SaaS applications",
    "Payroll software",
    "CRM software",
    "Procurement software",
    "Custom software development",
    "Web development",
    "Software integrations",
  ],
  logo: { "@type": "ImageObject", url: abs("/brand/logo-full.png"), width: 1745, height: 348 },
  email: ORG.email,
  address: { "@type": "PostalAddress", addressCountry: ORG.country },
  areaServed: [{ "@type": "Country", name: "Sri Lanka" }],
  contactPoint: [
    { "@type": "ContactPoint", contactType: "sales", email: ORG.email, availableLanguage: ["en"] },
    { "@type": "ContactPoint", contactType: "customer support", email: ORG.supportEmail, availableLanguage: ["en"] },
  ],
});

export const websiteLd = (): Ld => ({
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: ORG.name,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
});

export const breadcrumbLd = (items: { name: string; path: string }[]): Ld => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

export const softwareLd = (p: Product): Ld => ({
  "@type": "SoftwareApplication",
  "@id": `${abs(`/products/${p.slug}`)}#software`,
  name: p.name,
  url: abs(`/products/${p.slug}`),
  description: PRODUCT_SEO[p.slug].description,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: p.area,
  operatingSystem: "Web browser",
  featureList: p.bullets,
  publisher: { "@id": `${SITE_URL}/#organization` },
  ...(p.status === "building" ? { releaseNotes: "In development. Early access is open." } : {}),
});

export const faqLd = (faq: { q: string; a: string }[]): Ld => ({
  "@type": "FAQPage",
  mainEntity: faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});

/** Wraps several nodes in one @graph document. */
export const graph = (...nodes: Ld[]) => ({ "@context": "https://schema.org", "@graph": nodes });
