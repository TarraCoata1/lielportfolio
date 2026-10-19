import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/components/i18n/I18nContext";
import { Reveal } from "@/components/ui/Reveal";

export type Localized = { he: string; en: string };

export type WorldBlock =
  | { type: "crumb"; current: Localized }
  | { type: "h1"; text: Localized }
  | { type: "lead"; text: Localized }
  | { type: "h2"; text: Localized }
  | { type: "p"; text: Localized }
  | { type: "points"; items: { title: Localized; body: Localized }[] }
  | { type: "steps"; items: { title: Localized; body: Localized }[] }
  | {
      type: "cta";
      title: Localized;
      text: Localized;
      waHref: string;
      mailHref: string;
    };

export function WorldCopy({ blocks }: { blocks: WorldBlock[] }) {
  const { t } = useI18n();
  const nodes: ReactNode[] = [];

  blocks.forEach((block, i) => {
    if (block.type === "crumb") {
      nodes.push(
        <nav key={i} className="world-crumb" aria-label={t({ he: "מיקום", en: "Breadcrumb" })}>
          <Link to="/">{t({ he: "בית", en: "Home" })}</Link>
          <span aria-hidden="true">/</span>
          <span>{t(block.current)}</span>
        </nav>,
      );
    } else if (block.type === "h1") {
      nodes.push(
        <Reveal key={i}>
          <h1>{t(block.text)}</h1>
        </Reveal>,
      );
    } else if (block.type === "lead") {
      nodes.push(
        <Reveal key={i} delay={0.06}>
          <p className="world-lead">{t(block.text)}</p>
        </Reveal>,
      );
    } else if (block.type === "h2") {
      nodes.push(
        <Reveal key={i}>
          <h2>{t(block.text)}</h2>
        </Reveal>,
      );
    } else if (block.type === "p") {
      nodes.push(
        <Reveal key={i} delay={0.05}>
          <p>{t(block.text)}</p>
        </Reveal>,
      );
    } else if (block.type === "points") {
      nodes.push(
        <ul key={i} className="world-points">
          {block.items.map((item) => (
            <li key={item.title.en}>
              <strong>{t(item.title)}</strong>
              <span>{t(item.body)}</span>
            </li>
          ))}
        </ul>,
      );
    } else if (block.type === "steps") {
      nodes.push(
        <ol key={i} className="world-steps">
          {block.items.map((item) => (
            <li key={item.title.en}>
              <strong>{t(item.title)}</strong>
              <span>{t(item.body)}</span>
            </li>
          ))}
        </ol>,
      );
    } else {
      nodes.push(
        <Reveal key={i} className="world-cta">
          <h2>{t(block.title)}</h2>
          <p>{t(block.text)}</p>
          <div className="world-cta__actions">
            <a className="action action--primary" href={block.waHref}>
              WhatsApp
            </a>
            <a className="action action--quiet" href={block.mailHref}>
              Email
            </a>
            <Link className="action action--quiet" to="/">
              {t({ he: "חזרה לבית", en: "Back home" })}
            </Link>
          </div>
        </Reveal>,
      );
    }
  });

  return <>{nodes}</>;
}
