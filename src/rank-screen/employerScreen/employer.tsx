import { useState, type ReactNode } from "react";
import {
  Users,
  CheckCircle2,
  GripVertical,
  Bookmark,
  Plus,
  ChevronRight,
  ShieldCheck,
  MessageSquare,
  Search as SearchIcon,
  Sparkles,
  ClipboardPaste,
  Upload,
  Link2,
  LayoutTemplate,
  Rocket,
  UserPlus,
  ArrowLeft,
  ArrowRight,
  Circle,
  Trash2,
  X,
} from "lucide-react";
import {
  Card,
  Button,
  StatusBadge,
  Confidence,
  SkillLevel,
  ScoreRing,
  SectionTitle,
  Stat,
  cx,
} from "../../components/primitives";
import {
  useEmployer,
  STAGES,
  TAXONOMY,
  TEMPLATE_SKILLS,
  SUGGESTED_SKILLS,
  type Skill,
  type RoleStatus,
  type Stage,
  type Candidate,
} from "./employerStore";

/* ============================================================ SHARED */

// const STATUS_LABEL: Record<RoleStatus, string> = {
//   draft: "Draft",
//   review: "In Review",
//   approved: "Approved",
//   published: "Published",
// };
// const STATUS_TONE: Record<RoleStatus, "review" | "published" | "verified"> = {
//   draft: "review",
//   review: "review",
//   approved: "verified",
//   published: "published",
// };
// const REQ_LEVELS = ["Basic", "Intermediate", "Advanced", "Expert"];

// function PageHead({
//   eyebrow,
//   title,
//   sub,
//   actions,
// }: {
//   eyebrow?: string;
//   title: string;
//   sub?: string;
//   actions?: ReactNode;
// }) {
//   return (
//     <div className="flex items-start justify-between gap-6">
//       <div className="min-w-0">
//         {eyebrow && (
//           <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">{eyebrow}</div>
//         )}
//         <h1 className="text-[22px] font-bold tracking-tight text-ink">{title}</h1>
//         {sub && <div className="text-[13px] text-muted">{sub}</div>}
//       </div>
//       {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
//     </div>
//   );
// }

// function InlineHint({ children }: { children: ReactNode }) {
//   return (
//     <div className="grid place-items-center rounded-[10px] border border-dashed border-line bg-raised/60 px-4 py-6 text-center text-[13px] text-muted">
//       {children}
//     </div>
//   );
// }

/* ============================================================ DASHBOARD */

// export function EmployerDashboard({ go }: { go: (r: string) => void }) {
//   const emp = useEmployer();
//   const published = emp.publishedRoles.length;
//   const drafts = emp.roles.filter((r) => r.status !== "published").length;
//   const inPipeline = emp.pipeline.filter((p) => p.stage !== "Rejected").length;
//   const decisions = emp.pipeline.filter((p) => p.stage === "Decision").length;
//   const hired = emp.pipeline.filter((p) => p.stage === "Hired").length;

//   const recent = emp.pipeline
//     .flatMap((p) =>
//       p.history.map((h) => ({
//         who: h.by,
//         stage: h.stage,
//         cand: emp.candidates.find((c) => c.id === p.candidateId)?.name ?? "Candidate",
//         at: h.at,
//       })),
//     )
//     .slice(-4)
//     .reverse();

//   const nextActions = [
//     emp.roles.length === 0 && { t: "Create your first role", r: "job-dna" },
//     drafts > 0 && { t: "Finish and publish a draft role", r: "job-dna" },
//     published > 0 && inPipeline === 0 && { t: "Search verified talent", r: "search" },
//     decisions > 0 && { t: `Review ${decisions} pending decision${decisions > 1 ? "s" : ""}`, r: "pipeline" },
//   ].filter(Boolean) as { t: string; r: string }[];

//   return (
//     <div className="space-y-4">
//       <PageHead
//         eyebrow={`${emp.workspace} · Talent workspace`}
//         title="Recruitment intelligence"
//         actions={
//           <Button onClick={() => go("job-dna")}>
//             <Plus className="size-4" /> New role
//           </Button>
//         }
//       />

//       <Card className="grid grid-cols-4 divide-x divide-line p-0 max-lg:grid-cols-2 max-lg:divide-x-0">
//         {[
//           { l: "Active roles", v: String(published), s: drafts ? `${drafts} in draft/review` : published ? "all live" : "none yet" },
//           { l: "Candidates in pipeline", v: String(inPipeline), s: inPipeline ? "active" : "none yet" },
//           { l: "Pending decisions", v: String(decisions), s: decisions ? "need review" : "none pending" },
//           { l: "Hired", v: String(hired), s: hired ? "outcome tracking on" : "no hires yet" },
//         ].map((k, i) => (
//           <div key={k.l} className={cx("p-4", i >= 2 && "max-lg:border-t max-lg:border-line")}>
//             <Stat label={k.l} value={k.v} sub={k.s} />
//           </div>
//         ))}
//       </Card>

//       <div className="grid grid-cols-[1.5fr_1fr] gap-4 max-lg:grid-cols-1">
//         <div className="space-y-4">
//           <Card className="p-4">
//             <SectionTitle title="Your roles" eyebrow="Role definitions" action={<button onClick={() => go("job-dna")} className="text-[13px] font-semibold text-brand-600">Manage</button>} />
//             {emp.roles.length === 0 ? (
//               <InlineHint>
//                 No roles yet.{" "}
//                 <button onClick={() => go("job-dna")} className="font-semibold text-brand-600">
//                   Create your first role
//                 </button>{" "}
//                 to begin hiring.
//               </InlineHint>
//             ) : (
//               <div className="divide-y divide-line-soft">
//                 {emp.roles.map((r) => (
//                   <div key={r.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
//                     <div className="min-w-0 flex-1">
//                       <div className="truncate text-[13.5px] font-semibold text-ink">{r.title}</div>
//                       <div className="truncate text-[12px] text-muted">{r.family}</div>
//                     </div>
//                     <StatusBadge tone={STATUS_TONE[r.status]}>{STATUS_LABEL[r.status]}</StatusBadge>
//                     {r.status === "published" ? (
//                       <Button variant="quiet" size="sm" onClick={() => go("search")}>Search</Button>
//                     ) : (
//                       <Button variant="quiet" size="sm" onClick={() => go("job-dna")}>Open</Button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </Card>

//           <Card className="p-4">
//             <SectionTitle title="Pipeline summary" action={<button onClick={() => go("pipeline")} className="text-[13px] font-semibold text-brand-600">Open pipeline</button>} />
//             <div className="grid grid-cols-3 gap-2">
//               {STAGES.map((s) => {
//                 const n = emp.pipeline.filter((p) => p.stage === s).length;
//                 return (
//                   <div key={s} className="rounded-[10px] border border-line-soft bg-raised px-3 py-2">
//                     <div className="text-[18px] font-bold tabular-nums text-ink">{n}</div>
//                     <div className="text-[11.5px] text-muted">{s}</div>
//                   </div>
//                 );
//               })}
//             </div>
//           </Card>
//         </div>

