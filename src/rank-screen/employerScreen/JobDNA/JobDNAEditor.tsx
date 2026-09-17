import {
    CheckCircle2,
    GripVertical,
    Plus,
    ChevronRight,
    Search as SearchIcon,
    Sparkles,
    Upload,
    Link2,
    Rocket,
    ArrowLeft,
    Trash2,
    X,
  } from "lucide-react";
  import {
    Card,
    Button,
    StatusBadge,
    SkillLevel,
    SectionTitle,
    cx,
  } from "../../../components/primitives";
  import {
    useEmployer,
    TEMPLATE_SKILLS,
    SUGGESTED_SKILLS,
    type Skill,
    type RoleStatus,
    TAXONOMY,
  } from "../employerStore";
import { useState } from "react";
import { PageHead, REQ_LEVELS, STATUS_LABEL, STATUS_TONE } from "../EmployerShared/EmployerShared";




const METHODS = [
    { id: "ai", label: "Write with AI", icon: Sparkles },
    // { id: "paste", label: "Paste JD", icon: ClipboardPaste },
    { id: "file", label: "Upload file", icon: Upload },
    { id: "url", label: "Import URL", icon: Link2 },
    // { id: "template", label: "Start from template", icon: LayoutTemplate },
];


/* ---- Add skill modal ---- */

