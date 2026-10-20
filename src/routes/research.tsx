import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Lightbulb, Microscope, Users2 } from "lucide-react";
import { Counter, PageHeader, SectionHeading } from "@/components/site/Bits";
import { useSite } from "@/lib/site-context";
import { researchCenters } from "@/data/university";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "البحث العلمي | جامعة مدينة السادات الأهلية" },
      {
        name: "description",
        content: "مراكز التميز البحثي والنشر الدولي وبراءات الاختراع بجامعة مدينة السادات الأهلية.",
      },
      { property: "og:title", content: "البحث العلمي | Scientific Research" },
      {
        property: "og:description",
        content: "منظومة بحثية تربط المعامل بالصناعة في مدينة السادات.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Research,
});

const metrics = [
  { value: 1240, icon: BookOpen, label: { ar: "بحث منشور دوليًا", en: "International papers" } },
  { value: 64, icon: Lightbulb, label: { ar: "براءة اختراع", en: "Patents" } },
  { value: 38, icon: Microscope, label: { ar: "مشروع بحثي ممول", en: "Funded projects" } },
  { value: 21, icon: Users2, label: { ar: "شراكة دولية", en: "International partnerships" } },
];

const priorities = [
  {
    title: { ar: "الأمن الغذائي والزراعة", en: "Food Security & Agriculture" },
    desc: {
      ar: "تحسين السلالات، صحة الحيوان، وسلامة الغذاء عبر تعاون بين الطب البيطري والتكنولوجيا الحيوية.",
      en: "Breed improvement, animal health and food safety through veterinary–biotech collaboration.",
    },
  },
  {
    title: { ar: "الطاقة والبيئة", en: "Energy & Environment" },
    desc: {
      ar: "معالجة مخلفات المنطقة الصناعية وتطبيقات الطاقة الشمسية وكفاءة استخدام المياه.",
      en: "Industrial waste treatment, solar applications and water-use efficiency.",
    },
  },
  {
    title: { ar: "الصحة والدواء", en: "Health & Pharmaceuticals" },
    desc: {
      ar: "اكتشاف المركبات الفعالة، مقاومة المضادات الحيوية، والدراسات الإكلينيكية التطبيقية.",
      en: "Active compound discovery, antimicrobial resistance and applied clinical studies.",
    },
  },
  {
    title: { ar: "الذكاء الاصطناعي والبيانات", en: "AI & Data" },
    desc: {
      ar: "نماذج تنبؤية للصحة والصناعة ومعالجة اللغة العربية والمعلوماتية الحيوية.",
      en: "Predictive models for health and industry, Arabic NLP and bioinformatics.",
    },
  },
];

function Research() {
  const { t } = useSite();
  return (
    <>
      <PageHeader
        title={{ ar: "البحث العلمي والابتكار", en: "Research & Innovation" }}
        subtitle={{
          ar: "منظومة بحثية متكاملة تدعم الباحثين وتحوّل نتائج المعامل إلى حلول للصناعة والمجتمع.",
          en: "An integrated research ecosystem turning lab results into solutions for industry and society.",
        }}
      />

      <section className="border-b border-border bg-card">
        <div className="shell grid grid-cols-2 gap-6 py-12 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label.en} className="text-center">
              <m.icon className="mx-auto size-6 text-accent" />
              <p className="mt-3 text-3xl font-extrabold text-primary">
                <Counter value={m.value} />
              </p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground sm:text-sm">
                {t(m.label)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell py-14">
        <SectionHeading title={{ ar: "المراكز والوحدات البحثية", en: "Centres & Units" }} />
        <div className="grid gap-5 sm:grid-cols-2">
          {researchCenters.map((r) => (
            <article
              key={r.name.en}
              className="card-hover rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-base font-bold">{t(r.name)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(r.desc)}</p>
              <p className="mt-4 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary">
                {t(r.metric)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 py-14">
        <div className="shell">
          <SectionHeading title={{ ar: "أولويات بحثية", en: "Research Priorities" }} />
          <div className="grid gap-5 md:grid-cols-2">
            {priorities.map((p) => (
              <article key={p.title.en} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="gold-rule text-base font-bold">{t(p.title)}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t(p.desc)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
