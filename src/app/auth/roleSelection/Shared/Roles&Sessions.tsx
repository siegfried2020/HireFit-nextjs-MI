import {
  User,
  Building2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { type Portal, type Session } from "../../../../components/rankShellPages";
import { cx } from "@/components/primitives";


export const ROLES: Record<
  Portal,
  { title: string; subtitle: string; desc: string; icon: LucideIcon; signup: boolean }
> = {
  candidate: {
    title: "Candidate",
    subtitle: "For individuals",
    desc: "Build your verified Talent DNA, prove your skills, and discover relevant opportunities.",
    icon: User,
    signup: true,
  },
  employer: {
    title: "Employer",
    subtitle: "For hiring teams",
    desc: "Create Job DNA, discover verified talent, and manage evidence-based hiring.",
    icon: Building2,
    signup: true,
  },
  ops: {
    title: "Admin / University Operations",
    subtitle: "For institutions and platform teams",
    desc: "Manage platform governance, monitor cohort readiness, and oversee institution outcomes.",
    icon: ShieldCheck,
    signup: true,
  },
};

export const DEFAULT_SESSION: Record<Portal, Omit<Session, "portal">> = {
  candidate: { workspace: "Layla Al-Otaibi", account: "Layla Al-Otaibi", initials: "LA", meta: "Riyadh · KSA" },
  employer: { workspace: "Jahez", account: "Nora Saleh", initials: "NS", meta: "Talent Acquisition" },
  ops: { workspace: "HireFit Operations", account: "Operations Team", initials: "OT", meta: "Platform & Institution Ops" },
};

export function Steps({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="mb-7 flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={s} className="flex flex-1 items-center gap-2">
          <div className="flex flex-1 flex-col gap-1.5">
            <div
              className={cx(
                "h-1 rounded-full transition-colors",
                i < current ? "bg-brand-500" : i === current ? "bg-brand-500" : "bg-line",
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function StepHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-[24px] font-bold tracking-tight text-ink">{title}</h1>
      <p className="mt-1 text-[14px] text-muted">{sub}</p>
    </div>
  );
}

export function LoginPrompt({ onLogin }: { onLogin: () => void }) {
  return (
    <p className="mt-6 text-center text-[13.5px] text-muted">
      Already have an account?{" "}
      <button onClick={onLogin} className="font-semibold text-brand-600 hover:text-brand-700">Sign in</button>
    </p>
  );
}