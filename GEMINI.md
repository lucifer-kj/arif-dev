# Project Rules: Arif Portfolio

These rules are project-specific constraints that govern all work in this repository. Follow them on every turn without exception.

---

## 1. Identity & Design Benchmark
* **Owner & Brand**: Portfolio for **Arif** (Freelance Senior Software Engineer & Web Architect). Solo individual practitioner — strictly NOT an agency.
* **Target Audience & Market**: Indian businesses, D2C brands, SMEs, and tech founders. Focused on real business outcomes: fast mobile rendering on cellular connections (Jio/Airtel 4G/5G), direct WhatsApp conversion, zero agency middlemen, and 100% client code/asset ownership.
* **Copy & Tone**: Plain, direct, jargon-free English that Indian business owners instantly understand. Avoid bloated developer jargon when clear business benefits can be stated. Confident, respectful, and evidence-driven—never adversarial or making unverified claims.
* **Commercial Tiers & Pricing**:
  - High-Converting Landing Pages: Starting at ₹18,000 – ₹32,000 (typical 3–5 days).
  - Complete Business Websites: Starting at ₹45,000 – ₹75,000 (typical 8–12 days).
  - Custom Web Apps / E-Commerce: Starting at ₹90,000 – ₹1,60,000 (typical 2–3 weeks).
  - Monthly Peace of Mind Retainer: ₹15,000/month (cancel anytime).
* **Reference & Design System**: Replicated pixel-by-pixel from `C:\Users\USER\Documents\Builds\kolk`:
  - **Swiss-Modernist Aesthetic**: Warm Linen Ivory Canvas (`oklch(0.985 0.006 85)` / `#FAF8F5`), Deep Espresso Obsidian Typography (`oklch(0.2 0.006 50)` / `#1C1917`), Soft Warm Surface (`oklch(0.965 0.008 85)` / `#F4F1EB`), Rich Burnt Terracotta / Signal Vermilion Accent (`oklch(0.58 0.16 42)` / `#C05621`).
  - **Typography**: Clean Swiss grotesque (**Inter** via `next/font/google`), tight tracking (`tracking-[-0.035em]`), and signature `.label-xs` micro-labels.
  - **Visual Language**: Hairline 96px grid (`hairline-grid`), border-collapse tables, paper-elevation shadows (`shadow-paper`, `shadow-paper-lift`), tactile cards with cursor-following floating pills, and the animated geometric trade-signal reticle.

---

## 2. Package Manager & Tooling Constraints
* **ALWAYS use `pnpm`**: Never run `npm`, `yarn`, or `bun`. Use `pnpm install`, `pnpm add <pkg>`, `pnpm run build`, `pnpm dev`, `pnpm.cmd run typecheck`, etc.
* **Strict lockfile**: Keep `pnpm-lock.yaml` clean and committed.
* **TypeScript Strict Mode**: Zero `any` types; all component props and functions must be strictly typed.

---

## 3. Architecture & Anti-Overengineering Rules
* **Minimum Architecture Necessary**: Minimum complexity that cleanly satisfies the requirement.
* **No Unjustified Dependencies**: Never install a package before verifying that native browser, Web APIs, or Next.js built-ins cannot solve the problem.
* **Server Components by Default**: Write clean React Server Components; restrict `"use client"` exclusively to isolated interactive leaves.
* **No Database Overhead**: Static-first portfolio. Core content pages are 100% statically generated (SSG) at build time for instant TTFB. Zero runtime database calls for portfolio content.
* **No Unnecessary State Libraries**: Do not add Redux, Zustand, or Jotai when React native state (`useState`, `useActionState`) or URL params suffice.
* **CSS First Over Heavy JS Animation**: Use lightweight CSS transitions and transforms where possible. Avoid heavy 3D or physics engines.
* **Graceful Degradation**: Core navigation, content, and conversion rails must function cleanly if JavaScript is disabled or fails to load.

---