//         <div className="space-y-4">
//           <Card className="p-4">
//             <SectionTitle title="Next actions" />
//             {nextActions.length === 0 ? (
//               <p className="py-1 text-[13px] text-muted">You&rsquo;re all caught up.</p>
//             ) : (
//               <div className="space-y-2">
//                 {nextActions.map((a) => (
//                   <button
//                     key={a.t}
//                     onClick={() => go(a.r)}
//                     className="flex w-full items-center gap-2.5 rounded-[9px] border border-line-soft bg-raised px-3 py-2 text-left transition-colors hover:border-brand-200"
//                   >
//                     <ArrowRight className="size-4 text-brand-500" />
//                     <span className="flex-1 text-[13px] font-semibold text-ink">{a.t}</span>
//                   </button>
//                 ))}
//               </div>
//             )}
//             <div className="mt-3 flex flex-wrap gap-2 border-t border-line-soft pt-3">
//               <Button variant="secondary" size="sm" onClick={() => go("job-dna")}><Plus className="size-4" /> Role</Button>
//               <Button variant="secondary" size="sm" onClick={() => go("search")}><SearchIcon className="size-4" /> Search</Button>
//               <Button variant="secondary" size="sm" onClick={() => go("pipeline")}><Users className="size-4" /> Pipeline</Button>
//             </div>
//           </Card>

//           <Card className="p-4">
//             <SectionTitle title="Recent activity" />
//             {recent.length === 0 ? (
//               <p className="py-1 text-[13px] text-muted">Activity from your team will appear here.</p>
//             ) : (
//               <div className="space-y-3">
//                 {recent.map((x, i) => (
//                   <div key={i} className="flex items-start gap-3">
//                     <div className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-700">
//                       {x.who.slice(0, 2)}
//                     </div>
//                     <div className="text-[13px] leading-snug text-ink-soft">
//                       <span className="font-semibold text-ink">{x.who}</span> moved{" "}
//                       <span className="font-medium">{x.cand}</span> to {x.stage}
//                       <div className="text-[11.5px] text-faint">{x.at}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

/* ============================================================ JOB DNA */

// export function JobDNA({ go }: { go: (r: string) => void }) {
//   const emp = useEmployer();
//   const [creating, setCreating] = useState(false);
//   const role = emp.editingRole ?? emp.roles[emp.roles.length - 1] ?? null;

//   if (creating || !role) {
//     return (
//       <CreateRole
//         hasRoles={emp.roles.length > 0}
//         onCancel={() => setCreating(false)}
//         onCreated={() => setCreating(false)}
//       />
//     );
//   }

//   return <JobDNAEditor role={role} go={go} onNewRole={() => setCreating(true)} />;
// }

// const METHODS = [
//   { id: "ai", label: "Write with AI", icon: Sparkles },
//   { id: "paste", label: "Paste JD", icon: ClipboardPaste },
//   { id: "file", label: "Upload file", icon: Upload },
//   { id: "url", label: "Import URL", icon: Link2 },
//   { id: "template", label: "Start from template", icon: LayoutTemplate },
// ];

// function CreateRole({
//   hasRoles,
//   onCancel,
//   onCreated,
// }: {
//   hasRoles: boolean;
//   onCancel: () => void;
//   onCreated: () => void;
// }) {
//   const emp = useEmployer();
//   const [method, setMethod] = useState("ai");
//   const [title, setTitle] = useState("");
//   const [family, setFamily] = useState("Test Automation");
//   const [phase, setPhase] = useState<"form" | "parsing" | "review">("form");
//   const [proposed, setProposed] = useState<{ skill: Skill; keep: boolean }[]>([]);

//   const extracts = method === "ai" || method === "paste" || method === "file" || method === "url";

//   const submit = () => {
//     if (method === "template") {
//       emp.createRole(title, family, TEMPLATE_SKILLS);
//       onCreated();
//       return;
//     }
//     if (!extracts) {
//       emp.createRole(title, family, []);
//       onCreated();
//       return;
//     }
//     setPhase("parsing");
//     setTimeout(() => {
//       setProposed(SUGGESTED_SKILLS.map((s) => ({ skill: { ...s }, keep: true })));
//       setPhase("review");
//     }, 900);
//   };

//   if (phase === "parsing") {
//     return (
//       <div className="grid min-h-[360px] place-items-center">
//         <div className="text-center">
//           <div className="mx-auto size-9 animate-spin rounded-full border-[3px] border-line border-t-brand-500" />
//           <div className="mt-4 text-[15px] font-semibold text-ink">
//             {method === "ai" ? "Generating Job DNA…" : "Extracting skills…"}
//           </div>
//           <div className="mt-1 text-[13px] text-muted">Nothing is added until you confirm.</div>
//         </div>
//       </div>
//     );
//   }

