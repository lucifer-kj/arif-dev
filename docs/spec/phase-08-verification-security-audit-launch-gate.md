# Phase 08: End-to-End Verification, Security Audit & Launch Gate

**Phase ID**: `SPEC-PHASE-08`  
**Status**: Ready for Implementation  
**Dependencies**: `SPEC-PHASE-00` through `SPEC-PHASE-07`  
**Deliverables**: Automated verification checklist, security header inspection report, performance audit logs, static SSG deployment certification.

---

## 1. Objectives & Scope

Execute the rigorous **Pre-Launch Verification Gate** to ensure Arif’s portfolio satisfies every technical, security, and performance standard established across Phases 00 through 07.

This specification separates **Hard Blockers** (mandatory criteria that immediately halt deployment if failed) from **Tiered Performance Targets** (Good, Target, Stretch), and defines category-based asset weight budgets.

---

## 2. Hard Blockers vs. Tiered Performance Standards

### 2.1 Hard Blockers (Must Pass 100% to Deploy)

Deployment is strictly prohibited if any of the following checks fail:

| ID | Blocker Item | Failure Condition | Verification Method |
|---|---|---|---|
| **HB-01** | **TypeScript Strictness** | Any `any` type or compiler error | `pnpm.cmd run typecheck` exits non-zero |
| **HB-02** | **Production Build** | Any build warning or compilation failure | `pnpm.cmd run build` exits non-zero |
| **HB-03** | **Static SSG Export** | Any static page requiring server-side DB/runtime | Next.js build output contains non-static routes |
| **HB-04** | **Secret Exposure** | Leaked server secrets or credentials in bundles | String search in `.next/static` for `SECRET|PRIVATE|API_KEY` |
| **HB-05** | **CSP Hardening** | `'unsafe-eval'` present in production CSP | Inspect HTTP headers via curl/devtools |
| **HB-06** | **Zero Horizontal Overflow** | `scrollWidth > clientWidth` at 360px width | Automated mobile viewport scroll check |
| **HB-07** | **Zero PII Logging** | Unmasked emails, phone numbers, or IPs in logs | Inspection of `lib/logger.ts` output logs |
| **HB-08** | **WhatsApp Link Integrity** | Malformed URLs or unencoded spaces in links | Regex check: `^https:\/\/wa\.me\/91\d{10}\?text=.+$` |
| **HB-09** | **Skip Link Functional** | Missing or broken `#main-content` focus | Tab key focus test |

### 2.2 Tiered Performance & Core Web Vitals Standards

Evaluated under emulated Mobile (Slow 4G, 4x CPU Throttling, Moto G4 profile):

| Metric | Minimum Acceptable | Target Standard | Stretch Benchmark | Evaluation Method |
|---|---|---|---|---|
| **Lighthouse Mobile Score** | ≥ 92 / 100 | **≥ 96 / 100** | 100 / 100 | Chrome DevTools Lighthouse |
| **Largest Contentful Paint (LCP)** | ≤ 1.8s | **≤ 1.0s** | < 0.8s | WebPageTest / Lighthouse |
| **Cumulative Layout Shift (CLS)** | ≤ 0.05 | **0.00** | 0.00 | Web Vitals / RUM |
| **Interaction to Next Paint (INP)** | ≤ 150ms | **≤ 75ms** | < 50ms | DevTools Interaction trace |
| **Edge TTFB (CDN Hit)** | ≤ 150ms | **≤ 60ms** | < 40ms | Global ping test / curl |

### 2.3 Category-Based Asset Transfer Budgets (Compressed)

Rather than an arbitrary blanket cap, assets are governed by distinct category budgets:

| Asset Category | Warning Threshold | Hard Limit | Optimization Strategy |
|---|---|---|---|
| **Initial Critical HTML** | > 18 KB | **25 KB** | Minified static HTML, inlined critical tokens |
| **Global & Component CSS** | > 25 KB | **35 KB** | Tailwind v4 compilation with unused utility purge |
| **Initial JavaScript Payload** | > 95 KB | **125 KB** | React 19 + Next.js runtime, zero heavy client libs |
| **Self-Hosted Webfonts** | > 45 KB | **55 KB** | `next/font/google` Inter with latin-only subset |
| **Above-the-Fold Media** | > 75 KB | **120 KB** | Pure SVG reticle + modern WebP/AVIF images |
| **Total First-Load Transfer** | > 250 KB | **350 KB** | Combined initial download size |

