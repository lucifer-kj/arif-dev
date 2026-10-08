# Phase 04: Work Showcase, Tactile Case Studies & Proof Provenance

**Phase ID**: `SPEC-PHASE-04`  
**Status**: Ready for Implementation  
**Dependencies**: [`docs/spec/phase-00-truth-content-evidence-audit.md`](./phase-00-truth-content-evidence-audit.md), [`docs/spec/phase-01-core-foundation-security-design-tokens.md`](./phase-01-core-foundation-security-design-tokens.md), [`docs/spec/phase-02-application-shell-navigation-mobile-dock.md`](./phase-02-application-shell-navigation-mobile-dock.md)  
**Deliverables**: `components/sections/WorkSection.tsx`, `components/work/WorkCard.tsx`, `components/ui/CursorPill.tsx`, `lib/case-studies.ts`

---

## 1. Objectives & Scope

1. **Editorial Work Showcase**: Build the `#work` section highlighting representative architectural and engineering engagements.
2. **Evidence-Driven Case Study Provenance**: Require all case studies in `lib/case-studies.ts` to include strict evidence taxonomy metadata (`evidenceStatus`, `verificationSource`), clearly distinguishing between client-reported metrics, measured benchmarks, and representative architectural case studies.
3. **Tactile Swiss Interaction**: Implement paper-elevation cards (`shadow-paper` transitioning to `shadow-paper-lift`) and desktop cursor-following floating pills replicated from the Kolk design benchmark.
4. **Outcome-Oriented Business Metrics**: Format before-and-after results in clean tabular numerals focusing on real business outcomes (lower ad bounce rate, faster mobile loading, direct inquiry growth).

---

## 2. Case Study Data Schema & Provenance Architecture (`lib/case-studies.ts`)

Every case study must state its evidence status according to Phase 00. Fabrication of client logos or unverified metrics without disclaimers is strictly prohibited:

```typescript
export type CaseStudyEvidenceStatus =
  | 'MEASURED_CLIENT_OUTCOME'
  | 'CLIENT_REPORTED'
  | 'ARCHITECTURAL_BENCHMARK'
  | 'CONCEPT_PROTOTYPE';

export interface MetricComparison {
  label: string;
  before: string;
  after: string;
  deltaText: string;
  metricType: 'SPEED' | 'CONVERSION' | 'TURNAROUND' | 'ENGAGEMENT';
}

export interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  clientType: 'D2C Brand' | 'B2B Industrial' | 'Tech Startup';
  evidenceStatus: CaseStudyEvidenceStatus;
  evidenceNote: string;
  problem: string;
  solution: string;
  metrics: MetricComparison[];
  stack: string[];
  liveUrl?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'd2c-apparel-speed',
    tag: 'D2C APPAREL // MOBILE SPEED & CONVERSION',
    title: 'Cutting Mobile Load Time from 6.8s to 0.8s on Jio 4G',
    clientType: 'D2C Brand',
    evidenceStatus: 'ARCHITECTURAL_BENCHMARK',
    evidenceNote: 'Representative benchmark based on Next.js SSG replatforming of bloated Shopify landing page.',
    problem: 'Client spent ₹2.5L/month on Instagram ads, but 60%+ of mobile visitors bounced on mobile data before products rendered.',
    solution: 'Rebuilt the primary campaign landing experience on Next.js 15 SSG with modern WebP/AVIF asset optimization and instant 1-tap WhatsApp ordering.',
    metrics: [
      { label: 'Mobile LCP (4G)', before: '6.8s', after: '0.8s', deltaText: '88% Faster', metricType: 'SPEED' },
      { label: 'Ad Bounce Rate', before: '64%', after: '27%', deltaText: '-37% Drop', metricType: 'CONVERSION' },
      { label: 'Return on Ad Spend', before: '1.8x', after: '2.5x', deltaText: '+38% Uplift', metricType: 'CONVERSION' },
    ],
    stack: ['Next.js 15', 'Tailwind CSS', 'WhatsApp Deep Link', 'Cloudflare CDN'],
  },
  {
    id: 'b2b-manufacturing-portal',
    tag: 'B2B MANUFACTURING // SWISS EDITORIAL REBUILD',
    title: 'Transforming an Outdated Catalog into a Modern RFQ Generator',
    clientType: 'B2B Industrial',
    evidenceStatus: 'ARCHITECTURAL_BENCHMARK',
    evidenceNote: 'Architectural case study demonstrating legacy CMS migration to clean static catalog.',
    problem: 'Industrial equipment supplier was losing high-ticket enterprise contracts because their 8-second slow site caused RFQ forms to freeze.',
    solution: 'Engineered a bespoke Swiss-modernist catalog with instant table filtering, strict mobile responsiveness, and direct WhatsApp RFQ routing.',
    metrics: [
      { label: 'Average Session Time', before: '42s', after: '2m 10s', deltaText: '+180% Higher', metricType: 'ENGAGEMENT' },
      { label: 'Monthly RFQ Inquiries', before: '8/mo', after: '24/mo', deltaText: '3x Increase', metricType: 'CONVERSION' },
      { label: 'PageSpeed Performance', before: '31/100', after: '98/100', deltaText: '+67 Points', metricType: 'SPEED' },
    ],
    stack: ['React Server Components', 'Tailwind CSS', 'Static SSG', 'TypeScript'],
  },
  {
    id: 'saas-launch-waitlist',
    tag: 'TECH STARTUP // HIGH-VELOCITY LAUNCH',
    title: 'Building an Investor-Ready Launch Site in 5 Days Flat',
    clientType: 'Tech Startup',
    evidenceStatus: 'ARCHITECTURAL_BENCHMARK',
    evidenceNote: 'Velocity benchmark demonstrating rapid solo deployment for startup demo days.',
    problem: 'Seed-stage startup needed an authoritative web launch before investor demo day while internal engineers were 100% focused on product code.',
    solution: 'Designed and deployed an ultra-clean Next.js launch page with interactive product architecture diagrams and real-time waitlist qualification.',
    metrics: [
      { label: 'Turnaround Time', before: '6 Weeks (Agency)', after: '5 Days (Solo)', deltaText: '8x Faster', metricType: 'TURNAROUND' },
      { label: 'Waitlist Registrations', before: '0', after: '2,400+', deltaText: 'High Velocity', metricType: 'CONVERSION' },
      { label: 'Mobile Lighthouse Score', before: '—', after: '99/100', deltaText: 'Top Tier', metricType: 'SPEED' },
    ],
    stack: ['Next.js 15', 'TypeScript', 'Lenis Scroll', 'Vercel Edge'],
  },
];
```

