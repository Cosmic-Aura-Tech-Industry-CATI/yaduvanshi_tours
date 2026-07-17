"use client";

import { useState } from "react";
import { Shield, Award, Users, Star, Quote, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { REVIEWS } from "@/data/reviews";
import { GALLERY_ITEMS } from "@/data/gallery";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";

const IMG = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

const AVATAR_URL = (id: string) =>
  `https://images.unsplash.com/${id}?w=80&h=80&fit=crop&auto=format&q=80`;

export default function AboutPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="bg-[#0C1519] min-h-screen pt-28 pb-20 text-[#D8CFC7] overflow-hidden relative">
      {/* Background blobs for firelight depth */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-10"
        style={{ background: `radial-gradient(circle, ${BRASS}, transparent 70%)` }} />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-5"
        style={{ background: `radial-gradient(circle, ${COFFEE}, transparent 70%)` }} />

      {/* Header */}
      <section className="relative py-20 px-6 overflow-hidden z-10 text-center">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#E8B96A] font-accent text-xs uppercase tracking-[0.25em] block mb-3 font-semibold">Our Legacy</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-wide text-white">
            About <span className="text-[#E8B96A]">Yaduvanshi</span>
          </h1>
          <p className="text-[#D8CFC7]/60 text-sm md:text-base max-w-xl mx-auto mt-5 font-sans leading-relaxed">
            Crafting reliable, comfortable, and sacred travel experiences across the Indian subcontinent since 2010.
          </p>
          <div className="w-24 h-0.5 mx-auto mt-6" style={{ background: `linear-gradient(to right, transparent, ${BRASS}, transparent)` }} />
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-5xl mx-auto px-6 relative z-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-[#CF9D7B] font-accent text-xs uppercase tracking-[0.2em] block font-semibold">Yaduvanshi Journey</span>
            <h2 className="font-display text-3xl font-bold text-white leading-tight">
              Bridging Devotion, Comfort, and Travel
            </h2>
            <p className="text-[#D8CFC7]/75 text-sm leading-relaxed font-sans">
              Founded over a decade ago, Yaduvanshi Tours & Travels started with a single vehicle and a vision: to make sacred pilgrimage yatras safe, reliable, and accessible for families. Today, we manage a fleet of over 200+ passenger vehicles, sedans, SUVs, and luxury coaches.
            </p>
            <p className="text-[#D8CFC7]/75 text-sm leading-relaxed font-sans">
              Whether you are seeking blessings at the high altitudes of Kedarnath, attending a serene evening aarti in Kashi, renting a corporate sedan, or organizing elegant wedding convoys, our certified chauffeurs ensure your travel remains tension-free.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "15+ Years", desc: "Of highway route experience" },
              { title: "10,000+", desc: "Happy devotees & families" },
              { title: "200+ Fleet", desc: "Vetted premium vehicles" },
              { title: "24/7 Hours", desc: "Emergency assistance" },
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-xl border text-center glass-panel"
                style={{
                  background: "rgba(58, 53, 52, 0.25)",
                  borderColor: "rgba(207, 157, 123, 0.15)",
                }}
              >
                <div className="text-xl font-bold text-[#E8B96A] font-mono">{stat.title}</div>
                <div className="text-[10px] text-[#D8CFC7]/60 font-accent uppercase tracking-wider mt-1">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-5xl mx-auto px-6 mt-28 relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#CF9D7B] font-accent text-xs uppercase tracking-[0.2em] font-semibold">Our Standards</span>
          <h2 className="font-display text-3xl font-bold text-white mt-2">Why Travel With Us?</h2>
          <div className="w-16 h-px mx-auto mt-4" style={{ background: `linear-gradient(to right, transparent, ${COFFEE}, transparent)` }} />
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
            <div 
              key={idx} 
              className="p-6 rounded-xl border gap-4 flex flex-col glass-panel"
              style={{
                background: "rgba(58, 53, 52, 0.25)",
                borderColor: "rgba(207, 157, 123, 0.15)",
              }}
            >
              <div 
                className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(207, 157, 123, 0.1)",
                  border: `1px solid rgba(207, 157, 123, 0.25)`,
                }}
              >
                <val.Icon size={18} style={{ color: BRASS }} />
              </div>
              <h3 className="font-display font-semibold text-white text-base">{val.title}</h3>
              <p className="text-[#D8CFC7]/70 text-xs leading-relaxed font-sans">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Expanded Full Reviews Section */}
      <section id="reviews" className="max-w-5xl mx-auto px-6 mt-28 relative z-10 scroll-mt-24">
        <div className="text-center mb-12">
          <span className="text-[#CF9D7B] font-accent text-xs uppercase tracking-[0.2em] font-semibold">devotee feedback</span>
          <h2 className="font-display text-3xl font-bold text-white mt-2">All Guest Testimonials</h2>
          <div className="w-16 h-px mx-auto mt-4" style={{ background: `linear-gradient(to right, transparent, ${COFFEE}, transparent)` }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev) => (
            <div 
              key={rev.id} 
              className="p-6 rounded-xl border flex flex-col justify-between glass-panel border-[#CF9D7B]/15 hover:border-[#CF9D7B]/40 transition-colors duration-300"
              style={{
                background: "rgba(58, 53, 52, 0.25)",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#E8B96A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className={i < rev.rating ? "fill-[#E8B96A] text-[#E8B96A]" : "text-white/10"} />
                    ))}
                  </div>
                  <Quote size={18} style={{ color: BRASS }} className="opacity-20" />
                </div>
                <p className="text-[#D8CFC7]/80 text-xs italic font-sans leading-relaxed">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>
              
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#D8CFC7]/50">
                <div className="flex items-center gap-3">
                  <img
                    src={AVATAR_URL(rev.avatarId)}
                    alt={rev.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#CF9D7B]/30"
                  />
                  <div>
                    <span className="font-semibold text-white block">{rev.name}</span>
                    <span>{rev.location}</span>
                  </div>
                </div>
                <span className="text-[#E8B96A] font-semibold font-accent uppercase tracking-wider">{rev.packageOrVehicle}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expanded Full Gallery Section */}
      <section id="gallery" className="max-w-5xl mx-auto px-6 mt-28 relative z-10 scroll-mt-24">
        <div className="text-center mb-12">
          <span className="text-[#CF9D7B] font-accent text-xs uppercase tracking-[0.2em] font-semibold">Visual Memoirs</span>
          <h2 className="font-display text-3xl font-bold text-white mt-2">Complete Photo Collection</h2>
          <div className="w-16 h-px mx-auto mt-4" style={{ background: `linear-gradient(to right, transparent, ${COFFEE}, transparent)` }} />
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={item.id}
              onClick={() => setLightbox(i)}
              className="break-inside-avoid mb-4 cursor-pointer overflow-hidden rounded-xl group relative corner-brackets hover-glow border border-[#CF9D7B]/15 hover:border-[#E8B96A]/50 transition-colors duration-300"
              style={{ background: "rgba(58,53,52,0.25)" }}
            >
              <img
                src={IMG(item.unsplashId, 420, item.tall ? 580 : 340)}
                alt={item.caption}
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1519]/90 via-[#724B39]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end">
                <div className="p-3 w-full flex items-center justify-between">
                  <div>
                    <span className="text-[#F5F0EA] text-[11px] font-semibold font-display block">
                      {item.caption}
                    </span>
                    <span className="text-[#D8CFC7]/40 text-[8px] font-mono block mt-0.5">
                      {item.location}
                    </span>
                  </div>
                  <ZoomIn size={12} className="flex-shrink-0" style={{ color: BRASS }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Overlay */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#0C1519]/95 backdrop-blur-md"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 glass-panel border border-[#CF9D7B]/20 text-white"
          >
            <X size={18} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 disabled:opacity-20 glass-panel border border-[#CF9D7B]/20 text-white"
            disabled={lightbox === 0}
            onClick={(e) => { e.stopPropagation(); setLightbox(Math.max(0, lightbox - 1)); }}
          >
            <ChevronLeft size={22} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full text-center"
          >
            <img
              src={IMG(GALLERY_ITEMS[lightbox].unsplashId, 1200, 800)}
              alt={GALLERY_ITEMS[lightbox].caption}
              className="max-h-[78vh] w-auto mx-auto rounded-2xl object-contain shadow-2xl border border-[#CF9D7B]/30"
              style={{
                boxShadow: `0 0 40px rgba(207,157,123,0.2), 0 20px 60px rgba(0,0,0,0.5)`,
              }}
            />
            <p className="text-white text-sm font-display mt-4 tracking-wide font-semibold">{GALLERY_ITEMS[lightbox].caption}</p>
            <p className="text-[#D8CFC7]/50 text-xs font-mono mt-1">{GALLERY_ITEMS[lightbox].location}</p>
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 disabled:opacity-20 glass-panel border border-[#CF9D7B]/20 text-white"
            disabled={lightbox === GALLERY_ITEMS.length - 1}
            onClick={(e) => { e.stopPropagation(); setLightbox(Math.min(GALLERY_ITEMS.length - 1, lightbox + 1)); }}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </div>
  );
}
