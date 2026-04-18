import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validations";
import { sendInquiryConfirmation } from "@/lib/email";

function generateReferenceId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ANX-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = inquirySchema.safeParse(body);
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

    console.log("New inquiry received:", {
      referenceId,
      fullName: data.fullName,
      organization: data.organization,
      role: data.role,
      engagementType: data.engagementType,
      requirements: data.requirements.substring(0, 100) + "...",
      timeline: data.timeline,
      budget: data.budget,
    });

    const emailResult = await sendInquiryConfirmation(data, referenceId);
    if (!emailResult.success) {
      console.warn("Failed to send confirmation email:", emailResult.error);
    }

    return NextResponse.json({
      status: "success",
      referenceId,
      message: "Your inquiry has been received.",
    });
  } catch (error) {
    console.error("Inquiry API error:", error);
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
