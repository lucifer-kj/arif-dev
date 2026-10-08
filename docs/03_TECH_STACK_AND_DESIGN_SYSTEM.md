# 03. Tech Stack & Design System (Kolk Benchmark)

**Project**: Portfolio for **Arif** (Freelance Senior Software Engineer & Web Architect)  
**Design Benchmark**: Replicated Pixel-by-Pixel from `C:\Users\USER\Documents\Builds\kolk`  
**Design Philosophy**: Swiss-Modernist Editorial — Warm Linen Ivory surfaces, Deep Espresso Obsidian typography, Rich Burnt Terracotta / Signal Vermilion accents, and tactile paper elevation shadows.

---

## 1. Brand Identity & Visual Signature

* **Wordmark**: `Arif<span className="text-accent">.</span>` in tight negative tracking (`tracking-[-0.04em] font-semibold text-xl`).
* **Sub-Badge**: `Senior Software Engineer & Technical Architect`.
* **Micro-Labels**: `.label-xs` uppercase micro-labels (`0.6875rem`, `tracking-[0.14em]`, `font-medium`, `text-accent`).

---

## 2. Color System (OKLCH Tokens Replicated from Kolk)

```
┌────────────────────────────────────────────────────────────────────────┐
│                   KOLK SWISS COLOR TOKEN ARCHITECTURE                  │
├────────────────────┬────────────────────┬──────────────────────────────┤
│ 1. Canvas Layers   │ 2. Typography      │ 3. Signal Accents            │
│ --background:      │ --foreground:      │ --accent:                    │
│   oklch(0.985      │   oklch(0.2        │   oklch(0.58                 │
│   0.006 85)        │   0.006 50)        │   0.16 42)                   │
│   (#FAF8F5 Warm)   │   (#1C1917 Espresso│   (#C05621 Terracotta)       │
│ --surface:         │ --muted-foreground:│ --destructive:               │
│   oklch(0.965      │   oklch(0.5        │   oklch(0.577                │
│   0.008 85)        │   0.012 60)        │   0.245 27.325)              │
│   (#F4F1EB Soft)   │   (#78716C Umber)  │                              │
│ --card:            │                    │ --border:                    │
│   oklch(1 0 0)     │                    │   oklch(0.92                 │
│   (#FFFFFF Pure)   │                    │   0.006 85 Soft Hairline)    │
└────────────────────┴────────────────────┴──────────────────────────────┘
```

### Paper Shadows
* `--shadow-card`: `0 1px 2px oklch(0.2 0 0 / 6%)`
* `--shadow-lift`: `0 8px 24px -12px oklch(0.2 0 0 / 18%)`
* `--shadow-paper`: `0 1px 3px oklch(0.2 0.006 50 / 4%), 0 10px 24px -8px oklch(0.2 0.006 50 / 6%)`
* `--shadow-paper-lift`: `0 2px 6px oklch(0.2 0.006 50 / 5%), 0 20px 40px -12px oklch(0.2 0.006 50 / 12%)`

---

## 3. Typography Hierarchy

* **Primary Font**: `Inter` (loaded via `next/font/google`).
* **Headings**: `font-semibold tracking-[-0.035em] leading-[1.03] text-balance`.
* **Micro-Labels (`.label-xs`)**:
  ```css
  font-size: 0.6875rem;
  line-height: 1;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 500;
  ```

---

## 4. Architectural Patterns & Utilities

### 1. Hairline 96px Grid (`.hairline-grid`)
```css
background-image:
  linear-gradient(to right, var(--color-border) 1px, transparent 1px),
  linear-gradient(to bottom, var(--color-border) 1px, transparent 1px);
background-size: 96px 96px;
```

### 2. Tactile Case Card with Cursor Tracking
Each card in the `#work` grid tracks mouse coordinates on desktop with a floating cursor-following pill (`Inquire` / `Inspect`) that activates dynamically on hover.

### 3. Geometric Trade Signal Reticle
An animated vector architectural graphic in the hero featuring an orbit ring, 42-degree axis, and pulsing signal nodes (`trade-signal-node-a`, `trade-signal-node-b`, `trade-signal-node-c`).

### 4. Border-Collapsed Grid Sections
Grid items are styled with `overflow-hidden border border-border bg-border` and individual `bg-background p-6 lg:p-8` cells, creating crisp 1px borders between cells without double-border artifacts.

---

## 5. Technology Stack

* **Framework**: Next.js 15 (App Router, Static Site Generation)
* **Styling**: Tailwind CSS v4 + PostCSS with native OKLCH theme tokens
* **Scroll Engine**: Lenis momentum smooth scrolling (`lerp: 0.09`)
* **Conversion**: Cal.com React Embed + WhatsApp Direct Hotline (`wa.me`) + Direct Email (`arif@arif.build`)
