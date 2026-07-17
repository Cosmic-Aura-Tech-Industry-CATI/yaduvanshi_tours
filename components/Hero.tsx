"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { Search, MapPin, Calendar as CalendarIcon, Clock, Users, ChevronDown, Minus, Plus, Loader2 } from "lucide-react";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";

const TRUST_STATS = [
  { value: "10,000+", label: "Happy Travelers", emoji: "✈️" },
  { value: "40+", label: "Destinations", emoji: "🗺️" },
  { value: "15+", label: "Years Experience", emoji: "🏆" },
  { value: "24/7", label: "Support", emoji: "🛡️" },
];

const DESTINATIONS_LIST = [
  "Kashmir",
  "Himachal",
  "Rajasthan",
  "Kerala",
  "Goa",
  "Ladakh",
  "Nainital",
  "Agra",
  "Varanasi",
  "Munnar",
  "Kutch",
  "Gulmarg",
  "Manali"
];

const QUICK_DESTS = ["Kashmir", "Himachal", "Rajasthan", "Kerala", "Goa", "Ladakh"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function Hero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Trigger refs for Portal alignment
  const destTriggerRef = useRef<HTMLDivElement>(null);
  const dateTriggerRef = useRef<HTMLDivElement>(null);

  // Calculated coordinates for Portals
  const [destCoords, setDestCoords] = useState({ top: 0, left: 0, width: 0 });
  const [dateCoords, setDateCoords] = useState({ top: 0, left: 0, width: 0 });

  // Search State
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("Auto");
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  
  // Date Range state (Timestamps in ms)
  const [rangeStart, setRangeStart] = useState<number | null>(null);
  const [rangeEnd, setRangeEnd] = useState<number | null>(null);
  const [searchDate, setSearchDate] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [destError, setDestError] = useState(false);

  // Dropdown UI states: "dest" | "date" | "duration" | "trav" | null
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Custom Calendar state (initialized to July 2026 based on current metadata date)
  const [calMonth, setCalMonth] = useState(6); // July
  const [calYear, setCalYear] = useState(2026);

  // Match viewport size for video sources
  useEffect(() => {
    setIsClient(true);
    const m = window.matchMedia("(max-width: 767px)");
    setIsMobile(m.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, []);

  // Recalculate popup trigger coordinates on layout changes
  const updateCoords = () => {
    if (destTriggerRef.current) {
      const rect = destTriggerRef.current.getBoundingClientRect();
      setDestCoords({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    if (dateTriggerRef.current) {
      const rect = dateTriggerRef.current.getBoundingClientRect();
      setDateCoords({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    if (activeDropdown === "dest" || activeDropdown === "date") {
      updateCoords();
      window.addEventListener("scroll", updateCoords);
      window.addEventListener("resize", updateCoords);
    }
    return () => {
      window.removeEventListener("scroll", updateCoords);
      window.removeEventListener("resize", updateCoords);
    };
  }, [activeDropdown]);

  // Handle clicking outside of dropdowns to close them
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target as Node)) {
        // Also check if click is inside the portal elements (which are direct children of body)
        const activePortal = document.querySelector(".portal-popup-container");
        if (activePortal && activePortal.contains(e.target as Node)) {
          return;
        }
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

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

  // Autocomplete suggestions based on input
  const filteredDestinations = useMemo(() => {
    if (!destination) return DESTINATIONS_LIST;
    return DESTINATIONS_LIST.filter((d) =>
      d.toLowerCase().includes(destination.toLowerCase())
    );
  }, [destination]);

  // Calendar Helpers for left month
  const daysInLeftMonth = useMemo(() => {
    return new Date(calYear, calMonth + 1, 0).getDate();
  }, [calMonth, calYear]);

  const leftFirstDayIndex = useMemo(() => {
    return new Date(calYear, calMonth, 1).getDay();
  }, [calMonth, calYear]);

  // Calendar Helpers for right month
  const rightMonth = useMemo(() => {
    return calMonth === 11 ? 0 : calMonth + 1;
  }, [calMonth]);

  const rightYear = useMemo(() => {
    return calMonth === 11 ? calYear + 1 : calYear;
  }, [calMonth, calYear]);

  const daysInRightMonth = useMemo(() => {
    return new Date(rightYear, rightMonth + 1, 0).getDate();
  }, [rightMonth, rightYear]);

  const rightFirstDayIndex = useMemo(() => {
    return new Date(rightYear, rightMonth, 1).getDay();
  }, [rightMonth, rightYear]);

  const getTimestamp = (day: number, month: number, year: number) => {
    return new Date(year, month, day).getTime();
  };

  const handleDaySelect = (day: number, month: number, year: number) => {
    const ts = getTimestamp(day, month, year);
    if (rangeStart === null || (rangeStart !== null && rangeEnd !== null)) {
      // First click: select start day, clear end day
      setRangeStart(ts);
      setRangeEnd(null);
      const dateObj = new Date(ts);
      const startStr = `${dateObj.getDate().toString().padStart(2, "0")} ${MONTH_NAMES[dateObj.getMonth()].substring(0, 3)}`;
      setSearchDate(`From ${startStr}`);
    } else {
      // Second click: select end day
      if (ts >= rangeStart) {
        setRangeEnd(ts);
        const startObj = new Date(rangeStart);
        const endObj = new Date(ts);
        const startStr = `${startObj.getDate().toString().padStart(2, "0")} ${MONTH_NAMES[startObj.getMonth()].substring(0, 3)}`;
        const endStr = `${endObj.getDate().toString().padStart(2, "0")} ${MONTH_NAMES[endObj.getMonth()].substring(0, 3)} ${endObj.getFullYear()}`;
        setSearchDate(`From ${startStr} → ${endStr}`);

        // Auto-calculate duration (difference in days)
        const diffTime = Math.abs(ts - rangeStart);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDuration(diffDays === 1 ? "1 Day" : `${diffDays} Days`);
      } else {
        // If clicked day is before start day, reset it as the new start day
        setRangeStart(ts);
        const dateObj = new Date(ts);
        const startStr = `${dateObj.getDate().toString().padStart(2, "0")} ${MONTH_NAMES[dateObj.getMonth()].substring(0, 3)}`;
        setSearchDate(`From ${startStr}`);
      }
    }
  };

  const handleMonthChange = (dir: "prev" | "next") => {
    if (dir === "prev") {
      if (calMonth === 0) {
        setCalMonth(11);
        setCalYear((y) => y - 1);
      } else {
        setCalMonth((m) => m - 1);
      }
    } else {
      if (calMonth === 11) {
        setCalMonth(0);
        setCalYear((y) => y + 1);
      } else {
        setCalMonth((m) => m + 1);
      }
    }
  };

  const isPastDate = (day: number, month: number, year: number) => {
    const today = new Date(2026, 6, 17); // 17 July 2026 reference
    const dateToCheck = new Date(year, month, day);
    return dateToCheck < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  // Search Action Execution
  const handleSearchSubmit = () => {
    if (!destination.trim()) {
      setDestError(true);
      setActiveDropdown("dest");
      setTimeout(() => setDestError(false), 2500);
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      // Smooth scroll target PackagesSection
      const element = document.getElementById("tours-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 850);
  };

  // Safe horizontal positioning clamping for the Date Calendar
  const getCalendarLeft = () => {
    if (isMobile || typeof window === "undefined") return 16;
    const preferredLeft = dateCoords.left - 150;
    const calendarWidth = 580;
    const maxLeft = window.innerWidth - calendarWidth - 24;
    return Math.max(16, Math.min(preferredLeft, maxLeft));
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-[100vw] min-h-[calc(100vh-76px)] md:min-h-[calc(100vh-112px)] flex items-center justify-center overflow-hidden select-none z-10"
      style={{ background: "#0C1519" }}
    >
      {/* ── Video Background Container (extends behind glass navbar to top-0) ── */}
      <motion.div 
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0" 
        style={{ y: bgY, transform: "scale(1.05)" }}
      >
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="w-full h-full relative"
        >
          <video
            ref={videoRef}
            key={isMobile ? "mobile" : "desktop"}
            autoPlay={!prefersReducedMotion}
            muted 
            loop 
            playsInline 
            preload="auto"
            poster="/images/hero-poster.webp"
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-full h-full object-cover object-center"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <source src={isMobile ? "/videos/hero-video-mobile.mp4" : "/videos/hero-video-desktop.mp4"} type="video/mp4" />
          </video>
        </motion.div>

        {/* Darker cinematic overlays (Rudra-style) */}
        <div 
          className="absolute inset-0 z-[2]"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.35), rgba(0,0,0,0.75))" }} 
        />
        <div
          className="absolute inset-0 z-[2]"
          style={{ background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.85) 100%)" }}
        />

        {/* Ambient glow blobs */}
        <div className="absolute bottom-0 left-0 z-[3] pointer-events-none"
          style={{ width: 600, height: 400, background: `radial-gradient(ellipse at bottom left, ${BRASS}20, transparent 70%)` }} />
        <div className="absolute top-20 right-10 z-[3] pointer-events-none"
          style={{ width: 500, height: 500, background: `radial-gradient(ellipse at top right, ${COFFEE}15, transparent 70%)` }} />
      </motion.div>

      {/* ── Floating Particles — brass ── */}
      {mounted && !prefersReducedMotion && particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none z-[4]"
          style={{
            width: p.size, height: p.size,
            left: `${p.x}%`, top: `${p.y}%`,
            background: BRASS, opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ── Main Content Wrapper (Fixed heading text cut by adding padding-top equal to navbar+topbar height + safe 70px buffer, content centered, zero blur) ── */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 flex flex-col justify-center items-center w-full min-h-full pt-[156px] md:pt-[198px] pb-20 text-center"
        style={{ 
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "subpixel-antialiased",
          transform: "translate3d(0, 0, 0)"
        }}
      >
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-white/10 shadow-lg text-[9px] sm:text-[10px] font-accent tracking-widest text-[#E8B96A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B96A] animate-pulse" />
            YADUVANSHI TOUR AND TRAVEL · AYODHYA
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-display font-bold leading-tight mb-5 max-w-4xl mx-auto">
          <span className="block text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide">
            India Tour Packages
          </span>
          <span className="block italic text-[#E8B96A] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mt-3">
            Car Rentals &amp; Wedding Travel.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-[#D8CFC7]/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-sans">
          Wander beyond ordinary. Experience cinematic, earthy-luxury expeditions through India&apos;s royal heritage and scenic wilderness. Chase horizons, not destinations.
        </p>

        {/* CTA Row — Single row on desktop, padding: 12px 24px, font-size 14px, gap: 14px */}
        <div className="flex flex-col md:flex-row md:flex-nowrap items-stretch md:items-center justify-center gap-3 md:gap-[14px] w-full max-w-4xl mx-auto mb-12">
          <Link
            href="/tours"
            className="px-6 py-3 text-xs sm:text-sm font-bold font-accent tracking-[0.12em] rounded-full btn-glow transition-all uppercase text-center"
            style={{ background: GOLD, color: "#0C1519" }}
          >
            Explore Tours
          </Link>
          <Link
            href="/vehicles"
            className="px-6 py-3 text-xs sm:text-sm font-bold font-accent tracking-[0.12em] rounded-full border border-white/20 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/45 transition-all uppercase text-center"
          >
            Book a Vehicle
          </Link>
          <Link
            href="/weddings"
            className="px-6 py-3 text-xs sm:text-sm font-bold font-accent tracking-[0.12em] rounded-full border border-white/20 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/45 transition-all uppercase text-center"
          >
            Wedding Cars
          </Link>
          <Link
            href="/inquiry"
            className="px-6 py-3 text-xs sm:text-sm font-bold font-accent tracking-[0.12em] rounded-full border border-white/20 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/45 transition-all uppercase text-center"
          >
            Plan My Trip
          </Link>
        </div>

        {/* ── Destination Pills & Search Bar Container ── */}
        <div ref={searchBarRef} className="max-w-5xl w-full mx-auto mb-12 relative z-30">
          {/* Quick Destination Pills */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-5 text-xs sm:text-sm font-bold tracking-[0.2em] font-accent text-[#D8CFC7]">
            {QUICK_DESTS.map((destName) => (
              <button
                key={destName}
                onClick={() => setDestination(destName)}
                className="flex items-center gap-2 hover:text-[#E8B96A] transition-colors relative group py-1 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8B96A] opacity-75" />
                <span>{destName.toUpperCase()}</span>
                {/* Glow underline linking them */}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-[#E8B96A]" style={{ boxShadow: `0 0 8px ${GOLD}` }} />
              </button>
            ))}
          </div>

          {/* Search bar module panel — Redesigned Distinct glassmorphic panel matching navbar's glass style */}
          <div 
            className="w-full rounded-2xl md:rounded-[16px] p-3 md:p-2.5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-0 relative border"
            style={{
              background: "rgba(22, 33, 39, 0.55)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(207, 157, 123, 0.3)",
              boxShadow: "0 0 30px rgba(207, 157, 123, 0.15), 0 10px 40px rgba(0, 0, 0, 0.5)"
            }}
          >
            {/* Field 1: Destination Search-As-You-Type */}
            <div ref={destTriggerRef} className="flex-1 text-left relative px-4 py-1 flex flex-col justify-center">
              <label className="text-[10px] uppercase tracking-[0.18em] text-[#D8CFC7]/60 font-accent font-bold block mb-0.5 ml-1">Destination</label>
              <div 
                className={`flex items-center gap-2.5 py-1.5 px-2 rounded-lg border transition-all cursor-pointer ${
                  activeDropdown === "dest" ? "border-[#E8B96A] shadow-[0_0_10px_rgba(232,185,106,0.2)]" : destError ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.25)]" : "border-transparent hover:border-white/5"
                }`}
                onClick={() => setActiveDropdown(activeDropdown === "dest" ? null : "dest")}
              >
                <MapPin size={15} className="text-[#E8B96A] flex-shrink-0" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    if (activeDropdown !== "dest") setActiveDropdown("dest");
                  }}
                  placeholder="Search destinations..."
                  className="bg-transparent text-white font-sans text-xs sm:text-sm font-semibold w-full focus:outline-none placeholder-white/20 mt-0.5"
                />
              </div>
            </div>
            
            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-white/10 self-center flex-shrink-0" />

            {/* Field 2: Travel Date (Dual-Month range calendar trigger) */}
            <div ref={dateTriggerRef} className="flex-1 text-left relative px-4 py-1 flex flex-col justify-center">
              <label className="text-[10px] uppercase tracking-[0.18em] text-[#D8CFC7]/60 font-accent font-bold block mb-0.5 ml-1">Travel Date</label>
              <div 
                className={`flex items-center gap-2.5 py-1.5 px-2 rounded-lg border transition-all cursor-pointer ${
                  activeDropdown === "date" ? "border-[#E8B96A] shadow-[0_0_10px_rgba(232,185,106,0.2)]" : "border-transparent hover:border-white/5"
                }`}
                onClick={() => setActiveDropdown(activeDropdown === "date" ? null : "date")}
              >
                <CalendarIcon size={15} className="text-[#E8B96A] flex-shrink-0" />
                <span className="text-white font-sans text-xs sm:text-sm font-semibold mt-0.5 truncate">
                  {searchDate || "Select Date Range"}
                </span>
                <ChevronDown size={11} className="ml-auto text-white/30" />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-white/10 self-center flex-shrink-0" />

            {/* Field 3: Duration */}
            <div className="w-full md:w-36 text-left relative px-4 py-1 flex flex-col justify-center">
              <label className="text-[10px] uppercase tracking-[0.18em] text-[#D8CFC7]/60 font-accent font-bold block mb-0.5 ml-1">Duration</label>
              <div 
                className={`flex items-center gap-2.5 py-1.5 px-2 rounded-lg border transition-all cursor-pointer ${
                  activeDropdown === "duration" ? "border-[#E8B96A] shadow-[0_0_10px_rgba(232,185,106,0.2)]" : "border-transparent hover:border-white/5"
                }`}
                onClick={() => setActiveDropdown(activeDropdown === "duration" ? null : "duration")}
              >
                <Clock size={15} className="text-[#E8B96A] flex-shrink-0" />
                <span className="text-white font-sans text-xs sm:text-sm font-semibold mt-0.5 truncate">
                  {duration}
                </span>
                <ChevronDown size={11} className="ml-auto text-white/30" />
              </div>

              {/* Duration dropdown — Solid background forced via global stylesheet rule */}
              <AnimatePresence>
                {activeDropdown === "duration" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-3 rounded-xl overflow-hidden shadow-2xl text-left border force-solid-popup z-[9999]"
                  >
                    <ul className="py-1 text-xs font-sans">
                      {["3 Days", "5 Days", "7 Days", "Auto"].map((durOpt) => (
                        <li
                          key={durOpt}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDuration(durOpt);
                            setActiveDropdown(null);
                          }}
                          className="px-4 py-2.5 hover:bg-white/5 text-[#D8CFC7] hover:text-[#E8B96A] cursor-pointer transition-colors"
                        >
                          {durOpt}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-white/10 self-center flex-shrink-0" />

            {/* Field 4: Travellers */}
            <div className="w-full md:w-44 text-left relative px-4 py-1 flex flex-col justify-center">
              <label className="text-[10px] uppercase tracking-[0.18em] text-[#D8CFC7]/60 font-accent font-bold block mb-0.5 ml-1">Travellers</label>
              <div 
                className={`flex items-center gap-2.5 py-1.5 px-2 rounded-lg border transition-all cursor-pointer ${
                  activeDropdown === "trav" ? "border-[#E8B96A] shadow-[0_0_10px_rgba(232,185,106,0.2)]" : "border-transparent hover:border-white/5"
                }`}
                onClick={() => setActiveDropdown(activeDropdown === "trav" ? null : "trav")}
              >
                <Users size={15} className="text-[#E8B96A] flex-shrink-0" />
                <span className="text-white font-sans text-xs sm:text-sm font-semibold mt-0.5 truncate">
                  {adults} Ad, {childrenCount} Ch
                </span>
                <ChevronDown size={11} className="ml-auto text-white/30" />
              </div>

              {/* Travellers Stepper Popup — Solid background forced via global stylesheet rule */}
              <AnimatePresence>
                {activeDropdown === "trav" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-3 rounded-xl p-4 shadow-2xl text-left w-56 font-sans text-xs border force-solid-popup z-[9999]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Stepper Adults */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-semibold text-white">Adults</div>
                        <div className="text-[10px] text-[#D8CFC7]/40">Ages 12+</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          disabled={adults <= 1}
                          onClick={() => setAdults((a) => a - 1)}
                          className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center hover:text-[#E8B96A] hover:border-[#E8B96A]/40 disabled:opacity-20 cursor-pointer"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="font-mono font-bold w-4 text-center">{adults}</span>
                        <button
                          onClick={() => setAdults((a) => a + 1)}
                          className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center hover:text-[#E8B96A] hover:border-[#E8B96A]/40 cursor-pointer"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>

                    {/* Stepper Children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">Children</div>
                        <div className="text-[10px] text-[#D8CFC7]/40">Ages 2-11</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          disabled={childrenCount <= 0}
                          onClick={() => setChildrenCount((c) => c - 1)}
                          className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center hover:text-[#E8B96A] hover:border-[#E8B96A]/40 disabled:opacity-20 cursor-pointer"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="font-mono font-bold w-4 text-center">{childrenCount}</span>
                        <button
                          onClick={() => setChildrenCount((c) => c + 1)}
                          className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center hover:text-[#E8B96A] hover:border-[#E8B96A]/40 cursor-pointer"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Field 5: Search Button — Distinctly gold filled standing out */}
            <div className="w-full md:w-auto flex items-center justify-center p-1 md:pl-2">
              <button
                disabled={isSearching}
                onClick={handleSearchSubmit}
                className="w-full md:w-auto py-3 px-6 rounded-full md:rounded-[12px] font-accent tracking-[0.16em] text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-[#0C1519] disabled:opacity-80"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
                  boxShadow: `0 4px 15px rgba(232,185,106,0.3)`
                }}
              >
                {isSearching ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <>
                    <Search size={14} strokeWidth={2.5} />
                    <span>SEARCH</span>
                  </>
                )}
              </button>
            </div>

            {/* ── Active Popups Rendered into React Portals (Rendered into document.body, floating overlays, z-index 9999, absolute body positioning, does not shift layout) ── */}
            
            {/* 1. Destination Autocomplete Search list */}
            {isClient && activeDropdown === "dest" && createPortal(
              <div className="portal-popup-container">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="rounded-[16px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.75)] text-left border force-solid-popup z-[9999]"
                  style={{
                    position: "absolute",
                    top: destCoords.top,
                    left: destCoords.left,
                    width: Math.max(destCoords.width, 320),
                  }}
                >
                  <ul className="max-h-56 overflow-y-auto py-1 custom-scrollbar text-xs font-sans">
                    {filteredDestinations.length > 0 ? (
                      filteredDestinations.map((d) => (
                        <li
                          key={d}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDestination(d);
                            setActiveDropdown(null);
                          }}
                          className="px-4 py-3 flex items-center gap-3 hover:bg-white/5 text-[#D8CFC7] hover:text-[#E8B96A] cursor-pointer transition-colors"
                        >
                          <MapPin size={13} className="text-[#E8B96A] flex-shrink-0" />
                          <span className="font-semibold text-white/90">{d}</span>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-4 text-[#D8CFC7]/40 text-center flex flex-col items-center gap-1.5">
                        <span>No matches found</span>
                        <span className="text-[10px] opacity-75">Try searching another destination</span>
                      </li>
                    )}
                  </ul>
                </motion.div>
              </div>,
              document.body
            )}

            {/* 2. Date Range Picker Calendar popup */}
            {isClient && activeDropdown === "date" && createPortal(
              <div className="portal-popup-container">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="rounded-[16px] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.75)] text-center w-full md:w-[580px] font-sans text-xs border force-solid-popup z-[9999]"
                  style={{
                    position: "absolute",
                    top: dateCoords.top,
                    left: getCalendarLeft(),
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5 font-semibold text-[#D8CFC7]">
                    <button onClick={() => handleMonthChange("prev")} className="hover:text-[#E8B96A] p-0.5 cursor-pointer font-bold text-sm">&lt;</button>
                    <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#E8B96A]">Select Travel Duration</span>
                    <button onClick={() => handleMonthChange("next")} className="hover:text-[#E8B96A] p-0.5 cursor-pointer font-bold text-sm">&gt;</button>
                  </div>

                  {/* Dual Month Grids Container */}
                  <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
                    {/* Left Month Calendar */}
                    <div className="flex-1 w-full">
                      <div className="text-center font-bold text-[#D8CFC7] mb-2 font-accent uppercase text-[10px] tracking-wider">
                        {MONTH_NAMES[calMonth]} {calYear}
                      </div>
                      {/* Days Grid Header */}
                      <div className="grid grid-cols-7 gap-1 text-[9px] text-[#D8CFC7]/40 font-mono mb-1.5">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((dayName) => <span key={dayName}>{dayName}</span>)}
                      </div>
                      {/* Days Grid */}
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: leftFirstDayIndex }).map((_, idx) => (
                          <span key={`left-empty-${idx}`} />
                        ))}
                        {Array.from({ length: daysInLeftMonth }).map((_, idx) => {
                          const dayNum = idx + 1;
                          const isPast = isPastDate(dayNum, calMonth, calYear);
                          const ts = getTimestamp(dayNum, calMonth, calYear);
                          
                          const isStart = rangeStart === ts;
                          const isEnd = rangeEnd === ts;
                          const isInRange = rangeStart !== null && rangeEnd !== null && ts > rangeStart && ts < rangeEnd;

                          return (
                            <button
                              key={`left-day-${dayNum}`}
                              disabled={isPast}
                              onClick={() => handleDaySelect(dayNum, calMonth, calYear)}
                              className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                                isStart || isEnd
                                  ? "bg-[#E8B96A] text-[#0C1519] font-bold"
                                  : isInRange
                                  ? "bg-[#E8B96A]/20 text-[#E8B96A] font-semibold"
                                  : isPast
                                  ? "text-white/10 cursor-not-allowed"
                                  : "text-[#D8CFC7] hover:bg-white/5 hover:text-[#E8B96A]"
                              }`}
                            >
                              {dayNum}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Side vertical divider */}
                    <div className="hidden md:block w-px h-36 bg-white/10 self-stretch" />

                    {/* Right Month Calendar */}
                    <div className="flex-1 w-full">
                      <div className="text-center font-bold text-[#D8CFC7] mb-2 font-accent uppercase text-[10px] tracking-wider">
                        {MONTH_NAMES[rightMonth]} {rightYear}
                      </div>
                      {/* Days Grid Header */}
                      <div className="grid grid-cols-7 gap-1 text-[9px] text-[#D8CFC7]/40 font-mono mb-1.5">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((dayName) => <span key={dayName}>{dayName}</span>)}
                      </div>
                      {/* Days Grid */}
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: rightFirstDayIndex }).map((_, idx) => (
                          <span key={`right-empty-${idx}`} />
                        ))}
                        {Array.from({ length: daysInRightMonth }).map((_, idx) => {
                          const dayNum = idx + 1;
                          const isPast = isPastDate(dayNum, rightMonth, rightYear);
                          const ts = getTimestamp(dayNum, rightMonth, rightYear);
                          
                          const isStart = rangeStart === ts;
                          const isEnd = rangeEnd === ts;
                          const isInRange = rangeStart !== null && rangeEnd !== null && ts > rangeStart && ts < rangeEnd;

                          return (
                            <button
                              key={`right-day-${dayNum}`}
                              disabled={isPast}
                              onClick={() => handleDaySelect(dayNum, rightMonth, rightYear)}
                              className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                                isStart || isEnd
                                  ? "bg-[#E8B96A] text-[#0C1519] font-bold"
                                  : isInRange
                                  ? "bg-[#E8B96A]/20 text-[#E8B96A] font-semibold"
                                  : isPast
                                  ? "text-white/10 cursor-not-allowed"
                                  : "text-[#D8CFC7] hover:bg-white/5 hover:text-[#E8B96A]"
                              }`}
                            >
                              {dayNum}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Reset & Confirm Buttons */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setRangeStart(null);
                        setRangeEnd(null);
                        setSearchDate("");
                        setDuration("Auto");
                      }}
                      className="text-[#E8B96A] font-accent text-[9px] tracking-wider uppercase hover:underline cursor-pointer"
                    >
                      Reset Range
                    </button>
                    <button
                      onClick={() => {
                        if (rangeStart) {
                          const startObj = new Date(rangeStart);
                          const startStr = `${startObj.getDate().toString().padStart(2, "0")} ${MONTH_NAMES[startObj.getMonth()].substring(0, 3)}`;
                          if (rangeEnd) {
                            const endObj = new Date(rangeEnd);
                            const endStr = `${endObj.getDate().toString().padStart(2, "0")} ${MONTH_NAMES[endObj.getMonth()].substring(0, 3)} ${endObj.getFullYear()}`;
                            setSearchDate(`From ${startStr} → ${endStr}`);
                            // Recalculate duration (difference in days)
                            const diffTime = Math.abs(rangeEnd - rangeStart);
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            setDuration(diffDays === 1 ? "1 Day" : `${diffDays} Days`);
                          } else {
                            const endStr = `${startObj.getDate().toString().padStart(2, "0")} ${MONTH_NAMES[startObj.getMonth()].substring(0, 3)} ${startObj.getFullYear()}`;
                            setSearchDate(`From ${startStr} → ${endStr}`);
                            setDuration("Auto");
                          }
                        }
                        setActiveDropdown(null);
                      }}
                      className="px-4 py-1.5 rounded bg-[#E8B96A] text-[#0C1519] font-accent text-[9px] font-bold tracking-wider uppercase hover:brightness-110 cursor-pointer"
                    >
                      Confirm Range
                    </button>
                  </div>
                </motion.div>
              </div>,
              document.body
            )}

          </div>
        </div>

        {/* Trust Stats — floating glass pills */}
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {TRUST_STATS.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass-panel hover-glow"
            >
              <span className="text-sm">{s.emoji}</span>
              <div className="text-left">
                <div className="text-[#E8B96A] font-bold text-sm leading-none font-mono">{s.value}</div>
                <div className="text-[#D8CFC7]/50 text-[10px] mt-0.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Smooth Bottom Blend Overlay (Transition fade into next section's dark bg) ── */}
      <div 
        className="absolute bottom-0 inset-x-0 h-40 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent, #0C1519)" }}
      />
    </section>
  );
}
