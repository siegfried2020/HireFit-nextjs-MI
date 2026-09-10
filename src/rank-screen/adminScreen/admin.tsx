import { useState } from "react";
import {
  Activity,
  DollarSign,
  Gavel,
  ShieldAlert,
  Server,
  Plus,
  GitMerge,
  ChevronRight,
  Info,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
  LineChart,
  Line,
  YAxis,
} from "recharts";
import { Card, Button, StatusBadge, SectionTitle, Stat, cx } from "../../components/primitives";

/* ============================================================ UNIFIED OPS OVERVIEW */

// export function OpsOverview() {
//   const vol = [
//     { d: "Mon", v: 820 }, { d: "Tue", v: 1120 }, { d: "Wed", v: 980 },
//     { d: "Thu", v: 1340 }, { d: "Fri", v: 1180 }, { d: "Sat", v: 640 }, { d: "Sun", v: 720 },
//   ];

//   const readinessDist = [
//     { r: "0–40%", v: 8, fill: "#b5443a" },
//     { r: "40–60%", v: 22, fill: "#b3721a" },
//     { r: "60–80%", v: 61, fill: "#726bea" },
//     { r: "80–100%", v: 34, fill: "#4f46e5" },
//   ];

//   const placementFunnel = [
//     { stage: "Enrolled", n: 125 },
//     { stage: "Assessment", n: 104 },
//     { stage: "Passport issued", n: 68 },
//     { stage: "Placed", n: 89 },
//   ];

//   const heat = ["API Testing", "Playwright", "SQL", "Performance", "CI/CD", "Test Strategy"];
//   const cohorts = ["Cohort A", "Cohort B", "Cohort C"];
//   const heatData: Record<string, number[]> = {
//     "Cohort A": [82, 74, 68, 41, 55, 60],
//     "Cohort B": [70, 66, 72, 38, 49, 58],
//     "Cohort C": [88, 80, 63, 52, 61, 70],
//   };
//   const heatColor = (v: number) =>
//     v >= 75 ? "bg-brand-500 text-white" : v >= 60 ? "bg-brand-200 text-brand-900" : v >= 45 ? "bg-[#fbf1e2] text-[#8f5a14]" : "bg-[#fbeceb] text-[#994038]";

//   const trainingEffectiveness = [
//     { m: "Feb", before: 52, after: 68 },
//     { m: "Mar", before: 55, after: 71 },
//     { m: "Apr", before: 58, after: 73 },
//     { m: "May", before: 60, after: 76 },
//     { m: "Jun", before: 61, after: 78 },
//     { m: "Jul", before: 64, after: 80 },
//   ];

//   return (
//     <div className="space-y-5">
//       {/* Page header */}
//       <div className="flex items-end justify-between gap-4">
//         <div>
//           <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">Platform &amp; Institution Ops</div>
//           <h1 className="text-[22px] font-bold tracking-tight text-ink">Operations Overview</h1>
//         </div>
//         <div className="flex items-center gap-2 rounded-[9px] border border-line bg-surface px-3 py-1.5 text-[12px] text-muted">
//           <CheckCircle2 className="size-3.5 text-[#2e7d5b]" />
//           All systems operational
//         </div>
//       </div>

