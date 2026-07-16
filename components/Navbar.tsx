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
      { label: "Explore Tours",             to: "/tours"   },
      { label: "Customized Tour Packages",  to: "/inquiry" },
    ],
  },
  { label: "Vehicle Rentals", to: "/vehicles"    },
  { label: "Wedding Travel",  to: "/weddings"    },
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
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-0 mt-3 w-56 rounded-xl overflow-hidden shadow-2xl z-50"
      style={{ background: "rgba(20, 35, 22, 0.98)", border: `1px solid ${GOLD}30`, backdropFilter: "blur(16px)" }}
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
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col pointer-events-none">
        {/* ── Premium Info Bar ─────────────────────────────────── */}
        <AnimatePresence>
          {infoVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden md:block overflow-hidden z-[60] relative pointer-events-auto"
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
                    <span key={i} className="flex items-center gap-1.5 text-white/55">
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
          className="w-full px-6 lg:px-10 py-5 pointer-events-auto"
          animate={{
          backgroundColor: solidBg ? "rgba(26,43,28,0.96)" : "rgba(0,0,0,0)",
          backdropFilter: solidBg ? "blur(14px)" : "blur(0px)",
          boxShadow: solidBg ? `0 2px 28px rgba(0,0,0,0.32), 0 0 0 1px ${GOLD}18` : "none",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#C9A84C] bg-white flex items-center justify-center relative shadow-[0_0_12px_rgba(201,168,76,0.3)] flex-shrink-0">
              <img
                src="/images/logo.png"
                alt="Yaduvanshi Tours Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-display font-bold text-white text-lg leading-none tracking-wide group-hover:text-[#C9A84C] transition-colors">
                Yaduvanshi
              </div>
              <div className="text-[9px] tracking-[0.25em] uppercase mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                Tours &amp; Travels
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5">
            {NAV_LINKS.map((link) => {
              const isActive = link.sub
                ? pathname.startsWith("/tours")
                : pathname === link.to;

              if (link.sub) {
                return (
                  <div key={link.label} className="relative animate-none"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <button
                      className="relative flex items-center gap-1.5 px-3 py-2 text-sm rounded-md transition-colors group"
                      style={{ color: isActive ? "white" : "rgba(255,255,255,0.75)" }}
                    >
                      <span className="relative z-10 transition-colors group-hover:text-white">{link.label}</span>
                      <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="group-hover:text-white">
                        <ChevronDown size={13} />
                      </motion.span>
                      {/* Smooth Underline animation */}
                      <span 
                        className="absolute bottom-0 left-3 right-3 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                        style={{ background: GOLD, transform: isActive ? "scaleX(1)" : undefined }}
                      />
                      {/* Subtle hover background pill */}
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
                  className="relative px-3 py-2 text-sm rounded-md transition-colors group"
                  style={{ color: isActive ? "white" : "rgba(255,255,255,0.75)" }}
                >
                  <span className="relative z-10 transition-colors group-hover:text-white">{link.label}</span>
                  {/* Smooth Underline animation */}
                  <span 
                    className="absolute bottom-0 left-3 right-3 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                    style={{ background: GOLD, transform: isActive ? "scaleX(1)" : undefined }}
                  />
                  {/* Subtle hover background pill */}
                  <span className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/5 transition-colors duration-300 -z-10" />
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
            style={{ background: DARK }}
          >
            {/* Mobile header */}
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-[#C9A84C] bg-white flex items-center justify-center flex-shrink-0">
                  <img
                    src="/images/logo.png"
                    alt="Yaduvanshi Tours Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
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
                  {link.sub ? (
                    <div className="block py-3.5 border-b border-white/8" style={{ borderColor: pathname.startsWith("/tours") ? `${GOLD}40` : "rgba(255,255,255,0.06)" }}>
                      <div className="text-2xl font-display text-white/80 flex items-center gap-1.5">
                        {pathname.startsWith("/tours") && (
                          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
                        )}
                        {link.label}
                      </div>
                      <div className="flex flex-col gap-1 pl-4 mt-2">
                        {link.sub.map((s) => (
                          <Link key={s.label} href={s.to}
                            className="py-2 text-base text-white/55 hover:text-white transition-colors">
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
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
