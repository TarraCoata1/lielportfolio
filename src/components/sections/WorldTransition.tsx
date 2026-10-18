import { Reveal } from "../ui/Reveal";
import { useI18n } from "../i18n/I18nContext";

type Props = {
  world: "canine" | "hospitality" | "human";
  index: string;
  title: { he: string; en: string };
  text: { he: string; en: string };
};

export function WorldTransition({ world, index, title, text }: Props) {
  const { t } = useI18n();
  return (
    <section className={`world-transition world-transition--${world}`} aria-label={t(title)}>
      <div className="world-transition__rails" aria-hidden="true"><span /><span /><span /></div>
      <Reveal className="world-transition__inner">
        <span className="world-transition__index">{index}</span>
        <div>
          <p className="eyebrow">{t({ he: "שינוי סביבה", en: "Change of environment" })}</p>
          <h2>{t(title)}</h2>
          <p>{t(text)}</p>
        </div>
      </Reveal>
    </section>
  );
}