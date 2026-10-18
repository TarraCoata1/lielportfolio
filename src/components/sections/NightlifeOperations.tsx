import { ArrowUpRight } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { Reveal } from "../ui/Reveal";
import barAsset from "@/assets/liel-shaker.jpg.asset.json";

const FORMATS = [
  { he: "סדנאות מיקסולוגיה לקבוצות קטנות", en: "Mixology workshops for small groups" },
  { he: "אירוח פרטי עם תפריט מותאם", en: "Private hosting with a tailored menu" },
  { he: "אופרציית בר לאירועים בקצב גבוה", en: "High-tempo event bar operations" },
];

export function NightlifeOperations() {
  const { t } = useI18n();
  return (
    <section id="nightlife-operations" className="hospitality-section" aria-labelledby="hospitality-title">
      <div className="section-shell hospitality-section__grid">
        <Reveal className="hospitality-section__copy">
          <p className="eyebrow">05 / LW.LIQUID</p>
          <h2 id="hospitality-title">{t({ he: "אירוח הוא עניין של תזמון.", en: "Hospitality is a matter of timing." })}</h2>
          <p className="section-lede">{t({ he: "בבר אני עובד עם קצב, טעם ואנשים. אני בונה תפריט שמתאים לאירוע, מכין את האופרציה מראש, ובזמן אמת דואג שהמארחים יוכלו פשוט להיות עם האורחים שלהם.", en: "Behind the bar I work with pace, taste, and people. I shape the menu for the event, prepare the operation in advance, and make sure the hosts can spend their time with their guests." })}</p>
          <ol>{FORMATS.map((item, index) => <li key={item.en}><span>0{index + 1}</span>{t(item)}</li>)}</ol>
          <a href="/bar" className="world-link">{t({ he: "עוד על LW.LIQUID", en: "More about LW.LIQUID" })}<ArrowUpRight aria-hidden /></a>
        </Reveal>
        <Reveal className="hospitality-section__media">
          <img src={barAsset.url} alt={t({ he: "ליאל מכין קוקטייל מאחורי הבר", en: "Liel preparing a cocktail behind the bar" })} loading="lazy" decoding="async" width="1200" height="1500" />
        </Reveal>
      </div>
    </section>
  );
}