"use client";

import { useRouter } from "next/navigation";
import { LandingPage } from "@/rank-screen/landing";

export default function Home() {
  const router = useRouter();
  return <LandingPage onGetStarted={() => router.push("/auth")} />;
}
