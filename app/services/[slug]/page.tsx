import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Star, ShieldCheck, CheckCircle2, ArrowRight, 
  Phone, MessageCircle, HelpCircle, Car, ChevronRight, Sparkles 
} from "lucide-react";
import { getSeoPageBySlug, getAllServices } from "@/data/seo-landings";
import { SITE_URL, PHONE_NUMBER } from "@/lib/siteConfig";
import { StickyMobileBookingBar } from "@/components/StickyMobileBookingBar";

interface Props {
  params: Promise<{ slug: string }>;
}

const BASE_URL = SITE_URL;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const page = getSeoPageBySlug(resolvedParams.slug);

  if (!page || page.kind !== "service") {
    return {
      title: "Travel & Taxi Services | Yaduvanshi Tours Kanpur",
      description: "Premier travel agency, taxi rental, and fleet hire in Kanpur and Uttar Pradesh.",
    };
  }

  const canonicalUrl = `${BASE_URL}/services/${page.slug}`;

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
  const services = getAllServices();
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const page = getSeoPageBySlug(resolvedParams.slug);

  if (!page || page.kind !== "service") {
    notFound();
  }

  const cleanPhone = PHONE_NUMBER.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello Yadhuvanshi Tours, I would like to enquire about: ${page.hero.h1}. Please share pricing and fleet options.`
  )}`;

  // JSON-LD Structured Data
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "TaxiService", "AutoRental"],
    "@id": `${BASE_URL}/services/${page.slug}#service`,
    name: page.hero.h1,
    description: page.meta.description,
    telephone: PHONE_NUMBER,
    url: `${BASE_URL}/services/${page.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ramadevi Chauraha, G.T. Road",
      addressLocality: "Kanpur",
      addressRegion: "Uttar Pradesh",
      postalCode: "208007",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.4312,
      longitude: 80.3920,
    },
    areaServed: [
      { "@type": "City", name: "Kanpur" },
      { "@type": "City", name: "Lucknow" },
      { "@type": "State", name: "Uttar Pradesh" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: page.hero.ratingValue,
      reviewCount: page.hero.reviewCount,
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
        name: "Services",
        item: `${BASE_URL}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.hero.h1,
        item: `${BASE_URL}/services/${page.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-[#D8CFC7]/50 flex items-center gap-1.5 overflow-x-auto">
          <Link href="/" className="hover:text-[#E8B96A] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#CF9D7B]/60" />
          <Link href="/services" className="hover:text-[#E8B96A] transition-colors">
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#CF9D7B]/60" />
          <span className="text-[#E8B96A] font-medium truncate">
            {page.hero.h1}
          </span>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-10 md:py-16 border-b border-[#CF9D7B]/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
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
                    ({page.hero.reviewCount} Happy Travelers)
                  </span>
                </div>
                <span className="text-[#CF9D7B]/40">•</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Doorstep Service</span>
                </div>
                <span className="text-[#CF9D7B]/40">•</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>24/7 Availability</span>
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
                  <span>Book on WhatsApp</span>
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
          </div>
        </section>

        {/* Service Offerings */}
        {page.serviceFeatures && page.serviceFeatures.length > 0 && (
          <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E8B96A]" />
              <span>Available Packages & Options</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {page.serviceFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#0f171c] border border-[#CF9D7B]/20 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#E8B96A] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pricing Matrix */}
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-display font-bold text-white mb-2">
              Fleet Tariffs & Rate Card
            </h2>
            <p className="text-xs sm:text-sm text-[#D8CFC7]/70">
              Clear vehicle rates for local hourly packages and outstation journeys.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#CF9D7B]/25 bg-[#0e151a]">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#141e24] text-white/80 uppercase text-[11px] tracking-wider font-semibold border-b border-[#CF9D7B]/20">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Vehicle Class</th>
                  <th className="py-4 px-4">Seating Capacity</th>
                  <th className="py-4 px-4">Local / Base Rate</th>
                  <th className="py-4 px-4">Outstation (Per Km)</th>
                  <th className="py-4 px-4">Driver Allowance</th>
                  <th className="py-4 px-4 text-right">Action</th>
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
                      ₹{tier.roundTripPerKm}/km
                    </td>
                    <td className="py-4 px-4 text-[#D8CFC7]/70">
                      ₹{tier.driverAllowancePerDay}/day
                    </td>
                    <td className="py-4 px-4 text-right">
                      <a
                        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                          `Hello Yadhuvanshi Tours, I want to book ${tier.vehicleType} under ${page.hero.h1}. Please share final quote.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E8B96A]/20 hover:bg-[#E8B96A]/30 text-[#E8B96A] border border-[#E8B96A]/40 text-xs font-semibold transition-all"
                      >
                        <span>Book</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Semantic Content */}
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

            <div className="mt-8 pt-6 border-t border-white/5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#E8B96A] mb-4 font-sans">
                Key Fleet Advantages
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
            <h2 className="text-2xl font-display font-bold text-white mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-[#D8CFC7]/60">
              Common questions about booking cabs, tempo travellers and car rentals in Kanpur.
            </p>
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

        {/* Mesh Linking to Routes */}
        {page.relatedRoutes && (
          <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#CF9D7B]/15">
            <h3 className="text-base font-display font-bold text-white mb-6">
              Popular Outstation Taxi Routes
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

      <StickyMobileBookingBar
        title={page.hero.h1}
        startingPrice={page.hero.startingPrice}
      />
    </>
  );
}
