import Reveal from "@/components/Reveal";
import { Shield, TrendingUp } from "lucide-react";

export function PassportSection() {
    return (
      <section className="bg-[#f7f9fb] py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="text-[11px] font-semibold uppercase tracking-[3px] text-brand-500">
                  Talent Passport
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink">
                  Your proof, always portable.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted">
                  The Talent Passport is your verified professional record — skills,
                  evidence, and readiness scores you can share with any employer, anywhere.
                  No more re-proving yourself for every new application.
                </p>
              </Reveal>
              <div className="mt-10 flex flex-col gap-4">
                {[
                  ["Portable & shareable", "Share a verified link with any employer."],
                  ["Evidence-linked",       "Every skill traces back to real proof."],
                  ["Candidate-controlled",  "You decide exactly what to show."],
                ].map(([title, body], i) => (
                  <Reveal key={title as string} delay={240 + i * 60}>
                    <div className="flex items-start gap-4">
                      <TrendingUp className="mt-0.5 size-5 shrink-0 text-brand-400" />
                      <div>
                        <div className="text-[15px] font-bold text-ink">{title}</div>
                        <div className="text-[13px] text-muted">{body}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
  
            <Reveal from="right" delay={120}>
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-4 rounded-[32px] bg-brand-100/40 blur-2xl" />
                <div className="relative overflow-hidden rounded-[24px] border border-brand-200 bg-white shadow-[var(--shadow-pop)]">
                  <div className="flex items-center justify-between bg-brand-900 px-6 py-5">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[3px] text-brand-300">Talent Passport</div>
                      <div className="mt-1.5 text-[18px] font-extrabold text-white">Sarah Al-Rashid</div>
                      <div className="mt-0.5 text-[12px] text-brand-300/70">QA Engineer · Saudi Arabia</div>
                    </div>
                    <div className="grid size-12 place-items-center rounded-full border border-brand-600 bg-brand-800 text-[18px] font-extrabold text-white">
                      SA
                    </div>
                  </div>
  
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="text-[11px] font-bold uppercase tracking-[2px] text-faint">Verified Skills</div>
                      <div className="text-[11px] font-semibold text-brand-500">7 verified</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        ["Playwright", "bg-[#ededfc] text-[#3832a3]"],
                        ["API Testing", "bg-[#ededfc] text-[#3832a3]"],
                        ["SQL", "bg-[#e7f2ec] text-[#2e7d5b]"],
                        ["TypeScript", "bg-[#ededfc] text-[#3832a3]"],
                        ["CI/CD", "bg-[#fbf1e2] text-[#b3721a]"],
                        ["Performance", "bg-[#fbf1e2] text-[#b3721a]"],
                      ].map(([skill, cls]) => (
                        <span key={skill as string}
                          className={`rounded-full px-3 py-1 text-[12px] font-semibold ${cls}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
  
                    <div className="mt-5 grid grid-cols-3 gap-4 rounded-[14px] bg-canvas p-4">
                      {[["82%", "Role Ready"], ["9", "Evidence pieces"], ["4", "Assessments"]].map(([val, lbl]) => (
                        <div key={lbl as string} className="text-center">
                          <div className="text-[22px] font-extrabold tracking-tight text-ink">{val}</div>
                          <div className="mt-0.5 text-[10px] font-medium text-faint">{lbl}</div>
                        </div>
                      ))}
                    </div>
  
                    <div className="mt-4 flex items-center gap-2 rounded-[10px] bg-brand-50 px-4 py-2.5">
                      <Shield className="size-4 text-brand-500" />
                      <span className="text-[12px] font-medium text-brand-700">Verified by HireFit · 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }
  