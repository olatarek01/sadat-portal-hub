import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader, SectionHeading } from "@/components/site/Bits";
import { useSite } from "@/lib/site-context";
import { admissionSteps, tuition } from "@/data/university";
import { ApplicationForm } from "@/components/site/ApplicationForm";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "القبول والتسجيل | جامعة مدينة السادات الأهلية" },
      {
        name: "description",
        content:
          "خطوات القبول بجامعة مدينة السادات الأهلية، الأوراق المطلوبة، والمصروفات الدراسية.",
      },
      { property: "og:title", content: "القبول والتسجيل | Admissions" },
      {
        property: "og:description",
        content: "دليل تفاعلي لخطوات الالتحاق بجامعة مدينة السادات الأهلية ومصروفات الدراسة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Admissions,
});

function Admissions() {
  const { t } = useSite();
  const [active, setActive] = React.useState(0);
  const activeStep = admissionSteps[active];

  return (
    <>
      <PageHeader
        title={{ ar: "القبول والتسجيل", en: "Admissions & Registration" }}
        subtitle={{
          ar: "كل ما تحتاجه للالتحاق بالجامعة: الخطوات، الأوراق المطلوبة، والمصروفات الدراسية.",
          en: "Everything you need to join: the steps, required documents and tuition fees.",
        }}
      />

      <section className="shell py-14">
        <SectionHeading
          title={{ ar: "خطوات الالتحاق", en: "Application Steps" }}
          subtitle={{
            ar: "اضغط على أي خطوة لعرض تفاصيلها.",
            en: "Select any step to see its details.",
          }}
        />

        <ol className="mb-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {admissionSteps.map((s, i) => (
            <li key={s.title.en}>
              <button
                onClick={() => setActive(i)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-start transition sm:flex-col sm:items-start",
                  i === active
                    ? "border-accent bg-card shadow-elegant"
                    : "border-border bg-card/60 hover:border-accent/60",
                )}
              >
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold",
                    i < active
                      ? "bg-accent text-accent-foreground"
                      : i === active
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground",
                  )}
                >
                  {i < active ? <Check className="size-4" /> : i + 1}
                </span>
                <span className="text-sm font-bold leading-snug">{t(s.title)}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="rounded-2xl border border-border bg-card p-7">
          <h3 className="text-lg font-bold">{activeStep && t(activeStep.title)}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {activeStep && t(activeStep.desc)}
          </p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setActive((v) => Math.max(0, v - 1))}
              disabled={active === 0}
              className="rounded-full border border-border px-5 py-2 text-sm font-semibold disabled:opacity-40"
            >
              {t({ ar: "السابق", en: "Previous" })}
            </button>
            <button
              onClick={() => setActive((v) => Math.min(admissionSteps.length - 1, v + 1))}
              disabled={active === admissionSteps.length - 1}
              className="rounded-full bg-accent px-5 py-2 text-sm font-bold text-accent-foreground disabled:opacity-40"
            >
              {t({ ar: "التالي", en: "Next" })}
            </button>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-14">
        <div className="shell">
          <SectionHeading title={{ ar: "المصروفات الدراسية", en: "Tuition Fees" }} />
         
