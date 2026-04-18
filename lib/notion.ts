import { Client, APIErrorCode } from "@notionhq/client";

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_INQUIRIES_DB_ID = process.env.NOTION_INQUIRIES_DB_ID;

interface InquiryRecord {
  fullName: string;
  organization: string;
  role: string;
  engagementType: string[];
  requirements: string;
  timeline?: string;
  budget?: string;
  email?: string;
}

interface WaitlistRecord {
  fullName: string;
  organization: string;
  email: string;
  engagementType: string[];
  context?: string;
}

export async function addToNotionInquiries(
  data: InquiryRecord,
  referenceId: string
): Promise<{ success: boolean; error?: string }> {
  if (!NOTION_API_KEY || !NOTION_INQUIRIES_DB_ID) {
    console.warn("Notion credentials not configured, skipping");
    return { success: true };
  }

  try {
    const notion = new Client({ auth: NOTION_API_KEY });

    await notion.pages.create({
      parent: { database_id: NOTION_INQUIRIES_DB_ID },
      properties: {
        "Reference ID": {
          title: [{ text: { content: referenceId } }],
        },
        "Full Name": {
          rich_text: [{ text: { content: data.fullName } }],
        },
        Organization: {
          rich_text: [{ text: { content: data.organization } }],
        },
        Role: {
          select: { name: data.role },
        },
        "Engagement Type": {
          multi_select: data.engagementType.map((t) => ({ name: t })),
        },
        Requirements: {
          rich_text: [{ text: { content: data.requirements } }],
        },
        ...(data.timeline && {
          Timeline: { select: { name: data.timeline } },
        }),
        ...(data.budget && {
          Budget: { select: { name: data.budget } },
        }),
        Status: {
          select: { name: "New" },
        },
        "Created At": {
          date: { start: new Date().toISOString() },
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to add to Notion:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function addToNotionWaitlist(
  data: WaitlistRecord,
  referenceId: string
): Promise<{ success: boolean; error?: string }> {
  if (!NOTION_API_KEY || !NOTION_INQUIRIES_DB_ID) {
    console.warn("Notion credentials not configured, skipping");
    return { success: true };
  }

  try {
    const notion = new Client({ auth: NOTION_API_KEY });

    await notion.pages.create({
      parent: { database_id: NOTION_INQUIRIES_DB_ID },
      properties: {
        "Reference ID": {
          title: [{ text: { content: referenceId } }],
        },
        "Full Name": {
          rich_text: [{ text: { content: data.fullName } }],
        },
        Organization: {
          rich_text: [{ text: { content: data.organization } }],
        },
        Email: {
          email: data.email,
        },
        "Engagement Type": {
          multi_select: data.engagementType.map((t) => ({ name: t })),
        },
        ...(data.context && {
          Context: { rich_text: [{ text: { content: data.context } }] },
        }),
        Status: {
          select: { name: "Waitlist" },
        },
        "Created At": {
          date: { start: new Date().toISOString() },
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to add waitlist to Notion:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
