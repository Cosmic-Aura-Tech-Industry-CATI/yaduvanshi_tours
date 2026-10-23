export type PageKind = "route" | "service";

export interface PricingTier {
  vehicleType: string;
  capacity: string;
  oneWayRate: number;
  roundTripPerKm: number;
  minKmPerDay: number;
  driverAllowancePerDay: number;
  estimatedTollStateTax: number;
}

export interface RouteDetail {
  sourceCity: string;
  destinationCity: string;
  distanceKm: number;
  estimatedTimeHours: string;
  primaryHighway: string;
  popularStopovers: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SeoLandingPage {
  kind: PageKind;
  slug: string;
  meta: {
    title: string;       // < 60 characters with CTA and pricing hook
    description: string; // < 155 characters with USPs and phone trigger
    keywords: string[];
  };
  hero: {
    badge: string;
    h1: string;
    subheading: string;
    startingPrice: number;
    ratingValue: number;
    reviewCount: number;
  };
  intro: {
    h2: string;
    content: string[]; // Semantic paragraphs with LSI entities
  };
  highlights: string[];
  routeDetails?: RouteDetail;
  serviceFeatures?: string[];
  pricingMatrix: PricingTier[];
  relatedRoutes?: { title: string; slug: string; distance: string }[];
  relatedServices?: { title: string; slug: string }[];
  faqs: FAQItem[];
}

export const SEO_LANDINGS_DATABASE: SeoLandingPage[] = [
  // ─── PILGRIMAGE HIGH-YIELD ROUTES ──────────────────────────────────────────
  {
    kind: "route",
    slug: "kanpur-to-ayodhya-cab",
    meta: {
      title: "Kanpur to Ayodhya Cab | Taxi ₹2,899 Onwards | Yadhuvanshi",
      description: "Book Kanpur to Ayodhya taxi service with verified drivers. Clean AC Sedans, Ertiga & Innova Crysta. Doorstep pickup, toll breakdown & 24/7 Ram Mandir darshan support.",
      keywords: [
        "kanpur to ayodhya cab",
        "kanpur to ayodhya taxi fare",
        "kanpur to ram mandir cab booking",
        "kanpur to ayodhya one way taxi",
        "innova crysta kanpur to ayodhya",
        "kanpur to ayodhya tempo traveller"
      ]
    },
    hero: {
      badge: "Most Popular Spiritual Corridor",
      h1: "Kanpur to Ayodhya Cab Service",
      subheading: "Comfortable, safe, and transparent point-to-point taxi transfers for Ram Janmabhoomi Darshan with zero hidden charges.",
      startingPrice: 2899,
      ratingValue: 4.9,
      reviewCount: 428
    },
    intro: {
      h2: "Reliable Kanpur to Ayodhya Taxi for Ram Mandir Pilgrimage",
      content: [
        "Traveling from Kanpur to Ayodhya has become one of Uttar Pradesh's most frequented spiritual corridors. Whether you are visiting the grand Ram Janmabhoomi Temple, Hanuman Garhi, or attending the serene evening Saryu Aarti at Ram Ki Paidi, Yadhuvanshi Tours and Travels offers dedicated private cab rentals tailored for individuals, families, and senior citizens.",
        "The travel distance of approximately 225 kilometers via NH27 is covered comfortably in 4.5 to 5 hours. We offer doorstep pickups across Kanpur, including Ramadevi, Civil Lines, Kalyanpur, Kidwai Nagar, Swaroop Nagar, and Kanpur Central Railway Station, dropping you directly at your Ayodhya hotel or temple entry gate."
      ]
    },
    highlights: [
      "Doorstep pickup & drop anywhere in Kanpur and Ayodhya",
      "All-inclusive transparent pricing (Tolls & State Taxes detailed)",
      "Experienced chauffeurs well-versed with Ayodhya darshan routes and parking zones",
      "Zero cancellation charges up to 4 hours before departure",
      "GPS-enabled sanitised fleet with commercial taxi permits"
    ],
    routeDetails: {
      sourceCity: "Kanpur",
      destinationCity: "Ayodhya",
      distanceKm: 225,
      estimatedTimeHours: "4.5 to 5.0 Hours",
      primaryHighway: "NH27 (Kanpur - Lucknow Bypass - Ayodhya Highway)",
      popularStopovers: ["Lucknow Outer Ring Road Food Plaza", "Basti Highway Dhabas"]
    },
    pricingMatrix: [
      {
        vehicleType: "Sedan (Dzire / Etios)",
        capacity: "4 Passengers + 2 Bags",
        oneWayRate: 2899,
        roundTripPerKm: 11,
        minKmPerDay: 250,
        driverAllowancePerDay: 400,
        estimatedTollStateTax: 380
      },
      {
        vehicleType: "SUV (Ertiga)",
        capacity: "6 Passengers + 3 Bags",
        oneWayRate: 3999,
        roundTripPerKm: 14,
        minKmPerDay: 250,
        driverAllowancePerDay: 400,
        estimatedTollStateTax: 380
      },
      {
        vehicleType: "Premium SUV (Innova Crysta)",
        capacity: "7 Passengers + 4 Bags",
        oneWayRate: 5499,
        roundTripPerKm: 18,
        minKmPerDay: 250,
        driverAllowancePerDay: 500,
        estimatedTollStateTax: 380
      },
      {
        vehicleType: "Tempo Traveller (12-17 Seater)",
        capacity: "12-17 Passengers + Large Luggage Boot",
        oneWayRate: 8999,
        roundTripPerKm: 24,
        minKmPerDay: 300,
        driverAllowancePerDay: 600,
        estimatedTollStateTax: 650
      }
    ],
    relatedRoutes: [
      { title: "Ayodhya to Kanpur Cab (Return)", slug: "ayodhya-to-kanpur-cab", distance: "225 km" },
      { title: "Kanpur to Lucknow Taxi", slug: "kanpur-to-lucknow-cab", distance: "85 km" },
      { title: "Kanpur to Varanasi Cab", slug: "kanpur-to-varanasi-cab", distance: "330 km" },
      { title: "Kanpur to Prayagraj Sangam Cab", slug: "kanpur-to-prayagraj-cab", distance: "205 km" }
    ],
    faqs: [
      {
        question: "What is the one-way taxi fare from Kanpur to Ayodhya?",
        answer: "The one-way taxi fare for an AC Sedan (Dzire/Etios) starts at ₹2,899. For a 6-seater Ertiga, it is ₹3,999, and for a luxury Innova Crysta, the fare starts at ₹5,499. Highway toll taxes are calculated transparently."
      },
      {
        question: "How long does a cab take from Kanpur to Ayodhya?",
        answer: "It takes approximately 4.5 to 5 hours to travel 225 km via the 4-lane NH27 highway connecting Kanpur, Lucknow Bypass, and Ayodhya."
      },
      {
        question: "Can the driver assist senior citizens with Ram Mandir darshan entry points?",
        answer: "Yes, our drivers are highly familiar with Ayodhya's entry permits, designated e-rickshaw stands, and battery cart zones near Hanuman Garhi and Ram Janmabhoomi gate for comfortable senior citizen access."
      },
      {
        question: "Are night charges applicable if we leave Kanpur at 4:00 AM?",
        answer: "Standard driver night allowances (₹400) apply only for journeys operating between 10:00 PM and 6:00 AM. Early morning starts at 4:00 AM incur a single-slot standard allowance."
      }
    ]
  },
  {
    kind: "route",
    slug: "kanpur-to-lucknow-cab",
    meta: {
      title: "Kanpur to Lucknow Cab | Taxi ₹1,499 Flat | Yadhuvanshi",
      description: "Fast Kanpur to Lucknow cab service. 85 km in 1.5 hrs via Kanpur-Lucknow Expressway/NH27. Airport drops to Amausi, Charbagh station, Gomti Nagar & Hazratganj.",
      keywords: [
        "kanpur to lucknow cab",
        "kanpur to lucknow taxi fare",
        "kanpur to amausi airport taxi",
        "kanpur to charbagh cab",
        "one way cab kanpur to lucknow"
      ]
    },
    hero: {
      badge: "High-Frequency Daily Transit",
      h1: "Kanpur to Lucknow Cab Service",
      subheading: "Seamless 85 km intercity commute. Doorstep pickup anywhere in Kanpur to Amausi Airport, Charbagh Station, or Gomti Nagar in under 90 minutes.",
      startingPrice: 1499,
      ratingValue: 4.9,
      reviewCount: 654
    },
    intro: {
      h2: "The Fastest & Most Convenient Travel Between Kanpur & Lucknow",
      content: [
        "Kanpur and Lucknow form the commercial and administrative backbone of Uttar Pradesh. Whether you have a flight to catch at Chaudhary Charan Singh International Airport (Amausi - LKO), a corporate meeting in Gomti Nagar, or an appointment at SGPGI/Medanta Hospital, Yadhuvanshi Tours ensures timely and comfortable transit.",
        "With round-the-clock availability, our fleet departs from Ramadevi, Civil Lines, Kidwai Nagar, Swaroop Nagar, and Kalyanpur, reaching Lucknow via the newly upgraded expressway corridor in approximately 1 hour and 30 minutes."
      ]
    },
    highlights: [
      "Guaranteed on-time pickup for Lucknow airport departures",
      "Fixed transparent flat rate with no surge pricing",
      "Trained commercial drivers with immaculate clean AC cars",
      "Drop available across Hazratganj, Gomti Nagar, Alambagh & Airport",
      "Instant WhatsApp booking confirmation in under 2 minutes"
    ],
    routeDetails: {
      sourceCity: "Kanpur",
      destinationCity: "Lucknow",
      distanceKm: 85,
      estimatedTimeHours: "1.5 Hours",
      primaryHighway: "NH27 (Kanpur - Lucknow Highway)",
      popularStopovers: ["Unnao Highway Food Court", "Nawabganj Bird Sanctuary Gate"]
    },
    pricingMatrix: [
      {
        vehicleType: "Sedan (Dzire / Etios)",
        capacity: "4 Passengers + 2 Bags",
        oneWayRate: 1499,
        roundTripPerKm: 11,
        minKmPerDay: 250,
        driverAllowancePerDay: 350,
        estimatedTollStateTax: 160
      },
      {
        vehicleType: "SUV (Ertiga)",
        capacity: "6 Passengers + 3 Bags",
        oneWayRate: 2199,
        roundTripPerKm: 14,
        minKmPerDay: 250,
        driverAllowancePerDay: 350,
        estimatedTollStateTax: 160
      },
      {
        vehicleType: "Premium SUV (Innova Crysta)",
        capacity: "7 Passengers + 4 Bags",
        oneWayRate: 3199,
        roundTripPerKm: 18,
        minKmPerDay: 250,
        driverAllowancePerDay: 450,
        estimatedTollStateTax: 160
      }
    ],
    relatedRoutes: [
      { title: "Lucknow to Kanpur Cab (Return)", slug: "lucknow-to-kanpur-cab", distance: "85 km" },
      { title: "Kanpur to Lucknow Airport Taxi", slug: "kanpur-to-lucknow-airport-taxi", distance: "75 km" },
      { title: "Kanpur to Ayodhya Cab", slug: "kanpur-to-ayodhya-cab", distance: "225 km" }
    ],
    faqs: [
      {
        question: "What is the flat taxi fare from Kanpur to Lucknow?",
        answer: "A one-way AC sedan cab from Kanpur to Lucknow starts at ₹1,499. For larger families, an Ertiga SUV is ₹2,199, and an Innova Crysta is ₹3,199."
      },
      {
        question: "How early should I book for a flight pickup to Lucknow Airport?",
        answer: "We recommend booking at least 2 to 3 hours in advance. For morning flights from Amausi (LKO), our driver arrives at your Kanpur doorstep 3.5 hours prior to your scheduled flight departure."
      }
    ]
  },
  {
    kind: "route",
    slug: "kanpur-to-varanasi-cab",
    meta: {
      title: "Kanpur to Varanasi Cab | Kashi Vishwanath Taxi ₹4,299 | Yadhuvanshi",
      description: "Direct Kanpur to Varanasi cab service. Travel 330 km via GT Road/NH19 in 6 hrs. Doorstep pickup in Kanpur, drop at Kashi Vishwanath, Dashashwamedh Ghat & Cantt.",
      keywords: [
        "kanpur to varanasi cab",
        "kanpur to kashi vishwanath taxi",
        "kanpur to varanasi taxi fare",
        "innova crysta kanpur to varanasi",
        "one way taxi kanpur to varanasi"
      ]
    },
    hero: {
      badge: "Kashi Darshan Express",
      h1: "Kanpur to Varanasi Cab Service",
      subheading: "Sacred travel to the city of Lord Shiva. Relax in comfortable AC cabs for Kashi Vishwanath Darshan, Ganga Aarti, and Sarnath sightseeing.",
      startingPrice: 4299,
      ratingValue: 4.88,
      reviewCount: 390
    },
    intro: {
      h2: "Comfortable Pilgrimage Journey from Kanpur to Varanasi",
      content: [
        "Varanasi (Kashi) is one of the world's oldest living cities and the holy abode of Lord Shiva. The 330-kilometer journey from Kanpur to Varanasi via Grand Trunk Road (NH19 / AH1) takes around 6 to 6.5 hours through Prayagraj bypass.",
        "Yadhuvanshi Tours and Travels provides premium outstation taxis with experienced highway chauffeurs who know the best routes into Godowlia, Lanka, and Cantonment zones, ensuring a seamless pilgrimage experience."
      ]
    },
    highlights: [
      "Direct drop close to Kashi Vishwanath Corridor & Godowlia",
      "Round trip packages including Sarnath & Ramnagar Fort sightseeing",
      "Spacious luggage carriers for family luggage and pilgrimage samagri",
      "Flexible stopover option at Prayagraj Triveni Sangam en route"
    ],
    routeDetails: {
      sourceCity: "Kanpur",
      destinationCity: "Varanasi",
      distanceKm: 330,
      estimatedTimeHours: "6.0 Hours",
      primaryHighway: "NH19 / GT Road (Kanpur - Prayagraj - Varanasi Highway)",
      popularStopovers: ["Fatehpur Highway Plaza", "Prayagraj Bypass Midway Restaurant"]
    },
    pricingMatrix: [
      {
        vehicleType: "Sedan (Dzire / Etios)",
        capacity: "4 Passengers + 2 Bags",
        oneWayRate: 4299,
        roundTripPerKm: 11.5,
        minKmPerDay: 250,
        driverAllowancePerDay: 400,
        estimatedTollStateTax: 490
      },
      {
        vehicleType: "SUV (Ertiga)",
        capacity: "6 Passengers + 3 Bags",
        oneWayRate: 5799,
        roundTripPerKm: 14.5,
        minKmPerDay: 250,
        driverAllowancePerDay: 400,
        estimatedTollStateTax: 490
      },
      {
        vehicleType: "Premium SUV (Innova Crysta)",
        capacity: "7 Passengers + 4 Bags",
        oneWayRate: 7999,
        roundTripPerKm: 18.5,
        minKmPerDay: 250,
        driverAllowancePerDay: 500,
        estimatedTollStateTax: 490
      }
    ],
    relatedRoutes: [
      { title: "Varanasi to Kanpur Cab (Return)", slug: "varanasi-to-kanpur-cab", distance: "330 km" },
      { title: "Kanpur to Prayagraj Sangam Cab", slug: "kanpur-to-prayagraj-cab", distance: "205 km" },
      { title: "Kanpur to Ayodhya Cab", slug: "kanpur-to-ayodhya-cab", distance: "225 km" }
    ],
    faqs: [
      {
        question: "What is the cab fare from Kanpur to Varanasi?",
        answer: "A one-way AC Sedan cab starts at ₹4,299. An Ertiga is ₹5,799, and an Innova Crysta is ₹7,999. Return trips are calculated at ₹11.5/km onwards."
      },
      {
        question: "Can we combine Prayagraj Sangam snan on the way to Varanasi?",
        answer: "Yes, you can choose a customized customized pilgrimage package where you take a holy dip at Prayagraj Triveni Sangam and continue to Varanasi on the same day."
      }
    ]
  },
  {
    kind: "route",
    slug: "kanpur-to-prayagraj-cab",
    meta: {
      title: "Kanpur to Prayagraj Cab | Sangam Taxi ₹2,799 | Yadhuvanshi",
      description: "Book Kanpur to Prayagraj taxi service. Travel 205 km via GT Road/NH19 in 4 hrs. Direct drop at Triveni Sangam, Alopi Devi, Civil Lines & Railway Station.",
      keywords: [
        "kanpur to prayagraj cab",
        "kanpur to allahabad taxi fare",
        "kanpur to sangam taxi booking",
        "kanpur to prayagraj one way cab",
        "innova kanpur to prayagraj"
      ]
    },
    hero: {
      badge: "Holy Triveni Sangam Route",
      h1: "Kanpur to Prayagraj Cab Service",
      subheading: "Fast and reliable taxi service connecting Kanpur to Prayagraj. Perfect for holy Sangam Snan, Kumbh / Magh Mela darshan, and High Court transit.",
      startingPrice: 2799,
      ratingValue: 4.9,
      reviewCount: 312
    },
    intro: {
      h2: "Convenient Kanpur to Prayagraj Taxi Service",
      content: [
        "Prayagraj (Allahabad), home to the sacred confluence of the Ganga, Yamuna, and Saraswati rivers, is located roughly 205 km from Kanpur. With the 6-lane National Highway 19, the drive takes only 3.5 to 4 hours.",
        "Whether you are visiting for Kumbh Mela rituals, Asthi Visarjan, judicial hearings at the Allahabad High Court, or family visits, Yadhuvanshi Tours guarantees door-to-door convenience with zero hassles."
      ]
    },
    highlights: [
      "Direct vehicle drop as close to Triveni Sangam Ghat as authorized",
      "Same-day return packages at economical per-km rates",
      "Special assistance for senior citizens and puja samagri carrying",
      "Clean, AC vehicles with 24/7 customer support"
    ],
    routeDetails: {
      sourceCity: "Kanpur",
      destinationCity: "Prayagraj",
      distanceKm: 205,
      estimatedTimeHours: "3.5 to 4.0 Hours",
      primaryHighway: "NH19 / GT Road",
      popularStopovers: ["Fatehpur Highway Hub", "Khaga Dhabas"]
    },
    pricingMatrix: [
      {
        vehicleType: "Sedan (Dzire / Etios)",
        capacity: "4 Passengers + 2 Bags",
        oneWayRate: 2799,
        roundTripPerKm: 11,
        minKmPerDay: 250,
        driverAllowancePerDay: 400,
        estimatedTollStateTax: 320
      },
      {
        vehicleType: "SUV (Ertiga)",
        capacity: "6 Passengers + 3 Bags",
        oneWayRate: 3899,
        roundTripPerKm: 14,
        minKmPerDay: 250,
        driverAllowancePerDay: 400,
        estimatedTollStateTax: 320
      },
      {
        vehicleType: "Premium SUV (Innova Crysta)",
        capacity: "7 Passengers + 4 Bags",
        oneWayRate: 5299,
        roundTripPerKm: 18,
        minKmPerDay: 250,
        driverAllowancePerDay: 500,
        estimatedTollStateTax: 320
      }
    ],
    relatedRoutes: [
      { title: "Prayagraj to Kanpur Cab (Return)", slug: "prayagraj-to-kanpur-cab", distance: "205 km" },
      { title: "Kanpur to Varanasi Cab", slug: "kanpur-to-varanasi-cab", distance: "330 km" },
      { title: "Kanpur to Ayodhya Cab", slug: "kanpur-to-ayodhya-cab", distance: "225 km" }
    ],
    faqs: [
      {
        question: "What is the cab fare from Kanpur to Prayagraj Sangam?",
        answer: "A one-way AC Sedan cab starts at ₹2,799. Ertiga SUV is ₹3,899, and Innova Crysta is ₹5,299."
      },
      {
        question: "Can the taxi wait while we perform Sangam snan and rituals?",
        answer: "Yes, you can book a same-day round-trip package. The driver will wait at the designated parking area while you complete your holy dip and prayers."
      }
    ]
  },
  {
    kind: "route",
    slug: "kanpur-to-delhi-cab",
    meta: {
      title: "Kanpur to Delhi Cab | Noida/NCR Taxi ₹5,499 | Yadhuvanshi",
      description: "Direct Kanpur to Delhi NCR taxi service via Agra-Lucknow Expressway & Yamuna Expressway. 490 km in 6.5 hrs. Drop at IGI Airport, Noida, Gurgaon & New Delhi.",
      keywords: [
        "kanpur to delhi cab",
        "kanpur to delhi taxi fare",
        "kanpur to igi airport taxi",
        "kanpur to noida cab service",
        "one way cab kanpur to delhi"
      ]
    },
    hero: {
      badge: "Expressway Highway Specialist",
      h1: "Kanpur to Delhi NCR Cab Service",
      subheading: "Cruise smoothly on world-class expressways. Direct doorstep pickup in Kanpur to IGI Airport, New Delhi Railway Station, Noida, or Gurugram.",
      startingPrice: 5499,
      ratingValue: 4.87,
      reviewCount: 512
    },
    intro: {
      h2: "Fastest Express Transit from Kanpur to New Delhi & NCR",
      content: [
        "The 490 km route connecting Kanpur to New Delhi is now one of India's smoothest expressway drives. Connecting GT Road to the Agra-Lucknow Expressway and continuing via the Yamuna Expressway, the entire journey takes only 6.5 to 7 hours.",
        "Skip the waitlists for Vande Bharat and Tejas Express. With Yadhuvanshi Tours, you travel on your own schedule with zero luggage restrictions, direct to your terminal at IGI Airport (T1, T2, T3) or office in Cyber Hub Gurugram."
      ]
    },
    highlights: [
      "Direct access via Agra-Lucknow & Yamuna Expressways",
      "Doorstep drop to Terminal 3 (IGI Airport) with no airport surcharges",
      "Fleet maintained for continuous high-speed expressway cruising",
      "Midway stops at hygienic food courts with clean washrooms"
    ],
    routeDetails: {
      sourceCity: "Kanpur",
      destinationCity: "Delhi NCR",
      distanceKm: 490,
      estimatedTimeHours: "6.5 to 7.0 Hours",
      primaryHighway: "Agra-Lucknow Expressway & Yamuna Expressway",
      popularStopovers: ["Expressway Mile 100 Food Court", "Mathura Highway Plaza"]
    },
    pricingMatrix: [
      {
        vehicleType: "Sedan (Dzire / Etios)",
        capacity: "4 Passengers + 2 Bags",
        oneWayRate: 5499,
        roundTripPerKm: 11,
        minKmPerDay: 250,
        driverAllowancePerDay: 400,
        estimatedTollStateTax: 980
      },
      {
        vehicleType: "SUV (Ertiga)",
        capacity: "6 Passengers + 3 Bags",
        oneWayRate: 7499,
        roundTripPerKm: 14,
        minKmPerDay: 250,
        driverAllowancePerDay: 400,
        estimatedTollStateTax: 980
      },
      {
        vehicleType: "Premium SUV (Innova Crysta)",
        capacity: "7 Passengers + 4 Bags",
        oneWayRate: 10499,
        roundTripPerKm: 18,
        minKmPerDay: 250,
        driverAllowancePerDay: 500,
        estimatedTollStateTax: 980
      }
    ],
    relatedRoutes: [
      { title: "Delhi to Kanpur Cab (Return)", slug: "delhi-to-kanpur-cab", distance: "490 km" },
      { title: "Kanpur to Agra Cab", slug: "kanpur-to-agra-cab", distance: "280 km" },
      { title: "Kanpur to Lucknow Cab", slug: "kanpur-to-lucknow-cab", distance: "85 km" }
    ],
    faqs: [
      {
        question: "How long does a cab take from Kanpur to Delhi via Expressway?",
        answer: "A private cab takes approximately 6.5 to 7 hours to cover 490 km via the Agra-Lucknow Expressway and Yamuna Expressway."
      },
      {
        question: "Are expressway toll taxes included in the Kanpur to Delhi fare?",
        answer: "We offer both all-inclusive packages and base fare options. Expressway tolls amount to approximately ₹980, billed transparently via FASTag."
      }
    ]
  },
  {
    kind: "route",
    slug: "kanpur-to-mathura-vrindavan-cab",
    meta: {
      title: "Kanpur to Mathura Vrindavan Cab | Taxi ₹4,199 | Yadhuvanshi",
      description: "Book Kanpur to Mathura Vrindavan taxi. Visit Banke Bihari, Prem Mandir & Krishna Janmabhoomi. 340 km via Agra Expressway. Clean AC cabs & verified drivers.",
      keywords: [
        "kanpur to mathura taxi",
        "kanpur to vrindavan cab fare",
        "kanpur to banke bihari taxi",
        "kanpur to mathura one way cab",
        "innova kanpur to vrindavan"
      ]
    },
    hero: {
      badge: "Divine Braj Dham Circuit",
      h1: "Kanpur to Mathura-Vrindavan Cab Service",
      subheading: "Immerse in the eternal devotion of Sri Krishna. Direct private cab travel to Banke Bihari, Prem Mandir, ISKCON, and Shri Krishna Janmabhoomi.",
      startingPrice: 4199,
      ratingValue: 4.92,
      reviewCount: 388
    },
    intro: {
      h2: "Peaceful & Comfortable Cab Travel to Sri Krishna's Land",
      content: [
        "Mathura and Vrindavan attract millions of Krishna devotees worldwide. Located around 340 km from Kanpur, you can travel effortlessly via the Agra-Lucknow Expressway and Yamuna Expressway in approximately 5 hours.",
        "Yadhuvanshi Tours and Travels specializes in Braj Bhumi pilgrimage tours. Our drivers assist with temple darshan timings, local parikrama points, and convenient hotel drop-offs in Vrindavan."
      ]
    },
    highlights: [
      "Early morning and late evening departures for Banke Bihari darshan",
      "Covers Mathura, Vrindavan, Gokul, and Barsana circuits",
      "Air-conditioned comfort suitable for elderly family members",
      "Transparent pricing with no unexpected route deviations"
    ],
    routeDetails: {
      sourceCity: "Kanpur",
      destinationCity: "Mathura & Vrindavan",
      distanceKm: 340,
      estimatedTimeHours: "5.0 Hours",
      primaryHighway: "Agra-Lucknow Expressway & Yamuna Expressway",
      popularStopovers: ["Expressway Midway Rest Area"]
    },
    pricingMatrix: [
      {
        vehicleType: "Sedan (Dzire / Etios)",
        capacity: "4 Passengers + 2 Bags",
        oneWayRate: 4199,
        roundTripPerKm: 11,
        minKmPerDay: 250,
        driverAllowancePerDay: 400,
        estimatedTollStateTax: 620
      },
      {
        vehicleType: "SUV (Ertiga)",
        capacity: "6 Passengers + 3 Bags",
        oneWayRate: 5699,
        roundTripPerKm: 14,
        minKmPerDay: 250,
        driverAllowancePerDay: 400,
        estimatedTollStateTax: 620
      },
      {
        vehicleType: "Premium SUV (Innova Crysta)",
        capacity: "7 Passengers + 4 Bags",
        oneWayRate: 7899,
        roundTripPerKm: 18,
        minKmPerDay: 250,
        driverAllowancePerDay: 500,
        estimatedTollStateTax: 620
      }
    ],
    relatedRoutes: [
      { title: "Kanpur to Agra Cab", slug: "kanpur-to-agra-cab", distance: "280 km" },
      { title: "Kanpur to Ayodhya Cab", slug: "kanpur-to-ayodhya-cab", distance: "225 km" }
    ],
    faqs: [
      {
        question: "What is the cab fare from Kanpur to Mathura Vrindavan?",
        answer: "A one-way AC Sedan starts at ₹4,199. An Ertiga SUV is ₹5,699, and an Innova Crysta is ₹7,899."
      },
      {
        question: "Can we cover both Mathura and Vrindavan in a 2-day trip from Kanpur?",
        answer: "Yes, our 2-day customized Braj pilgrimage covers Mathura Janmabhoomi, Dwarkadhish temple, Banke Bihari, Prem Mandir light show, and ISKCON Vrindavan."
      }
    ]
  },
  {
    kind: "route",
    slug: "lucknow-to-ayodhya-cab",
    meta: {
      title: "Lucknow to Ayodhya Cab | Taxi ₹1,899 | Ram Mandir Darshan",
      description: "Book Lucknow to Ayodhya cab service. 135 km in 2.5 hrs via NH27. Doorstep pickup in Lucknow, Amausi Airport & Charbagh. Clean AC Sedan, Ertiga & Innova.",
      keywords: [
        "lucknow to ayodhya cab",
        "lucknow to ayodhya taxi fare",
        "lucknow airport to ayodhya taxi",
        "amausi to ayodhya cab",
        "lucknow to ram mandir private cab"
      ]
    },
    hero: {
      badge: "Ayodhya Airport & Station Connector",
      h1: "Lucknow to Ayodhya Cab Service",
      subheading: "The quickest road link to Ram Janmabhoomi. Direct pickup from Chaudhary Charan Singh Airport (LKO) or Charbagh Railway Station to Ayodhya Dham.",
      startingPrice: 1899,
      ratingValue: 4.94,
      reviewCount: 782
    },
    intro: {
      h2: "Fast & Convenient Transit from Lucknow to Ayodhya Dham",
      content: [
        "With thousands of pilgrims arriving daily at Lucknow Airport and Charbagh Station bound for Ayodhya, Yadhuvanshi Tours operates a dedicated round-the-clock shuttle fleet between Lucknow and Ayodhya.",
        "The 135 km journey along the smooth NH27 corridor takes just 2.5 hours. Chauffeurs meet you right at the arrival terminal with customized name boards, saving you from long taxi stand queues."
      ]
    },
    highlights: [
      "Direct terminal pickup at Chaudhary Charan Singh Airport (LKO)",
      "Express travel in just 2.5 hours via 4-lane NH27",
      "Available 24x7 for early morning flights and midnight arrivals",
      "Fixed rate card with no surge pricing or hidden charges"
    ],
    routeDetails: {
      sourceCity: "Lucknow",
      destinationCity: "Ayodhya",
      distanceKm: 135,
      estimatedTimeHours: "2.5 Hours",
      primaryHighway: "NH27 (Lucknow - Ayodhya Highway)",
      popularStopovers: ["Barabanki Bypass Highway Plaza"]
    },
    pricingMatrix: [
      {
        vehicleType: "Sedan (Dzire / Etios)",
        capacity: "4 Passengers + 2 Bags",
        oneWayRate: 1899,
        roundTripPerKm: 11,
        minKmPerDay: 250,
        driverAllowancePerDay: 350,
        estimatedTollStateTax: 210
      },
      {
        vehicleType: "SUV (Ertiga)",
        capacity: "6 Passengers + 3 Bags",
        oneWayRate: 2799,
        roundTripPerKm: 14,
        minKmPerDay: 250,
        driverAllowancePerDay: 350,
        estimatedTollStateTax: 210
      },
      {
        vehicleType: "Premium SUV (Innova Crysta)",
        capacity: "7 Passengers + 4 Bags",
        oneWayRate: 4199,
        roundTripPerKm: 18,
        minKmPerDay: 250,
        driverAllowancePerDay: 450,
        estimatedTollStateTax: 210
      }
    ],
    relatedRoutes: [
      { title: "Kanpur to Ayodhya Cab", slug: "kanpur-to-ayodhya-cab", distance: "225 km" },
      { title: "Lucknow to Varanasi Cab", slug: "lucknow-to-varanasi-cab", distance: "310 km" }
    ],
    faqs: [
      {
        question: "What is the cab fare from Lucknow Airport to Ayodhya?",
        answer: "A direct one-way AC Sedan from Amausi Airport to Ayodhya starts at ₹1,899. Ertiga SUV is ₹2,799, and Innova Crysta is ₹4,199."
      },
      {
        question: "How long does it take from Lucknow Airport to Ayodhya by taxi?",
        answer: "It takes roughly 2.5 to 3 hours to cover 135 km via the Lucknow Outer Ring Road and NH27."
      }
    ]
  },

  // ─── LOCAL SERVICES IN KANPUR & UP ─────────────────────────────────────────
  {
    kind: "service",
    slug: "taxi-service-in-kanpur",
    meta: {
      title: "Taxi Service in Kanpur | #1 Best Cab Booking | Yadhuvanshi",
      description: "Book reliable 24/7 taxi service in Kanpur. Local city travel, outstation cabs & airport pickups from ₹11/km. Clean AC Sedans, SUVs & Tempo Travellers.",
      keywords: [
        "taxi service in kanpur",
        "best travels in kanpur",
        "cab service kanpur",
        "outstation cab kanpur",
        "car rental kanpur ramadevi",
        "kanpur taxi contact number"
      ]
    },
    hero: {
      badge: "Kanpur's Highest Rated Cab Fleet",
      h1: "Best Taxi Service in Kanpur",
      subheading: "Reliable 24x7 local and outstation taxi service in Kanpur since 2010. Over 50,000 satisfied passengers with verified chauffeurs and guaranteed clean cars.",
      startingPrice: 11,
      ratingValue: 4.95,
      reviewCount: 890
    },
    intro: {
      h2: "Why Yadhuvanshi Tours is Kanpur's #1 Preferred Taxi Agency",
      content: [
        "Based out of Ramadevi Chauraha on G.T. Road, Yadhuvanshi Tours and Travels has served as Kanpur's most trusted travel agency for over a decade. Whether you need an urgent local ride across Civil Lines, Swaroop Nagar, Kalyanpur, or Kakadeo, or a comfortable outstation taxi to Lucknow, Ayodhya, Delhi, or Varanasi, we provide dependable vehicles around the clock.",
        "Unlike ridesharing aggregators that cancel at the last minute or charge exorbitant peak surge prices, Yadhuvanshi Tours offers guaranteed driver allocations, clean sanitised commercial vehicles, and fixed transparent tariffs."
      ]
    },
    highlights: [
      "Operating 24 hours a day, 365 days a year from Ramadevi Chauraha",
      "Zero surge pricing during festivals, holidays, or rain",
      "Fleet of 40+ vehicles: Swift, Dzire, Ertiga, Innova Crysta, Fortuner & Urbania",
      "Commercial taxi permits with comprehensive passenger insurance",
      "Doorstep pickup anywhere in Kanpur within 30 minutes of booking"
    ],
    serviceFeatures: [
      "Local City Rental (8 Hr / 80 Km & 12 Hr / 120 Km Packages)",
      "One-Way & Round-Trip Outstation Cabs",
      "Kanpur Airport (Chakeri - KNU) & Lucknow Airport Transfers",
      "Kanpur Central Railway Station Pick & Drop",
      "Corporate Travel & Monthly Cab Leases",
      "Wedding Luxury Car Hire with Flower Decoration"
    ],
    pricingMatrix: [
      {
        vehicleType: "Hatchback (Swift / WagonR)",
        capacity: "4 Passengers + 2 Small Bags",
        oneWayRate: 1400,
        roundTripPerKm: 10,
        minKmPerDay: 250,
        driverAllowancePerDay: 350,
        estimatedTollStateTax: 0
      },
      {
        vehicleType: "Sedan (Dzire / Etios)",
        capacity: "4 Passengers + 2 Large Bags",
        oneWayRate: 1600,
        roundTripPerKm: 11,
        minKmPerDay: 250,
        driverAllowancePerDay: 400,
        estimatedTollStateTax: 0
      },
      {
        vehicleType: "SUV (Ertiga / Carens)",
        capacity: "6 Passengers + 3 Bags",
        oneWayRate: 2200,
        roundTripPerKm: 14,
        minKmPerDay: 250,
        driverAllowancePerDay: 400,
        estimatedTollStateTax: 0
      },
      {
        vehicleType: "Premium SUV (Innova Crysta)",
        capacity: "7 Passengers + 4 Bags",
        oneWayRate: 3200,
        roundTripPerKm: 18,
        minKmPerDay: 250,
        driverAllowancePerDay: 500,
        estimatedTollStateTax: 0
      }
    ],
    relatedRoutes: [
      { title: "Kanpur to Lucknow Cab", slug: "kanpur-to-lucknow-cab", distance: "85 km" },
      { title: "Kanpur to Ayodhya Cab", slug: "kanpur-to-ayodhya-cab", distance: "225 km" },
      { title: "Kanpur to Varanasi Cab", slug: "kanpur-to-varanasi-cab", distance: "330 km" },
      { title: "Kanpur to Prayagraj Cab", slug: "kanpur-to-prayagraj-cab", distance: "205 km" }
    ],
    relatedServices: [
      { title: "Tempo Traveller in Kanpur", slug: "tempo-traveller-rental-kanpur" },
      { title: "Car Rental in Kanpur", slug: "car-rental-in-kanpur" },
      { title: "Innova Crysta Rental Kanpur", slug: "innova-crysta-rental-kanpur" }
    ],
    faqs: [
      {
        question: "How can I book a taxi in Kanpur with Yadhuvanshi Tours?",
        answer: "You can book instantly by calling our 24/7 dispatch desk at +91 81279 29551 or sending a quick WhatsApp message with your pickup address and travel date."
      },
      {
        question: "What are the local taxi rates in Kanpur for 8 hours?",
        answer: "Our 8 Hours / 80 Km local Kanpur city rental starts at ₹1,800 for an AC Sedan and ₹2,600 for an AC 6-seater Ertiga SUV. Additional hours and kilometers are billed at nominal per-unit rates."
      },
      {
        question: "Do you offer airport taxi pickup from Kanpur Airport (Chakeri)?",
        answer: "Yes, we provide dedicated airport transfers to and from Kanpur Airport (KNU) in Chakeri as well as Lucknow's Chaudhary Charan Singh Airport (LKO)."
      }
    ]
  },
  {
    kind: "service",
    slug: "tempo-traveller-rental-kanpur",
    meta: {
      title: "Tempo Traveller in Kanpur | 9, 12, 17, 26 Seater on Rent",
      description: "Hire Luxury Tempo Traveller & Force Urbania in Kanpur. Pushback Maharaja seats, powerful AC, verified drivers for outstation trips, weddings & pilgrimage tours.",
      keywords: [
        "tempo traveller in kanpur",
        "tempo traveller rental kanpur",
        "17 seater tempo traveller kanpur",
        "luxury tempo traveller ramadevi kanpur",
        "force urbania rental kanpur",
        "tempo traveller for char dham kanpur"
      ]
    },
    hero: {
      badge: "Group Travel & Wedding Specialists",
      h1: "Luxury Tempo Traveller Rental in Kanpur",
      subheading: "Travel together in ultimate comfort. 9 to 26-seater AC Tempo Travellers and Force Urbania vans for family pilgrimages, outstation tours, and wedding barats.",
      startingPrice: 5500,
      ratingValue: 4.95,
      reviewCount: 382
    },
    intro: {
      h2: "Kanpur's Premier Group Fleet: Maharaja Seating & Force Urbania",
      content: [
        "When traveling with family, colleagues, or wedding guests, split-car travel is tiring and expensive. Yadhuvanshi Tours and Travels brings Kanpur's most reliable and well-maintained fleet of 9-seater, 12-seater, 17-seater, 20-seater, and 26-seater luxury Tempo Travellers right to your doorstep.",
        "Equipped with 1x1 / 2x1 pushback Maharaja captain seats, dual-compressor AC vents for every passenger, LED mood lighting, large luggage carriers, and premium acoustic sound systems, our vehicles ensure smooth outstation journeys to Uttarakhand, Rajasthan, Ayodhya, and Varanasi."
      ]
    },
    highlights: [
      "Custom 1x1 and 2x1 pushback executive captain chairs with calf support",
      "Dual AC conditioning suited for extreme North Indian summers",
      "Spacious boot and heavy-duty rooftop carrier for excess luggage",
      "Commercial fitness certified with experienced hill-station drivers",
      "24x7 roadside mechanical replacement guarantee across North India"
    ],
    serviceFeatures: [
      "Char Dham Yatra & Hill Station Group Packages",
      "Ayodhya & Kashi Spiritual Group Darshan",
      "Wedding Barat & Shadi Guest Movement",
      "School & College Educational Trips",
      "Corporate Outings & Industrial Visits"
    ],
    pricingMatrix: [
      {
        vehicleType: "Tempo Traveller (12 Seater)",
        capacity: "12 Passengers + Large Luggage",
        oneWayRate: 6500,
        roundTripPerKm: 23,
        minKmPerDay: 250,
        driverAllowancePerDay: 500,
        estimatedTollStateTax: 500
      },
      {
        vehicleType: "Tempo Traveller (17 Seater)",
        capacity: "17 Passengers + Large Luggage",
        oneWayRate: 8500,
        roundTripPerKm: 26,
        minKmPerDay: 250,
        driverAllowancePerDay: 600,
        estimatedTollStateTax: 600
      },
      {
        vehicleType: "Force Urbania (16 Seater)",
        capacity: "16 Passengers Super Luxury",
        oneWayRate: 11000,
        roundTripPerKm: 34,
        minKmPerDay: 300,
        driverAllowancePerDay: 700,
        estimatedTollStateTax: 750
      },
      {
        vehicleType: "Mini Bus (26 Seater)",
        capacity: "26 Passengers Executive",
        oneWayRate: 13500,
        roundTripPerKm: 38,
        minKmPerDay: 300,
        driverAllowancePerDay: 800,
        estimatedTollStateTax: 850
      }
    ],
    relatedRoutes: [
      { title: "Kanpur to Ayodhya Cab", slug: "kanpur-to-ayodhya-cab", distance: "225 km" },
      { title: "Kanpur to Varanasi Cab", slug: "kanpur-to-varanasi-cab", distance: "330 km" }
    ],
    relatedServices: [
      { title: "Taxi Service in Kanpur", slug: "taxi-service-in-kanpur" },
      { title: "Car Rental in Kanpur", slug: "car-rental-in-kanpur" },
      { title: "Innova Crysta Rental Kanpur", slug: "innova-crysta-rental-kanpur" }
    ],
    faqs: [
      {
        question: "What is the per kilometer rate for a 17-seater Tempo Traveller in Kanpur?",
        answer: "Our 17-seater Tempo Traveller starts at ₹26 per km for outstation round trips with a minimum billing criterion of 250 km per calendar day, excluding state border taxes and tolls."
      },
      {
        question: "Is the Force Urbania available for wedding hire in Kanpur?",
        answer: "Yes, the Force Urbania is available for local Kanpur wedding transfers, barat guest movement, and airport pick-and-drop on 8 hours / 80 km or daily rental packages."
      },
      {
        question: "Are your drivers trained for mountain driving in Uttarakhand and Himachal?",
        answer: "Yes, our Tempo Traveller chauffeurs possess over 10+ years of commercial hill driving experience across Rishikesh, Badrinath, Kedarnath, Shimla, and Manali mountain corridors."
      }
    ]
  },
  {
    kind: "service",
    slug: "car-rental-in-kanpur",
    meta: {
      title: "Car Rental in Kanpur | Self Drive & Chauffeur Driven Cars",
      description: "Hire cars on rent in Kanpur. Wide range of Hatchbacks, Sedans, 7-Seater SUVs, Fortuners & Luxury cars. Hourly, daily & monthly flexible packages.",
      keywords: [
        "car rental in kanpur",
        "car on rent kanpur",
        "self drive car in kanpur",
        "luxury car rental kanpur",
        "fortuner on rent in kanpur",
        "ertiga car rental kanpur"
      ]
    },
    hero: {
      badge: "Wide Range of Vehicles",
      h1: "Car Rental Service in Kanpur",
      subheading: "Rent the perfect car for every occasion. Hatchbacks for city errands, luxury sedans for corporate meetings, and 7-seater SUVs for family outstation holidays.",
      startingPrice: 1500,
      ratingValue: 4.9,
      reviewCount: 460
    },
    intro: {
      h2: "Flexible Car Rentals for Business, Leisure & Weddings",
      content: [
        "Whether you are visiting Kanpur on business, planning an outstation road trip, or requiring a VIP luxury car for a family wedding, Yadhuvanshi Tours and Travels offers transparent, well-maintained car rentals with professional chauffeurs.",
        "Choose from Maruti Swift, Dzire, Ertiga, Innova Crysta, Mahindra Scorpio, Toyota Fortuner, Audi, and Mercedes-Benz with doorstep delivery anywhere in Kanpur."
      ]
    },
    highlights: [
      "Doorstep delivery across Swaroop Nagar, Civil Lines, Kalyanpur & Chakeri",
      "Thoroughly sanitised interiors with air freshener & clean seat covers",
      "Transparent billing with computerized trip meter slips",
      "Flexible hourly, daily, weekly, and monthly corporate leasing options"
    ],
    pricingMatrix: [
      {
        vehicleType: "Maruti Dzire",
        capacity: "4 Seater Sedan",
        oneWayRate: 1600,
        roundTripPerKm: 11,
        minKmPerDay: 250,
        driverAllowancePerDay: 400,
        estimatedTollStateTax: 0
      },
      {
        vehicleType: "Maruti Ertiga",
        capacity: "6 Seater SUV",
        oneWayRate: 2200,
        roundTripPerKm: 14,
        minKmPerDay: 250,
        driverAllowancePerDay: 400,
        estimatedTollStateTax: 0
      },
      {
        vehicleType: "Toyota Innova Crysta",
        capacity: "7 Seater Luxury MPV",
        oneWayRate: 3200,
        roundTripPerKm: 18,
        minKmPerDay: 250,
        driverAllowancePerDay: 500,
        estimatedTollStateTax: 0
      },
      {
        vehicleType: "Toyota Fortuner",
        capacity: "7 Seater VIP SUV",
        oneWayRate: 6500,
        roundTripPerKm: 35,
        minKmPerDay: 250,
        driverAllowancePerDay: 700,
        estimatedTollStateTax: 0
      }
    ],
    relatedRoutes: [
      { title: "Kanpur to Lucknow Cab", slug: "kanpur-to-lucknow-cab", distance: "85 km" },
      { title: "Kanpur to Delhi Cab", slug: "kanpur-to-delhi-cab", distance: "490 km" }
    ],
    relatedServices: [
      { title: "Taxi Service in Kanpur", slug: "taxi-service-in-kanpur" },
      { title: "Tempo Traveller in Kanpur", slug: "tempo-traveller-rental-kanpur" }
    ],
    faqs: [
      {
        question: "Can I rent a car with a driver for multiple days from Kanpur?",
        answer: "Yes, we provide chauffeur-driven cars for multi-day outstation circuits with a standard minimum billing of 250 km per day plus driver night allowance."
      },
      {
        question: "Are luxury cars like Fortuner and Audi available for wedding hire?",
        answer: "Yes, we have decorated wedding cars including Toyota Fortuner, Audi A6, BMW 5-Series, and Mercedes-Benz for doli and groom entry in Kanpur."
      }
    ]
  }
];

// Helper functions for dynamic page generation
export function getSeoPageBySlug(slug: string): SeoLandingPage | undefined {
  return SEO_LANDINGS_DATABASE.find((p) => p.slug === slug);
}

export function getAllRoutes(): SeoLandingPage[] {
  return SEO_LANDINGS_DATABASE.filter((p) => p.kind === "route");
}

export function getAllServices(): SeoLandingPage[] {
  return SEO_LANDINGS_DATABASE.filter((p) => p.kind === "service");
}
