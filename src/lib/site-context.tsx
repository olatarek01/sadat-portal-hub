import * as React from "react";
import type { Bi } from "@/data/university";

export type Lang = "ar" | "en";
type Theme = "light" | "dark";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  dir: "rtl" | "ltr";
  t: (b: Bi) => string;
  theme: Theme;
  toggleTheme: () => void;
};

const SiteContext = React.createContext<Ctx | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("ar");
  const [theme, setTheme] = React.useState<Theme>("light");

  React.useEffect(() => {
    const savedLang = localStorage.getItem("scu-lang");
    const savedTheme = localStorage.getItem("scu-theme");
    if (savedLang === "ar" || savedLang === "en") setLangState(savedLang);
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
  }, []);

  React.useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("scu-lang", lang);
  }, [lang]);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("scu-theme", theme);
  }, [theme]);

  const value = React.useMemo<Ctx>(
    () => ({
      lang,
      setLang: setLangState,
      toggleLang: () => setLangState((l) => (l === "ar" ? "en" : "ar")),
      dir: lang === "ar" ? "rtl" : "ltr",
      t: (b: Bi) => b[lang],
      theme,
      toggleTheme: () => setTheme((v) => (v === "light" ? "dark" : "light")),
    }),
    [lang, theme],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = React.useContext(SiteContext);
  if (!ctx) {
    // During hot reload the provider and a consumer can briefly come from two
    // copies of this module. Fall back to the saved preference instead of
    // throwing, so the page keeps rendering instead of going blank.
    const lang: Lang =
      typeof window !== "undefined" && localStorage.getItem("scu-lang") === "en" ? "en" : "ar";
    return {
      lang,
      setLang: () => {},
      toggleLang: () => {},
      dir: lang === "ar" ? "rtl" : "ltr",
      t: (b: Bi) => b[lang],
      theme: "light" as Theme,
      toggleTheme: () => {},
    };
  }
  return ctx;
}

export const ui = {
  home: { ar: "الرئيسية", en: "Home" },
  about: { ar: "عن الجامعة", en: "About" },
  colleges: { ar: "الكليات", en: "Colleges" },
  admissions: { ar: "القبول والتسجيل", en: "Admissions" },
  research: { ar: "البحث العلمي", en: "Research" },
  studentLife: { ar: "الحياة الطلابية", en: "Student Life" },
  news: { ar: "الأخبار والفعاليات", en: "News & Events" },
  campus: { ar: "موقع الجامعة", en: "University Location" },
  careers: { ar: "الخريجون والوظائف", en: "Alumni & Careers" },
  search: { ar: "ابحث في الموقع...", en: "Search the portal..." },
  noResults: { ar: "لا توجد نتائج مطابقة", en: "No matching results" },
  explore: { ar: "استكشف الكليات", en: "Explore Colleges" },
  applyNow: { ar: "قدّم الآن", en: "Apply Now" },
  readMore: { ar: "اقرأ المزيد", en: "Read more" },
  all: { ar: "الكل", en: "All" },
  back: { ar: "رجوع", en: "Back" },
  years: { ar: "سنوات الدراسة", en: "Years of study" },
  studentsLabel: { ar: "عدد الطلاب", en: "Students" },
  deanLabel: { ar: "مدير البرامج", en: "Programs Director" },
  programs: { ar: "البرامج الدراسية", en: "Programs" },
  quickLinks: { ar: "روابط سريعة", en: "Quick Links" },
  contactUs: { ar: "تواصل معنا", en: "Contact Us" },
  rights: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
};
