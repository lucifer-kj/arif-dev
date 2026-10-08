import Link from "next/link";
import { Section } from "@/components/ui/primitives";
import { caseStudies } from "@/lib/case-studies";
import { WorkCard } from "@/components/work/WorkCard";
import { ArrowRight } from "lucide-react";

export function WorkSection() {
  const featuredProjects = caseStudies.slice(0, 2);

  return (
    <Section
      id="work"
      label="Selected Work"
      title="Proven outcomes, engineered to last"
      description="Real client deliverables across E-Commerce, D2C storefronts, SaaS tools, and B2B corporate platforms. Built directly by Arif with clean Next.js architecture, fast mobile load speeds, and complete client code ownership."
      tone="surface"
      layout="stacked"
    >
      {/* Mobile Swipe Hint */}
      <div className="mb-3 flex items-center justify-between text-[11px] text-muted-foreground md:hidden">
        <span className="font-mono">Featured Projects (2)</span>
        <span className="text-accent flex items-center gap-1">
          <span>Swipe cards</span> &rarr;
        </span>
      </div>

      {/* Horizontal Swipeable Rail on Mobile -> 2-Col Grid on Desktop */}
      <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {featuredProjects.map((project) => (
          <div
            key={project.id}
            className="w-[88vw] max-w-[440px] shrink-0 snap-center mr-4 last:mr-0 md:w-auto md:max-w-none md:shrink md:mr-0"
          >
            <WorkCard project={project} />
          </div>
        ))}
      </div>

      {/* Explore All Link Bar */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-border/80 bg-background p-5 text-xs text-muted-foreground sm:flex-row shadow-paper">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          <span>Showing 2 of {caseStudies.length} verified deliverables across E-Commerce, SaaS, and B2B.</span>
        </div>

        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 font-semibold text-accent hover:text-foreground transition-colors group cursor-pointer"
        >
          <span>Explore All 7 Case Studies</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Section>
  );
}
