"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PACKAGES } from "@/data/packages";
import { PackageCard } from "@/components/cards/PackageCard";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";
const CREAM = "#FAFAF8";

const PKG_FILTERS = ["All", "Spiritual", "Mountains"];

// The 8 featured package slugs from the spec
const FEATURED_SLUGS = [
  "ayodhya-darshan",
  "mathura-vrindavan",
  "kashi-vishwanath",
  "neem-karoli-kainchi-dham",
  "mahakal-omkareshwar",
  "kullu-manali",
  "vaishno-devi-kashmir",
  "char-dham-yatra",
];

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

export function PackagesSection() {
  const [pkgFilter, setPkgFilter] = useState("All");

  const featuredPkgs = PACKAGES.filter((p) => FEATURED_SLUGS.includes(p.slug));

  const filteredPkgs =
    pkgFilter === "All"
      ? featuredPkgs
      : featuredPkgs.filter((p) => p.category === pkgFilter.toLowerCase());

  const STATS = [
    { label: "Years on Road", to: 15, suffix: "+" },
    { label: "Happy Travelers", to: 10000, suffix: "+" },
    { label: "Tour Packages", to: 50, suffix: "+" },
    { label: "Vehicles in Fleet", to: 200, suffix: "+" },
  ];

  return (
    <div>
      {/* ── Stats Banner ── */}
      <section className="py-14 relative overflow-hidden" style={{ background: CREAM }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group"
              >
                <div
                  className="font-display font-bold text-3xl md:text-4xl lg:text-5xl transition-colors duration-300 group-hover:text-[#b8943e]"
                  style={{ color: GOLD }}
                >
                  <AnimatedCounter to={s.to} suffix={s.suffix} />
                </div>
                <div className="text-gray-500 text-sm mt-1.5 font-mono tracking-wide">{s.label}</div>
                <motion.div
                  className="mx-auto mt-2 h-px"
                  style={{ background: `${GOLD}40` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Packages Grid ── */}
      <section className="py-20 px-6 lg:px-12 relative" style={{ background: CREAM }}>
        <div
          className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{ background: `linear-gradient(to right, transparent, ${GOLD}30, transparent)` }}
        />
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <motion.p
                className="font-script text-2xl mb-1"
                style={{ color: GOLD }}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                Handpicked Experiences
              </motion.p>
              <motion.h2
                className="font-display font-bold text-3xl md:text-4xl text-gray-900"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Popular Tour Packages
              </motion.h2>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-px" style={{ background: GOLD }} />
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: GOLD }} />
                <div className="w-8 h-px" style={{ background: GOLD }} />
              </div>
            </div>
            <Link
              href="/tours"
              className="hidden md:inline-flex items-center gap-1.5 text-sm border px-5 py-2.5 rounded-sm transition-all duration-300 hover:border-transparent"
              style={{ borderColor: `${GOLD}60`, color: GOLD }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = GOLD;
                (e.currentTarget as HTMLElement).style.color = DARK;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = GOLD;
              }}
            >
              View All <ArrowRight size={13} />
            </Link>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap mb-10 relative">
            {PKG_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setPkgFilter(f)}
                className="relative px-5 py-2 text-xs font-semibold rounded-full border transition-all duration-300 cursor-pointer"
                style={
                  pkgFilter === f
                    ? { background: GOLD, borderColor: GOLD, color: DARK }
                    : { background: "transparent", borderColor: "#d1d5db", color: "#6b7280" }
                }
              >
                {pkgFilter === f && (
                  <motion.div
                    layoutId="pkg-filter-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: GOLD }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPkgs.map((pkg, i) => (
                <PackageCard key={pkg.slug} pkg={pkg} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-sm text-sm transition-all duration-300 hover:brightness-90"
              style={{ background: GOLD, color: DARK }}
            >
              View All Packages <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
