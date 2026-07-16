"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Flower2, MessageCircle, Crown } from "lucide-react";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";

const FEATURES = [
  "Flower decorated luxury groom & bride cars",
  "Tempo Travellers & coaches for guest shuttles",
  "Verified, uniformed chauffeurs",
  "24/7 dedicated wedding transport desk",
];

const resolveImg = (src: string, w: number, h: number) =>
  src.startsWith("/")
    ? src
    : `https://images.unsplash.com/${src}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

const GALLERY_IMGS = [
  { src: "/weddings/wedding-car.webp",     alt: "Decorated luxury wedding car" },
  { src: "/weddings/wedding-couple.webp",  alt: "Bridal grand entry" },
  { src: "/weddings/wedding-convoy.webp",  alt: "Wedding convoy" },
  { src: "/weddings/wedding-car.webp",     alt: "Wedding fleet" },
];

export function WeddingSection() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${GOLD}08, transparent 70%)` }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${GOLD}06, transparent 70%)` }}
      />

      {/* Decorative corner ornament */}
      <div className="absolute top-8 right-8 text-5xl opacity-10 select-none pointer-events-none" style={{ color: GOLD }}>✦</div>
      <div className="absolute bottom-8 left-8 text-3xl opacity-10 select-none pointer-events-none" style={{ color: GOLD }}>✦</div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
        {/* ── Images grid ── */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 relative"
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 rounded-2xl overflow-hidden h-72 sm:h-96 shadow-xl group relative">
              <img
                src={resolveImg(GALLERY_IMGS[0].src, 750, 550)}
                alt={GALLERY_IMGS[0].alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="col-span-4 rounded-2xl overflow-hidden h-40 sm:h-52 self-end shadow-lg group relative">
              <img
                src={resolveImg(GALLERY_IMGS[1].src, 450, 450)}
                alt={GALLERY_IMGS[1].alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="col-span-4 rounded-2xl overflow-hidden h-40 sm:h-52 self-start shadow-lg group relative">
              <img
                src={resolveImg(GALLERY_IMGS[2].src, 450, 450)}
                alt={GALLERY_IMGS[2].alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="col-span-8 rounded-2xl overflow-hidden h-48 sm:h-64 shadow-xl group relative">
              <img
                src={resolveImg(GALLERY_IMGS[3].src, 750, 500)}
                alt={GALLERY_IMGS[3].alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            className="absolute -bottom-4 -right-4 lg:right-4 rounded-2xl px-5 py-4 shadow-xl"
            style={{
              background: DARK,
              border: `1px solid ${GOLD}40`,
              backdropFilter: "blur(8px)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <div className="flex items-center gap-2 text-white">
              <Crown size={16} style={{ color: GOLD }} />
              <div>
                <div className="text-xs font-bold">500+ Weddings</div>
                <div className="text-[10px] text-white/50 font-mono">Served since 2010</div>
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
            <p className="font-script text-2xl mb-1" style={{ color: GOLD }}>
              Elegant Ceremonies
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900">
              Luxury Wedding Car Services
            </h2>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-8 h-px" style={{ background: GOLD }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ background: GOLD }} />
              <div className="w-8 h-px" style={{ background: GOLD }} />
            </div>
            <p className="mt-4 text-gray-500 leading-relaxed text-sm">
              Make your special day unforgettable. We provide premium chauffeur-driven luxury cars adorned with fresh flowers, and handle complete guest logistics across venues.
            </p>
          </div>

          <ul className="space-y-3.5">
            {FEATURES.map((item, i) => (
              <motion.li
                key={item}
                className="flex items-center gap-3 text-sm text-gray-600"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${GOLD}18` }}
                >
                  <Flower2 size={12} style={{ color: GOLD }} />
                </div>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href="/weddings"
              className="flex items-center justify-center gap-2 px-7 py-3.5 font-semibold rounded-sm text-sm transition-all hover:brightness-90 cursor-pointer"
              style={{ background: GOLD, color: DARK }}
            >
              Explore Wedding Fleet <ArrowRight size={15} />
            </Link>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-7 py-3.5 border border-green-500 text-green-700 font-semibold text-sm rounded-sm hover:bg-green-50 transition-colors"
            >
              <MessageCircle size={15} /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
