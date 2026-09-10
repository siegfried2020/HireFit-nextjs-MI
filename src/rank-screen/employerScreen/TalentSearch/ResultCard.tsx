import { Button, Card, Confidence, ScoreRing, StatusBadge } from "@/components/primitives";
import { Candidate, useEmployer } from "../employerStore";
import { ShieldCheck } from "lucide-react";

const TAG_TONE = {
    "Recommended Match": "verified",
    "Strong Alignment": "published",
    "Needs Review": "review",
} as const;
  
export function ResultCard({ c, go }: { c: Candidate; go: (r: string) => void }) {
    const emp = useEmployer();
    const open = () => {
      emp.selectCandidate(c.id, "search");
      go("candidate");
    };
    const topSkills = c.skills.slice(0, 3);
    const gapList = c.gap ? [c.gap] : [];
    return (
      <Card className="p-4 transition-shadow hover:shadow-[var(--shadow-raised)]">
        <div className="flex items-start gap-4">
          <ScoreRing value={c.match} size={54} stroke={5} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <button onClick={open} className="text-[15px] font-bold text-ink hover:text-brand-600">
                {c.name}
              </button>
              <StatusBadge tone={TAG_TONE[c.tag]}>{c.tag}</StatusBadge>
              {c.passport === "verified" && <ShieldCheck className="size-4 text-[#2e7d5b]" />}
            </div>
            <div className="mt-2.5 flex flex-wrap gap-4">
              {topSkills.length > 0 && (
                <div>
                  <div className="mb-1 text-[10.5px] font-semibold uppercase tracking-wide text-[#276c4f]">
                    Top match reasons
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {topSkills.map((s) => (
                      <span key={s} className="rounded-full bg-[#e7f2ec] px-2 py-0.5 text-[11.5px] font-medium text-[#276c4f]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {gapList.length > 0 && (
                <div>
                  <div className="mb-1 text-[10.5px] font-semibold uppercase tracking-wide text-[#8f5a14]">
                    Top gaps
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {gapList.map((g) => (
                      <span key={g} className="rounded-full bg-[#fbf1e2] px-2 py-0.5 text-[11.5px] font-medium text-[#8f5a14]">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-3 border-l border-line-soft pl-5 max-md:hidden">
            <div className="text-center">
              <Confidence level={c.conf} />
              <div className="mt-1 text-[11px] text-faint">confidence</div>
            </div>
            <div className="text-center">
              <div className="text-[13px] font-semibold text-ink">{c.ev}</div>
              <div className="text-[11px] text-faint">evidence items</div>
            </div>
            <Button variant="secondary" size="sm" onClick={open}>
              View
            </Button>
          </div>
          <div className="max-md:block hidden">
            <Button variant="secondary" size="sm" onClick={open}>View</Button>
          </div>
        </div>
      </Card>
    );
}
  
export function SearchSkeleton() {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <Card key={i} className="flex items-center gap-4 p-4">
            <div className="size-14 shrink-0 animate-pulse rounded-full bg-line-soft" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-40 animate-pulse rounded bg-line-soft" />
              <div className="h-3 w-64 animate-pulse rounded bg-line-soft" />
            </div>
          </Card>
        ))}
      </div>
    );
}