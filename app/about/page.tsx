import type { Metadata } from "next";
import { Container } from "@/components/ui/primitives";
import { Cpu, Terminal, GitBranch, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { env } from "@/lib/env";
import { WhatsAppIcon } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "About Arif — Senior Software Engineer & Web Architect",
  description:
    "Independent web engineering practice focused on sub-second mobile performance, transparent pricing, and direct engineer collaboration for Indian businesses and tech founders.",
};

const principles = [
  {
    index: "01",
    title: "Performance as a Core Business Metric",
    body: "Mobile rendering speed is not a vanity metric—it directly dictates your ad bounce rate, Google ranking potential, and checkout conversions on 4G cellular data. If your page takes 6 seconds to render on Jio or Airtel, 50% of your paid traffic leaves before reading your headline.",
    icon: Cpu,
  },
  {
    index: "02",
    title: "Single-Threaded Senior Focus",
    body: "When you book a sprint with me, you work directly with a senior engineer writing the code. Zero account managers, zero communication delays, and no junior interns. Decisions happen in minutes on WhatsApp or video call, not across weeks of ticket queues.",
    icon: Terminal,
  },
  {
    index: "03",
    title: "100% Code & Asset Ownership",
    body: "You receive full rights to your source code, GitHub repository, domain registrations, and cloud deployments upon project completion. Zero vendor lock-in, zero hostage maintenance contracts.",
    icon: GitBranch,
  },
  {
    index: "04",
    title: "Calm, Predictable Engineering",
    body: "No endless scope creep or unbudgeted surprises. All deliverables, revision windows, and timelines are bounded upfront before any code is deployed to staging.",
    icon: ShieldCheck,
  },
];

const techStack = [
  { name: "Next.js App Router", detail: "Static Site Generation (SSG) for instant TTFB" },
  { name: "TypeScript Strict Mode", detail: "Zero runtime type compromises" },
  { name: "Tailwind CSS v4 & OKLCH", detail: "Modern Swiss-inspired design tokens" },
  { name: "Core Web Vitals Engineering", detail: "Optimized LCP, INP, and zero CLS" },
  { name: "Direct WhatsApp Channels", detail: "High-converting inquiry flows" },
  { name: "Cal.com API Integration", detail: "Frictionless meeting scheduling" },
  { name: "Razorpay / Stripe Gateways", detail: "Compliant payment & invoicing pipelines" },
  { name: "Vercel & Cloudflare Edge", detail: "Global edge CDN caching" },
];

export default function AboutPage() {
  const whatsappUrl = `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Arif, I read your engineering stance and would like to discuss collaborating on a project."
  )}`;

  return (
    <div className="py-12 sm:py-16 lg:py-24">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl">
          <p className="label-xs text-accent">Engineering Stance</p>
          <h1 className="mt-3 text-fluid-heading font-semibold text-foreground text-balance">
            Senior Engineering Craft. Direct Collaboration. Absolute Ownership.
          </h1>
          <p className="mt-4 text-fluid-body text-muted-foreground leading-relaxed">
            The philosophy, standards, and technical commitments behind an independent web engineering practice.
          </p>
        </div>

        {/* Narrative & Principles Layout */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
            <div className="rounded-xl border border-border/80 bg-surface/60 p-6 sm:p-8 space-y-4 shadow-paper">
              <h2 className="text-xl font-semibold text-foreground tracking-tight">
                Who I Am &amp; How I Work
              </h2>
              <p>
                I am <strong className="text-foreground font-semibold">Arif</strong>, an independent
                Senior Software Engineer and web architect based in India. I specialize in building
                high-performance digital storefronts, custom web applications, and fast mobile landing pages for
                D2C brands, SMEs, and tech founders.
              </p>
              <p>
                I operate independently because I believe founders and business owners deserve direct,
                transparent access to the engineer architecting their digital assets. Without agency
                overhead or multi-layered account managers, technical decisions are made faster,
                code is cleaner, and delivery happens on schedule.
              </p>
              <p>
                Every digital platform I build is engineered for measurable business utility: instant
                first-contentful-paint on standard cellular connections, effortless inquiry flows for your
                visitors, and complete intellectual property freedom for your business.
              </p>
            </div>

            {/* Production Architecture Stack */}
            <div className="rounded-xl border border-border/80 bg-background p-6 sm:p-8 shadow-paper">
              <span className="label-xs text-accent">Production Architecture Standards</span>
              <h3 className="mt-2 text-lg font-semibold text-foreground">
                Battle-Tested Modern Stack
              </h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-start gap-2.5 rounded-md border border-border/60 bg-surface/40 p-3"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-foreground font-mono">{tech.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{tech.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Principles */}
          <div className="lg:col-span-5 space-y-4">
            <span className="label-xs text-accent">Core Architectural Tenets</span>
            <div className="space-y-4 mt-2">
              {principles.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="rounded-xl border border-border bg-surface p-5 sm:p-6 shadow-paper transition-all hover:border-accent/40 hover:shadow-paper-lift"
                  >
                    <div className="flex items-center justify-between">
                      <span className="label-xs text-accent font-mono">{p.index} // Principle</span>
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                    <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA Rail */}
        <div className="mt-16 rounded-xl border border-border/80 bg-foreground p-8 text-background sm:p-10 shadow-paper-lift">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="label-xs text-accent">Direct Collaboration</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-background">
                Work directly with Arif on your next project
              </h2>
              <p className="mt-2 text-sm text-background/70 leading-relaxed">
                Zero junior handoffs, no middleman markups, and guaranteed timeline commitments.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-sm bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-xs transition-opacity hover:opacity-90"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>Message on WhatsApp</span>
              </a>
              <Link
                href="/work"
                className="inline-flex min-h-[46px] items-center rounded-sm border border-background/25 bg-background/10 px-5 text-sm font-semibold text-background transition-colors hover:bg-background/20"
              >
                View Selected Work
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
