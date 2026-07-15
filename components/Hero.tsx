"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { DESTINATIONS } from "@/data/destinations";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";

const IMG = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

const DEST_THUMBS = DESTINATIONS.slice(0, 5);

const AVATAR_IDS = [
  "photo-1494790108755-2616b612b786",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1438761681033-6461ffad8d80",
];

const TRUST_STATS = [
  { value: "10,000+", label: "Happy Travelers", emoji: "✈️" },
  { value: "40+", label: "Destinations", emoji: "🗺️" },
  { value: "15+", label: "Years Experience", emoji: "🏆" },
  { value: "24/7", label: "Support", emoji: "🛡️" },
];


function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          let cur = 0;
          const step = to / 60;
          const t = setInterval(() => {
            cur = Math.min(cur + step, to);
            setVal(Math.floor(cur));
            if (cur >= to) clearInterval(t);
          }, 20);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function Hero() {
  const [activeThumb, setActiveThumb] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  interface Particle {
    id: number;
    size: number;
    x: number;
    y: number;
    duration: number;
    delay: number;
    opacity: number;
  }
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setParticles(
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1.5,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.35 + 0.1,
      }))
    );
  }, []);


  const { scrollY } = useScroll();
  const rawBgY = useTransform(scrollY, [0, 800], [0, 180]);
  const bgY = useSpring(rawBgY, { stiffness: 80, damping: 25 });
  const contentY = useTransform(scrollY, [0, 600], [0, 60]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const mouseX = useSpring(0, { stiffness: 60, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 60, damping: 20 });
  const taglineX = useTransform(mouseX, (v) => v * -1.5);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    mouseX.set(((e.clientX - rect.left - cx) / cx) * 10);
    mouseY.set(((e.clientY - rect.top - cy) / cy) * 6);
    setMouse({
      x: (e.clientX - rect.left - cx) / cx,
      y: (e.clientY - rect.top - cy) / cy,
    });
  }, [mouseX, mouseY]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove as EventListener);
    return () => el.removeEventListener("mousemove", handleMouseMove as EventListener);
  }, [handleMouseMove]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const fn = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (prefersReducedMotion) video.pause();
    else video.play().catch(() => {});
  }, [prefersReducedMotion]);

  useEffect(() => {
    const t = setInterval(() => setActiveThumb((p) => (p + 1) % DEST_THUMBS.length), 3200);
    return () => clearInterval(t);
  }, []);

  const line1 = ["Explore", "Incredible"];
  const line2 = ["India", "with", "Us"];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden select-none">

      {/* ── Video + parallax bg ── */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <video
          ref={videoRef}
          autoPlay={!prefersReducedMotion}
          muted loop playsInline preload="auto"
          poster="/images/hero-poster.webp"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 z-[2]"
          style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.05) 35%,rgba(0,0,0,0.75) 100%)" }} />
        <div className="absolute inset-0 z-[2]"
          style={{ background: "linear-gradient(to right,rgba(0,0,0,0.68) 0%,rgba(0,0,0,0.15) 60%,transparent 100%)" }} />

        {/* Ambient gold glow — bottom left */}
        <div className="absolute bottom-0 left-0 z-[3] pointer-events-none"
          style={{ width: 600, height: 400, background: `radial-gradient(ellipse at bottom left, ${GOLD}18, transparent 70%)` }} />
      </motion.div>

      {/* ── Floating Particles ── */}
      {mounted && !prefersReducedMotion && particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none z-[4]"
          style={{
            width: p.size, height: p.size,
            left: `${p.x}%`, top: `${p.y}%`,
            background: GOLD, opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, mouse.x * 6, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ── Destination Thumbnails Rail (right side) ── */}
      <div className="absolute right-5 xl:right-8 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col gap-3">
        {DEST_THUMBS.map((d, i) => (
          <motion.button
            key={d.name}
            onClick={() => setActiveThumb(i)}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 + i * 0.1 }}
            whileHover={{ scale: 1.12 }}
            className="relative rounded-full overflow-hidden flex-shrink-0 cursor-pointer"
            style={{
              width: 52, height: 52,
              border: `2.5px solid ${i === activeThumb ? GOLD : "rgba(255,255,255,0.22)"}`,
              boxShadow: i === activeThumb ? `0 0 16px ${GOLD}60` : "none",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
          >
            <img src={IMG(d.image, 60, 60)} alt={d.name} className="w-full h-full object-cover" />
            {i === activeThumb && (
              <div className="absolute inset-0 rounded-full"
                style={{ background: `${GOLD}22` }} />
            )}
          </motion.button>
        ))}
      </div>

      {/* ── Main Content ── */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pt-40 pb-36 w-full"
        style={{ y: contentY, opacity }}
      >
        {/* Script tagline */}
        <motion.p
          className="font-script text-2xl md:text-3xl mb-2 drop-shadow-sm"
          style={{ color: GOLD, x: taglineX }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explore, Dream, Discover.
        </motion.p>

        {/* Headline */}
        <h1 className="font-display font-bold leading-[1.04] mt-2 mb-5">
          <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-[5.2rem] text-white drop-shadow-lg">
            {line1.map((w, i) => (
              <motion.span
                key={w}
                className="inline-block mr-[0.2em]"
                initial={{ opacity: 0, y: 38, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.28 + i * 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            ))}
          </div>
          <div
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[5.2rem] drop-shadow-lg"
            style={{ color: GOLD }}
          >
            {line2.map((w, i) => (
              <motion.span
                key={w}
                className="inline-block mr-[0.2em]"
                initial={{ opacity: 0, y: 38, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.52 + i * 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            ))}
          </div>
        </h1>

        {/* Subheading */}
        <motion.p
          className="text-white/70 text-base md:text-lg leading-relaxed max-w-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.65 }}
        >
          Unforgettable journeys through India&apos;s most iconic destinations — luxury, comfort &amp; memories crafted just for you.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-10"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <Link
            href="/tours"
            className="group relative flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-sm text-sm overflow-hidden transition-all duration-300"
            style={{ background: GOLD, color: DARK }}
          >
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 rounded-sm" />
            <span className="relative flex items-center gap-2">
              Explore Packages
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={15} />
              </motion.span>
            </span>
          </Link>

          <Link
            href="/inquiry"
            className="group flex items-center justify-center gap-2 px-8 py-4 border text-white text-sm rounded-sm transition-all duration-300 hover:bg-white/10"
            style={{ borderColor: "rgba(255,255,255,0.35)" }}
          >
            <Play size={13} className="fill-current" />
            Plan My Trip
          </Link>
        </motion.div>

        {/* Trust Stats — floating glass pills */}
        <motion.div
          className="flex flex-wrap gap-3 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 0.8 }}
        >
          {TRUST_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1 }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl backdrop-blur-md"
              style={{
                background: "rgba(255,255,255,0.09)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <span className="text-sm">{s.emoji}</span>
              <div>
                <div className="text-white font-bold text-sm leading-none font-mono">{s.value}</div>
                <div className="text-white/50 text-[10px] mt-0.5">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social proof pill */}
        <motion.div
          className="inline-flex items-center gap-3 rounded-xl px-4 py-3 backdrop-blur-md"
          style={{
            background: "rgba(255,255,255,0.09)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.7, type: "spring", stiffness: 200 }}
        >
          <div className="flex -space-x-2.5">
            {AVATAR_IDS.map((src, i) => (
              <div key={i} className="w-9 h-9 rounded-full border-2 border-white/40 overflow-hidden">
                <img src={IMG(src, 44, 44)} alt="Traveler" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div>
            <div className="text-white font-bold text-sm font-mono">10,000+</div>
            <div className="text-white/50 text-xs">Happy Travelers</div>
          </div>
          <div className="flex gap-0.5 ml-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3 h-3 fill-amber-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <span className="text-white/35 text-[9px] tracking-[0.25em] uppercase font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-white/40" />
        </motion.div>
        <motion.div
          style={{ height: 32, originY: "top", width: 1, background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>

      {/* ── Wave divider ── */}
      <div className="absolute bottom-0 inset-x-0 z-20">
        <svg viewBox="0 0 1440 72" className="w-full" preserveAspectRatio="none">
          <motion.path
            fill="#1A2B1C"
            animate={{
              d: [
                "M0,36 C360,72 1080,0 1440,36 L1440,72 L0,72 Z",
                "M0,42 C360,68 1080,4 1440,30 L1440,72 L0,72 Z",
                "M0,36 C360,72 1080,0 1440,36 L1440,72 L0,72 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </section>
  );
}
