import { useI18n } from "../i18n/I18nContext";
import { motion } from "framer-motion";

export function LangToggle() {
  const { locale, setLocale } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="fixed right-4 z-50 flex items-center gap-1 rounded-full border border-[var(--border)] bg-black/40 backdrop-blur-md p-1 font-mono text-[0.65rem] tracking-wider"
      style={{ top: "calc(env(safe-area-inset-top, 0px) + 1rem)" }}
    >
      <button
        onClick={() => setLocale("he")}
        className={`px-3 py-1.5 rounded-full transition-colors ${locale === "he" ? "bg-[var(--purple-dim)] text-[var(--purple-light)]" : "text-[var(--silver-dim)] hover:text-[var(--silver)]"}`}
      >
        HE
      </button>
      <button
        onClick={() => setLocale("en")}
        className={`px-3 py-1.5 rounded-full transition-colors ${locale === "en" ? "bg-[var(--purple-dim)] text-[var(--purple-light)]" : "text-[var(--silver-dim)] hover:text-[var(--silver)]"}`}
      >
        EN
      </button>
    </motion.div>
  );
}
