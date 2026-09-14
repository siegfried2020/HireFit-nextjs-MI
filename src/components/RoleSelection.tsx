"use client";

import { useState, type ComponentType, type ReactNode, type SVGProps } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Users,
  Building2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Mail,
  Lock,
  BadgeCheck,
  KeyRound,
  type LucideIcon,
} from "lucide-react";
import { Button, cx } from "./primitives";
import { Logo, type Portal, type Session } from "./rankShellPages";

/* --------------------------------------------------------------- role meta */

const ROLES: Record<
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

const DEFAULT_SESSION: Record<Portal, Omit<Session, "portal">> = {
  candidate: { workspace: "Layla Al-Otaibi", account: "Layla Al-Otaibi", initials: "LA", meta: "Riyadh · KSA" },
  employer: { workspace: "Jahez", account: "Nora Saleh", initials: "NS", meta: "Talent Acquisition" },
  ops: { workspace: "HireFit Operations", account: "Operations Team", initials: "OT", meta: "Platform & Institution Ops" },
};

/* ---------------------------------------------------------- form primitives */

function Field({
  label,
  type = "text",
  icon: Icon,
  placeholder,
  hint,
  optional,
}: {
  label: string;
  type?: string;
  icon?: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;
  placeholder?: string;
  hint?: string;
  optional?: boolean;
}) {
  const [show, setShow] = useState(false);
  const isPw = type === "password";
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[13px] font-semibold text-ink">{label}</span>
        {optional && <span className="text-[12px] font-medium text-faint">Optional</span>}
      </div>
      <div className="relative">
        {Icon && <Icon className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-faint" />}
        <input
          type={isPw ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          className={cx(
            "h-11 w-full rounded-[10px] border border-line bg-surface text-[14px] text-ink outline-none transition-all placeholder:text-faint focus:border-brand-400 focus:ring-2 focus:ring-brand-100",
            Icon ? "pl-10" : "pl-3.5",
            isPw ? "pr-10" : "pr-3.5",
          )}
        />
        {isPw && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-muted"
          >
            {show ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
          </button>
        )}
      </div>
      {hint && <div className="mt-1.5 text-[12.5px] text-muted">{hint}</div>}
    </label>
  );
}

function Segmented({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-1 rounded-[10px] border border-line bg-raised p-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cx(
            "flex-1 rounded-[7px] px-3 py-1.5 text-[13px] font-semibold transition-all",
            value === o ? "bg-brand-500 text-white shadow-[var(--shadow-card)]" : "text-ink-soft hover:text-ink",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------- layouts */

function AuthLayout({ children, wide, onGoHome }: { children: ReactNode; wide?: boolean; onGoHome?: () => void }) {
  return (
    <div className="grid min-h-full grid-cols-[1.05fr_1fr] bg-canvas max-lg:grid-cols-1" style={{ minHeight: "100dvh" }}>
      {/* Brand panel */}
      <div className="relative flex flex-col justify-between overflow-hidden bg-brand-800 p-12 text-white max-lg:hidden" style={{ minHeight: "100dvh" }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative">
          {onGoHome ? (
            <button onClick={onGoHome} className="rounded-[6px] transition-opacity hover:opacity-75" title="Back to home">
              <Logo size={52} invert />
            </button>
          ) : (
            <Logo size={52} invert />
          )}
        </div>

        <div className="relative max-w-md">
          <h2 className="text-[30px] font-bold leading-tight tracking-tight">
            Evidence over claims. Trust over guesswork.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-brand-100">
            One credible ecosystem connecting verified talent with the teams and institutions that
            value proven capability.
          </p>
          <div className="mt-8 space-y-3">
            {[
              "Verified Talent Passports, not self-reported profiles",
              "Explainable readiness — every score shows its evidence",
              "Human decisions, always in the loop",
            ].map((t) => (
              <div key={t} className="flex items-center gap-3 text-[14px] text-brand-50">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-white/12">
                  <Check className="size-3" />
                </span>
                {t}
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-[12.5px] text-brand-200">
          Trusted by hiring teams and institutions across the Kingdom · Nafath-ready
        </div>
      </div>

      {/* Form panel */}
      <div className="flex min-h-full items-center justify-center overflow-y-auto px-6 py-10">
        <div className={cx("w-full", wide ? "max-w-[520px]" : "max-w-[400px]")}>{children}</div>
      </div>
    </div>
  );
}

function RoleContext({ role, onChange }: { role: Portal; onChange: () => void }) {
  const r = ROLES[role];
  const Icon = r.icon;
  return (
    <button
      onClick={onChange}
      className="mb-6 flex w-full items-center gap-3 rounded-[11px] border border-line bg-raised px-3.5 py-2.5 text-left transition-colors hover:border-brand-200"
    >
      <div className="grid size-9 place-items-center rounded-[9px] bg-brand-50 text-brand-600">
        <Icon className="size-[18px]" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-medium text-faint">Signing in as</div>
        <div className="truncate text-[13.5px] font-semibold text-ink">{r.title}</div>
      </div>
      <span className="text-[12.5px] font-semibold text-brand-600">Change</span>
    </button>
  );
}

/* ---------------------------------------------------------- wizard progress */

function Steps({ steps, current }: { steps: string[]; current: number }) {
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

/* ================================================================= ROOT */

function useAuthNav() {
  const router = useRouter();
  return {
    goHome: () => router.push("/"),
    goRoleSelect: () => router.push("/auth"),
    goOrgSelect: () => router.push("/auth/organization"),
    goPortal: (role: Portal) => router.push(`/auth/${role}`),
    goPortalApp: (role: Portal) => {
      const path =
        role === "ops" ? "/portal/admin" : `/portal/${role}`;
      router.push(path);
    },
  };
}

export function sessionFor(role: Portal): Session {
  return { portal: role, ...DEFAULT_SESSION[role] };
}

export { useAuthNav };

/** Role picker — Candidate vs Organization */
export function AuthRoleSelection() {
  const { goHome, goPortal, goOrgSelect } = useAuthNav();
  return (
    <RoleSelection
      onCandidate={() => goPortal("candidate")}
      onOrganization={goOrgSelect}
      onGoHome={goHome}
    />
  );
}

/** Organization type picker — Employer vs Ops */
export function AuthOrgTypeSelection() {
  const { goHome, goRoleSelect, goPortal } = useAuthNav();
  return (
    <OrgTypeSelection
      onBack={goRoleSelect}
      onSelect={goPortal}
      onGoHome={goHome}
    />
  );
}

/* ============================================================ ROLE SELECTION */

function SelectCard({
  icon: Icon,
  title,
  subtitle,
  desc,
  onClick,
}: {
  icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-start rounded-[16px] border border-line bg-surface p-7 text-left shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[var(--shadow-raised)]"
    >
      <div className="grid size-12 place-items-center rounded-[12px] bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
        <Icon className="size-6" strokeWidth={1.75} />
      </div>
      <div className="mt-4 text-[18px] font-bold tracking-tight text-ink">{title}</div>
      <div className="text-[12.5px] font-semibold uppercase tracking-wide text-brand-500/80">{subtitle}</div>
      <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{desc}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-600">
        Continue
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}

function SelectionFrame({ children, onGoHome }: { children: ReactNode; onGoHome?: () => void }) {
  return (
    <div className="flex flex-col bg-canvas" style={{ minHeight: "100dvh" }}>
      <header className="flex items-center justify-between px-8 py-5 max-md:px-5">
        {onGoHome ? (
          <button onClick={onGoHome} className="rounded-[6px] transition-opacity hover:opacity-75" title="Back to home">
            <Logo size={52} />
          </button>
        ) : (
          <Logo size={52} />
        )}
        <div className="text-[13px] text-muted">
          Need help? <span className="cursor-pointer font-semibold text-brand-600">Support</span>
        </div>
      </header>
      <div className="flex flex-1 items-center justify-center px-6 pb-10">
        <div className="w-full max-w-[760px]">{children}</div>
      </div>
    </div>
  );
}

function RoleSelection({
  onCandidate,
  onOrganization,
  onGoHome,
}: {
  onCandidate: () => void;
  onOrganization: () => void;
  onGoHome?: () => void;
}) {
  return (
    <SelectionFrame onGoHome={onGoHome}>
      <div className="text-center">
        <h1 className="text-[32px] font-bold tracking-tight text-ink max-md:text-[26px]">
          How will you use HireFit?
        </h1>
        <p className="mt-1.5 text-[15px] text-muted">Choose the experience that fits your goal.</p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <SelectCard
          icon={User}
          title="Candidate"
          subtitle="For individuals"
          desc="Build your profile, verify your skills, and discover relevant opportunities."
          onClick={onCandidate}
        />
        <SelectCard
          icon={Building2}
          title="Organization"
          subtitle="For employers and institutions"
          desc="Hire verified talent, monitor learner readiness, or manage platform governance."
          onClick={onOrganization}
        />
      </div>
    </SelectionFrame>
  );
}

function OrgTypeSelection({ onBack, onSelect, onGoHome }: { onBack: () => void; onSelect: (r: Portal) => void; onGoHome?: () => void }) {
  return (
    <SelectionFrame onGoHome={onGoHome}>
      <button
        onClick={onBack}
        className="mx-auto mb-5 flex w-fit items-center gap-1.5 text-[13px] font-semibold text-muted hover:text-ink"
      >
        <ArrowLeft className="size-4" /> Back
      </button>
      <div className="text-center">
        <h1 className="text-[30px] font-bold tracking-tight text-ink max-md:text-[24px]">
          What type of organization are you representing?
        </h1>
        <p className="mt-1.5 text-[15px] text-muted">This tailors your workspace and onboarding.</p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <SelectCard
          icon={Building2}
          title="Employer / Hiring Team"
          subtitle="Recruitment"
          desc="Create Job DNA and hire evidence-verified talent."
          onClick={() => onSelect("employer")}
        />
        <SelectCard
          icon={ShieldCheck}
          title="Admin / University Operations"
          subtitle="Governance & institutions"
          desc="Manage platform governance, monitor cohort readiness, and oversee institution outcomes."
          onClick={() => onSelect("ops")}
        />
      </div>
    </SelectionFrame>
  );
}

/* ============================================================ LOGIN */

export function Login({
  role,
  onBack,
  onForgot,
  onSignup,
  onInvite,
  onSuccess,
  onGoHome,
}: {
  role: Portal;
  onBack: () => void;
  onForgot: () => void;
  onSignup: () => void;
  onInvite?: () => void;
  onSuccess: () => void;
  onGoHome?: () => void;
}) {
  const r = ROLES[role];
  return (
    <AuthLayout onGoHome={onGoHome}>
      <button onClick={onBack} className="mb-6 flex items-center gap-1.5 text-[13px] font-semibold text-muted hover:text-ink">
        <ArrowLeft className="size-4" /> Back to role selection
      </button>
      <div className="mb-5 lg:hidden">
        {onGoHome ? (
          <button onClick={onGoHome} className="rounded-[6px] transition-opacity hover:opacity-75" title="Back to home">
            <Logo size={52} />
          </button>
        ) : (
          <Logo size={52} />
        )}
      </div>
      <RoleContext role={role} onChange={onBack} />

      <h1 className="text-[26px] font-bold tracking-tight text-ink">Welcome back</h1>
      <p className="mt-1 text-[14px] text-muted">
        Sign in to your {r.title.split(" /")[0]} {role === "candidate" ? "account" : "workspace"}.
      </p>

      <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onSuccess(); }}>
        <Field label="Email" type="email" icon={Mail} placeholder="you@example.com" />
        <Field label="Password" type="password" icon={Lock} placeholder="••••••••" />
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-[13px] text-ink-soft">
            <input type="checkbox" className="size-4 accent-brand-500" /> Remember me
          </label>
          <button type="button" onClick={onForgot} className="text-[13px] font-semibold text-brand-600 hover:text-brand-700">
            Forgot password?
          </button>
        </div>
        <Button type="submit" className="w-full">Sign in <ArrowRight className="size-4" /></Button>
      </form>

      {role === "ops" ? (
        <div className="mt-6 rounded-[11px] border border-line bg-raised p-4">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-ink">
            <ShieldCheck className="size-4 text-brand-500" /> Restricted access
          </div>
          <p className="mt-1 text-[13px] text-muted">
            Governance access is invitation-only. Have an invitation?{" "}
            <button onClick={onInvite} className="font-semibold text-brand-600 hover:text-brand-700">
              Accept your invite
            </button>
            .
          </p>
        </div>
      ) : (
        <p className="mt-6 text-center text-[13.5px] text-muted">
          New to HireFit?{" "}
          <button onClick={onSignup} className="font-semibold text-brand-600 hover:text-brand-700">
            Create an account
          </button>
        </p>
      )}
    </AuthLayout>
  );
}

/* ============================================================ FORGOT / RESET */

export function Forgot({ onBack, onSent, onGoHome }: { role: Portal; onBack: () => void; onSent: () => void; onGoHome?: () => void }) {
  return (
    <AuthLayout onGoHome={onGoHome}>
      <button onClick={onBack} className="mb-6 flex items-center gap-1.5 text-[13px] font-semibold text-muted hover:text-ink">
        <ArrowLeft className="size-4" /> Back to sign in
      </button>
      <div className="grid size-11 place-items-center rounded-[12px] bg-brand-50 text-brand-600">
        <KeyRound className="size-5" />
      </div>
      <h1 className="mt-4 text-[26px] font-bold tracking-tight text-ink">Reset your password</h1>
      <p className="mt-1 text-[14px] text-muted">
        Enter the email linked to your account and we&rsquo;ll send a secure reset link.
      </p>
      <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onSent(); }}>
        <Field label="Email" type="email" icon={Mail} placeholder="you@example.com" />
        <Button type="submit" className="w-full">Send reset link <ArrowRight className="size-4" /></Button>
      </form>
    </AuthLayout>
  );
}

export function Reset({ onDone, onGoHome }: { onDone: () => void; onGoHome?: () => void }) {
  return (
    <AuthLayout onGoHome={onGoHome}>
      <div className="grid size-11 place-items-center rounded-[12px] bg-brand-50 text-brand-600">
        <Lock className="size-5" />
      </div>
      <h1 className="mt-4 text-[26px] font-bold tracking-tight text-ink">Choose a new password</h1>
      <p className="mt-1 text-[14px] text-muted">Your new password must differ from previous ones.</p>
      <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onDone(); }}>
        <Field label="New password" type="password" icon={Lock} hint="At least 8 characters, with a number and a symbol." />
        <Field label="Confirm password" type="password" icon={Lock} />
        <Button type="submit" className="w-full">Update password</Button>
      </form>
    </AuthLayout>
  );
}

/* ============================================================ INVITE ACCEPT */

export function InviteAccept({ onBack, onAccept, onGoHome }: { onBack: () => void; onAccept: () => void; onGoHome?: () => void }) {
  return (
    <AuthLayout onGoHome={onGoHome}>
      <button onClick={onBack} className="mb-6 flex items-center gap-1.5 text-[13px] font-semibold text-muted hover:text-ink">
        <ArrowLeft className="size-4" /> Back
      </button>
      <div className="grid size-11 place-items-center rounded-[12px] bg-brand-50 text-brand-600">
        <ShieldCheck className="size-5" />
      </div>
      <h1 className="mt-4 text-[26px] font-bold tracking-tight text-ink">Accept your invitation</h1>
      <div className="mt-4 rounded-[11px] border border-line bg-raised p-4 text-[13.5px]">
        <div className="text-muted">You&rsquo;ve been invited to</div>
        <div className="mt-0.5 font-semibold text-ink">HireFit Platform · Governance Console</div>
        <div className="mt-2 flex items-center gap-2 text-[12.5px] text-muted">
          <BadgeCheck className="size-4 text-[#2e7d5b]" /> Role: Compliance Reviewer · invited by Platform Admin
        </div>
      </div>
      <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onAccept(); }}>
        <Field label="Full name" placeholder="Your name" />
        <Field label="Create password" type="password" icon={Lock} />
        <div className="rounded-[10px] border border-line bg-canvas px-3.5 py-3 text-[12.5px] text-muted">
          Access is logged for governance and audit purposes. By continuing you agree to the platform
          operations policy.
        </div>
        <Button type="submit" className="w-full">Accept &amp; enter <ArrowRight className="size-4" /></Button>
      </form>
    </AuthLayout>
  );
}

/* ============================================================ SIGNUP WIZARDS */

const SIGNUP_STEPS: Record<Portal, string[]> = {
  candidate: ["Account", "Verify", "Consent", "Goal", "Done"],
  employer: ["Account", "Company", "Verify", "Workspace", "Done"],
  ops: ["Account", "Organization", "Verify", "Done"],
};

export function Signup({
  role,
  index,
  setIndex,
  onBackToRole,
  onLogin,
  onComplete,
  onGoHome,
}: {
  role: Portal;
  index: number;
  setIndex: (i: number) => void;
  onBackToRole: () => void;
  onLogin: () => void;
  onComplete: () => void;
  onGoHome?: () => void;
}) {
  const steps = SIGNUP_STEPS[role];
  const last = steps.length - 1;
  const next = () => setIndex(Math.min(index + 1, last));
  const back = () => (index === 0 ? onBackToRole() : setIndex(index - 1));

  const isDone = index === last;

  return (
    <AuthLayout wide={index > 0 && !isDone} onGoHome={onGoHome}>
      <button onClick={back} className="mb-6 flex items-center gap-1.5 text-[13px] font-semibold text-muted hover:text-ink">
        <ArrowLeft className="size-4" /> {index === 0 ? "Back to role selection" : "Back"}
      </button>
      <div className="mb-5 lg:hidden">
        {onGoHome ? (
          <button onClick={onGoHome} className="rounded-[6px] transition-opacity hover:opacity-75" title="Back to home">
            <Logo size={46} />
          </button>
        ) : (
          <Logo size={46} />
        )}
      </div>

      {!isDone && (
        <>
          <RoleContext role={role} onChange={onBackToRole} />
          <Steps steps={steps.slice(0, last)} current={index} />
        </>
      )}

      {role === "candidate" && <CandidateSignup index={index} next={next} onComplete={onComplete} onLogin={onLogin} />}
      {role === "employer" && <EmployerSignup index={index} next={next} onComplete={onComplete} onLogin={onLogin} />}
      {role === "ops" && <OpsSignup index={index} next={next} onComplete={onComplete} onLogin={onLogin} />}
    </AuthLayout>
  );
}

function StepHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-[24px] font-bold tracking-tight text-ink">{title}</h1>
      <p className="mt-1 text-[14px] text-muted">{sub}</p>
    </div>
  );
}

