export type EvidenceStatus =
  | 'independently-measured'   // Third-party audit (e.g. WebPageTest, Google CrUX)
  | 'pagespeed-measured'       // Google Lighthouse / PageSpeed Insights run
  | 'rum-measured'             // Real User Monitoring telemetry data
  | 'analytics-derived'        // GA4 / PostHog / Mixpanel verified data
  | 'client-reported'          // Stated directly by the client founder/CTO
  | 'internal-benchmark'       // Measured on staging/local testing harness
  | 'qualitative-feedback'     // Client review/testimonial without hard numbers
  | 'verified-technical-outcome' // Empirically verified architecture / technical delivery
  | 'placeholder'              // Representative architectural archetype (pre-launch)
  | 'unverified';              // Claim pending source data (DO NOT PUBLISH)

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  url: string;
  industry: string;
  sectorTag: string;
  problem: string;
  whatBuilt: string;
  result: string;
  metricsBadge: string;
  tags: string[];
  evidenceStatus: EvidenceStatus;
  featured: boolean;
}

export const EVIDENCE_REGISTRY: CaseStudy[] = [
  {
    id: "naaz-book-depot",
    title: "Naaz Book Depot",
    client: "Naaz Book Depot",
    url: "https://www.naazbook.in",
    industry: "E-Commerce / Islamic Books & Publishing",
    sectorTag: "E-Commerce · Publishing · Kolkata",
    problem: "A decades-old Kolkata publishing house established in 1967 needed an online storefront to bring its extensive physical catalogue, category hierarchy, and ordering workflows online for customers across India.",
    whatBuilt: "Custom e-commerce storefront with structured product discovery, Islamic book categorization (Qur'an editions, Hadith, literature, accessories), product pages, shopping cart, and online checkout integration.",
    result: "Active online storefront serving readers across India, showcasing 2,000+ titles with responsive mobile browsing and secure digital payment processing.",
    metricsBadge: "Pan-India Commerce",
    tags: ["Next.js", "E-Commerce", "SEO Architecture", "Responsive UI"],
    evidenceStatus: "verified-technical-outcome",
    featured: true,
  },
  {
    id: "haircrew",
    title: "HairCrew",
    client: "HairCrew",
    url: "https://www.haircrew.in",
    industry: "D2C / Haircare / Beauty",
    sectorTag: "D2C · Haircare · E-Commerce",
    problem: "A professional haircare brand required a high-performance digital storefront capable of showcasing a growing multi-tier product line without sluggish loading speeds on mobile devices.",
    whatBuilt: "Product-focused e-commerce experience featuring category discovery across shampoos, conditioners, and specialized salon treatments, with direct Add to Cart and seamless mobile checkout.",
    result: "Live digital storefront presenting 18+ professional products with instant category filtering, real-time availability states, and rapid mobile purchasing.",
    metricsBadge: "18+ Product Catalogue",
    tags: ["Next.js", "D2C E-Commerce", "Mobile Checkout", "Responsive UI"],
    evidenceStatus: "verified-technical-outcome",
    featured: true,
  },
  {
    id: "athar-boutique",
    title: "Athar Boutique",
    client: "Athar Boutique",
    url: "https://athar-boutique.vercel.app",
    industry: "Fashion / Islamic Apparel / D2C",
    sectorTag: "Fashion · Apparel · Social Commerce",
    problem: "An Islamic fashion and bespoke boutique needed a mobile-first digital catalogue designed around social commerce and direct customer communication, rather than an impersonal checkout cart.",
    whatBuilt: "Mobile-optimized responsive catalogue experience showcasing ready-made and bespoke tailored collections with direct consultation routing to WhatsApp.",
    result: "Frictionless direct-to-WhatsApp customer journey tailored for custom sizing inquiries and high-touch bespoke garment sales.",
    metricsBadge: "Social Commerce",
    tags: ["Next.js", "Tailwind CSS", "Social Commerce", "Mobile First"],
    evidenceStatus: "verified-technical-outcome",
    featured: true,
  },
  {
    id: "script-forge",
    title: "Script Forge",
    client: "Script Forge",
    url: "https://script-forge-alpha.vercel.app",
    industry: "Developer Tools / SaaS / Software",
    sectorTag: "Developer Tools · Web Application · SaaS",
    problem: "A developer software utility required a dedicated, intuitive web application interface with responsive client-side state handling and clean utility workflows.",
    whatBuilt: "Bespoke web application architecture engineered with clean state management, modular tooling panels, and instant client-side execution.",
    result: "Interactive SaaS tool delivering snappy utility execution and responsive layout across mobile and desktop browser viewports.",
    metricsBadge: "Interactive SaaS App",
    tags: ["Next.js", "TypeScript", "Web Application", "React"],
    evidenceStatus: "verified-technical-outcome",
    featured: true,
  },
  {
    id: "all-buzz-cleaning",
    title: "All Buzz Cleaning — CRUX",
    client: "All Buzz Cleaning",
    url: "https://allbuzzcleaning.vercel.app",
    industry: "Local Business / Cleaning Services / SaaS",
    sectorTag: "Local Business · Review SaaS · Automation",
    problem: "A UK-based cleaning services company needed a modern local business presence integrated with CRUX, a dedicated review-management SaaS workflow to capture and showcase client feedback.",
    whatBuilt: "Dual-purpose web platform uniting service discovery, local quotation inquiries, and automated CRUX customer review-collection workflows.",
    result: "Streamlined customer acquisition pipeline with integrated reputation capture and high-trust service presentation.",
    metricsBadge: "SaaS & Workflow Integration",
    tags: ["Next.js", "SaaS Integration", "Review Management", "Responsive UI"],
    evidenceStatus: "verified-technical-outcome",
    featured: false,
  },
  {
    id: "prasu-techno",
    title: "Prasoutech",
    client: "Prasu Techno",
    url: "https://prasutechno.com",
    industry: "B2B / Technology / Industrial",
    sectorTag: "B2B · Technology · Industrial",
    problem: "A technology and industrial B2B enterprise needed a bespoke corporate web presence to articulate engineering capabilities clearly without generic template bloat.",
    whatBuilt: "Custom corporate web architecture with structured service capability breakdowns, industrial specifications, and direct enterprise lead routing.",
    result: "High-trust B2B corporate digital footprint featuring fast load times, clean typographic hierarchy, and semantic SEO structure.",
    metricsBadge: "B2B Corporate Presence",
    tags: ["Next.js", "TypeScript", "Corporate Architecture", "Responsive UI"],
    evidenceStatus: "verified-technical-outcome",
    featured: false,
  },
  {
    id: "mummas-bee",
    title: "Mumma's Bee",
    client: "Mumma's Bee",
    url: "https://mummasbee.vercel.app",
    industry: "D2C / Consumer Products",
    sectorTag: "D2C · Consumer Goods · Storefront",
    problem: "A consumer-facing brand needed a modern digital storefront focused on rapid product discovery and straightforward purchasing on mobile devices.",
    whatBuilt: "Clean, responsive product showcase with straightforward navigation, product detail views, and friction-free buying journey.",
    result: "Consumer storefront engineered for swift cellular browsing and distraction-free mobile purchasing.",
    metricsBadge: "D2C Storefront",
    tags: ["Next.js", "E-Commerce", "Responsive UI", "Tailwind CSS"],
    evidenceStatus: "verified-technical-outcome",
    featured: false,
  },
];
