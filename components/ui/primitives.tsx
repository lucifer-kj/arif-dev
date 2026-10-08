import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  label,
  title,
  description,
  children,
  tone = "default",
  layout = "stacked",
}: {
  id: string;
  label: string;
  title: string;
  description?: string;
  children: ReactNode;
  tone?: "default" | "surface";
  layout?: "split" | "stacked";
}) {
  return (
    <section
      id={id}
      className={`border-t border-border py-14 sm:py-20 lg:py-24 ${
        tone === "surface" ? "bg-surface" : "bg-background"
      }`}
    >
      <Container>
        {layout === "split" ? (
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="label-xs text-accent">{label}</p>
              <h2 className="mt-3 max-w-[18ch] text-balance text-fluid-heading font-semibold text-foreground">
                {title}
              </h2>
              {description && (
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            <div className="lg:col-span-8">{children}</div>
          </div>
        ) : (
          <div>
            <div className="max-w-3xl mb-8 sm:mb-12">
              <p className="label-xs text-accent">{label}</p>
              <h2 className="mt-3 text-balance text-fluid-heading font-semibold text-foreground">
                {title}
              </h2>
              {description && (
                <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            <div>{children}</div>
          </div>
        )}
      </Container>
    </section>
  );
}

const baseBtn =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm px-5 text-sm font-medium tracking-tight transition-colors duration-200 ease-out cursor-pointer";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
  ariaLabel,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "accent" | "outline";
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}) {
  const styles =
    variant === "accent"
      ? "bg-accent text-accent-foreground hover:bg-accent/90 active:bg-accent/80 shadow-xs"
      : variant === "outline"
        ? "border border-foreground/20 text-foreground hover:border-foreground hover:bg-secondary active:bg-muted"
        : "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80";

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`${baseBtn} ${styles} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${baseBtn} ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

export function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className={className}
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.27-2.42 5.83a8.19 8.19 0 0 1-5.82 2.41c-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.21 8.21 0 0 1-1.28-4.48c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.32-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29z" />
    </svg>
  );
}

export function MailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
