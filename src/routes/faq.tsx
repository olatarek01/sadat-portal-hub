import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/site/Bits";
import { useSite } from "@/lib/site-context";
import { listFaqs } from "@/lib/content.functions";

export const Route = createFileRoute("/faq")({
  loader: () => listFaqs(),
  errorComponent: () => (
    <p className="mx-auto max-w-3xl px-5 sm:px-8 py-24 text-center text-muted-foreground">
      تعذّر تحميل الأسئلة حاليًا.
    </p>
  ),
  notFoundComponent: () => (
    <p className="mx-auto max-w-3xl px-5 sm:px-8 py-24 text-center text-muted-foreground">
      الصفحة غير متاحة.
    </p>
  ),
  head: () => ({
    meta: [
      { title: "الأسئلة الشائعة | جامعة مدينة السادات الأهلية" },
      {
        name: "description",
        content:
          "إجابات عن أكثر أسئلة الطلاب تكرارًا حول القبول والمصروفات والسكن والتحويل بجامعة مدينة السادات الأهلية.",
      },
      { property: "og:title", content: "الأسئلة الشائعة | FAQ" },
      {
        property: "og:description",
        content: "كل ما تحتاج معرفته عن القبول والدراسة بجامعة مدينة السادات الأهلية.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const faqs = Route.useLoaderData();
  const { t } = useSite();
  const [open, setOpen] = React.useState<string | null>(faqs[0]?.id ?? null);

  return (
    <>
      <PageHeader
        title={{ ar: "الأسئلة الشائعة", en: "Frequently Asked Questions" }}
        subtitle={{
          ar: "إجابات سريعة عن القبول والمصروفات والسكن والتحويل والتواصل مع الجامعة.",
          en: "Quick answers about admission, fees, housing, transfers and contacting the university.",
        }}
      />
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-12">
        {faqs.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            {t({ ar: "لا توجد أسئلة منشورة بعد.", en: "No published questions yet." })}
          </p>
        ) : (
          <div className="grid gap-3">
            {faqs.map((f) => {
              const isOpen = open === f.id;
              return (
                <div
                  key={f.id}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : f.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-sm font-bold"
                  >
                    {t({ ar: f.question_ar, en: f.question_en })}
                    <ChevronDown
                      className={`size-4 shrink-0 text-accent transition ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                      {t({ ar: f.answer_ar, en: f.answer_en })}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
