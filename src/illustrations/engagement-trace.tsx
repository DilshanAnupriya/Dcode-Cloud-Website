import { gsap } from "@/lib/gsap";

/**
 * How-we-work hero: the five stages of a custom build as chips on one trace.
 * A packet carries the project from Discovery to Run. Inside Build it loops
 * the sprint ring, once per sprint, and the preview link updates each time.
 * Two layouts share every drawing: "wide" (a grid, for tablets and up) and
 * "tall" (a stack sized for phones, so labels stay near 10px on screen).
 * The markup is the finished state, so it reads correctly without motion.
 */

const NAVY = "#14213D";
const TRACE = "#25376A";
const TRACK = "#DCE2EF";
const RED = "#C8102E";
const MUTED = "#646D82";
const LINE = "#E1E4EC";

type StageKey = "discovery" | "prototype" | "build" | "launch" | "run";
type TraceKey = "discovery" | "prototype" | "build" | "launch";
type Box = { x: number; y: number; w: number; h: number };
type Layout = {
  width: number;
  height: number;
  boxes: Record<StageKey, Box>;
  traces: Record<TraceKey, string>;
  terms: [number, number][];
  ring: number;
};

const LAYOUTS: Record<"wide" | "tall", Layout> = {
  wide: {
    width: 720,
    height: 440,
    boxes: {
      discovery: { x: 20, y: 24, w: 210, h: 112 },
      prototype: { x: 20, y: 300, w: 210, h: 116 },
      build: { x: 268, y: 120, w: 184, h: 200 },
      launch: { x: 490, y: 24, w: 210, h: 112 },
      run: { x: 490, y: 300, w: 210, h: 116 },
    },
    traces: {
      discovery: "M125 136 V300",
      prototype: "M230 358 H236 Q249 358 249 345 V245 Q249 232 262 232 H268",
      build: "M452 208 H458 Q471 208 471 195 V93 Q471 80 484 80 H490",
      launch: "M595 136 V300",
    },
    terms: [
      [125, 300],
      [268, 232],
      [490, 80],
      [595, 300],
    ],
    ring: 50,
  },
  tall: {
    width: 340,
    height: 840,
    boxes: {
      discovery: { x: 0, y: 0, w: 340, h: 100 },
      prototype: { x: 0, y: 156, w: 340, h: 112 },
      build: { x: 30, y: 324, w: 280, h: 180 },
      launch: { x: 0, y: 560, w: 340, h: 108 },
      run: { x: 0, y: 724, w: 340, h: 114 },
    },
    traces: {
      discovery: "M70 100 V114 Q70 128 84 128 H256 Q270 128 270 142 V156",
      prototype: "M270 268 V282 Q270 296 256 296 H124 Q110 296 110 310 V324",
      build: "M230 504 V518 Q230 532 244 532 H256 Q270 532 270 546 V560",
      launch: "M70 668 V724",
    },
    terms: [
      [270, 156],
      [110, 324],
      [270, 560],
      [70, 724],
    ],
    ring: 44,
  },
};

const SPRINTS = 3;

function Card({ b, stage, shadow, children }: { b: Box; stage: StageKey; shadow: string; children: React.ReactNode }) {
  return (
    <g data-eg-chip={stage}>
      <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="14" fill="#FFFFFF" stroke={LINE} filter={`url(#${shadow})`} />
      {children}
    </g>
  );
}

function Label({ b, n, name, note, fill = MUTED }: { b: Box; n: number; name: string; note?: string; fill?: string }) {
  return (
    <>
      <text x={b.x + 16} y={b.y + 26} className="svg-mono" fontSize="10.5" letterSpacing="0.08em" fill={fill}>
        <tspan fill={RED}>{String(n).padStart(2, "0")}</tspan> · {name.toUpperCase()}
      </text>
      {note && (
        <text x={b.x + b.w - 16} y={b.y + 26} textAnchor="end" className="svg-mono" fontSize="9" letterSpacing="0.06em" fill="#9AA1B4">
          {note.toUpperCase()}
        </text>
      )}
    </>
  );
}

