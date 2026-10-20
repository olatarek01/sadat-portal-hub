import * as React from "react";
import { createPortal } from "react-dom";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  ChevronDown,
  ExternalLink,
  History,
  Languages,
  Mail,
  MapPin,
  Menu,
  Moon,
  Network,
  Phone,
  Search,
  Sun,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSite, ui } from "@/lib/site-context";
import { colleges, news, university } from "@/data/university";


const navItems = [
  { to: "/", label: ui.home },
  { to: "/about", label: ui.about },
  { to: "/colleges", label: ui.colleges },
  { to: "/admissions", label: ui.admissions },
  { to: "/research", label: ui.research },
  { to: "/student-life", label: ui.studentLife },
  { to: "/news", label: ui.news },
  { to: "/contact", label: ui.contactUs },
] as const;

export function Navbar() {
  const { t, lang, toggleLang, theme, toggleTheme } = useSite();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [mega, setMega] = React.useState<"about" | "colleges" | null>(null);
  const [mobileColleges, setMobileColleges] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
    setMega(null);
    setQuery("");
  }, [pathname]);

  React.useEffect(() => {
    if (!open && !searchOpen) return;
    const previous = document.body.style.overflow;
    const mobilePanel = open || window.matchMedia("(max-width: 1023px)").matches;
    if (mobilePanel) document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setSearchOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) setOpen(false);
      setSearchOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open, searchOpen]);

  const openMenu = (menu: "about" | "colleges") => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMega(menu);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMega(null), 140);
  };

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const items: { label: string; sub: string; to: string; params?: Record<string, string> }[] = [];
    for (const c of colleges) {
      if ((c.name.ar + c.name.en).toLowerCase().includes(q)) {
        items.push({
          label: t(c.name),
          sub: t(c.category),
          to: "/colleges/$slug",
          params: { slug: c.slug },
        });
      }
    }
    for (const n of news) {
      if ((n.title.ar + n.title.en).toLowerCase().includes(q)) {
        items.push({ label: t(n.title), sub: t(n.category), to: "/news" });
      }
    }
    for (const item of navItems) {
      if ((item.label.ar + item.label.en).toLowerCase().includes(q)) {
        items.push({ label: t(item.label), sub: t(university.short), to: item.to });
      }
    }
    return items.slice(0, 6);
  }, [query, t]);

  return (
    <>
      <div className="brand-gradient text-navy-foreground">
        <div className="shell grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-2 text-[11px] sm:flex sm:justify-between sm:text-xs">
          <div className="flex min-w-0 items-center gap-4">
            <a
              href={`mailto:${university.contact.email}`}
              className="hidden items-center gap-1.5 hover:text-gold sm:flex"
            >
              <Mail className="size-3.5" />
              {university.contact.email}
            </a>
            <a
              href={`tel:${university.contact.phoneIntl}`}
              dir="ltr"
              className="inline-flex shrink-0 items-center gap-1.5 hover:text-gold"
            >
              <Phone className="size-3.5" />
              {university.contact.phone}
            </a>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <a
              href="https://www.google.com/maps/search/?api=1&query=University+of+Sadat+City+Egypt"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 whitespace-nowrap hover:text-gold"
            >
              <MapPin className="size-3.5" />
              {t({ ar: "موقع الجامعة", en: "University location" })}
            </a>
            <span
              className="hidden cursor-pointer items-center gap-1.5 whitespace-nowrap transition-colors duration-200 hover:text-gold sm:inline-flex"
              aria-disabled="true"
            >
              <ExternalLink className="size-3" />
              {t({ ar: "بوابة الموظفين", en: "Staff Portal" })}
            </span>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-border/70 backdrop-blur-xl transition-[background-color,box-shadow] duration-300",
          scrolled ? "bg-background/96 shadow-card" : "bg-background/92",
        )}
      >
        <div className="shell grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:h-20 lg:gap-6">
          <Link to="/" className="flex min-w-0 items-center">
          

<img
  src={theme === "dark" ? "/logo.png" : "/nusc-logo-trimmed.png"}
  alt={t(university.name)}
  width={106}
  height={104}
  className={cn(
    "shrink-0 object-contain transition-all duration-300",
    scrolled ? "size-23" : "size-23",
  )}
