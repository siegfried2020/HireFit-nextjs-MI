"use client";

import { useState } from "react";
import { Shell, PORTALS } from "@/components/rankShellPages";
// import {
//   OpsConfig,
// } from "@/rank-screen/adminScreen/admin";
import { usePortalGate } from "../usePortalGate";

import { OpsOverview } from "@/rank-screen/adminScreen/OpsOverview";
import { Taxonomy } from "@/rank-screen/adminScreen/Taxonomy";
import { ScoringPolicy } from "@/rank-screen/adminScreen/ScoringPolicy";
import { CohortInsight } from "@/rank-screen/adminScreen/CohortInsight";
import { Integrity } from "@/rank-screen/adminScreen/Integrity";
import { AppealsReviews } from "@/rank-screen/adminScreen/AppealsReviews";
import { OpsConfig } from "@/rank-screen/adminScreen/OpsConfig";

const LABELS: Record<string, string> = {
  overview: "Overview",
  cohort: "Cohort & Institution",
  taxonomy: "Skill Taxonomy",
  scoring: "Scoring Policies",
  integrity: "Integrity",
  appeals: "Appeals / Reviews",
  config: "Configuration",
};

export default function AdminPortalPage() {
  const { session, onSignOut, onGoHome } = usePortalGate("ops");
  const [route, setRoute] = useState(PORTALS.ops.home);

  if (!session) return null;

  const render = () => {
    switch (route) {
      case "overview":
        return <OpsOverview />;
      case "cohort":
        return <CohortInsight />;
      case "taxonomy":
        return <Taxonomy />;
      case "scoring":
        return <ScoringPolicy />;
      case "integrity":
        return <Integrity />;
      case "appeals":
        return <AppealsReviews />;
      case "config":
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
      breadcrumbs={<>{[PORTALS.ops.label, LABELS[route] ?? route].join(" / ")}</>}
    >
      {render()}
    </Shell>
  );
}
