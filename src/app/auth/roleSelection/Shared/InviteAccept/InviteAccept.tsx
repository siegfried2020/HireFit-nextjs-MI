"use client"
import { ArrowLeft, ArrowRight, BadgeCheck, Lock, ShieldCheck } from "lucide-react";
import { AuthLayout } from "../../Authlayouts/AuthLayouts";
import { Field } from "../Field&Segmented";
import { Button } from "@/components/primitives";

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