//   if (phase === "review") {
//     const kept = proposed.filter((p) => p.keep);
//     return (
//       <div className="space-y-4">
//         <PageHead
//           eyebrow={method === "ai" ? "AI suggestions" : "Extracted from job description"}
//           title="Review extracted skills"
//           sub="These are suggestions — keep, edit or remove, then add the ones you want."
//           actions={
//             <Button variant="secondary" onClick={() => setPhase("form")}>
//               <ArrowLeft className="size-4" /> Back
//             </Button>
//           }
//         />
//         <Card className="mx-auto max-w-2xl overflow-hidden">
//           <div className="flex items-center gap-2 border-b border-line bg-brand-50 px-4 py-2.5 text-[12.5px] font-semibold text-brand-700">
//             <Sparkles className="size-4" /> AI suggestion · not yet part of your Job DNA
//           </div>
//           <div className="divide-y divide-line-soft">
//             {proposed.map((p, i) => (
//               <div key={i} className={cx("flex items-center gap-3 px-4 py-3", !p.keep && "opacity-45")}>
//                 <input
//                   type="checkbox"
//                   checked={p.keep}
//                   onChange={() =>
//                     setProposed((arr) => arr.map((x, j) => (j === i ? { ...x, keep: !x.keep } : x)))
//                   }
//                   className="size-4 accent-brand-500"
//                 />
//                 <div className="min-w-0 flex-1">
//                   <div className="text-[13.5px] font-semibold text-ink">{p.skill.name}</div>
//                   <div className="text-[11.5px] text-faint">{p.skill.family}</div>
//                 </div>
//                 <select
//                   value={p.skill.req}
//                   onChange={(e) =>
//                     setProposed((arr) => arr.map((x, j) => (j === i ? { ...x, skill: { ...x.skill, req: e.target.value } } : x)))
//                   }
//                   className="rounded-[7px] border border-line bg-surface px-2 py-1 text-[12.5px] text-ink-soft outline-none"
//                 >
//                   {REQ_LEVELS.map((l) => (
//                     <option key={l}>{l}</option>
//                   ))}
//                 </select>
//                 <div className="flex items-center gap-1.5">
//                   <input
//                     type="number"
//                     min={0}
//                     max={100}
//                     value={p.skill.weight}
//                     onChange={(e) =>
//                       setProposed((arr) =>
//                         arr.map((x, j) => (j === i ? { ...x, skill: { ...x.skill, weight: Number(e.target.value) } } : x)),
//                       )
//                     }
//                     className="w-14 rounded-[7px] border border-line bg-surface px-2 py-1 text-right text-[12.5px] tabular-nums text-ink outline-none"
//                   />
//                   <span className="text-[12px] text-faint">%</span>
//                 </div>
//                 <button
//                   onClick={() =>
//                     setProposed((arr) => arr.map((x, j) => (j === i ? { ...x, skill: { ...x.skill, must: !x.skill.must } } : x)))
//                   }
//                   className={cx(
//                     "rounded-full px-2 py-0.5 text-[11.5px] font-semibold transition-colors",
//                     p.skill.must ? "bg-brand-500 text-white" : "border border-line text-muted",
//                   )}
//                 >
//                   {p.skill.must ? "Must" : "Optional"}
//                 </button>
//                 <button
//                   onClick={() => setProposed((arr) => arr.filter((_, j) => j !== i))}
//                   className="text-faint hover:text-[#b5443a]"
//                 >
//                   <Trash2 className="size-4" />
//                 </button>
//               </div>
//             ))}
//           </div>
//           <div className="flex items-center justify-between border-t border-line bg-raised px-4 py-3">
//             <span className="text-[13px] text-muted">{kept.length} selected</span>
//             <div className="flex gap-2">
//               <Button variant="secondary" onClick={() => { emp.createRole(title, family, []); onCreated(); }}>
//                 Start empty
//               </Button>
//               <Button
//                 onClick={() => {
//                   emp.createRole(title, family, kept.map((p) => p.skill));
//                   onCreated();
//                 }}
//               >
//                 Add selected to Job DNA
//               </Button>
//             </div>
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <PageHead
//         eyebrow="New role"
//         title="Create role"
//         actions={
//           hasRoles ? (
//             <Button variant="secondary" onClick={onCancel}>
//               Cancel
//             </Button>
//           ) : undefined
//         }
//       />
//       <Card className="mx-auto max-w-2xl p-6">
//         <div className="text-[12px] font-semibold uppercase tracking-wide text-faint">Creation method</div>
//         <div className="mt-2.5 grid grid-cols-5 gap-2 max-md:grid-cols-2">
//           {METHODS.map((m) => {
//             const on = method === m.id;
//             return (
//               <button
//                 key={m.id}
//                 onClick={() => setMethod(m.id)}
//                 className={cx(
//                   "flex flex-col items-center gap-2 rounded-[11px] border p-3 text-center transition-colors",
//                   on ? "border-brand-500 bg-brand-50" : "border-line hover:border-brand-200",
//                 )}
//               >
//                 <m.icon className={cx("size-5", on ? "text-brand-600" : "text-muted")} />
//                 <span className={cx("text-[12px] font-semibold", on ? "text-brand-700" : "text-ink-soft")}>
//                   {m.label}
//                 </span>
//               </button>
//             );
//           })}
//         </div>

//         <div className="mt-5 space-y-3">
//           <label className="block">
//             <span className="mb-1 block text-[13px] font-semibold text-ink">Role title</span>
//             <input
//               autoFocus
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="e.g. Senior QA Automation Engineer"
//               className="w-full rounded-[9px] border border-line bg-surface px-3 py-2.5 text-[14px] text-ink outline-none placeholder:text-faint focus:border-brand-400"
//             />
//           </label>
//           <label className="block">
//             <span className="mb-1 block text-[13px] font-semibold text-ink">Skill family</span>
//             <input
//               value={family}
//               onChange={(e) => setFamily(e.target.value)}
//               placeholder="e.g. Test Automation"
//               className="w-full rounded-[9px] border border-line bg-surface px-3 py-2.5 text-[14px] text-ink outline-none placeholder:text-faint focus:border-brand-400"
//             />
//           </label>
//           {(method === "paste" || method === "file" || method === "url") && (
//             <label className="block">
//               <span className="mb-1 block text-[13px] font-semibold text-ink">
//                 {method === "url" ? "Job posting URL" : "Job description"}
//               </span>
//               <textarea
//                 rows={method === "url" ? 1 : 4}
//                 placeholder={method === "url" ? "https://…" : "Paste the job description…"}
//                 className="w-full resize-none rounded-[9px] border border-line bg-surface px-3 py-2.5 text-[14px] text-ink outline-none placeholder:text-faint focus:border-brand-400"
//               />
//             </label>
//           )}
//           <p className="text-[12.5px] text-muted">
//             {method === "template"
//               ? "Starts from a QA Automation template you can fully edit."
//               : method === "ai"
//                 ? "HireFit proposes skills for your review — nothing is committed until you confirm."
//                 : "Skills are extracted for your review — nothing is committed until you confirm."}
//           </p>
//         </div>

//         <div className="mt-5 flex justify-end gap-2">
//           {hasRoles && (
//             <Button variant="secondary" onClick={onCancel}>
//               Cancel
//             </Button>
//           )}
//           <Button onClick={submit} disabled={!title.trim()}>
//             {method === "template" ? <Plus className="size-4" /> : <ChevronRight className="size-4" />}
//             {method === "template" ? "Create role" : "Parse & review"}
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// }

// function JobDNAEditor({
//   role,
//   go,
//   onNewRole,
// }: {
//   role: { id: string; title: string; family: string; status: RoleStatus; skills: Skill[]; createdBy: string };
//   go: (r: string) => void;
//   onNewRole: () => void;
// }) {
//   const emp = useEmployer();
//   const [adding, setAdding] = useState(false);
//   const [drag, setDrag] = useState<number | null>(null);
//   const total = role.skills.reduce((a, s) => a + s.weight, 0);
//   const valid = total === 100;

//   const update = (skills: Skill[]) => emp.updateRoleSkills(role.id, skills);
//   const toggleMust = (i: number) => update(role.skills.map((x, j) => (j === i ? { ...x, must: !x.must } : x)));
//   const cycleLevel = (i: number) =>
//     update(
//       role.skills.map((x, j) => {
//         if (j !== i) return x;
//         const ni = (REQ_LEVELS.indexOf(x.req) + 1) % REQ_LEVELS.length;
//         return { ...x, req: REQ_LEVELS[ni] };
//       }),
//     );
//   const setWeight = (i: number, w: number) => update(role.skills.map((x, j) => (j === i ? { ...x, weight: w } : x)));
//   const removeSkill = (i: number) => update(role.skills.filter((_, j) => j !== i));
//   const reorder = (from: number, to: number) => {
//     if (from === to) return;
//     const next = [...role.skills];
//     const [m] = next.splice(from, 1);
//     next.splice(to, 0, m);
//     update(next);
//   };

//   const flowSteps: { s: string; k: RoleStatus }[] = [
//     { s: "Draft", k: "draft" },
//     { s: "In Review", k: "review" },
//     { s: "Approved", k: "approved" },
//     { s: "Published", k: "published" },
//   ];
//   const curIdx = flowSteps.findIndex((f) => f.k === role.status);

