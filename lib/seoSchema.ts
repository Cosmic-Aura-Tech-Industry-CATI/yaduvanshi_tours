/**
 * High-authority Schema.org structured data for SEO, GEO, and AEO.
 * Optimized specifically for "Kanpur Tours and Travels" ranking on Google,
 * Bing, and AI engines (Perplexity, ChatGPT, Google Gemini / AI Overviews).
 */

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yaduvanshitours.com";

export const travelAgencySchema = {
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "AutoRental", "LocalBusiness"],
  "@id": `${BASE_URL}/#travelagency`,
  name: "Yaduvanshi Tours & Travels",
  alternateName: [
    "Yaduvanshi Tour & Travels",
    "Yaduvanshi Travels Kanpur",
    "Kanpur Tours and Travels",
    "Best Travels in Kanpur",
    "Yaduvanshi Taxi Service Kanpur",
    "Yaduvanshi Car Rental Kanpur"
  ],
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo.png`,
  image: [
    `${BASE_URL}/images/hero-poster.webp`,
    `${BASE_URL}/images/logo.png`,
    `${BASE_URL}/weddings/yaduvanshi-wedding-car.webp`
  ],
  description:
    "Yaduvanshi Tours & Travels is the premier tours and travels agency and luxury car rental service in Kanpur, Uttar Pradesh. Operating from Ramadevi Chauraha, Kanpur, we provide 24/7 outstation cabs, local taxi service, Tempo Traveller and Force Urbania rental, wedding luxury car hire (Audi, Fortuner, Mercedes), and all-India pilgrimage tour packages including Ayodhya, Kashi Vishwanath, and Char Dham.",
  telephone: "+918127929551",
  email: "manojyadav20101993@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ramadevi Chauraha, G.T. Road",
    addressLocality: "Kanpur",
    addressRegion: "Uttar Pradesh",
    postalCode: "208007",
    addressCountry: "IN"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.4312,
    longitude: 80.3920
  },
  hasMap: "https://maps.google.com/?q=Ramadevi+Chauraha+Kanpur",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      opens: "00:00",
      closes: "23:59"
    }
  ],
  priceRange: "₹₹ (₹11/km onwards | Packages from ₹1,800/day)",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Google Pay, PhonePe, Paytm, Credit Card, Debit Card, Net Banking",
  areaServed: [
    { "@type": "City", name: "Kanpur" },
    { "@type": "AdministrativeArea", name: "Chakeri, Kanpur" },
    { "@type": "AdministrativeArea", name: "Civil Lines, Kanpur" },
    { "@type": "AdministrativeArea", name: "Swaroop Nagar, Kanpur" },
    { "@type": "AdministrativeArea", name: "Kalyanpur, Kanpur" },
    { "@type": "AdministrativeArea", name: "Kidwai Nagar, Kanpur" },
    { "@type": "AdministrativeArea", name: "Govind Nagar, Kanpur" },
    { "@type": "AdministrativeArea", name: "Kakadeo, Kanpur" },
    { "@type": "AdministrativeArea", name: "Kanpur Cantt" },
    { "@type": "AdministrativeArea", name: "Kanpur Central Railway Station" },
    { "@type": "AdministrativeArea", name: "Kanpur Airport (Chakeri - KNU)" },
    { "@type": "City", name: "Lucknow" },
    { "@type": "City", name: "Unnao" },
    { "@type": "City", name: "Ayodhya" },
    { "@type": "City", name: "Varanasi" },
    { "@type": "City", name: "Prayagraj" },
    { "@type": "State", name: "Uttar Pradesh" },
    { "@type": "Country", name: "India" }
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "348",
    reviewCount: "348"
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Kanpur Tours & Travels Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Taxi & Car Rental Services Kanpur",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Kanpur Outstation Taxi & Cab Service",
              description: "Chauffeur-driven outstation cabs starting at ₹11/km for trips to Lucknow, Ayodhya, Varanasi, Delhi, Agra, and all India."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Local Taxi Service in Kanpur",
              description: "8hr/80km and full-day local car rentals in Kanpur with courteous drivers and sanitised vehicles."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Tempo Traveller & Force Urbania Rental Kanpur",
              description: "12, 17, and 26-seater luxury Tempo Travellers and Force Urbanias with pushback seats and AC for group tours."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Luxury Wedding Car Rental Kanpur",
              description: "Decorated Audi, Mercedes, BMW, Toyota Fortuner, and Innova Crysta rentals for wedding baraat and bride-groom entry."
            }
          }
        ]
      },
      {
        "@type": "OfferCatalog",
        name: "Pilgrimage Tour Packages from Kanpur",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Trip",
              name: "Ayodhya Ram Mandir Darshan Tour from Kanpur",
              description: "Same-day and 2-day guided spiritual tour to Ram Janmabhoomi, Hanuman Garhi, and Saryu Aarti with private transport."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Trip",
              name: "Kashi Vishwanath Varanasi Tour from Kanpur",
              description: "Spiritual pilgrimage to Kashi Vishwanath, Dashashwamedh Ganga Aarti, Sarnath, and temple circuit."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Trip",
              name: "Char Dham Yatra Package from Kanpur",
              description: "Sacred 10-12 days pilgrimage to Yamunotri, Gangotri, Kedarnath, and Badrinath with experienced mountain drivers."
            }
          }
        ]
      }
    ]
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Yaduvanshi Tours & Travels Kanpur",
  url: BASE_URL,
  description: "Premier tours and travels agency, luxury car rentals, and pilgrimage tour packages in Kanpur, UP.",
  publisher: {
    "@id": `${BASE_URL}/#travelagency`
  },
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/tours?destination={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

export const KANPUR_FAQS = [
  {
    q: "Which is the best tours and travels agency in Kanpur?",
    a: "Yaduvanshi Tours & Travels is widely recognized as the best tours and travels agency in Kanpur, rated 4.9/5 across 348+ verified reviews. Located at Ramadevi Chauraha, Kanpur, we have 15+ years of experience providing 24/7 outstation taxi services, all-India spiritual tour packages (Ayodhya, Kashi, Char Dham), Tempo Traveller & Force Urbania rentals, and luxury wedding car hire."
  },
  {
    q: "How can I book a taxi or car rental in Kanpur with Yaduvanshi Travels?",
    a: "Booking a cab in Kanpur is seamless. You can call or WhatsApp our 24/7 travel desk directly at +91 81279 29551, or submit an instant booking inquiry through our website. We provide immediate vehicle confirmation, clear transparent pricing with zero hidden charges, and professional verified chauffeurs."
  },
  {
    q: "What is the per kilometer car rental rate for outstation cabs from Kanpur?",
    a: "Our outstation cab rates in Kanpur start at just ₹11/km for hatchbacks (Maruti Swift, WagonR), ₹12-₹14/km for sedans (Dzire, Aura, Amaze), ₹16-₹18/km for premium SUVs (Ertiga, Innova Crysta), and ₹24-₹28/km for luxury Tempo Travellers & Force Urbanias. Driver allowance and actual tolls/parking apply with 100% transparent billing."
  },
  {
    q: "Do you offer Ayodhya Ram Mandir and Kashi Vishwanath tour packages from Kanpur?",
    a: "Yes! Ayodhya Darshan and Kashi Vishwanath (Varanasi) tours from Kanpur are our most popular pilgrimage circuits. We offer same-day, 2-day, and weekend custom itineraries including private door-to-door cab pickup, VIP temple darshan coordination, hotel stays, and verified Hindi/English speaking chauffeurs."
  },
  {
    q: "Can I rent a Tempo Traveller or Force Urbania in Kanpur for group trips?",
    a: "Yes, we own and manage Kanpur's premier fleet of 12-seater, 17-seater, and 26-seater Force Tempo Travellers, alongside the brand-new Force Urbania luxury mini-vans. All group multi-seaters feature individual pushback recliner seats, powerful dual AC, USB fast-charging ports, luggage boot space, and certified highway drivers."
  },
  {
    q: "Does Yaduvanshi Tours provide luxury wedding cars and baraat convoys in Kanpur?",
    a: "Absolutely. We specialize in luxury bridal and groom cars in Kanpur, including Audi A6, Audi Q7, BMW 5 Series, Mercedes-Benz, and Toyota Fortuner, complete with optional fresh floral decorations. We also supply matching multi-car convoys and deluxe AC buses for guest and baraat transportation across Kanpur, Lucknow, and surrounding districts."
  },
  {
    q: "Do you offer airport taxi pickup and drop from Kanpur to Chakeri Airport and Lucknow Airport?",
    a: "Yes, we operate 24/7 airport transfer services between any locality in Kanpur (Civil Lines, Swaroop Nagar, Kalyanpur, Kidwai Nagar, Cantt) and Kanpur Chakeri Airport (KNU) as well as Lucknow Chaudhary Charan Singh International Airport (Amausi - LKO). We track flights for timely on-schedule pickups."
  }
];

export const kanpurFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: KANPUR_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a
    }
  }))
};
