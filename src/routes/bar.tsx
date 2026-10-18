import { createFileRoute, Link } from "@tanstack/react-router";
import { WorldShell } from "@/components/worlds/WorldShell";
import liquidAsset from "@/assets/liel-shaker.jpg.asset.json";

const TITLE = "ברמן לאירועים בירושלים | בר ניידת, קוקטיילים, חתונות — ליאל ווינברג";
const DESC =
  "ברמן מקצועי לאירועים פרטיים בירושלים: חתונות, מסיבות, ימי הולדת, אירועי חברה. בר נייד, קוקטיילים על מקום, ניהול אופרציית בר מלאה. LW.LIQUID.";
const URL_SELF = "https://lielwainberg.com/bar";

export const Route = createFileRoute("/bar")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "ברמן, ברמן לאירועים, ברמן לחתונה, ברמן בירושלים, בר נייד, בר לאירועים, קוקטיילים לאירוע, ברמן פרטי, אירוח, מסיבה פרטית, LW LIQUID, ניהול בר",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: liquidAsset.url },
      { name: "twitter:image", content: liquidAsset.url },
      { property: "og:locale", content: "he_IL" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL_SELF },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "geo.region", content: "IL-JM" },
      { name: "geo.placename", content: "Jerusalem" },
    ],
    links: [{ rel: "canonical", href: URL_SELF }, { rel: "icon", type: "image/png", sizes: "32x32", href: "/icons/liquid-32.png" }, { rel: "apple-touch-icon", sizes: "180x180", href: "/icons/liquid-180.png" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "LW.LIQUID — ברמן ובר נייד לאירועים",
          url: URL_SELF,
          areaServed: { "@type": "Country", name: "Israel" },
          address: { "@type": "PostalAddress", addressLocality: "Jerusalem", addressCountry: "IL" },
          telephone: "+972546969367",
          priceRange: "$$",
          serviceType: ["ברמן לאירועים", "בר נייד", "קוקטיילים", "ניהול אופרציית בר", "ברמן לחתונה"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "בית", item: "https://lielwainberg.com/" },
            { "@type": "ListItem", position: 2, name: "ברמן לאירועים", item: URL_SELF },
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
              name: "מה כולל שירות ברמן לאירוע?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "ברמן מקצועי, רשימת קוקטיילים מותאמת, בר נייד מעוצב, כוסות, קרח, פירות חיתוך, ובמידת הצורך גם רכישת האלכוהול עבורך. מחיר קבוע מראש, ללא הפתעות.",
              },
            },
            {
              "@type": "Question",
              name: "באילו אירועים אתה עובד?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "חתונות, אירוסין, ימי הולדת 30/40/50, מסיבות פרטיות, אירועי חברה, השקות מוצר, ערבי גיבוש. כל אירוע עד 200 איש מקבל ברמן אחד; מעבר לכך מוסיפים צוות.",
              },
            },
            {
              "@type": "Question",
              name: "מה הזמן המומלץ להזמין מראש?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "לתאריכי שיא (קיץ, חגים, סוף שבוע) — חודש-חודשיים מראש. לאירועים באמצע השבוע — אפילו שבוע מראש מספיק. תאריכי לאחרונה: יש מקום, בא נדבר.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: BarPage,
});

