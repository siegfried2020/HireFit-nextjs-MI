import Reveal from "@/components/Reveal";
import { useEffect, useState } from "react";

const STEPS = [
    { num: "01", label: "Discover", body: "Candidates share their career story, skills, and experience through conversations and assessments." },
    { num: "02", label: "Verify", body: "Evidence is collected from assessments, interviews, work samples, and certifications." },
    { num: "03", label: "Structure", body: "Raw job descriptions become structured Job DNA — skill requirements, weights, and thresholds." },
    { num: "04", label: "Measure", body: "Talent DNA meets Job DNA. Readiness scores are computed across every required dimension." },
    { num: "05", label: "Match", body: "Candidates are ranked by readiness, with gaps identified and evidence surfaced for review." },
    { num: "06", label: "Decide", body: "Humans make the final call — with complete evidence, not algorithmic black boxes." },
  ];
  
export function ProcessSection() {
    const [active, setActive] = useState(0);
    useEffect(() => {
      const t = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 3200);
      return () => clearInterval(t);
    }, []);
  
    return (
      <section className="bg-[#f7f9fb] py-28" id="how-it-works">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-16">
            <span className="text-[11px] font-semibold uppercase tracking-[3px] text-brand-500">
              How It Works
            </span>
            <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink">
              From claim to<br />verified capability.
            </h2>
          </Reveal>
  
          <div className="hidden gap-0 lg:grid lg:grid-cols-6">
            {STEPS.map((s, i) => (
              <button key={s.num} onClick={() => setActive(i)}
                className={`group relative border-t-[3px] pt-7 pr-6 text-left transition-all duration-300 ${
                  i === active ? "border-brand-500" : "border-line hover:border-brand-300"
                }`}>
                <div className={`text-[11px] font-bold tracking-[2px] transition-colors ${
                  i === active ? "text-brand-500" : "text-faint"
                }`}>{s.num}</div>
                <div className={`mt-2 text-[18px] font-extrabold tracking-tight transition-colors ${
                  i === active ? "text-ink" : "text-muted group-hover:text-ink-soft"
                }`}>{s.label}</div>
                {i === active && (
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">{s.body}</p>
                )}
              </button>
            ))}
          </div>
  
          <div className="space-y-0 lg:hidden">
            {STEPS.map((s, i) => (
              <div key={s.num}
                className={`border-l-[3px] py-5 pl-6 ${
                  i === active ? "border-brand-500" : "border-line"
                }`}>
                <div className="text-[11px] font-bold tracking-[2px] text-brand-500">{s.num}</div>
                <div className="mt-1 text-[20px] font-extrabold text-ink">{s.label}</div>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }