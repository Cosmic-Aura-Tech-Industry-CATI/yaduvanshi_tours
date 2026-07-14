"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, CheckCircle, Send, ShieldAlert } from "lucide-react";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";

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
    <div className="bg-[#FAFAF8] min-h-screen pt-28 pb-20">
      {/* Header */}
      <section className="bg-[#1A2B1C] text-white py-16 px-6 relative overflow-hidden border-b border-[#C9A84C]/20">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#C9A84C_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-[#C9A84C] font-mono text-xs uppercase tracking-widest block mb-3">Connect With Us</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wide">Contact Us</h1>
          <p className="text-white/60 text-sm max-w-xl mx-auto mt-4 font-sans leading-relaxed">
            Reach our booking offices directly. We respond within 15 minutes to all custom trip inquiries.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Column: Direct Contacts */}
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-800">Office Branch Locations</h2>
            <p className="text-gray-400 text-xs mt-1 font-sans">Stop by our branch coordinates for booking deals.</p>
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
              <div key={idx} className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm space-y-3.5">
                <h3 className="font-display font-semibold text-gray-900 text-sm">{branch.title}</h3>
                <div className="space-y-2 text-xs text-gray-500 font-sans">
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-[#C9A84C] flex-shrink-0" />
                    <a href={`tel:${branch.phone.replace(/ /g, "")}`} className="hover:text-[#C9A84C] font-mono transition-colors">
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-[#C9A84C] flex-shrink-0" />
                    <a href={`mailto:${branch.email}`} className="hover:text-[#C9A84C] transition-colors">
                      {branch.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map API Key Requirement block */}
          <div className="p-4 rounded-lg bg-[#1A2B1C] border border-[#C9A84C]/20 text-white text-xs space-y-2 flex items-start gap-2.5">
            <ShieldAlert size={18} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block font-display text-white">Dynamic Map API Keys Note:</span>
              <p className="text-white/60 text-[10px] mt-1 font-sans leading-relaxed">
                `[MAP_API_KEY_REQUIREMENT]` — Dynamic embeds require a valid Google Maps API Key initialized. Currently rendered as local vector vectors to ensure zero dependency costs.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Message Form */}
        <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                <CheckCircle size={24} />
              </div>
              <h3 className="font-display font-semibold text-lg text-gray-800">Message Submitted!</h3>
              <p className="text-gray-500 text-xs max-w-xs mx-auto leading-relaxed">
                Thank you. Our travel coordinator will contact you at the mobile number provided within 15 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="font-display font-semibold text-lg text-gray-800">Send Us a Message</h3>
                <p className="text-gray-400 text-[11px] font-sans mt-0.5">Quick response guaranteed.</p>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="text-gray-700 text-xs font-semibold block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAFAF8] border border-gray-200 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                    placeholder="Enter name..."
                  />
                </div>

                <div>
                  <label className="text-gray-700 text-xs font-semibold block mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAFAF8] border border-gray-200 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                    placeholder="Enter 10-digit phone number..."
                  />
                </div>

                <div>
                  <label className="text-gray-700 text-xs font-semibold block mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAFAF8] border border-gray-200 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                    placeholder="Enter email address..."
                  />
                </div>

                <div>
                  <label className="text-gray-700 text-xs font-semibold block mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FAFAF8] border border-gray-200 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                    placeholder="Tell us about your trip plans..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-sm font-semibold text-xs text-center flex items-center justify-center gap-1.5 cursor-pointer transition-all hover:brightness-95"
                style={{ backgroundColor: GOLD, color: DARK }}
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
