import { useI18n } from "../i18n/I18nContext";
import { Reveal } from "../ui/Reveal";

export function BeyondCode() {
  const { t } = useI18n();
  return (
    <section className="relative bg-[var(--black)] py-20 md:py-28 px-6 lg:px-12">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <div className="font-mono text-[0.7rem] tracking-[0.35em] text-[var(--purple-light)] mb-6">
            {t({ he: "// מעבר לקוד", en: "// BEYOND_CODE" })}
          </div>
          <h2 className="font-display text-[2rem] md:text-[3rem] leading-[1.1] text-[var(--white)] text-balance">
            {t({
              he: "שתי משמעויות שמזינות את העבודה — לא מחליפות אותה.",
              en: "Two disciplines that feed the work — not replace it.",
            })}
          </h2>
          <p className="mt-6 font-sans font-light text-[1rem] text-[var(--silver)] max-w-2xl mx-auto leading-[1.85]">
            {t({
              he: "ניהול אופרציית בר ואילוף כלבים לימדו אותי קצב, קריאת קהל ותקשורת לא־מילולית. הכלים האלה חוזרים לכל פרויקט דיגיטלי.",
              en: "Bar operations and canine training taught me tempo, crowd reading, and non-verbal communication. Those tools return to every digital project.",
            })}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
