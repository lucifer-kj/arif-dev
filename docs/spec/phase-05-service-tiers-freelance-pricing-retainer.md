# Phase 05: Transparent Service Tiers, Scope Bounds & Retainer Architecture

**Phase ID**: `SPEC-PHASE-05`  
**Status**: Ready for Implementation  
**Dependencies**: [`docs/spec/phase-00-truth-content-evidence-audit.md`](./phase-00-truth-content-evidence-audit.md), [`docs/spec/phase-01-core-foundation-security-design-tokens.md`](./phase-01-core-foundation-security-design-tokens.md), [`docs/spec/phase-02-application-shell-navigation-mobile-dock.md`](./phase-02-application-shell-navigation-mobile-dock.md)  
**Deliverables**: `components/sections/ServicesSection.tsx`, `components/services/PricingCard.tsx`, `components/services/RetainerBanner.tsx`, `lib/services.ts`

---

## 1. Objectives & Scope

1. **Transparent Pricing Presentation**: Present realistic, upfront freelance investment ranges in INR (₹18k–₹32k, ₹45k–₹75k, ₹90k–₹1.6L) tailored for Indian business owners, eliminating agency opacity.
2. **Explicit Scope Governance**: Define clear inclusions, exclusions, client prerequisites, and revision terms for each tier, preventing scope creep and misalignment.
3. **Peace of Mind Retainer**: Showcase a predictable ongoing support retainer (₹15,000/month) covering speed defense, minor updates, and emergency response.
4. **Context-Prefilled WhatsApp Routing**: Enable 1-tap WhatsApp consultation triggers with tier-specific context so conversations start with clear intent.

---

## 2. Pricing & Scope Data Contract (`lib/services.ts`)

Every tier defines explicit scope bounds and adheres strictly to Phase 00 commercial claim rules (no universal absolute guarantees; clear distinction between starting prices, typical ranges, and custom quotes):

```typescript
export interface ServiceTier {
  id: string;
  badge: string;
  title: string;
  priceNote: string;      // e.g. "Starting at ₹18,000"
  typicalRange: string;   // e.g. "₹18,000 – ₹32,000"
  timeline: string;       // e.g. "3 to 5 business days"
  description: string;
  inclusions: string[];
  exclusions: string[];
  clientPrerequisites: string[];
  revisionPolicy: string;
  whatsappMessage: string;
  popular?: boolean;
}

export const serviceTiers: ServiceTier[] = [
  {
    id: 'landing-page',
    badge: 'BEST FOR AD CAMPAIGNS & PRODUCT LAUNCHES',
    title: 'High-Converting Landing Page',
    priceNote: 'Starting at ₹18,000',
    typicalRange: '₹18,000 – ₹32,000',
    timeline: '3 to 5 business days',
    description: 'Engineered specifically to convert paid Meta and Google ad traffic into qualified WhatsApp inquiries and verified leads.',
    inclusions: [
      '1 bespoke, high-performance landing page (zero generic WordPress templates)',
      'Sub-second mobile delivery target on 4G networks',
      '1-tap direct WhatsApp inquiry trigger with pre-filled message routing',
      'Lead capture form with serverless delivery to email or Google Sheets',
      'Meta Pixel, GA4, and conversion event instrumentation',
      '100% full source code ownership upon project settlement',
    ],
    exclusions: [
      'Multi-page navigation shells',
      'Custom backend user authentication',
    ],
    clientPrerequisites: [
      'Product/service copy or bullet points provided',
      'High-resolution logo and brand images ready',
    ],
    revisionPolicy: 'Up to 2 structured revision rounds within 7 days of initial staging handover.',
    whatsappMessage: 'Hi Arif, I need a high-converting landing page for our campaigns (typical range ₹18k–₹32k). Here is my business link/brief: ',
  },
  {
    id: 'business-website',
    badge: 'MOST POPULAR FOR SMES & SERVICES',
    title: 'Complete Business Website',
    priceNote: 'Starting at ₹45,000',
    typicalRange: '₹45,000 – ₹75,000',
    timeline: '8 to 12 business days',
    popular: true,
    description: 'An authoritative Swiss-modernist web presence designed to build instant trust with premium clients and institutional buyers.',
    inclusions: [
      '5 to 8 bespoke pages (Home, About, Services, Case Studies, Contact)',
      'Modern Swiss design system inspired by the Kolk aesthetic',
      'Mobile-first architecture targeting 95+ PageSpeed scores',
      'Comprehensive on-page SEO metadata, JSON-LD Schema, and social cards',
      'Direct WhatsApp, telephone, and structured inquiry form channels',
      '30 days of post-launch defect support + 100% code handover',
    ],
    exclusions: [
      'Complex multi-role backend databases',
      'Multi-vendor marketplace logic',
    ],
    clientPrerequisites: [
      'Page copy or outline for all included pages',
      'Active domain and DNS access for deployment',
    ],
    revisionPolicy: 'Up to 2 revision rounds per page stage prior to final production cutover.',
    whatsappMessage: 'Hi Arif, I want to rebuild our business website with your Swiss architecture (typical range ₹45k–₹75k). Let’s connect: ',
  },
  {
    id: 'custom-web-app',
    badge: 'FOR ADVANCED WORKFLOWS & APPS',
    title: 'Custom Web App / Portal',
    priceNote: 'Starting at ₹90,000',
    typicalRange: '₹90,000 – ₹1,60,000',
    timeline: '2 to 3 weeks',
    description: 'Tailored Next.js application, client dashboard, or high-performance headless e-commerce store built for scale.',
    inclusions: [
      'Next.js 15 App Router architecture with strict TypeScript',
      'Payment gateway integration (Razorpay, Cashfree, or Stripe) with automated GST invoicing',
      'Secure user authentication and role-based access',
      'Database integration (Supabase, PostgreSQL) or headless CMS',
      'Automated CI/CD deployment pipelines on Vercel or Cloudflare',
    ],
    exclusions: [
      'Native iOS/Android mobile apps',
      'Legacy monolithic CMS migrations without API support',
    ],
    clientPrerequisites: [
      'Detailed user flow specification or interactive wireframe',
      'Business KYC approved for payment gateway (if accepting payments)',
    ],
    revisionPolicy: 'Iterative sprint review at the end of each milestone phase.',
    whatsappMessage: 'Hi Arif, I have a custom web application project (starting at ₹90k+). Can we review scope and technical architecture? ',
  },
];

export const retainerService = {
  title: 'Peace of Mind Retainer',
  price: '₹15,000 / month',
  timeline: 'Rolling monthly agreement • Cancel anytime',
  description: 'Proactive engineering defense so your website never degrades in speed, breaks on mobile, or suffers from silent form failures.',
  inclusions: [
    '24/7 automated uptime and SSL health monitoring',
    'Core Web Vitals performance defense & monthly audits',
    'Up to 5 hours of design and content updates every month',
    'Priority direct WhatsApp channel with guaranteed 2-hour business day response',
    'Zero long-term lock-in: cancel anytime with 15 days notice',
  ],
  whatsappMessage: 'Hi Arif, I am interested in your Peace of Mind Retainer (₹15,000/month) for ongoing website defense. Here is my website: ',
};
```

