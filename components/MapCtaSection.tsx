"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ArrowRight, Plane } from "lucide-react";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";
const DARKER = "#131F14";

const MAP_PINS = [
  { id: 1, name: "Leh Ladakh", best: "May–Sep", x: 30, y: 13 },
  { id: 2, name: "Kashmir", best: "Apr–Oct", x: 22, y: 20 },
  { id: 3, name: "Manali", best: "May–Oct", x: 33, y: 27 },
  { id: 4, name: "Jaipur", best: "Oct–Mar", x: 34, y: 47 },
  { id: 5, name: "Goa", best: "Nov–Feb", x: 35, y: 65 },
  { id: 6, name: "Kerala", best: "Sep–Mar", x: 39, y: 77 },
];

export function MapCtaSection() {
  const [activePin, setActivePin] = useState(1);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInView = useInView(mapRef, { once: true });

  return (
    <section ref={mapRef} className="py-20 px-6 lg:px-12 relative overflow-hidden" style={{ background: DARK }}>
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(circle,rgba(201,168,76,0.4) 1px,transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-script text-2xl mb-1" style={{ color: GOLD }}>
              Your Journey Awaits
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-1 mb-5">
              Start Your Next Adventure
            </h2>
            <p className="text-white/55 leading-relaxed mb-8 max-w-md text-sm">
              From serene mountains to vibrant cities, we bring India closer to you.
            </p>
            <Link
              href="/inquiry"
              className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-sm text-sm hover:brightness-90 transition-all cursor-pointer"
              style={{ background: GOLD, color: DARK }}
            >
              Plan Your Trip Now <ArrowRight size={15} />
            </Link>
          </div>
          <div className="relative h-[360px]">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              {[
                { d: "M 30,13 Q 26,16 22,20", delay: 0.5 },
                { d: "M 22,20 Q 27,23 33,27", delay: 0.9 },
                { d: "M 33,27 Q 33,37 34,47", delay: 1.3 },
                { d: "M 34,47 Q 34,56 35,65", delay: 1.7 },
                { d: "M 35,65 Q 37,71 39,77", delay: 2.1 },
              ].map(({ d, delay }, i) => (
                <motion.path
                  key={i}
                  d={d}
                  fill="none"
                  stroke={`${GOLD}40`}
                  strokeWidth="0.6"
                  strokeDasharray="2 2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={mapInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay, ease: "easeInOut" }}
                />
              ))}
            </svg>
            <motion.div
              className="absolute z-20"
              style={{ left: "34%", top: "38%" }}
              animate={{ x: [0, 5, 10, 6, 0], y: [0, -4, -8, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Plane size={18} className="rotate-[30deg]" style={{ color: GOLD }} />
            </motion.div>
            {MAP_PINS.map((p) => (
              <div
                key={p.id}
                className="absolute cursor-pointer"
                style={{ left: `${p.x}%`, top: `${p.y * 1.15}%` }}
                onMouseEnter={() => setActivePin(p.id)}
                onClick={() => setActivePin(p.id)}
              >
                <motion.div
                  className="absolute rounded-full border"
                  style={{ width: 24, height: 24, top: -12, left: -12, borderColor: `${GOLD}80` }}
                  animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: p.id * 0.35 }}
                />
                <motion.div
                  className="rounded-full border-2 border-white"
                  style={{
                    width: 12,
                    height: 12,
                    marginLeft: -6,
                    marginTop: -6,
                    background: activePin === p.id ? GOLD : `${GOLD}CC`,
                  }}
                  animate={{ scale: activePin === p.id ? 1.3 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <AnimatePresence>
                  {activePin === p.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-6 left-0 rounded-lg px-2.5 py-1.5 shadow-xl whitespace-nowrap z-30"
                      style={{ background: DARKER, border: `1px solid ${GOLD}50` }}
                    >
                      <div className="text-white text-xs font-semibold">{p.name}</div>
                      <div className="font-mono text-[10px] mt-0.5" style={{ color: GOLD }}>
                        {p.best}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
