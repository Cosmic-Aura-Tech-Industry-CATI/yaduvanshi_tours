export interface InquiryEmailPayload {
  inquiryId: string;
  type: "tour" | "vehicle" | "wedding" | "custom";
  packageName?: string;
  vehicleName?: string;
  rentalType?: "local" | "outstation";
  weddingVehicle?: string;
  guestShuttle?: string;
  customDestination?: string;
  startDate: string;
  passengers: string;
  budget?: string;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  timestamp: string;
}

export interface ContactEmailPayload {
  contactId: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  timestamp: string;
}

function sanitizeHtml(str: string = ""): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function generateInquiryEmailHtml(data: InquiryEmailPayload): string {
  const typeLabels: Record<string, string> = {
    tour: "Tour Package Booking",
    vehicle: "Vehicle Rental Reservation",
    wedding: "Wedding Travel Booking",
    custom: "Custom Trip Inquiry",
  };

  const cleanPhone = data.phone.replace(/[^0-9]/g, "");
  const formattedPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
    `Hello ${data.name}! Thank you for choosing Yaduvanshi Tours & Travels (Ref: ${data.inquiryId}). We received your booking request.`
  )}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Travel Inquiry - Yaduvanshi Tours & Travels</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c1519; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #d8cfc7;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0c1519; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #162127; border-radius: 16px; border: 1px solid rgba(207, 157, 123, 0.25); overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1b2830 0%, #0c1519 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid #e8b96a;">
              <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 700; letter-spacing: 3px; color: #e8b96a; text-transform: uppercase;">Yaduvanshi Tours & Travels</p>
              <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: bold; color: #ffffff; letter-spacing: 0.5px;">New Booking Inquiry</h1>
              <p style="margin: 0; font-size: 12px; color: #cf9d7b; font-family: monospace;">Reference ID: <strong>${sanitizeHtml(data.inquiryId)}</strong></p>
            </td>
          </tr>

          <!-- Meta Badge Bar -->
          <tr>
            <td style="background-color: rgba(232, 185, 106, 0.08); padding: 12px 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-size: 12px; color: #ffffff;">
                    <strong>Type:</strong> <span style="color: #e8b96a;">${typeLabels[data.type] || "Travel Inquiry"}</span>
                  </td>
                  <td align="right" style="font-size: 11px; color: #a19a94; font-family: monospace;">
                    ${sanitizeHtml(data.timestamp)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Section -->
          <tr>
            <td style="padding: 24px;">

              <!-- Customer Info Box -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(58, 53, 52, 0.25); border-radius: 12px; border: 1px solid rgba(207, 157, 123, 0.15); margin-bottom: 20px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: bold; color: #cf9d7b; text-transform: uppercase; letter-spacing: 1.5px;">Customer Contact Information</p>
                    
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="35%" style="padding: 4px 0; font-size: 13px; color: #a19a94;">Customer Name:</td>
                        <td style="padding: 4px 0; font-size: 14px; font-weight: 600; color: #ffffff;">${sanitizeHtml(data.name)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 13px; color: #a19a94;">Phone Number:</td>
                        <td style="padding: 4px 0; font-size: 14px; font-weight: 600; color: #e8b96a; font-family: monospace;">
                          <a href="tel:${cleanPhone}" style="color: #e8b96a; text-decoration: none;">+91 ${cleanPhone.replace(/^91/, "")}</a>
                        </td>
                      </tr>
                      ${data.email ? `
                      <tr>
                        <td style="padding: 4px 0; font-size: 13px; color: #a19a94;">Email Address:</td>
                        <td style="padding: 4px 0; font-size: 13px; color: #ffffff;">
                          <a href="mailto:${sanitizeHtml(data.email)}" style="color: #ffffff; text-decoration: underline;">${sanitizeHtml(data.email)}</a>
                        </td>
                      </tr>` : ""}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Trip Details Box -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(58, 53, 52, 0.25); border-radius: 12px; border: 1px solid rgba(207, 157, 123, 0.15); margin-bottom: 20px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: bold; color: #cf9d7b; text-transform: uppercase; letter-spacing: 1.5px;">Trip & Reservation Details</p>
                    
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      ${data.packageName ? `
                      <tr>
                        <td width="35%" style="padding: 4px 0; font-size: 13px; color: #a19a94;">Tour Package:</td>
                        <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #ffffff;">${sanitizeHtml(data.packageName)}</td>
                      </tr>` : ""}

                      ${data.customDestination ? `
                      <tr>
                        <td width="35%" style="padding: 4px 0; font-size: 13px; color: #a19a94;">Custom Destination:</td>
                        <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #ffffff;">${sanitizeHtml(data.customDestination)}</td>
                      </tr>` : ""}

                      ${data.vehicleName ? `
                      <tr>
                        <td width="35%" style="padding: 4px 0; font-size: 13px; color: #a19a94;">Vehicle Selected:</td>
                        <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #ffffff;">${sanitizeHtml(data.vehicleName)}</td>
                      </tr>` : ""}

                      ${data.rentalType ? `
                      <tr>
                        <td width="35%" style="padding: 4px 0; font-size: 13px; color: #a19a94;">Rental Type:</td>
                        <td style="padding: 4px 0; font-size: 13px; color: #ffffff; text-transform: capitalize;">${sanitizeHtml(data.rentalType)}</td>
                      </tr>` : ""}

                      ${data.weddingVehicle ? `
                      <tr>
                        <td width="35%" style="padding: 4px 0; font-size: 13px; color: #a19a94;">Wedding Car:</td>
                        <td style="padding: 4px 0; font-size: 13px; color: #ffffff;">${sanitizeHtml(data.weddingVehicle)}</td>
                      </tr>` : ""}

                      ${data.guestShuttle && data.guestShuttle !== "none" ? `
                      <tr>
                        <td width="35%" style="padding: 4px 0; font-size: 13px; color: #a19a94;">Guest Shuttle:</td>
                        <td style="padding: 4px 0; font-size: 13px; color: #ffffff;">${sanitizeHtml(data.guestShuttle)}</td>
                      </tr>` : ""}

                      <tr>
                        <td width="35%" style="padding: 4px 0; font-size: 13px; color: #a19a94;">Travel Date:</td>
                        <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #e8b96a;">${sanitizeHtml(data.startDate)}</td>
                      </tr>

                      <tr>
                        <td width="35%" style="padding: 4px 0; font-size: 13px; color: #a19a94;">Travelers / Seats:</td>
                        <td style="padding: 4px 0; font-size: 13px; color: #ffffff;">${sanitizeHtml(data.passengers)} Person(s)</td>
                      </tr>

                      ${data.budget ? `
                      <tr>
                        <td width="35%" style="padding: 4px 0; font-size: 13px; color: #a19a94;">Budget / Remarks:</td>
                        <td style="padding: 4px 0; font-size: 13px; color: #ffffff;">${sanitizeHtml(data.budget)}</td>
                      </tr>` : ""}
                    </table>
                  </td>
                </tr>
              </table>

              ${data.notes ? `
              <!-- Notes Box -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(232, 185, 106, 0.05); border-radius: 12px; border: 1px solid rgba(232, 185, 106, 0.2); margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: bold; color: #e8b96a; text-transform: uppercase; letter-spacing: 1px;">Customer Notes / Special Requests</p>
                    <p style="margin: 0; font-size: 13px; color: #ffffff; line-height: 1.5; font-style: italic;">"${sanitizeHtml(data.notes)}"</p>
                  </td>
                </tr>
              </table>` : ""}

              <!-- CTA Actions Bar -->
              <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: bold; color: #a19a94; text-transform: uppercase; letter-spacing: 1px; text-align: center;">Quick Response Actions</p>
              
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 8px;">
                    <!-- WhatsApp Button -->
                    <a href="${whatsappUrl}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #25D366; color: #ffffff; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 13px; margin: 4px; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);">
                      💬 Reply on WhatsApp
                    </a>
                    <!-- Direct Call Button -->
                    <a href="tel:${cleanPhone}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #e8b96a, #cf9d7b); color: #0c1519; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 13px; margin: 4px; box-shadow: 0 4px 15px rgba(232, 185, 106, 0.25);">
                      📞 Call Customer (+91 ${cleanPhone.replace(/^91/, "")})
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0f181c; padding: 20px 24px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 11px; color: #78716c; line-height: 1.6;">
              <p style="margin: 0 0 4px 0;"><strong>Yaduvanshi Tours & Travels</strong></p>
              <p style="margin: 0 0 4px 0;">Ramadevi Chauraha, Kanpur, Uttar Pradesh, India</p>
              <p style="margin: 0;">Phone: +91 81279 29551 • Email: manojyadav20101993@gmail.com</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function generateCustomerConfirmationHtml(data: InquiryEmailPayload): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inquiry Confirmation - Yaduvanshi Tours & Travels</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c1519; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #d8cfc7;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0c1519; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #162127; border-radius: 16px; border: 1px solid rgba(207, 157, 123, 0.25); overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
          
          <tr>
            <td style="background: linear-gradient(135deg, #1b2830 0%, #0c1519 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid #e8b96a;">
              <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 700; letter-spacing: 3px; color: #e8b96a; text-transform: uppercase;">Yaduvanshi Tours & Travels</p>
              <h1 style="margin: 0 0 8px 0; font-size: 22px; font-weight: bold; color: #ffffff;">Namaste, ${sanitizeHtml(data.name)}! 🙏</h1>
              <p style="margin: 0; font-size: 13px; color: #d8cfc7;">We have received your trip inquiry.</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px;">
              <p style="font-size: 14px; line-height: 1.6; color: #ffffff; margin-top: 0;">
                Thank you for choosing <strong>Yaduvanshi Tours & Travels</strong>. Our travel concierge has received your request and is preparing a tailored itinerary for you. We will contact you within <strong>15–30 minutes</strong>.
              </p>

              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(58, 53, 52, 0.25); border-radius: 12px; border: 1px solid rgba(207, 157, 123, 0.15); margin: 20px 0;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin: 0 0 10px 0; font-size: 11px; font-weight: bold; color: #cf9d7b; text-transform: uppercase; letter-spacing: 1px;">Your Booking Summary</p>
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 13px;">
                      <tr>
                        <td width="40%" style="padding: 4px 0; color: #a19a94;">Inquiry Ref:</td>
                        <td style="padding: 4px 0; font-weight: 600; color: #e8b96a; font-family: monospace;">${sanitizeHtml(data.inquiryId)}</td>
                      </tr>
                      ${data.packageName ? `
                      <tr>
                        <td style="padding: 4px 0; color: #a19a94;">Package:</td>
                        <td style="padding: 4px 0; font-weight: 600; color: #ffffff;">${sanitizeHtml(data.packageName)}</td>
                      </tr>` : ""}
                      ${data.vehicleName ? `
                      <tr>
                        <td style="padding: 4px 0; color: #a19a94;">Vehicle:</td>
                        <td style="padding: 4px 0; font-weight: 600; color: #ffffff;">${sanitizeHtml(data.vehicleName)}</td>
                      </tr>` : ""}
                      <tr>
                        <td style="padding: 4px 0; color: #a19a94;">Travel Date:</td>
                        <td style="padding: 4px 0; color: #ffffff;">${sanitizeHtml(data.startDate)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; color: #a19a94;">Travelers:</td>
                        <td style="padding: 4px 0; color: #ffffff;">${sanitizeHtml(data.passengers)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="font-size: 13px; color: #d8cfc7; line-height: 1.6; margin-bottom: 20px;">
                Need urgent assistance or want to confirm immediately? Feel free to reach our desk directly:
              </p>

              <div style="text-align: center; margin-bottom: 10px;">
                <a href="https://wa.me/918127929551" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #25D366; color: #ffffff; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 13px; margin: 4px;">
                  💬 Chat on WhatsApp (+91 81279 29551)
                </a>
                <a href="tel:+918127929551" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #e8b96a, #cf9d7b); color: #0c1519; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 13px; margin: 4px;">
                  📞 Call Us Directly
                </a>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background-color: #0f181c; padding: 20px 24px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 11px; color: #78716c;">
              <p style="margin: 0 0 4px 0;"><strong>Yaduvanshi Tours & Travels</strong></p>
              <p style="margin: 0;">Ramadevi Chauraha, Kanpur, Uttar Pradesh | +91 81279 29551</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function generateContactEmailHtml(data: ContactEmailPayload): string {
  const cleanPhone = data.phone.replace(/[^0-9]/g, "");
  const formattedPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
    `Hello ${data.name}! Thank you for contacting Yaduvanshi Tours & Travels (Ref: ${data.contactId}). How can we help you?`
  )}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Message - Yaduvanshi Tours & Travels</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c1519; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #d8cfc7;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0c1519; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #162127; border-radius: 16px; border: 1px solid rgba(207, 157, 123, 0.25); overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
          
          <tr>
            <td style="background: linear-gradient(135deg, #1b2830 0%, #0c1519 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid #e8b96a;">
              <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 700; letter-spacing: 3px; color: #e8b96a; text-transform: uppercase;">Yaduvanshi Tours & Travels</p>
              <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: bold; color: #ffffff;">New Contact Inquiry</h1>
              <p style="margin: 0; font-size: 12px; color: #cf9d7b; font-family: monospace;">Ref: <strong>${sanitizeHtml(data.contactId)}</strong> • ${sanitizeHtml(data.timestamp)}</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(58, 53, 52, 0.25); border-radius: 12px; border: 1px solid rgba(207, 157, 123, 0.15); margin-bottom: 20px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: bold; color: #cf9d7b; text-transform: uppercase; letter-spacing: 1.5px;">Contact Info</p>
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="35%" style="padding: 4px 0; font-size: 13px; color: #a19a94;">Name:</td>
                        <td style="padding: 4px 0; font-size: 14px; font-weight: 600; color: #ffffff;">${sanitizeHtml(data.name)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 13px; color: #a19a94;">Phone:</td>
                        <td style="padding: 4px 0; font-size: 14px; font-weight: 600; color: #e8b96a; font-family: monospace;">
                          <a href="tel:${cleanPhone}" style="color: #e8b96a; text-decoration: none;">+91 ${cleanPhone.replace(/^91/, "")}</a>
                        </td>
                      </tr>
                      ${data.email ? `
                      <tr>
                        <td style="padding: 4px 0; font-size: 13px; color: #a19a94;">Email:</td>
                        <td style="padding: 4px 0; font-size: 13px; color: #ffffff;">
                          <a href="mailto:${sanitizeHtml(data.email)}" style="color: #ffffff;">${sanitizeHtml(data.email)}</a>
                        </td>
                      </tr>` : ""}
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(232, 185, 106, 0.05); border-radius: 12px; border: 1px solid rgba(232, 185, 106, 0.2); margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: bold; color: #e8b96a; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                    <p style="margin: 0; font-size: 13px; color: #ffffff; line-height: 1.5; white-space: pre-wrap;">${sanitizeHtml(data.message)}</p>
                  </td>
                </tr>
              </table>

              <div style="text-align: center;">
                <a href="${whatsappUrl}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #25D366; color: #ffffff; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 13px; margin: 4px;">
                  💬 WhatsApp Customer
                </a>
                <a href="tel:${cleanPhone}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #e8b96a, #cf9d7b); color: #0c1519; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 13px; margin: 4px;">
                  📞 Call Customer
                </a>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background-color: #0f181c; padding: 20px 24px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 11px; color: #78716c;">
              <p style="margin: 0;"><strong>Yaduvanshi Tours & Travels</strong> • Kanpur Office Desk</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
