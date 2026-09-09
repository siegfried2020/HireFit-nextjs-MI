import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  ArrowRight, ChevronDown, Menu, X, CheckCircle2,
  FileText, Mic, ClipboardCheck, Layers, Award,
  Shield, Eye, Users, TrendingUp, Zap, Building2,
  GraduationCap,
} from "lucide-react";
import { Logo } from "../components/Shell";
import Navbar from "@/navbar/navbar";
import { HeroSection } from "@/landingPageSections/Hero";
import { TrustStrip } from "@/landingPageSections/trustStrip";
import { CTA } from "@/landingPageSections/CTA";
import { ProblemSection } from "@/landingPageSections/ProblemBar";
import { ProcessSection } from "@/landingPageSections/HowItWorks";
import { TalentDNASection } from "@/landingPageSections/TalentDNA";
import { LandingFooter } from "@/landingPageSections/Footer";
import { PassportSection } from "@/landingPageSections/PassPort";
import { JobDNASection } from "@/landingPageSections/JobDNA";
import { MatchingSection } from "@/landingPageSections/Matching&Readiness";
import { EvidenceSection } from "@/landingPageSections/Evidence";
import { JourneysSection } from "@/landingPageSections/Journeys";
import { TrustSection } from "@/landingPageSections/Trust";









/* ─── main export ─── */
export function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans">
      <Navbar onGetStarted={onGetStarted} scrolled={scrolled} />
      <HeroSection onGetStarted={onGetStarted} />
      <TrustStrip />
      <ProblemSection />
      <ProcessSection />
      <TalentDNASection />
      <JobDNASection />
      <MatchingSection />
      <EvidenceSection />
      <JourneysSection />
      <TrustSection />
      <PassportSection />
      <CTA onGetStarted={onGetStarted} />
      <LandingFooter />
    </div>
  );
}
