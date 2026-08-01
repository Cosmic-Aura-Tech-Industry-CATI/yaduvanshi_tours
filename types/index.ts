// ─── Core data types for Yaduvanshi Tours ────────────────────────────────────

export interface TourPackage {
  slug: string;
  title: string;
  subtitle: string;
  category: "mountains" | "beach" | "heritage" | "wildlife" | "spiritual";
  destinations: string[];          // ["Shimla", "Manali", "Solang Valley"]
  duration: { days: number; nights: number };
  groupSize: { min: number; max: number };
  image: string;                   // Main photo URL / ID
  images?: string[];               // Array of 3 WebP image paths for auto-rotating carousel
  gallery: string[];               // Additional Unsplash IDs
  pricePerPerson: number;          // INR
  packagePrice: number;            // INR (group base price)
  rating: number;                  // 1–5
  reviewCount: number;
  popular: boolean;
  wishlistCount: number;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  faqs: FAQ[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals: ("Breakfast" | "Lunch" | "Dinner")[];
  accommodation: string;
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
