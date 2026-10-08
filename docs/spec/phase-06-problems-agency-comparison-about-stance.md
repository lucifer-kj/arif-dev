# Phase 06: Problems Hub, Structural Comparison & Engineering Stance

**Phase ID**: `SPEC-PHASE-06`  
**Status**: Ready for Implementation  
**Dependencies**: [`docs/spec/phase-00-truth-content-evidence-audit.md`](./phase-00-truth-content-evidence-audit.md), [`docs/spec/phase-01-core-foundation-security-design-tokens.md`](./phase-01-core-foundation-security-design-tokens.md), [`docs/spec/phase-02-application-shell-navigation-mobile-dock.md`](./phase-02-application-shell-navigation-mobile-dock.md)  
**Deliverables**: `components/sections/ProblemsSection.tsx`, `components/sections/AboutSection.tsx`, `components/comparison/StructuralComparisonTable.tsx`

---

## 1. Objectives & Scope

1. **Problems Hub (`#problems`)**: Articulate the common operational friction Indian business owners encounter when commissioning websites (multi-layered communication, slow turnaround, maintenance dependencies, bloated templates).
2. **Structural Comparison Matrix**: Present an objective, professional contrast between multi-tiered agency delivery models and direct engagement with an independent senior engineer—grounded in structural differences rather than emotional attacks.
3. **Engineering Stance & About (`#about`)**: Introduce Arif as a dedicated individual practitioner, detailing technical philosophy, commercial integrity, direct code ownership, and senior craft.

---

## 2. Structural Comparison Architecture (`components/comparison/StructuralComparisonTable.tsx`)

Rendered as an authoritative Swiss border-collapsed matrix. The copy is confident, measured, and free of hyperbolic insults:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STRUCTURAL ENGAGEMENT COMPARISON // AGENCY MODEL VS DIRECT SENIOR ENGINEER            │
├──────────────────────────────────────────┬─────────────────────────────────────────────┤
│ Multi-Tiered Agency Model                │ Direct Engagement with Arif                 │
├──────────────────────────────────────────┼─────────────────────────────────────────────┤
│ ❖ Account Manager Intermediaries         │ ❖ Direct Senior Engineer Access             │
│ Communications pass through account reps │ You collaborate directly with the senior    │
│ and project managers, creating latency   │ engineer architecting and writing every     │
│ and translation errors.                  │ line of production code.                    │
├──────────────────────────────────────────┼─────────────────────────────────────────────┤
│ ❖ Multi-Month Turnarounds                │ ❖ Focused, Bounded Sprint Delivery          │
│ Competing internal priorities and handoff│ Landing pages delivered in 3–5 days; full   │
│ cycles frequently stretch timelines over │ business websites in 8–12 days with tight   │
│ 8 to 16 weeks.                           │ single-threaded focus.                      │
├──────────────────────────────────────────┼─────────────────────────────────────────────┤
│ ❖ Plugin & Page-Builder Dependency       │ ❖ Clean-Slate Next.js Architecture          │
│ Heavy reliance on third-party plugins    │ Bespoke TypeScript & Tailwind code with     │
│ that risk breaking on updates and slow   │ zero bloated plugins, optimized for fast    │
│ mobile loading on cellular networks.     │ delivery across Indian 4G connections.      │
├──────────────────────────────────────────┼─────────────────────────────────────────────┤
│ ❖ Proprietary Hosting & Retainer Lock-In │ ❖ Complete Code & Asset Ownership           │
│ Often hosted on internal agency servers, │ 100% of the repository, cloud accounts,     │
│ requiring paid support tickets for minor │ and domains belong to you. Zero vendor      │
│ configuration updates.                   │ lock-in or ongoing dependencies.            │
└──────────────────────────────────────────┴─────────────────────────────────────────────┘
```

---

## 3. Engineering Stance & About Narrative (`components/sections/AboutSection.tsx`)

### 3.1 Content Structure
* **Micro-Label**: `INDEPENDENT ENGINEERING CRAFT`
* **Headline**: `Senior Engineering Craft. Direct Collaboration. Absolute Ownership.`
* **Core Narrative**:
  > *"I am Arif, a Senior Software Engineer and freelance web architect based in India. Over the past seven years, I have built and scaled high-traffic web applications, performance-critical frontends, and resilient digital architectures.*
  > 
  > *I operate independently because I believe business owners deserve direct access to the engineer building their digital assets. Without corporate overhead or account manager layers, decisions are made faster, code is cleaner, and delivery is predictable.*
  > 
  > *Every system I build is designed for measurable business utility: instant mobile page loads on cellular connections, effortless inquiry flows for your customers, and complete source code freedom for your business."*

### 3.2 Architectural Principles
1. **Performance as a Core Feature**: Speed is not an afterthought; it directly determines user retention and conversion rates on mobile data.
2. **Single-Threaded Senior Attention**: When we work together, your project receives my dedicated focus, not delegation to anonymous subcontractors.
3. **Radical Code Ownership**: You receive complete access to the GitHub repository, deployment configuration, and design assets upon milestone settlement.

### 3.3 Production Stack Grid
Micro-pill badges showcasing core technical proficiencies:
- `Next.js 15 (App Router)`
- `React 19 & TypeScript`
- `Tailwind CSS v4`
- `Cloudflare CDN & Edge`
- `Razorpay & Stripe Integration`
- `Web Performance & Core Web Vitals`

---

## 4. Quality Gate & Acceptance Criteria

### 4.1 Inputs & Prerequisites
- Design tokens from Phase 01.
- Positioning rules from Phase 00.

### 4.2 Outputs & Deliverables
- `components/sections/ProblemsSection.tsx`: Master problems section container.
- `components/comparison/StructuralComparisonTable.tsx`: Responsive comparison table.
- `components/sections/AboutSection.tsx`: Engineering stance and principles section.

### 4.3 Acceptance Criteria
1. **Constructive Professional Tone**: Copy focuses on verifiable operational trade-offs rather than generic agency-bashing or hostile phrasing.
2. **Responsive Table Behavior**:
   - Desktop (≥768px): Displays side-by-side comparison table with clean hairline dividers.
   - Mobile (<768px): Transforms smoothly into side-by-side paired cards per comparison row to prevent horizontal clipping.
3. **Typography Standards**: Uses Inter with tight negative tracking (`tracking-[-0.035em]`) and high-contrast readable typography.
4. **Accessible Semantics**: Uses valid `<table>` or ARIA grid roles with row and column headers, accessible to screen readers.

### 4.4 Verification Commands
```bash
# Verify TypeScript strictness
pnpm.cmd run typecheck

# Verify build with problems and about sections
pnpm.cmd run build
```

### 4.5 Regression Prevention
- Comparison table must not cause layout shift or overflow on 360px mobile viewports.
- Copy must strictly preserve Arif's solo practitioner identity (never "we" or "our team").

### 4.6 Definition of Done
- [ ] `StructuralComparisonTable.tsx` renders 4 core comparison points with responsive stacking.
- [ ] `ProblemsSection.tsx` mounts under `#problems`.
- [ ] `AboutSection.tsx` mounts under `#about` with narrative, principles, and tech pills.
- [ ] All copy audited against Phase 00 tone and truth requirements.
- [ ] `pnpm.cmd run typecheck` and `pnpm.cmd run build` complete with 0 errors.
