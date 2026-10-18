import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { Button } from "./button";
import { Link } from "@tanstack/react-router";
import { WORLDS } from "@/lib/worlds";
import logoAsset from "@/assets/liel-logo.jpg.asset.json";

const ITEMS = [
  { href: "#about", he: "ליאל", en: "Liel" },
  { href: "#projects", he: "עבודות", en: "Work" },
  { href: "#worlds", he: "תחומים", en: "Practice" },
  { href: "#contact", he: "יצירת קשר", en: "Contact" },
];

export function SiteNav() {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#top");
  const menuRef = useRef<HTMLButtonElement>(null);
  const selectorRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const dismiss = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (selectorRef.current?.open) {
        selectorRef.current.open = false;
        selectorRef.current.querySelector("summary")?.focus();
      } else if (open) {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener("keydown", dismiss);
    return () => document.removeEventListener("keydown", dismiss);
  }, [open]);

  useEffect(() => {
    const ids = ["top", "about", "projects", "worlds", "contact"];
    const sections = ids.map((id) => document.getElementById(id)).filter((item): item is HTMLElement => Boolean(item));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveHref(`#${visible.target.id}`);
    }, { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.1, 0.35] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-nav">
      <a href="#top" className="site-nav__brand" aria-label={t({ he: "ליאל ווינברג, ראש העמוד", en: "Liel Wainberg, top of page" })}>
        <img src={logoAsset.url} alt="" />
        <span>LIEL WAINBERG</span>
      </a>
      <nav id="primary-navigation" aria-label={t({ he: "ניווט ראשי", en: "Primary navigation" })} className={`site-nav__links ${open ? "is-open" : ""}`}>
        {ITEMS.map((item) => <a key={item.href} href={item.href} aria-current={activeHref === item.href ? "location" : undefined} onClick={() => setOpen(false)}>{t(item)}</a>)}
      </nav>
      <details ref={selectorRef} className="world-selector" onToggle={(e) => {
        const d = e.currentTarget;
        const panel = d.querySelector<HTMLElement>(".world-selector__panel");
        if (!d.open || !panel) return;
        panel.style.setProperty("--shift", "0px");
        const r = panel.getBoundingClientRect();
        const pad = 12;
        const shift = r.left < pad ? pad - r.left : r.right > innerWidth - pad ? innerWidth - pad - r.right : 0;
        panel.style.setProperty("--shift", `${shift}px`);
      }}>
        <summary>{t({ he: "תחומים", en: "Practice" })}</summary>
        <div className="world-selector__panel">
          {WORLDS.map((w) => (
            <Link key={w.id} to={w.route} data-w={w.id} className="world-selector__item">
              <img src={w.image} alt="" loading="lazy" />
              <span>{w.index}</span>
              <strong>{w.name}</strong>
              <em>{t(w.discipline)}</em>
            </Link>
          ))}
        </div>
      </details>
      <div className="site-nav__tools">
        <div className="language-switch" role="group" aria-label={t({ he: "בחירת שפה", en: "Language selection" })}>
          <Button variant="ghost" type="button" aria-label="עברית" aria-pressed={locale === "he"} onClick={() => setLocale("he")}>HE</Button>
          <Button variant="ghost" type="button" aria-label="English" aria-pressed={locale === "en"} onClick={() => setLocale("en")}>EN</Button>
        </div>
        <Button ref={menuRef} variant="ghost" size="icon" className="site-nav__menu" aria-controls="primary-navigation" onClick={() => setOpen((value) => !value)} aria-label={open ? t({ he: "סגירת תפריט", en: "Close menu" }) : t({ he: "פתיחת תפריט", en: "Open menu" })} aria-expanded={open}>
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </Button>
      </div>
    </header>
  );
}