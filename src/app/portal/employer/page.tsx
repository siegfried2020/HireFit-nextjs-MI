"use client";

import { useState } from "react";
import { Shell, PORTALS } from "@/components/rankShellPages";
import { EmployerProvider, useEmployer } from "@/rank-screen/employerScreen/employerStore";
import { usePortalGate } from "../usePortalGate";
import { EmployerDashboard } from "@/rank-screen/employerScreen/EmployerDashboard";
import { JobDNA } from "@/rank-screen/employerScreen/JobDNA/page";
import { Pipeline } from "@/rank-screen/employerScreen/Pipeline/page";
import { TalentSearch } from "@/rank-screen/employerScreen/TalentSearch/page";
import { CandidateDetail } from "@/rank-screen/employerScreen/candidateDetail/page";

const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  "job-dna": "Job DNA",
  search: "Talent Search",
  candidate: "Candidate Profile",
  pipeline: "Pipeline",
};

export default function EmployerPortalPage() {
  const { session, onSignOut, onGoHome } = usePortalGate("employer");

  if (!session) return null;

  return (
    <EmployerProvider workspace={session.workspace} actor={session.account.split(" ")[0]}>
      <EmployerPortal
        session={session}
        onSignOut={onSignOut}
        onGoHome={onGoHome}
      />
    </EmployerProvider>
  );
}

function EmployerPortal({
  session,
  onSignOut,
  onGoHome,
}: {
  session: NonNullable<ReturnType<typeof usePortalGate>["session"]>;
  onSignOut: () => void;
  onGoHome: () => void;
}) {
  const [route, setRoute] = useState(PORTALS.employer.home);
  const go = (r: string) => setRoute(r);

  const render = () => {
    switch (route) {
      case "dashboard":
        return <EmployerDashboard go={go} />;
      case "job-dna":
        return <JobDNA go={go} />;
      case "search":
        return <TalentSearch go={go} />;
      case "candidate":
        return <CandidateDetail go={go} />;
      case "pipeline":
        return <Pipeline go={go} />;
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
      breadcrumbs={<EmployerBreadcrumbs route={route} />}
    >
      {render()}
    </Shell>
  );
}

function EmployerBreadcrumbs({ route }: { route: string }) {
  const base = PORTALS.employer.label;
  if (route === "candidate") {
    return <EmployerCandidateCrumbs base={base} />;
  }
  return <>{[base, LABELS[route] ?? route].join(" / ")}</>;
}

function EmployerCandidateCrumbs({ base }: { base: string }) {
  const emp = useEmployer();
  const origin = emp.candidateOrigin === "pipeline" ? "Pipeline" : "Talent Search";
  const name = emp.selectedCandidate?.name ?? "Candidate";
  return <>{[base, origin, name].join(" / ")}</>;
}
