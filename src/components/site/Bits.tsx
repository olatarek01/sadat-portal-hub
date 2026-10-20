import * as React from "react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useSite } from "@/lib/site-context";
import type { Bi } from "@/data/university";
import { useInView } from "@/hooks/use-in-view";

export function Counter({
  value,
  suffix = "",
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = React.useState(0);
  const { ref, visible } = useInView<HTMLSpanElement>(0.4);

  React.useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = duration > 0 ? Math.min((now - start) / duration, 1) : 1;
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, value, duration]);

  return (
    <span ref={ref} dir="ltr" className="tabular-nums">
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/** Route targets that a section heading can point to with a call-to-action button. */
type SectionTarget =
  | "/about"
  | "/admissions"
  | "/careers"
  | "/colleges"
  | "/contact"
  | "/news"
  | "/research"
  | "/student-life";

/**
 * A button-style link that sits beside a section title, pushed to the far edge
 * of the row (far left in Arabic RTL, far right in English LTR).
 */
export function SectionAction({ to, label }: { to: SectionTarget; label: Bi }) {
  const { t, lang } = useSite();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  return (
    <Link
      to={to}
      className="interactive-lift group inline-flex max-w-full items-center gap-2 border border-accent/60 bg-card px-4 py-2.5 text-xs font-bold text-primary outline-none hover:border-accent hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-gold/50 sm:shrink-0 sm:px-5 sm:py-3 sm:text-sm ms-auto"
    >
      {t(label)}
      <Arrow className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
    </Link>
  );
}

export function SectionHeading({
  title,
  subtitle,
  align = "start",
  action,
}: {
  title: Bi;
  subtitle?: Bi;
  align?: "start" | "center";
  action?: { to: SectionTarget; label: Bi };
}) {
  const { t } = useSite();
  return (
    <div className={cn("mb-10", align === "center" && "text-center")}>
      <div className="grid min-w-0 grid-cols-1 items-center gap-x-6 gap-y-4 md:grid-cols-[minmax(0,1fr)_auto]">
        <h2
          className={cn(
            "gold-rule min-w-0 text-2xl font-extrabold sm:text-3xl",
            align === "center" && "[&::after]:mx-auto",
          )}
        >
          {t(title)}
        </h2>
        {action && <SectionAction {...action} />}
      </div>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t(subtitle)}
        </p>
      )}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  image,
}: {
  title: Bi;
  subtitle: Bi;
  image?: string;
}) {
  const { t, lang } = useSite();
  const Chevron = lang === "ar" ? ChevronLeft : ChevronRight;
  return (
    <section className="relative isolate overflow-hidden brand-gradient text-navy-foreground">
      {image && (
        <img src={image} alt="" className="absolute inset-0 -z-20 size-full object-cover" />
      )}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--navy-deep)_84%,transparent)_0%,color-mix(in_oklab,var(--navy-deep)_58%,transparent)_45%,color-mix(in_oklab,var(--navy-deep)_26%,transparent)_100%)] rtl:bg-[linear-gradient(270deg,color-mix(in_oklab,var(--navy-deep)_84%,transparent)_0%,color-mix(in_oklab,var(--navy-deep)_58%,transparent)_45%,color-mix(in_oklab,var(--navy-deep)_26%,transparent)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--navy-deep)_22%,transparent),transparent_45%,color-mix(in_oklab,var(--navy-deep)_34%,transparent))]" />

      <div className="shell py-14 [text-shadow:0_1px_12px_rgba(8,16,6,0.75)] sm:py-20">
        <nav
          aria-label={t({ ar: "مسار الصفحة", en: "Breadcrumb" })}
          className="mb-6 grid grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-2 text-xs font-semibold opacity-80"
        >
          <Link to="/" className="inline-flex items-center gap-1 hover:text-gold">
            <Home className="size-3.5" />
            {t({ ar: "الرئيسية", en: "Home" })}
          </Link>
          <Chevron className="size-3.5 shrink-0" />
          <span>{t(title)}</span>
        </nav>
        <h1 className="gold-rule text-3xl font-extrabold sm:text-4xl">{t(title)}</h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed opacity-90 sm:text-base">
          {t(subtitle)}
        </p>
      </div>
    </section>
  );
}

export function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-semibold transition",
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-card text-foreground/80 hover:border-accent hover:text-accent",
      )}
    >
      {children}
    </button>
  );
}
