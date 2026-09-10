import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

/* ============================================================ TYPES */

export type Stage =
  | "Invited"
  | "Assessment"
  | "Interviewing"
  | "Shortlisted"
  | "Decision"
  | "Hired"
  | "Outcome Tracking"
  | "Rejected";

export const STAGES: Stage[] = [
  "Invited",
  "Assessment",
  "Interviewing",
  "Shortlisted",
  "Decision",
  "Hired",
  "Outcome Tracking",
];

export type Skill = { name: string; family: string; req: string; weight: number; must: boolean };
export type RoleStatus = "draft" | "review" | "approved" | "published";

export type Role = {
  id: string;
  title: string;
  family: string;
  status: RoleStatus;
  skills: Skill[];
  createdBy: string;
};

export type Candidate = {
  id: string;
  name: string;
  initials: string;
  headline: string;
  location: string;
  availability: string;
  passport: "verified" | "partial" | "unverified";
  national: boolean;
  match: number;
  conf: "High" | "Medium" | "Low";
  skills: string[];
  gap: string;
  ev: string;
  tag: "Recommended Match" | "Strong Alignment" | "Needs Review";
};

export type HistoryEntry = { stage: Stage; by: string; at: string };
export type PipelineEntry = {
  candidateId: string;
  roleId: string;
  stage: Stage;
  history: HistoryEntry[];
  rejectReason?: string;
};

export type Origin = "search" | "pipeline";

/* ============================================================ SEED DATA */

// Candidates exist independently of the employer — they are the verified
// talent pool. What the employer *creates* (roles, pipeline) starts empty.
const CANDIDATES: Candidate[] = [
  {
    id: "omar",
    name: "Omar Al-Harbi",
    initials: "OA",
    headline: "QA Automation Engineer",
    location: "Riyadh",
    availability: "Available immediately",
    passport: "verified",
    national: true,
    match: 91,
    conf: "High",
    skills: ["API Testing", "Playwright", "SQL"],
    gap: "Performance Testing",
    ev: "Strong",
    tag: "Recommended Match",
  },
  {
    id: "sara",
    name: "Sara Al-Mutairi",
    initials: "SM",
    headline: "SDET · Test Automation",
    location: "Riyadh",
    availability: "1 month notice",
    passport: "verified",
    national: true,
    match: 86,
    conf: "High",
    skills: ["Playwright", "CI/CD", "Test Strategy"],
    gap: "SQL",
    ev: "Strong",
    tag: "Strong Alignment",
  },
  {
    id: "yousef",
    name: "Yousef Al-Ghamdi",
    initials: "YG",
    headline: "Software Test Engineer",
    location: "Jeddah",
    availability: "Available immediately",
    passport: "partial",
    national: true,
    match: 79,
    conf: "Medium",
    skills: ["API Testing", "SQL"],
    gap: "Playwright",
    ev: "Moderate",
    tag: "Strong Alignment",
  },
  {
    id: "huda",
    name: "Huda Al-Zahrani",
    initials: "HZ",
    headline: "Junior QA Analyst",
    location: "Dammam",
    availability: "2 months notice",
    passport: "unverified",
    national: true,
    match: 72,
    conf: "Low",
    skills: ["Test Strategy"],
    gap: "API Testing",
    ev: "Emerging",
    tag: "Needs Review",
  },
  {
    id: "fahad",
    name: "Fahad Al-Nasser",
    initials: "FN",
    headline: "Automation Lead",
    location: "Riyadh",
    availability: "Available immediately",
    passport: "verified",
    national: true,
    match: 83,
    conf: "Medium",
    skills: ["Playwright", "Performance Testing", "CI/CD"],
    gap: "SQL",
    ev: "Strong",
    tag: "Strong Alignment",
  },
];

// A role template the user can explicitly start from — sums to 100%.
export const TEMPLATE_SKILLS: Skill[] = [
  { name: "API Testing", family: "Test Automation", req: "Advanced", weight: 24, must: true },
  { name: "Playwright / E2E", family: "Test Automation", req: "Advanced", weight: 22, must: true },
  { name: "Test Strategy", family: "Delivery", req: "Advanced", weight: 18, must: false },
  { name: "CI/CD Pipelines", family: "Delivery", req: "Intermediate", weight: 14, must: false },
  { name: "SQL", family: "Data", req: "Intermediate", weight: 12, must: false },
  { name: "Performance Testing", family: "Test Automation", req: "Intermediate", weight: 10, must: true },
];

// Skills TIE *suggests* after parsing a JD or generating with AI. These are
// proposals only — nothing is committed to a Job DNA until the user confirms.
export const SUGGESTED_SKILLS: Skill[] = [
  { name: "API Testing", family: "Test Automation", req: "Advanced", weight: 25, must: true },
  { name: "Playwright / E2E", family: "Test Automation", req: "Advanced", weight: 20, must: true },
  { name: "Test Strategy", family: "Delivery", req: "Advanced", weight: 15, must: false },
  { name: "CI/CD Pipelines", family: "Delivery", req: "Intermediate", weight: 15, must: false },
  { name: "SQL", family: "Data", req: "Intermediate", weight: 10, must: false },
  { name: "Performance Testing", family: "Test Automation", req: "Intermediate", weight: 15, must: true },
];

