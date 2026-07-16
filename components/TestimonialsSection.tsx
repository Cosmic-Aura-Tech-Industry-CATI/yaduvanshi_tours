"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { REVIEWS } from "@/data/reviews";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";
const DARKER = "#131F14";

const AVATAR_URL = (id: string) =>
  `https://images.unsplash.com/${id}?w=80&h=80&fit=crop&auto=format&q=80`;

/* Duplicate reviews once for seamless infinite looping */
const ROW_ITEMS = [...REVIEWS, ...REVIEWS];

/* ── Card ──────────────────────────────────────────────────────── */
function TestiCard({ review }: { review: (typeof REVIEWS)[0] }) {
  return (
    <div
      className="flex-shrink-0 w-72 sm:w-80 rounded-2xl p-5 flex flex-col justify-between gap-4 mx-3 select-none transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1.5px solid ${GOLD}15`,
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex flex-col gap-3">
        {/* Quote & Stars */}
        <div className="flex items-center justify-between">
          <Quote size={20} style={{ color: `${GOLD}60` }} className="flex-shrink-0" />
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
          className="text-[#f2ede0]/80 text-xs sm:text-[13px] leading-relaxed font-sans line-clamp-4"
          style={{ fontFamily: "sans-serif" }}
        >
          &ldquo;{review.quote}&rdquo;
        </p>
      </div>

      <div>
        {/* Divider */}
        <div className="h-px w-full mb-3" style={{ background: `linear-gradient(to right, ${GOLD}25, transparent)` }} />

        {/* Author details */}
        <div className="flex items-center gap-3">
          <img
            src={AVATAR_URL(review.avatarId)}
            alt={review.name}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
            style={{ border: `1.5px solid ${GOLD}30` }}
          />
          <div className="min-w-0">
            <div className="text-white text-xs font-semibold font-display truncate">{review.name}</div>
            <div className="text-[#9db3a3] text-[10px] font-mono truncate">{review.location}</div>
          </div>
          <div
            className="ml-auto text-[9px] font-mono px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: `${GOLD}18`, color: GOLD }}
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
      style={{ background: DARKER }}
    >
      {/* Top section divider ornament */}
      <div 
        className="absolute top-0 inset-x-0 h-px" 
        style={{ background: `linear-gradient(to right, transparent, ${GOLD}18, transparent)` }} 
      />

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 text-center">
        <motion.p
          className="font-script text-2xl mb-2"
          style={{ color: GOLD }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          What Our Guests Say
        </motion.p>
        <motion.h2
          className="font-serif text-3xl md:text-4xl font-bold text-white tracking-wide"
          style={{ fontFamily: "Georgia, serif" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Stories from the Road
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
          <span className="text-[#9db3a3] text-xs font-mono">4.9 / 5 · 500+ happy travellers</span>
        </motion.div>
      </div>

      {/* Single-line Marquee container */}
      <div
        className="relative py-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ 
          // Edge fading gradient mask
          maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
        }}
      >
        <div
          className="flex marquee-track"
          style={{
            // Slow, constant right-to-left marquee animation
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

      {/* Bottom stats row */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-8 md:gap-14 mt-16 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        {[
          { num: "500+", label: "Happy Travellers" },
          { num: "4.9★", label: "Average Rating" },
          { num: "15+", label: "Years Experience" },
          { num: "100%", label: "Verified Reviews" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-serif font-bold text-2xl md:text-3xl text-white" style={{ fontFamily: "Georgia, serif" }}>{s.num}</div>
            <div className="text-[#9db3a3] text-[10px] md:text-xs font-mono mt-0.5 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
