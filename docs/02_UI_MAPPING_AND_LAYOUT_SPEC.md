# 02. UI Mapping & Layout Specification

**Project**: Arif Portfolio  
**Brand Identity**: Arif — Freelance Senior Software Engineer & Web Architect  
**Design Reference**: Replicated pixel-by-pixel from `C:\Users\USER\Documents\Builds\kolk` (Swiss-Modernist Warm Linen & Deep Espresso Aesthetic)

---

## 1. Global Shell & Layout Architecture

The site follows the Swiss-modernist design architecture of **Kolk**:
* **Grid**: 96px hairline grid (`hairline-grid`) on desktop with soft borders.
* **Canvas**: Warm Linen Ivory (`#FAF8F5`) with Deep Espresso Obsidian (`#1C1917`) typography.
* **Card & Surfaces**: Soft Warm Alabaster (`#F4F1EB`) and Pure White (`#FFFFFF`) with paper elevation shadows (`shadow-paper`, `shadow-paper-lift`).
* **Accent**: Rich Burnt Terracotta / Signal Vermilion (`#C05621`).

### Global Shell Components

1. **Sticky Top Bar (`<Header />`)**:
   - Pinned at top with backdrop blur (`bg-background/85 backdrop-blur-md border-b border-border`).
   - Left: `Arif.` logo with terracotta signal dot (`Arif<span className="text-accent">.</span>`).
   - Center (Desktop): Anchor navigation (`Work`, `Services`, `Problems`, `About`, `Contact`).
   - Right: Availability badge (`● Available for Projects`) + Terracotta Button (`Discuss Project` $\rightarrow$ triggers async brief drawer or WhatsApp).

2. **Mobile Action Bar (`<MobileActionBar />`)**:
   - Fixed at bottom of screen on mobile (`lg:hidden`), safe-area padded.
   - Two ergonomic thumb buttons:
     - `[ Quick Inquire ]` (Solid Terracotta: opens brief drawer)
     - `[ 💬 WhatsApp ]` (Outlined Espresso: one-tap chat launch)

3. **Inverted Dark Contact & Footer (`<ContactSection />` & `<Footer />`)**:
   - Inverted full-bleed espresso obsidian section (`bg-foreground text-background`).
   - Features Cal.com scheduler embed, direct WhatsApp hotline, email, and live status telemetry.

---

## 2. Page Wireframe & Section-by-Section Mapping

The entire website is structured as a seamless, high-performance single-page application with smooth anchor scrolling (Lenis engine).

