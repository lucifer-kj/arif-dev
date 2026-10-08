# Phase 02: Application Shell, Navigation & Mobile Action Dock

**Phase ID**: `SPEC-PHASE-02`  
**Status**: Ready for Implementation  
**Dependencies**: [`docs/spec/phase-00-truth-content-evidence-audit.md`](./phase-00-truth-content-evidence-audit.md), [`docs/spec/phase-01-core-foundation-security-design-tokens.md`](./phase-01-core-foundation-security-design-tokens.md)  
**Deliverables**: `app/layout.tsx`, `components/providers/SmoothScroll.tsx`, `components/layout/Header.tsx`, `components/layout/MobileActionBar.tsx`, `components/layout/Footer.tsx`, `lib/seo.ts`

---

## 1. Objectives & Scope

1. **Global Layout & SEO Architecture**: Construct the root HTML shell (`app/layout.tsx`) with strict metadata, OpenGraph tags, JSON-LD schema (`Person` and `ProfessionalService`), and accessible skip-to-content links.
2. **Accessible Smooth Scroll**: Deploy momentum scrolling (`components/providers/SmoothScroll.tsx`) using Lenis with immediate graceful degradation if JavaScript is disabled or `prefers-reduced-motion` is detected.
3. **Sticky Swiss Header**: Implement a minimalist Swiss header (`components/layout/Header.tsx`) featuring the `Arif.` brand mark, desktop navigation links, an availability status pill, and a primary action trigger.
4. **Mobile Action Dock**: Build an ergonomic fixed thumb bar (`components/layout/MobileActionBar.tsx`) visible only on mobile viewports (`lg:hidden`) with high-conversion WhatsApp and consultation actions.
5. **Inverted Obsidian Footer**: Implement the dark espresso footer (`components/layout/Footer.tsx`) containing system provenance, operational status, and direct booking links.

---

## 2. SEO & Structured Data Architecture (`lib/seo.ts`, `app/layout.tsx`)

### 2.1 Metadata Specification

```typescript
export const siteMetadata = {
  title: 'Arif — Freelance Senior Software Engineer & Web Architect',
  description: 'Fast mobile websites built with Next.js App Router for Indian businesses, D2C brands, and tech founders. Direct senior engineer access with zero agency middlemen.',
  url: 'https://arif.work',
  locale: 'en_IN',
  author: 'Arif',
  keywords: [
    'Freelance web developer India',
    'Senior software engineer portfolio',
    'High-converting landing pages India',
    'Core Web Vitals consultant',
    'Next.js developer India',
    'Fast mobile websites Jio 4G',
    'D2C speed optimization',
  ],
};
```

### 2.2 JSON-LD Structured Data Schema (`ProfessionalService` & `Person`)

Injected into the `<head>` in `app/layout.tsx` to provide unambiguous machine-readable entity definitions:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://arif.work/#person",
      "name": "Arif",
      "jobTitle": "Freelance Senior Software Engineer & Web Architect",
      "url": "https://arif.work",
      "knowsAbout": [
        "Next.js",
        "Web Performance Optimization",
        "TypeScript",
        "Core Web Vitals",
        "Software Architecture"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://arif.work/#service",
      "name": "Arif — Independent Web Engineering Practice",
      "url": "https://arif.work",
      "priceRange": "₹18,000 - ₹1,60,000",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "areaServed": [
        {
          "@type": "Country",
          "name": "India"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Worldwide (Remote)"
        }
      ]
    }
  ]
}
```

---

## 3. Component Architecture & Props Contracts

### 3.1 Skip Link & Layout Shell (`app/layout.tsx`)
* **Accessible Skip Link**: Placed as the very first element inside `<body>`:
  ```html
  <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-sm focus:shadow-paper">
    Skip to main content
  </a>
  ```
* **Main Tag**: `<main id="main-content" tabIndex={-1} className="pb-24 lg:pb-0">` ensures the mobile dock does not cover content on mobile viewports.

### 3.2 Smooth Scroll Provider (`components/providers/SmoothScroll.tsx`)
* Implements Lenis (`@studio-freight/lenis` or `lenis/react`).
* Checks `window.matchMedia('(prefers-reduced-motion: reduce)')`. If reduced motion is preferred, Lenis is not initialized and default browser scrolling is retained.
* Does not prevent native anchor jumps (`#work`, `#services`, `#contact`).

