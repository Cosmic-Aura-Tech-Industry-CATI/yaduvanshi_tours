"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { GALLERY_ITEMS } from "@/data/gallery";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";
const IVORY = "#F5F0EA";

const IMG = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

export function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 lg:px-12 relative overflow-hidden" style={{ background: "#0C1519" }}>
      {/* Ambient glow blobs */}
      <div className="ambient-blob-coffee" style={{ top: "10%", left: "-5%" }} />
      <div className="ambient-blob-brass" style={{ bottom: "5%", right: "-3%" }} />

      {/* Top glow divider */}
      <div className="glow-divider absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            className="font-script text-2xl mb-1"
            style={{ color: BRASS }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Unveil India&apos;s Soul
          </motion.p>
          <motion.h2
            className="font-display font-bold text-3xl md:text-4xl text-glow-gold"
            style={{ color: GOLD }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Memoirs from our Travels
          </motion.h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-8 h-px" style={{ background: `linear-gradient(to right, ${BRASS}, transparent)` }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: BRASS, boxShadow: `0 0 6px ${BRASS}60` }} />
            <div className="w-8 h-px" style={{ background: `linear-gradient(to left, ${BRASS}, transparent)` }} />
          </div>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-5 gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              onClick={() => setLightbox(i)}
              className="break-inside-avoid mb-4 cursor-pointer overflow-hidden rounded-xl group relative corner-brackets hover-glow border border-[#CF9D7B]/15 hover:border-[#E8B96A]/50 transition-colors duration-300"
              style={{ background: "rgba(58,53,52,0.25)" }}
            >
              <img
                src={IMG(item.unsplashId, 420, item.tall ? 580 : 340)}
                alt={item.caption}
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
              />

              {/* Hover overlay — Chinese Black / Coffee gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1519]/90 via-[#724B39]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end">
                <div className="p-4 w-full flex items-center justify-between">
                  <div>
                    <span className="text-[#F5F0EA] text-xs font-semibold font-display block">
                      {item.caption}
                    </span>
                    <span className="text-[#D8CFC7]/40 text-[9px] font-mono block mt-0.5">
                      Click to expand
                    </span>
                  </div>
                  <ZoomIn size={14} className="flex-shrink-0" style={{ color: BRASS }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More button */}
        <div className="text-center mt-12">
          <Link
            href="/about#gallery"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold font-accent tracking-widest border border-[#CF9D7B]/30 hover:border-[#E8B96A] text-[#E8B96A] transition-all hover:bg-white/5 hover:shadow-[0_0_15px_rgba(232,185,106,0.15)]"
          >
            VIEW MORE PHOTOS
          </Link>
        </div>
      </div>

      {/* ── Lightbox — glass overlay ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: "rgba(12,21,25,0.94)", backdropFilter: "blur(20px)" }}
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 glass-panel"
            >
              <X size={18} className="text-white" />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 disabled:opacity-20 glass-panel"
              disabled={lightbox === 0}
              onClick={(e) => { e.stopPropagation(); setLightbox(Math.max(0, lightbox - 1)); }}
            >
              <ChevronLeft size={22} className="text-white" />
            </button>

            {/* Image — with glow frame */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              <img
                src={IMG(GALLERY_ITEMS[lightbox].unsplashId, 1200, 800)}
                alt={GALLERY_ITEMS[lightbox].caption}
                className="max-h-[78vh] w-auto mx-auto rounded-2xl object-contain shadow-2xl"
                style={{
                  border: `1px solid ${BRASS}30`,
                  boxShadow: `0 0 40px rgba(207,157,123,0.2), 0 20px 60px rgba(0,0,0,0.5)`,
                }}
              />
              <div className="text-center mt-4">
                <p className="text-white/60 text-sm font-mono">{GALLERY_ITEMS[lightbox].caption}</p>
                <p className="text-white/30 text-xs font-mono mt-0.5">{GALLERY_ITEMS[lightbox].location}</p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 disabled:opacity-20 glass-panel"
              disabled={lightbox === GALLERY_ITEMS.length - 1}
              onClick={(e) => { e.stopPropagation(); setLightbox(Math.min(GALLERY_ITEMS.length - 1, lightbox + 1)); }}
            >
              <ChevronRight size={22} className="text-white" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/20 text-xs font-mono">
              {lightbox + 1} / {GALLERY_ITEMS.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
