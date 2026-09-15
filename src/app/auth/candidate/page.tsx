"use client";

import { useState } from "react";
import {
  sessionFor,
  useAuthNav,
} from "@/app/auth/roleSelection/RoleSelection";
import { useSession } from "@/context/SessionContext";
import { Login } from "../roleSelection/Shared/login/page";
import { Forgot, Reset } from "../roleSelection/Shared/ForgotResetPass/page";
import { Signup } from "../roleSelection/Shared/signup/page";

type Step =
  | { k: "login" }
  | { k: "signup"; i: number }
  | { k: "forgot" }
  | { k: "reset" };

export default function CandidateAuthPage() {
  const { setSession } = useSession();
  const { goHome, goRoleSelect, goPortalApp } = useAuthNav();
  const [step, setStep] = useState<Step>({ k: "login" });

  const enter = () => {
    setSession(sessionFor("candidate"));
    goPortalApp("candidate");
  };

  switch (step.k) {
    case "login":
      return (
        <Login
          role="candidate"
          onBack={goRoleSelect}
          onForgot={() => setStep({ k: "forgot" })}
          onSignup={() => setStep({ k: "signup", i: 0 })}
          onSuccess={enter}
          onGoHome={goHome}
        />
      );

    case "forgot":
      return (
        <Forgot
          role="candidate"
          onBack={() => setStep({ k: "login" })}
          onSent={() => setStep({ k: "reset" })}
          onGoHome={goHome}
        />
      );

    case "reset":
      return <Reset onDone={() => setStep({ k: "login" })} onGoHome={goHome} />;

    case "signup":
      return (
        <Signup
          role="candidate"
          index={step.i}
          setIndex={(i) => setStep({ k: "signup", i })}
          onBackToRole={goRoleSelect}
          onLogin={() => setStep({ k: "login" })}
          onComplete={enter}
          onGoHome={goHome}
        />
      );

    default:
      return null;
  }
}
