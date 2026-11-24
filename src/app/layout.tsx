import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Sora } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { SiteHeader } from "@/components/site-header";
import { graph, ORG, organizationLd, SITE_URL, websiteLd } from "@/lib/seo";
import "./globals.css";

// Dcode Cloud Design System type: Sora for display, Manrope for text,
// JetBrains Mono for data and labels.
const sora = Sora({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-sora", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-manrope", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dcode Cloud | ERP, SaaS and custom software company in Sri Lanka",
    template: "%s · Dcode Cloud",
  },
  description:
    "Sri Lankan IT company building ERP software for payroll, sales and purchasing, plus custom software, SaaS applications and websites for growing companies.",
  keywords: [
    "ERP system Sri Lanka",
    "ERP software",
    "IT company Sri Lanka",
    "SaaS application development",
    "payroll software Sri Lanka",
    "custom software development Sri Lanka",
    "web development Sri Lanka",
  ],
  applicationName: ORG.name,
  authors: [{ name: ORG.name, url: SITE_URL }],
  creator: ORG.name,
  publisher: ORG.name,
  category: "technology",
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", siteName: ORG.name, locale: ORG.locale, url: "/" },
  twitter: { card: "summary_large_image" },
};

const THEME_SCRIPT = `(function(){var e=document.documentElement;e.classList.add("js");var d=false;try{var t=localStorage.getItem("theme");d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches}catch(_){}e.dataset.theme=d?"dark":"light"})()`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1c" },
  ],
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${manrope.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint: picks the saved or device theme (no flash of
            the wrong one) and marks that JS will run, so the hero can wait for its entrance. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <JsonLd data={graph(organizationLd(), websiteLd())} />
      </body>
    </html>
  );
}
