import { ChevronRight } from "lucide-react";
import {
  Card,
  Button,
  StatusBadge,
  Confidence,
  SkillLevel,
  SectionTitle,
} from "../../../components/primitives";
import type { Skill } from "./types";
import { SKILL_STATE } from "./types";
import { GettingStarted } from "./Overview";

export function Skills({
  isNew,
  skills,
  families,
  doneSteps,
  onStepAction,
  onAddSkill,
  onSelectSkill,
  onOpenEvidenceFlow,
}: {
  isNew: boolean;
  skills: Skill[];
  families: string[];
  doneSteps: string[];
  onStepAction: (id: string) => void;
  onAddSkill: () => void;
  onSelectSkill: (skill: Skill) => void;
  onOpenEvidenceFlow: (skill: Skill) => void;
}) {
  return (
    <div className="space-y-5">
      {isNew && <GettingStarted doneIds={doneSteps} onAction={onStepAction} />}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-line bg-raised px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-faint">Legend</span>
          <span className="flex items-center gap-1.5 text-[12.5px]">
            <span className="h-1.5 w-5 rounded-full bg-brand-500" />
            <strong className="font-semibold text-ink">Evidenced</strong>
            <span className="text-faint">— backed by assessment, interview, or work sample</span>
          </span>
          <span className="flex items-center gap-1.5 text-[12.5px]">
            <span className="h-1.5 w-5 rounded-full bg-brand-200" />
            <strong className="font-semibold text-ink">Claimed only</strong>
            <span className="text-faint">— self-reported, not yet verified</span>
          </span>
          <span className="flex items-center gap-1.5 text-[12.5px] text-faint">
            <span className="h-1.5 w-5 rounded-full bg-line" /> Not reached
          </span>
        </div>
        <Button size="sm" variant="secondary" onClick={onAddSkill}>
          + Add Skill
        </Button>
      </div>
      {families.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-[14px] font-semibold text-ink">No skills added yet</div>
          <p className="mt-1 text-[12.5px] text-muted">
            Start the getting-started steps or add a skill manually to build your profile.
          </p>
          <Button className="mt-4" onClick={onAddSkill}>+ Add Skill</Button>
        </Card>
      )}
      {families.map((fam) => {
        const famSkills = skills.filter((s) => s.family === fam);
        return (
          <div key={fam}>
            <SectionTitle eyebrow="Skill family" title={fam} />
            <Card className="overflow-hidden">
              <div className="flex items-center justify-end gap-1.5 border-b border-line bg-raised px-4 py-1.5 text-[11px] font-medium text-faint md:hidden">
                <span>Swipe to see more</span>
                <ChevronRight className="size-3.5" />
              </div>
              <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
                <div className="min-w-[680px]">
                  <div className="grid grid-cols-[1.8fr_1.4fr_1fr_140px] gap-4 border-b border-line bg-raised px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-faint">
                    <div>Skill</div>
                    <div>Level</div>
                    <div>Confidence</div>
                    <div>Evidence</div>
                  </div>
                  <div className="divide-y divide-line-soft">
                    {famSkills.map((s) => {
                      const sc = SKILL_STATE[s.state];
                      const noEv = s.evidenced === "None" || s.evidenced === "";
                      return (
                        <div
                          key={s.name}
                          className="group grid grid-cols-[1.8fr_1.4fr_1fr_140px] items-center gap-4 px-5 py-4 transition-colors hover:bg-brand-50/40"
                        >
                          <div className="min-w-0">
                            <button onClick={() => onSelectSkill(s)} className="text-left">
                              <div className="text-[14.5px] font-semibold text-ink group-hover:text-brand-700">
                                {s.name}
                              </div>
                            </button>
                            <div className="mt-1">
                              <StatusBadge tone={sc.tone}>{sc.label}</StatusBadge>
                            </div>
                          </div>
                          <button onClick={() => onSelectSkill(s)} className="min-w-0 text-left">
                            <SkillLevel claimed={s.claimed} evidenced={noEv ? undefined : s.evidenced} />
                            <div className="mt-1.5 text-[12px] text-muted">
                              {noEv
                                ? <><span>Claimed </span><span className="font-medium text-ink">{s.claimed}</span></>
                                : s.claimed === s.evidenced
                                  ? <><span>Evidenced </span><span className="font-medium text-ink">{s.evidenced}</span></>
                                  : <><span>Claimed {s.claimed} &middot; Evidenced </span><span className="font-medium text-ink">{s.evidenced}</span></>
                              }
                            </div>
                          </button>
                          <div>
                            <Confidence level={s.conf} />
                          </div>
                          <div className="flex items-center gap-1.5">
                            {s.state === "none" || s.state === "claimed" ? (
                              <button
                                onClick={() => onOpenEvidenceFlow(s)}
                                className="rounded-[7px] border border-brand-200 bg-brand-50 px-2.5 py-1 text-[12px] font-semibold text-brand-700 transition-colors hover:bg-brand-100"
                              >
                                Add evidence
                              </button>
                            ) : (
                              <button
                                onClick={() => onSelectSkill(s)}
                                className="rounded-[7px] px-2.5 py-1 text-[12px] font-semibold text-muted transition-colors hover:bg-line-soft hover:text-ink"
                              >
                                View
                              </button>
                            )}
                            <ChevronRight
                              className="size-4 shrink-0 cursor-pointer text-faint"
                              onClick={() => onSelectSkill(s)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
