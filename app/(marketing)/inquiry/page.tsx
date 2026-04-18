import type { Metadata } from "next";
import InquiryForm from "@/components/forms/InquiryForm";
import Footer from "@/components/marketing/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Initial Consultation — Antanox",
  description:
    "Request an initial consultation with Antanox. Tell us about your requirements and we'll review for fit and scope.",
};

export default function InquiryPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <InquiryForm />
      </div>
      <Footer />
    </main>
  );
}
