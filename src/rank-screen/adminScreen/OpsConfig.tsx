import { Card, SectionTitle } from "@/components/primitives";

export function OpsConfig() {
    return (
      <div className="space-y-6">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">Platform configuration</div>
          <h1 className="mt-1 text-[30px] font-bold tracking-tight text-ink">Configuration</h1>
        </div>
        <Card className="p-5">
          <SectionTitle title="General settings" />
          <div className="space-y-4 text-[13.5px]">
            {[
              { l: "Assessment window (days)", v: "30" },
              { l: "Appeal deadline (days)", v: "30" },
              { l: "Evidence freshness window", v: "12 months" },
              { l: "Scoring policy version", v: "v4.2 (draft)" },
            ].map((r) => (
              <div key={r.l} className="flex items-center justify-between border-b border-line-soft pb-4 last:border-0 last:pb-0">
                <span className="text-muted">{r.l}</span>
                <span className="font-semibold text-ink">{r.v}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }