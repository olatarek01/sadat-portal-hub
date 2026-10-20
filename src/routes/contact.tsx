import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/Bits";
import { useSite } from "@/lib/site-context";
import { university } from "@/data/university";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | جامعة مدينة السادات الأهلية" },
      {
        name: "description",
        content:
          "راسل جامعة مدينة السادات الأهلية: العنوان وأرقام الهاتف والبريد الإلكتروني ونموذج مراسلة مباشر.",
      },
      { property: "og:title", content: "تواصل معنا | Contact Us" },
      {
        property: "og:description",
        content: "أرسل استفسارك إلى جامعة مدينة السادات الأهلية وسيتم الرد عليك.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useSite();

  const [loading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [form, setForm] = React.useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      form.full_name.trim().length < 3 ||
      !form.email.includes("@") ||
      form.message.trim().length < 10
    ) {
      toast.error(
        t({ ar: "برجاء استكمال البيانات بشكل صحيح", en: "Please complete the form correctly" }),
      );
      return;
    }
  }

  const field =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30";

  return (
    <>
      <PageHeader
        title={{ ar: "تواصل معنا", en: "Contact Us" }}
        subtitle={{
          ar: "راسلنا عبر النموذج أو بيانات التواصل الموضحة أدناه.",
          en: "Reach us through the form below or the contact details listed.",
        }}
      />

      <div className="shell grid gap-8 py-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          {done ? (
            <div className="py-10 text-center">
              <h2 className="text-xl font-extrabold text-accent">
                {t({ ar: "وصلتنا رسالتك", en: "We received your message" })}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {t({
                  ar: "سيتم التواصل معك عبر البريد الإلكتروني المسجل.",
                  en: "We will reply to the email address you provided.",
                })}
              </p>
              <button
                onClick={() => {
                  setDone(false);
                  setForm({ full_name: "", email: "", phone: "", subject: "", message: "" });
                }}
                className="mt-6 rounded-full border border-border px-6 py-2.5 text-sm font-semibold"
              >
                {t({ ar: "إرسال رسالة أخرى", en: "Send another message" })}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              <input
                className={field}
                placeholder={t({ ar: "الاسم الكامل", en: "Full name" })}
                value={form.full_name}
                onChange={set("full_name")}
                required
              />
              <input
                className={field}
                type="email"
                dir="ltr"
                placeholder={t({ ar: "البريد الإلكتروني", en: "Email" })}
                value={form.email}
                onChange={set("email")}
                required
              />
              <input
                className={field}
                dir="ltr"
                placeholder={t({ ar: "رقم الهاتف (اختياري)", en: "Phone (optional)" })}
                value={form.phone}
                onChange={set("phone")}
              />
              <input
                className={field}
                placeholder={t({ ar: "الموضوع", en: "Subject" })}
                value={form.subject}
                onChange={set("subject")}
              />
              <textarea
                className={`${field} sm:col-span-2`}
                rows={6}
                placeholder={t({ ar: "نص الرسالة", en: "Your message" })}
                value={form.message}
                onChange={set("message")}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-accent px-8 py-3 text-sm font-bold text-accent-foreground transition hover:opacity-90 disabled:opacity-60 sm:col-span-2 sm:justify-self-start"
              >
                {loading
                  ? t({ ar: "جارٍ الإرسال...", en: "Sending..." })
                  : t({ ar: "إرسال الرسالة", en: "Send message" })}
              </button>
            </form>
          )}
        </section>

        <aside className="grid h-fit gap-4">
          <div className="rounded-2xl border border-border bg-card p-6 text-sm">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
              {t(university.contact.address)}
            </p>
            <p className="mt-4 flex items-center gap-3" dir="ltr">
              <Phone className="size-5 shrink-0 text-accent" />
              {university.contact.phone}
            </p>
            <p className="mt-4 flex items-center gap-3" dir="ltr">
              <Mail className="size-5 shrink-0 text-accent" />
              {university.contact.email}
            </p>
          </div>
          <iframe
            title={t({ ar: "خريطة الجامعة", en: "University map" })}
            loading="lazy"
            className="h-64 w-full rounded-2xl border border-border"
            src="https://www.openstreetmap.org/export/embed.html?bbox=30.50%2C30.34%2C30.58%2C30.40&layer=mapnik"
          />
        </aside>
      </div>
    </>
  );
}
