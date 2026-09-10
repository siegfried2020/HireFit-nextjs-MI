/* ============================================================ PASSPORT */

import { Button, Card, SectionTitle, StatusBadge } from "@/components/primitives";
import { Award, Share2, ShieldCheck } from "lucide-react";

export function Passport() {
    return (
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">
              Verified credential
            </div>
            <h1 className="mt-1 text-[30px] font-bold tracking-tight text-ink">Talent Passport</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary"><Share2 className="size-4" /> Share</Button>
            <Button><Award className="size-4" /> Re-issue</Button>
          </div>
        </div>
  
        <div className="grid grid-cols-[1fr_320px] gap-6 max-lg:grid-cols-1">
          {/* passport card */}
          <div className="overflow-hidden rounded-[16px] border border-brand-700 bg-brand-800 text-white shadow-[var(--shadow-raised)]">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-7 py-6">
              <div>
                <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-200">
                  <ShieldCheck className="size-4" /> HireFit Verified Talent Passport
                </div>
                <h2 className="mt-3 text-[24px] font-bold tracking-tight">Layla Al-Otaibi</h2>
                <div className="text-[14px] text-brand-100">QA Automation Engineer</div>
              </div>
              <div className="rounded-[10px] border border-white/15 bg-white/5 p-2">
                <div className="grid size-16 place-items-center rounded-[6px] bg-white/90">
                  <div
                    className="size-14"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg,#211d60 0,#211d60 2px,transparent 2px,transparent 4px)",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 px-7 py-6">
              <div>
                <div className="text-[11px] uppercase tracking-wide text-brand-200">Readiness</div>
                <div className="mt-1 text-[24px] font-bold tabular-nums">82%</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wide text-brand-200">Confidence</div>
                <div className="mt-1 text-[24px] font-bold">High</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wide text-brand-200">Verified skills</div>
                <div className="mt-1 text-[24px] font-bold tabular-nums">9</div>
              </div>
            </div>
            <div className="px-7 pb-6">
              <div className="text-[11px] uppercase tracking-wide text-brand-200">Verified skills</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["API Testing", "Playwright / E2E", "CI/CD Pipelines", "Test Strategy", "SQL"].map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/15 bg-white/8 px-2.5 py-1 text-[12px] font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 px-7 py-4 text-[12px] text-brand-100">
              <span>Verification ID · TIE-KSA-2026-8F3A21</span>
              <span>Issued 14 Aug 2026 · Expires 14 Feb 2027</span>
            </div>
          </div>
  
          <div className="space-y-4">
            <Card className="p-5">
              <SectionTitle title="Passport status" />
              <div className="space-y-3">
                {[
                  { l: "Verification state", v: <StatusBadge tone="verified">Verified</StatusBadge> },
                  { l: "Employer visibility", v: <StatusBadge tone="published">Visible</StatusBadge> },
                  { l: "Public page", v: <StatusBadge tone="neutral">Private</StatusBadge> },
                ].map((r) => (
                  <div key={r.l} className="flex items-center justify-between">
                    <span className="text-[13.5px] text-muted">{r.l}</span>
                    {r.v}
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-5">
              <SectionTitle title="Controls" />
              <div className="space-y-2">
                <Button variant="secondary" className="w-full justify-start">
                  Employer visibility settings
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  Expiration settings
                </Button>
                <button className="mt-1 w-full rounded-[9px] px-4 py-2.5 text-left text-[14px] font-semibold text-[#b5443a] transition-colors hover:bg-[#fbeceb]">
                  Revoke passport
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  