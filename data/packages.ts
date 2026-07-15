import type { TourPackage } from "../types";

export const PACKAGES: TourPackage[] = [
  {
    slug: "ayodhya-darshan",
    title: "Ayodhya Darshan",
    subtitle: "A Sacred Journey to the Birthplace of Lord Rama",
    category: "spiritual",
    destinations: ["Ayodhya", "Hanuman Garhi", "Kanak Bhawan", "Saryu River"],
    duration: { days: 2, nights: 1 },
    groupSize: { min: 2, max: 7 },
    image: "/tours/ayodhya-darshan.webp",
    gallery: [
      "photo-1608958416715-4a5f36e4f35e",
      "photo-1544735716-392fe2489ffa",
      "photo-1561361513-2d000a50f0db",
    ],
    pricePerPerson: 5500, // Starts from per vehicle base
    packagePrice: 5500, // Per vehicle price
    rating: 4.9,
    reviewCount: 420,
    popular: true,
    wishlistCount: 2310,
    highlights: [
      "Darshan at the majestic Ram Janmabhoomi Mandir",
      "Visit the ancient Hanuman Garhi temple",
      "Explore Kanak Bhawan, gifted to Sita Mata",
      "Attend the serene Saryu River evening Maha Aarti",
      "Experience historic ghats and sacred ponds of Ayodhya",
    ],
    inclusions: [
      "AC Vehicle for entire trip (pick-up, local travel, drop-off)",
      "1 night premium hotel accommodation in Ayodhya",
      "Vegetarian breakfast at the hotel",
      "All driver allowance, tolls, and parking fees",
      "Dedicated local guide service for temple complex",
    ],
    exclusions: [
      "VIP Darshan passes (can be pre-booked at actuals)",
      "Lunch, dinner, and personal expenses",
      "Prasad or donation offerings",
      "Boating charges on Saryu River",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Ayodhya & Evening Saryu Aarti",
        description:
          "Arrive in Ayodhya. Check in to the hotel. In the afternoon, visit Hanuman Garhi temple and Kanak Bhawan. In the evening, witness the breathtaking Saryu River Aarti followed by a walk around Ram ki Paidi.",
        meals: [],
        accommodation: "Ramayana Hotel or similar (3★)",
      },
      {
        day: 2,
        title: "Ram Janmabhoomi Darshan & Departure",
        description:
          "Start early for Darshan at the grand Ram Janmabhoomi Mandir. Explore the surrounding complex. Check out from hotel by noon and head to your return transit point.",
        meals: ["Breakfast"],
        accommodation: "",
      },
    ],
    faqs: [
      {
        question: "Is there a dress code for the temples?",
        answer:
          "Traditional, decent clothing is highly recommended. Avoid shorts or short skirts.",
      },
      {
        question: "Is the price really per vehicle?",
        answer:
          "Yes, the price starting at ₹5,500 covers the entire vehicle (up to 5-seater Maruti Dzire class) including fuel and driver, making it highly economical for families.",
      },
    ],
  },
  {
    slug: "mathura-vrindavan",
    title: "Mathura-Vrindavan",
    subtitle: "Lose Yourself in the Divine Love of Radha-Krishna",
    category: "spiritual",
    destinations: ["Mathura", "Vrindavan", "Gokul", "Barsana"],
    duration: { days: 2, nights: 1 },
    groupSize: { min: 2, max: 7 },
    image: "/tours/mathura-vrindavan.webp",
    gallery: [
      "photo-1545128485-c400e7702796",
      "photo-1599661046289-e31897846e41",
      "photo-1566438480900-0609be27a4be",
    ],
    pricePerPerson: 11000,
    packagePrice: 11000,
    rating: 4.8,
    reviewCount: 315,
    popular: true,
    wishlistCount: 1450,
    highlights: [
      "Visit Shri Krishna Janmabhoomi Temple in Mathura",
      "Experience the magical lighting of Prem Mandir",
      "Darshan of Banke Bihari Ji in Vrindavan",
      "Explore Gokul's historic childhood sites of Krishna",
      "Visit Barsana, the home of Radha Rani",
    ],
    inclusions: [
      "Private AC Sedan/SUV for 2 full days",
      "1 night hotel accommodation in Vrindavan",
      "Breakfast at the hotel",
      "Driver charges, parking, and toll taxes",
    ],
    exclusions: [
      "Temple guide charges or VIP entries",
      "Lunches, dinners, and personal shopping",
      "E-rickshaw charges inside narrow lanes of Vrindavan",
    ],
    itinerary: [
      {
        day: 1,
        title: "Mathura Sightseeing & Vrindavan Evening Temples",
        description:
          "Drive to Mathura. Visit Shri Krishna Janmabhoomi temple complex, Dwarkadhish Temple, and Vishram Ghat. Head to Vrindavan. In the evening, visit Prem Mandir and ISKCON Temple.",
        meals: [],
        accommodation: "Nidhivan Sarovar Portico or similar (3★)",
      },
      {
        day: 2,
        title: "Banke Bihari Darshan, Gokul & Barsana Tour",
        description:
          "Morning Darshan at Banke Bihari Temple. Later, drive to Gokul to visit Raman Reti and Chinta Haran Mahadev. Continue to Barsana to climb the Radha Rani temple. Return journey starts by evening.",
        meals: ["Breakfast"],
        accommodation: "",
      },
    ],
    faqs: [
      {
        question: "How do we commute in Vrindavan's narrow streets?",
        answer:
          "Heavy vehicles are restricted in narrow temple zones. Local e-rickshaws are available and cost around ₹20-50 per person, which is paid directly by the traveler.",
      },
    ],
  },
  {
    slug: "kashi-vishwanath",
    title: "Kashi Vishwanath–Sankat Mochan–Ganga Aarti",
    subtitle: "Experience the Timeless Spiritual Energy of Varanasi",
    category: "spiritual",
    destinations: ["Varanasi", "Sarnath", "Dashashwamedh Ghat"],
    duration: { days: 2, nights: 1 },
    groupSize: { min: 2, max: 7 },
    image: "/tours/kashi-vishwanath.webp",
    gallery: [
      "photo-1561361513-2d000a50f0db",
      "photo-1590001155093-a3c66ab0c3ff",
      "photo-1605649487212-47bdab064df7",
    ],
    pricePerPerson: 10500,
    packagePrice: 10500,
    rating: 4.9,
    reviewCount: 512,
    popular: true,
    wishlistCount: 2900,
    highlights: [
      "Perform puja at Kashi Vishwanath Temple (Golden Corridor)",
      "Witness the spectacular Ganga Aarti at Dashashwamedh Ghat",
      "Visit Sankat Mochan Hanuman Mandir and Durga Temple",
      "Explore the Buddhist heritage site Sarnath",
      "Enjoy a scenic boat ride on the holy Ganges at sunrise",
    ],
    inclusions: [
      "Private AC vehicle for all transfers and sightseeing",
      "1 night hotel stay in Varanasi",
      "Sunrise boat cruise on River Ganges",
      "Breakfast at the hotel",
      "Driver expenses, tolls, and local parking fees",
    ],
    exclusions: [
      "Entry tickets at Sarnath museum",
      "Sankat Mochan puja offerings",
      "Lunches and dinners",
      "Saree/silk shopping purchases",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Varanasi, Sarnath Tour & Evening Ganga Aarti",
        description:
          "Pick up from Varanasi station/airport. Check in to the hotel. Visit Sarnath (Dhamek Stupa & Archaeological Museum). In the evening, take a boat to watch the sublime Ganga Aarti from the river.",
        meals: [],
        accommodation: "Hotel Madin or similar (4★)",
      },
      {
        day: 2,
        title: "Kashi Vishwanath Darshan, Local Temples & Departure",
        description:
          "Early morning visit to Kashi Vishwanath Jyotirlinga via the new corridor. Visit Sankat Mochan, Durga Temple, and BHU Birla Temple. Checkout by afternoon and transfer to airport/station.",
        meals: ["Breakfast"],
        accommodation: "",
      },
    ],
    faqs: [
      {
        question: "Can we customize the boat ride?",
        answer:
          "Yes. Our basic package includes a sharing motor boat. You can request a private hand-rowed bajra boat for a more personal experience.",
      },
    ],
  },
  {
    slug: "neem-karoli-baba",
    title: "Neem Karoli Baba Kainchi Dham",
    subtitle: "Seek Solace at the Revered Himalayan Ashram",
    category: "spiritual",
    destinations: ["Kainchi Dham", "Nainital", "Bhimtal"],
    duration: { days: 3, nights: 2 },
    groupSize: { min: 2, max: 7 },
    image: "/tours/neem-karoli-kainchi-dham.webp",
    gallery: [
      "photo-1544735716-392fe2489ffa",
      "photo-1506744038136-46273834b3fb",
      "photo-1469854523086-cc02fe5d8800",
    ],
    pricePerPerson: 11500,
    packagePrice: 11500,
    rating: 4.8,
    reviewCount: 198,
    popular: false,
    wishlistCount: 980,
    highlights: [
      "Spend peaceful hours at Neem Karoli Baba Kainchi Dham Ashram",
      "Enjoy boating on the scenic Naini Lake in Nainital",
      "Explore Bhimtal lake and its floating aquarium island",
      "Enjoy majestic views from Snow View Point",
      "Drive through pine and deodar Himalayan forests",
    ],
    inclusions: [
      "Private vehicle (AC in plains, blower/normal in hills)",
      "2 nights premium room accommodation in Nainital/Bhimtal",
      "Daily breakfast at the hotel",
      "All hill road tolls, green tax, parking, and driver allowances",
    ],
    exclusions: [
      "Boating charges in Nainital/Bhimtal",
      "Ropeway tickets to Snow View Point",
      "Lunch, dinner, and personal items",
    ],
    itinerary: [
      {
        day: 1,
        title: "Drive to Nainital & Lakeside Walk",
        description:
          "Pick up from Kathgodam station / Haldwani. Scenic drive to Nainital. Check in at hotel. Late afternoon: boat ride on Naini Lake and shopping on the Mall Road.",
        meals: [],
        accommodation: "The Pavilion Hotel or similar (3★)",
      },
      {
        day: 2,
        title: "Pilgrimage to Kainchi Dham Ashram",
        description:
          "Morning drive to the tranquil Kainchi Dham Ashram (approx 20 km). Spend the morning in quiet meditation and exploration. Return to Nainital for sightseeing: Snow View, Lover's Point, Cave Garden.",
        meals: ["Breakfast"],
        accommodation: "The Pavilion Hotel or similar (3★)",
      },
      {
        day: 3,
        title: "Bhimtal Lake Tour & Departure",
        description:
          "Check out and drive to Bhimtal Lake. Enjoy lake views and explore the aquarium. Proceed to Kathgodam railway station for departure.",
        meals: ["Breakfast"],
        accommodation: "",
      },
    ],
    faqs: [
      {
        question: "What are the ashram visiting hours?",
        answer:
          "Kainchi Dham Ashram is generally open for devotees from 7:00 AM to 6:00 PM daily. Check-in guidelines apply at the gates.",
      },
    ],
  },
  {
    slug: "mahakal-omkareshwar",
    title: "Mahakal–Omkareshwar–Bhairav Baba",
    subtitle: "A Powerful Pilgrimage to the Sacred Jyotirlingas of MP",
    category: "spiritual",
    destinations: ["Ujjain", "Omkareshwar", "Bhairav Temple"],
    duration: { days: 3, nights: 2 },
    groupSize: { min: 2, max: 7 },
    image: "/tours/mahakal-omkareshwar.webp",
    gallery: [
      "photo-1582510003544-4d00b7f74220",
      "photo-1596701062351-df5f8af54b85",
      "photo-1503177119275-0aa32b3a9368",
    ],
    pricePerPerson: 20000,
    packagePrice: 20000,
    rating: 4.7,
    reviewCount: 165,
    popular: false,
    wishlistCount: 840,
    highlights: [
      "Attend Bhasma Aarti at Mahakaleshwar Temple, Ujjain",
      "Darshan of Omkareshwar Jyotirlinga located on Mandhata island",
      "Explore the vast Mahakal Lok Corridor",
      "Visit Harsiddhi Temple, one of the 51 Shakti Peethas",
      "Seek blessings at the fierce Kaal Bhairav Temple",
    ],
    inclusions: [
      "AC sedan/SUV for Indore-Ujjain-Omkareshwar-Indore circuit",
      "2 nights comfortable hotel stay in Ujjain",
      "Breakfast at hotel",
      "Driver, toll, state tax, and parking fees",
    ],
    exclusions: [
      "Bhasma Aarti booking charges (requires early booking)",
      "Omkareshwar boat crossing fee",
      "Personal guide or VIP line tickets",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Indore, Drive to Ujjain & Mahakal Lok",
        description:
          "Arrive at Indore. Drive to Ujjain. Check in to hotel. Late afternoon visit to Harsiddhi Temple, Kaal Bhairav, and a evening walk at the spectacular Mahakal Lok corridor.",
        meals: [],
        accommodation: "Hotel Shipra (MP Tourism) or similar",
      },
      {
        day: 2,
        title: "Bhasma Aarti & Day Excursion to Omkareshwar",
        description:
          "Early morning (4 AM) Bhasma Aarti at Mahakal temple. Return to hotel for breakfast. Drive to Omkareshwar (140 km). Take a boat on Narmada River to visit the Jyotirlinga. Return to Ujjain by night.",
        meals: ["Breakfast"],
        accommodation: "Hotel Shipra (MP Tourism) or similar",
      },
      {
        day: 3,
        title: "Indore Sightseeing & Departure",
        description:
          "Check out and drive back to Indore. Visit Lal Bagh Palace and Khajrana Ganesh temple. Transfer to Indore airport/station by evening.",
        meals: ["Breakfast"],
        accommodation: "",
      },
    ],
    faqs: [
      {
        question: "How do we register for Bhasma Aarti?",
        answer:
          "Online registration opens 30 days in advance on the temple board's website. It requires photo ID details. We can assist in coordination if requested.",
      },
    ],
  },
  {
    slug: "kullu-manali",
    title: "Kullu Manali",
    subtitle: "Bask in Snowy Peaks and Pristine Valley Views",
    category: "mountains",
    destinations: ["Kullu", "Manali", "Solang Valley", "Rohtang Pass"],
    duration: { days: 6, nights: 5 },
    groupSize: { min: 2, max: 7 },
    image: "/tours/kullu-manali.webp",
    gallery: [
      "photo-1542314831-068cd1dbfeeb",
      "photo-1517824806704-9040b037703b",
      "photo-1476514525535-07fb3b4ae5f1",
    ],
    pricePerPerson: 26000,
    packagePrice: 26000,
    rating: 4.8,
    reviewCount: 520,
    popular: true,
    wishlistCount: 3120,
    highlights: [
      "Explore Solang Valley adventure park and ropeway",
      "Visit Hadimba Temple nestled in thick pine forests",
      "Day trip to Rohtang Pass (seasonal snow activities)",
      "River rafting on the Beas River in Kullu",
      "Walk around the peaceful Vashisht Hot Springs",
    ],
    inclusions: [
      "Private AC Sedan/SUV for Delhi-Manali-Delhi road trip",
      "5 nights hotel accommodation (3★ superior)",
      "Daily breakfast and dinner at the hotels",
      "Local sightseeing at Manali and excursion to Solang Valley",
      "Green tax, permit assistance, tolls, and parking",
    ],
    exclusions: [
      "Adventure activities like paragliding, rafting, skiing",
      "Rohtang Pass permit fee (regulated by NGT, billed extra)",
      "Lunch, snacks, and personal items",
    ],
    itinerary: [
      {
        day: 1,
        title: "Delhi to Manali Over-Night Journey",
        description:
          "Delhi pick up in the evening. Overnight drive in comfort through the scenic national highway (approx 12-14 hours).",
        meals: [],
        accommodation: "Transit",
      },
      {
        day: 2,
        title: "Manali Arrival & Afternoon Local Sightseeing",
        description:
          "Reach Manali by noon, check in. In the afternoon, visit Hadimba Temple, Club House, and the Tibetan Monastery. Evening walk on Mall Road.",
        meals: ["Dinner"],
        accommodation: "Solang Valley Resort or similar (3★)",
      },
      {
        day: 3,
        title: "Solang Valley Snow Adventure",
        description:
          "Drive to Solang Valley. Enjoy thrilling sports: paragliding, zorbing, quad biking, and ziplines. Return to Manali by evening.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Solang Valley Resort or similar (3★)",
      },
      {
        day: 4,
        title: "Excursion to Rohtang Pass / Snow Point",
        description:
          "Head up the mountain pass to Rohtang (3978m). Enjoy majestic views of glaciers and year-round snow fields. Return to hotel.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Solang Valley Resort or similar (3★)",
      },
      {
        day: 5,
        title: "Kullu Rafting & Kasol Manikaran Day Trip",
        description:
          "Drive to Kullu for river rafting. Later, proceed to Kasol and visit Manikaran Sahib Gurudwara for hot sulfur spring baths. Drive back to Manali.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Solang Valley Resort or similar (3★)",
      },
      {
        day: 6,
        title: "Check-out & Drive back to Delhi",
        description:
          "Morning check-out. Return drive back to Delhi. Drop off at airport / station by evening. Tour ends.",
        meals: ["Breakfast"],
        accommodation: "",
      },
    ],
    faqs: [
      {
        question: "Is Rohtang Pass open in winter?",
        answer:
          "Rohtang Pass is closed from late November to May due to heavy snow. During this time, vehicles are allowed up to Gulaba or Solang Valley.",
      },
    ],
  },
  {
    slug: "vaishno-devi-kashmir",
    title: "Vaishno Devi–Gulmarg–Sonmarg",
    subtitle: "From Divine Heights to the Paradise on Earth",
    category: "spiritual",
    destinations: ["Katra", "Vaishno Devi Bhawan", "Srinagar", "Gulmarg", "Sonmarg"],
    duration: { days: 10, nights: 9 },
    groupSize: { min: 2, max: 7 },
    image: "/tours/vaishno-devi-kashmir.webp",
    gallery: [
      "photo-1595815771614-ade9d652a65d",
      "photo-1542314831-068cd1dbfeeb",
      "photo-1507525428034-b723cf961d3e",
    ],
    pricePerPerson: 40000,
    packagePrice: 40000,
    rating: 4.9,
    reviewCount: 280,
    popular: true,
    wishlistCount: 2010,
    highlights: [
      "Sacred Yatra trek to Mata Vaishno Devi Bhawan in Katra",
      "Stay in a traditional luxury wooden houseboat on Dal Lake",
      "Ride the world's highest Gondola Cable Car in Gulmarg",
      "Explore the golden meadows and glaciers of Sonmarg",
      "Sightseeing at Shalimar & Nishat Mughal Gardens",
    ],
    inclusions: [
      "Private AC Sedan/SUV for the entire Jammu-Katra-Kashmir-Jammu route",
      "2 nights hotel in Katra + 6 nights hotel in Srinagar + 1 night Dal Lake Houseboat",
      "Breakfast and dinners at all hotels & houseboat",
      "Katra helicopter booking assistance (charges extra)",
      "Dedicated tour driver, parking, all highway taxes, and tolls",
    ],
    exclusions: [
      "Gondola tickets in Gulmarg (needs advance online booking)",
      "Pony / horse ride rentals in Katra/Sonmarg",
      "Helicopter / battery car tickets to Vaishno Devi",
      "Lunches and guide fees",
    ],
    itinerary: [
      {
        day: 1,
        title: "Jammu Arrival & Transfer to Katra",
        description:
          "Pick up from Jammu Airport/Station. Drive to Katra (50 km). Check in to hotel. Evening free to prepare for the sacred trek.",
        meals: ["Dinner"],
        accommodation: "Hotel Ramada Katra or similar (4★)",
      },
      {
        day: 2,
        title: "Vaishno Devi Holy Shrine Trek",
        description:
          "Early morning start for the 12 km trek to the Holy Bhawan. After Darshan of Pindis, return to Katra by night (optional helicopter/pony transit).",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Ramada Katra or similar (4★)",
      },
      {
        day: 3,
        title: "Katra to Srinagar Drive",
        description:
          "Scenic road travel to Srinagar (220 km via Chenani-Nashri Tunnel). Check in at your Srinagar hotel by evening.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Grand Palace Srinagar or similar (3★)",
      },
      {
        day: 4,
        title: "Srinagar Local & Houseboat Experience",
        description:
          "Visit Mughal Gardens (Nishat, Shalimar). Check out from hotel and check in to the Luxury Houseboat. Enjoy an evening Shikara ride.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Lalit Grand Houseboat or similar",
      },
      {
        day: 5,
        title: "Gulmarg Day Trip",
        description:
          "Drive to Gulmarg (56 km). Experience the Gondola cable car ride to Phase 1 & 2. Enjoy snowy scenery and return to Srinagar hotel.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Grand Palace Srinagar or similar (3★)",
      },
      {
        day: 6,
        title: "Sonmarg Glacier Excursion",
        description:
          "Excursion to Sonmarg (80 km) or 'Meadow of Gold'. Visit Thajiwas Glacier on horse-back. Return to Srinagar.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Grand Palace Srinagar or similar (3★)",
      },
      {
        day: 7,
        title: "Pahalgam Leisure Day",
        description:
          "Drive to Pahalgam (96 km). Visit saffron fields and Lidder River. Return to Srinagar hotel.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Grand Palace Srinagar or similar (3★)",
      },
      {
        day: 8,
        title: "Srinagar Free Day & Local Shopping",
        description:
          "Full day at leisure in Srinagar. Explore local markets, shop for Pashmina shawls, dry fruits, and traditional woodwork.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Grand Palace Srinagar or similar (3★)",
      },
      {
        day: 9,
        title: "Srinagar to Katra Return Journey",
        description:
          "Checkout and drive back to Katra. Relax at the hotel in the evening.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Ramada Katra or similar (4★)",
      },
      {
        day: 10,
        title: "Katra to Jammu Airport & Departure",
        description:
          "Transfer to Jammu airport/railway station for your flight or train back home.",
        meals: ["Breakfast"],
        accommodation: "",
      },
    ],
    faqs: [
      {
        question: "How long is the trek to Vaishno Devi?",
        answer:
          "The trek from Katra (Ban Ganga) to the Bhawan is approximately 12.5 km each way. Most pilgrims complete the round-trip within 12 to 18 hours.",
      },
    ],
  },
  {
    slug: "char-dham-yatra",
    title: "Char Dham Yatra",
    subtitle: "The Ultimate Pilgrimage for Spiritual Salvation",
    category: "spiritual",
    destinations: ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath", "Haridwar"],
    duration: { days: 10, nights: 9 },
    groupSize: { min: 4, max: 26 },
    image: "/tours/char-dham-yatra.webp",
    gallery: [
      "photo-1464822759023-fed622ff2c3b",
      "photo-1544735716-392fe2489ffa",
      "photo-1596701062351-df5f8af54b85",
    ],
    pricePerPerson: 140000,
    packagePrice: 140000, // Starts from flat package price for 17-seat Tempo Traveller
    rating: 4.9,
    reviewCount: 380,
    popular: true,
    wishlistCount: 4500,
    highlights: [
      "Perform holy rituals at Yamunotri and take dip in Surya Kund",
      "Visit Gangotri Temple, birthplace of the sacred River Ganga",
      "Trek to Kedarnath Jyotirlinga shrine amidst snow-clad peaks",
      "Maha Abhishek Darshan at Badrinath Temple",
      "Witness Ganga Aarti at Har Ki Pauri, Haridwar",
    ],
    inclusions: [
      "Transport by Luxury 17-seater Tempo Traveller or 26-seater Bus",
      "9 nights hotel accommodations in standard guesthouses/hotels (twin sharing)",
      "Daily vegetarian breakfast and dinner",
      "Registration assistance for Char Dham Yatra and Kedarnath helicopter booking",
      "Professional driver with hill-driving experience, toll, parking, green permit fees",
    ],
    exclusions: [
      "Helicopter tickets for Kedarnath (needs pre-booking)",
      "Pony / Palki charges for Kedarnath trek (16 km) and Yamunotri trek (6 km)",
      "Personal puja offerings or VIP darshan fees",
      "Lunch, snacks, and mineral water",
    ],
    itinerary: [
      {
        day: 1,
        title: "Haridwar to Barkot",
        description:
          "Start early from Haridwar/Rishikesh. Drive to Barkot (220 km) via Mussoorie. Check in to the hotel/camp.",
        meals: ["Dinner"],
        accommodation: "Barkot Camp Resorts or similar",
      },
      {
        day: 2,
        title: "Barkot → Yamunotri Darshan → Barkot",
        description:
          "Drive to Janki Chatti (45 km). Trek 6 km to Yamunotri. Take a holy dip in Surya Kund, cook rice in hot springs to offer at temple. Trek back to Janki Chatti, drive back to Barkot.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Barkot Camp Resorts or similar",
      },
      {
        day: 3,
        title: "Haridwar to Uttarkashi",
        description:
          "Drive to Uttarkashi (90 km). Check in to hotel. Visit the famous Vishwanath Temple in the evening.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Shivlinga or similar",
      },
      {
        day: 4,
        title: "Uttarkashi → Gangotri → Uttarkashi",
        description:
          "Day excursion to Gangotri Temple (100 km). Take a holy dip in the Ganga (Bhagirathi). Perform puja and drive back to Uttarkashi hotel.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Shivlinga or similar",
      },
      {
        day: 5,
        title: "Uttarkashi to Guptkashi / Phata",
        description:
          "Scenic mountain drive to Guptkashi (220 km) along the Mandakini river. Check in to hotel and prepare for Kedarnath.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Mandakini or similar",
      },
      {
        day: 6,
        title: "Guptkashi to Kedarnath (Trek or Helicopter)",
        description:
          "Drive to Sonprayag/Gaurikund. Trek 16 km to Kedarnath Bhawan. (Helicopter users fly from Phata/Guptkashi). Attend evening Aarti. Stay overnight at Kedarnath.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "GMVN Tourist Bungalow or local guest house",
      },
      {
        day: 7,
        title: "Kedarnath Temple Darshan → Guptkashi Return",
        description:
          "Perform early morning Abhishek Puja. Trek down to Gaurikund. Return drive to Guptkashi hotel to rest.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Mandakini or similar",
      },
      {
        day: 8,
        title: "Guptkashi to Badrinath",
        description:
          "Drive to Badrinath via Joshimath (190 km). Check in to hotel. Evening visit to Badrinath Temple for Darshan and bath in Tapt Kund.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Sarovar Portico or similar",
      },
      {
        day: 9,
        title: "Badrinath to Rudraprayag / Srinagar (Uttarakhand)",
        description:
          "Morning visit to Mana Village (last Indian village near China border). Drive down to Rudraprayag (160 km). Visit the Alaknanda-Mandakini sangam.",
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel Alpine or similar",
      },
      {
        day: 10,
        title: "Rudraprayag to Haridwar / Rishikesh",
        description:
          "Drive back to Haridwar via Rishikesh sightseeing (Laxman Jhula, Ram Jhula). Drop off at Haridwar railway station. Yatra concludes.",
        meals: ["Breakfast"],
        accommodation: "",
      },
    ],
    faqs: [
      {
        question: "Is biometric registration mandatory?",
        answer:
          "Yes, registration with Uttarakhand Tourism is mandatory for all pilgrims. We provide full assistance in completing this registration online.",
      },
      {
        question: "What is the flat rate policy for Char Dham?",
        answer:
          "The starting package rate of ₹1,40,000 covers the entire round-trip booking of a luxury 17-seat Tempo Traveller, including driver, fuel, and hill permits, making it extremely cost-effective for large family pilgrim groups.",
      },
    ],
  },
];
