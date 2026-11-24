import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "Dcode Cloud: we build the systems, then we run them.";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({ eyebrow: "Software studio and SaaS platform", title: "We build the systems. Then we run them." });
}
