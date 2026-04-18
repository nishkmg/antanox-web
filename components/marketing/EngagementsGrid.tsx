"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "@/components/ui/Card";
import styles from "./EngagementsGrid.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const engagements = [
  {
    industry: "Financial Services",
    year: "2025",
    title: "Full-stack security audit for a Series B fintech",
    description:
      "Infrastructure redesign following penetration test findings. Zero critical findings post-remediation.",
    metrics: [
      { label: "Critical findings post-remediation", value: "0" },
      { label: "ARS score improvement", value: "2.4×" },
    ],
  },
  {
    industry: "Healthcare Technology",
    year: "2025",
    title: "Continuous security monitoring implementation",
    description:
      "Antanox Pulse deployment across hybrid cloud infrastructure. HIPAA compliance validation.",
    metrics: [
      { label: "Assets monitored continuously", value: "47" },
      { label: "Mean time to detect", value: "94%" },
    ],
  },
];

export default function EngagementsGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelector(`.${styles.header}`);
    const cards = section.querySelectorAll(`.${styles.card}`);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
    });

    if (header) {
      tl.fromTo(
        header.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "expo.out" }
      );
    }

    tl.fromTo(
      cards,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "expo.out" },
      "-=0.3"
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Engagements</span>
          <h2 className={styles.title}>Outcomes, not opinions.</h2>
        </div>

        <div className={styles.grid}>
          {engagements.map((engagement) => (
            <Card key={engagement.title} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.industry}>{engagement.industry}</span>
                <span className={styles.year}>{engagement.year}</span>
              </div>

              <h3 className={styles.cardTitle}>{engagement.title}</h3>
              <p className={styles.cardDescription}>{engagement.description}</p>

              <div className={styles.divider} />

              <div className={styles.metrics}>
                {engagement.metrics.map((metric) => (
                  <div key={metric.label} className={styles.metric}>
                    <span className={styles.metricValue}>{metric.value}</span>
                    <span className={styles.metricLabel}>{metric.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
