import { createFileRoute, Link } from "@tanstack/react-router";
import { WorldShell } from "@/components/worlds/WorldShell";
import { WorldCopy, type WorldBlock } from "@/components/worlds/WorldCopy";
import canineAsset from "@/assets/liel-canine.jpg.asset.json";

const TITLE = "מאלף כלבים בירושלים | התנהגות, ציות, אגרסיביות — ליאל ווינברג";
const DESC =
  "מאלף כלבים מקצועי בירושלים. אילוף ציות, פתרון בעיות התנהגות, אגרסיביות, חרדה, משיכה ברצועה. שיטה חיובית, אינדיבידואלית, ללא כפייה.";
const URL_SELF = "https://lielwainberg.com/dogs";

export const Route = createFileRoute("/dogs")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "מאלף כלבים, אילוף כלבים, מאלף, מאלף כלבים בירושלים, אילוף כלבים בירושלים, אילוף ציות, התנהגות כלבים, פתרון אגרסיביות בכלבים, חרדת נטישה, אילוף גורים, משיכה ברצועה, מאלף פרטי",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: canineAsset.url },
      { name: "twitter:image", content: canineAsset.url },
      { property: "og:locale", content: "he_IL" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL_SELF },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "geo.region", content: "IL-JM" },
      { name: "geo.placename", content: "Jerusalem" },
    ],
    links: [{ rel: "canonical", href: URL_SELF }, { rel: "icon", type: "image/png", sizes: "32x32", href: "/icons/canine-32.png" }, { rel: "apple-touch-icon", sizes: "180x180", href: "/icons/canine-180.png" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "ליאל ווינברג — אילוף כלבים והתנהגות",
          url: URL_SELF,
          areaServed: { "@type": "City", name: "Jerusalem" },
          address: { "@type": "PostalAddress", addressLocality: "Jerusalem", addressCountry: "IL" },
          telephone: "+972546969367",
          priceRange: "$$",
          serviceType: ["אילוף כלבים", "פתרון בעיות התנהגות", "אילוף ציות", "אילוף גורים", "טיפול באגרסיביות"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "בית", item: "https://lielwainberg.com/" },
            { "@type": "ListItem", position: 2, name: "אילוף כלבים", item: URL_SELF },
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
              name: "מאיזה גיל אפשר להתחיל לאלף גור?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "אפשר וכדאי להתחיל מהיום שהגור מגיע הביתה, בסביבות גיל 8 שבועות. תקופת הסוציאליזציה הקריטית היא עד גיל 16 שבועות — מה שלא נחשף אליו אז, יתקשה לקבל בהמשך.",
              },
            },
            {
              "@type": "Question",
              name: "האם אתה עובד עם כלבים אגרסיביים?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "כן. אגרסיביות היא תמיד סימפטום — לחרדה, לכאב, או להיסטוריה לא טובה. אני עובד עם מקור הבעיה, לא רק עם הסימן החיצוני, ובשיטות שלא מחמירות את הפחד.",
              },
            },
            {
              "@type": "Question",
              name: "כמה מפגשים צריך?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "תלוי במקרה. אילוף בסיסי לגור: 4–6 מפגשים. בעיית התנהגות בוגרת: בדרך כלל 6–10 מפגשים בליווי תרגול יומיומי בבית.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: DogsPage,
});

