import { z } from "zod";

export const inquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  organization: z.string().min(2, "Organization must be at least 2 characters"),
  role: z.enum(["Founder/CEO", "CTO/CIO", "CISO", "Director", "Other"], {
    message: "Please select your role",
  }),
  engagementType: z
    .array(z.enum(["Digital Architecture", "Security Intelligence", "Portfolio Interface", "Combined"]))
    .min(1, "Select at least one engagement type"),
  requirements: z
    .string()
    .min(50, "Please provide at least 50 characters describing your requirements"),
  timeline: z.enum(["Immediate", "1-3 months", "3-6 months", "Exploratory"], {
    message: "Please select a timeline",
  }),
  budget: z.enum(["₹1-5L", "₹5-15L", "₹15-50L", "₹50L+", "Prefer to discuss"], {
    message: "Please select a budget range",
  }),
  email: z.string().email().optional(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

export const waitlistSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  organization: z.string().min(2, "Organization must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  engagementType: z
    .array(z.enum(["Digital Architecture", "Security Intelligence", "Portfolio Interface", "Combined"]))
    .min(1, "Select at least one engagement type"),
  context: z.string().optional(),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;

export const demoRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  organization: z.string().min(2, "Organization must be at least 2 characters"),
  role: z.string().min(2, "Please enter your role"),
  primaryConcern: z.enum([
    "External attack surface",
    "Internal security posture",
    "Compliance requirements",
    "Cloud security",
    "DevSecOps",
    "Other",
  ]),
  assetsToMonitor: z.string().optional(),
});

export type DemoRequestFormData = z.infer<typeof demoRequestSchema>;
