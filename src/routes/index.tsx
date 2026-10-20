import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpenCheck,
  Building2,
  CalendarDays,
  FlaskConical,
  Globe2,
  GraduationCap,
  Laptop,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";
import heroAsset from "@/assets/nus-entrance-2026.png.asset.json";
import presidentAsset from "@/assets/university-president-nasser-abdelbary.jpeg.asset.json";
import lifeLibrary from "@/assets/life-library.jpg";
import lifeSports from "@/assets/life-sports.jpg";
import lifeLab from "@/assets/life-lab.jpg";
import lifeFestival from "@/assets/life-festival.jpg";
import { useSite, ui } from "@/lib/site-context";
import { Counter, SectionHeading } from "@/components/site/Bits";
import { ProgressBar, Reveal } from "@/components/site/Motion";
import { Ticker } from "@/components/site/Ticker";
import { TestimonialsSlider } from "@/components/site/Testimonials";
import { stats, university } from "@/data/university";
import { listColleges, listNews, listTestimonials } from "@/lib/content.functions";
import { imageFor } from "@/data/images";
import { achievements, presidentMessage, progressMetrics, whyUs } from "@/data/home";

const whyIcons: Record<string, typeof GraduationCap> = {
  accredited: BookOpenCheck,
  labs: FlaskConical,
  global: Globe2,
  career: Award,
  campus: Building2,
  digital: Laptop,
};

