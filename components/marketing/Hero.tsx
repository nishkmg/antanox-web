"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useCapacity } from "@/hooks/useCapacity";
import { getCapacityBadgeText, getCapacityBadgeColor } from "@/lib/capacity";
import styles from "./Hero.module.css";

export default function Hero() {
  const { status } = useCapacity();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const context = ctx;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const isMobile = window.matchMedia("(hover: none)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReducedMotion) return;

    const nodeCount = width < 768 ? 80 : 200;
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    function draw() {
      context.clearRect(0, 0, width, height);

      context.fillStyle = "#0047FF";
      for (const node of nodes) {
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 80) {
          node.vx -= (dx / dist) * 0.02;
          node.vy -= (dy / dist) * 0.02;
        }

        node.x += node.vx;
        node.y += node.vy;

        node.vx *= 0.99;
        node.vy *= 0.99;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        context.beginPath();
        context.arc(node.x, node.y, 2, 0, Math.PI * 2);
        context.fill();
      }

      context.strokeStyle = "rgba(255, 255, 255, 0.04)";
      context.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            context.beginPath();
            context.moveTo(nodes[i].x, nodes[i].y);
            context.lineTo(nodes[j].x, nodes[j].y);
            context.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const badgeText = status
    ? getCapacityBadgeText(status)
    : "● ACCEPTING LIMITED ENGAGEMENTS — Q3 2026";

  const badgeVariant = status
    ? (getCapacityBadgeColor(status) as "cobalt" | "medium" | "default")
    : "cobalt";

  return (
    <section className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.statusBadge}>
        <Badge variant={badgeVariant} showDot>
          {badgeText}
        </Badge>
      </div>

      <div className={styles.content}>
        <h1 className={styles.headline}>
          <span className={styles.line}>Proprietary</span>
          <span className={styles.line}>Infrastructure.</span>
          <span className={styles.line}>Engineered for</span>
          <span className={styles.line}>Consequence.</span>
        </h1>

        <div className={styles.divider} />

        <p className={styles.subtext}>
          Digital architecture and security intelligence
          <br />
          for organizations where failure is not an option.
        </p>

        <div className={styles.ctas}>
          <Link href="/inquiry">
            <Button size="lg">Request an Initial Consultation →</Button>
          </Link>
          <a href="#services">
            <Button variant="ghost" size="lg">
              ↓ Explore
            </Button>
          </a>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span>↓</span>
      </div>
    </section>
  );
}
