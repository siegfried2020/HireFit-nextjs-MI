
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  BarChart,
  Bar,
  Cell,
  CartesianGrid
} from "recharts";
import { Card, Button, StatusBadge, SectionTitle, Stat, cx } from "../../components/primitives";

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
  