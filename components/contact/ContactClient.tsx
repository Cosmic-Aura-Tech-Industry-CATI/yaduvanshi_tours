"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, CheckCircle, Send, Clock, Navigation, Loader2 } from "lucide-react";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";

export function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [website, setWebsite] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) return;
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          website,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(
          result.message || "Failed to send message. Please try again or contact us directly."
        );
      }
    } catch (err) {
      console.error("Contact API error:", err);
      setErrorMessage("Failed to send message. Please try again or contact us directly by phone or WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0C1519] min-h-screen pb-20 text-[#D8CFC7] overflow-hidden relative">
      {/* Background blobs for firelight depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-10"
        style={{ background: `radial-gradient(circle, ${BRASS}, transparent 70%)` }} />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-5"
        style={{ background: `radial-gradient(circle, ${COFFEE}, transparent 70%)` }} />

      {/* Header / Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center pt-32 pb-16 px-6 lg:px-12 overflow-hidden text-center bg-black">
        {/* Background Image Wrapper */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full z-[1]"
        >
          <Image
            src="/images/contact-hero-bg.webp"
            alt="Contact us office location background"
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
          className="absolute inset-x-0 bottom-0 h-20 z-[3] pointer-events-none"
          style={{ background: "linear-gradient(to top, #0C1519, transparent)" }}
        />

        {/* Ambient glow blobs */}
        <div className="absolute bottom-0 left-0 z-[3] pointer-events-none"
          style={{ width: 600, height: 400, background: `radial-gradient(ellipse at bottom left, ${BRASS}20, transparent 70%)` }} />
        <div className="absolute top-20 right-10 z-[3] pointer-events-none"
          style={{ width: 500, height: 500, background: `radial-gradient(ellipse at top right, ${COFFEE}15, transparent 70%)` }} />

        {/* Content Container */}
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-[#E8B96A] font-accent text-xs sm:text-sm uppercase tracking-[0.25em] block mb-3 font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">Connect With Us</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-wide text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Contact <span className="text-[#E8B96A]">Us</span>
          </h1>
          <p className="text-[#D8CFC7] text-base md:text-lg max-w-2xl mx-auto mt-5 font-sans leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-medium">
            Reach our booking offices directly. We respond within 15 minutes to all custom trip inquiries.
          </p>
          <div className="w-24 h-0.5 mx-auto mt-6" style={{ background: `linear-gradient(to right, transparent, ${BRASS}, transparent)` }} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        {/* Left Column: Direct Contacts */}
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-white">Office Branch Locations</h2>
            <p className="text-[#D8CFC7]/50 text-xs mt-2 font-sans">Stop by our branch coordinates for booking deals.</p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Headquarters (Kanpur Office)",
                address: "Ramadevi Chauraha, Kanpur, UP",
                phone: "+91 81279 29551",
                email: "manojyadav20101993@gmail.com",
                hours: "9:00 AM – 9:00 PM (Daily)",
                mapsUrl: "https://www.google.com/maps/place/Rama+Devi+Chauraha,+Jajmau+Sub+Metro+City,+Kanpur,+Uttar+Pradesh+208007/@26.4115254,80.3867627,17z/data=!4m6!3m5!1s0x399c413d6d4c2ad9:0x51d8569068c3e80b!8m2!3d26.4115254!4d80.3867627!16s%2Fg%2F11csdc1rl6",
              },
            ].map((branch, idx) => (
              <div 
                key={idx} 
                className="p-8 rounded-xl border space-y-5 glass-panel"
                style={{
                  background: "rgba(58, 53, 52, 0.25)",
                  borderColor: "rgba(207, 157, 123, 0.15)",
                }}
              >
                <h3 className="font-display font-semibold text-white text-base border-b pb-3" style={{ borderColor: "rgba(207, 157, 123, 0.1)" }}>
                  {branch.title}
                </h3>
                <div className="space-y-3.5 text-xs text-[#D8CFC7]/75 font-sans">
                  <div className="flex items-start gap-3">
                    <MapPin size={15} className="text-[#E8B96A] flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={15} className="text-[#E8B96A] flex-shrink-0" />
                    <a href={`tel:${branch.phone.replace(/ /g, "")}`} className="hover:text-[#E8B96A] font-mono transition-colors">
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={15} className="text-[#E8B96A] flex-shrink-0" />
                    <a href={`mailto:${branch.email}`} className="hover:text-[#E8B96A] transition-colors">
                      {branch.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={15} className="text-[#E8B96A] flex-shrink-0" />
                    <span>Business Hours: {branch.hours}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <a
                    href={branch.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border text-xs font-semibold font-accent tracking-widest uppercase transition-all duration-300"
                    style={{
                      borderColor: "rgba(207, 157, 123, 0.25)",
                      color: "#E8B96A",
                      background: "rgba(232, 185, 106, 0.05)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(232, 185, 106, 0.15)";
                      e.currentTarget.style.borderColor = "#E8B96A";
                      e.currentTarget.style.color = "#FFF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(232, 185, 106, 0.05)";
                      e.currentTarget.style.borderColor = "rgba(207, 157, 123, 0.25)";
                      e.currentTarget.style.color = "#E8B96A";
                    }}
                  >
                    <Navigation size={12} className="animate-pulse" /> Get Directions
                  </a>
                </div>

                {/* Embedded Google Map */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="pt-3 w-full"
                >
                  <div
                    className="w-full h-[380px] rounded-xl overflow-hidden border relative"
                    style={{
                      borderColor: "rgba(207, 157, 123, 0.25)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.36), 0 0 20px rgba(232, 185, 106, 0.1)",
                    }}
                  >
                    <iframe
                      src="https://www.google.com/maps?q=26.4115254,80.3867627&z=16&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ramadevi Chauraha, Kanpur Location"
                    />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Inquiry Message Form */}
        <div 
          className="p-6 md:p-8 rounded-xl border flex flex-col justify-center glass-panel"
          style={{
            background: "rgba(58, 53, 52, 0.25)",
            borderColor: "rgba(207, 157, 123, 0.15)",
          }}
        >
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-green-950/40 text-green-500 flex items-center justify-center mx-auto border border-green-500/20">
                <CheckCircle size={24} />
              </div>
              <h3 className="font-display font-semibold text-lg text-white">Message Submitted!</h3>
              <p className="text-[#D8CFC7]/60 text-xs max-w-xs mx-auto leading-relaxed">
                Thank you. Our travel coordinator will contact you at the mobile number provided within 15 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <h3 className="font-display font-semibold text-xl text-white">Send Us a Message</h3>
                <p className="text-[#D8CFC7]/50 text-[11px] font-sans mt-1">Quick response guaranteed.</p>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-sans">
                  {errorMessage}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-[#D8CFC7]/80 text-xs font-semibold block mb-1.5 font-accent uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#162127]/60 border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-[#E8B96A] placeholder-white/20"
                    placeholder="Enter name..."
                  />
                </div>

                <div>
                  <label className="text-[#D8CFC7]/80 text-xs font-semibold block mb-1.5 font-accent uppercase tracking-wider">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#162127]/60 border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-[#E8B96A] placeholder-white/20"
                    placeholder="Enter 10-digit phone number..."
                  />
                </div>

                <div>
                  <label className="text-[#D8CFC7]/80 text-xs font-semibold block mb-1.5 font-accent uppercase tracking-wider">Email (Optional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#162127]/60 border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-[#E8B96A] placeholder-white/20"
                    placeholder="Enter email address..."
                  />
                </div>

                <div>
                  <label className="text-[#D8CFC7]/80 text-xs font-semibold block mb-1.5 font-accent uppercase tracking-wider">Your Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#162127]/60 border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-[#E8B96A] placeholder-white/20"
                    placeholder="Tell us about your trip plans..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full font-bold font-accent tracking-widest text-xs text-center flex items-center justify-center gap-2 cursor-pointer transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
                  color: "#0C1519",
                  boxShadow: `0 4px 15px rgba(232,185,106,0.2)`
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={14} /> Sending...
                  </>
                ) : (
                  <>
                    Send Inquiry Message <Send size={11} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