---

## 3. Repeatable Verification Protocols

### 3.1 Security Header Inspection Protocol
Execute against local preview build or staging URL:

```bash
# 1. Start production preview server
pnpm.cmd run build
pnpm.cmd run start

# 2. Inspect response headers
curl -I http://localhost:3000
```
**Required Header Assertions**:
- `Content-Security-Policy` does NOT contain `'unsafe-eval'`.
- `X-Content-Type-Options: nosniff` is present.
- `X-Frame-Options: DENY` is present.
- `Strict-Transport-Security` contains `max-age=63072000`.

### 3.2 Mobile Ergonomics & Viewport Test Protocol
Automated or manual verification across these standard viewport breakpoints:
- `360px × 640px` (Budget Android / JioPhone)
- `390px × 844px` (Modern iPhone)
- `412px × 915px` (Modern Samsung Galaxy)
- `768px × 1024px` (Tablet Portrait)
- `1440px × 900px` (Desktop Benchmark)

**Verification Script Check**:
```javascript
// Run in browser console on all viewports:
(() => {
  const isOverflowing = document.documentElement.scrollWidth > window.innerWidth;
  console.assert(!isOverflowing, `FAIL: Horizontal overflow detected (${document.documentElement.scrollWidth}px vs ${window.innerWidth}px)`);
  if (!isOverflowing) console.log("PASS: Zero horizontal overflow detected.");
})();
```

### 3.3 Conversion Routing Test Protocol
- Test each WhatsApp action on:
  - Header (`Discuss Project`)
  - Hero primary CTA
  - Work card actions
  - Service tier cards (Landing Page, Business Site, Web App, Retainer)
  - Mobile bottom action dock
  - Contact suite primary hotline
- Confirm all links include:
  1. Valid international format (`91...` without `+` or spaces in the URI host)
  2. URL-encoded message text describing the specific user intent.

---

## 4. Quality Gate & Acceptance Criteria

### 4.1 Inputs & Prerequisites
- Phases 00 through 07 fully implemented.
- Clean working directory with no untracked experimental files.

### 4.2 Outputs & Deliverables
- Passing test logs for `pnpm.cmd run typecheck`.
- Clean production build logs from `pnpm.cmd run build`.
- Zero security vulnerabilities reported in dependency audit (`pnpm audit`).

### 4.3 Acceptance Criteria
1. **Zero Blocker Violations**: All 9 Hard Blockers (HB-01 to HB-09) pass cleanly.
2. **Performance Gate Satisfied**: Mobile Lighthouse Performance score is ≥ 92 and CLS is ≤ 0.05.
3. **Asset Budgets Respected**: Initial JS payload is under 125 KB compressed; total page weight is under 350 KB.
4. **Accessible WCAG 2.2 AA Compliance**: Skip link works, color contrast meets 4.5:1 (normal text) and 3:1 (large text/borders), touch targets are ≥ 44px.

### 4.4 Verification Commands
```bash
# Execute TypeScript strict check
pnpm.cmd run typecheck

# Execute static production build
pnpm.cmd run build

# Run lint audit
pnpm.cmd run lint
```

### 4.5 Regression Prevention
- Verification suite must be run as the final step before any code is committed or merged to the main branch.

### 4.6 Definition of Done
- [ ] Hard Blockers HB-01 through HB-09 verified passing.
- [ ] Tiered Performance Standards achieve Target Standard or Minimum Acceptable.
- [ ] Asset sizes measured and confirmed within category budgets.
- [ ] Mobile viewports audited down to 360px without horizontal scroll.
- [ ] All conversion rails and WhatsApp links verified.
- [ ] `pnpm.cmd run typecheck` and `pnpm.cmd run build` complete with 0 errors.
