import {
  Plus,
  GitMerge,
  ChevronRight
} from "lucide-react";
import { Card, Button, StatusBadge } from "../../components/primitives";

export function Taxonomy() {
    const skills = [
      { en: "API Testing", ar: "اختبار واجهات البرمجة", fam: "Test Automation", levels: 5, state: "published" as const, aliases: 3 },
      { en: "Playwright", ar: "بلاي رايت", fam: "Test Automation", levels: 5, state: "published" as const, aliases: 2 },
      { en: "Performance Testing", ar: "اختبار الأداء", fam: "Test Automation", levels: 5, state: "review" as const, aliases: 4 },
      { en: "SQL", ar: "لغة الاستعلام", fam: "Data & Queries", levels: 5, state: "published" as const, aliases: 5 },
      { en: "Selenium", ar: "سيلينيوم", fam: "Test Automation", levels: 5, state: "revoked" as const, aliases: 1 },
    ];
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">Bilingual · versioned</div>
            <h1 className="mt-1 text-[30px] font-bold tracking-tight text-ink">Skill Taxonomy</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary"><GitMerge className="size-4" /> Merge skill</Button>
            <Button><Plus className="size-4" /> New skill</Button>
          </div>
        </div>
  
        <Card className="overflow-hidden">
          <div className="flex items-center justify-end gap-1.5 border-b border-line bg-raised px-4 py-1.5 text-[11px] font-medium text-faint md:hidden">
            <span>Swipe to see more</span>
            <ChevronRight className="size-3.5" />
          </div>
          <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
            <div className="min-w-[720px]">
              <div className="grid grid-cols-[1.6fr_1.2fr_1fr_0.7fr_1fr_auto] gap-3 border-b border-line bg-raised px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-faint">
                <div>Skill (EN)</div><div>Arabic name</div><div>Family</div><div>Aliases</div><div>Status</div><div></div>
              </div>
              <div className="divide-y divide-line-soft">
                {skills.map((s) => (
                  <div key={s.en} className="grid grid-cols-[1.6fr_1.2fr_1fr_0.7fr_1fr_auto] items-center gap-3 px-5 py-3.5 text-[13.5px] transition-colors hover:bg-brand-50/40">
                    <div className="font-semibold text-ink">{s.en}</div>
                    <div dir="rtl" className="text-ink-soft">{s.ar}</div>
                    <div className="text-muted">{s.fam}</div>
                    <div className="tabular-nums text-muted">{s.aliases}</div>
                    <div>
                      <StatusBadge tone={s.state === "published" ? "published" : s.state === "review" ? "review" : "revoked"}>
                        {s.state === "published" ? "Published" : s.state === "review" ? "In Review" : "Deprecated"}
                      </StatusBadge>
                    </div>
                    <ChevronRight className="size-4 shrink-0 text-faint" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }