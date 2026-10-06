/* Line drawings used beside copy. Plain SVG in the site palette: ink (or
   white on dark bands), lavender fills, a yellow route and a lavender dot
   for "the payment". */

export type ArtName =
  | "globe"
  | "token"
  | "anchor"
  | "pool"
  | "shield"
  | "fanout"
  | "code"
  | "people"
  | "ledger"
  | "bank"
  | "wallet"
  | "grant"
  | "calendar"
  | "compass"
  | "lend";

export function Art({ name, night = false, className = "" }: { name: ArtName; night?: boolean; className?: string }) {
  const ink = night ? "var(--color-fog)" : "var(--color-ink)";
  const soft = night ? "rgba(183,172,232,0.32)" : "var(--color-flare-soft)";
  const faint = night ? "rgba(255,255,255,0.24)" : "rgba(15,15,15,0.18)";
  const sea = "var(--color-sea)";
  const flare = "var(--color-flare)";
  const common = { fill: "none", stroke: ink, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  const drawings: Record<ArtName, React.ReactNode> = {
    globe: (
      <>
        <circle cx="240" cy="180" r="130" fill={soft} stroke={ink} strokeWidth="2" />
        {[-90, -45, 0, 45, 90].map((dx) => (
          <ellipse key={dx} cx="240" cy="180" rx={Math.abs(130 - Math.abs(dx) * 1.2) || 2} ry="130" stroke={faint} strokeWidth="1.5" fill="none" />
        ))}
        {[-80, -40, 0, 40, 80].map((dy) => {
          const half = Math.sqrt(130 * 130 - dy * dy);
          return <line key={dy} x1={240 - half} x2={240 + half} y1={180 + dy} y2={180 + dy} stroke={faint} strokeWidth="1.5" />;
        })}
        <path d="M150 220 C 180 90, 300 70, 340 150" stroke={sea} strokeWidth="3" fill="none" className="route-travel" />
        <path d="M170 120 C 230 160, 290 250, 330 230" stroke={flare} strokeWidth="2.5" fill="none" strokeDasharray="5 7" />
        <circle cx="150" cy="220" r="8" fill={sea} />
        <circle cx="340" cy="150" r="8" fill={flare} />
        <circle cx="170" cy="120" r="5" fill={ink} />
        <circle cx="330" cy="230" r="5" fill={ink} />
        <rect x="300" y="44" width="150" height="54" rx="12" fill={soft} stroke={ink} strokeWidth="2" />
        <text x="316" y="66" fontFamily="var(--font-mono)" fontSize="12" fill={ink} opacity="0.7">settled</text>
        <text x="316" y="86" fontFamily="var(--font-mono)" fontSize="14" fill={ink}>1 block later</text>
        <rect x="30" y="268" width="150" height="54" rx="12" fill={soft} stroke={ink} strokeWidth="2" />
        <text x="46" y="290" fontFamily="var(--font-mono)" fontSize="12" fill={ink} opacity="0.7">sent</text>
        <text x="46" y="310" fontFamily="var(--font-mono)" fontSize="14" fill={ink}>USDG 250.00</text>
      </>
    ),
    token: (
      <>
        <rect x="50" y="70" width="200" height="230" rx="10" {...common} fill={soft} />
        <line x1="78" y1="110" x2="200" y2="110" {...common} />
        <line x1="78" y1="140" x2="220" y2="140" stroke={faint} strokeWidth="2" />
        <line x1="78" y1="164" x2="210" y2="164" stroke={faint} strokeWidth="2" />
        <line x1="78" y1="188" x2="190" y2="188" stroke={faint} strokeWidth="2" />
        <circle cx="200" cy="248" r="22" stroke={flare} strokeWidth="2.5" fill="none" />
        <path d="M250 185 H 300" stroke={sea} strokeWidth="3" className="route-travel" />
        <path d="M292 175 L304 185 L292 195" stroke={sea} strokeWidth="3" fill="none" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <ellipse cx="380" cy={250 - i * 40} rx="62" ry="20" {...common} fill={soft} />
            <path d={`M318 ${250 - i * 40} v 18 a 62 20 0 0 0 124 0 v -18`} fill="none" stroke={ink} strokeWidth="2" />
          </g>
        ))}
        <ellipse cx="380" cy="170" rx="62" ry="20" fill={sea} opacity="0.18" />
        <text x="352" y="175" fontFamily="var(--font-mono)" fontSize="13" fill={ink}>
          1 / 1000
        </text>
      </>
    ),
    anchor: (
      <>
        <path d="M60 140 L140 95 L220 140 Z" {...common} fill={soft} />
        {[80, 112, 144, 176].map((x) => (
          <line key={x} x1={x + 6} y1="150" x2={x + 6} y2="230" {...common} />
        ))}
        <line x1="60" y1="240" x2="220" y2="240" {...common} />
        <text x="96" y="272" fontFamily="var(--font-mono)" fontSize="13" fill={ink} opacity="0.7">
          bank / cash
        </text>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={300 + i * 42} y={150 + (i % 2) * 14} width="36" height="36" rx="6" fill={i === 1 ? sea : soft} stroke={ink} strokeWidth="2" opacity={i === 1 ? 0.9 : 1} />
        ))}
        <text x="318" y="230" fontFamily="var(--font-mono)" fontSize="13" fill={ink} opacity="0.7">
          on-chain
        </text>
        <path d="M228 165 C 250 140, 272 140, 292 160" stroke={sea} strokeWidth="3" fill="none" className="route-travel" />
        <path d="M292 200 C 272 222, 250 222, 228 200" stroke={flare} strokeWidth="3" fill="none" strokeDasharray="5 7" />
        <circle cx="260" cy="110" r="22" {...common} fill={soft} />
        <path d="M260 96 v 26 M250 116 a 10 10 0 0 0 20 0" {...common} />
      </>
    ),
    pool: (
      <>
        <line x1="70" y1="300" x2="420" y2="300" {...common} />
        <line x1="70" y1="300" x2="70" y2="50" {...common} />
        <path d="M90 60 C 120 220, 220 270, 410 285" stroke={sea} strokeWidth="3.5" fill="none" />
        <circle cx="168" cy="210" r="8" fill={flare} />
        <circle cx="262" cy="258" r="8" fill={ink} />
        <path d="M168 210 L 262 258" stroke={flare} strokeWidth="2" strokeDasharray="4 6" />
        <text x="300" y="120" fontFamily="var(--font-mono)" fontSize="16" fill={ink}>
          x · y = k
        </text>
        <text x="90" y="328" fontFamily="var(--font-mono)" fontSize="12" fill={ink} opacity="0.6">
          reserve A
        </text>
        <text x="20" y="60" fontFamily="var(--font-mono)" fontSize="12" fill={ink} opacity="0.6">
          B
        </text>
      </>
    ),
    shield: (
      <>
        <path d="M240 40 L360 85 V170 C360 245 305 295 240 320 C175 295 120 245 120 170 V85 Z" {...common} fill={soft} />
        <circle cx="240" cy="160" r="26" {...common} />
        <path d="M240 186 V 230" {...common} strokeWidth="6" />
        <path d="M60 120 H 110 M60 160 H 100 M60 200 H 110" stroke={faint} strokeWidth="2" />
        <path d="M370 120 H 420 M380 160 H 420 M370 200 H 420" stroke={sea} strokeWidth="2.5" strokeDasharray="4 6" />
        <circle cx="240" cy="160" r="6" fill={flare} />
      </>
    ),
    fanout: (
      <>
        <rect x="40" y="150" width="90" height="60" rx="10" {...common} fill={soft} />
        <text x="56" y="186" fontFamily="var(--font-mono)" fontSize="13" fill={ink}>
          1 batch
        </text>
        {Array.from({ length: 7 }).map((_, i) => {
          const y = 50 + i * 43;
          return (
            <g key={i}>
              <path d={`M130 180 C 220 180, 250 ${y}, 340 ${y}`} stroke={i === 3 ? flare : sea} strokeWidth="2" fill="none" opacity={i === 3 ? 1 : 0.7} />
              <circle cx="360" cy={y} r="13" {...common} fill={soft} />
              <circle cx="360" cy={y - 3} r="4" fill={ink} />
            </g>
          );
        })}
        <text x="390" y="185" fontFamily="var(--font-mono)" fontSize="13" fill={ink} opacity="0.7">
          many
        </text>
      </>
    ),
    code: (
      <>
        <rect x="40" y="50" width="400" height="260" rx="14" {...common} fill={soft} />
        <line x1="40" y1="88" x2="440" y2="88" {...common} />
        <circle cx="64" cy="69" r="5" fill={flare} />
        <circle cx="82" cy="69" r="5" fill={faint} />
        <circle cx="100" cy="69" r="5" fill={faint} />
        {[
          [70, 120, 160, ink],
          [94, 148, 200, sea],
          [94, 176, 140, faint],
          [118, 204, 180, faint],
          [94, 232, 120, sea],
          [70, 260, 60, ink],
        ].map(([x, y, w, c], i) => (
          <line key={i} x1={x as number} y1={y as number} x2={(x as number) + (w as number)} y2={y as number} stroke={c as string} strokeWidth="6" strokeLinecap="round" />
        ))}
        <path d="M330 160 l-22 22 l22 22 M370 160 l22 22 l-22 22" stroke={sea} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    people: (
      <>
        {[
          [120, 110],
          [240, 70],
          [360, 120],
          [170, 250],
          [320, 260],
          [240, 175],
        ].map(([x, y], i, all) => (
          <g key={i}>
            {all.slice(i + 1).map(([x2, y2], j) => (
              <line key={j} x1={x} y1={y} x2={x2} y2={y2} stroke={faint} strokeWidth="1.5" />
            ))}
          </g>
        ))}
        {[
          [120, 110],
          [240, 70],
          [360, 120],
          [170, 250],
          [320, 260],
          [240, 175],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={i === 5 ? 30 : 22} fill={i === 5 ? sea : soft} stroke={ink} strokeWidth="2" />
            <circle cx={x} cy={y - 5} r="6" fill={i === 5 ? "#fff" : ink} />
            <path d={`M${x - 10} ${y + 12} a 10 8 0 0 1 20 0`} stroke={i === 5 ? "#fff" : ink} strokeWidth="2" fill="none" />
          </g>
        ))}
        <circle cx="360" cy="120" r="6" fill={flare} transform="translate(16 -16)" />
      </>
    ),
    ledger: (
      <>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={40 + i * 104} y="130" width="84" height="100" rx="10" fill={i === 3 ? sea : soft} stroke={ink} strokeWidth="2" opacity={i === 3 ? 0.95 : 1} />
            <line x1={54 + i * 104} y1="158" x2={110 + i * 104} y2="158" stroke={i === 3 ? "#fff" : ink} strokeWidth="2" />
            <line x1={54 + i * 104} y1="180" x2={98 + i * 104} y2="180" stroke={i === 3 ? "#fff" : faint} strokeWidth="2" />
            <line x1={54 + i * 104} y1="200" x2={104 + i * 104} y2="200" stroke={i === 3 ? "#fff" : faint} strokeWidth="2" />
            {i < 3 ? <line x1={124 + i * 104} y1="180" x2={144 + i * 104} y2="180" {...common} /> : null}
          </g>
        ))}
        <circle cx="394" cy="110" r="8" fill={flare} />
        <text x="40" y="270" fontFamily="var(--font-mono)" fontSize="13" fill={ink} opacity="0.7">
          each block links to the last
        </text>
      </>
    ),
    bank: (
      <>
        <path d="M80 130 L240 60 L400 130 Z" {...common} fill={soft} />
        {[110, 170, 230, 290, 350].map((x) => (
          <rect key={x} x={x} y="145" width="22" height="120" rx="3" {...common} fill={soft} />
        ))}
        <rect x="70" y="270" width="340" height="22" rx="4" {...common} fill={soft} />
        <circle cx="240" cy="104" r="12" fill={flare} />
        <path d="M40 310 H 440" stroke={sea} strokeWidth="3" className="route-travel" />
      </>
    ),
    wallet: (
      <>
        <rect x="90" y="90" width="300" height="200" rx="22" {...common} fill={soft} />
        <path d="M90 140 H 390" stroke={faint} strokeWidth="2" />
        <rect x="300" y="170" width="110" height="60" rx="14" {...common} fill={soft} />
        <circle cx="335" cy="200" r="9" fill={flare} />
        <path d="M120 110 L300 60 L330 110" {...common} />
        <text x="120" y="250" fontFamily="var(--font-mono)" fontSize="15" fill={ink}>
          0x7a…c41e
        </text>
        <path d="M40 330 C 140 300, 340 300, 440 330" stroke={sea} strokeWidth="3" fill="none" className="route-travel" />
      </>
    ),
    grant: (
      <>
        <path d="M240 300 V 170" {...common} strokeWidth="3" />
        <path d="M240 210 C 200 200, 170 170, 168 128 C 210 132, 236 160, 240 200" fill={sea} opacity="0.9" stroke={ink} strokeWidth="2" />
        <path d="M240 180 C 280 172, 312 140, 316 96 C 272 100, 246 132, 240 172" {...common} fill={soft} />
        <ellipse cx="240" cy="304" rx="110" ry="18" {...common} fill={soft} />
        <circle cx="316" cy="96" r="8" fill={flare} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={120 + i * 22} cy={110 - i * 18} r="12" fill="none" stroke={faint} strokeWidth="2" />
        ))}
      </>
    ),
    calendar: (
      <>
        <rect x="90" y="70" width="300" height="240" rx="16" {...common} fill={soft} />
        <line x1="90" y1="120" x2="390" y2="120" {...common} />
        <line x1="150" y1="50" x2="150" y2="90" {...common} strokeWidth="4" />
        <line x1="330" y1="50" x2="330" y2="90" {...common} strokeWidth="4" />
        {Array.from({ length: 15 }).map((_, i) => (
          <rect
            key={i}
            x={112 + (i % 5) * 54}
            y={140 + Math.floor(i / 5) * 52}
            width="40"
            height="36"
            rx="6"
            fill={i === 7 ? sea : "none"}
            stroke={i === 7 ? sea : faint}
            strokeWidth="2"
          />
        ))}
        <circle cx="132" cy="262" r="6" fill={flare} />
      </>
    ),
    compass: (
      <>
        <circle cx="240" cy="180" r="120" {...common} fill={soft} />
        <circle cx="240" cy="180" r="92" fill="none" stroke={faint} strokeWidth="2" strokeDasharray="3 8" />
        <path d="M240 90 L262 180 L240 270 L218 180 Z" fill="none" stroke={ink} strokeWidth="2" />
        <path d="M240 90 L262 180 L218 180 Z" fill={flare} />
        <circle cx="240" cy="180" r="8" fill={sea} />
        {["N", "E", "S", "W"].map((d, i) => (
          <text key={d} x={240 + [0, 106, 0, -114][i]} y={180 + [-100, 5, 114, 5][i]} fontFamily="var(--font-mono)" fontSize="14" fill={ink} textAnchor="middle">
            {d}
          </text>
        ))}
      </>
    ),
    lend: (
      <>
        <rect x="50" y="110" width="150" height="150" rx="16" {...common} fill={soft} />
        <text x="72" y="150" fontFamily="var(--font-mono)" fontSize="13" fill={ink} opacity="0.7">
          supplied
        </text>
        <rect x="72" y="170" width="106" height="66" rx="8" fill={sea} opacity="0.85" />
        <rect x="280" y="150" width="150" height="110" rx="16" {...common} fill={soft} />
        <text x="302" y="190" fontFamily="var(--font-mono)" fontSize="13" fill={ink} opacity="0.7">
          borrowed
        </text>
        <rect x="302" y="206" width="70" height="34" rx="8" fill={flare} opacity="0.85" />
        <path d="M205 185 H 272" stroke={ink} strokeWidth="2.5" strokeDasharray="5 7" />
        <path d="M262 175 L274 185 L262 195" {...common} />
        <text x="196" y="96" fontFamily="var(--font-mono)" fontSize="13" fill={ink}>
          health 1.82
        </text>
      </>
    ),
  };

  return (
    <svg viewBox="0 0 480 360" className={`h-auto w-full ${className}`} role="img" aria-hidden="true">
      {drawings[name]}
    </svg>
  );
}
