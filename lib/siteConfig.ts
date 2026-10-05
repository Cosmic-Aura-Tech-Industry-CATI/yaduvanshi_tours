/**
 * Centralized Site Configuration
 * 
 * Canonical Domain Strategy:
 * - Production live domain on Vercel is https://www.yadhuvanshitours.com (with www and HTTPS).
 * - Apex domain (yadhuvanshitours.com) 308 redirects to www.
 * - Supports NEXT_PUBLIC_SITE_URL override for environment-specific deployments.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.yadhuvanshitours.com"
).replace(/\/+$/, "");

export const SITE_NAME = "Yaduvanshi Tours & Travels";
export const PHONE_NUMBER = "+918127929551";
export const EMAIL_ADDRESS = "manojyadav20101993@gmail.com";
