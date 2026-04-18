"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import styles from "./FooterCTA.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FooterCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const title = section.querySelector("h2");
    const button = section.querySelector("button");
    const note = section.querySelector("p");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        once: true,
      },
    });

    tl.fromTo(
      title,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }
    )
      .fromTo(
        button,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
        "-=0.4"
      )
      .fromTo(
        note,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "expo.out" },
        "-=0.3"
      );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
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
