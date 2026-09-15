import { Button, Card, cx, StatusBadge } from "@/components/primitives";
import { ChevronRight, ShieldAlert } from "lucide-react";
import { useState } from "react";

export function Integrity() {
    const [open, setOpen] = useState(0);
    const cases = [
      { id: "INT-2841", cand: "Attempt #A-9921", signals: [{ n: "Rapid completion", v: "Completed in 34% of median time" }, { n: "Focus loss", v: "6 tab switches" }], risk: "Elevated", tone: "review" as const },
      { id: "INT-2839", cand: "Attempt #A-9918", signals: [{ n: "Paste events", v: "4 large pastes in open-text" }], risk: "Moderate", tone: "review" as const },
      { id: "INT-2835", cand: "Attempt #A-9902", signals: [{ n: "Answer similarity", v: "82% overlap with A-9714" }, { n: "Device / IP", v: "Shared IP with 2 attempts" }], risk: "High", tone: "flagged" as const },
    ];
    return (
      <div className="space-y-6">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">Neutral · human-reviewed</div>
          <h1 className="mt-1 text-[30px] font-bold tracking-tight text-ink">Integrity Review</h1>
          <p className="mt-1.5 max-w-2xl text-[14px] text-muted">
            Signals surface attempts that may warrant a closer look. They describe behaviour, not
            intent — a reviewer makes every determination. No biometric, emotion, or personality
            analysis is used.
          </p>
        </div>
  
        <div className="space-y-3">
          {cases.map((c, i) => (
            <Card key={c.id} className="overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-brand-50/40 min-[460px]:items-center min-[460px]:gap-4 min-[460px]:px-5"
              >
                <ShieldAlert
                  className={cx(
                    "mt-0.5 size-5 shrink-0 min-[460px]:mt-0",
                    c.tone === "flagged" ? "text-[#b5443a]" : "text-[#8f5a14]",
                  )}
                />
                <div className="flex min-w-0 flex-1 flex-col gap-2 min-[460px]:flex-row min-[460px]:items-center min-[460px]:justify-between min-[460px]:gap-4">
                  <div className="min-w-0">
                    <div className="flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                      <span className="font-mono text-[12.5px] font-medium text-muted">{c.id}</span>
                      <span className="text-[14.5px] font-semibold text-ink">{c.cand}</span>
                    </div>
                    <div className="mt-0.5 text-[13px] text-muted">
                      {c.signals.length} risk signal{c.signals.length !== 1 && "s"} detected
                    </div>
                  </div>
                  <div className="shrink-0 self-start min-[460px]:self-auto">
                    <StatusBadge tone={c.tone}>{c.risk} risk</StatusBadge>
                  </div>
                </div>
                <ChevronRight
                  className={cx(
                    "mt-1 size-4 shrink-0 self-center text-faint transition-transform min-[460px]:mt-0",
                    open === i && "rotate-90",
                  )}
                />
              </button>
              {open === i && (
                <div className="border-t border-line-soft bg-raised px-5 py-4">
                  <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                    {c.signals.map((s) => (
                      <div key={s.n} className="rounded-[10px] border border-line bg-surface p-3.5">
                        <div className="text-[13px] font-semibold text-ink">{s.n}</div>
                        <div className="mt-0.5 text-[13px] text-muted">{s.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-col sm:items-center gap-2 sm:flex-row">
                    <Button variant="secondary" size="sm">Request re-attempt</Button>
                    <Button variant="secondary" size="sm">Dismiss signal</Button>
                    <Button size="sm">Assign to reviewer</Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    );
  }