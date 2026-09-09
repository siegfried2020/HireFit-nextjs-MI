/* ─── intelligence network viz (hero) ─── */

import HeroMatchingViz from "@/components/HeroMatchingViz";
import { ArrowRight } from "lucide-react";



export function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {

    return (
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-brand-900 pt-[68px]">
  
        {/* layered background */}
        {/* fine dot grid */}
        <div className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(139,133,239,0.18) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }} />
        {/* center radial bloom — sits behind the viz */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(79,70,229,0.22) 0%, transparent 70%)",
          }} />
        {/* top vignette */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{ background: "linear-gradient(to bottom, rgba(33,29,96,0.6) 0%, transparent 100%)" }} />
  
        {/* ── copy block ── */}
        <div className="relative mx-auto w-full max-w-3xl px-6 pt-[72px] text-center">
  
          {/* badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-brand-300"
            style={{ animation: "lp-fade-up 0.65s 80ms cubic-bezier(0.22,1,0.36,1) both" }}>
            Hiring Intelligence Platform
          </div>
  
          {/* headline */}
          <h1
            className="mt-6 text-[clamp(40px,5.8vw,78px)] font-extrabold leading-[1.04] tracking-[-0.025em] text-white"
            style={{ animation: "lp-fade-up 0.7s 200ms cubic-bezier(0.22,1,0.36,1) both" }}>
            Hire for capability,<br />
            <span style={{ color: "#aea0f3" }}>not just credentials.</span>
          </h1>
  
          {/* sub-copy */}
          <p
            className="mx-auto mt-5 max-w-[480px] text-[17px] leading-[1.65] text-white/48"
            style={{ animation: "lp-fade-up 0.7s 340ms cubic-bezier(0.22,1,0.36,1) both" }}>
            Real skills. Verified evidence. Structured role requirements.
            Clear readiness. Better hiring decisions.
          </p>
  
          {/* CTAs */}
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            style={{ animation: "lp-fade-up 0.7s 460ms cubic-bezier(0.22,1,0.36,1) both" }}>
            <button onClick={onGetStarted}
              className="group flex items-center gap-2 rounded-[11px] bg-brand-500 px-6 py-3 text-[15px] font-semibold text-white
                shadow-[0_2px_16px_rgba(79,70,229,0.5)]
                transition-all duration-200
                hover:bg-brand-600 hover:shadow-[0_4px_24px_rgba(79,70,229,0.6)] hover:gap-2.5">
              Get Started <ArrowRight className="size-4 transition-all duration-200" />
            </button>
            <a href="#platform"
              className="flex items-center gap-1.5 rounded-[11px] border border-white/14 px-6 py-3
                text-[15px] font-semibold text-white/65
                transition-all duration-200
                hover:border-white/28 hover:text-white/90">
              Explore the Platform
            </a>
          </div>
        </div>
  
        {/* ── matching viz ── */}
        <div
          className="relative mx-auto mt-10 w-full max-w-[1000px] flex-1 px-4 pb-10"
          style={{ animation: "lp-fade-up 1s 560ms cubic-bezier(0.22,1,0.36,1) both" }}>
          <HeroMatchingViz />
        </div>
  
      </section>
    );
  }