export const Route = createFileRoute("/")({
  loader: async () => {
    // Sections are independent: one failing read is logged and leaves only its section empty.
    const [colleges, news, testimonials] = await Promise.allSettled([
      listColleges(),
      listNews(),
      listTestimonials(),
    ]);
    const failed: string[] = [];
    const pick = <T,>(result: PromiseSettledResult<T[]>, label: string): T[] => {
      if (result.status === "fulfilled") return result.value;
      console.error(`homepage ${label} read failed`, result.reason);
      failed.push(label);
      return [];
    };
    return {
      colleges: pick(colleges, "colleges"),
      news: pick(news, "news"),
      testimonials: pick(testimonials, "testimonials"),
      failed,
    };
  },
  errorComponent: () => (
    <p className="mx-auto max-w-3xl px-5 sm:px-8 py-24 text-center text-muted-foreground">
      تعذّر تحميل محتوى الصفحة حاليًا. حاول تحديث الصفحة.
    </p>
  ),
  notFoundComponent: () => (
    <p className="mx-auto max-w-3xl px-5 sm:px-8 py-24 text-center text-muted-foreground">
      الصفحة غير متاحة.
    </p>
  ),
  head: () => ({
    meta: [
      { title: "جامعة مدينة السادات الأهلية | National University of Sadat City" },
      {
        name: "description",
        content:
          "البوابة الرسمية لجامعة مدينة السادات الأهلية: تأسست عام 2024، تضم 7 كليات و7,000+ طالب وطالبة، قبول وتسجيل، بحث علمي تطبيقي، وحياة طلابية متكاملة.",
      },
      {
        property: "og:title",
        content: "جامعة مدينة السادات الأهلية | National University of Sadat City",
      },
      {
        property: "og:description",
        content: "الكليات والقبول والبحث العلمي والحياة الطلابية في بوابة واحدة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollegeOrUniversity",
          name: "جامعة مدينة السادات الأهلية",
          alternateName: "National University of Sadat City",
          foundingDate: "2024",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Sadat City",
            addressRegion: "Menoufia",
            addressCountry: "EG",
          },
          telephone: "+201090004204",
          email: "info@nusc.edu.eg",
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useSite();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const { colleges, news, testimonials, failed } = Route.useLoaderData();
  const sectionError = (label: string) =>
    failed.includes(label) ? (
      <p
        role="alert"
        className="border border-border bg-card p-6 text-center text-sm text-muted-foreground"
      >
        {lang === "ar"
          ? "تعذّر تحميل هذا القسم حاليًا. حاول تحديث الصفحة."
          : "This section couldn't be loaded right now. Please refresh the page."}
      </p>
    ) : null;
  const latest = news.slice(0, 3);
  const gallery = [
    { src: lifeLibrary, alt: { ar: "المكتبة المركزية", en: "Central library" } },
    { src: lifeSports, alt: { ar: "الأنشطة الرياضية", en: "Sports activities" } },
    { src: lifeLab, alt: { ar: "المعامل البحثية", en: "Research labs" } },
    { src: lifeFestival, alt: { ar: "المهرجانات الطلابية", en: "Student festivals" } },
  ];

  return (
    <>
      <Ticker />

      {/* Hero */}
      <section className="relative isolate flex min-h-[90svh] flex-col overflow-hidden bg-navy-deep">
       <img
  src="/background.png"
  alt={t(university.name)}
  width={1615}
  height={974}
  className="hero-image absolute inset-0 size-full object-cover object-center"
/>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--navy-deep)_12%,transparent),color-mix(in_oklab,var(--navy-deep)_46%,transparent))]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--navy-deep)_86%,transparent)_0%,color-mix(in_oklab,var(--navy-deep)_72%,transparent)_30%,color-mix(in_oklab,var(--navy-deep)_42%,transparent)_62%,transparent_92%)] rtl:bg-[linear-gradient(270deg,color-mix(in_oklab,var(--navy-deep)_86%,transparent)_0%,color-mix(in_oklab,var(--navy-deep)_72%,transparent)_30%,color-mix(in_oklab,var(--navy-deep)_42%,transparent)_62%,transparent_92%)]" />

        <div className="relative shell flex flex-1 items-end py-12 text-navy-foreground sm:py-16 lg:pt-24">
          <div className="min-w-0 max-w-4xl">
            <Reveal>
              <span className="hero-reveal inline-flex items-center gap-2 border border-gold/45 bg-navy-deep/45 px-4 py-2 text-xs font-bold text-gold-soft backdrop-blur-md">
                <Sparkles className="size-3.5" />
                {lang === "ar" ? "بوابة الجامعة الرسمية" : "Official University Portal"}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-7 max-w-4xl text-3xl font-black leading-[1.2] sm:text-5xl lg:text-6xl">
                {t(university.name)}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-2xl text-base leading-loose text-navy-foreground/85 sm:text-xl">
                {t({
                  ar: "من قلب مدينة السادات.. نصنع قادة الفكر والعلم لمستقبل واعد",
                  en: "From the heart of Sadat City, we prepare leaders of knowledge for a promising future.",
                })}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-4 border-s-2 border-gold ps-4 text-sm font-bold text-gold-soft">
                {t({
                  ar: "7 كليات أكاديمية.. رحلتك الجامعية تبدأ من هنا",
                  en: "7 academic faculties — your university journey starts here.",
                })}
              </p>
              <div className="mt-9 grid max-w-md grid-cols-2 gap-3 sm:flex">
                <Link
                  to="/admissions"
                  className="interactive-lift inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-none bg-accent px-3 py-3 text-center text-sm font-bold text-accent-foreground sm:px-7"
                >
                  {t(ui.applyNow)}
                </Link>
                <Link
                  to="/colleges"
                  className="group inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-none border border-navy-foreground/45 bg-navy-foreground/5 px-3 py-3 text-center text-sm font-bold backdrop-blur transition hover:bg-navy-foreground/15 sm:px-7"
                >
                  {t(ui.explore)}{" "}
                  <Arrow className="size-4 shrink-0 transition-transform group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="relative z-10 shrink-0 border-t border-navy-foreground/15 bg-navy-deep/72 backdrop-blur-md">
          <div className="shell grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label.en}
                delay={320 + i * 90}
                className="border-navy-foreground/15 px-3 py-4 text-center text-navy-foreground odd:border-s sm:py-5 lg:border-s lg:first:border-s-0"
              >
                <p className="text-2xl font-black text-gold-soft sm:text-3xl">
                  <Counter value={s.value} suffix={s.suffix ?? ""} />
                </p>
                <p className="mt-1 text-[11px] font-semibold opacity-75 sm:text-xs">{t(s.label)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section id="why-scu" className="section-grid scroll-mt-28 py-20 sm:py-24">
        <div className="shell">
          <SectionHeading
            title={{
              ar: "لماذا جامعة مدينة السادات الأهلية؟",
              en: "Why National University of Sadat City?",
            }}
            subtitle={university.about}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((f, i) => {
              const Icon = whyIcons[f.key] ?? GraduationCap;
              return (
                <Reveal key={f.key} delay={i * 70}>
                  <article className="card-hover group h-full border border-border bg-card p-6 sm:p-8">
                    <span className="grid size-12 place-items-center bg-secondary text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold">{t(f.title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(f.desc)}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Colleges with images */}
      <section className="bg-secondary/60 py-20 sm:py-24">
        <div className="shell">
          <SectionHeading
            title={{ ar: "كليات الجامعة", en: "University Faculties" }}
            subtitle={{
              ar: "اختر كليتك واستعرض البرامج الدراسية ومدة الدراسة وبيانات مدير البرامج.",
              en: "Pick a faculty to view its programs, study duration and programs director details.",
            }}
            action={{ to: "/colleges", label: ui.explore }}
          />
          {sectionError("colleges")}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {colleges.map((c, i) => (
              <Reveal key={c.slug} delay={i * 70}>
                <Link
                  to="/colleges/$slug"
                  params={{ slug: c.slug }}
                  className="card-hover group block h-full overflow-hidden border border-border bg-card"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={imageFor(c.image_key)}
                      alt={t({ ar: c.name_ar, en: c.name_en })}
                      loading="lazy"
                      width={768}
                      height={512}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute bottom-3 start-3 bg-accent px-3 py-1 text-[11px] font-bold text-accent-foreground">
                      {t({ ar: c.category_ar, en: c.category_en })}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold leading-snug group-hover:text-primary">
                      {t({ ar: c.name_ar, en: c.name_en })}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {t({ ar: c.desc_ar, en: c.desc_en })}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                      {lang === "ar" ? "تفاصيل الكلية" : "College details"}
                      <Arrow className="size-4 transition-transform group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* President message */}
      <section className="shell py-20 sm:py-24">
        <div className="grid items-center gap-10 border-y border-border py-10 lg:grid-cols-[280px_1fr] lg:py-14">
          <Reveal className="text-center lg:text-start">
            <div className="mx-auto size-44 overflow-hidden rounded-full border-4 border-accent shadow-elegant ring-8 ring-secondary lg:mx-0 lg:size-52">
             <img
  src="/university-president-nasser-abdelbary.jfif"
  alt={t(presidentMessage.name)}
  width={1165}
  height={765}
  loading="lazy"
  className="size-full object-cover object-[48%_center]"
/>
            </div>
            <p className="mt-5 text-lg font-bold text-primary">{t(presidentMessage.name)}</p>
            <p className="text-sm text-muted-foreground">{t(presidentMessage.role)}</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="gold-rule text-2xl font-extrabold sm:text-3xl">
              {lang === "ar" ? "كلمة رئيس الجامعة" : "Message from the President"}
            </h2>
            <p className="mt-6 text-base leading-loose text-muted-foreground">
              {t(presidentMessage.quote)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Achievements + progress */}
      <section className="brand-gradient py-20 sm:py-24 text-navy-foreground">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold sm:text-3xl">
                {lang === "ar" ? "إنجازات الجامعة" : "University Achievements"}
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-6">
                {achievements.map((a, i) => (
                  <Reveal key={a.label.en} delay={i * 80}>
                    <p className="text-3xl font-extrabold text-accent sm:text-4xl">
                      <Counter value={a.value} suffix={a.suffix ?? ""} />
                    </p>
                    <p className="mt-2 text-xs font-semibold opacity-90 sm:text-sm">{t(a.label)}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="min-w-0 rounded-3xl bg-card p-5 text-foreground sm:p-8">
              <h3 className="text-lg font-bold">
                {lang === "ar" ? "مؤشرات الأداء" : "Performance Indicators"}
              </h3>
              <div className="mt-6 space-y-5">
                {progressMetrics.map((m) => (
                  <ProgressBar key={m.label.en} value={m.value} label={t(m.label)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student life */}
      <section className="shell py-20 sm:py-24">
        <SectionHeading
          title={{ ar: "الحياة الطلابية", en: "Student Life" }}
          subtitle={{
            ar: "أنشطة رياضية وفنية وأسر طلابية ومكتبة مركزية ومعامل مفتوحة على مدار العام.",
            en: "Sports, arts, student societies, a central library and labs open all year round.",
          }}
          action={{
            to: "/student-life",
            label: { ar: "استكشف الحياة الطلابية", en: "Explore student life" },
          }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((g, i) => (
            <Reveal key={g.alt.en} delay={i * 70}>
              <figure className="group relative overflow-hidden rounded-2xl">
                <img
                  src={g.src}
                  alt={t(g.alt)}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-bold text-white">
                  {t(g.alt)}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/50 py-20 sm:py-24">
        <div className="shell">
          <SectionHeading
            align="center"
            title={{ ar: "ماذا يقول طلابنا؟", en: "What our students say" }}
          />
          {sectionError("testimonials") ?? <TestimonialsSlider items={testimonials} />}
        </div>
      </section>

      {/* News */}
      <section className="shell py-20 sm:py-24">
        <SectionHeading
          title={{ ar: "آخر الأخبار والفعاليات", en: "Latest News & Events" }}
          action={{ to: "/news", label: ui.news }}
        />
        {sectionError("news")}
        <div className="grid gap-5 md:grid-cols-3">
          {latest.map((n, i) => (
            <Reveal key={n.id} delay={i * 80}>
              <Link
                to="/news/$id"
                params={{ id: n.id }}
                className="card-hover block h-full rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <CalendarDays className="size-4 text-accent" />
                  <span dir="ltr">{n.event_date}</span>
                </div>
                <h3 className="mt-3 text-base font-bold leading-snug">
                  {t({ ar: n.title_ar, en: n.title_en })}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t({ ar: n.excerpt_ar, en: n.excerpt_en })}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact + map */}
      <section className="bg-secondary/50 pt-20 pb-10 sm:pt-24 sm:pb-12">
        <div className="shell grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              title={{ ar: "تواصل معنا", en: "Contact Us" }}
              subtitle={{
                ar: "نسعد باستقبال استفساراتكم عبر البريد الإلكتروني أو الهاتف أو بزيارة الحرم الجامعي.",
                en: "Reach us by email, phone, or by visiting the main campus.",
              }}
            />
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
                <span>{t(university.contact.address)}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-5 shrink-0 text-accent" />
                <a
                  href={`tel:${university.contact.phoneIntl}`}
                  dir="ltr"
                  className="hover:text-primary"
                >
                  {university.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 shrink-0 text-accent" />
                <a
                  href={`mailto:${university.contact.email}`}
                  className="min-w-0 break-all hover:text-primary"
                >
                  {university.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Users className="size-5 shrink-0 text-accent" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=University+of+Sadat+City+Egypt"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-primary hover:text-accent"
                >
                  {lang === "ar" ? "موقع الجامعة" : "University location"}
                </a>
              </li>
            </ul>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border">
            <iframe
              title={lang === "ar" ? "خريطة مدينة السادات" : "Sadat City map"}
              src="https://www.openstreetmap.org/export/embed.html?bbox=30.47%2C30.34%2C30.60%2C30.42&layer=mapnik"
              loading="lazy"
              className="h-80 w-full lg:h-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