function AddSkillModal({
  existing,
  onClose,
  onAdd,
}: {
  existing: string[];
  onClose: () => void;
  onAdd: (s: Skill) => void;
}) {
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<{ name: string; family: string } | null>(null);
  const [req, setReq] = useState("Intermediate");
  const [weight, setWeight] = useState(10);
  const [must, setMust] = useState(false);
  const [evidence, setEvidence] = useState("Assessment");
  const [notes, setNotes] = useState("");

  const matches = TAXONOMY.filter(
    (t) => t.name.toLowerCase().includes(query.toLowerCase()) && !existing.includes(t.name),
  );

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/30 p-4" onClick={onClose}>
      <div
        className="tie-fade w-full max-w-md overflow-hidden rounded-[16px] border border-line bg-surface shadow-[var(--shadow-pop)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h3 className="text-[15px] font-bold text-ink">Add skill</h3>
          <button onClick={onClose} className="text-faint hover:text-ink">
            <X className="size-4.5" />
          </button>
        </div>

        <div className="space-y-3.5 p-4">
          <div>
            <span className="mb-1 block text-[13px] font-semibold text-ink">Skill</span>
            {picked ? (
              <div className="flex items-center justify-between rounded-[9px] border border-brand-200 bg-brand-50 px-3 py-2">
                <div>
                  <div className="text-[13.5px] font-semibold text-ink">{picked.name}</div>
                  <div className="text-[11.5px] text-faint">{picked.family}</div>
                </div>
                <button onClick={() => setPicked(null)} className="text-[12.5px] font-semibold text-brand-600">
                  Change
                </button>
              </div>
            ) : (
              <>
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search skills…"
                  className="w-full rounded-[9px] border border-line bg-surface px-3 py-2 text-[14px] text-ink outline-none placeholder:text-faint focus:border-brand-400"
                />
                <div className="mt-1.5 max-h-40 overflow-y-auto rounded-[9px] border border-line-soft">
                  {matches.length === 0 ? (
                    <div className="px-3 py-2.5 text-[13px] text-muted">No matching taxonomy skills.</div>
                  ) : (
                    matches.map((t) => (
                      <button
                        key={t.name}
                        onClick={() => setPicked(t)}
                        className="flex w-full items-center justify-between px-3 py-2 text-left transition-colors hover:bg-brand-50/60"
                      >
                        <span className="text-[13.5px] font-medium text-ink">{t.name}</span>
                        <span className="text-[11.5px] text-faint">{t.family}</span>
                      </button>
                    ))
                  )}
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-[13px] font-semibold text-ink">Required level</span>
              <select
                value={req}
                onChange={(e) => setReq(e.target.value)}
                className="w-full rounded-[9px] border border-line bg-surface px-3 py-2 text-[13.5px] text-ink outline-none"
              >
                {REQ_LEVELS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-[13px] font-semibold text-ink">Requirement</span>
              <select
                value={must ? "Must-have" : "Optional"}
                onChange={(e) => setMust(e.target.value === "Must-have")}
                className="w-full rounded-[9px] border border-line bg-surface px-3 py-2 text-[13.5px] text-ink outline-none"
              >
                <option>Must-have</option>
                <option>Optional</option>
              </select>
            </label>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[13px] font-semibold text-ink">Weight</span>
              <span className="text-[13px] font-bold tabular-nums text-ink">{weight}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={40}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
          </div>

          <label className="block">
            <span className="mb-1 block text-[13px] font-semibold text-ink">
              Target evidence <span className="font-normal text-faint">· optional</span>
            </span>
            <select
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              className="w-full rounded-[9px] border border-line bg-surface px-3 py-2 text-[13.5px] text-ink outline-none"
            >
              {["Assessment", "Interview", "Work Simulation", "Credential"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-[13px] font-semibold text-ink">
              Notes <span className="font-normal text-faint">· optional</span>
            </span>
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Context for reviewers…"
              className="w-full rounded-[9px] border border-line bg-surface px-3 py-2 text-[13.5px] text-ink outline-none placeholder:text-faint focus:border-brand-400"
            />
          </label>
        </div>

        <div className="flex justify-end gap-2 border-t border-line bg-raised px-4 py-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={!picked}
            onClick={() => picked && onAdd({ name: picked.name, family: picked.family, req, weight, must })}
          >
            <Plus className="size-4" /> Add skill
          </Button>
        </div>
      </div>
    </div>
  );
}



  
export function CreateRole({
  hasRoles,
  onCancel,
  onCreated,
}: {
  hasRoles: boolean;
  onCancel: () => void;
  onCreated: () => void;
}) {
  const emp = useEmployer();
  const [method, setMethod] = useState("ai");
  const [title, setTitle] = useState("");
  const [family, setFamily] = useState("Test Automation");
  const [phase, setPhase] = useState<"form" | "parsing" | "review">("form");
  const [proposed, setProposed] = useState<{ skill: Skill; keep: boolean }[]>([]);

  const extracts = method === "ai" || method === "file" || method === "url";

  const submit = () => {
    // if (method === "template") {
    //   emp.createRole(title, family, TEMPLATE_SKILLS);
    //   onCreated();
    //   return;
    // }
    if (!extracts) {
      emp.createRole(title, family, []);
      onCreated();
      return;
    }
    setPhase("parsing");
    setTimeout(() => {
      setProposed(SUGGESTED_SKILLS.map((s) => ({ skill: { ...s }, keep: true })));
      setPhase("review");
    }, 900);
  };

  if (phase === "parsing") {
    return (
      <div className="grid min-h-[360px] place-items-center">
        <div className="text-center">
          <div className="mx-auto size-9 animate-spin rounded-full border-[3px] border-line border-t-brand-500" />
          <div className="mt-4 text-[15px] font-semibold text-ink">
            {method === "ai" ? "Generating Job DNA…" : "Extracting skills…"}
          </div>
          <div className="mt-1 text-[13px] text-muted">Nothing is added until you confirm.</div>
        </div>
      </div>
    );
  }

  if (phase === "review") {
    const kept = proposed.filter((p) => p.keep);
    return (
      <div className="space-y-4">
        <PageHead
          eyebrow={method === "ai" ? "AI suggestions" : "Extracted from job description"}
          title="Review extracted skills"
          sub="These are suggestions — keep, edit or remove, then add the ones you want."
          actions={
            <Button variant="secondary" onClick={() => setPhase("form")}>
              <ArrowLeft className="size-4" /> Back
            </Button>
          }
        />
        <Card className="mx-auto max-w-2xl overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line bg-brand-50 px-4 py-2.5 text-[12.5px] font-semibold text-brand-700">
            <Sparkles className="size-4" /> AI suggestion · not yet part of your Job DNA
          </div>
          <div className="divide-y divide-line-soft">
            {proposed.map((p, i) => (
              <div key={i} className={cx("flex items-center gap-3 px-4 py-3", !p.keep && "opacity-45")}>
                <input
                  type="checkbox"
                  checked={p.keep}
                  onChange={() =>
                    setProposed((arr) => arr.map((x, j) => (j === i ? { ...x, keep: !x.keep } : x)))
                  }
                  className="size-4 accent-brand-500"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-semibold text-ink">{p.skill.name}</div>
                  <div className="text-[11.5px] text-faint">{p.skill.family}</div>
                </div>
                <select
                  value={p.skill.req}
                  onChange={(e) =>
                    setProposed((arr) => arr.map((x, j) => (j === i ? { ...x, skill: { ...x.skill, req: e.target.value } } : x)))
                  }
                  className="rounded-[7px] border border-line bg-surface px-2 py-1 text-[12.5px] text-ink-soft outline-none"
                >
                  {REQ_LEVELS.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={p.skill.weight}
                    onChange={(e) =>
                      setProposed((arr) =>
                        arr.map((x, j) => (j === i ? { ...x, skill: { ...x.skill, weight: Number(e.target.value) } } : x)),
                      )
                    }
                    className="w-14 rounded-[7px] border border-line bg-surface px-2 py-1 text-right text-[12.5px] tabular-nums text-ink outline-none"
                  />
                  <span className="text-[12px] text-faint">%</span>
                </div>
                <button
                  onClick={() =>
                    setProposed((arr) => arr.map((x, j) => (j === i ? { ...x, skill: { ...x.skill, must: !x.skill.must } } : x)))
                  }
                  className={cx(
                    "rounded-full px-2 py-0.5 text-[11.5px] font-semibold transition-colors",
                    p.skill.must ? "bg-brand-500 text-white" : "border border-line text-muted",
                  )}
                >
                  {p.skill.must ? "Must" : "Optional"}
                </button>
                <button
                  onClick={() => setProposed((arr) => arr.filter((_, j) => j !== i))}
                  className="text-faint hover:text-[#b5443a]"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-line bg-raised px-4 py-3">
            <span className="text-[13px] text-muted">{kept.length} selected</span>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => { emp.createRole(title, family, []); onCreated(); }}>
                Start empty
              </Button>
              <Button
                onClick={() => {
                  emp.createRole(title, family, kept.map((p) => p.skill));
                  onCreated();
                }}
              >
                Add selected to Job DNA
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageHead
        eyebrow="New role"
        title="Create role"
        actions={
          hasRoles ? (
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          ) : undefined
        }
      />
      <Card className="mx-auto max-w-xl px-2 py-4 sm:p-6">
        <div className="text-[12px] font-semibold uppercase tracking-wide text-faint">Creation method</div>
        <div className="mt-2.5 grid grid-cols-3 gap-1 md:gap-2">
          {METHODS.map((m) => {
            const on = method === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={cx(
                  "flex flex-col items-center gap-2 rounded-[11px] border p-3 text-center transition-colors",
                  on ? "border-brand-500 bg-brand-50" : "border-line hover:border-brand-200",
                )}
              >
                <m.icon className={cx("size-5", on ? "text-brand-600" : "text-muted")} />
                <span className={cx("text-[12px] font-semibold", on ? "text-brand-700" : "text-ink-soft")}>
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 space-y-3">
          <label className="block">
            <span className="mb-1 block text-[13px] font-semibold text-ink">Role title</span>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior QA Automation Engineer"
              className="w-full rounded-[9px] border border-line bg-surface px-3 py-2.5 text-[14px] text-ink outline-none placeholder:text-faint focus:border-brand-400"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[13px] font-semibold text-ink">Skill family</span>
            <input
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              placeholder="e.g. Test Automation"
              className="w-full rounded-[9px] border border-line bg-surface px-3 py-2.5 text-[14px] text-ink outline-none placeholder:text-faint focus:border-brand-400"
            />
          </label>
          {( method === "file" || method === "url") && (
            <label className="block">
              <span className="mb-1 block text-[13px] font-semibold text-ink">
                {method === "url" ? "Job posting URL" : "Job description"}
              </span>
              <textarea
                rows={method === "url" ? 1 : 4}
                placeholder={method === "url" ? "https://…" : "Paste the job description…"}
                className="w-full resize-none rounded-[9px] border border-line bg-surface px-3 py-2.5 text-[14px] text-ink outline-none placeholder:text-faint focus:border-brand-400"
              />
            </label>
          )}
          <p className="text-[12.5px] text-muted">
            {method === "ai"
                ? "HireFit proposes skills for your review — nothing is committed until you confirm."
                : "Skills are extracted for your review — nothing is committed until you confirm."}
          </p>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          {hasRoles && (
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button onClick={submit} disabled={!title.trim()}>
            {"Parse & review"}
            {<ChevronRight className="size-4" />}
          </Button>
        </div>
      </Card>
    </div>
  );
}



export function JobDNAEditor({
  role,
  go,
  onNewRole,
}: {
  role: { id: string; title: string; family: string; status: RoleStatus; skills: Skill[]; createdBy: string };
  go: (r: string) => void;
  onNewRole: () => void;
}) {
  const emp = useEmployer();
  const [adding, setAdding] = useState(false);
  const [drag, setDrag] = useState<number | null>(null);
  const total = role.skills.reduce((a, s) => a + s.weight, 0);
  const valid = total === 100;

  const update = (skills: Skill[]) => emp.updateRoleSkills(role.id, skills);
  const toggleMust = (i: number) => update(role.skills.map((x, j) => (j === i ? { ...x, must: !x.must } : x)));
  const cycleLevel = (i: number) =>
    update(
      role.skills.map((x, j) => {
        if (j !== i) return x;
        const ni = (REQ_LEVELS.indexOf(x.req) + 1) % REQ_LEVELS.length;
        return { ...x, req: REQ_LEVELS[ni] };
      }),
    );
  const setWeight = (i: number, w: number) => update(role.skills.map((x, j) => (j === i ? { ...x, weight: w } : x)));
  const removeSkill = (i: number) => update(role.skills.filter((_, j) => j !== i));
  const reorder = (from: number, to: number) => {
    if (from === to) return;
    const next = [...role.skills];
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    update(next);
  };

  const flowSteps: { s: string; k: RoleStatus }[] = [
    { s: "Draft", k: "draft" },
    { s: "In Review", k: "review" },
    { s: "Approved", k: "approved" },
    { s: "Published", k: "published" },
  ];
  const curIdx = flowSteps.findIndex((f) => f.k === role.status);

  const primaryAction = () => {
    if (role.status === "draft")
      return (
        <Button disabled={!valid} onClick={() => emp.setRoleStatus(role.id, "review")}>
          Submit for review
        </Button>
      );
    if (role.status === "review")
      return (
        <Button disabled={!valid} onClick={() => emp.setRoleStatus(role.id, "approved")}>
          <CheckCircle2 className="size-4" /> Approve
        </Button>
      );
    if (role.status === "approved")
      return (
        <Button disabled={!valid} onClick={() => emp.setRoleStatus(role.id, "published")}>
          <Rocket className="size-4" /> Publish role
        </Button>
      );
    return <Button onClick={() => go("search")}>Search talent</Button>;
  };

  return (
    <div className="space-y-4">
      {adding && (
        <AddSkillModal
          existing={role.skills.map((s) => s.name)}
          onClose={() => setAdding(false)}
          onAdd={(s) => {
            update([...role.skills, s]);
            setAdding(false);
          }}
        />
      )}

      <PageHead
        eyebrow="Role definition"
        title={role.title}
        sub={`${role.family} · created by ${role.createdBy}`}
        actions={
          <>
            <Button variant="secondary" onClick={onNewRole}>
              <Plus className="size-4" /> New role
            </Button>
            {role.status === "draft" && (
              <Button variant="secondary" onClick={() => emp.setRoleStatus(role.id, "draft")}>
                Save draft
              </Button>
            )}
            {primaryAction()}
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge tone={STATUS_TONE[role.status]}>{STATUS_LABEL[role.status]}</StatusBadge>
        {role.status === "review" && (
          <span className="text-[13px] text-muted">Awaiting Hiring Manager approval before it becomes active for matching.</span>
        )}
        {role.status === "published" && (
          <span className="text-[13px] text-[#276c4f]">Live — now matchable in Talent Search.</span>
        )}
      </div>

      <div className="grid grid-cols-[1fr_260px] gap-4 max-lg:grid-cols-1">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <h3 className="text-[14px] font-bold text-ink">Skill requirements</h3>
            <button onClick={() => setAdding(true)} className="flex items-center gap-1 text-[13px] font-semibold text-brand-600">
              <Plus className="size-4" /> Add skill
            </button>
          </div>
          <div className="grid grid-cols-[20px_1.3fr_1fr_1.2fr_auto_auto] gap-3 border-b border-line bg-raised px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-faint">
            <div></div>
            <div>Skill</div>
            <div>Required level</div>
            <div>Weight</div>
            <div>Type</div>
            <div></div>
          </div>

          {role.skills.length === 0 ? (
            <div className="grid place-items-center px-4 py-10 text-center">
              <div className="text-[13.5px] font-semibold text-ink">No skills yet</div>
              <p className="mt-1 max-w-xs text-[13px] text-muted">
                Add skills from the HireFit taxonomy to build this Job DNA.
              </p>
              <Button className="mt-3" size="sm" onClick={() => setAdding(true)}>
                <Plus className="size-4" /> Add skill
              </Button>
            </div>
          ) : (
            <div className="max-h-[44vh] divide-y divide-line-soft overflow-y-auto">
              {role.skills.map((s, i) => (
                <div
                  key={i}
                  draggable
                  onDragStart={() => setDrag(i)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (drag !== null) reorder(drag, i);
                    setDrag(null);
                  }}
                  className={cx(
                    "grid grid-cols-[20px_1.3fr_1fr_1.2fr_auto_auto] items-center gap-3 px-4 py-2.5",
                    drag === i && "opacity-40",
                  )}
                >
                  <GripVertical className="size-4 cursor-grab text-faint" />
                  <div>
                    <div className="text-[13.5px] font-semibold text-ink">{s.name}</div>
                    <div className="text-[11.5px] text-faint">{s.family}</div>
                  </div>
                  <button onClick={() => cycleLevel(i)} className="text-left" title="Click to change level">
                    <SkillLevel evidenced={s.req} />
                    <div className="mt-0.5 text-[12px] text-muted">{s.req}</div>
                  </button>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={0}
                      max={40}
                      value={s.weight}
                      onChange={(e) => setWeight(i, Number(e.target.value))}
                      className="flex-1 accent-brand-500"
                    />
                    <span className="w-9 text-right text-[13px] font-semibold tabular-nums text-ink">{s.weight}%</span>
                  </div>
                  <button
                    onClick={() => toggleMust(i)}
                    className={cx(
                      "rounded-full px-2.5 py-1 text-[12px] font-semibold transition-colors",
                      s.must ? "bg-brand-500 text-white" : "border border-line bg-surface text-muted hover:border-brand-200",
                    )}
                  >
                    {s.must ? "Must-have" : "Optional"}
                  </button>
                  <button onClick={() => removeSkill(i)} className="text-faint hover:text-[#b5443a]" title="Remove skill">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between gap-3 border-t border-line bg-raised px-4 py-2.5">
            <span className="text-[13px] font-medium text-muted">
              Total weighting:{" "}
              <span className={cx("font-bold tabular-nums", valid ? "text-[#276c4f]" : total > 100 ? "text-[#b5443a]" : "text-[#8f5a14]")}>
                {total}%
              </span>
            </span>
            {!valid && (
              <span className={cx("text-[12.5px] font-medium", total > 100 ? "text-[#b5443a]" : "text-[#8f5a14]")}>
                {total > 100 ? "Total weighting cannot exceed 100%." : "Add or adjust weights to reach 100%."}
              </span>
            )}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-4">
            <SectionTitle title="Approval flow" />
            <div className="space-y-3">
              {flowSteps.map((st, i) => {
                const done = i < curIdx;
                const activeStep = i === curIdx;
                return (
                  <div key={st.s} className="flex items-center gap-3">
                    <div
                      className={cx(
                        "grid size-6 place-items-center rounded-full text-[11px] font-bold",
                        done ? "bg-brand-500 text-white" : activeStep ? "border-2 border-brand-500 text-brand-600" : "border border-line text-faint",
                      )}
                    >
                      {done ? "✓" : i + 1}
                    </div>
                    <span className={cx("text-[13.5px]", activeStep ? "font-semibold text-ink" : done ? "text-ink-soft" : "text-faint")}>
                      {st.s}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
          <Card className="p-4">
            <SectionTitle title="Thresholds" />
            <div className="space-y-3 text-[13.5px]">
              {[
                { l: "Min. match to shortlist", v: "70%" },
                { l: "Min. confidence", v: "Medium" },
                { l: "Must-haves required", v: `All ${role.skills.filter((s) => s.must).length}` },
              ].map((t) => (
                <div key={t.l} className="flex items-center justify-between">
                  <span className="text-muted">{t.l}</span>
                  <span className="font-semibold text-ink">{t.v}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
