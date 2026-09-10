import { type ReactNode } from "react";

import {
  type RoleStatus,
} from "../employerStore";

export const STATUS_LABEL: Record<RoleStatus, string> = {
    draft: "Draft",
    review: "In Review",
    approved: "Approved",
    published: "Published",
  };
export const STATUS_TONE: Record<RoleStatus, "review" | "published" | "verified"> = {
    draft: "review",
    review: "review",
    approved: "verified",
    published: "published",
  };
export const REQ_LEVELS = ["Basic", "Intermediate", "Advanced", "Expert"];
  
export function PageHead({
    eyebrow,
    title,
    sub,
    actions,
  }: {
    eyebrow?: string;
    title: string;
    sub?: string;
    actions?: ReactNode;
  }) {
    return (
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          {eyebrow && (
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">{eyebrow}</div>
          )}
          <h1 className="text-[22px] font-bold tracking-tight text-ink">{title}</h1>
          {sub && <div className="text-[13px] text-muted">{sub}</div>}
        </div>
        {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
      </div>
    );
  }
  
export function InlineHint({ children }: { children: ReactNode }) {
    return (
      <div className="grid place-items-center rounded-[10px] border border-dashed border-line bg-raised/60 px-4 py-6 text-center text-[13px] text-muted">
        {children}
      </div>
    );
  }