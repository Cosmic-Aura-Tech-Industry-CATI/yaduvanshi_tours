"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";
const DARKER = "#131F14";

/* ─── Destinations ─────────────────────────────────────────────── */
interface Dest {
  id: string;
  name: string;
  desc: string;
  price: string;
  duration: string;
  season: string;
  /* svg-space coords (0–1000 × 0–1200 viewBox) */
  cx: number;
  cy: number;
  slug: string;
}

const DESTINATIONS: Dest[] = [
  { id: "gulmarg",   name: "Gulmarg",       desc: "Snow paradise of Kashmir",         price: "₹40,000",   duration: "10 Days", season: "Oct–Apr",    cx: 270, cy:  90, slug: "vaishno-devi-kashmir"       },
  { id: "manali",    name: "Kullu Manali",  desc: "Alpine valleys & adventure peaks", price: "₹32,000",   duration: "6 Days",  season: "May–Oct",    cx: 370, cy: 160, slug: "kullu-manali"                },
  { id: "chardham",  name: "Kedarnath",     desc: "Sacred Himalayan Jyotirlinga",     price: "₹1,40,000", duration: "10 Days", season: "May–Jun",    cx: 450, cy: 210, slug: "char-dham-yatra"             },
  { id: "kainchi",   name: "Kainchi Dham",  desc: "Neem Karoli Baba's divine ashram", price: "₹11,500",  duration: "3 Days",  season: "Year-round", cx: 485, cy: 270, slug: "neem-karoli-kainchi-dham"    },
  { id: "mathura",   name: "Mathura",       desc: "Birthplace of Lord Krishna",       price: "₹11,000",   duration: "2 Days",  season: "Oct–Mar",    cx: 430, cy: 380, slug: "mathura-vrindavan"            },
  { id: "ayodhya",   name: "Ayodhya",       desc: "Ram Janmabhoomi — sacred city",   price: "₹5,500",    duration: "2 Days",  season: "Year-round", cx: 550, cy: 390, slug: "ayodhya-darshan"              },
  { id: "varanasi",  name: "Varanasi",      desc: "Ganga Aarti & ancient ghats",     price: "₹10,500",   duration: "2 Days",  season: "Oct–Mar",    cx: 590, cy: 440, slug: "kashi-vishwanath"             },
  { id: "ujjain",    name: "Ujjain",        desc: "Mahakal Jyotirlinga & Simhasth",  price: "₹20,000",   duration: "3 Days",  season: "Oct–Mar",    cx: 340, cy: 500, slug: "mahakal-omkareshwar"          },
  { id: "jaipur",    name: "Jaipur",        desc: "Pink City — palaces & forts",     price: "₹18,000",   duration: "3 Days",  season: "Oct–Mar",    cx: 295, cy: 400, slug: "tours"                        },
];

/* Travel connections */
const PATHS = [
  [270,90,  370,160],
  [370,160, 450,210],
  [450,210, 485,270],
  [485,270, 430,380],
  [430,380, 295,400],
  [430,380, 550,390],
  [550,390, 590,440],
  [295,400, 340,500],
];