//       {/* Top summary row — 5 KPIs */}
//       <div className="grid grid-cols-5 gap-3 max-xl:grid-cols-3 max-lg:grid-cols-2">
//         {[
//           { l: "Assessments today", v: "1,284", s: "across 42 tenants", icon: Activity, tone: "neutral" as const },
//           { l: "Avg. readiness", v: "68%", s: "+3pp vs last cohort", icon: TrendingUp, tone: "up" as const },
//           { l: "Placement rate", v: "71%", s: "of passport holders", icon: CheckCircle2, tone: "up" as const },
//           { l: "Appeal backlog", v: "17", s: "3 over 48h SLA", icon: Clock, tone: "down" as const },
//           { l: "AI cost (MTD)", v: "SAR 38.4k", s: "72% of monthly budget", icon: DollarSign, tone: "neutral" as const },
//         ].map((k) => (
//           <Card key={k.l} className="p-4">
//             <div className="flex items-start justify-between gap-2">
//               <Stat label={k.l} value={k.v} sub={k.s} />
//               <div className={cx(
//                 "mt-0.5 grid size-8 shrink-0 place-items-center rounded-[9px]",
//                 k.tone === "up" ? "bg-[#e7f2ec] text-[#2e7d5b]" : k.tone === "down" ? "bg-[#fbeceb] text-[#994038]" : "bg-brand-50 text-brand-600",
//               )}>
//                 <k.icon className="size-4" />
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* Row 2: Assessment volume + Service health */}
//       <div className="grid grid-cols-[1.6fr_1fr] gap-4 max-lg:grid-cols-1">
//         <Card className="p-4">
//           <SectionTitle title="Assessment volume" eyebrow="Last 7 days" />
//           <ResponsiveContainer width="100%" height={168}>
//             <AreaChart data={vol} margin={{ left: -20, right: 8, top: 8 }}>
//               <defs>
//                 <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.22} />
//                   <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid vertical={false} stroke="#eef1f5" />
//               <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#98a2b3" }} />
//               <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e4e8ee", fontSize: 13 }} />
//               <Area type="monotone" dataKey="v" stroke="#4f46e5" strokeWidth={2.5} fill="url(#volGrad)" />
//             </AreaChart>
//           </ResponsiveContainer>
//         </Card>

//         <Card className="p-4">
//           <SectionTitle title="Service health" />
//           <div className="space-y-2">
//             {[
//               { n: "Scoring engine", s: "Operational", tone: "verified" as const, icon: Server },
//               { n: "AI inference", s: "Operational", tone: "verified" as const, icon: Activity },
//               { n: "Evidence store", s: "Degraded · 1 region", tone: "review" as const, icon: ShieldAlert },
//               { n: "Billing / cost", s: "Operational", tone: "verified" as const, icon: DollarSign },
//             ].map((x) => (
//               <div key={x.n} className="flex items-center justify-between rounded-[10px] border border-line-soft bg-raised px-3 py-2">
//                 <div className="flex items-center gap-2.5">
//                   <x.icon className="size-[18px] text-muted" />
//                   <span className="text-[13.5px] font-semibold text-ink">{x.n}</span>
//                 </div>
//                 <StatusBadge tone={x.tone}>{x.s}</StatusBadge>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>

//       {/* Row 3: Integrity cases + Tenant activity */}
//       <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
//         <Card className="p-4">
//           <SectionTitle title="Integrity cases" eyebrow="Neutral review queue" action={<button className="text-[13px] font-semibold text-brand-600">Open queue</button>} />
//           <div className="divide-y divide-line-soft">
//             {[
//               { id: "INT-2841", sig: "Timing anomaly · rapid completion", tone: "review" as const },
//               { id: "INT-2839", sig: "Multiple paste events", tone: "review" as const },
//               { id: "INT-2835", sig: "Answer similarity flag", tone: "flagged" as const },
//             ].map((c) => (
//               <div key={c.id} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
//                 <div>
//                   <div className="font-mono text-[12.5px] font-medium text-muted">{c.id}</div>
//                   <div className="text-[13.5px] font-medium text-ink">{c.sig}</div>
//                 </div>
//                 <StatusBadge tone={c.tone}>Needs Review</StatusBadge>
//               </div>
//             ))}
//           </div>
//           <p className="mt-2.5 flex items-start gap-2 rounded-[9px] bg-line-soft/60 px-3 py-2 text-[12.5px] text-muted">
//             <Info className="mt-0.5 size-3.5 shrink-0" />
//             Signals are indicators only — a human reviewer decides every case.
//           </p>
//         </Card>

