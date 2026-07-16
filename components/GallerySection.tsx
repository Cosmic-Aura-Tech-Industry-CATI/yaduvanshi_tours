"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_ITEMS } from "@/data/gallery";
import { SectionHeader } from "@/components/ui/SectionHeader";

const GOLD = "#C9A84C";

const IMG = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

export function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <SectionHeader script="Travel Inspiration" heading="Moments from Our Trips" />
        </div>
        <div className="columns-2 md:columns-3 lg:columns-5 gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              onClick={() => setLightbox(i)}
              className="break-inside-avoid mb-4 cursor-pointer overflow-hidden rounded-xl group relative bg-gray-200"
            >
              <img
                src={IMG(item.unsplashId, 400, item.tall ? 560 : 340)}
                alt={item.caption}
                className="w-full object-cover transition-transform duration-[6000ms] ease-linear group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-end rounded-xl">
                <span className="p-3 text-white text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 text-white/60 hover:text-white cursor-pointer p-2 rounded-full hover:bg-white/5"
            >
              <X size={28} />
            </button>
            <button
              className="absolute left-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#C9A84C] cursor-pointer p-2 rounded-full hover:bg-white/5 disabled:opacity-10"
              disabled={lightbox === 0}
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(Math.max(0, lightbox - 1));
              }}
            >
              <ChevronLeft size={36} />
            </button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl"
            >
              <img
                src={IMG(GALLERY_ITEMS[lightbox].unsplashId, 1200, 800)}
                alt={GALLERY_ITEMS[lightbox].caption}
                className="max-h-[80vh] w-auto rounded-xl object-contain border border-white/10 shadow-2xl"
              />
              <div className="text-center mt-3 text-white/55 text-sm font-mono">
                {GALLERY_ITEMS[lightbox].caption}
              </div>
            </motion.div>
            <button
              className="absolute right-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#C9A84C] cursor-pointer p-2 rounded-full hover:bg-white/5 disabled:opacity-10"
              disabled={lightbox === GALLERY_ITEMS.length - 1}
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(Math.min(GALLERY_ITEMS.length - 1, lightbox + 1));
              }}
            >
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
