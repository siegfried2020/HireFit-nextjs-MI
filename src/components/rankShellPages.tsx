"use client"
import { useState, type ComponentType, type ReactNode, type SVGProps } from "react";
import {
  ChevronsUpDown,
  Check,
  LayoutDashboard,
  Gauge,
  Search,
  Briefcase,
  Users,
  BarChart3,
  Shield,
  Boxes,
  ScrollText,
  IdCard,
  GraduationCap,
  Bell,
  Command,
  LogOut,
  Menu,
  X,
  Gavel,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* Custom icon: connected-nodes / skill-network — replaces Dna for Talent DNA nav item */
function TalentDnaIcon({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* centre node */}
      <circle cx="10" cy="10" r="2" />
      {/* top node */}
      <circle cx="10" cy="3.5" r="1.5" />
      {/* bottom-left node */}
      <circle cx="3.5" cy="15" r="1.5" />
      {/* bottom-right node */}
      <circle cx="16.5" cy="15" r="1.5" />
      {/* edges */}
      <line x1="10" y1="5" x2="10" y2="8" />
      <line x1="10" y1="12" x2="4.6" y2="13.8" />
      <line x1="10" y1="12" x2="15.4" y2="13.8" />
    </svg>
  );
}

export type Portal = "candidate" | "employer" | "ops";

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;
};

export const PORTALS: Record<
  Portal,
  { label: string; kind: string; workspaceLabel: string; nav: NavItem[]; home: string }
> = {
  candidate: {
    label: "Candidate",
    kind: "B2C",
    workspaceLabel: "Candidate Account",
    home: "dashboard",
    nav: [
      { id: "dashboard", label: "Home", icon: LayoutDashboard },
      { id: "talent-dna", label: "Talent DNA", icon: TalentDnaIcon },
      { id: "readiness", label: "Role Readiness", icon: Gauge },
      { id: "jobs", label: "Job Matches", icon: Briefcase },
      { id: "passport", label: "Talent Passport", icon: IdCard },
    ],
  },
  employer: {
    label: "Employer",
    kind: "B2B",
    workspaceLabel: "Employer Workspace",
    home: "dashboard",
    nav: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "job-dna", label: "Job DNA", icon: TalentDnaIcon },
      { id: "search", label: "Talent Search", icon: Search },
      { id: "pipeline", label: "Pipeline", icon: Users },
    ],
  },
  ops: {
    label: "Admin / University",
    kind: "Ops",
    workspaceLabel: "Operations Console",
    home: "overview",
    nav: [
      { id: "overview", label: "Overview", icon: LayoutDashboard },
      { id: "cohort", label: "Cohort & Institution", icon: BarChart3 },
      { id: "taxonomy", label: "Skill Taxonomy", icon: Boxes },
      { id: "scoring", label: "Scoring Policies", icon: ScrollText },
      { id: "integrity", label: "Integrity", icon: Shield },
      { id: "appeals", label: "Appeals / Reviews", icon: Gavel },
      { id: "config", label: "Configuration", icon: Settings },
    ],
  },
};

/**
 * TIE brand logo.
 * `size` controls the rendered height in px (width is auto from aspect ratio).
 * `invert` renders a white version for use on dark backgrounds.
 */
export function Logo({ size = 34, invert = false }: { size?: number; invert?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/image-2.png"
      alt="HireFit"
      height={size}
      style={{ height: size, width: "auto", display: "block" }}
      className={cn("select-none", invert && "brightness-0 invert")}
      draggable={false}
    />
  );
}

export type Session = {
  portal: Portal;
  workspace: string;
  account: string;
  initials: string;
  meta: string;
  orgs?: string[];
};

function OrgBadge({ name }: { name: string }) {
  return (
    <Badge
      variant="default"
      className="size-5 rounded-[5px] border-0 bg-brand-500 p-0 text-[9px] font-bold text-white hover:bg-brand-500"
    >
      {name.slice(0, 2).toUpperCase()}
    </Badge>
  );
}

