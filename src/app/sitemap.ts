import type { MetadataRoute } from "next";
import { abs } from "@/lib/seo";
import { products } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: abs("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...products.map((p) => ({
      url: abs(`/products/${p.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p.status === "live" ? 0.9 : 0.7,
    })),
    { url: abs("/erp"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: abs("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: abs("/how-we-work"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: abs("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];
}
