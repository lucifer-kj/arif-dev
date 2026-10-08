# Phase 03: Hero Engine, Snapshot Telemetry & Geometric Signal Reticle

**Phase ID**: `SPEC-PHASE-03`  
**Status**: Ready for Implementation  
**Dependencies**: [`docs/spec/phase-00-truth-content-evidence-audit.md`](./phase-00-truth-content-evidence-audit.md), [`docs/spec/phase-01-core-foundation-security-design-tokens.md`](./phase-01-core-foundation-security-design-tokens.md), [`docs/spec/phase-02-application-shell-navigation-mobile-dock.md`](./phase-02-application-shell-navigation-mobile-dock.md)  
**Deliverables**: `components/sections/HeroSection.tsx`, `components/telemetry/TelemetrySnapshotCard.tsx`, `components/ui/TradeSignalReticle.tsx`, `lib/telemetry-data.ts`

---

## 1. Objectives & Scope

1. **Swiss-Modernist Hero Architecture**: Build an authoritative hero section that immediately communicates Arif's value proposition in clear, jargon-free English for Indian business owners, D2C operators, and startup founders.
2. **Evidence-Driven Telemetry Widget**: Replace fake "live network ping" simulations with a verified **Telemetry Snapshot Card** (`components/telemetry/TelemetrySnapshotCard.tsx`) backed by typed metadata (`lib/telemetry-data.ts`) indicating evidence status (`MEASURED`, `TARGET`, `REFERENCE`, `UNAVAILABLE`).
3. **Animated Geometric Signal Reticle**: Replicate the Kolk SVG trade-signal reticle (`components/ui/TradeSignalReticle.tsx`) featuring orbital rings and 42-degree architectural axes, with strict reduced-motion guards.
4. **Direct Conversion CTAs**: Provide high-intent conversion pathways: a primary WhatsApp hotline button and a secondary action triggering the consultation drawer.

---

## 2. Layout & Typography Blueprint

```
┌────────────────────────────────────────────────────────────────────────┐
│ HERO SECTION CONTAINER (hairline-grid, max-w-7xl mx-auto, py-16 lg:py-28)│
├────────────────────────────────────────────────────────────────────────┤
│ .label-xs: "INDEPENDENT SENIOR SOFTWARE ENGINEER & WEB ARCHITECT"      │
│                                                                        │
│ H1 (Swiss Grotesque, tracking-[-0.035em], text-4xl sm:text-6xl lg:7xl):│
│ "Fast mobile websites that turn traffic into real business inquiries." │
│                                                                        │
│ Subhead (text-muted-foreground, text-lg sm:text-xl, max-w-2xl mt-6):   │
│ "I build high-performance websites and landing pages for Indian        │
│  businesses, D2C brands, and founders. Direct senior engineering craft.│
│  Zero agency middlemen. 100% code ownership."                          │
│                                                                        │
│ CTA Row (mt-8 flex flex-wrap gap-4):                                   │
│ [ 💬 WhatsApp Arif Directly ] (Solid Terracotta, shadow-paper-lift)     │
│ [ 📋 Request Project Scope ]  (Outline Alabaster, opens brief drawer)   │
│                                                                        │
│ ┌──────────────────────────────────────────────────────────────────┐   │
│ │ TELEMETRY SNAPSHOT CARD (<TelemetrySnapshotCard />)              │   │
│ │ Header: "ENGINEERING BENCHMARK // SITE TARGET PROFILE"           │   │
│ │ [ < 1.0s ] Mobile LCP Target       [ 95+ ] PageSpeed Target      │   │
│ │ [ < 80 KB ] Initial JS Budget      [ < 50ms ] Edge TTFB Target   │   │
│ │ Metadata Footer: "Audited build targets based on Next.js SSG     │   │
│ │                   and lightweight asset discipline."             │   │
│ └──────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Evidence-Backed Telemetry Architecture

### 3.1 Telemetry Data Contract (`lib/telemetry-data.ts`)

Every metric displayed on the site must follow the Phase 00 Evidence Taxonomy. It is strictly forbidden to hardcode unverified live measurements as real-time facts:

```typescript
export type TelemetryStatus = 'MEASURED' | 'TARGET' | 'REFERENCE' | 'UNAVAILABLE';

export interface TelemetryMetric {
  id: string;
  label: string;
  value: string;
  unit?: string;
  status: TelemetryStatus;
  statusLabel: string; // e.g. "Verified Target", "Measured Build", "Benchmark"
  source: string;      // e.g. "Next.js Static Build Audit", "Mobile Lighthouse Simulation"
  businessOutcome: string; // Plain-English business translation
}

