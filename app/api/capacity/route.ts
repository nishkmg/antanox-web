import { NextResponse } from "next/server";
import { getCapacityStatus } from "@/lib/capacity";

export const revalidate = 300;

export async function GET() {
  try {
    const status = getCapacityStatus();
    return NextResponse.json(status);
  } catch (error) {
    console.error("Capacity API error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to fetch capacity status" } },
      { status: 500 }
    );
  }
}
