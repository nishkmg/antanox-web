import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const fadeInUp = (
  element: gsap.TweenTarget,
  options: {
    delay?: number;
    duration?: number;
    y?: number;
    opacity?: number;
  } = {}
) => {
  const { delay = 0, duration = 0.6, y = 16, opacity = 0 } = options;

  return gsap.fromTo(
    element,
    { y, opacity },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: "expo.out",
    }
  );
};

export const staggerFadeInUp = (
  elements: gsap.TweenTarget,
  options: {
    stagger?: number;
    delay?: number;
    duration?: number;
    y?: number;
  } = {}
) => {
  const { stagger = 0.1, delay = 0, duration = 0.6, y = 16 } = options;

  return gsap.fromTo(
    elements,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: "expo.out",
    }
  );
};

export const textReveal = (
  element: gsap.TweenTarget,
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
  } = {}
) => {
  const { delay = 0, duration = 0.9, stagger = 0.08 } = options;

  return gsap.fromTo(
    element,
    { clipPath: "inset(100% 0 0 0)", opacity: 0 },
    {
      clipPath: "inset(0% 0 0 0)",
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: "expo.out",
    }
  );
};

export const drawLine = (
  element: gsap.TweenTarget,
  options: {
    delay?: number;
    duration?: number;
  } = {}
) => {
  const { delay = 0, duration = 0.6 } = options;

  return gsap.fromTo(
    element,
    { scaleX: 0, transformOrigin: "left center" },
    {
      scaleX: 1,
      duration,
      delay,
      ease: "expo.out",
    }
  );
};

export const slideInFromRight = (
  element: gsap.TweenTarget,
  options: {
    delay?: number;
    duration?: number;
    x?: number;
  } = {}
) => {
  const { delay = 0, duration = 0.6, x = 40 } = options;

  return gsap.fromTo(
    element,
    { x, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration,
      delay,
      ease: "expo.out",
    }
  );
};

export const animateGauge = (
  element: gsap.TweenTarget,
  targetValue: number,
  options: {
    delay?: number;
    duration?: number;
  } = {}
) => {
  const { delay = 0, duration = 1.2 } = options;

  return gsap.fromTo(
    element,
    { strokeDashoffset: 100 },
    {
      strokeDashoffset: 100 - (targetValue / 1000) * 100,
      duration,
      delay,
      ease: "expo.out",
    }
  );
};
