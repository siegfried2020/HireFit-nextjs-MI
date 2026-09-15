import { ROLES } from "../Shared/Roles&Sessions";
import { type ReactNode } from "react";

import {
  Check,
} from "lucide-react";
import { cx } from "../../../../components/primitives";
import { Logo, type Portal, } from "../../../../components/rankShellPages";

export function AuthLayout({ children, wide, onGoHome }: { children: ReactNode; wide?: boolean; onGoHome?: () => void }) {
    return (
      <div className="grid min-h-full grid-cols-[1.05fr_1fr] bg-canvas max-lg:grid-cols-1" style={{ minHeight: "100dvh" }}>
        {/* Brand panel */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-brand-800 p-12 text-white max-lg:hidden" style={{ minHeight: "100dvh" }}>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="relative">
            {onGoHome ? (
              <button onClick={onGoHome} className="rounded-[6px] transition-opacity hover:opacity-75" title="Back to home">
                <Logo size={52} invert />
              </button>
            ) : (
              <Logo size={52} invert />
            )}
          </div>
  
          <div className="relative max-w-md">
            <h2 className="text-[30px] font-bold leading-tight tracking-tight">
              Evidence over claims. Trust over guesswork.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-brand-100">
              One credible ecosystem connecting verified talent with the teams and institutions that
              value proven capability.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "Verified Talent Passports, not self-reported profiles",
                "Explainable readiness — every score shows its evidence",
                "Human decisions, always in the loop",
              ].map((t) => (
                <div key={t} className="flex items-center gap-3 text-[14px] text-brand-50">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-white/12">
                    <Check className="size-3" />
                  </span>
                  {t}
                </div>
              ))}
            </div>
          </div>
  
          <div className="relative text-[12.5px] text-brand-200">
            Trusted by hiring teams and institutions across the Kingdom · Nafath-ready
          </div>
        </div>
  
        {/* Form panel */}
        <div className="flex min-h-full items-center justify-center overflow-y-auto px-6 py-10">
          <div className={cx("w-full", wide ? "max-w-[520px]" : "max-w-[400px]")}>{children}</div>
        </div>
      </div>
    );
  }
  
export  function RoleContext({ role, onChange }: { role: Portal; onChange: () => void }) {
    const r = ROLES[role];
    const Icon = r.icon;
    return (
      <button
        onClick={onChange}
        className="mb-6 flex w-full items-center gap-3 rounded-[11px] border border-line bg-raised px-3.5 py-2.5 text-left transition-colors hover:border-brand-200"
      >
        <div className="grid size-9 place-items-center rounded-[9px] bg-brand-50 text-brand-600">
          <Icon className="size-[18px]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-medium text-faint">Signing in as</div>
          <div className="truncate text-[13.5px] font-semibold text-ink">{r.title}</div>
        </div>
        <span className="text-[12.5px] font-semibold text-brand-600">Change</span>
      </button>
    );
  }