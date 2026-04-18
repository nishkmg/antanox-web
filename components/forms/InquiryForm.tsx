"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";
import type { InquiryFormData } from "@/lib/validations";
import { inquirySchema } from "@/lib/validations";
import { useCapacity } from "@/hooks/useCapacity";
import styles from "./InquiryForm.module.css";

const roleOptions = [
  { value: "Founder/CEO", label: "Founder/CEO" },
  { value: "CTO/CIO", label: "CTO/CIO" },
  { value: "CISO", label: "CISO" },
  { value: "Director", label: "Director" },
  { value: "Other", label: "Other" },
];

const timelineOptions = [
  { value: "Immediate", label: "Immediate" },
  { value: "1-3 months", label: "1–3 months" },
  { value: "3-6 months", label: "3–6 months" },
  { value: "Exploratory", label: "Exploratory" },
];

const budgetOptions = [
  { value: "₹1-5L", label: "₹1–5L" },
  { value: "₹5-15L", label: "₹5–15L" },
  { value: "₹15-50L", label: "₹15–50L" },
  { value: "₹50L+", label: "₹50L+" },
  { value: "Prefer to discuss", label: "Prefer to discuss" },
];

const engagementTypes = [
  "Digital Architecture",
  "Security Intelligence",
  "Portfolio Interface",
  "Combined",
];

export default function InquiryForm() {
  const { status } = useCapacity();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [serverError, setServerError] = useState("");

  const isAtCapacity = status?.state === "full";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      engagementType: [],
    },
  });

  const selectedEngagementTypes = watch("engagementType") || [];

  const onSubmit = async (data: InquiryFormData) => {
    setServerError("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || result.status === "error") {
        throw new Error(result.error?.message || "Submission failed");
      }

      setReferenceId(result.referenceId);
      setIsSubmitted(true);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  };

  if (isSubmitted) {
    return (
      <Card className={styles.success}>
        <h2 className={styles.successTitle}>Your inquiry has been received.</h2>
        <p className={styles.successText}>
          An Antanox principal will review your requirements and contact you
          within 2 business days.
        </p>
        <div className={styles.reference}>
          <span className={styles.referenceLabel}>Reference</span>
          <span className={styles.referenceId}>{referenceId}</span>
        </div>
        <div className={styles.nextSteps}>
          <h3>What happens next:</h3>
          <ol>
            <li>Your inquiry is reviewed for fit and scope</li>
            <li>If accepted, you&apos;ll receive a consultation link</li>
            <li>The consultation is 45 minutes, conducted via video</li>
          </ol>
        </div>
      </Card>
    );
  }

  return (
    <Card className={styles.form}>
      <div className={styles.header}>
        <span className={styles.label}>
          {isAtCapacity ? "WAITLIST" : "INITIAL CONSULTATION"}
        </span>
        <h1 className={styles.title}>
          {isAtCapacity
            ? "Engagements for Q3 2026 are filled."
            : "Tell us about your requirements."}
        </h1>
        <p className={styles.subtitle}>
          {isAtCapacity
            ? "Join the waitlist. We review waitlisted prospects for Q4 2026 availability."
            : "Consultations are reviewed individually. Expect a response within 2 business days."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.fields}>
        <div className={styles.row}>
          <Input
            label="Full Name *"
            placeholder="Enter your full name"
            error={errors.fullName?.message}
            {...register("fullName")}
          />
        </div>

        <div className={styles.row}>
          <Input
            label="Organization *"
            placeholder="Company or organization name"
            error={errors.organization?.message}
            {...register("organization")}
          />
        </div>

        <div className={styles.row}>
          <Select
            label="Your Role *"
            placeholder="Select your role"
            options={roleOptions}
            error={errors.role?.message}
            {...register("role")}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <label className={styles.pillsLabel}>Engagement Type *</label>
            <div className={styles.pills}>
              {engagementTypes.map((type) => (
                <label key={type} className={styles.pill}>
                  <input
                    type="checkbox"
                    value={type}
                    checked={selectedEngagementTypes.includes(type as any)}
                    {...register("engagementType")}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
            {errors.engagementType && (
              <span className={styles.pillError}>
                {errors.engagementType.message}
              </span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <Textarea
            label="Describe your requirements *"
            placeholder="Describe the problem you're trying to solve, your current infrastructure, and what success looks like."
            hint="Minimum 50 characters"
            error={errors.requirements?.message}
            {...register("requirements")}
          />
        </div>

        <div className={styles.rowTwo}>
          <Select
            label="Preferred timeline"
            options={timelineOptions}
            error={errors.timeline?.message}
            {...register("timeline")}
          />
          <Select
            label="Approximate budget"
            options={budgetOptions}
            error={errors.budget?.message}
            {...register("budget")}
          />
        </div>

        {serverError && (
          <div className={styles.serverError}>
            <span>{serverError}</span>
          </div>
        )}

        <div className={styles.submit}>
          <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
            {isSubmitting
              ? "Submitting..."
              : isAtCapacity
              ? "Join Waitlist →"
              : "Submit Inquiry →"}
          </Button>
        </div>

        <p className={styles.note}>
          Budget ranges help us scope the engagement accurately.
          <br />
          All discussions are confidential.
        </p>
      </form>
    </Card>
  );
}
