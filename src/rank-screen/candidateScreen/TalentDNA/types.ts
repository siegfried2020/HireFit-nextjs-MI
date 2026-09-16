import {
  Mic,
  FileText,
  CalendarClock,
  ClipboardCheck,
  Award,
  type LucideIcon,
} from "lucide-react";

export type EvidenceItem = {
  type: string;
  label: string;
  date: string;
  state: "verified" | "partial" | "expired" | "pending";
};

export type Skill = {
  name: string;
  family: string;
  claimed: string;
  evidenced: string;
  conf: "High" | "Medium" | "Low";
  count: number;
  verified: string;
  state: "verified" | "partial" | "claimed" | "none";
  evidence: EvidenceItem[];
};

export type ProfileIdentity = {
  name: string;
  headline: string;
  currentRole: string;
  company: string;
  location: string;
  openToWork: boolean;
  visibility: "private" | "matched" | "open";
};

export type TargetRole = {
  id: string;
  title: string;
  readiness: number;
  conf: "High" | "Medium" | "Low";
  evidencedSkills: number;
  totalSkills: number;
};

export type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string | null;
  desc: string;
  skills: string[];
};

export type EducationEntry = {
  id: string;
  institution: string;
  degree: string;
  year: string;
};

export type ProjectEntry = {
  id: string;
  title: string;
  desc: string;
  url: string;
  skills: string[];
  date: string;
};

export type DnaTab = "overview" | "skills" | "experience" | "evidence" | "settings";

export type ActiveFlow =
  | null
  | { kind: "select"; skill: Skill }
  | { kind: "resume"; skill: Skill | null }
  | { kind: "assessment"; skill: Skill | null }
  | { kind: "interview"; skill: Skill | null }
  | { kind: "sample"; skill: Skill | null }
  | { kind: "claim"; skill: Skill }
  | { kind: "add-skill" }
  | { kind: "edit-claim"; skill: Skill }
  | { kind: "voice" }
  | { kind: "add-target-role" };

export const LEVELS = ["Basic", "Intermediate", "Advanced", "Expert"] as const;
export type Level = (typeof LEVELS)[number];

export const EVIDENCE_COLORS: Record<string, string> = {
  Assessment: "bg-brand-50 text-brand-700",
  Interview: "bg-[#ededfc] text-[#3832a3]",
  "Work Simulation": "bg-[#e7f2ec] text-[#276c4f]",
  Credential: "bg-[#fbf1e2] text-[#8f5a14]",
  Portfolio: "bg-[#f0f2f6] text-[#3a4658]",
  "Employer Outcome": "bg-[#e7f2ec] text-[#276c4f]",
  "Candidate Claim": "bg-[#f0f2f6] text-[#667085]",
  Resume: "bg-[#f0f2f6] text-[#3a4658]",
};

export const SKILL_STATE = {
  verified: { tone: "verified" as const, label: "Verified" },
  partial: { tone: "partial" as const, label: "Partially Verified" },
  claimed: { tone: "unverified" as const, label: "Claimed Only" },
  none: { tone: "neutral" as const, label: "No Evidence Yet" },
};

export const EV_STATE = {
  verified: { tone: "verified" as const, label: "Verified" },
  partial: { tone: "partial" as const, label: "Pending review" },
  expired: { tone: "expired" as const, label: "Expired" },
  pending: { tone: "neutral" as const, label: "Pending" },
};

export const DNA_TABS: { id: DnaTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "evidence", label: "Evidence" },
  { id: "settings", label: "Settings" },
];

export const BUILD_STEPS: { id: string; Icon: LucideIcon; label: string; desc: string }[] = [
  { id: "voice", Icon: Mic, label: "Voice Discovery", desc: "Tell your career story" },
  { id: "resume", Icon: FileText, label: "Upload Resume", desc: "Auto-extract your skills" },
  { id: "interview", Icon: CalendarClock, label: "Start Interview", desc: "Structured AI interview" },
  { id: "assessment", Icon: ClipboardCheck, label: "Take Assessment", desc: "Verify skill levels" },
  { id: "sample", Icon: Award, label: "Add Work Sample", desc: "Portfolio evidence" },
];