## 4. Claim Safety & Evidence Rules (Mandatory)
The implementation agent must **NEVER** fabricate or hallucinate:
* Client company names, founder identities, or fabricated testimonials.
* Unverified revenue numbers, conversion lifts, ROAS multipliers, or speed percentages.
* Hardcoded fake "live" telemetry (e.g., claiming a static number is a live RUM query).
* Absolute universal guarantees that cannot be contractually or technically controlled (e.g., never say "guaranteed 100/100 PageSpeed on every device" or "guaranteed sub-second on Jio 4G"). Use evidence-based phrasing: *"Target"*, *"Designed for"*, *"Latest verified benchmark"*, *"Typical"*.
* If real data is missing, the agent must **ASK** the user or explicitly mark the field with `[PLACEHOLDER - PENDING CLIENT VERIFICATION]`.

---

## 5. Design System Protection & Interaction Prudence
* Preserve the Kolk benchmark faithfully: Warm Linen, Espresso Obsidian, Terracotta Accent, hairline grid, and paper elevations.
* **Interaction Purpose Test**: For every interaction or hover effect, ask:
  1. Does this improve comprehension?
  2. Does this establish visual hierarchy?
  3. Does this aid conversion?
  4. Does this provide necessary feedback?
  * If the answer is no, **remove it**. Accessibility and performance take precedence over decorative decoration.

---

## 6. Media & Asset Performance Rules
* **LCP Protection**: Never block Largest Contentful Paint with unoptimized hero images or background videos.
* **Lazy Loading**: All below-the-fold media must be lazy-loaded with explicit `width` and `height` to prevent layout shift (`CLS = 0.00`).
* **Modern Formats**: Use WebP or AVIF for raster graphics; SVGs for icons and line art.
* **Reduced Motion**: All animations and video loops must immediately halt or fallback to static stills when `prefers-reduced-motion: reduce` is detected.
* **No Autoplay Audio**: Any video assets must be strictly muted (`muted playsinline loop`).

---

## 7. Third-Party Service Budget & Fallbacks
Third-party services must be strictly documented and never constitute single points of failure:
* **WhatsApp (`wa.me`)**: Fallback contact channel. Does not load external scripts; uses static encoded anchor links.
* **Cal.com**: Embedded on `#contact` via dynamic import. Must fail gracefully to direct email or WhatsApp if blocked by client network/CSP.
* **Analytics/RUM**: Privacy-safe, zero-PII metrics collection only. Must not block critical render paths.

---

## 8. Cross-Phase Accessibility & Responsive Standards
* **WCAG 2.2 AA Compliance**:
  - Color contrast ratio ≥ 4.5:1 for body copy; ≥ 3:1 for large headings and UI borders.
  - Visible focus rings (`focus-visible:ring-2 focus-visible:ring-accent`) on all interactive elements.
  - Minimum touch targets of 44×44px on mobile devices.
  - No keyboard traps; modal/drawer components must trap focus intentionally and close on `Escape`.
* **Mobile-First Responsive Verification**:
  - Components must render without horizontal scroll or overflow across:
    `320px`, `360px`, `375px`, `390px`, `412px`, `768px`, `820px`, `1024px`, `1280px`, `1440px`, and `1920px`.

---

## 9. Mandatory Implementation Agent Execution Protocol

Future implementation agents executing any phase in this repository must follow this sequential protocol:

```
EXPLORE  ──>  PLAN  ──>  CONFIRM SCOPE  ──>  IMPLEMENT  ──>  VERIFY  ──>  REVIEW DIFF  ──>  REPORT
```

1. **EXPLORE**: Read and inspect all relevant files, existing utilities, and dependencies before modifying code.
2. **PLAN**: Outline the exact files to create or modify, identify dependency impacts, and anticipate security/accessibility risks.
3. **CONFIRM SCOPE**: Stay strictly within the bounds of the assigned phase. Do not refactor unrelated code.
4. **IMPLEMENT**: Write clean, strictly typed code adhering to the design system and architectural constraints.
5. **VERIFY**:
   - Run typecheck (`pnpm.cmd run typecheck` or `node_modules/.bin/tsc --noEmit`).
   - Run production build (`pnpm.cmd run build`).
   - Test accessibility, mobile layout at 360px/390px, and keyboard navigation.
6. **REVIEW DIFF**: Inspect git diff. Confirm zero accidental files, zero unintended dependencies, zero leaked secrets, and zero fabricated claims.
7. **REPORT**: Deliver a structured summary:
   - Files Changed & Created
   - Verification Commands Executed & Outputs
   - Warnings / Caveats
   - Next Step
