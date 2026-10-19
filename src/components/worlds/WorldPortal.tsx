import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nContext";
import { WORLDS } from "@/lib/worlds";
import { LazyScene } from "@/components/three/LazyScene";

const META: Record<string, { he: string; en: string }[]> = {
  digital: [
    { he: "Full Stack · SaaS · אפליקציות ווב", en: "Full stack · SaaS · Web apps" },
    { he: "React · TypeScript · PostgreSQL", en: "React · TypeScript · PostgreSQL" },
  ],
  canine: [
    { he: "גורים · סוציאליזציה · דפוסי התנהגות", en: "Puppies · Socialization · Behavior patterns" },
    { he: "תוכניות פרטיות · עבודה בבית ובחוץ", en: "Private programs · Home and outdoors" },
  ],
  liquid: [
    { he: "סדנאות · אירוח פרטי · אירועים", en: "Workshops · Private hosting · Events" },
    { he: "תפריט מותאם לכל אירוע", en: "A menu shaped for each event" },
  ],
};

export const MARK: Record<string, string> = { digital: "tarracoata", canine: "canine", liquid: "liquid" };

/** Stable anchors for each practice spread. */
export const FACET_ANCHORS: Record<string, string> = { digital: "tarracoata", canine: "canine", liquid: "lw-liquid" };

export function TarraLinks() {
  const { t } = useI18n();
  return (
    <div className="tarra-links">
      <div className="tarra-links__item">
        <strong>TarraCoata</strong>
        <span>{t({ he: "חברת הנדסת תוכנה מבוססת AI", en: "AI-based software engineering company" })}</span>
      </div>
      <div className="tarra-links__item">
        <strong>TarraOne</strong>
        <span>AI-native Business Operating System</span>
        <p>{t({ he: "מערכת הפעלה עסקית מבוססת AI לניהול לקוחות, תהליכים, אוטומציות ותפעול במקום אחד.", en: "An AI-based business operating system for clients, processes, automations and operations in one place." })}</p>
      </div>
      <div className="tarra-links__actions">
        <a href="https://www.tarracoata.com" target="_blank" rel="noopener noreferrer">{t({ he: "לאתר TarraCoata", en: "Visit TarraCoata" })}<ArrowUpRight aria-hidden className="size-4" /></a>
        <a href="https://tarraone.tarracoata.com" target="_blank" rel="noopener noreferrer">{t({ he: "להיכנס ל־TarraOne", en: "Enter TarraOne" })}<ArrowUpRight aria-hidden className="size-4" /></a>
      </div>
    </div>
  );
}

export function LiquidSoon({ to }: { to: "/bar" | "/" }) {
  const { t } = useI18n();
  return (
    <div className="liquid-soon">
      <p className="liquid-soon__label">COMING SOON</p>
      <strong className="liquid-soon__name">LW.LIQUID</strong>
      <p className="liquid-soon__line">{t({ he: "הפרק הבא בדרך.", en: "The next chapter is on its way." })}</p>
      {to === "/" ? (
        <Link to="/" hash="contact" className="liquid-soon__cta">{t({ he: "להמשך", en: "Continue" })}<ArrowUpLeft aria-hidden className="size-4" /></Link>
      ) : (
        <Link to="/bar" className="liquid-soon__cta">{t({ he: "להמשך", en: "Continue" })}<ArrowUpLeft aria-hidden className="size-4" /></Link>
      )}
    </div>
  );
}

/** Three editorial facet spreads — one person, three material languages. */
export function WorldPortal() {
  const { t } = useI18n();
  const [current, setCurrent] = useState("digital");

  useEffect(() => {
    const els = WORLDS.map((w) => document.getElementById(FACET_ANCHORS[w.id])).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      const hit = entries.find((e) => e.isIntersecting);
      const id = hit?.target.getAttribute("data-facet");
      if (id) setCurrent(id);
    }, { rootMargin: "-40% 0px -55% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="worlds" className="facets" aria-labelledby="facets-title">
      <header className="section-shell facets__head">
        <h2 id="facets-title">{t({ he: "אדם אחד. שלוש דרכי עבודה.", en: "One person. Three ways of working." })}</h2>
        <p className="section-lede">
          {t({
            he: "קוד, כלבים ובר. אותה תשומת לב לפרטים, בשלושה חומרים שונים.",
            en: "Code, dogs and the bar. The same attention to detail, in three different materials.",
          })}
        </p>
      </header>

      <nav className="facets__nav" aria-label={t({ he: "מעבר בין התחומים", en: "Jump between practices" })}>
        {WORLDS.map((w) => (
          <a key={w.id} href={`#${FACET_ANCHORS[w.id]}`} data-w={w.id} aria-current={current === w.id ? "true" : undefined} dir="ltr">
            {w.name}
          </a>
        ))}
      </nav>

      {WORLDS.map((w, i) => (
        <article key={w.id} id={FACET_ANCHORS[w.id]} className={`facet facet--${w.id}`} data-facet={w.id} data-scene-track aria-labelledby={`facet-${w.id}`}>
          <div className="section-shell facet__grid" data-flip={i % 2 === 1 || undefined}>
            <div className="facet__visual"><figure className="facet__media">
              <img src={w.image} alt={t({ he: `ליאל ווינברג — ${w.discipline.he}`, en: `Liel Wainberg — ${w.discipline.en}` })} loading="lazy" decoding="async" />
              <figcaption aria-hidden="true">{w.index} / {w.name}</figcaption>
            </figure><div className="facet__object"><LazyScene kind={w.id} fallback={<img src={w.image} alt="" />} /></div></div>
            <div className="facet__copy">
              <img className={`brand-mark brand-mark--${MARK[w.id]}`} src={`/icons/${MARK[w.id]}-180.png`} alt={`${w.name} logo`} width="52" height="52" loading="lazy" />
              <span className="facet__index" aria-hidden="true">{w.index}</span>
              <h3 id={`facet-${w.id}`}>{w.name}</h3>
              <p className="facet__line">{t(w.line)}</p>
              <p className="facet__discipline">{t(w.discipline)}</p>
              <dl className="facet__meta">
                {META[w.id].map((m, k) => (
                  <div key={k}><dt className="sr-only">{k === 0 ? t({ he: "תחומים", en: "Scope" }) : t({ he: "פרטים", en: "Details" })}</dt><dd>{t(m)}</dd></div>
                ))}
              </dl>
              {w.id === "digital" && <TarraLinks />}
              {w.id === "liquid" && <LiquidSoon to="/bar" />}
              <ul className="facet__signals">{w.signals.map((s) => <li key={s.en}>{t(s)}</li>)}</ul>
              {w.id !== "liquid" && (
                <Link to={w.route} className="facet__enter">
                  {t({ he: `כניסה ל־${w.name}`, en: `Enter ${w.name}` })}
                  <ArrowUpLeft aria-hidden className="size-4" />
                </Link>
              )}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
