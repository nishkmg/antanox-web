"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import styles from "./ServicesGrid.module.css";

const services = [
  {
    number: "01",
    title: "Digital Architecture",
    subtitle: "Infrastructure",
    description:
      "Proprietary infrastructure built for the long game. Systems designed for scale, security, and sustainment.",
    cta: "→ Architecture",
    href: "/pulse",
  },
  {
    number: "02",
    title: "Security Intelligence",
    subtitle: "Antanox Pulse",
    description:
      "Not a scanner. A continuous intelligence layer. Multi-vector surveillance mapped to MITRE ATT&CK.",
    cta: "→ Pulse",
    href: "/pulse",
  },
  {
    number: "03",
    title: "Wealth Interface",
    subtitle: "Portfolio Analytics",
    description:
      "Institutional-grade portfolio analytics for high-net-worth individuals. Precision meets discretion.",
    cta: "→ Portfolio",
    href: "/inquiry",
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Services</span>
          <h2 className={styles.title}>What We Build</h2>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <Link key={service.number} href={service.href} className={styles.cardLink}>
              <Card interactive className={styles.card}>
                <span className={styles.cardNumber}>{service.number}</span>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardSubtitle}>{service.subtitle}</p>
                <p className={styles.cardDescription}>{service.description}</p>
                <span className={styles.cardCta}>{service.cta}</span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
