# Phase 01: Core Foundation, Security Infrastructure & Design Tokens

**Phase ID**: `SPEC-PHASE-01`  
**Status**: Ready for Implementation  
**Dependencies**: [`docs/spec/phase-00-truth-content-evidence-audit.md`](./phase-00-truth-content-evidence-audit.md)  
**Deliverables**: `next.config.ts`, `lib/logger.ts`, `lib/env.ts`, `components/monitoring/ErrorBoundary.tsx`, `app/globals.css`

---

## 1. Objectives & Scope

Establish the hardened, enterprise-grade engineering foundation for Arif’s portfolio:
1. **Narrow HTTP Security Headers**: Configure Next.js with the narrowest practical Content Security Policy (CSP), eliminating `'unsafe-eval'`, scoping external providers (`app.cal.com`, `va.vercel-scripts.com`), and enforcing HSTS, X-Content-Type-Options, and Permissions-Policy.
2. **Zero-PII Structured Logging**: Implement a zero-dependency structured JSON logger (`lib/logger.ts`) with correlation IDs, sanitized log levels, and automatic redaction of contact data or IP addresses.
3. **Resilient Error Boundaries**: Deploy client-side React error boundaries (`components/monitoring/ErrorBoundary.tsx`) preventing white-screen crashes, displaying a calm Swiss fallback UI without exposing stack traces to client view.
4. **Environment Schema Enforcement**: Validate public environment variables at build-time using Zod (`lib/env.ts`).
5. **Swiss-Modernist Design Tokens**: Implement the Kolk OKLCH design tokens, paper elevation shadows, hairline grid, and reduced-motion guard in `app/globals.css`.

---

## 2. Hardened Security Architecture

### 2.1 HTTP Security Headers Specification (`next.config.ts`)

Next.js must inject the following headers on all responses. Note that `'unsafe-eval'` is strictly prohibited. For static export/SSG builds in Next.js, script policies must be narrowed to `'self'` and explicitly vetted origins:

```typescript
const isDev = process.env.NODE_ENV === 'development';

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Strict script origin policy: No 'unsafe-eval'. If Next.js client hydration requires inline scripts in SSG mode, evaluate hashes or use narrow 'unsafe-inline' only if nonces are unavailable in static export, but NEVER allow 'unsafe-eval'.
      `script-src 'self' ${isDev ? "'unsafe-eval'" : ''} 'unsafe-inline' https://va.vercel-scripts.com https://app.cal.com`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self'",
      "connect-src 'self' https://vitals.vercel-insights.com https://app.cal.com",
      "frame-src 'self' https://app.cal.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ]
      .filter(Boolean)
      .join('; '),
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
];
```

### 2.2 Environment Validation (`lib/env.ts`)

Build-time validation of all required environment variables using Zod:

```typescript
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_SITE_URL: z.string().url().default('https://arif.work'),
  NEXT_PUBLIC_CALCOM_URL: z.string().url().default('https://app.cal.com/arif/intro'),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().regex(/^\d{10,14}$/, 'Must be valid international phone number without spaces or +'),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_CALCOM_URL: process.env.NEXT_PUBLIC_CALCOM_URL,
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210',
});
```

---

## 3. Structured Logging & Observability

### 3.1 Zero-PII Structured Logger (`lib/logger.ts`)

* **Log Levels**: `DEBUG`, `INFO`, `WARN`, `ERROR`
* **Log Schema**:
  ```json
  {
    "timestamp": "2026-10-08T03:40:00.000Z",
    "level": "INFO",
    "context": "AsyncBriefDrawer",
    "message": "User initiated brief submission",
    "metadata": {
      "hasUrl": true,
      "method": "whatsapp"
    }
  }
  ```
* **Strict Privacy & Zero-PII Mandate**:
  - Never log raw email addresses, full phone numbers, visitor IP addresses, or unredacted form input text.
  - Form field inputs must only be logged as boolean flags (e.g. `hasUrl: true`, `projectType: "rebuild"`).
  - Any phone numbers logged for diagnostic correlation must mask all but the last 4 digits (e.g. `******3210`).

### 3.2 Safe Error Boundary (`components/monitoring/ErrorBoundary.tsx`)

* Catches unhandled React component lifecycle exceptions.
* In development: prints error details to the browser console.
* In production:
  - Dispatches an error event to `logger.error()` with the error name and sanitised context.
  - **Never exposes the raw JavaScript stack trace or system file paths** in the rendered DOM.
* Renders an accessible, calming Swiss error card:
  - Heading: `"Rendering interrupted."`
  - Body: `"An unexpected display error occurred. Technical diagnostic details have been logged."`
  - Action: Standard terracotta button: `"Reload Application"`.

---

## 4. Swiss-Modernist Design System (`app/globals.css`)

Replicated pixel-by-pixel from `C:\Users\USER\Documents\Builds\kolk`:

```css
@import "tailwindcss";

