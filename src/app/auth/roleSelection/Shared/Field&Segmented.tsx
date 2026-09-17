"use client"
import { useState, type ComponentType, type ReactNode, type SVGProps } from "react";
import {
  Eye,
  EyeOff,
  type LucideIcon,
} from "lucide-react";
import { Button, cx } from "../../../../components/primitives";

export function Field({
    label,
    type = "text",
    icon: Icon,
    placeholder,
    hint,
    optional,
  }: {
    label: string;
    type?: string;
    icon?: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;
    placeholder?: string;
    hint?: string;
    optional?: boolean;
  }) {
    const [show, setShow] = useState(false);
    const isPw = type === "password";
    return (
      <label className="block">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[13px] font-semibold text-ink">{label}</span>
          {optional && <span className="text-[12px] font-medium text-faint">Optional</span>}
        </div>
        <div className="relative">
          {Icon && <Icon className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-faint" />}
          <input
            type={isPw ? (show ? "text" : "password") : type}
            placeholder={placeholder}
            className={cx(
              "h-11 w-full rounded-[10px] border border-line bg-surface text-[14px] text-ink outline-none transition-all placeholder:text-faint focus:border-brand-400 focus:ring-2 focus:ring-brand-100",
              Icon ? "pl-10" : "pl-3.5",
              isPw ? "pr-10" : "pr-3.5",
            )}
          />
          {isPw && (
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-muted"
            >
              {show ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
            </button>
          )}
        </div>
        {hint && <div className="mt-1.5 text-[12.5px] text-muted">{hint}</div>}
      </label>
    );
  }
  
export function Segmented({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
    return (
        <div className="flex gap-1 rounded-[10px] border border-line bg-raised p-1">
        {options.map((o) => (
            <button
            key={o}
            onClick={() => onChange(o)}
            className={cx(
                "flex-1 rounded-[7px] px-3 py-1.5 text-[13px] font-semibold transition-all",
                value === o ? "bg-brand-500 text-white shadow-[var(--shadow-card)]" : "text-ink-soft hover:text-ink",
            )}
            >
            {o}
            </button>
        ))}
        </div>
    );
  }
  