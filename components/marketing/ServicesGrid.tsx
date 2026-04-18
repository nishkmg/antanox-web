"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "@/components/ui/Card";
import styles from "./ServicesGrid.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const cards = cardsRef.current?.querySelectorAll(`.${styles.card}`);
    if (!section || !cards?.length) return;

    const header = section.querySelector(`.${styles.header}`);
    const title = header?.querySelector("h2");
    const label = header?.querySelector("span");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        once: true,
      },
    });

    if (label) {
      tl.fromTo(
        label,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }
      );
    }

    if (title) {
      tl.fromTo(
        title,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
        "-=0.3"
      );
    }

    tl.fromTo(
      cards,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "expo.out" },
      "-=0.3"
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="services" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Services</span>
          <h2 className={styles.title}>What We Build</h2>
        </div>

        <div className={styles.grid} ref={cardsRef}>
          {services.map((service) => (
            <Link
              key={service.number}
              href={service.href}
              className={styles.cardLink}
            >
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
