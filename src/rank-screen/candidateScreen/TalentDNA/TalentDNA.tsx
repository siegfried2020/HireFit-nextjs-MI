import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cx } from "../../../components/primitives";
import type { Skill, ProfileIdentity, TargetRole, DnaTab, ActiveFlow, EvidenceItem } from "./types";
import { DNA_TABS } from "./types";
import {
  SKILLS_FULL,
  SKILLS_NEW,
  PROFILE_NEW_DATA,
  PROFILE_FULL_DATA,
  TARGET_ROLES_FULL,
  SKILL_TAXONOMY,
} from "./data";
import { Overview } from "./Overview";
import { Skills } from "./Skills";
import { Experience } from "./Experience";
import { Evidence } from "./Evidence";
import { Settings } from "./Settings";
import {
  SkillPanel,
  SelectEvidenceType,
  ResumeFlow,
  AssessmentFlow,
  InterviewFlow,
  WorkSampleFlow,
  ManualClaimFlow,
  AddSkillModal,
  EditClaimModal,
  VoiceDiscoveryModal,
  AddTargetRoleModal,
} from "./flows";

export function TalentDNA() {
  const [profile, setProfile] = useState<"new" | "returning">("new");
  const [tab, setTab] = useState<DnaTab>("overview");
  const [skillsNew, setSkillsNew] = useState<Skill[]>(SKILLS_NEW);
  const [skillsFull, setSkillsFull] = useState<Skill[]>(SKILLS_FULL);
  const [profileNew, setProfileNew] = useState<ProfileIdentity>(PROFILE_NEW_DATA);
  const [profileFull, setProfileFull] = useState<ProfileIdentity>(PROFILE_FULL_DATA);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [flow, setFlow] = useState<ActiveFlow>(null);
  const [doneSteps, setDoneSteps] = useState<string[]>([]);

  const [targetRolesNew, setTargetRolesNew] = useState<TargetRole[]>([]);
  const [targetRolesFull, setTargetRolesFull] = useState<TargetRole[]>(TARGET_ROLES_FULL);

  const isNew = profile === "new";
  const skills = isNew ? skillsNew : skillsFull;
  const setSkills = isNew ? setSkillsNew : setSkillsFull;
  const profileData = isNew ? profileNew : profileFull;
  const setProfileData = isNew ? setProfileNew : setProfileFull;
  const families = [...new Set(skills.map((s) => s.family))];
  const verifiedCount = skills.filter((s) => s.state === "verified").length;
  const targetRoles = isNew ? targetRolesNew : targetRolesFull;
  function setTargetRoles(updater: (prev: TargetRole[]) => TargetRole[]) {
    if (isNew) setTargetRolesNew(updater);
    else setTargetRolesFull(updater);
  }

  function applyEvidence(skillName: string, ev: EvidenceItem) {
    setSkills((prev) =>
      prev.map((s) =>
        s.name === skillName
          ? {
              ...s,
              evidence: [...s.evidence, ev],
              count: s.count + 1,
              state: s.state === "none" || s.state === "claimed" ? "partial" : s.state,
              evidenced: s.evidenced === "None" ? "Basic" : s.evidenced,
              conf: s.count === 0 ? "Low" : s.count === 1 ? "Medium" : "High",
            }
          : s,
      ),
    );
    setSelectedSkill((prev) =>
      prev?.name === skillName
        ? {
            ...prev,
            evidence: [...prev.evidence, ev],
            count: prev.count + 1,
            state: prev.state === "none" || prev.state === "claimed" ? "partial" : prev.state,
            evidenced: prev.evidenced === "None" ? "Basic" : prev.evidenced,
          }
        : prev,
    );
  }

  function updateClaim(skillName: string, newLevel: string) {
    setSkills((prev) =>
      prev.map((s) => (s.name === skillName ? { ...s, claimed: newLevel } : s)),
    );
    setSelectedSkill((prev) =>
      prev?.name === skillName ? { ...prev, claimed: newLevel } : prev,
    );
  }

  function addNewSkill(skill: Skill) {
    setSkills((prev) => [...prev, skill]);
    setFlow(null);
  }

  function addSkillsFromResume(names: string[]) {
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const resumeEv: EvidenceItem = { type: "Resume", label: "Extracted from resume", date: today, state: "partial" };
    setSkills((prev) => {
      const existing = new Set(prev.map((s) => s.name));
      const updated = prev.map((s) =>
        names.includes(s.name)
          ? { ...s, evidence: [...s.evidence, resumeEv], count: s.count + 1, state: (s.state === "none" ? "partial" : s.state) as Skill["state"] }
          : s,
      );
      const toAdd = names
        .filter((n) => !existing.has(n))
        .map((n) => {
          const family = SKILL_TAXONOMY.find((f) => f.skills.includes(n))?.family ?? "Other";
          return {
            name: n, family,
            claimed: "Intermediate", evidenced: "Basic",
            conf: "Low" as const, count: 1, verified: "—", state: "partial" as const,
            evidence: [resumeEv],
          };
        });
      return [...updated, ...toAdd];
    });
  }

  function openFlow(f: ActiveFlow) {
    setSelectedSkill(null);
    setFlow(f);
  }

  function handleStepAction(id: string) {
    if (id === "voice")      { setFlow({ kind: "voice" }); return; }
    if (id === "resume")     { setFlow({ kind: "resume",     skill: null }); return; }
    if (id === "interview")  { setFlow({ kind: "interview",  skill: null }); return; }
    if (id === "assessment") { setFlow({ kind: "assessment", skill: null }); return; }
    if (id === "sample")     { setFlow({ kind: "sample",     skill: null }); return; }
    setDoneSteps((p) => [...p, id]);
  }

  function completeEvidence(skillName: string | null, ev: EvidenceItem, stepId?: string) {
    if (skillName) applyEvidence(skillName, ev);
    if (stepId) setDoneSteps((p) => [...p.filter((x) => x !== stepId), stepId]);
    setFlow(null);
  }

  function selectEvidenceType(kind: "resume" | "assessment" | "interview" | "sample" | "claim", skill: Skill) {
    setFlow({ kind, skill });
  }

  return (
    <div className="space-y-0">
      {/* Page header */}
      <div className="mb-6 flex flex-col gap-4 min-[480px]:flex-row min-[480px]:items-start min-[480px]:justify-between min-[480px]:gap-6">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">Living profile</div>
          <h1 className="mt-1 text-[24px] font-bold tracking-tight text-ink sm:text-[28px]">Talent DNA</h1>
          <p className="mt-1.5 max-w-lg text-[14px] leading-relaxed text-muted">
            Your complete professional profile — skills, experience, evidence, and career goals.
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-2.5 min-[480px]:items-end">
          <div className="flex w-full items-center gap-1 rounded-[9px] border border-line bg-surface p-1 min-[480px]:w-auto">
            {(["new", "returning"] as const).map((p) => (
              <button
                key={p}
                onClick={() => { setProfile(p); setTab("overview"); }}
                className={cx(
                  "flex-1 rounded-[7px] px-3 py-1.5 text-[12px] font-semibold transition-colors min-[480px]:flex-none",
                  profile === p ? "bg-brand-500 text-white" : "text-ink-soft hover:bg-canvas",
                )}
              >
                {p === "new" ? "New user" : "Returning user"}
              </button>
            ))}
          </div>
          {!isNew && (
            <div className="text-[12.5px] min-[480px]:text-right">
              <span className="font-bold text-ink">{verifiedCount} verified</span>
              <span className="text-muted"> · {skills.length} skills</span>
            </div>
          )}
        </div>
      </div>

      {/* Tab navigation */}
      <div className="mb-2 flex items-center justify-end gap-1.5 text-[11px] font-medium text-faint min-[450px]:hidden">
        <span>Swipe tabs to see more</span>
        <ChevronRight className="size-3.5" />
      </div>
      <div className="relative mb-6">
        <div className="overflow-x-auto overscroll-x-contain border-b border-line [-webkit-overflow-scrolling:touch]">
          <div className="flex min-w-max px-1">
            {DNA_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cx(
                  "relative shrink-0 whitespace-nowrap px-4 py-2.5 text-[13.5px] font-semibold transition-colors",
                  tab === t.id
                    ? "text-brand-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-brand-500"
                    : "text-muted hover:text-ink",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-canvas to-transparent min-[450px]:hidden"
          aria-hidden
        />
      </div>

      {tab === "overview" && (
        <Overview
          profileData={profileData}
          isNew={isNew}
          targetRoles={targetRoles}
          doneSteps={doneSteps}
          verifiedCount={verifiedCount}
          skills={skills}
          onAddRole={() => setFlow({ kind: "add-target-role" })}
          onAddSkill={() => setFlow({ kind: "add-skill" })}
          onViewSkills={() => setTab("skills")}
          onStepAction={handleStepAction}
        />
      )}

      {tab === "skills" && (
        <Skills
          isNew={isNew}
          skills={skills}
          families={families}
          doneSteps={doneSteps}
          onStepAction={handleStepAction}
          onAddSkill={() => setFlow({ kind: "add-skill" })}
          onSelectSkill={setSelectedSkill}
          onOpenEvidenceFlow={(s) => openFlow({ kind: "select", skill: s })}
        />
      )}

      {tab === "experience" && <Experience isNew={isNew} />}

      {tab === "evidence" && <Evidence skills={skills} />}

      {tab === "settings" && <Settings profile={profileData} onChange={setProfileData} />}

      {selectedSkill && (
        <SkillPanel
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onAddEvidence={() => openFlow({ kind: "select", skill: selectedSkill })}
          onEditClaim={() => openFlow({ kind: "edit-claim", skill: selectedSkill })}
        />
      )}

      {flow?.kind === "select" && (
        <SelectEvidenceType
          skill={flow.skill}
          onClose={() => setFlow(null)}
          onSelect={(kind) => selectEvidenceType(kind, flow.skill)}
        />
      )}

      {flow?.kind === "resume" && (
        <ResumeFlow
          skill={flow.skill}
          onClose={() => setFlow(null)}
          onComplete={(ev) => completeEvidence(flow.skill?.name ?? null, ev, "resume")}
          onExtractSkills={!flow.skill ? addSkillsFromResume : undefined}
        />
      )}
      {flow?.kind === "assessment" && (
        <AssessmentFlow
          skill={flow.skill}
          onClose={() => setFlow(null)}
          onComplete={(ev) => completeEvidence(flow.skill?.name ?? null, ev, "assessment")}
        />
      )}
      {flow?.kind === "interview" && (
        <InterviewFlow
          skill={flow.skill}
          onClose={() => setFlow(null)}
          onComplete={(ev) => completeEvidence(flow.skill?.name ?? null, ev, "interview")}
        />
      )}
      {flow?.kind === "sample" && (
        <WorkSampleFlow
          skill={flow.skill}
          onClose={() => setFlow(null)}
          onComplete={(ev) => completeEvidence(flow.skill?.name ?? null, ev, "sample")}
        />
      )}
      {flow?.kind === "claim" && (
        <ManualClaimFlow
          skill={flow.skill}
          onClose={() => setFlow(null)}
          onComplete={(ev, newLevel) => {
            applyEvidence(flow.skill.name, ev);
            updateClaim(flow.skill.name, newLevel);
            setFlow(null);
          }}
        />
      )}
      {flow?.kind === "add-skill" && (
        <AddSkillModal
          existingNames={skills.map((s) => s.name)}
          onAdd={addNewSkill}
          onClose={() => setFlow(null)}
        />
      )}
      {flow?.kind === "edit-claim" && (
        <EditClaimModal
          skill={flow.skill}
          onClose={() => setFlow(null)}
          onSave={(newLevel) => { updateClaim(flow.skill.name, newLevel); setFlow(null); }}
        />
      )}
      {flow?.kind === "voice" && (
        <VoiceDiscoveryModal
          onClose={() => { setDoneSteps((p) => [...p, "voice"]); setFlow(null); }}
        />
      )}
      {flow?.kind === "add-target-role" && (
        <AddTargetRoleModal
          existingIds={targetRoles.map((r) => r.id)}
          skills={skills}
          onAdd={(role) => { setTargetRoles((p) => [...p, role]); setFlow(null); }}
          onClose={() => setFlow(null)}
        />
      )}
    </div>
  );
}
