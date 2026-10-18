import { useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import { TextScramble } from "../ui/TextScramble";
import { Reveal } from "../ui/Reveal";
import { Layers, GlassWater, HeartHandshake, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import shakerAsset from "@/assets/liel-shaker.jpg.asset.json";
import canineAsset from "@/assets/liel-canine.jpg.asset.json";
import constellationAsset from "@/assets/liel-hero-constellation.jpg.asset.json";

type Core = {
  n: string;
  icon: LucideIcon;
  code: string;
  anchor: string;
  title: { he: string; en: string };
  tag: { he: string; en: string };
  body: { he: string; en: string };
  skills: string[];
  image?: string;
};

const CORES: Core[] = [
  {
    n: "01",
    icon: Layers,
    code: "DIGITAL.ARCHITECTURE",
    anchor: "#digital-architecture",
    title: { he: "ארכיטקטורה דיגיטלית", en: "Digital Architecture" },
    tag: { he: "דיגיטל · פיתוח ועיצוב", en: "Digital · Development & Design" },
    body: {
      he: "מדפי נחיתה ממוקדי מטרה ועד מערכות Full Stack מורכבות. קוד נקי, ביצועים מהירים וחוויית משתמש מבוססת פסיכולוגיה שמייצרת זהות מותג חזקה.",
      en: "From targeted landing pages to complex Full Stack systems. Clean code, fast performance, and psychology-based user experience that builds strong brand identity.",
    },
    skills: ["Next.js", "TypeScript", "Tailwind", "Figma", "Framer Motion"],
    image: constellationAsset.url,
  },
  {
    n: "02",
    icon: GlassWater,
    code: "NIGHTLIFE.OPERATIONS",
    anchor: "#nightlife-operations",
    title: { he: "אופרציית חיי לילה", en: "Nightlife Operations" },
    tag: { he: "ניהול בר ומיקסולוגיה", en: "Bar Management & Mixology" },
    body: {
      he: "ניהול והובלת צוותים, הנדסת תפריטי קוקטיילים פרימיום ותרגום האנרגיה של המקום לחוויית אירוח מדויקת שעובדת לפי קצב ונשענת על אופרציה נכונה.",
      en: "Team leadership and management, premium cocktail menu engineering, and translating the venue's energy into precise hospitality that works by rhythm and relies on correct operations.",
    },
    skills: ["Mixology", "Menu Engineering", "Staff Leadership", "Hospitality"],
    image: shakerAsset.url,
  },
  {
    n: "03",
    icon: HeartHandshake,
    code: "CANINE.BEHAVIOR",
    anchor: "#canine-behavior",
    title: { he: "אילוף ופסיכולוגיה כלבנית", en: "Canine Psychology & Training" },
    tag: { he: "אילוף ופסיכולוגיה התנהגותית", en: "Training & Behavioral Psychology" },
    body: {
      he: "מנהיגות שקטה, קריאת שפת גוף ותקשורת מבוססת אמון. פתרון בעיות התנהגות מורכבות דרך הבנת האינסטינקטים והפסיכולוגיה הטבעית של הכלב.",
      en: "Quiet leadership, body language reading, and trust-based communication. Solving complex behavioral issues through understanding the dog's natural instincts and psychology.",
    },
    skills: ["Behavioral Reading", "Trust-Based Training", "Calm Authority", "Instinct Work"],
    image: canineAsset.url,
  },
];

export function Services() {
  const { t, dir } = useI18n();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative bg-[var(--black)] py-24 md:py-36 px-6 lg:px-12 overflow-hidden" id="services">
      {/* Dynamic atmosphere per active core */}
      <motion.div
        aria-hidden
        animate={{ opacity: active === 0 ? 0.35 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, black 30%, transparent 80%)",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ opacity: active === 1 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none animate-pulse-glow"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(217,70,239,0.18), rgba(124,58,237,0.05) 60%, transparent 80%)",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ opacity: active === 2 ? 0.55 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.018) 0 2px, transparent 2px 6px)",
        }}
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="font-mono text-[0.7rem] tracking-[0.3em] text-[var(--purple-light)] mb-4">
            {t({ he: "// ארכיטקטורת מערכת הפעלה", en: "// OPERATING_SYSTEM_ARCHITECTURE" })}
          </div>
          <h2 className="font-display text-[2.4rem] md:text-[3.4rem] leading-[1.05] text-[var(--white)] text-balance max-w-3xl">
            <TextScramble
              key={`svc-h2-${t({ he: "he", en: "en" })}`}
              text={t({ he: "מערכת אחת. שלוש ליבות.", en: "One System. Three Cores." })}
              duration={650}
            />
          </h2>
          <p className="mt-6 font-sans font-light text-[1.02rem] text-[var(--silver)] max-w-2xl leading-[1.8]">
            {t({
              he: "כל ליבה עומדת בזכות עצמה — אבל כולן רצות על אותה מערכת הפעלה: תקשורת, פסיכולוגיה ודיוק.",
              en: "Each core stands on its own — but all run on the same operating system: communication, psychology, and precision.",
            })}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            className="mt-16 grid md:flex md:flex-row gap-px bg-[var(--border)] border border-[var(--border)] overflow-hidden"
            onMouseLeave={() => setActive(null)}
          >
            {CORES.map((c, i) => {
              const isActive = active === i;
              const isDimmed = active !== null && !isActive;
              return (
                <motion.div
                  key={c.n}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(isActive ? null : i)}
                  animate={{
                    flexGrow: isActive ? 2 : 1,
                    opacity: isDimmed ? 0.45 : 1,
                  }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative bg-[var(--charcoal)] cursor-pointer overflow-hidden min-h-[460px] md:min-h-[520px] md:basis-0"
                  style={{ flexBasis: 0 }}
                >
                  {/* background image */}
                  {c.image && (
                    <motion.div
                      aria-hidden
                      initial={false}
                      animate={{ opacity: isActive ? 0.45 : 0.18, scale: isActive ? 1.04 : 1 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: `url(${c.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "contrast(1.05)",
                      }}
                    />
                  )}
                  {c.image && (
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(7,3,17,0.55) 0%, rgba(7,3,17,0.85) 70%, var(--black) 100%)",
                      }}
                    />
                  )}
                  {/* purple ambient glow when active */}
                  <motion.div
                    aria-hidden
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(124,58,237,0.22), transparent 70%)",
                    }}
                  />
                  {/* edge bar */}
                  <motion.div
                    aria-hidden
                    initial={false}
                    animate={{ scaleY: isActive ? 1 : 0.15, opacity: isActive ? 1 : 0.4 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 bottom-0 w-[2px] bg-[var(--purple-light)] origin-center"
                    style={{ [dir === "rtl" ? "right" : "left"]: 0 } as React.CSSProperties}
                  />

                  <div className="relative h-full flex flex-col p-8 md:p-10">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-mono text-[0.62rem] tracking-[0.3em] text-[var(--silver-dim)]">
                          [ CORE · {c.n} ]
                        </div>
                        <div className="mt-1 font-mono text-[0.58rem] tracking-[0.25em] text-[var(--purple-light)]">
                          {c.code}
                        </div>
                      </div>
                      <c.icon
                        className={`w-7 h-7 transition-colors duration-500 ${
                          isActive ? "text-[var(--purple-light)]" : "text-[var(--silver-dim)]"
                        }`}
                        strokeWidth={1.2}
                      />
                    </div>

                    <div className="mt-auto pt-12">
                      <motion.h2
                        animate={{
                          fontSize: isActive ? "2.4rem" : "1.4rem",
                          color: isActive ? "var(--white)" : "var(--silver)",
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display leading-[1.05] text-balance"
                        style={{ color: "var(--silver)" }}
                      >
                        {t(c.title)}
                      </motion.h2>
                      <div className="mt-2 font-mono text-[0.6rem] tracking-[0.25em] text-[var(--silver-dim)] uppercase">
                        {t(c.tag)}
                      </div>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isActive ? "auto" : 0,
                          opacity: isActive ? 1 : 0,
                          marginTop: isActive ? 20 : 0,
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans font-light text-[0.95rem] text-[var(--silver)] leading-[1.75] max-w-md">
                          {t(c.body)}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {c.skills.map((s) => (
                            <span
                              key={s}
                              className="font-mono text-[0.58rem] tracking-[0.18em] uppercase px-2 py-1 border border-[var(--border-purple)] text-[var(--purple-light)] bg-[var(--purple-dim)]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                        <a
                          href={c.anchor}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-6 inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-[var(--purple-light)] hover:text-[var(--white)] border-b border-[var(--border-purple)] hover:border-[var(--purple-light)] pb-1 transition-colors"
                        >
                          {t({ he: "← היכנס לסקשן", en: "Enter Section →" })}
                        </a>
                      </motion.div>
                    </div>

                    {/* HUD brackets */}
                    <span className="hud-bracket tl" />
                    <span className="hud-bracket tr" />
                    <span className="hud-bracket bl" />
                    <span className="hud-bracket br" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-6 font-mono text-[0.6rem] tracking-[0.3em] text-[var(--silver-dim)] uppercase text-center">
          {t({ he: "[ העבר עכבר / הקש כדי להרחיב ליבה ]", en: "[ hover / tap to expand a core ]" })}
        </div>
      </div>
    </section>
  );
}
