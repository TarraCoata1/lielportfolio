import { useEffect, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { WORLDS, type WorldId } from "@/lib/worlds";
import { ALL_PROJECTS } from "@/lib/portfolio-data";
import { AmbientSystem } from "@/components/ui/AmbientSystem";
import { MARK, TarraLinks } from "@/components/worlds/WorldPortal";
import { LazyScene } from "@/components/three/LazyScene";
import { useI18n } from "@/components/i18n/I18nContext";
import { Button } from "@/components/ui/button";
import caninePhoto from "@/assets/liel-canine.jpg.asset.json";
import barPhoto from "@/assets/liel-bar.jpg.asset.json";
import shakerPhoto from "@/assets/liel-shaker.jpg.asset.json";

type Evidence = { href: string; slug?: string; image: string; name: { he: string; en: string }; category: { he: string; en: string } };

/** Environment frame for a dedicated world page: switcher, identity hero, evidence, return path. */
export function WorldShell({ world, children }: { world: WorldId; children: ReactNode }) {
  const { t, locale, setLocale, dir } = useI18n();
  const current = WORLDS.find((w) => w.id === world);

  const digitalEvidence: Evidence[] = ALL_PROJECTS.filter((p) => p.family !== "nightlife")
    .slice(0, 6)
    .map((p) => ({
      href: `/projects/${p.id}`,
      slug: p.id,
      image: p.image,
      name: p.name,
      category: p.category,
    }));

  const evidence: Evidence[] =
    world === "digital"
      ? digitalEvidence
      : world === "canine"
        ? [
            {
              href: caninePhoto.url,
              image: caninePhoto.url,
              name: { he: "צ׳יף", en: "Chief" },
              category: { he: "עבודה בשטח", en: "Field work" },
            },
          ]
        : [
            {
              href: shakerPhoto.url,
              image: shakerPhoto.url,
              name: { he: "שייקר", en: "Shaker" },
              category: { he: "אופרציית בר", en: "Bar operations" },
            },
            {
              href: barPhoto.url,
              image: barPhoto.url,
              name: { he: "מאחורי הבר", en: "Behind the bar" },
              category: { he: "אירוח", en: "Hospitality" },
            },
          ];

  useEffect(() => {
    document.documentElement.dataset.env = world;
    return () => {
      delete document.documentElement.dataset.env;
    };
  }, [world]);

  if (!current) return null;

  return (
    <div className={`world-shell world-shell--${world}`} dir={dir} data-env={world}>
      <AmbientSystem />
      <header className="world-bar">
        <Link to="/" className="world-bar__home">
          <ArrowRight aria-hidden className="size-4" /> {t({ he: "ליאל ווינברג", en: "Liel Wainberg" })}
        </Link>
        <nav aria-label={t({ he: "מעבר בין התחומים", en: "Move between practices" })} className="world-bar__switch">
          {WORLDS.map((w) => (
            <Link key={w.id} to={w.route} aria-current={w.id === world ? "page" : undefined} data-w={w.id}>
              <span>{w.index}</span> {w.name}
            </Link>
          ))}
        </nav>
        <div className="language-switch" role="group" aria-label={t({ he: "בחירת שפה", en: "Language selection" })}>
          <Button variant="ghost" type="button" aria-label="עברית" aria-pressed={locale === "he"} onClick={() => setLocale("he")}>
            HE
          </Button>
          <Button variant="ghost" type="button" aria-label="English" aria-pressed={locale === "en"} onClick={() => setLocale("en")}>
            EN
          </Button>
        </div>
      </header>

      <main id="main-content">
        <section className="world-hero" aria-label={current.name}>
          <div className="world-hero__text">
            <img
              className={`brand-mark brand-mark--${MARK[world]}`}
              src={`/icons/${MARK[world]}-180.png`}
              alt={`${current.name} logo`}
              width="52"
              height="52"
            />
            <p className="world-hero__index">
              {current.index} / {current.name}
            </p>
            <p className="world-hero__line">{t(current.line)}</p>
            <p className="world-hero__discipline">{t(current.discipline)}</p>
          </div>
          <figure className="world-hero__media">
            <img src={current.image} alt={t({ he: `ליאל ווינברג — ${current.discipline.he}`, en: `Liel Wainberg — ${current.discipline.en}` })} />

          </figure>
          <div className="world-object" data-scene-track><LazyScene kind={world} fallback={<img src={current.image} alt="" />} /></div>
        </section>

        {world === "digital" && (
          <div className="world-body">
            <TarraLinks />
          </div>
        )}
        <div className="world-body">{children}</div>

        {evidence.length > 0 && (
          <section className="world-evidence" aria-labelledby="evidence-title">
            <h2 id="evidence-title">{t({ he: world === "digital" ? "עבודות נבחרות" : "מתוך העבודה", en: world === "digital" ? "Selected work" : "From the work" })}</h2>
            <ul>
              {evidence.map((p) => (
                <li key={p.image}>
                  {p.slug ? (
                    <Link to="/projects/$slug" params={{ slug: p.slug }}>
                      <img src={p.image} alt="" loading="lazy" />
                      <strong>{t(p.name)}</strong>
                      <span>{t(p.category)}</span>
                    </Link>
                  ) : (
                    <figure>
                      <img src={p.image} alt={t(p.name)} loading="lazy" />
                      <strong>{t(p.name)}</strong>
                      <span>{t(p.category)}</span>
                    </figure>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav className="world-next" aria-label={t({ he: "המשך", en: "Continue" })}>
          {WORLDS.filter((w) => w.id !== world).map((w) => (
            <Link key={w.id} to={w.route} data-w={w.id}>
              <span>
                {w.index} — {t({ he: "להמשך", en: "Continue" })}
              </span>
              <strong>{w.name}</strong>
              <em>{t(w.discipline)}</em>
            </Link>
          ))}
          <Link to="/" hash="contact" data-w="home">
            <span>{t({ he: "יצירת קשר", en: "Contact" })}</span>
            <strong>{t({ he: "לדבר עם ליאל", en: "Talk to Liel" })}</strong>
            <em>{t({ he: "חזרה לעמוד הבית", en: "Back to the homepage" })}</em>
          </Link>
        </nav>
      </main>
    </div>
  );
}