function LoginPrompt({ onLogin }: { onLogin: () => void }) {
  return (
    <p className="mt-6 text-center text-[13.5px] text-muted">
      Already have an account?{" "}
      <button onClick={onLogin} className="font-semibold text-brand-600 hover:text-brand-700">Sign in</button>
    </p>
  );
}

/* ---- verification (shared) ---- */
function VerifyStep({ next, channel }: { next: () => void; channel: string }) {
  return (
    <div>
      <StepHead title="Verify your account" sub={`We sent a 6-digit code to your ${channel}. Enter it below to continue.`} />
      <div className="flex justify-between gap-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <input
            key={i}
            maxLength={1}
            inputMode="numeric"
            className="h-14 w-full rounded-[11px] border border-line bg-surface text-center text-[20px] font-bold text-ink outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        ))}
      </div>
      <div className="mt-4 text-center text-[13px] text-muted">
        Didn&rsquo;t receive it? <span className="cursor-pointer font-semibold text-brand-600">Resend code</span>
      </div>
      <Button onClick={next} className="mt-6 w-full">Verify <ArrowRight className="size-4" /></Button>
    </div>
  );
}

function DoneStep({ role, onComplete }: { role: Portal; onComplete: () => void }) {
  const copy: Record<string, { t: string; s: string }> = {
    candidate: { t: "You&rsquo;re all set, Layla", s: "Your Talent DNA is ready to build. Add evidence to start proving your skills." },
    employer: { t: "Workspace ready", s: "Your workspace is set up. Create your first Job DNA to start finding verified talent." },
    ops: { t: "Operations workspace ready", s: "Your workspace is set up. You can now manage platform governance and monitor institution readiness." },
  };
  const c = copy[role];
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="grid size-16 place-items-center rounded-full bg-[#e7f2ec] text-[#2e7d5b]">
        <Check className="size-8" strokeWidth={2.5} />
      </div>
      <h1 className="mt-5 text-[26px] font-bold tracking-tight text-ink" dangerouslySetInnerHTML={{ __html: c.t }} />
      <p className="mt-2 max-w-sm text-[14.5px] text-muted">{c.s}</p>
      <Button onClick={onComplete} className="mt-7 min-w-[220px]">Enter HireFit <ArrowRight className="size-4" /></Button>
    </div>
  );
}

