import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  MapPin, Star, ShieldCheck, Clock, Navigation, 
  CheckCircle2, ArrowRight, Phone, MessageCircle, 
  HelpCircle, Car, ChevronRight
} from "lucide-react";
import { getSeoPageBySlug, getAllRoutes } from "@/data/seo-landings";
import { SITE_URL, PHONE_NUMBER } from "@/lib/siteConfig";
import { StickyMobileBookingBar } from "@/components/StickyMobileBookingBar";

interface Props {
  params: Promise<{ slug: string }>;
}

const BASE_URL = SITE_URL;
const BRASS = "#CF9D7B";
const GOLD = "#E8B96A";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const page = getSeoPageBySlug(resolvedParams.slug);

  if (!page || page.kind !== "route") {
    return {
      title: "Outstation Taxi Service | Yaduvanshi Tours Kanpur",
      description: "Book verified outstation cabs and taxi services across Uttar Pradesh with Yaduvanshi Tours.",
    };
  }

  const canonicalUrl = `${BASE_URL}/taxi/${page.slug}`;

  return {
    title: page.meta.title,
    description: page.meta.description,
    keywords: page.meta.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: canonicalUrl,
      siteName: "Yadhuvanshi Tours and Travels",
      images: [
        {
          url: `${BASE_URL}/images/hero-poster.webp`,
          width: 1200,
          height: 630,
          alt: page.hero.h1,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.meta.title,
      description: page.meta.description,
      images: [`${BASE_URL}/images/hero-poster.webp`],
    },
  };
}

export async function generateStaticParams() {
  const routes = getAllRoutes();
  return routes.map((r) => ({
    slug: r.slug,
  }));
}

