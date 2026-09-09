import { Logo } from "@/components/Shell";
import { Menu, X } from "lucide-react";
import { useState } from "react";

/* ─── nav ─── */
const NAV_LINKS = [
    ["Platform",        "#platform"      ],
    ["For Candidates",  "#candidates"    ],
    ["For Employers",   "#employers"     ],
    ["For Institutions","#institutions"  ],
    ["How It Works",    "#how-it-works"  ],
  ] as const;
  
  export default function Navbar({ onGetStarted, scrolled }: { onGetStarted: () => void; scrolled: boolean }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const linkCls = [
      "text-[13.5px] font-medium whitespace-nowrap transition-colors duration-150",
      scrolled ? "text-ink/60 hover:text-ink" : "text-white/60 hover:text-white",
    ].join(" ");
  
    return (
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/96 backdrop-blur-md shadow-[0_1px_0_rgba(228,232,238,1)]"
          : "bg-transparent"
      }`}>
        {/* three-column layout: logo | nav | actions */}
        <div className="mx-auto grid h-[68px] max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center px-8">
  
          {/* left — logo */}
          <div className="flex items-center">
            <Logo size={34} invert={!scrolled} />
          </div>
  
          {/* center — nav links */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map(([label, href]) => (
              <a key={label} href={href} className={linkCls}>{label}</a>
            ))}
          </nav>
  
          {/* right — actions + mobile toggle */}
          <div className="flex items-center justify-end gap-2">
            <button onClick={onGetStarted}
              className={`hidden text-[13.5px] font-semibold transition-colors lg:block px-3 py-2 ${
                scrolled ? "text-ink/60 hover:text-ink" : "text-white/65 hover:text-white"
              }`}>
              Sign In
            </button>
            <button onClick={onGetStarted}
              className="hidden rounded-[9px] bg-brand-500 px-4 py-2 text-[13.5px] font-semibold text-white
                shadow-[0_1px_4px_rgba(79,70,229,0.35)] transition-all
                hover:bg-brand-600 hover:shadow-[0_2px_10px_rgba(79,70,229,0.45)] lg:block">
              Get Started
            </button>
            <button onClick={() => setMobileOpen((o) => !o)}
              className={`grid size-9 place-items-center rounded-[8px] transition-colors lg:hidden ${
                scrolled ? "text-ink hover:bg-line-soft" : "text-white hover:bg-white/10"
              }`}>
              {mobileOpen ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
            </button>
          </div>
        </div>
  
        {/* mobile drawer */}
        {mobileOpen && (
          <div className="border-t border-white/10 bg-brand-900 px-6 py-4 lg:hidden">
            {NAV_LINKS.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMobileOpen(false)}
                className="block py-3 text-[15px] font-medium text-white/70 hover:text-white">
                {label}
              </a>
            ))}
            <button onClick={onGetStarted}
              className="mt-4 w-full rounded-[10px] bg-brand-500 py-3 text-[15px] font-semibold text-white">
              Get Started
            </button>
          </div>
        )}
      </header>
    );
  }