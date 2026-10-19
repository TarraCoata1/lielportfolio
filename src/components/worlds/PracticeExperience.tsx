import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nContext";
import { Reveal } from "@/components/ui/Reveal";
import { LazyScene } from "@/components/three/LazyScene";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import { ALL_PROJECTS } from "@/lib/portfolio-data";
import type { World } from "@/lib/worlds";
import barPhoto from "@/assets/liel-bar.jpg.asset.json";

const DIRECTION = {
  digital: {
    title: "BUILD. / BEYOND.",
    intro: { he: "מחשבה רחבה. ביצוע עד הפרט האחרון.", en: "Think beyond. Build every detail." },
    body: { he: "תוכנה, מערכות ומוצרים דיגיטליים. מהבעיה הראשונה ועד הממשק שאנשים פוגשים בכל יום.", en: "Software, systems and digital products. From the first problem to the interface people use every day." },
    action: { he: "בואו נבנה משהו", en: "Let's build something" },
    words: ["SOFTWARE", "SYSTEMS", "HUMAN EXPERIENCE"],
  },
  canine: {
    title: "BETTER / TOGETHER.",
    intro: { he: "הקשר קודם לכול.", en: "Connection comes first." },
    body: { he: "לקרוא שפת גוף. לבנות אמון. ליצור שפה משותפת שממשיכה גם אחרי המפגש.", en: "Read body language. Build trust. Create a shared language that continues beyond the session." },
    action: { he: "בואו נכיר את הכלב שלכם", en: "Let's meet your dog" },
    words: ["OBSERVATION", "TRUST", "SHARED LANGUAGE"],
  },
  liquid: {
    title: "GOOD / SPIRITS.",
    intro: { he: "הטעם הוא רק ההתחלה.", en: "Taste is just the beginning." },
    body: { he: "אנשים, תזמון ואווירה. חוויית אירוח שנבנית מהקוקטייל הראשון ועד הרגע האחרון של הערב.", en: "People, timing and atmosphere. A hosting experience shaped from the first cocktail to the final moment of the evening." },
    action: { he: "נדבר על האירוע שלכם", en: "Let's talk about your event" },
    words: ["MIXOLOGY", "HOSPITALITY", "AFTER HOURS"],
  },
};

/** A bounded magnetic photograph: direct transforms, no React render on pointer movement. */
export function PracticeHero({ world }: { world: World }) {
  const { t } = useI18n();
  const paused = useMotionPreference();
  const ref = useRef<HTMLElement>(null);
  const direction = DIRECTION[world.id];
  useEffect(() => {
    const stage = ref.current;
    const photo = stage?.querySelector<HTMLElement>(".practice-hero__photo");
    if (!stage || !photo || paused || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = stage.getBoundingClientRect();
        const x = (event.clientX - r.left) / r.width - .5;
        const y = (event.clientY - r.top) / r.height - .5;
        photo.style.transform = `translate3d(${x * 14}px, ${y * 10}px, 0) rotate(${x * .7}deg)`;
      });
    };
    const reset = () => { cancelAnimationFrame(frame); photo.style.transform = "translate3d(0, 0, 0) rotate(0deg)"; };
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerleave", reset);
    return () => { cancelAnimationFrame(frame); stage.removeEventListener("pointermove", move); stage.removeEventListener("pointerleave", reset); photo.style.transform = ""; };
  }, [paused, world.id]);

  return <>
    <section ref={ref} className="practice-hero" aria-label={world.name}>
      <div className="practice-hero__masthead" aria-hidden="true" dir="ltr">
        {direction.title.split(" / ").map(line => <span key={line}>{line}</span>)}
      </div>
      <div className="practice-hero__layout">
        <div className="practice-hero__intro">
          <img className="practice-hero__mark" src={`/icons/${world.id === "digital" ? "tarracoata" : world.id === "canine" ? "canine" : "liquid"}-180.png`} alt={world.name} width="52" height="52" />
          <p className="practice-hero__name" dir="ltr">{world.name}</p>
          <h2>{t(direction.intro)}</h2>
          <p>{t(direction.body)}</p>
          <a className="practice-action" href="#practice-contact">{t(direction.action)}<ArrowUpRight aria-hidden /></a>
        </div>
        <figure className="practice-hero__photo">
          <img src={world.image} alt={t({ he: world.id === "canine" ? "ליאל וצ׳יף, רגע של קשר ואמון" : world.id === "liquid" ? "מתוך עבודת הבר והמיקסולוגיה של ליאל" : "מוצר דיגיטלי של TarraCoata", en: world.id === "canine" ? "Liel and Chief, a moment of connection and trust" : world.id === "liquid" ? "From Liel's bar and mixology work" : "A digital product by TarraCoata" })} fetchPriority="high" decoding="async" />
          <figcaption>{t(world.discipline)}</figcaption>
        </figure>
        <div className="practice-hero__object"><LazyScene kind={world.id} fallback={<img src={world.image} alt="" />} /></div>
      </div>
      <a className="practice-hero__continue" href="#practice-story"><ArrowDown aria-hidden /><span>{t({ he: "להכיר את הדרך", en: "Explore the practice" })}</span></a>
    </section>
    <div className="practice-ribbon" aria-hidden="true" dir="ltr">{direction.words.map(word => <span key={word}>{word}<i /></span>)}</div>
  </>;
}