function DogsPage() {
  return (
    <WorldShell world="canine">
      <article className="world-article">
        <nav className="font-mono text-[0.7rem] tracking-[0.25em] uppercase text-[var(--silver-dim)] mb-10">
          <Link to="/" className="hover:text-[var(--purple-light)]">בית</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--purple-light)]">אילוף כלבים</span>
        </nav>

        <h1 className="font-display text-[2.4rem] md:text-[3.4rem] leading-[1.05] mb-6 text-balance">
          מאלף כלבים בירושלים — אילוף, התנהגות, אגרסיביות
        </h1>
        <p className="text-[1.1rem] text-[var(--silver)] mb-12">
          אני ליאל — מאלף כלבים שעובד עם הכלב כפי שהוא, לא עם איזה כלב מדומיין. אני מאמין שאילוף הוא לא תרגיל של "שב/חכה" — זה שפה משותפת שאתה בונה עם הכלב שלך. שיטה מבוססת התנהגות חיובית, ללא צ׳וקרים, ללא כפייה, ועם תוצאות שמחזיקות לטווח ארוך.
        </p>

        <h2 className="font-display text-[1.8rem] mt-12 mb-4">מה אני פותר</h2>
        <ul className="list-disc pr-6 space-y-2 text-[var(--silver)]">
          <li><strong className="text-[var(--white)]">אילוף ציות בסיסי</strong> — שב, חכה, ארצה, ליד, ניתוק מגירוי, חזרה לקריאה.</li>
          <li><strong className="text-[var(--white)]">אילוף גורים</strong> — סוציאליזציה נכונה, גמילה, נשיכות גור, כללי בית.</li>
          <li><strong className="text-[var(--white)]">אגרסיביות</strong> — לכלבים אחרים, לאנשים, אגרסיביות שמירה על אוכל או טריטוריה.</li>
          <li><strong className="text-[var(--white)]">חרדת נטישה</strong> — לימוד הכלב להישאר רגוע לבד, בהדרגה ובשיטה הנכונה.</li>
          <li><strong className="text-[var(--white)]">משיכה ברצועה</strong> — הליכה רגועה בלי שהכלב גורר אותך.</li>
          <li><strong className="text-[var(--white)]">פחדים</strong> — מרעשים, מאנשים זרים, מנסיעה ברכב, מרופא.</li>
        </ul>

        <h2 className="font-display text-[1.8rem] mt-12 mb-4">השיטה שלי</h2>
        <p className="text-[var(--silver)] mb-4">
          כלב לא מתנהג "רע" — הוא מתנהג בהתאם להבנה שלו את הסביבה. התפקיד שלי הוא להבין מה הכלב חושב, מה הוא צריך, ולתת לבעלים את הכלים לתקשר איתו בצורה שעובדת. אני לא משתמש בכפייה, בצ׳וקרים חונקים, או בעונשים פיזיים — לא מסיבות אידיאולוגיות אלא כי זה פשוט פחות יעיל לטווח ארוך.
        </p>
        <p className="text-[var(--silver)] mb-4">
          הסיפור של "צ׳יף", הכלב שלי, הוא הוכחה חיה: כלב שמחקתי איתו את כל הספר על איך כלב "אמור" להתנהג, ולמדתי לקרוא דווקא אותו. זה מה שאני מביא לכל לקוח — בקשב, לא בתבנית.
        </p>

        <h2 className="font-display text-[1.8rem] mt-12 mb-4">איך זה עובד</h2>
        <ol className="list-decimal pr-6 space-y-2 text-[var(--silver)]">
          <li><strong className="text-[var(--white)]">שיחת היכרות חינם</strong> — בטלפון או בוידאו, 15 דקות, מבינים את המצב.</li>
          <li><strong className="text-[var(--white)]">מפגש הערכה בבית</strong> — רואה את הכלב בסביבה שלו, מנתח את הדינמיקה.</li>
          <li><strong className="text-[var(--white)]">תוכנית מותאמת</strong> — לא חבילה גנרית. תוכנית לכלב הזה, למשפחה הזו.</li>
          <li><strong className="text-[var(--white)]">מפגשים שבועיים</strong> — אצלך בבית, בשכונה, או איפה שהבעיה מתרחשת.</li>
          <li><strong className="text-[var(--white)]">ליווי ב-WhatsApp</strong> — בין מפגש למפגש, בלי תוספת תשלום.</li>
        </ol>

        <h2 className="font-display text-[1.8rem] mt-12 mb-4">איזורי שירות</h2>
        <p className="text-[var(--silver)] mb-4">
          ירושלים וסביבותיה. למקרים מיוחדים — נסיעה לכל מקום בארץ.
        </p>

        <div className="mt-16 p-6 border border-[var(--border-purple)] bg-[var(--purple-dim)]">
          <h2 className="font-display text-[1.6rem] mb-3">תיאום שיחת היכרות</h2>
          <p className="text-[var(--silver)] mb-4">ספר לי על הכלב שלך. 15 דקות, ללא עלות, ללא מחויבות.</p>
          <div className="flex flex-wrap gap-3 font-mono text-[0.8rem] tracking-[0.2em] uppercase">
            <a href="https://wa.me/972546969367?text=%D7%90%D7%94%D7%9C%D7%9F%20%D7%9C%D7%99%D7%90%D7%9C%2C%20%D7%90%D7%A0%D7%99%20%D7%A4%D7%95%D7%A0%D7%94%20%D7%91%D7%A7%D7%A9%D7%A8%20%D7%9C%D7%90%D7%99%D7%9C%D7%95%D7%A3%20%D7%9B%D7%9C%D7%91%D7%99%D7%9D." className="bg-[var(--purple)] hover:bg-[var(--purple-hover)] text-white px-5 py-3">WhatsApp</a>
            <a href="mailto:lielwa2004@gmail.com?subject=אילוף כלבים" className="border border-[var(--border-purple)] text-[var(--purple-light)] hover:bg-[var(--purple-dim)] px-5 py-3">Email</a>
            <Link to="/" className="border border-[var(--border)] text-[var(--silver)] hover:text-[var(--white)] px-5 py-3">חזרה לבית</Link>
          </div>
        </div>
      </article>
    </WorldShell>
  );
}
