"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { DESTINATIONS } from "@/data/destinations";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";
const DARKER = "#131F14";

const IMG = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

const HERO_SCENES = [
  {
    img: "photo-1524492412937-b28074a5d7da",
    label: "Rajasthan",
    kenBurns: {
      initial: { scale: 1.0, x: "0%", y: "0%" },
      animate: { scale: 1.10, x: "-3%", y: "-2%" },
    },
    grade: "linear-gradient(160deg,rgba(180,120,30,0.25) 0%,rgba(0,0,0,0) 60%)",
  },
  {
    img: "photo-1602216056096-3b40cc0c9944",
    label: "Kerala",
    kenBurns: {
      initial: { scale: 1.08, x: "2%", y: "2%" },
      animate: { scale: 1.0, x: "0%", y: "-1%" },
    },
    grade: "linear-gradient(180deg,rgba(10,40,20,0.30) 0%,rgba(0,0,0,0) 55%)",
  },
  {
    img: "photo-1506905925346-21bda4d32df4",
    label: "Himalayas",
    kenBurns: {
      initial: { scale: 1.0, x: "0%", y: "1%" },
      animate: { scale: 1.10, x: "0%", y: "-2%" },
    },
    grade: "linear-gradient(200deg,rgba(10,20,60,0.28) 0%,rgba(0,0,0,0) 55%)",
  },
];

const SCENE_DURATION = 6000;
const FADE_DURATION = 1500;

const DEST_THUMBS = DESTINATIONS.slice(0, 5);

const AVATAR_IDS = [
  "photo-1494790108755-2616b612b786",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1438761681033-6461ffad8d80",
];

const TRUST_BADGES = [
  { emoji: "🏷️", text: "Best Price Guarantee" },
  { emoji: "👥", text: "10,000+ Happy Travelers" },
  { emoji: "🕐", text: "24/7 Customer Support" },
  { emoji: "✨", text: "Customised Tours" },
];

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

