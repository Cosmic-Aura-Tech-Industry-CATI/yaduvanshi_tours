"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useSpring } from "motion/react";
import { Menu, X, ChevronDown, Phone, Mail, Clock, MapPin, ArrowRight } from "lucide-react";

const GOLD  = "#C9A84C";
const DARK  = "#1A2B1C";

const INFO_ITEMS = [
  { icon: Phone,   text: "+91 94157 63552",         href: "tel:+919415763552"             },
  { icon: Mail,    text: "info@yaduvanshitours.com", href: "mailto:info@yaduvanshitours.com" },
  { icon: Clock,   text: "Mon–Sat 9 AM – 7 PM | Sun 10 AM – 4 PM", href: null             },
  { icon: MapPin,  text: "Ayodhya, Uttar Pradesh",  href: null                             },
];

const NAV_LINKS = [
  { label: "Home",          to: "/"                },
  {
    label: "Tour Packages", to: "/tours",
    sub: [
      { label: "All Packages",       to: "/tours"                },
      { label: "Spiritual Tours",    to: "/tours?cat=spiritual"  },
      { label: "Mountain Retreats",  to: "/tours?cat=mountains"  },
      { label: "Customised Package", to: "/inquiry"              },
    ],
  },
  { label: "Vehicle Rentals", to: "/vehicles"    },
  { label: "Wedding Travel",  to: "/weddings"    },
  { label: "Destinations",    to: "/destinations"},
  { label: "About Us",        to: "/about"       },
  { label: "Contact Us",      to: "/contact"     },
];

