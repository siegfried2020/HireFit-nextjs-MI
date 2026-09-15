import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
} from "lucide-react";
import { Button, cx } from "../../../../../components/primitives";
import { Logo, type Portal, type Session } from "../../../../../components/rankShellPages";
import { AuthLayout, RoleContext } from "../../Authlayouts/AuthLayouts";
import { ROLES } from "../Roles&Sessions";
import { Field } from "../Field&Segmented";

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