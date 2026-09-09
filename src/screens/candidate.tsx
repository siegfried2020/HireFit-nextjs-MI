import { useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  FileText,
  Mic,
  CalendarClock,
  TrendingUp,
  X,
  ClipboardCheck,
  Award,
  MapPin,
  Share2,
  Building2,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import {
  Card,
  Button,
  StatusBadge,
  Confidence,
  SkillLevel,
  ScoreRing,
  SectionTitle,
  cx,
} from "../components/primitives";

/* ============================================================ DASHBOARD */

export function CandidateDashboard({ go }: { go: (r: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-6">
        <div>
          <div className="text-[12.5px] font-medium text-muted">Good morning, Layla</div>
          <h1 className="text-[22px] font-bold tracking-tight text-ink">
            You&rsquo;re building toward QA Automation Engineer
          </h1>
        </div>
        <Button onClick={() => go("readiness")} className="max-md:hidden">
          <TrendingUp className="size-4" /> View readiness plan
        </Button>
      </div>

      {/* Primary status band */}
      <Card className="overflow-hidden">
        <div className="grid grid-cols-[1.4fr_1fr_1fr] divide-x divide-line max-lg:grid-cols-1 max-lg:divide-x-0 max-lg:divide-y">
          <div className="flex items-center gap-4 p-4">
            <ScoreRing value={82} size={68} stroke={7} label="Ready" />
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-faint">Role Readiness</div>
              <div className="mt-0.5 text-[16px] font-bold text-ink">QA Automation Engineer</div>
              <div className="mt-1.5 flex items-center gap-2">
                <Confidence level="High" />
                <span className="text-[12.5px] font-medium text-[#2e7d5b]">· Top 12%</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2 p-4">
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="text-muted">Evidence completion</span>
              <span className="font-semibold tabular-nums text-ink">74%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-line-soft">
              <div className="h-full rounded-full bg-brand-500" style={{ width: "74%" }} />
            </div>
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="text-muted">Profile strength</span>
              <span className="font-semibold tabular-nums text-ink">Strong</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-line-soft">
              <div className="h-full rounded-full bg-[#2e7d5b]" style={{ width: "88%" }} />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-1.5 p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-faint">Talent Passport</div>
            <StatusBadge tone="verified">Issued &amp; Verified</StatusBadge>
            <div className="text-[12.5px] text-muted">
              Valid until <span className="font-medium text-ink">14 Feb 2027</span>
            </div>
            <button
              onClick={() => go("passport")}
              className="inline-flex w-fit items-center gap-1 text-[12.5px] font-semibold text-brand-600 hover:text-brand-700"
            >
              Manage <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      </Card>

      {/* Next best action */}
      <Card className="flex items-center gap-3.5 border-brand-200 bg-brand-50 p-4">
        <div className="grid size-10 shrink-0 place-items-center rounded-[11px] bg-brand-500 text-white">
          <Sparkles className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">Next recommended action</div>
          <div className="text-[14.5px] font-semibold text-ink">
            Complete the Performance Testing assessment to close your highest-impact gap
          </div>
          <div className="text-[12.5px] text-brand-700/80">Estimated +6% readiness · creates verified evidence</div>
        </div>
        <Button>Start assessment</Button>
      </Card>

      {/* Three compact columns */}
      <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
        {/* Top gaps */}
        <Card className="p-4">
          <SectionTitle
            title="Top skill gaps"
            action={<button onClick={() => go("readiness")} className="text-[13px] font-semibold text-brand-600 hover:text-brand-700">See all</button>}
          />
          <div className="space-y-2">
            {[
              { s: "Performance Testing", to: "Intermediate", impact: "+6%" },
              { s: "CI/CD Pipelines", to: "Advanced", impact: "+4%" },
              { s: "Test Strategy", to: "Advanced", impact: "+3%" },
            ].map((g) => (
              <div key={g.s} className="flex items-center justify-between gap-3 rounded-[9px] border border-line-soft bg-raised px-3 py-2">
                <div className="min-w-0">
                  <div className="truncate text-[13.5px] font-semibold text-ink">{g.s}</div>
                  <div className="text-[12px] text-muted">→ {g.to}</div>
                </div>
                <span className="shrink-0 rounded-full bg-[#e7f2ec] px-2 py-0.5 text-[12px] font-bold text-[#276c4f]">{g.impact}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Job matches */}
        <Card className="p-4">
          <SectionTitle
            title="Job matches"
            action={<button onClick={() => go("jobs")} className="text-[13px] font-semibold text-brand-600 hover:text-brand-700">View all</button>}
          />
          <div className="divide-y divide-line-soft">
            {[
              { role: "Senior QA Automation Engineer", co: "Jahez", match: 89 },
              { role: "SDET — Platform", co: "STC Solutions", match: 84 },
              { role: "QA Engineer", co: "Tamara", match: 78 },
            ].map((j) => (
              <button
                key={j.role}
                onClick={() => go("jobs")}
                className="flex w-full items-center gap-3 py-2 text-left transition-colors first:pt-0 last:pb-0 hover:bg-line-soft/60"
              >
                <div className="grid size-8 shrink-0 place-items-center rounded-[8px] bg-brand-100 text-[11px] font-bold text-brand-700">{j.co.slice(0, 2)}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-semibold text-ink">{j.role}</div>
                  <div className="truncate text-[12px] text-muted">{j.co}</div>
                </div>
                <span className="text-[14px] font-bold tabular-nums text-brand-600">{j.match}%</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Upcoming */}
        <Card className="p-4">
          <SectionTitle title="Upcoming" />
          <div className="space-y-3">
            {[
              { icon: ClipboardCheck, t: "Performance Testing Assessment", d: "Due in 3 days" },
              { icon: Mic, t: "Verified AI Interview", d: "2 Sep · 10:00" },
            ].map((u) => (
              <div key={u.t} className="flex gap-2.5">
                <div className="grid size-8 shrink-0 place-items-center rounded-[8px] bg-brand-50 text-brand-600">
                  <u.icon className="size-[16px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold text-ink">{u.t}</div>
                  <div className="text-[12px] text-muted">{u.d}</div>
                </div>
              </div>
            ))}
            <button className="flex w-full items-center gap-2.5 rounded-[9px] border border-dashed border-line px-3 py-2 text-left text-[12.5px] font-medium text-muted transition-colors hover:border-brand-200 hover:text-brand-600">
              <Mic className="size-4" /> Start Voice Career Discovery
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ============================================================ TALENT DNA */

const EVIDENCE_COLORS: Record<string, string> = {
  Assessment: "bg-brand-50 text-brand-700",
  Interview: "bg-[#ededfc] text-[#3832a3]",
  "Work Simulation": "bg-[#e7f2ec] text-[#276c4f]",
  Credential: "bg-[#fbf1e2] text-[#8f5a14]",
  Portfolio: "bg-[#f0f2f6] text-[#3a4658]",
  "Employer Outcome": "bg-[#e7f2ec] text-[#276c4f]",
  "Candidate Claim": "bg-[#f0f2f6] text-[#667085]",
  Resume: "bg-[#f0f2f6] text-[#3a4658]",
};

type EvidenceItem = {
  type: string;
  label: string;
  date: string;
  state: "verified" | "partial" | "expired" | "pending";
};

type Skill = {
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

const SKILL_STATE = {
  verified: { tone: "verified" as const, label: "Verified" },
  partial:  { tone: "partial"    as const, label: "Partially Verified" },
  claimed:  { tone: "unverified" as const, label: "Claimed Only" },
  none:     { tone: "neutral"    as const, label: "No Evidence Yet" },
};

const EV_STATE = {
  verified: { tone: "verified" as const, label: "Verified" },
  partial:  { tone: "partial"  as const, label: "Pending review" },
  expired:  { tone: "expired"  as const, label: "Expired" },
  pending:  { tone: "neutral"  as const, label: "Pending" },
};

/* ——— returning-user data ——— */
const SKILLS_FULL: Skill[] = [
  {
    name: "API Testing", family: "Test Automation",
    claimed: "Advanced", evidenced: "Advanced", conf: "High", count: 4, verified: "12 Aug 2026", state: "verified",
    evidence: [
      { type: "Assessment",       label: "REST API Testing — 94%",      date: "12 Aug 2026", state: "verified" },
      { type: "Work Simulation",  label: "Contract testing brief",       date: "28 Jul 2026", state: "verified" },
      { type: "Interview",        label: "Verified technical interview", date: "20 Jul 2026", state: "verified" },
      { type: "Employer Outcome", label: "Jahez — 90-day review",        date: "10 Jun 2026", state: "verified" },
    ],
  },
  {
    name: "Playwright / E2E", family: "Test Automation",
    claimed: "Advanced", evidenced: "Advanced", conf: "High", count: 3, verified: "05 Aug 2026", state: "verified",
    evidence: [
      { type: "Assessment", label: "Playwright fundamentals — 91%", date: "05 Aug 2026", state: "verified" },
      { type: "Portfolio",  label: "E2E suite — GitHub",             date: "01 Aug 2026", state: "partial" },
      { type: "Interview",  label: "Live coding round",              date: "22 Jul 2026", state: "verified" },
    ],
  },
  {
    name: "Performance Testing", family: "Test Automation",
    claimed: "Intermediate", evidenced: "Basic", conf: "Low", count: 1, verified: "—", state: "partial",
    evidence: [
      { type: "Candidate Claim", label: "Self-reported k6 usage", date: "—", state: "partial" },
    ],
  },
  {
    name: "SQL", family: "Data & Queries",
    claimed: "Advanced", evidenced: "Intermediate", conf: "Medium", count: 2, verified: "18 Jul 2026", state: "partial",
    evidence: [
      { type: "Assessment", label: "SQL joins & windows — 82%", date: "18 Jul 2026", state: "verified" },
      { type: "Credential", label: "Data course certificate",    date: "10 Jan 2025", state: "expired" },
    ],
  },
  {
    name: "CI/CD Pipelines", family: "Delivery & Ops",
    claimed: "Intermediate", evidenced: "Intermediate", conf: "Medium", count: 2, verified: "02 Aug 2026", state: "verified",
    evidence: [
      { type: "Work Simulation", label: "GitHub Actions pipeline", date: "02 Aug 2026", state: "verified" },
      { type: "Portfolio",       label: "Deployment config",        date: "30 Jul 2026", state: "partial" },
    ],
  },
  {
    name: "Test Strategy", family: "Delivery & Ops",
    claimed: "Intermediate", evidenced: "Intermediate", conf: "Medium", count: 1, verified: "20 Jul 2026", state: "verified",
    evidence: [
      { type: "Interview", label: "Structured competency interview", date: "20 Jul 2026", state: "verified" },
    ],
  },
];

/* ——— first-time / new-user data: skills claimed but no evidence yet ——— */
const SKILLS_NEW: Skill[] = [
  {
    name: "API Testing", family: "Test Automation",
    claimed: "Advanced", evidenced: "None", conf: "Low", count: 0, verified: "—", state: "claimed",
    evidence: [],
  },
  {
    name: "Playwright / E2E", family: "Test Automation",
    claimed: "Intermediate", evidenced: "None", conf: "Low", count: 0, verified: "—", state: "claimed",
    evidence: [],
  },
  {
    name: "Performance Testing", family: "Test Automation",
    claimed: "None", evidenced: "None", conf: "Low", count: 0, verified: "—", state: "none",
    evidence: [],
  },
  {
    name: "SQL", family: "Data & Queries",
    claimed: "Intermediate", evidenced: "None", conf: "Low", count: 0, verified: "—", state: "claimed",
    evidence: [],
  },
];

/* ——— Profile identity types & data ——— */

type ProfileIdentity = {
  name: string;
  headline: string;
  currentRole: string;
  company: string;
  location: string;
  openToWork: boolean;
  visibility: "private" | "matched" | "open";
};

type TargetRole = {
  id: string;
  title: string;
  readiness: number;
  conf: "High" | "Medium" | "Low";
  evidencedSkills: number;
  totalSkills: number;
};

type ExperienceEntry = {
  id: string; company: string; role: string;
  start: string; end: string | null; desc: string; skills: string[];
};

type EducationEntry = {
  id: string; institution: string; degree: string; year: string;
};

type ProjectEntry = {
  id: string; title: string; desc: string; url: string; skills: string[]; date: string;
};

const PROFILE_NEW_DATA: ProfileIdentity = {
  name: "", headline: "", currentRole: "", company: "", location: "",
  openToWork: false, visibility: "private",
};

const PROFILE_FULL_DATA: ProfileIdentity = {
  name: "Layla Al-Otaibi",
  headline: "QA Automation Engineer · 5+ years",
  currentRole: "Senior QA Engineer",
  company: "Jahez",
  location: "Riyadh, KSA",
  openToWork: true,
  visibility: "matched",
};

const TARGET_ROLES_FULL: TargetRole[] = [
  { id: "qa-auto", title: "QA Automation Engineer",      readiness: 82, conf: "High",   evidencedSkills: 4, totalSkills: 6 },
  { id: "sdet",    title: "SDET — Platform Engineering",  readiness: 71, conf: "Medium", evidencedSkills: 3, totalSkills: 6 },
];

const EXPERIENCE_FULL: ExperienceEntry[] = [
  {
    id: "e1", company: "Jahez", role: "Senior QA Engineer",
    start: "Jan 2024", end: null,
    desc: "Led test automation for payment and ordering flows; API testing with Playwright and k6.",
    skills: ["API Testing", "Playwright / E2E", "Performance Testing"],
  },
  {
    id: "e2", company: "STC Solutions", role: "QA Engineer",
    start: "Mar 2022", end: "Dec 2023",
    desc: "Maintained web and mobile regression suites; integrated CI/CD pipelines.",
    skills: ["CI/CD Pipelines", "SQL", "Playwright / E2E"],
  },
];

const EDUCATION_FULL: EducationEntry[] = [
  { id: "ed1", institution: "King Abdulaziz University", degree: "B.Sc. Computer Science", year: "2022" },
];

const PROJECTS_FULL: ProjectEntry[] = [
  {
    id: "p1", title: "E2E Test Automation Suite",
    desc: "Playwright-based regression suite covering 200+ critical user journeys. Integrated with GitHub Actions.",
    url: "github.com/layla/e2e-suite",
    skills: ["Playwright / E2E", "CI/CD Pipelines"],
    date: "Aug 2026",
  },
];

type DnaTab = "overview" | "skills" | "experience" | "evidence" | "settings";

const DNA_TABS: { id: DnaTab; label: string }[] = [
  { id: "overview",    label: "Overview" },
  { id: "skills",      label: "Skills" },
  { id: "experience",  label: "Experience" },
  { id: "evidence",    label: "Evidence" },
  { id: "settings",    label: "Settings" },
];


/* ——— Getting started strip ——— */
const BUILD_STEPS: { id: string; Icon: any; label: string; desc: string }[] = [
  { id: "voice",      Icon: Mic,           label: "Voice Discovery",  desc: "Tell your career story" },
  { id: "resume",     Icon: FileText,       label: "Upload Resume",    desc: "Auto-extract your skills" },
  { id: "interview",  Icon: CalendarClock,  label: "Start Interview",  desc: "Structured AI interview" },
  { id: "assessment", Icon: ClipboardCheck, label: "Take Assessment",  desc: "Verify skill levels" },
  { id: "sample",     Icon: Award,          label: "Add Work Sample",  desc: "Portfolio evidence" },
];

function GettingStarted({
  doneIds,
  onAction,
}: {
  doneIds: string[];
  onAction: (id: string) => void;
}) {
  const doneCount = doneIds.length;
  return (
    <Card className="overflow-hidden border-brand-200">
      <div className="flex items-center justify-between gap-4 border-b border-brand-100 bg-brand-50 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="grid size-8 place-items-center rounded-[9px] bg-brand-500 text-white">
            <Sparkles className="size-4" />
          </div>
          <div>
            <div className="text-[13.5px] font-bold text-ink">Build your Talent DNA</div>
            <div className="text-[12px] text-brand-700/80">
              Complete these steps to evidence your skills and unlock verified role matches
            </div>
          </div>
        </div>
        <div className="shrink-0 rounded-full bg-brand-100 px-3 py-1 text-[12px] font-semibold text-brand-700">
          {doneCount} of {BUILD_STEPS.length} done
        </div>
      </div>
      <div className="grid grid-cols-5 divide-x divide-line max-lg:grid-cols-1 max-lg:divide-x-0 max-lg:divide-y">
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

/* ——— shared modal shell ——— */
const LEVELS = ["Basic", "Intermediate", "Advanced", "Expert"] as const;
type Level = (typeof LEVELS)[number];

const SKILL_TAXONOMY: { family: string; skills: string[] }[] = [
  { family: "Test Automation",  skills: ["API Testing", "Playwright / E2E", "Performance Testing", "Unit Testing", "Cypress", "Selenium"] },
  { family: "Data & Queries",   skills: ["SQL", "NoSQL", "Data Analysis", "ETL Pipelines", "Tableau"] },
  { family: "Delivery & Ops",   skills: ["CI/CD Pipelines", "Docker", "Kubernetes", "Git", "Linux"] },
  { family: "Programming",      skills: ["Python", "JavaScript", "TypeScript", "Java", "Go"] },
  { family: "Soft Skills",      skills: ["Communication", "Problem Solving", "Team Leadership", "Stakeholder Management"] },
];

function ModalShell({
  title, subtitle, eyebrow, onClose, children, footer,
}: {
  title: string; subtitle?: string; eyebrow?: string;
  onClose: () => void; children: ReactNode; footer?: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="tie-fade relative flex w-full max-w-[520px] flex-col overflow-hidden rounded-[16px] border border-line bg-surface shadow-[var(--shadow-pop)]">
        <div className="flex items-start justify-between border-b border-line px-6 py-5">
          <div>
            {eyebrow && <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-faint">{eyebrow}</div>}
            <h3 className="text-[19px] font-bold tracking-tight text-ink">{title}</h3>
            {subtitle && <p className="mt-1 text-[13px] text-muted">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="grid size-9 place-items-center rounded-[9px] text-muted hover:bg-line-soft">
            <X className="size-5" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-5">{children}</div>
        {footer && <div className="border-t border-line px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}

/* ——— Resume upload flow (3 steps) ——— */
function ResumeFlow({ skill, onComplete, onClose, onExtractSkills }: { skill: Skill | null; onComplete: (ev: EvidenceItem) => void; onClose: () => void; onExtractSkills?: (names: string[]) => void }) {
  const [step, setStep] = useState<"upload" | "processing" | "review">("upload");
  const [filename, setFilename] = useState("Layla_AlOtaibi_CV.pdf");

  const extracted = [
    { skill: "API Testing",       level: "Advanced",     selected: true },
    { skill: "Playwright / E2E",  level: "Intermediate", selected: true },
    { skill: "SQL",               level: "Intermediate", selected: skill?.name === "SQL" },
    { skill: "CI/CD Pipelines",   level: "Basic",        selected: false },
  ];
  const [checked, setChecked] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(extracted.map((e) => [e.skill, e.selected])),
  );

  function startUpload() {
    setStep("processing");
    setTimeout(() => setStep("review"), 1800);
  }

  if (step === "upload") return (
    <ModalShell eyebrow={skill ? `Add Evidence · ${skill.name}` : "Build Talent DNA"} title="Upload Resume / CV" onClose={onClose}
      footer={<div className="flex gap-2"><Button onClick={startUpload}><FileText className="size-4" /> Upload & Extract</Button><button onClick={onClose} className="ml-auto text-[13px] font-medium text-muted hover:text-ink">Cancel</button></div>}>
      <label className="flex cursor-pointer flex-col items-center gap-3 rounded-[12px] border-2 border-dashed border-brand-200 bg-brand-50/50 px-6 py-10 transition-colors hover:border-brand-400 hover:bg-brand-50">
        <div className="grid size-12 place-items-center rounded-[11px] bg-brand-100 text-brand-600"><FileText className="size-6" /></div>
        <div className="text-center">
          <div className="text-[14px] font-semibold text-ink">Drop your CV here or click to choose</div>
          <div className="mt-1 text-[12.5px] text-muted">PDF, DOCX, or TXT · up to 10 MB</div>
        </div>
        <input type="file" className="hidden" onChange={() => {}} />
      </label>
      <div className="mt-3 flex items-center gap-2.5 rounded-[10px] border border-line bg-raised px-3 py-2.5">
        <FileText className="size-4 shrink-0 text-brand-600" />
        <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{filename}</span>
        <button onClick={() => setFilename("")} className="text-[12px] text-faint hover:text-ink">Remove</button>
      </div>
    </ModalShell>
  );

  if (step === "processing") return (
    <ModalShell title="Extracting skills…" subtitle="HireFit is reading your resume and mapping your experience to the skill taxonomy." onClose={onClose}>
      <div className="flex flex-col items-center gap-5 py-8">
        <div className="relative flex size-16 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-line border-t-brand-500" />
          <FileText className="size-7 text-brand-500" />
        </div>
        <div className="space-y-2 w-full max-w-[300px]">
          {["Reading document structure…", "Identifying skills and roles…", "Mapping to taxonomy…"].map((t, i) => (
            <div key={t} className="flex items-center gap-2 text-[13px] text-muted">
              <div className={cx("size-1.5 rounded-full", i === 0 ? "bg-[#2e7d5b]" : i === 1 ? "bg-brand-400 animate-pulse" : "bg-line")} />
              {t}
            </div>
          ))}
        </div>
      </div>
    </ModalShell>
  );

  return (
    <ModalShell eyebrow="Review extraction" title="Skills found in your resume"
      subtitle={skill ? `Select skills to link. "${skill.name}" is highlighted.` : "Select skills to add to your Talent DNA."}
      onClose={onClose}
      footer={
        <div className="flex gap-2">
          <Button onClick={() => {
            const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
            if (!skill && onExtractSkills) {
              onExtractSkills(Object.entries(checked).filter(([, v]) => v).map(([k]) => k));
            }
            onComplete({ type: "Resume", label: `Resume — ${filename}`, date: today, state: "partial" });
          }}>
            <ShieldCheck className="size-4" /> Confirm &amp; Link
          </Button>
          <button onClick={onClose} className="ml-auto text-[13px] font-medium text-muted hover:text-ink">Cancel</button>
        </div>
      }>
      <div className="space-y-2">
        {extracted.map((e) => (
          <label key={e.skill} className={cx(
            "flex cursor-pointer items-center gap-3 rounded-[10px] border px-4 py-3 transition-colors",
            checked[e.skill] ? "border-brand-300 bg-brand-50" : "border-line bg-surface hover:bg-raised",
            skill?.name === e.skill && "ring-2 ring-brand-300",
          )}>
            <input type="checkbox" checked={!!checked[e.skill]} onChange={(ev) => setChecked((p) => ({ ...p, [e.skill]: ev.target.checked }))} className="accent-brand-500" />
            <div className="flex-1">
              <div className="text-[13.5px] font-semibold text-ink">{e.skill}</div>
              <div className="text-[12px] text-muted">Extracted level: {e.level}</div>
            </div>
            {skill?.name === e.skill && <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[11px] font-semibold text-white">Selected skill</span>}
          </label>
        ))}
      </div>
    </ModalShell>
  );
}

/* ——— Assessment flow (2 steps) ——— */
const ASSESSMENTS: { id: string; title: string; dur: string; level: string; score?: number }[] = [
  { id: "a1", title: "REST API Testing Fundamentals",  dur: "25 min", level: "Intermediate–Advanced" },
  { id: "a2", title: "Advanced Playwright Automation",  dur: "35 min", level: "Advanced" },
  { id: "a3", title: "Performance Testing with k6",     dur: "20 min", level: "Intermediate" },
  { id: "a4", title: "SQL: Joins, Windows & CTEs",      dur: "30 min", level: "Intermediate–Advanced" },
];

function AssessmentFlow({ skill, onComplete, onClose }: { skill: Skill | null; onComplete: (ev: EvidenceItem) => void; onClose: () => void }) {
  const [step, setStep] = useState<"select" | "detail" | "done">("select");
  const [selected, setSelected] = useState<typeof ASSESSMENTS[0] | null>(null);

  const relevant = skill
    ? ASSESSMENTS.filter((a) => a.title.toLowerCase().includes(skill.name.toLowerCase().split(" ")[0]) || a.title.toLowerCase().includes(skill.name.toLowerCase().split("/")[0].trim()))
    : ASSESSMENTS;
  const list = relevant.length > 0 ? relevant : ASSESSMENTS;

  if (step === "done") return (
    <ModalShell title="Assessment started" onClose={onClose}
      footer={<Button className="w-full" onClick={onClose}>Close and return to Talent DNA</Button>}>
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <div className="grid size-14 place-items-center rounded-full bg-[#e7f2ec] text-[#276c4f]"><ShieldCheck className="size-7" /></div>
        <div>
          <div className="text-[16px] font-bold text-ink">{selected?.title}</div>
          <div className="mt-1 text-[13px] text-muted">Your result will appear as evidence once submitted.</div>
        </div>
        <div className="w-full rounded-[10px] border border-brand-100 bg-brand-50 px-4 py-3 text-[13px] text-brand-800">
          Evidence type: <strong>Assessment</strong> · Status will be <strong>Pending review</strong> until scored.
        </div>
      </div>
    </ModalShell>
  );

  if (step === "detail" && selected) return (
    <ModalShell eyebrow="Assessment details" title={selected.title} onClose={onClose}
      footer={
        <div className="flex gap-2">
          <Button onClick={() => {
            const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
            onComplete({ type: "Assessment", label: `${selected.title} — in progress`, date: today, state: "pending" });
            setStep("done");
          }}>Start Assessment</Button>
          <button onClick={() => setStep("select")} className="text-[13px] font-medium text-muted hover:text-ink">← Back</button>
        </div>
      }>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[{ l: "Duration", v: selected.dur }, { l: "Level", v: selected.level }, { l: "Evidence type", v: "Assessment" }].map((m) => (
            <div key={m.l} className="rounded-[10px] border border-line-soft bg-raised px-3 py-2.5">
              <div className="text-[10.5px] font-semibold uppercase tracking-wide text-faint">{m.l}</div>
              <div className="mt-1 text-[13.5px] font-bold text-ink">{m.v}</div>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] border border-line bg-surface p-4 text-[13px] text-muted leading-relaxed">
          This assessment tests your practical knowledge with real-world scenarios. Your score is verified by HireFit and added directly to your Talent DNA as evidence.
        </div>
      </div>
    </ModalShell>
  );

  return (
    <ModalShell eyebrow={skill ? `Add Evidence · ${skill.name}` : "Take Assessment"} title="Choose an assessment"
      subtitle="Assessments are scored and verified — they create the strongest evidence." onClose={onClose}
      footer={<button onClick={onClose} className="text-[13px] font-medium text-muted hover:text-ink">Cancel</button>}>
      <div className="space-y-2">
        {list.map((a) => (
          <button key={a.id} onClick={() => { setSelected(a); setStep("detail"); }}
            className="flex w-full items-center gap-4 rounded-[11px] border border-line bg-canvas px-4 py-3.5 text-left transition-all hover:border-brand-300 hover:bg-brand-50">
            <div className="grid size-9 shrink-0 place-items-center rounded-[9px] bg-brand-100 text-brand-600"><ClipboardCheck className="size-[18px]" /></div>
            <div className="flex-1">
              <div className="text-[13.5px] font-semibold text-ink">{a.title}</div>
              <div className="text-[12px] text-muted">{a.dur} · {a.level}</div>
            </div>
            <ChevronRight className="size-4 shrink-0 text-faint" />
          </button>
        ))}
      </div>
    </ModalShell>
  );
}

/* ——— Interview flow (2 steps) ——— */
function InterviewFlow({ skill, onComplete, onClose }: { skill: Skill | null; onComplete: (ev: EvidenceItem) => void; onClose: () => void }) {
  const [mode, setMode] = useState<"practice" | "verified" | null>(null);
  const [step, setStep] = useState<"choose" | "setup" | "done">("choose");

  if (step === "done") return (
    <ModalShell title="Interview scheduled" onClose={onClose}
      footer={<Button className="w-full" onClick={onClose}>Return to Talent DNA</Button>}>
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <div className="grid size-14 place-items-center rounded-full bg-[#e7f2ec] text-[#276c4f]"><CalendarClock className="size-7" /></div>
        <div>
          <div className="text-[16px] font-bold text-ink">{mode === "verified" ? "Verified" : "Practice"} AI Interview</div>
          <div className="mt-1 text-[13px] text-muted">{mode === "verified" ? "Your result will be scored and added as verified evidence." : "Practice results are not added as evidence."}</div>
        </div>
        {mode === "verified" && (
          <div className="w-full rounded-[10px] border border-brand-100 bg-brand-50 px-4 py-3 text-[13px] text-brand-800">
            Evidence type: <strong>Interview</strong> · Status will be <strong>Pending review</strong> after completion.
          </div>
        )}
      </div>
    </ModalShell>
  );

  if (step === "setup") return (
    <ModalShell eyebrow={mode === "verified" ? "Verified Interview" : "Practice Interview"} title="Interview setup"
      onClose={onClose}
      footer={
        <div className="flex gap-2">
          <Button onClick={() => {
            if (mode === "verified") {
              const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
              onComplete({ type: "Interview", label: "Verified AI Interview — in progress", date: today, state: "pending" });
            }
            setStep("done");
          }}>
            {mode === "verified" ? "Start Verified Interview" : "Start Practice"}
          </Button>
          <button onClick={() => setStep("choose")} className="text-[13px] font-medium text-muted hover:text-ink">← Back</button>
        </div>
      }>
      <div className="space-y-3 text-[13.5px] text-muted">
        <div className="rounded-[10px] border border-line bg-surface p-4 leading-relaxed">
          {mode === "verified"
            ? "A 20–30 min structured interview covering competencies for your target role. Your answers are scored by HireFit and added as verified interview evidence."
            : "A full practice run using the same format as the verified interview. Results are private and not added to your Talent DNA."}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[{ l: "Duration", v: "20–30 min" }, { l: "Format", v: "AI-structured, text" }].map((m) => (
            <div key={m.l} className="rounded-[10px] border border-line-soft bg-raised px-3 py-2.5">
              <div className="text-[10.5px] font-semibold uppercase tracking-wide text-faint">{m.l}</div>
              <div className="mt-1 text-[13.5px] font-bold text-ink">{m.v}</div>
            </div>
          ))}
        </div>
      </div>
    </ModalShell>
  );

  return (
    <ModalShell eyebrow={skill ? `Add Evidence · ${skill.name}` : "Start Interview"} title="Choose interview type" onClose={onClose}
      footer={<button onClick={onClose} className="text-[13px] font-medium text-muted hover:text-ink">Cancel</button>}>
      <div className="grid gap-3">
        {[
          { id: "practice" as const, label: "Practice Interview", desc: "Same format, no evidence created. Safe to try first.", badge: "" },
          { id: "verified" as const, label: "Verified Interview",  desc: "Scored result added to your Talent DNA as verified evidence.", badge: "Recommended" },
        ].map((opt) => (
          <button key={opt.id} onClick={() => { setMode(opt.id); setStep("setup"); }}
            className={cx("flex items-start gap-4 rounded-[12px] border px-5 py-4 text-left transition-all hover:border-brand-300 hover:bg-brand-50",
              opt.id === "verified" ? "border-brand-200 bg-brand-50/50" : "border-line bg-surface")}>
            <div className={cx("grid size-9 shrink-0 place-items-center rounded-[9px]", opt.id === "verified" ? "bg-brand-500 text-white" : "bg-brand-100 text-brand-600")}>
              <CalendarClock className="size-[18px]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="text-[14px] font-semibold text-ink">{opt.label}</div>
                {opt.badge && <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[11px] font-semibold text-white">{opt.badge}</span>}
              </div>
              <div className="mt-0.5 text-[12.5px] text-muted">{opt.desc}</div>
            </div>
            <ChevronRight className="mt-0.5 size-4 shrink-0 text-faint" />
          </button>
        ))}
      </div>
    </ModalShell>
  );
}

/* ——— Work sample flow ——— */
function WorkSampleFlow({ skill, onComplete, onClose }: { skill: Skill | null; onComplete: (ev: EvidenceItem) => void; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");

  const canSubmit = title.trim().length > 0 && (url.trim().length > 0 || desc.trim().length > 0);

  return (
    <ModalShell eyebrow={skill ? `Add Evidence · ${skill.name}` : "Add Work Sample"} title="Add Work Sample"
      subtitle="Link a project, repository, or file that demonstrates this skill."
      onClose={onClose}
      footer={
        <div className="flex gap-2">
          <Button disabled={!canSubmit} onClick={() => {
            const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
            onComplete({ type: "Portfolio", label: title, date: today, state: "partial" });
          }}>
            <Award className="size-4" /> Submit Work Sample
          </Button>
          <button onClick={onClose} className="ml-auto text-[13px] font-medium text-muted hover:text-ink">Cancel</button>
        </div>
      }>
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-ink">Title <span className="text-[#b5443a]">*</span></label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. E2E Test Suite — Playwright"
            className="w-full rounded-[9px] border border-line bg-canvas px-3 py-2.5 text-[14px] text-ink placeholder:text-faint focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </div>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-ink">Link or URL</label>
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://github.com/…"
            className="w-full rounded-[9px] border border-line bg-canvas px-3 py-2.5 text-[14px] text-ink placeholder:text-faint focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </div>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-ink">Description</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} placeholder="Briefly describe what this sample demonstrates…"
            className="w-full rounded-[9px] border border-line bg-canvas px-3 py-2.5 text-[14px] text-ink placeholder:text-faint focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 resize-none" />
        </div>
        <div className="rounded-[9px] border border-line-soft bg-raised px-3 py-2.5 text-[12.5px] text-muted">
          Work samples are added as <strong className="text-ink">Partially Verified</strong> evidence until reviewed by HireFit.
        </div>
      </div>
    </ModalShell>
  );
}

/* ——— Manual claim flow ——— */
function ManualClaimFlow({ skill, onComplete, onClose }: { skill: Skill | null; onComplete: (ev: EvidenceItem, newLevel: string) => void; onClose: () => void }) {
  const [level, setLevel] = useState<Level>("Intermediate");
  const [context, setContext] = useState("");

  return (
    <ModalShell eyebrow={skill ? `Add Claim · ${skill.name}` : "Add Skill Claim"} title="Add Manual Claim"
      subtitle="Self-reported claims are shown as Claimed Only. Add evidence later to verify."
      onClose={onClose}
      footer={
        <div className="flex gap-2">
          <Button onClick={() => {
            const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
            onComplete({ type: "Candidate Claim", label: context || `Self-reported ${level}`, date: today, state: "partial" }, level);
          }}>
            Save Claim
          </Button>
          <button onClick={onClose} className="ml-auto text-[13px] font-medium text-muted hover:text-ink">Cancel</button>
        </div>
      }>
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-[12.5px] font-semibold text-ink">Claimed level</label>
          <div className="grid grid-cols-4 gap-2">
            {LEVELS.map((l) => (
              <button key={l} onClick={() => setLevel(l)}
                className={cx("rounded-[9px] border px-3 py-2.5 text-[13px] font-semibold transition-colors",
                  level === l ? "border-brand-500 bg-brand-50 text-brand-700" : "border-line bg-surface text-ink-soft hover:border-brand-200")}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-ink">Context <span className="text-faint font-normal">(optional)</span></label>
          <textarea value={context} onChange={(e) => setContext(e.target.value)} rows={3}
            placeholder="e.g. Used daily at previous role, 2 years experience…"
            className="w-full rounded-[9px] border border-line bg-canvas px-3 py-2.5 text-[14px] text-ink placeholder:text-faint focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 resize-none" />
        </div>
        <div className="rounded-[9px] border border-line-soft bg-raised px-3 py-2.5 text-[12.5px] text-muted">
          This claim will be shown as <strong className="text-ink">Claimed Only</strong> until you add verified evidence.
        </div>
      </div>
    </ModalShell>
  );
}

/* ——— Add skill modal ——— */
function AddSkillModal({ existingNames, onAdd, onClose }: { existingNames: string[]; onAdd: (skill: Skill) => void; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [level, setLevel] = useState<Level>("Intermediate");
  const [step, setStep] = useState<"search" | "level">("search");

  const allSkills = SKILL_TAXONOMY.flatMap((g) => g.skills.map((s) => ({ skill: s, family: g.family })));
  const filtered = query.trim()
    ? allSkills.filter((s) => s.skill.toLowerCase().includes(query.toLowerCase()) && !existingNames.includes(s.skill))
    : allSkills.filter((s) => !existingNames.includes(s.skill));

  const selectedFamily = allSkills.find((s) => s.skill === selected)?.family ?? "Other";

  if (step === "level" && selected) return (
    <ModalShell eyebrow="Add Skill" title={selected} subtitle="What level would you claim for this skill right now?" onClose={onClose}
      footer={
        <div className="flex gap-2">
          <Button onClick={() => {
            onAdd({
              name: selected, family: selectedFamily,
              claimed: level, evidenced: "None",
              conf: "Low", count: 0, verified: "—", state: "claimed", evidence: [],
            });
          }}>Add to Talent DNA</Button>
          <button onClick={() => setStep("search")} className="text-[13px] font-medium text-muted hover:text-ink">← Back</button>
        </div>
      }>
      <div className="grid grid-cols-2 gap-3">
        {LEVELS.map((l) => (
          <button key={l} onClick={() => setLevel(l)}
            className={cx("flex flex-col items-start rounded-[11px] border px-4 py-3.5 text-left transition-colors",
              level === l ? "border-brand-500 bg-brand-50" : "border-line bg-surface hover:border-brand-200 hover:bg-raised")}>
            <div className="text-[14px] font-semibold text-ink">{l}</div>
            <div className="mt-0.5 text-[12px] text-muted">
              {l === "Basic" ? "Aware, some exposure" : l === "Intermediate" ? "Can apply independently" : l === "Advanced" ? "Deep, production-level" : "Industry-leading expertise"}
            </div>
          </button>
        ))}
      </div>
    </ModalShell>
  );

  return (
    <ModalShell eyebrow="Add Skill" title="Search skills" subtitle="Find a skill from the HireFit taxonomy to add to your profile." onClose={onClose}
      footer={<button onClick={onClose} className="text-[13px] font-medium text-muted hover:text-ink">Cancel</button>}>
      <div className="mb-3">
        <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search skills…"
          className="w-full rounded-[9px] border border-line bg-canvas px-3 py-2.5 text-[14px] text-ink placeholder:text-faint focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
      </div>
      <div className="space-y-1 max-h-[320px] overflow-y-auto">
        {filtered.slice(0, 20).map((s) => (
          <button key={s.skill} onClick={() => { setSelected(s.skill); setStep("level"); }}
            className="flex w-full items-center gap-3 rounded-[9px] px-3 py-2.5 text-left transition-colors hover:bg-brand-50">
            <div className="flex-1">
              <div className="text-[13.5px] font-semibold text-ink">{s.skill}</div>
              <div className="text-[12px] text-faint">{s.family}</div>
            </div>
            <ChevronRight className="size-4 shrink-0 text-faint" />
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="py-8 text-center text-[13px] text-faint">No skills found for &ldquo;{query}&rdquo;</div>
        )}
      </div>
    </ModalShell>
  );
}

/* ——— Edit claim modal ——— */
function EditClaimModal({ skill, onSave, onClose }: { skill: Skill; onSave: (level: Level) => void; onClose: () => void }) {
  const [level, setLevel] = useState<Level>((skill.claimed as Level) ?? "Intermediate");
  return (
    <ModalShell eyebrow={`Edit Claim · ${skill.name}`} title="Update claimed level" subtitle="Adjust what level you claim for this skill." onClose={onClose}
      footer={
        <div className="flex gap-2">
          <Button onClick={() => onSave(level)}>Save Claim</Button>
          <button onClick={onClose} className="ml-auto text-[13px] font-medium text-muted hover:text-ink">Cancel</button>
        </div>
      }>
      <div className="grid grid-cols-2 gap-3">
        {LEVELS.map((l) => (
          <button key={l} onClick={() => setLevel(l)}
            className={cx("rounded-[11px] border px-4 py-3.5 text-left transition-colors",
              level === l ? "border-brand-500 bg-brand-50" : "border-line bg-surface hover:border-brand-200")}>
            <div className="text-[14px] font-semibold text-ink">{l}</div>
          </button>
        ))}
      </div>
    </ModalShell>
  );
}

/* ——— Voice discovery modal ——— */
function VoiceDiscoveryModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"intro" | "recording" | "done">("intro");
  return (
    <ModalShell eyebrow="Getting started" title="Voice Career Discovery" subtitle="Tell your career story in 5 minutes. HireFit extracts your skills automatically." onClose={onClose}
      footer={
        step === "intro" ? (
          <div className="flex gap-2">
            <Button onClick={() => setStep("recording")}><Mic className="size-4" /> Start recording</Button>
            <button onClick={onClose} className="ml-auto text-[13px] font-medium text-muted hover:text-ink">Cancel</button>
          </div>
        ) : step === "recording" ? (
          <Button className="w-full" onClick={() => setStep("done")}>Stop &amp; Analyse</Button>
        ) : (
          <Button className="w-full" onClick={onClose}>Close</Button>
        )
      }>
      {step === "intro" && (
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="grid size-16 place-items-center rounded-full bg-brand-100 text-brand-600"><Mic className="size-8" /></div>
            <div className="text-center text-[13.5px] text-muted max-w-[320px]">Answer a few short questions out loud. HireFit listens and maps what you say to skills in the taxonomy.</div>
          </div>
          {["Tell me about your most recent role.", "What tools or technologies do you use most?", "What are you proudest of professionally?"].map((q, i) => (
            <div key={i} className="flex gap-3 rounded-[10px] border border-line bg-raised px-4 py-3">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-500 text-[11px] font-bold text-white">{i + 1}</span>
              <div className="text-[13.5px] text-ink">{q}</div>
            </div>
          ))}
        </div>
      )}
      {step === "recording" && (
        <div className="flex flex-col items-center gap-5 py-8 text-center">
          <div className="relative grid size-20 place-items-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-brand-500/20" />
            <div className="grid size-16 place-items-center rounded-full bg-brand-500 text-white"><Mic className="size-8" /></div>
          </div>
          <div className="text-[15px] font-semibold text-ink">Recording…</div>
          <div className="text-[13px] text-muted">Speak naturally. HireFit will analyse when you stop.</div>
        </div>
      )}
      {step === "done" && (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <div className="grid size-14 place-items-center rounded-full bg-[#e7f2ec] text-[#276c4f]"><ShieldCheck className="size-7" /></div>
          <div className="text-[15px] font-semibold text-ink">Discovery complete</div>
          <div className="text-[13px] text-muted">Skills extracted from your recording will appear in Talent DNA shortly.</div>
        </div>
      )}
    </ModalShell>
  );
}

/* ——— Add evidence select → sub-flow dispatcher ——— */
type ActiveFlow =
  | null
  | { kind: "select";   skill: Skill }
  | { kind: "resume";   skill: Skill | null }
  | { kind: "assessment"; skill: Skill | null }
  | { kind: "interview";  skill: Skill | null }
  | { kind: "sample";     skill: Skill | null }
  | { kind: "claim";      skill: Skill }
  | { kind: "add-skill" }
  | { kind: "edit-claim"; skill: Skill }
  | { kind: "voice" }
  | { kind: "add-target-role" };

/* ——— Skill detail panel ——— */
function SkillPanel({
  skill,
  onClose,
  onAddEvidence,
  onEditClaim,
}: {
  skill: Skill;
  onClose: () => void;
  onAddEvidence: () => void;
  onEditClaim: () => void;
}) {
  const sc = SKILL_STATE[skill.state];
  const noEv = skill.evidenced === "None" || skill.evidenced === "";
  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]" onClick={onClose} />
      <div className="tie-fade relative flex h-full w-full max-w-[480px] flex-col border-l border-line bg-surface shadow-[var(--shadow-pop)]">
        <div className="flex items-start justify-between border-b border-line px-6 py-5">
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-faint">{skill.family}</span>
              <StatusBadge tone={sc.tone}>{sc.label}</StatusBadge>
            </div>
            <h3 className="text-[21px] font-bold tracking-tight text-ink">{skill.name}</h3>
          </div>
          <button onClick={onClose} className="grid size-9 place-items-center rounded-[9px] text-muted hover:bg-line-soft">
            <X className="size-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="grid grid-cols-2 gap-3">
            {[
              { l: "Claimed level",   v: skill.claimed,              note: "What you reported" },
              { l: "Evidenced level", v: noEv ? "—" : skill.evidenced, note: "Backed by evidence" },
              { l: "Confidence",      v: skill.conf,                 note: "Evidence strength" },
              { l: "Last verified",   v: skill.verified,             note: "Most recent check" },
            ].map((m) => (
              <div key={m.l} className="rounded-[10px] border border-line-soft bg-raised px-3 py-3">
                <div className="text-[10.5px] font-semibold uppercase tracking-wide text-faint">{m.l}</div>
                <div className="mt-1 text-[15px] font-bold text-ink">{m.v}</div>
                <div className="mt-0.5 text-[11px] text-faint">{m.note}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-[10px] border border-line-soft bg-raised px-4 py-3.5">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-faint">Skill level</div>
            <SkillLevel claimed={skill.claimed} evidenced={noEv ? undefined : skill.evidenced} />
            <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-ink-soft">
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-4 rounded-full bg-brand-500" /> Evidenced</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-4 rounded-full bg-brand-200" /> Claimed only</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-4 rounded-full bg-line" /> Not reached</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-[13px] font-semibold uppercase tracking-wide text-faint">Evidence ({skill.count})</h4>
              <button onClick={onAddEvidence} className="text-[12.5px] font-semibold text-brand-600 hover:text-brand-700">+ Add evidence</button>
            </div>
            {skill.evidence.length === 0 ? (
              <div className="rounded-[11px] border border-dashed border-line bg-canvas px-5 py-6 text-center">
                <div className="text-[13.5px] font-semibold text-ink">No evidence yet</div>
                <p className="mx-auto mt-1 max-w-[260px] text-[12.5px] text-muted">
                  This skill is claimed only. Add evidence to confirm your level and unlock verified matches.
                </p>
                <Button className="mt-4" onClick={onAddEvidence}><ShieldCheck className="size-4" /> Add first evidence</Button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {skill.evidence.map((e, i) => {
                  const ev = EV_STATE[e.state];
                  return (
                    <div key={i} className="rounded-[11px] border border-line bg-surface p-3.5">
                      <div className="flex items-center justify-between gap-3">
                        <span className={cx("rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold", EVIDENCE_COLORS[e.type] ?? "bg-line text-muted")}>{e.type}</span>
                        <StatusBadge tone={ev.tone}>{ev.label}</StatusBadge>
                      </div>
                      <div className="mt-2 text-[14px] font-medium text-ink">{e.label}</div>
                      <div className="text-[12.5px] text-muted">{e.date}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2.5 border-t border-line px-6 py-4">
          <Button className="flex-1" onClick={onAddEvidence}><ShieldCheck className="size-4" /> Add Evidence</Button>
          <Button variant="secondary" className="shrink-0" onClick={onEditClaim}>Edit Claim</Button>
        </div>
      </div>
    </div>
  );
}

/* ——— Overview tab: Profile Identity card ——— */
function ProfileCard({ data, isNew }: { data: ProfileIdentity; isNew: boolean }) {
  const VISIBILITY_LABEL: Record<ProfileIdentity["visibility"], string> = {
    private: "Profile is private",
    matched: "Visible to matched employers",
    open: "Open to verified employers",
  };

  if (isNew || !data.name) {
    return (
      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-ink">Professional Identity</h3>
          <Button size="sm" variant="secondary">+ Complete profile</Button>
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
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[15px] font-bold text-ink">Professional Identity</h3>
        <Button size="sm" variant="ghost">Edit</Button>
      </div>
      <div className="flex items-start gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-100 text-[16px] font-bold text-brand-700">
          {data.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
        <div className="flex-1">
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

/* ——— Overview tab: Target Roles ——— */
function TargetRolesCard({
  roles, isNew, onViewReadiness, onAdd,
}: { roles: TargetRole[]; isNew: boolean; onViewReadiness?: () => void; onAdd?: () => void }) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[15px] font-bold text-ink">Target Roles</h3>
          <p className="mt-0.5 text-[12.5px] text-muted">
            Each target role has its own readiness score based on how your evidence matches that role.
          </p>
        </div>
        <Button size="sm" variant="secondary" className="shrink-0" onClick={onAdd}>+ Add role</Button>
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
              <div key={role.id} className="flex items-center gap-4 rounded-[11px] border border-line bg-raised px-4 py-3.5">
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
                <Button variant="secondary" size="sm" onClick={onViewReadiness}>
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

/* ——— Experience tab: Work History ——— */
function WorkHistorySection({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <div>
      <SectionTitle title="Work Experience" action={
        <Button size="sm" variant="secondary">+ Add experience</Button>
      } />
      <Card className="overflow-hidden">
        {entries.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-3 grid size-12 place-items-center rounded-[11px] bg-brand-50 text-brand-600">
              <Briefcase className="size-6" />
            </div>
            <div className="text-[13.5px] font-semibold text-ink">No work experience added</div>
            <p className="mt-1 text-[12.5px] text-muted">
              Add your work history. Skills mentioned in your roles can be used as supporting evidence.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-line-soft">
            {entries.map((e, idx) => (
              <div key={e.id} className="flex gap-4 px-5 py-4">
                <div className="flex flex-col items-center pt-1">
                  <div className="grid size-8 shrink-0 place-items-center rounded-[8px] bg-brand-100 text-brand-600">
                    <Building2 className="size-4" />
                  </div>
                  {idx < entries.length - 1 && (
                    <div className="mt-2 flex-1 border-l-2 border-dashed border-line-soft" />
                  )}
                </div>
                <div className={cx("flex-1", idx < entries.length - 1 && "pb-4")}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[14.5px] font-bold text-ink">{e.role}</div>
                      <div className="text-[13px] text-muted">
                        {e.company} · {e.start}–{e.end ?? "Present"}
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">Edit</Button>
                  </div>
                  <p className="mt-2 text-[13px] text-muted">{e.desc}</p>
                  {e.skills.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {e.skills.map((s) => (
                        <span key={s} className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[12px] font-medium text-brand-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

/* ——— Experience tab: Education ——— */
function EducationSection({ entries }: { entries: EducationEntry[] }) {
  return (
    <div>
      <SectionTitle title="Education &amp; Certifications" action={
        <Button size="sm" variant="secondary">+ Add education</Button>
      } />
      <Card className="overflow-hidden">
        {entries.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-3 grid size-12 place-items-center rounded-[11px] bg-brand-50 text-brand-600">
              <GraduationCap className="size-6" />
            </div>
            <div className="text-[13.5px] font-semibold text-ink">No education added</div>
            <p className="mt-1 text-[12.5px] text-muted">
              Add your degrees, diplomas, or professional certifications.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-line-soft">
            {entries.map((e) => (
              <div key={e.id} className="flex items-center gap-4 px-5 py-4">
                <div className="grid size-8 shrink-0 place-items-center rounded-[8px] bg-brand-100 text-brand-600">
                  <GraduationCap className="size-4" />
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-bold text-ink">{e.degree}</div>
                  <div className="text-[12.5px] text-muted">{e.institution} · {e.year}</div>
                </div>
                <Button size="sm" variant="ghost">Edit</Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

/* ——— Experience tab: Projects ——— */
function ProjectsSection({ entries }: { entries: ProjectEntry[] }) {
  return (
    <div>
      <SectionTitle title="Projects &amp; Achievements" action={
        <Button size="sm" variant="secondary">+ Add project</Button>
      } />
      <Card className="overflow-hidden">
        {entries.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-3 grid size-12 place-items-center rounded-[11px] bg-brand-50 text-brand-600">
              <Award className="size-6" />
            </div>
            <div className="text-[13.5px] font-semibold text-ink">No projects added</div>
            <p className="mt-1 text-[12.5px] text-muted">
              Add portfolio work, open-source contributions, or achievements that demonstrate your skills.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-line-soft">
            {entries.map((e) => (
              <div key={e.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[14px] font-bold text-ink">{e.title}</div>
                    <div className="text-[12px] font-medium text-brand-600">{e.url}</div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-[12px] text-faint">{e.date}</span>
                    <Button size="sm" variant="ghost">Edit</Button>
                  </div>
                </div>
                <p className="mt-1.5 text-[13px] text-muted">{e.desc}</p>
                {e.skills.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {e.skills.map((s) => (
                      <span key={s} className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[12px] font-medium text-brand-700">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

/* ——— Evidence tab ——— */
function EvidenceTab({ skills }: { skills: Skill[] }) {
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
                  <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                    <span className={cx("shrink-0 rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold", EVIDENCE_COLORS[e.type] ?? "bg-line text-muted")}>
                      {e.type}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13.5px] font-semibold text-ink">{e.label}</div>
                      <div className="text-[12px] text-muted">Skill: {e.skillName} · {e.date}</div>
                    </div>
                    <StatusBadge tone={ev.tone}>{ev.label}</StatusBadge>
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

/* ——— Settings tab ——— */
const CONSENT_ITEMS = [
  { purpose: "Profile processing", desc: "Allows HireFit to build your Talent DNA and calculate readiness scores.", status: "Active" as const, date: "14 Aug 2026" },
  { purpose: "Employer visibility", desc: "Allows matched employers to view your evidenced skills and readiness.", status: "Active" as const, date: "14 Aug 2026" },
  { purpose: "Aggregate analytics", desc: "Allows anonymized participation in platform-level analytics and benchmarking.", status: "Active" as const, date: "14 Aug 2026" },
  { purpose: "Marketing communications", desc: "Allows HireFit to send product updates and feature announcements.", status: "Withdrawn" as const, date: "20 Aug 2026" },
];

function SettingsTab({
  profile, onChange,
}: { profile: ProfileIdentity; onChange: (p: ProfileIdentity) => void }) {
  const VISIBILITY_OPTIONS: { value: ProfileIdentity["visibility"]; label: string; desc: string }[] = [
    { value: "private", label: "Private", desc: "Not discoverable by employers. You can still apply to specific roles." },
    { value: "matched", label: "Visible to matched employers", desc: "Employers whose Job DNA matches your profile can view you." },
    { value: "open",    label: "Open to verified employers",  desc: "Any verified employer on HireFit can find and view your profile." },
  ];

  return (
    <div className="space-y-6">
      <div>
        <SectionTitle title="Visibility" />
        <Card className="overflow-hidden">
          <div className="divide-y divide-line-soft">
            {VISIBILITY_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={cx(
                  "flex cursor-pointer items-start gap-4 px-5 py-4 transition-colors hover:bg-brand-50/30",
                  profile.visibility === opt.value && "bg-brand-50",
                )}
              >
                <div className="mt-0.5 shrink-0">
                  <div className={cx(
                    "grid size-4 place-items-center rounded-full border-2 transition-colors",
                    profile.visibility === opt.value ? "border-brand-500 bg-brand-500" : "border-line bg-surface",
                  )}>
                    {profile.visibility === opt.value && <div className="size-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-semibold text-ink">{opt.label}</div>
                  <div className="mt-0.5 text-[12.5px] text-muted">{opt.desc}</div>
                </div>
                <input type="radio" className="sr-only" checked={profile.visibility === opt.value}
                  onChange={() => onChange({ ...profile, visibility: opt.value })} />
              </label>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <SectionTitle title="Open to Work" />
        <Card className="flex items-center justify-between gap-4 p-5">
          <div>
            <div className="text-[14px] font-semibold text-ink">Show &ldquo;Open to Work&rdquo; status</div>
            <div className="mt-0.5 text-[12.5px] text-muted">
              Adds an open-to-work badge to your profile when your visibility setting allows it.
            </div>
          </div>
          <button
            onClick={() => onChange({ ...profile, openToWork: !profile.openToWork })}
            role="switch"
            aria-checked={profile.openToWork}
            className={cx(
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors",
              profile.openToWork ? "bg-brand-500" : "bg-line",
            )}
          >
            <span className={cx(
              "inline-block size-4 rounded-full bg-white shadow transition-transform",
              profile.openToWork ? "translate-x-6" : "translate-x-1",
            )} />
          </button>
        </Card>
      </div>

      <div>
        <SectionTitle title="Consent Centre" />
        <Card className="overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-line bg-raised px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-faint">
            <div>Purpose</div>
            <div>Status</div>
            <div>Date</div>
          </div>
          <div className="divide-y divide-line-soft">
            {CONSENT_ITEMS.map((item) => (
              <div key={item.purpose} className="grid grid-cols-[1fr_auto_auto] items-start gap-4 px-5 py-4">
                <div>
                  <div className="text-[13.5px] font-semibold text-ink">{item.purpose}</div>
                  <div className="mt-0.5 text-[12px] text-muted">{item.desc}</div>
                </div>
                <StatusBadge tone={item.status === "Active" ? "verified" : "neutral"}>
                  {item.status}
                </StatusBadge>
                <div className="whitespace-nowrap text-[12.5px] text-faint">{item.date}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-line px-5 py-3 text-[12px] text-faint">
            Policy version 2.1 &middot;{" "}
            <button className="text-brand-600 hover:underline">View full consent record</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ——— Available target roles catalog ——— */
const AVAILABLE_ROLES: {
  id: string; title: string; family: string; baseReadiness: number; requiredSkills: string[];
}[] = [
  { id: "qa-auto",    title: "QA Automation Engineer",       family: "Quality Assurance",    baseReadiness: 84, requiredSkills: ["API Testing", "Playwright / E2E", "Performance Testing", "CI/CD Pipelines", "SQL", "Test Strategy"] },
  { id: "sdet",       title: "SDET — Platform Engineering",  family: "Software Engineering", baseReadiness: 76, requiredSkills: ["API Testing", "CI/CD Pipelines", "Playwright / E2E", "Performance Testing", "Test Strategy", "SQL"] },
  { id: "test-lead",  title: "Test Lead",                    family: "Quality Assurance",    baseReadiness: 70, requiredSkills: ["Test Strategy", "CI/CD Pipelines", "API Testing", "Communication", "Stakeholder Management"] },
  { id: "qa-eng",     title: "QA Engineer",                  family: "Quality Assurance",    baseReadiness: 80, requiredSkills: ["API Testing", "Playwright / E2E", "SQL", "Test Strategy"] },
  { id: "devops",     title: "DevOps Engineer",              family: "Delivery & Ops",       baseReadiness: 60, requiredSkills: ["CI/CD Pipelines", "Docker", "Kubernetes", "Linux", "Git"] },
];

/* ——— Add target role modal ——— */
function AddTargetRoleModal({
  existingIds,
  skills,
  onAdd,
  onClose,
}: {
  existingIds: string[];
  skills: Skill[];
  onAdd: (role: TargetRole) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<typeof AVAILABLE_ROLES[0] | null>(null);
  const [step, setStep] = useState<"select" | "review">("select");

  const available = AVAILABLE_ROLES.filter((r) => !existingIds.includes(r.id));

  function computeReadiness(role: typeof AVAILABLE_ROLES[0]) {
    const evidenced = role.requiredSkills.filter((rsk) => {
      const match = skills.find((s) => s.name === rsk);
      return match && (match.state === "verified" || match.state === "partial");
    });
    const totalSkills = role.requiredSkills.length;
    const evidencedSkills = evidenced.length;
    const pct = totalSkills > 0 ? evidencedSkills / totalSkills : 0;
    const readiness = Math.round(pct * role.baseReadiness + (1 - pct) * 20);
    const conf: "High" | "Medium" | "Low" = evidencedSkills >= 4 ? "High" : evidencedSkills >= 2 ? "Medium" : "Low";
    return { readiness, evidencedSkills, totalSkills, conf };
  }

  if (step === "review" && selected) {
    const { readiness, evidencedSkills, totalSkills, conf } = computeReadiness(selected);
    const gaps = selected.requiredSkills.filter(
      (rsk) => !skills.find((s) => s.name === rsk && (s.state === "verified" || s.state === "partial")),
    );
    const matched = selected.requiredSkills.filter(
      (rsk) => !!skills.find((s) => s.name === rsk && (s.state === "verified" || s.state === "partial")),
    );

    return (
      <ModalShell
        eyebrow="Add Target Role"
        title={selected.title}
        subtitle={selected.family}
        onClose={onClose}
        footer={
          <div className="flex gap-2">
            <Button
              onClick={() => {
                onAdd({ id: selected.id, title: selected.title, readiness, conf, evidencedSkills, totalSkills });
                onClose();
              }}
            >
              <ShieldCheck className="size-4" /> Add to My Targets
            </Button>
            <button onClick={() => setStep("select")} className="text-[13px] font-medium text-muted hover:text-ink">
              ← Back
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center gap-5 rounded-[12px] border border-line bg-raised p-4">
            <ScoreRing value={readiness} size={72} stroke={6} />
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-wide text-faint">Your current readiness</div>
              <div className="mt-1 text-[24px] font-bold tabular-nums text-ink">{readiness}%</div>
              <div className="mt-1">
                <Confidence level={conf} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[10px] border border-line-soft bg-raised px-3 py-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-wide text-faint">Skills matched</div>
              <div className="mt-1 text-[17px] font-bold text-ink">{evidencedSkills}/{totalSkills}</div>
            </div>
            <div className="rounded-[10px] border border-line-soft bg-raised px-3 py-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-wide text-faint">Skill gaps</div>
              <div className="mt-1 text-[17px] font-bold text-[#8f5a14]">{gaps.length}</div>
            </div>
          </div>
          {matched.length > 0 && (
            <div>
              <div className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[#276c4f]">Skills you already have</div>
              <div className="flex flex-wrap gap-1.5">
                {matched.map((g) => (
                  <span key={g} className="rounded-full bg-[#e7f2ec] px-2.5 py-0.5 text-[12px] font-medium text-[#276c4f]">{g}</span>
                ))}
              </div>
            </div>
          )}
          {gaps.length > 0 && (
            <div>
              <div className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[#8f5a14]">Skills to develop</div>
              <div className="flex flex-wrap gap-1.5">
                {gaps.map((g) => (
                  <span key={g} className="rounded-full bg-[#fbf1e2] px-2.5 py-0.5 text-[12px] font-medium text-[#8f5a14]">{g}</span>
                ))}
              </div>
            </div>
          )}
          <div className="rounded-[9px] border border-line-soft bg-raised px-3 py-2.5 text-[12.5px] text-muted">
            Your readiness score updates automatically as you add evidence and verified skills.
          </div>
        </div>
      </ModalShell>
    );
  }

  return (
    <ModalShell
      eyebrow="Target Roles"
      title="Add a target role"
      subtitle="Choose the role you are working toward. Your readiness score is calculated against it."
      onClose={onClose}
      footer={<button onClick={onClose} className="text-[13px] font-medium text-muted hover:text-ink">Cancel</button>}
    >
      <div className="space-y-2">
        {available.length === 0 ? (
          <div className="py-8 text-center text-[13px] text-faint">All available roles are already in your targets.</div>
        ) : (
          available.map((r) => (
            <button
              key={r.id}
              onClick={() => { setSelected(r); setStep("review"); }}
              className="flex w-full items-center gap-4 rounded-[11px] border border-line bg-canvas px-4 py-3.5 text-left transition-all hover:border-brand-300 hover:bg-brand-50"
            >
              <div className="grid size-9 shrink-0 place-items-center rounded-[9px] bg-brand-100 text-brand-600">
                <Briefcase className="size-[18px]" />
              </div>
              <div className="flex-1">
                <div className="text-[13.5px] font-semibold text-ink">{r.title}</div>
                <div className="text-[12px] text-muted">{r.family} · {r.requiredSkills.length} key skills</div>
              </div>
              <ChevronRight className="size-4 shrink-0 text-faint" />
            </button>
          ))
        )}
      </div>
    </ModalShell>
  );
}

/* ——— Main TalentDNA page ——— */
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
      <div className="mb-6 flex items-start justify-between gap-6">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">Living profile</div>
          <h1 className="mt-1 text-[28px] font-bold tracking-tight text-ink">Talent DNA</h1>
          <p className="mt-1.5 max-w-lg text-[14px] leading-relaxed text-muted">
            Your complete professional profile — skills, experience, evidence, and career goals.
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2.5">
          <div className="flex items-center gap-1 rounded-[9px] border border-line bg-surface p-1">
            {(["new", "returning"] as const).map((p) => (
              <button
                key={p}
                onClick={() => { setProfile(p); setTab("overview"); }}
                className={cx(
                  "rounded-[7px] px-3 py-1.5 text-[12px] font-semibold transition-colors",
                  profile === p ? "bg-brand-500 text-white" : "text-ink-soft hover:bg-canvas",
                )}
              >
                {p === "new" ? "New user" : "Returning user"}
              </button>
            ))}
          </div>
          {!isNew && (
            <div className="text-right text-[12.5px]">
              <span className="font-bold text-ink">{verifiedCount} verified</span>
              <span className="text-muted"> · {skills.length} skills</span>
            </div>
          )}
        </div>
      </div>

      {/* Tab navigation */}
      <div className="mb-6 flex border-b border-line">
        {DNA_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cx(
              "relative px-4 py-2.5 text-[13.5px] font-semibold transition-colors",
              tab === t.id
                ? "text-brand-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-brand-500"
                : "text-muted hover:text-ink",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ——— Overview tab ——— */}
      {tab === "overview" && (
        <div className="space-y-5">
          <ProfileCard data={profileData} isNew={isNew} />
          <TargetRolesCard roles={targetRoles} isNew={isNew} onAdd={() => setFlow({ kind: "add-target-role" })} />
          {isNew && <GettingStarted doneIds={doneSteps} onAction={handleStepAction} />}
          <Card className="flex items-center justify-between gap-4 p-5">
            <div>
              <div className="text-[13.5px] font-bold text-ink">Skills</div>
              <div className="mt-0.5 text-[12.5px] text-muted">
                {isNew
                  ? "No skills added yet. Complete the steps above or add skills manually."
                  : `${verifiedCount} verified · ${skills.filter((s) => s.state === "partial").length} partially verified · ${skills.length} total`
                }
              </div>
            </div>
            <Button size="sm" variant="secondary" onClick={() => isNew ? setFlow({ kind: "add-skill" }) : setTab("skills")}>
              {isNew ? "Add Skills →" : "View all skills →"}
            </Button>
          </Card>
        </div>
      )}

      {/* ——— Skills tab ——— */}
      {tab === "skills" && (
        <div className="space-y-5">
          {isNew && <GettingStarted doneIds={doneSteps} onAction={handleStepAction} />}
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
            <Button size="sm" variant="secondary" onClick={() => setFlow({ kind: "add-skill" })}>
              + Add Skill
            </Button>
          </div>
          {families.length === 0 && (
            <Card className="p-8 text-center">
              <div className="text-[14px] font-semibold text-ink">No skills added yet</div>
              <p className="mt-1 text-[12.5px] text-muted">
                Start the getting-started steps or add a skill manually to build your profile.
              </p>
              <Button className="mt-4" onClick={() => setFlow({ kind: "add-skill" })}>+ Add Skill</Button>
            </Card>
          )}
          {families.map((fam) => {
            const famSkills = skills.filter((s) => s.family === fam);
            return (
              <div key={fam}>
                <SectionTitle eyebrow="Skill family" title={fam} />
                <Card className="overflow-hidden">
                  <div className="grid grid-cols-[1.8fr_1.4fr_1fr_0.8fr_auto] gap-4 border-b border-line bg-raised px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-faint max-lg:grid-cols-[1.8fr_1fr_auto]">
                    <div>Skill</div>
                    <div>Level</div>
                    <div className="max-lg:hidden">Confidence</div>
                    <div className="max-lg:hidden">Evidence</div>
                    <div />
                  </div>
                  <div className="divide-y divide-line-soft">
                    {famSkills.map((s) => {
                      const sc = SKILL_STATE[s.state];
                      const noEv = s.evidenced === "None" || s.evidenced === "";
                      return (
                        <div
                          key={s.name}
                          className="group grid grid-cols-[1.8fr_1.4fr_1fr_0.8fr_auto] items-center gap-4 px-5 py-4 transition-colors hover:bg-brand-50/40 max-lg:grid-cols-[1.8fr_1fr_auto]"
                        >
                          <div>
                            <button onClick={() => setSelectedSkill(s)} className="text-left">
                              <div className="text-[14.5px] font-semibold text-ink group-hover:text-brand-700">
                                {s.name}
                              </div>
                            </button>
                            <div className="mt-1">
                              <StatusBadge tone={sc.tone}>{sc.label}</StatusBadge>
                            </div>
                          </div>
                          <button onClick={() => setSelectedSkill(s)} className="text-left">
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
                          <div className="max-lg:hidden">
                            <Confidence level={s.conf} />
                          </div>
                          <div className="text-[13px] max-lg:hidden">
                            {s.count === 0
                              ? <span className="text-faint">None</span>
                              : <><span className="font-semibold text-ink">{s.count}</span><span> item{s.count !== 1 && "s"}</span></>
                            }
                          </div>
                          <div className="flex items-center gap-1.5">
                            {s.state === "none" || s.state === "claimed" ? (
                              <button
                                onClick={() => openFlow({ kind: "select", skill: s })}
                                className="rounded-[7px] border border-brand-200 bg-brand-50 px-2.5 py-1 text-[12px] font-semibold text-brand-700 transition-colors hover:bg-brand-100"
                              >
                                Add evidence
                              </button>
                            ) : (
                              <button
                                onClick={() => setSelectedSkill(s)}
                                className="rounded-[7px] px-2.5 py-1 text-[12px] font-semibold text-muted transition-colors hover:bg-line-soft hover:text-ink"
                              >
                                View
                              </button>
                            )}
                            <ChevronRight
                              className="size-4 cursor-pointer text-faint"
                              onClick={() => setSelectedSkill(s)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}

      {/* ——— Experience tab ——— */}
      {tab === "experience" && (
        <div className="space-y-8">
          <WorkHistorySection entries={isNew ? [] : EXPERIENCE_FULL} />
          <ProjectsSection entries={isNew ? [] : PROJECTS_FULL} />
          <EducationSection entries={isNew ? [] : EDUCATION_FULL} />
        </div>
      )}

      {/* ——— Evidence tab ——— */}
      {tab === "evidence" && <EvidenceTab skills={skills} />}

      {/* ——— Settings tab ——— */}
      {tab === "settings" && <SettingsTab profile={profileData} onChange={setProfileData} />}

      {/* Skill detail panel */}
      {selectedSkill && (
        <SkillPanel
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onAddEvidence={() => openFlow({ kind: "select", skill: selectedSkill })}
          onEditClaim={() => openFlow({ kind: "edit-claim", skill: selectedSkill })}
        />
      )}

      {/* ——— Flow dispatcher ——— */}
      {flow?.kind === "select" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" onClick={() => setFlow(null)} />
          <div className="tie-fade relative w-full max-w-[520px] overflow-hidden rounded-[16px] border border-line bg-surface shadow-[var(--shadow-pop)]">
            <div className="flex items-start justify-between border-b border-line px-6 py-5">
              <div>
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-faint">Add Evidence</div>
                <h3 className="text-[19px] font-bold tracking-tight text-ink">{flow.skill.name}</h3>
                <p className="mt-1 text-[13px] text-muted">Choose how you want to back this skill with verifiable evidence.</p>
              </div>
              <button onClick={() => setFlow(null)} className="grid size-9 place-items-center rounded-[9px] text-muted hover:bg-line-soft">
                <X className="size-5" />
              </button>
            </div>
            <div className="grid gap-2 p-4">
              {([
                { id: "resume",     Icon: FileText,       label: "Upload Resume / CV",  desc: "Extract skills and experience automatically" },
                { id: "assessment", Icon: ClipboardCheck, label: "Take Assessment",     desc: "Objective skill test with a verified result" },
                { id: "interview",  Icon: CalendarClock,  label: "Start Interview",     desc: "AI-structured competency interview" },
                { id: "sample",     Icon: Award,          label: "Add Work Sample",     desc: "Portfolio link, repository, or project file" },
                { id: "claim",      Icon: FileText,       label: "Add Manual Claim",    desc: "Self-reported — shown as Claimed Only until verified" },
              ] as { id: "resume" | "assessment" | "interview" | "sample" | "claim"; Icon: any; label: string; desc: string }[]).map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => selectEvidenceType(opt.id, flow.skill)}
                  className="flex items-center gap-4 rounded-[11px] border border-line bg-canvas px-4 py-3.5 text-left transition-all hover:border-brand-300 hover:bg-brand-50 hover:shadow-[var(--shadow-card)]"
                >
                  <div className="grid size-9 shrink-0 place-items-center rounded-[9px] bg-brand-100 text-brand-600">
                    <opt.Icon className="size-[18px]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-semibold text-ink">{opt.label}</div>
                    <div className="text-[12.5px] text-muted">{opt.desc}</div>
                  </div>
                  <ChevronRight className="size-4 shrink-0 text-faint" />
                </button>
              ))}
            </div>
            <div className="border-t border-line px-6 py-4">
              <button onClick={() => setFlow(null)} className="text-[13px] font-medium text-muted hover:text-ink">
                Cancel
              </button>
            </div>
          </div>
        </div>
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


/* ============================================================ ROLE READINESS */

export function RoleReadiness() {
  const [roleIdx, setRoleIdx] = useState(0);

  const roleOptions = [
    {
      title: "QA Automation Engineer",
      readiness: 82,
      conf: "High" as const,
      rows: [
        { skill: "API Testing",        req: "Advanced",     cand: "Advanced",     ev: 4, contrib: 22, gap: 0 },
        { skill: "Playwright / E2E",   req: "Advanced",     cand: "Advanced",     ev: 3, contrib: 20, gap: 0 },
        { skill: "Test Strategy",      req: "Advanced",     cand: "Intermediate", ev: 1, contrib: 12, gap: 1 },
        { skill: "CI/CD Pipelines",    req: "Advanced",     cand: "Intermediate", ev: 2, contrib: 11, gap: 1 },
        { skill: "SQL",                req: "Intermediate", cand: "Intermediate", ev: 2, contrib: 9,  gap: 0 },
        { skill: "Performance Testing",req: "Intermediate", cand: "Basic",        ev: 1, contrib: 8,  gap: 2 },
      ],
      oneSkillAway: "Improve Performance Testing",
      oneSkillBoost: "+6%",
      oneSkillDetail: "Basic → Intermediate",
    },
    {
      title: "SDET — Platform Engineering",
      readiness: 71,
      conf: "Medium" as const,
      rows: [
        { skill: "API Testing",        req: "Advanced",     cand: "Advanced",     ev: 4, contrib: 20, gap: 0 },
        { skill: "CI/CD Pipelines",    req: "Advanced",     cand: "Intermediate", ev: 2, contrib: 18, gap: 1 },
        { skill: "Playwright / E2E",   req: "Intermediate", cand: "Advanced",     ev: 3, contrib: 15, gap: 0 },
        { skill: "Performance Testing",req: "Advanced",     cand: "Basic",        ev: 1, contrib: 13, gap: 2 },
        { skill: "Test Strategy",      req: "Intermediate", cand: "Intermediate", ev: 1, contrib: 10, gap: 0 },
        { skill: "SQL",                req: "Basic",        cand: "Intermediate", ev: 2, contrib: 7,  gap: 0 },
      ],
      oneSkillAway: "Improve CI/CD Pipelines",
      oneSkillBoost: "+8%",
      oneSkillDetail: "Intermediate → Advanced",
    },
  ];

  const role = roleOptions[roleIdx];

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">
          Role readiness &middot; explainable score
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {roleOptions.map((r, i) => (
            <button
              key={r.title}
              onClick={() => setRoleIdx(i)}
              className={cx(
                "rounded-[10px] border px-4 py-2 text-[14px] font-semibold transition-colors",
                i === roleIdx
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-line bg-surface text-ink-soft hover:bg-canvas",
              )}
            >
              {r.title}
            </button>
          ))}
          <button className="rounded-[10px] border border-dashed border-line px-4 py-2 text-[14px] font-medium text-faint hover:border-brand-300 hover:text-brand-600">
            + Add target role
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[320px_1fr] gap-6 max-lg:grid-cols-1">
        <Card className="flex flex-col items-center p-6 text-center">
          <ScoreRing value={role.readiness} size={132} stroke={10} />
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[15px] font-bold text-ink">{role.readiness}% Readiness</span>
          </div>
          <div className="mt-2">
            <Confidence level={role.conf} />
          </div>
          <p className="mt-4 max-w-[240px] text-[13px] leading-relaxed text-muted">
            Score reflects evidenced skill levels weighted by role importance. Confidence reflects
            the strength and freshness of that evidence &mdash; shown separately, never merged.
          </p>
          <div className="mt-5 w-full space-y-2 border-t border-line-soft pt-4 text-left">
            <div className="text-[12px] font-semibold uppercase tracking-wide text-faint">
              Strongest skills
            </div>
            {role.rows.filter((r) => r.gap === 0).slice(0, 2).map((r) => (
              <div key={r.skill} className="flex items-center gap-2 text-[13.5px] text-ink">
                <ShieldCheck className="size-4 text-[#2e7d5b]" /> {r.skill}
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="border-brand-200 bg-brand-50 p-5">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-brand-600">
              <TrendingUp className="size-4" /> One skill away
            </div>
            <div className="mt-2 flex items-end justify-between gap-4">
              <div>
                <div className="text-[18px] font-bold text-ink">{role.oneSkillAway}</div>
                <div className="text-[14px] text-brand-700/80">{role.oneSkillDetail}</div>
              </div>
              <div className="text-right">
                <div className="text-[28px] font-bold tabular-nums text-brand-600">{role.oneSkillBoost}</div>
                <div className="text-[12px] text-brand-700/70">potential readiness</div>
              </div>
            </div>
            <p className="mt-3 rounded-[9px] bg-surface/70 px-3 py-2 text-[13px] text-brand-800">
              Complete learning or practice, then re-assess to verify improvement. Learning alone does not
              change your score &mdash; new evidence does.
            </p>
          </Card>

          <Card className="overflow-hidden">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_0.6fr_0.8fr_0.6fr] gap-3 border-b border-line bg-raised px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-faint">
              <div>Skill</div>
              <div>Required</div>
              <div>You</div>
              <div>Evidence</div>
              <div>Contribution</div>
              <div>Gap</div>
            </div>
            <div className="divide-y divide-line-soft">
              {role.rows.map((r) => (
                <div
                  key={r.skill}
                  className="grid grid-cols-[1.4fr_1fr_1fr_0.6fr_0.8fr_0.6fr] items-center gap-3 px-5 py-3.5 text-[13.5px]"
                >
                  <div className="font-semibold text-ink">{r.skill}</div>
                  <div className="text-muted">{r.req}</div>
                  <div className={cx("font-medium", r.gap > 0 ? "text-[#8f5a14]" : "text-ink")}>
                    {r.cand}
                  </div>
                  <div className="text-muted tabular-nums">{r.ev}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-line-soft">
                        <div className="h-full rounded-full bg-brand-500" style={{ width: `${r.contrib * 4}%` }} />
                      </div>
                      <span className="tabular-nums text-muted">{r.contrib}%</span>
                    </div>
                  </div>
                  <div>
                    {r.gap === 0 ? (
                      <span className="text-[12px] font-semibold text-[#2e7d5b]">Met</span>
                    ) : (
                      <span className="rounded-full bg-[#fbf1e2] px-2 py-0.5 text-[12px] font-bold text-[#8f5a14]">
                        -{r.gap}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


/* ============================================================ JOB MATCHES */

export function JobMatches() {
  const jobs = [
    {
      role: "Senior QA Automation Engineer",
      co: "Jahez",
      loc: "Riyadh · Hybrid",
      match: 89,
      conf: "High" as const,
      strong: ["Playwright / E2E", "API Testing", "SQL"],
      gap: ["Performance Testing"],
      saudi: true,
    },
    {
      role: "SDET — Platform Engineering",
      co: "STC Solutions",
      loc: "Riyadh · On-site",
      match: 84,
      conf: "High" as const,
      strong: ["API Testing", "CI/CD Pipelines"],
      gap: ["Test Strategy"],
      saudi: true,
    },
    {
      role: "QA Engineer",
      co: "Tamara",
      loc: "Remote · KSA",
      match: 78,
      conf: "Medium" as const,
      strong: ["Playwright / E2E"],
      gap: ["Performance Testing", "SQL"],
      saudi: false,
    },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">
            Capability-aligned
          </div>
          <h1 className="mt-1 text-[30px] font-bold tracking-tight text-ink">Job Matches</h1>
        </div>
        <div className="flex gap-2">
          {["All roles", "Saved", "Applied"].map((t, i) => (
            <button
              key={t}
              className={cx(
                "rounded-[8px] px-3 py-1.5 text-[13px] font-semibold transition-colors",
                i === 0 ? "bg-brand-500 text-white" : "border border-line bg-surface text-ink-soft hover:bg-canvas",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((j) => (
          <Card key={j.role} className="p-5 transition-shadow hover:shadow-[var(--shadow-raised)]">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex min-w-0 flex-1 gap-4">
                <div className="grid size-12 shrink-0 place-items-center rounded-[11px] bg-brand-100 text-[15px] font-bold text-brand-700">
                  {j.co.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[16px] font-bold text-ink">{j.role}</h3>
                    {j.saudi && <StatusBadge tone="published">National Talent</StatusBadge>}
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[13.5px] text-muted">
                    <span className="font-medium text-ink-soft">{j.co}</span>
                    <span>·</span>
                    <MapPin className="size-3.5" /> {j.loc}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4">
                    <div>
                      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#276c4f]">
                        Strong match
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {j.strong.map((s) => (
                          <span
                            key={s}
                            className="rounded-full bg-[#e7f2ec] px-2.5 py-0.5 text-[12px] font-medium text-[#276c4f]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8f5a14]">
                        Gap
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {j.gap.map((s) => (
                          <span
                            key={s}
                            className="rounded-full bg-[#fbf1e2] px-2.5 py-0.5 text-[12px] font-medium text-[#8f5a14]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between gap-3 border-l border-line-soft pl-5 max-md:flex-row max-md:items-center max-md:border-l-0 max-md:border-t max-md:pl-0 max-md:pt-4">
                <div className="text-right max-md:text-left">
                  <div className="text-[30px] font-bold leading-none tabular-nums text-brand-600">
                    {j.match}%
                  </div>
                  <div className="mt-1 text-[12px] text-faint">match</div>
                  <div className="mt-1.5">
                    <Confidence level={j.conf} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">Save</Button>
                  <Button size="sm">Why you match</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ============================================================ PASSPORT */

export function Passport() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">
            Verified credential
          </div>
          <h1 className="mt-1 text-[30px] font-bold tracking-tight text-ink">Talent Passport</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary"><Share2 className="size-4" /> Share</Button>
          <Button><Award className="size-4" /> Re-issue</Button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-6 max-lg:grid-cols-1">
        {/* passport card */}
        <div className="overflow-hidden rounded-[16px] border border-brand-700 bg-brand-800 text-white shadow-[var(--shadow-raised)]">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 px-7 py-6">
            <div>
              <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-200">
                <ShieldCheck className="size-4" /> HireFit Verified Talent Passport
              </div>
              <h2 className="mt-3 text-[24px] font-bold tracking-tight">Layla Al-Otaibi</h2>
              <div className="text-[14px] text-brand-100">QA Automation Engineer</div>
            </div>
            <div className="rounded-[10px] border border-white/15 bg-white/5 p-2">
              <div className="grid size-16 place-items-center rounded-[6px] bg-white/90">
                <div
                  className="size-14"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg,#211d60 0,#211d60 2px,transparent 2px,transparent 4px)",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 px-7 py-6">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-brand-200">Readiness</div>
              <div className="mt-1 text-[24px] font-bold tabular-nums">82%</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-brand-200">Confidence</div>
              <div className="mt-1 text-[24px] font-bold">High</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-brand-200">Verified skills</div>
              <div className="mt-1 text-[24px] font-bold tabular-nums">9</div>
            </div>
          </div>
          <div className="px-7 pb-6">
            <div className="text-[11px] uppercase tracking-wide text-brand-200">Verified skills</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["API Testing", "Playwright / E2E", "CI/CD Pipelines", "Test Strategy", "SQL"].map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/15 bg-white/8 px-2.5 py-1 text-[12px] font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 px-7 py-4 text-[12px] text-brand-100">
            <span>Verification ID · TIE-KSA-2026-8F3A21</span>
            <span>Issued 14 Aug 2026 · Expires 14 Feb 2027</span>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <SectionTitle title="Passport status" />
            <div className="space-y-3">
              {[
                { l: "Verification state", v: <StatusBadge tone="verified">Verified</StatusBadge> },
                { l: "Employer visibility", v: <StatusBadge tone="published">Visible</StatusBadge> },
                { l: "Public page", v: <StatusBadge tone="neutral">Private</StatusBadge> },
              ].map((r) => (
                <div key={r.l} className="flex items-center justify-between">
                  <span className="text-[13.5px] text-muted">{r.l}</span>
                  {r.v}
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <SectionTitle title="Controls" />
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-start">
                Employer visibility settings
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                Expiration settings
              </Button>
              <button className="mt-1 w-full rounded-[9px] px-4 py-2.5 text-left text-[14px] font-semibold text-[#b5443a] transition-colors hover:bg-[#fbeceb]">
                Revoke passport
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
