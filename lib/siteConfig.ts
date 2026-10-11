/**
 * Centralized Site Configuration
 * 
 * Canonical Domain Strategy:
 * - Production live domain on Vercel is https://www.yadhuvanshitours.com (with www and HTTPS).
 * - Apex domain (yadhuvanshitours.com) 308 redirects to www.
 * - Supports NEXT_PUBLIC_SITE_URL override for environment-specific deployments.
 */

const getSiteUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!envUrl) return "https://www.yadhuvanshitours.com";
  const cleaned = envUrl.replace(/\/+$/, "");
  // Ensure canonical production domain always uses https://www.yadhuvanshitours.com
  if (cleaned.includes("yadhuvanshitours.com") || cleaned.includes("yaduvanshitours.com")) {
    return "https://www.yadhuvanshitours.com";
  }
  return cleaned;
};

export const SITE_URL = getSiteUrl();

export const SITE_NAME = "Yaduvanshi Tours & Travels";
export const PHONE_NUMBER = "+918127929551";
export const EMAIL_ADDRESS = "manojyadav20101993@gmail.com";
