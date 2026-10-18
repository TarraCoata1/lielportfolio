import { useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import { Reveal } from "../ui/Reveal";
import { Plus, Minus } from "lucide-react";

const QUESTIONS = [
  {
    q: { he: "מה זמן ההיענות לפנייה?", en: "What's the response time?" },
    a: {
      he: "אני חוזר לכל פנייה תוך 24 שעות בימי עסקים. פרויקטים דחופים — באותו יום.",
      en: "I reply to every inquiry within 24 hours on business days. Urgent projects — same day.",
    },
  },
  {
    q: { he: "כמה זמן לוקח לבנות אתר?", en: "How long does it take to build a site?" },
    a: {
      he: "דף נחיתה: 1–2 שבועות. אתר מלא: 3–5 שבועות. מערכת Full Stack: 6–10 שבועות. התלוי בהיקף ובתוכן.",
      en: "Landing page: 1–2 weeks. Full site: 3–5 weeks. Full Stack app: 6–10 weeks. Depends on scope and content.",
    },
  },
  {
    q: { he: "האם אתה עובד עם עיצוב קיים?", en: "Do you work with existing designs?" },
    a: {
      he: "כן. אני מפתח מ־Figma, מקבצי עיצוב, ואם צריך — מעצב מאפס. כל אתר נבנה על מערכת עיצוב מסודרת ולא על ״פיקסלים״.",
      en: "Yes. I build from Figma, from design files, and when needed — design from scratch. Every site runs on a real design system, not pixel hacks.",
    },
  },
  {
    q: { he: "מה כלול במחיר?", en: "What's included in the price?" },
    a: {
      he: "אפיון, עיצוב UX/UI, פיתוח, SEO טכני בסיסי, אחריות ובאגים ל־30 יום ראשונים, והדרכה על מערכת הניהול.",
      en: "Discovery, UX/UI design, development, basic technical SEO, 30-day bug warranty, and CMS onboarding.",
    },
  },
  {
    q: { he: "אתה גם מארח את האתר?", en: "Do you also host the site?" },
    a: {
      he: "כן — פריסה על תשתית Edge מהירה (Vercel / Cloudflare), עם SSL, גיבויים ודומיין. או שאני מעביר לך שליטה מלאה.",
      en: "Yes — deployed on fast Edge infra (Vercel / Cloudflare), with SSL, backups, and domain. Or I hand over full ownership.",
    },
  },
  {
    q: { he: "אפשר עדכונים אחרי ההשקה?", en: "Can I get updates after launch?" },
    a: {
      he: "בהחלט. אפשר לעבוד ברטיינר חודשי, בשעות בנק, או בפרויקטים נקודתיים לפי הצורך.",
      en: "Absolutely. Monthly retainer, hour bank, or one-off updates — whichever fits.",
    },
  },
];

export function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="relative bg-[var(--charcoal)] py-24 md:py-32 px-6 lg:px-12 border-y border-[var(--border)]"
      aria-labelledby="faq-title"
      id="faq"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="font-mono text-[0.7rem] tracking-[0.3em] text-[var(--purple-light)] mb-4">
            {t({ he: "// שאלות נפוצות", en: "// FAQ" })}
          </div>
          <h2
            id="faq-title"
            className="font-display text-[2rem] md:text-[2.8rem] leading-[1.1] text-[var(--white)]"
          >
            {t({ he: "התשובות שביקשת קודם.", en: "The answers you asked first." })}
          </h2>
        </Reveal>

        <div className="mt-12 border-t border-[var(--border)]">
          {QUESTIONS.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-[var(--border)]">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-6 text-start hover:bg-[var(--black)]/40 transition-colors px-2"
                >
                  <span className="font-display text-[1.05rem] md:text-[1.2rem] text-[var(--white)]">
                    {t(it.q)}
                  </span>
                  {isOpen ? (
                    <Minus className="w-5 h-5 text-[var(--purple-light)] shrink-0" strokeWidth={1.5} />
                  ) : (
                    <Plus className="w-5 h-5 text-[var(--silver-dim)] shrink-0" strokeWidth={1.5} />
                  )}
                </button>
                {isOpen && (
                  <div className="px-2 pb-6 font-sans font-light text-[0.98rem] text-[var(--silver)] leading-[1.85] max-w-3xl">
                    {t(it.a)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
