"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PACKAGES } from "@/data/packages";
import { PackageCard } from "@/components/cards/PackageCard";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";
const IVORY = "#F5F0EA";

const PKG_FILTERS = ["All", "Spiritual", "Mountains"];

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

export function PackagesSection() {
  const [pkgFilter, setPkgFilter] = useState("All");

  const featuredPkgs = PACKAGES.filter((p) => FEATURED_SLUGS.includes(p.slug));

  const filteredPkgs =
    pkgFilter === "All"
      ? featuredPkgs
      : featuredPkgs.filter((p) => p.category === pkgFilter.toLowerCase());

  return (
    <div id="tours-section">
      {/* ── Packages Grid ── */}
      <section className="py-20 px-6 lg:px-12 relative overflow-hidden" style={{ background: "#162127" }}>
        {/* Ambient blobs */}
        <div className="ambient-blob-coffee" style={{ top: "15%", left: "-5%" }} />
        <div className="ambient-blob-brass" style={{ bottom: "10%", right: "-3%" }} />

        {/* Top glow divider */}
        <div className="glow-divider absolute top-0 inset-x-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <motion.p
                className="font-script text-2xl mb-1"
                style={{ color: BRASS }}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                Wander Beyond Ordinary
              </motion.p>
              <motion.h2
                className="font-display font-bold text-3xl md:text-4xl text-glow-gold"
                style={{ color: GOLD }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Explore Selected Journeys
              </motion.h2>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-px" style={{ background: `linear-gradient(to right, ${BRASS}, transparent)` }} />
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: BRASS, boxShadow: `0 0 6px ${BRASS}60` }} />
                <div className="w-8 h-px" style={{ background: `linear-gradient(to left, ${BRASS}, transparent)` }} />
              </div>
            </div>
            <Link
              href="/tours"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-accent tracking-widest px-5 py-2.5 rounded-sm transition-all duration-300 glass-panel hover-glow"
              style={{ color: GOLD }}
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>

          {/* Filter tabs — glass pills */}
          <div className="flex gap-2 flex-wrap mb-10 relative">
            {PKG_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setPkgFilter(f)}
                className="relative px-5 py-2 text-[10px] font-accent tracking-widest font-semibold rounded-full transition-all duration-300 cursor-pointer"
                style={
                  pkgFilter === f
                    ? {
                        background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
                        border: `1px solid ${BRASS}50`,
                        color: "#0C1519",
                        boxShadow: `0 0 15px ${GOLD}30`,
                      }
                    : {
                        background: "rgba(58,53,52,0.25)",
                        border: "1px solid rgba(207,157,123,0.18)",
                        color: "#D8CFC7",
                      }
                }
              >
                {pkgFilter === f && (
                  <motion.div
                    layoutId="pkg-filter-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: `linear-gradient(135deg, ${GOLD}, ${BRASS})` }}
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
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold font-accent tracking-widest rounded-sm text-xs transition-all duration-300 btn-glow"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`, color: "#0C1519" }}
            >
              Wander Beyond Ordinary <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
