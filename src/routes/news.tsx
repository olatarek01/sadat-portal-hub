import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Search } from "lucide-react";
import { Chip, PageHeader } from "@/components/site/Bits";
import { useSite, ui } from "@/lib/site-context";
import { listNews } from "@/lib/content.functions";
import { imageFor } from "@/data/images";

export const Route = createFileRoute("/news")({
  loader: () => listNews(),
  errorComponent: () => (
    <p className="mx-auto max-w-3xl px-5 sm:px-8 py-24 text-center text-muted-foreground">
      تعذّر تحميل الأخبار حاليًا. حاول تحديث الصفحة.
    </p>
  ),
  notFoundComponent: () => (
    <p className="mx-auto max-w-3xl px-5 sm:px-8 py-24 text-center text-muted-foreground">
      الصفحة غير متاحة.
    </p>
  ),
  head: () => ({
    meta: [
      { title: "الأخبار والفعاليات | جامعة مدينة السادات الأهلية" },
      {
        name: "description",
        content: "آخر أخبار جامعة مدينة السادات الأهلية وفعالياتها الأكاديمية والبحثية والطلابية.",
      },
      { property: "og:title", content: "الأخبار والفعاليات | News & Events" },
      {
        property: "og:description",
        content: "تابع مستجدات الجامعة والمؤتمرات والأنشطة الطلابية.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: News,
});

function News() {
  const items = Route.useLoaderData();
  const { t } = useSite();
  const [type, setType] = React.useState<"all" | "news" | "event">("all");
  const [cat, setCat] = React.useState("all");
  const [q, setQ] = React.useState("");

  const categories = React.useMemo(() => {
    const map = new Map<string, { ar: string; en: string }>();
    items.forEach((n) => map.set(n.category_en, { ar: n.category_ar, en: n.category_en }));
    return Array.from(map.values());
  }, [items]);

  const list = items
    .filter((n) => type === "all" || n.kind === type)
    .filter((n) => cat === "all" || n.category_en === cat)
    .filter(
      (n) => q.trim() === "" || (n.title_ar + n.title_en).toLowerCase().includes(q.toLowerCase()),
    );

  return (
    <>
      <PageHeader
        title={{ ar: "الأخبار والفعاليات", en: "News & Events" }}
        subtitle={{
          ar: "تابع مستجدات الجامعة والمؤتمرات العلمية والأنشطة الطلابية أولًا بأول.",
          en: "Follow university updates, scientific conferences and student activities.",
        }}
      />

      <div className="shell py-12">
        <div className="mb-6 flex flex-wrap gap-2">
          {(
            [
              { key: "all", label: ui.all },
              { key: "news", label: { ar: "أخبار", en: "News" } },
              { key: "event", label: { ar: "فعاليات", en: "Events" } },
            ] as const
          ).map((f) => (
            <Chip key={f.key} active={type === f.key} onClick={() => setType(f.key)}>
              {t(f.label)}
            </Chip>
          ))}
        </div>

        <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="flex flex-wrap gap-2">
            <Chip active={cat === "all"} onClick={() => setCat("all")}>
              {t({ ar: "كل التصنيفات", en: "All categories" })}
            </Chip>
            {categories.map((c) => (
              <Chip key={c.en} active={cat === c.en} onClick={() => setCat(c.en)}>
                {t(c)}
              </Chip>
            ))}
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-muted-foreground ltr:left-3 rtl:right-3" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t({ ar: "ابحث في الأخبار", en: "Search news" })}
              className="h-11 w-full rounded-full border border-border bg-card text-sm outline-none focus:border-accent lg:w-72 ltr:pl-9 ltr:pr-4 rtl:pr-9 rtl:pl-4"
            />
          </div>
        </div>

        {list.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">{t(ui.noResults)}</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((n) => (
              <Link
                key={n.id}
                to="/news/$id"
                params={{ id: n.id }}
                className="card-hover flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
              >
                <img
                  src={imageFor(n.image_key)}
                  alt={n.title_ar}
                  loading="lazy"
                  className="h-44 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary">
                      {t({ ar: n.category_ar, en: n.category_en })}
                    </span>
                    <span
                      className={
                        n.kind === "event"
                          ? "text-xs font-bold text-accent"
                          : "text-xs font-bold text-muted-foreground"
                      }
                    >
                      {n.kind === "event"
                        ? t({ ar: "فعالية", en: "Event" })
                        : t({ ar: "خبر", en: "News" })}
                    </span>
                  </div>
                  <h2 className="mt-4 text-base font-bold leading-snug">
                    {t({ ar: n.title_ar, en: n.title_en })}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {t({ ar: n.excerpt_ar, en: n.excerpt_en })}
                  </p>
                  <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs font-semibold text-muted-foreground">
                    <CalendarDays className="size-4 text-accent" />
                    <span dir="ltr">{n.event_date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
