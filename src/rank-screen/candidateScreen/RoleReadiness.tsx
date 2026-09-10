import { Card, Confidence, cx, ScoreRing } from "@/components/primitives";
import { ShieldCheck, TrendingUp } from "lucide-react";
import { useState } from "react";

export function RoleReadiness() {
    const [roleIdx, setRoleIdx] = useState(0);
  
    const roleOptions = [
      {
        title: "QA Automation Engineer",
        readiness: 82,
        conf: "High" as const,
        rows: [
          { skill: "API Testing",        req: "Advanced",     cand: "Advanced",     ev: 4, contrib: 22, gap: 0 },
          { skill: "Playwright / E2E",   req: "Advanced",     cand: "Advanced",     ev: 3, contrib: 20, gap: 0 },
          { skill: "Test Strategy",      req: "Advanced",     cand: "Intermediate", ev: 1, contrib: 12, gap: 1 },
          { skill: "CI/CD Pipelines",    req: "Advanced",     cand: "Intermediate", ev: 2, contrib: 11, gap: 1 },
          { skill: "SQL",                req: "Intermediate", cand: "Intermediate", ev: 2, contrib: 9,  gap: 0 },
          { skill: "Performance Testing",req: "Intermediate", cand: "Basic",        ev: 1, contrib: 8,  gap: 2 },
        ],
        oneSkillAway: "Improve Performance Testing",
        oneSkillBoost: "+6%",
        oneSkillDetail: "Basic → Intermediate",
      },
      {
        title: "SDET — Platform Engineering",
        readiness: 71,
        conf: "Medium" as const,
        rows: [
          { skill: "API Testing",        req: "Advanced",     cand: "Advanced",     ev: 4, contrib: 20, gap: 0 },
          { skill: "CI/CD Pipelines",    req: "Advanced",     cand: "Intermediate", ev: 2, contrib: 18, gap: 1 },
          { skill: "Playwright / E2E",   req: "Intermediate", cand: "Advanced",     ev: 3, contrib: 15, gap: 0 },
          { skill: "Performance Testing",req: "Advanced",     cand: "Basic",        ev: 1, contrib: 13, gap: 2 },
          { skill: "Test Strategy",      req: "Intermediate", cand: "Intermediate", ev: 1, contrib: 10, gap: 0 },
          { skill: "SQL",                req: "Basic",        cand: "Intermediate", ev: 2, contrib: 7,  gap: 0 },
        ],
        oneSkillAway: "Improve CI/CD Pipelines",
        oneSkillBoost: "+8%",
        oneSkillDetail: "Intermediate → Advanced",
      },
    ];
  
    const role = roleOptions[roleIdx];
  
    return (
      <div className="space-y-6">
        <div>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">
            Role readiness &middot; explainable score
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {roleOptions.map((r, i) => (
              <button
                key={r.title}
                onClick={() => setRoleIdx(i)}
                className={cx(
                  "rounded-[10px] border px-4 py-2 text-[14px] font-semibold transition-colors",
                  i === roleIdx
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-line bg-surface text-ink-soft hover:bg-canvas",
                )}
              >
                {r.title}
              </button>
            ))}
            <button className="rounded-[10px] border border-dashed border-line px-4 py-2 text-[14px] font-medium text-faint hover:border-brand-300 hover:text-brand-600">
              + Add target role
            </button>
          </div>
        </div>
  
        <div className="grid grid-cols-[320px_1fr] gap-6 max-lg:grid-cols-1">
          <Card className="flex flex-col items-center p-6 text-center">
            <ScoreRing value={role.readiness} size={132} stroke={10} />
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[15px] font-bold text-ink">{role.readiness}% Readiness</span>
            </div>
            <div className="mt-2">
              <Confidence level={role.conf} />
            </div>
            <p className="mt-4 max-w-[240px] text-[13px] leading-relaxed text-muted">
              Score reflects evidenced skill levels weighted by role importance. Confidence reflects
              the strength and freshness of that evidence &mdash; shown separately, never merged.
            </p>
            <div className="mt-5 w-full space-y-2 border-t border-line-soft pt-4 text-left">
              <div className="text-[12px] font-semibold uppercase tracking-wide text-faint">
                Strongest skills
              </div>
              {role.rows.filter((r) => r.gap === 0).slice(0, 2).map((r) => (
                <div key={r.skill} className="flex items-center gap-2 text-[13.5px] text-ink">
                  <ShieldCheck className="size-4 text-[#2e7d5b]" /> {r.skill}
                </div>
              ))}
            </div>
          </Card>
  
          <div className="space-y-6">
            <Card className="border-brand-200 bg-brand-50 p-5">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-brand-600">
                <TrendingUp className="size-4" /> One skill away
              </div>
              <div className="mt-2 flex items-end justify-between gap-4">
                <div>
                  <div className="text-[18px] font-bold text-ink">{role.oneSkillAway}</div>
                  <div className="text-[14px] text-brand-700/80">{role.oneSkillDetail}</div>
                </div>
                <div className="text-right">
                  <div className="text-[28px] font-bold tabular-nums text-brand-600">{role.oneSkillBoost}</div>
                  <div className="text-[12px] text-brand-700/70">potential readiness</div>
                </div>
              </div>
              <p className="mt-3 rounded-[9px] bg-surface/70 px-3 py-2 text-[13px] text-brand-800">
                Complete learning or practice, then re-assess to verify improvement. Learning alone does not
                change your score &mdash; new evidence does.
              </p>
            </Card>
  
            <Card className="overflow-hidden">
              <div className="grid grid-cols-[1.4fr_1fr_1fr_0.6fr_0.8fr_0.6fr] gap-3 border-b border-line bg-raised px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-faint">
                <div>Skill</div>
                <div>Required</div>
                <div>You</div>
                <div>Evidence</div>
                <div>Contribution</div>
                <div>Gap</div>
              </div>
              <div className="divide-y divide-line-soft">
                {role.rows.map((r) => (
                  <div
                    key={r.skill}
                    className="grid grid-cols-[1.4fr_1fr_1fr_0.6fr_0.8fr_0.6fr] items-center gap-3 px-5 py-3.5 text-[13.5px]"
                  >
                    <div className="font-semibold text-ink">{r.skill}</div>
                    <div className="text-muted">{r.req}</div>
                    <div className={cx("font-medium", r.gap > 0 ? "text-[#8f5a14]" : "text-ink")}>
                      {r.cand}
                    </div>
                    <div className="text-muted tabular-nums">{r.ev}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-14 overflow-hidden rounded-full bg-line-soft">
                          <div className="h-full rounded-full bg-brand-500" style={{ width: `${r.contrib * 4}%` }} />
                        </div>
                        <span className="tabular-nums text-muted">{r.contrib}%</span>
                      </div>
                    </div>
                    <div>
                      {r.gap === 0 ? (
                        <span className="text-[12px] font-semibold text-[#2e7d5b]">Met</span>
                      ) : (
                        <span className="rounded-full bg-[#fbf1e2] px-2 py-0.5 text-[12px] font-bold text-[#8f5a14]">
                          -{r.gap}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  