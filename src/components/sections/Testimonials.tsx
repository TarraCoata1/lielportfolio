import { useI18n } from "../i18n/I18nContext";
import { Reveal } from "../ui/Reveal";
import { Quote, Star } from "lucide-react";

type Item = {
  name: string;
  project: { he: string; en: string };
  rating: number;
  quote: { he: string; en: string };
};

const ITEMS: Item[] = [
  {
    name: "נתן",
    project: { he: "מגן נתיבים", en: "Magen Netivim" },
    rating: 5,
    quote: {
      he: "ליאל היקר, תודה רבה על העבודה המדהימה על האתר שלי. מההתחלה ועד הסוף היית מקצועי, סבלני וזמין לכל שאלה ובקשה. הצלחת להבין בדיוק מה אני צריך ולהפוך את זה לאתר ברמה גבוהה מאוד גם מבחינת עיצוב וגם מבחינת נוחות השימוש.",
      en: "Dear Liel, thank you for the amazing work on my site. From start to finish you were professional, patient, and available for every question. You understood exactly what I needed and turned it into a top-tier site — in both design and usability.",
    },
  },
  {
    name: "דור חדד",
    project: { he: "Dor Hadad · DJ", en: "Dor Hadad · DJ" },
    rating: 5,
    quote: {
      he: "אני באמת מרוצה מאוד. חשבתי שבאתי אליך כבר עם אתר והכול, ולא האמנתי שהאתר הזה באמת יכניס לי לידים כמו שאמרת. אני רואה אתר שנראה טוב ושיש בו אופציה ליצור קשר עם הלקוחות שלי. אתה אלוף. כל הכבוד. יודע שחפרתי לך על איך רציתי שייראה האתר, אבל בסבלנות קלטת הכול. בזכותך אפשר לעשות עוד צעד לעסק השני שמתפתח.",
      en: "I'm genuinely very happy. I didn't believe this site would actually bring me leads like you said — and it does. It looks good and gives clients a real way to reach me. You're a champion. I know I nagged about every detail, but you took it all in patiently. Thanks to you the second business can take another step.",
    },
  },
  {
    name: "לקוח TarraCoata",
    project: { he: "TarraCoata Studio", en: "TarraCoata Studio" },
    rating: 5,
    quote: {
      he: "ליאל הצליח לקחת רעיון שהיה לי בראש ולהפוך אותו לאתר שנראה כמו חברה גדולה. הכול מרגיש מדויק, מהיר ומקצועי. קיבלתי המון מחמאות על הנראות והחוויה.",
      en: "Liel took an idea I had in my head and turned it into a site that looks like a large company. Everything feels precise, fast, and professional. I've received tons of compliments on the look and feel.",
    },
  },
  {
    name: "רונית",
    project: { he: "קסם של צבעים", en: "Kesem Shel Tzvaim" },
    rating: 5,
    quote: {
      he: "רציתי אתר שירגיש עדין, נקי ומזמין, וזה בדיוק מה שקיבלתי. התהליך היה מסודר, כל שינוי שביקשתי בוצע מהר, והתוצאה הרבה מעבר למה שציפיתי.",
      en: "I wanted a site that felt soft, clean and inviting — and that's exactly what I got. The process was organized, every change was handled fast, and the result exceeded my expectations.",
    },
  },
  {
    name: "המפגש החלבי",
    project: { he: "The Dairy Corner", en: "The Dairy Corner" },
    rating: 5,
    quote: {
      he: "האתר החדש שדרג אותנו משמעותית. התפריט ברור, הכול נראה יוקרתי, ולקוחות כבר אמרו שהרושם הראשוני השתנה לגמרי.",
      en: "The new site upgraded us significantly. The menu is clear, everything looks premium, and customers have already said the first impression is completely different.",
    },
  },
  {
    name: "מגן נתיבים",
    project: { he: "Magen Netivim", en: "Magen Netivim" },
    rating: 5,
    quote: {
      he: "הכי אהבתי שליאל לא רק בנה אתר, אלא גם חשב כמו בעל עסק. הוא נתן רעיונות שלא חשבתי עליהם ושיפרו משמעותית את חוויית המשתמש.",
      en: "What I loved most is that Liel didn't just build a site — he thought like a business owner. He suggested ideas I hadn't considered that meaningfully improved the user experience.",
    },
  },
  {
    name: { he: "לקוח נוסף", en: "Repeat client" } as unknown as string,
    project: { he: "Full-Stack Build", en: "Full-Stack Build" },
    rating: 5,
    quote: {
      he: "עבדתי בעבר עם כמה בוני אתרים, אבל כאן הרגשתי שיש מישהו שחושב על כל פרט קטן. מהעיצוב ועד הביצועים, הכול מתוכנן.",
      en: "I've worked with several site builders in the past — here I finally felt someone thinks about every small detail. From design to performance, it's all deliberate.",
    },
  },
];

