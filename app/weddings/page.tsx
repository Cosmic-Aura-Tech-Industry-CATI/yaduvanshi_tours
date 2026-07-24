"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Heart, UserCheck, Sparkles } from "lucide-react";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";
const IVORY = "#F5F0EA";

const WEDDING_FLEET = [
  {
    name: "Honda City (Sunroof)",
    category: "SEDANS",
    seats: 5,
    price: "₹3,800 – ₹7,000",
    image: "/vehicles/honda-city.webp"
  },
  {
    name: "Hyundai Verna (Sunroof)",
    category: "SEDANS",
    seats: 5,
    price: "₹4,000 – ₹7,500",
    image: "/vehicles/hyundai-verna.webp"
  },
  {
    name: "Mahindra Scorpio",
    category: "SUVS",
    seats: 7,
    price: "₹2,700 – ₹4,000",
    image: "/vehicles/mahindra-scorpio.webp"
  },
  {
    name: "Toyota Fortuner",
    category: "SUVS",
    seats: 7,
    price: "₹22,000 – ₹30,000",
    image: "/vehicles/toyota-fortuner.webp"
  },
  {
    name: "Audi A6",
    category: "LUXURY CARS",
    seats: 5,
    price: "₹12,000 – ₹18,000",
    image: "/vehicles/audi-a6.webp"
  },
  {
    name: "Mercedes-Benz",
    category: "LUXURY CARS",
    seats: 5,
    price: "₹18,000 – ₹30,000",
    image: "/vehicles/mercedes-benz.webp"
  }
];

