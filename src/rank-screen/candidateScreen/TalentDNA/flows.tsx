import {
  ChevronRight,
  ShieldCheck,
  FileText,
  Mic,
  CalendarClock,
  X,
  ClipboardCheck,
  Award,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import {
  Button,
  StatusBadge,
  SkillLevel,
  ScoreRing,
  Confidence,
  cx,
} from "../../../components/primitives";
import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import type { EvidenceItem, Skill, TargetRole, Level } from "./types";
import { LEVELS, SKILL_STATE, EV_STATE, EVIDENCE_COLORS } from "./types";
import { SKILL_TAXONOMY, ASSESSMENTS, AVAILABLE_ROLES } from "./data";

function ModalOverlay({
  onClose,
  children,
  className = "flex items-center justify-center p-4",
  dim = "bg-ink/50 backdrop-blur-md",
}: {
  onClose: () => void;
  children: ReactNode;
  className?: string;
  dim?: string;
}) {
  if (typeof document === "undefined") return null;
  return createPortal(
    <div className={`fixed inset-0 z-[100] ${className}`}>
      <div className={`absolute inset-0 ${dim}`} onClick={onClose} />
      {children}
    </div>,
    document.body,
  );
}

export function ModalShell({
  title, subtitle, eyebrow, onClose, children, footer,
}: {
  title: string; subtitle?: string; eyebrow?: string;
  onClose: () => void; children: ReactNode; footer?: ReactNode;
}) {
  return (
    <ModalOverlay onClose={onClose}>
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
    </ModalOverlay>
  );
}

export function ResumeFlow({ skill, onComplete, onClose, onExtractSkills }: { skill: Skill | null; onComplete: (ev: EvidenceItem) => void; onClose: () => void; onExtractSkills?: (names: string[]) => void }) {
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

export function AssessmentFlow({ skill, onComplete, onClose }: { skill: Skill | null; onComplete: (ev: EvidenceItem) => void; onClose: () => void }) {
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

export function InterviewFlow({ skill, onComplete, onClose }: { skill: Skill | null; onComplete: (ev: EvidenceItem) => void; onClose: () => void }) {
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

export function WorkSampleFlow({ skill, onComplete, onClose }: { skill: Skill | null; onComplete: (ev: EvidenceItem) => void; onClose: () => void }) {
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

export function ManualClaimFlow({ skill, onComplete, onClose }: { skill: Skill | null; onComplete: (ev: EvidenceItem, newLevel: string) => void; onClose: () => void }) {
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

export function AddSkillModal({ existingNames, onAdd, onClose }: { existingNames: string[]; onAdd: (skill: Skill) => void; onClose: () => void }) {
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

export function EditClaimModal({ skill, onSave, onClose }: { skill: Skill; onSave: (level: Level) => void; onClose: () => void }) {
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

export function VoiceDiscoveryModal({ onClose }: { onClose: () => void }) {
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

export function SkillPanel({
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
    <ModalOverlay onClose={onClose} className="flex justify-end" dim="bg-ink/40 backdrop-blur-md">
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
    </ModalOverlay>
  );
}

export function AddTargetRoleModal({
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

export function SelectEvidenceType({
  skill,
  onSelect,
  onClose,
}: {
  skill: Skill;
  onSelect: (kind: "resume" | "assessment" | "interview" | "sample" | "claim") => void;
  onClose: () => void;
}) {
  return (
    <ModalOverlay onClose={onClose}>
      <div className="tie-fade relative w-full max-w-[520px] overflow-hidden rounded-[16px] border border-line bg-surface shadow-[var(--shadow-pop)]">
        <div className="flex items-start justify-between border-b border-line px-6 py-5">
          <div>
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-faint">Add Evidence</div>
            <h3 className="text-[19px] font-bold tracking-tight text-ink">{skill.name}</h3>
            <p className="mt-1 text-[13px] text-muted">Choose how you want to back this skill with verifiable evidence.</p>
          </div>
          <button onClick={onClose} className="grid size-9 place-items-center rounded-[9px] text-muted hover:bg-line-soft">
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
          ] as { id: "resume" | "assessment" | "interview" | "sample" | "claim"; Icon: LucideIcon; label: string; desc: string }[]).map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
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
          <button onClick={onClose} className="text-[13px] font-medium text-muted hover:text-ink">
            Cancel
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}
