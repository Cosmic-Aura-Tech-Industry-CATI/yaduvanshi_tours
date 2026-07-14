"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PACKAGES } from "@/data/packages";
import { PackageCard } from "@/components/cards/PackageCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";

const PKG_FILTERS = ["All", "Mountains", "Beach", "Heritage", "Wildlife"];

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
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

  return (
    <span ref={ref}>
      {val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function PackagesSection() {
  const [pkgFilter, setPkgFilter] = useState("All");

  const filteredPkgs =
    pkgFilter === "All"
      ? PACKAGES.slice(0, 4)
      : PACKAGES.filter((p) => p.category === pkgFilter.toLowerCase()).slice(0, 4);

  return (
    <div>
      {/* ── Stats banner ── */}
      <section className="py-14 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Years on Road", to: 15, suffix: "+" },
            { label: "Happy Travelers", to: 10000, suffix: "+" },
            { label: "Tour Packages", to: 50, suffix: "+" },
            { label: "Vehicles in Fleet", to: 200, suffix: "+" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display font-bold text-3xl md:text-4xl" style={{ color: GOLD }}>
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <div className="text-gray-500 text-sm mt-1 font-mono">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Packages Grid ── */}
      <section className="py-20 px-6 lg:px-12 bg-[#FAFAF8] border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
            <SectionHeader script="Handpicked Experiences" heading="Popular Tour Packages" />
            <Link
              href="/tours"
              className="hidden md:flex items-center gap-1.5 mt-2 text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-sm hover:bg-[#C9A84C] hover:text-[#1A2B1C] hover:border-transparent transition-all"
            >
              View All <ArrowRight size={13} />
            </Link>
          </div>
          <div className="flex gap-2 flex-wrap mb-8">
            {PKG_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setPkgFilter(f)}
                className="px-4 py-1.5 text-xs font-medium rounded-sm border transition-all cursor-pointer"
                style={
                  pkgFilter === f
                    ? { background: GOLD, borderColor: GOLD, color: DARK }
                    : { background: "transparent", borderColor: "#d1d5db", color: "#6b7280" }
                }
              >
                {f}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPkgs.map((pkg, i) => (
                <PackageCard key={pkg.slug} pkg={pkg} index={i} />
              ))}
            </AnimatePresence>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 px-8 py-3 font-semibold rounded-sm text-sm hover:brightness-90 transition-all"
              style={{ background: GOLD, color: DARK }}
            >
              View All Packages <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
