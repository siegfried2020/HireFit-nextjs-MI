import { useState } from "react";
import {
  ShieldCheck,
  MessageSquare,
  Search as SearchIcon,
  
  UserPlus,
  ArrowLeft,
  Circle
} from "lucide-react";


import {
    Card,
    Button,
    StatusBadge,
    Confidence,
    ScoreRing,
    SectionTitle,
    cx,
  } from "../../../components/primitives";
  import {
    useEmployer,
    STAGES,
    type Candidate,
  } from "../employerStore";
import { InlineHint } from "../EmployerShared/EmployerShared";

const TAG_TONE = {
    "Recommended Match": "verified",
    "Strong Alignment": "published",
    "Needs Review": "review",
  } as const;

export function CandidateDetail({ go }: { go: (r: string) => void }) {
    const emp = useEmployer();
    const c = emp.selectedCandidate;
    const [tab, setTab] = useState("Overview");
    const [rejecting, setRejecting] = useState(false);
    const [reason, setReason] = useState("");
  
    if (!c) {
      return (
        <div className="space-y-4">
          <button onClick={() => go("search")} className="flex items-center gap-1.5 text-[13px] font-semibold text-brand-600">
            <ArrowLeft className="size-4" /> Back to Talent Search
          </button>
          <InlineHint>Open a candidate from Talent Search or your Pipeline to see their profile.</InlineHint>
        </div>
      );
    }
  
    const entry = emp.entryFor(c.id);
    const inPipeline = !!entry && entry.stage !== "Rejected";
    const role = emp.activeRole;
    const originRoute = emp.candidateOrigin;
    const tabs = [
      "Overview",
      "Talent DNA",
      "Evidence",
      "Role Readiness",
      "Interview",
      "Assessments",
      "Work Simulations",
      "Resume",
      "Passport",
      "Activity",
    ];
    const canAdvance = entry && STAGES.indexOf(entry.stage) < STAGES.length - 1;
  
    return (
      <div className="space-y-4">
        <button
          onClick={() => go(originRoute === "pipeline" ? "pipeline" : "search")}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-brand-600"
        >
          <ArrowLeft className="size-4" /> Back to {originRoute === "pipeline" ? "Pipeline" : "Talent Search"}
        </button>
  
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="grid size-14 place-items-center rounded-[14px] bg-brand-100 text-[19px] font-bold text-brand-700">
              {c.initials}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-[22px] font-bold tracking-tight text-ink">{c.name}</h1>
                {c.passport === "verified" && <ShieldCheck className="size-5 text-[#2e7d5b]" />}
                {c.national && <StatusBadge tone="published">National Talent</StatusBadge>}
                {entry && <StatusBadge tone={entry.stage === "Rejected" ? "revoked" : "review"}>{entry.stage}</StatusBadge>}
              </div>
              <div className="text-[13px] text-muted">
                {c.headline} · {c.location} · {c.availability}
              </div>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="secondary">
              <MessageSquare className="size-4" /> Add note
            </Button>
            {!inPipeline ? (
              <Button onClick={() => emp.addToPipeline(c.id)}>
                <UserPlus className="size-4" /> Add to pipeline
              </Button>
            ) : (
              <>
                {canAdvance && <Button onClick={() => emp.advanceStage(c.id)}>Advance stage</Button>}
                <Button variant="secondary" onClick={() => setRejecting(true)}>
                  Reject
                </Button>
              </>
            )}
          </div>
        </div>
  
        {rejecting && (
          <Card className="border-[#e6b8b3] bg-[#fbeceb] p-4">
            <div className="text-[13.5px] font-semibold text-[#994038]">Rejection requires a documented reason</div>
            <div className="mt-2 flex gap-2">
              <input
                autoFocus
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason for rejection…"
                className="flex-1 rounded-[9px] border border-line bg-surface px-3 py-2 text-[13.5px] text-ink outline-none placeholder:text-faint"
              />
              <Button variant="secondary" onClick={() => { setRejecting(false); setReason(""); }}>
                Cancel
              </Button>
              <Button
                disabled={!reason.trim()}
                onClick={() => {
                  emp.rejectCandidate(c.id, reason.trim() || "No reason provided");
                  setRejecting(false);
                  setReason("");
                }}
              >
                Confirm rejection
              </Button>
            </div>
          </Card>
        )}
  
        <Card className="grid grid-cols-[auto_1fr_auto] items-center gap-6 p-4 max-md:grid-cols-1">
          <div className="flex items-center gap-4">
            <ScoreRing value={c.match} size={68} stroke={6} />
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-faint">Matched against</div>
              <div className="text-[14px] font-bold text-ink">{role?.title ?? "No active role"}</div>
              <div className="mt-1">
                <Confidence level={c.conf} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 border-x border-line-soft px-6 max-md:border-x-0 max-md:border-y max-md:py-3">
            <Row l="Evidence strength" v={c.ev} good />
            <Row l="Key gap" v={c.gap} warn />
            <Row l="Passport" v={c.passport === "verified" ? "Verified" : c.passport === "partial" ? "Partial" : "Unverified"} />
            <Row l="Availability" v={c.availability} />
          </div>
          <StatusBadge tone={TAG_TONE[c.tag]}>{c.tag}</StatusBadge>
        </Card>
  
        <div>
          <div className="flex gap-1 overflow-x-auto border-b border-line">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cx(
                  "relative shrink-0 px-3 py-2.5 text-[13.5px] font-semibold transition-colors",
                  tab === t ? "text-brand-600" : "text-muted hover:text-ink",
                )}
              >
                {t}
                {tab === t && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand-500" />}
              </button>
            ))}
          </div>
  
          <div className="max-h-[42vh] overflow-y-auto pt-4">
            {tab === "Evidence" || tab === "Talent DNA" ? (
              <EvidenceTable c={c} />
            ) : tab === "Overview" ? (
              <OverviewPanel c={c} role={role?.title} />
            ) : tab === "Activity" && entry ? (
              <Card className="p-4">
                <SectionTitle title="Pipeline activity" />
                <div className="space-y-3">
                  {entry.history.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 text-[13.5px]">
                      <Circle className="size-2 fill-brand-500 text-brand-500" />
                      <span className="font-semibold text-ink">{h.by}</span>
                      <span className="text-muted">moved to {h.stage}</span>
                      <span className="ml-auto text-[12px] text-faint">{h.at}</span>
                    </div>
                  ))}
                  {entry.rejectReason && (
                    <div className="rounded-[9px] bg-[#fbeceb] px-3 py-2 text-[13px] text-[#994038]">
                      Rejection reason: {entry.rejectReason}
                    </div>
                  )}
                </div>
              </Card>
            ) : (
              <Card className="p-6 text-center">
                <div className="text-[14px] font-semibold text-ink">{tab}</div>
                <p className="mx-auto mt-1 max-w-sm text-[13px] text-muted">
                  {tab} detail is captured as verified evidence and contributes to this candidate&rsquo;s
                  role match.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  function Row({ l, v, good, warn }: { l: string; v: string; good?: boolean; warn?: boolean }) {
    return (
      <div className="flex items-center justify-between text-[13.5px]">
        <span className="text-muted">{l}</span>
        <span className={cx("font-semibold", good ? "text-[#276c4f]" : warn ? "text-[#8f5a14]" : "text-ink")}>{v}</span>
      </div>
    );
  }
  
  function OverviewPanel({ c, role }: { c: Candidate; role?: string }) {
    return (
      <div className="grid grid-cols-[1.5fr_1fr] gap-4 max-lg:grid-cols-1">
        <Card className="p-4">
          <SectionTitle title="Why this candidate matches" eyebrow="Evidence explanation" />
          <p className="text-[13.5px] leading-relaxed text-ink-soft">
            {c.name} matches <span className="font-semibold">{role ?? "the role"}</span> with{" "}
            <span className="font-semibold text-brand-600">{c.match}%</span> alignment. Strengths in{" "}
            {c.skills.join(", ")} are supported by {c.ev.toLowerCase()} evidence. The main gap is{" "}
            <span className="font-semibold text-[#8f5a14]">{c.gap}</span>.
          </p>
          <div className="mt-3 rounded-[10px] border border-line-soft bg-raised p-3.5 text-[13px] text-muted">
            The system recommends. The final hiring decision is always made by a person, with the
            evidence above in view.
          </div>
        </Card>
        <Card className="p-4">
          <SectionTitle title="Internal notes" />
          <div className="rounded-[10px] border border-dashed border-line px-3 py-2.5 text-[13px] text-faint">
            Internal only — never visible to the candidate.
          </div>
        </Card>
      </div>
    );
  }
  
  function EvidenceTable({ c }: { c: Candidate }) {
    const rows: { s: string; l: string; cf: "High" | "Medium" | "Low"; v: "verified" | "unverified" }[] =
      c.skills.map((s) => ({ s, l: "Advanced", cf: c.conf, v: "verified" }));
    rows.push({ s: c.gap, l: "Basic", cf: "Low", v: "unverified" });
    return (
      <Card className="overflow-hidden">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-3 border-b border-line bg-raised px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-faint">
          <div>Skill</div>
          <div>Evidenced</div>
          <div>Confidence</div>
          <div>Verification</div>
        </div>
        <div className="divide-y divide-line-soft">
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center gap-3 px-4 py-3 text-[13.5px]">
              <div className="font-semibold text-ink">{r.s}</div>
              <div className="text-ink-soft">{r.l}</div>
              <div>
                <Confidence level={r.cf} />
              </div>
              <div>
                <StatusBadge tone={r.v === "verified" ? "verified" : "unverified"}>
                  {r.v === "verified" ? "Verified" : "Unverified Claim"}
                </StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }