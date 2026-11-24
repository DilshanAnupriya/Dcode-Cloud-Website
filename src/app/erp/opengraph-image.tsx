import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "Dcode Cloud ERP: payroll, sales and purchasing modules on one platform";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({ eyebrow: "ERP system", title: "An ERP system you can start one module at a time." });
}
