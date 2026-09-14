"use client";

import { useState } from "react";
import {
  Login,
  Forgot,
  Reset,
  Signup,
  sessionFor,
  useAuthNav,
} from "@/app/auth/RoleSelection";
import { useSession } from "@/context/SessionContext";

type Step =
  | { k: "login" }
  | { k: "signup"; i: number }
  | { k: "forgot" }
  | { k: "reset" };

export default function EmployerAuthPage() {
  const { setSession } = useSession();
  const { goHome, goOrgSelect, goPortalApp } = useAuthNav();
  const [step, setStep] = useState<Step>({ k: "login" });

  const enter = () => {
    setSession(sessionFor("employer"));
    goPortalApp("employer");
  };

  switch (step.k) {
    case "login":
      return (
        <Login
          role="employer"
          onBack={goOrgSelect}
          onForgot={() => setStep({ k: "forgot" })}
          onSignup={() => setStep({ k: "signup", i: 0 })}
          onSuccess={enter}
          onGoHome={goHome}
        />
      );

    case "forgot":
      return (
        <Forgot
          role="employer"
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
          role="employer"
          index={step.i}
          setIndex={(i) => setStep({ k: "signup", i })}
          onBackToRole={goOrgSelect}
          onLogin={() => setStep({ k: "login" })}
          onComplete={enter}
          onGoHome={goHome}
        />
      );

    default:
      return null;
  }
}