function Stars({ n }: { n: number }) {
  const { t } = useI18n();
  return (
    <div role="img" className="flex items-center gap-1" aria-label={t({ he: `${n} מתוך 5 כוכבים`, en: `${n} out of 5 stars` })}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          aria-hidden="true"
          key={i}
          className={`w-3.5 h-3.5 ${i < n ? "text-[var(--purple-light)] fill-[var(--purple-light)]" : "text-[var(--border)]"}`}
          strokeWidth={1.2}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const { t, locale } = useI18n();
  return (
    <section
      id="testimonials"
      className="relative bg-[var(--black)] py-24 md:py-32 px-6 lg:px-12 overflow-hidden"
      aria-labelledby="testimonials-title"
    >
      {/* subtle grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--purple-light) 1px, transparent 1px), linear-gradient(90deg, var(--purple-light) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-baseline gap-4 mb-4">
            <div className="font-mono text-[0.7rem] tracking-[0.3em] text-[var(--purple-light)]">
              {t({ he: "// עדויות · CLIENT VOICES", en: "// CLIENT VOICES" })}
            </div>
            <div className="hidden md:block h-px flex-1 bg-[var(--border)]" />
            <div className="hidden md:block font-mono text-[0.6rem] tracking-[0.3em] text-[var(--silver-dim)] uppercase">{String(ITEMS.length).padStart(2, "0")}</div>
          </div>
          <h2
            id="testimonials-title"
            className="font-display text-[2rem] md:text-[2.8rem] leading-[1.1] text-[var(--white)] max-w-3xl text-balance"
          >
            {t({
              he: "מה שאומרים אחרים.",
              en: "What others say.",
            })}
          </h2>
          <p className="mt-4 font-sans font-light text-[0.95rem] text-[var(--silver-mid)] max-w-2xl leading-[1.8]">
            {t({
              he: "עדויות אמיתיות מלקוחות שעבדו איתי על אתרים, מערכות ומיתוגים דיגיטליים.",
              en: "Real feedback from clients who trusted me with their sites, systems, and digital brands.",
            })}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map((it, i) => {
            const displayName =
              typeof it.name === "string" ? it.name : t(it.name as { he: string; en: string });
            return (
              <Reveal key={i} delay={Math.min(i, 5) * 0.06}>
                <figure className="testimonial-quote">
                  {/* corner tick */}
                  <div className="flex items-center justify-between">
                    <Quote aria-hidden="true" className="w-6 h-6 text-[var(--purple-light)] opacity-60" strokeWidth={1.2} />
                    <Stars n={it.rating} />
                  </div>

                  <blockquote
                    className="mt-6 font-sans font-light text-[0.98rem] text-[var(--silver)] leading-[1.85] flex-1"
                    lang={locale}
                  >
                    &ldquo;{t(it.quote)}&rdquo;
                  </blockquote>

                  <figcaption className="mt-8 pt-5 border-t border-[var(--border)]">
                    <div className="font-display text-[1.05rem] text-[var(--white)] leading-tight">
                      {displayName}
                    </div>
                    <div className="mt-1.5 font-mono text-[0.6rem] tracking-[0.28em] uppercase text-[var(--purple-light)]">
                      {t(it.project)}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
