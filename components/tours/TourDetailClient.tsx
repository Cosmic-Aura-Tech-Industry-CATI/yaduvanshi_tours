"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, Star, Check, X, 
  ChevronDown, Send, Loader2, Info
} from "lucide-react";
import { type TourPackage, TOUR_PRICING } from "@/data/tours";
import { 
  RegionBadge, formatIndianCurrency, 
  TourCard, resolveImg 
} from "@/components/tours/SharedComponents";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";

interface ClientProps {
  tour: TourPackage;
  relatedTours: TourPackage[];
}

export function TourDetailClient({ tour, relatedTours }: ClientProps) {
  // Gallery State
  const [activeImg, setActiveImg] = useState(tour.gallery[0] || tour.image);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Accordion State
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  // Form Submission State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    travelDate: "",
    travelers: "2",
    message: ""
  });
  
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in your Name and Phone number.");
      return;
    }

    setFormStatus("idle");
    
    startTransition(async () => {
      try {
        const response = await fetch("/api/inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            subject: `Inquiry: ${tour.name}`,
            packageSlug: tour.slug
          })
        });

        if (response.ok) {
          setFormStatus("success");
          setFormData({
            name: "",
            phone: "",
            email: "",
            travelDate: "",
            travelers: "2",
            message: ""
          });
        } else {
          setFormStatus("error");
        }
      } catch (err) {
        console.error("Inquiry error:", err);
        setFormStatus("error");
      }
    });
  };

  // Pricing rates baseline
  const pricing = TOUR_PRICING[tour.slug];
  const isCharDham = tour.slug === "char-dham-yatra";
  const pricingTiers = isCharDham
    ? [
        { vehicle: "Tempo Traveller (17-seater)", price: "₹1,40,000", bestFor: "Families & Large Pilgrimage Groups" },
        { vehicle: "Mini Luxury Bus (26-seater)", price: "₹1,90,000", bestFor: "Corporate / Extended Family Yatra" }
      ]
    : [
        { 
          vehicle: "Premium Sedan (5-seater)", 
          price: pricing?.fiveSeater || `${formatIndianCurrency(tour.startingPrice)}–${formatIndianCurrency(Math.round(tour.startingPrice * 1.15))}`, 
          bestFor: "Couple or small family (3-4 Pax)" 
        },
        { 
          vehicle: "Comfort SUV (7-seater)", 
          price: pricing?.sevenSeater || `${formatIndianCurrency(Math.round(tour.startingPrice * 1.35))}–${formatIndianCurrency(Math.round(tour.startingPrice * 1.5))}`, 
          bestFor: "Medium family group (5-6 Pax)" 
        },
        { 
          vehicle: "Tempo Traveller (17-seater)", 
          price: pricing?.special?.[0]?.price || `${formatIndianCurrency(Math.round(tour.startingPrice * 2.2))}–${formatIndianCurrency(Math.round(tour.startingPrice * 2.4))}`, 
          bestFor: "Large pilgrimage group (8-16 Pax)" 
        }
      ];

  return (
    <div className="min-h-screen text-[#D8CFC7] pb-24 bg-[#0C1519] relative overflow-hidden">
      {/* Background blobs for firelight depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-10"
        style={{ background: `radial-gradient(circle, ${BRASS}, transparent 70%)` }} />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-5"
        style={{ background: `radial-gradient(circle, ${COFFEE}, transparent 70%)` }} />

      {/* ── 1. IMAGE GALLERY HERO ── */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-black/80 z-10">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImg}
            src={resolveImg(activeImg, 1600, 900)}
            alt={tour.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover cursor-zoom-in"
            onClick={() => setLightboxOpen(true)}
          />
        </AnimatePresence>

        {/* Text Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1519] via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-8 left-0 right-0 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <RegionBadge region={tour.region} />
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[10px] font-accent font-bold tracking-wider uppercase border border-white/20 bg-white/5 text-white/90">
                {tour.durationDays} Days / {tour.durationDays - 1} Nights
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white tracking-wide">
              {tour.name}
            </h1>
            <p className="text-[#D8CFC7]/80 text-xs sm:text-sm font-sans max-w-xl italic">
              {tour.tagline}
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 bg-[#162127]/60 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10 text-xs font-mono">
            <Star size={14} className="fill-current text-[#E8B96A]" />
            <span className="font-bold text-white">{tour.rating}</span>
            <span className="text-[#D8CFC7]/40">({tour.reviewsCount} reviews)</span>
          </div>
        </div>
      </section>

      {/* Thumbnails row */}
      <div className="max-w-7xl mx-auto px-6 mt-4 relative z-10">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {tour.gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(img)}
              className="relative w-24 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer"
              style={{ borderColor: activeImg === img ? GOLD : "transparent" }}
            >
              <img
                src={resolveImg(img, 150, 100)}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
        
        {/* Left Column (8 cols): Description, Itinerary, Pricing, Inclusions */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Overview Block */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold tracking-wide text-white">Tour Overview</h3>
            <p className="text-[#D8CFC7]/75 text-sm leading-relaxed font-sans">
              {tour.description}
            </p>
            
            {/* Destinations Covered */}
            <div className="pt-4 space-y-3">
              <span className="block text-[10px] font-accent text-[#D8CFC7]/50 uppercase tracking-widest">
                Destinations Covered
              </span>
              <div className="flex flex-wrap gap-2">
                {tour.destinations.map((dest) => (
                  <span 
                    key={dest} 
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-white/5 border border-white/10 font-sans"
                  >
                    <MapPin size={11} style={{ color: GOLD }} />
                    {dest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Itinerary Accordion */}
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold tracking-wide text-white">Day-by-Day Itinerary</h3>
            <div className="space-y-3">
              {tour.itinerary.map((day) => {
                const isExpanded = expandedDay === day.day;
                return (
                  <div 
                    key={day.day} 
                    className="rounded-xl border transition-all duration-350 overflow-hidden"
                    style={{ 
                      borderColor: isExpanded ? `${GOLD}30` : "rgba(255,255,255,0.05)",
                      background: isExpanded ? "rgba(58, 53, 52, 0.2)" : "transparent"
                    }}
                  >
                    <button
                      onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold border" style={{ borderColor: isExpanded ? GOLD : "rgba(255,255,255,0.15)", color: isExpanded ? GOLD : "white" }}>
                          D{day.day}
                        </span>
                        <h4 className="font-display font-bold text-sm sm:text-base text-white/95">
                          {day.title}
                        </h4>
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`text-white/40 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} 
                      />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                        >
                          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#D8CFC7]/75 leading-relaxed pl-16 border-t border-white/5 font-sans">
                            {day.description}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing Matrix Table */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold tracking-wide text-white">Flat Package Pricing</h3>
            
            <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#162127]/20">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-[#D8CFC7]/50 uppercase tracking-widest font-accent text-[10px]">
                    <th className="p-4">Vehicle Category</th>
                    <th className="p-4">Pricing Basis</th>
                    <th className="p-4">Best For</th>
                    <th className="p-4 text-right">Starting Fare</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pricingTiers.map((tier, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-semibold text-white/95">{tier.vehicle}</td>
                      <td className="p-4 font-mono text-white/40 uppercase text-[10px]">Complete Fleet Flat Rate</td>
                      <td className="p-4 text-[#D8CFC7]/60">{tier.bestFor}</td>
                      <td className="p-4 text-right font-display font-bold text-[#E8B96A] text-sm sm:text-base">
                        {tier.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-start gap-2.5 p-4 rounded-xl border border-white/5 bg-white/5">
              <Info size={16} style={{ color: GOLD }} className="flex-shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed text-[#D8CFC7]/50 font-sans">
                All prices are per vehicle, inclusive of driver allowance, fuel, tolls, and inter-state highway taxes. **Not per person.** Entry fees, VIP darshan passes, and meals are extra unless stated.
              </p>
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-10">
            <div className="space-y-4">
              <h4 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <Check size={18} className="text-green-500" /> What&apos;s Included
              </h4>
              <ul className="space-y-2.5">
                {tour.inclusions.map((inc, i) => (
                  <li key={i} className="flex gap-2 items-start text-xs text-[#D8CFC7]/75 leading-relaxed font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8B96A] mt-2 flex-shrink-0" />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <X size={18} className="text-red-500" /> Not Included
              </h4>
              <ul className="space-y-2.5">
                {tour.exclusions.map((exc, i) => (
                  <li key={i} className="flex gap-2 items-start text-xs text-[#D8CFC7]/75 leading-relaxed font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    {exc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Booking Inquiry Form Widget */}
        <div className="lg:col-span-4">
          <div 
            className="p-6 rounded-2xl border sticky top-28 shadow-2xl backdrop-blur-md space-y-6 glass-panel"
            style={{
              background: "rgba(58, 53, 52, 0.25)",
              borderColor: "rgba(207, 157, 123, 0.25)",
            }}
          >
            <div className="space-y-2 text-center border-b border-white/10 pb-4">
              <span className="text-[10px] font-accent uppercase tracking-widest text-[#D8CFC7]/50">Starting Rate</span>
              <h4 className="text-3xl font-display font-bold text-[#E8B96A]">
                {formatIndianCurrency(tour.startingPrice)}
              </h4>
              <span className="text-[10px] text-[#D8CFC7]/50 font-sans block">Inclusive of all tolls, taxes, & driver fuel</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-accent text-[#D8CFC7]/50 uppercase tracking-wider block">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#162127]/60 border border-white/10 rounded-lg focus:outline-none focus:border-[#E8B96A] text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-accent text-[#D8CFC7]/50 uppercase tracking-wider block">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#162127]/60 border border-white/10 rounded-lg focus:outline-none focus:border-[#E8B96A] text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-accent text-[#D8CFC7]/50 uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@domain.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#162127]/60 border border-white/10 rounded-lg focus:outline-none focus:border-[#E8B96A] text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-accent text-[#D8CFC7]/50 uppercase tracking-wider block">Travel Date</label>
                  <input
                    type="date"
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#162127]/60 border border-white/10 rounded-lg focus:outline-none focus:border-[#E8B96A] text-white/70"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-accent text-[#D8CFC7]/50 uppercase tracking-wider block">No. of Travelers</label>
                  <select
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#162127]/60 border border-white/10 rounded-lg focus:outline-none focus:border-[#E8B96A] text-white/80 cursor-pointer"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3-4">3 - 4 People</option>
                    <option value="5-7">5 - 7 People</option>
                    <option value="8+">8+ People</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-accent text-[#D8CFC7]/50 uppercase tracking-wider block">Special Requests</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your requirements..."
                  className="w-full px-3.5 py-2.5 text-xs bg-[#162127]/60 border border-white/10 rounded-lg focus:outline-none focus:border-[#E8B96A] text-white placeholder:text-white/20"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3.5 rounded-full text-xs font-bold font-accent tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all hover:brightness-110"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
                  color: "#0C1519",
                  boxShadow: `0 4px 15px rgba(232,185,106,0.2)`
                }}
              >
                {isPending ? (
                  <>
                    <Loader2 size={13} className="animate-spin" /> SUBMITTING...
                  </>
                ) : (
                  <>
                    <Send size={13} /> SUBMIT YATRA INQUIRY
                  </>
                )}
              </button>
            </form>

            <AnimatePresence>
              {formStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-3.5 rounded-lg border border-green-500/20 bg-green-500/10 text-green-400 text-xs text-center font-sans leading-relaxed"
                >
                  ✓ Thank you! Our yatra desk will call you shortly to confirm details.
                </motion.div>
              )}
              {formStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-3.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-xs text-center font-sans leading-relaxed"
                >
                  ✗ Submission failed. Please call us directly at our contact numbers.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* ── Related packages ── */}
      {relatedTours.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-24 border-t border-white/5 pt-16 space-y-8 relative z-10">
          <h3 className="font-display text-2xl font-bold tracking-wide text-white">
            Related {tour.region === "pilgrimage" ? "Pilgrimage" : "Regional"} Packages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTours.map((rel) => (
              <TourCard key={rel.slug} tour={rel} />
            ))}
          </div>
        </section>
      )}

      {/* ── Sticky Mobile CTA ── */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#162127]/90 backdrop-blur-md border-t border-white/10 p-4 block lg:hidden"
        style={{ boxShadow: "0 -8px 24px rgba(0,0,0,0.5)" }}
      >
        <div className="flex justify-between items-center max-w-md mx-auto">
          <div>
            <span className="block text-[9px] uppercase tracking-widest text-[#D8CFC7]/50 font-mono">Starting Yatra Fare</span>
            <span className="font-display text-lg font-bold text-[#E8B96A]">
              {formatIndianCurrency(tour.startingPrice)}
            </span>
          </div>
          
          <button
            onClick={() => {
              const formEl = document.querySelector("form");
              if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-5 py-3 rounded-full text-xs font-bold font-accent tracking-widest cursor-pointer shadow-md"
            style={{
              background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
              color: "#0C1519",
            }}
          >
            ENQUIRE NOW
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-xl border border-white/15"
            >
              <img
                src={resolveImg(activeImg, 1200, 800)}
                alt={tour.name}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-[#E8B96A] transition-colors"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