//         <Card className="p-4">
//           <SectionTitle title="Tenant activity" eyebrow="Top workspaces by assessment volume" />
//           <div className="space-y-3">
//             {[
//               { n: "Employer A", v: 92 }, { n: "Employer B", v: 78 }, { n: "Employer C", v: 64 }, { n: "Employer D", v: 41 },
//             ].map((t) => (
//               <div key={t.n} className="flex items-center gap-3">
//                 <span className="w-24 truncate text-[13.5px] font-medium text-ink">{t.n}</span>
//                 <div className="h-2 flex-1 overflow-hidden rounded-full bg-line-soft">
//                   <div className="h-full rounded-full bg-brand-500" style={{ width: `${t.v}%` }} />
//                 </div>
//                 <span className="w-9 text-right text-[13px] tabular-nums text-muted">{t.v}%</span>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>

//       {/* Row 4: Readiness distribution + Skill gap heatmap */}
//       <div className="grid grid-cols-[1fr_1.4fr] gap-4 max-lg:grid-cols-1">
//         <Card className="p-4">
//           <SectionTitle title="Readiness distribution" eyebrow="All active cohorts" />
//           <ResponsiveContainer width="100%" height={176}>
//             <BarChart data={readinessDist} margin={{ left: -24, top: 8 }}>
//               <CartesianGrid vertical={false} stroke="#eef1f5" />
//               <XAxis dataKey="r" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#98a2b3" }} />
//               <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e4e8ee", fontSize: 13 }} cursor={{ fill: "#f7f9fb" }} />
//               <Bar dataKey="v" radius={[6, 6, 0, 0]}>
//                 {readinessDist.map((d, i) => <Cell key={i} fill={d.fill} />)}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </Card>

//         <Card className="p-4">
//           <SectionTitle title="Skill gap heatmap" eyebrow="Avg. evidenced level by cohort" />
//           <div className="overflow-x-auto">
//             <table className="w-full border-separate border-spacing-1">
//               <thead>
//                 <tr>
//                   <th className="w-20"></th>
//                   {heat.map((h) => (
//                     <th key={h} className="pb-1 text-[11px] font-semibold text-faint">{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {cohorts.map((c) => (
//                   <tr key={c}>
//                     <td className="pr-2 text-right text-[12.5px] font-semibold text-ink">{c}</td>
//                     {heatData[c].map((v, i) => (
//                       <td key={i}>
//                         <div className={cx("grid h-9 place-items-center rounded-[7px] text-[12px] font-bold tabular-nums", heatColor(v))}>
//                           {v}
//                         </div>
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <p className="mt-2 text-[12.5px] text-muted">Performance Testing is the consistent gap — a candidate for curriculum focus.</p>
//         </Card>
//       </div>

