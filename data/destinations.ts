import type { Destination } from "../types";

export const DESTINATIONS: Destination[] = [
  {
    slug: "himachal-pradesh",
    name: "Himachal Pradesh",
    state: "Himachal Pradesh",
    tagline: "Where Mountains Meet the Sky",
    description:
      "Himachal Pradesh is India's crown jewel — snow-capped peaks, deodar forests, roaring rivers and terraced apple orchards. From the bustling hill station of Shimla to the adventure capital Manali and the mystical Spiti Valley, every corner rewards the traveler.",
    image: "photo-1506905925346-21bda4d32df4",
    bestTime: "March – June & October – December",
    linkedPackageSlugs: ["himachal-escape"],
    highlights: [
      "Manali — Rohtang Pass, Solang Valley",
      "Shimla — Mall Road, Jakhu Temple",
      "Spiti Valley — Key Monastery, Chandratal Lake",
      "Dharamshala & McLeod Ganj",
      "Kasol & Kheerganga trekking",
    ],
    faqs: [
      { question: "Is Rohtang Pass open year-round?", answer: "No. It opens May–November, subject to snow clearance and government permit system." },
      { question: "Best vehicle for Himachal roads?", answer: "SUVs (Innova Crysta, Fortuner, Creta) or Tempo Travellers for groups. 4WD recommended for Spiti." },
    ],
  },
  {
    slug: "kashmir",
    name: "Kashmir",
    state: "Jammu & Kashmir",
    tagline: "Paradise on Earth",
    description:
      "Called heaven on Earth for good reason — Kashmir offers shimmering Dal Lake, fragrant saffron fields, Mughal gardens, and the world's most dramatic mountain scenery. Srinagar's houseboats, Gulmarg's skiing slopes, and Pahalgam's meadows create an experience unlike anywhere else in India.",
    image: "photo-1595815771614-ade9d652a65d",
    bestTime: "April – October",
    linkedPackageSlugs: ["kashmir-paradise"],
    highlights: [
      "Dal Lake Shikara rides",
      "Gulmarg — gondola to Apharwat Peak",
      "Pahalgam — Betaab Valley",
      "Mughal Gardens — Shalimar & Nishat",
      "Sonmarg glacier viewpoint",
    ],
    faqs: [
      { question: "Is it safe to travel to Kashmir?", answer: "Tourist circuits are fully operational and safe. We monitor advisories actively." },
      { question: "Best time for snow?", answer: "December–February for Gulmarg ski season. April for tulip gardens." },
    ],
  },
  {
    slug: "goa",
    name: "Goa",
    state: "Goa",
    tagline: "Sun, Sand & Soul",
    description:
      "India's smallest state punches above its weight — pristine beaches, Portuguese heritage, vibrant nightlife, fresh seafood, and the warmest sunsets on the subcontinent. Whether you're a family, a couple, or a group of friends, Goa delivers.",
    image: "photo-1512343879784-a960bf40e7f2",
    bestTime: "November – February",
    linkedPackageSlugs: ["goa-getaway"],
    highlights: [
      "Calangute, Baga & Anjuna beaches",
      "Old Goa UNESCO heritage churches",
      "Dudhsagar Waterfalls trek",
      "Mandovi River sunset cruise",
      "Night markets — Arpora & Anjuna",
    ],
    faqs: [
      { question: "Can we rent a vehicle in Goa?", answer: "Yes — we offer scooter (₹350/day) and car (₹1,200/day) self-drive, as well as chauffeur-driven options for comfortable sightseeing." },
    ],
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    state: "Rajasthan",
    tagline: "Land of Kings & Colors",
    description:
      "Rajasthan is a feast for the senses — royal forts, ornate palaces, vibrant bazaars, and the vast Thar Desert that turns gold at sunset. The Golden Triangle cities of Jaipur, Jodhpur, and Udaipur are among India's most photogenic destinations.",
    image: "photo-1524492412937-b28074a5d7da",
    bestTime: "October – March",
    linkedPackageSlugs: ["rajasthan-heritage", "golden-triangle"],
    highlights: [
      "Jaipur — Amber Fort, City Palace",
      "Udaipur — Lake Pichola, City Palace",
      "Jodhpur — Mehrangarh Fort, Blue City",
      "Jaisalmer — Desert camp & safari",
      "Pushkar — Brahma Temple & Holy Lake",
    ],
    faqs: [
      { question: "Can we do a desert safari?", answer: "Yes — camel safari near Jaisalmer included in extended packages. Jeep safari also available." },
    ],
  },
  {
    slug: "kerala",
    name: "Kerala",
    state: "Kerala",
    tagline: "God's Own Country",
    description:
      "Kerala is a land of contrasts — emerald backwaters, lush hill stations, elephant country, Ayurveda spas, and some of India's most pristine beaches. A houseboat cruise through the backwaters of Alleppey is a bucket-list experience.",
    image: "photo-1602216056096-3b40cc0c9944",
    bestTime: "September – March",
    linkedPackageSlugs: ["kerala-backwaters"],
    highlights: [
      "Alleppey backwater houseboat cruise",
      "Munnar tea gardens & Eravikulam NP",
      "Periyar Wildlife Sanctuary, Thekkady",
      "Fort Kochi heritage walk",
      "Kovalam & Varkala beaches",
    ],
    faqs: [
      { question: "Can non-swimmers enjoy houseboat?", answer: "Absolutely. Houseboats move at a gentle pace through calm backwater canals — no open sea involved." },
    ],
  },
  {
    slug: "agra",
    name: "Agra",
    state: "Uttar Pradesh",
    tagline: "Home of the Taj Mahal",
    description:
      "Agra is home to one of the Seven Wonders of the World — the Taj Mahal. Built by Mughal Emperor Shah Jahan, this ivory-white marble mausoleum draws millions each year. Beyond the Taj, Agra Fort and Fatehpur Sikri complete this UNESCO World Heritage city.",
    image: "photo-1548013146-72479768bada",
    bestTime: "October – March",
    linkedPackageSlugs: ["golden-triangle"],
    highlights: [
      "Taj Mahal — sunrise & sunset views",
      "Agra Fort — Mughal fortification",
      "Fatehpur Sikri — abandoned Mughal capital",
      "Mehtab Bagh — Taj riverside viewpoint",
      "Agra's Petha & marble handicrafts",
    ],
    faqs: [
      { question: "How far is Agra from Delhi?", answer: "200 km — approx 3 hrs by road (Yamuna Expressway) or 2 hrs by Gatimaan/Shatabdi Express." },
    ],
  },
];

export const getDestinationBySlug = (slug: string) =>
  DESTINATIONS.find((d) => d.slug === slug);
