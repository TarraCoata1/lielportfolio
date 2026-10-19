import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/ui/SiteNav";
import { AmbientSystem } from "@/components/ui/AmbientSystem";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { DigitalArchitecture } from "@/components/sections/DigitalArchitecture";
import { TechStack } from "@/components/sections/TechStack";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { WorldTransition } from "@/components/sections/WorldTransition";
import { WorldPortal } from "@/components/worlds/WorldPortal";
import { ReturnToLiel } from "@/components/sections/ReturnToLiel";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { ALL_PROJECTS } from "@/lib/portfolio-data";
import portraitAsset from "@/assets/liel-portrait-v3.png.asset.json";

const SITE = "https://www.lielwainberg.com";
const PERSON_ID = `${SITE}/#liel-wainberg`;
const PROFILE_ID = `${SITE}/#profile`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ליאל ווינברג | פיתוח תוכנה, מערכות ומוצרים דיגיטליים" },
      { name: "description", content: "ליאל ווינברג בונה תוכנה, מערכות, אפליקציות ומוצרים דיגיטליים. פיתוח Full Stack, ארכיטקטורה, UX/UI, מסחר אלקטרוני, API, אינטגרציות ואוטומציה." },
      { name: "author", content: "Liel Wainberg" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: "ליאל ווינברג | תוכנה, מערכות ומוצרים דיגיטליים" },
      { property: "og:description", content: "הפורטפוליו של ליאל ווינברג: תוכנה, מערכות, אפליקציות, UX/UI ועבודות נבחרות, לצד CANINE.BEHAVIOR ו-LW.LIQUID." },
      { property: "og:type", content: "profile" },
      { property: "og:image", content: portraitAsset.url },
      { name: "twitter:image", content: portraitAsset.url },
      { property: "og:url", content: `${SITE}/` },
      { property: "og:locale", content: "he_IL" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Liel Wainberg | Software, Systems & Digital Products" },
      { name: "twitter:description", content: "Software, systems, applications, UX/UI, and selected work by Liel Wainberg." },
    ],
    links: [{ rel: "canonical", href: `${SITE}/` }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ProfilePage",
            "@id": PROFILE_ID,
            url: `${SITE}/`,
            name: "Liel Wainberg Portfolio",
            inLanguage: ["he-IL", "en"],
            mainEntity: { "@id": PERSON_ID },
          },
          {
            "@type": "Person",
            "@id": PERSON_ID,
            name: "Liel Wainberg",
            alternateName: ["ליאל ווינברג", "Liel Yaakov Wainberg", "ליאל יעקב ווינברג"],
            url: `${SITE}/`,
            image: "https://storage.googleapis.com/gpt-engineer-file-uploads/y4mPucT6AOTabtCkxkvNMYQswbq1/social-images/social-1780781363967-WhatsApp_Image_2026-06-06_at_23.43.24.webp",
            sameAs: ["https://instagram.com/lielwainberg"],
            email: "mailto:lielwa2004@gmail.com",
            homeLocation: { "@type": "Place", name: "Jerusalem, Israel" },
            knowsLanguage: ["he", "en"],
            knowsAbout: ["Software Development", "Full Stack Development", "Web Applications", "Software Architecture", "UX/UI Design", "Digital Products", "E-commerce", "APIs", "Integrations", "Automation", "Canine Behavior", "Hospitality", "Mixology"],
            subjectOf: { "@id": PROFILE_ID },
          },
          ...ALL_PROJECTS.map((project) => ({
            "@type": "CreativeWork",
            "@id": `${SITE}/projects/${project.id}#project`,
            name: project.name.en,
            alternateName: project.name.he,
            description: project.description.en,
            url: `${SITE}/projects/${project.id}`,
            creator: { "@id": PERSON_ID },
            image: project.image,
            genre: project.category.en,
            keywords: [...project.tags, ...project.technologies].join(", "),
          })),
        ],
      }),
    }],
  }),
  component: Index,
});

function Index() {
  return (
    <main id="main-content" className="portfolio-page">
      <SiteNav />
      <AmbientSystem />
      <Hero />
      <About />
      <WorldPortal />
      <DigitalArchitecture />
      <TechStack />
      <Projects />
      <Testimonials />
      <WorldTransition world="human" index="06" title={{ he: "ובסוף, הכול חוזר לליאל.", en: "In the end, it all returns to Liel." }} text={{ he: "לא שלושה מותגים. אדם אחד עם כמה דרכים להבין עולם.", en: "Not three brands. One person with several ways of understanding the world." }} />
      <ReturnToLiel />
      <Contact />
      <Footer />
    </main>
  );
}