//       {/* Row 5: Placement funnel + Training effectiveness */}
//       <div className="grid grid-cols-[1fr_1.6fr] gap-4 max-lg:grid-cols-1">
//         <Card className="p-4">
//           <SectionTitle title="Placement funnel" eyebrow="Current cohort" />
//           <div className="mt-2 space-y-2.5">
//             {placementFunnel.map((s, i) => {
//               const pct = Math.round((s.n / placementFunnel[0].n) * 100);
//               return (
//                 <div key={s.stage}>
//                   <div className="mb-1 flex items-center justify-between text-[13px]">
//                     <span className="font-medium text-ink">{s.stage}</span>
//                     <span className="tabular-nums text-muted">{s.n} <span className="text-faint">({pct}%)</span></span>
//                   </div>
//                   <div className="h-2 overflow-hidden rounded-full bg-line-soft">
//                     <div
//                       className="h-full rounded-full"
//                       style={{ width: `${pct}%`, backgroundColor: i === 0 ? "#4f46e5" : i === placementFunnel.length - 1 ? "#2e7d5b" : "#726bea" }}
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-4 flex items-center gap-2 rounded-[9px] bg-[#e7f2ec] px-3 py-2 text-[12.5px] text-[#2e7d5b]">
//             <CheckCircle2 className="size-3.5 shrink-0" />
//             71% placement rate — above national benchmark of 62%
//           </div>
//         </Card>

//         <Card className="p-4">
//           <SectionTitle title="Training effectiveness" eyebrow="Avg. readiness before vs after programme" />
//           <ResponsiveContainer width="100%" height={180}>
//             <LineChart data={trainingEffectiveness} margin={{ left: -16, right: 8, top: 8 }}>
//               <CartesianGrid vertical={false} stroke="#eef1f5" />
//               <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#98a2b3" }} />
//               <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#98a2b3" }} domain={[40, 90]} />
//               <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e4e8ee", fontSize: 13 }} />
//               <Line type="monotone" dataKey="before" stroke="#b3721a" strokeWidth={2} strokeDasharray="4 3" dot={false} name="Pre-programme" />
//               <Line type="monotone" dataKey="after" stroke="#4f46e5" strokeWidth={2.5} dot={false} name="Post-programme" />
//             </LineChart>
//           </ResponsiveContainer>
//           <div className="mt-2 flex items-center gap-4 text-[12.5px]">
//             <span className="flex items-center gap-1.5 text-[#b3721a]"><span className="inline-block h-px w-5 border-t-2 border-dashed border-[#b3721a]" />Pre-programme</span>
//             <span className="flex items-center gap-1.5 text-brand-600"><span className="inline-block h-0.5 w-5 bg-brand-600" />Post-programme</span>
//           </div>
//         </Card>
//       </div>

//       {/* Row 6: Employer demand insight */}
//       <Card className="p-4">
//         <SectionTitle title="Employer demand insight" eyebrow="Top skills requested by verified employers this quarter" />
//         <div className="mt-2 flex flex-wrap gap-2">
//           {[
//             { s: "API Testing", n: 38 }, { s: "Playwright / E2E", n: 31 }, { s: "CI/CD Pipelines", n: 27 },
//             { s: "Test Strategy", n: 22 }, { s: "SQL", n: 19 }, { s: "Performance Testing", n: 15 },
//             { s: "Security Testing", n: 11 }, { s: "Python", n: 9 }, { s: "Mobile Testing", n: 7 },
//           ].map((d) => (
//             <div key={d.s} className="flex items-center gap-2 rounded-[9px] border border-line bg-surface px-3 py-1.5">
//               <span className="text-[13.5px] font-semibold text-ink">{d.s}</span>
//               <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[11px] font-semibold text-brand-700">{d.n} roles</span>
//             </div>
//           ))}
//         </div>
//         <p className="mt-3 text-[12.5px] text-muted">
//           <AlertCircle className="mr-1 inline size-3.5 text-[#b3721a]" />
//           Performance Testing demand (+28% QoQ) outpaces current cohort proficiency — review curriculum allocation.
//         </p>
//       </Card>
//     </div>
//   );
// }

/* ============================================================ ADMIN OVERVIEW */

export function AdminOverview() {
  const vol = [
    { d: "Mon", v: 820 }, { d: "Tue", v: 1120 }, { d: "Wed", v: 980 },
    { d: "Thu", v: 1340 }, { d: "Fri", v: 1180 }, { d: "Sat", v: 640 }, { d: "Sun", v: 720 },
  ];
  return (
    <div className="space-y-4">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">Platform operations</div>
        <h1 className="text-[22px] font-bold tracking-tight text-ink">Governance Overview</h1>
      </div>

      <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2">
        {(
          [
            { l: "Assessments today", v: "1,284", s: "across 42 tenants" },
            { l: "Scoring latency (p95)", v: "1.9s", s: "within SLA", trend: { dir: "down" as const, value: "0.3s", good: true } },
            { l: "AI cost (MTD)", v: "SAR 38.4k", s: "72% of budget" },
            { l: "Appeal backlog", v: "17", s: "3 over 48h", trend: { dir: "up" as const, value: "5", good: false } },
          ] as {
            l: string;
            v: string;
            s: string;
            trend?: { dir: "up" | "down"; value: string; good?: boolean };
          }[]
        ).map((k) => (
          <Card key={k.l} className="p-4"><Stat label={k.l} value={k.v} sub={k.s} trend={k.trend} /></Card>
        ))}
      </div>

      <div className="grid grid-cols-[1.6fr_1fr] gap-4 max-lg:grid-cols-1">
        <Card className="p-4">
          <SectionTitle title="Assessment volume" eyebrow="Last 7 days" />
          <ResponsiveContainer width="100%" height={168}>
            <AreaChart data={vol} margin={{ left: -20, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#eef1f5" />
              <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#98a2b3" }} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e4e8ee", fontSize: 13 }} />
              <Area type="monotone" dataKey="v" stroke="#4f46e5" strokeWidth={2.5} fill="url(#g)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <SectionTitle title="Service health" />
          <div className="space-y-2">
            {[
              { n: "Scoring engine", s: "Operational", tone: "verified" as const, icon: Server },
              { n: "AI inference", s: "Operational", tone: "verified" as const, icon: Activity },
              { n: "Evidence store", s: "Degraded · 1 region", tone: "review" as const, icon: ShieldAlert },
              { n: "Billing / cost", s: "Operational", tone: "verified" as const, icon: DollarSign },
            ].map((x) => (
              <div key={x.n} className="flex items-center justify-between rounded-[10px] border border-line-soft bg-raised px-3 py-2">
                <div className="flex items-center gap-2.5">
                  <x.icon className="size-[18px] text-muted" />
                  <span className="text-[13.5px] font-semibold text-ink">{x.n}</span>
                </div>
                <StatusBadge tone={x.tone}>{x.s}</StatusBadge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        <Card className="p-4">
          <SectionTitle title="Integrity cases" eyebrow="Neutral review queue" action={<button className="text-[13px] font-semibold text-brand-600">Open queue</button>} />
          <div className="divide-y divide-line-soft">
            {[
              { id: "INT-2841", sig: "Timing anomaly · rapid completion", tone: "review" as const },
              { id: "INT-2839", sig: "Multiple paste events", tone: "review" as const },
              { id: "INT-2835", sig: "Answer similarity flag", tone: "flagged" as const },
            ].map((c) => (
              <div key={c.id} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                <div>
                  <div className="font-mono text-[12.5px] font-medium text-muted">{c.id}</div>
                  <div className="text-[13.5px] font-medium text-ink">{c.sig}</div>
                </div>
                <StatusBadge tone={c.tone}>Needs Review</StatusBadge>
              </div>
            ))}
          </div>
          <p className="mt-2.5 flex items-start gap-2 rounded-[9px] bg-line-soft/60 px-3 py-2 text-[12.5px] text-muted">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            Signals are indicators only — a human reviewer decides every case.
          </p>
        </Card>

        <Card className="p-4">
          <SectionTitle title="Tenant activity" eyebrow="Top workspaces" />
          <div className="space-y-3">
            {[
              { n: "Jahez", v: 92 }, { n: "STC Solutions", v: 78 }, { n: "Tamara", v: 64 }, { n: "stc pay", v: 41 },
            ].map((t) => (
              <div key={t.n} className="flex items-center gap-3">
                <span className="w-28 truncate text-[13.5px] font-medium text-ink">{t.n}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-line-soft">
                  <div className="h-full rounded-full bg-brand-500" style={{ width: `${t.v}%` }} />
                </div>
                <span className="w-9 text-right text-[13px] tabular-nums text-muted">{t.v}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ============================================================ TAXONOMY */


/* ============================================================ SCORING POLICY */


/* ============================================================ INTEGRITY */


/* ============================================================ APPEALS / REVIEWS */


/* ============================================================ OPS CONFIGURATION */

export function OpsConfig() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">Platform configuration</div>
        <h1 className="mt-1 text-[30px] font-bold tracking-tight text-ink">Configuration</h1>
      </div>
      <Card className="p-5">
        <SectionTitle title="General settings" />
        <div className="space-y-4 text-[13.5px]">
          {[
            { l: "Assessment window (days)", v: "30" },
            { l: "Appeal deadline (days)", v: "30" },
            { l: "Evidence freshness window", v: "12 months" },
            { l: "Scoring policy version", v: "v4.2 (draft)" },
          ].map((r) => (
            <div key={r.l} className="flex items-center justify-between border-b border-line-soft pb-4 last:border-0 last:pb-0">
              <span className="text-muted">{r.l}</span>
              <span className="font-semibold text-ink">{r.v}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ============================================================ COHORT & INSTITUTION */

export function CohortInsight() {
  const dist = [
    { r: "0–40%", v: 8, fill: "#b5443a" }, { r: "40–60%", v: 22, fill: "#b3721a" },
    { r: "60–80%", v: 61, fill: "#726bea" }, { r: "80–100%", v: 34, fill: "#4f46e5" },
  ];
  const heat = ["API Testing", "Playwright", "SQL", "Performance", "CI/CD", "Test Strategy"];
  const cohorts = ["Cohort A", "Cohort B", "Cohort C"];
  const heatData: Record<string, number[]> = {
    "Cohort A": [82, 74, 68, 41, 55, 60],
    "Cohort B": [70, 66, 72, 38, 49, 58],
    "Cohort C": [88, 80, 63, 52, 61, 70],
  };
  const heatColor = (v: number) =>
    v >= 75 ? "bg-brand-500 text-white" : v >= 60 ? "bg-brand-200 text-brand-900" : v >= 45 ? "bg-[#fbf1e2] text-[#8f5a14]" : "bg-[#fbeceb] text-[#994038]";

  return (
    <div className="space-y-4">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">Aggregated insight · no individual data</div>
        <h1 className="text-[22px] font-bold tracking-tight text-ink">Cohort Insight</h1>
        <div className="text-[13px] text-muted">King Saud University · QA &amp; Software Testing programme</div>
      </div>

      <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2">
        {[
          { l: "Students", v: "125" }, { l: "Avg. readiness", v: "68%" },
          { l: "Placement rate", v: "71%" }, { l: "Passport-issued", v: "54%" },
        ].map((k) => (<Card key={k.l} className="p-4"><Stat label={k.l} value={k.v} /></Card>))}
      </div>

      <div className="grid grid-cols-[1fr_1.4fr] gap-4 max-lg:grid-cols-1">
        <Card className="p-4">
          <SectionTitle title="Readiness distribution" />
          <ResponsiveContainer width="100%" height={176}>
            <BarChart data={dist} margin={{ left: -24, top: 8 }}>
              <CartesianGrid vertical={false} stroke="#eef1f5" />
              <XAxis dataKey="r" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#98a2b3" }} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e4e8ee", fontSize: 13 }} cursor={{ fill: "#f7f9fb" }} />
              <Bar dataKey="v" radius={[6, 6, 0, 0]}>
                {dist.map((d, i) => <Cell key={i} fill={d.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <SectionTitle title="Skill gap heatmap" eyebrow="Avg. evidenced level by cohort" />
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-1">
              <thead>
                <tr>
                  <th className="w-24"></th>
                  {heat.map((h) => (
                    <th key={h} className="pb-1 text-[11px] font-semibold text-faint">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cohorts.map((c) => (
                  <tr key={c}>
                    <td className="pr-2 text-right text-[12.5px] font-semibold text-ink">{c}</td>
                    {heatData[c].map((v, i) => (
                      <td key={i}>
                        <div className={cx("grid h-9 place-items-center rounded-[7px] text-[12px] font-bold tabular-nums", heatColor(v))}>
                          {v}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12.5px] text-muted">Performance Testing is the consistent gap across cohorts — a candidate for curriculum focus.</p>
        </Card>
      </div>
    </div>
  );
}
