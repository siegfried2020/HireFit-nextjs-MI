"use client"
import { ArrowLeft } from "lucide-react";
import { type Portal } from "../../../../../components/rankShellPages";
import { AuthLayout, RoleContext } from "../../Authlayouts/AuthLayouts";
import { Steps } from "../Roles&Sessions";
import { CandidateSignup } from "./CandidateSignup";
import { EmployerSignup } from "./EmployerSignup";
import { OpsSignup } from "./OpsSignup";


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