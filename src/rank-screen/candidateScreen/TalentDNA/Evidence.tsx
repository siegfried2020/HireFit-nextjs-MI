import { ShieldCheck } from "lucide-react";
import {
  Card,
  StatusBadge,
  SectionTitle,
  cx,
} from "../../../components/primitives";
import type { Skill, EvidenceItem } from "./types";
import { EV_STATE, EVIDENCE_COLORS } from "./types";

export function Evidence({ skills }: { skills: Skill[] }) {
  const allEvidence = skills.flatMap((s) =>
    s.evidence.map((e) => ({ ...e, skillName: s.name })),
  );
  const byType: Record<string, (EvidenceItem & { skillName: string })[]> = {};
  allEvidence.forEach((e) => {
    byType[e.type] = byType[e.type] ?? [];
    byType[e.type].push(e);
  });
  const ORDER = ["Assessment", "Interview", "Work Simulation", "Resume", "Portfolio", "Employer Outcome", "Candidate Claim"];
  const types = ORDER.filter((t) => byType[t]?.length > 0);

  if (types.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="mx-auto mb-3 grid size-14 place-items-center rounded-full bg-brand-50 text-brand-600">
          <ShieldCheck className="size-7" />
        </div>
        <div className="text-[15px] font-bold text-ink">No evidence collected yet</div>
        <p className="mx-auto mt-1 max-w-[320px] text-[13px] text-muted">
          Complete Voice Discovery, upload your resume, or take an assessment to start building evidence for your skills.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {types.map((type) => (
        <div key={type}>
          <SectionTitle eyebrow="Evidence type" title={type} />
          <Card className="overflow-hidden">
            <div className="divide-y divide-line-soft">
              {byType[type].map((e, i) => {
                const ev = EV_STATE[e.state];
                return (
                  <div
                    key={i}
                    className="flex flex-col gap-2.5 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4 sm:px-5"
                  >
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <span
                        className={cx(
                          "shrink-0 rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold",
                          EVIDENCE_COLORS[e.type] ?? "bg-line text-muted",
                        )}
                      >
                        {e.type}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13.5px] font-semibold leading-snug text-ink">{e.label}</div>
                        <div className="mt-0.5 text-[12px] text-muted">
                          Skill: {e.skillName} · {e.date}
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 self-start sm:self-auto">
                      <StatusBadge tone={ev.tone}>{ev.label}</StatusBadge>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
