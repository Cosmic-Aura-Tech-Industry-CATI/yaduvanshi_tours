"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ArrowRight, Calendar, Clock, MapPin, Compass } from "lucide-react";
import { geoMercator, geoPath } from "d3-geo";
import { TOURS_DATA } from "@/data/tours";

const BG_DEEP = "#0C1519";
const BRASS = "#CF9D7B";
const GOLD = "#E8B96A";
const IVORY = "#F5F0EA";
const TEXT_SUB = "#D8CFC7";

// 10 Exact Featured Destination Pins mapped to real tour packages
interface FeaturedPin {
  id: string; // package slug
  stateName: string;
  label: string;
  lat: number;
  lon: number;
  season: string;
}

const FEATURED_10_PINS: FeaturedPin[] = [
  {
    id: "ayodhya-darshan",
    stateName: "Uttar Pradesh",
    label: "Uttar Pradesh (Ayodhya)",
    lat: 26.7925,
    lon: 82.1998,
    season: "Year-Round",
  },
  {
    id: "kashi-vishwanath",
    stateName: "Uttar Pradesh",
    label: "Uttar Pradesh (Varanasi)",
    lat: 25.3176,
    lon: 82.9739,
    season: "Year-Round",
  },
  {
    id: "char-dham-yatra",
    stateName: "Uttarakhand",
    label: "Uttarakhand",
    lat: 30.7352,
    lon: 79.0669,
    season: "May–Nov",
  },
  {
    id: "kullu-manali",
    stateName: "Himachal Pradesh",
    label: "Himachal Pradesh",
    lat: 32.2396,
    lon: 77.1887,
    season: "Year-Round",
  },
  {
    id: "kashmir-paradise",
    stateName: "Jammu & Kashmir",
    label: "Jammu & Kashmir",
    lat: 34.0837,
    lon: 74.7973,
    season: "Mar–Oct",
  },
  {
    id: "rajasthan-heritage",
    stateName: "Rajasthan",
    label: "Rajasthan",
    lat: 26.9124,
    lon: 75.7873,
    season: "Oct–Mar",
  },
  {
    id: "mahakal-omkareshwar",
    stateName: "Madhya Pradesh",
    label: "Madhya Pradesh",
    lat: 23.1760,
    lon: 75.7885,
    season: "Oct–Mar",
  },
  {
    id: "dwarka-somnath",
    stateName: "Gujarat",
    label: "Gujarat",
    lat: 22.2442,
    lon: 68.9685,
    season: "Oct–Mar",
  },
  {
    id: "kerala-tour",
    stateName: "Kerala",
    label: "Kerala",
    lat: 10.0889,
    lon: 77.0595,
    season: "Sep–Mar",
  },
  {
    id: "goa-tour",
    stateName: "Goa",
    label: "Goa",
    lat: 15.4909,
    lon: 73.8278,
    season: "Nov–Feb",
  },
];

// Map 10 Pins to real Tour Packages data
const PINS_DATA = FEATURED_10_PINS.map((pin) => {
  const tour = TOURS_DATA.find((t) => t.slug === pin.id) || TOURS_DATA[0];
  return {
    ...pin,
    name: tour.name,
    desc: tour.description,
    price: `Starting at ₹${tour.startingPrice.toLocaleString("en-IN")}`,
    duration: `${tour.durationDays} Days`,
    image: tour.image,
    slug: tour.slug,
  };
});

const getLabelOffset = (id: string, labelWidth: number) => {
  switch (id) {
    case "rajasthan-heritage":
      return { xOffset: -labelWidth - 12, yOffset: -8 };
    case "mahakal-omkareshwar":
      return { xOffset: -labelWidth - 12, yOffset: -8 };
    case "dwarka-somnath":
      return { xOffset: -labelWidth - 12, yOffset: -8 };
    case "ayodhya-darshan":
      return { xOffset: 12, yOffset: -12 };
    case "kashi-vishwanath":
      return { xOffset: 12, yOffset: 4 };
    default:
      return { xOffset: 12, yOffset: -8 };
  }
};

