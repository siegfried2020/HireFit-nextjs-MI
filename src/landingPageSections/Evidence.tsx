import Reveal from "@/components/Reveal";
import { Award, ClipboardCheck, FileText, Layers, Mic, Shield } from "lucide-react";

export function EvidenceSection() {
    const sources = [
      { label: "Resume / CV",         icon: FileText },
      { label: "Assessment",           icon: ClipboardCheck },
      { label: "Structured Interview", icon: Mic },
      { label: "Work Sample",          icon: Layers },
      { label: "Certification",        icon: Award },
    ];
  
    return (
      <section className="bg-white py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="text-[11px] font-semibold uppercase tracking-[3px] text-brand-500">
                  Evidence-First Hiring
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink">
                  Claims are cheap.<br />Evidence is everything.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted">
                  Every skill in HireFit has a source. The Evidence Engine aggregates
                  signals from multiple touchpoints and weights them by recency, relevance,
                  and reliability — so readiness scores are grounded in proof.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex items-start gap-4 rounded-[14px] border border-brand-100 bg-brand-50 p-5">
                  <Shield className="mt-0.5 size-5 shrink-0 text-brand-500" />
                  <p className="text-[14px] leading-relaxed text-brand-800">
                    HireFit never makes a hiring decision. It surfaces evidence, scores,
                    and explanations. Humans always decide.
                  </p>
                </div>
              </Reveal>
            </div>
  
            <Reveal from="right" delay={100}>
              <div className="space-y-3">
                {sources.map(({ label, icon: Icon }, i) => (
                  <Reveal key={label} delay={i * 60} from="left">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 rounded-[11px] border border-line bg-canvas px-4 py-3 w-56">
                        <Icon className="size-4 text-muted" />
                        <span className="text-[13px] font-semibold text-ink">{label}</span>
                      </div>
                      <div className="flex-1 border-t border-dashed border-brand-200" />
                      <div className="size-2 rounded-full bg-brand-400" />
                    </div>
                  </Reveal>
                ))}
  
                <Reveal delay={400} from="right">
                  <div className="justify-center w-fit rounded-[14px] border border-brand-200 bg-brand-50 px-6 py-4 text-center">
                    <div className="text-[11px] font-bold uppercase tracking-[2px] text-brand-500">Evidence Engine</div>
                    <div className="mt-2 text-[28px] font-extrabold tracking-tight text-brand-900">Talent DNA</div>
                    <div className="mt-1 text-[12px] text-brand-500">Verified · Weighted · Explainable</div>
                  </div>
                </Reveal>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }