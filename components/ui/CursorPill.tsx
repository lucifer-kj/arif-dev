"use client";

import React from "react";

interface CursorPillProps {
  x: number;
  y: number;
  active: boolean;
  label?: string;
}

export function CursorPill({ x, y, active, label = "View Live Project ↗" }: CursorPillProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute hidden lg:flex items-center gap-1.5 rounded-full bg-foreground/95 px-3.5 py-1.5 text-[11px] font-medium tracking-tight text-background shadow-paper-lift backdrop-blur-md transition-opacity duration-200 motion-reduce:hidden"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`,
        opacity: active ? 1 : 0,
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      <span>{label}</span>
    </div>
  );
}