//   const primaryAction = () => {
//     if (role.status === "draft")
//       return (
//         <Button disabled={!valid} onClick={() => emp.setRoleStatus(role.id, "review")}>
//           Submit for review
//         </Button>
//       );
//     if (role.status === "review")
//       return (
//         <Button disabled={!valid} onClick={() => emp.setRoleStatus(role.id, "approved")}>
//           <CheckCircle2 className="size-4" /> Approve
//         </Button>
//       );
//     if (role.status === "approved")
//       return (
//         <Button disabled={!valid} onClick={() => emp.setRoleStatus(role.id, "published")}>
//           <Rocket className="size-4" /> Publish role
//         </Button>
//       );
//     return <Button onClick={() => go("search")}>Search talent</Button>;
//   };

//   return (
//     <div className="space-y-4">
//       {adding && (
//         <AddSkillModal
//           existing={role.skills.map((s) => s.name)}
//           onClose={() => setAdding(false)}
//           onAdd={(s) => {
//             update([...role.skills, s]);
//             setAdding(false);
//           }}
//         />
//       )}

//       <PageHead
//         eyebrow="Role definition"
//         title={role.title}
//         sub={`${role.family} · created by ${role.createdBy}`}
//         actions={
//           <>
//             <Button variant="secondary" onClick={onNewRole}>
//               <Plus className="size-4" /> New role
//             </Button>
//             {role.status === "draft" && (
//               <Button variant="secondary" onClick={() => emp.setRoleStatus(role.id, "draft")}>
//                 Save draft
//               </Button>
//             )}
//             {primaryAction()}
//           </>
//         }
//       />

//       <div className="flex flex-wrap items-center gap-2">
//         <StatusBadge tone={STATUS_TONE[role.status]}>{STATUS_LABEL[role.status]}</StatusBadge>
//         {role.status === "review" && (
//           <span className="text-[13px] text-muted">Awaiting Hiring Manager approval before it becomes active for matching.</span>
//         )}
//         {role.status === "published" && (
//           <span className="text-[13px] text-[#276c4f]">Live — now matchable in Talent Search.</span>
//         )}
//       </div>

//       <div className="grid grid-cols-[1fr_260px] gap-4 max-lg:grid-cols-1">
//         <Card className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
//             <h3 className="text-[14px] font-bold text-ink">Skill requirements</h3>
//             <button onClick={() => setAdding(true)} className="flex items-center gap-1 text-[13px] font-semibold text-brand-600">
//               <Plus className="size-4" /> Add skill
//             </button>
//           </div>
//           <div className="grid grid-cols-[20px_1.3fr_1fr_1.2fr_auto_auto] gap-3 border-b border-line bg-raised px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-faint">
//             <div></div>
//             <div>Skill</div>
//             <div>Required level</div>
//             <div>Weight</div>
//             <div>Type</div>
//             <div></div>
//           </div>

//           {role.skills.length === 0 ? (
//             <div className="grid place-items-center px-4 py-10 text-center">
//               <div className="text-[13.5px] font-semibold text-ink">No skills yet</div>
//               <p className="mt-1 max-w-xs text-[13px] text-muted">
//                 Add skills from the HireFit taxonomy to build this Job DNA.
//               </p>
//               <Button className="mt-3" size="sm" onClick={() => setAdding(true)}>
//                 <Plus className="size-4" /> Add skill
//               </Button>
//             </div>
//           ) : (
//             <div className="max-h-[44vh] divide-y divide-line-soft overflow-y-auto">
//               {role.skills.map((s, i) => (
//                 <div
//                   key={i}
//                   draggable
//                   onDragStart={() => setDrag(i)}
//                   onDragOver={(e) => e.preventDefault()}
//                   onDrop={() => {
//                     if (drag !== null) reorder(drag, i);
//                     setDrag(null);
//                   }}
//                   className={cx(
//                     "grid grid-cols-[20px_1.3fr_1fr_1.2fr_auto_auto] items-center gap-3 px-4 py-2.5",
//                     drag === i && "opacity-40",
//                   )}
//                 >
//                   <GripVertical className="size-4 cursor-grab text-faint" />
//                   <div>
//                     <div className="text-[13.5px] font-semibold text-ink">{s.name}</div>
//                     <div className="text-[11.5px] text-faint">{s.family}</div>
//                   </div>
//                   <button onClick={() => cycleLevel(i)} className="text-left" title="Click to change level">
//                     <SkillLevel evidenced={s.req} />
//                     <div className="mt-0.5 text-[12px] text-muted">{s.req}</div>
//                   </button>
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="range"
//                       min={0}
//                       max={40}
//                       value={s.weight}
//                       onChange={(e) => setWeight(i, Number(e.target.value))}
//                       className="flex-1 accent-brand-500"
//                     />
//                     <span className="w-9 text-right text-[13px] font-semibold tabular-nums text-ink">{s.weight}%</span>
//                   </div>
//                   <button
//                     onClick={() => toggleMust(i)}
//                     className={cx(
//                       "rounded-full px-2.5 py-1 text-[12px] font-semibold transition-colors",
//                       s.must ? "bg-brand-500 text-white" : "border border-line bg-surface text-muted hover:border-brand-200",
//                     )}
//                   >
//                     {s.must ? "Must-have" : "Optional"}
//                   </button>
//                   <button onClick={() => removeSkill(i)} className="text-faint hover:text-[#b5443a]" title="Remove skill">
//                     <Trash2 className="size-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="flex items-center justify-between gap-3 border-t border-line bg-raised px-4 py-2.5">
//             <span className="text-[13px] font-medium text-muted">
//               Total weighting:{" "}
//               <span className={cx("font-bold tabular-nums", valid ? "text-[#276c4f]" : total > 100 ? "text-[#b5443a]" : "text-[#8f5a14]")}>
//                 {total}%
//               </span>
//             </span>
//             {!valid && (
//               <span className={cx("text-[12.5px] font-medium", total > 100 ? "text-[#b5443a]" : "text-[#8f5a14]")}>
//                 {total > 100 ? "Total weighting cannot exceed 100%." : "Add or adjust weights to reach 100%."}
//               </span>
//             )}
//           </div>
//         </Card>

//         <div className="space-y-4">
//           <Card className="p-4">
//             <SectionTitle title="Approval flow" />
//             <div className="space-y-3">
//               {flowSteps.map((st, i) => {
//                 const done = i < curIdx;
//                 const activeStep = i === curIdx;
//                 return (
//                   <div key={st.s} className="flex items-center gap-3">
//                     <div
//                       className={cx(
//                         "grid size-6 place-items-center rounded-full text-[11px] font-bold",
//                         done ? "bg-brand-500 text-white" : activeStep ? "border-2 border-brand-500 text-brand-600" : "border border-line text-faint",
//                       )}
//                     >
//                       {done ? "✓" : i + 1}
//                     </div>
//                     <span className={cx("text-[13.5px]", activeStep ? "font-semibold text-ink" : done ? "text-ink-soft" : "text-faint")}>
//                       {st.s}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>
//           </Card>
//           <Card className="p-4">
//             <SectionTitle title="Thresholds" />
//             <div className="space-y-3 text-[13.5px]">
//               {[
//                 { l: "Min. match to shortlist", v: "70%" },
//                 { l: "Min. confidence", v: "Medium" },
//                 { l: "Must-haves required", v: `All ${role.skills.filter((s) => s.must).length}` },
//               ].map((t) => (
//                 <div key={t.l} className="flex items-center justify-between">
//                   <span className="text-muted">{t.l}</span>
//                   <span className="font-semibold text-ink">{t.v}</span>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

