import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <span className={styles.wordmark}>ANTANOX</span>
            <p className={styles.tagline}>Proprietary Infrastructure.</p>
          </div>

          <nav className={styles.nav}>
            <Link href="/pulse" className={styles.navLink}>
              Pulse
            </Link>
            <Link href="/privacy" className={styles.navLink}>
              Privacy
            </Link>
            <Link href="/legal" className={styles.navLink}>
              Legal
            </Link>
          </nav>

          <a href="mailto:name@antanox.com" className={styles.email}>
            name@antanox.com
          </a>
        </div>

        <div className={styles.bottom}>
          <span>© {currentYear} Antanox Technologies OPC Pvt. Ltd.</span>
        </div>
      </div>
    </footer>
  );
}
