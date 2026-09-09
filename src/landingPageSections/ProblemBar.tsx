import Reveal from "@/components/Reveal";
import { CheckCircle2 } from "lucide-react";

export function ProblemSection() {
    return (
      <section className="overflow-hidden bg-white py-28" id="platform">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-14 max-w-md">
            <span className="text-[11px] font-semibold uppercase tracking-[3px] text-brand-500">
              The Problem
            </span>
          </Reveal>
  
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-32">
            <Reveal from="left" className="relative">
              <div className="relative">
                <div className="absolute -left-6 top-0 h-full w-px bg-line" />
                <div className="pl-4">
                  <div className="mb-6 text-[11px] font-bold uppercase tracking-[3px] text-faint">
                    Traditional Hiring
                  </div>
                  <p className="text-[clamp(24px,3.5vw,44px)] font-bold leading-[1.15] tracking-[-0.02em] text-ink/20 line-through decoration-[#e4e8ee] decoration-4">
                    Hire based on CVs and gut feel.
                  </p>
                  <div className="mt-10 space-y-4">
                    {[
                      "Unverified skill claims",
                      "Credentials over capability",
                      "Biased, inconsistent interviews",
                      "Blind hope for cultural fit",
                    ].map((t) => (
                      <div key={t} className="flex items-center gap-3 text-[15px] text-muted line-through decoration-faint">
                        <span className="size-1.5 shrink-0 rounded-full bg-faint" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
  
            <Reveal from="right" delay={120} className="relative">
              <div className="absolute -left-6 top-0 h-full w-px bg-brand-200" />
              <div className="pl-4">
                <div className="mb-6 text-[11px] font-bold uppercase tracking-[3px] text-brand-500">
                  HireFit
                </div>
                <p className="text-[clamp(24px,3.5vw,44px)] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
                  Hire on evidence, readiness, and fit.
                </p>
                <div className="mt-10 space-y-4">
                  {[
                    "Skills backed by real evidence",
                    "Explainable readiness scores",
                    "Structured, consistent assessment",
                    "Data-informed, human-decided",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-3 text-[15px] font-medium text-ink">
                      <CheckCircle2 className="size-5 shrink-0 text-brand-500" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }