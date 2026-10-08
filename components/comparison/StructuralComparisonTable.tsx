import React from "react";
import { Check, X } from "lucide-react";

interface ComparisonRow {
  title: string;
  agencyLabel: string;
  agencyDesc: string;
  arifLabel: string;
  arifDesc: string;
}

const comparisonRows: ComparisonRow[] = [
  {
    title: "Communication & Access",
    agencyLabel: "Account Manager Intermediaries",
    agencyDesc:
      "Client requests pass through account executives and junior coordinators, creating communication lag and technical translation loss.",
    arifLabel: "Direct Senior Engineer Access",
    arifDesc:
      "You collaborate directly with the senior engineer architecting and writing every line of production code. Direct WhatsApp and screen-shares.",
  },
  {
    title: "Velocity & Focus",
    agencyLabel: "Multi-Month Turnaround Cycles",
    agencyDesc:
      "Competing internal accounts, department handoffs, and resource juggling stretch simple web builds over 8 to 16 weeks.",
    arifLabel: "Focused, Bounded Sprint Delivery",
    arifDesc:
      "Landing pages completed in 3–5 days; full business websites in 8–12 days with disciplined single-threaded engineering focus.",
  },
  {
    title: "Code Quality & Speed",
    agencyLabel: "Plugin & Page-Builder Bloat",
    agencyDesc:
      "Heavy reliance on 40+ third-party WordPress plugins and visual builders that break on updates and lag on cellular networks.",
    arifLabel: "Clean-Slate Next.js Architecture",
    arifDesc:
      "Bespoke TypeScript and Tailwind CSS code with zero bloated plugins, optimized for sub-second rendering across Indian 4G/5G connections.",
  },
  {
    title: "Ownership & Freedom",
    agencyLabel: "Proprietary Hosting & Lock-In",
    agencyDesc:
      "Often hosted on internal agency accounts, requiring recurring paid support tickets and approval to make minor text updates.",
    arifLabel: "Complete Code & Asset Ownership",
    arifDesc:
      "100% of the repository, cloud accounts, and domains belong strictly to you. Complete handover on completion with zero vendor lock-in.",
  },
];

export function StructuralComparisonTable() {
  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface shadow-paper">
      <div className="border-b border-border bg-background p-5 sm:p-6">
        <span className="label-xs text-accent">Structural Model Comparison</span>
        <h3 className="mt-1 text-base sm:text-lg font-semibold tracking-tight text-foreground">
          Agency Intermediary Model vs. Direct Senior Engineering Practice
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          An objective comparison of structural delivery differences, communication layers, and long-term asset ownership.
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-surface/80 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <th scope="col" className="p-4 sm:px-6 w-1/2 border-r border-border">
                Multi-Tiered Agency Model
              </th>
              <th scope="col" className="p-4 sm:px-6 w-1/2 bg-accent/5 text-accent font-bold">
                Direct Engagement with Arif
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {comparisonRows.map((row) => (
              <tr key={row.title} className="hover:bg-background/40 transition-colors">
                <td className="p-4 sm:p-6 border-r border-border align-top">
                  <div className="flex items-start gap-2.5">
                    <X className="h-4 w-4 shrink-0 text-muted-foreground/80 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {row.agencyLabel}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {row.agencyDesc}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 sm:p-6 bg-accent/[0.02] align-top">
                  <div className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {row.arifLabel}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-foreground/80">
                        {row.arifDesc}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards View */}
      <div className="divide-y divide-border md:hidden">
        {comparisonRows.map((row) => (
          <div key={row.title} className="p-5 space-y-4">
            <span className="label-xs text-muted-foreground font-semibold">
              {row.title}
            </span>

            {/* Agency Card */}
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-start gap-2">
                <X className="h-4 w-4 shrink-0 text-muted-foreground/70 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Agency Model
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {row.agencyLabel}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {row.agencyDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Arif Card */}
            <div className="rounded-lg border border-accent/40 bg-accent/5 p-4">
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                    With Arif (Direct Senior Craft)
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {row.arifLabel}
                  </p>
                  <p className="mt-1 text-xs text-foreground/80 leading-relaxed">
                    {row.arifDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
