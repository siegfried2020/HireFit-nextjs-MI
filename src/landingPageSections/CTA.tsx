import Reveal from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/* ─── final CTA ─── */
export function CTA({ onGetStarted }: { onGetStarted: () => void }) {
    return (
      <section className="relative overflow-hidden bg-brand-900 py-24 md:py-40">
        <div className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 20% 60%, rgba(79,70,229,0.25) 0%, transparent 55%), radial-gradient(ellipse at 80% 40%, rgba(114,107,234,0.18) 0%, transparent 55%)",
          }} />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="text-[clamp(30px,6vw,80px)] font-extrabold leading-[1.0] tracking-[-0.03em] text-white">
              See capability clearly.<br />
              <span className="text-brand-300">Hire with confidence.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-8 max-w-xl text-[14px] md:text-[18px] leading-relaxed text-white/45">
              HireFit is free to explore. No commitments.
              Start building evidence-based hiring today.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button onClick={onGetStarted}
                className="md:text-[16px] md:px-8 md:py-4 text-[14px] px-5 py-2 group flex items-center gap-2.5 rounded-[13px] bg-white 
                font-bold text-brand-900 shadow-[0_4px_20px_rgba(255,255,255,0.15)] transition-all 
                hover:shadow-[0_6px_30px_rgba(255,255,255,0.25)] hover:gap-3.5">
                Get Started Free <ArrowRight className="size-5 transition-all" />
              </button>
              <button onClick={onGetStarted}
                className="md:px-8 md:py-4 md:text-[16px] text-[14px] px-4 py-2 rounded-[13px] border border-white/20 font-semibold text-white/70 transition-all hover:border-white/40 hover:text-white">
                Sign In
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }