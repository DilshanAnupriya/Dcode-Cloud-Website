import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "Dcode Cloud custom software, websites and SaaS";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({ eyebrow: "Custom services", title: "Software, websites and SaaS, built for you." });
}
