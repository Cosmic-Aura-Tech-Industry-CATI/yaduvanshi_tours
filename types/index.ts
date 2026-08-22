// ─── Core data types for Yaduvanshi Tours ────────────────────────────────────

export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
  meals?: ("Breakfast" | "Lunch" | "Dinner")[];
  accommodation?: string;
}

export type ItineraryDay = TourItineraryDay;

export interface TourPackage {
  slug: string;
  name: string;
  title: string;                   // Guaranteed alias for name
  subtitle: string;                // Subtitle / tagline
  tagline: string;                 // Short punchy phrase
  description: string;             // Detailed description
  category: "mountains" | "beach" | "heritage" | "wildlife" | "spiritual" | string;
  region: "pilgrimage" | "north" | "west" | "south" | string;
  destinations: string[];          // ["Ayodhya", "Hanuman Garhi", "Saryu River"]
  durationDays: number;
  duration: { days: number; nights: number };
  groupSize: { min: number; max: number };
  image: string;                   // Main photo URL / path
  images?: string[];               // Array of WebP image paths
  gallery: string[];               // Additional image paths or IDs
  startingPrice: number;           // INR starting price
  pricePerPerson: number;          // INR
  packagePrice: number;            // INR (group base price)
  pricingType?: "per-vehicle" | "fixed-fleet";
  rating: number;                  // 1–5
  reviewsCount: number;
  reviewCount: number;             // Alias for reviewsCount
  popular: boolean;
  wishlistCount: number;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: TourItineraryDay[];
  faqs: FAQ[];
}

// ─── Vehicle / Rental ─────────────────────────────────────────────────────────

export type VehicleCategory =
  | "hatchback"
  | "sedan"
  | "suv"
  | "mpv"
  | "luxury"
  | "tempo-traveller"
  | "urbania"
  | "bus";

export type RentalType = "local" | "outstation" | "self-drive" | "with-driver";

export interface PriceRange { min: number; max: number }

export interface Vehicle {
  slug: string;
  name: string;
  brand: string;
  category: VehicleCategory;
  seats: number;
  luggageCapacity: number;         // bags
  fuel: "Petrol" | "Diesel" | "CNG" | "Electric";
  transmission: "Manual" | "Automatic";
  ac: boolean;
  image: string;                   // Unsplash photo ID
  images: string[];
  popular: boolean;
  selfDriveAvailable: boolean;
  withDriverAvailable: boolean;
  // Pricing
  localPriceDay: PriceRange;       // ₹/day
  outstationPriceKm: PriceRange;   // ₹/km
  outstationMinKm: number;         // minimum billable km
  driverAllowancePerDay: number;   // ₹/day if "with driver"
  tollsExtraNote: string;
  inclusions: string[];
  exclusions: string[];
  specs: Record<string, string>;
  faqs: FAQ[];
}

// ─── Destination ──────────────────────────────────────────────────────────────

export interface Destination {
  slug: string;
  name: string;
  state: string;
  tagline: string;
  description: string;
  image: string;                   // Unsplash photo ID
  bestTime: string;
  linkedPackageSlugs: string[];
  highlights: string[];
  faqs: FAQ[];
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export interface GalleryItem {
  id: string;
  unsplashId: string;
  image?: string;                  // Optional local image path
  caption: string;
  location: string;
  tall: boolean;                   // for masonry
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  name: string;
  location: string;
  avatarId: string;                // Unsplash photo ID
  rating: number;
  quote: string;
  packageOrVehicle?: string;
  date: string;                    // ISO date string
}

// ─── Shared ───────────────────────────────────────────────────────────────────

export interface FAQ {
  question: string;
  answer: string;
}
