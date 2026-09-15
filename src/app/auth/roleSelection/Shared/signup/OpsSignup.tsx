
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
import { Button, cx } from "../../../../../components/primitives";
import { LoginPrompt, StepHead } from "../Roles&Sessions";
import { Field, Segmented } from "../Field&Segmented";
import { DoneStep, VerifyStep } from "../verification/page";
export function OpsSignup({ index, next, onComplete, onLogin }: { index: number; next: () => void; onComplete: () => void; onLogin: () => void }) {
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