"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Heart, UserCheck, Sparkles, Star } from "lucide-react";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";

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
    <div className="bg-[#FAFAF8] min-h-screen pt-28 pb-20">
      {/* Immersive Header */}
      <section className="bg-[#1A2B1C] text-white py-20 px-6 relative overflow-hidden border-b border-[#C9A84C]/20">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#C9A84C_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-4">
          <span className="text-[#C9A84C] font-mono text-xs uppercase tracking-widest block">Premium Wedding Travel</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wide">Tension-Free Wedding Logistics</h1>
          <p className="text-white/60 text-sm max-w-xl mx-auto leading-relaxed">
            Ensure grand arrivals, coordinated airport pickups, and premium decorated rides handled by elite highway chauffeurs.
          </p>
          <div className="pt-4">
            <Link
              href="/inquiry?type=wedding"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-xs font-semibold cursor-pointer transition-all hover:brightness-95"
              style={{ backgroundColor: GOLD, color: DARK }}
            >
              Get Wedding Quote <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Core Services Focus */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="text-center mb-10">
          <span className="text-[#C9A84C] font-mono text-xs uppercase tracking-wider">How We Serve You</span>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 mt-1">Our Wedding Specialities</h2>
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
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] mb-2">
                <srv.Icon size={20} />
              </div>
              <h3 className="font-display font-semibold text-gray-900 text-sm">{srv.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed font-sans">{srv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Fleet grid */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="text-center mb-10">
          <span className="text-[#C9A84C] font-mono text-xs uppercase tracking-wider">Premium Selection</span>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 mt-1">Featured Wedding Fleet</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WEDDING_FLEET.map((car, idx) => (
            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group flex flex-col">
              <div className="h-48 overflow-hidden bg-gray-100 relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#1A2B1C] text-[#C9A84C] text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">
                  {car.category}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-gray-800 text-sm">{car.name}</h3>
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed font-sans">{car.tagline}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-gray-50">
                  <Link
                    href={`/inquiry?type=wedding&vehicle=${car.name.toLowerCase().replace(/ /g, "-")}`}
                    className="text-xs font-semibold text-[#C9A84C] hover:text-[#1A2B1C] flex items-center gap-1 hover:gap-2 transition-all font-display"
                  >
                    Select vehicle & request rates <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust banner */}
      <section className="bg-[#1A2B1C] text-white p-8 md:p-12 rounded-xl max-w-7xl mx-auto px-6 mt-20 border border-[#C9A84C]/25 text-center space-y-4">
        <h3 className="font-display text-xl md:text-2xl font-bold tracking-wide">Looking for customized guest route transits?</h3>
        <p className="text-white/60 text-xs max-w-md mx-auto leading-relaxed">
          Provide us your guest arrivals list, and we will configure multi-vehicle schedules in private Tempo Travellers or Ertigas for seamless pickups.
        </p>
        <div className="pt-2">
          <Link
            href="/inquiry?type=wedding"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm text-xs font-semibold hover:brightness-95 transition-all"
            style={{ backgroundColor: GOLD, color: DARK }}
          >
            Submit Guest Logistcs Plan <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </div>
  );
}
