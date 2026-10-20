import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader, SectionHeading } from "@/components/site/Bits";
import { useSite } from "@/lib/site-context";
import { campusPlaces, university } from "@/data/university";

export const Route = createFileRoute("/campus")({
  head: () => ({
    meta: [
      { title: "خريطة الحرم الجامعي | جامعة مدينة السادات الأهلية" },
      {
        name: "description",
        content: "خريطة تفاعلية لمباني وكليات ومرافق الحرم الجامعي بجامعة مدينة السادات الأهلية.",
      },
      { property: "og:title", content: "خريطة الحرم الجامعي | Campus Map" },
      {
        property: "og:description",
        content: "استكشف مواقع الكليات والمكتبة والمدينة الجامعية والملاعب.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Campus,
});

function Campus() {
  const { t } = useSite();
  const [active, setActive] = React.useState(0);
  const activePlace = campusPlaces[active];

  return (
    <>
      <PageHeader
        title={{ ar: "خريطة الحرم الجامعي", en: "Campus Map" }}
        subtitle={{
          ar: "تعرّف على مواقع الكليات والمرافق داخل الحرم الجامعي بمدينة السادات.",
          en: "Locate faculties and facilities across the Sadat City campus.",
        }}
      />

      <section className="shell grid gap-8 py-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-[linear-gradient(135deg,color-mix(in_oklab,var(--navy)_12%,var(--background)),color-mix(in_oklab,var(--gold)_12%,var(--background)))]">
          <svg className="absolute inset-0 size-full" aria-hidden>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M40 0H0V40"
                  fill="none"
                  stroke="color-mix(in oklab, var(--navy) 14%, transparent)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {campusPlaces.map((p, i) => (
            <button
              key={p.name.en}
              onClick={() => setActive(i)}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 p-2 transition",
                i === active
                  ? "scale-110 border-accent bg-accent text-accent-foreground shadow-elegant"
                  : "border-primary bg-card text-primary hover:border-accent",
              )}
              aria-label={t(p.name)}
            >
              <MapPin className="size-4" />
            </button>
          ))}
          <div className="absolute bottom-4 rounded-xl border border-border bg-card/95 px-4 py-3 text-sm shadow-card ltr:left-4 rtl:right-4">
            <p className="font-bold">{activePlace && t(activePlace.name)}</p>
            <p className="text-xs text-muted-foreground">{activePlace && t(activePlace.type)}</p>
          </div>
        </div>

        <div>
          <SectionHeading title={{ ar: "مواقع الحرم", en: "Campus Locations" }} />
          <ul className="grid gap-2">
            {campusPlaces.map((p, i) => (
              <li key={p.name.en}>
                <button
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-start text-sm transition",
                    i === active
                      ? "border-accent bg-card font-bold"
                      : "border-border bg-card/60 hover:border-accent/60",
                  )}
                >
                  <span>{t(p.name)}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{t(p.type)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-secondary/50 py-14">
        <div className="shell">
          <SectionHeading title={{ ar: "كيف تصل إلينا", en: "How to Reach Us" }} />
          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-border bg-card p-6">
              <MapPin className="size-5 text-accent" />
              <h3 className="mt-3 text-base font-bold">{t({ ar: "العنوان", en: "Address" })}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(university.contact.address)}</p>
            </article>
            <article className="rounded-2xl border border-border bg-card p-6">
              <Phone className="size-5 text-accent" />
              <h3 className="mt-3 text-base font-bold">{t({ ar: "الهاتف", en: "Phone" })}</h3>
              <p className="mt-2 text-sm text-muted-foreground" dir="ltr">
                {university.contact.phone}
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-card p-6">
              <Mail className="size-5 text-accent" />
              <h3 className="mt-3 text-base font-bold">
                {t({ ar: "البريد الإلكتروني", en: "Email" })}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground" dir="ltr">
                {university.contact.email}
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