export function PracticeWork({ world }: { world: World }) {
  const { t } = useI18n();
  if (world.id === "digital") {
    const projects = ALL_PROJECTS.filter(p => p.family !== "nightlife").slice(0, 3);
    return <section className="practice-work" aria-labelledby="practice-work-title">
      <Reveal><h2 id="practice-work-title">{t({ he: "מרעיון למציאות.", en: "Made real." })}</h2></Reveal>
      <div className="practice-stack">{projects.map((project, index) => <article className="practice-project" key={project.id} style={{ top: `${88 + index * 20}px` }}>
        <div className="practice-project__head"><span dir="ltr">{project.year}</span><h3>{t(project.name)}</h3><Link to="/projects/$slug" params={{ slug: project.id }}>{t({ he: "לסיפור הפרויקט", en: "Explore the project" })}<ArrowUpRight aria-hidden /></Link></div>
        <Link to="/projects/$slug" params={{ slug: project.id }} className="practice-project__image" aria-label={t(project.name)}><img src={project.image} alt={t(project.name)} loading="lazy" decoding="async" /></Link>
        <p>{t(project.category)}<span>{project.technologies.slice(0, 3).join(" / ")}</span></p>
      </article>)}</div>
    </section>;
  }
  return <section className="practice-moment" aria-labelledby="practice-moment-title">
    <Reveal className="practice-moment__copy"><h2 id="practice-moment-title">{t(world.id === "canine" ? { he: "העבודה מתחילה בהקשבה.", en: "It starts with listening." } : { he: "מאחורי ערב שעובד.", en: "Behind a great evening." })}</h2>
      <p>{t(world.id === "canine" ? { he: "צ׳יף, הכלב שלי, מזכיר לי בכל יום שהפרטים הקטנים הם התמונה הגדולה. המבט, המרחק, הרגע שבו עוצרים ומקשיבים.", en: "Chief, my own dog, reminds me every day that small details are the bigger picture. A look, a little space, the moment we stop and listen." } : { he: "ניהול בר הוא עבודה עם קצב: הכנות, צוות, תפריט, שירות. כל פרט מתחבר לחוויה של האנשים בצד השני של הבר.", en: "Running a bar means working with rhythm: preparation, people, menu and service. Every detail shapes the experience on the other side of the bar." })}</p>
    </Reveal>
    <figure><img src={world.id === "canine" ? "/images/liel-and-chief.webp" : barPhoto.url} alt={t(world.id === "canine" ? { he: "ליאל עם צ׳יף", en: "Liel with Chief" } : { he: "מתוך העבודה מאחורי הבר", en: "From the work behind the bar" })} loading="lazy" decoding="async" /></figure>
  </section>;
}
