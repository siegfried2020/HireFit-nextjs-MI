/* ─── hero matching viz ─── */
const LEFT_SKILLS = [
    { name: "API Testing",  level: "Advanced",     ev: 4, full: true  },
    { name: "Playwright",   level: "Advanced",     ev: 3, full: true  },
    { name: "SQL",          level: "Intermediate", ev: 2, full: true  },
    { name: "TypeScript",   level: "Intermediate", ev: 2, full: true  },
    { name: "CI / CD",      level: "Intermediate", ev: 1, full: false },
  ] as const;
  
  const RIGHT_REQS = [
    { name: "Playwright / E2E",  weight: "Critical" },
    { name: "API Testing",       weight: "Required"  },
    { name: "SQL",               weight: "Required"  },
    { name: "TypeScript",        weight: "Required"  },
    { name: "CI/CD (Advanced)",  weight: "Preferred" },
    { name: "Performance",       weight: "Preferred" },
  ] as const;
  
  /* y-centers of the 5 data rows inside each foreignObject panel */
  const ROW_YS = [118, 144, 170, 196, 222] as const;
  
  /* [rowIndex, animationBegin] — one dot per path, staggered */
  const L_DOTS: [number, string][] = [
    [0,"0s"],[1,"0.6s"],[2,"1.2s"],[3,"1.8s"],[4,"2.4s"],
  ];
  const R_DOTS: [number, string][] = [
    [0,"0.3s"],[1,"0.9s"],[2,"1.5s"],[3,"2.1s"],[4,"2.7s"],
  ];



