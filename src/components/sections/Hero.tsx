import { useI18n } from "../i18n/I18nContext";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero" id="top">
      <div className="hero__content">
        <h1>
          {t({
            he: (
              <>
                ליאל
                <br />
                ווינברג
              </>
            ),
            en: (
              <>
                Liel
                <br />
                Wainberg
              </>
            ),
          })}
        </h1>
        <p className="hero__statement">
          {t({
            he: "תוכנה, כלבים ואירוח. שלוש דרכים לעבוד עם תשומת לב, הקשבה ודיוק.",
            en: "Software, dogs and hospitality. Three ways of working with attention, listening and precision.",
          })}
        </p>
        <div className="hero__actions">
          <a className="action action--primary" href="#projects">
            {t({ he: "לעבודות נבחרות", en: "View selected work" })}
            <ArrowUpRight aria-hidden />
          </a>
        </div>
        <nav className="hero__world-links" aria-label={t({ he: "שלושת העולמות של ליאל", en: "Liel's three worlds" })}>
          <a href="#tarracoata"><strong>TARRACOATA</strong><span>{t({ he: "טכנולוגיה ומערכות", en: "Technology and systems" })}</span></a>
          <a href="#canine"><strong>CANINE.BEHAVIOR</strong><span>{t({ he: "קשר, מנהיגות והתנהגות", en: "Trust, leadership and behavior" })}</span></a>
          <a href="#lw-liquid"><strong>LW.LIQUID</strong><span>{t({ he: "אירוח, קצב ואווירה", en: "Hospitality, timing and atmosphere" })}</span></a>
        </nav>
      </div>
    </section>
  );
}