/* ── Magnetic Button ─────────────────────────────────────────── */
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
    <motion.a
      ref={ref}
      href={href}
      style={{ x: mx, y: my, background: GOLD, color: DARK }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="hidden lg:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-sm cursor-pointer select-none"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

/* ── Dropdown ──────────────────────────────────────────────────── */
function DropMenu({ items }: { items: { label: string; to: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-full left-0 mt-3 w-56 rounded-xl overflow-hidden shadow-2xl z-50"
      style={{ background: "rgba(26,43,28,0.97)", border: `1px solid ${GOLD}28`, backdropFilter: "blur(12px)" }}
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
            className="flex items-center gap-2 px-4 py-3 text-sm text-white/70 hover:text-white transition-all border-b border-white/5 last:border-0 group"
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
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60);
      setInfoVisible(window.scrollY < 40);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const solidBg = !isHome || scrolled;

  return (
    <>
      {/* ── Premium Info Bar ─────────────────────────────────── */}
      <AnimatePresence>
        {infoVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:block overflow-hidden z-[60] relative"
            style={{ background: DARK, borderBottom: `1px solid ${GOLD}22` }}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between py-1.5 text-xs gap-6">
              <div className="flex items-center gap-6 flex-wrap">
                {INFO_ITEMS.slice(2).map((item, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-white/55">
                    <item.icon size={11} style={{ color: GOLD }} />
                    {item.text}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-5 flex-shrink-0">
                {INFO_ITEMS.slice(0, 2).map((item, i) =>
                  item.href ? (
                    <a key={i} href={item.href}
                      className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
                      <item.icon size={11} style={{ color: GOLD }} />
                      {item.text}
                    </a>
                  ) : (
                    <span key={i} className="flex items-center gap-1.5 text-white/50">
                      <item.icon size={11} style={{ color: GOLD }} />
                      {item.text}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Header ─────────────────────────────────────── */}
      <motion.header
        className="fixed left-0 right-0 z-50 px-6 lg:px-10 py-3.5"
        style={{ top: 0 }}
        animate={{
          backgroundColor: solidBg ? "rgba(26,43,28,0.95)" : "rgba(0,0,0,0)",
          backdropFilter: solidBg ? "blur(14px)" : "blur(0px)",
          boxShadow: solidBg ? `0 2px 28px rgba(0,0,0,0.32), 0 0 0 1px ${GOLD}18` : "none",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <svg viewBox="0 0 32 32" className="w-9 h-9 flex-shrink-0" fill="none">
              <polygon points="16,3 29,27 3,27" stroke={GOLD} strokeWidth="2" strokeLinejoin="round" />
              <polygon points="16,10 23,23 9,23" fill={GOLD} opacity="0.35" />
            </svg>
            <div>
              <div className="font-display font-bold text-white text-lg leading-none tracking-wide">Yaduvanshi</div>
              <div className="text-[9px] tracking-[0.25em] uppercase mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Tours &amp; Travels</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = link.sub
                ? pathname.startsWith("/tours")
                : pathname === link.to;

              if (link.sub) {
                return (
                  <div key={link.label} className="relative"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <button
                      className="relative flex items-center gap-1 px-3 py-2 text-sm rounded-md transition-all"
                      style={{ color: isActive ? "white" : "rgba(255,255,255,0.7)" }}
                    >
                      {link.label}
                      <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={13} />
                      </motion.span>
                      {isActive && (
                        <motion.span layoutId="nav-pill"
                          className="absolute inset-0 rounded-md -z-10"
                          style={{ background: "rgba(201,168,76,0.12)" }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {megaOpen && <DropMenu items={link.sub} />}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link key={link.label} href={link.to}
                  className="relative px-3 py-2 text-sm rounded-md transition-colors"
                  style={{ color: isActive ? "white" : "rgba(255,255,255,0.7)" }}
                >
                  {link.label}
                  {/* Active underline */}
                  <motion.span
                    className="absolute bottom-1 left-3 right-3 h-px"
                    style={{ background: GOLD }}
                    animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                  />
                  {/* Hover background */}
                  <motion.span
                    className="absolute inset-0 rounded-md -z-10"
                    style={{ background: "rgba(255,255,255,0)" }}
                    whileHover={{ background: "rgba(255,255,255,0.05)" }}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Magnetic CTA */}
            <MagneticBtn href="/inquiry">
              Plan Your Trip <ArrowRight size={14} />
            </MagneticBtn>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-white p-1.5 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Fullscreen Menu ───────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col px-8 pt-8 pb-12 overflow-y-auto"
            style={{ background: DARK }}
          >
            {/* Mobile header */}
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                  <polygon points="16,3 29,27 3,27" stroke={GOLD} strokeWidth="2" strokeLinejoin="round" />
                  <polygon points="16,10 23,23 9,23" fill={GOLD} opacity="0.35" />
                </svg>
                <span className="font-display font-bold text-white text-lg">Yaduvanshi Tours</span>
              </div>
              <button onClick={() => setMobileOpen(false)}
                className="text-white/60 hover:text-white p-1 rounded transition-colors">
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
                  <Link href={link.to}
                    className="block py-3.5 text-2xl font-display text-white/80 hover:text-white border-b border-white/8 transition-colors"
                    style={{ borderColor: pathname === link.to ? `${GOLD}40` : "rgba(255,255,255,0.06)",
                             color: pathname === link.to ? "#fff" : undefined }}
                  >
                    {pathname === link.to && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 -mb-0.5" style={{ background: GOLD }} />
                    )}
                    {link.label}
                  </Link>
                  {link.sub && (
                    <div className="flex flex-col gap-0 pl-4 mb-2">
                      {link.sub.slice(1).map((s) => (
                        <Link key={s.label} href={s.to}
                          className="py-2 text-sm text-white/45 hover:text-white/80 transition-colors">
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Mobile bottom: CTA + contact */}
            <div className="mt-auto pt-8 space-y-3">
              <Link href="/inquiry"
                className="flex items-center justify-center gap-2 w-full py-4 font-semibold rounded-sm text-sm"
                style={{ background: GOLD, color: DARK }}>
                Plan Your Trip <ArrowRight size={15} />
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <a href="tel:+919415763552"
                  className="flex items-center justify-center gap-1.5 py-3 border border-white/15 rounded-sm text-xs text-white/60">
                  <Phone size={13} /> Call Us
                </a>
                <a href="mailto:info@yaduvanshitours.com"
                  className="flex items-center justify-center gap-1.5 py-3 border border-white/15 rounded-sm text-xs text-white/60">
                  <Mail size={13} /> Email Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