---

## 3. UI Layout & Visual Hierarchy

* **Border-Collapse Swiss Grid**:
  - Container uses `grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden`.
  - Individual cards use `bg-card p-6 sm:p-8 flex flex-col justify-between`.
* **Visual Anchor for Popular Tier**:
  - "Complete Business Website" tier features a terracotta top indicator or subtle accent outline (`ring-2 ring-accent`).
* **Retainer Banner**:
  - Positioned directly below the 3 tiers.
  - Inverted obsidian styling (`bg-foreground text-background rounded-xl p-8`) or soft surface card with terracotta badge.
* **100% Code Ownership Guarantee Callout**:
  - Micro-callout: *"You own 100% of your source code and hosting accounts. Zero proprietary lock-in. Zero agency hostage fees."*

---

## 4. Quality Gate & Acceptance Criteria

### 4.1 Inputs & Prerequisites
- Design tokens from Phase 01.
- WhatsApp contact URLs configured in `lib/env.ts`.

### 4.2 Outputs & Deliverables
- `lib/services.ts`: Strongly typed service tiers, inclusions, exclusions, and retainer data.
- `components/sections/ServicesSection.tsx`: Master services section.
- `components/services/PricingCard.tsx`: Individual tier card component.
- `components/services/RetainerBanner.tsx`: Retainer subscription banner.

### 4.3 Acceptance Criteria
1. **Commercial Honesty**: Tiers clearly state starting prices and typical ranges. No unqualified "guarantees" of business outcomes.
2. **Exclusions & Client Obligations**: Every tier clearly lists exclusions and client requirements to prevent scope confusion.
3. **WhatsApp Link Prefill**: Every card has a direct WhatsApp button encoding the appropriate package inquiry text.
4. **Mobile Layout**: Stacks into single columns on viewports `<1024px` with clear spacing and 44px+ tap targets.
5. **Code Ownership Affirmation**: The 100% code ownership and zero lock-in policy is clearly visible.

### 4.4 Verification Commands
```bash
# Verify TypeScript strictness
pnpm.cmd run typecheck

# Verify build with services section
pnpm.cmd run build
```

### 4.5 Regression Prevention
- Changes in service data must not cause horizontal scrolling on mobile viewports.
- WhatsApp URLs must be constructed safely via `encodeURIComponent` without runtime errors.

### 4.6 Definition of Done
- [ ] `lib/services.ts` exports all 3 tiers + retainer with complete scope fields.
- [ ] `PricingCard.tsx` renders price note, range, inclusions, exclusions, and WhatsApp CTA.
- [ ] `RetainerBanner.tsx` displays monthly support terms and cancellation policy.
- [ ] `ServicesSection.tsx` mounts under `#services`.
- [ ] `pnpm.cmd run typecheck` and `pnpm.cmd run build` complete with 0 errors.
