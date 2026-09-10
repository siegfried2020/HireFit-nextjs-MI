import { Logo } from "@/components/rankShellPages";

/* ─── footer ─── */
export function LandingFooter() {
    return (
      <footer className="border-t border-line bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <Logo size={32} />
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-faint">
              {["Privacy Policy", "Terms of Service", "Accessibility", "Security"].map((l) => (
                <a key={l} href="#" className="transition-colors hover:text-ink">{l}</a>
              ))}
            </div>
            <div className="text-[12px] text-faint">
              © 2026 HireFit. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    );
  }