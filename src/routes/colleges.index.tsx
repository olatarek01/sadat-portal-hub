import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { PageHeader, Chip } from "@/components/site/Bits";
import { useSite, ui } from "@/lib/site-context";
import { listColleges } from "@/lib/content.functions";
import { imageFor } from "@/data/images";

export const Route = createFileRoute("/colleges/")({
  loader: () => listColleges(),
  errorComponent: () => (
    <p className="mx-auto max-w-3xl px-5 sm:px-8 py-24 text-center text-muted-foreground">
      تعذّر تحميل الكليات حاليًا. حاول تحديث الصفحة.
    </p>
  ),
  notFoundComponent: () => (
    <p className="mx-auto max-w-3xl px-5 sm:px-8 py-24 text-center text-muted-foreground">
      الصفحة غير متاحة.
    </p>
  ),
  head: () => ({
    meta: [
      { title: "كليات الجامعة | جامعة مدينة السادات الأهلية" },
      {
        name: "description",
        content:
          "دليل الكليات السبع بجامعة مدينة السادات الأهلية مع البرامج الدراسية ومدة الدراسة.",
      },
      { property: "og:title", content: "كليات الجامعة | University Faculties" },
      {
        property: "og:description",
        content: "استعرض كليات جامعة مدينة السادات الأهلية وبرامجها الدراسية.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollegesPage,
});

function CollegesPage() {
  const colleges = Route.useLoaderData();
  const { t } = useSite();
  const [cat, setCat] = React.useState("all");
  const [q, setQ] = React.useState("");

  const categories = React.useMemo(() => {
    const map = new Map<string, { ar: string; en: string }>();
    colleges.forEach((c) => map.set(c.category_en, { ar: c.category_ar, en: c.category_en }));
    return Array.from(map.values());
  }, [colleges]);

  const list = colleges.filter(
    (c) =>
      (cat === "all" || c.category_en === cat) &&
      (q.trim() === "" || (c.name_ar + c.name_en).toLowerCase().includes(q.trim().toLowerCase())),
  );

  return (
    <>
      <PageHeader
        title={{ ar: "كليات الجامعة", en: "University Faculties" }}
        subtitle={{
          ar: "سبع كليات في الصيدلة والطب البيطري والحاسبات والمعلومات والذكاء الاصطناعي والعلوم والأعمال وعلوم الرياضة والسياحة والفنادق.",
          en: "Seven faculties: Pharmacy, Veterinary Medicine, Computers, Information & Artificial Intelligence, Science, Business, Sports Science, and Tourism & Hotels.",
        }}
      />
      <div className="shell py-12">
        <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="flex flex-wrap gap-2">
            <Chip active={cat === "all"} onClick={() => setCat("all")}>
              {t(ui.all)}
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
              placeholder={t({ ar: "ابحث عن كلية", en: "Search a college" })}
              className="h-11 w-full rounded-full border border-border bg-card text-sm outline-none focus:border-accent lg:w-72 ltr:pl-9 ltr:pr-4 rtl:pr-9 rtl:pl-4"
            />
          </div>
        </div>

        {list.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">{t(ui.noResults)}</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c) => (
              <Link
                key={c.slug}
                to="/colleges/$slug"
                params={{ slug: c.slug }}
                className="card-hover flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
              >
                <img
                  src={imageFor(c.image_key)}
                  alt={c.name_ar}
                  loading="lazy"
                  className="h-44 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-bold text-accent">
                    {t({ ar: c.category_ar, en: c.category_en })}
                  </span>
                  <h2 className="mt-2 text-lg font-bold leading-snug">
                    {t({ ar: c.name_ar, en: c.name_en })}
                  </h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {t({ ar: c.desc_ar, en: c.desc_en })}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs font-semibold text-muted-foreground">
                    <span>
                      {t(ui.years)}: <span dir="ltr">{c.years}</span>
                    </span>
                    <span>
                      {t(ui.studentsLabel)}:{" "}
                      <span dir="ltr">{c.students.toLocaleString("en-US")}</span>
                    </span>
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
