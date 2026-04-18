import type { InquiryFormData, WaitlistFormData } from "./validations";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendInquiryConfirmation(
  data: InquiryFormData & { email?: string },
  referenceId: string
): Promise<EmailResult> {
  if (!RESEND_API_KEY || !data.email) {
    console.warn("RESEND_API_KEY not configured or no email provided, skipping email");
    return { success: true, messageId: "dev-mode" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Antanox <inquiries@antanox.com>",
        to: data.email,
        subject: `Inquiry Received — ${referenceId}`,
        html: `
          <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #F4F4F4; padding: 40px;">
            <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 24px;">Your inquiry has been received.</h1>
            <p style="color: #888888; line-height: 1.65; margin-bottom: 16px;">
              Reference: <strong style="color: #F4F4F4;">${referenceId}</strong>
            </p>
            <p style="color: #888888; line-height: 1.65; margin-bottom: 24px;">
              An Antanox principal will review your requirements and contact you within 2 business days.
            </p>
            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;" />
            <p style="color: #888888; font-size: 14px; line-height: 1.65;">
              <strong style="color: #F4F4F4;">What happens next:</strong><br/>
              → Your inquiry is reviewed for fit and scope<br/>
              → If accepted, you'll receive a consultation link<br/>
              → The consultation is 45 minutes, conducted via video
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend API error: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, messageId: result.id };
  } catch (error) {
    console.error("Failed to send inquiry confirmation:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function sendWaitlistConfirmation(
  data: WaitlistFormData,
  referenceId: string
): Promise<EmailResult> {
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured, skipping email");
    return { success: true, messageId: "dev-mode" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Antanox <inquiries@antanox.com>",
        to: data.email,
        subject: `Waitlist Confirmed — ${referenceId}`,
        html: `
          <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #F4F4F4; padding: 40px;">
            <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 24px;">You're on the waitlist.</h1>
            <p style="color: #888888; line-height: 1.65; margin-bottom: 16px;">
              Reference: <strong style="color: #F4F4F4;">${referenceId}</strong>
            </p>
            <p style="color: #888888; line-height: 1.65; margin-bottom: 24px;">
              We'll contact you when a slot opens that matches your engagement type. Waitlist is not first-come-first-served — we review fit, not just timing.
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend API error: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, messageId: result.id };
  } catch (error) {
    console.error("Failed to send waitlist confirmation:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