function WeddingFleetCard({ car, idx }: { car: typeof WEDDING_FLEET[0]; idx: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.08, duration: 0.5 }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="rounded-2xl overflow-hidden border flex flex-col glass-panel corner-brackets hover-glow transition-all duration-300"
      style={{
        boxShadow: hovered
          ? `0 0 35px rgba(207, 157, 123, 0.35), 0 20px 40px rgba(0,0,0,0.55)`
          : "0 0 20px rgba(207, 157, 123, 0.12), 0 4px 20px rgba(0,0,0,0.35)",
        border: hovered ? `1.5px solid ${BRASS}50` : "1.5px solid rgba(207, 157, 123, 0.18)",
        background: "rgba(22, 33, 39, 0.15)",
        transition: "border 0.3s, box-shadow 0.4s",
      }}
    >
      {/* Image: white background, centered model, reuse Vehicle Rentals source */}
      <div className="h-56 md:h-64 bg-white flex items-center justify-center p-6 relative overflow-hidden border-b border-white/5">
        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(105deg, transparent 40%, rgba(207, 157, 123, 0.08) 50%, transparent 60%)`,
            transform: hovered ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 0.9s ease",
          }}
        />

        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-contain transition-transform duration-700 relative z-0"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />
      </div>
      
      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Uppercase Category label */}
          <span className="text-[#E8B96A] font-accent text-[9px] font-bold uppercase tracking-widest block mb-1.5">
            {car.category}
          </span>
          
          {/* Name (Bold, large font, wraps to two lines if needed) */}
          <h3 
            className="font-display font-bold text-sm transition-colors leading-tight mb-2"
            style={{ color: hovered ? GOLD : IVORY }}
          >
            {car.name}
          </h3>
          
          {/* Seats count with icon row */}
          <div className="flex items-center gap-1.5 text-[10px] text-[#D8CFC7]/50 font-mono mb-3">
            <span className="text-[#CF9D7B]">👤</span>
            <span>{car.seats} Seats</span>
          </div>
        </div>

        <div>
          {/* Price range in gold, larger font, own line */}
          <div className="text-[#E8B96A] font-mono font-bold text-sm mb-4">
            {car.price}
          </div>
          
          {/* Reserve Car button: outline/ghost style, full-width, links to prefilled inquiry */}
          <Link
            href={`/inquiry?type=wedding&vehicle=${encodeURIComponent(car.name)}`}
            className="w-full py-2 rounded-lg border flex items-center justify-center gap-1 text-[9px] font-accent tracking-widest uppercase font-bold transition-all duration-200"
            style={{
              borderColor: hovered ? GOLD : "rgba(232, 185, 106, 0.3)",
              color: hovered ? "#0C1519" : GOLD,
              background: hovered ? GOLD : "transparent"
            }}
          >
            Reserve Car <ArrowRight size={10} />
          </Link>
        </div>
      </div>

      {/* Animated bottom glowing line on hover */}
      <div
        className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
        style={{
          width: hovered ? "100%" : "0%",
          background: `linear-gradient(to right, ${GOLD}, ${BRASS})`,
          boxShadow: hovered ? `0 0 10px ${GOLD}40` : "none",
        }}
      />
    </motion.div>
  );
}

function WeddingSpecialityCard({ srv, idx }: { srv: any; idx: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = srv.Icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="p-6 rounded-xl border flex flex-col items-center text-center gap-4 glass-panel corner-brackets hover-glow transition-all duration-300"
      style={{
        background: "rgba(58, 53, 52, 0.25)",
        border: hovered ? `1px solid ${BRASS}50` : "1px solid rgba(207, 157, 123, 0.15)",
        boxShadow: hovered ? `0 0 25px rgba(207, 157, 123, 0.2)` : "none"
      }}
    >
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-2 transition-all duration-500"
        style={{
          background: hovered ? GOLD : "rgba(207, 157, 123, 0.1)",
          border: `1px solid rgba(207, 157, 123, 0.25)`,
          transform: hovered ? "scale(1.1) rotate(5deg)" : "scale(1)"
        }}
      >
        <Icon size={20} style={{ color: hovered ? "#0C1519" : BRASS }} />
      </div>
      <h3 
        className="font-display font-semibold text-base transition-colors duration-300"
        style={{ color: hovered ? GOLD : IVORY }}
      >
        {srv.title}
      </h3>
      <p className="text-[#D8CFC7]/70 text-xs leading-relaxed font-sans">{srv.desc}</p>
    </motion.div>
  );
}

export default function WeddingsPage() {
  return (
    <div className="bg-[#0C1519] min-h-screen pt-28 pb-20 text-[#D8CFC7] overflow-hidden relative">
      {/* Background blobs for firelight depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-10"
        style={{ background: `radial-gradient(circle, ${BRASS}, transparent 70%)` }} />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-5"
        style={{ background: `radial-gradient(circle, ${COFFEE}, transparent 70%)` }} />

      {/* Immersive Header / Hero with Full-Bleed Background Image */}
      <section className="relative py-28 md:py-36 px-6 lg:px-12 overflow-hidden z-10 text-center flex items-center justify-center min-h-[400px] md:min-h-[500px]">
        {/* Full-Bleed Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/vehicles/wedding-hero.png')",
          }}
        />
        {/* Dark theme gradient overlay for contrast and readability */}
        <div 
          className="absolute inset-0 z-10 bg-gradient-to-b from-[#0C1519]/85 via-[#0C1519]/75 to-[#0C1519]"
        />

        {/* Content Layer */}
        <div className="max-w-7xl mx-auto relative z-20 space-y-4">
          <span className="text-[#E8B96A] font-accent text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] block mb-3 font-semibold">Premium Wedding Travel</span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-white">
            Tension-Free <span className="text-[#E8B96A]">Wedding Logistics</span>
          </h1>
          <p className="text-[#D8CFC7]/80 text-base md:text-lg max-w-2xl mx-auto mt-5 font-sans leading-relaxed">
            Ensure grand arrivals, coordinated airport pickups, and premium decorated rides handled by elite highway chauffeurs.
          </p>
          <div className="w-24 h-0.5 mx-auto mt-6" style={{ background: `linear-gradient(to right, transparent, ${BRASS}, transparent)` }} />
          
          <div className="pt-6">
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link
                href="/inquiry?type=wedding"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold font-accent tracking-widest cursor-pointer transition-all text-[#0C1519]"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
                  boxShadow: `0 4px 20px rgba(232, 185, 106, 0.35)`
                }}
              >
                GET WEDDING QUOTE <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Fleet grid (Premium Selection - Handpicked for your big day) */}
      <section className="max-w-7xl mx-auto px-6 mt-16 relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#CF9D7B] font-accent text-xs uppercase tracking-[0.2em] font-semibold">Premium Selection</span>
          <h2 className="font-display text-3xl font-bold text-white mt-2 font-serif">Handpicked for your big day.</h2>
          <div className="w-16 h-px mx-auto mt-4" style={{ background: `linear-gradient(to right, transparent, ${COFFEE}, transparent)` }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {WEDDING_FLEET.map((car, idx) => (
            <WeddingFleetCard key={idx} car={car} idx={idx} />
          ))}
        </div>
      </section>

      {/* Core Services Focus (How We Serve You - Our Wedding Specialities) */}
      <section className="max-w-7xl mx-auto px-6 mt-28 relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#CF9D7B] font-accent text-xs uppercase tracking-[0.2em] font-semibold">How We Serve You</span>
          <h2 className="font-display text-3xl font-bold text-white mt-2">Our Wedding Specialities</h2>
          <div className="w-16 h-px mx-auto mt-4" style={{ background: `linear-gradient(to right, transparent, ${COFFEE}, transparent)` }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              Icon: Sparkles,
              title: "Bride's Grand Entry",
              desc: "Arrive gracefully in premium decorated luxury sedans fitted with sunroofs for scenic floral photoshoots.",
            },
            {
              Icon: Heart,
              title: "Groom's Baraat Lead",
              desc: "Lead the groom's procession with muscular SUVs like the Fortuner or Scorpio, ensuring absolute road presence.",
            },
            {
              Icon: UserCheck,
              title: "Coordination & Guest Shuttles",
              desc: "Coordinated guest transits in luxury Tempo Travellers or MPVs from airport to venue with dedicated drivers.",
            },
          ].map((srv, idx) => (
            <WeddingSpecialityCard key={idx} srv={srv} idx={idx} />
          ))}
        </div>
      </section>

      {/* Trust banner */}
      <section 
        className="p-8 md:p-12 rounded-xl max-w-7xl mx-auto px-6 mt-28 border text-center space-y-5 relative z-10 glass-panel"
        style={{
          background: "rgba(58, 53, 52, 0.25)",
          borderColor: "rgba(207, 157, 123, 0.25)",
        }}
      >
        <h3 className="font-display text-2xl font-bold tracking-wide text-white">Looking for customized guest route transits?</h3>
        <p className="text-[#D8CFC7]/60 text-xs max-w-md mx-auto leading-relaxed font-sans">
          Provide us your guest arrivals list, and we will configure multi-vehicle schedules in private Tempo Travellers or Ertigas for seamless pickups.
        </p>
        <div className="pt-3">
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link
              href="/inquiry?type=wedding"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold font-accent tracking-widest transition-all text-[#0C1519]"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
                boxShadow: `0 4px 20px rgba(232, 185, 106, 0.25)`
              }}
            >
              Submit Guest Logistics Plan <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