/>


            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-base font-extrabold leading-tight">
                {t(university.name)}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {lang === "ar"
                  ? "National University of Sadat City"
                  : "جامعة مدينة السادات الأهلية"}
              </span>
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="relative hidden lg:block">
              <div
                className={cn(
                  "grid items-center overflow-hidden transition-[grid-template-columns,opacity] duration-300",
                  searchOpen
                    ? "grid-cols-[220px_40px] opacity-100"
                    : "grid-cols-[0px_40px] opacity-100",
                )}
              >
                <div className="min-w-0 overflow-hidden">
                  <input
                    autoFocus={searchOpen}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t(ui.search)}
                    aria-label={t(ui.search)}
                    className="h-10 w-full border border-gold/60 bg-card px-4 text-sm text-card-foreground outline-hidden focus:ring-2 focus:ring-gold/30"
                  />
                </div>
                <button
                  onClick={() => {
                    setSearchOpen((v) => !v);
                    if (searchOpen) setQuery("");
                  }}
                  aria-label={searchOpen ? "Close search" : t(ui.search)}
                  className="interactive-lift grid size-10 place-items-center border border-border"
                >
                  {searchOpen ? <X className="size-4" /> : <Search className="size-4" />}
                </button>
              </div>
              {searchOpen && (
                <div className="absolute end-0 top-full z-50 mt-2 w-[min(22rem,80vw)] overflow-hidden border border-gold/30 bg-background text-foreground shadow-elegant animate-in fade-in slide-in-from-top-2">
                  {query.trim().length < 2 ? (
                    <p className="p-4 text-xs text-muted-foreground">
                      {t({
                        ar: "اكتب حرفين على الأقل للبحث.",
                        en: "Type at least two characters.",
                      })}
                    </p>
                  ) : results.length === 0 ? (
                    <p className="p-4 text-xs text-muted-foreground">{t(ui.noResults)}</p>
                  ) : (
                    results.map((r) => (
                      <Link
                        key={`${r.to}-${r.params?.["slug"] ?? r.label}`}
                        to={r.to}
                        params={r.params as never}
                        className="block border-b border-border px-4 py-3 last:border-0 hover:bg-secondary"
                      >
                        <span className="block text-sm font-bold">{r.label}</span>
                        <span className="text-xs text-muted-foreground">{r.sub}</span>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => setSearchOpen(true)}
              aria-label={t(ui.search)}
              className="interactive-lift grid size-10 shrink-0 place-items-center border border-border lg:hidden"
            >
              <Search className="size-4" />
            </button>

            <button
              onClick={toggleLang}
              className="inline-flex h-10 items-center gap-1.5 border border-border px-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
            >
              <Languages className="size-4" />
              {lang === "ar" ? "EN" : "ع"}
            </button>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid size-10 place-items-center border border-border transition hover:border-accent hover:text-accent"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={open}
              className="grid size-10 shrink-0 place-items-center border border-border xl:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        <nav className="shell hidden items-center gap-1 pb-2 xl:flex" onMouseLeave={scheduleClose}>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-secondary text-primary" }}
              onMouseEnter={() =>
                item.to === "/colleges"
                  ? openMenu("colleges")
                  : item.to === "/about"
                    ? openMenu("about")
                    : setMega(null)
              }
              className="nav-link px-3 py-2 text-sm font-semibold text-foreground/80 transition hover:text-primary"
            >
              <span className="inline-flex items-center gap-1">
                {t(item.label)}
                {(item.to === "/about" || item.to === "/colleges") && (
                  <ChevronDown className="size-3.5" />
                )}
              </span>
            </Link>
          ))}
          <Link
            to="/admissions"
            className="apply-pulse interactive-lift bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground ltr:ml-auto rtl:mr-auto"
          >
            {t(ui.applyNow)}
          </Link>
        </nav>

        {mega === "colleges" && (
          <div
            onMouseEnter={() => openMenu("colleges")}
            onMouseLeave={scheduleClose}
            className="mega-panel absolute inset-x-0 top-full hidden border-t border-gold/25 bg-background/97 shadow-elegant backdrop-blur-xl xl:block"
          >
            <div className="shell grid gap-8 py-8 lg:grid-cols-[1fr_3fr]">
              <div className="brand-gradient p-6 text-navy-foreground">
                <p className="text-xs font-bold text-gold">
                  {t({ ar: "مسارك الأكاديمي", en: "Your academic path" })}
                </p>
                <h2 className="mt-3 text-2xl font-extrabold">
                  {t({ ar: "اكتشف كليات الجامعة", en: "Explore our colleges" })}
                </h2>
                <Link
                  to="/colleges"
                  className="mt-6 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground"
                >
                  {t(ui.explore)}
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {colleges.slice(0, 9).map((c, i) => (
                  <Link
                    key={c.slug}
                    to="/colleges/$slug"
                    params={{ slug: c.slug }}
                    style={{ animationDelay: `${i * 35}ms` }}
                    className="menu-item-reveal border border-transparent p-3 hover:border-accent hover:bg-secondary"
                  >
                    <span className="block text-sm font-bold">{t(c.name)}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {t(c.category)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
        {mega === "about" && (
          <div
            onMouseEnter={() => openMenu("about")}
            onMouseLeave={scheduleClose}
            className="mega-panel absolute top-full hidden w-80 border-t-2 border-gold bg-background p-3 shadow-elegant xl:block ltr:left-[15%] rtl:right-[15%]"
          >
            {[
              { to: "/about", icon: History, ar: "تاريخ الجامعة", en: "University history" },
              { to: "/about", icon: BookOpen, ar: "الرؤية والرسالة", en: "Vision & mission" },
              {
                to: "/about",
                icon: Users,
                ar: "رئيس الجامعة والقيادات",
                en: "President & leadership",
              },
              { to: "/about", icon: Network, ar: "الهيكل التنظيمي", en: "Organization" },
              { to: "/about", icon: Award, ar: "الاعتمادات الأكاديمية", en: "Accreditation" },
            ].map((x, i) => (
              <Link
                key={x.ar}
                to={x.to}
                style={{ animationDelay: `${i * 35}ms` }}
                className="menu-item-reveal flex items-center gap-3 border-b border-border px-3 py-3 text-sm font-bold last:border-0 hover:bg-secondary hover:text-primary"
              >
                <x.icon className="size-4 text-gold" />
                {t({ ar: x.ar, en: x.en })}
              </Link>
            ))}
          </div>
        )}

        {open &&
          createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={t({ ar: "القائمة", en: "Navigation menu" })}
              className="viewport-panel z-[70] bg-navy-deep px-5 text-navy-foreground xl:hidden"
            >
              <div className="flex items-center justify-between">
<img
  src="/logo.png"
  alt={t(university.name)}
  className="size-12 object-contain"
/>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-11 place-items-center rounded-full border border-navy-foreground/25"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="mt-10 grid gap-1">
                {navItems.map((item) => (
                  <React.Fragment key={item.to}>
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={
                        item.to === "/colleges"
                          ? (e) => {
                              e.preventDefault();
                              setMobileColleges((v) => !v);
                            }
                          : undefined
                      }
                      activeOptions={{ exact: item.to === "/" }}
                      activeProps={{ className: "bg-secondary text-primary" }}
                      className="border-b border-navy-foreground/10 px-3 py-3.5 text-lg font-bold hover:bg-navy-foreground/10"
                    >
                      <span className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                        {t(item.label)}
                        {item.to === "/colleges" && (
                          <ChevronDown
                            className={cn("size-5 transition", mobileColleges && "rotate-180")}
                          />
                        )}
                      </span>
                    </Link>
                    {item.to === "/colleges" && mobileColleges && (
                      <div className="grid grid-cols-2 gap-1 bg-navy-foreground/5 p-3">
                        {colleges.map((c) => (
                          <Link
                            key={c.slug}
                            to="/colleges/$slug"
                            params={{ slug: c.slug }}
                            className="rounded-sm p-2 text-xs hover:bg-navy-foreground/10"
                          >
                            {t(c.name)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
                <Link
                  to="/admissions"
                  className="mt-5 bg-accent px-5 py-3 text-center font-bold text-accent-foreground"
                >
                  {t(ui.applyNow)}
                </Link>
              </div>
            </div>,
            document.body,
          )}

        {searchOpen &&
          createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={t(ui.search)}
              className="viewport-panel z-[80] bg-navy-deep/94 px-5 text-navy-foreground backdrop-blur-xl lg:hidden"
            >
              <button
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="absolute top-5 grid size-11 place-items-center rounded-full border border-navy-foreground/25 ltr:right-5 rtl:left-5"
              >
                <X className="size-5" />
              </button>
              <div className="mx-auto mt-20 max-w-xl sm:mt-28">
                <label className="block text-xl font-extrabold">
                  {t({ ar: "ابحث في بوابة الجامعة", en: "Search the university portal" })}
                </label>
                <div className="relative mt-6">
                  <Search className="absolute top-1/2 size-5 -translate-y-1/2 text-muted-foreground ltr:left-4 rtl:right-4" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t(ui.search)}
                    className="h-14 w-full rounded-full bg-card px-12 text-base text-card-foreground outline-hidden ring-2 ring-gold/50"
                  />
                </div>
                <div className="mt-3 overflow-hidden bg-background text-foreground shadow-elegant">
                  {query.trim().length < 2 ? (
                    <p className="p-4 text-sm text-muted-foreground">
                      {t({ ar: "اكتب حرفين على الأقل.", en: "Type at least two characters." })}
                    </p>
                  ) : (
                    results.map((r) => (
                      <Link
                        key={`${r.to}-${r.params?.["slug"] ?? r.label}`}
                        to={r.to}
                        params={r.params as never}
                        className="block border-b border-border px-4 py-3 last:border-0"
                      >
                        <span className="block font-bold">{r.label}</span>
                        <span className="text-xs text-muted-foreground">{r.sub}</span>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )}
      </header>
    </>
  );
}
