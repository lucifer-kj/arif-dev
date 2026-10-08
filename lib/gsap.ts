"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Reduced motion accessibility fallback
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.matches) {
    gsap.globalTimeline.timeScale(100);
    ScrollTrigger.config({ ignoreMobileResize: true });
  }
}

export { gsap, ScrollTrigger };
