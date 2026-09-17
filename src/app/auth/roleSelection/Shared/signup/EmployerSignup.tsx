"use client"

import { Button, cx } from "@/components/primitives";
import { Field, Segmented } from "../Field&Segmented";
import { LoginPrompt, StepHead } from "../Roles&Sessions";

import { useState } from "react";
import {
  Users,
  Building2,
  ArrowRight,
  Mail,
  Lock,
  Check,
  type LucideIcon,
} from "lucide-react";
import { DoneStep, VerifyStep } from "../verification/verification";


export function EmployerSignup({ index, next, onComplete, onLogin }: { index: number; next: () => void; onComplete: () => void; onLogin: () => void }) {
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
  