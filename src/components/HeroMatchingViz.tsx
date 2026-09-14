/* ─── hero matching viz ─── */
const LEFT_SKILLS = [
  { name: "API Testing", level: "Advanced", full: true },
  { name: "Playwright", level: "Advanced", full: true },
  { name: "SQL", level: "Intermediate", full: true },
  { name: "TypeScript", level: "Intermediate", full: true },
  { name: "CI / CD", level: "Intermediate", full: false },
] as const;

const RIGHT_REQS = [
  { name: "Playwright / E2E", weight: "Critical" },
  { name: "API Testing", weight: "Required" },
  { name: "SQL", weight: "Required" },
  { name: "TypeScript", weight: "Required" },
  { name: "CI/CD (Advanced)", weight: "Preferred" },
  { name: "Performance", weight: "Preferred" },
] as const;

/* y-centers of the 5 data rows inside each foreignObject panel */
const ROW_YS = [118, 144, 170, 196, 222] as const;

/* [rowIndex, animationBegin] — one dot per path, staggered */
const L_DOTS: [number, string][] = [
  [0, "0s"],
  [1, "0.6s"],
  [2, "1.2s"],
  [3, "1.8s"],
  [4, "2.4s"],
];
const R_DOTS: [number, string][] = [
  [0, "0.3s"],
  [1, "0.9s"],
  [2, "1.5s"],
  [3, "2.1s"],
  [4, "2.7s"],
];

