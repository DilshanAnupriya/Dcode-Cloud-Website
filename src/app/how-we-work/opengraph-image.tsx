import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "How Dcode Cloud runs a custom build, in five stages";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({ eyebrow: "How we work", title: "One team from the first call to production." });
}
