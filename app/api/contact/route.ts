import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { generateContactEmailHtml, ContactEmailPayload } from "@/lib/emailTemplates";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name (at least 2 characters)").max(100),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number").max(20),
  email: z.string().email("Please enter a valid email address").or(z.literal("")).optional(),
  message: z.string().min(2, "Please enter a message").max(2000),
  website: z.string().optional(), // Honeypot
});

export async function POST(request: Request) {
  const contactId = "CNT-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();

  try {
    const rawBody = await request.json();

    // Honeypot trap
    if (rawBody.website && typeof rawBody.website === "string" && rawBody.website.trim().length > 0) {
      console.warn(`Spam bot contact submission blocked: ${contactId}`);
      return NextResponse.json(
        { success: true, message: "Message sent successfully.", contactId },
        { status: 200 }
      );
    }

    const validation = contactSchema.safeParse(rawBody);
    if (!validation.success) {
      const errorMsg = validation.error.errors[0]?.message || "Invalid contact form submission.";
      return NextResponse.json(
        { success: false, message: errorMsg },
        { status: 400 }
      );
    }

    const data = validation.data;
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.INQUIRY_TO_EMAIL || "manojyadav20101993@gmail.com";
    const fromEmail = process.env.INQUIRY_FROM_EMAIL || "Yaduvanshi Tours <onboarding@resend.dev>";

    if (!resendApiKey || resendApiKey.includes("placeholder") || resendApiKey.startsWith("re_xxx")) {
      console.error(`Resend API configuration missing for contact: ${contactId}`);
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

    const payload: ContactEmailPayload = {
      contactId,
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || undefined,
      message: data.message.trim(),
      timestamp,
    };

    const resend = new Resend(resendApiKey);

    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New Contact Message [${contactId}] — ${payload.name}`,
      html: generateContactEmailHtml(payload),
    });

    if (result.error) {
      console.error(`Contact email failed: ${contactId}`, result.error);
      return NextResponse.json(
        {
          success: false,
          message: "We couldn't send your message right now. Please try again or contact us directly by phone or WhatsApp.",
        },
        { status: 500 }
      );
    }

    console.log(`Contact email sent successfully: ${contactId}`);

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully.",
        contactId,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(`Contact submission exception: ${contactId}`, err);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process message submission. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
