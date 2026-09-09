"use client";

import { useState } from "react";
import { LandingPage } from "@/screens/landing";
import { Shell, PORTALS, type Session } from "@/components/Shell";
import { Auth } from "@/components/Auth";
import {
  CandidateDashboard,
  TalentDNA,
  RoleReadiness,
  JobMatches,
  Passport,
} from "@/screens/candidate";
import {
  EmployerDashboard,
  JobDNA,
  TalentSearch,
  CandidateDetail,
  Pipeline,
} from "@/screens/employer";
import { EmployerProvider, useEmployer } from "@/screens/employerStore";
import {
  OpsOverview,
  CohortInsight,
  Taxonomy,
  ScoringPolicy,
  Integrity,
  AppealsReviews,
  OpsConfig,
} from "@/screens/admin";

const LABELS: Record<string, string> = {
  dashboard: "Home",
  overview: "Overview",
  "talent-dna": "Talent DNA",
  readiness: "Role Readiness",
  jobs: "Job Matches",
  passport: "Talent Passport",
  "job-dna": "Job DNA",
  search: "Talent Search",
  candidate: "Candidate Profile",
  pipeline: "Pipeline",
  cohort: "Cohort & Institution",
  taxonomy: "Skill Taxonomy",
  scoring: "Scoring Policies",
  integrity: "Integrity",
  appeals: "Appeals / Reviews",
  config: "Configuration",
};

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [showLanding, setShowLanding] = useState(true);

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  if (!session) {
    return (
      <Auth
        onComplete={(s) => {
          setSession(s);
        }}
        onGoHome={() => setShowLanding(true)}
      />
    );
  }

  const content = (
    <Authed session={session} onSignOut={() => setSession(null)} onGoHome={() => setShowLanding(true)} />
  );

  if (session.portal === "employer") {
    return (
      <EmployerProvider workspace={session.workspace} actor={session.account.split(" ")[0]}>
        {content}
      </EmployerProvider>
    );
  }
  return content;
}

function Authed({ session, onSignOut, onGoHome }: { session: Session; onSignOut: () => void; onGoHome: () => void }) {
  const [route, setRoute] = useState<string>(PORTALS[session.portal].home);
  const go = (r: string) => setRoute(r);

  const render = () => {
    const key = `${session.portal}:${route}`;
    switch (key) {
      case "candidate:dashboard":
        return <CandidateDashboard go={go} />;
      case "candidate:talent-dna":
        return <TalentDNA />;
      case "candidate:readiness":
        return <RoleReadiness />;
      case "candidate:jobs":
        return <JobMatches />;
      case "candidate:passport":
        return <Passport />;

      case "employer:dashboard":
        return <EmployerDashboard go={go} />;
      case "employer:job-dna":
        return <JobDNA go={go} />;
      case "employer:search":
        return <TalentSearch go={go} />;
      case "employer:candidate":
        return <CandidateDetail go={go} />;
      case "employer:pipeline":
        return <Pipeline go={go} />;

      case "ops:overview":
        return <OpsOverview />;
      case "ops:cohort":
        return <CohortInsight />;
      case "ops:taxonomy":
        return <Taxonomy />;
      case "ops:scoring":
        return <ScoringPolicy />;
      case "ops:integrity":
        return <Integrity />;
      case "ops:appeals":
        return <AppealsReviews />;
      case "ops:config":
        return <OpsConfig />;

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
      breadcrumbs={<Breadcrumbs portal={session.portal} route={route} />}
    >
      {render()}
    </Shell>
  );
}

function Breadcrumbs({ portal, route }: { portal: string; route: string }) {
  const base = PORTALS[portal as keyof typeof PORTALS].label;
  if (portal === "employer" && route === "candidate") {
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
