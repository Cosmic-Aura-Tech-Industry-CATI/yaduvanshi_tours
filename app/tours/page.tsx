"use client";

import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, SlidersHorizontal, ArrowLeftRight, Check, X, 
  MapPin, Calendar, Clock, Star, Quote, ChevronLeft, ChevronRight,
  ShieldCheck, PhoneCall, HelpCircle, Heart, Mail
} from "lucide-react";
import { TOURS_DATA, TourPackage } from "@/data/tours";
import { 
  TourCard, RegionBadge, PriceTag, formatIndianCurrency, 
  CountUpNumber, resolveImg 
} from "@/components/tours/SharedComponents";

const GOLD = "#C9A84C";
const WARM_CREAM = "#FDFBF7";
const HERITAGE_MAROON = "#4A121A";
const HERITAGE_SAFFRON = "#D97706";
const DARK_BG = "#131F14";

// Sub-component for search params inside Suspense boundary
function ToursContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Filter States
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(140000);
  const [sortBy, setSortBy] = useState<string>("default");
  
  // Search bar
  const [searchQuery, setSearchQuery] = useState("");
  const [priceInput, setPriceInput] = useState<number>(140000);

  // Sync region state with URL search param
  useEffect(() => {
    const regionParam = searchParams.get("region");
    if (regionParam) {
      setSelectedRegion(regionParam);
    }
  }, [searchParams]);

  // Gallery Lightbox State
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Testimonials slide state
  const [testiIdx, setTestiIdx] = useState(0);
  const [testiPaused, setTestiPaused] = useState(false);

  const testimonials = [
    {
      name: "Ramesh Sharma",
      location: "Delhi",
      quote: "Our Char Dham Yatra was flawlessly organized. The Tempo Traveller was top class and driver was highly experienced.",
      rating: 5,
      avatar: "photo-1544735716-392fe2489ffa"
    },
    {
      name: "Anjali Nair",
      location: "Kochi",
      quote: "The Kashmir Paradise tour exceeded expectations. Staying in the Dal Lake houseboat is a memory we will cherish forever.",
      rating: 5,
      avatar: "photo-1596176530529-78163a4f7af2"
    },
    {
      name: "Vikram Rathore",
      location: "Jaipur",
      quote: "Exceptional heritage tour planning. Custom itineraries and transparent per-vehicle pricing made it perfect for my family.",
      rating: 4,
      avatar: "photo-1600100397608-f010e6a394a1"
    }
  ];

  // Auto scroll testimonials
  useEffect(() => {
    if (testiPaused) return;
    const interval = setInterval(() => {
      setTestiIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testiPaused, testimonials.length]);

  // Filter & Sort Logic
  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter((tour) => {
      // Region Match
      if (selectedRegion !== "all" && tour.region !== selectedRegion) return false;
      
      // Search Query Match
      if (searchQuery && !tour.name.toLowerCase().includes(searchQuery.toLowerCase()) && !tour.tagline.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
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

  // Popular Carousel horizontal drag/scroll reference
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleDurationToggle = (range: string) => {
    setSelectedDurations((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const handleResetFilters = () => {
    setSelectedRegion("all");
    setSelectedDurations([]);
    setMaxPrice(140000);
    setPriceInput(140000);
    setSortBy("default");
    setSearchQuery("");
    router.push("/tours", { scroll: false });
  };

  // Gallery photos
  const galleryPhotos = [
    "photo-1544735716-392fe2489ffa",
    "photo-1596176530529-78163a4f7af2",
    "photo-1600100397608-f010e6a394a1",
    "photo-1561361513-2d000a50f0db",
    "photo-1572979841890-e7f09f0611e9",
    "photo-1582510003544-4d00b7f74220"
  ];

  return (
    <div className="min-h-screen text-[#f2ede0]" style={{ backgroundColor: "#0d1a12" }}>
      
      {/* ── 1. HERO SECTION ── */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Ken Burns effect */}
        <div className="absolute inset-0">
          <motion.img
            src="/tours/char-dham-yatra.webp"
            alt="Majestic Char Dham Yatra Kedarnath Temple"
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          />
          {/* Subtle gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[#0d1a12]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A121A]/20 via-transparent to-[#D97706]/10" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="font-serif italic text-lg md:text-2xl text-[#C9A84C] tracking-wide block">
              Sacred Heritage & Mountain Escapes
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#FDFBF7] leading-tight tracking-wide">
              Discover India, One Journey at a Time
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-sans">
              Choose from 26 expertly curated pilgrimage circuits, Himalayan hill stations, and royal desert escapades. Premium per-vehicle pricing with verified drivers.
            </p>
          </motion.div>

          {/* Search Bar / Fast CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-3xl bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 flex flex-col md:flex-row gap-3 items-center"
          >
            <div className="flex-1 w-full relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input
                type="text"
                placeholder="Search packages (e.g. Ayodhya, Kashmir)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-all placeholder:text-white/35"
              />
            </div>
            
            <div className="w-full md:w-48">
              <select
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  router.push(`/tours?region=${e.target.value}`, { scroll: false });
                }}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-all text-white/80 cursor-pointer"
              >
                <option value="all" className="bg-[#131F14]">All Regions</option>
                <option value="pilgrimage" className="bg-[#131F14]">Pilgrimage</option>
                <option value="north" className="bg-[#131F14]">North India</option>
                <option value="west" className="bg-[#131F14]">West India</option>
                <option value="south" className="bg-[#131F14]">South India</option>
              </select>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById("package-grid-anchor");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full md:w-auto px-8 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 shadow-lg cursor-pointer"
              style={{ backgroundColor: GOLD, color: "#131F14" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#DFB75A")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GOLD)}
            >
              Search
            </button>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="absolute bottom-8 cursor-pointer opacity-80"
            onClick={() => {
              const el = document.getElementById("trust-strip-anchor");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-1">
              <div className="w-1.5 h-3 bg-[#C9A84C] rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. TRUST STRIP ── */}
      <section id="trust-strip-anchor" className="py-12 bg-black/35 relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "26+", label: "Expert Packages", suffix: "" },
            { num: "10000", label: "Happy Travelers", suffix: "+" },
            { num: "4.8", label: "Average Rating", suffix: "★" },
            { num: "7", label: "Years Experience", suffix: "+" }
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <CountUpNumber end={stat.num} suffix={stat.suffix} />
              <div className="text-white/40 text-xs font-mono uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. FEATURED REGIONS ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-2">
          <span className="font-serif italic text-lg text-[#C9A84C]" style={{ fontFamily: "Georgia, serif" }}>Heritage Categories</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-wide" style={{ fontFamily: "Georgia, serif" }}>Explore by Indian Regions</h2>
          <div className="w-12 h-0.5 mx-auto mt-4 bg-[#C9A84C]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { region: "pilgrimage", title: "Pilgrimage Circuits", desc: "Holy dhams & sacred temples", count: 11, startPrice: 5500, img: "/tours/kashi-vishwanath.webp" },
            { region: "north", title: "North India Hills", desc: "Himalayas & cold valleys", count: 7, startPrice: 9000, img: "/tours/kullu-manali.webp" },
            { region: "west", title: "West India Deserts", desc: "Royal forts & golden sand", count: 6, startPrice: 11500, img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=400&fit=crop&q=80" },
            { region: "south", title: "South India Coastal", desc: "Misty hills & palm backwaters", count: 2, startPrice: 24000, img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&h=400&fit=crop&q=80" }
          ].map((reg, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className="relative h-96 rounded-2xl overflow-hidden cursor-pointer group shadow-xl border border-white/5"
              onClick={() => {
                setSelectedRegion(reg.region);
                router.push(`/tours?region=${reg.region}`, { scroll: false });
                setTimeout(() => {
                  const el = document.getElementById("package-grid-anchor");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              <img
                src={resolveImg(reg.img, 400, 600)}
                alt={reg.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300" />
              
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A84C] font-bold">
                  {reg.count} Packages
                </span>
                <h3 className="font-serif text-xl font-bold text-white leading-tight">
                  {reg.title}
                </h3>
                <p className="text-white/60 text-xs font-sans line-clamp-1 transition-opacity duration-300">
                  {reg.desc}
                </p>
                <div className="h-px w-full bg-white/10 my-2" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40 font-mono uppercase">Starting from</span>
                  <span className="font-bold text-[#C9A84C]">{formatIndianCurrency(reg.startPrice)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 4. POPULAR PACKAGES CAROUSEL ── */}
      <section className="py-24 bg-black/15 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-2">
            <span className="font-serif italic text-lg text-[#C9A84C]" style={{ fontFamily: "Georgia, serif" }}>Handpicked Journeys</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-wide" style={{ fontFamily: "Georgia, serif" }}>Our Most Popular Tours</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollCarousel("left")}
              className="w-10 h-10 rounded-full border border-white/15 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="w-10 h-10 rounded-full border border-white/15 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all flex items-center justify-center cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Swipe/Drag Scroll track */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-8 scrollbar-none snap-x snap-mandatory"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {TOURS_DATA.filter(t => t.slug === "char-dham-yatra" || t.slug === "vaishno-devi" || t.slug === "kullu-manali" || t.slug === "ayodhya-darshan" || t.slug === "kashi-vishwanath" || t.slug === "neem-karoli-kainchi-dham").map((tour) => (
            <div key={tour.slug} className="w-80 flex-shrink-0 snap-start">
              <TourCard tour={tour} />
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. WHY CHOOSE US ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-2">
          <span className="font-serif italic text-lg text-[#C9A84C]" style={{ fontFamily: "Georgia, serif" }}>Premium Standards</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-wide" style={{ fontFamily: "Georgia, serif" }}>Why Travel With Us</h2>
          <div className="w-12 h-0.5 mx-auto mt-4 bg-[#C9A84C]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { title: "Verified Vehicles & Fleet", desc: "Sedans, SUVs, Tempo Travellers, and luxury Urbania coaches regularly serviced for ultimate highway comfort.", icon: ShieldCheck },
            { title: "24/7 Roadside Support", desc: "Dedicated trip coordinators and round-the-clock support desk to assist you throughout your pilgrimage or vacation route.", icon: PhoneCall },
            { title: "Custom Itineraries", desc: "Easily modify halts, sightseeing durations, and travel days to fit your group's personal pace.", icon: HelpCircle },
            { title: "Best Price Guarantee", desc: "Transparent per-vehicle pricing inclusive of fuel, driver stays, and toll charges. Zero hidden per-person markups.", icon: Heart }
          ].map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl border border-white/5 space-y-4 text-center transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center border transition-transform duration-500 hover:rotate-12" style={{ borderColor: "rgba(201,168,76,0.3)", color: GOLD }}>
                  <Icon size={20} />
                </div>
                <h4 className="font-serif text-lg font-bold text-white">{feat.title}</h4>
                <p className="text-white/60 text-xs leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ── */}
      <section 
        className="py-24 bg-black/25 border-y border-white/5"
        onMouseEnter={() => setTestiPaused(true)}
        onMouseLeave={() => setTestiPaused(false)}
      >
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8 relative">
          <Quote size={40} className="mx-auto opacity-20" style={{ color: GOLD }} />
          
          <div className="h-44 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={testiIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <p className="text-lg sm:text-xl font-serif italic text-white/90 leading-relaxed">
                  &ldquo;{testimonials[testiIdx].quote}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-0.5">
                  {[...Array(testimonials[testiIdx].rating)].map((_, i) => (
                    <Star key={i} size={13} className="fill-current" style={{ color: GOLD }} />
                  ))}
                </div>
                <div>
                  <h5 className="font-semibold text-[#FDFBF7] text-sm">{testimonials[testiIdx].name}</h5>
                  <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider">{testimonials[testiIdx].location}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTestiIdx(idx)}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer"
                style={{ backgroundColor: testiIdx === idx ? GOLD : "rgba(255,255,255,0.15)" }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. GALLERY / INSTAGRAM STRIP ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-2">
          <span className="font-serif italic text-lg text-[#C9A84C]" style={{ fontFamily: "Georgia, serif" }}>Visual Diaries</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-wide" style={{ fontFamily: "Georgia, serif" }}>Captures from our Travelers</h2>
          <div className="w-12 h-0.5 mx-auto mt-4 bg-[#C9A84C]" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {galleryPhotos.map((photo, i) => (
            <div
              key={i}
              className="relative h-48 rounded-xl overflow-hidden cursor-pointer group border border-white/5"
              onClick={() => setLightboxImg(photo)}
            >
              <img
                src={resolveImg(photo, 300, 300)}
                alt="Travel moments"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs font-mono uppercase tracking-widest border border-white/30 px-3 py-1.5 rounded-sm">View</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImg(null)}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-xl border border-white/15"
              >
                <img
                  src={resolveImg(lightboxImg, 1200, 800)}
                  alt="Enlarged gallery capture"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setLightboxImg(null)}
                  className="absolute top-4 right-4 text-white hover:text-[#C9A84C] transition-colors"
                >
                  <X size={24} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── 8. NEWSLETTER / INQUIRY CTA BANNER ── */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#4A121A] to-[#131F14] border-t border-white/5 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, ${GOLD} 1px, transparent 1px)`, backgroundSize: "24px 24px" }}
        />
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A84C] font-bold">Plan a custom trip</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#FDFBF7]" style={{ fontFamily: "Georgia, serif" }}>Need a Custom Pilgrimage or Tour Plan?</h2>
          <p className="text-white/70 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Send us your expected dates and traveler counts. Our yatra coordinators will build a personalized itinerary with transparent rates.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 mt-8">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C] transition-all placeholder:text-white/40"
            />
            <button
              onClick={() => router.push("/inquiry")}
              className="px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: GOLD, color: "#131F14" }}
            >
              Get Quote
            </button>
          </div>
        </div>
      </section>

      {/* ── 10. FILTER + PACKAGE GRID SECTION ── */}
      <section id="package-grid-anchor" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        
        {/* Sticky Filters Header */}
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          
          {/* Left Column: Filter Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0 bg-black/20 p-6 rounded-2xl border border-white/5 space-y-8 sticky top-28">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <SlidersHorizontal size={16} style={{ color: GOLD }} /> Filters
              </h3>
              {(selectedRegion !== "all" || selectedDurations.length > 0 || maxPrice < 140000 || sortBy !== "default" || searchQuery !== "") && (
                <button
                  onClick={handleResetFilters}
                  className="text-[10px] font-mono text-[#C9A84C] uppercase tracking-wider hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Region Tabs (Simplified inside sidebar) */}
            <div className="space-y-3">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-white/50">Region</span>
              <div className="flex flex-col gap-1.5">
                {[
                  { id: "all", label: "All Packages" },
                  { id: "pilgrimage", label: "Pilgrimage Sites" },
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
                    className="w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between cursor-pointer"
                    style={{
                      background: selectedRegion === r.id ? "rgba(201,168,76,0.08)" : "transparent",
                      color: selectedRegion === r.id ? GOLD : "rgba(255,255,255,0.7)"
                    }}
                  >
                    <span>{r.label}</span>
                    {selectedRegion === r.id && <Check size={12} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration filter */}
            <div className="space-y-3">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-white/50">Duration</span>
              <div className="space-y-2">
                {[
                  { id: "1-2", label: "1 - 2 Days" },
                  { id: "3-4", label: "3 - 4 Days" },
                  { id: "5-7", label: "5 - 7 Days" },
                  { id: "8+", label: "8+ Days" }
                ].map((d) => (
                  <label key={d.id} className="flex items-center gap-2.5 text-xs text-white/70 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedDurations.includes(d.id)}
                      onChange={() => handleDurationToggle(d.id)}
                      className="accent-[#C9A84C] h-4 w-4 rounded border-white/10 bg-black/20"
                    />
                    <span>{d.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price range dual-handle input */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Max Price</span>
                <span className="text-xs font-mono font-bold text-[#C9A84C]">
                  {formatIndianCurrency(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={140000}
                step={5000}
                value={priceInput}
                onChange={(e) => setPriceInput(Number(e.target.value))}
                onMouseUp={() => setMaxPrice(priceInput)}
                onTouchEnd={() => setMaxPrice(priceInput)}
                className="w-full accent-[#C9A84C] bg-white/10 h-1 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-white/35 font-mono">
                <span>₹5,000</span>
                <span>₹1.4 Lakh</span>
              </div>
            </div>

            {/* Sorting */}
            <div className="space-y-3">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-white/50">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-[#C9A84C] transition-all text-white/80 cursor-pointer"
              >
                <option value="default">Popular Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="duration">Duration Days</option>
                <option value="popularity">Guest Rating</option>
              </select>
            </div>

          </div>

          {/* Right Column: Grid and Counter */}
          <div className="flex-1 w-full space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                Showing {filteredTours.length} of {TOURS_DATA.length} packages
              </span>
              {searchQuery && (
                <div className="text-xs flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/25 text-[#C9A84C]">
                  Query: {searchQuery}
                  <button onClick={() => setSearchQuery("")} className="hover:text-white"><X size={10} /></button>
                </div>
              )}
            </div>

            <AnimatePresence mode="popLayout">
              {filteredTours.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredTours.map((tour) => (
                    <motion.div
                      key={tour.slug}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.28 }}
                    >
                      <TourCard tour={tour} />
                    </motion.div>
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
                  <h4 className="font-serif text-xl font-bold text-white">No Tour Packages Found</h4>
                  <p className="text-white/40 text-xs max-w-sm mx-auto">
                    Try adjusting your filters, selecting a different region, or widening your maximum price range.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all duration-300 cursor-pointer"
                    style={{ borderColor: GOLD, color: GOLD }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.08)";
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
          </div>

        </div>

      </section>

    </div>
  );
}

export default function ExploreToursPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0d1a12] flex items-center justify-center text-white/60">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin mx-auto" />
          <span className="font-mono text-xs uppercase tracking-widest">Loading Tours...</span>
        </div>
      </div>
    }>
      <ToursContent />
    </Suspense>
  );
}
