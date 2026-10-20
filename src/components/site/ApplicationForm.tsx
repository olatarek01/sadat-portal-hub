import * as React from "react";

import { useSite } from "@/lib/site-context";
import { colleges } from "@/data/university";
import { SectionHeading } from "@/components/site/Bits";

export function ApplicationForm() {
  const { t, lang } = useSite();

  const [loading] = React.useState(false);
  const [done, setDone] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "").trim();

    const next: Record<string, string> = {};
    if (get("full_name").length < 3)
      next["full_name"] = t({ ar: "أدخل الاسم الرباعي", en: "Enter your full name" });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email")))
      next["email"] = t({ ar: "بريد إلكتروني غير صحيح", en: "Invalid email address" });
    if (get("phone").replace(/\D/g, "").length < 8)
      next["phone"] = t({ ar: "رقم هاتف غير صحيح", en: "Invalid phone number" });
    if (!get("college_slug"))
      next["college_slug"] = t({ ar: "اختر الكلية", en: "Select a college" });
    setErrors(next);
    if (Object.keys(next).length) return;
  }

  const field =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30";
  const labelCls = "mb-1.5 block text-sm font-semibold";

  return (
    <section id="apply" className="bg-secondary/50 py-14">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          title={{ ar: "نموذج طلب الالتحاق", en: "Application Form" }}
          subtitle={{
            ar: "نموذج الالتحاق بجامعة مدينة السادات الأهلية.",
            en: "Application form for National University of Sadat City.",
          }}
        />

        {done ? (
          <div className="rounded-2xl border border-accent/40 bg-card p-8 text-center">
            <h3 className="text-lg font-bold">
              {t({ ar: "تم استلام طلبك", en: "Application received" })}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t({
                ar: "رقم الطلب المرجعي:",
                en: "Your reference number:",
              })}{" "}
              <span dir="ltr" className="font-mono text-foreground">
                {done.slice(0, 8).toUpperCase()}
              </span>
            </p>
            <button
              onClick={() => setDone(null)}
              className="mt-6 rounded-full border border-border px-5 py-2 text-sm font-semibold"
            >
              {t({ ar: "إرسال طلب آخر", en: "Submit another application" })}
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="grid gap-5 rounded-2xl border border-border bg-card p-7 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <label className={labelCls} htmlFor="full_name">
                {t({ ar: "الاسم الرباعي *", en: "Full name *" })}
              </label>
              <input id="full_name" name="full_name" className={field} required />
              {errors["full_name"] && (
                <p className="mt-1 text-xs text-destructive">{errors["full_name"]}</p>
              )}
            </div>

            <div>
              <label className={labelCls} htmlFor="email">
                {t({ ar: "البريد الإلكتروني *", en: "Email *" })}
              </label>
              <input id="email" name="email" type="email" dir="ltr" className={field} required />
              {errors["email"] && (
                <p className="mt-1 text-xs text-destructive">{errors["email"]}</p>
              )}
            </div>

            <div>
              <label className={labelCls} htmlFor="phone">
                {t({ ar: "رقم الهاتف *", en: "Phone *" })}
              </label>
              <input id="phone" name="phone" dir="ltr" className={field} required />
              {errors["phone"] && (
                <p className="mt-1 text-xs text-destructive">{errors["phone"]}</p>
              )}
            </div>

            <div>
              <label className={labelCls} htmlFor="national_id">
                {t({ ar: "الرقم القومي / جواز السفر", en: "National ID / Passport" })}
              </label>
              <input id="national_id" name="national_id" dir="ltr" className={field} />
            </div>

            <div>
              <label className={labelCls} htmlFor="nationality">
                {t({ ar: "الجنسية", en: "Nationality" })}
              </label>
              <input
                id="nationality"
                name="nationality"
                defaultValue={lang === "ar" ? "مصري" : "Egyptian"}
                className={field}
              />
            </div>

            <div>
              <label className={labelCls} htmlFor="college_slug">
                {t({ ar: "الكلية المرغوبة *", en: "Preferred college *" })}
              </label>
              <select id="college_slug" name="college_slug" className={field} defaultValue="">
                <option value="" disabled>
                  {t({ ar: "اختر الكلية", en: "Select a college" })}
                </option>
                {colleges.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {t(c.name)}
                  </option>
                ))}
              </select>
              {errors["college_slug"] && (
                <p className="mt-1 text-xs text-destructive">{errors["college_slug"]}</p>
              )}
            </div>

            <div>
              <label className={labelCls} htmlFor="program">
                {t({ ar: "البرنامج (اختياري)", en: "Program (optional)" })}
              </label>
              <input id="program" name="program" className={field} />
            </div>

            <div>
              <label className={labelCls} htmlFor="certificate_year">
                {t({ ar: "سنة الثانوية", en: "Certificate year" })}
              </label>
              <input
                id="certificate_year"
                name="certificate_year"
                type="number"
                dir="ltr"
                min={1990}
                max={2100}
                className={field}
              />
            </div>

            <div>
              <label className={labelCls} htmlFor="total_score">
                {t({ ar: "المجموع (%)", en: "Total score (%)" })}
              </label>
              <input
                id="total_score"
                name="total_score"
                type="number"
                dir="ltr"
                step="0.01"
                min={0}
                max={100}
                className={field}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelCls} htmlFor="notes">
                {t({ ar: "ملاحظات", en: "Notes" })}
              </label>
              <textarea id="notes" name="notes" rows={4} className={field} />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground transition hover:opacity-90 disabled:opacity-50"
              >
                {loading
                  ? t({ ar: "جارٍ الإرسال...", en: "Submitting..." })
                  : t({ ar: "إرسال الطلب", en: "Submit application" })}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
