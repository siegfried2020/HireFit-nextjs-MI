import {
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "../../../../../components/primitives";
import { type Portal } from "../../../../../components/rankShellPages";
import { StepHead } from "../Roles&Sessions";

export function VerifyStep({ next, channel }: { next: () => void; channel: string }) {
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
  
export function DoneStep({ role, onComplete }: { role: Portal; onComplete: () => void }) {
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