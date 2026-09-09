import { ReactNode, useEffect, useRef, useState } from "react";

/* ─── scroll reveal ─── */
function useReveal(threshold = 0.12) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setVisible(true); io.disconnect(); }
      }, { threshold });
      io.observe(el);
      return () => io.disconnect();
    }, [threshold]);
    return { ref, visible };
  }
  
export default function Reveal({
    children, delay = 0, className = "", from = "bottom",
  }: {
    children: ReactNode; delay?: number; className?: string;
    from?: "bottom" | "left" | "right" | "none";
  }) {
    const { ref, visible } = useReveal();
    const tx: Record<string, string> = {
      bottom: "translateY(36px)", left: "translateX(-36px)",
      right: "translateX(36px)", none: "none",
    };
    return (
      <div ref={ref} className={className} style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : tx[from],
        transition: `opacity 0.8s ${delay}ms cubic-bezier(0.22,1,0.36,1),
                     transform 0.8s ${delay}ms cubic-bezier(0.22,1,0.36,1)`,
      }}>
        {children}
      </div>
    );
  }