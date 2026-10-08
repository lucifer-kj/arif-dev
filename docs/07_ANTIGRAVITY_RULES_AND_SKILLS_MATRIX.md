# 07. Antigravity Rules & Skills Matrix

**Project**: Portfolio for **Arif** (Freelance Senior Software Engineer & Web Architect)  
**Scope**: Operational Constraints, Debuggability Standards, Multi-Agent Architecture, and Curated Global Skills Matrix.

---

## 1. Non-Negotiable Operational Constraints

Whenever Antigravity develops features, moves across phases, or refactors code in this repository, it **must** strictly adhere to the following rules:

### A. Package Manager: PNPM Always
* **Rule**: Always use `pnpm` for all package installations, scripts, and lifecycle commands (`pnpm install`, `pnpm run build`, `pnpm run typecheck`, `pnpm dev`).
* **Prohibited**: Never run `npm`, `yarn`, or `bun`.
* **Lockfile**: Maintain and commit `pnpm-lock.yaml`.

### B. Radical Simplicity & Debuggability First
* **No "Clever" Over-Abstraction**: Do not build multi-layered generic abstractions or unnecessary wrapper classes. Write clean, readable React Server Components and isolated Client Components.
* **Component Isolation**: Every interactive component must be modular and testable in isolation. If an animation fails or client JavaScript is disabled, the component must degrade gracefully to a clean, static, readable state rather than crashing with a white screen.
* **Error Boundaries & Safe Fallbacks**:
  * All client components wrap around `<ErrorBoundary />` with structured logging.
  * Server Actions return strictly typed `{ success: boolean, error?: string }` objects rather than throwing unhandled exceptions.
* **Approved Dependencies**:
  * Next.js 15 (App Router, Static SSG) + TypeScript strict mode
  * Tailwind CSS v4 + PostCSS with native OKLCH theme tokens
  * `lenis` / `@studio-freight/lenis` (momentum smooth scrolling)
  * `lucide-react` (clean, lightweight icons)
  * `zod` (runtime input validation)
  * `@calcom/embed-react` (calendar integration)
  * **Prohibited**: Do not add bloated 3D libraries (Three.js), unneeded charting frameworks, or unapproved heavy dependencies.

### C. Zero-Database / Pure Static Site Generation (SSG)
* All marketing sections (`#work`, `#services`, `#problems`, `#about`, `#contact`) build as pure static HTML (SSG) with zero runtime database queries for instant (<50ms) TTFB.
* The only dynamic behavior is the Server Action for the 2-field Async Brief Drawer.

---

## 2. Curated Global Skills Matrix

