import { createFileRoute, Link } from "@tanstack/react-router";
import { WorldShell } from "@/components/worlds/WorldShell";
import digitalAsset from "@/assets/liel-portrait-v3.png.asset.json";

const TITLE = "בונה אתרים בירושלים | מפתח Full Stack ומעצב UX/UI — ליאל ווינברג";
const DESC =
  "בונה אתרים, מפתח Full Stack ומעצב UX/UI בירושלים. אתרי תדמית, חנויות, מערכות SaaS ו-Web Apps מהירים, נגישים ומדויקים. ייעוץ ראשוני חינם.";
const URL_SELF = "https://lielwainberg.com/web";

export const Route = createFileRoute("/web")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "בונה אתרים, בניית אתרים, מפתח אתרים, פיתוח אתרים, מעצב אתרים, עיצוב אתרים, מעצב UX, מעצב UI, אתרי תדמית, חנות אונליין, פיתוח Full Stack, React, TypeScript, ירושלים, בונה אתרים בירושלים, מפתח אתרים בישראל",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: digitalAsset.url },
      { name: "twitter:image", content: digitalAsset.url },
      { property: "og:locale", content: "he_IL" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL_SELF },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "geo.region", content: "IL-JM" },
      { name: "geo.placename", content: "Jerusalem" },
    ],
    links: [{ rel: "canonical", href: URL_SELF }, { rel: "icon", type: "image/png", sizes: "32x32", href: "/icons/tarracoata-32.png" }, { rel: "apple-touch-icon", sizes: "180x180", href: "/icons/tarracoata-180.png" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "ליאל ווינברג — בניית אתרים ופיתוח Full Stack",
          url: URL_SELF,
          areaServed: { "@type": "Country", name: "Israel" },
          address: { "@type": "PostalAddress", addressLocality: "Jerusalem", addressCountry: "IL" },
          telephone: "+972546969367",
          priceRange: "$$",
          serviceType: ["בניית אתרים", "פיתוח Full Stack", "עיצוב UX/UI", "חנות אונליין", "מערכות Web"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "בית", item: "https://lielwainberg.com/" },
            { "@type": "ListItem", position: 2, name: "בניית אתרים", item: URL_SELF },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "כמה עולה לבנות אתר?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "המחיר תלוי בהיקף — אתר תדמית בסיסי מתחיל בכמה אלפי שקלים, מערכת מורכבת או חנות יכולה להגיע לעשרות אלפים. כל פרויקט מתחיל בשיחת ייעוץ חינם ובהצעת מחיר מדויקת.",
              },
            },
            {
              "@type": "Question",
              name: "כמה זמן לוקח לבנות אתר?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "אתר תדמית: 1–3 שבועות. מערכת או חנות: 4–12 שבועות בהתאם לפיצ׳רים, אינטגרציות ושלבי אישור.",
              },
            },
            {
              "@type": "Question",
              name: "באילו טכנולוגיות אתה משתמש?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "React, TypeScript, TanStack Start, Tailwind, Supabase/Postgres. סטאק מודרני, מהיר, נגיש ומותאם SEO.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: WebPage,
});

