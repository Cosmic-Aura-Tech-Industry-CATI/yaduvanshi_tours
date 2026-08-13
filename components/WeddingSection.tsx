"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Flower2, MessageCircle, Crown } from "lucide-react";

import { buildImageUrl, handleImageError } from "@/lib/imageUtils";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";
const IVORY = "#F5F0EA";

const FEATURES = [
  "Flower decorated luxury groom & bride cars",
  "Tempo Travellers & coaches for guest shuttles",
  "Verified, uniformed royal chauffeurs",
  "24/7 dedicated wedding transport desk",
];

const GALLERY_IMGS = [
  { src: "/weddings/wedding-car-decor-1.webp", alt: "Yaduvanshi Travels - Floral luxury wedding car decor" },
  { src: "/weddings/wedding-couple.webp",       alt: "Bridal grand entry" },
  { src: "/weddings/wedding-convoy.webp",       alt: "Wedding convoy" },
  { src: "/weddings/wedding-car-decor-2.webp", alt: "Yaduvanshi Travels - Premium wedding convoy arrival" },
];

export function WeddingSection() {
  return (
    <section className="py-24 px-6 lg:px-12 relative overflow-hidden" style={{ background: "#162127" }}>
      {/* Ambient glow blobs */}
      <div className="ambient-blob-brass" style={{ top: "-50px", right: "5%" }} />
      <div className="ambient-blob-coffee" style={{ bottom: "-80px", left: "-5%" }} />

      {/* Top glow divider */}
      <div className="glow-divider absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-center relative z-10">
        {/* ── Images grid ── */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 relative"
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 rounded-2xl overflow-hidden h-72 sm:h-96 shadow-xl group relative corner-brackets border border-[#CF9D7B]/20 hover:border-[#CF9D7B]/45 transition-colors duration-300">
              <Image
                src={buildImageUrl(GALLERY_IMGS[0].src, 750, 550)}
                alt={GALLERY_IMGS[0].alt}
                fill
                sizes="(max-width: 1024px) 66vw, 44vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1519]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="col-span-4 rounded-2xl overflow-hidden h-40 sm:h-52 self-end shadow-lg group relative glass-panel border border-[#CF9D7B]/20 hover:border-[#CF9D7B]/45 transition-colors duration-300">
              <Image
                src={buildImageUrl(GALLERY_IMGS[1].src, 450, 450)}
                alt={GALLERY_IMGS[1].alt}
                fill
                sizes="(max-width: 1024px) 33vw, 22vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={handleImageError}
              />
            </div>
            <div className="col-span-4 rounded-2xl overflow-hidden h-40 sm:h-52 self-start shadow-lg group relative glass-panel border border-[#CF9D7B]/20 hover:border-[#CF9D7B]/45 transition-colors duration-300">
              <Image
                src={buildImageUrl(GALLERY_IMGS[2].src, 450, 450)}
                alt={GALLERY_IMGS[2].alt}
                fill
                sizes="(max-width: 1024px) 33vw, 22vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={handleImageError}
              />
            </div>
            <div className="col-span-8 rounded-2xl overflow-hidden h-48 sm:h-64 shadow-xl group relative corner-brackets border border-[#CF9D7B]/20 hover:border-[#CF9D7B]/45 transition-colors duration-300">
              <Image
                src={buildImageUrl(GALLERY_IMGS[3].src, 750, 500)}
                alt={GALLERY_IMGS[3].alt}
                fill
                sizes="(max-width: 1024px) 66vw, 44vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={handleImageError}
              />
            </div>
          </div>

          {/* Floating badge — enhanced contrast & gold glow border */}
          <motion.div
            className="absolute -bottom-4 -right-4 lg:right-4 rounded-2xl px-5 py-3.5 shadow-2xl backdrop-blur-md z-20"
            style={{
              background: "rgba(12, 21, 25, 0.92)",
              border: `1.5px solid ${GOLD}60`,
              boxShadow: `0 8px 32px rgba(0, 0, 0, 0.75), 0 0 16px ${GOLD}25`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}40` }}
              >
                <Crown size={18} style={{ color: GOLD, filter: "drop-shadow(0 0 4px rgba(232,185,106,0.6))" }} />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold font-accent tracking-wider" style={{ color: GOLD }}>
                  500+ Weddings
                </div>
                <div className="text-[11px] font-sans font-medium text-[#D8CFC7]/85">
                  Served since 2010
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Content ── */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div>
            <p className="font-script text-2xl mb-1" style={{ color: BRASS }}>
              Chase Horizons, Not Destinations
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-glow-gold" style={{ color: GOLD }}>
              Luxury Wedding Car Logistics
            </h2>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-8 h-px" style={{ background: `linear-gradient(to right, ${BRASS}, transparent)` }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ background: BRASS, boxShadow: `0 0 6px ${BRASS}60` }} />
              <div className="w-8 h-px" style={{ background: `linear-gradient(to left, ${BRASS}, transparent)` }} />
            </div>
            <p className="mt-4 text-[#D8CFC7]/60 leading-relaxed text-sm font-sans">
              Plan your grand celebrations with complete peace of mind. We provide elegant chauffeur-driven luxury cars decorated with fresh floral themes, alongside full guest transfers between locations.
            </p>
          </div>

          <ul className="space-y-3.5 font-sans">
            {FEATURES.map((item, i) => (
              <motion.li
                key={item}
                className="flex items-center gap-3 text-sm text-[#D8CFC7]/75"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 glass-panel"
                  style={{ boxShadow: `0 0 8px rgba(207,157,123,0.15)` }}
                >
                  <Flower2 size={12} style={{ color: BRASS }} />
                </div>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 mt-2 font-accent tracking-widest text-[10px]">
            <Link
              href="/weddings"
              className="flex items-center justify-center gap-2 px-7 py-4 font-semibold rounded-sm transition-all hover:brightness-110 cursor-pointer btn-glow"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`, color: "#0C1519" }}
            >
              Explore Wedding Fleet <ArrowRight size={14} />
            </Link>
            <a
              href={`https://wa.me/918127929551?text=${encodeURIComponent("Hello Yaduvanshi Tours and Travels, I am interested in booking a wedding vehicle.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-7 py-4 font-semibold rounded-sm transition-colors glass-panel hover:bg-white/5"
              style={{ color: "#25D366" }}
            >
              <MessageCircle size={14} /> WhatsApp Chat
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
