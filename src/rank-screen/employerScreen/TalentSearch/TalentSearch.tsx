import { useState } from "react";
import {
  Bookmark,
  Search as SearchIcon,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  Card,
  Button,
} from "../../../components/primitives";
import {
  useEmployer,
} from "../employerStore";
import { InlineHint, PageHead } from "../EmployerShared/EmployerShared";
import { FilterGroup, HARD_FILTERS, SOFT_FILTERS } from "./FilterGroup";
import { ResultCard, SearchSkeleton } from "./ResultCard";

export function TalentSearch({ go }: { go: (r: string) => void }) {
  const emp = useEmployer();
  const [searching, setSearching] = useState(false);
  const [highOnly, setHighOnly] = useState(false);
  const [national, setNational] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const hasRole = emp.publishedRoles.length > 0;
  const role = emp.activeRole;

  const results = emp.candidates.filter(
    (c) => (!highOnly || c.conf === "High") && (!national || c.national),
  );

  const runSearch = () => {
    if (!hasRole) return;
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      emp.setSearchDone(true);
    }, 900);
  };

  const clearFilters = () => {
    setHighOnly(false);
    setNational(false);
    emp.setSearchDone(false);
  };

  return (
    <div className="flex h-full flex-col space-y-4">
      <PageHead
        eyebrow="Evidence-first"
        title="Talent Search"
        sub={hasRole ? `Matching against ${role?.title}` : "Publish a role to start matching"}
        actions={
          <Button
            variant={showFilters ? "secondary" : "primary"}
            onClick={() => setShowFilters((v) => !v)}
            className="w-full sm:w-auto"
          >
            {showFilters ? (
              <>
                <X className="size-4" /> Hide filter
              </>
            ) : (
              <>
                <SlidersHorizontal className="size-4" /> Filter
              </>
            )}
          </Button>
        }
      />

      <div
        className={
          showFilters
            ? "grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[268px_1fr]"
            : "flex min-h-0 flex-1 flex-col"
        }
      >
        {/* filters / criteria */}
        {showFilters && (
          <Card className="flex flex-col overflow-hidden p-0">
            <div className="space-y-2.5 border-b border-line bg-raised/60 p-3.5">
              <div>
                <div className="mb-1 text-[11.5px] font-semibold uppercase tracking-wide text-faint">Role</div>
                {hasRole ? (
                  <select
                    value={role?.id}
                    onChange={(e) => emp.setActiveRole(e.target.value)}
                    className="w-full rounded-[8px] border border-line bg-surface px-2.5 py-1.5 text-[13px] font-medium text-ink outline-none focus:border-brand-400"
                  >
                    {emp.publishedRoles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="rounded-[8px] border border-dashed border-line px-2.5 py-2 text-[12.5px] text-muted">
                    No published roles yet.
                  </div>
                )}
              </div>
              <Button className="w-full justify-center" disabled={!hasRole} onClick={runSearch}>
                <SearchIcon className="size-4" /> Search talent
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" className="flex-1 justify-center" onClick={clearFilters}>
                  Clear filters
                </Button>
                <Button variant="secondary" size="sm" className="flex-1 justify-center" disabled={!emp.searchDone}>
                  <Bookmark className="size-4" /> Save
                </Button>
              </div>
              {!hasRole && (
                <button onClick={() => go("job-dna")} className="w-full text-center text-[12.5px] font-semibold text-brand-600">
                  Create a role
                </button>
              )}
            </div>

            <div className="p-3.5">
              <div className="mb-3 flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#b5443a]" />
                <span className="text-[11.5px] font-bold uppercase tracking-wider text-ink">Hard Filters</span>
              </div>
              <p className="mb-3 text-[11px] text-faint">Must-match conditions. Candidates not meeting these are excluded.</p>
              <div className="space-y-3.5">
                {HARD_FILTERS.map((f) => (
                  <FilterGroup key={f.l} f={f} />
                ))}
                <div>
                  <div className="mb-1.5 text-[11.5px] font-semibold uppercase tracking-wide text-faint">Eligibility</div>
                  <label className="flex cursor-pointer items-center gap-2 text-[13px] font-medium text-ink-soft">
                    <input type="checkbox" checked={national} onChange={() => setNational((v) => !v)} className="size-3.5 accent-brand-500" />
                    National talent only
                  </label>
                </div>
              </div>

              <div className="mb-3 mt-5 flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-brand-500" />
                <span className="text-[11.5px] font-bold uppercase tracking-wider text-ink">Soft Criteria</span>
              </div>
              <p className="mb-3 text-[11px] text-faint">Influence ranking and match score. Candidates are not excluded.</p>
              <div className="space-y-3.5">
                {SOFT_FILTERS.map((f) => (
                  <FilterGroup key={f.l} f={f} />
                ))}
                <div>
                  <div className="mb-1.5 text-[11.5px] font-semibold uppercase tracking-wide text-faint">Confidence</div>
                  <label className="flex cursor-pointer items-center gap-2 text-[13px] text-ink-soft">
                    <input type="checkbox" checked={highOnly} onChange={() => setHighOnly((v) => !v)} className="size-3.5 accent-brand-500" />
                    High confidence only
                  </label>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* results area */}
        <div className="flex min-h-0 flex-col">
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="text-[13px] text-muted">
              {emp.searchDone && !searching ? (
                <><span className="font-bold text-ink">{results.length}</span> candidates matched</>
              ) : (
                "Results"
              )}
            </span>
            <select className="rounded-[8px] border border-line bg-surface px-2.5 py-1.5 text-[13px] font-medium text-ink-soft outline-none" disabled={!emp.searchDone}>
              <option>Sort: Match</option>
              <option>Sort: Confidence</option>
            </select>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto pr-0.5">
            {searching ? (
              <SearchSkeleton />
            ) : !emp.searchDone ? (
              <InlineHint>
                {hasRole
                  ? "Choose a role and search criteria, then run Search."
                  : "Publish a role first — then choose criteria and search verified talent."}
              </InlineHint>
            ) : results.length === 0 ? (
              <div className="rounded-[10px] border border-dashed border-line bg-raised/60 px-4 py-8 text-center">
                <div className="text-[14px] font-semibold text-ink">No candidates match these criteria</div>
                <div className="mt-3 flex justify-center gap-2">
                  <Button variant="secondary" size="sm" onClick={clearFilters}>
                    Clear filters
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => go("job-dna")}>
                    Edit criteria
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((c) => (
                  <ResultCard key={c.id} c={c} go={go} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
