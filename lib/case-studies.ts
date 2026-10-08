export type CaseStudyEvidenceStatus =
  | 'VERIFIED_TECHNICAL_OUTCOME'
  | 'MEASURED_CLIENT_OUTCOME'
  | 'CLIENT_REPORTED'
  | 'ARCHITECTURAL_BENCHMARK'
  | 'CONCEPT_PROTOTYPE';

export type CaseStudyCategory = 'ecommerce' | 'saas' | 'b2b';

export interface MetricHighlight {
  label: string;
  value: string;
  context: string;
}

export interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  client: string;
  clientType: string;
  category: CaseStudyCategory;
  evidenceStatus: CaseStudyEvidenceStatus;
  evidenceNote: string;
  problem: string;
  whatBuilt: string;
  result: string;
  metrics: MetricHighlight[];
  stack: string[];
  liveUrl: string;
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "naaz-book-depot",
    tag: "E-COMMERCE · PUBLISHING · KOLKATA",
    title: "Naaz Book Depot — Pan-India Islamic Books Storefront",
    client: "Naaz Book Depot",
    clientType: "E-Commerce / Publishing",
    category: "ecommerce",
    evidenceStatus: "VERIFIED_TECHNICAL_OUTCOME",
    evidenceNote: "Verified technical delivery: Full-stack online storefront with payment & catalogue architecture.",
    problem: "A decades-old Islamic publishing house established in 1967 needed to bring its physical catalogue of thousands of titles online with smooth mobile browsing and online checkout.",
    whatBuilt: "Custom e-commerce storefront with structured product discovery, Islamic book categorisation (Qur'an editions, Hadith, literature, accessories), product pages, cart, and payment checkout integration.",
    result: "A functioning online storefront serving customers across India, with the business currently presenting 2,000+ titles and accepting pan-India orders online.",
    metrics: [
      { label: "Catalogue Scope", value: "2,000+ Titles", context: "Structured digital library" },
      { label: "Delivery Reach", value: "Pan-India", context: "Online checkout & shipping" },
      { label: "Architecture", value: "Custom Next.js", context: "Zero bloated CMS plugins" },
    ],
    stack: ["Next.js", "E-Commerce", "Checkout Architecture", "SEO Foundations", "Responsive UI"],
    liveUrl: "https://www.naazbook.in",
    featured: true,
  },
  {
    id: "haircrew",
    tag: "D2C · HAIRCARE · E-COMMERCE",
    title: "HairCrew — High-Performance D2C Haircare Storefront",
    client: "HairCrew",
    clientType: "D2C Brand",
    category: "ecommerce",
    evidenceStatus: "VERIFIED_TECHNICAL_OUTCOME",
    evidenceNote: "Verified technical delivery: Product-focused D2C e-commerce experience.",
    problem: "A professional haircare brand required a high-performance digital storefront capable of showcasing a growing product catalogue with swift mobile load speeds.",
    whatBuilt: "A product-focused e-commerce experience with category discovery across Shampoo, Conditioner, and Treatment, product pages, pricing, availability states, and cart flow.",
    result: "The live catalogue presents 18+ professional products with instant category filtering and direct frictionless Add to Cart purchasing on mobile cellular connections.",
    metrics: [
      { label: "Live Catalogue", value: "18+ Products", context: "Multi-category navigation" },
      { label: "Mobile Flow", value: "Direct Cart", context: "Frictionless mobile purchasing" },
      { label: "Rendering", value: "Sub-Second", context: "Optimized modern asset pipeline" },
    ],
    stack: ["Next.js", "D2C E-Commerce", "Category Discovery", "Responsive UI", "Tailwind CSS"],
    liveUrl: "https://haircrew.in",
    featured: true,
  },
  {
    id: "athar-boutique",
    tag: "FASHION · APPAREL · SOCIAL COMMERCE",
    title: "Athar Boutique — Mobile-First Islamic Apparel Catalogue",
    client: "Athar Boutique",
    clientType: "Fashion / Boutique",
    category: "ecommerce",
    evidenceStatus: "VERIFIED_TECHNICAL_OUTCOME",
    evidenceNote: "Verified technical delivery: Custom responsive catalogue with direct consultation routing.",
    problem: "An Islamic fashion boutique needed a mobile-first digital catalogue centered around tailored apparel and direct customer communication, rather than an impersonal automated checkout.",
    whatBuilt: "Custom responsive storefront with curated collections for ready-made and bespoke tailored apparel, integrated with direct WhatsApp customer consultation channels.",
    result: "High-touch customer journey eliminating friction for bespoke tailoring consultations and direct client conversations.",
    metrics: [
      { label: "Primary Workflow", value: "Social Commerce", context: "Direct WhatsApp client flow" },
      { label: "Device Focus", value: "Mobile First", context: "Designed for Instagram ad traffic" },
      { label: "Experience", value: "Custom Tailored", context: "Bespoke & ready-made apparel" },
    ],
    stack: ["Next.js", "Tailwind CSS", "Social Commerce", "Mobile First", "Vercel"],
    liveUrl: "https://athar-boutique.vercel.app",
    featured: true,
  },
  {
    id: "script-forge",
    tag: "DEVELOPER TOOLS · WEB APP · SAAS",
    title: "Script Forge — Interactive Developer Utility Application",
    client: "Script Forge",
    clientType: "Software / SaaS",
    category: "saas",
    evidenceStatus: "VERIFIED_TECHNICAL_OUTCOME",
    evidenceNote: "Verified technical delivery: Custom application architecture and interactive web app UI.",
    problem: "A developer tooling product required a dedicated web application interface with responsive client-side state handling and utility workflows.",
    whatBuilt: "Custom web application architecture featuring modular tooling panels, interactive code utilities, and responsive desktop/mobile viewports.",
    result: "Snappy, interactive web software proving client-side state management, responsive UI design, and modern full-stack frontend engineering.",
    metrics: [
      { label: "Application Type", value: "Interactive SaaS", context: "Dedicated product UI" },
      { label: "State Handling", value: "Client-Side", context: "Instant utility execution" },
      { label: "Architecture", value: "Modular", context: "Clean component structure" },
    ],
    stack: ["Next.js", "TypeScript", "React", "State Management", "Tailwind CSS"],
    liveUrl: "https://script-forge-alpha.vercel.app",
    featured: true,
  },
  {
    id: "all-buzz-cleaning",
    tag: "LOCAL BUSINESS · REVIEW SAAS · WORKFLOW",
    title: "All Buzz Cleaning & CRUX — Review-Integrated Web Presence",
    client: "All Buzz Cleaning",
    clientType: "Local Business / SaaS",
    category: "saas",
    evidenceStatus: "VERIFIED_TECHNICAL_OUTCOME",
    evidenceNote: "Verified technical delivery: Local business web presence connected to review management SaaS.",
    problem: "A UK-based cleaning business required a modern service presence combined with CRUX review-management functionality to capture and highlight client feedback.",
    whatBuilt: "A hybrid local-business presence uniting service discovery with review-management workflows to streamline customer booking inquiries and reputation capture.",
    result: "Dual-purpose web platform serving customer quotation requests alongside automated review collection.",
    metrics: [
      { label: "SaaS Workflow", value: "CRUX Review Sync", context: "Reputation capture integration" },
      { label: "Target Market", value: "UK Local Business", context: "Local service presentation" },
      { label: "Outcome", value: "Integrated Leads", context: "Booking & feedback workflows" },
    ],
    stack: ["Next.js", "SaaS Integration", "Review Management", "Responsive UI"],
    liveUrl: "https://allbuzzcleaning.vercel.app",
    featured: false,
  },
  {
    id: "prasutechno",
    tag: "B2B · TECHNOLOGY · INDUSTRIAL",
    title: "Prasoutech — Custom Corporate Architecture",
    client: "Prasu Techno",
    clientType: "B2B Technology",
    category: "b2b",
    evidenceStatus: "VERIFIED_TECHNICAL_OUTCOME",
    evidenceNote: "Verified technical delivery: Custom responsive corporate presence.",
    problem: "A technology-oriented B2B enterprise needed to present its engineering capabilities and service offerings clearly without generic agency template bloat.",
    whatBuilt: "Bespoke corporate web architecture highlighting technological service offerings, industrial specifications, and direct enterprise lead routing.",
    result: "High-trust corporate digital footprint featuring fast load times, clean typographic hierarchy, and semantic SEO structure.",
    metrics: [
      { label: "Engagement", value: "B2B Enterprise", context: "Direct corporate inquiries" },
      { label: "Build Quality", value: "Zero Template Bloat", context: "Bespoke semantic architecture" },
      { label: "SEO Foundation", value: "Structured Data", context: "Clean search indexing" },
    ],
    stack: ["Next.js", "TypeScript", "Semantic HTML", "Tailwind CSS"],
    liveUrl: "https://prasutechno.com",
    featured: false,
  },
  {
    id: "mummas-bee",
    tag: "D2C · CONSUMER PRODUCTS · STOREFRONT",
    title: "Mumma's Bee — Consumer Brand Storefront",
    client: "Mumma's Bee",
    clientType: "D2C / Consumer Goods",
    category: "ecommerce",
    evidenceStatus: "VERIFIED_TECHNICAL_OUTCOME",
    evidenceNote: "Verified technical delivery: Clean, responsive consumer e-commerce storefront.",
    problem: "A consumer-facing brand needed a modern digital storefront focused on rapid product discovery and straightforward purchasing on mobile devices.",
    whatBuilt: "Clean, responsive product showcase with straightforward navigation, product detail views, and friction-free buying journey.",
    result: "Consumer storefront engineered for swift cellular browsing and distraction-free mobile purchasing.",
    metrics: [
      { label: "Device Target", value: "Cellular 4G/5G", context: "Fast mobile rendering" },
      { label: "Catalogue UX", value: "Direct Discovery", context: "Streamlined product flow" },
      { label: "Code Quality", value: "Zero Agency Bloat", context: "Lightweight architecture" },
    ],
    stack: ["Next.js", "E-Commerce", "Responsive UI", "Tailwind CSS"],
    liveUrl: "https://mummasbee.vercel.app",
    featured: false,
  },
];