Out of all available global skills, Antigravity will selectively activate and combine **only the following curated skills** mapped to specific domains and phases of the project:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CURATED SKILLS MATRIX                           │
├────────────────────┬────────────────────┬──────────────────────────────┤
│ Development & Arch │ UX, Motion & A11y  │ Quality, Performance & Deploy│
│ • nextjs           │ • tailwind-design- │ • wcag-audit-patterns        │
│ • react-best-      │   system           │ • application-performance-   │
│   practices        │ • debugger         │   performance-optimization   │
│ • frontend-security│                    │ • verification               │
│   -coder           │                    │ • deployments-cicd           │
│                    │                    │ • env-vars                   │
└────────────────────┴────────────────────┴──────────────────────────────┘
```

### Domain-to-Skill Mapping

| Domain / Task | Primary Skill(s) | Role & Guardrails |
|---|---|---|
| **Next.js 15 App Router & Architecture** | `nextjs` | Enforce Server Components by default, isolate `"use client"` to interactive islands, configure static SSG generation. |
| **Component Quality & TypeScript** | `react-best-practices` | Review hook dependencies, prevent hydration mismatches, ensure strict typing and prop interfaces with zero `any`. |
| **Tailwind Tokens & Design System** | `tailwind-design-system` | Enforce Kolk Swiss tokens (Warm Linen Ivory, Deep Espresso, Burnt Terracotta, 96px hairline grid, paper shadows). |
| **Accessibility Compliance (WCAG AA)** | `wcag-audit-patterns` | Audit keyboard navigation, visible focus rings, color contrast ratios (≥4.5:1), and non-color status signals. |
| **Performance & Core Web Vitals** | `application-performance-performance-optimization` | Guarantee sub-second mobile LCP on Jio 4G, zero CLS (0.00), and sub-80ms INP. |
| **End-to-End Flow Verification** | `verification` | Verify the complete conversion flow: 1-tap WhatsApp deep-links, Async Brief Drawer submission, Cal.com modal. |
| **Security & Form Sanitization** | `frontend-security-coder` | Sanitize all inputs in the Async Brief Drawer, prevent XSS, enforce rate-limiting, and audit logging. |
| **Error Diagnostics & Bug Resolution** | `debugger` | Proactively debug rendering anomalies, mobile viewport overflows, and hydration mismatches. |
| **Vercel Deployment & Environment Config**| `deployments-cicd`, `env-vars` | Configure edge headers, CSP, preview URLs, and secure environment variable handling. |

---

## 3. Sequential Phase-by-Skill Execution Grid (`docs/spec/`)

Antigravity executes development in accordance with the 8 sequential specification documents in `docs/spec/`:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      PHASE-BY-SKILL EXECUTION GRID                     │
├─────────┬──────────────────────────┬───────────────────────────────────┤
│ Phase   │ Primary Milestone        │ Activated Skills                  │
├─────────┼──────────────────────────┼───────────────────────────────────┤
│ Phase 01│ Foundation, Security &   │ • nextjs                          │
│         │ Design Tokens            │ • tailwind-design-system          │
│         │                          │ • frontend-security-coder         │
├─────────┼──────────────────────────┼───────────────────────────────────┤
│ Phase 02│ App Shell, Header &      │ • nextjs                          │
│         │ Mobile Action Dock       │ • tailwind-design-system          │
│         │                          │ • wcag-audit-patterns             │
├─────────┼──────────────────────────┼───────────────────────────────────┤
│ Phase 03│ Hero Engine & Live       │ • nextjs                          │
│         │ Telemetry Widget         │ • application-performance-...     │
│         │                          │ • react-best-practices            │
├─────────┼──────────────────────────┼───────────────────────────────────┤
│ Phase 04│ Work Showcase & Tactile  │ • tailwind-design-system          │
│         │ Case Studies             │ • react-best-practices            │
│         │                          │ • debugger                        │
├─────────┼──────────────────────────┼───────────────────────────────────┤
│ Phase 05│ Transparent Service Tiers│ • tailwind-design-system          │
│         │ & Retainer Architecture  │ • react-best-practices            │
├─────────┼──────────────────────────┼───────────────────────────────────┤
│ Phase 06│ Problems Hub (Agency vs  │ • react-best-practices            │
│         │ Solo) & About Stance     │ • wcag-audit-patterns             │
├─────────┼──────────────────────────┼───────────────────────────────────┤
│ Phase 07│ Conversion Engine, Async │ • frontend-security-coder         │
│         │ Brief Drawer & Contact   │ • verification                    │
│         │                          │ • nextjs                          │
├─────────┼──────────────────────────┼───────────────────────────────────┤
│ Phase 08│ Verification, Security   │ • verification                    │
│         │ Audit & Launch Gate      │ • wcag-audit-patterns             │
│         │                          │ • application-performance-...     │
└─────────┴──────────────────────────┴───────────────────────────────────┘
```

---

## 4. Incremental Verification Protocol

1. **Before any feature commit**:
   - Run type checks (`pnpm run typecheck` $\rightarrow$ must return 0 errors).
   - Run linter checks (`pnpm run lint`).
2. **Component Checkpoint**:
   - Verify layout on 5 viewport widths: Mobile (360px, 390px, 412px), Tablet (768px), and Desktop (1440px).
   - Verify that all interactive elements are keyboard focusable with visible focus rings.
3. **Phase Completion Checkpoint**:
   - Never mark a phase complete until all acceptance criteria in `docs/spec/phase-XX-*.md` are verified and passing.
