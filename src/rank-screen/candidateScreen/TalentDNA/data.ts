import type {
  Skill,
  ProfileIdentity,
  TargetRole,
  ExperienceEntry,
  EducationEntry,
  ProjectEntry,
} from "./types";

export const SKILLS_FULL: Skill[] = [
  {
    name: "API Testing", family: "Test Automation",
    claimed: "Advanced", evidenced: "Advanced", conf: "High", count: 4, verified: "12 Aug 2026", state: "verified",
    evidence: [
      { type: "Assessment",       label: "REST API Testing — 94%",      date: "12 Aug 2026", state: "verified" },
      { type: "Work Simulation",  label: "Contract testing brief",       date: "28 Jul 2026", state: "verified" },
      { type: "Interview",        label: "Verified technical interview", date: "20 Jul 2026", state: "verified" },
      { type: "Employer Outcome", label: "Jahez — 90-day review",        date: "10 Jun 2026", state: "verified" },
    ],
  },
  {
    name: "Playwright / E2E", family: "Test Automation",
    claimed: "Advanced", evidenced: "Advanced", conf: "High", count: 3, verified: "05 Aug 2026", state: "verified",
    evidence: [
      { type: "Assessment", label: "Playwright fundamentals — 91%", date: "05 Aug 2026", state: "verified" },
      { type: "Portfolio",  label: "E2E suite — GitHub",             date: "01 Aug 2026", state: "partial" },
      { type: "Interview",  label: "Live coding round",              date: "22 Jul 2026", state: "verified" },
    ],
  },
  {
    name: "Performance Testing", family: "Test Automation",
    claimed: "Intermediate", evidenced: "Basic", conf: "Low", count: 1, verified: "—", state: "partial",
    evidence: [
      { type: "Candidate Claim", label: "Self-reported k6 usage", date: "—", state: "partial" },
    ],
  },
  {
    name: "SQL", family: "Data & Queries",
    claimed: "Advanced", evidenced: "Intermediate", conf: "Medium", count: 2, verified: "18 Jul 2026", state: "partial",
    evidence: [
      { type: "Assessment", label: "SQL joins & windows — 82%", date: "18 Jul 2026", state: "verified" },
      { type: "Credential", label: "Data course certificate",    date: "10 Jan 2025", state: "expired" },
    ],
  },
  {
    name: "CI/CD Pipelines", family: "Delivery & Ops",
    claimed: "Intermediate", evidenced: "Intermediate", conf: "Medium", count: 2, verified: "02 Aug 2026", state: "verified",
    evidence: [
      { type: "Work Simulation", label: "GitHub Actions pipeline", date: "02 Aug 2026", state: "verified" },
      { type: "Portfolio",       label: "Deployment config",        date: "30 Jul 2026", state: "partial" },
    ],
  },
  {
    name: "Test Strategy", family: "Delivery & Ops",
    claimed: "Intermediate", evidenced: "Intermediate", conf: "Medium", count: 1, verified: "20 Jul 2026", state: "verified",
    evidence: [
      { type: "Interview", label: "Structured competency interview", date: "20 Jul 2026", state: "verified" },
    ],
  },
];

export const SKILLS_NEW: Skill[] = [
  {
    name: "API Testing", family: "Test Automation",
    claimed: "Advanced", evidenced: "None", conf: "Low", count: 0, verified: "—", state: "claimed",
    evidence: [],
  },
  {
    name: "Playwright / E2E", family: "Test Automation",
    claimed: "Intermediate", evidenced: "None", conf: "Low", count: 0, verified: "—", state: "claimed",
    evidence: [],
  },
  {
    name: "Performance Testing", family: "Test Automation",
    claimed: "None", evidenced: "None", conf: "Low", count: 0, verified: "—", state: "none",
    evidence: [],
  },
  {
    name: "SQL", family: "Data & Queries",
    claimed: "Intermediate", evidenced: "None", conf: "Low", count: 0, verified: "—", state: "claimed",
    evidence: [],
  },
];

export const PROFILE_NEW_DATA: ProfileIdentity = {
  name: "", headline: "", currentRole: "", company: "", location: "",
  openToWork: false, visibility: "private",
};

export const PROFILE_FULL_DATA: ProfileIdentity = {
  name: "Layla Al-Otaibi",
  headline: "QA Automation Engineer · 5+ years",
  currentRole: "Senior QA Engineer",
  company: "Jahez",
  location: "Riyadh, KSA",
  openToWork: true,
  visibility: "matched",
};

export const TARGET_ROLES_FULL: TargetRole[] = [
  { id: "qa-auto", title: "QA Automation Engineer",      readiness: 82, conf: "High",   evidencedSkills: 4, totalSkills: 6 },
  { id: "sdet",    title: "SDET — Platform Engineering",  readiness: 71, conf: "Medium", evidencedSkills: 3, totalSkills: 6 },
];

