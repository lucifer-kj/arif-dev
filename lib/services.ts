export interface ServiceTier {
  id: string;
  badge: string;
  title: string;
  priceNote: string;
  typicalRange: string;
  timeline: string;
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
    description: 'Engineered specifically to convert paid Meta and Google ad traffic into qualified WhatsApp inquiries and verified leads on mobile cellular connections.',
    inclusions: [
      '1 bespoke, high-performance landing page (zero generic WordPress templates)',
      'Sub-second mobile delivery target on 4G cellular networks',
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
    revisionPolicy: 'Up to 2 structured revision rounds within 7 days of staging handover.',
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
      'Next.js App Router architecture with strict TypeScript',
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
