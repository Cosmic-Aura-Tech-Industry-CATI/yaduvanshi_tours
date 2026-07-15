"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { GALLERY_ITEMS } from "@/data/gallery";

const GOLD = "#C9A84C";
const CREAM = "#FAFAF8";

const IMG = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

export function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 lg:px-12 relative overflow-hidden" style={{ background: CREAM }}>
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${GOLD}25, transparent)` }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            className="font-script text-2xl mb-1"
            style={{ color: GOLD }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Travel Inspiration
          </motion.p>
          <motion.h2
            className="font-display font-bold text-3xl md:text-4xl text-gray-900"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Moments from Our Journeys
          </motion.h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-8 h-px" style={{ background: GOLD }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: GOLD }} />
            <div className="w-8 h-px" style={{ background: GOLD }} />
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
              className="break-inside-avoid mb-4 cursor-pointer overflow-hidden rounded-xl group relative bg-gray-200"
            >
              <img
                src={IMG(item.unsplashId, 420, item.tall ? 580 : 340)}
                alt={item.caption}
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end">
                <div className="p-4 w-full flex items-center justify-between">
                  <div>
                    <span className="text-white text-xs font-semibold font-display block">
                      {item.caption}
                    </span>
                    <span className="text-white/50 text-[10px] font-mono block mt-0.5">
                      Click to view
                    </span>
                  </div>
                  <ZoomIn size={14} className="flex-shrink-0" style={{ color: GOLD }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.94)", backdropFilter: "blur(12px)" }}
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}
            >
              <X size={18} className="text-white" />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 disabled:opacity-20"
              disabled={lightbox === 0}
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
              onClick={(e) => { e.stopPropagation(); setLightbox(Math.max(0, lightbox - 1)); }}
            >
              <ChevronLeft size={22} className="text-white" />
            </button>

            {/* Image */}
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
                style={{ border: `1px solid ${GOLD}30` }}
              />
              <div className="text-center mt-4">
                <p className="text-white/60 text-sm font-mono">{GALLERY_ITEMS[lightbox].caption}</p>
                <p className="text-white/30 text-xs font-mono mt-0.5">{GALLERY_ITEMS[lightbox].location}</p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 disabled:opacity-20"
              disabled={lightbox === GALLERY_ITEMS.length - 1}
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
              onClick={(e) => { e.stopPropagation(); setLightbox(Math.min(GALLERY_ITEMS.length - 1, lightbox + 1)); }}
            >
              <ChevronRight size={22} className="text-white" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 text-xs font-mono">
              {lightbox + 1} / {GALLERY_ITEMS.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
