import { createFileRoute } from "@tanstack/react-router";
import { WorldShell } from "@/components/worlds/WorldShell";
import { WorldCopy, type WorldBlock } from "@/components/worlds/WorldCopy";
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

const WEB_BLOCKS: WorldBlock[] = [
  { type: "crumb", current: { he: "בניית אתרים", en: "Web" } },
  { type: "h1", text: { he: "בונה אתרים, מפתח Full Stack ומעצב UX/UI בירושלים", en: "Web developer, full-stack engineer and UX/UI designer in Jerusalem" } },
  { type: "lead", text: { he: "אני ליאל ווינברג — בונה אתרים ומערכות אינטרנט מהירים, מדויקים ויפים. אני לוקח פרויקט מאפס ועד עלייה לאוויר: מאסטרטגיה ועיצוב חוויית משתמש (UX/UI), דרך פיתוח Full Stack ב-React ו-TypeScript, ועד דאטהבייס, אינטגרציות ו-SEO טכני.", en: "I am Liel Wainberg — I build fast, precise websites and web systems. I take a project from zero to launch: strategy and UX/UI, full-stack development in React and TypeScript, then databases, integrations and technical SEO." } },
  { type: "h2", text: { he: "מה אני בונה", en: "What I build" } },
  {
    type: "points",
    items: [
      { title: { he: "אתרי תדמית", en: "Brochure sites" }, body: { he: "לעסקים קטנים, בעלי מקצוע ופרילנסרים — מהיר לעלייה לאוויר, מותאם מובייל, מותאם גוגל.", en: "For small businesses, trades and freelancers — fast to launch, mobile-first, built for search." } },
      { title: { he: "חנויות אונליין", en: "Online stores" }, body: { he: "סליקה, מלאי, ניהול הזמנות, אינטגרציה ל-WhatsApp ולמערכת השליחויות.", en: "Payments, inventory, order management, WhatsApp and delivery integrations." } },
      { title: { he: "מערכות Web ו-SaaS", en: "Web systems and SaaS" }, body: { he: "דאשבורדים, אזורים אישיים, אוטומציות, AI, וכל מה שדורש לוגיקה אמיתית בצד-שרת.", en: "Dashboards, private areas, automations, AI, and anything that needs real server logic." } },
      { title: { he: "דפי נחיתה", en: "Landing pages" }, body: { he: "A/B testing, מהירות טעינה מתחת ל-1.5 שניות, אופטימיזציה להמרה.", en: "A/B testing, load speed under 1.5 seconds, conversion-focused." } },
    ],
  },
  { type: "h2", text: { he: "איך אני עובד אחרת מבונה אתרים ממוצע", en: "How the work is different" } },
  { type: "p", text: { he: "רוב בוני האתרים בישראל לוקחים תבנית WordPress, מחליפים צבעים, וקוראים לזה אתר. אני בונה כל אתר מהיסוד, בקוד נקי, עם ארכיטקטורה שמחזיקה לשנים. זה אומר שהאתר שלך נטען מהר יותר, מדורג גבוה יותר בגוגל, מאובטח יותר, ולא נשבר עם כל עדכון של פלאגין.", en: "Most site builders in Israel take a WordPress template, change the colours, and call it a site. I build each site from the ground up, in clean code, with architecture that holds for years. That means it loads faster, ranks better, stays more secure, and does not break with every plugin update." } },
  { type: "p", text: { he: "אני גם מעצב את חוויית המשתמש בעצמי — אז אין פינג-פונג בין מעצב למפתח. אתה מקבל מהמוח האחד גם את ההבנה של הפסיכולוגיה של המבקר באתר, וגם את היכולת לממש אותה בקוד מדויק.", en: "I also design the user experience myself, so there is no ping-pong between designer and developer. You get one mind that understands the visitor and can implement that understanding in precise code." } },
  { type: "h2", text: { he: "תהליך העבודה", en: "How the work runs" } },
  {
    type: "steps",
    items: [
      { title: { he: "שיחת ייעוץ חינם", en: "A free consult" }, body: { he: "מבינים מה העסק שלך, מי הקהל, ומה הצלחה נראית.", en: "We understand the business, the audience, and what success looks like." } },
      { title: { he: "הצעת מחיר וגאנט", en: "Quote and timeline" }, body: { he: "שקוף, ללא הפתעות.", en: "Transparent, without surprises." } },
      { title: { he: "עיצוב ואישור", en: "Design and approval" }, body: { he: "מוקאפ, דיון, התאמות.", en: "Mockup, discussion, adjustments." } },
      { title: { he: "פיתוח", en: "Build" }, body: { he: "בנייה מודולרית עם תצוגה מקדימה בכל שלב.", en: "Modular construction with a preview at every stage." } },
      { title: { he: "עלייה לאוויר + SEO", en: "Launch and SEO" }, body: { he: "חיבור דומיין, Search Console, Analytics, מהירות.", en: "Domain, Search Console, Analytics, speed." } },
      { title: { he: "תחזוקה", en: "Care" }, body: { he: "חודש ראשון על חשבון הבית.", en: "The first month is included." } },
    ],
  },
  { type: "h2", text: { he: "למה זה משתלם דווקא אצלי", en: "Why this is worth it" } },
  { type: "p", text: { he: "לא רק שאני בונה אתר — אני מבטיח שהוא יביא לקוחות. אופטימיזציה ל-SEO, מהירות, נגישות (תקן ישראלי 5568), Schema.org, ו-Open Graph נקיים מובנים בכל פרויקט מהיום הראשון. זה לא תוסף; זה חלק מהבסיס.", en: "I do not only build a site — I make sure it can bring clients. SEO, speed, accessibility (Israeli standard 5568), Schema.org and clean Open Graph are built into every project from day one. That is not an add-on; it is the base." } },
  {
    type: "cta",
    title: { he: "מוכן להתחיל?", en: "Ready to start?" },
    text: { he: "שיחת ייעוץ חינם של 20 דקות, ללא מחויבות.", en: "A free 20-minute consult, with no obligation." },
    waHref: "https://wa.me/972546969367?text=%D7%90%D7%94%D7%9C%D7%9F%20%D7%9C%D7%99%D7%90%D7%9C%2C%20%D7%90%D7%A0%D7%99%20%D7%A4%D7%95%D7%A0%D7%94%20%D7%91%D7%A7%D7%A9%D7%A8%20%D7%9C%D7%A4%D7%99%D7%AA%D7%95%D7%97%20%D7%9E%D7%A2%D7%A8%D7%9B%D7%AA%20%D7%9E%D7%95%D7%AA%D7%90%D7%9E%D7%AA%20%D7%90%D7%99%D7%A9%D7%99%D7%AA.",
    mailHref: "mailto:lielwa2004@gmail.com?subject=בניית אתר",
  },
];

function WebPage() {
  return (
    <WorldShell world="digital">
      <article className="world-article">
        <WorldCopy blocks={WEB_BLOCKS} />
      </article>
    </WorldShell>
  );
}
