import Reveal from "@/components/Reveal";
import { Building2, GraduationCap, Users } from "lucide-react";
import { useState } from "react";

/* ─── journeys / audience section ─── */
const JOURNEYS = {
    candidate: {
      label: "Candidates",
      icon: Users,
      headline: "Build a career that speaks for itself.",
      steps: [
        ["Discover strengths", "Voice, resume, and guided self-assessment."],
        ["Verify skills",      "Evidence from assessments and real work."],
        ["Understand readiness","See exactly where you stand for target roles."],
        ["Close skill gaps",   "Clear, actionable improvement paths."],
        ["Access better roles","Matched to roles where you are genuinely ready."],
      ],
    },
    employer: {
      label: "Employers",
      icon: Building2,
      headline: "Hire with evidence, not just intuition.",
      steps: [
        ["Build Job DNA",       "Structure any role into weighted skill specs."],
        ["Discover candidates","Search by capability, evidence, and readiness."],
        ["Compare evidence",   "Side-by-side skill profiles with source data."],
        ["Manage pipeline",    "Track every candidate through a fair process."],
        ["Decide confidently", "Full evidence stack — humans in the loop."],
      ],
    },
    institution: {
      label: "Institutions",
      icon: GraduationCap,
      headline: "Understand workforce readiness at scale.",
      steps: [
        ["Cohort analytics",   "Readiness scores across student populations."],
        ["Skill gap insights", "Where graduates fall short of employer needs."],
        ["Workforce intelligence","Industry demand vs available talent."],
        ["Governance controls","Scoring policies, taxonomy, integrity."],
        ["Explainable outcomes","Auditability for accreditation and reporting."],
      ],
    },
  };
  
  type JourneyKey = keyof typeof JOURNEYS;
  
export function JourneysSection() {
    const [active, setActive] = useState<JourneyKey>("candidate");
    const j = JOURNEYS[active];
    const Icon = j.icon;
  
    return (
      <section className="bg-brand-900 py-16 sm:py-28" id="institutions">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <span className="text-[11px] font-semibold uppercase tracking-[3px] text-brand-400">
              For Every Stakeholder
            </span>
            <h2 className="mt-4 text-[clamp(26px,4vw,48px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-white">
              One platform. Three perspectives.
            </h2>
          </Reveal>
  
          <div className="-mx-6 mt-10 overflow-x-auto px-6 sm:mx-0 sm:mt-12 sm:overflow-visible sm:px-0">
            <div className="flex min-w-full border-b border-white/10 sm:min-w-0">
              {(Object.keys(JOURNEYS) as JourneyKey[]).map((k) => {
                const { label, icon: JIcon } = JOURNEYS[k];
                return (
                  <button
                    key={k}
                    onClick={() => setActive(k)}
                    className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 px-2 pb-3 text-[12px] font-semibold whitespace-nowrap transition-all sm:flex-none sm:justify-start sm:gap-2.5 sm:px-0 sm:pb-4 sm:pr-8 sm:text-[15px] ${
                      k === active
                        ? "border-brand-400 text-white"
                        : "border-transparent text-white/35 hover:text-white/65"
                    }`}
                  >
                    <JIcon className="size-3.5 shrink-0 sm:size-4" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
  
          <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-12 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="text-[clamp(20px,3vw,36px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-white">
                {j.headline}
              </p>
              <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
                {j.steps.map(([title, body], i) => (
                  <div key={title as string} className="flex items-start gap-3.5 sm:gap-5">
                    <div className="grid size-8 shrink-0 place-items-center rounded-full border border-brand-600 text-[12px] font-bold text-brand-300">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[15px] font-bold text-white/90 sm:text-[16px]">{title}</div>
                      <div className="mt-0.5 text-[13px] leading-relaxed text-white/40">{body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            <div className="flex items-center justify-center max-lg:order-first lg:order-none">
              <div className="relative">
                <div className="absolute -inset-6 rounded-full bg-brand-500/10 blur-3xl" />
                <div className="relative rounded-[22px] border border-white/8 bg-white/[0.05] p-6 text-center sm:p-8">
                  <Icon className="mx-auto size-12 text-brand-400 opacity-60 sm:size-16" />
                  <div className="mt-4 text-[18px] font-extrabold text-white sm:mt-5 sm:text-[22px]">{j.label}</div>
                  <div className="mx-auto mt-2 max-w-[200px] text-[13px] leading-relaxed text-white/40">
                    {j.headline}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  