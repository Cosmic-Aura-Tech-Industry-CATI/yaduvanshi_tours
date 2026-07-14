import type { TourPackage } from "../types";

export const PACKAGES: TourPackage[] = [
  {
    slug: "himachal-escape",
    title: "Himachal Escape",
    subtitle: "Peaks, Pines & Perfect Serenity",
    category: "mountains",
    destinations: ["Shimla", "Manali", "Solang Valley", "Rohtang Pass"],
    duration: { days: 4, nights: 3 },
    groupSize: { min: 2, max: 12 },
    image: "photo-1506905925346-21bda4d32df4",
    gallery: [
      "photo-1542314831-068cd1dbfeeb",
      "photo-1517824806704-9040b037703b",
      "photo-1476514525535-07fb3b4ae5f1",
    ],
    pricePerPerson: 4948,
    packagePrice: 14999,
    rating: 4.8,
    reviewCount: 342,
    popular: true,
    wishlistCount: 1240,
    highlights: [
      "Solang Valley snow activities",
      "Hadimba Devi Temple visit",
      "Shimla Mall Road & Ridge",
      "Rohtang Pass snow experience (seasonal)",
      "Kullu Riverside stay",
    ],
    inclusions: [
      "3 nights accommodation (twin sharing)",
      "Daily breakfast & dinner",
      "Volvo bus or private vehicle transfers",
      "All sightseeing as per itinerary",
      "Dedicated tour manager",
      "GST & service taxes",
    ],
    exclusions: [
      "Flights / personal travel to Shimla",
      "Lunch & personal expenses",
      "Adventure activities at Solang Valley",
      "Rohtang Pass permit (₹500/person, seasonal)",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Shimla — The Queen of Hills",
        description:
          "Arrive at Shimla, check in. Evening walk on Mall Road and Ridge. Explore Christ Church and Jakhu Temple viewpoint.",
        meals: ["Dinner"],
        accommodation: "Hotel Willow Banks or similar (3★)",
      },
      {
        day: 2,
        title: "Shimla → Manali via Kullu Valley",
        description:
          "Drive through the scenic Kullu Valley. Stop at Pandoh Dam, Kullu shawl emporium. Evening arrival in Manali, check-in.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Snow View or similar (3★)",
      },
      {
        day: 3,
        title: "Solang Valley & Local Manali Sightseeing",
        description:
          "Morning at Solang Valley — enjoy zorbing, skiing, rope car (seasonal). Afternoon: Hadimba Devi Temple, Manu Temple, Old Manali Market.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Snow View or similar (3★)",
      },
      {
        day: 4,
        title: "Manali Departure",
        description:
          "Checkout and transfer to Manali bus stand / helipad. Tour concludes.",
        meals: ["Breakfast"],
        accommodation: "",
      },
    ],
    faqs: [
      {
        question: "Is Rohtang Pass guaranteed?",
        answer:
          "Rohtang Pass opens from May to November, subject to weather and government permissions. An alternate route (Solang Valley) is offered if closed.",
      },
      {
        question: "Can this be done in 3 days / 2 nights?",
        answer:
          "Yes, a 3D/2N variant skipping Shimla is available at ₹12,499/pkg. Contact us to customise.",
      },
    ],
  },
  {
    slug: "kashmir-paradise",
    title: "Kashmir Paradise",
    subtitle: "Heaven on Earth — Dal Lake to Gulmarg",
    category: "mountains",
    destinations: ["Srinagar", "Gulmarg", "Pahalgam", "Sonmarg"],
    duration: { days: 5, nights: 4 },
    groupSize: { min: 2, max: 10 },
    image: "photo-1595815771614-ade9d652a65d",
    gallery: [
      "photo-1548011591-67d6e49b6a1c",
      "photo-1566438480900-0609be27a4be",
      "photo-1599661046289-e31897846e41",
    ],
    pricePerPerson: 4468,
    packagePrice: 17999,
    rating: 4.9,
    reviewCount: 212,
    popular: true,
    wishlistCount: 1880,
    highlights: [
      "Shikara ride on Dal Lake at sunset",
      "Gondola cable car at Gulmarg",
      "Betaab Valley & Chandanwari in Pahalgam",
      "Mughal Gardens — Shalimar & Nishat Bagh",
      "Luxury houseboat night stay",
    ],
    inclusions: [
      "1 night houseboat + 3 nights hotel (twin sharing)",
      "Daily breakfast & dinner",
      "All transfers by private vehicle",
      "Shikara ride (1 hour included)",
      "All sightseeing & entry fees per itinerary",
      "Dedicated tour manager",
    ],
    exclusions: [
      "Flights to / from Srinagar",
      "Gondola cable car charges (₹900–1,500/person)",
      "Pony rides & adventure activities",
      "Lunch & personal shopping",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Srinagar — Dal Lake Shikara",
        description:
          "Arrive Srinagar airport, transfer to houseboat. Evening Shikara ride on Dal Lake. Sunset over the Himalayas from the water.",
        meals: ["Dinner"],
        accommodation: "Heritage Grand Houseboat or similar",
      },
      {
        day: 2,
        title: "Srinagar Local — Mughal Gardens",
        description:
          "Visit Shalimar Bagh, Nishat Bagh, Pari Mahal. Drive past Shankaracharya Temple. Evening free on Lal Chowk.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Grand Palace or similar (3★)",
      },
      {
        day: 3,
        title: "Gulmarg — Meadow of Flowers",
        description:
          "Full-day excursion to Gulmarg (56 km). Gondola cable car to Kongdori / Apharwat Peak. Snow activities in season.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Grand Palace or similar (3★)",
      },
      {
        day: 4,
        title: "Pahalgam — Valley of Shepherds",
        description:
          "Drive to Pahalgam (96 km). Visit Betaab Valley, Aru Valley, Chandanwari. Evening riverside walk.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Grand Palace or similar (3★)",
      },
      {
        day: 5,
        title: "Srinagar Departure",
        description:
          "Morning at leisure. Transfer to Srinagar airport. Tour concludes.",
        meals: ["Breakfast"],
        accommodation: "",
      },
    ],
    faqs: [
      {
        question: "Is Kashmir safe to travel?",
        answer:
          "Tourist circuits (Srinagar, Gulmarg, Pahalgam, Sonmarg) are fully operational and safe. We monitor local advisories and update itineraries accordingly.",
      },
      {
        question: "What is the best time to visit?",
        answer:
          "April–October for pleasant weather; December–February for snow sports at Gulmarg.",
      },
    ],
  },
  {
    slug: "goa-getaway",
    title: "Goa Getaway",
    subtitle: "Sun, Sand & Soulful Vibes",
    category: "beach",
    destinations: ["North Goa", "South Goa", "Panjim", "Old Goa"],
    duration: { days: 4, nights: 3 },
    groupSize: { min: 2, max: 15 },
    image: "photo-1512343879784-a960bf40e7f2",
    gallery: [
      "photo-1507525428034-b723cf961d3e",
      "photo-1500375592092-40eb2168fd21",
      "photo-1510414842594-a61c69b5ae57",
    ],
    pricePerPerson: 3174,
    packagePrice: 9999,
    rating: 4.3,
    reviewCount: 298,
    popular: false,
    wishlistCount: 765,
    highlights: [
      "Calangute & Baga beach access",
      "Water sports package (banana boat, parasailing)",
      "Old Goa UNESCO heritage churches",
      "Night market at Arpora / Anjuna",
      "Sunset cruise on Mandovi River",
    ],
    inclusions: [
      "3 nights beach resort (twin sharing)",
      "Daily breakfast & dinner",
      "Airport / station transfers",
      "Sightseeing by private vehicle",
      "Water sports (basic package)",
    ],
    exclusions: [
      "Flights / trains to Goa",
      "Lunches & beverages",
      "Premium water sports",
      "Entry fees for casinos",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Goa — Beach Check-in",
        description:
          "Arrive at Goa airport / Madgaon railway, transfer to beach resort. Evening free at Calangute or Baga beach.",
        meals: ["Dinner"],
        accommodation: "La Gulls Court or similar (3★)",
      },
      {
        day: 2,
        title: "North Goa Beach Hopping & Water Sports",
        description:
          "Visit Calangute, Baga, Anjuna, Vagator beaches. Water sports session. Evening sunset cruise on Mandovi River.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "La Gulls Court or similar (3★)",
      },
      {
        day: 3,
        title: "South Goa & Heritage",
        description:
          "Old Goa churches (Basilica of Bom Jesus, Se Cathedral), Panjim city tour, Miramar beach. Optional Colva / Palolem beach evening.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "La Gulls Court or similar (3★)",
      },
      {
        day: 4,
        title: "Departure Day",
        description: "Checkout. Transfer to airport / railway station.",
        meals: ["Breakfast"],
        accommodation: "",
      },
    ],
    faqs: [
      {
        question: "Is it suitable for families with children?",
        answer:
          "Absolutely. South Goa beaches (Colva, Palolem) are calmer and ideal for families. We customize the itinerary on request.",
      },
    ],
  },
  {
    slug: "rajasthan-heritage",
    title: "Rajasthan Heritage",
    subtitle: "Palaces, Forts & Desert Gold",
    category: "heritage",
    destinations: ["Jaipur", "Udaipur", "Jodhpur", "Pushkar"],
    duration: { days: 6, nights: 5 },
    groupSize: { min: 2, max: 16 },
    image: "photo-1524492412937-b28074a5d7da",
    gallery: [
      "photo-1477587458883-47145ed6736c",
      "photo-1586800887411-a44b41e3f1de",
      "photo-1599661046289-e31897846e41",
    ],
    pricePerPerson: 6668,
    packagePrice: 10999,
    rating: 4.7,
    reviewCount: 118,
    popular: true,
    wishlistCount: 943,
    highlights: [
      "Amber Fort elephant ride (Jaipur)",
      "City Palace & Lake Pichola boat ride (Udaipur)",
      "Mehrangarh Fort & Blue City panorama (Jodhpur)",
      "Pushkar Holy Lake & Brahma Temple",
      "Cultural desert folk show & dinner",
    ],
    inclusions: [
      "5 nights hotel (twin sharing, 3–4★)",
      "Daily breakfast & dinner",
      "Private AC vehicle throughout",
      "All monument entry fees",
      "Dedicated tour guide + tour manager",
    ],
    exclusions: [
      "Flights to Jaipur / from Jaipur",
      "Elephant ride at Amber Fort (₹900/person)",
      "Boat ride at Lake Pichola (₹400/person)",
      "Lunches & personal shopping",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Jaipur — Pink City",
        description:
          "Arrive Jaipur, check in. Evening at leisure on MI Road. Traditional Rajasthani dinner.",
        meals: ["Dinner"],
        accommodation: "Hotel Sarang Palace or similar (3★)",
      },
      {
        day: 2,
        title: "Jaipur Sightseeing",
        description:
          "Amber Fort (elephant ride optional), Jaigarh Fort, City Palace, Jantar Mantar, Hawa Mahal. Evening bazaar walk.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Sarang Palace or similar (3★)",
      },
      {
        day: 3,
        title: "Jaipur → Pushkar",
        description:
          "Drive to Pushkar (148 km). Visit Brahma Temple, Pushkar Holy Lake. Camel ride on the ghats. Evening market.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Brahma Horizon or similar (3★)",
      },
      {
        day: 4,
        title: "Pushkar → Udaipur — City of Lakes",
        description:
          "Drive to Udaipur (300 km). Check in and rest. Sunset boat ride on Lake Pichola.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Fateh Prakash or similar (3★)",
      },
      {
        day: 5,
        title: "Udaipur → Jodhpur — Blue City",
        description:
          "Morning City Palace, Jagdish Temple, Saheliyon ki Bari. Drive to Jodhpur (250 km). Evening Mehrangarh Fort.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Ratan Vilas or similar (3★)",
      },
      {
        day: 6,
        title: "Jodhpur Departure",
        description:
          "Mandore Gardens & Clock Tower market. Transfer to Jodhpur airport / station.",
        meals: ["Breakfast"],
        accommodation: "",
      },
    ],
    faqs: [
      {
        question: "Can Jaisalmer be added?",
        answer:
          "Yes. A 7N/8D extension adding Jaisalmer desert camp is available at ₹4,500 additional per person.",
      },
    ],
  },
  {
    slug: "kerala-backwaters",
    title: "Kerala Backwaters",
    subtitle: "God's Own Country — Houseboat & Spices",
    category: "beach",
    destinations: ["Kochi", "Munnar", "Alleppey", "Kovalam"],
    duration: { days: 6, nights: 5 },
    groupSize: { min: 2, max: 10 },
    image: "photo-1602216056096-3b40cc0c9944",
    gallery: [
      "photo-1573650338494-e6f17e0e1b1e",
      "photo-1591696331096-81c2b0db2432",
      "photo-1570097271494-36f57e9cb9c7",
    ],
    pricePerPerson: 5850,
    packagePrice: 18999,
    rating: 4.9,
    reviewCount: 176,
    popular: true,
    wishlistCount: 2100,
    highlights: [
      "Overnight luxury houseboat in Alleppey backwaters",
      "Munnar tea plantation walk & viewpoint",
      "Kathakali cultural show in Kochi",
      "Kovalam lighthouse beach",
      "Periyar wildlife sanctuary boat ride",
    ],
    inclusions: [
      "1 night houseboat + 4 nights hotel (twin sharing)",
      "Daily breakfast, lunch & dinner (houseboat day full board)",
      "All transfers by private AC vehicle",
      "Sightseeing as per itinerary",
      "Houseboat cruise (22 hours)",
    ],
    exclusions: [
      "Flights to Kochi / from Trivandrum",
      "Entry fees for wildlife sanctuaries",
      "Ayurveda treatments (available on request)",
      "Personal expenses",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Kochi — Fort Kochi",
        description:
          "Arrive Kochi, check in. Explore Fort Kochi — Chinese fishing nets, St. Francis Church, Dutch Palace. Evening Kathakali show.",
        meals: ["Dinner"],
        accommodation: "Hotel Abad Atrium or similar (3★)",
      },
      {
        day: 2,
        title: "Kochi → Munnar — Tea Hills",
        description:
          "Drive to Munnar (130 km). Tea Museum, Eravikulam National Park viewpoint, Echo Point.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Mountview Munnar or similar (3★)",
      },
      {
        day: 3,
        title: "Munnar → Thekkady — Periyar",
        description:
          "Drive to Thekkady. Periyar Wildlife Sanctuary boat ride. Spice plantation visit.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Lake Palace Thekkady or similar (3★)",
      },
      {
        day: 4,
        title: "Thekkady → Alleppey — Houseboat Embarkation",
        description:
          "Drive to Alleppey (148 km). Board luxury houseboat by noon. Cruise through backwater canals, villages, paddy fields.",
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Luxury Houseboat (AC + non-AC rooms)",
      },
      {
        day: 5,
        title: "Alleppey → Kovalam — Beach Finale",
        description:
          "Disembark houseboat by 9 AM. Drive to Kovalam beach (150 km). Evening at leisure on the crescent beach.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Sea Rock or similar (3★)",
      },
      {
        day: 6,
        title: "Kovalam → Trivandrum Departure",
        description:
          "Trivandrum Padmanabhaswamy Temple visit (exterior). Transfer to Trivandrum airport.",
        meals: ["Breakfast"],
        accommodation: "",
      },
    ],
    faqs: [
      {
        question: "What is houseboat capacity?",
        answer:
          "Standard houseboats have 2–4 bedrooms. A 2-bedroom houseboat sleeps 4 persons. We arrange solo, couple, and family options.",
      },
    ],
  },
  {
    slug: "golden-triangle",
    title: "Golden Triangle",
    subtitle: "Delhi · Agra · Jaipur — India's Classic",
    category: "heritage",
    destinations: ["Delhi", "Agra", "Jaipur", "Fatehpur Sikri"],
    duration: { days: 5, nights: 4 },
    groupSize: { min: 2, max: 16 },
    image: "photo-1548013146-72479768bada",
    gallery: [
      "photo-1524492412937-b28074a5d7da",
      "photo-1477587458883-47145ed6736c",
    ],
    pricePerPerson: 5200,
    packagePrice: 15999,
    rating: 4.6,
    reviewCount: 524,
    popular: true,
    wishlistCount: 3200,
    highlights: [
      "Taj Mahal sunrise visit",
      "Agra Fort & Itmad-ud-Daulah",
      "Amber Fort & City Palace, Jaipur",
      "Qutub Minar & Old Delhi bazaars",
      "Fatehpur Sikri UNESCO site",
    ],
    inclusions: [
      "4 nights hotel (twin sharing, 3–4★)",
      "Daily breakfast",
      "Private AC vehicle throughout",
      "Monument entry fees (Taj Mahal included)",
      "English-speaking guide in Agra",
    ],
    exclusions: [
      "Train / flight Delhi arrival & Jaipur departure",
      "Lunches & dinners",
      "Camera fees inside monuments",
      "Travel insurance",
    ],
    itinerary: [
      { day: 1, title: "Delhi Arrival & Old Delhi Tour", description: "Arrive Delhi. Jama Masjid, Chandni Chowk rickshaw ride, Red Fort exterior. Check in.", meals: ["Dinner"], accommodation: "Hotel City Park or similar (3★)" },
      { day: 2, title: "Delhi → Agra — Taj Mahal", description: "Drive to Agra (200 km). Afternoon Taj Mahal visit, Agra Fort. Sunset at Mehtab Bagh.", meals: ["Breakfast", "Dinner"], accommodation: "Hotel Clarks Shiraz or similar (3★)" },
      { day: 3, title: "Agra → Fatehpur Sikri → Jaipur", description: "Morning Itmad-ud-Daulah & Sikandra. Drive to Jaipur via Fatehpur Sikri (UNESCO). Check in.", meals: ["Breakfast", "Dinner"], accommodation: "Hotel Sarang Palace or similar (3★)" },
      { day: 4, title: "Jaipur Sightseeing", description: "Amber Fort, Jaigarh Fort, City Palace, Jantar Mantar, Hawa Mahal. Shopping on Bapu Bazaar.", meals: ["Breakfast", "Dinner"], accommodation: "Hotel Sarang Palace or similar (3★)" },
      { day: 5, title: "Jaipur Departure", description: "Nahargarh Fort morning visit. Transfer to Jaipur airport / station.", meals: ["Breakfast"], accommodation: "" },
    ],
    faqs: [
      { question: "Can this be extended to 6 days?", answer: "Yes — add 1 day in Ranthambore National Park for tiger safari. Price addition ₹3,800/person." },
    ],
  },
];

// Helper: get package by slug
export const getPackageBySlug = (slug: string) =>
  PACKAGES.find((p) => p.slug === slug);

// Category label map
export const CATEGORY_LABELS: Record<TourPackage["category"], string> = {
  mountains: "Mountains",
  beach: "Beach",
  heritage: "Heritage",
  wildlife: "Wildlife",
  spiritual: "Spiritual",
};
