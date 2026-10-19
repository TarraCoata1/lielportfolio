import { ArrowUpRight } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { Reveal } from "../ui/Reveal";
const SERVICES = [
  { he: "גורים, גבולות וסוציאליזציה", en: "Puppies, boundaries, and socialization" },
  { he: "שינוי דפוסי התנהגות", en: "Behavior pattern change" },
  { he: "תוכניות עבודה פרטיות", en: "Private training programs" },
];

export function CanineBehavior() {
  const { t } = useI18n();
  return (
    <section id="canine-behavior" className="canine-section" aria-labelledby="canine-title">
      <div className="canine-section__media">
        <img src="/images/liel-and-chief.webp" alt={t({ he: "ליאל יושב עם צ׳יף", en: "Liel sitting with Chief" })} loading="lazy" decoding="async" width="1200" height="1600" />
      </div>
      <div className="section-shell canine-section__content">
        <Reveal>
          <h2 id="canine-title">{t({ he: "לפני פקודה, צריך להבין התנהגות.", en: "Before a command, understand the behavior." })}</h2>
          <p className="section-lede">{t({ he: "אני עובד דרך קריאת שפת גוף, עקביות ואמון. המטרה אינה כלב שמבצע תרגיל לכמה דקות, אלא תקשורת ברורה שמחזיקה גם בבית וגם בחוץ.", en: "I work through body-language reading, consistency, and trust. The goal is not a dog that performs for a few minutes, but clear communication that holds at home and outside." })}</p>
          <ul>{SERVICES.map((service) => <li key={service.en}>{t(service)}</li>)}</ul>
          <p className="canine-section__note">{t({ he: "צ'יף, הכלב שלי, הוא המקום שבו הגישה הזאת נבחנת בכל יום.", en: "Chief, my own dog, is where this approach is tested every day." })}</p>
          <a href="/dogs" className="world-link">{t({ he: "עוד על העבודה עם כלבים", en: "More about canine work" })}<ArrowUpRight aria-hidden /></a>
        </Reveal>
      </div>
    </section>
  );
}
