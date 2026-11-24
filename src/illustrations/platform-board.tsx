/**
 * Hero illustration: the Dcode platform drawn as a circuit board.
 * Products are chips, the shared platform is the core, and every connection
 * is a trace ending in a round terminal, the same mark the logo uses.
 * Hooks for the hero timeline: data-core, data-mod, data-trace, data-term,
 * data-chip, data-pulse, data-zoho-state.
 */

const NAVY = "#14213D";
const TRACE = "#25376A";
const TRACK = "#DCE2EF";
const RED = "#C8102E";

export const TRACES = {
  payflow: "M320 255 V220 Q320 205 305 205 H160 Q145 205 145 190 V164",
  crm: "M460 255 V210 Q460 195 475 195 H600 Q615 195 615 180 V150",
  procurement: "M270 375 H157 Q142 375 142 390 V470",
  zoho: "M460 415 V430 Q460 445 475 445 H600 Q615 445 615 460 V486",
  custom: "M510 336 H575",
  identity: "M330 415 V600",
} as const;

const TERMINALS: [number, number][] = [
  [145, 164],
  [615, 150],
  [142, 470],
  [615, 486],
  [575, 336],
  [330, 600],
];

const MODULES = [
  "identity",
  "tenancy",
  "permissions",
  "audit",
  "notifications",
  "files",
  "jobs",
  "integrations",
];

function Chip({
  x,
  y,
  w,
  h,
  dashed,
  stroke = "#E1E4EC",
  shadow = "chip-shadow",
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  dashed?: boolean;
  stroke?: string;
  shadow?: string;
  children: React.ReactNode;
}) {
  return (
    <g data-chip>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="14"
        fill="#FFFFFF"
        stroke={stroke}
        strokeWidth={dashed ? 1.5 : 1}
        strokeDasharray={dashed ? "5 5" : undefined}
        filter={`url(#${shadow})`}
      />
      {children}
    </g>
  );
}

