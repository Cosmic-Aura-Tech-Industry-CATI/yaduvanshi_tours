"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ArrowRight, Calendar, Clock, MapPin, Compass } from "lucide-react";
import { geoMercator, geoPath } from "d3-geo";
import { TOURS_DATA } from "@/data/tours";

const BG_DEEP = "#0C1519";
const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";
const IVORY = "#F5F0EA";
const TEXT_SUB = "#D8CFC7";

const STATE_TO_DEST_ID: Record<string, string> = {
  "Rajasthan": "jaipur-tour",
  "Himachal Pradesh": "kullu-manali",
  "Jammu & Kashmir": "vaishno-devi",
  "Uttar Pradesh": "ayodhya-darshan",
  "Goa": "goa-tour",
  "Kerala": "kerala-tour",
  "Gujarat": "dwarka-somnath",
  "Uttarakhand": "haridwar-rishikesh",
  "Madhya Pradesh": "mahakal-omkareshwar",
  "Punjab": "amritsar-wagah",
  "Tamil Nadu": "rameshwaram-madurai",
  "Maharashtra": "mumbai-tour",
  "Ladakh": "leh-ladakh"
};

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

const TOUR_COORDS: Record<string, { lat: number; lon: number; season: string }> = {
  "ayodhya-darshan": { lat: 26.7925, lon: 82.1998, season: "Year-Round" },
  "mathura-vrindavan": { lat: 27.4924, lon: 77.6737, season: "Year-Round" },
  "chitrakoot-tour": { lat: 25.1764, lon: 80.8653, season: "Year-Round" },
  "khatu-shyam-ji": { lat: 27.3683, lon: 75.3999, season: "Year-Round" },
  "mahakal-omkareshwar": { lat: 23.1760, lon: 75.7885, season: "Year-Round" },
  "kashi-vishwanath": { lat: 25.3176, lon: 82.9739, season: "Year-Round" },
  "prayagraj-sangam": { lat: 25.4358, lon: 81.8463, season: "Year-Round" },
  "haridwar-rishikesh": { lat: 29.9457, lon: 78.1642, season: "Year-Round" },
  "nainital-tour": { lat: 29.3803, lon: 79.4636, season: "Mar–Nov" },
  "mussoorie-tour": { lat: 30.4598, lon: 78.0796, season: "Mar–Nov" },
  "neem-karoli-kainchi-dham": { lat: 29.4218, lon: 79.5168, season: "Year-Round" },
  "kullu-manali": { lat: 32.2396, lon: 77.1887, season: "Year-Round" },
  "shimla-tour": { lat: 31.1048, lon: 77.1734, season: "Year-Round" },
  "vaishno-devi": { lat: 32.9801, lon: 74.9310, season: "Year-Round" },
  "jaipur-tour": { lat: 26.9124, lon: 75.7873, season: "Oct–Mar" },
  "rajasthan-heritage": { lat: 24.5854, lon: 73.7125, season: "Oct–Mar" },
  "goa-tour": { lat: 15.4909, lon: 73.8278, season: "Nov–Feb" },
  "kerala-tour": { lat: 10.0889, lon: 77.0595, season: "Sep–Mar" },
  "amritsar-wagah": { lat: 31.6340, lon: 74.8723, season: "Oct–Mar" },
  "ujjain-indore": { lat: 22.7196, lon: 75.8577, season: "Oct–Mar" },
  "dwarka-somnath": { lat: 22.2442, lon: 68.9685, season: "Oct–Mar" },
  "rameshwaram-madurai": { lat: 9.2876, lon: 79.3129, season: "Oct–Mar" },
  "leh-ladakh": { lat: 34.1526, lon: 77.5770, season: "Jun–Sep" },
  "mumbai-tour": { lat: 19.0760, lon: 72.8777, season: "Oct–Mar" },
  "kashmir-paradise": { lat: 34.0837, lon: 74.7973, season: "Mar–Oct" },
  "char-dham-yatra": { lat: 30.7352, lon: 79.0669, season: "May–Nov" },
};

const DESTINATIONS: Destination[] = TOURS_DATA.map((t) => {
  const coords = TOUR_COORDS[t.slug] || { lat: 20.5937, lon: 78.9629, season: "Year-Round" };
  return {
    id: t.slug,
    name: t.name,
    lat: coords.lat,
    lon: coords.lon,
    desc: t.description,
    price: `Starting at ₹${t.startingPrice.toLocaleString('en-IN')}`,
    duration: `${t.durationDays} Days`,
    season: coords.season,
    image: t.image,
    slug: t.slug
  };
});

