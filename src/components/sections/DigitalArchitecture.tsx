import { useI18n } from "../i18n/I18nContext";
import { Reveal } from "../ui/Reveal";
import { ArrowRight } from "lucide-react";
const STACK = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind",
  "PostgreSQL",
  "APIs",
  "Automation",
];

export function DigitalArchitecture() {
  const { t, dir } = useI18n();

  return (
    <section id="digital-architecture" className="digital-section">
      <div className="section-shell">
        <Reveal>
          <p className="eyebrow">02 / DIGITAL</p>
          <h2>{t({ he: "מוצר טוב מתחיל לפני הקוד.", en: "A good product starts before the code." })}</h2>
          <p className="section-lede">
            {t({
              he: "אני בונה תוכנה, מערכות, אפליקציות ומוצרים דיגיטליים. העבודה מתחילה בהבנת הבעיה, ממשיכה דרך UX וארכיטקטורה, ומסתיימת במוצר מהיר, נגיש ויציב שאפשר באמת להשתמש בו.",
              en: "I build software, systems, applications, and digital products. The work starts with understanding the problem, moves through UX and architecture, and ends with a fast, accessible, stable product people can actually use.",
            })}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="architecture-capabilities" aria-label={t({ he: "יכולות", en: "Capabilities" })}>
            {STACK.map((label, index) => <div key={label} className="capability-cell"><small>{String(index + 1).padStart(2, '0')}</small><span>{label}</span></div>)}
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-[var(--border)] pt-10">
            <p className="font-display text-[1.4rem] md:text-[1.8rem] text-[var(--white)] leading-tight max-w-xl">
              {t({
                he: "אם יש בעיה שצריך להפוך למוצר עובד, אשמח לשמוע עליה.",
                en: "If there is a problem that needs to become a working product, I’d like to hear about it.",
              })}
            </p>
            <a href="#contact" className="action action--primary">
              {t({ he: "דברו איתי", en: "Start a conversation" })}
              <ArrowRight aria-hidden className={`w-4 h-4 transition-transform ${dir === "rtl" ? "rotate-180" : ""}`} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