export default async function TaxiRoutePage({ params }: Props) {
  const resolvedParams = await params;
  const page = getSeoPageBySlug(resolvedParams.slug);

  if (!page || page.kind !== "route") {
    notFound();
  }

  const cleanPhone = PHONE_NUMBER.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello Yadhuvanshi Tours, I would like to book a cab for: ${page.hero.h1}. Please share final pricing and chauffeur details.`
  )}`;

  // JSON-LD Structured Data
  const taxiServiceSchema = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "@id": `${BASE_URL}/taxi/${page.slug}#service`,
    name: page.hero.h1,
    description: page.meta.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Yadhuvanshi Tours and Travels",
      telephone: PHONE_NUMBER,
      url: BASE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ramadevi Chauraha, G.T. Road",
        addressLocality: "Kanpur",
        addressRegion: "Uttar Pradesh",
        postalCode: "208007",
        addressCountry: "IN",
      },
    },
    areaServed: [
      { "@type": "City", name: page.routeDetails?.sourceCity || "Kanpur" },
      { "@type": "City", name: page.routeDetails?.destinationCity || "Uttar Pradesh" },
    ],
    offers: {
      "@type": "Offer",
      price: page.hero.startingPrice,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/taxi/${page.slug}`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Outstation Cabs",
        item: `${BASE_URL}/taxi`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.hero.h1,
        item: `${BASE_URL}/taxi/${page.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(taxiServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-[#080E11] text-[#D8CFC7] pt-24 pb-20">
        {/* Breadcrumb Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-[#D8CFC7]/50 flex items-center gap-1.5 overflow-x-auto">
          <Link href="/" className="hover:text-[#E8B96A] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#CF9D7B]/60" />
          <Link href="/taxi" className="hover:text-[#E8B96A] transition-colors">
            Outstation Taxi
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#CF9D7B]/60" />
          <span className="text-[#E8B96A] font-medium truncate">
            {page.routeDetails?.sourceCity} to {page.routeDetails?.destinationCity}
          </span>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-10 md:py-16 border-b border-[#CF9D7B]/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#CF9D7B]/10 text-[#E8B96A] border border-[#CF9D7B]/30 mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {page.hero.badge}
                </span>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white mb-4 leading-tight">
                  {page.hero.h1}
                </h1>

                <p className="text-sm sm:text-base text-[#D8CFC7]/75 font-sans mb-6 leading-relaxed">
                  {page.hero.subheading}
                </p>

                {/* Rating & Trust Points */}
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#D8CFC7]/80 mb-8">
                  <div className="flex items-center gap-1 text-[#E8B96A]">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">{page.hero.ratingValue}</span>
                    <span className="text-[#D8CFC7]/50">
                      ({page.hero.reviewCount} Verified Reviews)
                    </span>
                  </div>
                  <span className="text-[#CF9D7B]/40">•</span>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Zero Surge Pricing</span>
                  </div>
                  <span className="text-[#CF9D7B]/40">•</span>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Doorstep Pickup</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold shadow-[0_0_20px_rgba(37,211,102,0.35)] transition-all active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Instant WhatsApp Booking</span>
                  </a>

                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-[#CF9D7B]/40 text-sm font-semibold transition-all active:scale-95"
                  >
                    <Phone className="w-4 h-4 text-[#CF9D7B]" />
                    <span>Call +91 81279 29551</span>
                  </a>
                </div>
              </div>

              {/* Route Summary Card */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl p-6 bg-[#0f171c]/90 border border-[#CF9D7B]/25 shadow-xl backdrop-blur-md">
                  <h3 className="text-white font-display text-lg font-semibold mb-4 pb-3 border-b border-[#CF9D7B]/15 flex items-center justify-between">
                    <span>Route Quick Facts</span>
                    <span className="text-xs text-[#E8B96A] font-sans font-normal">
                      Starting ₹{page.hero.startingPrice.toLocaleString("en-IN")}
                    </span>
                  </h3>

                  {page.routeDetails && (
                    <div className="space-y-4 text-xs sm:text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#CF9D7B] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[#D8CFC7]/50 text-[11px] uppercase tracking-wider">
                            Corridor
                          </div>
                          <div className="text-white font-medium">
                            {page.routeDetails.sourceCity} ➔ {page.routeDetails.destinationCity}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Navigation className="w-4 h-4 text-[#CF9D7B] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[#D8CFC7]/50 text-[11px] uppercase tracking-wider">
                            Highway & Distance
                          </div>
                          <div className="text-white font-medium">
                            {page.routeDetails.distanceKm} km via {page.routeDetails.primaryHighway}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-[#CF9D7B] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[#D8CFC7]/50 text-[11px] uppercase tracking-wider">
                            Estimated Travel Time
                          </div>
                          <div className="text-white font-medium">
                            {page.routeDetails.estimatedTimeHours}
                          </div>
                        </div>
                      </div>

                      {page.routeDetails.popularStopovers.length > 0 && (
                        <div className="pt-2 border-t border-white/5">
                          <div className="text-[#D8CFC7]/50 text-[11px] uppercase tracking-wider mb-1">
                            Popular Midway Stops
                          </div>
                          <div className="text-white/80 text-xs">
                            {page.routeDetails.popularStopovers.join(" • ")}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-6 pt-4 border-t border-[#CF9D7B]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#D8CFC7]/60 block">Need a Return Trip?</span>
                      <span className="text-xs text-[#E8B96A] font-medium">Discounted Two-Way Tariffs</span>
                    </div>
                    <Link
                      href="/inquiry"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-[#CF9D7B]/20 hover:bg-[#CF9D7B]/30 px-3 py-1.5 rounded-lg border border-[#CF9D7B]/40 transition-colors"
                    >
                      <span>Custom Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Matrix Table */}
        <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#E8B96A] mb-2 block font-sans">
              100% Transparent Billing
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
              Cab Fares & Vehicle Options
            </h2>
            <p className="text-xs sm:text-sm text-[#D8CFC7]/70">
              Clear price comparison with zero hidden night or fuel surcharges. Choose the ideal ride for your group size.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#CF9D7B]/25 bg-[#0e151a]">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#141e24] text-white/80 uppercase text-[11px] tracking-wider font-semibold border-b border-[#CF9D7B]/20">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Vehicle Class</th>
                  <th className="py-4 px-4">Seating & Luggage</th>
                  <th className="py-4 px-4">One-Way Fare</th>
                  <th className="py-4 px-4">Round Trip (Per Km)</th>
                  <th className="py-4 px-4">Est. Toll & State Tax</th>
                  <th className="py-4 px-4 text-right">Book</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {page.pricingMatrix.map((tier, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-white flex items-center gap-2">
                      <Car className="w-4 h-4 text-[#CF9D7B]" />
                      <span>{tier.vehicleType}</span>
                    </td>
                    <td className="py-4 px-4 text-[#D8CFC7]/80">{tier.capacity}</td>
                    <td className="py-4 px-4 font-bold text-[#E8B96A] text-sm sm:text-base font-display">
                      ₹{tier.oneWayRate.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-4 text-[#D8CFC7]/80">
                      ₹{tier.roundTripPerKm}/km <span className="text-[10px] text-white/40">(min {tier.minKmPerDay} km/day)</span>
                    </td>
                    <td className="py-4 px-4 text-[#D8CFC7]/70">
                      {tier.estimatedTollStateTax > 0 ? `₹${tier.estimatedTollStateTax}` : "Included / FASTag"}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <a
                        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                          `Hello Yadhuvanshi Tours, I want to book ${tier.vehicleType} for ${page.hero.h1}. Quoted rate: ₹${tier.oneWayRate}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E8B96A]/20 hover:bg-[#E8B96A]/30 text-[#E8B96A] border border-[#E8B96A]/40 text-xs font-semibold transition-all"
                      >
                        <span>Select</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Semantic Route Content */}
        <section className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-6 sm:p-8 bg-[#0f171c]/70 border border-[#CF9D7B]/20">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">
              {page.intro.h2}
            </h2>
            <div className="space-y-4 text-sm text-[#D8CFC7]/80 leading-relaxed font-sans">
              {page.intro.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Highlights */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#E8B96A] mb-4 font-sans">
                Service Inclusions & Guarantees
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-white/90">
                {page.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Accordion */}
        <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#E8B96A] mb-2 block font-sans">
              Have Questions?
            </span>
            <h2 className="text-2xl font-display font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 font-sans">
            {page.faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-[#CF9D7B]/20 bg-[#0f171c]/80 p-4 transition-all duration-200"
              >
                <summary className="flex cursor-pointer items-center justify-between text-sm sm:text-base font-semibold text-white list-none">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#CF9D7B] flex-shrink-0" />
                    {faq.question}
                  </span>
                  <span className="ml-2 text-[#E8B96A] transition-transform duration-200 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-[#D8CFC7]/75 leading-relaxed pl-6 border-l border-[#CF9D7B]/30">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Related Routes & Mesh Silo Links */}
        {page.relatedRoutes && page.relatedRoutes.length > 0 && (
          <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#CF9D7B]/15">
            <h3 className="text-base font-display font-bold text-white mb-6">
              Other Popular Outstation Routes from Kanpur & UP
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {page.relatedRoutes.map((route, i) => (
                <Link
                  key={i}
                  href={`/taxi/${route.slug}`}
                  className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-[#CF9D7B]/30 transition-all group"
                >
                  <div className="text-sm font-semibold text-white group-hover:text-[#E8B96A] transition-colors mb-1">
                    {route.title}
                  </div>
                  <div className="text-xs text-[#D8CFC7]/40 flex items-center justify-between">
                    <span>{route.distance}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#CF9D7B] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Sticky Mobile CTA Bar */}
      <StickyMobileBookingBar
        title={page.hero.h1}
        startingPrice={page.hero.startingPrice}
      />
    </>
  );
}