```
┌────────────────────────────────────────────────────────────────────────┐
│ [Sticky Header]  Arif.      Work   Services   Problems   About   [Contact] │
├────────────────────────────────────────────────────────────────────────┤
│ HERO SECTION                                                           │
│  Label: SENIOR SOFTWARE ENGINEER & FREELANCE ARCHITECT                 │
│  Heading: "Websites that load in under 1 second and convert."          │
│  Subhead: Fast, custom websites for Indian businesses, D2C brands,     │
│           and founders. No agency middlemen, no bloated templates.     │
│  CTAs: [ 💬 WhatsApp Arif ] (Terracotta)   [ 📹 Get 3-Min Video Review]│
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ THE SPEED & TELEMETRY DOGFOODING LAB                             │  │
│  │ Live real-time benchmark of this exact website:                  │  │
│  │ • Mobile Load: 0.62s (Jio 4G)   • Performance: 100/100           │  │
│  │ • Total Bundle: 38KB            • TTFB: 42ms                     │  │
│  └──────────────────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 1: #work — FLAGSHIP PROJECTS & VERIFIED OUTCOMES               │
│  Label: PROVEN RESULTS                                                 │
│  Heading: "Selected Work & Engineering Case Studies"                   │
│  [Tactile Project Cards with Cursor-Following Floating Pills]          │
│  • Case 1: D2C Storefront Speed Overhaul (LCP 5.8s -> 0.8s on 4G)      │
│  • Case 2: High-Ticket Corporate Portal (Swiss Editorial Design)       │
│  • Case 3: Custom Next.js Web Application & SaaS Launch                │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 2: #services — CLEAR, FIXED FREELANCE TIERS                    │
│  Label: HONEST PRICING • ZERO AGENCY OVERHEAD                          │
│  Heading: "Transparent Service Packages"                               │
│                                                                        │
│  ┌────────────────────┐  ┌────────────────────┐  ┌───────────────────┐ │
│  │ LANDING PAGE       │  │ COMPLETE WEBSITE   │  │ CUSTOM WEB APP    │ │
│  │ ₹18,000 – ₹32,000  │  │ ₹45,000 – ₹75,000  │  │ ₹90,000–₹1,60,000 │ │
│  │ Turnaround: 4 Days │  │ Turnaround: 10 Days│  │ Turnaround: 3 Wks │ │
│  │ • Meta/Google ads  │  │ • 5–8 Custom Pages │  │ • Full Next.js 15 │ │
│  │ • Sub-second speed │  │ • Swiss Typography │  │ • Custom Auth/DB  │ │
│  │ • 1-Tap WhatsApp   │  │ • On-Page SEO      │  │ • Payment Gateway │ │
│  │ [Inquire on WA →]  │  │ [Inquire on WA →]  │  │ [Discuss Scope →] │ │
│  └────────────────────┘  └────────────────────┘  └───────────────────┘ │
│                                                                        │
│  Add-on: "Peace of Mind" Monthly Retainer (₹15,000/mo)                 │
│  Speed Defense • Monthly Edits • Priority WhatsApp Support             │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 3: #problems — WHY AGENCIES FAIL & THE FREELANCE TRUTH        │
│  Label: THE PROBLEMS WE SOLVE                                          │
│  Heading: "Why Indian Businesses Switch to a Solo Senior Engineer"     │
│  Comparison Matrix (The Agency Trap vs. Working with Arif):            │
│  • Agency: Junior interns assigned ──> Arif: Senior architect builds   │
│  • Agency: 3–6 month delays       ──> Arif: 4 to 12 day delivery       │
│  • Agency: Monthly hostage fees   ──> Arif: 100% code ownership        │
│  • Agency: Account manager game   ──> Arif: Direct WhatsApp connection │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 4: #about — THE ARCHITECT BEHIND THE CODE                      │
│  Label: ABOUT ARIF                                                     │
│  Heading: "Senior Craftsmanship. No Bloat. Full Ownership."           │
│  Bio, core engineering philosophy, stack breakdown (Next.js, React,    │
│  Tailwind, TypeScript), and the zero-bullshit delivery pledge.         │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 5: #contact — INVERTED OBSIDIAN ACTION SUITE                   │
│  (Deep Espresso #1C1917 Background with Warm Ivory Text)               │
│  Heading: "Let's build a website that actually grows your business."   │
│  • Primary: One-Tap WhatsApp Direct (+91...)                           │
│  • Secondary: Request a Free 3-Minute Video Review of your site        │
│  • Tertiary: Book a 20-Minute Video Call (Cal.com integration)         │
│  • Direct Email: arif@arif.build                                       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Hierarchy & Interactive Specifications

### 1. Hero Telemetry & Dogfooding Card
* **Purpose**: Proves Arif's technical ability before asking for a single rupee.
* **Component**: `<LiveTelemetryCard />`
* **Features**:
  - Displays actual real-time Performance Score (100), Speed Index (<0.8s), and Bundle Size (<40KB) of Arif's site.
  - Interactive tooltip explaining in plain English: *"This is how fast your site will load for your customers on mobile."*

### 2. Tactile Project Showcase Cards
* **Reference**: Modeled on the Kolk portfolio interaction.
* **Component**: `<WorkCard />`
* **Interaction**:
  - Card with soft paper shadow (`shadow-paper`).
  - On cursor hover: Floating pill tracks cursor movement showing `[ View Case Study ]` or `[ View Live ]`.
  - Shows clear business metrics: *"Bounce rate dropped 41% • Mobile load reduced from 6.2s to 0.7s"*.

### 3. Freelance Pricing Grid
* **Component**: `<PricingGrid />`
* **Structure**: 3 primary cards + 1 recurring retainer banner.
* **Key Details**:
  - Transparent INR pricing ranges with delivery timelines.
  - "What’s Included" and "What’s Not Included" clearly itemized to avoid scope creep.
  - One-tap CTA connecting straight to WhatsApp with pre-filled package interest.

### 4. Interactive Async Brief Drawer
* **Component**: `<AsyncBriefDrawer />`
* **Trigger**: Clicked via *"Get 3-Min Video Review"* or *"Quick Inquire"*.
* **Fields**:
  1. Website URL (or business description).
  2. What is currently broken / what do you need?
  3. WhatsApp Number or Email.
* **Experience**: Zero lengthy questionnaires. Takes under 30 seconds to submit. Arif records a Loom video and responds within 24 hours.

---

## 4. Mobile Ergonomics & Breakpoint Rules

| Breakpoint | Layout Behavior | Navigation & CTA Handling |
|---|---|---|
| **Desktop (`>= 1024px`)** | Full 96px hairline grid, multi-column bento cards, tactile hover pills. | Sticky top bar with anchor links and terracotta CTA. |
| **Tablet (`768px – 1023px`)** | 2-column stacked layout, touch-optimized card buttons. | Top bar collapse into minimal pill. |
| **Mobile (`< 768px`)** | Single column stack, full-width cards, edge-to-edge padding (16px). | Fixed Bottom Action Bar: `[ Quick Inquire ]` (terracotta) and `[ WhatsApp ]` (outline). Top header remains minimal. |
