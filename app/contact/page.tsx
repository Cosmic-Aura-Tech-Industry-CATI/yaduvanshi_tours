"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, CheckCircle, Send, ShieldAlert } from "lucide-react";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#0C1519] min-h-screen pt-28 pb-20 text-[#D8CFC7] overflow-hidden relative">
      {/* Background blobs for firelight depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-10"
        style={{ background: `radial-gradient(circle, ${BRASS}, transparent 70%)` }} />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-5"
        style={{ background: `radial-gradient(circle, ${COFFEE}, transparent 70%)` }} />

      {/* Header */}
      <section className="relative py-20 px-6 overflow-hidden z-10 text-center">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#E8B96A] font-accent text-xs uppercase tracking-[0.25em] block mb-3 font-semibold">Connect With Us</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-wide text-white">
            Contact <span className="text-[#E8B96A]">Us</span>
          </h1>
          <p className="text-[#D8CFC7]/60 text-sm md:text-base max-w-xl mx-auto mt-5 font-sans leading-relaxed">
            Reach our booking offices directly. We respond within 15 minutes to all custom trip inquiries.
          </p>
          <div className="w-24 h-0.5 mx-auto mt-6" style={{ background: `linear-gradient(to right, transparent, ${BRASS}, transparent)` }} />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        {/* Left Column: Direct Contacts */}
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-white">Office Branch Locations</h2>
            <p className="text-[#D8CFC7]/50 text-xs mt-2 font-sans">Stop by our branch coordinates for booking deals.</p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Headquarters (Varanasi Office)",
                address: "K-45/12, near Kashi Vishwanath Corridor, Varanasi, UP, 221001",
                phone: "+91 98765 43210",
                email: "bookings@yaduvanshitours.com",
              },
              {
                title: "Ayodhya Branch Office",
                address: "Saryu Ghat Road, near Ram Mandir Complex, Ayodhya, UP, 224123",
                phone: "+91 98765 43211",
                email: "ayodhya@yaduvanshitours.com",
              },
            ].map((branch, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-xl border space-y-4 glass-panel"
                style={{
                  background: "rgba(58, 53, 52, 0.25)",
                  borderColor: "rgba(207, 157, 123, 0.15)",
                }}
              >
                <h3 className="font-display font-semibold text-white text-base">{branch.title}</h3>
                <div className="space-y-3.5 text-xs text-[#D8CFC7]/75 font-sans">
                  <div className="flex items-start gap-3">
                    <MapPin size={15} className="text-[#E8B96A] flex-shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
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
                </div>
              </div>
            ))}
          </div>

          {/* Map API Key Requirement block */}
          <div 
            className="p-5 rounded-xl border text-xs space-y-3 flex items-start gap-3.5"
            style={{
              background: "rgba(58, 53, 52, 0.15)",
              borderColor: "rgba(207, 157, 123, 0.15)",
            }}
          >
            <ShieldAlert size={18} className="text-[#E8B96A] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block font-display text-white text-sm">Dynamic Map API Keys Note:</span>
              <p className="text-[#D8CFC7]/60 text-[11px] mt-1 font-sans leading-relaxed">
                `[MAP_API_KEY_REQUIREMENT]` — Dynamic embeds require a valid Google Maps API Key initialized. Currently rendered as local vector vectors to ensure zero dependency costs.
              </p>
            </div>
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
              <div>
                <h3 className="font-display font-semibold text-xl text-white">Send Us a Message</h3>
                <p className="text-[#D8CFC7]/50 text-[11px] font-sans mt-1">Quick response guaranteed.</p>
              </div>

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
                className="w-full py-3.5 rounded-full font-bold font-accent tracking-widest text-xs text-center flex items-center justify-center gap-2 cursor-pointer transition-all hover:brightness-110"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
                  color: "#0C1519",
                  boxShadow: `0 4px 15px rgba(232,185,106,0.2)`
                }}
              >
                Send Inquiry Message <Send size={11} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
