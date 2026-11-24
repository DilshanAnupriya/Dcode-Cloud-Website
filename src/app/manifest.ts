import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dcode Cloud",
    short_name: "Dcode Cloud",
    description: "Business software built and run in Sri Lanka: Payflow payroll, CRM, Procurement and custom builds.",
    start_url: "/",
    display: "browser",
    background_color: "#F4F6FA",
    theme_color: "#14213D",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
