"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { REVIEWS } from "@/data/reviews";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";
const IVORY = "#F5F0EA";

const AVATAR_URL = (id: string) =>
  `https://images.unsplash.com/${id}?w=80&h=80&fit=crop&auto=format&q=80`;

/* Duplicate reviews once for seamless infinite looping */
const ROW_ITEMS = [...REVIEWS, ...REVIEWS];

/* ── Card ──────────────────────────────────────────────────────── */
function TestiCard({ review }: { review: (typeof REVIEWS)[0] }) {
  return (
    <div
      className="flex-shrink-0 w-72 sm:w-80 rounded-2xl p-5 flex flex-col justify-between gap-4 mx-3 select-none transition-all duration-300 glass-panel hover-glow border border-[#CF9D7B]/15 hover:border-[#CF9D7B]/40"
      style={{
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <div className="flex flex-col gap-3">
        {/* Quote & Stars */}
        <div className="flex items-center justify-between">
          <Quote
            size={20}
            className="flex-shrink-0"
            style={{ color: BRASS, filter: `drop-shadow(0 0 6px rgba(207,157,123,0.4))` }}
          />
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < review.rating ? "fill-current" : "opacity-20"}
                style={{ color: GOLD }}
              />
            ))}
          </div>
        </div>

        {/* Quote text */}
        <p
          className="text-[#D8CFC7]/85 text-xs sm:text-[13px] leading-relaxed font-sans line-clamp-4"
        >
          &ldquo;{review.quote}&rdquo;
        </p>
      </div>

      <div>
        {/* Divider — glow gradient */}
        <div
          className="h-px w-full mb-3"
          style={{ background: `linear-gradient(to right, ${BRASS}30, ${COFFEE}20, transparent)` }}
        />

        {/* Author details */}
        <div className="flex items-center gap-3">
          <img
            src={AVATAR_URL(review.avatarId)}
            alt={review.name}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
            style={{
              border: `2px solid transparent`,
              backgroundImage: `linear-gradient(#0C1519, #0C1519), linear-gradient(135deg, ${BRASS}, ${COFFEE})`,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              boxShadow: `0 0 10px rgba(207,157,123,0.25)`,
            }}
          />
          <div className="min-w-0">
            <div className="text-white text-xs font-semibold font-display truncate">{review.name}</div>
            <div className="text-[#D8CFC7]/40 text-[10px] font-mono truncate">{review.location}</div>
          </div>
          <div
            className="ml-auto text-[8px] font-accent tracking-widest px-2 py-0.5 rounded-full flex-shrink-0 glass-panel"
            style={{ color: GOLD }}
          >
            {(review.packageOrVehicle || "Tour").split(" ").slice(0, 2).join(" ")}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────────── */
export function TestimonialsSection() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      className="py-24 overflow-hidden relative"
      style={{ background: "#0C1519" }}
    >
      {/* Ambient blobs */}
      <div className="ambient-blob-brass" style={{ top: "-100px", left: "30%" }} />
      <div className="ambient-blob-coffee" style={{ bottom: "-80px", right: "20%" }} />

      {/* Top glow divider */}
      <div className="glow-divider absolute top-0 inset-x-0" />

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 text-center relative z-10">
        <motion.p
          className="font-script text-2xl mb-2"
          style={{ color: BRASS }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Where Every Journey Becomes Legend
        </motion.p>
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-glow-gold tracking-wide"
          style={{ color: GOLD }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Memorable Travel Stories
        </motion.h2>
        <motion.div
          className="flex items-center justify-center gap-2 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} className="fill-current" style={{ color: GOLD }} />
            ))}
          </div>
          <span className="text-[#D8CFC7]/50 text-xs font-mono">4.9 / 5 · 10,000+ guest stories</span>
        </motion.div>
      </div>

      {/* Single-line Marquee container */}
      <div
        className="relative py-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
        }}
      >
        <div
          className="flex marquee-track"
          style={{
            animation: `marquee-ltr 45s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
            width: "max-content"
          }}
        >
          {ROW_ITEMS.map((rev, i) => (
            <TestiCard key={`${rev.id}-${i}`} review={rev} />
          ))}
        </div>
      </div>

      {/* View More button */}
      <div className="text-center mt-10 relative z-10">
        <Link
          href="/about#reviews"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold font-accent tracking-widest border border-[#CF9D7B]/30 hover:border-[#E8B96A] text-[#E8B96A] transition-all hover:bg-white/5 hover:shadow-[0_0_15px_rgba(232,185,106,0.15)]"
        >
          VIEW MORE REVIEWS
        </Link>
      </div>

      {/* Bottom stats row */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-8 md:gap-14 mt-16 px-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        {[
          { num: "10,000+", label: "Happy Travellers" },
          { num: "4.9★", label: "Average Rating" },
          { num: "15+", label: "Years Experience" },
          { num: "100%", label: "Verified Reviews" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display font-bold text-2xl md:text-3xl text-glow-gold" style={{ color: GOLD }}>{s.num}</div>
            <div className="text-[#D8CFC7]/40 text-[10px] md:text-xs font-mono mt-0.5 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
