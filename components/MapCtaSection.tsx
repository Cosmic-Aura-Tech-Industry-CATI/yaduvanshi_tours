"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ArrowRight, Calendar, Clock, MapPin, Compass } from "lucide-react";
import { geoMercator, geoPath } from "d3-geo";

// Style tokens
const BG_DEEP = "#0d1a12";
const GOLD = "#d4af37";
const GOLD_SOFT = "#e8c766";
const TEXT_MAIN = "#f2ede0";
const TEXT_SUB = "#9db3a3";

interface Destination {
  id: string;
  name: string;
  lat: number;
  lon: number;
  desc: string;
  price: string;
  duration: string;
  season: string;
  image: string;
  slug: string;
}

const DESTINATIONS: Destination[] = [
  {
    id: "gulmarg",
    name: "Gulmarg",
    lat: 34.05,
    lon: 74.38,
    desc: "Snow paradise of Kashmir. Ultimate winter wonderland of majestic alpine landscapes and world-class skiing.",
    price: "₹40,000",
    duration: "10 Days",
    season: "Oct–Apr",
    image: "/tours/vaishno-devi-kashmir.webp",
    slug: "vaishno-devi-kashmir"
  },
  {
    id: "manali",
    name: "Manali",
    lat: 32.24,
    lon: 77.19,
    desc: "Alpine valleys, pristine rivers & adventure peaks in Himachal Pradesh. Perfect for nature lovers.",
    price: "₹32,000",
    duration: "6 Days",
    season: "May–Oct",
    image: "/tours/kullu-manali.webp",
    slug: "kullu-manali"
  },
  {
    id: "jaipur",
    name: "Jaipur",
    lat: 26.91,
    lon: 75.78,
    desc: "The Pink City. Experience grand royal heritage, majestic palaces, historical astronomy forts, and bazaars.",
    price: "₹18,000",
    duration: "3 Days",
    season: "Oct–Mar",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=400&fit=crop&q=80",
    slug: "tours"
  },
  {
    id: "agra",
    name: "Agra",
    lat: 27.18,
    lon: 78.02,
    desc: "Home to the world-renowned Taj Mahal. Explore the epic monuments of the Mughal Empire along the Yamuna.",
    price: "₹9,500",
    duration: "2 Days",
    season: "Oct–Mar",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop&q=80",
    slug: "tours"
  },
  {
    id: "varanasi",
    name: "Varanasi",
    lat: 25.32,
    lon: 82.97,
    desc: "One of the oldest living cities. Witness the spectacular evening Ganga Aarti and spiritual ghats.",
    price: "₹10,500",
    duration: "2 Days",
    season: "Oct–Mar",
    image: "/tours/kashi-vishwanath.webp",
    slug: "kashi-vishwanath"
  },
  {
    id: "goa",
    name: "Goa",
    lat: 15.30,
    lon: 74.00,
    desc: "Sun, sand, and beautiful beaches. A perfect coastal retreat blending Portuguese heritage and vibrant shorelines.",
    price: "₹15,000",
    duration: "4 Days",
    season: "Nov–Feb",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop&q=80",
    slug: "tours"
  },
  {
    id: "munnar",
    name: "Munnar",
    lat: 10.09,
    lon: 77.06,
    desc: "Lush tea plantations, misty mountains, and winding trails in Kerala's green Western Ghats.",
    price: "₹22,000",
    duration: "5 Days",
    season: "Sep–Mar",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&h=400&fit=crop&q=80",
    slug: "tours"
  },
  {
    id: "kutch",
    name: "Rann of Kutch",
    lat: 23.73,
    lon: 69.86,
    desc: "Vast white salt desert. Best experienced during moonlit winter nights when the landscape glows.",
    price: "₹12,500",
    duration: "3 Days",
    season: "Nov–Feb",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&h=400&fit=crop&q=80",
    slug: "tours"
  }
];

