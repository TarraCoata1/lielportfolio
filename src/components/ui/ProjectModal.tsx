import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Loader2 } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  url?: string | null;
};

export function ProjectModal({ open, onClose, title, url }: Props) {
  const { t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setBlocked(false);
    const blockTimer = window.setTimeout(() => {
      setBlocked((b) => (loading ? true : b));
    }, 6000);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(blockTimer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, url]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex flex-col"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 24, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative m-2 md:m-6 flex-1 flex flex-col bg-[var(--charcoal)] border border-[var(--border-purple)] rounded-[4px] overflow-hidden shadow-[0_30px_80px_rgba(124,58,237,0.25)]"
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--border-purple)] bg-black/60">
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--purple-light)] uppercase shrink-0">
                  [ LIVE_PREVIEW ]
                </span>
                <span className="truncate font-display text-[1rem] md:text-[1.2rem] text-[var(--white)]">
                  {title}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.2em] uppercase text-[var(--silver)] hover:text-[var(--purple-light)] border border-[var(--border)] hover:border-[var(--border-purple)] px-3 py-2 transition-colors"
                  >
                    {t({ he: "פתח בכרטיסייה", en: "Open in New Tab" })}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t({ he: "סגירה", en: "Close" })}
                  className="inline-flex items-center justify-center w-9 h-9 text-[var(--silver)] hover:text-[var(--purple-light)] border border-[var(--border)] hover:border-[var(--border-purple)] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 bg-[var(--black)]">
              {url && !blocked ? (
                <>
                  {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[var(--silver-dim)] font-mono text-[0.7rem] tracking-[0.25em] uppercase">
                      <Loader2 className="w-6 h-6 animate-spin text-[var(--purple-light)]" />
                      {t({ he: "טוען תצוגה...", en: "Loading preview..." })}
                    </div>
                  )}
                  <iframe
                    src={url}
                    title={title}
                    onLoad={() => setLoading(false)}
                    onError={() => setBlocked(true)}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    referrerPolicy="no-referrer"
                  />
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
                  <div className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--purple-light)] uppercase">
                    [ EMBED_BLOCKED ]
                  </div>
                  <p className="font-sans text-[1rem] text-[var(--silver)] max-w-md leading-[1.7]">
                    {t({
                      he: "לצערנו אתר זה לא תומך בתצוגה מוטמעת — לחץ לצפייה ישירה",
                      en: "This site doesn't allow embedded preview — open it directly in a new tab.",
                    })}
                  </p>
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-[var(--purple)] hover:bg-[var(--purple-hover)] text-white px-5 py-3 text-sm font-mono tracking-[0.15em] rounded-[2px] transition-colors"
                    >
                      {t({ he: "פתח אתר →", en: "Open Site →" })}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
