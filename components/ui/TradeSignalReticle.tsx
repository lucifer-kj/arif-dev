import React from "react";

export function TradeSignalReticle({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex items-center justify-center ${className}`}
    >
      <svg
        viewBox="0 0 320 320"
        className="h-full w-full max-w-[280px] sm:max-w-[320px] select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Grid Pattern */}
        <defs>
          <pattern id="reticle-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="0.75"
              strokeDasharray="2 2"
            />
          </pattern>
        </defs>

        <rect width="320" height="320" fill="url(#reticle-grid)" opacity="0.6" />

        {/* Outer Hairline Border */}
        <rect
          x="1"
          y="1"
          width="318"
          height="318"
          rx="16"
          stroke="var(--color-border)"
          strokeWidth="1.5"
        />

        {/* Center Crosshairs */}
        <line
          x1="160"
          y1="20"
          x2="160"
          y2="300"
          stroke="var(--color-border)"
          strokeWidth="1"
        />
        <line
          x1="20"
          y1="160"
          x2="300"
          y2="160"
          stroke="var(--color-border)"
          strokeWidth="1"
        />

        {/* 42-degree Architectural Axis */}
        <line
          x1="45"
          y1="275"
          x2="275"
          y2="45"
          stroke="var(--color-accent)"
          strokeWidth="1.25"
          strokeDasharray="4 4"
          opacity="0.8"
        />

        {/* Outer Orbit Ring */}
        <circle
          cx="160"
          cy="160"
          r="105"
          stroke="var(--color-border)"
          strokeWidth="1"
          strokeDasharray="3 6"
        />

        {/* Primary Signal Orbit Ring */}
        <circle
          cx="160"
          cy="160"
          r="72"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          className="origin-center animate-[spin_24s_linear_infinite] motion-reduce:animate-none"
          strokeDasharray="8 8"
        />

        {/* Inner Core Ring */}
        <circle
          cx="160"
          cy="160"
          r="36"
          stroke="var(--color-foreground)"
          strokeWidth="1.2"
          opacity="0.4"
        />

        {/* Pulse Node A (Top Right Axis) */}
        <g className="origin-center animate-[pulse_3.2s_ease-in-out_infinite] motion-reduce:animate-none">
          <circle cx="230" cy="90" r="12" fill="var(--color-accent)" opacity="0.15" />
          <circle cx="230" cy="90" r="5" fill="var(--color-accent)" />
          <circle cx="230" cy="90" r="2" fill="var(--color-background)" />
        </g>

        {/* Pulse Node B (Center Left Orbit) */}
        <g className="origin-center animate-[pulse_4s_ease-in-out_infinite_1s] motion-reduce:animate-none">
          <circle cx="88" cy="160" r="10" fill="var(--color-accent)" opacity="0.15" />
          <circle cx="88" cy="160" r="4.5" fill="var(--color-accent)" />
        </g>

        {/* Pulse Node C (Bottom Axis) */}
        <g className="origin-center animate-[pulse_3.6s_ease-in-out_infinite_2s] motion-reduce:animate-none">
          <circle cx="105" cy="215" r="9" fill="var(--color-accent)" opacity="0.12" />
          <circle cx="105" cy="215" r="4" fill="var(--color-accent)" />
        </g>

        {/* Reticle Corner Ticks */}
        <path d="M 24 34 L 24 24 L 34 24" stroke="var(--color-accent)" strokeWidth="1.5" />
        <path d="M 296 34 L 296 24 L 286 24" stroke="var(--color-accent)" strokeWidth="1.5" />
        <path d="M 24 286 L 24 296 L 34 296" stroke="var(--color-accent)" strokeWidth="1.5" />
        <path d="M 296 286 L 296 296 L 286 296" stroke="var(--color-accent)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
