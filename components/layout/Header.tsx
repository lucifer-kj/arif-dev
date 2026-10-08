"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/primitives";

const navItems = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Problems", href: "/problems" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  // Close mobile drawer on route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>("a, button");
      if (!nodes || nodes.length === 0) return;
      const first = nodes.item(0);
      const last = nodes.item(nodes.length - 1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md transition-all">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          {/* Logo Mark */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-xl font-semibold tracking-[-0.04em] text-foreground transition-opacity hover:opacity-85"
              aria-label="Arif, portfolio home"
            >
              Arif<span className="text-accent">.</span>
            </Link>

            {/* Availability Micro-Badge */}
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-border/60 bg-surface/70 px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="label-xs text-muted-foreground font-mono">Available for Projects</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative text-sm font-medium transition-colors duration-200 ease-out ${
                    isActive
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Primary Action Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center justify-center rounded-sm bg-accent px-4 py-2 text-xs font-medium uppercase tracking-wider text-accent-foreground shadow-xs transition-opacity duration-200 ease-out hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
            >
              Discuss Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 inline-flex h-12 w-12 items-center justify-center rounded-sm md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6 text-foreground"
            >
              {open ? (
                <path d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile Menu Panel */}
      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="border-t border-border bg-background md:hidden"
        >
          <Container>
            <div className="flex items-center gap-2 py-3 border-b border-border/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="label-xs text-muted-foreground font-mono">Available for Projects</span>
            </div>
            <nav aria-label="Mobile" className="flex flex-col py-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between border-b border-border py-4 text-base font-medium transition-colors ${
                      isActive
                        ? "text-accent font-semibold"
                        : "text-foreground hover:text-accent"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    )}
                  </Link>
                );
              })}
              <div className="py-4">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-sm bg-accent px-5 text-sm font-semibold tracking-tight text-accent-foreground shadow-xs transition-opacity duration-200 ease-out hover:opacity-90"
                >
                  Discuss Project
                </Link>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
