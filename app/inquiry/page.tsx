"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PACKAGES } from "@/data/packages";
import { VEHICLES } from "@/data/vehicles";
import { CheckCircle2, ArrowLeft, ArrowRight, ClipboardSignature, Compass, Calendar, Contact } from "lucide-react";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";

function InquiryForm() {
  const searchParams = useSearchParams();

  // Multi-step state: 1, 2, 3, 4
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "tour", // tour, vehicle, wedding
    packageSlug: "ayodhya-darshan",
    vehicleSlug: "maruti-dzire",
    rentalType: "local", // local, outstation
    startDate: "",
    durationDays: "2",
    passengers: "4",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Sync with search queries
  useEffect(() => {
    const qType = searchParams.get("type");
    const qPkg = searchParams.get("package");
    const qVeh = searchParams.get("vehicle");
    const qRental = searchParams.get("rental");

    // Sync form with URL search params
    setFormData((prev) => ({
      ...prev,
      type: qType || prev.type,
      packageSlug: qPkg || prev.packageSlug,
      vehicleSlug: qVeh || prev.vehicleSlug,
      rentalType: qRental || prev.rentalType,
    }));
  }, [searchParams]);

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  const progressPercentage = (step / 4) * 100;

  return (
    <div className="bg-[#0C1519] min-h-screen pt-28 pb-20 text-[#D8CFC7] relative overflow-hidden">
      {/* Background blobs for firelight depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-10"
        style={{ background: `radial-gradient(circle, ${BRASS}, transparent 70%)` }} />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-5"
        style={{ background: `radial-gradient(circle, ${COFFEE}, transparent 70%)` }} />

      <div className="max-w-xl mx-auto px-6 relative z-10">
        {/* Progress header */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs text-[#D8CFC7]/50 font-mono mb-2">
            <span className="uppercase tracking-wider">Inquiry Setup</span>
            <span>Step {step} of 4</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{ width: `${progressPercentage}%`, backgroundColor: GOLD }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div 
          className="p-6 md:p-8 rounded-xl border glass-panel"
          style={{
            background: "rgba(58, 53, 52, 0.25)",
            borderColor: "rgba(207, 157, 123, 0.15)",
          }}
        >
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-green-950/40 text-green-500 flex items-center justify-center mx-auto border border-green-500/20">
                <CheckCircle2 size={28} />
              </div>
              <h2 className="font-display text-2xl font-bold text-white">Booking Plan Received!</h2>
              <p className="text-[#D8CFC7]/60 text-xs max-w-sm mx-auto leading-relaxed">
                Thank you for choosing Yaduvanshi. Our travel architect is review routing logistics and will call you on WhatsApp within 15 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ── STEP 1: CATEGORY SELECTION ── */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#E8B96A] font-mono text-[10px] uppercase tracking-widest font-semibold">
                    <ClipboardSignature size={12} /> Step 1: Select Plan Category
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white">What are you planning?</h3>
                  
                  <div className="space-y-2.5">
                    {[
                      { id: "tour", label: "Book a Pilgrimage / Tour Package", desc: "Select from Ayodhya, Kashi, Char Dham, or custom travel plans" },
                      { id: "vehicle", label: "Rent a Fleet Vehicle Only", desc: "Hire chauffeured MPVs, luxury cars, or coaches" },
                      { id: "wedding", label: "Wedding Travel & Logistics", desc: "Bride's entries, groom's baraat leading, or guest transport" },
                    ].map((opt) => {
                      const isSelected = formData.type === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, type: opt.id })}
                          className="w-full text-left p-4 rounded-xl border flex flex-col transition-all cursor-pointer"
                          style={{
                            borderColor: isSelected ? GOLD : "rgba(255,255,255,0.1)",
                            backgroundColor: isSelected ? "rgba(232, 185, 106, 0.05)" : "rgba(22, 33, 39, 0.35)",
                          }}
                        >
                          <span className="text-sm font-semibold text-white">{opt.label}</span>
                          <span className="text-xs text-[#D8CFC7]/60 mt-1 font-sans leading-normal">{opt.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 2: CATEGORY SPECIFICS ── */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#E8B96A] font-mono text-[10px] uppercase tracking-widest font-semibold">
                    <Compass size={12} /> Step 2: Trip Configuration
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white">Configure Specifics</h3>

                  {formData.type === "tour" && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-[#D8CFC7]/80 text-xs font-semibold block mb-1.5 font-accent uppercase tracking-wider">Select Tour Package</label>
                        <select
                          value={formData.packageSlug}
                          onChange={(e) => setFormData({ ...formData, packageSlug: e.target.value })}
                          className="w-full bg-[#162127]/60 border border-white/10 rounded-lg px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#E8B96A]"
                        >
                          {PACKAGES.map((pkg) => (
                            <option key={pkg.slug} value={pkg.slug} className="bg-[#162127] text-white">{pkg.title}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[#D8CFC7]/80 text-xs font-semibold block mb-1.5 font-accent uppercase tracking-wider">Select Vehicle Class</label>
                        <select
                          value={formData.vehicleSlug}
                          onChange={(e) => setFormData({ ...formData, vehicleSlug: e.target.value })}
                          className="w-full bg-[#162127]/60 border border-white/10 rounded-lg px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#E8B96A]"
                        >
                          {VEHICLES.map((veh) => (
                            <option key={veh.slug} value={veh.slug} className="bg-[#162127] text-white">{veh.name} (Max {veh.seats} Seats)</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {formData.type === "vehicle" && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-[#D8CFC7]/80 text-xs font-semibold block mb-1.5 font-accent uppercase tracking-wider">Select Vehicle</label>
                        <select
                          value={formData.vehicleSlug}
                          onChange={(e) => setFormData({ ...formData, vehicleSlug: e.target.value })}
                          className="w-full bg-[#162127]/60 border border-white/10 rounded-lg px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#E8B96A]"
                        >
                          {VEHICLES.map((veh) => (
                            <option key={veh.slug} value={veh.slug} className="bg-[#162127] text-white">{veh.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[#D8CFC7]/80 text-xs font-semibold block mb-1.5 font-accent uppercase tracking-wider">Select Rental Type</label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { id: "local", label: "Local Package (80km limit)" },
                            { id: "outstation", label: "Outstation (Highway)" },
                          ].map((type) => (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, rentalType: type.id })}
                              className="p-3 text-center rounded-lg border text-xs cursor-pointer transition-all font-semibold"
                              style={{
                                borderColor: formData.rentalType === type.id ? GOLD : "rgba(255,255,255,0.1)",
                                backgroundColor: formData.rentalType === type.id ? "rgba(232, 185, 106, 0.05)" : "transparent",
                                color: formData.rentalType === type.id ? GOLD : "#D8CFC7",
                              }}
                            >
                              {type.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.type === "wedding" && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-[#D8CFC7]/80 text-xs font-semibold block mb-1.5 font-accent uppercase tracking-wider">Preferred Bride Entry Vehicle</label>
                        <select
                          value={formData.vehicleSlug}
                          onChange={(e) => setFormData({ ...formData, vehicleSlug: e.target.value })}
                          className="w-full bg-[#162127]/60 border border-white/10 rounded-lg px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#E8B96A]"
                        >
                          <option value="bmw-5-series" className="bg-[#162127] text-white">BMW 5 Series (Luxury Sedan)</option>
                          <option value="toyota-fortuner" className="bg-[#162127] text-white">Toyota Fortuner (Premium SUV)</option>
                          <option value="audi-a6" className="bg-[#162127] text-white">Audi A6 Sedan</option>
                          <option value="honda-city" className="bg-[#162127] text-white">Honda City (Sunroof)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[#D8CFC7]/80 text-xs font-semibold block mb-1.5 font-accent uppercase tracking-wider">Guest Shuttle Capacity Required</label>
                        <select
                          className="w-full bg-[#162127]/60 border border-white/10 rounded-lg px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#E8B96A]"
                          onChange={(e) => setFormData({ ...formData, notes: `Requires guest transport for approx ${e.target.value} people` })}
                        >
                          <option value="none" className="bg-[#162127] text-white">No Guest Shuttles needed (Only bridal car)</option>
                          <option value="10-15" className="bg-[#162127] text-white">10 - 15 Guests (Tempo Traveller)</option>
                          <option value="15-30" className="bg-[#162127] text-white">15 - 30 Guests (Multiple Travellers/Bus)</option>
                          <option value="30+" className="bg-[#162127] text-white">30+ Guests (Large Coach Bus)</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── STEP 3: SCHEDULE & NUMBERS ── */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#E8B96A] font-mono text-[10px] uppercase tracking-widest font-semibold">
                    <Calendar size={12} /> Step 3: Date & Passengers
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white">Scheduling</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[#D8CFC7]/80 text-xs font-semibold block mb-1.5 font-accent uppercase tracking-wider">Start Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full bg-[#162127]/60 border border-white/10 rounded-lg px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#E8B96A]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[#D8CFC7]/80 text-xs font-semibold block mb-1.5 font-accent uppercase tracking-wider">Total Days *</label>
                        <input
                          type="number"
                          required
                          min={1}
                          max={30}
                          value={formData.durationDays}
                          onChange={(e) => setFormData({ ...formData, durationDays: e.target.value })}
                          className="w-full bg-[#162127]/60 border border-white/10 rounded-lg px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#E8B96A]"
                        />
                      </div>

                      <div>
                        <label className="text-[#D8CFC7]/80 text-xs font-semibold block mb-1.5 font-accent uppercase tracking-wider">Passengers *</label>
                        <input
                          type="number"
                          required
                          min={1}
                          max={50}
                          value={formData.passengers}
                          onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                          className="w-full bg-[#162127]/60 border border-white/10 rounded-lg px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#E8B96A]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 4: CONTACT DETAILS ── */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#E8B96A] font-mono text-[10px] uppercase tracking-widest font-semibold">
                    <Contact size={12} /> Step 4: Contact details
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white">Submit Information</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[#D8CFC7]/80 text-xs font-semibold block mb-1.5 font-accent uppercase tracking-wider">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#162127]/60 border border-white/10 rounded-lg px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#E8B96A] placeholder-white/20"
                        placeholder="Enter name..."
                      />
                    </div>

                    <div>
                      <label className="text-[#D8CFC7]/80 text-xs font-semibold block mb-1.5 font-accent uppercase tracking-wider">Mobile / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#162127]/60 border border-white/10 rounded-lg px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#E8B96A] placeholder-white/20"
                        placeholder="Enter 10-digit number..."
                      />
                    </div>

                    <div>
                      <label className="text-[#D8CFC7]/80 text-xs font-semibold block mb-1.5 font-accent uppercase tracking-wider">Email address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#162127]/60 border border-white/10 rounded-lg px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#E8B96A] placeholder-white/20"
                        placeholder="name@email.com"
                      />
                    </div>

                    <div>
                      <label className="text-[#D8CFC7]/80 text-xs font-semibold block mb-1.5 font-accent uppercase tracking-wider">Special requests/notes</label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full bg-[#162127]/60 border border-white/10 rounded-lg px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#E8B96A] placeholder-white/20"
                        placeholder="Any custom routing, extra stays needed..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation controls */}
              <div className="flex justify-between items-center pt-5 border-t border-white/5">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 text-xs font-bold rounded-full border border-white/15 text-[#D8CFC7] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer bg-white/5"
                  >
                    <ArrowLeft size={13} /> Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all hover:brightness-110"
                    style={{
                      background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
                      color: "#0C1519",
                      boxShadow: `0 4px 15px rgba(232,185,106,0.2)`
                    }}
                  >
                    Next Step <ArrowRight size={13} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all hover:brightness-110"
                    style={{
                      background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
                      color: "#0C1519",
                      boxShadow: `0 4px 15px rgba(232,185,106,0.25)`
                    }}
                  >
                    Submit Booking Request <CheckCircle2 size={13} />
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function InquiryPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#0C1519] min-h-screen pt-28 pb-20 flex items-center justify-center">
        <div className="text-center font-display text-[#D8CFC7]/50 text-sm">Loading Custom Inquiry Form...</div>
      </div>
    }>
      <InquiryForm />
    </Suspense>
  );
}
