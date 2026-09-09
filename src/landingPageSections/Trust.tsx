import Reveal from "@/components/Reveal";
import { Eye } from "lucide-react";

/* ─── trust / privacy section ─── */
export function TrustSection() {
    const points = [
      { headline: "Candidates own their data.", body: "Every piece of evidence is consent-based. Candidates decide what is shared, with whom, and when." },
      { headline: "Every score is explainable.", body: "No black boxes. Every readiness score links directly to the evidence that generated it." },
      { headline: "Humans decide.", body: "HireFit provides signals and evidence. Hiring decisions are always made by people, not algorithms." },
      { headline: "Full audit trail.", body: "Every score, every evidence source, every decision point is logged and auditable." },
    ];
  
    return (
      <section className="bg-white py-28">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="mb-20 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[3px] text-brand-500">
              Trust & Privacy
            </span>
            <h2 className="mt-4 text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink">
              Built for transparency.
            </h2>
          </Reveal>
          <div className="divide-y divide-line">
            {points.map(({ headline, body }, i) => (
              <Reveal key={headline} delay={i * 80}>
                <div className="flex items-start gap-12 py-10 lg:gap-24">
                  <div className="hidden w-8 shrink-0 text-[12px] font-bold tabular-nums text-faint lg:block">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[clamp(20px,2.5vw,30px)] font-extrabold tracking-tight text-ink">
                      {headline}
                    </h3>
                    <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-muted">{body}</p>
                  </div>
                  <Eye className="mt-1 hidden size-5 shrink-0 text-brand-300 lg:block" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }