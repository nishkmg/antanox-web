"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MagneticCursor.module.css";

interface MagneticCursorProps {
  enabled?: boolean;
}

export default function MagneticCursor({ enabled = true }: MagneticCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor], [role='button']");

      if (interactive) {
        setIsHovering(true);
        const label = (interactive as HTMLElement).dataset.cursorLabel;
        const cursorType = (interactive as HTMLElement).dataset.cursor;

        if (cursorType === "arrow") {
          setHoverLabel("→");
        } else if (label) {
          setHoverLabel(label);
        } else {
          setHoverLabel(null);
        }
      } else {
        setIsHovering(false);
        setHoverLabel(null);
      }
    };

    const lerpFactor = 0.12;

    const animate = () => {
      currentPos.current.x +=
        (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y +=
        (targetPos.current.y - currentPos.current.y) * lerpFactor;

      if (cursor) {
        cursor.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [enabled]);

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} ${isHovering ? styles.hovering : ""}`}
      aria-hidden="true"
    >
      {hoverLabel && <span className={styles.label}>{hoverLabel}</span>}
    </div>
  );
}
