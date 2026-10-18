import { useI18n } from "../i18n/I18nContext";
import { Reveal } from "../ui/Reveal";

type Step = {
  n: string;
  code: string;
  title: { he: string; en: string };
  body: { he: string; en: string };
};

const STEPS: Step[] = [
  {
    n: "01",
    code: "01 // DIAGNOSIS",
    title: { he: "אבחון", en: "Diagnosis" },
    body: {
      he: "ניתוח עמוק של הצרכים, פירוק המערכת הקיימת, זיהוי נקודות הכשל — לפני שורת קוד אחת.",
      en: "Deep needs analysis, deconstruction of the existing system, failure point identification — before a single line of code.",
    },
  },
  {
    n: "02",
    code: "02 // ARCHITECTURE",
    title: { he: "ארכיטקטורה", en: "Architecture" },
    body: {
      he: "בניית שלד טכנולוגי, אפיון פסיכולוגי של קהל היעד, וגיבוש שפה ויזואלית שעושה עבודה.",
      en: "Technical skeleton, psychological profiling of the target audience, and a visual language that does real work.",
    },
  },
  {
    n: "03",
    code: "03 // DEPLOYMENT",
    title: { he: "הטמעה", en: "Deployment" },
    body: {
      he: "כתיבת קוד נקי, אופטימיזציה מלאה, הרצת המערכת לאוויר — עם בעלות מלאה על כל שלב.",
      en: "Clean code, full optimization, system goes live — with complete ownership over every stage.",
    },
  },
];

export function WorkProtocol() {
  const { t } = useI18n();
  return (
    <section className="relative bg-[var(--black)] py-24 md:py-36 px-6 lg:px-12" id="protocol">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="font-mono text-[0.7rem] tracking-[0.3em] text-[var(--purple-light)] mb-4">
            {t({ he: "// פרוטוקול עבודה", en: "// WORK_PROTOCOL" })}
          </div>
          <h2 className="font-display text-[2.4rem] md:text-[3.4rem] leading-[1.05] text-[var(--white)] text-balance max-w-3xl">
            {t({ he: "איך עובדים עם המערכת.", en: "How The System Works." })}
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="relative h-full bg-[var(--charcoal)] p-8 md:p-10">
                <div className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--purple-light)]">{s.code}</div>
                <div className="mt-6 font-display text-[4rem] leading-none text-[rgba(124,58,237,0.18)]">{s.n}</div>
                <h3 className="mt-4 font-display text-[1.8rem] text-[var(--white)] leading-tight">
                  {t(s.title)}
                </h3>
                <p className="mt-4 font-sans font-light text-[0.95rem] text-[var(--silver)] leading-[1.8]">
                  {t(s.body)}
                </p>
                <span className="hud-bracket tl" />
                <span className="hud-bracket tr" />
                <span className="hud-bracket bl" />
                <span className="hud-bracket br" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
