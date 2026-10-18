import { useI18n } from "../i18n/I18nContext";
import { Reveal } from "../ui/Reveal";
import { ConjurerMesh } from "../ui/ConjurerMesh";
import conjurerAsset from "@/assets/liel-conjurer.jpg.asset.json";

export function Philosophy() {
  const { t } = useI18n();
  return (
    <section
      className="relative py-32 md:py-44 px-6 lg:px-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--black) 0%, var(--purple-deep) 50%, var(--black) 100%)",
      }}
      id="philosophy"
    >
      {/* Atmospheric background image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${conjurerAsset.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.22,
          mixBlendMode: "screen",
          filter: "blur(1px)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, var(--black) 85%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl grid md:grid-cols-[1fr_1.1fr] gap-12 md:gap-16 items-center">
        {/* Visual */}
        <Reveal>
          <div className="relative aspect-[3/4] max-w-[420px] mx-auto md:mx-0">
            <div className="absolute inset-0 border border-[var(--border-purple)] rounded-[2px] overflow-hidden">
              <img
                src={conjurerAsset.url}
                alt={t({ he: "פילוסופיה — מקיים", en: "Philosophy — Conjurer" })}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(168,85,247,0.35)) contrast(1.05)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40"
                style={{
                  background:
                    "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(168,85,247,0.08) 3px, rgba(168,85,247,0.08) 4px)",
                }}
              />
              <span className="hud-bracket tl" />
              <span className="hud-bracket tr" />
              <span className="hud-bracket bl" />
              <span className="hud-bracket br" />
              {/* mouse-reactive wireframe mesh — the "Conjurer" */}
              <div className="absolute inset-0 mix-blend-screen pointer-events-none">
                <ConjurerMesh />
              </div>
            </div>
            <div className="absolute -bottom-3 left-3 right-3 flex justify-between font-mono text-[0.55rem] tracking-[0.3em] text-[var(--purple-light)] bg-[var(--black)] px-2 py-1">
              <span>{t({ he: "[ יוצר · מערכות מהאין אל היש ]", en: "[ THE CONJURER · SYSTEMS BORN FROM NOTHING ]" })}</span>
              <span>v2.2</span>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <div className="text-center md:text-start">
          <Reveal>
            <h2 className="font-mono text-[0.65rem] tracking-[0.35em] text-[var(--purple-light)] mb-8 font-normal">
              {t({ he: "[ 04 · פילוסופיה ]", en: "[ 04 · PHILOSOPHY ]" })}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <blockquote className="font-display italic text-[1.7rem] md:text-[2.4rem] text-[var(--white)] leading-[1.25] text-balance">
              {t({
                he: "״אני לא מחפש פרויקטים אקראיים. אני מאמין בבניית שותפויות לטווח ארוך שמבוססות על איכות ודיוק.״",
                en: "“I don't look for random projects. I believe in building long-term partnerships based on quality and precision.”",
              })}
            </blockquote>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap md:justify-start justify-center gap-2 font-mono text-[0.62rem] tracking-[0.2em] uppercase">
              {[
                t({ he: "ארכיטקטורה מכוונת", en: "Intentional Architecture" }),
                t({ he: "אינסטינקט לילה", en: "Nightlife Instincts" }),
                t({ he: "פסיכולוגיה כלבנית", en: "Canine Psychology" }),
                t({ he: "דיוק אנושי", en: "Human Precision" }),
              ].map((x, i) => (
                <span key={i} className="px-4 py-2 border border-[var(--border-hover)] rounded-full text-[var(--silver)] bg-black/40 backdrop-blur-sm">
                  {x}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
