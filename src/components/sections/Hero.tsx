import { useMotionPreference } from "@/hooks/use-motion-preference";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "../i18n/I18nContext";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import portraitAsset from "@/assets/liel-portrait-v3.png.asset.json";

export function Hero() {
  const { t } = useI18n();
  const reduceMotion = useMotionPreference();
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, value => `translate3d(0, ${reduceMotion ? 0 : Math.min(value, 800) * 0.04}px, 0)`);


  return (
    <section className="hero" id="top">
      <motion.div className="hero__portrait" style={reduceMotion ? undefined : { transform: portraitY }}>
        <img
          src={portraitAsset.url}
          alt={t({ he: "ליאל ווינברג", en: "Liel Wainberg" })}
          width="1200"
          height="1500"
          fetchPriority="high"
        />
        <div className="hero__portrait-shade" />
        <div className="hero__portrait-meta" aria-hidden="true">
          <span>JERUSALEM</span>
        </div>
      </motion.div>



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
          <a className="action action--primary" href="#worlds">
            {t({ he: "לגלות את התחומים", en: "Explore the practices" })}
            <ArrowUpRight aria-hidden />
          </a>
          <a className="action action--quiet" href="#about">
            {t({ he: "להכיר אותי", en: "Meet Liel" })}
            <ArrowDown aria-hidden />
          </a>
        </div>
      </div>

      <div className="hero__footer">
        <span>{t({ he: "תוכנה · כלבנות · אירוח", en: "Software · Canine behavior · Hospitality" })}</span>
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
