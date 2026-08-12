"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, Check, X, MapPin, 
  ShieldCheck, PhoneCall, HelpCircle, Heart, ArrowRight
} from "lucide-react";
import { TOURS_DATA } from "@/data/tours";
import { 
  TourCard, 
  formatIndianCurrency, resolveImg 
} from "@/components/tours/SharedComponents";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";

function ToursContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Filter States
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(190000);
  const [sortBy, setSortBy] = useState<string>("default");
  
  // Search bar
  const [searchQuery, setSearchQuery] = useState("");
  const [priceInput, setPriceInput] = useState<number>(190000);

  // Sync filter states with URL search params
  useEffect(() => {
    const regionParam = searchParams?.get("region");
    if (regionParam) {
      setSelectedRegion(regionParam);
    }
    const destinationParam = searchParams?.get("destination");
    if (destinationParam) {
      setSearchQuery(destinationParam);
    }
    const durationParam = searchParams?.get("duration");
    if (durationParam) {
      setSelectedDurations([durationParam]);
    }
  }, [searchParams]);

  // Filter & Sort Logic
  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter((tour) => {
      // Region Match
      if (selectedRegion !== "all" && tour.region !== selectedRegion) return false;
      
      // Search Query Match — also checks destinations array
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const nameMatch = tour.name.toLowerCase().includes(q);
        const taglineMatch = tour.tagline.toLowerCase().includes(q);
        const destMatch = tour.destinations.some((d) => d.toLowerCase().includes(q));
        if (!nameMatch && !taglineMatch && !destMatch) return false;
      }

      // Duration Match
      if (selectedDurations.length > 0) {
        const days = tour.durationDays;
        const matches = selectedDurations.some((range) => {
          if (range === "1-2" && days <= 2) return true;
          if (range === "3-4" && days >= 3 && days <= 4) return true;
          if (range === "5-7" && days >= 5 && days <= 7) return true;
          if (range === "8+" && days >= 8) return true;
          return false;
        });
        if (!matches) return false;
      }

      // Price Match
      if (tour.startingPrice > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low-high") return a.startingPrice - b.startingPrice;
      if (sortBy === "price-high-low") return b.startingPrice - a.startingPrice;
      if (sortBy === "duration") return a.durationDays - b.durationDays;
      if (sortBy === "popularity") return b.rating - a.rating;
      return 0; // default order
    });
  }, [selectedRegion, selectedDurations, maxPrice, sortBy, searchQuery]);

  const handleDurationToggle = (range: string) => {
    setSelectedDurations((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const handleResetFilters = () => {
    setSelectedRegion("all");
    setSelectedDurations([]);
    setMaxPrice(190000);
    setPriceInput(190000);
    setSortBy("default");
    setSearchQuery("");
    router.push("/tours", { scroll: false });
  };

  return (
    <div className="min-h-screen text-[#D8CFC7] bg-[#0C1519] overflow-hidden">
      
      {/* ── 1. HERO SECTION ── */}
      <section className="relative min-h-[55vh] pt-36 pb-20 flex items-center justify-center overflow-hidden">
        {/* Background Collage / India travel image overlay */}
        <div className="absolute inset-0">
          <Image
            src="/tours/india-collage-hero.webp"
            alt="Majestic India Tour Pilgrimage Collage"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Dark theme matching overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C1519]/40 via-black/75 to-[#0C1519]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#724B39]/25 via-transparent to-[#CF9D7B]/15" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="font-accent text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] font-semibold" style={{ color: GOLD }}>
              Premium Travel Experiences
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide leading-tight">
              India Tour Packages, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8B96A] via-[#F5F0EA] to-[#CF9D7B]">
                made easy for you
              </span>
            </h1>
            <p className="text-[#D8CFC7]/80 text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed mt-2">
              Explore 26 meticulously curated spiritual pilgrimage circuits, Himalayan scenic valley retreats, 
              and heritage sand dunes. Fully transparent flat per-vehicle fare bookings with no per-person markup.
            </p>
          </motion.div>
        </div>

        {/* Bottom smooth fade and blur edge overlay */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0C1519] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-8 backdrop-blur-[2px] pointer-events-none opacity-40" />
      </section>

      {/* ── 2. FILTERS SECTION (GLASS CARD CONTAINER) ── */}
      <section className="relative z-20 px-6 lg:px-12 -mt-10 mb-12">
        <div 
          className="max-w-7xl mx-auto p-6 lg:p-8 rounded-2xl border shadow-2xl backdrop-blur-md glass-panel"
          style={{
            background: "rgba(58, 53, 52, 0.25)",
            borderColor: "rgba(207, 157, 123, 0.15)",
          }}
        >
          {/* Row 1: Region filter pills in one horizontal row */}
          <div className="flex flex-wrap gap-2.5 items-center justify-center mb-6 pb-6 border-b border-white/5">
            {[
              { id: "all", label: "All Packages" },
              { id: "pilgrimage", label: "Spiritual Yatra" },
              { id: "north", label: "North India" },
              { id: "west", label: "West India" },
              { id: "south", label: "South India" }
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setSelectedRegion(r.id);
                  router.push(`/tours?region=${r.id}`, { scroll: false });
                }}
                className="px-5 py-2.5 rounded-full text-xs font-accent tracking-wider transition-all duration-300 border cursor-pointer whitespace-nowrap"
                style={{
                  borderColor: selectedRegion === r.id ? GOLD : "rgba(255, 255, 255, 0.12)",
                  background: selectedRegion === r.id ? `${GOLD}15` : "rgba(22, 33, 39, 0.6)",
                  color: selectedRegion === r.id ? GOLD : "rgba(255, 255, 255, 0.7)"
                }}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Row 2: Search input, Duration dropdown, Price range slider, Sort dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            
            {/* Search */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-[10px] font-accent uppercase tracking-wider text-white/50">Search Tour</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-white/30">
                  <Search size={13} />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search packages..."
                  className="w-full pl-9 pr-4 py-3 bg-[#162127]/60 border border-white/10 rounded-xl text-xs text-white placeholder:text-white/35 focus:outline-none focus:border-[#E8B96A] transition-all"
                />
              </div>
            </div>

            {/* Duration select */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-[10px] font-accent uppercase tracking-wider text-white/50">Duration</label>
              <select
                value={selectedDurations[0] || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedDurations(val ? [val] : []);
                }}
                className="w-full bg-[#162127]/60 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#E8B96A] text-white/80 cursor-pointer"
              >
                <option value="">Any Duration</option>
                <option value="1-2">1 - 2 Days</option>
                <option value="3-4">3 - 4 Days</option>
                <option value="5-7">5 - 7 Days</option>
                <option value="8+">8+ Days</option>
              </select>
            </div>

            {/* Price range with min-max labels */}
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex justify-between items-baseline">
                <label className="text-[10px] font-accent uppercase tracking-wider text-white/50">Max Price</label>
                <span className="text-xs font-mono font-bold text-[#E8B96A]">{formatIndianCurrency(maxPrice)}</span>
              </div>
              <div className="relative flex items-center h-[46px] px-3.5 bg-[#162127]/60 border border-white/10 rounded-xl">
                <input
                  type="range"
                  min={5000}
                  max={190000}
                  step={5000}
                  value={priceInput}
                  onChange={(e) => setPriceInput(Number(e.target.value))}
                  onMouseUp={() => setMaxPrice(priceInput)}
                  onTouchEnd={() => setMaxPrice(priceInput)}
                  className="w-full accent-[#E8B96A] bg-white/10 h-1 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Sort Select */}
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex justify-between items-baseline">
                <label className="text-[10px] font-accent uppercase tracking-wider text-white/50">Sort By</label>
                {(selectedRegion !== "all" || selectedDurations.length > 0 || maxPrice < 190000 || sortBy !== "default" || searchQuery !== "") && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[10px] text-[#E8B96A] font-semibold hover:underline"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#162127]/60 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#E8B96A] transition-all text-white/80 cursor-pointer"
              >
                <option value="default">Default Order</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="duration">Duration Days</option>
                <option value="popularity">Guest Rating</option>
              </select>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. PACKAGE GRID ── */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-accent text-xs uppercase tracking-[0.2em] text-[#CF9D7B] font-semibold">
            Handpicked Journeys
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-wide mt-2">
            Our Most Popular Tours
          </h2>
          <div className="w-16 h-px mx-auto mt-4" style={{ background: `linear-gradient(to right, transparent, ${COFFEE}, transparent)` }} />
        </div>

        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8">
          <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
            Showing {filteredTours.length} of {TOURS_DATA.length} packages
          </span>
          {searchQuery && (
            <div className="text-xs flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8B96A]/10 border border-[#E8B96A]/25 text-[#E8B96A]">
              Query: {searchQuery}
              <button onClick={() => setSearchQuery("")} className="hover:text-white"><X size={10} /></button>
            </div>
          )}
        </div>

        <AnimatePresence mode="popLayout">
          {filteredTours.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredTours.map((tour) => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center space-y-4"
            >
              <MapPin size={48} className="mx-auto text-white/20 animate-bounce" />
              <h4 className="font-display text-xl font-bold text-white">No Tour Packages Found</h4>
              <p className="text-white/40 text-xs max-w-sm mx-auto font-sans">
                Try adjusting your filters, selecting a different region, or widening your maximum price range.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-full text-xs font-bold font-accent uppercase tracking-widest border transition-all duration-300 cursor-pointer"
                style={{ borderColor: GOLD, color: GOLD }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(232,185,106,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── 4. PREMIUM STANDARDS / WHY TRAVEL WITH US ── */}
      <section className="py-24 px-6 lg:px-12 border-t border-white/5 bg-[#162127]/15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <span className="font-accent text-xs uppercase tracking-[0.2em] text-[#CF9D7B] font-semibold">
              Premium Standards
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-wide">
              Why Travel With Us
            </h2>
            <div className="w-16 h-px mx-auto mt-4" style={{ background: `linear-gradient(to right, transparent, ${COFFEE}, transparent)` }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Verified Vehicles & Fleet", 
                desc: "Sedans, SUVs, Tempo Travellers, and luxury Urbania coaches regularly serviced for ultimate highway comfort.", 
                icon: ShieldCheck 
              },
              { 
                title: "24/7 Roadside Support", 
                desc: "Dedicated trip coordinators and round-the-clock support desk to assist you throughout your pilgrimage or vacation route.", 
                icon: PhoneCall 
              },
              { 
                title: "Custom Itineraries", 
                desc: "Easily modify halts, sightseeing durations, and travel days to fit your group's personal pace.", 
                icon: HelpCircle 
              },
              { 
                title: "Best Price Guarantee", 
                desc: "Transparent per-vehicle pricing inclusive of fuel, driver stays, and toll charges. Zero hidden per-person markups.", 
                icon: Heart 
              }
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl border border-white/5 space-y-4 text-center transition-all duration-300 glass-panel hover-glow"
                  style={{ background: "rgba(58, 53, 52, 0.25)", borderColor: "rgba(207, 157, 123, 0.15)" }}
                >
                  <div 
                    className="w-12 h-12 rounded-full mx-auto flex items-center justify-center border transition-transform duration-500 hover:rotate-12" 
                    style={{ borderColor: "rgba(207,157,123,0.3)", color: GOLD }}
                  >
                    <Icon size={20} />
                  </div>
                  <h4 className="font-display text-lg font-bold text-white">{feat.title}</h4>
                  <p className="text-[#D8CFC7]/60 text-xs leading-relaxed font-sans">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. PLAN A CUSTOM TRIP INQUIRY FORM ── */}
      <section className="py-20 px-6 border-t border-white/5 relative overflow-hidden bg-gradient-to-br from-[#724B39]/20 to-[#0C1519]">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, ${GOLD} 1px, transparent 1px)`, backgroundSize: "24px 24px" }}
        />
        <div className="max-w-4xl mx-auto space-y-6 relative z-10 text-center">
          <span className="text-xs font-accent uppercase tracking-widest text-[#E8B96A] font-bold">Plan a custom trip</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white">Need a Custom Pilgrimage or Tour Plan?</h2>
          <p className="text-[#D8CFC7]/75 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-sans mt-3">
            Send us your expected dates and traveler counts. Our yatra coordinators will build a personalized itinerary with transparent rates.
          </p>
          
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 mt-8">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-[#162127]/60 border border-white/10 rounded-full text-xs focus:outline-none focus:border-[#E8B96A] transition-all placeholder:text-white/20 text-white"
            />
            <button
              onClick={() => router.push("/inquiry")}
              className="px-6 py-3 rounded-full text-xs font-bold font-accent tracking-widest shadow-lg transition-all duration-300 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
                color: "#0C1519",
              }}
            >
              GET QUOTE
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default function ExploreToursPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0C1519] flex items-center justify-center text-white/60">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#E8B96A] border-t-transparent rounded-full animate-spin mx-auto" />
          <span className="font-mono text-xs uppercase tracking-widest">Loading Tours...</span>
        </div>
      </div>
    }>
      <ToursContent />
    </Suspense>
  );
}