export function MapCtaSection() {
  const [geoData, setGeoData] = useState<any>(null);
  const [selectedId, setSelectedId] = useState<string>("gulmarg");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const containerRef = useRef<HTMLElement>(null);
  // Viewport tracking to only animate and load when visible, saving system resources
  const isSectionInView = useInView(containerRef, { once: false, margin: "-80px" });

  const width = 600;
  const height = 700;

  // d3-geo projection configuration
  const projection = useMemo(() => {
    return geoMercator()
      .center([78.9629, 22.5937])
      .scale(1080)
      .translate([width / 2, height / 2 + 10]);
  }, [width, height]);

  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection]);

  useEffect(() => {
    // Only load dataset when section is in or close to viewport
    if (!isSectionInView && geoData) return;

    fetch("/india_state.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Error loading India GeoJSON map:", err));
  }, [isSectionInView]);

  // Memoize path generation so it's calculated ONCE on data mount, not per hover or re-render tick
  const computedStatePaths = useMemo(() => {
    if (!geoData) return [];
    return geoData.features.map((feature: any, idx: number) => {
      const path = pathGenerator(feature);
      return {
        path,
        name: feature.properties?.name || `State ${idx}`
      };
    }).filter((f: any) => f.path);
  }, [geoData, pathGenerator]);

  const activeDest = useMemo(() => {
    return DESTINATIONS.find((d) => d.id === selectedId) || DESTINATIONS[0];
  }, [selectedId]);

  return (
    <section 
      ref={containerRef}
      className="py-24 px-6 lg:px-12 relative overflow-hidden"
      style={{ background: BG_DEEP }}
    >
      {/* Background ambient lighting */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: `radial-gradient(circle, ${GOLD} 1px, transparent 1px)`, backgroundSize: "32px 32px" }}
      />
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${GOLD}08, transparent 70%)` }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.p 
            className="font-serif italic text-xl md:text-2xl mb-2"
            style={{ color: GOLD }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Sacred Destinations
          </motion.p>
          <motion.h2 
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide mb-4"
            style={{ color: TEXT_MAIN }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Explore the Heart of India
          </motion.h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-10 h-px" style={{ background: GOLD }} />
            <div className="w-2 h-2 rotate-45" style={{ background: GOLD }} />
            <div className="w-10 h-px" style={{ background: GOLD }} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ── Left Side: Interactive Map ── */}
          <div className="lg:col-span-7 flex justify-center relative">
            <div 
              className="w-full max-w-[550px] p-6 rounded-2xl border relative transition-shadow duration-500"
              style={{ 
                background: "rgba(13,26,18,0.6)", 
                borderColor: "rgba(212,175,55,0.12)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(212,175,55,0.02)"
              }}
            >
              {geoData ? (
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]">
                  {/* GeoJSON Map paths */}
                  <g>
                    {computedStatePaths.map((item: any, idx: number) => (
                      <path
                        key={idx}
                        d={item.path}
                        fill="rgba(212, 175, 55, 0.025)"
                        stroke={GOLD}
                        strokeWidth={0.8}
                        className="transition-all duration-300 hover:fill-[rgba(212,175,55,0.08)]"
                        style={{
                          strokeOpacity: 0.22,
                        }}
                      />
                    ))}
                  </g>

                  {/* Geographically accurate Destination Markers */}
                  {DESTINATIONS.map((d) => {
                    const coords = projection([d.lon, d.lat]);
                    if (!coords) return null;
                    const [cx, cy] = coords;
                    const isSelected = selectedId === d.id;
                    const isHovered = hoveredId === d.id;

                    return (
                      <g 
                        key={d.id}
                        onClick={() => setSelectedId(d.id)}
                        onMouseEnter={() => setHoveredId(d.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="cursor-pointer group focus:outline-none"
                        tabIndex={0}
                        aria-label={`Select ${d.name} destination`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setSelectedId(d.id);
                          }
                        }}
                      >
                        {/* Outer hover ring indicator */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={16}
                          fill="none"
                          stroke={GOLD}
                          strokeWidth={1.2}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />

                        {/* Pulsing indicator loop using transform scale/opacity (GPU-accelerated, will-change optimized) */}
                        {isSectionInView && (
                          <motion.circle
                            cx={cx}
                            cy={cy}
                            r={8}
                            fill="none"
                            stroke={GOLD}
                            strokeWidth={1.2}
                            style={{ 
                              transformOrigin: `${cx}px ${cy}px`,
                              willChange: "transform, opacity"
                            }}
                            animate={{
                              scale: isSelected ? [1, 2.2, 1] : [1, 1.8, 1],
                              opacity: isSelected ? [0.8, 0, 0.8] : [0.4, 0, 0.4],
                            }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                          />
                        )}

                        {/* Central Pin Point */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isSelected ? 5.5 : 4}
                          fill={isSelected ? GOLD_SOFT : GOLD}
                          className="transition-all duration-300"
                        />

                        {/* Hover Name Label */}
                        <AnimatePresence>
                          {(isHovered || isSelected) && (
                            <g>
                              <rect
                                x={cx - 40}
                                y={cy - 28}
                                width={80}
                                height={18}
                                rx={4}
                                fill="rgba(13,26,18,0.92)"
                                stroke="rgba(212,175,55,0.3)"
                                strokeWidth={1}
                              />
                              <text
                                x={cx}
                                y={cy - 15}
                                textAnchor="middle"
                                fontSize="9.5"
                                fontWeight="700"
                                fontFamily="sans-serif"
                                fill={GOLD}
                              >
                                {d.name}
                              </text>
                            </g>
                          )}
                        </AnimatePresence>
                      </g>
                    );
                  })}
                </svg>
              ) : (
                <div className="h-[450px] flex flex-col items-center justify-center gap-4 text-center">
                  <Compass className="animate-spin text-amber-500/50" size={32} />
                  <span className="text-sm font-mono" style={{ color: TEXT_SUB }}>Loading geographic boundaries...</span>
                </div>
              )}

              {/* Compass symbol decoration */}
              <div className="absolute bottom-5 right-5 opacity-25 pointer-events-none">
                <svg viewBox="0 0 50 50" className="w-12 h-12" fill="none" stroke={GOLD} strokeWidth="1">
                  <circle cx="25" cy="25" r="21" strokeDasharray="3 3" />
                  <path d="M25 4 L25 46 M4 25 L46 25" />
                  <polygon points="25,7 28,21 25,25 22,21" fill={GOLD} stroke="none" />
                  <text x="21.5" y="6" fill={GOLD} fontSize="7" fontFamily="monospace" fontWeight="bold">N</text>
                </svg>
              </div>
            </div>
          </div>

          {/* ── Right Side: Destination Detail Side Panel ── */}
          <div className="lg:col-span-5 h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDest.id}
                initial={{ opacity: 0, x: 22, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -22, scale: 0.98 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full border"
                style={{ 
                  background: "rgba(13,26,18,0.7)", 
                  borderColor: "rgba(212,175,55,0.12)",
                  backdropFilter: "blur(12px)"
                }}
              >
                {/* Visual Image container */}
                <div className="relative h-60 overflow-hidden bg-black/40">
                  <img
                    src={activeDest.image}
                    alt={activeDest.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a12] via-transparent to-transparent" />
                  <div 
                    className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md"
                    style={{ background: "rgba(13,26,18,0.65)", color: GOLD, border: `1px solid rgba(212,175,55,0.25)` }}
                  >
                    <Calendar size={11} /> {activeDest.season}
                  </div>
                </div>

                {/* Content Panel */}
                <div className="p-6 md:p-8 flex flex-col gap-5 flex-1 justify-between">
                  <div className="space-y-3">
                    <span className="text-[10px] tracking-[0.2em] font-mono uppercase" style={{ color: GOLD }}>
                      Selected Package
                    </span>
                    <h3 className="font-serif text-3xl font-bold tracking-wide" style={{ color: TEXT_MAIN }}>
                      {activeDest.name}
                    </h3>
                    <p className="text-sm font-sans leading-relaxed" style={{ color: TEXT_SUB }}>
                      {activeDest.desc}
                    </p>
                  </div>

                  {/* Specs & Pricing */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b" style={{ borderColor: "rgba(212,175,55,0.12)" }}>
                    <div className="flex items-center gap-2">
                      <Clock size={16} style={{ color: GOLD }} />
                      <div>
                        <span className="block text-[9px] uppercase font-mono tracking-wider" style={{ color: TEXT_SUB }}>Duration</span>
                        <span className="block text-xs font-semibold" style={{ color: TEXT_MAIN }}>{activeDest.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} style={{ color: GOLD }} />
                      <div>
                        <span className="block text-[9px] uppercase font-mono tracking-wider" style={{ color: TEXT_SUB }}>Starts From</span>
                        <span className="block text-xs font-bold" style={{ color: GOLD }}>{activeDest.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/tours/${activeDest.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 font-semibold text-xs rounded-sm transition-all duration-300"
                      style={{ background: GOLD, color: BG_DEEP }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = GOLD_SOFT)}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = GOLD)}
                    >
                      View Tour Package <ArrowRight size={13} />
                    </Link>
                    <Link
                      href={`/inquiry?package=${activeDest.slug}`}
                      className="inline-flex items-center justify-center py-3 px-6 text-xs font-semibold border rounded-sm transition-all duration-300"
                      style={{ borderColor: "rgba(212,175,55,0.3)", color: TEXT_MAIN }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.06)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      Plan Trip
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
