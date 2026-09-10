import { Button, Card, Confidence, ScoreRing, SectionTitle, StatusBadge } from "@/components/primitives";
import { ChevronRight, ClipboardCheck, Mic, Sparkles, TrendingUp } from "lucide-react";

export function CandidateDashboard({ go }: { go: (r: string) => void }) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-6">
          <div>
            <div className="text-[12.5px] font-medium text-muted">Good morning, Layla</div>
            <h1 className="text-[22px] font-bold tracking-tight text-ink">
              You&rsquo;re building toward QA Automation Engineer
            </h1>
          </div>
          <Button onClick={() => go("readiness")} className="max-md:hidden">
            <TrendingUp className="size-4" /> View readiness plan
          </Button>
        </div>
  
        {/* Primary status band */}
        <Card className="overflow-hidden">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] divide-x divide-line max-lg:grid-cols-1 max-lg:divide-x-0 max-lg:divide-y">
            <div className="flex items-center gap-4 p-4">
              <ScoreRing value={82} size={68} stroke={7} label="Ready" />
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-faint">Role Readiness</div>
                <div className="mt-0.5 text-[16px] font-bold text-ink">QA Automation Engineer</div>
                <div className="mt-1.5 flex items-center gap-2">
                  <Confidence level="High" />
                  <span className="text-[12.5px] font-medium text-[#2e7d5b]">· Top 12%</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2 p-4">
              <div className="flex items-center justify-between text-[12.5px]">
                <span className="text-muted">Evidence completion</span>
                <span className="font-semibold tabular-nums text-ink">74%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-line-soft">
                <div className="h-full rounded-full bg-brand-500" style={{ width: "74%" }} />
              </div>
              <div className="flex items-center justify-between text-[12.5px]">
                <span className="text-muted">Profile strength</span>
                <span className="font-semibold tabular-nums text-ink">Strong</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-line-soft">
                <div className="h-full rounded-full bg-[#2e7d5b]" style={{ width: "88%" }} />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-1.5 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-faint">Talent Passport</div>
              <StatusBadge tone="verified">Issued &amp; Verified</StatusBadge>
              <div className="text-[12.5px] text-muted">
                Valid until <span className="font-medium text-ink">14 Feb 2027</span>
              </div>
              <button
                onClick={() => go("passport")}
                className="inline-flex w-fit items-center gap-1 text-[12.5px] font-semibold text-brand-600 hover:text-brand-700"
              >
                Manage <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        </Card>
  
        {/* Next best action */}
        <Card className="flex items-center gap-3.5 border-brand-200 bg-brand-50 p-4">
          <div className="grid size-10 shrink-0 place-items-center rounded-[11px] bg-brand-500 text-white">
            <Sparkles className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">Next recommended action</div>
            <div className="text-[14.5px] font-semibold text-ink">
              Complete the Performance Testing assessment to close your highest-impact gap
            </div>
            <div className="text-[12.5px] text-brand-700/80">Estimated +6% readiness · creates verified evidence</div>
          </div>
          <Button>Start assessment</Button>
        </Card>
  
        {/* Three compact columns */}
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
          {/* Top gaps */}
          <Card className="p-4">
            <SectionTitle
              title="Top skill gaps"
              action={<button onClick={() => go("readiness")} className="text-[13px] font-semibold text-brand-600 hover:text-brand-700">See all</button>}
            />
            <div className="space-y-2">
              {[
                { s: "Performance Testing", to: "Intermediate", impact: "+6%" },
                { s: "CI/CD Pipelines", to: "Advanced", impact: "+4%" },
                { s: "Test Strategy", to: "Advanced", impact: "+3%" },
              ].map((g) => (
                <div key={g.s} className="flex items-center justify-between gap-3 rounded-[9px] border border-line-soft bg-raised px-3 py-2">
                  <div className="min-w-0">
                    <div className="truncate text-[13.5px] font-semibold text-ink">{g.s}</div>
                    <div className="text-[12px] text-muted">→ {g.to}</div>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#e7f2ec] px-2 py-0.5 text-[12px] font-bold text-[#276c4f]">{g.impact}</span>
                </div>
              ))}
            </div>
          </Card>
  
          {/* Job matches */}
          <Card className="p-4">
            <SectionTitle
              title="Job matches"
              action={<button onClick={() => go("jobs")} className="text-[13px] font-semibold text-brand-600 hover:text-brand-700">View all</button>}
            />
            <div className="divide-y divide-line-soft">
              {[
                { role: "Senior QA Automation Engineer", co: "Jahez", match: 89 },
                { role: "SDET — Platform", co: "STC Solutions", match: 84 },
                { role: "QA Engineer", co: "Tamara", match: 78 },
              ].map((j) => (
                <button
                  key={j.role}
                  onClick={() => go("jobs")}
                  className="flex w-full items-center gap-3 py-2 text-left transition-colors first:pt-0 last:pb-0 hover:bg-line-soft/60"
                >
                  <div className="grid size-8 shrink-0 place-items-center rounded-[8px] bg-brand-100 text-[11px] font-bold text-brand-700">{j.co.slice(0, 2)}</div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-semibold text-ink">{j.role}</div>
                    <div className="truncate text-[12px] text-muted">{j.co}</div>
                  </div>
                  <span className="text-[14px] font-bold tabular-nums text-brand-600">{j.match}%</span>
                </button>
              ))}
            </div>
          </Card>
  
          {/* Upcoming */}
          <Card className="p-4">
            <SectionTitle title="Upcoming" />
            <div className="space-y-3">
              {[
                { icon: ClipboardCheck, t: "Performance Testing Assessment", d: "Due in 3 days" },
                { icon: Mic, t: "Verified AI Interview", d: "2 Sep · 10:00" },
              ].map((u) => (
                <div key={u.t} className="flex gap-2.5">
                  <div className="grid size-8 shrink-0 place-items-center rounded-[8px] bg-brand-50 text-brand-600">
                    <u.icon className="size-[16px]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold text-ink">{u.t}</div>
                    <div className="text-[12px] text-muted">{u.d}</div>
                  </div>
                </div>
              ))}
              <button className="flex w-full items-center gap-2.5 rounded-[9px] border border-dashed border-line px-3 py-2 text-left text-[12.5px] font-medium text-muted transition-colors hover:border-brand-200 hover:text-brand-600">
                <Mic className="size-4" /> Start Voice Career Discovery
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }