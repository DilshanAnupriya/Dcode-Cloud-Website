import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Branded share images (Open Graph / X). Rendered at build time for every
 * page: paper background, the logo, a red eyebrow, the page's own headline
 * and the circuit traces from the site.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = "image/png";

const asset = (file: string) =>
  readFile(join(process.cwd(), "public", file)).then((b) => `data:image/png;base64,${b.toString("base64")}`);

/** Fetches just the glyphs we need from Google Fonts. Returns null when offline, so builds never fail on it. */
async function googleFont(family: string, weight: number, text: string) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`,
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

const TRACE = "M1200 120 H1000 Q965 120 965 155 V300 Q965 335 930 335 H880";
const TRACE_2 = "M1200 500 H1060 Q1025 500 1025 465 V430";

export async function ogImage({ eyebrow, title, note = "Built in Sri Lanka" }: { eyebrow: string; title: string; note?: string }) {
  const eyebrowText = eyebrow.toUpperCase();
  const [logo, sora, manrope] = await Promise.all([
    asset("brand/logo-full.png"),
    googleFont("Sora", 600, title),
    googleFont("Manrope", 600, `${eyebrowText}dcode.cloud${note}`),
  ]);
  const fonts = [
    ...(sora ? [{ name: "Sora", data: sora, weight: 600 as const, style: "normal" as const }] : []),
    ...(manrope ? [{ name: "Manrope", data: manrope, weight: 600 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          background: "#F4F6FA",
          position: "relative",
          fontFamily: manrope ? "Manrope" : "sans-serif",
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
          <path d={TRACE} stroke="#DCE2EF" strokeWidth="18" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d={TRACE} stroke="#25376A" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="880" cy="335" r="14" fill="#C8102E" />
          <path d={TRACE_2} stroke="#DCE2EF" strokeWidth="18" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d={TRACE_2} stroke="#25376A" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="1025" cy="430" r="11" fill="#25376A" />
        </svg>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={290} height={58} alt="" />

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 740 }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 22, letterSpacing: 3, color: "#C8102E" }}>
            <div style={{ width: 34, height: 3, background: "#C8102E" }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#C8102E", marginRight: 16 }} />
            {eyebrowText}
          </div>
          <div
            style={{
              marginTop: 26,
              fontFamily: sora ? "Sora" : "sans-serif",
              fontSize: title.length > 56 ? 54 : 64,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              color: "#14213D",
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#646D82" }}>
          <div style={{ display: "flex" }}>dcode.cloud</div>
          <div style={{ display: "flex" }}>{note}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}

/** Square icon: the logo mark on a white tile. */
export async function iconImage(px: number, radius: number) {
  const mark = await asset("brand/logo-mark.png");
  const w = Math.round(px * 0.86);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFFFF", borderRadius: radius }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mark} width={w} height={Math.round((w * 348) / 559)} alt="" />
      </div>
    ),
    { width: px, height: px },
  );
}