function WorkspaceSwitcher({ session }: { session: Session }) {
  const [current, setCurrent] = useState(session.workspace);
  const [open, setOpen] = useState(false);
  const multi = (session.orgs?.length ?? 0) > 1;

  return (
    <div className="relative flex items-center">
      <Button
        variant="ghost"
        onClick={() => multi && setOpen((o) => !o)}
        className={cn(
          "h-auto gap-1.5 rounded-[8px] px-2.5 py-1.5 text-[13px] font-semibold text-ink",
          multi ? "cursor-pointer hover:bg-line-soft" : "cursor-default hover:bg-transparent",
        )}
      >
        <OrgBadge name={current} />
        <span className="max-w-[120px] truncate sm:max-w-[160px]">{current}</span>
        {multi && <ChevronsUpDown className="size-3.5 shrink-0 text-faint" />}
      </Button>
      {open && multi && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="tie-fade absolute left-0 top-full z-50 mt-1.5 w-64 overflow-hidden rounded-[12px] border border-line bg-surface p-1.5 shadow-[var(--shadow-pop)]">
            <div className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-faint">
              Your organizations
            </div>
            {session.orgs!.map((o) => (
              <Button
                key={o}
                variant="ghost"
                onClick={() => { setCurrent(o); setOpen(false); }}
                className={cn(
                  "h-auto w-full justify-start gap-2.5 rounded-[8px] px-2.5 py-2 text-left text-[13px] hover:bg-line-soft",
                  o === current && "bg-brand-50",
                )}
              >
                <OrgBadge name={o} />
                <span className="min-w-0 flex-1 truncate font-semibold text-ink">{o}</span>
                {o === current && <Check className="size-4 shrink-0 text-brand-500" />}
              </Button>
            ))}
            <div className="mx-1.5 my-1 border-t border-line" />
            <Button
              variant="ghost"
              className="h-auto w-full justify-start gap-2 rounded-[8px] px-2.5 py-2 text-left text-[12px] font-medium text-muted hover:bg-line-soft hover:text-ink"
            >
              Manage organization settings
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function SidebarBody({
  session,
  nav,
  route,
  onRoute,
  onSignOut,
  onNavigate,
  onGoHome,
}: {
  session: Session;
  nav: NavItem[];
  route: string;
  onRoute: (r: string) => void;
  onSignOut: () => void;
  onNavigate?: () => void;
  onGoHome?: () => void;
}) {
  return (
    <>
      {/* Fixed top: logo */}
      <div className="shrink-0 px-5 pb-3 pt-5">
        {onGoHome ? (
          <Button
            variant="ghost"
            onClick={onGoHome}
            className="h-auto rounded-[6px] p-0 hover:bg-transparent hover:opacity-75"
            title="Back to home"
          >
            <Logo size={46} />
          </Button>
        ) : (
          <Logo size={46} />
        )}
      </div>

      {/* Only the middle nav list scrolls internally */}
      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-2">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = route === item.id;
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => {
                onRoute(item.id);
                onNavigate?.();
              }}
              className={cn(
                "group mb-1 h-auto w-full justify-start gap-3 rounded-[9px] px-3 py-2.5 text-[14px] font-medium",
                active
                  ? "bg-brand-50 text-brand-700 hover:bg-brand-50 hover:text-brand-700"
                  : "text-ink-soft hover:bg-line-soft hover:text-ink",
              )}
            >
              <Icon
                className={cn("size-[19px] shrink-0", active ? "text-brand-500" : "text-faint group-hover:text-muted")}
                strokeWidth={1.9}
              />
              {item.label}
              {active && <span className="ml-auto h-4 w-1 rounded-full bg-brand-500" />}
            </Button>
          );
        })}
      </nav>

      {/* Fixed bottom: account */}
      <div className="shrink-0 border-t border-line p-3">
        <div className="flex items-center gap-2.5 rounded-[10px] px-2 py-1.5">
          <div className="grid size-8 place-items-center rounded-full bg-brand-100 text-[12px] font-bold text-brand-700">
            {session.initials}
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-[13px] font-semibold text-ink">{session.account}</div>
            <div className="truncate text-[11px] text-faint">{session.meta}</div>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onSignOut}
            title="Sign out"
            className="text-faint hover:bg-line-soft hover:text-ink"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
    </>
  );
}