export function MapCtaSection() {
  const [geoData, setGeoData] = useState<any>(null);
  const [selectedId, setSelectedId] = useState<string>("ayodhya-darshan");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(containerRef, { once: false, margin: "-80px" });

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

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
  }, [isSectionInView, geoData]);

  const computedStatePaths = useMemo(() => {
    if (!geoData) return [];
    return geoData.features
      .map((feature: any, idx: number) => {
        const path = pathGenerator(feature);
        return {
          path,
          name: feature.properties?.name || `State ${idx}`,
        };
      })
      .filter((f: any) => f.path);
  }, [geoData, pathGenerator]);

  const activeDest = useMemo(() => {
    return PINS_DATA.find((d) => d.id === selectedId) || PINS_DATA[0];
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
        style={{
          backgroundImage: `radial-gradient(circle, ${BRASS} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
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
            <div
              className="w-10 h-px"
              style={{ background: `linear-gradient(to right, ${BRASS}, transparent)` }}
            />
            <div
              className="w-2 h-2 rotate-45"
              style={{ background: BRASS, boxShadow: `0 0 8px ${BRASS}60` }}
            />
            <div
              className="w-10 h-px"
              style={{ background: `linear-gradient(to left, ${BRASS}, transparent)` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ── Left Side: Simplified Clean India Outline Map ── */}
          <div className="lg:col-span-7 flex justify-center relative">
            <div
              className="w-full max-w-[550px] p-6 rounded-2xl relative transition-shadow duration-500 glass-panel-strong"
              style={{
                border: `2px solid ${GOLD}70`,
                boxShadow: `0 0 0 1px ${GOLD}20, 0 0 24px 4px ${GOLD}25, 0 0 60px 8px ${GOLD}10`,
              }}
            >
              {geoData ? (
                <svg
                  viewBox={`0 0 ${width} ${height}`}
                  className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]"
                >
                  {/* Clean India Map Silhouette (No internal state border lines) */}
                  <g>
                    {computedStatePaths.map((item: any, idx: number) => {
                      const matchingPin = PINS_DATA.find(
                        (p) => p.stateName.toLowerCase() === item.name.toLowerCase()
                      );
                      const isSelectedState = matchingPin && selectedId === matchingPin.id;
                      const isHoveredState = matchingPin && hoveredId === matchingPin.id;

                      return (
                        <path
                          key={idx}
                          d={item.path}
                          fill={
                            isSelectedState || isHoveredState
                              ? "rgba(232, 185, 106, 0.16)"
                              : "rgba(207, 157, 123, 0.05)"
                          }
                          stroke="none"
                          className="transition-all duration-300"
                        />
                      );
                    })}
                  </g>

                  {/* Outer Silhouette Accent Stroke */}
                  <g filter="drop-shadow(0 0 6px rgba(232, 185, 106, 0.4))">
                    {computedStatePaths.map((item: any, idx: number) => (
                      <path
                        key={`outer-${idx}`}
                        d={item.path}
                        fill="none"
                        stroke={GOLD}
                        strokeWidth={0.7}
                        strokeOpacity={0.35}
                        strokeLinejoin="round"
                        className="pointer-events-none"
                      />
                    ))}
                  </g>

                  {/* Exactly 10 Labeled Destination Pins */}
                  {PINS_DATA.map((d) => {
                    const coords = projection([d.lon, d.lat]);
                    if (!coords) return null;
                    const [cx, cy] = coords;
                    const isSelected = selectedId === d.id;
                    const isHovered = hoveredId === d.id;

                    return (
                      <g
                        key={d.id}
                        onClick={() => setSelectedId(d.id)}
                        onMouseEnter={() => {
                          setHoveredId(d.id);
                          if (!isTouchDevice) setSelectedId(d.id);
                        }}
                        onMouseLeave={() => setHoveredId(null)}
                        className="cursor-pointer group focus:outline-none"
                        tabIndex={0}
                        aria-label={`Select ${d.label}`}
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
                          r={18}
                          fill="none"
                          stroke={GOLD}
                          strokeWidth={1.2}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />

                        {/* Pulsing indicator */}
                        {isSectionInView && (
                          <motion.circle
                            cx={cx}
                            cy={cy}
                            r={9}
                            fill="none"
                            stroke={GOLD}
                            strokeWidth={1.4}
                            style={{
                              transformOrigin: `${cx}px ${cy}px`,
                              willChange: "transform, opacity",
                            }}
                            animate={{
                              scale: isSelected ? [1, 2.2, 1] : [1, 1.7, 1],
                              opacity: isSelected ? [0.9, 0, 0.9] : [0.5, 0, 0.5],
                            }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                          />
                        )}

                        {/* Central Pin */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isSelected ? 6 : 4.5}
                          fill={isSelected ? GOLD : BRASS}
                          className="transition-all duration-300"
                          style={{
                            filter: isSelected
                              ? `drop-shadow(0 0 8px ${GOLD})`
                              : `drop-shadow(0 0 3px ${BRASS}80)`,
                          }}
                        />

                        {/* Clean Label right next to pin */}
                        <g className="transition-all duration-300">
                          {(() => {
                            const labelText = d.label;
                            const labelWidth = Math.max(90, labelText.length * 6.2);
                            const { xOffset, yOffset } = getLabelOffset(d.id, labelWidth);
                            const lx = cx + xOffset;
                            const ly = cy + yOffset;
                            return (
                              <g>
                                <rect
                                  x={lx}
                                  y={ly}
                                  width={labelWidth}
                                  height={18}
                                  rx={4}
                                  fill={
                                    isSelected || isHovered
                                      ? "rgba(12,21,25,0.95)"
                                      : "rgba(12,21,25,0.85)"
                                  }
                                  stroke={isSelected || isHovered ? GOLD : `${BRASS}50`}
                                  strokeWidth={isSelected || isHovered ? 1.2 : 0.8}
                                  className="transition-colors duration-300"
                                />
                                <text
                                  x={lx + labelWidth / 2}
                                  y={ly + 12}
                                  textAnchor="middle"
                                  fontSize="9"
                                  fontWeight="700"
                                  fontFamily="sans-serif"
                                  fill={isSelected || isHovered ? GOLD : IVORY}
                                  className="transition-colors duration-300"
                                >
                                  {labelText}
                                </text>
                              </g>
                            );
                          })()}
                        </g>
                      </g>
                    );
                  })}

                  {/* ── Kanpur, UP Office Pin Marker (Combined Spacing/Overlaps Fix) ── */}
                  {(() => {
                    const coords = projection([80.3319, 26.4499]); // Kanpur, UP coordinates
                    if (!coords) return null;
                    const [cx, cy] = coords;
                    const mapsUrl = "https://maps.app.goo.gl/CbiQsrW5uPdcPUE59";
                    const lx = 120;
                    const ly = 240;
                    const labelWidth = 220;
                    const labelHeight = 18;
                    return (
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer group focus:outline-none"
                        aria-label="Open office location in Google Maps"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            window.open(mapsUrl, "_blank", "noopener,noreferrer");
                          }
                        }}
                      >
                        {/* Outer pulsing glow indicator - larger for prominence */}
                        {isSectionInView && (
                          <motion.circle
                            cx={cx}
                            cy={cy}
                            r={28}
                            fill="none"
                            stroke={GOLD}
                            strokeWidth={2}
                            style={{
                              transformOrigin: `${cx}px ${cy}px`,
                              willChange: "transform, opacity",
                            }}
                            animate={{
                              scale: [0.8, 1.8, 0.8],
                              opacity: [0.7, 0, 0.7],
                            }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                          />
                        )}

                        {/* Stylized Location Pin Icon (📍 shape) - larger and with stronger shadow */}
                        <g transform={`translate(${cx}, ${cy})`}>
                          {/* Shadow ellipse */}
                          <ellipse cx="0" cy="2" rx="6" ry="1.8" fill="black" opacity="0.5" />
                          
                          {/* Pin path (larger pin shape) */}
                          <path
                            d="M0 -24 C-6 -24 -11 -19 -11 -13 C-11 -5.5 0 0 0 0 C0 0 11 -5.5 11 -13 C11 -19 6 -24 0 -24 Z M0 -10.5 C-1.8 -10.5 -3.2 -11.9 -3.2 -13.7 C-3.2 -15.5 -1.8 -16.9 0 -16.9 C1.8 -16.9 3.2 -15.5 3.2 -13.7 C3.2 -11.9 1.8 -10.5 0 -10.5 Z"
                            fill={GOLD}
                            stroke="#0C1519"
                            strokeWidth={1.2}
                            className="transition-all duration-300 group-hover:scale-110 group-hover:fill-[#FFF5E6]"
                            style={{
                              transformOrigin: "0px 0px",
                              filter: "drop-shadow(0 3px 6px rgba(232, 185, 106, 0.7))",
                            }}
                          />
                        </g>

                        {/* Dashed diagonal leader line pointing to the label */}
                        <line
                          x1={cx}
                          y1={cy}
                          x2={lx + labelWidth}
                          y2={ly + labelHeight / 2}
                          stroke={GOLD}
                          strokeWidth={1}
                          strokeDasharray="2 2"
                          className="opacity-75 transition-all duration-300 group-hover:stroke-white group-hover:opacity-100"
                        />

                        {/* Office Label - moved outside the map graphic as a callout box */}
                        <g className="transition-all duration-300">
                          {(() => {
                            const labelText = "RAMADEVI CHAURAHA, KANPUR, UP — OUR OFFICE";
                            return (
                              <g>
                                <rect
                                  x={lx}
                                  y={ly}
                                  width={labelWidth}
                                  height={labelHeight}
                                  rx={4}
                                  fill="rgba(12,21,25,0.95)"
                                  stroke={GOLD}
                                  strokeWidth={1.6}
                                  className="transition-colors duration-300 group-hover:bg-[#162127]"
                                />
                                <text
                                  x={lx + labelWidth / 2}
                                  y={ly + 12}
                                  textAnchor="middle"
                                  fontSize="9"
                                  fontWeight="800"
                                  fontFamily="sans-serif"
                                  fill={GOLD}
                                  className="transition-colors duration-300 group-hover:fill-white uppercase tracking-wider"
                                >
                                  {labelText}
                                </text>
                              </g>
                            );
                          })()}
                        </g>
                      </a>
                    );
                  })()}
                </svg>
              ) : (
                <div className="h-[450px] flex flex-col items-center justify-center gap-4 text-center">
                  <Compass className="animate-spin" size={32} style={{ color: `${BRASS}60` }} />
                  <span className="text-sm font-mono" style={{ color: TEXT_SUB }}>
                    Loading geographic map...
                  </span>
                </div>
              )}

              {/* Compass decoration */}
              <div className="absolute bottom-5 right-5 opacity-20 pointer-events-none">
                <svg viewBox="0 0 50 50" className="w-12 h-12" fill="none" stroke={BRASS} strokeWidth="1">
                  <circle cx="25" cy="25" r="21" strokeDasharray="3 3" />
                  <path d="M25 4 L25 46 M4 25 L46 25" />
                  <polygon points="25,7 28,21 25,25 22,21" fill={BRASS} stroke="none" />
                  <text x="21.5" y="6" fill={BRASS} fontSize="7" fontFamily="monospace" fontWeight="bold">
                    N
                  </text>
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
                style={{
                  border: `2px solid ${GOLD}70`,
                  boxShadow: `0 0 0 1px ${GOLD}20, 0 0 24px 4px ${GOLD}25, 0 0 60px 8px ${GOLD}10`,
                }}
              >
                {/* Image — full frame display, no crop */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                  <Image
                    src={activeDest.image}
                    alt={activeDest.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="w-full h-full object-cover object-center transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1519] via-transparent to-transparent opacity-85" />
                  <div
                    className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold glass-panel-strong shadow-lg"
                    style={{ color: GOLD, border: `1px solid ${GOLD}40` }}
                  >
                    <Calendar size={12} /> {activeDest.season}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col gap-5 flex-1 justify-between">
                  <div className="space-y-3">
                    <span className="text-[9.5px] tracking-[0.2em] font-accent uppercase" style={{ color: BRASS }}>
                      {activeDest.label}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold tracking-wide text-glow-gold" style={{ color: GOLD }}>
                      {activeDest.name}
                    </h3>
                    <p className="text-xs md:text-sm font-sans leading-relaxed text-[#D8CFC7]/80">
                      {activeDest.desc}
                    </p>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b" style={{ borderColor: `${BRASS}20` }}>
                    <div className="flex items-center gap-2.5 font-sans">
                      <Clock size={18} style={{ color: BRASS }} />
                      <div>
                        <span className="block text-[9px] uppercase font-mono tracking-wider" style={{ color: TEXT_SUB }}>
                          DURATION
                        </span>
                        <span className="block text-xs font-semibold" style={{ color: IVORY }}>
                          {activeDest.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 font-sans">
                      <MapPin size={18} style={{ color: BRASS }} />
                      <div>
                        <span className="block text-[9px] uppercase font-mono tracking-wider" style={{ color: TEXT_SUB }}>
                          STARTS FROM
                        </span>
                        <span className="block text-xs font-bold text-glow-gold" style={{ color: GOLD }}>
                          {activeDest.price}
                        </span>
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
