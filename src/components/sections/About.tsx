import { useI18n } from "../i18n/I18nContext";
import { Reveal } from "../ui/Reveal";
import portraitAsset from "@/assets/liel-about-spider.jpeg.asset.json";

export function About() {
  const { t } = useI18n();
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="section-shell about-section__grid">
        <Reveal>
          <div className="about-section__visual">
              <div className="about-section__image">
                <img
                  src={portraitAsset.url}
                  alt={t({ he: "דיוקן של ליאל יעקב ווינברג", en: "Portrait of Liel Yaakov Wainberg" })}
                  className="w-full h-full object-cover"
                />
              </div>
            <div className="about-section__caption">
              {t({
                he: "ליאל ווינברג · ירושלים",
                en: "Liel Wainberg · Jerusalem",
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="about-section__copy">
            <p className="eyebrow">01 / {t({ he: "ליאל", en: "Liel" })}</p>
            <h2 id="about-title">
              {t({ he: "אני לא עובד מתוך משבצת אחת.", en: "I don’t work from one box." })}
            </h2>
            <div className="about-section__body">
              {t({
                he: (
                  <>
                    <p>אני ליאל. אני מפתח תוכנה ומוצרים דיגיטליים, מעצב UX/UI, מנהל אופרציות בר ומאלף כלבים.</p>
                    <p>אלה תחומים שונים, אבל העבודה בתוכם נשענת על אותם הרגלים: להתבונן, להבין מה לא עובד, ולתת לפרטים הקטנים את המקום שמגיע להם. מול משתמש, אורח או כלב, תקשורת טובה מתחילה בהקשבה.</p>
                  </>
                ),
                en: (
                  <>
                    <p>I’m Liel. I develop software and digital products, design UX/UI, run bar operations, and train dogs.</p>
                    <p>They are different fields, but the work relies on the same habits: observe carefully, understand what is not working, and give small details the attention they deserve. Whether it is a user, a guest, or a dog, good communication starts with listening.</p>
                  </>
                ),
              })}
            </div>

            <div className="about-section__worlds" id="worlds-intro">
              {[
                { n: "01", id: "digital", l: t({ he: "דיגיטל", en: "Digital" }) },
                { n: "02", id: "liquid", l: t({ he: "לילה", en: "Nightlife" }) },
                { n: "03", id: "canine", l: t({ he: "כלבנות", en: "Canine" }) },
              ].map((s, i) => (
                <div
                  key={i}
                  className="transition-transform duration-200 hover:-translate-y-1"
                  onMouseEnter={() => {
                    document.documentElement.dataset.env = s.id;
                  }}
                  onMouseLeave={() => {
                    document.documentElement.dataset.env = "liel";
                  }}
                >
                  <span>{s.n}</span>
                  <strong>{s.l}</strong>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
