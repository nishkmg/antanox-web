"use client";

import { useState, useEffect, RefObject } from "react";

interface ScrollProgressOptions {
  targetRef?: RefObject<HTMLElement | null>;
  offset?: number;
}

export function useScrollProgress(options: ScrollProgressOptions = {}) {
  const { offset = 0 } = options;

  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;

      setProgress(Math.min(1, Math.max(0, scrollProgress + offset)));
      setIsVisible(scrollTop > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset]);

  return { progress, isVisible };
}