export function PlatformBoard() {
  return (
    <svg
      viewBox="0 0 760 660"
      data-board="wide"
      className="ill block h-auto w-full overflow-visible"
      role="img"
      aria-labelledby="board-title board-desc"
    >
      <title id="board-title">The Dcode platform</title>
      <desc id="board-desc">
        Payflow, CRM, Procurement and custom systems all connect to one shared platform core for sign-in,
        company separation, permissions and audit. The core also connects to Zoho Books.
      </desc>
      <defs>
        <filter id="chip-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor={NAVY} floodOpacity="0.09" />
        </filter>
        <filter id="core-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor={NAVY} floodOpacity="0.28" />
        </filter>
      </defs>

      {/* Tracks under the traces, like solder mask channels */}
      <g fill="none" stroke={TRACK} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
        {Object.entries(TRACES).map(([key, d]) => (
          <path key={key} d={d} data-track />
        ))}
      </g>
      <g fill="none" stroke={TRACE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {Object.entries(TRACES).map(([key, d]) => (
          <path key={key} d={d} data-trace={key} id={`trace-${key}`} />
        ))}
      </g>

      {/* Platform core */}
      <g data-core>
        <rect x="270" y="255" width="240" height="160" rx="18" fill={NAVY} filter="url(#core-shadow)" />
        <rect x="270.5" y="255.5" width="239" height="159" rx="17.5" fill="none" stroke="#25376A" />
        <text x="286" y="283" className="svg-mono" fontSize="10.5" fill="#8B94AB">
          DCODE PLATFORM
        </text>
        <circle cx="494" cy="279" r="4" fill="#34D399" />
        {MODULES.map((m, i) => {
          const col = i < 4 ? 0 : 1;
          const row = i % 4;
          const x = 286 + col * 108;
          const y = 296 + row * 28;
          return (
            <g key={m} data-mod={m}>
              <rect x={x} y={y} width="100" height="22" rx="6" fill="#1B2B4F" data-mod-bg />
              <text x={x + 10} y={y + 15} className="svg-sans" fontSize="11.5" fontWeight="600" fill="#C6CDDC">
                {m}
              </text>
            </g>
          );
        })}
      </g>

      {/* Payflow */}
      <Chip x={30} y={60} w={230} h={104}>
        <text x="50" y="88" className="svg-mono" fontSize="10.5" fill="#646D82">
          PAYFLOW · PAYROLL
        </text>
        <text x="50" y="119" className="svg-display" fontSize="18" fill={NAVY}>
          November run
        </text>
        <text x="50" y="145" className="svg-mono" fontSize="11.5" fill="#3B4459">
          EPF 8% + 12% · ETF 3%
        </text>
      </Chip>

      {/* CRM */}
      <Chip x={500} y={40} w={230} h={110}>
        <text x="520" y="68" className="svg-mono" fontSize="10.5" fill="#646D82">
          CRM · SALES
        </text>
        <text x="520" y="99" className="svg-display" fontSize="18" fill={NAVY}>
          Pipeline
        </text>
        {[3, 2, 2, 1, 1].map((count, col) =>
          Array.from({ length: count }).map((_, k) => (
            <rect
              key={`${col}-${k}`}
              x={520 + col * 40}
              y={130 - k * 9}
              width="32"
              height="6"
              rx="3"
              fill={col === 4 ? "#0E9F6E" : col === 3 ? RED : "#B8C3DB"}
            />
          )),
        )}
      </Chip>

      {/* Custom system */}
      <Chip x={575} y={290} w={165} h={92} dashed stroke={RED}>
        <text x="591" y="316" className="svg-mono" fontSize="10.5" fill={RED}>
          YOUR SYSTEM
        </text>
        <text x="591" y="343" className="svg-display" fontSize="16" fill={NAVY}>
          Custom build
        </text>
        <text x="591" y="364" className="svg-sans" fontSize="11.5" fill="#646D82">
          Same sign-in and audit
        </text>
      </Chip>

      {/* Procurement */}
      <Chip x={24} y={470} w={236} h={106}>
        <text x="44" y="498" className="svg-mono" fontSize="10.5" fill="#646D82">
          PROCUREMENT
        </text>
        <text x="44" y="528" className="svg-display" fontSize="18" fill={NAVY}>
          3-way match
        </text>
        {["PO", "GRN", "INV"].map((d, i) => (
          <g key={d}>
            <rect x={44 + i * 56} y="542" width="48" height="20" rx="5" fill="#F4F6FA" stroke="#E1E4EC" />
            <text x={68 + i * 56} y="556" textAnchor="middle" className="svg-mono" fontSize="10" fill="#3B4459">
              {d}
            </text>
          </g>
        ))}
        <circle cx="222" cy="552" r="9" fill="#DEF7EC" />
        <path d="M218 552 l3 3 l5 -6" fill="none" stroke="#0E9F6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </Chip>

      {/* Zoho Books (external) */}
      <Chip x={500} y={486} w={230} h={90} dashed stroke="#9AA1B4">
        <text x="520" y="513" className="svg-mono" fontSize="10.5" fill="#646D82">
          ZOHO BOOKS
        </text>
        <text x="712" y="513" textAnchor="end" className="svg-mono" fontSize="9.5" fill="#9AA1B4">
          CONNECTOR
        </text>
        <g data-zoho-state="idle">
          <text x="520" y="542" className="svg-sans" fontSize="13.5" fontWeight="600" fill="#646D82">
            Waiting for payroll
          </text>
        </g>
        <g data-zoho-state="done" opacity="0">
          <circle cx="527" cy="537" r="7" fill="#DEF7EC" />
          <path d="M524 537 l2.2 2.2 l4 -4.6" fill="none" stroke="#0E9F6E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <text x="540" y="542" className="svg-sans" fontSize="13.5" fontWeight="700" fill={NAVY}>
            Journal posted
          </text>
        </g>
        <text x="520" y="563" className="svg-mono" fontSize="11" fill="#3B4459">
          Dr = Cr · LKR 212,750.00
        </text>
      </Chip>

      {/* One sign-in */}
      <g data-chip>
        <rect x="200" y="600" width="260" height="40" rx="20" fill="#FFFFFF" stroke="#E1E4EC" filter="url(#chip-shadow)" />
        <circle cx="224" cy="620" r="10" fill="#FBE3E7" />
        <circle cx="224" cy="617" r="3.2" fill={RED} />
        <path d="M218.5 625.5 a5.5 4.5 0 0 1 11 0" fill={RED} />
        <text x="244" y="625" className="svg-sans" fontSize="13" fontWeight="700" fill={NAVY}>
          One sign-in for every product
        </text>
      </g>

      {/* Terminals sit on the chip edges, drawn last so they read as pads */}
      <g>
        {TERMINALS.map(([cx, cy]) => (
          <g key={`${cx}-${cy}`} data-term>
            <circle cx={cx} cy={cy} r="7.5" fill="#FFFFFF" />
            <circle cx={cx} cy={cy} r="5.5" fill={TRACE} />
          </g>
        ))}
      </g>

      {/* Data pulses travel the traces once the board is live */}
      {Object.keys(TRACES).map((key) => (
        <circle key={key} data-pulse={key} r="5" cx="0" cy="0" fill={RED} stroke="#FFFFFF" strokeWidth="2" opacity="0" />
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   Phone layout. The wide board shrinks to about 45% on a phone, which puts its
   labels near 5px. This one is drawn at phone width instead: products above
   and below the core, every label at 9.5px or more in a 340-unit viewBox.
   Same data hooks, so the hero timeline drives either board.
--------------------------------------------------------------------------- */

const C_TRACES = {
  payflow: "M110 172 V152 Q110 140 98 140 H92 Q80 140 80 128 V108",
  crm: "M230 172 V152 Q230 140 242 140 H248 Q260 140 260 128 V108",
  procurement: "M110 368 V388 Q110 400 98 400 H92 Q80 400 80 412 V432",
  zoho: "M230 368 V388 Q230 400 242 400 H248 Q260 400 260 412 V432",
  identity: "M170 368 V556",
} as const;

const C_TERMINALS: [number, number][] = [
  [80, 108],
  [260, 108],
  [80, 432],
  [260, 432],
  [170, 556],
];

export function PlatformBoardCompact() {
  return (
    <svg viewBox="0 0 340 600" data-board="compact" className="ill block h-auto w-full overflow-visible" role="img" aria-labelledby="pbc-title pbc-desc">
      <title id="pbc-title">The Dcode platform</title>
      <desc id="pbc-desc">
        Payflow, CRM and Procurement connect to one shared platform core for sign-in, company separation, permissions and
        audit. The core also connects to Zoho Books.
      </desc>
      <defs>
        <filter id="pbc-chip-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor={NAVY} floodOpacity="0.09" />
        </filter>
        <filter id="pbc-core-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor={NAVY} floodOpacity="0.26" />
        </filter>
      </defs>

      <g fill="none" stroke={TRACK} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
        {Object.entries(C_TRACES).map(([key, d]) => (
          <path key={key} d={d} data-track />
        ))}
      </g>
      <g fill="none" stroke={TRACE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {Object.entries(C_TRACES).map(([key, d]) => (
          <path key={key} d={d} data-trace={key} />
        ))}
      </g>

      <g data-core>
        <rect x="30" y="172" width="280" height="196" rx="18" fill={NAVY} filter="url(#pbc-core-shadow)" />
        <rect x="30.5" y="172.5" width="279" height="195" rx="17.5" fill="none" stroke="#25376A" />
        <text x="46" y="198" className="svg-mono" fontSize="10.5" fill="#8B94AB">
          DCODE PLATFORM
        </text>
        <circle cx="294" cy="194" r="4" fill="#34D399" />
        {MODULES.map((m, i) => {
          const x = 46 + (i < 4 ? 0 : 128);
          const y = 212 + (i % 4) * 36;
          return (
            <g key={m} data-mod={m}>
              <rect x={x} y={y} width="120" height="28" rx="7" fill="#1B2B4F" data-mod-bg />
              <text x={x + 12} y={y + 18.5} className="svg-sans" fontSize="12.5" fontWeight="600" fill="#C6CDDC">
                {m}
              </text>
            </g>
          );
        })}
      </g>

      <Chip x={0} y={8} w={160} h={100} shadow="pbc-chip-shadow">
        <text x="14" y="34" className="svg-mono" fontSize="10" fill="#646D82">
          PAYFLOW · PAYROLL
        </text>
        <text x="14" y="64" className="svg-display" fontSize="17" fill={NAVY}>
          November run
        </text>
        <text x="14" y="90" className="svg-mono" fontSize="9.5" fill="#3B4459">
          EPF 8% + 12% · ETF 3%
        </text>
      </Chip>

      <Chip x={180} y={8} w={160} h={100} shadow="pbc-chip-shadow">
        <text x="194" y="34" className="svg-mono" fontSize="10" fill="#646D82">
          CRM · SALES
        </text>
        <text x="194" y="64" className="svg-display" fontSize="17" fill={NAVY}>
          Pipeline
        </text>
        {[3, 2, 2, 1, 1].map((count, col) =>
          Array.from({ length: count }).map((_, k) => (
            <rect
              key={`${col}-${k}`}
              x={194 + col * 27}
              y={90 - k * 8}
              width="22"
              height="5"
              rx="2.5"
              fill={col === 4 ? "#0E9F6E" : col === 3 ? RED : "#B8C3DB"}
            />
          )),
        )}
      </Chip>

      <Chip x={0} y={432} w={160} h={100} shadow="pbc-chip-shadow">
        <text x="14" y="458" className="svg-mono" fontSize="10" fill="#646D82">
          PROCUREMENT
        </text>
        <text x="14" y="488" className="svg-display" fontSize="17" fill={NAVY}>
          3-way match
        </text>
        {["PO", "GRN", "INV"].map((d, i) => (
          <g key={d}>
            <rect x={14 + i * 38} y="502" width="33" height="18" rx="4.5" fill="#F4F6FA" stroke="#E1E4EC" />
            <text x={30.5 + i * 38} y="515" textAnchor="middle" className="svg-mono" fontSize="9" fill="#3B4459">
              {d}
            </text>
          </g>
        ))}
        <circle cx="140" cy="511" r="8" fill="#DEF7EC" />
        <path d="M136.5 511 l2.6 2.6 l4.6 -5.2" fill="none" stroke="#0E9F6E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </Chip>

      <Chip x={180} y={432} w={160} h={100} dashed stroke="#9AA1B4" shadow="pbc-chip-shadow">
        <text x="194" y="458" className="svg-mono" fontSize="10" fill="#646D82">
          ZOHO BOOKS
        </text>
        <g data-zoho-state="idle">
          <text x="194" y="487" className="svg-sans" fontSize="12" fontWeight="600" fill="#646D82">
            Waiting for payroll
          </text>
        </g>
        <g data-zoho-state="done" opacity="0">
          <circle cx="200.5" cy="483" r="6.5" fill="#DEF7EC" />
          <path d="M197.6 483 l2 2 l3.8 -4.3" fill="none" stroke="#0E9F6E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <text x="212" y="487" className="svg-sans" fontSize="12.5" fontWeight="700" fill={NAVY}>
            Journal posted
          </text>
        </g>
        <text x="194" y="512" className="svg-mono" fontSize="9" fill="#3B4459">
          Dr = Cr · LKR 212,750
        </text>
      </Chip>

      <g data-chip>
        <rect x="50" y="556" width="240" height="38" rx="19" fill="#FFFFFF" stroke="#E1E4EC" filter="url(#pbc-chip-shadow)" />
        <circle cx="71" cy="575" r="10" fill="#FBE3E7" />
        <circle cx="71" cy="572" r="3.2" fill={RED} />
        <path d="M65.5 580.5 a5.5 4.5 0 0 1 11 0" fill={RED} />
        <text x="90" y="579.5" className="svg-sans" fontSize="12" fontWeight="700" fill={NAVY}>
          One sign-in for every product
        </text>
      </g>

      <g>
        {C_TERMINALS.map(([cx, cy]) => (
          <g key={`${cx}-${cy}`} data-term>
            <circle cx={cx} cy={cy} r="7" fill="#FFFFFF" />
            <circle cx={cx} cy={cy} r="5" fill={TRACE} />
          </g>
        ))}
      </g>

      {Object.keys(C_TRACES).map((key) => (
        <circle key={key} data-pulse={key} r="5" cx="0" cy="0" fill={RED} stroke="#FFFFFF" strokeWidth="2" opacity="0" />
      ))}
    </svg>
  );
}
