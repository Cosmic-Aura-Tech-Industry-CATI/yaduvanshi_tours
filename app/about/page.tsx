"use client";

import { CheckCircle2, Shield, Calendar, Users, Award, Star } from "lucide-react";
import { REVIEWS } from "@/data/reviews";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";

export default function AboutPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-28 pb-20">
      {/* Header */}
      <section className="bg-[#1A2B1C] text-white py-16 px-6 relative overflow-hidden border-b border-[#C9A84C]/20">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#C9A84C_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-[#C9A84C] font-mono text-xs uppercase tracking-widest block mb-3">Our Legacy</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wide">About Us</h1>
          <p className="text-white/60 text-sm max-w-xl mx-auto mt-4 font-sans leading-relaxed">
            Crafting reliable, comfortable, and sacred travel experiences across the Indian subcontinent since 2010.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-5xl mx-auto px-6 mt-16 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-[#C9A84C] font-mono text-xs uppercase tracking-wider block">Yaduvanshi Journey</span>
            <h2 className="font-display text-2xl font-bold text-gray-800 leading-tight">
              Bridging Devotion, Comfort, and Travel
            </h2>
            <p className="text-gray-600 text-xs leading-relaxed font-sans">
              Founded over a decade ago, Yaduvanshi Tours & Travels started with a single vehicle and a vision: to make sacred pilgrimage yatras safe, reliable, and accessible for families. Today, we manage a fleet of over 200+ passenger vehicles, sedans, SUVs, and luxury coaches.
            </p>
            <p className="text-gray-600 text-xs leading-relaxed font-sans">
              Whether you are seeking blessings at the high altitudes of Kedarnath, attending a serene evening aarti in Kashi, renting a corporate sedan, or organizing elegant wedding convoys, our certified chauffeurs ensure your travel remains tension-free.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "15+ Years", desc: "Of highway route experience" },
              { title: "10,000+", desc: "Happy devotees & families" },
              { title: "200+ Fleet", desc: "Vetted premium vehicles" },
              { title: "24/7 Hours", desc: "Emergency break-down help" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm text-center">
                <div className="text-lg font-mono font-bold text-[#C9A84C]">{stat.title}</div>
                <div className="text-[10px] text-gray-400 font-sans mt-0.5">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <div className="text-center mb-10">
          <span className="text-[#C9A84C] font-mono text-xs uppercase tracking-wider">Our Standards</span>
          <h2 className="font-display text-2xl font-bold text-gray-800 mt-1">Why Travel With Us?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              Icon: Shield,
              title: "Verified Safety Protocols",
              desc: "All vehicles undergo periodic service vetting. Drivers undergo professional background clearances and hill terrain test runs.",
            },
            {
              Icon: Award,
              title: "Transparent Flat-Pricing",
              desc: "No hidden charges, zero driver allowance surprises. Detailed yatra itinerary inclusions and exclusions specified upfront.",
            },
            {
              Icon: Users,
              title: "Customized Group Planning",
              desc: "From solo business rentals to large 26-seater buses, we dynamically configure routes according to passenger volume.",
            },
          ].map((val, idx) => (
            <div key={idx} className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm gap-3 flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C]">
                <val.Icon size={18} />
              </div>
              <h3 className="font-display font-semibold text-gray-900 text-sm">{val.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed font-sans">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Testimonials Grid */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <div className="text-center mb-10">
          <span className="text-[#C9A84C] font-mono text-xs uppercase tracking-wider">devotee feedback</span>
          <h2 className="font-display text-2xl font-bold text-gray-800 mt-1">What Our Travelers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.slice(0, 4).map((rev) => (
            <div key={rev.id} className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#C9A84C] mb-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} className={i < rev.rating ? "fill-[#C9A84C]" : "text-gray-200"} />
                  ))}
                </div>
                <p className="text-gray-600 text-xs italic font-sans leading-relaxed">
                  "{rev.quote}"
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-[10px] font-mono text-gray-400">
                <div>
                  <span className="font-semibold text-gray-700 block">{rev.name}</span>
                  <span>{rev.location}</span>
                </div>
                <span>{rev.packageOrVehicle}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
