import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Check, Calendar, Layers } from "lucide-react";
import { AmbientSystem } from "@/components/ui/AmbientSystem";
import { useI18n } from "@/components/i18n/I18nContext";
import {
  getProjectBySlug,
  FAMILY_LABELS,
  resolvePreviewUrl,
  type Project,
  type LocalizedString,
} from "@/lib/portfolio-data";

const BASE = "https://lielwainberg.com";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Case Study — Not Found" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.project;
    const title = `${p.name.en} — Case Study · Liel Wainberg`;
    const desc = p.description.en.slice(0, 158);
    const url = `${BASE}/projects/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: p.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: p.image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: p.name.en,
            alternateName: p.name.he,
            about: p.category.en,
            description: p.description.en,
            image: p.image,
            url,
            keywords: [...p.tags, ...p.technologies].join(", "),
            author: {
              "@type": "Person",
              name: "Liel Wainberg",
              url: BASE,
            },
            dateCreated: p.year,
          }),
        },
      ],
    };
  },
  component: CaseStudyPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="font-mono text-[0.7rem] tracking-[0.3em] text-[var(--purple-light)] mb-4">
          [ ERR · 404 ]
        </div>
        <h1 className="font-display text-[2rem] mb-4">Case study not found</h1>
        <Link
          to="/"
          hash="projects"
          className="inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.25em] uppercase text-[var(--purple-light)] hover:text-[var(--white)]"
        >
          ← Back to portfolio
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)] flex items-center justify-center px-6" role="alert">
      <div className="text-center max-w-md">
        <div className="font-mono text-[0.7rem] tracking-[0.3em] text-[var(--purple-light)] mb-4">[ ERR ]</div>
        <h1 className="font-display text-[1.6rem] mb-3">Something broke loading this case study.</h1>
        <p className="font-mono text-[0.7rem] text-[var(--silver-dim)]">{error instanceof Error ? error.message : String(error)}</p>
      </div>
    </div>
  ),
});

function CaseStudyPage() {
  const { project } = Route.useLoaderData() as { project: Project };
  const { t, dir, locale } = useI18n();
  const previewUrl = resolvePreviewUrl(project);
  const ArrowBack = dir === "rtl" ? ArrowRight : ArrowLeft;

  return (
    <>
    <AmbientSystem />
    <motion.main
      id="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="case-edition min-h-screen bg-[var(--black)] text-[var(--white)] font-sans"
      data-family={project.family}
      lang={locale}
    >
      {/* Sticky top nav */}
      <div className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--black)]/85 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 h-14 flex items-center justify-between">
          <Link
            to="/"
            hash="projects"
            className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-[var(--silver-mid)] hover:text-[var(--purple-light)] transition-colors"
          >
            <ArrowBack className="w-3.5 h-3.5" strokeWidth={1.5} />
            {t({ he: "לתיק העבודות", en: "Back to portfolio" })}
          </Link>
          <div className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-[var(--silver-dim)]">
            [ CASE_STUDY · {project.n} ]
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="case-edition__hero px-6 lg:px-10 pt-16 md:pt-20 pb-10">
        <div className="mx-auto max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-display text-[2.6rem] md:text-[4rem] leading-[1.02] text-balance max-w-4xl"
          >
            {t(project.name)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 font-light text-[1.1rem] md:text-[1.2rem] text-[var(--silver)] leading-[1.85] max-w-3xl"
          >
            {t(project.description)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {previewUrl && project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--purple)] hover:bg-[var(--purple-hover)] text-white px-6 py-3 text-sm font-mono tracking-[0.15em] rounded-[2px] transition-colors"
              >
                {t({ he: "// אתר חי", en: "// VIEW LIVE" })}
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center gap-2 border border-[var(--border-purple)] text-[var(--purple-light)] hover:bg-[var(--purple-dim)] px-6 py-3 text-sm font-mono tracking-[0.15em] rounded-[2px] transition-colors"
            >
              {t({ he: "// התחל פרויקט דומה", en: "// START A SIMILAR PROJECT" })}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Cover image */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8 }}
        className="case-edition__visual px-6 lg:px-10 pb-14"
      >
        <div className="mx-auto max-w-6xl">
          <div className="relative aspect-[16/10] overflow-hidden border border-[var(--border)] bg-[var(--charcoal)] rounded-[3px]">
            <img
              src={project.image}
              alt={t(project.name)}
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)]/40 to-transparent pointer-events-none" />
            <div className="absolute top-4 left-4 font-mono text-[0.6rem] tracking-[0.3em] uppercase text-[var(--purple-light)] bg-black/60 backdrop-blur px-2.5 py-1.5">
              [ {project.n} ]
            </div>
          </div>
        </div>
      </motion.section>

      {/* Meta grid */}
      <section className="px-6 lg:px-10 pb-16">
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)]">
          <MetaCell
            icon={<Layers className="w-3.5 h-3.5" />}
            label={t({ he: "קטגוריה", en: "Category" })}
            value={t(project.category)}
          />
          <MetaCell
            icon={<Calendar className="w-3.5 h-3.5" />}
            label={t({ he: "שנה", en: "Year" })}
            value={project.year}
          />
          <MetaCell
            icon={<Check className="w-3.5 h-3.5" />}
            label={t({ he: "תפקיד", en: "Role" })}
            value={t(project.role)}
          />
          <MetaCell
            icon={<Layers className="w-3.5 h-3.5" />}
            label={t({ he: "משפחה", en: "Family" })}
            value={t(FAMILY_LABELS[project.family])}
          />
        </div>
      </section>

      {/* Overview */}
      <section className="px-6 lg:px-10 pb-16" aria-labelledby="cs-overview">
        <div className="mx-auto max-w-6xl grid md:grid-cols-[220px_1fr] gap-10">
          <div>
            <div className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-[var(--purple-light)]">
              [ 01 ]
            </div>
            <h2 id="cs-overview" className="mt-3 font-display text-[1.4rem]">
              {t({ he: "סקירה", en: "Overview" })}
            </h2>
          </div>
          <p className="font-light text-[1.05rem] text-[var(--silver)] leading-[1.9]">
            {t(project.overview)}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-10 pb-16" aria-labelledby="cs-features">
        <div className="mx-auto max-w-6xl grid md:grid-cols-[220px_1fr] gap-10">
          <div>
            <div className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-[var(--purple-light)]">
              [ 02 ]
            </div>
            <h2 id="cs-features" className="mt-3 font-display text-[1.4rem]">
              {t({ he: "יכולות מרכזיות", en: "Key features" })}
            </h2>
          </div>
          <ul className="grid sm:grid-cols-2 gap-4">
            {project.features.map((f: LocalizedString, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="border border-[var(--border)] bg-[var(--charcoal)] p-5 flex gap-3"
              >
                <Check className="w-4 h-4 mt-1 text-[var(--purple-light)] shrink-0" strokeWidth={1.5} />
                <span className="text-[0.95rem] text-[var(--silver)] leading-[1.7]">{t(f)}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Technologies */}
      <section className="px-6 lg:px-10 pb-16" aria-labelledby="cs-tech">
        <div className="mx-auto max-w-6xl grid md:grid-cols-[220px_1fr] gap-10">
          <div>
            <div className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-[var(--purple-light)]">
              [ 03 ]
            </div>
            <h2 id="cs-tech" className="mt-3 font-display text-[1.4rem]">
              {t({ he: "טכנולוגיות", en: "Technologies" })}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="font-mono text-[0.7rem] tracking-[0.18em] uppercase px-3 py-2 border border-[var(--border)] bg-[var(--charcoal)] text-[var(--silver)]"
              >
                {tech}
              </span>
            ))}
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="font-mono text-[0.7rem] tracking-[0.18em] uppercase px-3 py-2 border border-[var(--border-purple)] text-[var(--purple-light)] bg-[var(--purple-dim)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 pb-24">
        <div className="mx-auto max-w-6xl border border-[var(--border-purple)] bg-gradient-to-br from-[var(--purple-dim)] to-transparent p-8 md:p-12 text-center">
          <div className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-[var(--purple-light)] mb-4">
            {t({ he: "// המהלך הבא", en: "// NEXT" })}
          </div>
          <h2 className="font-display text-[1.8rem] md:text-[2.4rem] leading-[1.15] text-balance max-w-2xl mx-auto">
            {t({
              he: "יש לך פרויקט דומה בראש? בוא נבנה אותו.",
              en: "Got a similar project in mind? Let's build it.",
            })}
          </h2>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center gap-2 bg-[var(--purple)] hover:bg-[var(--purple-hover)] text-white px-6 py-3 text-sm font-mono tracking-[0.15em] rounded-[2px] transition-colors"
            >
              {t({ he: "// התחל פרויקט", en: "// START A PROJECT" })}
            </Link>
            <Link
              to="/"
              hash="projects"
              className="inline-flex items-center gap-2 border border-[var(--border)] text-[var(--silver)] hover:text-[var(--white)] hover:border-[var(--border-hover)] px-6 py-3 text-sm font-mono tracking-[0.15em] rounded-[2px] transition-colors"
            >
              {t({ he: "// עוד פרויקטים", en: "// MORE PROJECTS" })}
            </Link>
          </div>
        </div>
      </section>
    </motion.main>
    </>
  );
}

function MetaCell({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[var(--charcoal)] p-5">
      <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.3em] uppercase text-[var(--silver-dim)] mb-2">
        <span className="text-[var(--purple-light)]">{icon}</span>
        {label}
      </div>
      <div className="text-[0.9rem] text-[var(--white)] leading-tight">{value}</div>
    </div>
  );
}
