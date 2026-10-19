import { useI18n } from "../i18n/I18nContext";
import { Reveal } from "../ui/Reveal";

export function ReturnToLiel() {
  const { t } = useI18n();
  return (
    <section className="return-section" id="return-to-liel">
      <div className="return-section__image">
        <img src="/images/liel-sunset-portrait.webp" alt={t({ he: "דיוקן של ליאל ווינברג על רקע הים בשעת שקיעה", en: "Portrait of Liel Wainberg at the sea at sunset" })} loading="lazy" decoding="async" width="1200" height="1200" />
      </div>
      <Reveal className="return-section__copy">
        <h2>{t({ he: "שלושה תחומים. דרך אחת להסתכל.", en: "Three practices. One way of looking." })}</h2>
        <p>{t({ he: "בכל אחד מהם אני מחפש את אותו הדבר: להבין מה קורה באמת, לזהות את הפרטים שמשנים את התמונה, ולבנות תגובה שעובדת.", en: "In each one, I look for the same thing: understand what is really happening, notice the details that change the picture, and build a response that works." })}</p>
      </Reveal>
    </section>
  );
}