/* ─── Simplified India SVG path (geographic outline) ────────────── */
/* Covers roughly the shape of India with major state borders hinted */
const INDIA_PATH = `
  M 280 20
  C 300 15, 340 10, 380 18
  C 420 25, 470 22, 510 35
  C 550 48, 580 40, 620 55
  C 660 70, 700 80, 720 110
  C 740 140, 730 165, 720 185
  C 710 205, 700 215, 695 240
  C 690 265, 700 280, 695 300
  C 690 320, 680 330, 672 345
  C 665 360, 668 375, 660 390
  C 652 405, 642 415, 635 430
  C 628 445, 630 465, 622 480
  C 614 495, 600 505, 590 520
  C 580 535, 575 550, 565 565
  C 555 580, 545 590, 535 605
  C 525 620, 515 635, 505 648
  C 495 660, 480 672, 465 682
  C 450 692, 440 700, 430 712
  C 420 724, 415 735, 408 745
  C 400 755, 390 762, 380 770
  C 370 778, 360 783, 350 790
  C 340 797, 335 805, 325 812
  C 315 818, 308 825, 300 835
  C 295 842, 296 850, 292 858
  C 288 866, 282 870, 278 876
  C 274 882, 272 892, 268 900
  C 264 908, 258 915, 255 922
  C 252 929, 250 940, 248 950
  C 245 958, 240 964, 236 970
  C 232 976, 228 985, 224 992
  C 220 998, 218 1006, 215 1012
  C 212 1018, 210 1025, 208 1032
  C 206 1038, 205 1050, 203 1058
  C 202 1066, 200 1075, 198 1082
  L 195 1090
  C 193 1095, 188 1098, 185 1100
  C 182 1102, 178 1100, 175 1098
  C 170 1095, 168 1090, 164 1085
  C 160 1080, 155 1075, 152 1068
  C 148 1060, 146 1050, 142 1042
  C 138 1034, 132 1028, 128 1020
  L 120 1002
  C 116 994, 115 985, 112 976
  C 108 968, 104 962, 100 952
  C 96 942, 92 932, 88 920
  C 84 910, 82 902, 80 893
  C 78 884, 78 875, 76 865
  C 74 855, 70 848, 66 840
  C 62 832, 58 826, 52 820
  C 46 814, 40 810, 35 804
  C 30 798, 25 790, 22 782
  C 18 774, 16 764, 14 754
  C 12 744, 10 735, 10 725
  C 10 715, 12 706, 12 696
  C 12 686, 10 678, 10 668
  C 10 658, 12 648, 14 638
  C 16 628, 20 618, 24 610
  C 28 602, 34 595, 38 586
  C 42 578, 44 570, 46 562
  C 48 552, 50 542, 52 532
  C 54 522, 55 512, 56 502
  C 57 492, 56 484, 54 474
  C 52 465, 50 458, 48 448
  C 46 440, 46 432, 44 422
  C 42 412, 38 404, 36 394
  C 34 384, 35 374, 36 364
  C 38 354, 40 344, 44 336
  C 48 328, 52 320, 56 312
  C 60 304, 62 295, 66 285
  C 70 275, 74 268, 78 258
  C 82 248, 85 240, 88 230
  C 90 220, 88 212, 88 202
  C 88 192, 90 182, 90 172
  C 90 162, 88 154, 88 144
  C 88 134, 90 124, 92 114
  C 94 104, 100 96, 105 88
  C 110 80, 118 72, 126 66
  C 134 60, 144 55, 154 50
  C 164 45, 176 42, 188 38
  C 200 34, 214 30, 228 26
  C 242 22, 262 20, 280 20 Z
`;

/* NE states cluster */
const NE_PATH = `
  M 760 180
  C 775 170, 800 165, 820 172
  C 840 178, 855 192, 860 208
  C 865 224, 858 240, 848 252
  C 838 264, 822 272, 808 278
  C 795 284, 780 285, 768 278
  C 756 272, 748 260, 744 246
  C 740 232, 742 216, 748 202
  C 754 188, 742 190, 760 180 Z
`;

