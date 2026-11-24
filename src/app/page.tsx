import { ScrollSort } from "@/components/scroll-sort";
import { pageMeta } from "@/lib/seo";
import { AuditTicker } from "@/sections/audit-ticker";
import { ClosingCta } from "@/sections/closing-cta";
import { Hero } from "@/sections/hero";
import { PlatformChecks } from "@/sections/platform-checks";
import { Process } from "@/sections/process";
import { ProductsShowcase } from "@/sections/products-showcase";
import { ServicesIndex } from "@/sections/services-index";
import { SriLanka } from "@/sections/sri-lanka";
import { TwoWays } from "@/sections/two-ways";

export const metadata = pageMeta({
  title: "Dcode Cloud | ERP, SaaS and custom software company in Sri Lanka",
  description:
    "Sri Lankan IT company building ERP software for payroll, sales and purchasing, plus custom software, SaaS applications and websites for growing companies.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <AuditTicker />
      <TwoWays />
      <ProductsShowcase />
      <PlatformChecks />
      <ServicesIndex />
      <SriLanka />
      <Process />
      <div className="pt-24 md:pt-32">
        <ClosingCta />
      </div>
      <ScrollSort />
    </>
  );
}