// Canonical TIE skill taxonomy used by the "Add skill" picker.
export const TAXONOMY: { name: string; family: string }[] = [
  { name: "API Testing", family: "Test Automation" },
  { name: "Test Automation", family: "Test Automation" },
  { name: "Playwright / E2E", family: "Test Automation" },
  { name: "Selenium", family: "Test Automation" },
  { name: "Performance Testing", family: "Test Automation" },
  { name: "Security Testing", family: "Test Automation" },
  { name: "Mobile Testing", family: "Test Automation" },
  { name: "Test Strategy", family: "Delivery" },
  { name: "CI/CD Pipelines", family: "Delivery" },
  { name: "Release Management", family: "Delivery" },
  { name: "SQL", family: "Data" },
  { name: "Data Validation", family: "Data" },
  { name: "Python", family: "Programming" },
  { name: "JavaScript / TypeScript", family: "Programming" },
  { name: "Java", family: "Programming" },
];

/* ============================================================ STORE */

type EmployerState = {
  workspace: string;
  actor: string;
  roles: Role[];
  candidates: Candidate[];
  pipeline: PipelineEntry[];
  editingRoleId: string | null;
  activeRoleId: string | null;
  selectedCandidateId: string | null;
  candidateOrigin: Origin;
  searchDone: boolean;

  // derived helpers
  publishedRoles: Role[];
  editingRole: Role | null;
  activeRole: Role | null;
  selectedCandidate: Candidate | null;
  entryFor: (candidateId: string) => PipelineEntry | null;

  // actions
  createRole: (title: string, family: string, skills?: Skill[]) => string;
  updateRoleSkills: (id: string, skills: Skill[]) => void;
  setRoleStatus: (id: string, status: RoleStatus) => void;
  setActiveRole: (id: string) => void;
  setSearchDone: (v: boolean) => void;
  selectCandidate: (id: string, origin: Origin) => void;
  addToPipeline: (candidateId: string) => void;
  advanceStage: (candidateId: string) => void;
  rejectCandidate: (candidateId: string, reason: string) => void;
};

const Ctx = createContext<EmployerState | null>(null);

export function useEmployer() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useEmployer must be used within EmployerProvider");
  return v;
}

export function EmployerProvider({
  workspace,
  actor,
  children,
}: {
  workspace: string;
  actor: string;
  children: ReactNode;
}) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [pipeline, setPipeline] = useState<PipelineEntry[]>([]);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [activeRoleId, setActiveRoleId] = useState<string | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [candidateOrigin, setCandidateOrigin] = useState<Origin>("search");
  const [searchDone, setSearchDone] = useState(false);

  const value = useMemo<EmployerState>(() => {
    const publishedRoles = roles.filter((r) => r.status === "published");
    const editingRole = roles.find((r) => r.id === editingRoleId) ?? null;
    const activeRole =
      roles.find((r) => r.id === activeRoleId) ?? publishedRoles[publishedRoles.length - 1] ?? null;
    const selectedCandidate = CANDIDATES.find((c) => c.id === selectedCandidateId) ?? null;
    const entryFor = (cid: string) => pipeline.find((p) => p.candidateId === cid) ?? null;

    return {
      workspace,
      actor,
      roles,
      candidates: CANDIDATES,
      pipeline,
      editingRoleId,
      activeRoleId,
      selectedCandidateId,
      candidateOrigin,
      searchDone,
      publishedRoles,
      editingRole,
      activeRole,
      selectedCandidate,
      entryFor,

      createRole: (title, family, skills = []) => {
        const id = "role_" + Math.random().toString(36).slice(2, 8);
        const role: Role = {
          id,
          title: title.trim() || "Untitled role",
          family: family.trim() || "Test Automation",
          status: "draft",
          skills: skills.map((s) => ({ ...s })),
          createdBy: actor,
        };
        setRoles((r) => [...r, role]);
        setEditingRoleId(id);
        return id;
      },
      updateRoleSkills: (id, skills) =>
        setRoles((r) => r.map((x) => (x.id === id ? { ...x, skills } : x))),
      setRoleStatus: (id, status) => {
        setRoles((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
        if (status === "published") setActiveRoleId(id);
      },
      setActiveRole: (id) => {
        setActiveRoleId(id);
        setSearchDone(false);
      },
      setSearchDone,
      selectCandidate: (id, origin) => {
        setSelectedCandidateId(id);
        setCandidateOrigin(origin);
      },
      addToPipeline: (candidateId) => {
        setPipeline((p) => {
          if (p.some((x) => x.candidateId === candidateId)) return p;
          const roleId = activeRoleId ?? publishedRoles[publishedRoles.length - 1]?.id ?? "";
          return [
            ...p,
            {
              candidateId,
              roleId,
              stage: "Invited",
              history: [{ stage: "Invited", by: actor, at: "just now" }],
            },
          ];
        });
      },
      advanceStage: (candidateId) =>
        setPipeline((p) =>
          p.map((x) => {
            if (x.candidateId !== candidateId) return x;
            const i = STAGES.indexOf(x.stage);
            if (i < 0 || i >= STAGES.length - 1) return x;
            const next = STAGES[i + 1];
            return {
              ...x,
              stage: next,
              history: [...x.history, { stage: next, by: actor, at: "just now" }],
            };
          }),
        ),
      rejectCandidate: (candidateId, reason) =>
        setPipeline((p) =>
          p.map((x) =>
            x.candidateId === candidateId
              ? {
                  ...x,
                  stage: "Rejected",
                  rejectReason: reason,
                  history: [...x.history, { stage: "Rejected", by: actor, at: "just now" }],
                }
              : x,
          ),
        ),
    };
  }, [
    workspace,
    actor,
    roles,
    pipeline,
    editingRoleId,
    activeRoleId,
    selectedCandidateId,
    candidateOrigin,
    searchDone,
  ]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
