import {
  Users,
  Plus,
  Search as SearchIcon,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  Button,
  StatusBadge,
  SectionTitle,
  Stat,
  cx,
} from "../../components/primitives";
import {
  useEmployer,
  STAGES,
} from "./employerStore";
import { InlineHint, PageHead, STATUS_LABEL, STATUS_TONE } from "./EmployerShared/EmployerShared";

/* ============================================================ DASHBOARD */


export function EmployerDashboard({ go }: { go: (r: string) => void }) {
    const emp = useEmployer();
    const published = emp.publishedRoles.length;
    const drafts = emp.roles.filter((r) => r.status !== "published").length;
    const inPipeline = emp.pipeline.filter((p) => p.stage !== "Rejected").length;
    const decisions = emp.pipeline.filter((p) => p.stage === "Decision").length;
    const hired = emp.pipeline.filter((p) => p.stage === "Hired").length;
  
    const recent = emp.pipeline
      .flatMap((p) =>
        p.history.map((h) => ({
          who: h.by,
          stage: h.stage,
          cand: emp.candidates.find((c) => c.id === p.candidateId)?.name ?? "Candidate",
          at: h.at,
        })),
      )
      .slice(-4)
      .reverse();
  
    const nextActions = [
      emp.roles.length === 0 && { t: "Create your first role", r: "job-dna" },
      drafts > 0 && { t: "Finish and publish a draft role", r: "job-dna" },
      published > 0 && inPipeline === 0 && { t: "Search verified talent", r: "search" },
      decisions > 0 && { t: `Review ${decisions} pending decision${decisions > 1 ? "s" : ""}`, r: "pipeline" },
    ].filter(Boolean) as { t: string; r: string }[];
  
    return (
      <div className="space-y-4">
        <PageHead
          eyebrow={`${emp.workspace} · Talent workspace`}
          title="Recruitment intelligence"
          actions={
            <Button onClick={() => go("job-dna")}>
              <Plus className="size-4" /> New role
            </Button>
          }
        />
  
        <Card className="grid grid-cols-4 divide-x divide-line p-0 max-lg:grid-cols-2 max-lg:divide-x-0">
          {[
            { l: "Active roles", v: String(published), s: drafts ? `${drafts} in draft/review` : published ? "all live" : "none yet" },
            { l: "Candidates in pipeline", v: String(inPipeline), s: inPipeline ? "active" : "none yet" },
            { l: "Pending decisions", v: String(decisions), s: decisions ? "need review" : "none pending" },
            { l: "Hired", v: String(hired), s: hired ? "outcome tracking on" : "no hires yet" },
          ].map((k, i) => (
            <div key={k.l} className={cx("p-4", i >= 2 && "max-lg:border-t max-lg:border-line")}>
              <Stat label={k.l} value={k.v} sub={k.s} />
            </div>
          ))}
        </Card>
  
        <div className="grid grid-cols-[1.5fr_1fr] gap-4 max-lg:grid-cols-1">
          <div className="space-y-4">
            <Card className="p-4">
              <SectionTitle title="Your roles" eyebrow="Role definitions" action={<button onClick={() => go("job-dna")} className="text-[13px] font-semibold text-brand-600">Manage</button>} />
              {emp.roles.length === 0 ? (
                <InlineHint>
                  No roles yet.{" "}
                  <button onClick={() => go("job-dna")} className="font-semibold text-brand-600">
                    Create your first role
                  </button>{" "}
                  to begin hiring.
                </InlineHint>
              ) : (
                <div className="divide-y divide-line-soft">
                  {emp.roles.map((r) => (
                    <div key={r.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13.5px] font-semibold text-ink">{r.title}</div>
                        <div className="truncate text-[12px] text-muted">{r.family}</div>
                      </div>
                      <StatusBadge tone={STATUS_TONE[r.status]}>{STATUS_LABEL[r.status]}</StatusBadge>
                      {r.status === "published" ? (
                        <Button variant="quiet" size="sm" onClick={() => go("search")}>Search</Button>
                      ) : (
                        <Button variant="quiet" size="sm" onClick={() => go("job-dna")}>Open</Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
  
            <Card className="p-4">
              <SectionTitle title="Pipeline summary" action={<button onClick={() => go("pipeline")} className="text-[13px] font-semibold text-brand-600">Open pipeline</button>} />
              <div className="grid grid-cols-3 gap-2">
                {STAGES.map((s) => {
                  const n = emp.pipeline.filter((p) => p.stage === s).length;
                  return (
                    <div key={s} className="rounded-[10px] border border-line-soft bg-raised px-3 py-2">
                      <div className="text-[18px] font-bold tabular-nums text-ink">{n}</div>
                      <div className="text-[11.5px] text-muted">{s}</div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
  
          <div className="space-y-4">
            <Card className="p-4">
              <SectionTitle title="Next actions" />
              {nextActions.length === 0 ? (
                <p className="py-1 text-[13px] text-muted">You&rsquo;re all caught up.</p>
              ) : (
                <div className="space-y-2">
                  {nextActions.map((a) => (
                    <button
                      key={a.t}
                      onClick={() => go(a.r)}
                      className="flex w-full items-center gap-2.5 rounded-[9px] border border-line-soft bg-raised px-3 py-2 text-left transition-colors hover:border-brand-200"
                    >
                      <ArrowRight className="size-4 text-brand-500" />
                      <span className="flex-1 text-[13px] font-semibold text-ink">{a.t}</span>
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-3 flex flex-wrap gap-2 border-t border-line-soft pt-3">
                <Button variant="secondary" size="sm" onClick={() => go("job-dna")}><Plus className="size-4" /> Role</Button>
                <Button variant="secondary" size="sm" onClick={() => go("search")}><SearchIcon className="size-4" /> Search</Button>
                <Button variant="secondary" size="sm" onClick={() => go("pipeline")}><Users className="size-4" /> Pipeline</Button>
              </div>
            </Card>
  
            <Card className="p-4">
              <SectionTitle title="Recent activity" />
              {recent.length === 0 ? (
                <p className="py-1 text-[13px] text-muted">Activity from your team will appear here.</p>
              ) : (
                <div className="space-y-3">
                  {recent.map((x, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-700">
                        {x.who.slice(0, 2)}
                      </div>
                      <div className="text-[13px] leading-snug text-ink-soft">
                        <span className="font-semibold text-ink">{x.who}</span> moved{" "}
                        <span className="font-medium">{x.cand}</span> to {x.stage}
                        <div className="text-[11.5px] text-faint">{x.at}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    );
  }