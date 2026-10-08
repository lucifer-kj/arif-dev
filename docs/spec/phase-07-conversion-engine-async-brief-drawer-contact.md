# Phase 07: Conversion Engine, Secure Async Brief Drawer & Contact Suite

**Phase ID**: `SPEC-PHASE-07`  
**Status**: Ready for Implementation  
**Dependencies**: [`docs/spec/phase-00-truth-content-evidence-audit.md`](./phase-00-truth-content-evidence-audit.md), [`docs/spec/phase-01-core-foundation-security-design-tokens.md`](./phase-01-core-foundation-security-design-tokens.md), [`docs/spec/phase-02-application-shell-navigation-mobile-dock.md`](./phase-02-application-shell-navigation-mobile-dock.md), [`docs/spec/phase-05-service-tiers-freelance-pricing-retainer.md`](./phase-05-service-tiers-freelance-pricing-retainer.md)  
**Deliverables**: `components/sections/ContactSection.tsx`, `components/contact/AsyncBriefDrawer.tsx`, `components/contact/CalScheduler.tsx`, `lib/validations/brief.ts`, `lib/whatsapp.ts`, `app/actions/submit-brief.ts`

---

## 1. Objectives & Scope

1. **Inverted Obsidian Contact Suite**: Build the high-contrast `#contact` section featuring deep espresso background (`bg-foreground text-background`), clear direct channels, and low-friction conversion paths.
2. **Accessible Async Brief Drawer**: Create an accessible slide-out modal/drawer (`components/contact/AsyncBriefDrawer.tsx`) allowing visitors to submit their website URL and goals in under 30 seconds for a free teardown review.
3. **Proportional Abuse Prevention**: Implement defense-in-depth against automated bots using honeypot fields, submission timing analysis, and rate-limiting—without heavy third-party CAPTCHA overhead.
4. **Data-Preserving Failure Fallback**: If an asynchronous form submission fails or encounters network drops, preserve form state and provide an instant 1-tap "Send Brief via WhatsApp" fallback containing the prospect's typed input.
5. **Cal.com & WhatsApp Direct Integration**: Provide direct links and embedded scheduling for 20-minute exploratory discussions.

---

## 2. Inverted Contact Suite Blueprint (`components/sections/ContactSection.tsx`)

Rendered on an inverted espresso obsidian background (`bg-foreground text-background py-20 lg:py-32`):

```
┌────────────────────────────────────────────────────────────────────────┐
│ INVERTED CONTACT SUITE (bg-foreground text-background, max-w-7xl)      │
├────────────────────────────────────────────────────────────────────────┤
│ .label-xs (text-accent): "DIRECT SENIOR COLLABORATION"                 │
│                                                                        │
│ H2 (Swiss Grotesque, tracking-[-0.035em], text-3xl sm:text-5xl):       │
│ "Let’s build a website that delivers measurable commercial results."   │
│                                                                        │
│ Subhead (text-background/70, text-base sm:text-lg, max-w-xl mt-4):     │
│ "Have an upcoming launch or a slow website costing you ad conversions? │
│  Reach out directly. Typical response time is under 2 business hours." │
│                                                                        │
│ ┌──────────────────────────────────────────────────────────────────┐   │
│ │ Conversion Rail 1 (Primary - WhatsApp Direct Hotline):           │   │
│ │ [ 💬 Message Arif Directly on WhatsApp ] (Solid Terracotta)       │   │
│ │ Subtext: "Fastest response. Send your URL or project notes."     │   │
│ ├──────────────────────────────────────────────────────────────────┤   │
│ │ Conversion Rail 2 (High Intent - Free Video Teardown):           │   │
│ │ [ 📋 Request a 3-Minute Video Review ] (Outline Button)          │   │
│ │ Subtext: "I’ll audit your mobile speed & UX on video for free."  │   │
│ ├──────────────────────────────────────────────────────────────────┤   │
│ │ Conversion Rail 3 (Scheduled Discussion):                        │   │
│ │ [ 📅 Schedule a 20-Minute Video Consultation ] (Cal.com Trigger) │   │
│ └──────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│ Direct Email: arif@arif.work • Location: India (Operating Worldwide)  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Async Brief Drawer & Abuse Prevention Architecture

### 3.1 Zod Validation Schema (`lib/validations/brief.ts`)

```typescript
import { z } from 'zod';

export const BriefSubmissionSchema = z.object({
  websiteUrl: z
    .string()
    .trim()
    .min(3, 'Please provide a valid website URL or business name')
    .max(250, 'URL exceeds maximum length'),
  challengeDescription: z
    .string()
    .trim()
    .min(5, 'Please briefly describe what feels slow, broken, or needs building')
    .max(1000, 'Description exceeds maximum length'),
  contactChannel: z
    .string()
    .trim()
    .min(5, 'Please provide your WhatsApp number or email address')
    .max(100, 'Contact detail exceeds maximum length'),
  // Honeypot field (hidden from genuine users)
  botTrap: z.string().max(0, 'Spam submission detected').optional(),
  // Form submission timestamp (for velocity checking)
  formRenderTime: z.number().optional(),
});