function WebPage() {
  return (
    <WorldShell world="digital">
      <article className="world-article">
        <nav className="font-mono text-[0.7rem] tracking-[0.25em] uppercase text-[var(--silver-dim)] mb-10">
          <Link to="/" className="hover:text-[var(--purple-light)]">בית</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--purple-light)]">בניית אתרים</span>
        </nav>

        <h1 className="font-display text-[2.4rem] md:text-[3.4rem] leading-[1.05] mb-6 text-balance">
          בונה אתרים, מפתח Full Stack ומעצב UX/UI בירושלים
        </h1>
        <p className="text-[1.1rem] text-[var(--silver)] mb-12">
          אני ליאל ווינברג — בונה אתרים ומערכות אינטרנט מהירים, מדויקים ויפים. אני לוקח פרויקט מאפס ועד עלייה לאוויר: מאסטרטגיה ועיצוב חוויית משתמש (UX/UI), דרך פיתוח Full Stack ב-React ו-TypeScript, ועד דאטהבייס, אינטגרציות ו-SEO טכני.
        </p>

        <h2 className="font-display text-[1.8rem] mt-12 mb-4">מה אני בונה</h2>
        <ul className="list-disc pr-6 space-y-2 text-[var(--silver)]">
          <li><strong className="text-[var(--white)]">אתרי תדמית</strong> לעסקים קטנים, בעלי מקצוע ופרילנסרים — מהיר לעלייה לאוויר, מותאם מובייל, מותאם גוגל.</li>
          <li><strong className="text-[var(--white)]">חנויות אונליין</strong> ומערכות מכירה — סליקה, מלאי, ניהול הזמנות, אינטגרציה ל-WhatsApp ולמערכת השליחויות.</li>
          <li><strong className="text-[var(--white)]">מערכות Web ו-SaaS</strong> — דאשבורדים, אזורים אישיים, אוטומציות, AI, וכל מה שדורש לוגיקה אמיתית בצד-שרת.</li>
          <li><strong className="text-[var(--white)]">דפי נחיתה</strong> לקמפיינים — A/B testing, מהירות טעינה מתחת ל-1.5 שניות, אופטימיזציה להמרה.</li>
        </ul>

        <h2 className="font-display text-[1.8rem] mt-12 mb-4">איך אני עובד אחרת מבונה אתרים ממוצע</h2>
        <p className="text-[var(--silver)] mb-4">
          רוב בוני האתרים בישראל לוקחים תבנית WordPress, מחליפים צבעים, וקוראים לזה אתר. אני בונה כל אתר מהיסוד, בקוד נקי, עם ארכיטקטורה שמחזיקה לשנים. זה אומר שהאתר שלך נטען מהר יותר, מדורג גבוה יותר בגוגל, מאובטח יותר, ולא נשבר עם כל עדכון של פלאגין.
        </p>
        <p className="text-[var(--silver)] mb-4">
          אני גם מעצב את חוויית המשתמש בעצמי — אז אין פינג-פונג בין מעצב למפתח. אתה מקבל מהמוח האחד גם את ההבנה של הפסיכולוגיה של המבקר באתר, וגם את היכולת לממש אותה בקוד מדויק.
        </p>

        <h2 className="font-display text-[1.8rem] mt-12 mb-4">תהליך העבודה</h2>
        <ol className="list-decimal pr-6 space-y-2 text-[var(--silver)]">
          <li><strong className="text-[var(--white)]">שיחת ייעוץ חינם</strong> — מבינים מה העסק שלך, מי הקהל, ומה הצלחה נראית.</li>
          <li><strong className="text-[var(--white)]">הצעת מחיר וגאנט</strong> — שקוף, ללא הפתעות.</li>
          <li><strong className="text-[var(--white)]">עיצוב ואישור</strong> — מוקאפ, דיון, התאמות.</li>
          <li><strong className="text-[var(--white)]">פיתוח</strong> — בנייה מודולרית עם תצוגה מקדימה בכל שלב.</li>
          <li><strong className="text-[var(--white)]">עלייה לאוויר + SEO</strong> — חיבור דומיין, Search Console, Analytics, מהירות.</li>
          <li><strong className="text-[var(--white)]">תחזוקה</strong> — חודש ראשון על חשבון הבית.</li>
        </ol>

        <h2 className="font-display text-[1.8rem] mt-12 mb-4">למה זה משתלם דווקא אצלי</h2>
        <p className="text-[var(--silver)] mb-4">
          לא רק שאני בונה אתר — אני מבטיח שהוא יביא לקוחות. אופטימיזציה ל-SEO, מהירות, נגישות (תקן ישראלי 5568), Schema.org, ו-Open Graph נקיים מובנים בכל פרויקט מהיום הראשון. זה לא תוסף; זה חלק מהבסיס.
        </p>

        <div className="mt-16 p-6 border border-[var(--border-purple)] bg-[var(--purple-dim)]">
          <h2 className="font-display text-[1.6rem] mb-3">מוכן להתחיל?</h2>
          <p className="text-[var(--silver)] mb-4">שיחת ייעוץ חינם של 20 דקות, ללא מחויבות.</p>
          <div className="flex flex-wrap gap-3 font-mono text-[0.8rem] tracking-[0.2em] uppercase">
            <a href="https://wa.me/972546969367?text=%D7%90%D7%94%D7%9C%D7%9F%20%D7%9C%D7%99%D7%90%D7%9C%2C%20%D7%90%D7%A0%D7%99%20%D7%A4%D7%95%D7%A0%D7%94%20%D7%91%D7%A7%D7%A9%D7%A8%20%D7%9C%D7%A4%D7%99%D7%AA%D7%95%D7%97%20%D7%9E%D7%A2%D7%A8%D7%9B%D7%AA%20%D7%9E%D7%95%D7%AA%D7%90%D7%9E%D7%AA%20%D7%90%D7%99%D7%A9%D7%99%D7%AA." className="bg-[var(--purple)] hover:bg-[var(--purple-hover)] text-white px-5 py-3">WhatsApp</a>
            <a href="mailto:lielwa2004@gmail.com?subject=בניית אתר" className="border border-[var(--border-purple)] text-[var(--purple-light)] hover:bg-[var(--purple-dim)] px-5 py-3">Email</a>
            <Link to="/" className="border border-[var(--border)] text-[var(--silver)] hover:text-[var(--white)] px-5 py-3">חזרה לבית</Link>
          </div>
        </div>
      </article>
    </WorldShell>
  );
}
