import type { MetadataRoute } from "next";
import { TOURS_DATA } from "@/data/tours";
import { VEHICLES } from "@/data/vehicles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yaduvanshitours.com";
  const currentDate = new Date().toISOString();

  // Core high-priority landing & service pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/vehicles`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/weddings`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/inquiry`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  // Dynamic Tour Package pages (Ayodhya, Kashi, Char Dham, etc.)
  const tourPages: MetadataRoute.Sitemap = TOURS_DATA.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic Vehicle Rental pages (Swift, Innova, Force Urbania, Luxury Buses, etc.)
  const vehiclePages: MetadataRoute.Sitemap = VEHICLES.map((vehicle) => ({
    url: `${baseUrl}/vehicles/${vehicle.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...tourPages, ...vehiclePages];
}
