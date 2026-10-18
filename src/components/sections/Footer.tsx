import { Link } from "@tanstack/react-router";
import { useI18n } from "../i18n/I18nContext";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-[var(--black)] border-t border-[var(--border)] px-6 lg:px-12 py-10">
      <nav
        aria-label={t({ he: "ניווט התמחויות", en: "Specialties navigation" })}
        className="mx-auto max-w-7xl mb-8 flex flex-wrap justify-center gap-x-6 gap-y-3 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-[var(--silver-dim)]"
      >
        <Link to="/web" className="hover:text-[var(--purple-light)] transition-colors">
          {t({ he: "בניית אתרים", en: "Web Development" })}
        </Link>
        <span className="text-[rgba(255,255,255,0.15)]">·</span>
        <Link to="/dogs" className="hover:text-[var(--purple-light)] transition-colors">
          {t({ he: "אילוף כלבים", en: "Dog Training" })}
        </Link>
        <span className="text-[rgba(255,255,255,0.15)]">·</span>
        <Link to="/bar" className="hover:text-[var(--purple-light)] transition-colors">
          {t({ he: "ברמן לאירועים", en: "Event Bartending" })}
        </Link>
      </nav>
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-start">
        <div className="font-display text-[0.95rem] tracking-[0.25em] text-[var(--silver-dim)]">
          {t({
            he: "עוצב ונבנה ע\"י ליאל ווינברג",
            en: "Designed & Built by Liel Wainberg",
          })}
        </div>
        <div className="font-mono text-xs text-silver-dim text-center">
          // LW.SYS v2.2
        </div>
        <div className="flex flex-col gap-3 md:items-end items-center">
          <div className="flex gap-5 font-mono text-[0.65rem] tracking-[0.2em] text-[var(--silver-dim)] justify-center">
            <a className="hover:text-[var(--purple-light)] transition-colors" href="https://instagram.com/lielwainberg" target="_blank" rel="noreferrer">INSTAGRAM</a>
            <a className="hover:text-[var(--purple-light)] transition-colors" href="https://wa.me/972546969367" target="_blank" rel="noreferrer">WHATSAPP</a>
            <a className="hover:text-[var(--purple-light)] transition-colors" href="mailto:lielwa2004@gmail.com">EMAIL</a>
          </div>
          <a href="#top" className="font-mono text-[0.6rem] tracking-[0.25em] text-[var(--silver-dim)] hover:text-[var(--purple-light)] transition-colors">
            {t({ he: "↑ חזרה לראש המערכת", en: "↑ SCROLL_TO_TOP" })}
          </a>
        </div>
      </div>
    </footer>
  );
}

