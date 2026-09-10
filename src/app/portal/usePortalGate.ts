"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Portal, Session } from "@/components/rankShellPages";
import { useSession } from "@/context/SessionContext";

/** Ensures a session exists for the expected portal; redirects otherwise. */
export function usePortalGate(expected: Portal) {
  const { session, setSession } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace("/auth");
      return;
    }
    if (session.portal !== expected) {
      const dest =
        session.portal === "ops"
          ? "/portal/admin"
          : `/portal/${session.portal}`;
      router.replace(dest);
    }
  }, [session, expected, router]);

  const onSignOut = () => {
    setSession(null);
    router.push("/auth");
  };

  const onGoHome = () => {
    setSession(null);
    router.push("/");
  };

  const ready = !!session && session.portal === expected;

  return {
    session: ready ? (session as Session) : null,
    onSignOut,
    onGoHome,
  };
}
