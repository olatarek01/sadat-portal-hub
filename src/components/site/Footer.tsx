import { Link } from "@tanstack/react-router";
import {
  ArrowUpLeft,
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { useSite, ui } from "@/lib/site-context";
import { university } from "@/data/university";

export function Footer() {
  const { t, lang } = useSite();
  const Arrow = lang === "ar" ? ArrowUpLeft : ArrowUpRight;
  const socials = [
    { href: "https://www.facebook.com/Uni.SadatCity", label: "Facebook", icon: Facebook },
    { href: "https://twitter.com/Uni_SadatCity", label: "Twitter", icon: Twitter },
    { href: "https://www.instagram.com/uni.sadatcity", label: "Instagram", icon: Instagram },
    {
      href: "https://www.linkedin.com/school/sadat-city-university",
      label: "LinkedIn",
      icon: Linkedin,
    },
  ];
  const mainLinks = [
    { to: "/about" as const, label: ui.about },
    { to: "/colleges" as const, label: ui.colleges },
    { to: "/admissions" as const, label: ui.admissions },
    { to: "/research" as const, label: ui.research },
    { to: "/student-life" as const, label: ui.studentLife },
  ];
  const serviceLinks = [
    { to: "/news" as const, label: ui.news },
    { to: "/careers" as const, label: ui.careers },
    { to: "/campus" as const, label: { ar: "دليل الحرم الجامعي", en: "Campus guide" } },
    { to: "/faq" as const, label: { ar: "الأسئلة الشائعة", en: "FAQ" } },
    { to: "/contact" as const, label: ui.contactUs },
  ];
  return (
    <footer className="brand-gradient border-t-4 border-gold text-navy-foreground">
      <div className="shell grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.65fr_0.75fr_1fr]">
        <div>
         <img
  src="/logo.png"
  alt={t(university.name)}
  width={106}
  height={104}
  loading="lazy"
  className=" size-25 object-contain"
/>
          <h2 className="gold-rule text-xl font-extrabold">{t(university.name)}</h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-85">{t(university.about)}</p>
        </div>

        <nav aria-label={t(ui.quickLinks)}>
          <h3 className="gold-rule text-base font-bold">{t(ui.quickLinks)}</h3>
          <ul className="mt-5 grid gap-3 text-sm">
            {mainLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="group inline-flex items-center gap-2 opacity-85 transition hover:translate-x-1 hover:text-gold hover:opacity-100 rtl:hover:-translate-x-1"
                >
                  <Arrow className="size-3.5 text-gold transition-transform group-hover:scale-110" />
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t({ ar: "روابط مهمة", en: "Important links" })}>
          <h3 className="gold-rule text-base font-bold">
            {t({ ar: "روابط مهمة", en: "Important links" })}
          </h3>
          <ul className="mt-5 grid gap-3 text-sm">
            {serviceLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="group inline-flex items-center gap-2 opacity-85 transition hover:translate-x-1 hover:text-gold hover:opacity-100 rtl:hover:-translate-x-1"
                >
                  <Arrow className="size-3.5 text-gold transition-transform group-hover:scale-110" />
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="gold-rule text-base font-bold">{t(ui.contactUs)}</h3>
          <ul className="mt-4 grid gap-3 text-sm opacity-90">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=University+of+Sadat+City+Egypt"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold"
              >
                {t(university.contact.address)}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-gold" />
              <a href={`tel:${university.contact.phoneIntl}`} dir="ltr" className="hover:text-gold">
                {university.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-gold" />
              <a
                href={`mailto:${university.contact.email}`}
                dir="ltr"
                className="break-all hover:text-gold"
              >
                {university.contact.email}
              </a>
            </li>
          </ul>
          <ul className="mt-5 flex items-center gap-2.5">
            {socials.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-navy-foreground/85 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-navy"
                >
                  <Icon className="size-4 transition-transform group-hover:scale-110" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/15 py-4 text-center text-xs opacity-80">
        <span className="shell block">
          © {new Date().getFullYear()} {t(university.name)} — {t(ui.rights)}
        </span>
      </div>
    </footer>
  );
}