/* ---- Add skill modal ---- */

// function AddSkillModal({
//   existing,
//   onClose,
//   onAdd,
// }: {
//   existing: string[];
//   onClose: () => void;
//   onAdd: (s: Skill) => void;
// }) {
//   const [query, setQuery] = useState("");
//   const [picked, setPicked] = useState<{ name: string; family: string } | null>(null);
//   const [req, setReq] = useState("Intermediate");
//   const [weight, setWeight] = useState(10);
//   const [must, setMust] = useState(false);
//   const [evidence, setEvidence] = useState("Assessment");
//   const [notes, setNotes] = useState("");

//   const matches = TAXONOMY.filter(
//     (t) => t.name.toLowerCase().includes(query.toLowerCase()) && !existing.includes(t.name),
//   );

//   return (
//     <div className="fixed inset-0 z-50 grid place-items-center bg-ink/30 p-4" onClick={onClose}>
//       <div
//         className="tie-fade w-full max-w-md overflow-hidden rounded-[16px] border border-line bg-surface shadow-[var(--shadow-pop)]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between border-b border-line px-4 py-3">
//           <h3 className="text-[15px] font-bold text-ink">Add skill</h3>
//           <button onClick={onClose} className="text-faint hover:text-ink">
//             <X className="size-4.5" />
//           </button>
//         </div>

//         <div className="space-y-3.5 p-4">
//           <div>
//             <span className="mb-1 block text-[13px] font-semibold text-ink">Skill</span>
//             {picked ? (
//               <div className="flex items-center justify-between rounded-[9px] border border-brand-200 bg-brand-50 px-3 py-2">
//                 <div>
//                   <div className="text-[13.5px] font-semibold text-ink">{picked.name}</div>
//                   <div className="text-[11.5px] text-faint">{picked.family}</div>
//                 </div>
//                 <button onClick={() => setPicked(null)} className="text-[12.5px] font-semibold text-brand-600">
//                   Change
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <input
//                   autoFocus
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Search skills…"
//                   className="w-full rounded-[9px] border border-line bg-surface px-3 py-2 text-[14px] text-ink outline-none placeholder:text-faint focus:border-brand-400"
//                 />
//                 <div className="mt-1.5 max-h-40 overflow-y-auto rounded-[9px] border border-line-soft">
//                   {matches.length === 0 ? (
//                     <div className="px-3 py-2.5 text-[13px] text-muted">No matching taxonomy skills.</div>
//                   ) : (
//                     matches.map((t) => (
//                       <button
//                         key={t.name}
//                         onClick={() => setPicked(t)}
//                         className="flex w-full items-center justify-between px-3 py-2 text-left transition-colors hover:bg-brand-50/60"
//                       >
//                         <span className="text-[13.5px] font-medium text-ink">{t.name}</span>
//                         <span className="text-[11.5px] text-faint">{t.family}</span>
//                       </button>
//                     ))
//                   )}
//                 </div>
//               </>
//             )}
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <label className="block">
//               <span className="mb-1 block text-[13px] font-semibold text-ink">Required level</span>
//               <select
//                 value={req}
//                 onChange={(e) => setReq(e.target.value)}
//                 className="w-full rounded-[9px] border border-line bg-surface px-3 py-2 text-[13.5px] text-ink outline-none"
//               >
//                 {REQ_LEVELS.map((l) => (
//                   <option key={l}>{l}</option>
//                 ))}
//               </select>
//             </label>
//             <label className="block">
//               <span className="mb-1 block text-[13px] font-semibold text-ink">Requirement</span>
//               <select
//                 value={must ? "Must-have" : "Optional"}
//                 onChange={(e) => setMust(e.target.value === "Must-have")}
//                 className="w-full rounded-[9px] border border-line bg-surface px-3 py-2 text-[13.5px] text-ink outline-none"
//               >
//                 <option>Must-have</option>
//                 <option>Optional</option>
//               </select>
//             </label>
//           </div>

//           <div>
//             <div className="mb-1 flex items-center justify-between">
//               <span className="text-[13px] font-semibold text-ink">Weight</span>
//               <span className="text-[13px] font-bold tabular-nums text-ink">{weight}%</span>
//             </div>
//             <input
//               type="range"
//               min={0}
//               max={40}
//               value={weight}
//               onChange={(e) => setWeight(Number(e.target.value))}
//               className="w-full accent-brand-500"
//             />
//           </div>

//           <label className="block">
//             <span className="mb-1 block text-[13px] font-semibold text-ink">
//               Target evidence <span className="font-normal text-faint">· optional</span>
//             </span>
//             <select
//               value={evidence}
//               onChange={(e) => setEvidence(e.target.value)}
//               className="w-full rounded-[9px] border border-line bg-surface px-3 py-2 text-[13.5px] text-ink outline-none"
//             >
//               {["Assessment", "Interview", "Work Simulation", "Credential"].map((o) => (
//                 <option key={o}>{o}</option>
//               ))}
//             </select>
//           </label>

//           <label className="block">
//             <span className="mb-1 block text-[13px] font-semibold text-ink">
//               Notes <span className="font-normal text-faint">· optional</span>
//             </span>
//             <input
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               placeholder="Context for reviewers…"
//               className="w-full rounded-[9px] border border-line bg-surface px-3 py-2 text-[13.5px] text-ink outline-none placeholder:text-faint focus:border-brand-400"
//             />
//           </label>
//         </div>

//         <div className="flex justify-end gap-2 border-t border-line bg-raised px-4 py-3">
//           <Button variant="secondary" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button
//             disabled={!picked}
//             onClick={() => picked && onAdd({ name: picked.name, family: picked.family, req, weight, must })}
//           >
//             <Plus className="size-4" /> Add skill
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

/* ============================================================ TALENT SEARCH */

// const HARD_FILTERS = [
//   { l: "Location", o: ["Riyadh", "Jeddah", "Dammam", "Any"] },
//   { l: "Availability", o: ["Immediate", "1 month", "Any"] },
// ];

// const SOFT_FILTERS = [
//   { l: "Skill level", o: ["Advanced+", "Intermediate+", "Any"] },
//   { l: "Evidence type", o: ["Assessment", "Interview", "Simulation"] },
//   { l: "Experience", o: ["Junior", "Mid", "Senior"] },
// ];

