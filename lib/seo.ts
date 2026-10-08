import { env } from "@/lib/env";

export const siteMetadata = {
  title: "Arif — Freelance Senior Software Engineer & Web Architect",
  description:
    "Fast mobile websites built with Next.js App Router for Indian businesses, D2C brands, and tech founders. Direct senior engineer access with zero agency middlemen.",
  url: env.NEXT_PUBLIC_SITE_URL,
  locale: "en_IN",
  author: "Arif",
  keywords: [
    "Freelance web developer India",
    "Senior software engineer portfolio",
    "High-converting landing pages India",
    "Core Web Vitals consultant",
    "Next.js developer India",
    "Fast mobile websites Jio 4G",
    "D2C speed optimization",
    "Kolkata web architect",
  ],
};

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${env.NEXT_PUBLIC_SITE_URL}/#person`,
      "name": "Arif",
      "jobTitle": "Freelance Senior Software Engineer & Web Architect",
      "url": env.NEXT_PUBLIC_SITE_URL,
      "sameAs": [
        "https://github.com/arif",
      ],
      "knowsAbout": [
        "Next.js",
        "Web Performance Optimization",
        "TypeScript",
        "Core Web Vitals",
        "Software Architecture",
        "Tailwind CSS",
        "React",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${env.NEXT_PUBLIC_SITE_URL}/#service`,
      "name": "Arif — Independent Web Engineering Practice",
      "url": env.NEXT_PUBLIC_SITE_URL,
      "priceRange": "₹18,000 - ₹1,60,000",
      "telephone": `+${env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
      },
      "areaServed": [
        {
          "@type": "Country",
          "name": "India",
        },
        {
          "@type": "AdministrativeArea",
          "name": "Worldwide (Remote)",
        },
      ],
    },
  ],
};
