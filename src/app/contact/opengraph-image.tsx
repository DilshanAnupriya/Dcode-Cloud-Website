import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "Contact Dcode Cloud";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({ eyebrow: "Contact", title: "Tell us what you need built or fixed." });
}
