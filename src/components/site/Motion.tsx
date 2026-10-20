import * as React from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";

/** Fade/slide-in on scroll using IntersectionObserver. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const { ref, visible: shown } = useInView<HTMLDivElement>(0.15, "0px 0px -40px 0px");

  return (
    <Tag
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Adds gentle desktop-only momentum while preserving native mobile scrolling. */
export function SmoothScroll() {
  React.useEffect(() => {
    if (window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches) return;
    const onClick = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href^="#"]')
          : null;
      const id = target?.getAttribute("href")?.slice(1);
      if (!id) return;
      const section = document.getElementById(id);
      if (!section) return;
      event.preventDefault();
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

/** Animated progress bar that fills when scrolled into view. */
export function ProgressBar({ value, label }: { value: number; label: string }) {
  const { ref, visible } = useInView<HTMLDivElement>(0.4);
  const w = visible ? value : 0;

  return (
    <div ref={ref}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-sm font-semibold">
        <span className="min-w-0">{label}</span>
        <span dir="ltr" className="shrink-0 tabular-nums text-primary">
          {w}%
        </span>
      </div>
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-1000 ease-out motion-reduce:transition-none"
          style={{ width: `${w}%` }}
        />
      </div>
    </div>
  );
}

/** Reading progress bar + back-to-top button. */
export function ScrollUtilities({ topLabel }: { topLabel: string }) {
  const [progress, setProgress] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      setVisible(h.scrollTop > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
        <div
          className="h-full bg-accent transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
      <button
        type="button"
        aria-label={topLabel}
        title={topLabel}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-6 z-50 grid size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-accent hover:text-accent-foreground",
          "end-6",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <ArrowUp className="size-5" />
      </button>
    </>
  );
}
