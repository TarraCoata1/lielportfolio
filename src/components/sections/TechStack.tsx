import { useI18n } from "../i18n/I18nContext";
import { Reveal } from "../ui/Reveal";

const GROUPS = [
  {
    title: { he: "Frontend", en: "Frontend" },
    items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "TanStack"],
  },
  {
    title: { he: "Backend & DB", en: "Backend & DB" },
    items: ["Node.js", "Supabase", "PostgreSQL", "Edge Functions", "REST", "Auth"],
  },
  {
    title: { he: "Design & Ops", en: "Design & Ops" },
    items: ["Figma", "Vercel", "Cloudflare", "Git", "Vite", "SEO"],
  },
];

export function TechStack() {
  const { t } = useI18n();
  return (
    <section
      className="relative bg-[var(--charcoal)] py-24 md:py-32 px-6 lg:px-12 border-y border-[var(--border)]"
      aria-labelledby="tech-stack-title"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="font-mono text-[0.7rem] tracking-[0.3em] text-[var(--purple-light)] mb-4">
            {t({ he: "// טכנולוגיות", en: "// TECH_STACK" })}
          </div>
          <h2
            id="tech-stack-title"
            className="font-display text-[2rem] md:text-[2.8rem] leading-[1.1] text-[var(--white)] max-w-3xl"
          >
            {t({
              he: "כלים שנבחרו לפי בעיה, לא לפי אופנה.",
              en: "Tools picked by problem, not by trend.",
            })}
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
          {GROUPS.map((g, gi) => (
            <Reveal key={gi} delay={gi * 0.1}>
              <div className="bg-[var(--black)] p-8 h-full">
                <div className="font-mono text-[0.62rem] tracking-[0.3em] uppercase text-[var(--silver-dim)] mb-6">
                  [ {String(gi + 1).padStart(2, "0")} · {t(g.title)} ]
                </div>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="font-mono text-[0.68rem] tracking-[0.15em] px-3 py-1.5 border border-[var(--border-purple)] text-[var(--purple-light)] bg-[var(--purple-dim)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--purple-light)] hover:bg-[var(--purple)] hover:text-white cursor-default select-none"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
