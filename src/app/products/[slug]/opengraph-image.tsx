import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";
import { getProduct, products } from "@/lib/site";

export const alt = "Dcode Cloud product: what it does and whether it is live";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) return ogImage({ eyebrow: "Dcode Cloud", title: "Business software built and run in Sri Lanka." });
  return ogImage({
    eyebrow: `${p.name} · ${p.area}`,
    title: p.headline,
    note: p.status === "live" ? "Live now" : "In development · early access",
  });
}