export function MapCtaSection() {
  const [geoData, setGeoData] = useState<any>(null);
  const [selectedId, setSelectedId] = useState<string>("ayodhya-darshan");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const containerRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(containerRef, { once: false, margin: "-80px" });

  const width = 600;
  const height = 700;

  const projection = useMemo(() => {
    return geoMercator()
      .center([78.9629, 22.5937])
      .scale(1080)
      .translate([width / 2, height / 2 + 10]);
  }, [width, height]);

  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection]);

  useEffect(() => {
    if (!isSectionInView && geoData) return;

    fetch("/india_state.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Error loading India GeoJSON map:", err));
  }, [isSectionInView]);

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
      {/* Ambient glow blobs */}
      <div className="ambient-blob-brass" style={{ top: "5%", right: "-5%" }} />
      <div className="ambient-blob-coffee" style={{ bottom: "10%", left: "-3%" }} />

      {/* Background dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: `radial-gradient(circle, ${BRASS} 1px, transparent 1px)`, backgroundSize: "32px 32px" }}
      />

      {/* Top glow divider */}
      <div className="glow-divider absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.p
            className="font-script text-xl md:text-2xl mb-2"
            style={{ color: BRASS }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Sacred Destinations
          </motion.p>
          <motion.h2
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide mb-4 text-glow-gold"
            style={{ color: GOLD }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Explore the Heart of India
          </motion.h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-10 h-px" style={{ background: `linear-gradient(to right, ${BRASS}, transparent)` }} />
            <div className="w-2 h-2 rotate-45" style={{ background: BRASS, boxShadow: `0 0 8px ${BRASS}60` }} />
            <div className="w-10 h-px" style={{ background: `linear-gradient(to left, ${BRASS}, transparent)` }} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ── Left Side: Interactive Map ── */}
          <div className="lg:col-span-7 flex justify-center relative">
            <div
              className="w-full max-w-[550px] p-6 rounded-2xl relative transition-shadow duration-500 glass-panel-strong"
            >
              {geoData ? (
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]">
                  {/* GeoJSON Map paths */}
                  <g>
                    {computedStatePaths.map((item: any, idx: number) => {
                      const destId = STATE_TO_DEST_ID[item.name];
                      const isSelectedState = destId && selectedId === destId;
                      const isHoveredState = destId && hoveredId === destId;
                      const isInteractive = !!destId;

                      return (
                        <path
                          key={idx}
                          d={item.path}
                          fill={
                            isSelectedState || isHoveredState
                              ? "rgba(232, 185, 106, 0.08)"
                              : "rgba(207, 157, 123, 0.025)"
                          }
                          stroke={isSelectedState || isHoveredState ? GOLD : BRASS}
                          strokeWidth={isSelectedState || isHoveredState ? 1.5 : 0.8}
                          className={`transition-all duration-300 ${
                            isInteractive
                              ? "cursor-pointer hover:fill-[rgba(232,185,106,0.12)]"
                              : ""
                          }`}
                          style={{
                            strokeOpacity: isSelectedState || isHoveredState ? 0.9 : 0.2,
                          }}
                          onClick={() => {
                            if (destId) {
                              setSelectedId(destId);
                            }
                          }}
                          onMouseEnter={() => {
                            if (destId) {
                              setHoveredId(destId);
                            }
                          }}
                          onMouseLeave={() => {
                            if (destId) {
                              setHoveredId(null);
                            }
                          }}
                        />
                      );
                    })}
                  </g>

                  {/* Destination Markers */}
                  {DESTINATIONS.map((d) => {
                    const coords = projection([d.lon, d.lat]);
                    if (!coords) return null;
                    const [cx, cy] = coords;
                    const isSelected = selectedId === d.id;
                    const isTransition = hoveredId === d.id;

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
                        {/* Outer hover ring */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={16}
                          fill="none"
                          stroke={BRASS}
                          strokeWidth={1.2}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />

                        {/* Pulsing indicator */}
                        {isSectionInView && (
                          <motion.circle
                            cx={cx}
                            cy={cy}
                            r={8}
                            fill="none"
                            stroke={BRASS}
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

                        {/* Central Pin */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isSelected ? 5.5 : 4}
                          fill={isSelected ? GOLD : BRASS}
                          className="transition-all duration-300"
                          style={{ filter: isSelected ? `drop-shadow(0 0 6px ${GOLD}80)` : "none" }}
                        />

                        {/* Name Label */}
                        <AnimatePresence>
                          {(isTransition || isSelected) && (
                            <g>
                              {(() => {
                                const labelWidth = Math.max(80, d.name.length * 6.5);
                                return (
                                  <>
                                    <rect
                                      x={cx - labelWidth / 2}
                                      y={cy - 28}
                                      width={labelWidth}
                                      height={18}
                                      rx={4}
                                      fill="rgba(12,21,25,0.92)"
                                      stroke={`${BRASS}40`}
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
                                  </>
                                );
                              })()}
                            </g>
                          )}
                        </AnimatePresence>
                      </g>
                    );
                  })}
                </svg>
              ) : (
                <div className="h-[450px] flex flex-col items-center justify-center gap-4 text-center">
                  <Compass className="animate-spin" size={32} style={{ color: `${BRASS}60` }} />
                  <span className="text-sm font-mono" style={{ color: TEXT_SUB }}>Loading geographic boundaries...</span>
                </div>
              )}

              {/* Compass decoration */}
              <div className="absolute bottom-5 right-5 opacity-20 pointer-events-none">
                <svg viewBox="0 0 50 50" className="w-12 h-12" fill="none" stroke={BRASS} strokeWidth="1">
                  <circle cx="25" cy="25" r="21" strokeDasharray="3 3" />
                  <path d="M25 4 L25 46 M4 25 L46 25" />
                  <polygon points="25,7 28,21 25,25 22,21" fill={BRASS} stroke="none" />
                  <text x="21.5" y="6" fill={BRASS} fontSize="7" fontFamily="monospace" fontWeight="bold">N</text>
                </svg>
              </div>
            </div>
          </div>

          {/* ── Right Side: Destination Detail Panel ── */}
          <div className="lg:col-span-5 h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDest.id}
                initial={{ opacity: 0, x: 22, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -22, scale: 0.98 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full glass-panel-strong corner-brackets"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden bg-black/40">
                  <img
                    src={activeDest.image}
                    alt={activeDest.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1519] via-transparent to-transparent" />
                  <div
                    className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold glass-panel"
                    style={{ color: GOLD }}
                  >
                    <Calendar size={11} /> {activeDest.season}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col gap-5 flex-1 justify-between">
                  <div className="space-y-3">
                    <span className="text-[9px] tracking-[0.2em] font-accent uppercase" style={{ color: BRASS }}>
                      Selected Package
                    </span>
                    <h3 className="font-display text-3xl font-bold tracking-wide text-glow-gold" style={{ color: GOLD }}>
                      {activeDest.name}
                    </h3>
                    <p className="text-sm font-sans leading-relaxed" style={{ color: TEXT_SUB }}>
                      {activeDest.desc}
                    </p>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b" style={{ borderColor: `${BRASS}15` }}>
                    <div className="flex items-center gap-2 font-sans">
                      <Clock size={16} style={{ color: BRASS }} />
                      <div>
                        <span className="block text-[9px] uppercase font-mono tracking-wider" style={{ color: TEXT_SUB }}>Duration</span>
                        <span className="block text-xs font-semibold" style={{ color: IVORY }}>{activeDest.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-sans">
                      <MapPin size={16} style={{ color: BRASS }} />
                      <div>
                        <span className="block text-[9px] uppercase font-mono tracking-wider" style={{ color: TEXT_SUB }}>Starts From</span>
                        <span className="block text-xs font-bold text-glow-gold" style={{ color: GOLD }}>{activeDest.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 font-accent tracking-widest text-[10px]">
                    <Link
                      href={`/tours/${activeDest.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 font-semibold rounded-sm transition-all duration-300 hover:brightness-110 btn-glow"
                      style={{ background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`, color: "#0C1519" }}
                    >
                      View Tour Package <ArrowRight size={13} />
                    </Link>
                    <Link
                      href={`/inquiry?package=${activeDest.slug}`}
                      className="inline-flex items-center justify-center py-3.5 px-6 font-semibold rounded-sm transition-all duration-300 glass-panel hover:bg-white/5"
                      style={{ color: IVORY }}
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