export function Shell({
  session,
  route,
  onRoute,
  onSignOut,
  onGoHome,
  breadcrumbs,
  actions,
  children,
}: {
  session: Session;
  route: string;
  onRoute: (r: string) => void;
  onSignOut: () => void;
  onGoHome?: () => void;
  breadcrumbs: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [drawer, setDrawer] = useState(false);
  if (!session) return null;
  const p = PORTALS[session.portal];
  return (
    <div className="min-h-screen bg-canvas">
      {/* Desktop sidebar — fixed to the viewport at exactly 100vh; the page
          content scrolls independently. The sidebar is NOT in the scroll flow. */}
      <aside className="fixed inset-y-0 left-0 z-30 flex h-screen w-[248px] flex-col border-r border-line bg-surface max-lg:hidden">
        <SidebarBody
          session={session}
          nav={p.nav}
          route={route}
          onRoute={onRoute}
          onSignOut={onSignOut}
          onGoHome={onGoHome}
        />
      </aside>

      {/* Mobile / tablet drawer */}
      {drawer && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setDrawer(false)} />
          <aside className="tie-slide-in absolute inset-y-0 left-0 flex w-[264px] flex-col border-r border-line bg-surface shadow-[var(--shadow-pop)]">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setDrawer(false)}
              className="absolute right-3 top-4 text-faint hover:bg-line-soft hover:text-ink"
            >
              <X className="size-4.5" />
            </Button>
            <SidebarBody
              session={session}
              nav={p.nav}
              route={route}
              onRoute={onRoute}
              onSignOut={onSignOut}
              onNavigate={() => setDrawer(false)}
              onGoHome={onGoHome}
            />
          </aside>
        </div>
      )}

      {/* Main — offset by the sidebar width, scrolls with the page normally */}
      <div className="flex min-h-screen min-w-0 flex-col lg:pl-[248px]">
        <header className="sticky top-0 z-20 border-b border-line bg-surface/85 backdrop-blur-md">
          <div className="flex min-h-16 items-center gap-2 px-4 py-2 sm:gap-4 sm:px-6 max-lg:px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDrawer(true)}
              className="hidden size-9 shrink-0 self-center text-ink-soft hover:bg-line-soft max-lg:inline-flex"
              title="Open menu"
            >
              <Menu className="size-5" />
            </Button>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 lg:flex-row lg:items-center lg:gap-1">
              <WorkspaceSwitcher session={session} />
              <div className="flex min-w-0 items-center gap-1 pl-2.5 lg:pl-0">
                <span className="hidden shrink-0 text-line lg:inline" aria-hidden>/</span>
                <nav className="min-w-0 truncate text-[12px] font-medium text-muted sm:text-[13px] [&_:last-child]:text-ink">
                  {breadcrumbs}
                </nav>
              </div>
            </div>
            <div className="hidden min-w-0 max-w-[280px] flex-1 items-center gap-2 self-center rounded-[9px] border border-line bg-canvas px-3 py-1.5 text-[13px] text-faint lg:flex xl:max-w-none">
              <Search className="size-4 shrink-0" />
              <span className="min-w-0 truncate">Search talent, roles, skills…</span>
              <span className="ml-auto hidden items-center gap-0.5 rounded-[5px] border border-line bg-surface px-1.5 py-0.5 text-[11px] font-medium text-muted xl:flex">
                <Command className="size-3" />K
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-1 self-center">
              {actions}
              <Button
                variant="ghost"
                size="icon"
                className="relative size-9 shrink-0 text-ink-soft hover:bg-line-soft"
              >
                <Bell className="size-[18px]" />
                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#b5443a] ring-2 ring-surface" />
              </Button>
            </div>
          </div>
          {/* Mobile / tablet search row */}
          <div className="border-t border-line px-4 py-2.5 lg:hidden">
            <div className="flex items-center gap-2 rounded-[9px] border border-line bg-canvas px-3 py-2 text-[13px] text-faint">
              <Search className="size-4 shrink-0" />
              <span className="min-w-0 truncate">Search talent, roles, skills…</span>
            </div>
          </div>
        </header>
        <main className="min-w-0 flex-1">
          <div key={session.portal + route} className="tie-fade mx-auto max-w-[1200px] px-6 py-7 max-lg:px-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export { GraduationCap };
