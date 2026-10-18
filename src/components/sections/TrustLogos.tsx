import { useI18n } from "../i18n/I18nContext";

const LOGOS = [
  "TarraCoata",
  "Magen Netivim",
  "Dor Hadad",
  "Abramov",
  "YAN Studio",
  "XY Marketing",
  "Dairy Corner",
  "Kesem Tzvaim",
];

export function TrustLogos() {
  const { t } = useI18n();
  return (
    <section
      aria-label={t({ he: "לקוחות ופרויקטים", en: "Clients & projects" })}
      className="relative bg-[var(--black)] border-y border-[var(--border)] py-10 px-6 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-[var(--silver-dim)] text-center mb-6">
          {t({ he: "// לקוחות שסמכו על הקוד", en: "// TRUSTED_BY" })}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {LOGOS.map((name) => (
            <div
              key={name}
              className="font-display text-[0.9rem] md:text-[1rem] tracking-[0.05em] text-[var(--silver-mid)] hover:text-[var(--white)] transition-colors"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
