"use client";

import React, { Component, type ReactNode } from "react";
import { logger } from "@/lib/logger";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error("ErrorBoundary", "Unhandled UI rendering exception", {
      name: error.name,
      message: error.message,
      componentStack: errorInfo.componentStack?.slice(0, 300),
    });

    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="my-8 flex min-h-[280px] w-full flex-col items-center justify-center rounded-xl border border-border bg-surface p-8 text-center shadow-paper"
        >
          <div className="max-w-md">
            <span className="label-xs text-accent">Fault Intercepted</span>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
              Rendering interrupted.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              An unexpected display error occurred. Technical diagnostic details have been
              logged safely without leaking sensitive information.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex min-h-[44px] items-center justify-center rounded-sm bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-sm transition-colors duration-200 ease-out hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
              >
                Reload Application
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
