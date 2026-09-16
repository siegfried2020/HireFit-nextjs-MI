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
import { Button, cx } from "../../../components/primitives";
import { Logo, type Portal, type Session } from "../../../components/rankShellPages";
import { DEFAULT_SESSION } from "./Shared/Roles&Sessions";

/* --------------------------------------------------------------- role meta */



/* ---------------------------------------------------------- form primitives */


/* --------------------------------------------------------------- layouts */


/* ---------------------------------------------------------- wizard progress */


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


/* ============================================================ FORGOT / RESET */



/* ============================================================ INVITE ACCEPT */



/* ============================================================ SIGNUP WIZARDS */



/* ---- verification (shared) ---- */


/* ---- candidate ---- */


/* ---- employer ---- */
