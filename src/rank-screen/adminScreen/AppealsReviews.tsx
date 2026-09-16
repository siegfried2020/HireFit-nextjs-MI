import { Card, StatusBadge } from "@/components/primitives";
import { ChevronRight } from "lucide-react";

export function AppealsReviews() {
    return (
      <div className="space-y-6">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">Candidate-initiated · time-bound</div>
          <h1 className="mt-1 text-[30px] font-bold tracking-tight text-ink">Appeals &amp; Reviews</h1>
          <p className="mt-1.5 max-w-2xl text-[14px] text-muted">
            Candidates may appeal assessment outcomes within 30 days. Each appeal is reviewed independently.
          </p>
        </div>
  
        <Card className="overflow-hidden">
          <div className="flex items-center justify-end gap-1.5 border-b border-line bg-raised px-4 py-1.5 text-[11px] font-medium text-faint md:hidden">
            <span>Swipe to see more</span>
            <ChevronRight className="size-3.5" />
          </div>
          <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
            <div className="min-w-[720px]">
              <div className="grid grid-cols-[0.6fr_1.4fr_1fr_1fr_1fr_auto] gap-3 border-b border-line bg-raised px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-faint">
                <div>ID</div><div>Candidate</div><div>Assessment</div><div>Submitted</div><div>Status</div><div></div>
              </div>
              <div className="divide-y divide-line-soft">
                {[
                  { id: "APL-0041", cand: "Attempt #A-9921", assmt: "API Testing · Advanced", sub: "2 days ago", tone: "review" as const, status: "Under review" },
                  { id: "APL-0039", cand: "Attempt #A-9904", assmt: "Playwright · Intermediate", sub: "4 days ago", tone: "review" as const, status: "Awaiting evidence" },
                  { id: "APL-0037", cand: "Attempt #A-9891", assmt: "SQL · Intermediate", sub: "6 days ago", tone: "verified" as const, status: "Resolved · upheld" },
                ].map((a) => (
                  <div key={a.id} className="grid grid-cols-[0.6fr_1.4fr_1fr_1fr_1fr_auto] items-center gap-3 px-5 py-3.5 text-[13.5px] hover:bg-brand-50/40">
                    <span className="font-mono text-[12.5px] text-muted">{a.id}</span>
                    <span className="font-medium text-ink">{a.cand}</span>
                    <span className="text-muted">{a.assmt}</span>
                    <span className="text-muted">{a.sub}</span>
                    <StatusBadge tone={a.tone}>{a.status}</StatusBadge>
                    <ChevronRight className="size-4 shrink-0 text-faint" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }