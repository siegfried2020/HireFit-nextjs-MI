import { Button } from "@/components/primitives";
import { InlineHint, PageHead } from "../EmployerShared/EmployerShared";
import { Stage, useEmployer } from "../employerStore";
import { ChevronRight, SearchIcon } from "lucide-react";

export function Pipeline({ go }: { go: (r: string) => void }) {
    const emp = useEmployer();
    const empty = emp.pipeline.length === 0;
  
    const stages: { name: Stage; tone: "neutral" | "published" | "verified" | "review" | "revoked" }[] = [
      { name: "Invited",          tone: "neutral" },
      { name: "Assessment",       tone: "published" },
      { name: "Interviewing",     tone: "published" },
      { name: "Shortlisted",      tone: "verified" },
      { name: "Decision",         tone: "review" },
      { name: "Hired",            tone: "verified" },
      { name: "Outcome Tracking", tone: "verified" },
    ];
  
    const open = (id: string) => {
      emp.selectCandidate(id, "pipeline");
      go("candidate");
    };
  
    return (
      <div className="flex h-full flex-col space-y-4">
        <PageHead
          eyebrow="Human-driven"
          title="Hiring Pipeline"
          sub={`${emp.activeRole?.title ?? "No active role"} · every stage change is attributed to a person`}
          actions={
            <Button variant="secondary" onClick={() => go(emp.publishedRoles.length ? "search" : "job-dna")}>
              <SearchIcon className="size-4" /> Find talent
            </Button>
          }
        />
  
        {empty && (
          <InlineHint>Candidates added from Talent Search will appear here.</InlineHint>
        )}

        <div className="flex items-center justify-between gap-2 rounded-[10px] border border-line bg-raised px-3 py-2 text-[12px] font-medium text-muted md:hidden">
          <span>Swipe sideways to see all stages</span>
          <span className="inline-flex items-center gap-0.5 font-semibold text-brand-600">
            Scroll
            <ChevronRight className="size-3.5" />
            <ChevronRight className="-ml-2 size-3.5 opacity-60" />
          </span>
        </div>
  
        <div className="relative min-h-0 flex-1">
          <div className="h-full overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]">
            <div className="grid min-w-[1040px] grid-cols-7 gap-3 pb-1">
              {stages.map((st) => {
                const cards = emp.pipeline.filter((p) => p.stage === st.name);
                return (
                  <div key={st.name} className="flex flex-col rounded-[12px] bg-line-soft/50 p-2.5">
                    <div className="mb-2.5 flex items-center justify-between px-1">
                      <span className="text-[12.5px] font-bold text-ink">{st.name}</span>
                      <span className="rounded-full bg-surface px-2 py-0.5 text-[11.5px] font-semibold text-muted">
                        {cards.length}
                      </span>
                    </div>
                    <div className="space-y-2 overflow-y-auto">
                      {cards.map((p) => {
                        const c = emp.candidates.find((x) => x.id === p.candidateId)!;
                        return (
                          <button
                            key={p.candidateId}
                            onClick={() => open(p.candidateId)}
                            className="w-full rounded-[10px] border border-line bg-surface p-2.5 text-left shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-raised)]"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex min-w-0 items-center gap-2">
                                <div className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-700">
                                  {c.initials}
                                </div>
                                <span className="truncate text-[12.5px] font-semibold text-ink">{c.name}</span>
                              </div>
                              <span className="shrink-0 text-[12px] font-bold tabular-nums text-brand-600">{c.match}%</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-canvas to-transparent md:hidden"
            aria-hidden
          />
        </div>
        <p className="text-[12.5px] text-faint">
          Candidates are never auto-rejected. Moving a candidate to a closing stage requires a
          documented reason from the acting user.
        </p>
      </div>
    );
  }