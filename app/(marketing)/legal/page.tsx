import type { Metadata } from "next";
import Footer from "@/components/marketing/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Legal — Antanox",
  description: "Legal information for Antanox Technologies OPC Pvt. Ltd.",
};

export default function LegalPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Legal</h1>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>Company Information</h2>
            <p>
              Antanox Technologies OPC Pvt. Ltd.
              <br />
              Registered in India
              <br />
              GSTIN: Available upon request
            </p>
          </section>

          <section className={styles.section}>
            <h2>Services</h2>
            <p>
              All services are provided subject to our engagement terms. Engagements
              are reviewed individually for fit and scope. Submission of an inquiry
              does not constitute a commitment to engage services.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and
              images, is the property of Antanox Technologies OPC Pvt. Ltd. or its
              content suppliers and is protected by applicable intellectual property
              laws.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Engagement Terms</h2>
            <p>
              Detailed engagement terms are provided upon acceptance of a proposal.
              Standard engagement terms include confidentiality obligations,
              deliverables schedules, and payment terms.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Disclaimer</h2>
            <p>
              While we strive to provide accurate and up-to-date information, this
              website is provided &ldquo;as is&rdquo; without warranties of any kind.
              Antanox Technologies OPC Pvt. Ltd. shall not be liable for any damages
              arising from the use of this website or our services.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Contact</h2>
            <p>
              For legal inquiries, please contact us at{" "}
              <a href="mailto:legal@antanox.com">legal@antanox.com</a>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
