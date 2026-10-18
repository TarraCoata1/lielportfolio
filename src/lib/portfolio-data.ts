/**
 * ============================================================
 *  PORTFOLIO DATA MODEL — v2 (Case-Study ready)
 * ============================================================
 *  Content invariant: everything below is derived from information
 *  the user already published about each project. No invented
 *  metrics, no fabricated client quotes.
 * ============================================================
 */

import magenAsset from "@/assets/magen-netivim-site.png.asset.json";
import tziutzimAsset from "@/assets/kesem-tzvaim-site.png.asset.json";
import dairyAsset from "@/assets/dairy-corner.png.asset.json";
import dorAsset from "@/assets/dor-preview.png.asset.json";
import tarracoataAsset from "@/assets/tarracoata-preview.png.asset.json";
import abramovAsset from "@/assets/abramov-preview.png.asset.json";
import yanAsset from "@/assets/yan-preview.png.asset.json";
import xyAsset from "@/assets/xy-preview.png.asset.json";
import divinaAsset from "@/assets/divina-maison-preview.png.asset.json";
import tarracoataStudioAsset from "@/assets/tarracoata-studio-preview.png.asset.json";
import elishayAsset from "@/assets/elishay-fitness-preview.png.asset.json";
import reutAsset from "@/assets/reut-preview.jpg.asset.json";
import abramovCoreAsset from "@/assets/abramov-core-preview.png.asset.json";
import yahalomAsset from "@/assets/yahalom-preview.png.asset.json";
import tzitzuimAsset from "@/assets/tzitzuim-preview.png.asset.json";
import emsAsset from "@/assets/ems-impact-preview.png.asset.json";
import grizzlyAsset from "@/assets/grizzly-preview.png.asset.json";
import hebrewBrillianceAsset from "@/assets/hebrew-brilliance-preview.jpg.asset.json";
import manduAsset from "@/assets/mandu-preview.png.asset.json";

export type LocalizedString = { he: string; en: string };

export type ProjectFamily =
  | "web"
  | "brand"
  | "ecommerce"
  | "business"
  | "nightlife";

export const FAMILY_LABELS: Record<ProjectFamily, LocalizedString> = {
  web: { he: "אתרים · UX·UI", en: "Web · UX/UI" },
  brand: { he: "מיתוג · פרימיום", en: "Brand · Premium" },
  ecommerce: { he: "מסחר אלקטרוני", en: "E-Commerce" },
  business: { he: "עסקים · B2B", en: "Business · B2B" },
  nightlife: { he: "לילה · תרבות", en: "Nightlife · Culture" },
};

