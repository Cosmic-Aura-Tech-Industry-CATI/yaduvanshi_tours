"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PACKAGES } from "@/data/packages";
import { VEHICLES } from "@/data/vehicles";
import { CheckCircle2, ArrowLeft, ArrowRight, ClipboardSignature, Compass, Calendar, Contact } from "lucide-react";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";

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

    // Sync form with URL search params (functional update avoids stale closure)
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <div className="bg-[#FAFAF8] min-h-screen pt-28 pb-20">
      <div className="max-w-xl mx-auto px-6">
        {/* Progress header */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs text-gray-400 font-mono mb-2">
            <span>Inquiry Setup</span>
            <span>Step {step} of 4</span>
          </div>
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{ width: `${progressPercentage}%`, backgroundColor: GOLD }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                <CheckCircle2 size={28} />
              </div>
              <h2 className="font-display text-2xl font-bold text-gray-800">Booking Plan Received!</h2>
              <p className="text-gray-500 text-xs max-w-sm mx-auto leading-relaxed">
                Thank you for choosing Yaduvanshi. Our travel architect is review routing logistics and will call you on WhatsApp within 15 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ── STEP 1: CATEGORY SELECTION ── */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#C9A84C] font-mono text-[10px] uppercase tracking-widest">
                    <ClipboardSignature size={12} /> Step 1: Select Plan Category
                  </div>
                  <h3 className="font-display font-semibold text-lg text-gray-800">What are you planning?</h3>
                  
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
                          className="w-full text-left p-4 rounded-md border flex flex-col transition-all cursor-pointer"
                          style={{
                            borderColor: isSelected ? GOLD : "#e5e7eb",
                            backgroundColor: isSelected ? "rgba(201,168,76,0.04)" : "transparent",
                          }}
                        >
                          <span className="text-xs font-semibold text-gray-800">{opt.label}</span>
                          <span className="text-[10px] text-gray-400 mt-1 font-sans leading-normal">{opt.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 2: CATEGORY SPECIFICS ── */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#C9A84C] font-mono text-[10px] uppercase tracking-widest">
                    <Compass size={12} /> Step 2: Trip Configuration
                  </div>
                  <h3 className="font-display font-semibold text-lg text-gray-800">Configure Specifics</h3>

                  {formData.type === "tour" && (
                    <div className="space-y-3.5">
                      <div>
                        <label className="text-gray-700 text-xs font-semibold block mb-1">Select Tour Package</label>
                        <select
                          value={formData.packageSlug}
                          onChange={(e) => setFormData({ ...formData, packageSlug: e.target.value })}
                          className="w-full bg-[#FAFAF8] border border-gray-200 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                        >
                          {PACKAGES.map((pkg) => (
                            <option key={pkg.slug} value={pkg.slug}>{pkg.title}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-gray-700 text-xs font-semibold block mb-1">Select Vehicle Class</label>
                        <select
                          value={formData.vehicleSlug}
                          onChange={(e) => setFormData({ ...formData, vehicleSlug: e.target.value })}
                          className="w-full bg-[#FAFAF8] border border-gray-200 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                        >
                          {VEHICLES.map((veh) => (
                            <option key={veh.slug} value={veh.slug}>{veh.name} (Max {veh.seats} Seats)</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {formData.type === "vehicle" && (
                    <div className="space-y-3.5">
                      <div>
                        <label className="text-gray-700 text-xs font-semibold block mb-1">Select Vehicle</label>
                        <select
                          value={formData.vehicleSlug}
                          onChange={(e) => setFormData({ ...formData, vehicleSlug: e.target.value })}
                          className="w-full bg-[#FAFAF8] border border-gray-200 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                        >
                          {VEHICLES.map((veh) => (
                            <option key={veh.slug} value={veh.slug}>{veh.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-gray-700 text-xs font-semibold block mb-1">Select Rental Type</label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: "local", label: "Local Package (80km limit)" },
                            { id: "outstation", label: "Outstation (Highway)" },
                          ].map((type) => (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, rentalType: type.id })}
                              className="p-3 text-center rounded-sm border text-xs cursor-pointer transition-all"
                              style={{
                                borderColor: formData.rentalType === type.id ? GOLD : "#e5e7eb",
                                backgroundColor: formData.rentalType === type.id ? "rgba(201,168,76,0.04)" : "transparent",
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
                    <div className="space-y-3.5">
                      <div>
                        <label className="text-gray-700 text-xs font-semibold block mb-1">Preferred Bride Entry Vehicle</label>
                        <select
                          value={formData.vehicleSlug}
                          onChange={(e) => setFormData({ ...formData, vehicleSlug: e.target.value })}
                          className="w-full bg-[#FAFAF8] border border-gray-200 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                        >
                          <option value="bmw-5-series">BMW 5 Series (Luxury Sedan)</option>
                          <option value="toyota-fortuner">Toyota Fortuner (Premium SUV)</option>
                          <option value="audi-a6">Audi A6 Sedan</option>
                          <option value="honda-city">Honda City (Sunroof)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-gray-700 text-xs font-semibold block mb-1">Guest Shuttle Capacity Required</label>
                        <select
                          className="w-full bg-[#FAFAF8] border border-gray-200 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                          onChange={(e) => setFormData({ ...formData, notes: `Requires guest transport for approx ${e.target.value} people` })}
                        >
                          <option value="none">No Guest Shuttles needed (Only bridal car)</option>
                          <option value="10-15">10 - 15 Guests (Tempo Traveller)</option>
                          <option value="15-30">15 - 30 Guests (Multiple Travellers/Bus)</option>
                          <option value="30+">30+ Guests (Large Coach Bus)</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── STEP 3: SCHEDULE & NUMBERS ── */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#C9A84C] font-mono text-[10px] uppercase tracking-widest">
                    <Calendar size={12} /> Step 3: Date & Passengers
                  </div>
                  <h3 className="font-display font-semibold text-lg text-gray-800">Scheduling</h3>

                  <div className="space-y-3.5">
                    <div>
                      <label className="text-gray-700 text-xs font-semibold block mb-1">Start Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full bg-[#FAFAF8] border border-gray-200 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-700 text-xs font-semibold block mb-1">Total Days *</label>
                        <input
                          type="number"
                          required
                          min={1}
                          max={30}
                          value={formData.durationDays}
                          onChange={(e) => setFormData({ ...formData, durationDays: e.target.value })}
                          className="w-full bg-[#FAFAF8] border border-gray-200 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                        />
                      </div>

                      <div>
                        <label className="text-gray-700 text-xs font-semibold block mb-1">Passengers *</label>
                        <input
                          type="number"
                          required
                          min={1}
                          max={50}
                          value={formData.passengers}
                          onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                          className="w-full bg-[#FAFAF8] border border-gray-200 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 4: CONTACT CUES ── */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#C9A84C] font-mono text-[10px] uppercase tracking-widest">
                    <Contact size={12} /> Step 4: Contact details
                  </div>
                  <h3 className="font-display font-semibold text-lg text-gray-800">Submit Information</h3>

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
                      <label className="text-gray-700 text-xs font-semibold block mb-1">Mobile / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FAFAF8] border border-gray-200 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                        placeholder="Enter 10-digit number..."
                      />
                    </div>

                    <div>
                      <label className="text-gray-700 text-xs font-semibold block mb-1">Email address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FAFAF8] border border-gray-200 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                        placeholder="name@email.com"
                      />
                    </div>

                    <div>
                      <label className="text-gray-700 text-xs font-semibold block mb-1">Special requests/notes</label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full bg-[#FAFAF8] border border-gray-200 rounded-sm px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                        placeholder="Any custom routing, extra stays needed..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation controls */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 text-xs font-semibold rounded-sm border border-gray-200 text-gray-500 hover:text-gray-800 transition-all flex items-center gap-1 cursor-pointer"
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
                    className="px-5 py-2 rounded-sm text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all hover:brightness-95"
                    style={{ backgroundColor: GOLD, color: DARK }}
                  >
                    Next Step <ArrowRight size={13} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-sm text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all hover:brightness-95 animate-pulse"
                    style={{ backgroundColor: GOLD, color: DARK }}
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
      <div className="bg-[#FAFAF8] min-h-screen pt-28 pb-20 flex items-center justify-center">
        <div className="text-center font-display text-gray-500 text-sm">Loading Custom Inquiry Form...</div>
      </div>
    }>
      <InquiryForm />
    </Suspense>
  );
}
