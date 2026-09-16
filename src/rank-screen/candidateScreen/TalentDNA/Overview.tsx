import {
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Building2,
  MapPin,
} from "lucide-react";
import {
  Card,
  Button,
  Confidence,
  ScoreRing,
  cx,
} from "../../../components/primitives";
import type { ProfileIdentity, TargetRole, Skill } from "./types";
import { BUILD_STEPS } from "./types";

export function GettingStarted({
  doneIds,
  onAction,
}: {
  doneIds: string[];
  onAction: (id: string) => void;
}) {
  const doneCount = doneIds.length;
  return (
    <Card className="overflow-hidden border-brand-200">
      <div className="flex flex-col gap-3 border-b border-brand-100 bg-brand-50 px-5 py-3.5 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between min-[480px]:gap-4">
        <div className="flex min-w-0 items-start gap-3 min-[480px]:items-center">
          <div className="grid size-8 shrink-0 place-items-center rounded-[9px] bg-brand-500 text-white">
            <Sparkles className="size-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[13.5px] font-bold text-ink">Build your Talent DNA</div>
            <div className="text-[12px] text-brand-700/80">
              Complete these steps to evidence your skills and unlock verified role matches
            </div>
          </div>
        </div>
        <div className="shrink-0 self-start rounded-full bg-brand-100 px-3 py-1 text-[12px] font-semibold text-brand-700 min-[480px]:self-auto">
          {doneCount} of {BUILD_STEPS.length} done
        </div>
      </div>
      <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
        {BUILD_STEPS.map((step) => {
          const done = doneIds.includes(step.id);
          return (
            <button
              key={step.id}
              onClick={() => !done && onAction(step.id)}
              className={cx(
                "group flex flex-col items-start gap-2 p-4 text-left transition-colors",
                done ? "cursor-default opacity-60" : "hover:bg-brand-50/50",
              )}
            >
              <div
                className={cx(
                  "grid size-8 place-items-center rounded-[9px]",
                  done
                    ? "bg-[#e7f2ec] text-[#276c4f]"
                    : "bg-brand-100 text-brand-600 group-hover:bg-brand-200",
                )}
              >
                {done ? <ShieldCheck className="size-4" /> : <step.Icon className="size-4" />}
              </div>
              <div>
                <div
                  className={cx(
                    "text-[13px] font-semibold",
                    done ? "text-muted line-through" : "text-ink",
                  )}
                >
                  {step.label}
                </div>
                <div className="text-[11.5px] text-muted">{step.desc}</div>
              </div>
              {!done && (
                <span className="mt-auto inline-flex items-center gap-1 rounded-[7px] bg-brand-500 px-2.5 py-1.5 text-[12px] font-semibold text-white transition-colors group-hover:bg-brand-600">
                  Start <ChevronRight className="size-3.5" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function ProfileCard({ data, isNew }: { data: ProfileIdentity; isNew: boolean }) {
  const VISIBILITY_LABEL: Record<ProfileIdentity["visibility"], string> = {
    private: "Profile is private",
    matched: "Visible to matched employers",
    open: "Open to verified employers",
  };

  if (isNew || !data.name) {
    return (
      <Card className="p-5">
        <div className="mb-4 flex flex-col gap-3 min-[450px]:flex-row min-[450px]:items-center min-[450px]:justify-between">
          <h3 className="text-[15px] font-bold text-ink">Professional Identity</h3>
          <Button size="sm" variant="secondary" className="w-full min-[450px]:w-auto">
            + Complete profile
          </Button>
        </div>
        <div className="rounded-[10px] border border-dashed border-line bg-canvas p-6 text-center">
          <div className="text-[13.5px] font-semibold text-ink">Your profile is empty</div>
          <p className="mt-1 text-[12.5px] text-muted">
            Add your headline, current role, and location so employers can find you.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5">
      <div className="mb-4 flex flex-col gap-3 min-[450px]:flex-row min-[450px]:items-center min-[450px]:justify-between">
        <h3 className="text-[15px] font-bold text-ink">Professional Identity</h3>
        <Button size="sm" variant="ghost" className="w-full min-[450px]:w-auto">
          Edit
        </Button>
      </div>
      <div className="flex items-start gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-100 text-[16px] font-bold text-brand-700">
          {data.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[17px] font-bold text-ink">{data.name}</div>
          <div className="text-[13.5px] text-muted">{data.headline}</div>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-[12.5px] text-muted">
            <span className="flex items-center gap-1">
              <Building2 className="size-3.5 shrink-0" /> {data.currentRole} at {data.company}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5 shrink-0" /> {data.location}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {data.openToWork && (
              <span className="rounded-full border border-[#276c4f] px-2.5 py-0.5 text-[12px] font-semibold text-[#276c4f]">
                Open to Work
              </span>
            )}
            <span className="rounded-full bg-line-soft px-2.5 py-0.5 text-[12px] font-medium text-faint">
              {VISIBILITY_LABEL[data.visibility]}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function TargetRolesCard({
  roles, onViewReadiness, onAdd,
}: { roles: TargetRole[]; isNew?: boolean; onViewReadiness?: () => void; onAdd?: () => void }) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:items-start min-[480px]:justify-between min-[480px]:gap-4">
        <div className="min-w-0">
          <h3 className="text-[15px] font-bold text-ink">Target Roles</h3>
          <p className="mt-0.5 text-[12.5px] text-muted">
            Each target role has its own readiness score based on how your evidence matches that role.
          </p>
        </div>
        <Button size="sm" variant="secondary" className="w-full shrink-0 min-[480px]:w-auto" onClick={onAdd}>
          + Add role
        </Button>
      </div>
      {roles.length === 0 ? (
        <div className="rounded-[10px] border border-dashed border-line bg-canvas p-6 text-center">
          <div className="text-[13.5px] font-semibold text-ink">No target roles yet</div>
          <p className="mt-1 text-[12.5px] text-muted">
            Add a target role to see your readiness score and skill gaps.
          </p>
          <Button className="mt-4" size="sm" onClick={onAdd}>Add your first target role</Button>
        </div>
      ) : (
        <div className="space-y-3">
          {roles.map((role) => {
            const gaps = role.totalSkills - role.evidencedSkills;
            return (
              <div
                key={role.id}
                className="flex flex-col gap-3 rounded-[11px] border border-line bg-raised px-4 py-3.5 min-[480px]:flex-row min-[480px]:items-center min-[480px]:gap-4"
              >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <ScoreRing value={role.readiness} size={52} stroke={5} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-bold text-ink">{role.title}</div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-3 text-[12.5px] text-muted">
                      <Confidence level={role.conf} />
                      <span>{role.evidencedSkills}/{role.totalSkills} skills evidenced</span>
                      {gaps > 0 && (
                        <span className="text-[#8f5a14]">{gaps} gap{gaps > 1 ? "s" : ""}</span>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="w-full shrink-0 min-[480px]:w-auto" onClick={onViewReadiness}>
                  View readiness
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

export function Overview({
  profileData,
  isNew,
  targetRoles,
  doneSteps,
  verifiedCount,
  skills,
  onAddRole,
  onAddSkill,
  onViewSkills,
  onStepAction,
}: {
  profileData: ProfileIdentity;
  isNew: boolean;
  targetRoles: TargetRole[];
  doneSteps: string[];
  verifiedCount: number;
  skills: Skill[];
  onAddRole: () => void;
  onAddSkill: () => void;
  onViewSkills: () => void;
  onStepAction: (id: string) => void;
}) {
  return (
    <div className="space-y-5">
      <ProfileCard data={profileData} isNew={isNew} />
      <TargetRolesCard roles={targetRoles} isNew={isNew} onAdd={onAddRole} />
      {isNew && <GettingStarted doneIds={doneSteps} onAction={onStepAction} />}
      <Card className="flex flex-col gap-3 p-5 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between min-[480px]:gap-4">
        <div className="min-w-0">
          <div className="text-[13.5px] font-bold text-ink">Skills</div>
          <div className="mt-0.5 text-[12.5px] text-muted">
            {isNew
              ? "No skills added yet. Complete the steps above or add skills manually."
              : `${verifiedCount} verified · ${skills.filter((s) => s.state === "partial").length} partially verified · ${skills.length} total`
            }
          </div>
        </div>
        <Button
          size="sm"
          variant="secondary"
          className="w-full shrink-0 min-[480px]:w-auto"
          onClick={() => isNew ? onAddSkill() : onViewSkills()}
        >
          {isNew ? "Add Skills →" : "View all skills →"}
        </Button>
      </Card>
    </div>
  );
}
