import {
  Gavel,
  Info
} from "lucide-react";
import { Card, Button, StatusBadge, SectionTitle } from "../../components/primitives";

export function ScoringPolicy() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <div className="mt-1 flex items-center gap-3">
              <h1 className="text-[30px] font-bold tracking-tight text-ink">Scoring Policy</h1>
              <StatusBadge tone="review">Draft v4.2</StatusBadge>
            </div>
            <div className="mt-1 text-[14px] text-muted">Effective 01 Sep 2026 · historic scores remain reproducible under prior versions</div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">Compare to v4.1</Button>
            <Button><Gavel className="size-4" /> Approve policy</Button>
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
          <Card className="p-5">
            <SectionTitle title="Evidence weights" />
            <div className="space-y-3">
              {[
                { t: "Verified Assessment", w: 30 },
                { t: "Verified Interview", w: 25 },
                { t: "Work Simulation", w: 22 },
                { t: "Employer Outcome", w: 15 },
                { t: "Credential", w: 6 },
                { t: "Candidate Claim", w: 2 },
              ].map((e) => (
                <div key={e.t} className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                  <span className="text-[13.5px] font-medium text-ink sm:w-40 sm:shrink-0">{e.t}</span>
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-line-soft">
                      <div className="h-full rounded-full bg-brand-500" style={{ width: `${(e.w / 30) * 100}%` }} />
                    </div>
                    <span className="w-9 shrink-0 text-right text-[13px] font-semibold tabular-nums text-ink">{e.w}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
  
          <div className="space-y-6">
            <Card className="p-5">
              <SectionTitle title="Confidence & decay" />
              <div className="space-y-3 text-[13.5px]">
                {[
                  { l: "High confidence threshold", v: "≥ 3 verified sources" },
                  { l: "Evidence freshness window", v: "12 months" },
                  { l: "Decay after window", v: "−5% / quarter" },
                  { l: "Expired evidence", v: "Excluded from score" },
                ].map((r) => (
                  <div
                    key={r.l}
                    className="flex flex-col gap-1 border-b border-line-soft pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                  >
                    <span className="text-muted">{r.l}</span>
                    <span className="font-semibold text-ink">{r.v}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="flex items-start gap-3 border-brand-200 bg-brand-50 p-4">
              <Info className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <p className="text-[13px] text-brand-800">
                Approving a new policy version never alters historic scores. Each score records the
                policy version used, so past decisions stay auditable and reproducible.
              </p>
            </Card>
          </div>
        </div>
      </div>
    );
  }