import { useEffect, useState } from "react";
import { Accessibility, X, Plus, Minus, RotateCcw, Contrast, Link2, Droplet } from "lucide-react";

type Settings = {
  fontScale: number;
  contrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
};

const DEFAULTS: Settings = {
  fontScale: 1,
  contrast: false,
  grayscale: false,
  highlightLinks: false,
  readableFont: false,
};

const STORAGE_KEY = "a11y-settings";

function applySettings(s: Settings) {
  const root = document.documentElement;
  root.style.fontSize = `${s.fontScale * 100}%`;
  root.classList.toggle("a11y-contrast", s.contrast);
  root.classList.toggle("a11y-grayscale", s.grayscale);
  root.classList.toggle("a11y-links", s.highlightLinks);
  root.classList.toggle("a11y-readable", s.readableFont);
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...DEFAULTS, ...JSON.parse(raw) } as Settings;
        setSettings(parsed);
        applySettings(parsed);
      }
    } catch {}
  }, []);

  const update = (patch: Partial<Settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    applySettings(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const reset = () => {
    setSettings(DEFAULTS);
    applySettings(DEFAULTS);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="פתיחת תפריט נגישות"
        aria-expanded={open}
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
        className="fixed right-4 z-[9998] flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-2 ring-background transition hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
      >
        <Accessibility className="h-6 w-6" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="תפריט נגישות"
          dir="rtl"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 80px)" }}
          className="fixed right-4 z-[9998] w-[280px] rounded-xl border border-border bg-background p-4 shadow-2xl"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">נגישות</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="סגירה"
              className="rounded p-1 text-muted-foreground hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-3">
            <div className="mb-1 text-xs text-muted-foreground">גודל טקסט</div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => update({ fontScale: Math.max(0.8, +(settings.fontScale - 0.1).toFixed(2)) })}
                aria-label="הקטנת טקסט"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-accent"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="flex-1 text-center text-sm font-medium text-foreground">
                {Math.round(settings.fontScale * 100)}%
              </div>
              <button
                type="button"
                onClick={() => update({ fontScale: Math.min(1.6, +(settings.fontScale + 0.1).toFixed(2)) })}
                aria-label="הגדלת טקסט"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-accent"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <Toggle icon={<Contrast className="h-4 w-4" />} label="ניגודיות גבוהה" active={settings.contrast} onClick={() => update({ contrast: !settings.contrast })} />
            <Toggle icon={<Droplet className="h-4 w-4" />} label="גווני אפור" active={settings.grayscale} onClick={() => update({ grayscale: !settings.grayscale })} />
            <Toggle icon={<Link2 className="h-4 w-4" />} label="הדגשת קישורים" active={settings.highlightLinks} onClick={() => update({ highlightLinks: !settings.highlightLinks })} />
            <Toggle icon={<span className="font-bold text-xs">Aa</span>} label="גופן קריא" active={settings.readableFont} onClick={() => update({ readableFont: !settings.readableFont })} />
          </div>

          <button
            type="button"
            onClick={reset}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground hover:bg-accent"
          >
            <RotateCcw className="h-4 w-4" /> איפוס
          </button>
        </div>
      )}
    </>
  );
}

function Toggle({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm transition ${
        active ? "border-primary bg-primary/10 text-foreground" : "border-border text-foreground hover:bg-accent"
      }`}
    >
      <span className="flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center text-muted-foreground">{icon}</span>
        {label}
      </span>
      <span className={`h-2 w-2 rounded-full ${active ? "bg-primary" : "bg-muted-foreground/30"}`} />
    </button>
  );
}
