import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/button";
import { ALL_PROJECTS, FAMILY_LABELS, type ProjectFamily } from "@/lib/portfolio-data";

type Filter = ProjectFamily | "all";
const FILTERS: Filter[] = ["all", "web", "business", "ecommerce", "brand", "nightlife"];

export function Projects() {
  const { t, dir } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [lens, setLens] = useState<"executive" | "architecture">("executive");
  const projects = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return ALL_PROJECTS.filter((project) => {
      if (filter !== "all" && project.family !== filter) return false;
      if (!needle) return true;
      return [project.name.he, project.name.en, project.description.he, project.description.en, ...project.tags, ...project.technologies].join(" ").toLocaleLowerCase().includes(needle);
    });
  }, [filter, query]);

  const visibleProjects = expanded || filter !== "all" || query.trim() ? projects : projects.slice(0, 4);
  return (
    <section className="work-section" data-lens={lens} id="projects" aria-labelledby="projects-title">
      <div className="section-shell">
        <Reveal className="work-section__heading">
          <div>
            <p className="eyebrow">03 / {t({ he: "עבודות נבחרות", en: "Selected work" })}</p>
            <h2 id="projects-title">{t({ he: "עבודה אמיתית. כל פרויקט עם הסיפור שלו.", en: "Real work. Each project with its own story." })}</h2>
          </div>
          <p>{t({ he: "מוצרים, אתרי מסחר, מערכות ונוכחות דיגיטלית שבניתי עבור אנשים ועסקים שונים.", en: "Products, commerce sites, systems, and digital presences built for different people and businesses." })}</p>
        </Reveal>

        <div className="work-lens" role="group" aria-label={t({ he: "אופן תצוגה", en: "View lens" })}>
          <Button variant="ghost" type="button" aria-pressed={lens === "executive"} onClick={() => setLens("executive")}>{t({ he: "סיפור", en: "Executive" })}</Button>
          <span aria-hidden="true">/</span>
          <Button variant="ghost" type="button" aria-pressed={lens === "architecture"} onClick={() => setLens("architecture")}>{t({ he: "ארכיטקטורה", en: "Architecture" })}</Button>
        </div>

        <div className="work-controls">
          <div className="work-filters" aria-label={t({ he: "סינון פרויקטים", en: "Filter projects" })}>
            {FILTERS.map((item) => (
              <Button key={item} type="button" variant="ghost" aria-pressed={filter === item} onClick={() => setFilter(item)}>
                {item === "all" ? t({ he: "הכול", en: "All" }) : t(FAMILY_LABELS[item])}
              </Button>
            ))}
          </div>
          <label className="work-search">
            <span className="sr-only">{t({ he: "חיפוש בפרויקטים", en: "Search projects" })}</span>
            <Search aria-hidden />
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t({ he: "חיפוש לפי שם או טכנולוגיה", en: "Search by name or technology" })} />
          </label>
        </div>

        <div className="project-editorial" hidden={projects.length === 0}>
          {visibleProjects.map((project, index) => (
            <Reveal key={project.id}>
              <article data-trace={project.family === "nightlife" ? "copper" : undefined} className={`project-story ${index % 2 ? "project-story--reverse" : ""} ${index % 5 === 0 ? "project-story--feature" : ""}`}>
                <Link to="/projects/$slug" params={{ slug: project.id }} className="project-story__image" aria-label={`${t({ he: "למקרה הבוחן: ", en: "Read case study: " })}${t(project.name)}`}>
                  <img src={project.image} alt={t({ he: `צילום מסך מפרויקט ${project.name.he}`, en: `Screenshot from ${project.name.en}` })} loading={index < 2 ? "eager" : "lazy"} decoding="async" width="1280" height="800" />
                  <span>{project.n}</span>
                  <strong aria-hidden="true">{String(index + 1).padStart(2, "0")}</strong>
                </Link>
                <div className="project-story__copy">
                  <p className="eyebrow">{t(project.category)} · {project.year}</p>
                  <h3>{t(project.name)}</h3>
                  <p>{t(project.description)}</p>
                  <dl>
                    <div><dt>{t({ he: "תפקיד", en: "Role" })}</dt><dd>{t(project.role)}</dd></div>
                    <div><dt>{t({ he: "כלים", en: "Tools" })}</dt><dd>{project.technologies.slice(0, 4).join(" · ")}</dd></div>
                  </dl>
                  {lens === "architecture" && (
                    <div className="project-blueprint" aria-label={t({ he: "פירוט טכני", en: "Technical detail" })}>
                      <p>{t({ he: "סטאק מאומת", en: "Verified stack" })}</p>
                      <ol>{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ol>
                      {project.tags.length > 0 && <p className="project-blueprint__tags">{project.tags.join(" / ")}</p>}
                    </div>
                  )}
                  <div className="project-story__links">
                    <Link to="/projects/$slug" params={{ slug: project.id }}>{t({ he: "למקרה הבוחן", en: "Read case study" })}<ArrowUpRight className={dir === "rtl" ? "rotate-[270deg]" : ""} aria-hidden /></Link>
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">{t({ he: "לאתר החי", en: "View live" })}<ArrowUpRight aria-hidden /></a>}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        {!expanded && filter === "all" && !query.trim() && projects.length > 4 && <Button className="work-more" variant="outline" onClick={() => setExpanded(true)}>{t({ he: `לכל ${projects.length} הפרויקטים`, en: `Explore all ${projects.length} projects` })}</Button>}
        <p className="work-count" aria-live="polite">{t({ he: `${visibleProjects.length} מתוך ${projects.length} פרויקטים`, en: `${visibleProjects.length} of ${projects.length} projects shown` })}</p>
        {projects.length === 0 && <div className="work-empty"><p>{t({ he: "לא נמצאו פרויקטים מתאימים.", en: "No matching projects." })}</p><Button variant="outline" onClick={() => { setQuery(""); setFilter("all"); }}>{t({ he: "ניקוי החיפוש", en: "Clear search" })}</Button></div>}
      </div>
    </section>
  );
}