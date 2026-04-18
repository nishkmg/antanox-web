import Link from "next/link";
import Button from "@/components/ui/Button";
import styles from "./FooterCTA.module.css";

export default function FooterCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Ready to build
          <br />
          something that lasts?
        </h2>

        <Link href="/inquiry">
          <Button size="lg">Request an Initial Consultation →</Button>
        </Link>

        <p className={styles.note}>
          Accepting limited engagements for Q3 2026.
          <br />
          Engagements are reviewed individually.
        </p>
      </div>
    </section>
  );
}
