"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Shield, Award, Users, Star, Quote, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { REVIEWS } from "@/data/reviews";
import { GALLERY_ITEMS } from "@/data/gallery";

import { buildImageUrl, handleImageError } from "@/lib/imageUtils";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";

interface IndexedGalleryItem {
  item: (typeof GALLERY_ITEMS)[0];
  originalIndex: number;
}

function getBalancedColumns(items: typeof GALLERY_ITEMS, numCols: number): IndexedGalleryItem[][] {
  const cols: IndexedGalleryItem[][] = Array.from({ length: numCols }, () => []);
  const heights = Array(numCols).fill(0);

  items.forEach((item, index) => {
    let minCol = 0;
    for (let i = 1; i < numCols; i++) {
      if (heights[i] < heights[minCol]) {
        minCol = i;
      }
    }
    cols[minCol].push({ item, originalIndex: index });
    heights[minCol] += item.tall ? 420 : 280;
  });

  return cols;
}

export default function AboutPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const desktopCols = getBalancedColumns(GALLERY_ITEMS, 4);
  const tabletCols = getBalancedColumns(GALLERY_ITEMS, 3);
  const mobileCols = getBalancedColumns(GALLERY_ITEMS, 2);

  const renderCard = ({ item, originalIndex }: IndexedGalleryItem) => (
    <div
      key={item.id}
      onClick={() => setLightbox(originalIndex)}
      className="cursor-pointer overflow-hidden rounded-xl group relative corner-brackets hover-glow border border-[#CF9D7B]/15 hover:border-[#E8B96A]/50 transition-colors duration-300"
      style={{ background: "rgba(58,53,52,0.25)" }}
    >
      <Image
        src={buildImageUrl(item.image || item.unsplashId, 420, item.tall ? 580 : 340)}
        alt={item.caption}
        width={420}
        height={item.tall ? 580 : 340}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        onError={handleImageError}
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
  );

  const renderColumnGrid = (cols: IndexedGalleryItem[][], wrapperClassName: string) => (
    <div className={`gap-4 ${wrapperClassName}`}>
      {cols.map((colItems, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-4">
          {colItems.map(renderCard)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-[#0C1519] min-h-screen pb-20 text-[#D8CFC7] overflow-hidden relative">
      {/* Background blobs for firelight depth */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-10"
        style={{ background: `radial-gradient(circle, ${BRASS}, transparent 70%)` }} />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-5"
        style={{ background: `radial-gradient(circle, ${COFFEE}, transparent 70%)` }} />

      {/* Header / Hero Section */}
      <section className="relative min-h-[45vh] flex items-center justify-center pt-36 pb-20 px-6 lg:px-12 overflow-hidden text-center bg-black">
        {/* Background Image Wrapper */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full z-[1]"
        >
          <Image
            src="/images/about-hero-bg.webp"
            alt="Scenic road trip golden hour background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Darker cinematic overlays (Matching homepage + bottom fade merge) */}
        <div 
          className="absolute inset-0 z-[2]"
          style={{ background: "linear-gradient(to bottom, rgba(12,21,25,0.65), rgba(12,21,25,0.35), #0C1519)" }} 
        />
        <div
          className="absolute inset-0 z-[2]"
          style={{ background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.85) 100%)" }}
        />
        {/* Smooth bottom merge divider matching other pages */}
        <div 
          className="absolute inset-x-0 bottom-0 h-24 z-[3] pointer-events-none"
          style={{ background: "linear-gradient(to top, #0C1519, transparent)" }}
        />

        {/* Ambient glow blobs */}
        <div className="absolute bottom-0 left-0 z-[3] pointer-events-none"
          style={{ width: 600, height: 400, background: `radial-gradient(ellipse at bottom left, ${BRASS}20, transparent 70%)` }} />
        <div className="absolute top-20 right-10 z-[3] pointer-events-none"
          style={{ width: 500, height: 500, background: `radial-gradient(ellipse at top right, ${COFFEE}15, transparent 70%)` }} />

        {/* Content Container */}
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-[#E8B96A] font-accent text-xs sm:text-sm uppercase tracking-[0.25em] block mb-3 font-semibold">Our Legacy</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-wide text-white">
            About <span className="text-[#E8B96A]">Yaduvanshi</span>
          </h1>
          <p className="text-[#D8CFC7] text-base md:text-lg max-w-2xl mx-auto mt-5 font-sans leading-relaxed text-shadow-md">
            Crafting reliable, comfortable, and sacred travel experiences across the Indian subcontinent since 2010.
          </p>
          <div className="w-24 h-0.5 mx-auto mt-6" style={{ background: `linear-gradient(to right, transparent, ${BRASS}, transparent)` }} />
        </div>
      </section>

      {/* ── Our Story Section ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Text (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-[#CF9D7B] font-accent text-xs uppercase tracking-[0.2em] block font-semibold">Our Origin</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              Every Journey Has a Story. <br className="hidden sm:inline" />Ours Started with a Dream.
            </h2>
            <div className="w-12 h-0.5" style={{ background: `linear-gradient(to right, ${BRASS}, transparent)` }} />

            {/* Body Copy (Verbatim) */}
            <div className="text-[#D8CFC7]/85 text-xs sm:text-sm leading-relaxed space-y-5 font-sans max-w-prose">
              <p>
                In 2016, Yaduvanshi Tours & Travels was founded by Mr. Manoj Yadav with a simple dream—to help people travel with comfort, safety, and complete peace of mind. What began as a small family initiative has today grown into a trusted travel partner for thousands of travelers.
              </p>
              
              <div className="border-l-2 pl-4 py-1 my-4 italic font-display text-sm sm:text-base" style={{ borderColor: BRASS }}>
                <p className="text-[#E8B96A] font-semibold">
                  &ldquo;The name &lsquo;Yaduvanshi&rsquo; comes from our family name and represents our identity, values, and the trust we have built with every customer. Since the very beginning, our goal has always been to create journeys that people remember with happiness.&rdquo;
                </p>
              </div>

              <p>
                The name &ldquo;Yaduvanshi&rdquo; is more than just our business name. It comes from our family name and represents our identity, values, and the trust we have built with every customer. Since the very beginning, our goal has never been just to provide transportation or book trips. Our goal has always been to create journeys that people remember with happiness.
              </p>

              <div className="p-4 rounded-xl glass-panel text-center my-6" style={{ background: "rgba(207, 157, 123, 0.05)", borderColor: "rgba(207, 157, 123, 0.15)" }}>
                <span className="text-xl sm:text-2xl font-bold text-[#E8B96A] block font-mono">1000+ Happy Customers</span>
                <span className="text-[10px] text-[#D8CFC7]/60 font-accent uppercase tracking-wider block mt-1">Served regions around Kanpur</span>
              </div>

              <p>
                Over the years, we have proudly served 1000+ happy customers, including families, friends, couples, students, business travelers, and groups. Every customer who travels with us becomes a part of our growing family, and their satisfaction is the biggest achievement for us.
              </p>
              <p>
                We believe that every trip is different. Some journeys are for celebrations, some are for devotion, some are for adventure, and some are simply for spending quality time with loved ones. That is why we carefully understand every travel requirement and provide the best possible plan according to our customers' needs and budget.
              </p>
              <p>
                From comfortable local transportation to complete holiday packages, pilgrimage tours, family vacations, group tours, vehicle rentals, and customized travel planning, we make every journey smooth from the beginning until the end. Our focus is always on providing clean vehicles, reliable service, transparent pricing, and friendly customer support.
              </p>
              <p>
                Although our business is operated from our home, we proudly serve travelers across Kanpur and nearby regions. For the convenience of our customers, our service location is near Ramadevi Chauraha, Kanpur, Uttar Pradesh, making it easy for travelers to connect with us whenever they need assistance.
              </p>
              <p>
                As the years passed, our family business continued to grow with the support and trust of our customers. Today, the next generation, including Anirudh Yadav, is also contributing to the business by bringing fresh ideas while continuing the values and dedication on which Yaduvanshi Tours & Travels was built.
              </p>
              <p>
                For us, success is not measured only by the number of trips we organize. It is measured by the smiles of our customers, the memories they create during their journeys, and the trust they place in us every time they choose our services again.
              </p>
              <p>
                We know that when someone plans a trip, they are not just booking a vehicle—they are planning moments that will become lifelong memories. That is why we pay attention to every small detail and work hard to make every journey safe, comfortable, enjoyable, and completely stress-free.
              </p>
              <p>
                As we continue this journey, our promise remains the same as it was on the very first day—to provide honest service, maintain the highest standards of customer care, and make every traveler feel valued.
              </p>
              <p>
                Whether you are planning a spiritual tour, a family vacation, a weekend getaway, a business trip, or a customized holiday anywhere in India, Yaduvanshi Tours & Travels is always ready to be your trusted travel partner.
              </p>
            </div>

            {/* Closing Tagline */}
            <div className="pt-6 space-y-2 border-t border-white/5 max-w-prose">
              <p className="font-display font-medium italic text-base sm:text-lg text-[#E8B96A] leading-relaxed">
                &ldquo;Travel with Trust. Travel with Comfort. Travel with Yaduvanshi Tours & Travels.&rdquo;
              </p>
              <p className="text-[#D8CFC7]/50 text-[10px] sm:text-xs italic pl-1">
                Thank you for being a part of our journey. We look forward to being a part of yours.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Stacked Founder Photo Frames (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-12 sm:gap-14 w-full">
            {/* Frame 1: Manoj Yadav */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col w-full group"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#CF9D7B]/25">
                <Image
                  src="/images/manoj-yadav-v2.webp"
                  alt="Manoj Yadav - Founder"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              
              {/* Caption */}
              <div className="mt-4 space-y-1 text-left">
                <h4 className="font-display font-semibold text-lg text-white">Manoj Yadav</h4>
                <p className="text-[#E8B96A] font-accent text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
                  Founder — Yaduvanshi Tours & Travels
                </p>
                <p className="text-[#D8CFC7]/70 text-xs sm:text-sm font-sans leading-relaxed">
                  Mr. Manoj Yadav started the business in 2016 with a dream to make travel comfortable, safe, and stress-free for every customer.
                </p>
              </div>
            </motion.div>

            {/* Frame 2: Anirudh Yadav */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col w-full group"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#CF9D7B]/25">
                <Image
                  src="/images/anirudh-yadav-v2.webp"
                  alt="Anirudh Yadav - Next Generation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              
              {/* Caption */}
              <div className="mt-4 space-y-1 text-left">
                <h4 className="font-display font-semibold text-lg text-white">Anirudh Yadav</h4>
                <p className="text-[#E8B96A] font-accent text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
                  Next Generation — carrying the legacy forward
                </p>
                <p className="text-[#D8CFC7]/70 text-xs sm:text-sm font-sans leading-relaxed">
                  Anirudh Yadav is bringing fresh ideas to the business while continuing the family&apos;s values and dedication.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 space-y-6 py-8">
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
              { title: "1000+", desc: "Happy devotees & families" },
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
                  <Image
                    src={buildImageUrl(rev.avatarId, 80, 80)}
                    alt={rev.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover border border-[#CF9D7B]/30"
                    onError={handleImageError}
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

        {/* Masonry grid — Responsive Balanced Columns with Bottom Fade Finish */}
        <div className="relative">
          {renderColumnGrid(desktopCols, "hidden lg:grid grid-cols-4")}
          {renderColumnGrid(tabletCols, "hidden md:grid lg:hidden grid-cols-3")}
          {renderColumnGrid(mobileCols, "grid md:hidden grid-cols-2")}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0C1519] via-[#0C1519]/50 to-transparent z-10" />
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
            <Image
              src={buildImageUrl(GALLERY_ITEMS[lightbox].image || GALLERY_ITEMS[lightbox].unsplashId, 1200, 800)}
              alt={GALLERY_ITEMS[lightbox].caption}
              width={1200}
              height={800}
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="max-h-[78vh] w-auto mx-auto rounded-2xl object-contain shadow-2xl border border-[#CF9D7B]/30"
              onError={handleImageError}
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
