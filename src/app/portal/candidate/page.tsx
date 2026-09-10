"use client";

import { useState } from "react";
import { Shell, PORTALS } from "@/components/rankShellPages";

import { usePortalGate } from "../usePortalGate";
import { CandidateDashboard } from "@/rank-screen/candidateScreen/Dashboard";
import { Passport } from "@/rank-screen/candidateScreen/Passport";
import { TalentDNA } from "@/rank-screen/candidateScreen/TalentDNA";
import { RoleReadiness } from "@/rank-screen/candidateScreen/RoleReadiness";
import { JobMatches } from "@/rank-screen/candidateScreen/JobMatches";

const LABELS: Record<string, string> = {
  dashboard: "Home",
  "talent-dna": "Talent DNA",
  readiness: "Role Readiness",
  jobs: "Job Matches",
  passport: "Talent Passport",
};

export default function CandidatePortalPage() {
  const { session, onSignOut, onGoHome } = usePortalGate("candidate");
  const [route, setRoute] = useState(PORTALS.candidate.home);
  const go = (r: string) => setRoute(r);

  if (!session) return null;

  const render = () => {
    switch (route) {
      case "dashboard":
        return <CandidateDashboard go={go} />;
      case "talent-dna":
        return <TalentDNA />;
      case "readiness":
        return <RoleReadiness />;
      case "jobs":
        return <JobMatches />;
      case "passport":
        return <Passport />;
      default:
        return null;
    }
  };

  return (
    <Shell
      session={session}
      route={route}
      onRoute={setRoute}
      onSignOut={onSignOut}
      onGoHome={onGoHome}
      breadcrumbs={<>{[PORTALS.candidate.label, LABELS[route] ?? route].join(" / ")}</>}
    >
      {render()}
    </Shell>
  );
}
