"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useSpring } from "motion/react";
import { Menu, X, ChevronDown, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { TOURS_DATA } from "@/data/tours";

const GOLD = "#E8B96A";
const IVORY = "#F5F0EA";

// WhatsApp icon SVG component
function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const INFO_ITEMS = [
  { icon: Phone,         text: "+91 81279 29551",              href: "tel:+918127929551"                  },
  { icon: WhatsAppIcon,  text: "+91 81279 29551",              href: "https://wa.me/918127929551"         },
  { icon: Mail,          text: "manojyadav20101993@gmail.com", href: "mailto:manojyadav20101993@gmail.com" },
  { icon: MapPin,        text: "Ramadevi Chauraha, Kanpur, UP", href: null                                 },
];

const NAV_LINKS = [
  { label: "Home",          to: "/"                },
  {
    label: "Tour Packages", to: "/tours",
    sub: [
      { label: "Explore Tours",             to: "/tours"   },
      { label: "Customized Packages",       to: "/inquiry" },
    ],
  },
  { label: "Vehicle Rentals", to: "/vehicles"    },
  { label: "Wedding Travel",  to: "/weddings"    },
  { label: "About Us",        to: "/about"       },
  { label: "Contact Us",      to: "/contact"     },
];

/* ── Magnetic CTA Button — solid gold pill ──────────────────── */
function MagneticBtn({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useSpring(0, { stiffness: 200, damping: 18 });
  const my = useSpring(0, { stiffness: 200, damping: 18 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.35);
    my.set((e.clientY - r.top - r.height / 2) * 0.35);
  }, [mx, my]);

  const handleLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <motion.div
      style={{ x: mx, y: my }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="hidden lg:flex"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        ref={ref}
        href={href}
        className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold font-accent tracking-widest rounded-full cursor-pointer select-none btn-glow relative overflow-hidden text-[#0C1519]"
      >
        <span className="relative z-10 flex items-center gap-2" style={{ color: "#0C1519" }}>
          {children}
        </span>
        {/* Solid gold fill */}
        <span
          className="absolute inset-0 rounded-full"
          style={{ background: GOLD }}
        />
      </Link>
    </motion.div>
  );
}

/* ── Dropdown ──────────────────────────────────────────────────── */
function DropMenu({ items }: { items: { label: string; to: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-0 mt-3 w-56 rounded-xl overflow-hidden shadow-2xl z-50 glass-panel-strong"
    >
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04, duration: 0.2 }}
        >
          <Link
            href={item.to}
            className="flex items-center gap-2 px-4 py-3 text-xs font-accent tracking-wider text-[#D8CFC7] hover:text-white transition-all border-b border-white/5 last:border-0 group"
            style={{ position: "relative" }}
          >
            <span
              className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-0.5 transition-all duration-200"
              style={{ background: GOLD }}
            />
            <span className="ml-1.5">{item.label}</span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ── Main Navbar ─────────────────────────────────────────────── */
export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen,   setMegaOpen]   = useState(false);
  const [infoVisible, setInfoVisible] = useState(true);
  const [toursExpanded, setToursExpanded] = useState(false);
  const pathname = usePathname();

  const getWhatsAppUrl = () => {
    let msg = "Hello Yaduvanshi Tours and Travels, I have a query.";
    if (pathname) {
      if (pathname.startsWith("/vehicles")) {
        msg = "Hello Yaduvanshi Tours and Travels, I am interested in booking a vehicle.";
      } else if (pathname.startsWith("/tours/")) {
        const slug = pathname.split("/").pop();
        const tour = TOURS_DATA.find((t) => t.slug === slug);
        if (tour) {
          msg = `Hello Yaduvanshi Tours and Travels, I am interested in ${tour.name} tour package.`;
        } else {
          msg = "Hello Yaduvanshi Tours and Travels, I am interested in a tour package.";
        }
      } else if (pathname.startsWith("/tours")) {
        msg = "Hello Yaduvanshi Tours and Travels, I am interested in a tour package.";
      } else if (pathname.startsWith("/weddings")) {
        msg = "Hello Yaduvanshi Tours and Travels, I am interested in booking a wedding vehicle.";
      } else if (pathname.startsWith("/contact")) {
        msg = "Hello Yaduvanshi Tours and Travels, I would like more information.";
      } else if (pathname !== "/") {
        msg = "Hello Yaduvanshi Tours and Travels, I would like more information.";
      }
    }
    return `https://wa.me/918127929551?text=${encodeURIComponent(msg)}`;
  };

  useEffect(() => {
    if (!mobileOpen) {
      setToursExpanded(false);
    }
  }, [mobileOpen]);
  const isHome = pathname === "/";

  useEffect(() => {
    let ticking = false;
    const fn = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sy = window.scrollY;
          setScrolled(sy > 60);
          setInfoVisible(sy < 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col pointer-events-none">
        {/* ── Top Bar (Thin strip, #0a0a0a) ──────────────────────── */}
        <AnimatePresence>
          {infoVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden md:block overflow-hidden z-[60] relative pointer-events-auto"
              style={{ background: "#0a0a0a" }}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between py-2 text-[10px] font-accent tracking-wider gap-6">
                <div className="flex items-center gap-5 flex-wrap">
                  {INFO_ITEMS.map((item, i) => {
                    const isWhatsApp = item.href?.startsWith("https://wa.me");
                    const href = isWhatsApp ? getWhatsAppUrl() : item.href;
                    return href ? (
                      <a key={i} href={href}
                        target={isWhatsApp ? "_blank" : undefined}
                        rel={isWhatsApp ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-1.5 text-[#D8CFC7]/85 hover:text-white transition-colors">
                        <item.icon className="w-3.5 h-3.5" style={{ color: GOLD }} />
                        {item.text}
                      </a>
                    ) : (
                      <span key={i} className="flex items-center gap-1.5 text-[#D8CFC7]/60">
                        <item.icon className="w-3.5 h-3.5" style={{ color: GOLD }} />
                        {item.text}
                      </span>
                    );
                  })}
                </div>
                <div className="flex items-center flex-shrink-0">
                  <Link href="/inquiry"
                    className="font-accent text-[10px] font-bold tracking-widest text-[#E8B96A] hover:text-white transition-colors"
                  >
                    PLAN MY TRIP
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main Navbar ─────────────────────────────────────── */}
        <motion.header
          className="w-full px-6 lg:px-10 py-2 pointer-events-auto relative"
          animate={{
            backgroundColor: scrolled ? "rgba(12,21,25,0.92)" : "rgba(12,21,25,0.5)",
            backdropFilter: "blur(16px)",
          }}
          style={{
            boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo Left — pure transparent gold brand mark */}
            <Link href="/" className="flex items-center group flex-shrink-0 mr-8">
              <Image
                src="/images/logo.webp"
                alt="Yaduvanshi Tour & Travels"
                width={94}
                height={64}
                priority
                className="transition-transform duration-500 group-hover:scale-105"
                style={{
                  display: "block",
                  filter: "drop-shadow(0 2px 16px rgba(232,185,106,0.48))",
                  flexShrink: 0,
                }}
              />
            </Link>

            {/* Center Nav Links */}
            <nav className="hidden lg:flex items-center gap-5">
              {NAV_LINKS.map((link) => {
                const isActive = link.sub
                  ? pathname?.startsWith("/tours")
                  : pathname === link.to;

                if (link.sub) {
                  return (
                    <div key={link.label} className="relative animate-none"
                      onMouseEnter={() => setMegaOpen(true)}
                      onMouseLeave={() => setMegaOpen(false)}
                    >
                      <button
                        className="relative flex items-center gap-1.5 px-3 py-2 text-[11px] font-accent tracking-widest font-semibold rounded-md transition-colors group"
                        style={{ color: isActive ? GOLD : "#ffffff" }}
                      >
                        <span className="relative z-10 transition-colors group-hover:text-[#E8B96A]">{link.label}</span>
                        <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="group-hover:text-[#E8B96A]">
                          <ChevronDown size={12} />
                        </motion.span>
                        {/* Gold underline on hover */}
                        <span
                          className="absolute bottom-0 left-3 right-3 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                          style={{
                            background: GOLD,
                            boxShadow: `0 0 8px ${GOLD}60`,
                            transform: isActive ? "scaleX(1)" : undefined,
                          }}
                        />
                        <span className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/5 transition-colors duration-300 -z-10" />
                      </button>

                      <AnimatePresence>
                        {megaOpen && <DropMenu items={link.sub} />}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link key={link.label} href={link.to}
                    className="relative px-3 py-2 text-[11px] font-accent tracking-widest font-semibold rounded-md transition-colors group"
                    style={{ color: isActive ? GOLD : "#ffffff" }}
                  >
                    <span className="relative z-10 transition-colors group-hover:text-[#E8B96A]">{link.label}</span>
                    {/* Gold underline on hover */}
                    <span
                      className="absolute bottom-0 left-3 right-3 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                      style={{
                        background: GOLD,
                        boxShadow: `0 0 8px ${GOLD}60`,
                        transform: isActive ? "scaleX(1)" : undefined,
                      }}
                    />
                    <span className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/5 transition-colors duration-300 -z-10" />
                  </Link>
                );
              })}
            </nav>

            {/* Right: solid gold pill CTA button 'PLAN MY TRIP' */}
            <div className="flex items-center gap-3">
              <MagneticBtn href="/inquiry">
                PLAN MY TRIP
              </MagneticBtn>
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-[#D8CFC7] p-1.5 rounded-md hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      {/* ── Mobile Fullscreen Menu ───────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col px-8 pt-8 pb-12 overflow-y-auto"
            style={{ background: "#0C1519" }}
          >
            {/* Mobile header */}
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center">
                <Image
                  src="/images/logo.webp"
                  alt="Yaduvanshi Tour & Travels"
                  width={108}
                  height={74}
                  priority
                  style={{
                    display: "block",
                    filter: "drop-shadow(0 2px 10px rgba(232,185,106,0.35))",
                    flexShrink: 0,
                  }}
                />
              </div>
              <button onClick={() => setMobileOpen(false)}
                className="text-white/60 hover:text-white p-1 rounded transition-colors cursor-pointer">
                <X size={24} />
              </button>
            </div>

            {/* Mobile nav links */}
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055, duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                >
                  {link.sub ? (
                    <div className="block border-b" style={{ borderColor: pathname?.startsWith("/tours") ? `${GOLD}40` : "rgba(255,255,255,0.06)" }}>
                      <button
                        onClick={() => setToursExpanded(!toursExpanded)}
                        className="w-full flex items-center justify-between py-3.5 text-xl font-display font-semibold text-white/80 hover:text-white transition-colors cursor-pointer text-left bg-transparent border-0 focus:outline-none"
                        style={{ color: pathname?.startsWith("/tours") ? GOLD : undefined }}
                      >
                        <div className="flex items-center">
                          {pathname?.startsWith("/tours") && (
                            <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 -mb-0.5" style={{ background: GOLD }} />
                          )}
                          {link.label}
                        </div>
                        <motion.span
                          animate={{ rotate: toursExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-white/60"
                        >
                          <ChevronDown size={18} />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {toursExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-1 pl-4 pb-3.5 mt-1">
                              {link.sub.map((s) => (
                                <Link key={s.label} href={s.to}
                                  onClick={() => setMobileOpen(false)}
                                  className="py-2 text-sm font-accent tracking-wider text-[#D8CFC7]/60 hover:text-white transition-colors"
                                >
                                  {s.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link href={link.to}
                      className="block py-3.5 text-xl font-display font-semibold text-white/80 hover:text-white border-b transition-colors"
                      style={{ borderColor: pathname === link.to ? `${GOLD}40` : "rgba(255,255,255,0.06)",
                               color: pathname === link.to ? GOLD : undefined }}
                    >
                      {pathname === link.to && (
                        <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 -mb-0.5" style={{ background: GOLD }} />
                      )}
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Mobile bottom: CTA + contact */}
            <div className="mt-auto pt-8 space-y-3">
              <Link href="/inquiry"
                className="flex items-center justify-center gap-2 w-full py-4 font-semibold font-accent tracking-widest rounded-full text-xs btn-glow"
                style={{ background: GOLD, color: "#0C1519" }}>
                PLAN MY TRIP <ArrowRight size={14} />
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <a href="tel:+918127929551"
                  className="flex items-center justify-center gap-1.5 py-3 rounded-sm text-[10px] font-accent tracking-wider glass-panel text-[#D8CFC7]/60 hover:text-white transition-colors">
                  <Phone size={12} /> Call Us
                </a>
                <a href={getWhatsAppUrl()}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-3 rounded-sm text-[10px] font-accent tracking-wider glass-panel text-[#D8CFC7]/60 hover:text-white transition-colors">
                  <WhatsAppIcon className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
