import { createFileRoute, Link } from "@tanstack/react-router";
import { BriefcaseBusiness, Building2, GraduationCap, MapPin } from "lucide-react";
import festivalImg from "@/assets/life-festival.jpg";
import { PageHeader, SectionHeading } from "@/components/site/Bits";
import { Reveal } from "@/components/site/Motion";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "الخريجون والوظائف | Alumni & Careers" },
      {
        name: "description",
        content: "خدمات التوظيف والتدريب وقصص خريجي جامعة مدينة السادات الأهلية.",
      },
      { property: "og:title", content: "الخريجون والوظائف | جامعة مدينة السادات الأهلية" },
      { property: "og:description", content: "فرص مهنية وتدريبية تربط خريجي الجامعة بسوق العمل." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const { t } = useSite();
  const jobs = [
    {
      ar: "متدرب تحليل بيانات",
      en: "Data Analytics Intern",
      company: "Sadat Industrial Zone",
      type: { ar: "تدريب", en: "Internship" },
    },
    {
      ar: "مهندس جودة مبتدئ",
      en: "Junior Quality Engineer",
      company: "Delta Manufacturing",
      type: { ar: "دوام كامل", en: "Full time" },
    },
    {
      ar: "مساعد باحث",
      en: "Research Assistant",
      company: "SCU Research Centre",
      type: { ar: "عقد بحثي", en: "Research contract" },
    },
  ];
  return (
    <>
      <PageHeader
        image={festivalImg}
        title={{ ar: "الخريجون والوظائف", en: "Alumni & Careers" }}
        subtitle={{
          ar: "نساند انتقالك من قاعات الدراسة إلى مسار مهني مؤثر ومستدام.",
          en: "Supporting your move from university learning to a meaningful, sustainable career.",
        }}
      />
      <section className="shell py-16">
        <SectionHeading
          title={{ ar: "فرص مختارة", en: "Featured Opportunities" }}
          subtitle={{
            ar: "نماذج مبدئية لفرص التدريب والعمل المتاحة عبر مركز التطوير المهني.",
            en: "Sample opportunities shared through the Career Development Centre.",
          }}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {jobs.map((job, i) => (
            <Reveal key={job.en} delay={i * 90}>
              <article className="card-hover h-full rounded-lg border border-border bg-card p-6">
                <BriefcaseBusiness className="size-6 text-accent" />
                <span className="mt-5 block text-xs font-bold text-primary">{t(job.type)}</span>
                <h2 className="mt-2 text-lg font-bold">{t({ ar: job.ar, en: job.en })}</h2>
                <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="size-4" />
                  {job.company}
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {t({ ar: "مدينة السادات", en: "Sadat City" })}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-secondary/50 py-16">
        <div className="shell">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <img
              src={festivalImg}
              alt={t({
                ar: "خريجو جامعة مدينة السادات الأهلية",
                en: "National University of Sadat City alumni",
              })}
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
            <div>
              <GraduationCap className="size-9 text-accent" />
              <h2 className="mt-5 text-3xl font-extrabold">
                {t({
                  ar: "شبكة خريجين تمتد إلى سوق العمل",
                  en: "An alumni network connected to employers",
                })}
              </h2>
              <p className="mt-5 leading-8 text-muted-foreground">
                {t({
                  ar: "ينظم المركز ملتقيات توظيف، مراجعات للسيرة الذاتية، تدريبًا للمقابلات، وربطًا مباشرًا مع شركات المنطقة الصناعية.",
                  en: "The centre offers job fairs, CV reviews, interview coaching and direct links to employers in the industrial zone.",
                })}
              </p>
              <Link
                to="/contact"
                className="mt-7 inline-flex rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground"
              >
                {t({ ar: "تواصل مع مركز التوظيف", en: "Contact the careers centre" })}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
