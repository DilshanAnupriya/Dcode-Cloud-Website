import type { ServiceKey } from "@/lib/services";

/*
 * One line drawing per custom service, in the same trace language as the
 * logo. Paths marked data-draw are drawn in; data-pop shapes fade and scale.
 */

const S = { fill: "none", stroke: "#25376A", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const R = { ...S, stroke: "#C8102E" };

function Software() {
  return (
    <>
      <rect x="40" y="36" width="320" height="228" rx="16" {...S} data-draw />
      <path d="M112 36 V264" {...S} data-draw />
      {[78, 104, 130].map((y, i) => (
        <path key={y} d={`M60 ${y} H${i === 0 ? 94 : 86}`} {...S} stroke={i === 0 ? "#C8102E" : "#25376A"} data-draw />
      ))}
      <path d="M132 84 H340" {...S} data-draw />
      {[112, 140, 168].map((y, i) => (
        <g key={y}>
          <path d={`M132 ${y} H${280 - i * 24}`} {...S} stroke="#B8C3DB" data-draw />
          <circle cx="330" cy={y} r="5" fill={i === 1 ? "#D97706" : "#0E9F6E"} data-pop />
        </g>
      ))}
      {/* approval chain */}
      <path d="M160 222 H300" {...S} data-draw />
      {[160, 230].map((cx) => (
        <g key={cx} data-pop>
          <circle cx={cx} cy="222" r="14" fill="#DEF7EC" />
          <path d={`M${cx - 5} 222 l3.5 3.5 l6.5 -7`} {...S} stroke="#0E9F6E" />
        </g>
      ))}
      <circle cx="300" cy="222" r="14" {...R} data-draw />
      <circle cx="300" cy="222" r="5" fill="#C8102E" data-pop />
      <text x="160" y="254" textAnchor="middle" className="svg-mono" fontSize="9.5" fill="#646D82" data-pop>REQUEST</text>
      <text x="230" y="254" textAnchor="middle" className="svg-mono" fontSize="9.5" fill="#646D82" data-pop>MANAGER</text>
      <text x="300" y="254" textAnchor="middle" className="svg-mono" fontSize="9.5" fill="#C8102E" data-pop>FINANCE</text>
    </>
  );
}

function Websites() {
  return (
    <>
      <rect x="36" y="40" width="328" height="220" rx="16" {...S} data-draw />
      <path d="M36 74 H364" {...S} data-draw />
      {[56, 72, 88].map((cx) => (
        <circle key={cx} cx={cx} cy="57" r="4.5" {...S} data-draw />
      ))}
      <rect x="62" y="98" width="150" height="16" rx="4" fill="#14213D" data-pop />
      <rect x="62" y="122" width="112" height="16" rx="4" fill="#14213D" data-pop />
      <path d="M62 156 H196 M62 170 H176" {...S} stroke="#B8C3DB" data-draw />
      <rect x="62" y="194" width="74" height="24" rx="12" fill="#C8102E" data-pop />
      <path d="M238 222 C250 150 300 200 312 138 S336 104 340 96" {...R} data-draw />
      <circle cx="340" cy="96" r="8" fill="#C8102E" data-pop />
      <path d="M292 182 l0 22 l6 -6 l5 10 l4 -2 l-5 -10 l8 0 z" fill="#14213D" data-pop />
    </>
  );
}

function Saas() {
  return (
    <>
      <rect x="40" y="206" width="320" height="44" rx="12" fill="#14213D" data-pop />
      <text x="60" y="233" className="svg-mono" fontSize="10" fill="#B8C3DB" data-pop>ONE PLATFORM</text>
      {["A", "B", "C"].map((t, i) => {
        const x = 52 + i * 104;
        return (
          <g key={t}>
            <rect x={x} y="60" width="88" height="120" rx="12" {...S} data-draw />
            <path d={`M${x + 16} 92 H${x + 60} M${x + 16} 110 H${x + 48} M${x + 16} 128 H${x + 66}`} {...S} stroke="#B8C3DB" data-draw />
            <text x={x + 16} y="160" className="svg-mono" fontSize="10" fill="#646D82" data-pop>{`ORG ${t}`}</text>
            <path d={`M${x + 44} 180 V206`} {...S} data-draw />
          </g>
        );
      })}
      {[148, 252].map((x) => (
        <g key={x}>
          <path d={`M${x} 48 V194`} {...R} strokeDasharray="3 6" data-pop />
          <g data-pop>
            <rect x={x - 9} y="112" width="18" height="15" rx="3" fill="#C8102E" />
            <path d={`M${x - 5} 112 v-4 a5 5 0 0 1 10 0 v4`} fill="none" stroke="#C8102E" strokeWidth="2" />
          </g>
        </g>
      ))}
    </>
  );
}

function Integrations() {
  return (
    <>
      <rect x="34" y="112" width="104" height="76" rx="14" fill="#14213D" data-pop />
      <text x="86" y="155" textAnchor="middle" className="svg-display" fontSize="15" fill="#fff" data-pop>Dcode</text>
      <rect x="262" y="112" width="104" height="76" rx="14" {...S} strokeDasharray="5 5" data-pop />
      <text x="314" y="148" textAnchor="middle" className="svg-mono" fontSize="10" fill="#646D82" data-pop>ZOHO</text>
      <text x="314" y="165" textAnchor="middle" className="svg-mono" fontSize="10" fill="#646D82" data-pop>BOOKS</text>
      <path d="M138 132 C180 84 220 84 262 132" {...S} data-draw />
      <path d="M262 168 C220 216 180 216 138 168" {...R} data-draw />
      <path d="M252 122 l10 10 l-13 3" {...S} data-draw />
      <path d="M148 178 l-10 -10 l13 -3" {...R} data-draw />
      <g data-pop>
        <rect x="178" y="76" width="44" height="26" rx="6" fill="#fff" stroke="#25376A" strokeWidth="1.5" />
        <path d="M186 85 H214 M186 93 H206" stroke="#B8C3DB" strokeWidth="2" strokeLinecap="round" />
      </g>
      <text x="200" y="230" textAnchor="middle" className="svg-mono" fontSize="9.5" fill="#C8102E" data-pop>WEBHOOK → RE-FETCH</text>
      <text x="200" y="66" textAnchor="middle" className="svg-mono" fontSize="9.5" fill="#646D82" data-pop>JOURNAL</text>
    </>
  );
}

function Ai() {
  return (
    <>
      <path d="M48 40 H170 L204 74 V262 H48 Z" {...S} data-draw />
      <path d="M170 40 V74 H204" {...S} data-draw />
      {[96, 116, 136, 168, 188, 220].map((y, i) => (
        <path key={y} d={`M68 ${y} H${[170, 150, 182, 160, 176, 140][i]}`} {...S} stroke={i === 2 || i === 5 ? "#C8102E" : "#B8C3DB"} data-draw />
      ))}
      <rect x="40" y="128" width="172" height="16" rx="4" fill="#C8102E" opacity="0.12" data-pop />
      {[
        ["SUPPLIER", "Harbour Office", 82],
        ["TOTAL", "308,000.00", 146],
        ["DUE", "20 Dec 2026", 210],
      ].map(([k, v, y]) => (
        <g key={k as string}>
          <path d={`M204 ${Number(y) + 14} H236`} {...R} data-draw />
          <circle cx="236" cy={Number(y) + 14} r="4" fill="#C8102E" data-pop />
          <rect x="244" y={Number(y)} width="120" height="30" rx="8" {...S} data-draw />
          <text x="254" y={Number(y) + 12} className="svg-mono" fontSize="8.5" fill="#646D82" data-pop>{k}</text>
          <text x="254" y={Number(y) + 24} className="svg-sans" fontSize="11" fontWeight="700" fill="#14213D" data-pop>{v}</text>
        </g>
      ))}
    </>
  );
}

const ART: Record<ServiceKey, () => React.JSX.Element> = {
  software: Software,
  websites: Websites,
  saas: Saas,
  integrations: Integrations,
  ai: Ai,
};

export function ServiceArt({ kind, className = "" }: { kind: ServiceKey; className?: string }) {
  const Art = ART[kind];
  return (
    <svg viewBox="0 0 400 300" className={`ill block h-auto w-full ${className}`} aria-hidden="true">
      <Art />
    </svg>
  );
}