export const EXPERIENCE_FULL: ExperienceEntry[] = [
  {
    id: "e1", company: "Jahez", role: "Senior QA Engineer",
    start: "Jan 2024", end: null,
    desc: "Led test automation for payment and ordering flows; API testing with Playwright and k6.",
    skills: ["API Testing", "Playwright / E2E", "Performance Testing"],
  },
  {
    id: "e2", company: "STC Solutions", role: "QA Engineer",
    start: "Mar 2022", end: "Dec 2023",
    desc: "Maintained web and mobile regression suites; integrated CI/CD pipelines.",
    skills: ["CI/CD Pipelines", "SQL", "Playwright / E2E"],
  },
];

export const EDUCATION_FULL: EducationEntry[] = [
  { id: "ed1", institution: "King Abdulaziz University", degree: "B.Sc. Computer Science", year: "2022" },
];

export const PROJECTS_FULL: ProjectEntry[] = [
  {
    id: "p1", title: "E2E Test Automation Suite",
    desc: "Playwright-based regression suite covering 200+ critical user journeys. Integrated with GitHub Actions.",
    url: "github.com/layla/e2e-suite",
    skills: ["Playwright / E2E", "CI/CD Pipelines"],
    date: "Aug 2026",
  },
];

export const SKILL_TAXONOMY: { family: string; skills: string[] }[] = [
  { family: "Test Automation",  skills: ["API Testing", "Playwright / E2E", "Performance Testing", "Unit Testing", "Cypress", "Selenium"] },
  { family: "Data & Queries",   skills: ["SQL", "NoSQL", "Data Analysis", "ETL Pipelines", "Tableau"] },
  { family: "Delivery & Ops",   skills: ["CI/CD Pipelines", "Docker", "Kubernetes", "Git", "Linux"] },
  { family: "Programming",      skills: ["Python", "JavaScript", "TypeScript", "Java", "Go"] },
  { family: "Soft Skills",      skills: ["Communication", "Problem Solving", "Team Leadership", "Stakeholder Management"] },
];

export const ASSESSMENTS: { id: string; title: string; dur: string; level: string; score?: number }[] = [
  { id: "a1", title: "REST API Testing Fundamentals",  dur: "25 min", level: "Intermediate–Advanced" },
  { id: "a2", title: "Advanced Playwright Automation",  dur: "35 min", level: "Advanced" },
  { id: "a3", title: "Performance Testing with k6",     dur: "20 min", level: "Intermediate" },
  { id: "a4", title: "SQL: Joins, Windows & CTEs",      dur: "30 min", level: "Intermediate–Advanced" },
];

export const CONSENT_ITEMS = [
  { purpose: "Profile processing", desc: "Allows HireFit to build your Talent DNA and calculate readiness scores.", status: "Active" as const, date: "14 Aug 2026" },
  { purpose: "Employer visibility", desc: "Allows matched employers to view your evidenced skills and readiness.", status: "Active" as const, date: "14 Aug 2026" },
  { purpose: "Aggregate analytics", desc: "Allows anonymized participation in platform-level analytics and benchmarking.", status: "Active" as const, date: "14 Aug 2026" },
  { purpose: "Marketing communications", desc: "Allows HireFit to send product updates and feature announcements.", status: "Withdrawn" as const, date: "20 Aug 2026" },
];

export const AVAILABLE_ROLES: {
  id: string; title: string; family: string; baseReadiness: number; requiredSkills: string[];
}[] = [
  { id: "qa-auto",    title: "QA Automation Engineer",       family: "Quality Assurance",    baseReadiness: 84, requiredSkills: ["API Testing", "Playwright / E2E", "Performance Testing", "CI/CD Pipelines", "SQL", "Test Strategy"] },
  { id: "sdet",       title: "SDET — Platform Engineering",  family: "Software Engineering", baseReadiness: 76, requiredSkills: ["API Testing", "CI/CD Pipelines", "Playwright / E2E", "Performance Testing", "Test Strategy", "SQL"] },
  { id: "test-lead",  title: "Test Lead",                    family: "Quality Assurance",    baseReadiness: 70, requiredSkills: ["Test Strategy", "CI/CD Pipelines", "API Testing", "Communication", "Stakeholder Management"] },
  { id: "qa-eng",     title: "QA Engineer",                  family: "Quality Assurance",    baseReadiness: 80, requiredSkills: ["API Testing", "Playwright / E2E", "SQL", "Test Strategy"] },
  { id: "devops",     title: "DevOps Engineer",              family: "Delivery & Ops",       baseReadiness: 60, requiredSkills: ["CI/CD Pipelines", "Docker", "Kubernetes", "Linux", "Git"] },
];
