import Reveal from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/* ─── matching / readiness ─── */
export function MatchingSection() {
    return (
      <section className="bg-[#f7f9fb] py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <Reveal>
              <span className="text-[11px] font-semibold uppercase tracking-[3px] text-brand-500">
                Matching & Readiness
              </span>
              <h2 className="mt-4 text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink">
                Every match is explainable.
              </h2>
            </Reveal>
          </div>
  
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
            <Reveal from="left" className="h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-white p-5 shadow-[var(--shadow-card)] sm:p-7">
                <div className="mb-6 flex items-start justify-between gap-4 max-sm:flex-col max-sm:gap-3">
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-[2px] text-faint">Senior QA Engineer</div>
                    <div className="mt-0.5 text-[20px] font-extrabold leading-snug tracking-tight text-ink sm:text-[22px]">Skill Readiness Report</div>
                  </div>
                  <div className="shrink-0 text-right max-sm:self-start max-sm:text-left">
                    <div className="text-[11px] font-bold uppercase tracking-[2px] text-faint">Overall Ready</div>
                    <div className="mt-0.5 text-[36px] font-extrabold leading-[1] tracking-[-0.04em] text-brand-500 sm:text-[40px]">
                      82<span className="text-[20px] font-bold text-brand-300">%</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4">
                  {[
                    { skill: "API Testing",         score: 96, evidence: 4, status: "strong" },
                    { skill: "Playwright / E2E",     score: 91, evidence: 3, status: "strong" },
                    { skill: "SQL",                  score: 78, evidence: 2, status: "good" },
                    { skill: "CI/CD Pipelines",      score: 62, evidence: 2, status: "partial" },
                    { skill: "Performance Testing",  score: 38, evidence: 1, status: "gap" },
                  ].map(({ skill, score, evidence, status }) => {
                    const bar = status === "strong" ? "bg-brand-500"
                      : status === "good" ? "bg-brand-400"
                      : status === "partial" ? "bg-[#726bea]"
                      : "bg-[#b3721a]";
                    const badge = status === "strong" ? "text-[#2e7d5b] bg-[#e7f2ec]"
                      : status === "good" ? "text-brand-700 bg-brand-50"
                      : status === "partial" ? "text-brand-700 bg-brand-50"
                      : "text-[#b3721a] bg-[#fbf1e2]";
                    return (
                      <div key={skill} className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <div className="flex min-w-0 items-center justify-between gap-2 sm:contents">
                          <div className="min-w-0 truncate text-[14px] font-semibold text-ink sm:w-40 sm:shrink-0">
                            {skill}
                          </div>
                          <div className={`shrink-0 self-start rounded-full px-2.5 py-0.5 text-[11px] font-semibold sm:order-last ${badge}`}>
                            {evidence} {evidence === 1 ? "source" : "sources"}
                          </div>
                        </div>
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="h-1.5 overflow-hidden rounded-full bg-line">
                              <div
                                className={`h-full rounded-full ${bar} transition-all duration-1000`}
                                style={{ width: `${score}%` }}
                              />
                            </div>
                          </div>
                          <div className="w-10 shrink-0 text-right text-[13px] font-bold text-ink">{score}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
  
            <div className="flex flex-col gap-6">
              <Reveal from="right">
                <div className="rounded-[18px] border border-line bg-white p-6 shadow-[var(--shadow-card)]">
                  <div className="mb-4 text-[12px] font-bold uppercase tracking-[2px] text-faint">Skill Gap Intelligence</div>
                  <div className="space-y-3">
                    {[
                      { skill: "Performance Testing", gap: "Foundational → Intermediate", priority: "high" },
                      { skill: "CI/CD Pipelines",      gap: "Intermediate → Advanced",    priority: "medium" },
                    ].map(({ skill, gap, priority }) => (
                      <div key={skill} className={`rounded-[10px] border px-4 py-3 ${
                        priority === "high" ? "border-[#fbf1e2] bg-[#fef9f2]" : "border-line bg-canvas"
                      }`}>
                        <div className="text-[13px] font-semibold text-ink">{skill}</div>
                        <div className="mt-0.5 flex items-center gap-2 text-[12px] text-muted">
                          <ArrowRight className="size-3.5" /> {gap}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
  
              <Reveal from="right" delay={100}>
                <div className="rounded-[18px] border border-line bg-white p-6 shadow-[var(--shadow-card)]">
                  <div className="mb-4 text-[12px] font-bold uppercase tracking-[2px] text-faint">Evidence Confidence</div>
                  <div className="space-y-2.5">
                    {[
                      ["Assessment", 4, "bg-brand-500"],
                      ["Interview",  2, "bg-brand-400"],
                      ["Work Sample",2, "bg-brand-300"],
                      ["Certificate",1, "bg-brand-200"],
                    ].map(([label, count, cls]) => (
                      <div key={label as string} className="flex items-center gap-3">
                        <div className={`size-2 shrink-0 rounded-full ${cls}`} />
                        <div className="flex-1 text-[13px] font-medium text-ink">{label}</div>
                        <div className="flex gap-1">
                          {Array.from({ length: 4 }, (_, i) => (
                            <div key={i}
                              className={`h-2.5 w-5 rounded-sm ${i < (count as number) ? cls : "bg-line"}`} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    );
  }