/* ---- candidate ---- */
function CandidateSignup({ index, next, onComplete, onLogin }: { index: number; next: () => void; onComplete: () => void; onLogin: () => void }) {
  const [contact, setContact] = useState("Email");
  switch (index) {
    case 0:
      return (
        <div>
          <StepHead title="Create your account" sub="Start building verified evidence of your capabilities." />
          <div className="space-y-4">
            <Field label="Full name" placeholder="Layla Al-Otaibi" />
            <div>
              <div className="mb-1.5 text-[13px] font-semibold text-ink">Sign up with</div>
              <Segmented options={["Email", "Phone"]} value={contact} onChange={setContact} />
            </div>
            {contact === "Email" ? (
              <Field label="Email" type="email" icon={Mail} placeholder="you@example.com" />
            ) : (
              <Field label="Phone number" placeholder="+966 5X XXX XXXX" />
            )}
            <Field label="Password" type="password" icon={Lock} hint="At least 8 characters, with a number and a symbol." />
            <Button onClick={next} className="w-full">Continue <ArrowRight className="size-4" /></Button>
          </div>
          <LoginPrompt onLogin={onLogin} />
        </div>
      );
    case 1:
      return <VerifyStep next={next} channel={contact === "Email" ? "email" : "phone"} />;
    case 2:
      return (
        <div>
          <StepHead title="Your privacy, your choice" sub="Choose how HireFit may use your information. You can change these anytime in your Consent Centre." />
          <div className="space-y-3">
            {[
              { t: "Profile processing", d: "Let HireFit process your profile to build your Talent DNA and readiness.", req: true, on: true },
              { t: "Assessment evidence", d: "Store assessment, interview, and simulation results as verifiable evidence.", req: true, on: true },
              { t: "Employer visibility", d: "Allow verified employers to discover your passport in talent search.", on: true },
              { t: "Marketing updates", d: "Receive occasional product news and opportunity highlights.", on: false },
            ].map((c) => (
              <ConsentRow key={c.t} {...c} />
            ))}
          </div>
          <Button onClick={next} className="mt-6 w-full">Save preferences <ArrowRight className="size-4" /></Button>
        </div>
      );
    case 3:
      return (
        <div>
          <StepHead title="What are you working toward?" sub="We&rsquo;ll tailor your readiness, gaps, and job matches to this goal." />
          <div className="space-y-4">
            <div>
              <div className="mb-1.5 text-[13px] font-semibold text-ink">Target role</div>
              <div className="grid grid-cols-2 gap-2">
                {["QA Automation Engineer", "SDET", "Software Engineer", "Data Analyst"].map((rle, i) => (
                  <button
                    key={rle}
                    className={cx(
                      "rounded-[10px] border px-3 py-2.5 text-left text-[13px] font-semibold transition-all",
                      i === 0 ? "border-brand-500 bg-brand-50 text-brand-700" : "border-line bg-surface text-ink-soft hover:border-brand-200",
                    )}
                  >
                    {rle}
                  </button>
                ))}
              </div>
            </div>
            <Field label="Experience level" placeholder="Mid-level (3–5 years)" />
            <Button onClick={next} className="w-full">Finish setup <ArrowRight className="size-4" /></Button>
          </div>
        </div>
      );
    default:
      return <DoneStep role="candidate" onComplete={onComplete} />;
  }
}

