import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Eye, Flag, GraduationCap, Target, Users } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/site/Bits";
import { Reveal } from "@/components/site/Motion";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن الجامعة | About National University of Sadat City" },
      {
        name: "description",
        content:
          "تاريخ ورؤية ورسالة وهيكل جامعة مدينة السادات الأهلية، الجامعة الأهلية المصرية التي تربط التعليم والبحث باحتياجات المجتمع.",
      },
      { property: "og:title", content: "عن جامعة مدينة السادات الأهلية | About SCU" },
      { property: "og:description", content: "تعرّف على مسيرة الجامعة ورؤيتها وقياداتها." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const milestones = [
  {
    year: "2024",
    ar: "تأسيس جامعة مدينة السادات الأهلية كجامعة أهلية مستقلة لا تهدف إلى الربح.",
    en: "National University of Sadat City established as an independent non-profit national university.",
  },
  {
    year: "2026",
    ar: "منظومة تعليم وبحث تضم 7 كليات و7,000+ طالب وطالبة، تخدم مصر وإقليم الدلتا.",
    en: "A teaching and research ecosystem with 7 faculties and 7,000+ students, serving Egypt and the Delta region.",
  },
];

function AboutPage() {
  const { t } = useSite();
  const values = [
    {
      icon: Eye,
      title: { ar: "الرؤية", en: "Vision" },
      text: {
        ar: "جامعة رائدة إقليميًا في التعليم والبحث والابتكار وخدمة المجتمع.",
        en: "A regionally leading university in education, research, innovation and community service.",
      },
    },
    {
      icon: Target,
      title: { ar: "الرسالة", en: "Mission" },
      text: {
        ar: "إعداد خريجين منافسين وإنتاج معرفة تطبق لحل تحديات الصناعة والمجتمع.",
        en: "Preparing competitive graduates and applying knowledge to industry and community challenges.",
      },
    },
    {
      icon: Flag,
      title: { ar: "القيم", en: "Values" },
      text: {
        ar: "النزاهة، الجودة، تكافؤ الفرص، المسؤولية والاستدامة.",
        en: "Integrity, quality, equal opportunity, responsibility and sustainability.",
      },
    },
  ];
  return (
    <>
      <PageHeader
        image="/background.png"
        title={{ ar: "عن الجامعة", en: "About the University" }}
        subtitle={{
          ar: "جامعة أهلية مصرية شابة بجذور علمية راسخة وطموح يخدم الإنسان والمجتمع.",
          en: "A young Egyptian national university with strong academic roots and a people-centred ambition.",
        }}
      />
      <section className="shell py-16">
        <SectionHeading title={{ ar: "رؤيتنا ورسالتنا", en: "Vision & Mission" }} />
        <div className="grid gap-5 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title.en} delay={i * 90}>
              <article className="card-hover h-full rounded-lg border border-border bg-card p-7">
                <v.icon className="size-7 text-accent" />
                <h2 className="mt-5 text-xl font-bold">{t(v.title)}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{t(v.text)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-secondary/50 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading title={{ ar: "محطات في مسيرة الجامعة", en: "University Milestones" }} />
          <ol className="relative border-s-2 border-accent/40 ps-7">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 80} as="li" className="relative mb-9 last:mb-0">
                <span className="absolute top-1 size-4 rounded-full border-4 border-background bg-accent -start-[2.2rem]" />
                <time className="font-extrabold text-primary" dir="ltr">
                  {m.year}
                </time>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {t({ ar: m.ar, en: m.en })}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <section className="shell py-16">
        <SectionHeading title={{ ar: "الهيكل المؤسسي", en: "Institutional Structure" }} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: GraduationCap, ar: "رئيس الجامعة", en: "University President" },
            { icon: Users, ar: "نواب رئيس الجامعة", en: "Vice Presidents" },
            { icon: Building2, ar: "مديرو البرامج", en: "Programs Directors" },
            { icon: Target, ar: "المراكز والوحدات", en: "Centres & Units" },
          ].map((x) => (
            <article key={x.en} className="rounded-lg border border-border bg-card p-6 text-center">
              <x.icon className="mx-auto size-7 text-accent" />
              <h2 className="mt-4 font-bold">{t({ ar: x.ar, en: x.en })}</h2>
            </article>
          ))}
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <Link to="/colleges" className="related-link">
            {t({ ar: "استكشف الكليات", en: "Explore colleges" })}
          </Link>
          <Link to="/research" className="related-link">
            {t({ ar: "البحث العلمي", en: "Scientific research" })}
          </Link>
          <Link to="/contact" className="related-link">
            {t({ ar: "تواصل مع الجامعة", en: "Contact the university" })}
          </Link>
        </div>
      </section>
    </>
  );
}
