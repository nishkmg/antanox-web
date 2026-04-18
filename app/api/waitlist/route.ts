import { NextRequest, NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/validations";
import { sendWaitlistConfirmation } from "@/lib/email";
import { addToNotionWaitlist } from "@/lib/notion";

function generateReferenceId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `WL-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = waitlistSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          status: "error",
          error: {
            code: "VALIDATION_FAILED",
            message: "Invalid form data",
            details: validation.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const data = validation.data;
    const referenceId = generateReferenceId();

    console.log("New waitlist signup:", {
      referenceId,
      fullName: data.fullName,
      organization: data.organization,
      email: data.email,
      engagementType: data.engagementType,
    });

    const [emailResult, notionResult] = await Promise.all([
      sendWaitlistConfirmation(data, referenceId),
      addToNotionWaitlist(
        {
          fullName: data.fullName,
          organization: data.organization,
          email: data.email,
          engagementType: data.engagementType,
          context: data.context,
        },
        referenceId
      ),
    ]);

    if (!emailResult.success) {
      console.warn("Failed to send waitlist confirmation email:", emailResult.error);
    }

    if (!notionResult.success) {
      console.warn("Failed to add waitlist to Notion:", notionResult.error);
    }

    return NextResponse.json({
      status: "success",
      referenceId,
      message: "You're on the waitlist.",
    });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      {
        status: "error",
        error: {
          code: "INTERNAL_ERROR",
          message: "An error occurred. Please try again.",
        },
      },
      { status: 500 }
    );
  }
}