export default function HeroMatchingViz() {
    const SCORE_CIRC = 552.92; /* 2π × 88 */
  
    const panelStyle: React.CSSProperties = {
      width: "100%", height: "100%",
      padding: "16px 14px",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      boxSizing: "border-box",
      display: "flex", flexDirection: "column",
      color: "white",
    };
    const sectionEyebrow: React.CSSProperties = {
      fontSize: 8.5, fontWeight: 700, letterSpacing: "3px", color: "#8b85ef",
      textTransform: "uppercase", marginBottom: 5,
    };
    const sectionTitle: React.CSSProperties = {
      fontSize: 18, fontWeight: 800, color: "white", letterSpacing: "-0.02em",
      lineHeight: 1.05, marginBottom: 14,
    };
    const divider: React.CSSProperties = {
      height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 10,
    };
    const subLabel: React.CSSProperties = {
      fontSize: 8.5, fontWeight: 700, letterSpacing: "2px",
      color: "rgba(255,255,255,0.28)", textTransform: "uppercase", marginBottom: 8,
    };
  
    return (
      <div className="relative mx-auto w-full max-w-[1000px]">
        <svg viewBox="0 0 1000 410" className="w-full h-auto" aria-hidden style={{ overflow: "visible" }}>
          <defs>
            {/* paths: left panel edge → engine left edge (cx=500,cy=218,r=110 → left x=390) */}
            {ROW_YS.map((y, i) => (
              <path key={i} id={`lp${i}`}
                d={`M 283 ${y} Q 365 ${y} 390 218`} />
            ))}
            {/* paths: right panel edge → engine right edge (x=610) */}
            {ROW_YS.map((y, i) => (
              <path key={i + 5} id={`rp${i}`}
                d={`M 717 ${y} Q 635 ${y} 610 218`} />
            ))}
          </defs>
  
          {/* panel card backgrounds — unchanged */}
          <rect x="2"   y="2" width="279" height="366" rx="14"
            fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
          <rect x="719" y="2" width="279" height="366" rx="14"
            fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
  
          {/* connection lines */}
          {ROW_YS.map((_, i) => (
            <use key={`gl${i}`} href={`#lp${i}`} fill="none"
              stroke="rgba(79,70,229,0.2)" strokeWidth="1" strokeDasharray="4 8" />
          ))}
          {ROW_YS.map((_, i) => (
            <use key={`gr${i}`} href={`#rp${i}`} fill="none"
              stroke="rgba(79,70,229,0.2)" strokeWidth="1" strokeDasharray="4 8" />
          ))}
  
          {/* ── CENTER ENGINE — rebuilt from scratch ── */}
  
          {/* ambient glow halo */}
          <circle cx="500" cy="218" r="126" fill="none" stroke="rgba(79,70,229,0.06)" strokeWidth="1" />
  
          {/* title — outside the circle, above it (circle top = 218−110 = 108) */}
          <text x="500" y="82" fill="rgba(255,255,255,0.9)" fontSize="14" fontWeight="700"
            textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif">
            HireFit Matching Engine
          </text>
          <line x1="440" y1="92" x2="560" y2="92" stroke="rgba(139,133,239,0.2)" strokeWidth="1" />
  
          {/* engine core: r=110, clearly larger than before */}
          <circle cx="500" cy="218" r="110" fill="#181548" />
          <circle cx="500" cy="218" r="110" fill="none" stroke="rgba(139,133,239,0.22)" strokeWidth="1.5" />
  
          {/* score ring: r=88 (ring track from r=83 to r=93) */}
          <circle cx="500" cy="218" r="88" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
          <circle cx="500" cy="218" r="88" fill="none"
            stroke="#4f46e5" strokeWidth="10" strokeLinecap="round"
            strokeDasharray={String(SCORE_CIRC)}
            transform="rotate(-90 500 218)"
            style={{ animation: "hero-score-ring 7s ease-in-out infinite" }} />
  
          {/* score text — only "82%" and "ROLE READINESS" inside the circle */}
          <text x="500" y="233" fill="white" fontSize="44" fontWeight="800"
            textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif"
            style={{ animation: "hero-score-text 7s ease-in-out infinite" }}>
            82%
          </text>
          <text x="500" y="251" fill="rgba(139,133,239,0.75)" fontSize="10" fontWeight="700"
            textAnchor="middle" letterSpacing="2" fontFamily="Plus Jakarta Sans, sans-serif"
            style={{ animation: "hero-score-text 7s ease-in-out infinite" }}>
            ROLE READINESS
          </text>
  
          {/* status pills — OUTSIDE the circle, below it (circle bottom = 218+110 = 328) */}
          <g style={{ animation: "hero-out1 7s ease-in-out infinite" }}>
            <rect x="405" y="344" width="96" height="22" rx="11" fill="rgba(46,125,50,0.3)" />
            <text x="453" y="359" fill="#6fcf97" fontSize="8.5" fontWeight="700"
              textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif">Strong Role Match</text>
          </g>
          <g style={{ animation: "hero-out2 7s ease-in-out infinite" }}>
            <rect x="509" y="344" width="86" height="22" rx="11" fill="rgba(179,114,26,0.3)" />
            <text x="552" y="359" fill="#d49a50" fontSize="8.5" fontWeight="700"
              textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif">1 Missing Skill</text>
          </g>
          <g style={{ animation: "hero-out3 7s ease-in-out infinite" }}>
            <rect x="430" y="372" width="140" height="22" rx="11" fill="rgba(79,70,229,0.28)" />
            <text x="500" y="387" fill="#aea0f3" fontSize="8.5" fontWeight="700"
              textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif">High Evidence Confidence</text>
          </g>
  
          {/* animated signal dots */}
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
  
          {/* ── Left panel: Talent DNA ── */}
          <foreignObject x="2" y="2" width="279" height="366">
            <div style={panelStyle}>
              <div style={sectionEyebrow}>Candidate</div>
              <div style={sectionTitle}>Talent DNA</div>
  
              {/* profile */}
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#3832a3",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, color: "white", flexShrink: 0 }}>
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
                  <div style={{ width: 7, height: 7, borderRadius: "50%",
                    background: full ? "#4f46e5" : "#726bea", flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 11, fontWeight: 600,
                    color: "rgba(255,255,255,0.85)", lineHeight: 1.2 }}>{name}</span>
                  <span style={{ fontSize: 8, fontWeight: 700,
                    color: full ? "#c8c6f7" : "#9a95ec",
                    background: full ? "rgba(79,70,229,0.25)" : "rgba(114,107,234,0.18)",
                    border: `1px solid ${full ? "rgba(79,70,229,0.35)" : "rgba(114,107,234,0.25)"}`,
                    padding: "2px 8px", borderRadius: 5, whiteSpace: "nowrap" as const,
                    minWidth: 82, textAlign: "center" as const }}>
                    {level}
                  </span>
                </div>
              ))}
  
              <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "8px 0" }} />
  
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {(["Assessment", "Interview", "Work Sample"] as const).map((label) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 3,
                    background: "rgba(79,70,229,0.15)", border: "1px solid rgba(79,70,229,0.28)",
                    borderRadius: 6, padding: "3px 7px" }}>
                    <span style={{ fontSize: 8, fontWeight: 700, color: "#4f46e5" }}>✓</span>
                    <span style={{ fontSize: 9, fontWeight: 600, color: "#aea0f3" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </foreignObject>
  
          {/* ── Right panel: Job DNA ── */}
          <foreignObject x="719" y="2" width="279" height="366">
            <div style={panelStyle}>
              <div style={sectionEyebrow}>Role</div>
              <div style={sectionTitle}>Job DNA</div>
  
              {/* role info */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, lineHeight: 1.3 }}>
                  Senior QA Engineer
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                  STC · Riyadh, Saudi Arabia
                </div>
              </div>
  
              <div style={divider} />
              <div style={subLabel}>Requirements</div>
  
              {RIGHT_REQS.map(({ name, weight }) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
                  <div style={{ width: 7, height: 7,
                    borderRadius: weight === "Critical" ? "50%" : 2,
                    background: weight === "Critical" ? "#4f46e5"
                               : weight === "Required"  ? "#726bea" : "#3832a3",
                    flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 11, fontWeight: 600,
                    color: "rgba(255,255,255,0.85)", lineHeight: 1.2 }}>{name}</span>
                  <span style={{ fontSize: 8.5, fontWeight: 600,
                    color: weight === "Critical" ? "#aea0f3"
                         : weight === "Required"  ? "#8b85ef" : "rgba(139,133,239,0.45)",
                    background: weight === "Critical" ? "rgba(79,70,229,0.25)"
                               : weight === "Required"  ? "rgba(79,70,229,0.15)" : "transparent",
                    padding: "1.5px 5px", borderRadius: 4 }}>
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
      </div>
    );
  }