export const heroTelemetryMetrics: TelemetryMetric[] = [
  {
    id: 'mobile-lcp',
    label: 'Mobile LCP Target',
    value: '< 1.0s',
    status: 'TARGET',
    statusLabel: 'Engineering Target',
    source: 'Emulated 4G Mobile Network Profile',
    businessOutcome: 'Visitors do not abandon while waiting for your page to load.',
  },
  {
    id: 'pagespeed-score',
    label: 'PageSpeed Target',
    value: '95+',
    unit: '/ 100',
    status: 'TARGET',
    statusLabel: 'Audited Standard',
    source: 'Google Lighthouse Mobile Core Web Vitals',
    businessOutcome: 'Better Google search visibility and lower ad bounce rates.',
  },
  {
    id: 'js-payload',
    label: 'Initial JS Budget',
    value: '< 80',
    unit: 'KB',
    status: 'TARGET',
    statusLabel: 'Asset Budget',
    source: 'Next.js Production Bundle Analyzer',
    businessOutcome: 'Near-instant responsiveness on standard Android smartphones.',
  },
  {
    id: 'edge-ttfb',
    label: 'Edge TTFB Target',
    value: '< 50',
    unit: 'ms',
    status: 'TARGET',
    statusLabel: 'Static Delivery Target',
    source: 'Global CDN Static Edge Cache',
    businessOutcome: 'Instant response time from the first millisecond.',
  },
];
```

### 3.2 Visual Component (`components/telemetry/TelemetrySnapshotCard.tsx`)
* **Styling**: `bg-surface border border-border p-6 rounded-md shadow-paper`.
* **Provenance Tag**: Displays `.label-xs` badge denoting `TARGET BENCHMARK` or `VERIFIED BUILD`.
* **Hover / Tap Details**: Clear micro-copy communicating the business benefit of each metric.

### 3.3 Geometric Signal Reticle (`components/ui/TradeSignalReticle.tsx`)
* Replicates the Kolk trade signal reticle using pure SVG:
  - Center target crosshair with hairline stroke (`stroke-border`).
  - Dual orbit concentric rings with terracotta signal pulses.
  - 42-degree angled architectural axis.
* **Animation & Safety**:
  - Orbit rotation driven by smooth CSS animation (`linear infinite`).
  - Strictly halts when `@media (prefers-reduced-motion: reduce)` is active.

---

## 4. Quality Gate & Acceptance Criteria

### 4.1 Inputs & Prerequisites
- Design tokens for `--surface`, `--accent`, `--border`, and `shadow-paper` configured in Phase 01.
- Evidence definitions verified in Phase 00.

### 4.2 Outputs & Deliverables
- `components/sections/HeroSection.tsx`: Complete Hero section component.
- `components/telemetry/TelemetrySnapshotCard.tsx`: Typed snapshot telemetry widget.
- `components/ui/TradeSignalReticle.tsx`: Pure SVG animated geometric reticle.
- `lib/telemetry-data.ts`: Strict telemetry data model with evidence statuses.

### 4.3 Acceptance Criteria
1. **No Fake Precision**: Telemetry displays verified `TARGET` or `MEASURED` labels; no claims of fake real-time pinging or fabricated geographic test runs.
2. **Plain-English Indian Market Copy**: Headline, subhead, and business outcome micro-copy contain zero unexplained developer jargon.
3. **WhatsApp CTA Format**: Primary CTA generates a valid, URI-encoded WhatsApp link with a helpful starter message.
4. **Layout Shift Zero (`CLS = 0.00`)**: Telemetry card and hero text reserve explicit heights or use static flex/grid containers to prevent layout shifts during font loading.
5. **Mobile Responsiveness**: Text wraps without horizontal clipping or overflow on screens as narrow as 360px.

### 4.4 Verification Commands
```bash
# Verify TypeScript strictness
pnpm.cmd run typecheck

# Verify build with hero components
pnpm.cmd run build
```

### 4.5 Regression Prevention
- The Hero section must remain an RSC (React Server Component) except for isolated client interactivity in the Reticle or Telemetry tooltips.
- SVG animations in the Reticle must not cause CPU throttling or battery drain on mobile devices.

### 4.6 Definition of Done
- [ ] `lib/telemetry-data.ts` exports typed telemetry metrics adhering to Phase 00.
- [ ] `TelemetrySnapshotCard.tsx` renders metrics with status badges and plain-English tooltips.
- [ ] `TradeSignalReticle.tsx` renders SVG reticle with working reduced-motion fallback.
- [ ] `HeroSection.tsx` integrates the headline, subhead, CTAs, and telemetry card.
- [ ] `pnpm.cmd run typecheck` and `pnpm.cmd run build` complete with 0 errors.
