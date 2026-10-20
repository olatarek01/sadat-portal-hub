import * as React from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSite } from "@/lib/site-context";
import { testimonials as fallbackTestimonials } from "@/data/home";
import type { TestimonialRow } from "@/lib/content.functions";
import studentMennatallah from "@/assets/student-mennatallah.jpg";
import studentAhmed from "@/assets/student-ahmed.jpg";
import studentSara from "@/assets/student-sara.jpg";
import studentMahmoud from "@/assets/student-mahmoud.jpg";

const studentPortraits = [studentMennatallah, studentAhmed, studentSara, studentMahmoud];

export function TestimonialsSlider({ items = [] }: { items?: TestimonialRow[] }) {
  const { t, lang } = useSite();
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const testimonials =
    items.length > 0
      ? items.map((item, itemIndex) => ({
          name: { ar: item.student_name_ar, en: item.student_name_en },
          role: { ar: item.role_ar, en: item.role_en },
          quote: { ar: item.content_ar, en: item.content_en },
          photo: studentPortraits[itemIndex % studentPortraits.length],
        }))
      : fallbackTestimonials.map((item, itemIndex) => ({
          ...item,
          photo: studentPortraits[itemIndex % studentPortraits.length],
        }));
  const count = testimonials.length;

  React.useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => window.clearInterval(id);
  }, [paused, count]);

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);
  const Prev = lang === "ar" ? ChevronRight : ChevronLeft;
  const Next = lang === "ar" ? ChevronLeft : ChevronRight;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card">
      <div
  className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
  style={{
    transform: `translateX(${(lang === "ar" ? 1 : -1) * index * 100}%)`,
  }}
>
          {testimonials.map((item) => (
            <figure key={item.name.en} className="w-full min-w-0 shrink-0 p-4 sm:p-8 lg:p-12">
              <Quote className="size-8 text-accent" />
              <blockquote className="mt-5 text-base leading-loose sm:text-lg">
                {t(item.quote)}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4 border-t border-border pt-6">
                <img
                  src={item.photo}
                  alt={t(item.name)}
                  loading="lazy"
                  width={768}
                  height={768}
                  className="size-16 shrink-0 rounded-full border-2 border-accent object-cover shadow-card sm:size-20"
                />
                <div className="min-w-0">
                  <p className="truncate font-bold text-primary">{t(item.name)}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {t(item.role)}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label={lang === "ar" ? "السابق" : "Previous"}
          onClick={() => go(-1)}
          className="grid size-9 place-items-center rounded-full border border-border bg-card transition hover:bg-secondary"
        >
          <Prev className="size-4" />
        </button>
        {testimonials.map((item, i) => (
          <button
            key={item.name.en}
            type="button"
            aria-label={`${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2.5 rounded-full transition-all",
              i === index ? "w-7 bg-accent" : "w-2.5 bg-border hover:bg-muted-foreground",
            )}
          />
        ))}
        <button
          type="button"
          aria-label={lang === "ar" ? "التالي" : "Next"}
          onClick={() => go(1)}
          className="grid size-9 place-items-center rounded-full border border-border bg-card transition hover:bg-secondary"
        >
          <Next className="size-4" />
        </button>
      </div>
    </div>
  );
}
