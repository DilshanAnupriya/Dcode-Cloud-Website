/** Three product chips plugged into one platform base. Animated by TwoWays. */
export function ProductsStack() {
  const chips = [
    { x: 28, y: 92, label: "PAYFLOW", title: "Payroll", live: true },
    { x: 190, y: 44, label: "CRM", title: "Sales", live: false },
    { x: 352, y: 120, label: "PROCUREMENT", title: "Purchasing", live: false },
  ];
  return (
    <svg viewBox="0 0 520 380" className="ill block h-auto w-full" aria-hidden="true">
      <defs>
        <filter id="ps-shadow" x="-20%" y="-20%" width="140%" height="170%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#14213D" floodOpacity="0.1" />
        </filter>
      </defs>
      {/* traces from each chip down to the base */}
      <g fill="none" strokeLinecap="round">
        {chips.map((c) => (
          <g key={c.label}>
            <path d={`M${c.x + 70} ${c.y + 112} V300`} stroke="#DCE2EF" strokeWidth="10" data-ps-track />
            <path d={`M${c.x + 70} ${c.y + 112} V300`} stroke="#25376A" strokeWidth="3" data-ps-trace />
          </g>
        ))}
      </g>

      {chips.map((c, i) => (
        <g key={c.label} data-ps-chip>
          <rect x={c.x} y={c.y} width="140" height="112" rx="14" fill="#fff" stroke="#E1E4EC" filter="url(#ps-shadow)" />
          <text x={c.x + 16} y={c.y + 26} className="svg-mono" fontSize="10" fill="#646D82">
            {c.label}
          </text>
          <circle cx={c.x + 124} cy={c.y + 22} r="4.5" fill={c.live ? "#0E9F6E" : "#D97706"} />
          <text x={c.x + 16} y={c.y + 54} className="svg-display" fontSize="17" fill="#14213D">
            {c.title}
          </text>
          {i === 0 && (
            <g>
              <rect x={c.x + 16} y={c.y + 70} width="108" height="6" rx="3" fill="#EAEEF5" />
              <rect x={c.x + 16} y={c.y + 70} width="92" height="6" rx="3" fill="#C8102E" data-ps-bar />
              <text x={c.x + 16} y={c.y + 96} className="svg-mono" fontSize="10.5" fill="#3B4459">
                6 / 7 · finalized
              </text>
            </g>
          )}
          {i === 1 &&
            [3, 2, 2, 1].map((n, col) =>
              Array.from({ length: n }).map((_, k) => (
                <rect
                  key={`${col}-${k}`}
                  x={c.x + 16 + col * 28}
                  y={c.y + 92 - k * 9}
                  width="22"
                  height="6"
                  rx="3"
                  fill={col === 3 ? "#0E9F6E" : "#B8C3DB"}
                />
              )),
            )}
          {i === 2 && (
            <g>
              {[0, 1, 2].map((k) => (
                <rect key={k} x={c.x + 16 + k * 26} y={c.y + 72} width="20" height="26" rx="4" fill="#F4F6FA" stroke="#C9CEDB" />
              ))}
              <circle cx={c.x + 112} cy={c.y + 85} r="10" fill="#DEF7EC" />
              <path
                d={`M${c.x + 107.5} ${c.y + 85} l3 3 l5.5 -6.5`}
                fill="none"
                stroke="#0E9F6E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )}
        </g>
      ))}

      {/* platform base */}
      <g data-ps-base>
        <rect x="20" y="300" width="480" height="58" rx="16" fill="#14213D" />
        <text x="44" y="334" className="svg-mono" fontSize="11" fill="#B8C3DB">
          DCODE PLATFORM
        </text>
        <text x="476" y="334" textAnchor="end" className="svg-sans" fontSize="12.5" fontWeight="600" fill="#C6CDDC">
          one sign-in · roles · audit
        </text>
      </g>
      {chips.map((c) => (
        <g key={c.label} data-ps-term>
          <circle cx={c.x + 70} cy="300" r="7.5" fill="#14213D" />
          <circle cx={c.x + 70} cy="300" r="4.5" fill="#E2374F" />
        </g>
      ))}
    </svg>
  );
}
