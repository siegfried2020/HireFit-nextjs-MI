import { ChevronRight } from "lucide-react";
import {
  Card,
  StatusBadge,
  SectionTitle,
  cx,
} from "../../../components/primitives";
import type { ProfileIdentity } from "./types";
import { CONSENT_ITEMS } from "./data";

export function Settings({
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
          <div className="flex items-center justify-end gap-1.5 border-b border-line bg-raised px-4 py-1.5 text-[11px] font-medium text-faint min-[450px]:hidden">
            <span>Swipe to see more</span>
            <ChevronRight className="size-3.5" />
          </div>
          <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
            <div className="min-w-[560px]">
              <div className="grid grid-cols-[1.4fr_0.7fr_0.7fr] gap-4 border-b border-line bg-raised px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-faint">
                <div>Purpose</div>
                <div>Status</div>
                <div>Date</div>
              </div>
              <div className="divide-y divide-line-soft">
                {CONSENT_ITEMS.map((item) => (
                  <div key={item.purpose} className="grid grid-cols-[1.4fr_0.7fr_0.7fr] items-start gap-4 px-5 py-4">
                    <div className="min-w-0">
                      <div className="text-[13.5px] font-semibold text-ink">{item.purpose}</div>
                      <div className="mt-0.5 text-[12px] text-muted">{item.desc}</div>
                    </div>
                    <div>
                      <StatusBadge tone={item.status === "Active" ? "verified" : "neutral"}>
                        {item.status}
                      </StatusBadge>
                    </div>
                    <div className="whitespace-nowrap text-[12.5px] text-faint">{item.date}</div>
                  </div>
                ))}
              </div>
            </div>
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