function ConsentRow({ t, d, req, on }: { t: string; d: string; req?: boolean; on?: boolean }) {
  const [checked, setChecked] = useState(!!on);
  return (
    <div className="flex items-start gap-3 rounded-[11px] border border-line bg-surface p-3.5">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-semibold text-ink">{t}</span>
          {req && <span className="rounded-full bg-[#f0f2f6] px-1.5 py-0.5 text-[10.5px] font-semibold text-ink-soft">Required</span>}
        </div>
        <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted">{d}</p>
      </div>
      <button
        disabled={req}
        onClick={() => setChecked((c) => !c)}
        className={cx(
          "relative mt-0.5 h-6 w-10 shrink-0 rounded-full transition-colors",
          checked ? "bg-brand-500" : "bg-line",
          req && "opacity-70",
        )}
      >
        <span className={cx("absolute top-0.5 size-5 rounded-full bg-white shadow transition-all", checked ? "left-[18px]" : "left-0.5")} />
      </button>
    </div>
  );
}

/* ---- employer ---- */
function EmployerSignup({ index, next, onComplete, onLogin }: { index: number; next: () => void; onComplete: () => void; onLogin: () => void }) {
  const [ws, setWs] = useState<"create" | "join">("create");
  switch (index) {
    case 0:
      return (
        <div>
          <StepHead title="Create your account" sub="Set up your hiring team on HireFit." />
          <div className="space-y-4">
            <Field label="Full name" placeholder="Nora Saleh" />
            <Field label="Work email" type="email" icon={Mail} placeholder="you@company.com" hint="Use your company email to help us verify your workspace." />
            <Field label="Password" type="password" icon={Lock} />
            <Button onClick={next} className="w-full">Continue <ArrowRight className="size-4" /></Button>
          </div>
          <LoginPrompt onLogin={onLogin} />
        </div>
      );
    case 1:
      return (
        <div>
          <StepHead title="About your company" sub="This helps tailor your workspace and analytics." />
          <div className="space-y-4">
            <Field label="Company name" placeholder="Jahez" />
            <div>
              <div className="mb-1.5 text-[13px] font-semibold text-ink">Company size</div>
              <Segmented options={["1–50", "51–200", "201–1k", "1k+"]} value="51–200" onChange={() => {}} />
            </div>
            <Field label="Your role in the company" placeholder="Talent Acquisition Lead" />
            <Button onClick={next} className="w-full">Continue <ArrowRight className="size-4" /></Button>
          </div>
        </div>
      );
    case 2:
      return <VerifyStep next={next} channel="work email" />;
    case 3:
      return (
        <div>
          <StepHead title="Set up your workspace" sub="Create a new company workspace or join one that already exists on HireFit." />
          <div className="space-y-3">
            <WorkspaceOption active={ws === "create"} onClick={() => setWs("create")} title="Create a new workspace" desc="Start fresh for your company and invite your team." icon={Building2} />
            <WorkspaceOption active={ws === "join"} onClick={() => setWs("join")} title="Join an existing workspace" desc="We detected a workspace matching your work email domain." icon={Users} badge="1 match" />
          </div>
          {ws === "create" ? (
            <div className="mt-4"><Field label="Workspace name" placeholder="Your company name" /></div>
          ) : (
            <div className="mt-4 rounded-[10px] border border-line bg-raised px-3.5 py-3 text-[13px] text-muted">
              Your request to join the detected workspace will be sent to the workspace admin for approval.
            </div>
          )}
          <Button onClick={next} className="mt-6 w-full">Continue <ArrowRight className="size-4" /></Button>
        </div>
      );
    default:
      return <DoneStep role="employer" onComplete={onComplete} />;
  }
}

