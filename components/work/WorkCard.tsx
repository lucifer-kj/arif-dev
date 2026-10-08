"use client";

import React, { useRef, useState } from "react";
import type { CaseStudy } from "@/lib/case-studies";
import { CursorPill } from "@/components/ui/CursorPill";
import { ArrowUpRight } from "lucide-react";

export function WorkCard({ project }: { project: CaseStudy }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });
  const [activeTab, setActiveTab] = useState<"problem" | "built" | "result">("problem");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setCursor((prev) => ({ ...prev, active: false }));
  };

  return (
    <article
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-background shadow-paper transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-paper-lift"
    >
      <div className="relative p-5 sm:p-7">
        {/* Header Tags & Verification Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 pb-3.5">
          <span className="label-xs text-accent font-semibold tracking-wider">
            {project.tag}
          </span>
          <span className="label-xs rounded-sm border border-border bg-surface px-2 py-0.5 text-muted-foreground font-mono">
            Verified Outcome
          </span>
        </div>

        {/* Project Title & Live External Link */}
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground text-balance">
              {project.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground font-mono">
              {project.clientType}
            </p>
          </div>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit live site for ${project.client}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Bite-Sized Interactive Insight Tabs */}
        <div className="mt-5">
          <div className="flex items-center gap-1 rounded-md border border-border/70 bg-surface p-1">
            <button
              type="button"
              onClick={() => setActiveTab("problem")}
              className={`flex-1 rounded-sm py-1.5 text-xs font-medium transition-all ${
                activeTab === "problem"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              The Problem
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("built")}
              className={`flex-1 rounded-sm py-1.5 text-xs font-medium transition-all ${
                activeTab === "built"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              What I Built
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("result")}
              className={`flex-1 rounded-sm py-1.5 text-xs font-medium transition-all ${
                activeTab === "result"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              The Result
            </button>
          </div>

          {/* Bite-Sized Tab Content Pane */}
          <div className="mt-2.5 min-h-[5.5rem] rounded-md border border-border/60 bg-surface/40 p-3.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {activeTab === "problem" && (
              <p className="animate-in fade-in duration-200">{project.problem}</p>
            )}
            {activeTab === "built" && (
              <p className="animate-in fade-in duration-200">{project.whatBuilt}</p>
            )}
            {activeTab === "result" && (
              <p className="animate-in fade-in duration-200">{project.result}</p>
            )}
          </div>
        </div>

        {/* Metrics Highlights Bar */}
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/70 pt-3.5">
          {project.metrics.map((m) => (
            <div key={m.label} className="text-left">
              <p className="text-xs font-semibold text-foreground font-mono">{m.value}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Floating Cursor Pill on Desktop */}
        <CursorPill x={cursor.x} y={cursor.y} active={cursor.active} />
      </div>

      {/* Tech Stack Pills Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-surface/50 p-3.5 sm:p-4">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-sm border border-border/60 bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-accent transition-transform hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span>Live Site</span>
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}
