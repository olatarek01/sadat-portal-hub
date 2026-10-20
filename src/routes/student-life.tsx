import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bus, HeartPulse, Home, Trophy, Users, X } from "lucide-react";
import libraryImg from "@/assets/life-library.jpg";
import sportsImg from "@/assets/life-sports.jpg";
import labImg from "@/assets/life-lab.jpg";
import festivalImg from "@/assets/life-festival.jpg";
import { PageHeader, SectionHeading } from "@/components/site/Bits";
import { useSite } from "@/lib/site-context";
import type { Bi } from "@/data/university";

export const Route = createFileRoute("/student-life")({
  head: () => ({
    meta: [
      { title: "الحياة الطلابية | جامعة مدينة السادات الأهلية" },
      {
        name: "description",
        content:
          "الأنشطة والأسر الطلابية والمدينة الجامعية والخدمات الطلابية بجامعة مدينة السادات الأهلية.",
      },
      { property: "og:title", content: "الحياة الطلابية | Student Life" },
      {
        property: "og:description",
        content: "أنشطة رياضية وفنية وخدمات سكن ونقل ورعاية صحية للطلاب.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudentLife,
});

const gallery: { src: string; caption: Bi }[] = [
  { src: libraryImg, caption: { ar: "المكتبة المركزية", en: "Central Library" } },
  { src: sportsImg, caption: { ar: "دوري الكليات الرياضي", en: "Inter-faculty sports league" } },
  { src: labImg, caption: { ar: "معامل التدريب العملي", en: "Practical training labs" } },
  { src: festivalImg, caption: { ar: "مهرجان الأسر الطلابية", en: "Student societies festival" } },
];

const services = [
  {
    icon: Home,
    title: { ar: "المدينة الجامعية", en: "Student Housing" },
    desc: {
      ar: "سكن مجهز للطلاب والطالبات مع إشراف وإعاشة يومية.",
      en: "Furnished housing for male and female students with supervision and daily meals.",
    },
  },
  {
    icon: Bus,
    title: { ar: "النقل الجامعي", en: "Campus Transport" },
    desc: {
      ar: "خطوط أتوبيسات من المدن المجاورة إلى الحرم الجامعي.",
      en: "Bus lines connecting neighbouring cities to campus.",
    },
  },
  {
    icon: HeartPulse,
    title: { ar: "الرعاية الصحية", en: "Health Care" },
    desc: {
      ar: "عيادات جامعية وتأمين صحي لجميع الطلاب المقيدين.",
      en: "Campus clinics and health insurance for all enrolled students.",
    },
  },
  {
    icon: Trophy,
    title: { ar: "الأنشطة الرياضية", en: "Sports Activities" },
    desc: {
      ar: "ملاعب وصالات وبطولات داخلية وتمثيل الجامعة خارجيًا.",
      en: "Fields, halls, internal tournaments and external representation.",
    },
  },
  {
    icon: Users,
    title: { ar: "الأسر الطلابية", en: "Student Societies" },
    desc: {
      ar: "أكثر من 40 أسرة في المجالات الثقافية والعلمية والتطوعية.",
      en: "Over 40 societies across cultural, scientific and volunteering fields.",
    },
  },
];

function StudentLife() {
  const { t } = useSite();
  const [lightbox, setLightbox] = React.useState<number | null>(null);
  const activeImage = lightbox === null ? undefined : gallery[lightbox];

  return (
    <>
      <PageHeader
        title={{ ar: "الحياة الطلابية", en: "Student Life" }}
        subtitle={{
          ar: "تجربة جامعية متكاملة داخل الحرم: أنشطة، خدمات، ومجتمع طلابي متنوع.",
          en: "A complete on-campus experience: activities, services and a diverse student community.",
        }}
      />

      <section className="shell py-14">
        <SectionHeading title={{ ar: "من قلب الحرم الجامعي", en: "From Campus" }} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((g, i) => (
            <button
              key={g.caption.en}
              onClick={() => setLightbox(i)}
              className="card-hover group relative overflow-hidden rounded-2xl border border-border"
            >
              <img
                src={g.src}
                alt={t(g.caption)}
                loading="lazy"
                width={1024}
                height={768}
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,var(--navy-deep),transparent)] p-4 text-start text-sm font-bold text-navy-foreground">
                {t(g.caption)}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 py-14">
        <div className="shell">
          <SectionHeading title={{ ar: "خدمات الطلاب", en: "Student Services" }} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article key={s.title.en} className="rounded-2xl border border-border bg-card p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                  <s.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-bold">{t(s.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(s.desc)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeImage && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[60] grid place-items-center bg-navy-deep/90 p-4"
        >
          <button
            aria-label="close"
            className="absolute top-5 rounded-full bg-navy-foreground/15 p-2 text-navy-foreground ltr:right-5 rtl:left-5"
          >
            <X className="size-5" />
          </button>
          <figure className="min-w-0 max-w-full sm:max-w-4xl">
            <img
              src={activeImage.src}
              alt={t(activeImage.caption)}
              className="max-h-[calc(100dvh-7rem)] w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-3 text-center text-sm font-semibold text-navy-foreground">
              {t(activeImage.caption)}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
