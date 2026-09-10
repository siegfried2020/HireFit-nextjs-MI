import { Button, Card, Confidence, cx, StatusBadge } from "@/components/primitives";
import { MapPin } from "lucide-react";

export function JobMatches() {
    const jobs = [
      {
        role: "Senior QA Automation Engineer",
        co: "Jahez",
        loc: "Riyadh · Hybrid",
        match: 89,
        conf: "High" as const,
        strong: ["Playwright / E2E", "API Testing", "SQL"],
        gap: ["Performance Testing"],
        saudi: true,
      },
      {
        role: "SDET — Platform Engineering",
        co: "STC Solutions",
        loc: "Riyadh · On-site",
        match: 84,
        conf: "High" as const,
        strong: ["API Testing", "CI/CD Pipelines"],
        gap: ["Test Strategy"],
        saudi: true,
      },
      {
        role: "QA Engineer",
        co: "Tamara",
        loc: "Remote · KSA",
        match: 78,
        conf: "Medium" as const,
        strong: ["Playwright / E2E"],
        gap: ["Performance Testing", "SQL"],
        saudi: false,
      },
    ];
    return (
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">
              Capability-aligned
            </div>
            <h1 className="mt-1 text-[30px] font-bold tracking-tight text-ink">Job Matches</h1>
          </div>
          <div className="flex gap-2">
            {["All roles", "Saved", "Applied"].map((t, i) => (
              <button
                key={t}
                className={cx(
                  "rounded-[8px] px-3 py-1.5 text-[13px] font-semibold transition-colors",
                  i === 0 ? "bg-brand-500 text-white" : "border border-line bg-surface text-ink-soft hover:bg-canvas",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
  
        <div className="space-y-4">
          {jobs.map((j) => (
            <Card key={j.role} className="p-5 transition-shadow hover:shadow-[var(--shadow-raised)]">
              <div className="flex gap-5 max-md:flex-col">
                <div className="flex min-w-0 flex-1 gap-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-[11px] bg-brand-100 text-[15px] font-bold text-brand-700">
                    {j.co.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[16px] font-bold text-ink">{j.role}</h3>
                      {j.saudi && <StatusBadge tone="published">National Talent</StatusBadge>}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[13.5px] text-muted">
                      <span className="font-medium text-ink-soft">{j.co}</span>
                      <span>·</span>
                      <MapPin className="size-3.5" /> {j.loc}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-4">
                      <div>
                        <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#276c4f]">
                          Strong match
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {j.strong.map((s) => (
                            <span
                              key={s}
                              className="rounded-full bg-[#e7f2ec] px-2.5 py-0.5 text-[12px] font-medium text-[#276c4f]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8f5a14]">
                          Gap
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {j.gap.map((s) => (
                            <span
                              key={s}
                              className="rounded-full bg-[#fbf1e2] px-2.5 py-0.5 text-[12px] font-medium text-[#8f5a14]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between gap-3 border-l border-line-soft pl-5 max-md:flex-row max-md:items-center max-md:border-l-0 max-md:border-t max-md:pl-0 max-md:pt-4">
                  <div className="text-right max-md:text-left">
                    <div className="text-[30px] font-bold leading-none tabular-nums text-brand-600">
                      {j.match}%
                    </div>
                    <div className="mt-1 text-[12px] text-faint">match</div>
                    <div className="mt-1.5">
                      <Confidence level={j.conf} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">Save</Button>
                    <Button size="sm">Why you match</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }