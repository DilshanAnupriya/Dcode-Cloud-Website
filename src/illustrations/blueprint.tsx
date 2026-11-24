/**
 * A website being drafted on a blueprint: frame, grid, type blocks and a
 * motion path with its keyframe handles. Drawn in by TwoWays.
 */
export function Blueprint() {
  const line = { fill: "none", stroke: "#B8C3DB", strokeWidth: 1.5, strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 520 380" className="block h-auto w-full" aria-hidden="true">
      {/* browser frame */}
      <rect x="40" y="40" width="440" height="290" rx="14" {...line} data-bp-draw />
      <path d="M40 78 H480" {...line} data-bp-draw />
      {[62, 80, 98].map((cx) => (
        <circle key={cx} cx={cx} cy="59" r="5" {...line} data-bp-draw />
      ))}
      <rect x="150" y="51" width="220" height="16" rx="8" {...line} strokeDasharray="3 5" data-bp-guide />

      {/* column guides */}
      {[88, 160, 232, 304, 376, 448].map((x) => (
        <path key={x} d={`M${x} 92 V316`} stroke="#5F76A8" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="2 6" data-bp-guide />
      ))}

      {/* headline + text blocks */}
      <rect x="72" y="112" width="190" height="18" rx="4" fill="#E2374F" data-bp-block />
      <rect x="72" y="138" width="150" height="18" rx="4" fill="#C6CDDC" data-bp-block />
      <rect x="72" y="172" width="170" height="6" rx="3" fill="#5F76A8" data-bp-block />
      <rect x="72" y="186" width="140" height="6" rx="3" fill="#5F76A8" data-bp-block />
      <rect x="72" y="214" width="84" height="26" rx="13" fill="#E2374F" data-bp-block />

      {/* motion path with keyframes */}
      <path
        id="bp-motion"
        d="M290 280 C300 180 380 250 400 160 S450 120 452 104"
        fill="none"
        stroke="#E2374F"
        strokeWidth="2"
        strokeLinecap="round"
        data-bp-path
      />
      {[
        [290, 280],
        [400, 160],
        [452, 104],
      ].map(([cx, cy]) => (
        <rect key={`${cx}`} x={cx - 4} y={cy - 4} width="8" height="8" fill="#0C1428" stroke="#E2374F" strokeWidth="1.5" transform={`rotate(45 ${cx} ${cy})`} data-bp-key />
      ))}
      <circle r="9" fill="#E2374F" data-bp-dot />

      {/* dimension annotation */}
      <g data-bp-dim>
        <path d="M40 352 H480" stroke="#5F76A8" strokeWidth="1" />
        <path d="M40 346 V358 M480 346 V358" stroke="#5F76A8" strokeWidth="1" />
        <rect x="232" y="344" width="56" height="16" fill="#14213D" />
        <text x="260" y="356" textAnchor="middle" className="svg-mono" fontSize="10" fill="#B8C3DB">
          1320
        </text>
        <path d="M18 40 V330" stroke="#5F76A8" strokeWidth="1" />
        <path d="M12 40 H24 M12 330 H24" stroke="#5F76A8" strokeWidth="1" />
      </g>
    </svg>
  );
}
