export const DEFAULT_FALLBACK_IMAGE = "https://source.unsplash.com/random/80x80?profile";

const BROKEN_UNSPLASH_IDS: Record<string, string> = {
  "photo-1608958416715-4a5f36e4f35e": "photo-1544735716-392fe2489ffa",
  "photo-1561361513-2d000a50f0db": "photo-1605649487212-47bdab064df7",
  "photo-1596701062351-df5f8af54b85": "photo-1582510003544-4d00b7f74220",
  "photo-1494790108755-2616b612b786": "photo-1534528741775-53994a69daeb",
};

/**
 * Builds a clean image URL without broken query parameters or 404 Unsplash IDs.
 */
export function buildImageUrl(src: string, width?: number, height?: number): string {
  if (!src) {
    return DEFAULT_FALLBACK_IMAGE;
  }

  // If local static asset
  if (src.startsWith("/")) {
    return src;
  }

  // Map known broken IDs
  if (BROKEN_UNSPLASH_IDS[src]) {
    src = BROKEN_UNSPLASH_IDS[src];
  }

  // Handle full URLs or raw Unsplash photo IDs
  let baseUrl = src;
  if (!src.startsWith("http://") && !src.startsWith("https://")) {
    baseUrl = `https://images.unsplash.com/${src}`;
  }

  // Strip existing query string to avoid broken query parameters
  const [baseWithoutParams] = baseUrl.split("?");

  const params = new URLSearchParams();
  if (width) params.set("w", width.toString());
  if (height) params.set("h", height.toString());
  params.set("fit", "crop");
  params.set("auto", "format");
  params.set("q", "85");

  return `${baseWithoutParams}?${params.toString()}`;
}

/**
 * Error handler for Next.js <Image> component onError event
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc: string = DEFAULT_FALLBACK_IMAGE
) {
  const target = event.currentTarget;
  if (target.src !== fallbackSrc) {
    target.srcset = "";
    target.src = fallbackSrc;
  }
}
