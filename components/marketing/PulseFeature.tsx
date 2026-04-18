"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import styles from "./PulseFeature.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PulseFeature() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const content = section.querySelector(`.${styles.content}`);
    const visual = section.querySelector(`.${styles.visual}`);
    const gauge = visual?.querySelector(`.${styles.gaugeFill}`);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        once: true,
      },
    });

    if (content) {
      tl.fromTo(
        content.children,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out",
        }
      );
    }

    if (visual) {
      tl.fromTo(
        visual,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "expo.out" },
        "-=0.5"
      );
    }

    if (gauge) {
      tl.fromTo(
        gauge,
        { strokeDashoffset: 251 },
        { strokeDashoffset: 60, duration: 1.2, ease: "expo.out" },
        "-=0.4"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.label}>Security Intelligence Layer</span>
          <h2 className={styles.title}>
            Pulse doesn&apos;t scan.
            <br />
            It understands.
          </h2>
          <p className={styles.description}>
            Continuous multi-vector surveillance of your digital assets.
            Every finding mapped to MITRE ATT&CK. Every risk quantified by
            the Antanox Risk Score.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>0–1000</span>
              <span className={styles.statLabel}>ARS Scale</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>MITRE</span>
              <span className={styles.statLabel}>ATT&CK</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>5-Vector</span>
              <span className={styles.statLabel}>Coverage</span>
            </div>
          </div>

          <Link href="/pulse">
            <Button>Request a Pulse Demonstration →</Button>
          </Link>
        </div>

        <div className={styles.visual}>
          <div className={styles.gauge}>
            <svg viewBox="0 0 200 120" className={styles.gaugeSvg}>
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="var(--color-surface-3)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="var(--color-cobalt)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="251"
                strokeDashoffset="251"
                className={styles.gaugeFill}
              />
            </svg>
            <div className={styles.gaugeValue}>
              <span className={styles.gaugeNumber}>487</span>
              <span className={styles.gaugeLabel}>ARS</span>
            </div>
          </div>

          <div className={styles.mockup}>
            <div className={styles.mockupHeader}>
              <span className={styles.mockupDot} />
              <span className={styles.mockupDot} />
              <span className={styles.mockupDot} />
            </div>
            <div className={styles.mockupContent}>
              <div className={styles.mockupBar}>
                <span>Critical</span>
                <span className={styles.mockupBarCritical}>2</span>
              </div>
              <div className={styles.mockupBar}>
                <span>High</span>
                <span className={styles.mockupBarHigh}>5</span>
              </div>
              <div className={styles.mockupBar}>
                <span>Medium</span>
                <span className={styles.mockupBarMedium}>11</span>
              </div>
              <div className={styles.mockupBar}>
                <span>Low</span>
                <span className={styles.mockupBarLow}>8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