// function FilterGroup({ f }: { f: { l: string; o: string[] } }) {
//   return (
//     <div>
//       <div className="mb-1.5 text-[11.5px] font-semibold uppercase tracking-wide text-faint">{f.l}</div>
//       <div className="space-y-1">
//         {f.o.map((o, i) => (
//           <label key={o} className="flex cursor-pointer items-center gap-2 text-[13px] text-ink-soft">
//             <input type="checkbox" defaultChecked={i === 0} className="size-3.5 accent-brand-500" />
//             {o}
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// }

// export function TalentSearch({ go }: { go: (r: string) => void }) {
//   const emp = useEmployer();
//   const [searching, setSearching] = useState(false);
//   const [highOnly, setHighOnly] = useState(false);
//   const [national, setNational] = useState(true);
//   const hasRole = emp.publishedRoles.length > 0;
//   const role = emp.activeRole;

//   const results = emp.candidates.filter(
//     (c) => (!highOnly || c.conf === "High") && (!national || c.national),
//   );

//   const runSearch = () => {
//     if (!hasRole) return;
//     setSearching(true);
//     setTimeout(() => {
//       setSearching(false);
//       emp.setSearchDone(true);
//     }, 900);
//   };

//   const clearFilters = () => {
//     setHighOnly(false);
//     setNational(false);
//     emp.setSearchDone(false);
//   };

//   return (
//     <div className="flex h-full flex-col space-y-4">
//       <PageHead
//         eyebrow="Evidence-first"
//         title="Talent Search"
//         sub={hasRole ? `Matching against ${role?.title}` : "Publish a role to start matching"}
//       />

//       <div className="grid min-h-0 flex-1 grid-cols-[268px_1fr] gap-4 max-lg:grid-cols-1">
//         {/* filters / criteria */}
//         <Card className="flex h-full flex-col overflow-hidden p-0 max-lg:hidden">
//           {/* sticky action area — visible without scrolling */}
//           <div className="space-y-2.5 border-b border-line bg-raised/60 p-3.5">
//             <div>
//               <div className="mb-1 text-[11.5px] font-semibold uppercase tracking-wide text-faint">Role</div>
//               {hasRole ? (
//                 <select
//                   value={role?.id}
//                   onChange={(e) => emp.setActiveRole(e.target.value)}
//                   className="w-full rounded-[8px] border border-line bg-surface px-2.5 py-1.5 text-[13px] font-medium text-ink outline-none focus:border-brand-400"
//                 >
//                   {emp.publishedRoles.map((r) => (
//                     <option key={r.id} value={r.id}>
//                       {r.title}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <div className="rounded-[8px] border border-dashed border-line px-2.5 py-2 text-[12.5px] text-muted">
//                   No published roles yet.
//                 </div>
//               )}
//             </div>
//             <Button className="w-full justify-center" disabled={!hasRole} onClick={runSearch}>
//               <SearchIcon className="size-4" /> Search talent
//             </Button>
//             <div className="flex items-center gap-2">
//               <Button variant="secondary" size="sm" className="flex-1 justify-center" onClick={clearFilters}>
//                 Clear filters
//               </Button>
//               <Button variant="secondary" size="sm" className="flex-1 justify-center" disabled={!emp.searchDone}>
//                 <Bookmark className="size-4" /> Save
//               </Button>
//             </div>
//             {!hasRole && (
//               <button onClick={() => go("job-dna")} className="w-full text-center text-[12.5px] font-semibold text-brand-600">
//                 Create a role
//               </button>
//             )}
//           </div>

//           {/* internally scrolling filter body */}
//           <div className="min-h-0 flex-1 overflow-y-auto p-3.5">
//             {/* Hard Filters */}
//             <div className="mb-3 flex items-center gap-1.5">
//               <div className="h-2 w-2 rounded-full bg-[#b5443a]" />
//               <span className="text-[11.5px] font-bold uppercase tracking-wider text-ink">Hard Filters</span>
//             </div>
//             <p className="mb-3 text-[11px] text-faint">Must-match conditions. Candidates not meeting these are excluded.</p>
//             <div className="space-y-3.5">
//               {HARD_FILTERS.map((f) => (
//                 <FilterGroup key={f.l} f={f} />
//               ))}
//               <div>
//                 <div className="mb-1.5 text-[11.5px] font-semibold uppercase tracking-wide text-faint">Eligibility</div>
//                 <label className="flex cursor-pointer items-center gap-2 text-[13px] font-medium text-ink-soft">
//                   <input type="checkbox" checked={national} onChange={() => setNational((v) => !v)} className="size-3.5 accent-brand-500" />
//                   National talent only
//                 </label>
//               </div>
//             </div>

//             {/* Soft Criteria */}
//             <div className="mb-3 mt-5 flex items-center gap-1.5">
//               <div className="h-2 w-2 rounded-full bg-brand-500" />
//               <span className="text-[11.5px] font-bold uppercase tracking-wider text-ink">Soft Criteria</span>
//             </div>
//             <p className="mb-3 text-[11px] text-faint">Influence ranking and match score. Candidates are not excluded.</p>
//             <div className="space-y-3.5">
//               {SOFT_FILTERS.map((f) => (
//                 <FilterGroup key={f.l} f={f} />
//               ))}
//               <div>
//                 <div className="mb-1.5 text-[11.5px] font-semibold uppercase tracking-wide text-faint">Confidence</div>
//                 <label className="flex cursor-pointer items-center gap-2 text-[13px] text-ink-soft">
//                   <input type="checkbox" checked={highOnly} onChange={() => setHighOnly((v) => !v)} className="size-3.5 accent-brand-500" />
//                   High confidence only
//                 </label>
//               </div>
//             </div>
//           </div>
//         </Card>

//         {/* results area */}
//         <div className="flex min-h-0 flex-col">
//           <div className="mb-3 flex items-center justify-between gap-4">
//             <span className="text-[13px] text-muted">
//               {emp.searchDone && !searching ? (
//                 <><span className="font-bold text-ink">{results.length}</span> candidates matched</>
//               ) : (
//                 "Results"
//               )}
//             </span>
//             <select className="rounded-[8px] border border-line bg-surface px-2.5 py-1.5 text-[13px] font-medium text-ink-soft outline-none" disabled={!emp.searchDone}>
//               <option>Sort: Match</option>
//               <option>Sort: Confidence</option>
//             </select>
//           </div>

//           <div className="min-h-0 flex-1 overflow-y-auto pr-0.5">
//             {searching ? (
//               <SearchSkeleton />
//             ) : !emp.searchDone ? (
//               <InlineHint>
//                 {hasRole
//                   ? "Choose a role and search criteria, then run Search."
//                   : "Publish a role first — then choose criteria and search verified talent."}
//               </InlineHint>
//             ) : results.length === 0 ? (
//               <div className="rounded-[10px] border border-dashed border-line bg-raised/60 px-4 py-8 text-center">
//                 <div className="text-[14px] font-semibold text-ink">No candidates match these criteria</div>
//                 <div className="mt-3 flex justify-center gap-2">
//                   <Button variant="secondary" size="sm" onClick={clearFilters}>
//                     Clear filters
//                   </Button>
//                   <Button variant="secondary" size="sm" onClick={() => go("job-dna")}>
//                     Edit criteria
//                   </Button>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {results.map((c) => (
//                   <ResultCard key={c.id} c={c} go={go} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const TAG_TONE = {
//   "Recommended Match": "verified",
//   "Strong Alignment": "published",
//   "Needs Review": "review",
// } as const;

