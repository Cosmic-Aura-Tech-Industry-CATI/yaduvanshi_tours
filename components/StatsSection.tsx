"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

const GOLD = "#E8B96A";

function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = to / 60;
    const t = setInterval(() => {
      cur = Math.min(cur + step, to);
      setVal(Math.floor(cur));
      if (cur >= to) clearInterval(t);
    }, 20);
    return () => clearInterval(t);
  }, [inView, to]);

  return <span ref={ref}>{val.toLocaleString("en-IN")}{suffix}</span>;
}

export function StatsSection() {
  const STATS = [
    { label: "Years on Road", to: 15, suffix: "+" },
    { label: "Happy Travelers", to: 10000, suffix: "+" },
    { label: "Tour Packages", to: 50, suffix: "+" },
    { label: "Vehicles in Fleet", to: 200, suffix: "+" },
  ];

  return (
    <section className="py-14 relative overflow-hidden" style={{ background: "#0C1519" }}>
      {/* Ambient blobs */}
      <div className="ambient-blob-brass" style={{ top: "-120px", right: "20%" }} />
      <div className="ambient-blob-coffee" style={{ bottom: "-100px", left: "10%" }} />

      {/* Glow divider borders for top and bottom */}
      <div className="glow-divider absolute top-0 inset-x-0" />
      <div className="glow-divider absolute bottom-0 inset-x-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group glass-panel rounded-xl px-4 py-6 hover-glow"
            >
              <div
                className="font-display font-bold text-3xl md:text-4xl lg:text-5xl transition-colors duration-300 text-glow-gold-strong"
                style={{ color: GOLD }}
              >
                <AnimatedCounter to={s.to} suffix={s.suffix} />
              </div>
              <div className="text-[#D8CFC7]/50 text-sm mt-1.5 font-mono tracking-wide">{s.label}</div>
              <motion.div
                className="mx-auto mt-3 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${GOLD}50, transparent)` }}
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