export type Project = {
  id: string;
  n: string;
  name: LocalizedString;
  category: LocalizedString;
  description: LocalizedString;
  tags: string[];
  image: string;
  liveUrl?: string | null;
  staticFilePath?: string | null;
  badge?: LocalizedString;

  // Case-study extensions
  family: ProjectFamily;
  year: string;
  role: LocalizedString;
  overview: LocalizedString;
  features: LocalizedString[];
  technologies: string[];
  testimonialClient?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "magen-netivim",
    n: "01",
    name: { he: "מגן נתיבים", en: "Magen Netivim" },
    category: { he: "הסדרי תנועה ובטיחות · נוכחות דיגיטלית", en: "Traffic & Road Safety · Digital Presence" },
    description: {
      he: "אתר תדמית לחברת הסדרי תנועה, בטיחות ותמרור הפועלת בחיפה, בקריות ובצפון. הצגת שמונה שירותים מרכזיים — מהסדרי תנועה והשכרת ציוד ועד צביעת כבישים, מגרשים וסימוני בטיחות — עם דגש על זמינות 24/7 והנעה מהירה לקבלת הצעת מחיר.",
      en: "A showcase site for a traffic-arrangements, safety and signage company operating in Haifa, the Krayot and northern Israel. Presents eight core services — traffic plans, safety-equipment rentals, road & parking painting, sports courts and safety markings — with 24/7 availability and a fast path to a quote request.",
    },
    tags: ["Services", "B2B", "Road Safety"],
    image: magenAsset.url,
    liveUrl: "https://tarracoatamagennetivim.lovable.app",
    family: "business",
    year: "2025",
    role: { he: "עיצוב · פיתוח · SEO", en: "Design · Development · SEO" },
    overview: {
      he: "בניית נוכחות דיגיטלית ראשונה לחברת שירותי תנועה ובטיחות. המטרה: לתרגם ותק שטח לרושם דיגיטלי מקצועי, ולהמיר גולש לפניית הצעת מחיר תוך שנייה.",
      en: "First digital presence for a traffic-and-safety services company. Goal: translate field experience into a professional digital impression and turn a visitor into a quote request within seconds.",
    },
    features: [
      { he: "מפרט שמונה שירותים (הסדרי תנועה, השכרת ציוד, תמרור, צביעת כבישים, חניונים, מגרשי ספורט, סימוני בטיחות, פינוי חניות)", en: "Eight-service catalog (traffic plans, safety gear rental, signage, road painting, parking lots, sports courts, safety markings, parking evacuations)" },
      { he: "אזור שירותי חירום עם זמינות מיידית", en: "Emergency-services section with immediate availability" },
      { he: "טפסי פנייה והצעת מחיר עם ולידציה", en: "Inquiry and quote-request forms with validation" },
      { he: "SEO ומטא-תגים ממוקדים חיפה והצפון", en: "SEO and meta targeting Haifa and northern Israel" },
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "kesem-shel-tzvaim",
    n: "02",
    name: { he: "קסם של צבעים", en: "Kesem Shel Tzvaim" },
    category: { he: "ציורי פנים · איפור · אירועים", en: "Face Painting · Makeup · Events" },
    description: {
      he: "אתר תדמית לאמנית ציורי פנים ואיפור לאירועים. חוויית מותג צבעונית וידידותית להורים, עם קטלוג שירותים ומחירים שקוף (ציורי פנים, קעקועי נצנצים, סדנאות SFX, איפור מקצועי וסדנאות איפור אישיות/קבוצתיות) וחבילה משולבת ליום הולדת.",
      en: "A showcase site for a face-painting and event-makeup artist. A colorful, parent-friendly brand experience with a transparent service & pricing catalog (face painting, glitter tattoos, SFX workshops, professional touch-up makeup, private/group makeup workshops) plus a combined birthday package.",
    },
    tags: ["Events", "Brand", "Pricing UX"],
    image: tziutzimAsset.url,
    liveUrl: "https://ronitwainberg.lovable.app",
    family: "brand",
    year: "2025",
    role: { he: "מיתוג · עיצוב · פיתוח", en: "Brand · Design · Development" },
    overview: {
      he: "מיתוג ואתר לאמנית שעובדת מול הורים ומפיקי אירועים. הפוקוס: לשדר מקצועיות, לתת שקיפות מחירים מוחלטת ולסגור פנייה בגלילה אחת.",
      en: "Branding and site for an artist working with parents and event producers. Focus: project professionalism, offer full pricing transparency, and close an inquiry within a single scroll.",
    },
    features: [
      { he: "קטלוג שירותים ומחירים שקוף עם חבילת יום הולדת משולבת", en: "Transparent service & pricing catalog with a combined birthday package" },
      { he: "אזור המלצות הורים וגלריית עבודות", en: "Parent-review section and works gallery" },
      { he: "הדגשת חומרים היפואלרגניים ועבודה מקצועית", en: "Emphasis on hypoallergenic materials and professional work" },
      { he: "CTA להזמנה מכל אזור באתר", en: "Booking CTA reachable from every section" },
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    testimonialClient: "רונית",
  },
  {
    id: "dairy-corner",
    n: "03",
    name: { he: "המפגש החלבי", en: "The Dairy Corner" },
    category: { he: "מסעדה כשרה למהדרין · תפריט ומשלוחים", en: "Mehadrin Kosher Restaurant · Menu & Delivery" },
    description: {
      he: "אתר ויטרינה למסעדה חלבית כשרה למהדרין במגדל העמק. תפריט דיגיטלי מסודר (מיוחדים, כריכים, מוקפצים, סלטים ושתייה) עם מחירים גלויים, פרטי משלוחים ושיחת הזמנה בלחיצה — עיצוב חם וברור לפלאפון תחילה.",
      en: "A showcase site for a Mehadrin-kosher dairy kitchen in Migdal HaEmek. A structured digital menu (specials, sandwiches, stir-fries, salads, drinks) with visible pricing, delivery details and one-tap ordering — a warm, mobile-first design.",
    },
    tags: ["Restaurant", "Digital Menu", "Local"],
    image: dairyAsset.url,
    liveUrl: "https://dairycorner.lovable.app",
    family: "brand",
    year: "2025",
    role: { he: "עיצוב · פיתוח · חוויית משתמש", en: "Design · Development · UX" },
    overview: {
      he: "שדרוג הנוכחות של מסעדה מקומית — הפיכת גולש רעב ללקוח מזמין. פוקוס על מבנה תפריט קריא, מחירים גלויים ושיחת טלפון בלחיצה.",
      en: "A digital upgrade for a local kitchen — turning a hungry visitor into an ordering customer. Focus on a readable menu structure, visible prices, and a one-tap phone call.",
    },
    features: [
      { he: "תפריט דיגיטלי מלא עם מחירים והרכבי מנות", en: "Full digital menu with prices and dish compositions" },
      { he: "אזור \"המיוחדים\" מודגש בראש הדף", en: "Highlighted \"Specials\" section at the top of the page" },
      { he: "פרטי משלוחים והזמנות עם קליק-לחיוג", en: "Delivery & ordering details with click-to-call" },
      { he: "כפתור החלפת שפה HE/EN", en: "HE/EN language toggle" },
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    testimonialClient: "המפגש החלבי",
  },
  {
    id: "dor-hadad",
    n: "04",
    name: { he: "דור חדד — DJ", en: "Dor Hadad — DJ" },
    category: { he: "דיג'יי לאירועים · מיתוג בימה", en: "Event DJ · Stage Branding" },
    description: {
      he: "אתר תדמית לדיג'יי דור חדד — חתונות, אירועים עסקיים והשקות, מסיבות פרטיות ומועדונים. חוויה קולנועית עם גלריית רחבה, המלצות לקוחות, נגן טראקים והנעה ישירה להצעת מחיר.",
      en: "A showcase site for DJ Dor Hadad — weddings, corporate events & launches, private parties and clubs. A cinematic experience with a dance-floor gallery, client testimonials, a track player and a direct path to a quote.",
    },
    tags: ["Nightlife", "Personal Brand", "Events"],
    image: dorAsset.url,
    liveUrl: "https://djdorhadad.lovable.app",
    family: "nightlife",
    year: "2025",
    role: { he: "מיתוג · עיצוב · פיתוח", en: "Brand · Design · Development" },
    overview: {
      he: "בניית זהות דיגיטלית לאמן במה שמקבל את רוב הפניות מרשתות. השנייה הראשונה חייבת להעביר אנרגיה, והשנייה השנייה כבר להוביל להצעת מחיר.",
      en: "Digital identity for a stage artist whose leads mostly arrive from social. The first second has to project energy; the second one already has to steer the visitor toward a quote.",
    },
    features: [
      { he: "ארבעה סוגי אירועים ממופים (חתונות, עסקי, פרטי, מועדונים/פסטיבלים)", en: "Four mapped event categories (weddings, corporate, private, clubs/festivals)" },
      { he: "נגן טראקים לדוגמה מובנה בדף", en: "Embedded sample-track player on the page" },
      { he: "גלריית רחבה, אזור המלצות ופרטי יצירת קשר ישירים", en: "Dance-floor gallery, testimonial section and direct contact details" },
      { he: "טופס הצעת מחיר ממוקד המרה", en: "Conversion-focused quote form" },
    ],
    technologies: ["React", "TypeScript", "Framer Motion"],
    testimonialClient: "דור חדד",
  },
  {
    id: "tarracoata",
    n: "05",
    name: { he: "TarraCoata", en: "TarraCoata" },
    category: { he: "אתרים · אוטומציות · AI לעסקים", en: "Websites · Automation · Business AI" },
    description: {
      he: "אתר תדמית של סוכנות TarraCoata — פיתוח אתרים מותאמים אישית ומערכות AI ואוטומציה לעסקים. מציג שמונה סוגי מוצרים (דף נחיתה, אתר עסקי, קורפורט, קביעת תורים, חנות, פורטל, AI, ייעוץ), תהליך עבודה מסודר, תיק פרויקטים, שאלות ותשובות ו-CTA לפגישת ייעוץ.",
      en: "The agency site for TarraCoata — custom websites and AI-automation systems for business. Presents eight product types (landing page, business site, corporate, booking, e-commerce, portal, AI, consulting), a structured process, a project index, an FAQ and a consultation CTA.",
    },
    tags: ["Full Stack", "AI", "Automation"],
    image: tarracoataAsset.url,
    liveUrl: "https://tarracoata.lovable.app",
    family: "business",
    year: "2025",
    role: { he: "מיתוג · עיצוב · פיתוח · בעלות מוצר", en: "Brand · Design · Development · Product Ownership" },
    overview: {
      he: "אתר התדמית של הסוכנות שלי — הכרטיס הראשון שלקוחות רואים. חייב לשדר יכולת, אמינות ורמת גימור מהשנייה הראשונה, ולהוביל לפגישת ייעוץ.",
      en: "The agency's own showcase — the first thing prospective clients see. It has to project capability, trust and finish from the first second, and steer visitors into a consultation.",
    },
    features: [
      { he: "מפרט שמונה שירותים עם ערך מדיד לכל אחד", en: "Eight-service catalog with a measurable outcome per service" },
      { he: "תהליך עבודה שקוף וסקציית תיק פרויקטים", en: "Transparent process flow and portfolio section" },
      { he: "שאלות ותשובות, המלצות לקוחות ו-CTA לייעוץ", en: "FAQ, client testimonials and a consultation CTA" },
      { he: "תמיכה דו-לשונית עברית/אנגלית", en: "Bilingual Hebrew/English support" },
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "abramov",
    n: "06",
    name: { he: "אברמוב · התזת בטון (v1)", en: "Abramov · Shotcrete (v1)" },
    category: { he: "הנדסת בטון · אתר תדמית", en: "Concrete Engineering · Showcase Site" },
    description: {
      he: "אתר תדמית ראשון לחברת אברמוב התזת בטון ושיקום בטונים בע\"מ (מגדל העמק, פעילות ארצית). מציג ארבעה שירותי ליבה (התזת בטון וגנייט, התזה יבשה, שיקום בטון מבני, יישום סיקה 107/720), פרויקטים נבחרים בתחומי תשתיות, מנהרות, בריכות ותמ\"א 38, וטופס תיאום הנדסי.",
      en: "The first showcase site for Abramov Shotcrete & Concrete Rehabilitation Ltd. (Migdal HaEmek, nationwide activity). Presents four core services (shotcrete & gunite, dry spraying, structural concrete rehab, Sika 107/720 application), selected projects in infrastructure, tunnels, water reservoirs and TAMA 38, and an engineering-consultation form.",
    },
    tags: ["Industrial", "B2B", "Engineering"],
    image: abramovAsset.url,
    liveUrl: "https://yaconcrete.lovable.app",
    family: "business",
    year: "2025",
    role: { he: "עיצוב · פיתוח · SEO", en: "Design · Development · SEO" },
    overview: {
      he: "אתר B2B ראשון לחברת אברמוב — שפה תעשייתית כבדה, מבנה שירותים מדויק ומסלול פנייה מהיר לקבלנים ראשיים ומנהלי פרויקטים.",
      en: "First B2B site for Abramov — a heavy industrial voice, a precise services structure, and a fast inquiry path for general contractors and project managers.",
    },
    features: [
      { he: "ארבעה שירותי ליבה עם מפרטים טכניים (Shotcrete, Gunite, Dry Spray, Sika)", en: "Four core services with technical specs (Shotcrete, Gunite, Dry Spray, Sika systems)" },
      { he: "אזור התמחות: תעלות/מאגרים, מנהרות, חיפוי הרים, תמ\"א 38, בטון חסין אש", en: "Specialization areas: channels/reservoirs, tunnels, mountain lining, TAMA 38, fire-proof concrete" },
      { he: "תיק פרויקטים נבחרים (מאגרי מים, שיקום בניין מגורים)", en: "Selected-projects showcase (water reservoirs, residential-building rehab)" },
      { he: "טופס תיאום הנדסי וייעוץ ראשוני", en: "Engineering-coordination and initial-consultation form" },
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "yan-tattoo",
    n: "07",
    name: { he: "YAN Tattoo Studio", en: "YAN Tattoo Studio" },
    category: { he: "אמנית קעקועים · Fine Line ואורנמנט", en: "Tattoo Artist · Fine Line & Ornamental" },
    description: {
      he: "אתר תדמית פרימיום לאמנית קעקועים YAN (נוסד 2018) — Fine Line, פרחוני/בוטני, מינימליזם ואורנמנטלי. גלריית שמונה עבודות אוצרות, סקציית סטודיו ובקשת חוויה אמנותית באמצעות טופס מועמדות אישי (בתיאום בלבד). דו-לשוני עברית/אנגלית.",
      en: "A premium showcase for tattoo artist YAN (est. 2018) — Fine Line, botanical/floral, minimalism and ornamental. A curated eight-piece gallery, a studio section and an application-based request for an artistic experience (by appointment only). Bilingual HE/EN.",
    },
    tags: ["Luxury", "Fine Line", "Editorial"],
    image: yanAsset.url,
    liveUrl: "https://yantattoo.lovable.app",
    family: "brand",
    year: "2025",
    role: { he: "מיתוג · עיצוב · פיתוח", en: "Brand · Design · Development" },
    overview: {
      he: "מיתוג מלא לסטודיו קעקועים בסגנון Fine Line שמעביר עבודה בהזמנה בלבד. הפוקוס: אוצרות של תיק העבודות ומסננת מועמדים דרך טופס אישי.",
      en: "Full branding for a Fine-Line studio that works by application only. Focus: a curated portfolio and a candidate filter through a personal application form.",
    },
    features: [
      { he: "גלריית שמונה יצירות אוצרות עם קטגוריות (קו דק, בוטני, מינימליזם, אורנמנטלי, עיצוב אישי)", en: "Curated eight-piece gallery with categories (Fine Line, Botanical, Minimalism, Ornamental, Custom)" },
      { he: "טופס הגשת מועמדות למפגש (בתיאום אישי בלבד)", en: "Session-application form (by appointment only)" },
      { he: "אזור סטודיו וסיפור המותג בטון אדיטוריאלי", en: "Studio & brand-story section in an editorial tone" },
      { he: "החלפת שפה HE/EN", en: "HE/EN language toggle" },
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "xy-marketing",
    n: "08",
    name: { he: "XY Marketing", en: "XY Marketing" },
    category: { he: "סטודיו יצירתי · מיצוב שוק ותוכן וידאו", en: "Creative Studio · Market Positioning & Video Content" },
    description: {
      he: "אתר תדמית לסטודיו יצירתי סלקטיבי בהובלת יהונתן חיים אברמוב. המיצוב: לא סוכנות שמריצה מודעות — סטודיו שבונה מיצוב שוק באמצעות תוכן וידאו אותנטי שיוצר טרנדים, לא משחזר אותם. מציג חמישה עקרונות, שבעה שלבי תהליך, אזור Originals והמלצות מייסדים.",
      en: "A showcase site for a selective creative studio led by Yehonatan Chaim Abramov. Positioning: not an ad-buying agency — a studio that builds market positioning through authentic video content that creates trends rather than recycling them. Presents five principles, a seven-step process, an Originals section, and founder testimonials.",
    },
    tags: ["Brand Strategy", "Video Content", "Positioning"],
    image: xyAsset.url,
    liveUrl: "https://xymarketing.lovable.app",
    family: "business",
    year: "2025",
    role: { he: "עיצוב · פיתוח · שפה מותגית", en: "Design · Development · Brand Voice" },
    overview: {
      he: "אתר סוכנות מיתוג שהאתר עצמו הוא ההוכחה. מבנה שמעביר מיצוב חד, ערכים ותהליך — ומסנן את הלקוחות שלא מתאימים לו.",
      en: "A branding-agency site where the site itself is the proof. Structure that projects a sharp positioning, principles and process — and filters out clients who don't fit.",
    },
    features: [
      { he: "חמישה עקרונות מוצהרים (בלי מיחזור טרנדים, בלי העתק-הדבק, בלי קמפיינים מתבניתיים ועוד)", en: "Five declared principles (no trend recycling, no copy-paste, no template campaigns, and more)" },
      { he: "אזור Originals — יצירות דגל של הסוכנות", en: "Originals section — the studio's flagship pieces" },
      { he: "תהליך עבודה בשבעה שלבים ללא קיצורי דרך", en: "Seven-step process with no shortcuts" },
      { he: "מספרים מאחורי המיצוב + המלצות מייסדים ומנהלים", en: "Positioning-metrics section + founder/executive testimonials" },
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "reut-jewelry",
    n: "09",
    name: { he: "Reut Jewelry", en: "Reut Jewelry" },
    category: { he: "תכשיטים · חנות אונליין פרימיום", en: "Jewelry · Premium E-Commerce" },
    description: {
      he: "פלטפורמת מסחר אלקטרוני יוקרתית לתכשיטים עם CMS מותאם ולוח בקרה מתקדם. חוויה ברמת מותגי הפרימיום העולמיים — נקייה, מודרנית וממוקדת המרה.",
      en: "A luxury jewelry e-commerce platform with a custom CMS and an advanced admin dashboard. An experience on par with global premium brands — clean, modern and conversion-focused.",
    },
    tags: ["E-Commerce", "Luxury", "Admin CMS"],
    image: reutAsset.url,
    liveUrl: null,
    family: "ecommerce",
    year: "2025",
    role: { he: "עיצוב · פיתוח · CMS · לוח בקרה", en: "Design · Development · CMS · Admin Dashboard" },
    overview: {
      he: "בניית פלטפורמת דגל למותג תכשיטים — חנות אונליין וניהול קטלוג ברמת Tiffany / Swarovski. חוויית קנייה חלקה, ניהול מוצרים מלא ומיתוג יוקרתי. הפרויקט טרם פורסם באופן ציבורי.",
      en: "A flagship platform for a jewelry brand — an online store and catalog management on a Tiffany / Swarovski level. Seamless purchase experience, full product management, luxury branding. Project is not yet publicly published.",
    },
    features: [
      { he: "קטלוג מוצרים מלא עם קטגוריות ותת-קטגוריות", en: "Full product catalog with categories and sub-categories" },
      { he: "לוח בקרה מתקדם לניהול מלאי והזמנות", en: "Advanced admin dashboard for inventory and orders" },
      { he: "עמודי מוצר עשירים עם גלריות וריאציות", en: "Rich product pages with gallery and variant support" },
      { he: "חוויית תשלום ומעקב הזמנות", en: "Checkout and order-tracking flow" },
    ],
    technologies: ["React", "TypeScript", "TanStack Start", "Tailwind CSS"],
  },
  {
    id: "abramov-core",
    n: "10",
    name: { he: "Abramov · Structural Engineering (v2)", en: "Abramov · Structural Engineering (v2)" },
    category: { he: "הנדסת בטון · פלטפורמת דגל B2B", en: "Structural Engineering · B2B Flagship" },
    description: {
      he: "פלטפורמת דגל דיגיטלית שנייה של אברמוב — התזות בטון בשיטה יבשה בלבד, שיקום מבנים והידרו-דמוליציה. אתר מוסדי המציג שלוש דיסציפלינות הנדסיות, חמישה שלבי ביצוע, קייסים מוסדיים (שיקום גשר איילון, חיפוי מנהרת כרמל), התאמה לתקן EN 1504 ויישום מעל 20 מערכות Sika. פועלים משנת 2000, מעל 20 שנות ניסיון.",
      en: "The second digital flagship for Abramov — dry-method shotcrete only, structural rehabilitation and hydro-demolition. An institutional site presenting three engineering disciplines, five execution phases, institutional case studies (Ayalon Bridge rehab, Carmel Tunnel lining), EN 1504 compliance and 20+ Sika systems applied. Operating since 2000, 20+ years of experience.",
    },
    tags: ["B2B", "Engineering", "Institutional"],
    image: abramovCoreAsset.url,
    liveUrl: "https://y-a-concrete-spray.lovable.app",
    family: "business",
    year: "2025",
    role: { he: "ארכיטקטורה · עיצוב · פיתוח", en: "Architecture · Design · Development" },
    overview: {
      he: "גרסה שנייה, מדויקת יותר, לנוכחות הדיגיטלית של אברמוב — שפה של פירמת הנדסה, לא של קבלן שטח. הפוקוס: להוציא את מנהלי הפרויקטים מ-\"כמה זה?\" ל-\"בואו נדבר על המפרט\".",
      en: "A second, more precise version of Abramov's digital presence — the voice of an engineering firm, not a field contractor. Focus: move project managers from \"what does it cost?\" to \"let's talk about the spec\".",
    },
    features: [
      { he: "שלוש דיסציפלינות ליבה (שוטקריט, שיקום מבנים, הידרו-דמוליציה) עם מפרטי עובי, קצב יישום ותקנים", en: "Three core disciplines (Shotcrete, Structural Rehab, Hydro-demolition) with thickness, throughput and standards specs" },
      { he: "חמישה שלבי ביצוע (אבחון, תכנון, הכנת שטח, ביצוע, בקרת איכות ומסירה)", en: "Five execution phases (diagnosis, planning, surface prep, execution, QA and handover)" },
      { he: "קייסים מוסדיים: גשר איילון, מנהרת כרמל", en: "Institutional case studies: Ayalon Bridge, Carmel Tunnel" },
      { he: "מפרט מערכות Sika שיושמו (20+) והתאמה לתקן EN 1504", en: "Applied Sika-systems ledger (20+) and EN 1504 compliance" },
      { he: "טופס ייעוץ הנדסי המבוסס על גיליון ההנדסי — לא על מחיר", en: "Engineering-consult form built around the engineering brief — not on price" },
    ],
    technologies: ["TanStack Start", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "yahalom-glass",
    n: "11",
    name: { he: "יהלום לבית", en: "Yahalom La Bait" },
    category: { he: "אמנות קיר על זכוכית · חנות אונליין פרימיום", en: "Glass Wall Art · Premium E-Commerce" },
    description: {
      he: "אתר מסחר למותג בוטיק ישראלי המייצר תמונות זכוכית מחוסמת אקסטרה קלירית בהדפסה דיגיטלית ברמת גלריה. הקולקציה כוללת מודרני ומופשט, טבע ונופים, פופ ארט ואופנה, ופסוקים ויודאיקה — לצד שירות הדפסה בעיצוב אישי. ייצור בישראל (מודיעין), משלוח מבוטח עד 14 ימי עסקים.",
      en: "An e-commerce site for an Israeli boutique brand producing extra-clear tempered-glass prints on a gallery-grade digital-print process. Collections include modern/abstract, nature/landscapes, pop art/fashion, and Judaica verses — alongside a custom-print service. Made in Israel (Modi'in), insured shipping within 14 business days.",
    },
    tags: ["E-Commerce", "Luxury", "Made in Israel"],
    image: yahalomAsset.url,
    liveUrl: "https://yahalomlabait.lovable.app",
    family: "ecommerce",
    year: "2025",
    role: { he: "עיצוב · פיתוח · CMS", en: "Design · Development · CMS" },
    overview: {
      he: "פלטפורמה למותג בוטיק שבו כל יצירה נבחרת מתוך הקשבה לחלל של הלקוח. הפוקוס: להשאיר את התמונה עצמה הכוכב הראשי — הממשק משרת אותה בשקט.",
      en: "A platform for a boutique brand where each piece is chosen by listening to the client's space. Focus: keep the artwork itself as the main character — the interface serves it quietly.",
    },
    features: [
      { he: "ארבע קולקציות עיקריות (מודרני, טבע, פופ ארט ואופנה, יודאיקה) + \"עיצוב אישי\"", en: "Four main collections (modern, nature, pop-art & fashion, Judaica) + a \"Custom Design\" service" },
      { he: "עמודי מוצר עם דגש על חומריות הזכוכית (אקסטרה קלירי, חדות צבע)", en: "Product pages emphasizing glass materiality (extra-clear, color sharpness)" },
      { he: "עגלת קנייה, שירות עיצוב אישי ומסלול צור-קשר", en: "Cart, custom-design flow and a contact path" },
      { he: "SEO מלא ומיצוב מותג ישראלי (ייצור במודיעין)", en: "Full SEO and Israeli-brand positioning (produced in Modi'in)" },
    ],
    technologies: ["TanStack Start", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "tzitzuim",
    n: "12",
    name: { he: "ציוצים", en: "Tzitzuim" },
    category: { he: "תזונה פרימיום לחיות אקזוטיות · מסחר אלקטרוני", en: "Premium Exotic-Pet Nutrition · E-Commerce" },
    description: {
      he: "פלטפורמת מסחר למותג פרימיום ישראלי (פועל מ-2020) לתזונת חיות אקזוטיות — ציפורים, תוכים וזוחלים. קטגוריות: ציפורים ותוספים, זוחלים, אבני סידן, פורמולות מיוחדות ומארזי חרקים. מפרטי מוצר עם מינונים ורכיבים פעילים (D3, כורכומין, ספירולינה, סלק).",
      en: "An e-commerce platform for an Israeli premium brand (operating since 2020) in exotic-pet nutrition — parrots, songbirds and reptiles. Categories: birds & supplements, reptiles, calcium stones, special formulas and insect kits. Product specs with dosages and active ingredients (D3, curcumin, spirulina, beetroot).",
    },
    tags: ["E-Commerce", "Product Data", "Made in Israel"],
    image: tzitzuimAsset.url,
    liveUrl: "https://tzitzuim-storefront.lovable.app",
    family: "ecommerce",
    year: "2025",
    role: { he: "מיתוג · עיצוב · פיתוח · CMS", en: "Brand · Design · Development · CMS" },
    overview: {
      he: "מותג פרימיום למזון חיות מחייב מפרטי מוצר מדויקים — לא רק תמונה יפה. הפלטפורמה משלבת חוויית קנייה חמה עם דאטה טהורה: משקל, מינון, רכיב פעיל ומחיר.",
      en: "A premium pet-nutrition brand demands accurate product data — not just a pretty photo. The platform pairs a warm shopping experience with clean data: weight, dosage, active ingredient, price.",
    },
    features: [
      { he: "שש קטגוריות ראשיות (ציפורים, זוחלים, אבני סידן, פורמולות מיוחדות, מארזי חרקים, חדשים)", en: "Six main categories (birds, reptiles, calcium stones, special formulas, insect kits, new arrivals)" },
      { he: "עמודי מוצר עם מינונים, משקל וסימוני 'הנמכר ביותר / מומלץ / חדש'", en: "Product pages with dosages, weight and 'best-seller / recommended / new' badges" },
      { he: "אזור \"מוצרים שלא ויתרנו עליהם\" ומדריכי טיפול", en: "\"Products we didn't compromise on\" section and care guides" },
      { he: "החלפת שפה HE/EN וסיפור מותג ישראלי", en: "HE/EN language toggle and an Israeli brand story" },
    ],
    technologies: ["TanStack Start", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "ems-impact",
    n: "13",
    name: { he: "Portfolio Demo · אתר עסק לדוגמה", en: "Portfolio Demo · Sample Business Site" },
    category: { he: "קייס סטאדי · דמו עיצוב ופיתוח", en: "Case Study · Design & Development Demo" },
    description: {
      he: "פרויקט קייס-סטאדי — אתר עסק לדוגמה בעל עמוד אחד, עם קטלוג מוצרים placeholder, אזור יכולות ופרטי קשר סימולטיביים. משמש להצגת יכולות עיצוב, מבנה ותנועה — ולא מייצג עסק אמיתי. תמיכה בממשק רב-לשוני (HE / EN / AR).",
      en: "A case-study project — a sample single-page business site with a placeholder product catalog, a capabilities section and simulated contact details. Used to showcase design, structure and motion capabilities — it does not represent a real business. Multilingual UI shell (HE / EN / AR).",
    },
    tags: ["Case Study", "One-Pager", "Multilingual"],
    image: emsAsset.url,
    liveUrl: "https://ems-impact-site.lovable.app",
    family: "brand",
    year: "2025",
    role: { he: "עיצוב · פיתוח · תנועה", en: "Design · Development · Motion" },
    overview: {
      he: "דמו עיצוב ופיתוח מלא לאתר עסק חד-עמודי. הפוקוס: להראות ארכיטקטורה של קטלוג, אזור יכולות ומטריקות במבנה שאפשר להלביש עליו כל תעשייה.",
      en: "A full design & development demo of a one-page business site. Focus: show a catalog architecture, a capabilities area and a metrics grid in a structure that can be dressed for any industry.",
    },
    features: [
      { he: "מבנה עמוד אחד עם קטלוג מוצרים לדוגמה, אזור יכולות ומטריקות", en: "Single-page structure with sample catalog, capabilities section and metrics grid" },
      { he: "ממשק רב-לשוני (עברית / אנגלית / ערבית) עם החלפת שפה מלאה", en: "Multilingual UI (Hebrew / English / Arabic) with full language switching" },
      { he: "כל התוכן מסומן במפורש כ-Placeholder / Sample", en: "All content explicitly marked as Placeholder / Sample" },
    ],
    technologies: ["TanStack Start", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "grizzly-gym",
    n: "14",
    name: { he: "Portfolio Demo · אתר חד-עמודי", en: "Portfolio Demo · Single-Page Showcase" },
    category: { he: "קייס סטאדי · אתר חד-עמודי", en: "Case Study · Single-Page Website" },
    description: {
      he: "פרויקט קייס-סטאדי — אתר חד-עמודי לדוגמה עם מבנה מלא של אזור ערכים, שירותים, תפריט, מחירים, גלריה, כלים וטופס יצירת קשר. כל התוכן והתמונות הם Placeholders להצגת שכבת עיצוב ותנועה. תמיכה בממשק רב-לשוני (HE / EN / AR).",
      en: "A case-study project — a sample single-page website with a full structure of values, services, menu, pricing, gallery, tools and contact-form sections. All content and imagery are placeholders demonstrating the design and motion layer. Multilingual UI shell (HE / EN / AR).",
    },
    tags: ["Case Study", "One-Pager", "Multilingual"],
    image: grizzlyAsset.url,
    liveUrl: "https://grizzly-glow-forge.lovable.app",
    family: "brand",
    year: "2025",
    role: { he: "עיצוב · פיתוח · תנועה", en: "Design · Development · Motion" },
    overview: {
      he: "דמו של אתר חד-עמודי ברמת \"מותג-של-מיליונים\" — טיפוגרפיה חזקה, אנימציות מדויקות ומבנה שאפשר להלביש עליו קטלוג / שירותים / תפריט / מחירים לכל תעשייה.",
      en: "A single-page showcase demo at a \"multi-million-dollar-brand\" level — strong typography, precise motion and a structure that can wear a catalog / services / menu / pricing for any industry.",
    },
    features: [
      { he: "שמונה אזורי מבנה (ערכים, שירותים, תפריט, מחירים, גלריה, כלים, מטריקות, יצירת קשר)", en: "Eight structural sections (values, services, menu, pricing, gallery, tools, metrics, contact)" },
      { he: "ממשק רב-לשוני (עברית / אנגלית / ערבית)", en: "Multilingual UI (Hebrew / English / Arabic)" },
      { he: "כל התוכן, המוצרים והמחירים מסומנים כ-Placeholder / Sample", en: "All content, products and prices explicitly marked as Placeholder / Sample" },
    ],
    technologies: ["TanStack Start", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "adscomp",
    n: "15",
    name: { he: "TechHub", en: "TechHub" },
    category: { he: "מסחר אלקטרוני · מחשבים וגיימינג", en: "E-Commerce · Computers & Gaming" },
    description: {
      he: "חנות אונליין בעברית לתחום המחשוב והגיימינג עם קטלוג רחב במיוחד. שש קטגוריות עיקריות (מחשבים ניידים, רכיבי מחשב, פריפריאלים, גיימינג, תקשורת ורשתות, אביזרים נלווים) עם ספירות מוצר, אזור מבצעי שבוע, נמכרים ביותר ותמיכה במלאי ובמחירי מבצע. אחריות יבואן, משלוח חינם מעל ₪500.",
      en: "A Hebrew-first online store for the computers-and-gaming sector with an especially wide catalog. Six main categories (laptops, PC components, peripherals, gaming, networking, accessories) with product counts, a weekly-deals section, best-sellers, and stock/sale-price support. Importer warranty, free shipping over ₪500.",
    },
    tags: ["E-Commerce", "Large Catalog", "Hebrew-first"],
    image: hebrewBrillianceAsset.url,
    liveUrl: "https://premium-hebrew-shop.lovable.app",
    family: "ecommerce",
    year: "2025",
    role: { he: "ארכיטקטורה · עיצוב · פיתוח", en: "Architecture · Design · Development" },
    overview: {
      he: "אתר מסחר בעברית עם קטלוג עשיר — מבנה שמחזיק אלפי מוצרים בלי לאבד את המשתמש. פוקוס: קטגוריות ברורות, ספירות מלאי גלויות ומסלול מבצעי שבוע חד.",
      en: "A Hebrew commerce site with a rich catalog — a structure that holds thousands of products without losing the user. Focus: clear categories, visible stock counts and a sharp weekly-deals path.",
    },
    features: [
      { he: "שש קטגוריות עיקריות עם ספירות מוצר גלויות (124–312 מוצרים לכל קטגוריה)", en: "Six main categories with visible product counts (124–312 items per category)" },
      { he: "אזור מבצעי שבוע (RTX 4070, Sony WH-1000XM5, ASUS ROG וכו')", en: "Weekly-deals section (RTX 4070, Sony WH-1000XM5, ASUS ROG, etc.)" },
      { he: "עמודי מוצר עם מלאי, מחיר לפני / אחרי הנחה ותגי \"רב מכר\" / \"מבצע\"", en: "Product pages with stock, before/after-discount price and \"best-seller\" / \"sale\" badges" },
      { he: "משלוח חינם מעל ₪500, אחריות יבואן, שירות לקוחות", en: "Free shipping over ₪500, importer warranty, customer service" },
    ],
    technologies: ["TanStack Start", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "mandu-bar",
    n: "16",
    name: { he: "מנדו בר", en: "Mandu Bar" },
    category: { he: "פאב · קפה · חנות וינטג' — קרית טבעון", en: "Pub · Café · Vintage Shop — Kiryat Tivon" },
    description: {
      he: "אתר חוויה למקום היברידי בקרית טבעון — פאב, קפה וחנות וינטג' באותו גג. מציג יומן אירועים חי (DJs, ברמן אורח, הקרנות), סיור וירטואלי בחמש תחנות של המרחב (שטיחים בוהמייניים, משטח הבר, חצר אחורית, מדפי תקליטים, ריהוט אקלקטי), תפריט קוקטיילים, בירות/יין ואוכל, וסקציית קהילה.",
      en: "An experience site for a hybrid venue in Kiryat Tivon — pub, café and vintage shop under one roof. Presents a live event calendar (DJs, guest bartender, screenings), a virtual five-station tour of the space (bohemian rugs, bar surface, backyard, vinyl shelves, eclectic furniture), a cocktail / beer & wine / food menu and a community section.",
    },
    tags: ["Hospitality", "Experience", "Local Brand"],
    image: manduAsset.url,
    liveUrl: "https://manduexample.lovable.app",
    family: "nightlife",
    year: "2025",
    role: { he: "מיתוג · עיצוב · פיתוח", en: "Brand · Design · Development" },
    overview: {
      he: "אתר חוויה שמתרגם את התחושה של להיכנס פנימה עוד לפני שהגעת. הפוקוס: לחבר בין יומן אירועים חי לבין סיור מרחבי שמעביר את הריח של המקום.",
      en: "An experience site that conveys the feeling of walking in before you actually arrive. Focus: connect a live event calendar with a spatial tour that carries the scent of the place.",
    },
    features: [
      { he: "יומן אירועים חי (מוזיקה חיה, שיתופי פעולה, הקרנות)", en: "Live event calendar (live music, collaborations, screenings)" },
      { he: "סיור וירטואלי בחמש תחנות מרחביות", en: "Virtual five-station spatial tour" },
      { he: "תפריט משולש (קוקטיילים · בירות ויין · אוכל)", en: "Triple menu (cocktails · beer & wine · food)" },
      { he: "החלפת מצב יום/לילה + מיצוב מקומי (עמק יזרעאל)", en: "Day/night mode toggle + local positioning (Emek Yizrael)" },
    ],
    technologies: ["TanStack Start", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
];

export const LOCAL_PROJECTS: Project[] = [
  {
    id: "divina-maison",
    n: "17",
    name: { he: "Divina Maison", en: "Divina Maison" },
    category: { he: "מותג בשמים · חנות אונליין · חוויית פרימיום", en: "Perfume Brand · E-Commerce · Premium Experience" },
    description: {
      he: "מותג בשמים יוקרתי עם חנות אונליין רב-עמודית. פלטה זהובה-קרם, טיפוגרפיה אדיטוריאלית, ושש קולקציות בשמים — כל אחת עם עמוד מוצר משלה. תמיכה דו-לשונית מלאה (עברית/אנגלית).",
      en: "A luxury perfume brand with a multi-page online store. Cream-and-gold palette, editorial typography, and six fragrance collections — each with its own product page. Full bilingual support (Hebrew/English).",
    },
    tags: ["E-Commerce", "Luxury", "Bilingual"],
    image: divinaAsset.url,
    staticFilePath: "/local-projects/divina-maison/index.html",
    badge: { he: "חדש", en: "NEW" },
    family: "ecommerce",
    year: "2025",
    role: { he: "מיתוג · עיצוב · פיתוח מלא", en: "Brand · Design · Full-stack build" },
    overview: {
      he: "פרויקט חנות אונליין מלא בסגנון מותג בשמים יוקרתי. אתר רב-עמודי עם שש קולקציות מוצרים, מיתוג אדיטוריאלי מלא ותמיכה דו-לשונית.",
      en: "A full luxury perfume-brand e-commerce build. Multi-page site with six product collections, editorial brand system, and full bilingual support.",
    },
    features: [
      { he: "שש קולקציות בשמים · עמוד מוצר לכל אחת", en: "Six perfume collections, dedicated product page per collection" },
      { he: "תמיכה דו-לשונית עברית/אנגלית", en: "Bilingual Hebrew/English support" },
      { he: "פלטת קרם-זהב וטיפוגרפיה אדיטוריאלית", en: "Cream-and-gold palette with editorial typography" },
      { he: "מבנה חנות רספונסיבי", en: "Responsive storefront structure" },
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "tarracoata-studio",
    n: "18",
    name: { he: "TarraCoata Studio", en: "TarraCoata Studio" },
    category: { he: "סטודיו דיגיטלי · אסטרטגיה · בנייה לתוצאות", en: "Digital Studio · Strategy · Built for Results" },
    description: {
      he: "אתר תדמית לסטודיו דיגיטלי המתמחה בחוויות פרימיום ושיתופי פעולה ארוכי טווח. ממשק כהה עם הדגשי זהב, מבנה תהליך עבודה ברור ומיתוג שמשדר ביטחון מקצועי.",
      en: "A digital studio showcase focused on premium experiences and long-term partnerships. Dark interface with gold accents, a clear process structure, and branding that signals professional confidence.",
    },
    tags: ["Studio", "Strategy", "Brand"],
    image: tarracoataStudioAsset.url,
    staticFilePath: "/local-projects/tarracoata-studio/index.html",
    badge: { he: "חדש", en: "NEW" },
    family: "business",
    year: "2025",
    role: { he: "מיתוג · עיצוב · פיתוח", en: "Brand · Design · Development" },
    overview: {
      he: "אתר סטודיו דיגיטלי — פוקוס על חוויות פרימיום ושותפויות ארוכות טווח, לא על פרויקטים חד־פעמיים.",
      en: "A digital studio site — focused on premium experiences and long-term partnerships, not one-off projects.",
    },
    features: [
      { he: "מבנה תהליך עבודה מסודר", en: "Clear process-flow structure" },
      { he: "ממשק כהה עם הדגשי זהב", en: "Dark interface with gold accents" },
      { he: "היררכיה שמתאימה לשיחת מכירה B2B", en: "Hierarchy tuned to a B2B sales conversation" },
    ],
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "elishay-fitness",
    n: "19",
    name: { he: "אלישי פיטנס", en: "Elishay Fitness" },
    category: { he: "אימון אישי · בריאות וכושר · נוכחות דיגיטלית", en: "Personal Training · Health & Fitness · Digital Presence" },
    description: {
      he: "אתר תדמית למאמן כושר מוסמך. עיצוב כהה ואנרגטי עם הדגשי זהב, סיפורי הצלחה, חנות מוצרים ותוכן דו-לשוני שמניע לפעולה.",
      en: "A showcase site for a certified personal trainer. Dark, energetic design with gold accents, success stories, a product shop, and bilingual content that drives action.",
    },
    tags: ["Fitness", "Personal Brand", "Bilingual"],
    image: elishayAsset.url,
    staticFilePath: "/local-projects/elishay-fitness/index.html",
    badge: { he: "חדש", en: "NEW" },
    family: "brand",
    year: "2025",
    role: { he: "עיצוב · פיתוח · תוכן", en: "Design · Development · Content" },
    overview: {
      he: "אתר תדמית למאמן אישי מוסמך — משדר אנרגיה, מקצועיות והנעה. מבנה שמוביל מגולש חדש לצעד ראשון של יצירת קשר.",
      en: "A showcase for a certified personal trainer — projecting energy, professionalism, and momentum. Built to move a new visitor toward first contact.",
    },
    features: [
      { he: "סיפורי הצלחה מקוצרים", en: "Concise success stories" },
      { he: "חנות מוצרים בסיסית", en: "Basic product shop" },
      { he: "תוכן דו־לשוני שמניע לפעולה", en: "Bilingual content built for action" },
    ],
    technologies: ["HTML", "CSS", "JavaScript"],
  },
];

export function resolvePreviewUrl(p: Project): string | null {
  return p.staticFilePath ?? p.liveUrl ?? null;
}

export const ALL_PROJECTS: Project[] = [...PROJECTS, ...LOCAL_PROJECTS];

export function getProjectBySlug(slug: string): Project | undefined {
  return ALL_PROJECTS.find((p) => p.id === slug);
}