// function ResultCard({ c, go }: { c: Candidate; go: (r: string) => void }) {
//   const emp = useEmployer();
//   const open = () => {
//     emp.selectCandidate(c.id, "search");
//     go("candidate");
//   };
//   const topSkills = c.skills.slice(0, 3);
//   const gapList = c.gap ? [c.gap] : [];
//   return (
//     <Card className="p-4 transition-shadow hover:shadow-[var(--shadow-raised)]">
//       <div className="flex items-start gap-4">
//         <ScoreRing value={c.match} size={54} stroke={5} />
//         <div className="min-w-0 flex-1">
//           <div className="flex flex-wrap items-center gap-2.5">
//             <button onClick={open} className="text-[15px] font-bold text-ink hover:text-brand-600">
//               {c.name}
//             </button>
//             <StatusBadge tone={TAG_TONE[c.tag]}>{c.tag}</StatusBadge>
//             {c.passport === "verified" && <ShieldCheck className="size-4 text-[#2e7d5b]" />}
//           </div>
//           <div className="mt-2.5 flex flex-wrap gap-4">
//             {topSkills.length > 0 && (
//               <div>
//                 <div className="mb-1 text-[10.5px] font-semibold uppercase tracking-wide text-[#276c4f]">
//                   Top match reasons
//                 </div>
//                 <div className="flex flex-wrap gap-1.5">
//                   {topSkills.map((s) => (
//                     <span key={s} className="rounded-full bg-[#e7f2ec] px-2 py-0.5 text-[11.5px] font-medium text-[#276c4f]">
//                       {s}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {gapList.length > 0 && (
//               <div>
//                 <div className="mb-1 text-[10.5px] font-semibold uppercase tracking-wide text-[#8f5a14]">
//                   Top gaps
//                 </div>
//                 <div className="flex flex-wrap gap-1.5">
//                   {gapList.map((g) => (
//                     <span key={g} className="rounded-full bg-[#fbf1e2] px-2 py-0.5 text-[11.5px] font-medium text-[#8f5a14]">
//                       {g}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="flex shrink-0 flex-col items-end gap-3 border-l border-line-soft pl-5 max-md:hidden">
//           <div className="text-center">
//             <Confidence level={c.conf} />
//             <div className="mt-1 text-[11px] text-faint">confidence</div>
//           </div>
//           <div className="text-center">
//             <div className="text-[13px] font-semibold text-ink">{c.ev}</div>
//             <div className="text-[11px] text-faint">evidence items</div>
//           </div>
//           <Button variant="secondary" size="sm" onClick={open}>
//             View
//           </Button>
//         </div>
//         <div className="max-md:block hidden">
//           <Button variant="secondary" size="sm" onClick={open}>View</Button>
//         </div>
//       </div>
//     </Card>
//   );
// }

// function SearchSkeleton() {
//   return (
//     <div className="space-y-3">
//       {[0, 1, 2].map((i) => (
//         <Card key={i} className="flex items-center gap-4 p-4">
//           <div className="size-14 shrink-0 animate-pulse rounded-full bg-line-soft" />
//           <div className="flex-1 space-y-2">
//             <div className="h-3.5 w-40 animate-pulse rounded bg-line-soft" />
//             <div className="h-3 w-64 animate-pulse rounded bg-line-soft" />
//           </div>
//         </Card>
//       ))}
//     </div>
//   );
// }

/* ============================================================ CANDIDATE DETAIL */

// export function CandidateDetail({ go }: { go: (r: string) => void }) {
//   const emp = useEmployer();
//   const c = emp.selectedCandidate;
//   const [tab, setTab] = useState("Overview");
//   const [rejecting, setRejecting] = useState(false);
//   const [reason, setReason] = useState("");

//   if (!c) {
//     return (
//       <div className="space-y-4">
//         <button onClick={() => go("search")} className="flex items-center gap-1.5 text-[13px] font-semibold text-brand-600">
//           <ArrowLeft className="size-4" /> Back to Talent Search
//         </button>
//         <InlineHint>Open a candidate from Talent Search or your Pipeline to see their profile.</InlineHint>
//       </div>
//     );
//   }

//   const entry = emp.entryFor(c.id);
//   const inPipeline = !!entry && entry.stage !== "Rejected";
//   const role = emp.activeRole;
//   const originRoute = emp.candidateOrigin;
//   const tabs = [
//     "Overview",
//     "Talent DNA",
//     "Evidence",
//     "Role Readiness",
//     "Interview",
//     "Assessments",
//     "Work Simulations",
//     "Resume",
//     "Passport",
//     "Activity",
//   ];
//   const canAdvance = entry && STAGES.indexOf(entry.stage) < STAGES.length - 1;

//   return (
//     <div className="space-y-4">
//       <button
//         onClick={() => go(originRoute === "pipeline" ? "pipeline" : "search")}
//         className="flex items-center gap-1.5 text-[13px] font-semibold text-brand-600"
//       >
//         <ArrowLeft className="size-4" /> Back to {originRoute === "pipeline" ? "Pipeline" : "Talent Search"}
//       </button>

//       <div className="flex items-start justify-between gap-6">
//         <div className="flex items-center gap-4">
//           <div className="grid size-14 place-items-center rounded-[14px] bg-brand-100 text-[19px] font-bold text-brand-700">
//             {c.initials}
//           </div>
//           <div>
//             <div className="flex items-center gap-2.5">
//               <h1 className="text-[22px] font-bold tracking-tight text-ink">{c.name}</h1>
//               {c.passport === "verified" && <ShieldCheck className="size-5 text-[#2e7d5b]" />}
//               {c.national && <StatusBadge tone="published">National Talent</StatusBadge>}
//               {entry && <StatusBadge tone={entry.stage === "Rejected" ? "revoked" : "review"}>{entry.stage}</StatusBadge>}
//             </div>
//             <div className="text-[13px] text-muted">
//               {c.headline} · {c.location} · {c.availability}
//             </div>
//           </div>
//         </div>
//         <div className="flex shrink-0 gap-2">
//           <Button variant="secondary">
//             <MessageSquare className="size-4" /> Add note
//           </Button>
//           {!inPipeline ? (
//             <Button onClick={() => emp.addToPipeline(c.id)}>
//               <UserPlus className="size-4" /> Add to pipeline
//             </Button>
//           ) : (
//             <>
//               {canAdvance && <Button onClick={() => emp.advanceStage(c.id)}>Advance stage</Button>}
//               <Button variant="secondary" onClick={() => setRejecting(true)}>
//                 Reject
//               </Button>
//             </>
//           )}
//         </div>
//       </div>

