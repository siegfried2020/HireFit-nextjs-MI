import Reveal from "@/components/Reveal";

/* ─── trust strip ─── */
export function TrustStrip() {
  const items = [
    { stat: "Evidence", sub: "over claims" },
    { stat: "Explainable", sub: "readiness scores" },
    { stat: "Structured", sub: "skill matching" },
    { stat: "Human", sub: "decisions, always" },
  ];
  return (
    <section className="border-y border-line bg-white py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.stat} delay={i * 80} className="text-center">
              <div className="text-[20px] sm:text-[28px] font-extrabold tracking-tight text-ink">
                {item.stat}
              </div>
              <div className="mt-1 text-[13px] font-medium text-muted">
                {item.sub}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