### 3.3 Sticky Swiss Header (`components/layout/Header.tsx`)
* **Styling**: `sticky top-0 z-40 w-full bg-background/90 backdrop-blur-md border-b border-border/80 transition-all`.
* **Brand Mark**: `Arif<span className="text-accent">.</span>` (`text-xl font-semibold tracking-[-0.04em] text-foreground`).
* **Desktop Navigation Links** (`hidden md:flex items-center gap-8`):
  - `Work` (`href="#work"`)
  - `Services` (`href="#services"`)
  - `Problems` (`href="#problems"`)
  - `About` (`href="#about"`)
  - `Contact` (`href="#contact"`)
* **Availability Micro-Badge**:
  - Live indicator: Emerald dot with pulse animation + text: `"Available for Projects"` (`label-xs text-muted-foreground`).
* **Terracotta Action**:
  - Button/Link: `"Discuss Project"` (`bg-accent text-accent-foreground hover:opacity-90 px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm`).

### 3.4 Fixed Mobile Action Bar (`components/layout/MobileActionBar.tsx`)
* **Visibility**: `fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-lg border-t border-border px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-paper-lift`.
* **Touch-Optimized Targets**: 2 columns with minimum 44px tap target height:
  - **Quick Inquire Button**: Primary terracotta fill (`bg-accent text-accent-foreground`). Triggers scroll to `#contact` or opens brief modal.
  - **WhatsApp Direct Button**: Obsidian outline button (`border border-border text-foreground hover:bg-surface`). Opens direct WhatsApp chat with pre-filled greeting:
    `https://wa.me/919876543210?text=Hi%20Arif,%20I%20am%20interested%20in%20discussing%20a%20project.`

### 3.5 Inverted Obsidian Footer (`components/layout/Footer.tsx`)
* **Surface**: `bg-foreground text-background py-16 px-6 border-t border-foreground/20`.
* **Branding & Identity**: Re-asserts Arif as an independent software engineer and web architect.
* **Direct Booking & Channels**: Email, WhatsApp, Cal.com scheduling link, GitHub profile.
* **Provenance & Performance Micro-Label**:
  `● Built with Next.js App Router (Static SSG) • Zero Database Overhead • Styled with OKLCH Tokens`

---

## 4. Quality Gate & Acceptance Criteria

### 4.1 Inputs & Prerequisites
- Phase 01 design tokens and base styles active in `app/globals.css`.
- Inter font configured via `next/font/google`.

### 4.2 Outputs & Deliverables
- `app/layout.tsx`: Root HTML layout with metadata, JSON-LD, and skip link.
- `lib/seo.ts`: Structured SEO metadata and Schema.org objects.
- `components/providers/SmoothScroll.tsx`: Reduced-motion aware scrolling provider.
- `components/layout/Header.tsx`: Sticky navigation header.
- `components/layout/MobileActionBar.tsx`: Fixed mobile bottom dock with safe area padding.
- `components/layout/Footer.tsx`: Inverted obsidian footer.

### 4.3 Acceptance Criteria
1. **Accessibility Compliance (WCAG 2.2 AA)**:
   - Skip link is the first tab stop and focuses `#main-content`.
   - All navigation items and buttons meet 44x44px minimum touch targets.
   - Contrast ratio for header navigation text against ivory background exceeds 4.5:1.
2. **Mobile Viewport Ergonomics**:
   - At 360px and 390px widths, the header remains single-line without clipping.
   - Mobile action dock is sticky at the bottom with safe area spacing on iOS.
   - Content inside `<main>` has bottom padding (`pb-24`) so it is never obscured by the mobile dock.
3. **Structured Data Validation**:
   - Output HTML passes Google Rich Results test with valid `Person` and `ProfessionalService` graphs.
4. **Graceful Degradation**:
   - If JavaScript is disabled, navigation anchor links still jump cleanly to `#work`, `#services`, `#contact`.

### 4.4 Verification Commands
```bash
# Verify TypeScript strictness
pnpm.cmd run typecheck

# Verify build and layout compilation
pnpm.cmd run build
```

### 4.5 Regression Prevention
- Layout components must not introduce layout shifts (CLS < 0.05).
- Sticky header must use CSS `sticky` rather than JavaScript scroll listener positions to avoid jank.

### 4.6 Definition of Done
- [ ] `app/layout.tsx` embeds skip link, metadata, and JSON-LD schema.
- [ ] Header renders brand mark, nav anchors, and availability pill.
- [ ] Mobile action bar renders on screens `<1024px` with WhatsApp and Inquire buttons.
- [ ] Footer renders inverted espresso styling and direct contact links.
- [ ] `pnpm.cmd run typecheck` and `pnpm.cmd run build` succeed with 0 errors.
