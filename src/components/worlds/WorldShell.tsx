import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { WORLDS, type WorldId } from "@/lib/worlds";
import { ALL_PROJECTS } from "@/lib/portfolio-data";
import { AmbientSystem } from "@/components/ui/AmbientSystem";
import { LiquidSoon, MARK, TarraLinks } from "@/components/worlds/WorldPortal";

import { LazyScene } from "@/components/three/LazyScene";

/** Environment frame for a dedicated world page: switcher, identity hero, evidence, return path. */
export function WorldShell({ world, children }: { world: WorldId; children: ReactNode }) {
  const current = WORLDS.find((w) => w.id === world);
  if (!current) return null;
  const evidence =
    world === "digital"
      ? ALL_PROJECTS.filter((p) => p.family !== "nightlife").slice(0, 6)
      : [];

  return (
    <div className={`world-shell world-shell--${world}`} dir="rtl" data-env={world}>
      <AmbientSystem />
      <header className="world-bar">
        <Link to="/" className="world-bar__home">
          <ArrowRight aria-hidden className="size-4" /> ליאל ווינברג
        </Link>
        <nav aria-label="מעבר בין התחומים" className="world-bar__switch">
          {WORLDS.map((w) => (
            <Link key={w.id} to={w.route} aria-current={w.id === world ? "page" : undefined} data-w={w.id}>
              <span>{w.index}</span> {w.name}
            </Link>
          ))}
        </nav>
      </header>

      <main id="main-content">
        <section className="world-hero" aria-label={current.name}>
          <div className="world-hero__text">
            <img className={`brand-mark brand-mark--${MARK[world]}`} src={`/icons/${MARK[world]}-180.png`} alt={`${current.name} logo`} width="52" height="52" />
            <p className="world-hero__index">{current.index} / {current.name}</p>
            <p className="world-hero__line">{current.line.he}</p>
            <p className="world-hero__discipline">{current.discipline.he}</p>
          </div>
          <figure className="world-hero__media">
            <img src={current.image} alt={`ליאל ווינברג — ${current.discipline.he}`} />
            <div className="facet__scene"><LazyScene kind={world} fallback={null} /></div>
          </figure>
        </section>

        {world === "digital" && <div className="world-body"><TarraLinks /></div>}
        {world === "liquid" && <LiquidSoon to="/" />}
        <div className="world-body">{children}</div>

        {evidence.length > 0 && (
          <section className="world-evidence" aria-labelledby="evidence-title">
            <h2 id="evidence-title">{world === "digital" ? "עבודות נבחרות" : "מתוך העבודה"}</h2>
            <ul>
              {evidence.map((p) => (
                <li key={p.id}>
                  <Link to="/projects/$slug" params={{ slug: p.id }}>
                    <img src={p.image} alt="" loading="lazy" />
                    <strong>{p.name.he}</strong>
                    <span>{p.category.he}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav className="world-next" aria-label="המשך">
          {WORLDS.filter((w) => w.id !== world).map((w) => (
            <Link key={w.id} to={w.route} data-w={w.id}>
              <span>{w.index} — להמשך</span>
              <strong>{w.name}</strong>
              <em>{w.discipline.he}</em>
            </Link>
          ))}
          <Link to="/" hash="contact" data-w="home">
            <span>יצירת קשר</span>
            <strong>לדבר עם ליאל</strong>
            <em>חזרה לעמוד הבית</em>
          </Link>
        </nav>
      </main>
    </div>
  );
}
