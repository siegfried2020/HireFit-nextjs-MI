import { AuthLayout } from "../../Authlayouts/AuthLayouts";
import {
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  KeyRound,
} from "lucide-react";
import { Button} from "../../../../../components/primitives";
import { type Portal} from "../../../../../components/rankShellPages";
import { Field } from "../Field&Segmented";


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