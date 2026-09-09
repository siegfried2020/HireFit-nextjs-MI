import Reveal from "@/components/Reveal";
import { Award, ClipboardCheck, FileText, Mic } from "lucide-react";


function SkillCluster() {
  const skills = [
    { label: "API Testing",    level: 92, angle: 0,   r: 120 },
    { label: "Playwright",     level: 88, angle: 55,  r: 130 },
    { label: "SQL",            level: 75, angle: 110, r: 115 },
    { label: "CI/CD",          level: 68, angle: 170, r: 125 },
    { label: "Performance",    level: 45, angle: 220, r: 118 },
    { label: "TypeScript",     level: 90, angle: 275, r: 128 },
    { label: "Perf. Testing",  level: 82, angle: 320, r: 122 },
  ];

  const cx2 = 200; const cy2 = 200;

  function nodePos(angle: number, r: number) {
    const a = (angle * Math.PI) / 180;
    return { x: cx2 + r * Math.cos(a), y: cy2 + r * Math.sin(a) };
  }

  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-sm h-auto mx-auto">
      <circle cx={cx2} cy={cy2} r={115} fill="none" stroke="#e4e8ee" strokeWidth={1} strokeDasharray="3 4" />
      <circle cx={cx2} cy={cy2} r={130} fill="none" stroke="#e4e8ee" strokeWidth={1} strokeDasharray="3 4" />

      {skills.map((s, i) => {
        const p = nodePos(s.angle, s.r);
        return (
          <line key={i} x1={cx2} y1={cy2} x2={p.x} y2={p.y}
            stroke="#e4e8ee" strokeWidth={1} />
        );
      })}

      <circle cx={cx2} cy={cy2} r={42} fill="#ededfc" />
      <circle cx={cx2} cy={cy2} r={42} fill="none" stroke="#c8c6f7" strokeWidth={1.5} />
      <text x={cx2} y={cy2 - 4} fill="#3832a3" fontSize={11} fontWeight={800}
        textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif">TALENT</text>
      <text x={cx2} y={cy2 + 10} fill="#3832a3" fontSize={11} fontWeight={800}
        textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif">DNA</text>

      {skills.map((s, i) => {
        const p = nodePos(s.angle, s.r);
        const color = s.level >= 80 ? "#4f46e5" : s.level >= 60 ? "#726bea" : "#b3721a";
        const bg = s.level >= 80 ? "#ededfc" : s.level >= 60 ? "#f0eefe" : "#fbf1e2";
        return (
          <g key={i} className="lp-float" style={{ animationDelay: `${i * 400}ms` }}>
            <circle cx={p.x} cy={p.y} r={26} fill={bg} />
            <circle cx={p.x} cy={p.y} r={26} fill="none" stroke={color} strokeWidth={1.5} />
            <text x={p.x} y={p.y - 3}
              fill={color} fontSize={10} fontWeight={700}
              textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif">
              {s.level}%
            </text>
            <text x={p.x} y={p.y + 9}
              fill="#667085" fontSize={8}
              textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif">
              {s.label.slice(0, 8)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}


export function TalentDNASection() {
  return (
    <section className="bg-white py-28" id="candidates">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_420px]">
          <div>
            <Reveal>
              <span className="text-[11px] font-semibold uppercase tracking-[3px] text-brand-500">
                Talent DNA
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink">
                Your skills,<br />backed by evidence.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted">
                HireFit builds a living Talent DNA from everything you do — assessments,
                interviews, work samples, projects, and certifications. Not a CV. A
                verified capability profile.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[
                { icon: Mic, title: "Voice Discovery", body: "Tell your career story naturally." },
                { icon: ClipboardCheck, title: "Structured Assessments", body: "Validated skill evaluation." },
                { icon: FileText, title: "Work Samples", body: "Show real work, not keywords." },
                { icon: Award, title: "Verified Credentials", body: "Certificates, degrees, licences." },
              ].map(({ icon: Icon, title, body }, i) => (
                <Reveal key={title} delay={200 + i * 60}>
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-[10px] bg-brand-50">
                      <Icon className="size-5 text-brand-500" />
                    </div>
                    <div>
                      <div className="text-[15px] font-bold text-ink">{title}</div>
                      <div className="mt-0.5 text-[13px] text-muted">{body}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal from="right" delay={100}>
            <SkillCluster />
          </Reveal>
        </div>
      </div>
    </section>
  );
}