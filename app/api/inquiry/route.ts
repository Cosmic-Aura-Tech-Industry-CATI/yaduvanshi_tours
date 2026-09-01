import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import {
  generateInquiryEmailHtml,
  generateCustomerConfirmationHtml,
  InquiryEmailPayload,
} from "@/lib/emailTemplates";

// Strict Zod schema for server validation
const inquirySchema = z.object({
  type: z.enum(["tour", "vehicle", "wedding", "custom"], {
    required_error: "Experience type is required",
  }),
  packageSlug: z.string().max(100).optional(),
  packageName: z.string().max(150).optional(),
  vehicleSlug: z.string().max(100).optional(),
  vehicleName: z.string().max(150).optional(),
  rentalType: z.enum(["local", "outstation"]).optional(),
  weddingVehicle: z.string().max(150).optional(),
  guestShuttle: z.string().max(100).optional(),
  customDestination: z.string().max(200).optional(),
  startDate: z.string().min(1, "Travel date is required").max(50),
  passengers: z.string().min(1, "Number of travelers is required").max(30),
  budget: z.string().max(100).optional(),
  name: z.string().min(2, "Full name must be at least 2 characters").max(100),
  phone: z.string().min(10, "Please provide a valid 10-digit phone number").max(20),
  email: z.string().email("Please provide a valid email").or(z.literal("")).optional(),
  notes: z.string().max(1500).optional(),
  message: z.string().max(1500).optional(),
  website: z.string().optional(), // Honeypot
});

export async function POST(request: Request) {
  let inquiryId = "INQ-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();

  try {
    const rawBody = await request.json();

    // Honeypot spam trap
    if (rawBody.website && typeof rawBody.website === "string" && rawBody.website.trim().length > 0) {
      console.warn(`Spam bot submission blocked: ${inquiryId}`);
      return NextResponse.json(
        { success: true, message: "Inquiry submitted successfully.", inquiryId },
        { status: 200 }
      );
    }

    // Server-side Zod validation
    const validationResult = inquirySchema.safeParse(rawBody);
    if (!validationResult.success) {
      const errorMsg = validationResult.error.errors[0]?.message || "Invalid inquiry data.";
      return NextResponse.json(
        { success: false, message: errorMsg },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check environment variables
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.INQUIRY_TO_EMAIL || "manojyadav20101993@gmail.com";
    const fromEmail = process.env.INQUIRY_FROM_EMAIL || "Yaduvanshi Tours <booking@yadhuvanshitours.com>";

    if (!resendApiKey || resendApiKey.includes("placeholder") || resendApiKey.startsWith("re_xxx")) {
      console.error(`Resend API configuration missing or placeholder: ${inquiryId}`);
      return NextResponse.json(
        {
          success: false,
          message: "Email service is currently unconfigured. Please contact us directly by phone or WhatsApp.",
        },
        { status: 500 }
      );
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }) + " (IST)";

    const payload: InquiryEmailPayload = {
      inquiryId,
      type: data.type,
      packageName: data.packageName || data.packageSlug,
      vehicleName: data.vehicleName || data.vehicleSlug,
      rentalType: data.rentalType,
      weddingVehicle: data.weddingVehicle,
      guestShuttle: data.guestShuttle,
      customDestination: data.customDestination,
      startDate: data.startDate,
      passengers: data.passengers,
      budget: data.budget,
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || undefined,
      notes: (data.notes || data.message || "").trim(),
      timestamp,
    };

    const resend = new Resend(resendApiKey);

    // 1. Send Agency Notification Email (Primary)
    const agencyEmailSubject = `New Travel Inquiry [${inquiryId}] — ${payload.name} (${payload.type.toUpperCase()})`;
    const agencyEmailHtml = generateInquiryEmailHtml(payload);

    const agencyResult = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: agencyEmailSubject,
      html: agencyEmailHtml,
    });

    if (agencyResult.error) {
      console.error(`Inquiry email failed: ${inquiryId}`, agencyResult.error);
      return NextResponse.json(
        {
          success: false,
          message: "We couldn't submit your inquiry right now. Please try again or contact us directly by phone or WhatsApp.",
        },
        { status: 500 }
      );
    }

    console.log(`Inquiry email sent successfully: ${inquiryId}`);

    // 2. Optional Customer Confirmation Email (Non-blocking)
    if (payload.email && payload.email.includes("@")) {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: [payload.email],
          subject: `We Received Your Travel Inquiry [${inquiryId}] — Yaduvanshi Tours & Travels`,
          html: generateCustomerConfirmationHtml(payload),
        });
        console.log(`Customer confirmation sent for: ${inquiryId}`);
      } catch (custError) {
        // Log error but do not fail the request since agency notification succeeded
        console.warn(`Customer confirmation failed for ${inquiryId}:`, custError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry submitted successfully.",
        inquiryId,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(`Inquiry submission exception: ${inquiryId}`, err);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process inquiry submission. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
