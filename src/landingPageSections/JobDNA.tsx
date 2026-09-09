import Reveal from "@/components/Reveal";
import { Zap } from "lucide-react";

export function JobDNASection() {
    return (
      <section className="bg-brand-900 py-28" id="employers">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <Reveal from="left">
              <div className="rounded-[20px] border border-white/8 bg-white/[0.05] p-7">
                <div className="mb-5 text-[11px] font-bold uppercase tracking-[3px] text-brand-300/60">
                  Raw Job Description
                </div>
                <div className="space-y-2 opacity-40">
                  <div className="h-3 rounded-full bg-white/30" style={{ width: "85%" }} />
                  <div className="h-3 rounded-full bg-white/30" style={{ width: "72%" }} />
                  <div className="h-3 rounded-full bg-white/30" style={{ width: "64%" }} />
                </div>
  
                <div className="my-7 flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/10" />
                  <div className="flex items-center gap-2 rounded-full bg-brand-500/20 px-4 py-1.5 text-[11px] font-semibold text-brand-200">
                    <Zap className="size-3.5" /> HireFit structures this
                  </div>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
  
                <div className="mb-4 text-[11px] font-bold uppercase tracking-[3px] text-brand-300">
                  Job DNA
                </div>
                <div className="space-y-2.5">
                  {[
                    { skill: "Playwright / E2E", weight: "Critical", level: "Advanced" },
                    { skill: "API Testing",       weight: "Required", level: "Advanced" },
                    { skill: "SQL",               weight: "Required", level: "Intermediate" },
                    { skill: "CI/CD",             weight: "Preferred", level: "Intermediate" },
                    { skill: "Performance",       weight: "Preferred", level: "Intermediate" },
                  ].map(({ skill, weight, level }) => (
                    <div key={skill} className="flex items-center gap-3 rounded-[10px] bg-white/[0.06] px-4 py-2.5">
                      <div className="flex-1 text-[13px] font-semibold text-white/85">{skill}</div>
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        weight === "Critical" ? "bg-brand-500/30 text-brand-200" :
                        weight === "Required" ? "bg-white/10 text-white/60" :
                        "bg-white/5 text-white/40"
                      }`}>{weight}</span>
                      <span className="text-[12px] text-brand-300/70">{level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
  
            <div>
              <Reveal>
                <span className="text-[11px] font-semibold uppercase tracking-[3px] text-brand-400">
                  Job DNA
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.08] tracking-[-0.025em] text-white">
                  Turn any role description into a precision hiring spec.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 text-[17px] leading-relaxed text-white/50">
                  HireFit converts a raw job description into structured Job DNA —
                  weighted skill requirements, evidence thresholds, assessment rubrics,
                  and readiness criteria. So every hire is measured consistently.
                </p>
              </Reveal>
              <div className="mt-10 space-y-5">
                {[
                  ["Required vs preferred skills", "Weighted by importance, not guesswork."],
                  ["Evidence expectations", "Specify what proof is required per skill."],
                  ["Assessment & interview rubric", "Standardised evaluation from day one."],
                  ["Seniority & threshold control", "Set minimum readiness for auto-screening."],
                ].map(([title, body], i) => (
                  <Reveal key={title as string} delay={220 + i * 60}>
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 size-1.5 shrink-0 rounded-full bg-brand-400" />
                      <div>
                        <div className="text-[15px] font-semibold text-white/85">{title}</div>
                        <div className="mt-0.5 text-[13px] text-white/40">{body}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  