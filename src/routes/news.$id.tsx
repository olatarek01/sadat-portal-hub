import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalendarDays, Newspaper } from "lucide-react";
import { listNews } from "@/lib/content.functions";
import { imageFor } from "@/data/images";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/news/$id")({
  loader: async ({ params }) => {
    const items = await listNews();
    const article = items.find((x) => x.id === params.id);
    if (!article) throw notFound();
    return { article, related: items.filter((x) => x.id !== params.id).slice(0, 3) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.article.title_ar} | جامعة مدينة السادات الأهلية` },
          { name: "description", content: loaderData.article.excerpt_ar },
          { property: "og:title", content: loaderData.article.title_ar },
          { property: "og:description", content: loaderData.article.excerpt_ar },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [
          { title: "الخبر غير متاح | جامعة مدينة السادات الأهلية" },
          { name: "robots", content: "noindex" },
        ],
  }),
  errorComponent: () => (
    <NewsUnavailable
      title="تعذّر تحميل الخبر"
      description="حدث خطأ أثناء تحميل المحتوى، يرجى المحاولة مرة أخرى."
    />
  ),
  notFoundComponent: () => (
    <NewsUnavailable title="الخبر غير متاح" description="ربما تم حذف الخبر أو إلغاء نشره." />
  ),
  component: NewsDetail,
});

function NewsUnavailable({ title, description }: { title: string; description: string }) {
  return (
    <main className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-4 py-20 text-center">
      <div>
        <span className="mx-auto grid size-20 place-items-center rounded-full bg-secondary text-primary">
          <Newspaper className="size-9" />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold">{title}</h1>
        <p className="mt-3 text-muted-foreground">{description}</p>
        <Link
          to="/news"
          className="mt-7 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground"
        >
          العودة إلى الأخبار
        </Link>
      </div>
    </main>
  );
}

function NewsDetail() {
  const { article, related } = Route.useLoaderData();
  const { t } = useSite();
  return (
    <main>
      <header className="brand-gradient text-navy-foreground">
        <div className="shell py-16">
          <Link to="/news" className="text-sm font-bold text-gold">
            {t({ ar: "الأخبار والفعاليات", en: "News & Events" })}
          </Link>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {t({ ar: article.title_ar, en: article.title_en })}
          </h1>
          <p className="mt-5 flex items-center gap-2 text-sm opacity-80">
            <CalendarDays className="size-4" />
            <span dir="ltr">{article.event_date}</span>
          </p>
        </div>
      </header>
      <article className="mx-auto max-w-4xl px-5 sm:px-8 py-14">
        <img
          src={imageFor(article.image_key)}
          alt={t({ ar: article.title_ar, en: article.title_en })}
          className="aspect-[16/9] w-full rounded-lg object-cover"
        />
        <p className="mt-8 whitespace-pre-line text-base leading-9 text-muted-foreground">
          {t({
            ar: article.body_ar || article.excerpt_ar,
            en: article.body_en || article.excerpt_en,
          })}
        </p>
      </article>
      <section className="shell pb-16">
        <h2 className="text-2xl font-extrabold">
          {t({ ar: "أخبار ذات صلة", en: "Related News" })}
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {related.map((n) => (
            <Link key={n.id} to="/news/$id" params={{ id: n.id }} className="related-link">
              {t({ ar: n.title_ar, en: n.title_en })}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