function BarPage() {
  return (
    <WorldShell world="liquid">
      <article className="world-article">
        <nav className="font-mono text-[0.7rem] tracking-[0.25em] uppercase text-[var(--silver-dim)] mb-10">
          <Link to="/" className="hover:text-[var(--purple-light)]">בית</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--purple-light)]">ברמן לאירועים</span>
        </nav>

        <h1 className="font-display text-[2.4rem] md:text-[3.4rem] leading-[1.05] mb-6 text-balance">
          ברמן לאירועים פרטיים — LW.LIQUID
        </h1>
        <p className="text-[1.1rem] text-[var(--silver)] mb-12">
          בר אחד, ברמן אחד, אירוע אחד — ואחריות מלאה על האווירה. אני מביא לאירוע שלך לא רק כוסות וכוהל, אלא ניהול שלם של חוויית השתייה: מאיך שאורח נכנס וקיבל קוקטייל ביד תוך 60 שניות, ועד הסדר המוחלט שנשאר באולם בסוף.
        </p>

        <h2 className="font-display text-[1.8rem] mt-12 mb-4">מה אתה מקבל</h2>
        <ul className="list-disc pr-6 space-y-2 text-[var(--silver)]">
          <li><strong className="text-[var(--white)]">בר נייד מעוצב</strong> — מתקבל ומורכב לפני שאתה והאורחים מגיעים.</li>
          <li><strong className="text-[var(--white)]">תפריט קוקטיילים מותאם</strong> — בוחרים יחד 4–6 חתימות שמתאימות לאירוע ולקהל.</li>
          <li><strong className="text-[var(--white)]">צוות מקצועי</strong> — אני בעצמי, וצוות בהתאם להיקף.</li>
          <li><strong className="text-[var(--white)]">כל הציוד</strong> — שייקרים, כוסות, פירות חיתוך, קרח, מפיות.</li>
          <li><strong className="text-[var(--white)]">רכישת אלכוהול</strong> — אופציה: אני קונה הכל בכמויות נכונות, אתה לא נשאר עם 12 בקבוקי וודקה מיותרים.</li>
        </ul>

        <h2 className="font-display text-[1.8rem] mt-12 mb-4">סוגי אירועים</h2>
        <p className="text-[var(--silver)] mb-4">
          חתונות אינטימיות (30–80 איש), ימי הולדת עגולים, מסיבות גג, אירועי חברה, השקות, ערבי קולקטיב. כל אירוע מקבל יחס פרטני — אין "חבילה סטנדרטית".
        </p>

        <h2 className="font-display text-[1.8rem] mt-12 mb-4">למה דווקא אני</h2>
        <p className="text-[var(--silver)] mb-4">
          אני לא רק ברמן — אני מנהל אופרציות. שנים של עבודה מאחורי הברים הכי עמוסים בירושלים לימדו אותי שאירוע טוב הוא בעצם פרויקט: לוגיסטיקה, תזמון, אנשים, ולחץ. אני יודע להגיע למצב שבו אתה, בעל השמחה, פשוט נהנה — ולא רואה אותי עובד.
        </p>
        <p className="text-[var(--silver)] mb-4">
          וכן — אני גם בונה אתרים. אז אם תרצה גם דף נחיתה לאירוע עם RSVP, אנחנו יכולים לסגור הכל באותו טלפון.
        </p>

        <h2 className="font-display text-[1.8rem] mt-12 mb-4">תפריט לדוגמה</h2>
        <ul className="list-disc pr-6 space-y-2 text-[var(--silver)]">
          <li>Espresso Martini — חתימת הבית</li>
          <li>Aperol Spritz / Hugo Spritz — קל ומרענן</li>
          <li>Old Fashioned / Negroni — לאוהבי הקלאסיקות</li>
          <li>Mojito / Mojito Lychee — לקיץ</li>
          <li>Whiskey Sour — איזון מושלם</li>
          <li>Mocktails — לכל אורח, ללא יוצא דופן</li>
        </ul>

        <div className="mt-16 p-6 border border-[var(--border-purple)] bg-[var(--purple-dim)]">
          <h2 className="font-display text-[1.6rem] mb-3">בודקים תאריך?</h2>
          <p className="text-[var(--silver)] mb-4">תגיד לי תאריך, כמות אורחים ומקום — אני חוזר תוך כמה שעות עם הצעת מחיר.</p>
          <div className="flex flex-wrap gap-3 font-mono text-[0.8rem] tracking-[0.2em] uppercase">
            <a href="https://wa.me/972546969367?text=%D7%90%D7%94%D7%9C%D7%9F%20%D7%9C%D7%99%D7%90%D7%9C%2C%20%D7%90%D7%A0%D7%99%20%D7%A4%D7%95%D7%A0%D7%94%20%D7%91%D7%A7%D7%A9%D7%A8%20%D7%9C%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99%20%D7%91%D7%A8%D7%9E%D7%9F%20%D7%9C%D7%90%D7%99%D7%A8%D7%95%D7%A2." className="bg-[var(--purple)] hover:bg-[var(--purple-hover)] text-white px-5 py-3">WhatsApp</a>
            <a href="mailto:lielwa2004@gmail.com?subject=ברמן לאירוע" className="border border-[var(--border-purple)] text-[var(--purple-light)] hover:bg-[var(--purple-dim)] px-5 py-3">Email</a>
            <Link to="/" className="border border-[var(--border)] text-[var(--silver)] hover:text-[var(--white)] px-5 py-3">חזרה לבית</Link>
          </div>
        </div>
      </article>
    </WorldShell>
  );
}
