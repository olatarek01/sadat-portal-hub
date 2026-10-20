import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Building2,
  ClipboardList,
  GraduationCap,
  MessageSquareQuote,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import content from "@/data/public-content.json";
import { privateRows } from "@/data/admin-empty";
import { rejectUnavailable } from "@/lib/availability";
import { useSite } from "@/lib/site-context";
import { imageFor, imageKeys } from "@/data/images";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "لوحة الإدارة | جامعة مدينة السادات الأهلية" },
      {
        name: "description",
        content: "إدارة طلبات الالتحاق والرسائل والأخبار والكليات والأسئلة الشائعة.",
      },
      { property: "og:title", content: "لوحة الإدارة | Admin Dashboard" },
      { property: "og:description", content: "إدارة محتوى بوابة جامعة مدينة السادات الأهلية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

type Tab =
  | "applications"
  | "messages"
  | "news"
  | "colleges"
  | "departments"
  | "faculty"
  | "testimonials"
  | "faqs"
  | "admins"
  | "audit";

const tabs: { key: Tab; label: { ar: string; en: string } }[] = [
  { key: "applications", label: { ar: "طلبات التقديم", en: "Applications" } },
  { key: "messages", label: { ar: "الرسائل", en: "Messages" } },
  { key: "news", label: { ar: "الأخبار", en: "News" } },
  { key: "colleges", label: { ar: "الكليات", en: "Colleges" } },
  { key: "departments", label: { ar: "الأقسام العلمية", en: "Departments" } },
  { key: "faculty", label: { ar: "هيئة التدريس", en: "Faculty" } },
  { key: "testimonials", label: { ar: "آراء الطلاب", en: "Testimonials" } },
  { key: "faqs", label: { ar: "الأسئلة الشائعة", en: "FAQ" } },
  { key: "admins", label: { ar: "المسؤولون", en: "Admins" } },
  { key: "audit", label: { ar: "سجل التدقيق", en: "Audit log" } },
];

const statuses = [
  { value: "new", label: { ar: "جديد", en: "New" } },
  { value: "reviewing", label: { ar: "قيد المراجعة", en: "Reviewing" } },
  { value: "accepted", label: { ar: "مقبول", en: "Accepted" } },
  { value: "rejected", label: { ar: "مرفوض", en: "Rejected" } },
];

const field =
  "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent";

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-border bg-card p-5">{children}</div>;
}

