"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
import { REVIEWS } from "@/data/reviews";
import { SectionHeader } from "@/components/ui/SectionHeader";

const GOLD = "#C9A84C";

const IMG = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

export function TestimonialsSection() {
  const [testIdx, setTestIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTestIdx((p) => (p + 1) % REVIEWS.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-20 px-6 lg:px-12 bg-[#FAFAF8] relative overflow-hidden">
      {/* Quote decoration */}
      <div
        className="absolute top-8 left-8 font-display text-[160px] leading-none select-none pointer-events-none"
        style={{ color: `${GOLD}12` }}
      >
        &ldquo;
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeader script="Happy Travelers" heading="What Our Travelers Say" center />
        </div>
        <div className="relative">
          <button
            onClick={() => setTestIdx((p) => (p - 1 + REVIEWS.length) % REVIEWS.length)}
            className="absolute -left-3 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all cursor-pointer"
          >
            <ChevronLeft size={17} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            {[0, 1, 2].map((off) => {
              const t = REVIEWS[(testIdx + off) % REVIEWS.length];
              return (
                <motion.div
                  key={`${testIdx}-${off}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: off * 0.08 }}
                  className="bg-white rounded-xl p-6 border border-gray-100 relative"
                >
                  <div
                    className="absolute top-4 right-5 font-display text-5xl leading-none select-none"
                    style={{ color: `${GOLD}25` }}
                  >
                    &ldquo;
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border-2"
                      style={{ borderColor: `${GOLD}50` }}
                    >
                      <img
                        src={IMG(t.avatarId, 56, 56)}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-gray-400 text-xs flex items-center gap-0.5 mt-0.5">
                        <MapPin size={9} /> {t.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={
                          i < t.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                </motion.div>
              );
            })}
          </div>
          <button
            onClick={() => setTestIdx((p) => (p + 1) % REVIEWS.length)}
            className="absolute -right-3 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all cursor-pointer"
          >
            <ChevronRight size={17} />
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setTestIdx(i)}
              className="h-1.5 rounded-full transition-all cursor-pointer"
              style={{
                width: i === testIdx ? 24 : 6,
                background: i === testIdx ? GOLD : "#d1d5db",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