//       {rejecting && (
//         <Card className="border-[#e6b8b3] bg-[#fbeceb] p-4">
//           <div className="text-[13.5px] font-semibold text-[#994038]">Rejection requires a documented reason</div>
//           <div className="mt-2 flex gap-2">
//             <input
//               autoFocus
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               placeholder="Reason for rejection…"
//               className="flex-1 rounded-[9px] border border-line bg-surface px-3 py-2 text-[13.5px] text-ink outline-none placeholder:text-faint"
//             />
//             <Button variant="secondary" onClick={() => { setRejecting(false); setReason(""); }}>
//               Cancel
//             </Button>
//             <Button
//               disabled={!reason.trim()}
//               onClick={() => {
//                 emp.rejectCandidate(c.id, reason.trim() || "No reason provided");
//                 setRejecting(false);
//                 setReason("");
//               }}
//             >
//               Confirm rejection
//             </Button>
//           </div>
//         </Card>
//       )}

//       <Card className="grid grid-cols-[auto_1fr_auto] items-center gap-6 p-4 max-md:grid-cols-1">
//         <div className="flex items-center gap-4">
//           <ScoreRing value={c.match} size={68} stroke={6} />
//           <div>
//             <div className="text-[11px] font-semibold uppercase tracking-wide text-faint">Matched against</div>
//             <div className="text-[14px] font-bold text-ink">{role?.title ?? "No active role"}</div>
//             <div className="mt-1">
//               <Confidence level={c.conf} />
//             </div>
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-x-8 gap-y-2 border-x border-line-soft px-6 max-md:border-x-0 max-md:border-y max-md:py-3">
//           <Row l="Evidence strength" v={c.ev} good />
//           <Row l="Key gap" v={c.gap} warn />
//           <Row l="Passport" v={c.passport === "verified" ? "Verified" : c.passport === "partial" ? "Partial" : "Unverified"} />
//           <Row l="Availability" v={c.availability} />
//         </div>
//         <StatusBadge tone={TAG_TONE[c.tag]}>{c.tag}</StatusBadge>
//       </Card>

//       <div>
//         <div className="flex gap-1 overflow-x-auto border-b border-line">
//           {tabs.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={cx(
//                 "relative shrink-0 px-3 py-2.5 text-[13.5px] font-semibold transition-colors",
//                 tab === t ? "text-brand-600" : "text-muted hover:text-ink",
//               )}
//             >
//               {t}
//               {tab === t && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand-500" />}
//             </button>
//           ))}
//         </div>

//         <div className="max-h-[42vh] overflow-y-auto pt-4">
//           {tab === "Evidence" || tab === "Talent DNA" ? (
//             <EvidenceTable c={c} />
//           ) : tab === "Overview" ? (
//             <OverviewPanel c={c} role={role?.title} />
//           ) : tab === "Activity" && entry ? (
//             <Card className="p-4">
//               <SectionTitle title="Pipeline activity" />
//               <div className="space-y-3">
//                 {entry.history.map((h, i) => (
//                   <div key={i} className="flex items-center gap-3 text-[13.5px]">
//                     <Circle className="size-2 fill-brand-500 text-brand-500" />
//                     <span className="font-semibold text-ink">{h.by}</span>
//                     <span className="text-muted">moved to {h.stage}</span>
//                     <span className="ml-auto text-[12px] text-faint">{h.at}</span>
//                   </div>
//                 ))}
//                 {entry.rejectReason && (
//                   <div className="rounded-[9px] bg-[#fbeceb] px-3 py-2 text-[13px] text-[#994038]">
//                     Rejection reason: {entry.rejectReason}
//                   </div>
//                 )}
//               </div>
//             </Card>
//           ) : (
//             <Card className="p-6 text-center">
//               <div className="text-[14px] font-semibold text-ink">{tab}</div>
//               <p className="mx-auto mt-1 max-w-sm text-[13px] text-muted">
//                 {tab} detail is captured as verified evidence and contributes to this candidate&rsquo;s
//                 role match.
//               </p>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Row({ l, v, good, warn }: { l: string; v: string; good?: boolean; warn?: boolean }) {
//   return (
//     <div className="flex items-center justify-between text-[13.5px]">
//       <span className="text-muted">{l}</span>
//       <span className={cx("font-semibold", good ? "text-[#276c4f]" : warn ? "text-[#8f5a14]" : "text-ink")}>{v}</span>
//     </div>
//   );
// }

// function OverviewPanel({ c, role }: { c: Candidate; role?: string }) {
//   return (
//     <div className="grid grid-cols-[1.5fr_1fr] gap-4 max-lg:grid-cols-1">
//       <Card className="p-4">
//         <SectionTitle title="Why this candidate matches" eyebrow="Evidence explanation" />
//         <p className="text-[13.5px] leading-relaxed text-ink-soft">
//           {c.name} matches <span className="font-semibold">{role ?? "the role"}</span> with{" "}
//           <span className="font-semibold text-brand-600">{c.match}%</span> alignment. Strengths in{" "}
//           {c.skills.join(", ")} are supported by {c.ev.toLowerCase()} evidence. The main gap is{" "}
//           <span className="font-semibold text-[#8f5a14]">{c.gap}</span>.
//         </p>
//         <div className="mt-3 rounded-[10px] border border-line-soft bg-raised p-3.5 text-[13px] text-muted">
//           The system recommends. The final hiring decision is always made by a person, with the
//           evidence above in view.
//         </div>
//       </Card>
//       <Card className="p-4">
//         <SectionTitle title="Internal notes" />
//         <div className="rounded-[10px] border border-dashed border-line px-3 py-2.5 text-[13px] text-faint">
//           Internal only — never visible to the candidate.
//         </div>
//       </Card>
//     </div>
//   );
// }

// function EvidenceTable({ c }: { c: Candidate }) {
//   const rows: { s: string; l: string; cf: "High" | "Medium" | "Low"; v: "verified" | "unverified" }[] =
//     c.skills.map((s) => ({ s, l: "Advanced", cf: c.conf, v: "verified" }));
//   rows.push({ s: c.gap, l: "Basic", cf: "Low", v: "unverified" });
//   return (
//     <Card className="overflow-hidden">
//       <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-3 border-b border-line bg-raised px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-faint">
//         <div>Skill</div>
//         <div>Evidenced</div>
//         <div>Confidence</div>
//         <div>Verification</div>
//       </div>
//       <div className="divide-y divide-line-soft">
//         {rows.map((r, i) => (
//           <div key={i} className="grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center gap-3 px-4 py-3 text-[13.5px]">
//             <div className="font-semibold text-ink">{r.s}</div>
//             <div className="text-ink-soft">{r.l}</div>
//             <div>
//               <Confidence level={r.cf} />
//             </div>
//             <div>
//               <StatusBadge tone={r.v === "verified" ? "verified" : "unverified"}>
//                 {r.v === "verified" ? "Verified" : "Unverified Claim"}
//               </StatusBadge>
//             </div>
//           </div>
//         ))}
//       </div>
//     </Card>
//   );
// }

/* ============================================================ PIPELINE */