export function Hero() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [activeThumb, setActiveThumb] = useState(0);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, 160]);

  useEffect(() => {
    const t = setInterval(() => setSceneIdx((p) => (p + 1) % HERO_SCENES.length), SCENE_DURATION);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveThumb((p) => (p + 1) % DEST_THUMBS.length), 3200);
    return () => clearInterval(t);
  }, []);

  const line1 = ["Explore", "Incredible"];
  const line2 = ["India", "with", "Us"];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        {HERO_SCENES.map((scene, i) => (
          <motion.div
            key={scene.label}
            className="absolute inset-0"
            animate={{ opacity: i === sceneIdx ? 1 : 0 }}
            transition={{ duration: FADE_DURATION / 1000, ease: "easeInOut" }}
            style={{ zIndex: i === sceneIdx ? 2 : 1 }}
          >
            <motion.div
              className="absolute inset-0"
              initial={scene.kenBurns.initial}
              animate={i === sceneIdx ? scene.kenBurns.animate : scene.kenBurns.initial}
              transition={{ duration: SCENE_DURATION / 1000, ease: "linear" }}
            >
              <img
                src={IMG(scene.img, 1920, 1080)}
                alt={scene.label}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0" style={{ background: scene.grade }} />
          </motion.div>
        ))}
        <div
          className="absolute inset-0 z-[3]"
          style={{
            background:
              "linear-gradient(to bottom,rgba(0,0,0,0.48) 0%,rgba(0,0,0,0.08) 38%,rgba(0,0,0,0.72) 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-[3]"
          style={{
            background:
              "linear-gradient(to right,rgba(0,0,0,0.62) 0%,rgba(0,0,0,0.18) 55%,transparent 100%)",
          }}
        />
        {/* Scene indicator */}
        <div className="absolute bottom-24 left-8 z-10 hidden lg:flex items-center gap-2">
          {HERO_SCENES.map((s, i) => (
            <motion.div
              key={s.label}
              animate={{
                width: i === sceneIdx ? 32 : 6,
                opacity: i === sceneIdx ? 1 : 0.38,
              }}
              transition={{ duration: 0.4 }}
              className="h-[2px] rounded-full"
              style={{ background: GOLD }}
            />
          ))}
          <motion.span
            key={sceneIdx}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[10px] tracking-[0.18em] uppercase font-mono ml-1"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {HERO_SCENES[sceneIdx].label}
          </motion.span>
        </div>
      </motion.div>

      {/* Thumbnail rail */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col gap-3">
        {DEST_THUMBS.map((d, i) => (
          <motion.button
            key={d.name}
            onClick={() => setActiveThumb(i)}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.12 }}
            className="rounded-full overflow-hidden flex-shrink-0"
            style={{
              width: 56,
              height: 56,
              border: `2px solid ${i === activeThumb ? GOLD : "rgba(255,255,255,0.25)"}`,
              transform: i === activeThumb ? "scale(1.12)" : "scale(1)",
              transition: "all 0.3s",
            }}
          >
            <img src={IMG(d.image, 60, 60)} alt={d.name} className="w-full h-full object-cover" />
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-32 w-full">
        <motion.p
          className="font-script text-2xl mb-1"
          style={{ color: GOLD }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Explore, Dream, Discover.
        </motion.p>
        <h1 className="font-display font-bold leading-[1.05] mt-2 mb-4">
          <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white">
            {line1.map((w, i) => (
              <motion.span
                key={w}
                className="inline-block mr-[0.2em]"
                initial={{ opacity: 0, y: 32, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.7 }}
              >
                {w}
              </motion.span>
            ))}
          </div>
          <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl" style={{ color: GOLD }}>
            {line2.map((w, i) => (
              <motion.span
                key={w}
                className="inline-block mr-[0.2em]"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.41 + i * 0.08, duration: 0.7 }}
              >
                {w}
              </motion.span>
            ))}
          </div>
        </h1>
        <motion.p
          className="text-white/70 text-base md:text-lg leading-relaxed max-w-md mb-8"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
        >
          Unforgettable journeys through India's most iconic destinations. Luxury, comfort &amp;
          memories — all in one trip.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Link
            href="/tours"
            className="flex items-center justify-center gap-2 px-7 py-3.5 font-semibold rounded-sm text-sm hover:brightness-90 active:scale-[0.96] transition-all"
            style={{ background: GOLD, color: DARK }}
          >
            Discover Packages <ArrowRight size={15} />
          </Link>
          <Link
            href="/inquiry"
            className="flex items-center justify-center gap-2 px-7 py-3.5 border border-white/35 text-white text-sm rounded-sm hover:border-white/65 hover:bg-white/10 active:scale-[0.96] transition-all"
          >
            <Play size={13} className="fill-current" /> Plan My Trip
          </Link>
        </motion.div>
        <motion.div
          className="flex flex-wrap gap-5 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25, duration: 0.7 }}
        >
          {TRUST_BADGES.map((b) => (
            <div key={b.text} className="flex items-center gap-2">
              <span className="text-base">{b.emoji}</span>
              <span className="text-white/75 text-xs font-medium">{b.text}</span>
            </div>
          ))}
        </motion.div>
        <motion.div
          className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex -space-x-2">
            {AVATAR_IDS.map((src, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white/40 overflow-hidden">
                <img src={IMG(src, 40, 40)} alt="Traveler" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div>
            <div className="text-white font-bold text-sm font-mono">
              <CountUp to={10000} suffix="+" />
            </div>
            <div className="text-white/55 text-xs">Happy Travelers</div>
          </div>
        </motion.div>
      </div>
      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.7 }}
      >
        <motion.div
          className="w-px h-10 mx-auto bg-gradient-to-b from-white/50 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          style={{ originY: "top" }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>
      {/* Wave divider */}
      <div className="absolute bottom-0 inset-x-0 z-20">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <motion.path
            fill="#FAFAF8"
            animate={{
              d: [
                "M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z",
                "M0,46 C360,74 1080,6 1440,34 L1440,80 L0,80 Z",
                "M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </section>
  );
}
