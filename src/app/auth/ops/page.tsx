"use client";

import { useState } from "react";
import {
  Login,
  Forgot,
  Reset,
  InviteAccept,
  Signup,
  sessionFor,
  useAuthNav,
} from "@/app/auth/RoleSelection";
import { useSession } from "@/context/SessionContext";

type Step =
  | { k: "login" }
  | { k: "signup"; i: number }
  | { k: "forgot" }
  | { k: "reset" }
  | { k: "invite" };

export default function OpsAuthPage() {
  const { setSession } = useSession();
  const { goHome, goOrgSelect, goPortalApp } = useAuthNav();
  const [step, setStep] = useState<Step>({ k: "login" });

  const enter = () => {
    setSession(sessionFor("ops"));
    goPortalApp("ops");
  };

  switch (step.k) {
    case "login":
      return (
        <Login
          role="ops"
          onBack={goOrgSelect}
          onForgot={() => setStep({ k: "forgot" })}
          onSignup={() => setStep({ k: "signup", i: 0 })}
          onInvite={() => setStep({ k: "invite" })}
          onSuccess={enter}
          onGoHome={goHome}
        />
      );

    case "forgot":
      return (
        <Forgot
          role="ops"
          onBack={() => setStep({ k: "login" })}
          onSent={() => setStep({ k: "reset" })}
          onGoHome={goHome}
        />
      );

    case "reset":
      return <Reset onDone={() => setStep({ k: "login" })} onGoHome={goHome} />;

    case "invite":
      return (
        <InviteAccept
          onBack={() => setStep({ k: "login" })}
          onAccept={enter}
          onGoHome={goHome}
        />
      );

    case "signup":
      return (
        <Signup
          role="ops"
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
