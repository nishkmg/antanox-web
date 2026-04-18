"use client";

import { useState, useEffect, useRef, RefObject } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

interface UseCursorOptions {
  lerpFactor?: number;
  enabled?: boolean;
}

export function useCursor(
  targetRef: RefObject<HTMLElement | null>,
  options: UseCursorOptions = {}
) {
  const { lerpFactor = 0.12, enabled = true } = options;

  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor-label]");
      if (interactive) {
        setIsHovering(true);
        const label = (interactive as HTMLElement).dataset.cursorLabel;
        setHoverLabel(label || null);
      } else {
        setIsHovering(false);
        setHoverLabel(null);
      }
    };

    const animate = () => {
      currentPos.current.x +=
        (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y +=
        (targetPos.current.y - currentPos.current.y) * lerpFactor;

      setPosition({
        x: currentPos.current.x,
        y: currentPos.current.y,
      });

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
  }, [enabled, lerpFactor]);

  return {
    position,
    isHovering,
    hoverLabel,
    cursorRef,
  };
}