@layer base {
  :root {
    /* Canvas Layers */
    --background: oklch(0.985 0.006 85); /* #FAF8F5 Warm Linen Ivory */
    --foreground: oklch(0.2 0.006 50);    /* #1C1917 Deep Espresso Obsidian */
    --surface: oklch(0.965 0.008 85);       /* #F4F1EB Soft Warm Alabaster */
    --card: oklch(1 0 0);                   /* #FFFFFF Pure White */

    /* Typography & Muted */
    --muted: oklch(0.95 0.006 85);
    --muted-foreground: oklch(0.5 0.012 60); /* #78716C Umber Charcoal */

    /* Accents & Signals */
    --accent: oklch(0.58 0.16 42);          /* #C05621 Signal Burnt Terracotta */
    --accent-foreground: oklch(1 0 0);
    --destructive: oklch(0.577 0.245 27.325);

    /* Borders & Dividers */
    --border: oklch(0.92 0.006 85);         /* Hairline Linen Border */
    --input: oklch(0.92 0.006 85);
    --ring: oklch(0.58 0.16 42);

    /* Radii */
    --radius-sm: 0.25rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;

    /* Paper Elevation Shadows */
    --shadow-card: 0 1px 2px oklch(0.2 0 0 / 6%);
    --shadow-lift: 0 8px 24px -12px oklch(0.2 0 0 / 18%);
    --shadow-paper: 0 1px 3px oklch(0.2 0.006 50 / 4%), 0 10px 24px -8px oklch(0.2 0.006 50 / 6%);
    --shadow-paper-lift: 0 2px 6px oklch(0.2 0.006 50 / 5%), 0 20px 40px -12px oklch(0.2 0.006 50 / 12%);
  }

  /* Inverted Espresso Obsidian Context */
  .dark, [data-theme="dark"] {
    --background: oklch(0.2 0.006 50);
    --foreground: oklch(0.985 0.006 85);
    --surface: oklch(0.25 0.006 50);
    --border: oklch(0.3 0.006 50);
  }
}

/* Micro-Labels: Swiss Grotesque Technical Badge */
.label-xs {
  font-size: 0.6875rem;
  line-height: 1;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 500;
}

/* Hairline 96px Grid */
.hairline-grid {
  background-image:
    linear-gradient(to right, var(--border) 1px, transparent 1px),
    linear-gradient(to bottom, var(--border) 1px, transparent 1px);
  background-size: 96px 96px;
}

/* Reduced Motion Safety */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 5. Quality Gate & Acceptance Criteria

### 5.1 Inputs & Prerequisites
- Repository initialized with Next.js 15 App Router and Tailwind CSS v4.
- `docs/spec/phase-00-truth-content-evidence-audit.md` reviewed for evidence constraints.

### 5.2 Outputs & Deliverables
- `next.config.ts`: Configured with security headers excluding `'unsafe-eval'`.
- `lib/logger.ts`: Zero-PII JSON logger.
- `lib/env.ts`: Build-time Zod environment schema.
- `components/monitoring/ErrorBoundary.tsx`: Production-safe fallback UI.
- `app/globals.css`: Complete Kolk OKLCH design token suite.

### 5.3 Acceptance Criteria
1. **CSP Hardening**: Production build headers contain no `'unsafe-eval'`. Frame ancestors is set to `'none'`.
2. **Zero PII Leakage**: Logger passes test case verifying that emails and phone numbers are scrubbed or masked.
3. **Safe Error Handling**: Triggering a test error inside an ErrorBoundary displays the calm fallback card without exposing file names, line numbers, or stack traces.
4. **Design Token Conformance**: Body background evaluates to Warm Linen Ivory (`#FAF8F5`) and text to Espresso Obsidian (`#1C1917`).
5. **Reduced Motion Protection**: When `prefers-reduced-motion: reduce` is active, animations and transitions evaluate to near-instant (`0.01ms`).

### 5.4 Verification Commands
```bash
# Verify TypeScript strictness
pnpm.cmd run typecheck

# Verify Next.js static build succeeds with new next.config.ts and globals.css
pnpm.cmd run build
```

### 5.5 Regression Prevention
- Modifying `next.config.ts` must not break static site generation (`output: 'export'` or standard static page compilation).
- Tailwind CSS color variables must not break standard Tailwind utility classes (`bg-background`, `text-foreground`, `border-border`).

### 5.6 Definition of Done
- [ ] `next.config.ts` exports hardened security headers with zero `'unsafe-eval'` in production.
- [ ] `lib/logger.ts` logs structured JSON with ISO timestamps and strict PII redaction.
- [ ] `lib/env.ts` parses runtime environment with Zod.
- [ ] `components/monitoring/ErrorBoundary.tsx` renders accessible error card without stack traces.
- [ ] `app/globals.css` provides all Kolk color tokens and utility classes.
- [ ] `pnpm.cmd run typecheck` and `pnpm.cmd run build` complete with 0 errors.
