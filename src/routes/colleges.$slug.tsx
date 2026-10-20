import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import * as React from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, UserRound } from "lucide-react";
import { useSite, ui } from "@/lib/site-context";
import { listColleges, listDepartments, listFaculty } from "@/lib/content.functions";
import { imageFor } from "@/data/images";

export const Route = createFileRoute("/colleges/$slug")({
  loader: async ({ params }) => {
    const [all, departments, faculty] = await Promise.all([
      listColleges(),
      listDepartments(),
      listFaculty(),
    ]);
    const college = all.find((c) => c.slug === params.slug);
    if (!college) throw notFound();
    return {
      college,
      departments: departments.filter((x) => x.college_id === college.id),
      faculty: faculty.filter((x) => x.college_id === college.id),
    };
  },
  errorComponent: () => (
    <p className="mx-auto max-w-3xl px-5 sm:px-8 py-24 text-center text-muted-foreground">
      تعذّر تحميل بيانات الكلية حاليًا.
    </p>
  ),
  notFoundComponent: () => (
    <p className="mx-auto max-w-3xl px-5 sm:px-8 py-24 text-center text-muted-foreground">
      هذه الكلية غير متاحة.
    </p>
  ),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "غير متاح | جامعة مدينة السادات الأهلية" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { college } = loaderData;
    const title = `${college.name_ar} | ${college.name_en}`;
    return {
      meta: [
        { title },
        { name: "description", content: college.desc_ar },
        { property: "og:title", content: title },
        { property: "og:description", content: college.desc_en },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CollegeDetail,
});

function CollegeDetail() {
  const { college, departments, faculty } = Route.useLoaderData();
  const { t, lang } = useSite();
  const Back = lang === "ar" ? ArrowRight : ArrowLeft;
  const programs = Array.isArray(college.programs) ? college.programs : [];
  const [tab, setTab] = React.useState<
    "overview" | "departments" | "faculty" | "study" | "careers"
  >("overview");
  const tabs = [
    { key: "overview", ar: "نظرة عامة", en: "Overview" },
    { key: "departments", ar: "الأقسام", en: "Departments" },
    { key: "faculty", ar: "هيئة التدريس", en: "Faculty" },
    { key: "study", ar: "الدراسة والقبول", en: "Study & Admissions" },
    { key: "careers", ar: "الفرص المهنية", en: "Careers" },
  ] as const;

  return (
    <>
      <section className="relative isolate min-h-[44vh] overflow-hidden bg-navy-deep sm:min-h-[52vh]">
        <img
          src={imageFor(college.image_key)}
          alt={college.name_ar}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--navy-deep)_78%,transparent),color-mix(in_oklab,var(--navy-deep)_40%,transparent)_60%,transparent)] rtl:bg-[linear-gradient(270deg,color-mix(in_oklab,var(--navy-deep)_78%,transparent),color-mix(in_oklab,var(--navy-deep)_40%,transparent)_60%,transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--navy-deep)_55%,transparent))]" />
        <div className="relative shell flex min-h-[44vh] flex-col justify-center py-14 text-navy-foreground sm:min-h-[52vh] sm:py-20">
          <Link
            to="/colleges"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold opacity-85 hover:text-gold"
          >
            <Back className="size-4" /> {t(ui.colleges)}
          </Link>
          <span className="mt-6 block text-xs font-bold text-gold">
            {t({ ar: college.category_ar, en: college.category_en })}
          </span>
          <h1 className="gold-rule mt-2 max-w-3xl text-3xl font-extrabold sm:text-4xl md:text-5xl">
            {t({ ar: college.name_ar, en: college.name_en })}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed opacity-90 sm:text-lg">
            {t({ ar: college.desc_ar, en: college.desc_en })}
          </p>
        </div>
      </section>

      <div className="shell grid gap-8 py-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="min-w-0">
          <div role="tablist" className="mb-9 flex gap-2 overflow-x-auto pb-2">
            {tabs.map((x) => (
              <button
                key={x.key}
                role="tab"
                aria-selected={tab === x.key}
                onClick={() => setTab(x.key)}
                className={
                  tab === x.key
                    ? "shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
                    : "shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold"
                }
              >
                {t({ ar: x.ar, en: x.en })}
              </button>
            ))}
          </div>
          {tab === "overview" && (
            <>
              <h2 className="gold-rule text-xl font-extrabold">{t(ui.programs)}</h2>
              <ul className="mt-6 grid gap-3">
                {programs.map((p) => (
                  <li
                    key={p.en}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 text-sm font-semibold"
                  >
                    <CheckCircle2 className="size-5 shrink-0 text-accent" />
                    {t(p)}
                  </li>
                ))}
              </ul>
              <h2 className="gold-rule mt-12 text-xl font-extrabold">
                {t({ ar: "الإمكانات والتجهيزات", en: "Facilities" })}
              </h2>
              <p className="mt-5 text-sm leading-8 text-muted-foreground">
                {t({
                  ar: "قاعات تعليم ذكية، معامل تخصصية، مكتبة رقمية، ومساحات تدريب صممت لدعم التعلم التطبيقي.",
                  en: "Smart classrooms, specialist laboratories, a digital library and training spaces designed for applied learning.",
                })}
              </p>
            </>
          )}

          {tab === "departments" && (
            <div className="grid gap-4">
              {departments.length ? (
                departments.map((d) => (
                  <article key={d.id} className="rounded-lg border border-border bg-card p-6">
                    <h2 className="text-lg font-bold">{t({ ar: d.name_ar, en: d.name_en })}</h2>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {t({ ar: d.description_ar, en: d.description_en })}
                    </p>
                  </article>
                ))
              ) : (
                <p className="text-muted-foreground">
                  {t({ ar: "سيتم نشر الأقسام قريبًا.", en: "Departments will be published soon." })}
                </p>
              )}
            </div>
          )}

          {tab === "faculty" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {faculty.length ? (
                faculty.map((m) => (
                  <article key={m.id} className="rounded-lg border border-border bg-card p-6">
                    <UserRound className="size-8 text-accent" />
                    <h2 className="mt-4 font-bold">{t({ ar: m.name_ar, en: m.name_en })}</h2>
                    <p className="text-sm text-primary">{t({ ar: m.title_ar, en: m.title_en })}</p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {t({ ar: m.bio_ar, en: m.bio_en })}
                    </p>
                    {m.email && (
                      <a
                        href={`mailto:${m.email}`}
                        className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-primary"
                      >
                        <Mail className="size-4" />
                        {m.email}
                      </a>
                    )}
                  </article>
                ))
              ) : (
                <p className="text-muted-foreground">
                  {t({
                    ar: "سيتم نشر أعضاء هيئة التدريس قريبًا.",
                    en: "Faculty profiles will be published soon.",
                  })}
                </p>
              )}
            </div>
          )}

          {tab === "study" && (
            <>
              <h2 className="gold-rule text-xl font-extrabold">
                {t({ ar: "مسار الالتحاق", en: "How to join" })}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {t({
                  ar: "يتم القبول بالكلية عبر مكتب التنسيق الإلكتروني لوزارة التعليم العالي، يليه تسليم ملف الالتحاق والكشف الطبي وسداد المصروفات.",
                  en: "Admission runs through the Ministry of Higher Education online placement office, followed by file submission, a medical check and tuition payment.",
                })}
              </p>
              <Link
                to="/admissions"
                className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground transition hover:opacity-90"
              >
                {t(ui.admissions)}
              </Link>
            </>
          )}
          {tab === "careers" && (
            <div>
              <h2 className="gold-rule text-xl font-extrabold">
                {t({ ar: "مستقبلك بعد التخرج", en: "Your future after graduation" })}
              </h2>
              <p className="mt-5 text-sm leading-8 text-muted-foreground">
                {t({
                  ar: "تؤهل برامج الكلية للعمل في القطاعات الحكومية والخاصة والبحث العلمي وريادة الأعمال، مع دعم مركز التطوير المهني بالجامعة.",
                  en: "Programs prepare graduates for public and private sectors, research and entrepreneurship, supported by the university Career Development Centre.",
                })}
              </p>
              <Link
                to="/careers"
                className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground"
              >
                {t(ui.careers)}
              </Link>
            </div>
          )}
        </section>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="text-base font-bold">{t({ ar: "بيانات سريعة", en: "Quick facts" })}</h2>
          <dl className="mt-5 grid gap-4 text-sm">
            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-3 border-b border-border pb-3">
              <dt className="text-muted-foreground">{t(ui.deanLabel)}</dt>
              <dd className="min-w-0 text-end font-semibold">
                {t({ ar: college.dean_ar, en: college.dean_en })}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
              <dt className="text-muted-foreground">{t(ui.years)}</dt>
              <dd dir="ltr" className="font-semibold">
                {college.years}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted-foreground">{t(ui.studentsLabel)}</dt>
              <dd dir="ltr" className="font-semibold">
                {college.students.toLocaleString("en-US")}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </>
  );
}