function TalentPanel() {
  return (
    <div className="flex h-full flex-col rounded-[14px] border border-white/[0.09] bg-white/[0.05] p-4 text-white">
      <div className="mb-1.5 text-[8.5px] font-bold uppercase tracking-[3px] text-brand-300">
        Candidate
      </div>
      <div className="mb-3.5 text-[18px] font-extrabold tracking-[-0.02em] leading-[1.05]">
        Talent DNA
      </div>

      <div className="mb-3 flex items-center gap-2.5">
        <div className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-700 text-[11px] font-bold text-white">
          SA
        </div>
        <div>
          <div className="text-[12px] font-bold leading-tight">Sarah Al-Rashid</div>
          <div className="text-[10px] text-white/40">QA Engineer</div>
        </div>
      </div>

      <div className="mb-2.5 h-px bg-white/[0.08]" />
      <div className="mb-2 text-[8.5px] font-bold uppercase tracking-[2px] text-white/28">
        Skills &amp; Evidence
      </div>

      {LEFT_SKILLS.map(({ name, level, full }) => (
        <div key={name} className="mb-1.5 flex items-center gap-2">
          <div
            className={`size-1.5 shrink-0 rounded-full ${full ? "bg-brand-500" : "bg-brand-400"}`}
          />
          <span className="min-w-0 flex-1 text-[11px] font-semibold leading-tight text-white/85">
            {name}
          </span>
          <span
            className={`min-w-[82px] rounded-[5px] px-2 py-0.5 text-center text-[8px] font-bold whitespace-nowrap ${
              full
                ? "border border-brand-500/35 bg-brand-500/25 text-brand-100"
                : "border border-brand-400/25 bg-brand-400/18 text-[#9a95ec]"
            }`}
          >
            {level}
          </span>
        </div>
      ))}

      <div className="my-2 h-px bg-white/[0.08]" />

      <div className="flex flex-wrap gap-1.5">
        {(["Assessment", "Interview", "Work Sample"] as const).map((label) => (
          <div
            key={label}
            className="flex items-center gap-1 rounded-md border border-brand-500/28 bg-brand-500/15 px-1.5 py-0.5"
          >
            <span className="text-[8px] font-bold text-brand-500">✓</span>
            <span className="text-[9px] font-semibold text-brand-200">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function JobPanel() {
  return (
    <div className="flex h-full flex-col rounded-[14px] border border-white/[0.09] bg-white/[0.05] p-4 text-white">
      <div className="mb-1.5 text-[8.5px] font-bold uppercase tracking-[3px] text-brand-300">
        Role
      </div>
      <div className="mb-3.5 text-[18px] font-extrabold tracking-[-0.02em] leading-[1.05]">
        Job DNA
      </div>

      <div className="mb-3">
        <div className="text-[12.5px] font-bold leading-snug">Senior QA Engineer</div>
        <div className="mt-0.5 text-[10px] text-white/40">STC · Riyadh, Saudi Arabia</div>
      </div>

      <div className="mb-2.5 h-px bg-white/[0.08]" />
      <div className="mb-2 text-[8.5px] font-bold uppercase tracking-[2px] text-white/28">
        Requirements
      </div>

      {RIGHT_REQS.map(({ name, weight }) => (
        <div key={name} className="mb-1.5 flex items-center gap-2">
          <div
            className={`size-1.5 shrink-0 ${
              weight === "Critical" ? "rounded-full bg-brand-500" : "rounded-[2px]"
            } ${
              weight === "Required"
                ? "bg-brand-400"
                : weight === "Preferred"
                  ? "bg-brand-700"
                  : ""
            }`}
          />
          <span className="min-w-0 flex-1 text-[11px] font-semibold leading-tight text-white/85">
            {name}
          </span>
          <span
            className={`rounded px-1.5 py-0.5 text-[8.5px] font-semibold ${
              weight === "Critical"
                ? "bg-brand-500/25 text-brand-200"
                : weight === "Required"
                  ? "bg-brand-500/15 text-brand-300"
                  : "text-brand-300/45"
            }`}
          >
            {weight}
          </span>
        </div>
      ))}

      <div className="my-2 h-px bg-white/[0.08]" />
      <div className="text-[9px] text-white/28">Min. Readiness Threshold: 75%</div>
    </div>
  );
}

function EnginePanel({ compact = false }: { compact?: boolean }) {
  const size = compact ? 200 : 220;
  const r = compact ? 72 : 88;
  const circ = 2 * Math.PI * r;
  const progress = 0.82;
  const offset = circ * (1 - progress);

  return (
    <div className="flex flex-col items-center py-2">
      <div className="mb-3 text-center text-[14px] font-bold text-white/90">
        HireFit Matching Engine
      </div>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="absolute inset-0" aria-hidden>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r + 18}
            fill="none"
            stroke="rgba(79,70,229,0.06)"
            strokeWidth="1"
          />
          <circle cx={size / 2} cy={size / 2} r={r + 10} fill="#181548" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r + 10}
            fill="none"
            stroke="rgba(139,133,239,0.22)"
            strokeWidth="1.5"
          />
          <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="10"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="#4f46e5"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
            />
          </g>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[40px] font-extrabold leading-none text-white">82%</div>
          <div className="mt-1 text-[10px] font-bold tracking-[2px] text-brand-300/75">
            ROLE READINESS
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="rounded-full bg-[rgba(46,125,50,0.3)] px-3 py-1 text-[8.5px] font-bold text-[#6fcf97]">
          Strong Role Match
        </span>
        <span className="rounded-full bg-[rgba(179,114,26,0.3)] px-3 py-1 text-[8.5px] font-bold text-[#d49a50]">
          1 Missing Skill
        </span>
        <span className="rounded-full bg-brand-500/28 px-3 py-1 text-[8.5px] font-bold text-brand-200">
          High Evidence Confidence
        </span>
      </div>
    </div>
  );
}

function DesktopSvgViz() {
  const SCORE_CIRC = 552.92; /* 2π × 88 */

  const panelStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    padding: "16px 14px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    color: "white",
  };
  const sectionEyebrow: React.CSSProperties = {
    fontSize: 8.5,
    fontWeight: 700,
    letterSpacing: "3px",
    color: "#8b85ef",
    textTransform: "uppercase",
    marginBottom: 5,
  };
  const sectionTitle: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 800,
    color: "white",
    letterSpacing: "-0.02em",
    lineHeight: 1.05,
    marginBottom: 14,
  };
  const divider: React.CSSProperties = {
    height: 1,
    background: "rgba(255,255,255,0.08)",
    marginBottom: 10,
  };
  const subLabel: React.CSSProperties = {
    fontSize: 8.5,
    fontWeight: 700,
    letterSpacing: "2px",
    color: "rgba(255,255,255,0.28)",
    textTransform: "uppercase",
    marginBottom: 8,
  };

  return (
    <svg viewBox="0 0 1000 410" className="h-auto w-full" aria-hidden style={{ overflow: "visible" }}>
      <defs>
        {ROW_YS.map((y, i) => (
          <path key={i} id={`lp${i}`} d={`M 283 ${y} Q 365 ${y} 390 218`} />
        ))}
        {ROW_YS.map((y, i) => (
          <path key={i + 5} id={`rp${i}`} d={`M 717 ${y} Q 635 ${y} 610 218`} />
        ))}
      </defs>

      <rect
        x="2"
        y="2"
        width="279"
        height="366"
        rx="14"
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.09)"
        strokeWidth="1"
      />
      <rect
        x="719"
        y="2"
        width="279"
        height="366"
        rx="14"
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.09)"
        strokeWidth="1"
      />

      {ROW_YS.map((_, i) => (
        <use
          key={`gl${i}`}
          href={`#lp${i}`}
          fill="none"
          stroke="rgba(79,70,229,0.2)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      ))}
      {ROW_YS.map((_, i) => (
        <use
          key={`gr${i}`}
          href={`#rp${i}`}
          fill="none"
          stroke="rgba(79,70,229,0.2)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      ))}

      <circle cx="500" cy="218" r="126" fill="none" stroke="rgba(79,70,229,0.06)" strokeWidth="1" />

      <text
        x="500"
        y="82"
        fill="rgba(255,255,255,0.9)"
        fontSize="14"
        fontWeight="700"
        textAnchor="middle"
        fontFamily="Plus Jakarta Sans, sans-serif"
      >
        HireFit Matching Engine
      </text>
      <line x1="440" y1="92" x2="560" y2="92" stroke="rgba(139,133,239,0.2)" strokeWidth="1" />

      <circle cx="500" cy="218" r="110" fill="#181548" />
      <circle
        cx="500"
        cy="218"
        r="110"
        fill="none"
        stroke="rgba(139,133,239,0.22)"
        strokeWidth="1.5"
      />

      <circle cx="500" cy="218" r="88" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
      <circle
        cx="500"
        cy="218"
        r="88"
        fill="none"
        stroke="#4f46e5"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={String(SCORE_CIRC)}
        transform="rotate(-90 500 218)"
        style={{ animation: "hero-score-ring 7s ease-in-out infinite" }}
      />

      <text
        x="500"
        y="233"
        fill="white"
        fontSize="44"
        fontWeight="800"
        textAnchor="middle"
        fontFamily="Plus Jakarta Sans, sans-serif"
        style={{ animation: "hero-score-text 7s ease-in-out infinite" }}
      >
        82%
      </text>
      <text
        x="500"
        y="251"
        fill="rgba(139,133,239,0.75)"
        fontSize="10"
        fontWeight="700"
        textAnchor="middle"
        letterSpacing="2"
        fontFamily="Plus Jakarta Sans, sans-serif"
        style={{ animation: "hero-score-text 7s ease-in-out infinite" }}
      >
        ROLE READINESS
      </text>

      <g style={{ animation: "hero-out1 7s ease-in-out infinite" }}>
        <rect x="405" y="344" width="96" height="22" rx="11" fill="rgba(46,125,50,0.3)" />
        <text
          x="453"
          y="359"
          fill="#6fcf97"
          fontSize="8.5"
          fontWeight="700"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          Strong Role Match
        </text>
      </g>
      <g style={{ animation: "hero-out2 7s ease-in-out infinite" }}>
        <rect x="509" y="344" width="86" height="22" rx="11" fill="rgba(179,114,26,0.3)" />
        <text
          x="552"
          y="359"
          fill="#d49a50"
          fontSize="8.5"
          fontWeight="700"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          1 Missing Skill
        </text>
      </g>
      <g style={{ animation: "hero-out3 7s ease-in-out infinite" }}>
        <rect x="430" y="372" width="140" height="22" rx="11" fill="rgba(79,70,229,0.28)" />
        <text
          x="500"
          y="387"
          fill="#aea0f3"
          fontSize="8.5"
          fontWeight="700"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          High Evidence Confidence
        </text>
      </g>

      {L_DOTS.map(([row, begin], i) => (
        <circle key={`ld${i}`} r="3.5" fill="#4f46e5" opacity="0.9">
          <animateMotion dur="2.5s" repeatCount="indefinite" begin={begin}>
            <mpath href={`#lp${row}`} />
          </animateMotion>
        </circle>
      ))}
      {R_DOTS.map(([row, begin], i) => (
        <circle key={`rd${i}`} r="3.5" fill="#726bea" opacity="0.9">
          <animateMotion dur="2.5s" repeatCount="indefinite" begin={begin}>
            <mpath href={`#rp${row}`} />
          </animateMotion>
        </circle>
      ))}

      <foreignObject x="2" y="2" width="279" height="366">
        <div style={panelStyle}>
          <div style={sectionEyebrow}>Candidate</div>
          <div style={sectionTitle}>Talent DNA</div>

          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#3832a3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: "white",
                flexShrink: 0,
              }}
            >
              SA
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>Sarah Al-Rashid</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>QA Engineer</div>
            </div>
          </div>

          <div style={divider} />
          <div style={subLabel}>Skills &amp; Evidence</div>

          {LEFT_SKILLS.map(({ name, level, full }) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: full ? "#4f46e5" : "#726bea",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  flex: 1,
                  fontSize: 11,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.2,
                }}
              >
                {name}
              </span>
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  color: full ? "#c8c6f7" : "#9a95ec",
                  background: full ? "rgba(79,70,229,0.25)" : "rgba(114,107,234,0.18)",
                  border: `1px solid ${full ? "rgba(79,70,229,0.35)" : "rgba(114,107,234,0.25)"}`,
                  padding: "2px 8px",
                  borderRadius: 5,
                  whiteSpace: "nowrap" as const,
                  minWidth: 82,
                  textAlign: "center" as const,
                }}
              >
                {level}
              </span>
            </div>
          ))}

          <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "8px 0" }} />

          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {(["Assessment", "Interview", "Work Sample"] as const).map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  background: "rgba(79,70,229,0.15)",
                  border: "1px solid rgba(79,70,229,0.28)",
                  borderRadius: 6,
                  padding: "3px 7px",
                }}
              >
                <span style={{ fontSize: 8, fontWeight: 700, color: "#4f46e5" }}>✓</span>
                <span style={{ fontSize: 9, fontWeight: 600, color: "#aea0f3" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </foreignObject>

      <foreignObject x="719" y="2" width="279" height="366">
        <div style={panelStyle}>
          <div style={sectionEyebrow}>Role</div>
          <div style={sectionTitle}>Job DNA</div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, lineHeight: 1.3 }}>Senior QA Engineer</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
              STC · Riyadh, Saudi Arabia
            </div>
          </div>

          <div style={divider} />
          <div style={subLabel}>Requirements</div>

          {RIGHT_REQS.map(({ name, weight }) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: weight === "Critical" ? "50%" : 2,
                  background:
                    weight === "Critical" ? "#4f46e5" : weight === "Required" ? "#726bea" : "#3832a3",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  flex: 1,
                  fontSize: 11,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.2,
                }}
              >
                {name}
              </span>
              <span
                style={{
                  fontSize: 8.5,
                  fontWeight: 600,
                  color:
                    weight === "Critical"
                      ? "#aea0f3"
                      : weight === "Required"
                        ? "#8b85ef"
                        : "rgba(139,133,239,0.45)",
                  background:
                    weight === "Critical"
                      ? "rgba(79,70,229,0.25)"
                      : weight === "Required"
                        ? "rgba(79,70,229,0.15)"
                        : "transparent",
                  padding: "1.5px 5px",
                  borderRadius: 4,
                }}
              >
                {weight}
              </span>
            </div>
          ))}

          <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "8px 0" }} />
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)" }}>
            Min. Readiness Threshold: 75%
          </div>
        </div>
      </foreignObject>
    </svg>
  );
}

export default function HeroMatchingViz() {
  return (
    <div className="relative mx-auto w-full max-w-[1000px]">
      {/* Mobile / tablet: vertical stack */}
      <div className="flex flex-col gap-5 lg:hidden">
        <TalentPanel />
        <EnginePanel compact />
        <JobPanel />
      </div>

      {/* Desktop: original horizontal SVG */}
      <div className="hidden lg:block">
        <DesktopSvgViz />
      </div>
    </div>
  );
}
