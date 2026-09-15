
import { useState } from "react";
import {
  ArrowRight,
  Mail,
  Lock,
} from "lucide-react";
import { Button, cx } from "../../../../../components/primitives";
import { LoginPrompt, StepHead } from "../Roles&Sessions";
import { Field, Segmented } from "../Field&Segmented";
import { DoneStep, VerifyStep } from "../verification/page";

export function CandidateSignup({ index, next, onComplete, onLogin }: { index: number; next: () => void; onComplete: () => void; onLogin: () => void }) {
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