function AdminPage() {
  const { t } = useSite();
  const navigate = useNavigate();

  const [tab, setTab] = React.useState<Tab>("applications");

  async function signOut() {
    navigate({ to: "/", replace: true });
  }

  return (
    <section className="shell py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold">
          {t({ ar: "لوحة إدارة الجامعة", en: "University admin dashboard" })}
        </h1>
        <button
          onClick={signOut}
          className="rounded-full border border-border px-5 py-2 text-sm font-semibold"
        >
          {t({ ar: "تسجيل الخروج", en: "Sign out" })}
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((tb) => (
          <button
            key={tb.key}
            onClick={() => setTab(tb.key)}
            className={
              "rounded-full border px-4 py-1.5 text-sm font-semibold transition " +
              (tab === tb.key
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card hover:border-accent")
            }
          >
            {t(tb.label)}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "applications" && <Applications />}
        {tab === "messages" && <Messages />}
        {tab === "news" && <NewsAdmin />}
        {tab === "colleges" && <CollegesAdmin />}
        {tab === "departments" && <DepartmentsAdmin />}
        {tab === "faculty" && <FacultyAdmin />}
        {tab === "testimonials" && <TestimonialsAdmin />}
        {tab === "faqs" && <FaqsAdmin />}
        {tab === "admins" && <AdminsAdmin />}
        {tab === "audit" && <AuditLog />}
      </div>
    </section>
  );
}

/* ---------------- applications ---------------- */

function Applications() {
  const { t } = useSite();

  const [filter, setFilter] = React.useState("all");
  const [q, setQ] = React.useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["admissions-applications"],
    queryFn: async () => structuredClone(privateRows.applications),
  });

  async function updateStatus(_id: string, _status: string) {}

  const rows = (data ?? []).filter((r) => {
    if (filter !== "all" && r.status !== filter) return false;
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return (
      r.full_name.toLowerCase().includes(s) ||
      r.email.toLowerCase().includes(s) ||
      r.phone.includes(s)
    );
  });

  if (error)
    return (
      <p className="rounded-xl border border-destructive/40 bg-card p-5 text-sm text-destructive">
        {t({
          ar: "لا تملك صلاحية عرض الطلبات بهذا الحساب.",
          en: "This account is not allowed to view applications.",
        })}
      </p>
    );

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t({
            ar: "بحث بالاسم أو البريد أو الهاتف",
            en: "Search name, email or phone",
          })}
          className={`${field} min-w-56 flex-1`}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={`${field} w-48`}
        >
          <option value="all">{t({ ar: "كل الحالات", en: "All statuses" })}</option>
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {t(s.label)}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <Skeleton />
      ) : rows.length === 0 ? (
        <Empty text={{ ar: "لا توجد طلبات حتى الآن.", en: "No applications yet." }} />
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[52rem] text-start text-sm">
            <thead className="bg-primary text-primary-foreground">
              <tr>
                {[
                  { ar: "الاسم", en: "Name" },
                  { ar: "التواصل", en: "Contact" },
                  { ar: "الكلية", en: "College" },
                  { ar: "المجموع", en: "Score" },
                  { ar: "التاريخ", en: "Date" },
                  { ar: "الحالة", en: "Status" },
                ].map((h) => (
                  <th key={h.en} className="p-3 text-start font-bold">
                    {t(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <td className="p-3 font-semibold">
                    {r.full_name}
                    {r.notes && (
                      <p className="mt-1 max-w-56 text-xs font-normal text-muted-foreground">
                        {r.notes}
                      </p>
                    )}
                  </td>
                  <td className="p-3" dir="ltr">
                    <span className="block">{r.email}</span>
                    <span className="block text-muted-foreground">{r.phone}</span>
                  </td>
                  <td className="p-3">{r.college_slug}</td>
                  <td className="p-3" dir="ltr">
                    {r.total_score ?? "—"}
                  </td>
                  <td className="p-3" dir="ltr">
                    {new Date(r.created_at).toLocaleDateString("en-GB")}
                  </td>
                  <td className="p-3">
                    <select
                      value={r.status}
                      onChange={(e) => updateStatus(r.id, e.target.value)}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs"
                    >
                      {statuses.map((s) => (
                        <option key={s.value} value={s.value}>
                          {t(s.label)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ---------------- messages ---------------- */

function Messages() {
  const { t } = useSite();

  const { data, isLoading } = useQuery({
    queryKey: ["contact-messages"],
    queryFn: async () => structuredClone(privateRows.messages),
  });

  async function mark(_id: string, _status: string) {}

  async function remove(_id: string) {}

  if (isLoading) return <Skeleton />;
  if (!data || data.length === 0)
    return <Empty text={{ ar: "لا توجد رسائل بعد.", en: "No messages yet." }} />;

  return (
    <div className="grid gap-4">
      {data.map((m) => (
        <Card key={m.id}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-bold">
                {m.full_name}
                {m.subject ? ` — ${m.subject}` : ""}
              </p>
              <p className="text-xs text-muted-foreground" dir="ltr">
                {m.email} {m.phone ? `· ${m.phone}` : ""} ·{" "}
                {new Date(m.created_at).toLocaleDateString("en-GB")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => mark(m.id, m.status === "new" ? "read" : "new")}
                className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold"
              >
                {m.status === "new"
                  ? t({ ar: "تعليم كمقروءة", en: "Mark as read" })
                  : t({ ar: "تعليم كجديدة", en: "Mark as new" })}
              </button>
              <button
                onClick={() => remove(m.id)}
                className="rounded-full border border-destructive/40 p-2 text-destructive"
                aria-label={t({ ar: "حذف", en: "Delete" })}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {m.message}
          </p>
        </Card>
      ))}
    </div>
  );
}

/* ---------------- image picker ---------------- */

function ImagePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid gap-2">
      <div className="flex gap-3">
        <img src={imageFor(value)} alt="" className="h-16 w-24 rounded-lg object-cover" />
        <select value={value} onChange={(e) => onChange(e.target.value)} className={field}>
          {imageKeys.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

/* ---------------- news ---------------- */

type NewsForm = {
  id?: string;
  kind: string;
  category_ar: string;
  category_en: string;
  title_ar: string;
  title_en: string;
  excerpt_ar: string;
  excerpt_en: string;
  image_key: string;
  event_date: string;
  published: boolean;
};

const emptyNews: NewsForm = {
  kind: "news",
  category_ar: "",
  category_en: "",
  title_ar: "",
  title_en: "",
  excerpt_ar: "",
  excerpt_en: "",
  image_key: "life-lab",
  event_date: new Date().toISOString().slice(0, 10),
  published: true,
};

function NewsAdmin() {
  const { t } = useSite();
  const [form, setForm] = React.useState<NewsForm | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-news"],
    queryFn: async () => structuredClone(content.news),
  });

  const save = useMutation({
    mutationFn: async (_draft: unknown) => rejectUnavailable(),
  });

  async function remove(_id: string) {}

  return (
    <div className="grid gap-5">
      <div className="flex justify-end">
        <button
          onClick={() => setForm({ ...emptyNews })}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-bold text-accent-foreground"
        >
          <Plus className="size-4" /> {t({ ar: "خبر جديد", en: "New item" })}
        </button>
      </div>

      {form && (
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">
              {form.id
                ? t({ ar: "تعديل خبر", en: "Edit item" })
                : t({ ar: "خبر جديد", en: "New item" })}
            </h2>
            <button onClick={() => setForm(null)} aria-label="close">
              <X className="size-4" />
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className={field}
              placeholder="العنوان (عربي)"
              value={form.title_ar}
              onChange={(e) => setForm({ ...form, title_ar: e.target.value })}
            />
            <input
              className={field}
              dir="ltr"
              placeholder="Title (English)"
              value={form.title_en}
              onChange={(e) => setForm({ ...form, title_en: e.target.value })}
            />
            <input
              className={field}
              placeholder="التصنيف (عربي)"
              value={form.category_ar}
              onChange={(e) => setForm({ ...form, category_ar: e.target.value })}
            />
            <input
              className={field}
              dir="ltr"
              placeholder="Category (English)"
              value={form.category_en}
              onChange={(e) => setForm({ ...form, category_en: e.target.value })}
            />
            <textarea
              className={field}
              rows={3}
              placeholder="الملخص (عربي)"
              value={form.excerpt_ar}
              onChange={(e) => setForm({ ...form, excerpt_ar: e.target.value })}
            />
            <textarea
              className={field}
              rows={3}
              dir="ltr"
              placeholder="Excerpt (English)"
              value={form.excerpt_en}
              onChange={(e) => setForm({ ...form, excerpt_en: e.target.value })}
            />
            <select
              className={field}
              value={form.kind}
              onChange={(e) => setForm({ ...form, kind: e.target.value })}
            >
              <option value="news">{t({ ar: "خبر", en: "News" })}</option>
              <option value="event">{t({ ar: "فعالية", en: "Event" })}</option>
            </select>
            <input
              className={field}
              type="date"
              value={form.event_date}
              onChange={(e) => setForm({ ...form, event_date: e.target.value })}
            />
            <ImagePicker
              value={form.image_key}
              onChange={(v) => setForm({ ...form, image_key: v })}
            />
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              {t({ ar: "منشور على الموقع", en: "Published" })}
            </label>
          </div>
          <button
            onClick={() => save.mutate(form)}
            disabled={save.isPending}
            className="mt-4 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-accent-foreground disabled:opacity-60"
          >
            {t({ ar: "حفظ", en: "Save" })}
          </button>
        </Card>
      )}

      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="grid gap-3">
          {(data ?? []).map((n) => (
            <Card key={n.id}>
              <div className="flex flex-wrap items-center gap-4">
                <img
                  src={imageFor(n.image_key)}
                  alt=""
                  className="h-16 w-24 rounded-lg object-cover"
                />
                <div className="min-w-52 flex-1">
                  <p className="font-bold">{n.title_ar}</p>
                  <p className="text-xs text-muted-foreground" dir="ltr">
                    {n.event_date} · {n.kind} · {n.published ? "منشور" : "مسودة"}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setForm({
                      id: n.id,
                      kind: n.kind,
                      category_ar: n.category_ar,
                      category_en: n.category_en,
                      title_ar: n.title_ar,
                      title_en: n.title_en,
                      excerpt_ar: n.excerpt_ar,
                      excerpt_en: n.excerpt_en,
                      image_key: n.image_key,
                      event_date: n.event_date,
                      published: n.published,
                    })
                  }
                  className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold"
                >
                  {t({ ar: "تعديل", en: "Edit" })}
                </button>
                <button
                  onClick={() => remove(n.id)}
                  className="rounded-full border border-destructive/40 p-2 text-destructive"
                  aria-label={t({ ar: "حذف", en: "Delete" })}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- colleges ---------------- */

type CollegeDraft = {
  id?: string;
  slug: string;
  name_ar: string;
  name_en: string;
  category_ar: string;
  category_en: string;
  desc_ar: string;
  desc_en: string;
  dean_ar: string;
  dean_en: string;
  years: number;
  students: number;
  image_key: string;
  sort_order: number;
};

function CollegesAdmin() {
  const { t } = useSite();

  const [editing, setEditing] = React.useState<string | null>(null);
  const [draft, setDraft] = React.useState<CollegeDraft>({
    slug: "",
    name_ar: "",
    name_en: "",
    category_ar: "",
    category_en: "",
    desc_ar: "",
    desc_en: "",
    dean_ar: "",
    dean_en: "",
    years: 4,
    students: 0,
    image_key: "",
    sort_order: 99,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["admin-colleges"],
    queryFn: async () => structuredClone(content.colleges),
  });

  function newCollege() {
    setEditing("new");
    setDraft({
      slug: "",
      name_ar: "",
      name_en: "",
      category_ar: "",
      category_en: "",
      desc_ar: "",
      desc_en: "",
      dean_ar: "",
      dean_en: "",
      years: 4,
      students: 0,
      image_key: "life-library",
      sort_order: (data?.length ?? 0) + 1,
    });
  }

  async function save(_id?: string) {}

  async function remove(_id: string) {}

  if (isLoading) return <Skeleton />;

  return (
    <div className="grid gap-3">
      <div className="flex justify-end">
        <button
          onClick={newCollege}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-bold text-accent-foreground"
        >
          <Plus className="size-4" />
          {t({ ar: "كلية جديدة", en: "New college" })}
        </button>
      </div>
      {editing === "new" && (
        <Card>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className={field}
              dir="ltr"
              value={draft.slug}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                })
              }
              placeholder="college-slug"
            />
            <input
              className={field}
              value={draft.name_ar}
              onChange={(e) => setDraft({ ...draft, name_ar: e.target.value })}
              placeholder="الاسم (عربي)"
            />
            <input
              className={field}
              dir="ltr"
              value={draft.name_en}
              onChange={(e) => setDraft({ ...draft, name_en: e.target.value })}
              placeholder="Name (English)"
            />
            <input
              className={field}
              value={draft.category_ar}
              onChange={(e) => setDraft({ ...draft, category_ar: e.target.value })}
              placeholder="التصنيف (عربي)"
            />
            <input
              className={field}
              dir="ltr"
              value={draft.category_en}
              onChange={(e) => setDraft({ ...draft, category_en: e.target.value })}
              placeholder="Category (English)"
            />
            <textarea
              className={field}
              value={draft.desc_ar}
              onChange={(e) => setDraft({ ...draft, desc_ar: e.target.value })}
              placeholder="الوصف (عربي)"
            />
            <textarea
              className={field}
              dir="ltr"
              value={draft.desc_en}
              onChange={(e) => setDraft({ ...draft, desc_en: e.target.value })}
              placeholder="Description (English)"
            />
            <ImagePicker
              value={draft.image_key}
              onChange={(v) => setDraft({ ...draft, image_key: v })}
            />
          </div>
          <FormActions onSave={() => save()} onCancel={() => setEditing(null)} />
        </Card>
      )}
      {(data ?? []).map((c) => (
        <Card key={c.id}>
          <div className="flex flex-wrap items-center gap-4">
            <img src={imageFor(c.image_key)} alt="" className="h-16 w-24 rounded-lg object-cover" />
            <div className="min-w-52 flex-1">
              <p className="font-bold">{c.name_ar}</p>
              <p className="text-xs text-muted-foreground" dir="ltr">
                {c.name_en} · {c.students.toLocaleString("en-US")} students
              </p>
            </div>
            <button
              onClick={() => {
                setEditing(editing === c.id ? null : c.id);
                setDraft({
                  id: c.id,
                  slug: c.slug,
                  name_ar: c.name_ar,
                  name_en: c.name_en,
                  category_ar: c.category_ar,
                  category_en: c.category_en,
                  desc_ar: c.desc_ar,
                  desc_en: c.desc_en,
                  dean_ar: c.dean_ar,
                  dean_en: c.dean_en,
                  years: c.years,
                  students: c.students,
                  image_key: c.image_key,
                  sort_order: c.sort_order,
                });
              }}
              className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold"
            >
              {editing === c.id ? t({ ar: "إغلاق", en: "Close" }) : t({ ar: "تعديل", en: "Edit" })}
            </button>
            <IconDelete onClick={() => remove(c.id)} label={t({ ar: "حذف", en: "Delete" })} />
          </div>

          {editing === c.id && (
            <div className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
              <input
                className={field}
                value={draft.name_ar}
                onChange={(e) => setDraft({ ...draft, name_ar: e.target.value })}
                placeholder="الاسم (عربي)"
              />
              <input
                className={field}
                dir="ltr"
                value={draft.name_en}
                onChange={(e) => setDraft({ ...draft, name_en: e.target.value })}
                placeholder="Name (English)"
              />
              <input
                className={field}
                value={draft.category_ar}
                onChange={(e) => setDraft({ ...draft, category_ar: e.target.value })}
                placeholder="التصنيف (عربي)"
              />
              <input
                className={field}
                dir="ltr"
                value={draft.category_en}
                onChange={(e) => setDraft({ ...draft, category_en: e.target.value })}
                placeholder="Category (English)"
              />
              <textarea
                className={field}
                rows={3}
                value={draft.desc_ar}
                onChange={(e) => setDraft({ ...draft, desc_ar: e.target.value })}
                placeholder="الوصف (عربي)"
              />
              <textarea
                className={field}
                rows={3}
                dir="ltr"
                value={draft.desc_en}
                onChange={(e) => setDraft({ ...draft, desc_en: e.target.value })}
                placeholder="Description (English)"
              />
              <input
                className={field}
                value={draft.dean_ar}
                onChange={(e) => setDraft({ ...draft, dean_ar: e.target.value })}
                placeholder="مدير البرامج (عربي)"
              />
              <input
                className={field}
                dir="ltr"
                value={draft.dean_en}
                onChange={(e) => setDraft({ ...draft, dean_en: e.target.value })}
                placeholder="Programs Director (English)"
              />
              <input
                className={field}
                type="number"
                value={draft.years}
                onChange={(e) => setDraft({ ...draft, years: Number(e.target.value) })}
                placeholder="سنوات الدراسة"
              />
              <input
                className={field}
                type="number"
                value={draft.students}
                onChange={(e) => setDraft({ ...draft, students: Number(e.target.value) })}
                placeholder="عدد الطلاب"
              />
              <ImagePicker
                value={draft.image_key}
                onChange={(v) => setDraft({ ...draft, image_key: v })}
              />
              <button
                onClick={() => save(c.id)}
                className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-accent-foreground sm:justify-self-start"
              >
                {t({ ar: "حفظ", en: "Save" })}
              </button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

/* ---------------- departments ---------------- */

type DepartmentForm = {
  id?: string;
  college_id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  sort_order: number;
};

function DepartmentsAdmin() {
  const { t } = useSite();

  const [form, setForm] = React.useState<DepartmentForm | null>(null);
  const { data: colleges = [] } = useQuery({
    queryKey: ["admin-colleges"],
    queryFn: async () => structuredClone(content.colleges),
  });
  const { data = [], isLoading } = useQuery({
    queryKey: ["admin-departments"],
    queryFn: async () => structuredClone(content.departments),
  });
  const empty = (): DepartmentForm => ({
    college_id: colleges[0]?.id ?? "",
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    sort_order: data.length + 1,
  });
  async function save() {}
  async function remove(_id: string) {}
  if (isLoading) return <Skeleton />;
  return (
    <ContentManager
      title={t({ ar: "إدارة الأقسام العلمية", en: "Manage departments" })}
      addLabel={t({ ar: "قسم جديد", en: "New department" })}
      icon={Building2}
      onAdd={() => setForm(empty())}
    >
      {form && (
        <Card>
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              className={field}
              value={form.college_id}
              onChange={(e) => setForm({ ...form, college_id: e.target.value })}
            >
              {colleges.map((c) => (
                <option key={c.id} value={c.id}>
                  {t({ ar: c.name_ar, en: c.name_en })}
                </option>
              ))}
            </select>
            <input
              className={field}
              value={form.name_ar}
              onChange={(e) => setForm({ ...form, name_ar: e.target.value })}
              placeholder="اسم القسم بالعربية"
            />
            <input
              className={field}
              dir="ltr"
              value={form.name_en}
              onChange={(e) => setForm({ ...form, name_en: e.target.value })}
              placeholder="Department name in English"
            />
            <input
              className={field}
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
              placeholder="الترتيب"
            />
            <textarea
              className={field}
              value={form.description_ar}
              onChange={(e) => setForm({ ...form, description_ar: e.target.value })}
              placeholder="الوصف بالعربية"
            />
            <textarea
              className={field}
              dir="ltr"
              value={form.description_en}
              onChange={(e) => setForm({ ...form, description_en: e.target.value })}
              placeholder="English description"
            />
          </div>
          <FormActions onSave={save} onCancel={() => setForm(null)} />
        </Card>
      )}
      <div className="grid gap-3">
        {data.map((d) => (
          <Card key={d.id}>
            <div className="flex items-center gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-bold">{d.name_ar}</p>
                <p className="text-xs text-muted-foreground">
                  {colleges.find((c) => c.id === d.college_id)?.name_ar}
                </p>
              </div>
              <button
                onClick={() => setForm(d)}
                className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold"
              >
                {t({ ar: "تعديل", en: "Edit" })}
              </button>
              <IconDelete onClick={() => remove(d.id)} label={t({ ar: "حذف", en: "Delete" })} />
            </div>
          </Card>
        ))}
      </div>
    </ContentManager>
  );
}

/* ---------------- faculty ---------------- */

type FacultyForm = {
  id?: string;
  college_id: string;
  name_ar: string;
  name_en: string;
  title_ar: string;
  title_en: string;
  bio_ar: string;
  bio_en: string;
  email: string;
  photo_key: string;
  published: boolean;
  sort_order: number;
};

function FacultyAdmin() {
  const { t } = useSite();

  const [form, setForm] = React.useState<FacultyForm | null>(null);
  const { data: colleges = [] } = useQuery({
    queryKey: ["admin-colleges"],
    queryFn: async () => structuredClone(content.colleges),
  });
  const { data = [], isLoading } = useQuery({
    queryKey: ["admin-faculty"],
    queryFn: async () => structuredClone(content.faculty),
  });
  const empty = (): FacultyForm => ({
    college_id: colleges[0]?.id ?? "",
    name_ar: "",
    name_en: "",
    title_ar: "",
    title_en: "",
    bio_ar: "",
    bio_en: "",
    email: "",
    photo_key: "life-library",
    published: true,
    sort_order: data.length + 1,
  });
  async function save() {}
  async function remove(_id: string) {}
  if (isLoading) return <Skeleton />;
  return (
    <ContentManager
      title={t({ ar: "إدارة هيئة التدريس", en: "Manage faculty" })}
      addLabel={t({ ar: "عضو جديد", en: "New faculty member" })}
      icon={GraduationCap}
      onAdd={() => setForm(empty())}
    >
      {form && (
        <Card>
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              className={field}
              value={form.college_id}
              onChange={(e) => setForm({ ...form, college_id: e.target.value })}
            >
              {colleges.map((c) => (
                <option key={c.id} value={c.id}>
                  {t({ ar: c.name_ar, en: c.name_en })}
                </option>
              ))}
            </select>
            <input
              className={field}
              value={form.name_ar}
              onChange={(e) => setForm({ ...form, name_ar: e.target.value })}
              placeholder="الاسم بالعربية"
            />
            <input
              className={field}
              dir="ltr"
              value={form.name_en}
              onChange={(e) => setForm({ ...form, name_en: e.target.value })}
              placeholder="English name"
            />
            <input
              className={field}
              value={form.title_ar}
              onChange={(e) => setForm({ ...form, title_ar: e.target.value })}
              placeholder="الدرجة العلمية"
            />
            <input
              className={field}
              dir="ltr"
              value={form.title_en}
              onChange={(e) => setForm({ ...form, title_en: e.target.value })}
              placeholder="Academic title"
            />
            <input
              className={field}
              dir="ltr"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
            />
            <textarea
              className={field}
              value={form.bio_ar}
              onChange={(e) => setForm({ ...form, bio_ar: e.target.value })}
              placeholder="نبذة بالعربية"
            />
            <textarea
              className={field}
              dir="ltr"
              value={form.bio_en}
              onChange={(e) => setForm({ ...form, bio_en: e.target.value })}
              placeholder="English bio"
            />
            <ImagePicker
              value={form.photo_key}
              onChange={(v) => setForm({ ...form, photo_key: v })}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              {t({ ar: "منشور", en: "Published" })}
            </label>
          </div>
          <FormActions onSave={save} onCancel={() => setForm(null)} />
        </Card>
      )}
      <div className="grid gap-3">
        {data.map((m) => (
          <Card key={m.id}>
            <div className="flex items-center gap-4">
              <img
                src={imageFor(m.photo_key)}
                alt=""
                className="size-14 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-bold">{m.name_ar}</p>
                <p className="text-xs text-muted-foreground">
                  {m.title_ar} · {m.published ? "منشور" : "مسودة"}
                </p>
              </div>
              <button
                onClick={() => setForm(m)}
                className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold"
              >
                {t({ ar: "تعديل", en: "Edit" })}
              </button>
              <IconDelete onClick={() => remove(m.id)} label={t({ ar: "حذف", en: "Delete" })} />
            </div>
          </Card>
        ))}
      </div>
    </ContentManager>
  );
}

/* ---------------- testimonials ---------------- */

type TestimonialForm = {
  id?: string;
  college_id: string | null;
  student_name_ar: string;
  student_name_en: string;
  role_ar: string;
  role_en: string;
  content_ar: string;
  content_en: string;
  photo_key: string;
  rating: number;
  is_approved: boolean;
  sort_order: number;
};

function TestimonialsAdmin() {
  const { t } = useSite();

  const [form, setForm] = React.useState<TestimonialForm | null>(null);
  const { data: colleges = [] } = useQuery({
    queryKey: ["admin-colleges"],
    queryFn: async () => structuredClone(content.colleges),
  });
  const { data = [], isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => structuredClone(content.testimonials),
  });
  const empty = (): TestimonialForm => ({
    college_id: null,
    student_name_ar: "",
    student_name_en: "",
    role_ar: "",
    role_en: "",
    content_ar: "",
    content_en: "",
    photo_key: "life-festival",
    rating: 5,
    is_approved: false,
    sort_order: data.length + 1,
  });
  async function save() {}
  async function remove(_id: string) {}
  if (isLoading) return <Skeleton />;
  return (
    <ContentManager
      title={t({ ar: "إدارة آراء الطلاب والخريجين", en: "Manage testimonials" })}
      addLabel={t({ ar: "رأي جديد", en: "New testimonial" })}
      icon={MessageSquareQuote}
      onAdd={() => setForm(empty())}
    >
      {form && (
        <Card>
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              className={field}
              value={form.college_id ?? ""}
              onChange={(e) => setForm({ ...form, college_id: e.target.value || null })}
            >
              <option value="">{t({ ar: "بدون كلية محددة", en: "No specific college" })}</option>
              {colleges.map((c) => (
                <option key={c.id} value={c.id}>
                  {t({ ar: c.name_ar, en: c.name_en })}
                </option>
              ))}
            </select>
            <input
              className={field}
              value={form.student_name_ar}
              onChange={(e) => setForm({ ...form, student_name_ar: e.target.value })}
              placeholder="اسم الطالب بالعربية"
            />
            <input
              className={field}
              dir="ltr"
              value={form.student_name_en}
              onChange={(e) => setForm({ ...form, student_name_en: e.target.value })}
              placeholder="Student name in English"
            />
            <input
              className={field}
              value={form.role_ar}
              onChange={(e) => setForm({ ...form, role_ar: e.target.value })}
              placeholder="الصفة بالعربية"
            />
            <input
              className={field}
              dir="ltr"
              value={form.role_en}
              onChange={(e) => setForm({ ...form, role_en: e.target.value })}
              placeholder="Role in English"
            />
            <input
              className={field}
              type="number"
              min="1"
              max="5"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
            />
            <textarea
              className={field}
              value={form.content_ar}
              onChange={(e) => setForm({ ...form, content_ar: e.target.value })}
              placeholder="الرأي بالعربية"
            />
            <textarea
              className={field}
              dir="ltr"
              value={form.content_en}
              onChange={(e) => setForm({ ...form, content_en: e.target.value })}
              placeholder="Testimonial in English"
            />
            <ImagePicker
              value={form.photo_key}
              onChange={(v) => setForm({ ...form, photo_key: v })}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.is_approved}
                onChange={(e) => setForm({ ...form, is_approved: e.target.checked })}
              />
              {t({ ar: "معتمد ومنشور", en: "Approved and published" })}
            </label>
          </div>
          <FormActions onSave={save} onCancel={() => setForm(null)} />
        </Card>
      )}
      <div className="grid gap-3">
        {data.map((item) => (
          <Card key={item.id}>
            <div className="flex items-center gap-4">
              <img
                src={imageFor(item.photo_key)}
                alt=""
                className="size-14 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-bold">{item.student_name_ar}</p>
                <p className="line-clamp-1 text-xs text-muted-foreground">{item.content_ar}</p>
              </div>
              <span
                className={
                  item.is_approved
                    ? "text-xs font-bold text-primary"
                    : "text-xs text-muted-foreground"
                }
              >
                {item.is_approved
                  ? t({ ar: "منشور", en: "Published" })
                  : t({ ar: "بانتظار الاعتماد", en: "Pending" })}
              </span>
              <button
                onClick={() => setForm(item)}
                className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold"
              >
                {t({ ar: "تعديل", en: "Edit" })}
              </button>
              <IconDelete onClick={() => remove(item.id)} label={t({ ar: "حذف", en: "Delete" })} />
            </div>
          </Card>
        ))}
      </div>
    </ContentManager>
  );
}

function ContentManager({
  title,
  addLabel,
  icon: Icon,
  onAdd,
  children,
}: {
  title: string;
  addLabel: string;
  icon: React.ElementType;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Icon className="size-5 text-accent" />
          {title}
        </h2>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-bold text-accent-foreground"
        >
          <Plus className="size-4" />
          {addLabel}
        </button>
      </div>
      {children}
    </div>
  );
}

function FormActions({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) {
  const { t } = useSite();
  return (
    <div className="mt-4 flex gap-3">
      <button
        onClick={onSave}
        className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-accent-foreground"
      >
        {t({ ar: "حفظ", en: "Save" })}
      </button>
      <button
        onClick={onCancel}
        className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold"
      >
        {t({ ar: "إلغاء", en: "Cancel" })}
      </button>
    </div>
  );
}

function IconDelete({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-destructive/40 p-2 text-destructive"
      aria-label={label}
    >
      <Trash2 className="size-4" />
    </button>
  );
}

function AuditLog() {
  const { t } = useSite();
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-audit-logs"],
    queryFn: async () => structuredClone(privateRows.audit),
  });
  if (isLoading) return <Skeleton />;
  if (error)
    return <Empty text={{ ar: "تعذّر تحميل سجل التدقيق.", en: "Could not load the audit log." }} />;
  return (
    <ContentManager
      title={t({ ar: "سجل عمليات الإدارة", en: "Admin audit log" })}
      addLabel={t({ ar: "تحديث", en: "Refresh" })}
      icon={ClipboardList}
      onAdd={() => window.location.reload()}
    >
      {data.length === 0 ? (
        <Empty text={{ ar: "لم تُسجل عمليات بعد.", en: "No actions recorded yet." }} />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[44rem] text-sm">
            <thead className="bg-primary text-primary-foreground">
              <tr>
                <th className="p-3 text-start">{t({ ar: "الوقت", en: "Time" })}</th>
                <th className="p-3 text-start">{t({ ar: "العملية", en: "Action" })}</th>
                <th className="p-3 text-start">{t({ ar: "نوع المحتوى", en: "Entity" })}</th>
                <th className="p-3 text-start">{t({ ar: "المسؤول", en: "Admin" })}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="border-t border-border">
                  <td className="p-3" dir="ltr">
                    {new Date(row.created_at).toLocaleString("en-GB")}
                  </td>
                  <td className="p-3 font-semibold">{row.action}</td>
                  <td className="p-3">{row.entity_type}</td>
                  <td className="p-3 font-mono text-xs">{row.admin_id.slice(0, 8)}…</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </ContentManager>
  );
}

/* ---------------- faqs ---------------- */

type FaqForm = {
  id?: string;
  question_ar: string;
  question_en: string;
  answer_ar: string;
  answer_en: string;
  sort_order: number;
  published: boolean;
};

const emptyFaq: FaqForm = {
  question_ar: "",
  question_en: "",
  answer_ar: "",
  answer_en: "",
  sort_order: 99,
  published: true,
};

function FaqsAdmin() {
  const { t } = useSite();
  const [form, setForm] = React.useState<FaqForm | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-faqs"],
    queryFn: async () => structuredClone(content.faqs),
  });

  const save = useMutation({
    mutationFn: async (_draft: unknown) => rejectUnavailable(),
  });

  async function remove(_id: string) {}

  return (
    <div className="grid gap-5">
      <div className="flex justify-end">
        <button
          onClick={() => setForm({ ...emptyFaq })}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-bold text-accent-foreground"
        >
          <Plus className="size-4" /> {t({ ar: "سؤال جديد", en: "New question" })}
        </button>
      </div>

      {form && (
        <Card>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className={field}
              placeholder="السؤال (عربي)"
              value={form.question_ar}
              onChange={(e) => setForm({ ...form, question_ar: e.target.value })}
            />
            <input
              className={field}
              dir="ltr"
              placeholder="Question (English)"
              value={form.question_en}
              onChange={(e) => setForm({ ...form, question_en: e.target.value })}
            />
            <textarea
              className={field}
              rows={3}
              placeholder="الإجابة (عربي)"
              value={form.answer_ar}
              onChange={(e) => setForm({ ...form, answer_ar: e.target.value })}
            />
            <textarea
              className={field}
              rows={3}
              dir="ltr"
              placeholder="Answer (English)"
              value={form.answer_en}
              onChange={(e) => setForm({ ...form, answer_en: e.target.value })}
            />
            <input
              className={field}
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
              placeholder="الترتيب"
            />
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              {t({ ar: "منشور", en: "Published" })}
            </label>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => save.mutate(form)}
              disabled={save.isPending}
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-accent-foreground disabled:opacity-60"
            >
              {t({ ar: "حفظ", en: "Save" })}
            </button>
            <button
              onClick={() => setForm(null)}
              className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold"
            >
              {t({ ar: "إلغاء", en: "Cancel" })}
            </button>
          </div>
        </Card>
      )}

      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="grid gap-3">
          {(data ?? []).map((f) => (
            <Card key={f.id}>
              <div className="flex flex-wrap items-center gap-4">
                <div className="min-w-52 flex-1">
                  <p className="font-bold">{f.question_ar}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{f.answer_ar}</p>
                </div>
                <button
                  onClick={() =>
                    setForm({
                      id: f.id,
                      question_ar: f.question_ar,
                      question_en: f.question_en,
                      answer_ar: f.answer_ar,
                      answer_en: f.answer_en,
                      sort_order: f.sort_order,
                      published: f.published,
                    })
                  }
                  className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold"
                >
                  {t({ ar: "تعديل", en: "Edit" })}
                </button>
                <button
                  onClick={() => remove(f.id)}
                  className="rounded-full border border-destructive/40 p-2 text-destructive"
                  aria-label={t({ ar: "حذف", en: "Delete" })}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- admins ---------------- */

function AdminsAdmin() {
  const { t } = useSite();

  const fetchAdmins = async () => structuredClone(privateRows.admins);

  const [email, setEmail] = React.useState("");
  const [busy] = React.useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => fetchAdmins(),
  });

  async function onInvite(e: React.FormEvent) {
    e.preventDefault();
  }

  async function onRevoke(_target: string) {}

  return (
    <div className="grid gap-5">
      <Card>
        <h2 className="font-bold">{t({ ar: "دعوة مسؤول جديد", en: "Invite a new admin" })}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t({
            ar: "أدخل البريد الإلكتروني للمسؤول الجديد.",
            en: "Enter the email address of the new admin.",
          })}
        </p>
        <form onSubmit={onInvite} className="mt-4 flex flex-wrap gap-3">
          <input
            className={`${field} min-w-56 flex-1`}
            dir="ltr"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-accent-foreground disabled:opacity-60"
          >
            {busy
              ? t({ ar: "جارٍ الإرسال...", en: "Sending..." })
              : t({ ar: "إرسال الدعوة", en: "Send invite" })}
          </button>
        </form>
      </Card>

      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="grid gap-3">
          {(data ?? []).map((a) => (
            <Card key={a.email}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold" dir="ltr">
                    {a.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {a.active
                      ? t({ ar: "الحساب مفعّل", en: "Account active" })
                      : t({ ar: "في انتظار تفعيل الدعوة", en: "Invitation pending" })}
                  </p>
                </div>
                <button
                  onClick={() => onRevoke(a.email)}
                  className="rounded-full border border-destructive/40 px-4 py-1.5 text-xs font-semibold text-destructive"
                >
                  {t({ ar: "سحب الصلاحية", en: "Revoke" })}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- shared bits ---------------- */

function Skeleton() {
  return (
    <div className="mt-6 space-y-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-16 animate-pulse rounded-xl bg-secondary" />
      ))}
    </div>
  );
}

function Empty({ text }: { text: { ar: string; en: string } }) {
  const { t } = useSite();
  return (
    <p className="mt-8 rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
      {t(text)}
    </p>
  );
}
