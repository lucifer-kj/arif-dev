"use client";

import { useState } from "react";
import { caseStudies, type CaseStudyCategory } from "@/lib/case-studies";
import { WorkCard } from "@/components/work/WorkCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 4;

export function WorkShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | CaseStudyCategory>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = caseStudies.filter((project) => {
    if (selectedCategory === "all") return true;
    return project.category === selectedCategory;
  });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCategoryChange = (category: "all" | CaseStudyCategory) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Category Filter Pills & Result Count */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleCategoryChange("all")}
            className={`min-h-[38px] rounded-full px-4 text-xs font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-foreground text-background font-semibold shadow-xs"
                : "border border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            All Projects ({caseStudies.length})
          </button>
          <button
            type="button"
            onClick={() => handleCategoryChange("ecommerce")}
            className={`min-h-[38px] rounded-full px-4 text-xs font-medium transition-all ${
              selectedCategory === "ecommerce"
                ? "bg-foreground text-background font-semibold shadow-xs"
                : "border border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            E-Commerce &amp; D2C (4)
          </button>
          <button
            type="button"
            onClick={() => handleCategoryChange("saas")}
            className={`min-h-[38px] rounded-full px-4 text-xs font-medium transition-all ${
              selectedCategory === "saas"
                ? "bg-foreground text-background font-semibold shadow-xs"
                : "border border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            SaaS &amp; Web Apps (2)
          </button>
          <button
            type="button"
            onClick={() => handleCategoryChange("b2b")}
            className={`min-h-[38px] rounded-full px-4 text-xs font-medium transition-all ${
              selectedCategory === "b2b"
                ? "bg-foreground text-background font-semibold shadow-xs"
                : "border border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            B2B &amp; Corporate (1)
          </button>
        </div>

        <p className="label-xs text-muted-foreground font-mono">
          Showing {currentProjects.length} of {filteredProjects.length}
        </p>
      </div>

      {/* Grid of Work Cards */}
      <div className="mt-8 grid gap-6 md:gap-8 lg:grid-cols-2">
        {currentProjects.map((project) => (
          <WorkCard key={project.id} project={project} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/80 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground font-mono">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-sm border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Previous</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`flex h-10 w-10 items-center justify-center rounded-sm text-xs font-medium transition-all ${
                  currentPage === pageNum
                    ? "bg-accent font-semibold text-accent-foreground shadow-xs"
                    : "border border-border bg-background text-foreground hover:bg-surface"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-sm border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>Next</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Code Ownership Assurance Banner */}
      <div className="mt-10 flex flex-col gap-3 rounded-lg border border-border/80 bg-surface p-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between shadow-paper">
        <p className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          <span>Every deliverable includes complete Git repository, domain DNS handover, and 100% intellectual property transfer.</span>
        </p>
        <span className="font-mono text-[11px] text-foreground font-semibold">
          Solo Practice · No Junior Handoffs
        </span>
      </div>
    </div>
  );
}
