
export const HARD_FILTERS = [
    { l: "Location", o: ["Riyadh", "Jeddah", "Dammam", "Any"] },
    { l: "Availability", o: ["Immediate", "1 month", "Any"] },
];
  
export const SOFT_FILTERS = [
    { l: "Skill level", o: ["Advanced+", "Intermediate+", "Any"] },
    { l: "Evidence type", o: ["Assessment", "Interview", "Simulation"] },
    { l: "Experience", o: ["Junior", "Mid", "Senior"] },
];
  
export function FilterGroup({ f }: { f: { l: string; o: string[] } }) {
    return (
      <div>
        <div className="mb-1.5 text-[11.5px] font-semibold uppercase tracking-wide text-faint">{f.l}</div>
        <div className="space-y-1">
          {f.o.map((o, i) => (
            <label key={o} className="flex cursor-pointer items-center gap-2 text-[13px] text-ink-soft">
              <input type="checkbox" defaultChecked={i === 0} className="size-3.5 accent-brand-500" />
              {o}
            </label>
          ))}
        </div>
      </div>
    );
}