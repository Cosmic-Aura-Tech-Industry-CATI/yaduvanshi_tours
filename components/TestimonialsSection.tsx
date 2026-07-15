"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { REVIEWS } from "@/data/reviews";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";
const DARKER = "#131F14";

const AVATAR_URL = (id: string) =>
  `https://images.unsplash.com/${id}?w=80&h=80&fit=crop&auto=format&q=80`;

/* Duplicate for seamless looping */
const ROW_A = [...REVIEWS, ...REVIEWS];
const ROW_B = [...REVIEWS.slice(4), ...REVIEWS.slice(0, 4), ...REVIEWS.slice(4), ...REVIEWS.slice(0, 4)];

/* ── Card ──────────────────────────────────────────────────────── */
function TestiCard({ review }: { review: (typeof REVIEWS)[0] }) {
  return (
    <div
      className="flex-shrink-0 w-72 sm:w-80 rounded-2xl p-5 flex flex-col gap-4 mx-3 select-none"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${GOLD}20`,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Quote icon */}
      <Quote size={22} style={{ color: `${GOLD}70` }} className="-mb-1 flex-shrink-0" />

      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={i < review.rating ? "fill-current" : "opacity-20"}
            style={{ color: GOLD }}
          />
        ))}
      </div>

      {/* Quote text */}
      <p className="text-white/72 text-xs leading-relaxed font-sans line-clamp-4 flex-1">
        &ldquo;{review.quote}&rdquo;
      </p>

      {/* Divider */}
      <div className="h-px" style={{ background: `linear-gradient(to right, ${GOLD}30, transparent)` }} />

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={AVATAR_URL(review.avatarId)}
          alt={review.name}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          style={{ border: `1.5px solid ${GOLD}40` }}
        />
        <div className="min-w-0">
          <div className="text-white text-xs font-semibold font-display truncate">{review.name}</div>
          <div className="text-white/40 text-[10px] font-mono truncate">{review.location}</div>
        </div>
        <div
          className="ml-auto text-[9px] font-mono px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ background: `${GOLD}18`, color: GOLD }}
        >
          {(review.packageOrVehicle || "Tour").split(" ").slice(0, 2).join(" ")}
        </div>
      </div>
    </div>
  );
}

/* ── Marquee Row ───────────────────────────────────────────────── */
function MarqueeRow({
  reviews,
  direction = 1,
  speed = 35,
}: {
  reviews: (typeof REVIEWS);
  direction?: 1 | -1;
  speed?: number;
}) {
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  /* Measure half-width for seamless reset */
  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.scrollWidth / 2);
    }
  }, []);

  const duration = trackWidth > 0 ? trackWidth / speed : 60;

  return (
    <div
      className="overflow-hidden w-full py-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        ref={trackRef}
        className="flex"
        animate={{ x: direction === 1 ? [-trackWidth, 0] : [0, -trackWidth] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration,
          ease: "linear",
        }}
        style={{ animationPlayState: paused ? "paused" : "running" }}
        /* Framer Motion doesn't use animationPlayState directly — pause via animate */
        {...(paused && { animate: { x: direction === 1 ? [-trackWidth, 0] : [0, -trackWidth] } })}
      >
        {reviews.map((rev, i) => (
          <TestiCard key={`${rev.id}-${i}`} review={rev} />
        ))}
      </motion.div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────────── */
export function TestimonialsSection() {
  const [paused, setPaused] = useState(false);

  /* Animate rows via CSS for smoother performance */
  return (
    <section
      className="py-20 overflow-hidden"
      style={{ background: DARKER }}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 text-center">
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
          className="font-display text-3xl md:text-4xl font-bold text-white"
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
              <Star key={i} size={14} className="fill-current" style={{ color: GOLD }} />
            ))}
          </div>
          <span className="text-white/50 text-xs font-mono">4.9 / 5 · 500+ happy travellers</span>
        </motion.div>
      </div>

      {/* Row 1 — scrolls right to left */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
      >
        <div
          className="flex"
          style={{
            animation: `marquee-ltr ${ROW_A.length * 4.5}s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {ROW_A.map((rev, i) => (
            <TestiCard key={`a-${rev.id}-${i}`} review={rev} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls left to right (reversed) */}
      <div
        className="relative mt-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
      >
        <div
          className="flex"
          style={{
            animation: `marquee-rtl ${ROW_B.length * 4.5}s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {ROW_B.map((rev, i) => (
            <TestiCard key={`b-${rev.id}-${i}`} review={rev} />
          ))}
        </div>
      </div>

      {/* Bottom stat badges */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-8 mt-14 px-6"
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
            <div className="font-display font-bold text-2xl text-white">{s.num}</div>
            <div className="text-white/40 text-xs font-mono mt-0.5">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