function OpsSignup({ index, next, onComplete, onLogin }: { index: number; next: () => void; onComplete: () => void; onLogin: () => void }) {
  switch (index) {
    case 0:
      return (
        <div>
          <StepHead title="Create your account" sub="Set up your operations workspace on HireFit." />
          <div className="space-y-4">
            <Field label="Full name" placeholder="Governance or institution representative" />
            <Field label="Work email" type="email" icon={Mail} placeholder="you@org.edu.sa" hint="Use your official work email to verify your workspace." />
            <Field label="Password" type="password" icon={Lock} />
            <Button onClick={next} className="w-full">Continue <ArrowRight className="size-4" /></Button>
          </div>
          <LoginPrompt onLogin={onLogin} />
        </div>
      );
    case 1:
      return (
        <div>
          <StepHead title="About your organization" sub="This tailors your dashboard and access level." />
          <div className="space-y-4">
            <Field label="Organization name" placeholder="Your university, ministry, or platform body" />
            <div>
              <div className="mb-1.5 text-[13px] font-semibold text-ink">Organization type</div>
              <Segmented options={["University / Training Provider", "Regulatory / Governance Body", "Platform Operations"]} value="University / Training Provider" onChange={() => {}} />
            </div>
            <Field label="Your job title" placeholder="Programme Lead, Compliance Officer, etc." />
            <Button onClick={next} className="w-full">Continue <ArrowRight className="size-4" /></Button>
          </div>
        </div>
      );
    case 2:
      return <VerifyStep next={next} channel="work email" />;
    default:
      return <DoneStep role="ops" onComplete={onComplete} />;
  }
}

function WorkspaceOption({ active, onClick, title, desc, icon: Icon, badge }: { active: boolean; onClick: () => void; title: string; desc: string; icon: LucideIcon; badge?: string }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "flex w-full items-center gap-3.5 rounded-[12px] border p-4 text-left transition-all",
        active ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500" : "border-line bg-surface hover:border-brand-200",
      )}
    >
      <div className={cx("grid size-10 place-items-center rounded-[10px]", active ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-600")}>
        <Icon className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-bold text-ink">{title}</span>
          {badge && <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[11px] font-semibold text-brand-700">{badge}</span>}
        </div>
        <p className="mt-0.5 text-[12.5px] text-muted">{desc}</p>
      </div>
      <span className={cx("grid size-5 shrink-0 place-items-center rounded-full border", active ? "border-brand-500 bg-brand-500 text-white" : "border-line text-transparent")}>
        <Check className="size-3" />
      </span>
    </button>
  );
}
