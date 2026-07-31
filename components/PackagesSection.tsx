"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  "neem-karoli-baba",
  "mahakal-omkareshwar",
  "char-dham-yatra",
];

export function PackagesSection() {
  const [pkgFilter, setPkgFilter] = useState("All");

  const featuredPkgs = FEATURED_SLUGS.map((slug) =>
    PACKAGES.find((p) => p.slug === slug)
  ).filter(Boolean) as typeof PACKAGES;

  const filteredPkgs =
    pkgFilter === "All"
      ? featuredPkgs
      : featuredPkgs.filter((p) => p.category === pkgFilter.toLowerCase());

  return (
    <div id="tours-section">
      {/* ── Hero Header with Full-Bleed Background Image ── */}
      <section className="relative pt-28 sm:pt-32 md:pt-40 pb-10 md:pb-14 min-h-[300px] sm:min-h-[340px] md:min-h-[440px] flex flex-col justify-end px-6 lg:px-12 overflow-hidden z-10" style={{ background: "#162127" }}>
        {/* Full-Bleed Background Image */}
        <Image
          src="/tours/Copilot_20260719_213737.webp"
          alt="Popular Tour Packages Hero Background"
          fill
          sizes="100vw"
          className="object-cover z-0"
        />
        
        {/* Dark theme gradient overlay for contrast and readability */}
        <div 
          className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-[#162127]"
        />

        {/* Ambient blobs */}
        <div className="ambient-blob-coffee z-20" style={{ top: "15%", left: "-5%" }} />
        <div className="ambient-blob-brass z-20" style={{ bottom: "10%", right: "-3%" }} />

        {/* Top glow divider */}
        <div className="glow-divider absolute top-0 inset-x-0 z-20" />

        <div className="max-w-7xl mx-auto relative z-30">
          {/* Header */}
          <div className="mb-10">
            <motion.p
              className="font-script text-2xl sm:text-3xl md:text-4xl mb-1"
              style={{ color: BRASS }}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Wander Beyond Ordinary
            </motion.p>
            <motion.h2
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-glow-gold"
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

          {/* Filter tabs — glass pills */}
          <div className="flex gap-2 flex-wrap relative">
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
        </div>
      </section>

      {/* ── Packages Grid (Immediate transition below hero header) ── */}
      <section className="pb-20 pt-10 px-6 lg:px-12 relative overflow-hidden" style={{ background: "#162127" }}>
        {/* Ambient blobs */}
        <div className="ambient-blob-coffee" style={{ top: "15%", left: "-5%" }} />
        <div className="ambient-blob-brass" style={{ bottom: "10%", right: "-3%" }} />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