<div className="w-full min-w-0">
  {/* Mobile layout */}
  <div className="space-y-3 md:hidden">
    {tuition.map((row, i) => {
      const prev = tuition[i - 1];
      const isFirstOfCollege =
        !prev || prev.college.en !== row.college.en;

      return (
        <div
          key={`${row.college.en}-${row.program.en}`}
          className="overflow-hidden rounded-xl border border-border bg-card"
        >
          <div className="bg-primary px-3 py-2.5 text-sm font-bold text-primary-foreground">
            {t(row.college)}
          </div>

          <div className="space-y-3 p-3">
            <div>
              <div className="mb-1 text-xs text-muted-foreground">
                {t({ ar: "البرنامج", en: "Program" })}
              </div>
              <div className="break-words text-sm font-semibold leading-6">
                {t(row.program)}
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <div className="mb-2 text-xs font-semibold text-muted-foreground">
                {t({ ar: "المصروفات الدراسية", en: "Tuition fees" })}
              </div>

              <div className="space-y-3">
                {row.fees.map((fee) => (
                  <div
                    key={fee.track?.en ?? "fee"}
                    className="flex flex-wrap items-center justify-between gap-2"
                  >
                    {fee.track && (
                      <span className="text-sm text-muted-foreground">
                        {t(fee.track)}
                      </span>
                    )}

                    <span
                      className="whitespace-nowrap text-sm font-bold text-accent"
                      dir="ltr"
                    >
                      {fee.amount.toLocaleString("en-US")} EGP
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>

  {/* Desktop and tablet table */}
  <div className="hidden overflow-x-auto rounded-lg border border-border bg-card md:block">
    <table className="w-full text-start text-sm">
      <thead className="bg-primary text-primary-foreground">
        <tr>
          <th className="p-4 text-start font-bold">
            {t({ ar: "الكلية", en: "Faculty" })}
          </th>
          <th className="p-4 text-start font-bold">
            {t({ ar: "البرنامج", en: "Program" })}
          </th>
          <th className="p-4 text-start font-bold">
            {t({ ar: "المصروفات", en: "Tuition fees" })}
          </th>
        </tr>
      </thead>

      <tbody>
        {tuition.map((row, i) => {
          const prev = tuition[i - 1];
          const isFirstOfCollege =
            !prev || prev.college.en !== row.college.en;

          const collegeRowSpan = isFirstOfCollege
            ? tuition.filter(
                (r) => r.college.en === row.college.en
              ).length
            : 0;

          return (
            <tr
              key={`${row.college.en}-${row.program.en}`}
              className="border-t border-border"
            >
              {isFirstOfCollege && (
                <td
                  rowSpan={collegeRowSpan}
                  className="border-e border-border bg-secondary/40 p-4 align-middle font-bold"
                >
                  {t(row.college)}
                </td>
              )}

              <td className="p-4 font-semibold">
                {t(row.program)}
              </td>

              <td className="p-4">
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {row.fees.map((fee) => (
                    <div
                      key={fee.track?.en ?? "fee"}
                      className="min-w-24"
                    >
                      {fee.track && (
                        <div className="mb-1 text-xs font-semibold text-muted-foreground">
                          {t(fee.track)}
                        </div>
                      )}

                      <div
                        className="whitespace-nowrap font-bold text-accent"
                        dir="ltr"
                      >
                        {fee.amount.toLocaleString("en-US")} EGP
                      </div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

          <p className="mt-4 text-xs text-muted-foreground">
            {t({
              ar: "جميع المصروفات بالجنيه المصري.",
              en: "All fees are in Egyptian pounds (EGP).",
            })}
          </p>
        </div>
      </section>

      <section className="shell py-14">
        <SectionHeading title={{ ar: "الأوراق المطلوبة", en: "Required Documents" }} />
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            {
              ar: "شهادة الثانوية العامة الأصلية أو ما يعادلها",
              en: "Original secondary school certificate or equivalent",
            },
            {
              ar: "شهادة ميلاد كمبيوتر (أصل + صورة)",
              en: "Computerised birth certificate (original + copy)",
            },
            { ar: "6 صور شخصية حديثة", en: "6 recent personal photos" },
            { ar: "نموذج 2 جند للطلاب الذكور", en: "Military form 2 for male students" },
            {
              ar: "بطاقة الرقم القومي أو جواز السفر للوافدين",
              en: "National ID or passport for international students",
            },
            { ar: "إيصال سداد المصروفات", en: "Tuition payment receipt" },
          ].map((d) => (
            <li
              key={d.en}
              className="flex items-start gap-3 rounded-xl border border-border bg-card px-5 py-4 text-sm"
            >
              <FileText className="mt-0.5 size-4 shrink-0 text-accent" />
              {t(d)}
            </li>
          ))}
        </ul>
      </section>

      <ApplicationForm />
    </>
  );
}
