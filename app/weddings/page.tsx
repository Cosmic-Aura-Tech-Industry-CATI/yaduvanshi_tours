"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Heart, UserCheck, Sparkles } from "lucide-react";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";

const resolveImg = (src: string, w: number, h: number) =>
  src.startsWith("/")
    ? src
    : `https://images.unsplash.com/${src}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

const WEDDING_FLEET = [
  {
    name: "Mercedes-Benz E-Class",
    category: "Luxury Flagship",
    tagline: "Ultimate luxury and styling for the bride & groom's grand exit.",
    image: "/weddings/wedding-car.webp",
  },
  {
    name: "Audi A6 Sedan",
    category: "Luxury Elite",
    tagline: "Sophisticated styling and panoramic comfort for VIP entries.",
    image: "/weddings/wedding-convoy.webp",
  },
  {
    name: "Toyota Fortuner",
    category: "Command SUV",
    tagline: "Unmatched road presence for the groom's baraat leading caravan.",
    image: "/vehicles/toyota-fortuner.webp",
  },
  {
    name: "Honda City (Sunroof)",
    category: "Executive Sedan",
    tagline: "Premium comfort and sunroof capture moments for the bride's arrival.",
    image: "/weddings/wedding-couple.webp",
  },
  {
    name: "Mahindra Scorpio",
    category: "Commanding Escort",
    tagline: "High stability and presence for bridal family logistics.",
    image: "/vehicles/toyota-innova-crysta.webp",
  },
  {
    name: "Hyundai Verna (Sunroof)",
    category: "Executive Sport",
    tagline: "Dynamic look, perfect for modern photoshoot themes.",
    image: "/vehicles/maruti-dzire.webp",
  },
];

export default function WeddingsPage() {
  return (
    <div className="bg-[#0C1519] min-h-screen pt-28 pb-20 text-[#D8CFC7] overflow-hidden relative">
      {/* Background blobs for firelight depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-10"
        style={{ background: `radial-gradient(circle, ${BRASS}, transparent 70%)` }} />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-5"
        style={{ background: `radial-gradient(circle, ${COFFEE}, transparent 70%)` }} />

      {/* Immersive Header */}
      <section className="relative py-20 px-6 overflow-hidden z-10 text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-[#E8B96A] font-accent text-xs uppercase tracking-[0.25em] block mb-3 font-semibold">Premium Wedding Travel</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-wide text-white">
            Tension-Free <span className="text-[#E8B96A]">Wedding Logistics</span>
          </h1>
          <p className="text-[#D8CFC7]/60 text-sm md:text-base max-w-xl mx-auto mt-5 font-sans leading-relaxed">
            Ensure grand arrivals, coordinated airport pickups, and premium decorated rides handled by elite highway chauffeurs.
          </p>
          <div className="w-24 h-0.5 mx-auto mt-6" style={{ background: `linear-gradient(to right, transparent, ${BRASS}, transparent)` }} />
          
          <div className="pt-6">
            <Link
              href="/inquiry?type=wedding"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold font-accent tracking-widest cursor-pointer transition-all hover:brightness-110 text-[#0C1519]"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
                boxShadow: `0 4px 15px rgba(232,185,106,0.2)`
              }}
            >
              GET WEDDING QUOTE <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Core Services Focus */}
      <section className="max-w-7xl mx-auto px-6 mt-16 relative z-10">
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
            <div 
              key={idx} 
              className="p-6 rounded-xl border flex flex-col items-center text-center gap-4 glass-panel"
              style={{
                background: "rgba(58, 53, 52, 0.25)",
                borderColor: "rgba(207, 157, 123, 0.15)",
              }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-2"
                style={{
                  background: "rgba(207, 157, 123, 0.1)",
                  border: `1px solid rgba(207, 157, 123, 0.25)`,
                }}
              >
                <srv.Icon size={20} style={{ color: BRASS }} />
              </div>
              <h3 className="font-display font-semibold text-white text-base">{srv.title}</h3>
              <p className="text-[#D8CFC7]/70 text-xs leading-relaxed font-sans">{srv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Fleet grid */}
      <section className="max-w-7xl mx-auto px-6 mt-28 relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#CF9D7B] font-accent text-xs uppercase tracking-[0.2em] font-semibold">Premium Selection</span>
          <h2 className="font-display text-3xl font-bold text-white mt-2">Featured Wedding Fleet</h2>
          <div className="w-16 h-px mx-auto mt-4" style={{ background: `linear-gradient(to right, transparent, ${COFFEE}, transparent)` }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WEDDING_FLEET.map((car, idx) => (
            <div 
              key={idx} 
              className="rounded-xl overflow-hidden border group flex flex-col glass-panel"
              style={{
                background: "rgba(58, 53, 52, 0.25)",
                borderColor: "rgba(207, 157, 123, 0.15)",
              }}
            >
              <div className="h-48 overflow-hidden bg-black/40 relative">
                <img
                  src={resolveImg(car.image, 600, 400)}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#162127] text-[#E8B96A] text-[9px] font-accent font-bold uppercase tracking-widest px-2.5 py-1 rounded border border-[#CF9D7B]/30">
                  {car.category}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-white text-base">{car.name}</h3>
                  <p className="text-[#D8CFC7]/60 text-xs mt-2 leading-relaxed font-sans">{car.tagline}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5">
                  <Link
                    href={`/inquiry?type=wedding&vehicle=${car.name.toLowerCase().replace(/ /g, "-")}`}
                    className="text-xs font-semibold text-[#E8B96A] hover:text-white flex items-center gap-1.5 hover:translate-x-1 transition-all font-accent uppercase tracking-wider"
                  >
                    Select vehicle & request rates <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
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
          <Link
            href="/inquiry?type=wedding"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold font-accent tracking-widest hover:brightness-110 transition-all text-[#0C1519]"
            style={{
              background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
              boxShadow: `0 4px 15px rgba(232,185,106,0.15)`
            }}
          >
            Submit Guest Logistics Plan <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </div>
  );
}