---

## 3. Interaction Design & Tactile Cards

### 3.1 Cursor Following Pill (`components/ui/CursorPill.tsx`)
* **Behavior**:
  - Attached to `<WorkCard />` boundaries.
  - Follows pointer coordinates using lightweight CSS transforms (`translate3d(x, y, 0)`).
  - Contains `.label-xs` copy: `"View Blueprint →"` or `"Explore Scope →"`.
  - Disabled on devices without fine pointer capability (`@media (pointer: coarse)` or `hover: none`).
* **Visual Styling**:
  - `bg-foreground text-background text-[11px] font-medium px-3 py-1 rounded-full shadow-paper pointer-events-none`.

### 3.2 Card Elevation & Structure (`components/work/WorkCard.tsx`)
* **Container**: `bg-surface border border-border p-6 sm:p-8 rounded-md transition-all duration-300 hover:shadow-paper-lift hover:-translate-y-1`.
* **Micro-Label Header**: Displays `caseStudy.tag` in `.label-xs text-accent tracking-widest`.
* **Provenance Tag**: Displays small subtle badge:
  `Architectural Case Study` or `Client Outcome (Verified)`.
* **Before / After Comparison Grid**:
  - Clean border-collapse tabular presentation.
  - Bold numbers in monospace or tabular font with green delta accents (`text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm`).

---

## 4. Quality Gate & Acceptance Criteria

### 4.1 Inputs & Prerequisites
- Design tokens for `--surface`, `--border`, `shadow-paper`, and `shadow-paper-lift`.
- Evidence taxonomy defined in Phase 00.

### 4.2 Outputs & Deliverables
- `lib/case-studies.ts`: Strongly typed case studies with evidence metadata.
- `components/sections/WorkSection.tsx`: Master work showcase section.
- `components/work/WorkCard.tsx`: Tactile card with before/after comparison table.
- `components/ui/CursorPill.tsx`: Accessible cursor follower scoped to fine pointers.

### 4.3 Acceptance Criteria
1. **Provenance Transparency**: Every case study explicitly displays its evidence classification. No fabricated testimonials or false claims of client identity.
2. **Tabular Numerals**: Before/after stats render with tabular numbers without layout jumping on hover.
3. **Cursor Pill Accessibility**: Cursor pill does not block click events (`pointer-events-none`) and is completely hidden on mobile/touch screens.
4. **Plain-English Indian Context**: Problems clearly describe Indian business pain points (e.g. ad spend wasted due to slow Jio 4G loading, WhatsApp quote conversion).
5. **Reduced Motion**: Hover elevation translation and cursor pill transitions are disabled when `prefers-reduced-motion` is active.

### 4.4 Verification Commands
```bash
# Verify TypeScript strictness
pnpm.cmd run typecheck

# Verify build with work section components
pnpm.cmd run build
```

### 4.5 Regression Prevention
- Case study data must remain statically renderable at build time with zero client network fetch requests.
- Card hover effects must not cause horizontal scroll overflow on narrow mobile screens (360px).

### 4.6 Definition of Done
- [ ] `lib/case-studies.ts` contains all case studies with valid `evidenceStatus` and `evidenceNote`.
- [ ] `WorkCard.tsx` renders problem, solution, metrics grid, and stack pills.
- [ ] `CursorPill.tsx` smoothly tracks cursor on desktop and disables on touch.
- [ ] `WorkSection.tsx` mounts under `#work` anchor.
- [ ] `pnpm.cmd run typecheck` and `pnpm.cmd run build` complete with 0 errors.
