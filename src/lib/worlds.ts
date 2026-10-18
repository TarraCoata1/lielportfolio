import type { LocalizedString } from "@/lib/portfolio-data";
import digitalImg from "@/assets/liel-portrait-v3.png.asset.json";
import canineImg from "@/assets/liel-canine.jpg.asset.json";
import liquidImg from "@/assets/liel-shaker.jpg.asset.json";

export type WorldId = "digital" | "canine" | "liquid";

export type World = {
  id: WorldId;
  index: string;
  name: string;
  route: "/web" | "/dogs" | "/bar";
  discipline: LocalizedString;
  line: LocalizedString;
  signals: LocalizedString[];
  image: string;
};

export const WORLDS: World[] = [
  {
    id: "digital",
    index: "01",
    name: "TARRACOATA",
    route: "/web",
    discipline: { he: "תוכנה · מערכות · מוצרים", en: "Software · Systems · Products" },
    line: { he: "מבעיה אמיתית למוצר שעובד.", en: "From a real problem to a working product." },
    signals: [
      { he: "ארכיטקטורה", en: "Architecture" },
      { he: "UX/UI", en: "UX/UI" },
      { he: "אינטגרציות", en: "Integrations" },
    ],
    image: digitalImg.url,
  },
  {
    id: "canine",
    index: "02",
    name: "CANINE.BEHAVIOR",
    route: "/dogs",
    discipline: { he: "אילוף · התנהגות כלבים", en: "Dog training · Behavior" },
    line: { he: "שפה משותפת, לא פקודות.", en: "A shared language, not commands." },
    signals: [
      { he: "תצפית", en: "Observation" },
      { he: "גבולות", en: "Boundaries" },
      { he: "צ׳יף", en: "Chief" },
    ],
    image: canineImg.url,
  },
  {
    id: "liquid",
    index: "03",
    name: "LW.LIQUID",
    route: "/bar",
    discipline: { he: "בר · אירוח · מיקסולוגיה", en: "Bar · Hospitality · Mixology" },
    line: { he: "תזמון, אנשים ואווירה.", en: "Timing, people and atmosphere." },
    signals: [
      { he: "סדנאות", en: "Workshops" },
      { he: "אירועים פרטיים", en: "Private events" },
      { he: "תפריטים", en: "Menus" },
    ],
    image: liquidImg.url,
  },
];