export type BriefSubmission = z.infer<typeof BriefSubmissionSchema>;
```

### 3.2 Abuse Defense Strategy (`app/actions/submit-brief.ts`)
* **Honeypot Trap**: Invisible field `<input name="botTrap" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />`. If filled, the request is silently dropped or rejected.
* **Submission Velocity Check**: If the elapsed time between drawer opening (`formRenderTime`) and submission is `< 2.5 seconds`, reject as automated bot spam.
* **Rate-Limiting**: Enforce a token bucket or IP-based limit (max 5 submissions per 15 minutes per client IP).
* **Zero PII Logging**: Log submission events via `logger.info()` with metadata: `{ hasUrl: true, contactType: 'whatsapp', challengeLength: 42 }`. Never log the raw phone or email string to server logs.

### 3.3 Data-Preserving Fallback Protocol (`components/contact/AsyncBriefDrawer.tsx`)
* If the server action returns an error or client loses connection:
  - Do NOT reset form input values.
  - Display an inline warning: *"Submission could not be delivered to the server. You can forward your brief directly to Arif on WhatsApp with one tap."*
  - Render an active button: `[ Continue on WhatsApp with this Brief → ]` which generates a prefilled WhatsApp link containing the user's typed `websiteUrl` and `challengeDescription`.

### 3.4 WhatsApp Link Builder Utility (`lib/whatsapp.ts`)

```typescript
import { env } from '@/lib/env';

export function buildWhatsAppUrl(message: string): string {
  const phone = env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function buildBriefWhatsAppFallback(url: string, challenge: string): string {
  const text = `Hi Arif, I tried submitting a brief for my site: ${url}. Our core challenge: ${challenge}. Let's connect.`;
  return buildWhatsAppUrl(text);
}
```

---

## 4. Cal.com Scheduling Modal (`components/contact/CalScheduler.tsx`)

* Implements standard Cal.com embed using `@calcom/embed-react` or secure iframe.
* `calOrigin="https://app.cal.com"` with CSP explicitly permitting `frame-src https://app.cal.com`.
* Styled in obsidian theme matching the contact section background.

---

## 5. Quality Gate & Acceptance Criteria

### 5.1 Inputs & Prerequisites
- Design tokens for `--foreground`, `--background`, and `--accent`.
- Environment variable `NEXT_PUBLIC_WHATSAPP_NUMBER` and `NEXT_PUBLIC_CALCOM_URL` parsed via `lib/env.ts`.

### 5.2 Outputs & Deliverables
- `components/sections/ContactSection.tsx`: Inverted obsidian contact section.
- `components/contact/AsyncBriefDrawer.tsx`: Accessible slide-out modal with fallback logic.
- `components/contact/CalScheduler.tsx`: Embed wrapper for Cal.com consultation booking.
- `lib/validations/brief.ts`: Zod schema with honeypot definitions.
- `lib/whatsapp.ts`: Safe URL builder functions.
- `app/actions/submit-brief.ts`: Validated, rate-limited server action.

### 5.3 Acceptance Criteria
1. **Accessibility Standards (WCAG 2.2 AA)**:
   - Drawer traps keyboard focus when open and returns focus to the trigger button upon closing.
   - Pressing `Escape` key immediately closes the drawer.
   - Background scroll is locked when the drawer is open.
2. **Abuse Mitigation**:
   - Submissions with populated `botTrap` or completed in `< 2.5 seconds` are rejected.
3. **Data Loss Prevention**:
   - Simulated network failure maintains user inputs in state and provides a working WhatsApp link fallback.
4. **Contrast & Legibility**:
   - All text in the inverted obsidian contact section achieves a minimum contrast ratio of 7:1 against `--foreground`.

### 5.4 Verification Commands
```bash
# Verify TypeScript strictness
pnpm.cmd run typecheck

# Verify build with contact and drawer components
pnpm.cmd run build
```

### 5.5 Regression Prevention
- The drawer bundle should be dynamically imported or lightweight to avoid inflating initial page JavaScript.
- Opening the drawer must not cause layout shift (`CLS = 0.00`) on the underlying page.

### 5.6 Definition of Done
- [ ] `ContactSection.tsx` mounts under `#contact` with 3 distinct conversion rails.
- [ ] `AsyncBriefDrawer.tsx` includes honeypot, accessible focus management, and WhatsApp fallback.
- [ ] `submit-brief.ts` validates with Zod and logs zero PII.
- [ ] `CalScheduler.tsx` loads Cal.com scheduling embed securely.
- [ ] `pnpm.cmd run typecheck` and `pnpm.cmd run build` complete with 0 errors.