export function EngagementTrace({ layout = "wide" }: { layout?: "wide" | "tall" }) {
  const L = LAYOUTS[layout];
  const { discovery: d, prototype: p, build: bu, launch: la, run: r } = L.boxes;
  const cx = bu.x + bu.w / 2;
  const cy = bu.y + bu.h * 0.56;
  // Filter ids are per layout: both layouts are in the page and one is display:none.
  const shadow = `eg-shadow-${layout}`;
  const coreShadow = `eg-core-shadow-${layout}`;
  const spike = r.x + 16 + (r.w - 32) * 0.25;

  return (
    <svg
      viewBox={`0 0 ${L.width} ${L.height}`}
      data-eg-layout={layout}
      className="ill block h-auto w-full overflow-visible"
      role="img"
      aria-label="Five stages of a custom build: Discovery produces a scope and estimate, Prototype produces clickable screens, Build runs in two-week sprints with a preview link after each one, Launch checks the data, training and go-live date, and Run keeps the system monitored and backed up."
    >
      <defs>
        <filter id={shadow} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor={NAVY} floodOpacity="0.09" />
        </filter>
        <filter id={coreShadow} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor={NAVY} floodOpacity="0.28" />
        </filter>
      </defs>

      <g fill="none" stroke={TRACK} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
        {Object.entries(L.traces).map(([k, path]) => (
          <path key={k} d={path} />
        ))}
      </g>
      <g fill="none" stroke={TRACE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {Object.entries(L.traces).map(([k, path]) => (
          <path key={k} d={path} data-eg-trace={k} />
        ))}
      </g>
      {L.terms.map(([x, y]) => (
        <circle key={`${x}-${y}`} data-eg-term cx={x} cy={y} r="5" fill={TRACE} />
      ))}

      {/* 01 Discovery: the scope document */}
      <Card b={d} stage="discovery" shadow={shadow}>
        <Label b={d} n={1} name="Discovery" note="1 to 2 weeks" />
        <text x={d.x + 16} y={d.y + 52} className="svg-sans" fontSize="14" fontWeight="700" fill={NAVY}>
          Scope and estimate
        </text>
        {[150, 124, 92].map((w, i) => (
          <rect key={w} data-eg-doc x={d.x + 16} y={d.y + 66 + i * 11} width={w} height="5" rx="2.5" fill={i === 2 ? "#F3C9D0" : LINE} />
        ))}
      </Card>

      {/* 02 Prototype: clickable screens */}
      <Card b={p} stage="prototype" shadow={shadow}>
        <Label b={p} n={2} name="Prototype" note="1 to 2 weeks" />
        {[0, 1, 2].map((i) => {
          // Three screens fill the card width: 54px each on the wide layout, wider on phones.
          const sw = (p.w - 48) / 3;
          const x = p.x + 16 + i * (sw + 8);
          const y = p.y + 40;
          return (
            <g key={i} data-eg-screen>
              <rect x={x} y={y} width={sw} height="60" rx="6" fill="#F4F6FA" stroke="#C9CEDB" />
              <rect x={x} y={y} width={sw} height="9" rx="4" fill={TRACK} />
              <rect x={x + 7} y={y + 16} width={sw * (i === 1 ? 0.56 : 0.7)} height="4" rx="2" fill="#C9CEDB" />
              <rect x={x + 7} y={y + 24} width={sw * 0.44} height="4" rx="2" fill="#C9CEDB" />
              <rect x={x + 7} y={y + 44} width="22" height="9" rx="4.5" fill={i === 2 ? RED : "#C9CEDB"} />
            </g>
          );
        })}
      </Card>

      {/* 03 Build: the sprint ring */}
      <g data-eg-chip="build">
        <rect x={bu.x} y={bu.y} width={bu.w} height={bu.h} rx="18" fill={NAVY} filter={`url(#${coreShadow})`} />
        <Label b={bu} n={3} name="Build" fill="#8B94AB" />
        <circle cx={cx} cy={cy} r={L.ring} fill="none" stroke="#1F3060" strokeWidth="7" />
        <circle
          data-eg-ring
          cx={cx}
          cy={cy}
          r={L.ring}
          fill="none"
          stroke={RED}
          strokeWidth="7"
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        <text x={cx} y={cy - 8} textAnchor="middle" className="svg-mono" fontSize="9.5" letterSpacing="0.12em" fill="#8B94AB">
          SPRINT
        </text>
        <text data-eg-sprint x={cx} y={cy + 21} textAnchor="middle" className="svg-display" fontSize="28" fontWeight="600" fill="#FFFFFF">
          {SPRINTS}
        </text>
        <g data-eg-preview>
          <circle cx={bu.x + 22} cy={bu.y + bu.h - 19} r="3.5" fill="#34D399" />
          <text x={bu.x + 32} y={bu.y + bu.h - 15.5} className="svg-mono" fontSize="9.5" fill="#A7F3D0">
            preview link updated
          </text>
        </g>
      </g>

      {/* 04 Launch: the go-live checklist */}
      <Card b={la} stage="launch" shadow={shadow}>
        <Label b={la} n={4} name="Launch" note="Go-live" />
        {["Data reconciled", "Team trained", "Go-live date set"].map((t, i) => {
          const y = la.y + 40 + i * 22;
          return (
            <g key={t}>
              <rect x={la.x + 16} y={y} width="13" height="13" rx="3.5" fill="#DEF7EC" stroke="#0E9F6E" strokeWidth="1.2" />
              <path
                data-eg-tick
                d={`M${la.x + 19} ${y + 6.8} l2.8 2.8 l4.8 -5.4`}
                fill="none"
                stroke="#0E9F6E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x={la.x + 37} y={y + 10.5} className="svg-sans" fontSize="12" fontWeight="600" fill="#3B4459">
                {t}
              </text>
            </g>
          );
        })}
      </Card>

      {/* 05 Run: monitored and backed up */}
      <Card b={r} stage="run" shadow={shadow}>
        <Label b={r} n={5} name="Run" note="Ongoing" />
        <circle data-eg-live cx={r.x + 90} cy={r.y + 22.5} r="4" fill="#34D399" />
        <path
          data-eg-beat
          d={`M${r.x + 16} ${r.y + 72} H${spike} L${spike + 10} ${r.y + 52} L${spike + 22} ${r.y + 94} L${spike + 34} ${r.y + 60} L${spike + 42} ${r.y + 72} H${r.x + r.w - 16}`}
          fill="none"
          stroke={RED}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x={r.x + 16} y={r.y + r.h - 10} className="svg-mono" fontSize="9.5" fill={MUTED}>
          backups · restore tested
        </text>
      </Card>

      <circle data-eg-packet cx="0" cy="0" r="6.5" fill={RED} stroke="#FFFFFF" strokeWidth="2.5" opacity="0" />
    </svg>
  );
}

/**
 * Intro timeline for one layout. Every stage starts dimmed and lights up when
 * the packet reaches it. Returns the intro and a looping Run heartbeat.
 */
export function buildEngagementTimeline(root: Element) {
  const q = gsap.utils.selector(root);
  const chip = (k: StageKey) => q(`[data-eg-chip='${k}']`);
  const trace = (k: TraceKey) => q(`[data-eg-trace='${k}']`)[0] as unknown as SVGPathElement;
  const packet = q("[data-eg-packet]");
  const ring = q("[data-eg-ring]");
  const sprint = q("[data-eg-sprint]")[0];
  const preview = q("[data-eg-preview]");
  const terms = q("[data-eg-term]");

  const ride = (k: TraceKey, duration = 0.7) =>
    gsap
      .timeline()
      .set(packet, { autoAlpha: 1 })
      .fromTo(trace(k), { drawSVG: "0%" }, { drawSVG: "100%", duration, ease: "power1.inOut" }, 0)
      .to(
        packet,
        { motionPath: { path: trace(k), align: trace(k), alignOrigin: [0.5, 0.5] }, duration, ease: "power1.inOut", immediateRender: true },
        0,
      );

  const light = (k: StageKey) => gsap.to(chip(k), { autoAlpha: 1, y: 0, duration: 0.5, ease: "dc-out" });

  const tl = gsap.timeline({ defaults: { ease: "dc-out" } });
  tl.set(q("[data-eg-chip]"), { autoAlpha: 0.32, y: 6 })
    .set(q("[data-eg-trace]"), { drawSVG: "0%" })
    .set(terms, { autoAlpha: 0 })
    .set(q("[data-eg-doc]"), { scaleX: 0, transformOrigin: "0% 50%" })
    .set(q("[data-eg-screen]"), { autoAlpha: 0, y: 8 })
    .set(ring, { drawSVG: "0%" })
    .set(preview, { autoAlpha: 0 })
    .set(q("[data-eg-tick]"), { drawSVG: "0%" })
    .set(q("[data-eg-beat]"), { drawSVG: "0%" })
    .set(q("[data-eg-live]"), { autoAlpha: 0 })
    .call(() => sprint && (sprint.textContent = "0"))
    .from(q("[data-eg-chip]"), { autoAlpha: 0, duration: 0.6, stagger: 0.06 })
    // Discovery
    .add(light("discovery"), 0.5)
    .to(q("[data-eg-doc]"), { scaleX: 1, duration: 0.6, stagger: 0.12 }, 0.7)
    .add(ride("discovery"), 1.3)
    .to(terms[0], { autoAlpha: 1, duration: 0.2 }, 1.95)
    // Prototype
    .add(light("prototype"), 2)
    .to(q("[data-eg-screen]"), { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.1 }, 2.1)
    .add(ride("prototype", 0.8), 2.6)
    .to(terms[1], { autoAlpha: 1, duration: 0.2 }, 3.35)
    // Build: the packet goes into the core and the ring fills once per sprint
    .to(packet, { autoAlpha: 0, duration: 0.15 }, 3.4)
    .add(light("build"), 3.4);

  let at = 3.7;
  for (let s = 1; s <= SPRINTS; s++) {
    tl.set(ring, { drawSVG: "0%" }, at)
      .call(() => sprint && (sprint.textContent = String(s)), undefined, at)
      .to(ring, { drawSVG: "100%", duration: 0.85, ease: "power1.inOut" }, at)
      .fromTo(preview, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: "none" }, at + 0.85)
      .to(preview, { autoAlpha: s === SPRINTS ? 1 : 0.35, duration: 0.3, ease: "none" }, at + 1.05);
    at += 1.15;
  }

  tl.add(ride("build", 0.75), at)
    .to(terms[2], { autoAlpha: 1, duration: 0.2 }, at + 0.7)
    // Launch
    .add(light("launch"), at + 0.75)
    .to(q("[data-eg-tick]"), { drawSVG: "100%", duration: 0.35, stagger: 0.18, ease: "dc-inout" }, at + 0.9)
    .add(ride("launch"), at + 1.5)
    .to(terms[3], { autoAlpha: 1, duration: 0.2 }, at + 2.15)
    .to(packet, { autoAlpha: 0, duration: 0.15 }, at + 2.2)
    // Run
    .add(light("run"), at + 2.2)
    .to(q("[data-eg-beat]"), { drawSVG: "100%", duration: 0.9, ease: "power1.inOut" }, at + 2.3)
    .to(q("[data-eg-live]"), { autoAlpha: 1, duration: 0.3 }, at + 2.6);

  // Afterwards the heartbeat keeps running, quietly.
  const beat = gsap
    .timeline({ repeat: -1, repeatDelay: 0.6, paused: true })
    .fromTo(q("[data-eg-beat]"), { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 0.9, ease: "power1.in" })
    .to(q("[data-eg-beat]"), { drawSVG: "100% 100%", duration: 0.7, ease: "power1.out" })
    .to(q("[data-eg-live]"), { scale: 1.6, autoAlpha: 0.4, transformOrigin: "50% 50%", duration: 0.35, yoyo: true, repeat: 1 }, 0.5);

  tl.call(() => {
    beat.play(0);
  });
  return { intro: tl, beat };
}
