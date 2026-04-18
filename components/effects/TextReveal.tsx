"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: "load" | "scroll";
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.9,
  stagger = 0.08,
  trigger = "scroll",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(container, { opacity: 1, clipPath: "none" });
      return;
    }

    const lines = container.querySelectorAll(".line");

    if (lines.length === 0) {
      gsap.fromTo(
        container,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "expo.out",
        }
      );
      return;
    }

    const tl = gsap.timeline({
      delay,
      ease: "expo.out",
    });

    if (trigger === "load") {
      tl.fromTo(
        lines,
        { clipPath: "inset(100% 0 0 0)", opacity: 0 },
        {
          clipPath: "inset(0% 0 0 0)",
          opacity: 1,
          duration,
          stagger,
          ease: "expo.out",
        }
      );
    } else {
      ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        onEnter: () => {
          tl.fromTo(
            lines,
            { clipPath: "inset(100% 0 0 0)", opacity: 0 },
            {
              clipPath: "inset(0% 0 0 0)",
              opacity: 1,
              duration,
              stagger,
              ease: "expo.out",
            }
          );
        },
        once: true,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [delay, duration, stagger, trigger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

interface TextRevealLineProps {
  children: ReactNode;
  className?: string;
}

export function TextRevealLine({ children, className = "" }: TextRevealLineProps) {
  return (
    <span className={`line ${className}`} style={{ display: "block", overflow: "hidden" }}>
      {children}
    </span>
  );
}
