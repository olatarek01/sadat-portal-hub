import { Megaphone } from "lucide-react";
import { useSite } from "@/lib/site-context";
import { announcements } from "@/data/home";

export function Ticker() {
  const { t, lang } = useSite();
  const items = [...announcements, ...announcements];

  return (
    <div className="flex items-stretch border-b border-border bg-primary text-primary-foreground">
      <span className="z-10 flex shrink-0 items-center gap-2 bg-accent px-4 py-2 text-xs font-bold text-accent-foreground sm:text-sm">
        <Megaphone className="size-4" />
        {lang === "ar" ? "أهم الإعلانات" : "Announcements"}
      </span>
      <div className="ticker-mask group relative flex-1 overflow-hidden">
        <div className="ticker-track flex w-max items-center gap-10 py-2 group-hover:[animation-play-state:paused]">
          {items.map((item, i) => (
            <span key={i} className="whitespace-nowrap text-xs opacity-90 sm:text-sm">
              • {t(item)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
