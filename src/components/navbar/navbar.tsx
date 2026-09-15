"use client";

import { Logo } from "@/components/rankShellPages";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

/* ─── nav ─── */
const NAV_LINKS = [
  ["Platform", "#platform"],
  ["For Candidates", "#candidates"],
  ["How It Works", "#how-it-works"],
  ["For Employers", "#employers"],
  ["For Institutions", "#institutions"]
] as const;

const HEADER_OFFSET = 72;

export default function Navbar({
  onGetStarted,
  scrolled,
}: {
  onGetStarted: () => void;
  scrolled: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(NAV_LINKS[0][1]);

  const scrollToHref = useCallback((href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveHref(href);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map(([, href]) => href.replace("#", ""));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const id = visible[0].target.id;
        setActiveHref(`#${id}`);
      },
      {
        rootMargin: `-${HEADER_OFFSET}px 0px -55% 0px`,
        threshold: [0.1, 0.25, 0.5],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const linkCls = (href: string) =>
    cn(
      "text-[13.5px] font-medium whitespace-nowrap transition-colors duration-200",
      activeHref === href
        ? scrolled
          ? "text-ink"
          : "text-white"
        : scrolled
          ? "text-ink/60 hover:text-ink"
          : "text-white/60 hover:text-white",
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/96 shadow-[0_1px_0_rgba(228,232,238,1)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-8 lg:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center">
          <Logo size={34} invert={!scrolled} />
        </div>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={linkCls(href)}
              onClick={(e) => {
                e.preventDefault();
                scrollToHref(href);
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onGetStarted}
            className={cn(
              "hidden px-3 py-2 text-[13.5px] font-semibold transition-colors lg:block",
              scrolled ? "text-ink/60 hover:text-ink" : "text-white/65 hover:text-white",
            )}
          >
            Sign In
          </button>
          <button
            onClick={onGetStarted}
            className="hidden rounded-[9px] bg-brand-500 px-4 py-2 text-[13.5px] font-semibold text-white shadow-[0_1px_4px_rgba(79,70,229,0.35)] transition-all hover:bg-brand-600 hover:shadow-[0_2px_10px_rgba(79,70,229,0.45)] lg:block"
          >
            Get Started
          </button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className={cn(
              "grid size-9 place-items-center rounded-[8px] transition-colors lg:hidden",
              scrolled ? "text-ink hover:bg-line-soft" : "text-white hover:bg-white/10",
            )}
          >
            {mobileOpen ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-brand-900 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
          mobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 border-transparent opacity-0",
        )}
      >
        <div className="px-6 py-4">
          {NAV_LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                scrollToHref(href);
              }}
              className={cn(
                "block py-3 text-[15px] font-medium transition-colors",
                activeHref === href ? "text-white" : "text-white/70 hover:text-white",
              )}
            >
              {label}
            </a>
          ))}
          <button
            onClick={onGetStarted}
            className="mt-4 w-full rounded-[10px] bg-brand-500 py-3 text-[15px] font-semibold text-white"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
