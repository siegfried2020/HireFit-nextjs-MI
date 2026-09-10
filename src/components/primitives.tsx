import type { ButtonHTMLAttributes, ElementType, HTMLAttributes, ReactNode } from "react";

/* ---------------------------------------------------------------- utilities */

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------- Status */

type StatusTone =
  | "verified"
  | "partial"
  | "unverified"
  | "expired"
  | "review"
  | "draft"
  | "published"
  | "flagged"
  | "approved"
  | "revoked"
  | "neutral";

const STATUS_STYLES: Record<StatusTone, { bg: string; fg: string; dot: string }> = {
  verified: { bg: "bg-[#e7f2ec]", fg: "text-[#276c4f]", dot: "bg-[#2e7d5b]" },
  approved: { bg: "bg-[#e7f2ec]", fg: "text-[#276c4f]", dot: "bg-[#2e7d5b]" },
  published: { bg: "bg-[#ededfc]", fg: "text-[#3832a3]", dot: "bg-[#4f46e5]" },
  partial: { bg: "bg-[#fbf1e2]", fg: "text-[#8f5a14]", dot: "bg-[#b3721a]" },
  review: { bg: "bg-[#fbf1e2]", fg: "text-[#8f5a14]", dot: "bg-[#b3721a]" },
  draft: { bg: "bg-[#f0f2f6]", fg: "text-[#3a4658]", dot: "bg-[#98a2b3]" },
  neutral: { bg: "bg-[#f0f2f6]", fg: "text-[#3a4658]", dot: "bg-[#98a2b3]" },
  unverified: { bg: "bg-[#f0f2f6]", fg: "text-[#667085]", dot: "bg-[#98a2b3]" },
  expired: { bg: "bg-[#fbeceb]", fg: "text-[#994038]", dot: "bg-[#b5443a]" },
  flagged: { bg: "bg-[#fbeceb]", fg: "text-[#994038]", dot: "bg-[#b5443a]" },
  revoked: { bg: "bg-[#fbeceb]", fg: "text-[#994038]", dot: "bg-[#b5443a]" },
};

export function StatusBadge({
  tone,
  children,
  dot = true,
}: {
  tone: StatusTone;
  children: ReactNode;
  dot?: boolean;
}) {
  const s = STATUS_STYLES[tone];
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[12px] font-semibold tracking-tight",
        s.bg,
        s.fg,
      )}
    >
      {dot && <span className={cx("size-1.5 rounded-full", s.dot)} />}
      {children}
    </span>
  );
}

/* --------------------------------------------------------------- Confidence */

export function Confidence({ level }: { level: "High" | "Medium" | "Low" }) {
  const bars = level === "High" ? 3 : level === "Medium" ? 2 : 1;
  const color =
    level === "High" ? "bg-[#2e7d5b]" : level === "Medium" ? "bg-[#b3721a]" : "bg-[#98a2b3]";
  return (
    <span className="inline-flex items-center gap-1.5" title={`${level} confidence`}>
      <span className="flex items-end gap-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cx(
              "w-1 rounded-[1px]",
              i < bars ? color : "bg-line",
              i === 0 ? "h-1.5" : i === 1 ? "h-2.5" : "h-3.5",
            )}
          />
        ))}
      </span>
      <span className="text-[13px] font-medium text-ink-soft">{level}</span>
    </span>
  );
}

/* -------------------------------------------------------------- Skill level */

const LEVELS = ["None", "Basic", "Intermediate", "Advanced", "Expert"];

export function SkillLevel({
  claimed,
  evidenced,
}: {
  claimed?: string;
  evidenced?: string;
}) {
  const claimedIdx = claimed ? LEVELS.indexOf(claimed) : -1;
  const evidencedIdx = evidenced ? LEVELS.indexOf(evidenced) : -1;
  return (
    <div className="flex items-center gap-1">
      {LEVELS.slice(1).map((_, i) => {
        const step = i + 1;
        const filled = step <= evidencedIdx;
        const claimedOnly = step <= claimedIdx && step > evidencedIdx;
        return (
          <span
            key={i}
            className={cx(
              "h-1.5 w-6 rounded-full",
              filled
                ? "bg-brand-500"
                : claimedOnly
                  ? "bg-brand-200"
                  : "bg-line",
            )}
          />
        );
      })}
    </div>
  );
}

/* --------------------------------------------------------------- Score ring */

export function ScoreRing({
  value,
  size = 64,
  label,
  stroke = 6,
}: {
  value: number;
  size?: number;
  label?: string;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e4e8ee" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#4f46e5"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
          style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-semibold tabular-nums leading-none text-ink" style={{ fontSize: size * 0.26 }}>
          {value}
          <span className="text-[0.55em] text-muted">%</span>
        </span>
        {label && <span className="mt-0.5 text-[9px] font-medium uppercase tracking-wide text-faint">{label}</span>}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- Card */

export function Card({
  children,
  className,
  as: As = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
} & HTMLAttributes<HTMLElement>) {
  return (
    <As
      className={cx(
        "rounded-[14px] border border-line bg-surface shadow-[var(--shadow-card)]",
        className,
      )}
      {...rest}
    >
      {children}
    </As>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">
            {eyebrow}
          </div>
        )}
        <h2 className="text-[18px] font-bold tracking-tight text-ink">{title}</h2>
      </div>
      {action}
    </div>
  );
}

/* ------------------------------------------------------------------ Buttons */

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "quiet";
  size?: "sm" | "md";
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[9px] font-semibold tracking-tight transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-50";
  const sizes = { sm: "h-8 px-3 text-[13px]", md: "h-10 px-4 text-[14px]" };
  const variants = {
    primary: "bg-brand-500 text-white hover:bg-brand-600 shadow-[var(--shadow-card)]",
    secondary: "bg-surface text-ink border border-line hover:bg-canvas hover:border-brand-200",
    ghost: "text-ink-soft hover:bg-line-soft",
    quiet: "text-brand-600 hover:bg-brand-50",
  };
  return (
    <button className={cx(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function Stat({
  label,
  value,
  sub,
  trend,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  trend?: { dir: "up" | "down"; value: string; good?: boolean };
}) {
  return (
    <div>
      <div className="text-[12px] font-medium uppercase tracking-wide text-faint">{label}</div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="text-[28px] font-bold tracking-tight text-ink tabular-nums">{value}</span>
        {trend && (
          <span
            className={cx(
              "text-[12px] font-semibold",
              trend.good === false ? "text-[#b5443a]" : "text-[#2e7d5b]",
            )}
          >
            {trend.dir === "up" ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>
      {sub && <div className="mt-0.5 text-[13px] text-muted">{sub}</div>}
    </div>
  );
}
