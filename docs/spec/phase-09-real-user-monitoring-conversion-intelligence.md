# Phase 09: Real User Monitoring & Conversion Intelligence

**Phase ID**: `SPEC-PHASE-09`  
**Status**: Post-Launch Operational Specification  
**Dependencies**: `SPEC-PHASE-08` (Production deployment verified)  
**Deliverables**: `lib/analytics.ts`, `app/reportWebVitals.ts`, conversion instrumentation, post-launch iteration runbook

---

## 1. Objectives & Scope

Phase 09 establishes the post-launch telemetry and conversion measurement framework. Its mandate is to measure whether the website actually performs in the real world on real visitor devices and cellular networks (e.g. Jio and Airtel in India), and whether prospective clients successfully convert into qualified leads.

Key priorities:
1. Capture real-world Core Web Vitals (LCP, INP, CLS, TTFB) anonymously without third-party tracking bloat.
2. Track high-intent conversion funnel milestones without collecting sensitive visitor PII.
3. Establish a closed-loop post-launch iteration process to continuously optimize page speed and conversion velocity.

---

## 2. Real-User Performance Monitoring (RUM)

### 2.1 Web Vitals Telemetry (`app/reportWebVitals.ts`)

Leverages Next.js built-in `reportWebVitals` or `@vercel/speed-insights` lightweight telemetry:

```typescript
import { Metric } from 'next/dist/compiled/web-vitals';
import { logger } from '@/lib/logger';

export function reportWebVitals(metric: Metric) {
  // Only capture key Core Web Vitals
  if (!['FCP', 'LCP', 'CLS', 'FID', 'INP', 'TTFB'].includes(metric.name)) {
    return;
  }

  const payload = {
    metric: metric.name,
    value: Math.round(metric.value * 100) / 100,
    rating: metric.rating, // 'good' | 'needs-improvement' | 'poor'
    navigationType: metric.navigationType,
    id: metric.id,
    timestamp: new Date().toISOString(),
  };

  // Safe logging in development; send to privacy-safe endpoint in production
  if (process.env.NODE_ENV === 'production') {
    // Beacon API to prevent blocking page unloading
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/telemetry/vitals', JSON.stringify(payload));
    }
  } else {
    logger.debug('[Web Vital]', payload);
  }
}
```

### 2.2 Environmental Metadata (Privacy-Preserving)
* **Device Class**: `mobile` | `tablet` | `desktop` (derived from viewport width).
* **Effective Connection Type**: `navigator.connection.effectiveType` (`4g`, `3g`, `2g` where available).
* **Viewport Dimensions**: Viewport width bucket (e.g., `<400px`, `400-768px`, `>768px`).
* **Strict Privacy Rule**: Never collect IP addresses, GPS coordinates, device serial numbers, or browser fingerprints.

---

## 3. Conversion Funnel Intelligence

### 3.1 Funnel Milestone Events

```
[Visitor Lands] ──> [Scrolls Past Hero] ──> [Views Services/Pricing]
       ──> [Engages CTA: WhatsApp / Brief / Cal.com] ──> [Lead Generated]
```

| Event Name | Trigger Location | Business Significance | Payload (Non-PII) |
|---|---|---|---|
| `cta_whatsapp_click` | Header, Hero, Mobile Bar, Pricing | Primary direct lead conversion | `{ source: 'mobile_bar' \| 'hero' \| 'tier_pricing', tierId?: string }` |
| `brief_drawer_opened` | Hero, Contact, Mobile Bar | High-intent curiosity | `{ trigger: 'hero_review' \| 'mobile_inquire' }` |
| `brief_submitted` | Async Brief Drawer | Qualified written lead | `{ submissionSuccess: true, timeToFillMs: number }` |
| `cal_scheduler_opened`| `#contact` | High-value meeting scheduling | `{ channel: 'cal_com' }` |
| `case_study_expanded` | `#work` | Social proof validation | `{ caseStudyId: string }` |

### 3.2 Lightweight Instrumentation (`lib/analytics.ts`)
* Zero heavy external SDKs (no bloated 100KB third-party trackers).
* Events dispatched via lightweight `fetch` with `keepalive: true` or `navigator.sendBeacon`.
* Zero session recording (no Hotjar/FullStory recording keystrokes or forms).

---

## 4. Privacy, Compliance & Data Governance

1. **Zero Sensitive Data**: Form text, phone numbers, email addresses, and URLs are **never sent to analytics endpoints**. Analytics receives only event counters and category tags.
2. **Do Not Track Respect**: Honor browser `navigator.doNotTrack === '1'` by muting telemetry dispatch.
3. **Local Privacy Standard**: Fully compliant with India's Digital Personal Data Protection Act (DPDP) and global GDPR principles.

---

## 5. Post-Launch Iteration Feedback Loop

The website operates as an evolving commercial asset using this continuous improvement loop:

```
┌────────────────────────────────────────────────────────────────────────┐
│                     POST-LAUNCH ITERATION LOOP                         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
│ 1. OBSERVE REAL DATA │   │ 2. FORM HYPOTHESIS   │   │ 3. SURGICAL TEST     │
│ • 75th percentile LCP│   │ • E.g., Mobile ad    │   │ • Adjust hero layout │
│ • WhatsApp drop-offs │   │   visitors bounce on │   │ • Test new button copy│
│ • Brief form errors  │   │   pricing section    │   │ • Measure 7-day delta│
└──────────────────────┘   └──────────────────────┘   └──────────────────────┘
```

1. **Weekly Review**: Review 7-day median Core Web Vitals on mobile and WhatsApp inquiry counts.
2. **Bottleneck Identification**: Identify any page section causing drop-offs (e.g. if brief drawer abandonment exceeds 50%).
3. **Hypothesis & Adjustment**: Propose single-variable refinements (e.g. simplifying brief fields or improving mobile button prominence).
4. **Verification**: Document verified before/after results in the internal practice changelog.

---

## 6. Cross-Phase Quality Gate: Phase 09

| Gate Element | Standard |
|---|---|
| **Inputs** | Live production deployment from Phase 08 with verified DNS and SSL. |
| **Outputs** | Zero-bloat vitals reporting script (`reportWebVitals.ts`), privacy-safe analytics helper (`lib/analytics.ts`), weekly telemetry review log. |
| **Constraints** | Zero third-party tracker weight exceeding 5 KB; zero PII collection; zero layout shifts induced by tracking tags. |
| **Acceptance Criteria** | • Calling `trackEvent()` emits clean, anonymous payloads.<br>• Core Web Vitals beacon fires successfully on page transition.<br>• Lighthouse performance score remains unchanged (no telemetry regression). |
| **Verification Commands** | Verify network requests in DevTools: Confirm telemetry payloads contain zero PII and execute via non-blocking beacon. |
| **Definition of Done** | Production site passively records real-user performance data and funnel clicks with zero security or privacy vulnerabilities. |
