import { useI18n } from "../i18n/I18nContext";

const ITEMS = [
  "React · Next.js · TypeScript",
  "UX / UI Engineering",
  "Framer Motion",
  "Supabase · PostgreSQL",
  "Design Systems",
  "Performance · SEO",
  "Bar Operations · LW.Liquid",
  "Canine Behavior",
];

export function Marquee() {
  const { dir } = useI18n();
  const list = [...ITEMS, ...ITEMS];
  return (
    <div
      className="marquee-wrap relative bg-[var(--surface)] border-y border-[var(--border)] py-3.5 overflow-hidden"
      aria-label="disciplines"
      role="marquee"
    >
      <div
        className={`flex gap-10 whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.28em] text-[var(--silver-mid)] w-max ${dir === "rtl" ? "animate-marquee-rtl" : "animate-marquee"}`}
      >
        {list.map((it, i) => (
          <span key={i} className="flex items-center gap-10">
            <span>{it}</span>
            <span aria-hidden className="text-[var(--purple-light)]/60 px-1">◆</span>
          </span>
        ))}
      </div>
      {/* edge fade */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 start-0 w-24 bg-gradient-to-e from-[var(--surface)] to-transparent" style={{ background: "linear-gradient(to right, var(--surface), transparent)" }} />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 end-0 w-24" style={{ background: "linear-gradient(to left, var(--surface), transparent)" }} />
    </div>
  );
}
