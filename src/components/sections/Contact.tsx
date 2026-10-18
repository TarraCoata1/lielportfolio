import { useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import { Reveal } from "../ui/Reveal";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";

const LINKS = [
  { label: "WhatsApp", value: "054-696-9367", href: "https://wa.me/972546969367" },
  { label: "Email", value: "lielwa2004@gmail.com", href: "mailto:lielwa2004@gmail.com" },
  { label: "Instagram", value: "@lielwainberg", href: "https://instagram.com/lielwainberg" },
];

const INQUIRY_TYPES = [
  { id: "web", label: { he: "פיתוח אתרים", en: "Web Development" }, code: "WEB.DEV" },
  { id: "event", label: { he: "אירוע פרטי · LW.LIQUID", en: "Private Event · LW.LIQUID" }, code: "LW.LIQUID" },
  { id: "canine", label: { he: "אילוף כלבים", en: "Dog Training" }, code: "CANINE" },
] as const;

const WA_TEXT = {
  web: "אהלן ליאל, אני פונה בקשר לפיתוח מערכת מותאמת אישית.",
  event: "אהלן ליאל, אני פונה בקשר לשירותי ברמן לאירוע.",
  canine: "אהלן ליאל, אני פונה בקשר לאילוף כלבים.",
} as const;

type InquiryId = (typeof INQUIRY_TYPES)[number]["id"];


export function Contact() {
  const { t, dir } = useI18n();
  const [inquiry, setInquiry] = useState<InquiryId>("web");

  const buildHref = (base: string) => {
    const meta = INQUIRY_TYPES.find((i) => i.id === inquiry);
    if (!meta) return base;
    const tag = `[${meta.code}]`;
    if (base.startsWith("mailto:")) {
      const subject = encodeURIComponent(`${tag} New inquiry from lielwainberg.com`);
      return `${base}?subject=${subject}`;
    }
    if (base.startsWith("https://wa.me/")) {
      const text = encodeURIComponent(WA_TEXT[meta.id]);
      return `${base}?text=${text}`;
    }
    return base;
  };
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="section-shell contact-section__grid">
        <Reveal>
          <div>
            <p className="eyebrow">06 / {t({ he: "יצירת קשר", en: "Contact" })}</p>
            <h2 id="contact-title">
              {t({
                he: "אפשר פשוט לכתוב לי.",
                en: "You can just write to me.",
              })}
            </h2>
            <p className="mt-8 font-sans font-light text-[1rem] text-[var(--silver)] leading-[1.85] max-w-md">
              {t({
                he: "ספרו לי מה אתם מנסים לבנות, מה כבר קיים, ואיפה זה נתקע. אם אני יכול לעזור, נמשיך משם.",
                en: "Tell me what you are trying to build, what already exists, and where it is stuck. If I can help, we’ll take it from there.",
              })}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-col">
            {/* Inquiry type selector */}
            <div className="mb-6">
              <div className="font-mono text-[0.62rem] tracking-[0.3em] text-[var(--silver-dim)] uppercase mb-3">
                {t({ he: "// סוג הפנייה", en: "// INQUIRY_TYPE" })}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
                {INQUIRY_TYPES.map((opt) => {
                  const active = inquiry === opt.id;
                  return (
                    <Button
                      variant="ghost"
                      key={opt.id}
                      type="button"
                      onClick={() => setInquiry(opt.id)}
                      aria-pressed={active}
                      data-practice={opt.id}
                      className={`inquiry-option relative flex-col gap-0 h-auto px-3 py-3 text-center ${
                        active
                          ? "bg-[var(--purple-dim)] text-[var(--purple-light)]"
                          : "bg-[var(--charcoal)] text-[var(--silver)] hover:bg-[var(--surface-2)] hover:text-[var(--white)]"
                      }`}
                    >
                      <div className="inquiry-option__code">
                        [ {opt.code} ]
                      </div>
                      <div className="inquiry-option__label">
                        {t(opt.label)}
                      </div>
                      {active && (
                        <span
                          className="inquiry-option__bar absolute top-0 bottom-0 w-[2px]"
                          style={{ [dir === "rtl" ? "right" : "left"]: 0 } as React.CSSProperties}
                        />
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>

            {LINKS.map((l) => (
              <a
                key={l.label}
                href={buildHref(l.href)}
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <div className="contact-link__copy">
                  <span className="contact-link__label">{l.label}</span>
                  <span className="contact-link__value" dir="ltr">{l.value}</span>
                </div>
                <ArrowUpRight aria-hidden />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
