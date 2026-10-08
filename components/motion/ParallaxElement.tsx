"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface ParallaxElementProps {
  children: ReactNode;
  /**
   * Parallax speed multiplier.
   * Positive value moves up as user scrolls down (e.g. 0.2).
   * Negative value moves down (e.g. -0.2).
   * Default: 0.15
   */
  speed?: number;
  className?: string;
  /**
   * Optional whether to enable only on desktop (default: true).
   */
  desktopOnly?: boolean;
}

export function ParallaxElement({
  children,
  speed = 0.15,
  className = "",
  desktopOnly = true,
}: ParallaxElementProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      // Honor user reduced-motion preference
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      // Check viewport width if desktopOnly is enabled
      if (desktopOnly && window.innerWidth < 768) {
        return;
      }

      const el = targetRef.current;
      if (!el) return;

      const yOffset = speed * 80;

      gsap.fromTo(
        el,
        { y: yOffset },
        {
          y: -yOffset,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: targetRef, dependencies: [speed, desktopOnly] }
  );

  return (
    <div ref={targetRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
