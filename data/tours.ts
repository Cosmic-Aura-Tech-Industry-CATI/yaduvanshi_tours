export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TourPackage {
  slug: string;
  name: string;
  durationDays: number;
  region: "pilgrimage" | "north" | "west" | "south";
  startingPrice: number;
  pricingType: "per-vehicle" | "fixed-fleet";
  tagline: string;
  description: string;
  destinations: string[];
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: TourItineraryDay[];
}

export const TOURS_DATA: TourPackage[] = [
  {
    slug: "ayodhya-darshan",
    name: "Ayodhya Darshan Tour",
    durationDays: 2,
    region: "pilgrimage",
    startingPrice: 5500,
    pricingType: "per-vehicle",
    tagline: "Experience the sacred birth-land of Lord Rama.",
    description: "A profound spiritual journey into the heart of Ayodhya. Witness the newly constructed Ram Janmabhoomi Temple, Hanuman Garhi, and the serene evening Saryu Aarti.",
    destinations: ["Ayodhya", "Hanuman Garhi", "Kanak Bhawan", "Saryu River Ghats"],
    rating: 4.9,
    reviewsCount: 312,
    image: "/tours/ayodhya-darshan.webp",
    gallery: [
      "/tours/ayodhya-darshan.webp",
      "photo-1544735716-392fe2489ffa",
      "photo-1608958416715-4a5f36e4f35e"
    ],
    inclusions: ["AC Sedan / SUV transport", "Driver allowance, fuel, tolls & parking", "Local guide service at temple complex", "Complimentary mineral water bottles"],
    exclusions: ["Hotel accommodation", "VIP Darshan ticket charges", "Personal meals & prasad offerings"],
    itinerary: [
      { day: 1, title: "Hanuman Garhi & Saryu River Aarti", description: "Pick up from hotel/transit. Visit Hanuman Garhi and Kanak Bhawan. Attend Saryu river aarti in the evening." },
      { day: 2, title: "Ram Janmabhoomi Darshan", description: "Early morning darshan at Ram Janmabhoomi Temple. Visit Ram ki Paidi, check-out and drop off." }
    ]
  },
  {
    slug: "mathura-vrindavan",
    name: "Mathura-Vrindavan Pilgrimage",
    durationDays: 2,
    region: "pilgrimage",
    startingPrice: 11000,
    pricingType: "per-vehicle",
    tagline: "Walk the divine pathways of Lord Krishna's youth.",
    description: "Immerse yourself in the eternal love of Vrindavan and the holy birthplace of Krishna in Mathura. Visit Prem Mandir, Bankey Bihari, and Janmabhoomi.",
    destinations: ["Mathura Birthplace", "Vrindavan Prem Mandir", "Bankey Bihari Mandir", "Nidhivan"],
    rating: 4.8,
    reviewsCount: 220,
    image: "/tours/mathura-vrindavan.webp",
    gallery: [
      "/tours/mathura-vrindavan.webp",
      "photo-1600100397608-f010e6a394a1",
      "photo-1561361513-2d000a50f0db"
    ],
    inclusions: ["AC private vehicle (Sedan/SUV)", "Fuel, toll taxes, and driver allowance", "Vrindavan local sightseeing assistance"],
    exclusions: ["Pooja offerings & donation receipts", "Meals and tour guide fee"],
    itinerary: [
      { day: 1, title: "Krishna Janmabhoomi & Dwarkadhish", description: "Explore holy temples of Mathura. Visit Janmabhoomi temple and Yamuna river ghats for evening aarti." },
      { day: 2, title: "Bankey Bihari & Prem Mandir Light Show", description: "Drive to Vrindavan. Seek blessings at Bankey Bihari and watch the light show at Prem Mandir." }
    ]
  },
  {
    slug: "chitrakoot-tour",
    name: "Chitrakoot Pilgrimage Tour",
    durationDays: 2,
    region: "pilgrimage",
    startingPrice: 6500,
    pricingType: "per-vehicle",
    tagline: "Discover the forest refuge of Lord Rama's exile.",
    description: "Explore the scenic and spiritually charged hills of Chitrakoot. Visit Ramghat, Kamadgiri, Sati Anusuya Ashram, and the unique Gupt Godavari caves.",
    destinations: ["Ramghat", "Kamadgiri Hill", "Gupt Godavari Caves", "Sphatik Shila"],
    rating: 4.7,
    reviewsCount: 98,
    image: "photo-1600100397608-f010e6a394a1",
    gallery: ["photo-1600100397608-f010e6a394a1", "photo-1544735716-392fe2489ffa"],
    inclusions: ["AC car from Ayodhya/Varanasi", "Fuel charges & driver allowance", "All toll tax and parking fees"],
    exclusions: ["Boating charges at Ramghat", "Pooja/guide charges", "Accommodation"],
    itinerary: [
      { day: 1, title: "Ramghat & Kamadgiri Parikrama", description: "Visit the holy banks of Mandakini river and do the parikrama around Kamadgiri hill." },
      { day: 2, title: "Gupt Godavari & Hanuman Dhara", description: "Explore the naturally formed water stream caves of Gupt Godavari and climb up to Hanuman Dhara." }
    ]
  },
  {
    slug: "khatu-shyam-ji",
    name: "Khatu Shyam Ji – Salasar Balaji",
    durationDays: 3,
    region: "pilgrimage",
    startingPrice: 17000,
    pricingType: "per-vehicle",
    tagline: "Seek blessings of Shyam Baba and Hanuman Ji.",
    description: "A highly demanded pilgrimage across Rajasthan's most powerful spiritual sites: Khatu Shyam Ji, Salasar Balaji, and Jeen Mata temple.",
    destinations: ["Khatu Shyam Ji Temple", "Salasar Hanuman Dham", "Jeen Mata Temple"],
    rating: 4.9,
    reviewsCount: 180,
    image: "photo-1545232979-8bf34eb9757b",
    gallery: ["photo-1545232979-8bf34eb9757b", "photo-1600100397608-f010e6a394a1"],
    inclusions: ["AC Sedan / SUV transport", "Fuel, state road tax, tolls & driver stay"],
    exclusions: ["Hotel lodging", "VIP darshan entry tickets", "Food & beverage"],
    itinerary: [
      { day: 1, title: "Drive to Khatu Shyam Ji", description: "Pick up from Delhi/Jaipur. Drive to Khatu village. Perform evening darshan of Shyam Baba." },
      { day: 2, title: "Salasar Balaji Darshan", description: "Travel to Salasar Dham. Worship the uniquely bearded idol of Lord Hanuman." },
      { day: 3, title: "Jeen Mata & Departure", description: "Visit Jeen Mata temple on the way back and drop off at your transit point." }
    ]
  },
  {
    slug: "mahakal-omkareshwar",
    name: "Mahakal – Omkareshwar – Bhairav",
    durationDays: 3,
    region: "pilgrimage",
    startingPrice: 20000,
    pricingType: "per-vehicle",
    tagline: "Divine double Jyotirlinga tour in Madhya Pradesh.",
    description: "Experience the ultimate Shiva pilgrimage. Travel to Mahakaleshwar Ujjain (Bhasma Aarti) and the peaceful island Jyotirlinga of Omkareshwar.",
    destinations: ["Ujjain Mahakal", "Harsiddhi Mata", "Omkareshwar Jyotirlinga", "Kal Bhairav"],
    rating: 4.9,
    reviewsCount: 450,
    image: "/tours/mahakal-omkareshwar.webp",
    gallery: [
      "/tours/mahakal-omkareshwar.webp",
      "photo-1600100397608-f010e6a394a1",
      "photo-1544735716-392fe2489ffa"
    ],
    inclusions: ["AC SUV for group travel", "Bhasma Aarti registration guidance", "Fuel, state tax and driver expenses"],
    exclusions: ["Special darshan pass rates", "Boating at Narmada river", "Meals & hotel"],
    itinerary: [
      { day: 1, title: "Ujjain Arrival & Kal Bhairav Temple", description: "Arrive in Ujjain. Visit Kal Bhairav temple, Harsiddhi temple, and witness Shipra river aarti." },
      { day: 2, title: "Bhasma Aarti & Omkareshwar Drive", description: "Attend the famous 4 AM Bhasma Aarti at Mahakal. Afternoon drive to Omkareshwar island." },
      { day: 3, title: "Omkareshwar Darshan & Return", description: "Do darshan at Omkareshwar and Mamleshwar temples. Drive back to Indore/Ujjain for departure." }
    ]
  },
  {
    slug: "kashi-vishwanath",
    name: "Kashi Vishwanath & Ganga Aarti",
    durationDays: 2,
    region: "pilgrimage",
    startingPrice: 10500,
    pricingType: "per-vehicle",
    tagline: "Experience spiritual liberation in ancient Varanasi.",
    description: "A classic pilgrimage to Kashi Vishwanath temple, Sankat Mochan, Sarnath Buddhist sites, and the breathtaking Subah-e-Banaras morning boat ride.",
    destinations: ["Kashi Vishwanath Temple", "Dashashwamedh Ghat", "Sankat Mochan", "Sarnath"],
    rating: 4.9,
    reviewsCount: 512,
    image: "/tours/kashi-vishwanath.webp",
    gallery: [
      "/tours/kashi-vishwanath.webp",
      "photo-1596176530529-78163a4f7af2",
      "photo-1544735716-392fe2489ffa"
    ],
    inclusions: ["AC Sedan / SUV transport", "Fuel, parking, tolls and driver stay", "Morning boat ride in Ganges river"],
    exclusions: ["Local guide fee", "Hotel and meals", "Temple pooja tickets"],
    itinerary: [
      { day: 1, title: "Kashi Vishwanath & Evening Ganga Aarti", description: "Visit the golden temple of Shiva. Witness the iconic evening oil lamp Ganga Aarti from a boat." },
      { day: 2, title: "Subah-e-Banaras & Sarnath Sightseeing", description: "Experience morning prayers at Assi Ghat. Check-out and visit Sarnath where Lord Buddha gave his first sermon." }
    ]
  },
  {
    slug: "prayagraj-sangam",
    name: "Prayagraj Sangam Tour",
    durationDays: 2,
    region: "pilgrimage",
    startingPrice: 6500,
    pricingType: "per-vehicle",
    tagline: "Bathe in the confluence of the three holy rivers.",
    description: "Visit the holy Triveni Sangam, the historic Prayagraj Fort, Anand Bhawan (Nehru family home), and the legendary lying Hanuman temple.",
    destinations: ["Triveni Sangam", "Bade Hanuman Ji", "Anand Bhawan", "Allahabad Fort"],
    rating: 4.8,
    reviewsCount: 110,
    image: "photo-1596176530529-78163a4f7af2",
    gallery: ["photo-1596176530529-78163a4f7af2", "photo-1600100397608-f010e6a394a1"],
    inclusions: ["AC transport for all local sights", "Toll, parking and driver charges"],
    exclusions: ["Boat hire to Sangam point", "Anand Bhawan entry tickets"],
    itinerary: [
      { day: 1, title: "Triveni Sangam Snan & Anand Bhawan", description: "Take a boat to the Sangam confluence for a holy bath. Visit Anand Bhawan museum." },
      { day: 2, title: "Lying Hanuman & Fort Exploration", description: "Seek blessings at Bade Hanuman Mandir. Visit Akshaya Vat tree and drop off." }
    ]
  },
  {
    slug: "haridwar-rishikesh",
    name: "Haridwar – Rishikesh Spiritual getaway",
    durationDays: 2,
    region: "pilgrimage",
    startingPrice: 6500,
    pricingType: "per-vehicle",
    tagline: "Where the Ganges leaves the mountains.",
    description: "Explore the holy twin cities of Haridwar (Har Ki Pauri aarti) and Rishikesh (Laxman Jhula, Beatles Ashram, and adventure yoga centers).",
    destinations: ["Har Ki Pauri", "Mansa Devi Temple", "Laxman Jhula", "Triveni Ghat Rishikesh"],
    rating: 4.8,
    reviewsCount: 165,
    image: "photo-1561361513-2d000a50f0db",
    gallery: ["photo-1561361513-2d000a50f0db", "photo-1600100397608-f010e6a394a1"],
    inclusions: ["AC sedan transportation", "Driver allowance and fuel taxes"],
    exclusions: ["Cable car fees to Mansa Devi", "Rafting / adventure sports"],
    itinerary: [
      { day: 1, title: "Har Ki Pauri Evening Aarti", description: "Arrive in Haridwar. Visit Mansa Devi temple via ropeway and attend Ganga Aarti." },
      { day: 2, title: "Rishikesh Suspension Bridges & Yoga ashrams", description: "Drive to Rishikesh. Cross Laxman Jhula, visit Swarg Ashram and return drive." }
    ]
  },
  {
    slug: "nainital-tour",
    name: "Nainital Lake Escapade",
    durationDays: 3,
    region: "north",
    startingPrice: 9500,
    pricingType: "per-vehicle",
    tagline: "Relax by the pearly lakes of Kumaon.",
    description: "Unwind in the pristine hill station of Nainital. Take a boat ride on Naini Lake, view the snow peaks from China Peak, and explore Bhimtal.",
    destinations: ["Naini Lake", "Mall Road", "Naina Devi Temple", "Bhimtal & Sattal lakes"],
    rating: 4.8,
    reviewsCount: 142,
    image: "photo-1572979841890-e7f09f0611e9",
    gallery: ["photo-1572979841890-e7f09f0611e9", "photo-1582510003544-4d00b7f74220"],
    inclusions: ["AC private taxi (Sedan/SUV)", "Fuel, toll, parking and driver allowance"],
    exclusions: ["Boating fees", "Cable car tickets", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrival & Mall Road Walk", description: "Drive to Nainital. Check in and enjoy a peaceful stroll on Mall Road." },
      { day: 2, title: "Lake Tour (Bhimtal, Naukuchiatal)", description: "Visit the nearby lake district of Bhimtal, Sattal, and Naukuchiatal." },
      { day: 3, title: "Naina Peak View & Departure", description: "Capture beautiful mountain views from Naina Peak and drive back to Delhi." }
    ]
  },
  {
    slug: "mussoorie-tour",
    name: "Mussoorie – Queen of Hills",
    durationDays: 3,
    region: "north",
    startingPrice: 10500,
    pricingType: "per-vehicle",
    tagline: "Spectacular Doon valley views and cascading waterfalls.",
    description: "Explore Mussoorie and Landour. Visit Kempty Falls, take a ropeway to Gun Hill, and walk the scenic pine trails of Lal Tibba.",
    destinations: ["Kempty Falls", "Lal Tibba Landour", "Gun Hill", "Mall Road Mussoorie"],
    rating: 4.7,
    reviewsCount: 115,
    image: "photo-1582510003544-4d00b7f74220",
    gallery: ["photo-1582510003544-4d00b7f74220", "photo-1572979841890-e7f09f0611e9"],
    inclusions: ["Chauffeur-driven AC Sedan / SUV", "Tolls, parking, and state border permit fees"],
    exclusions: ["Waterfall activities fees", "Meals and guide assistance"],
    itinerary: [
      { day: 1, title: "Dehradun to Mussoorie Scenic Drive", description: "Pick up from Dehradun airport/railway station. Drive to Mussoorie and visit Mall Road." },
      { day: 2, title: "Kempty Falls & Gun Hill Sunset", description: "Have fun at Kempty Falls. Take a ropeway to Gun Hill point for panoramic sunset views." },
      { day: 3, title: "Quiet Landour & Lal Tibba Walk", description: "Visit the colonial town of Landour, grab pancakes, and return drive." }
    ]
  },
  {
    slug: "neem-karoli-kainchi-dham",
    name: "Neem Karoli Baba Kainchi Dham",
    durationDays: 3,
    region: "pilgrimage",
    startingPrice: 11500,
    pricingType: "per-vehicle",
    tagline: "Visit the world-famous spiritual sanctuary in Uttarakhand.",
    description: "A dedicated package to the sacred ashram of Neem Karoli Baba at Kainchi Dham. Combine it with local sightseeing in Nainital.",
    destinations: ["Kainchi Dham Ashram", "Naini Lake", "Bhimtal Lake"],
    rating: 4.9,
    reviewsCount: 380,
    image: "/tours/neem-karoli-kainchi-dham.webp",
    gallery: [
      "/tours/neem-karoli-kainchi-dham.webp",
      "photo-1572979841890-e7f09f0611e9",
      "photo-1582510003544-4d00b7f74220"
    ],
    inclusions: ["AC transport for entire circuit", "Driver night stay, tolls & fuel tax"],
    exclusions: ["Ashram donation receipts", "Accommodation & food"],
    itinerary: [
      { day: 1, title: "Drive to Nainital", description: "Pick up from Kathgodam/Delhi. Scenic drive up to Nainital. Check in." },
      { day: 2, title: "Divine Darshan at Kainchi Dham Ashram", description: "Spend peaceful morning hours meditating at Kainchi Dham ashram of Neem Karoli Baba." },
      { day: 3, title: "Bhimtal Scenic Drive & Drop off", description: "Visit Bhimtal Lake, click photos, and return drive to Kathgodam/Delhi." }
    ]
  },
  {
    slug: "kullu-manali",
    name: "Kullu Manali Valley Explorer",
    durationDays: 6,
    region: "north",
    startingPrice: 32000,
    pricingType: "per-vehicle",
    tagline: "Explore snow gorges, pine forests, and Solang Valley.",
    description: "A complete tour of Manali, Solang Valley, Rohtang Pass gateway, and Kasol/Manikaran in the beautiful Parvati Valley.",
    destinations: ["Manali Mall Road", "Solang Valley", "Hadimba Temple", "Kasol & Manikaran Sahib"],
    rating: 4.8,
    reviewsCount: 290,
    image: "/tours/kullu-manali.webp",
    gallery: [
      "/tours/kullu-manali.webp",
      "photo-1618172193763-c511deb635ca",
      "photo-1582510003544-4d00b7f74220"
    ],
    inclusions: ["Private AC Innova or Sedan", "State road taxes & driver allowances", "Solang Valley transfer"],
    exclusions: ["Rohtang Pass green permit charges", "Adventure paragliding/skiing packages"],
    itinerary: [
      { day: 1, title: "Delhi to Manali Overnight Journey", description: "Scenic drive from Delhi. Check in at hotel in Manali. Relax." },
      { day: 2, title: "Hadimba Temple & Local Manali Sightseeing", description: "Visit Hadimba temple, Vashisht hot water springs, and Tibetan Monastery." },
      { day: 3, title: "Solang Valley Adventure Sports", description: "Travel to Solang Valley for paragliding, quad biking, and zorbing." },
      { day: 4, title: "Kasol & Manikaran Hot Springs", description: "Day trip to Parvati Valley. Visit Manikaran Sahib Gurudwara hot springs." },
      { day: 5, title: "Shopping & Relaxation", description: "Shop at local markets for wooden crafts and shawls." },
      { day: 6, title: "Check-out & Return Drive", description: "Drive back to Delhi with sweet memories." }
    ]
  },
  {
    slug: "shimla-tour",
    name: "Shimla Hill Station Retreat",
    durationDays: 6,
    region: "north",
    startingPrice: 26000,
    pricingType: "per-vehicle",
    tagline: "Experience the summer capital of British India.",
    description: "Walk the historic Ridge of Shimla, visit the Jakhoo temple, and enjoy the snow slopes of Kufri. Optional toy train ride.",
    destinations: ["The Ridge Shimla", "Kufri Adventure Park", "Jakhoo Temple", "Mall Road"],
    rating: 4.7,
    reviewsCount: 198,
    image: "photo-1618172193763-c511deb635ca",
    gallery: ["photo-1618172193763-c511deb635ca", "photo-1582510003544-4d00b7f74220"],
    inclusions: ["AC Sedan / SUV transport", "Fuel, parking, toll taxes & driver allowance"],
    exclusions: ["Toy train tickets", "Horse ride in Kufri", "Meals"],
    itinerary: [
      { day: 1, title: "Delhi to Shimla Drive", description: "Pick up and scenic drive to Shimla. Check in at your hotel." },
      { day: 2, title: "Kufri Snow View & Yak Rides", description: "Drive to Kufri. Enjoy beautiful mountain views and adventure parks." },
      { day: 3, title: "Jakhoo Temple & Ridge Walk", description: "Visit the high Jakhoo Hanuman temple and take photos at the Ridge." },
      { day: 4, title: "Day trip to Chail", description: "Explore the quiet pine valleys of Chail and the world's highest cricket ground." },
      { day: 5, title: "Mall Road Shopping", description: "Spend a relaxing day exploring colonial buildings and cafes." },
      { day: 6, title: "Check-out & Return to Delhi", description: "Drive back to Delhi." }
    ]
  },
  {
    slug: "vaishno-devi",
    name: "Vaishno Devi – Gulmarg – Sonmarg",
    durationDays: 10,
    region: "north",
    startingPrice: 40000,
    pricingType: "per-vehicle",
    tagline: "The ultimate spiritual & scenic Kashmir package.",
    description: "Seek blessings of Vaishno Devi Mata in Katra. Drive to Kashmir valley to witness the scenic beauty of Srinagar (Shikara ride), Gulmarg (Gondola cable car), and Sonmarg glaciers.",
    destinations: ["Katra Vaishno Devi", "Srinagar Dal Lake", "Gulmarg Snow Fields", "Sonmarg Glaciers"],
    rating: 4.9,
    reviewsCount: 410,
    image: "/tours/vaishno-devi-kashmir.webp",
    gallery: [
      "/tours/vaishno-devi-kashmir.webp",
      "photo-1596176530529-78163a4f7af2",
      "photo-1544735716-392fe2489ffa"
    ],
    inclusions: ["AC Sedan/SUV for Jammu to Srinagar transfers", "State border permits, tolls and parking", "Dal Lake Shikara ride"],
    exclusions: ["Helicopter / pony tickets in Katra", "Gondola ride tickets in Gulmarg (must pre-book)"],
    itinerary: [
      { day: 1, title: "Jammu to Katra Transfer", description: "Pick up from Jammu and drive to Katra. Overnight stay." },
      { day: 2, title: "Vaishno Devi Yatra", description: "Day-long trek to holy Bhawan. Return to Katra for night stay." },
      { day: 3, title: "Katra to Srinagar Drive", description: "Drive through Jawahar tunnel to Srinagar. Check in to houseboat." },
      { day: 4, title: "Local Srinagar Mughal Gardens", description: "Visit Shalimar Bagh, Nishat Bagh, and enjoy evening boat ride." },
      { day: 5, title: "Gulmarg Day Trip", description: "Travel to Gulmarg. Play in the snow and ride the high Gondola cable car." },
      { day: 6, title: "Sonmarg Glacier Tour", description: "Visit the golden meadows of Sonmarg and the Sindh river." },
      { day: 7, title: "Pahalgam Valley Drive", description: "Explore Betaab Valley and saffron fields in Pahalgam." },
      { day: 8, title: "Srinagar Sightseeing", description: "Visit local handicraft centers and Shankaracharya temple." },
      { day: 9, title: "Srinagar to Jammu Return Drive", description: "Scenic return drive back to Jammu." },
      { day: 10, title: "Check-out & Transit Drop off", description: "Drop off at Jammu transit point." }
    ]
  },
  {
    slug: "jaipur-tour",
    name: "Jaipur Royal Pink City Tour",
    durationDays: 3,
    region: "west",
    startingPrice: 11500,
    pricingType: "per-vehicle",
    tagline: "Discover palaces, forts, and royal heritage of Rajasthan.",
    description: "Explore the historical Hawa Mahal, Amer Fort, City Palace, and Jantar Mantar observatory. Enjoy authentic Rajasthani food at Chokhi Dhani.",
    destinations: ["Amer Fort", "Hawa Mahal", "City Palace", "Jantar Mantar observatory"],
    rating: 4.8,
    reviewsCount: 198,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=400&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=400&fit=crop&q=80",
      "photo-1477587458883-47135fb7a0be"
    ],
    inclusions: ["AC premium Sedan / SUV", "Fuel, parking, state tax & driver allowance"],
    exclusions: ["Monument entry fees", "Chokhi Dhani dinner buffet tickets"],
    itinerary: [
      { day: 1, title: "Birla Temple & Chokhi Dhani", description: "Pick up and visit Birla Mandir. Evening visit to ethnic village resort Chokhi Dhani." },
      { day: 2, title: "Amer Fort & Jal Mahal Palace", description: "Explore the high Amer Fort (optional elephant ride). Stop at Jal Mahal for photos." },
      { day: 3, title: "Hawa Mahal & City Palace", description: "Visit the iconic wind palace and the royal residence museums before departure." }
    ]
  },
  {
    slug: "rajasthan-heritage",
    name: "Rajasthan Heritage Grand Tour",
    durationDays: 6,
    region: "west",
    startingPrice: 38000,
    pricingType: "per-vehicle",
    tagline: "The royal triangle of Jaipur, Jodhpur, and Udaipur.",
    description: "Witness the majestic forts of Jaipur, the blue streets of Jodhpur (Mehrangarh Fort), and the romantic lakes of Udaipur (City Palace boat ride).",
    destinations: ["Amer Fort Jaipur", "Mehrangarh Fort Jodhpur", "Lake Pichola Udaipur", "City Palace"],
    rating: 4.9,
    reviewsCount: 230,
    image: "photo-1477587458883-47135fb7a0be",
    gallery: ["photo-1477587458883-47135fb7a0be", "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=400&fit=crop&q=80"],
    inclusions: ["AC private taxi (Innova/Sedan)", "State road permit taxes for Rajasthan, tolls & driver stay"],
    exclusions: ["Lake Pichola boating fees", "Local tourist guide fees"],
    itinerary: [
      { day: 1, title: "Jaipur Sightseeing", description: "Explore the Pink City palaces: Hawa Mahal and Amer Fort." },
      { day: 2, title: "Drive to Jodhpur (Blue City)", description: "Travel to Jodhpur. Visit the massive Mehrangarh Fort and Jaswant Thada." },
      { day: 3, title: "Jodhpur to Udaipur via Ranakpur", description: "Drive to Udaipur. Stop at the famous marble Ranakpur Jain temple on the way." },
      { day: 4, title: "Udaipur Lake Pichola Boat Ride", description: "Enjoy a boat ride on Lake Pichola and tour the massive City Palace." },
      { day: 5, title: "Saheliyon-ki-Bari & Monsoon Palace", description: "Visit the royal gardens and enjoy hilltop views from the Monsoon Palace." },
      { day: 6, title: "Check-out & Transit Drop off", description: "Drop off at Udaipur transit point for departure." }
    ]
  },
  {
    slug: "goa-tour",
    name: "Goa Beach & Heritage Tour",
    durationDays: 4,
    region: "west",
    startingPrice: 24000,
    pricingType: "per-vehicle",
    tagline: "Sun, sand, historical forts, and Portuguese churches.",
    description: "Explore the beautiful beaches of North Goa (Baga, Calangute), the historical churches of Old Goa, and the majestic Dudhsagar Waterfalls.",
    destinations: ["Baga Beach", "Aguada Fort", "Basilica of Bom Jesus", "Dudhsagar Waterfalls"],
    rating: 4.8,
    reviewsCount: 302,
    image: "photo-1507525428034-b723cf961d3e",
    gallery: ["photo-1507525428034-b723cf961d3e", "photo-1477587458883-47135fb7a0be"],
    inclusions: ["AC car for all sightseeing days", "Fuel, parking, toll taxes and driver charges"],
    exclusions: ["Water sports activities fee", "Dudhsagar jeep safari fee"],
    itinerary: [
      { day: 1, title: "Arrival & North Goa Beaches", description: "Pick up from airport. Relax at Calangute and Baga beaches." },
      { day: 2, title: "Aguada Fort & Candolim Sunset", description: "Explore the Portuguese Aguada Fort and relax at Candolim beach." },
      { day: 3, title: "Old Goa Churches & Panaji Latin Quarter", description: "Visit Basilica of Bom Jesus and walk through the colorful Fontainhas." },
      { day: 4, title: "Dudhsagar Falls & Departure", description: "Visit the massive waterfalls and drop off at transit point." }
    ]
  },
  {
    slug: "kerala-tour",
    name: "Kerala Backwaters & Hills",
    durationDays: 5,
    region: "south",
    startingPrice: 28000,
    pricingType: "per-vehicle",
    tagline: "Experience God's Own Country in Munnar and Alleppey.",
    description: "Discover the lush tea estates of Munnar, the scenic lakes of Thekkady, and experience an authentic houseboat cruise in the Alleppey backwaters.",
    destinations: ["Munnar Tea Gardens", "Thekkady Spice Plantation", "Alleppey Houseboat", "Cochin Fort"],
    rating: 4.9,
    reviewsCount: 288,
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&h=400&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&h=400&fit=crop&q=80",
      "photo-1507525428034-b723cf961d3e"
    ],
    inclusions: ["AC vehicle (Innova/Sedan)", "Fuel, toll, parking and state permit fees", "Houseboat cruise with lunch"],
    exclusions: ["Kathakali show entry fee", "Spice plantation safari fee"],
    itinerary: [
      { day: 1, title: "Cochin to Munnar Drive", description: "Pick up and drive to Munnar. Visit Cheeyappara waterfalls on the way." },
      { day: 2, title: "Munnar Tea Estate Tour", description: "Explore green tea gardens, Eravikulam National Park, and Mattupetty Dam." },
      { day: 3, title: "Munnar to Thekkady Spice Tour", description: "Drive to Thekkady. Take a walk through spice plantations." },
      { day: 4, title: "Alleppey Houseboat Experience", description: "Drive to Alleppey. Check in to a premium houseboat for backwater cruising." },
      { day: 5, title: "Cochin Sightseeing & Departure", description: "See Chinese fishing nets in Cochin, and drop off at airport." }
    ]
  },
  {
    slug: "amritsar-wagah",
    name: "Amritsar Golden Temple Tour",
    durationDays: 3,
    region: "north",
    startingPrice: 9000,
    pricingType: "per-vehicle",
    tagline: "Visit the Golden Temple and witness the Wagah Border ceremony.",
    description: "Explore the holy Golden Temple, the historical Jallianwala Bagh, and enjoy the high-energy military flag lowering ceremony at the Wagah Border.",
    destinations: ["Golden Temple", "Jallianwala Bagh", "Wagah Border", "Partition Museum"],
    rating: 4.9,
    reviewsCount: 215,
    image: "photo-1514222134-b57cbb8ce073",
    gallery: ["photo-1514222134-b57cbb8ce073", "photo-1561361513-2d000a50f0db"],
    inclusions: ["AC Sedan / SUV transport", "Fuel, parking, toll taxes & driver allowance"],
    exclusions: ["Local guide fees", "Meals and personal shopping"],
    itinerary: [
      { day: 1, title: "Golden Temple at Night", description: "Pick up and check-in. Visit the Golden Temple, beautifully lit up in the evening." },
      { day: 2, title: "Jallianwala Bagh & Wagah Border Ceremony", description: "Visit the historical park. Drive to Wagah Border in the afternoon for the retreat ceremony." },
      { day: 3, title: "Partition Museum & Departure", description: "Visit the Partition Museum and drop off at transit point." }
    ]
  },
  {
    slug: "ujjain-indore",
    name: "Ujjain – Indore Weekend Tour",
    durationDays: 2,
    region: "pilgrimage",
    startingPrice: 7500,
    pricingType: "per-vehicle",
    tagline: "Explore Ujjain Mahakal & Indore food culture.",
    description: "Visit the ancient spiritual sites of Ujjain Mahakal, and experience the street food culture of Chappan Dukan and Sarafa Bazar in Indore.",
    destinations: ["Ujjain Mahakal", "Indore Rajwada Palace", "Chappan Dukan Street Food"],
    rating: 4.8,
    reviewsCount: 167,
    image: "photo-1600100397608-f010e6a394a1", // Fallback
    gallery: ["photo-1600100397608-f010e6a394a1", "photo-1544735716-392fe2489ffa"],
    inclusions: ["AC private taxi (Sedan/SUV)", "Fuel, toll, parking and driver charges"],
    exclusions: ["Mahakal VIP temple passes", "Meals and street food costs"],
    itinerary: [
      { day: 1, title: "Ujjain Mahakal Darshan", description: "Visit Mahakaleshwar temple, Kal Bhairav temple, and drive to Indore." },
      { day: 2, title: "Indore Rajwada & Chappan Dukan", description: "Explore the historical Rajwada palace and enjoy delicious food at Chappan Dukan." }
    ]
  },
  {
    slug: "dwarka-somnath",
    name: "Dwarka – Somnath Pilgrimage",
    durationDays: 4,
    region: "pilgrimage",
    startingPrice: 22000,
    pricingType: "per-vehicle",
    tagline: "Visit two of India's most sacred coastal temples.",
    description: "Explore the ancient kingdom of Dwarka (Lord Krishna's capital) and the magnificent Somnath Jyotirlinga on the shores of the Arabian Sea.",
    destinations: ["Dwarkadhish Temple", "Nageshwar Jyotirlinga", "Somnath Temple", "Triveni Sangam Somnath"],
    rating: 4.9,
    reviewsCount: 298,
    image: "photo-1545232979-8bf34eb9757b", // Fallback
    gallery: ["photo-1545232979-8bf34eb9757b", "photo-1600100397608-f010e6a394a1"],
    inclusions: ["AC Sedan / SUV transport", "Fuel, state border taxes, parking, tolls and driver stay"],
    exclusions: ["Local ferry boat to Bet Dwarka", "Temple pooja tickets"],
    itinerary: [
      { day: 1, title: "Arrival & Dwarka Sightseeing", description: "Pick up from Rajkot. Drive to Dwarka. Visit Dwarkadhish temple." },
      { day: 2, title: "Bet Dwarka & Nageshwar Jyotirlinga", description: "Take a ferry to Bet Dwarka island. Visit Nageshwar temple." },
      { day: 3, title: "Porbandar to Somnath Drive", description: "Drive to Somnath. Visit Somnath temple and witness light show." },
      { day: 4, title: "Bhalka Tirth & Departure", description: "Visit Bhalka Tirth and return drive to Rajkot for drop off." }
    ]
  },
  {
    slug: "rameshwaram-madurai",
    name: "Rameshwaram – Madurai Temple Tour",
    durationDays: 4,
    region: "pilgrimage",
    startingPrice: 24000,
    pricingType: "per-vehicle",
    tagline: "Holy temples and beaches of Tamil Nadu.",
    description: "Explore the magnificent Meenakshi temple in Madurai, the holy sea shores of Rameshwaram, Ramanathaswamy temple, and Dhanushkodi ghost town.",
    destinations: ["Madurai Meenakshi Temple", "Ramanathaswamy Temple", "Pamban Bridge", "Dhanushkodi"],
    rating: 4.9,
    reviewsCount: 198,
    image: "photo-1600100397980-0000b77cbb87",
    gallery: ["photo-1600100397980-0000b77cbb87", "photo-1545232979-8bf34eb9757b"],
    inclusions: ["AC car for entire route", "Tolls, state taxes, parking & driver stay"],
    exclusions: ["Pooja charges at temples", "Local jeep ride to Dhanushkodi beach"],
    itinerary: [
      { day: 1, title: "Madurai Meenakshi Temple", description: "Pick up and visit the magnificent Meenakshi temple." },
      { day: 2, title: "Drive to Rameshwaram & Pamban Bridge", description: "Scenic drive over Pamban bridge to Rameshwaram island." },
      { day: 3, title: "Ramanathaswamy Darshan & Dhanushkodi", description: "Seek blessings at the main temple. Explore the ruins of Dhanushkodi." },
      { day: 4, title: "Check-out & Return to Madurai", description: "Drive back to Madurai for drop off." }
    ]
  },
  {
    slug: "leh-ladakh",
    name: "Leh Ladakh Adventure Yatra",
    durationDays: 7,
    region: "north",
    startingPrice: 55000,
    pricingType: "per-vehicle",
    tagline: "High mountain passes, deep valleys, and blue lakes.",
    description: "Experience the magic of Ladakh. Drive through Khardung La (highest motorable pass), explore Nubra Valley, and camp beside Pangong Lake.",
    destinations: ["Leh Palace", "Khardung La Pass", "Nubra Valley", "Pangong Lake"],
    rating: 4.9,
    reviewsCount: 388,
    image: "photo-1590076214667-c0f3c7582b17",
    gallery: ["photo-1590076214667-c0f3c7582b17", "photo-1618172193763-c511deb635ca"],
    inclusions: ["AC Innova for Leh sightseeing", "Inner line permit fees for Ladakh", "All toll and parking taxes"],
    exclusions: ["Oxygen cylinder rental fees", "Double-humped camel ride in Nubra"],
    itinerary: [
      { day: 1, title: "Leh Arrival & Acclimatization Day", description: "Pick up and check in at hotel. Spend the day relaxing to adjust to high altitude." },
      { day: 2, title: "Magnetic Hill & Hall of Fame", description: "Visit Magnetic Hill, Gurudwara Pathar Sahib, and Leh Palace." },
      { day: 3, title: "Leh to Nubra Valley via Khardung La", description: "Scenic drive through the world's highest motorable pass to Nubra." },
      { day: 4, title: "Diskit Monastery & Hunder Sand Dunes", description: "Explore the giant Buddha statue and enjoy camel riding on white sand dunes." },
      { day: 5, title: "Nubra to Pangong Lake via Shyok", description: "Drive along Shyok river to the beautiful blue salt-water Pangong Lake." },
      { day: 6, title: "Pangong to Leh Return via Chang La", description: "Enjoy the morning lake views and drive back to Leh via Chang La pass." },
      { day: 7, title: "Check-out & Airport Drop off", description: "Drop off at Leh airport." }
    ]
  },
  {
    slug: "mumbai-tour",
    name: "Mumbai City Showcase",
    durationDays: 4,
    region: "west",
    startingPrice: 28000,
    pricingType: "per-vehicle",
    tagline: "Gateway of India, Marine Drive, and Bollywood vibes.",
    description: "Explore the bustling city of Mumbai. Walk along Marine Drive, take photos at the Gateway of India, and cross the Bandra-Worli Sea Link.",
    destinations: ["Gateway of India", "Marine Drive", "Siddhivinayak Temple", "Bandra-Worli Sea Link"],
    rating: 4.7,
    reviewsCount: 220,
    image: "photo-1566552881560-0be862a7c445",
    gallery: ["photo-1566552881560-0be862a7c445", "photo-1507525428034-b723cf961d3e"],
    inclusions: ["AC sedan transportation", "Fuel, parking, toll taxes and driver charges"],
    exclusions: ["Elephanta Caves ferry tickets", "Local entry fees"],
    itinerary: [
      { day: 1, title: "Gateway of India & Taj Palace", description: "Pick up and visit the Gateway of India. Walk along Marine Drive at sunset." },
      { day: 2, title: "Siddhivinayak Temple & Haji Ali Dargah", description: "Seek blessings at the holy temples and drive across the Bandra-Worli sea link." },
      { day: 3, title: "Elephanta Caves Day Trip", description: "Take a boat ride to the rock-cut cave temples of Elephanta island." },
      { day: 4, title: "Colaba Causeway Shopping & Departure", description: "Shop for souvenirs and drop off at transit point." }
    ]
  },
  {
    slug: "kashmir-paradise",
    name: "Kashmir Paradise Valley Tour",
    durationDays: 7,
    region: "north",
    startingPrice: 50000,
    pricingType: "per-vehicle",
    tagline: "Srinagar houseboats, Gulmarg Gondola & Pahalgam valley.",
    description: "An immersive week in the beautiful valleys of Kashmir. Stay in a luxury wooden houseboat, ride the Gondola, and visit Betaab Valley.",
    destinations: ["Dal Lake Houseboats", "Gulmarg Snow Hills", "Pahalgam Valley", "Sonmarg Glacier"],
    rating: 4.9,
    reviewsCount: 310,
    image: "photo-1598305072040-e22132e0e090",
    gallery: ["photo-1598305072040-e22132e0e090", "/tours/vaishno-devi-kashmir.webp"],
    inclusions: ["AC Sedan / SUV transport", "Fuel, toll, parking and driver charges", "Dal Lake Shikara boat ride"],
    exclusions: ["Gondola cable car ride tickets", "Pony rides / local cabs in Pahalgam"],
    itinerary: [
      { day: 1, title: "Srinagar Arrival & Houseboat Stay", description: "Pick up from Srinagar airport. Check in to a premium Dal Lake Houseboat." },
      { day: 2, title: "Local Srinagar Mughal Gardens", description: "Explore the Shalimar Bagh and Nishat Bagh royal gardens." },
      { day: 3, title: "Gulmarg Day Trip (Gondola Ride)", description: "Travel to Gulmarg. Play in the snow and ride the high Gondola cable car." },
      { day: 4, title: "Sonmarg Meadow of Gold", description: "Visit the glaciers and meadows of Sonmarg along the Sindh river." },
      { day: 5, title: "Pahalgam Valley Drive", description: "Drive to Pahalgam. Stop at saffron fields on the way." },
      { day: 6, title: "Betaab & Aru Valley Sightseeing", description: "Visit the beautiful valley locations where many Bollywood movies are shot." },
      { day: 7, title: "Check-out & Airport Drop off", description: "Drop off at Srinagar airport." }
    ]
  },
  {
    slug: "char-dham-yatra",
    name: "Char Dham Yatra (Uttarakhand)",
    durationDays: 10,
    region: "pilgrimage",
    startingPrice: 140000,
    pricingType: "fixed-fleet",
    tagline: "The ultimate Himalayan pilgrimage across the four holy shrines.",
    description: "Complete spiritual journey across Yamunotri, Gangotri, Kedarnath, and Badrinath. Chauffeur-driven Tempo Traveller or coaches for ultimate group safety.",
    destinations: ["Yamunotri Dham", "Gangotri Dham", "Kedarnath Jyotirlinga", "Badrinath Dham"],
    rating: 4.9,
    reviewsCount: 680,
    image: "/tours/char-dham-yatra.webp",
    gallery: [
      "/tours/char-dham-yatra.webp",
      "photo-1596176530529-78163a4f7af2",
      "photo-1544735716-392fe2489ffa"
    ],
    inclusions: ["Chauffeur-driven Tempo Traveller (17-seater)", "All state permits, hill tolls, fuel & driver stay", "Local yatra desk assistance"],
    exclusions: ["Helicopter/Pony booking in Kedarnath", "Hotel lodging", "Guide charges"],
    itinerary: [
      { day: 1, title: "Haridwar to Barkot", description: "Drive to Barkot. Prepare for the Yamunotri trek." },
      { day: 2, title: "Yamunotri Darshan", description: "Trek to Yamunotri. Take bath in hot springs and return to Barkot." },
      { day: 3, title: "Barkot to Uttarkashi", description: "Scenic drive along Bhagirathi river to Uttarkashi." },
      { day: 4, title: "Gangotri Dham Darshan", description: "Drive to Gangotri Dham. Take holy dip and return to Uttarkashi." },
      { day: 5, title: "Uttarkashi to Guptkashi", description: "Drive to Guptkashi. Prepare for the high Kedarnath trek." },
      { day: 6, title: "Guptkashi to Kedarnath Trek", description: "Trek up to the high Kedarnath temple. Witness evening prayers." },
      { day: 7, title: "Kedarnath to Guptkashi Return", description: "Perform morning pooja. Trek down and drive back to Guptkashi." },
      { day: 8, title: "Guptkashi to Badrinath", description: "Scenic drive to Badrinath. Attend evening aarti." },
      { day: 9, title: "Badrinath to Rudraprayag", description: "Perform holy bath at Tapt Kund and drive to Rudraprayag." },
      { day: 10, title: "Rudraprayag to Haridwar & Departure", description: "Drive back via Rishikesh to Haridwar for departure." }
    ]
  }
];
