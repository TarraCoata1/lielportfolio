import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalSquare, X } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";

type Line = { kind: "in" | "out" | "sys"; text: string };

const HELP = `Available commands:
  help              — list commands
  whoami            — identify caller
  status            — system status
  chief             — meet the chief operator
  cocktail          — house cocktail recipe
  social            — open communication channels
  nav <section>     — jump to: about · services · projects · contact
  lang <he|en>      — switch language
  clear             — clear the buffer

shortcuts:  ~  open · esc  close · ↑↓  history`;

const CHIEF_ASCII = `       __
   (___()'\`;     [ CHIEF · canine.core ]
   /,    /\`     status: loyal
   \\\\"--\\\\       protocol: trust-based`;

const COCKTAIL = `[ HOUSE_POUR · "QUIET CONFIDENCE" ]
  50ml  mezcal espadín
  20ml  lime, fresh
  15ml  agave (1:1)
  10ml  ancho reyes verde
   2 dashes  celery bitters
shake hard · double strain · coupe · grapefruit oil`;

const SOCIAL = `// channels open
  whatsapp  https://wa.me/972546969367
  instagram https://instagram.com/lielwainberg
  email     lielwa2004@gmail.com`;

const WHOAMI = `guest@lw.sys ~ unauthenticated viewer · read access granted`;

const STATUS = `[ LW.SYS · v2.2 ]
  cores      03 / 03 online
  uptime     ∞
  location   31.7683°N · 35.2137°E
  channel    open`;

const INTRO: Line[] = [
  { kind: "sys", text: "LW.SYS · console v2.2" },
  { kind: "sys", text: 'type "help" for commands · press ~ to toggle' },
];

const NAV_TARGETS: Record<string, string> = {
  about: "#about",
  services: "#services",
  projects: "#projects",
  contact: "#contact",
};

type ExecCtx = {
  setLocale: (l: "he" | "en") => void;
};

function exec(cmd: string, ctx: ExecCtx): Line[] {
  const raw = cmd.trim();
  if (!raw) return [];
  const c = raw.toLowerCase();
  const [head, ...rest] = c.split(/\s+/);
  const arg = rest.join(" ");

  if (head === "help") return [{ kind: "out", text: HELP }];
  if (head === "chief") return [{ kind: "out", text: CHIEF_ASCII }];
  if (head === "cocktail") return [{ kind: "out", text: COCKTAIL }];
  if (head === "social") return [{ kind: "out", text: SOCIAL }];
  if (head === "whoami") return [{ kind: "out", text: WHOAMI }];
  if (head === "status") return [{ kind: "out", text: STATUS }];
  if (head === "clear") return [{ kind: "sys", text: "__CLEAR__" }];
  if (head === "nav") {
    const target = NAV_TARGETS[arg];
    if (!target) return [{ kind: "out", text: `unknown section: ${arg || "(empty)"} — try about · services · projects · contact` }];
    if (typeof document !== "undefined") {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return [{ kind: "out", text: `→ jumping to ${arg}` }];
  }
  if (head === "lang") {
    if (arg === "he" || arg === "en") {
      ctx.setLocale(arg);
      return [{ kind: "out", text: `language → ${arg.toUpperCase()}` }];
    }
    return [{ kind: "out", text: `usage: lang <he|en>` }];
  }
  return [{ kind: "out", text: `command not found: ${head}  (try "help")` }];
}

export function CliTerminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(INTRO);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // Lazy import locale setter without forcing context dependency on module init
  // We read it via a local hook below.
  const setLocaleRef = useRef<(l: "he" | "en") => void>(() => {});

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, open]);

  // Global keyboard shortcut: `~` to toggle, Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (e.key === "Escape" && open) {
        setOpen(false);
        return;
      }
      if (e.key === "`" || e.key === "~") {
        if (typing && !open) return;
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Pull locale setter from context
  const { setLocale } = useI18n();
  setLocaleRef.current = setLocale;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = value;
    setValue("");
    setHistIdx(null);
    if (cmd.trim()) setHistory((h) => [...h, cmd]);
    const result = exec(cmd, { setLocale: (l) => setLocaleRef.current(l) });
    setLines((prev) => {
      const echoed: Line[] = [{ kind: "in", text: `> ${cmd}` }, ...result];
      const next = [...prev, ...echoed];
      if (result.some((r) => r.text === "__CLEAR__")) return INTRO;
      return next;
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      if (history.length === 0) return;
      e.preventDefault();
      const next = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setValue(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      if (histIdx === null) return;
      e.preventDefault();
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(null);
        setValue("");
      } else {
        setHistIdx(next);
        setValue(history[next] ?? "");
      }
    }
  };

  return (
    <>
      {/* Trigger chip */}
      <motion.button
        type="button"
        aria-label="Open console (~)"
        title="Open console (~)"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: open ? 0 : 1, y: open ? 12 : 0, pointerEvents: open ? "none" : "auto" }}
        transition={{ duration: 0.3 }}
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
        className="fixed left-4 z-[60] flex items-center gap-2 rounded-full border border-[var(--border-purple)] bg-black/70 backdrop-blur-md px-3 py-2 font-mono text-[0.6rem] tracking-[0.25em] uppercase text-[var(--purple-light)] hover:bg-[var(--purple-dim)] transition-colors"
      >
        <TerminalSquare className="w-3.5 h-3.5" strokeWidth={1.3} />
        <span>console</span>
        <span className="ms-1 hidden sm:inline text-[var(--silver-dim)] normal-case tracking-normal">~</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            dir="ltr"
            style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
            className="fixed left-4 z-[60] w-[min(92vw,420px)] max-w-[420px] rounded-[2px] border border-[var(--border-purple)] bg-black/90 backdrop-blur-md shadow-[0_20px_60px_rgba(124,58,237,0.25)] font-mono text-[0.72rem] text-[var(--silver)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-purple)] px-3 py-2">
              <span className="tracking-[0.25em] uppercase text-[var(--purple-light)] text-[0.6rem]">
                [ LW.SYS · console ]
              </span>
              <button
                aria-label="Close console"
                onClick={() => setOpen(false)}
                className="text-[var(--silver-dim)] hover:text-[var(--purple-light)] transition-colors"
              >
                <X className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
            <div
              ref={scrollRef}
              className="h-[260px] overflow-y-auto px-3 py-3 leading-[1.55] whitespace-pre-wrap"
            >
              {lines.map((l, i) => (
                <div
                  key={i}
                  className={
                    l.kind === "in"
                      ? "text-[var(--purple-light)]"
                      : l.kind === "sys"
                        ? "text-[var(--silver-dim)]"
                        : "text-[var(--silver)]"
                  }
                >
                  {l.text}
                </div>
              ))}
            </div>
            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-[var(--border-purple)] px-3 py-2">
              <span className="text-[var(--purple-light)]">{`>`}</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                className="flex-1 bg-transparent outline-none text-[var(--white)] placeholder:text-[var(--silver-dim)]"
                placeholder='type "help"'
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
