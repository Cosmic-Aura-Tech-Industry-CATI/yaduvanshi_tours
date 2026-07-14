"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, Phone, ArrowRight } from "lucide-react";

const GOLD  = "#C9A84C";
const DARK  = "#1A2B1C";

const NAV_LINKS = [
  { label: "Home",          to: "/"                },
  {
    label: "Tour Packages", to: "/tours",
    sub: [
      { label: "All Packages",        to: "/tours"           },
      { label: "Spiritual Tours",     to: "/tours?cat=spiritual" },
      { label: "Mountain Retreats",   to: "/tours?cat=mountains" },
      { label: "Customised Package",  to: "/inquiry"     },
    ],
  },
  { label: "Vehicle Rentals", to: "/vehicles"      },
  { label: "Wedding Travel",  to: "/weddings"      },
  { label: "Destinations",    to: "/destinations"  },
  { label: "About Us",        to: "/about"         },
  { label: "Contact Us",      to: "/contact"       },
];

export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [megaOpen,    setMegaOpen]    = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  const solidBg = !isHome || scrolled;

  return (
    <>
      {/* ── Top utility bar ── */}
      <div
        className="hidden md:flex items-center justify-between px-10 py-1.5 text-xs"
        style={{ background: DARK, color: "rgba(255,255,255,0.65)" }}
      >
        <span>Mon – Sat: 9:00 AM – 7:00 PM &nbsp;|&nbsp; Sun: 10:00 AM – 4:00 PM</span>
        <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-white transition-colors">
          <Phone size={11} /> +91 98765 43210
        </a>
      </div>

      {/* ── Main header ── */}
      <motion.header
        className="fixed left-0 right-0 z-50 px-6 lg:px-10 py-3.5"
        style={{ top: 0 }}
        animate={{
          backgroundColor: solidBg ? "rgba(26,43,28,0.96)" : "rgba(0,0,0,0)",
          boxShadow: solidBg ? "0 2px 24px rgba(0,0,0,0.28)" : "none",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
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
              <div className="text-[9px] tracking-[0.25em] uppercase mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Tours & Travels</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.to;
              return link.sub ? (
                <div key={link.label} className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <button className="flex items-center gap-1 text-sm text-white/75 hover:text-white transition-colors">
                    {link.label} <ChevronDown size={13} />
                  </button>

                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 mt-2 w-52 rounded-lg overflow-hidden shadow-2xl"
                        style={{ background: DARK, border: `1px solid ${GOLD}30` }}
                      >
                        {link.sub.map((sub, i) => (
                          <motion.div key={sub.label}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                          >
                            <Link href={sub.to}
                              className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/8 transition-all border-b border-white/5 last:border-0"
                            >
                              {sub.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.label} href={link.to}
                  className={
                    `relative text-sm transition-colors duration-200 group ${isActive ? "text-white" : "text-white/70 hover:text-white"}`
                  }
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300" style={{ background: GOLD }} />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/inquiry"
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-sm hover:brightness-90 transition-all"
              style={{ background: GOLD, color: DARK }}
            >
              Plan Your Trip <ArrowRight size={14} />
            </Link>
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-white p-1">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[100] flex flex-col px-8 pt-8 pb-12"
            style={{ background: DARK }}
          >
            <div className="flex justify-between items-center mb-12">
              <div className="font-display font-bold text-white text-xl">Yaduvanshi Tours</div>
              <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link href={link.to}
                    className="text-3xl font-display text-white hover:text-[#C9A84C] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                  {link.sub && (
                    <div className="flex flex-col gap-2 mt-2 pl-4">
                      {link.sub.slice(1).map((s) => (
                        <Link key={s.label} href={s.to} className="text-base text-white/50 hover:text-[#C9A84C] transition-colors">
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto">
              <Link href="/inquiry"
                className="flex items-center justify-center gap-2 w-full py-4 font-semibold rounded-sm"
                style={{ background: GOLD, color: DARK }}
              >
                Plan Your Trip <ArrowRight size={15} />
              </Link>
              <a href="tel:+919876543210"
                className="flex items-center justify-center gap-2 w-full py-3 mt-3 text-white/60 border border-white/15 rounded-sm text-sm"
              >
                <Phone size={14} /> +91 98765 43210
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