/* ─── Component ─────────────────────────────────────────────────── */
export function MapCtaSection() {
  const [activeId, setActiveId] = useState<string>("ayodhya");
  const [cycleIdx, setCycleIdx] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mapRef, { once: true });

  /* Auto-cycle through destinations every 4 seconds */
  useEffect(() => {
    const t = setInterval(() => {
      setCycleIdx(p => {
        const next = (p + 1) % DESTINATIONS.length;
        setActiveId(DESTINATIONS[next].id);
        return next;
      });
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const activeDest = DESTINATIONS.find(d => d.id === activeId) ?? DESTINATIONS[0];

  return (
    <section
      ref={mapRef}
      className="py-20 px-6 lg:px-12 relative overflow-hidden"
      style={{ background: DARKER }}
    >
      {/* Dot grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{ backgroundImage: `radial-gradient(circle, ${GOLD}50 1px, transparent 1px)`, backgroundSize: "28px 28px" }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: CTA ────────────────────────────────────── */}
          <div>
            <motion.p className="font-script text-2xl mb-2" style={{ color: GOLD }}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Your Journey Awaits
            </motion.p>
            <motion.h2
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-1 mb-5 leading-tight"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}>
              Start Your Sacred Journey Today
            </motion.h2>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-px" style={{ background: GOLD }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ background: GOLD }} />
              <div className="w-8 h-px" style={{ background: GOLD }} />
            </div>

            {/* Active destination card — auto cycles */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDest.id}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl p-4 mb-6 flex items-center gap-4"
                style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${GOLD}35`, backdropFilter: "blur(8px)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl"
                  style={{ background: `${GOLD}20`, border: `2px solid ${GOLD}50` }}>
                  📍
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm font-display">{activeDest.name}</div>
                  <div className="text-white/50 text-xs mt-0.5 font-mono truncate">{activeDest.desc}</div>
                  <div className="flex gap-3 mt-1.5">
                    <span className="text-[11px] font-mono font-bold" style={{ color: GOLD }}>{activeDest.price}</span>
                    <span className="text-[11px] font-mono text-white/40">{activeDest.duration}</span>
                    <span className="text-[11px] font-mono text-white/30">{activeDest.season}</span>
                  </div>
                </div>
                <Link href={`/tours/${activeDest.slug}`}
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-110"
                  style={{ background: GOLD, color: DARK }}>
                  <ArrowRight size={13} />
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="flex gap-1.5 mb-8">
              {DESTINATIONS.map((d, i) => (
                <button key={d.id} onClick={() => { setActiveId(d.id); setCycleIdx(i); }}
                  className="h-1 rounded-full transition-all duration-300 cursor-pointer"
                  style={{ width: activeId === d.id ? 24 : 6, background: activeId === d.id ? GOLD : "rgba(255,255,255,0.2)" }}
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/tours"
                className="flex items-center justify-center gap-2 px-7 py-4 font-semibold rounded-sm text-sm transition-all hover:brightness-90"
                style={{ background: GOLD, color: DARK }}>
                Explore Packages <ArrowRight size={15} />
              </Link>
              <Link href="/inquiry"
                className="flex items-center justify-center gap-2 px-7 py-4 border text-white text-sm rounded-sm transition-all"
                style={{ borderColor: "rgba(255,255,255,0.22)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}>
                Plan My Trip
              </Link>
            </div>
          </div>

          {/* ── Right: India Map ───────────────────────────── */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden relative"
              style={{ background: `linear-gradient(135deg, rgba(26,43,28,0.96), rgba(19,31,20,0.98))`,
                border: `1px solid ${GOLD}22`, boxShadow: `0 0 40px ${GOLD}0E` }}>

              <svg viewBox="-40 0 1000 1160" className="w-full max-h-[520px]" style={{ display: "block" }}>
                {/* Glow filter */}
                <defs>
                  <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <radialGradient id="mapGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={`${GOLD}18`} />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>

                {/* India mainland fill */}
                <path
                  d={INDIA_PATH}
                  fill="url(#mapGrad)"
                  stroke={`${GOLD}45`}
                  strokeWidth="2"
                  strokeLinejoin="round"
                />

                {/* NE states */}
                <path
                  d={NE_PATH}
                  fill={`${GOLD}10`}
                  stroke={`${GOLD}35`}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {/* Animated travel paths */}
                {PATHS.map(([x1,y1,x2,y2], i) => (
                  <motion.line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={`${GOLD}55`}
                    strokeWidth="1.5"
                    strokeDasharray="5 6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.5, delay: i * 0.15 + 0.3, ease: "easeInOut" }}
                  />
                ))}

                {/* Destination pins */}
                {DESTINATIONS.map((d) => {
                  const isActive = activeId === d.id;
                  return (
                    <g key={d.id} style={{ cursor: "pointer" }} onClick={() => setActiveId(d.id)}>
                      {/* Outer pulse */}
                      <motion.circle
                        cx={d.cx} cy={d.cy} r={16}
                        fill="none"
                        stroke={GOLD}
                        strokeWidth="1.5"
                        animate={{ r: [14, 24, 14], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: DESTINATIONS.indexOf(d) * 0.28 }}
                      />
                      {/* Inner pin */}
                      <motion.circle
                        cx={d.cx} cy={d.cy}
                        r={isActive ? 7 : 5}
                        fill={isActive ? GOLD : `${GOLD}80`}
                        style={{ filter: isActive ? `drop-shadow(0 0 6px ${GOLD})` : "none" }}
                        animate={{ scale: isActive ? 1.2 : 1 }}
                        transition={{ duration: 0.2 }}
                      />
                      {/* Label (only shown for active) */}
                      {isActive && (
                        <motion.text
                          x={d.cx}
                          y={d.cy - 14}
                          textAnchor="middle"
                          fontSize="10"
                          fontWeight="700"
                          fontFamily="sans-serif"
                          fill={GOLD}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {d.name}
                        </motion.text>
                      )}
                    </g>
                  );
                })}

                {/* Map title */}
                <text x="470" y="1140" textAnchor="middle" fontSize="10" fill={`${GOLD}40`}
                  fontFamily="monospace" letterSpacing="2">INDIA</text>
              </svg>

              {/* Compass rose */}
              <div className="absolute top-3 right-3 opacity-30 pointer-events-none">
                <svg viewBox="0 0 50 50" className="w-10 h-10" fill="none" stroke={GOLD} strokeWidth="1">
                  <circle cx="25" cy="25" r="20" strokeDasharray="2 3" />
                  <path d="M25 5 L25 45 M5 25 L45 25" />
                  <polygon points="25,8 27,22 25,25 23,22" fill={GOLD} stroke="none" />
                  <text x="22" y="7" fill={GOLD} fontSize="6" fontFamily="monospace">N</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
