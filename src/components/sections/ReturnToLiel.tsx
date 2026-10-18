import { useI18n } from "../i18n/I18nContext";
import { Reveal } from "../ui/Reveal";
import portraitAsset from "@/assets/liel-about.jpg.asset.json";

export function ReturnToLiel() {
  const { t } = useI18n();
  return (
    <section className="return-section" id="return-to-liel">
      <div className="return-section__image" aria-hidden="true">
        <img src={portraitAsset.url} alt="" loading="lazy" decoding="async" />
      </div>
      <Reveal className="return-section__copy">
        <p className="eyebrow">{t({ he: "בחזרה לאדם", en: "Back to the person" })}</p>
        <h2>{t({ he: "שלושה תחומים. דרך אחת להסתכל.", en: "Three practices. One way of looking." })}</h2>
        <p>{t({ he: "בכל אחד מהם אני מחפש את אותו הדבר: להבין מה קורה באמת, לזהות את הפרטים שמשנים את התמונה, ולבנות תגובה שעובדת.", en: "In each one, I look for the same thing: understand what is really happening, notice the details that change the picture, and build a response that works." })}</p>
      </Reveal>
    </section>
  );
}