import type { Metadata } from "next";
import Footer from "@/components/marketing/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — Antanox",
  description: "Privacy policy for Antanox Technologies OPC Pvt. Ltd.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last Updated: April 2026</p>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us, including your name,
              organization, email address, and details about your inquiry when you
              submit our contact or inquiry forms.
            </p>
          </section>

          <section className={styles.section}>
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to respond to your inquiries, process
              consultation requests, and communicate with you about our services.
              We do not sell or share your personal information with third parties
              for marketing purposes.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to
              fulfill the purposes for which it was collected, including to provide
              our services and comply with legal obligations.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us
              at <a href="mailto:privacy@antanox.com">privacy@antanox.com</a>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
