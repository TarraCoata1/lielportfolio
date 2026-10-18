import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "../i18n/I18nContext";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import portraitAsset from "@/assets/liel-portrait-v3.png.asset.json";
import { LazyScene } from "../three/LazyScene";

export function Hero() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Multi-tier parallax depth
  const portraitY = useTransform(scrollY, [0, 800], [0, reduceMotion ? 0 : 48]);
  const coreY = useTransform(scrollY, [0, 800], [0, reduceMotion ? 0 : -32]);
  const gridY = useTransform(scrollY, [0, 800], [0, reduceMotion ? 0 : 24]);

  return (
    <section className="hero" id="top">
      {/* 3D Metamorphic Core Scene */}
      <motion.div
        className="hero__core"
        aria-hidden="true"
        style={{ transform: reduceMotion ? "none" : useTransform(coreY, (v) => `translateY(${v}px)`) }}
      >
        <LazyScene kind="hero" fallback={null} />
      </motion.div>

      {/* Layered Portrait with Subtle Parallax */}
      <motion.div
        className="hero__portrait"
        style={{ transform: reduceMotion ? "none" : useTransform(portraitY, (v) => `translateY(${v}px)`) }}
      >
        <img
          src={portraitAsset.url}
          alt={t({ he: "ליאל ווינברג", en: "Liel Wainberg" })}
          width="1200"
          height="1500"
          fetchPriority="high"
        />
        <div className="hero__portrait-shade" />
        <div className="hero__portrait-meta" aria-hidden="true">
          <span>PORTRAIT / 01</span>
          <span>JERUSALEM</span>
        </div>
      </motion.div>

      {/* Atmospheric Spatial Grid */}
      <motion.div
        className="hero__grid"
        aria-hidden="true"
        style={{ transform: reduceMotion ? "none" : useTransform(gridY, (v) => `translateY(${v}px)`) }}
      />

      {/* Typography & Core Message */}
      <div className="hero__content">
        <p className="eyebrow">LW.SYS / 31.7683°N</p>
        <h1>
          {t({
            he: (
              <>
                ליאל<br />ווינברג
              </>
            ),
            en: (
              <>
                Liel<br />Wainberg
              </>
            ),
          })}
        </h1>
        <p className="hero__statement">
          {t({
            he: "אני בונה תוכנה, מערכות ומוצרים דיגיטליים. מהאפיון והעיצוב ועד הקוד שעולה לאוויר.",
            en: "I build software, systems, and digital products. From product thinking and UX through production code.",
          })}
        </p>
        <div className="hero__actions">
          <a className="action action--primary" href="#projects">
            {t({ he: "עבודות נבחרות", en: "Selected work" })}
            <ArrowUpRight aria-hidden />
          </a>
          <a className="action action--quiet" href="#about">
            {t({ he: "להכיר אותי", en: "Meet Liel" })}
            <ArrowDown aria-hidden />
          </a>
        </div>
      </div>

      <div className="hero__footer">
        <span>{t({ he: "פיתוח · ארכיטקטורה · UX/UI", en: "Development · Architecture · UX/UI" })}</span>
        <span>{t({ he: "ירושלים · עובד עם לקוחות בכל הארץ", en: "Jerusalem · Working nationwide" })}</span>
      </div>

      <a
        href="#about"
        className="hero__scroll-cue"
        aria-label={t({ he: "גלילה להיכרות עם ליאל", en: "Scroll to meet Liel" })}
      >
        <span>{t({ he: "למטה", en: "Scroll" })}</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
