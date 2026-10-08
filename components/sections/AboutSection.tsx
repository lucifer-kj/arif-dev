import Link from "next/link";
import { Section } from "@/components/ui/primitives";
import { Cpu, GitBranch, Terminal, ArrowRight } from "lucide-react";

const principles = [
  {
    index: "01",
    title: "Performance as a Core Business Feature",
    body: "Mobile rendering speed is not a vanity metric—it directly determines your ad bounce rate, Google ranking potential, and checkout conversions on 4G cellular data.",
    icon: Cpu,
  },
  {
    index: "02",
    title: "Single-Threaded Senior Focus",
    body: "When you book a sprint with me, you work directly with a senior engineer writing the code. Zero account managers, zero communication delays, and no junior interns.",
    icon: Terminal,
  },
  {
    index: "03",
    title: "Radical Code & Asset Ownership",
    body: "You receive 100% full rights to your source code, GitHub repository, domain registrations, and cloud deployments upon project completion. Zero vendor lock-in.",
    icon: GitBranch,
  },
];

const techStack = [
  "Next.js App Router",
  "React & TypeScript",
  "Tailwind CSS v4",
  "Core Web Vitals",
  "Cloudflare Edge CDN",
  "E-Commerce Architecture",
  "WhatsApp Conversion Routing",
  "Cal.com Scheduling",
];

export function AboutSection() {
  return (
    <Section
      id="about"
      label="Independent Engineering Craft"
      title="Senior Engineering Craft. Direct Collaboration. Absolute Ownership."
      layout="stacked"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
        {/* Left Narrative */}
        <div className="lg:col-span-7 space-y-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
          <p>
            I am <strong className="text-foreground font-semibold">Arif</strong>, an independent
            Senior Software Engineer and web architect based in India. I specialize in building
            high-performance websites, custom web applications, and fast mobile landing pages for
            D2C brands, SMEs, and tech founders.
          </p>
          <p>
            I operate independently because I believe founders and business owners deserve direct,
            transparent access to the engineer architecting their digital assets. Without agency
            overhead or multi-layered account managers, technical decisions are made faster,
            code is cleaner, and delivery happens on schedule.
          </p>

          {/* Production Stack Badges */}
          <div className="pt-4 border-t border-border">
            <span className="label-xs text-accent">Production Architecture Stack</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-sm border border-border/70 bg-surface px-2.5 py-1 text-xs font-medium text-foreground/90 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-foreground transition-colors group cursor-pointer"
            >
              <span>Read Full Engineering Stance &amp; Philosophy</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right Principles Stack */}
        <div className="lg:col-span-5 space-y-4">
          <span className="label-xs text-accent">Architectural Principles</span>
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
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
