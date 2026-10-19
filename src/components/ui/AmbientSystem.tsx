import { useEffect, useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import { MotionToggle } from "./MotionToggle";
import { ParticleNetwork } from "./ParticleNetwork";

type Env = "liel" | "work" | "digital" | "canine" | "liquid";

const MAP: [string, Env][] = [
  ["#top", "liel"],
  ["#about", "liel"],
  ["#digital-architecture, #projects, #testimonials", "work"],
  [".facet--digital, .world-shell--digital", "digital"],
  [".facet--canine, .world-shell--canine", "canine"],
  [".facet--liquid, .world-shell--liquid", "liquid"],
  [".world-transition--human, #contact, footer", "liel"],
];

const LABEL: Record<Env, { he: string; en: string }> = {
  liel: { he: "ליאל", en: "Liel" },
  work: { he: "עבודות", en: "Work" },
  digital: { he: "TARRACOATA", en: "TARRACOATA" },
  canine: { he: "CANINE.BEHAVIOR", en: "CANINE.BEHAVIOR" },
  liquid: { he: "LW.LIQUID", en: "LW.LIQUID" },
};

/** Material memory: interpolates a page-wide ambient colour between facets, adapts to local time,
 *  tracks pointer for the hero surface, and shows a truthful live metadata strip. */
export function AmbientSystem() {
  const { t, locale } = useI18n();
  const [env, setEnv] = useState<Env>("liel");
  const [now, setNow] = useState<Date | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const h = new Date().getHours();
    root.dataset.daypart = h >= 7 && h < 18 ? "day" : "night";
    setNow(new Date());
    const clock = window.setInterval(() => setNow(new Date()), 30000);

    const targets: [Element, Env][] = [];
    MAP.forEach(([sel, e]) => document.querySelectorAll(sel).forEach((el) => targets.push([el, e])));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const hit = targets.find(([el]) => el === entry.target);
          if (hit) { setEnv(hit[1]); root.dataset.env = hit[1]; }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    targets.forEach(([el]) => io.observe(el));

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        setProgress(max > 0 ? Math.round((scrollY / max) * 100) : 0);
      });
    };
    const fine = matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onMove = (e: PointerEvent) => {
      root.style.setProperty("--px", `${((e.clientX / innerWidth) * 100).toFixed(1)}%`);
      root.style.setProperty("--py", `${((e.clientY / innerHeight) * 100).toFixed(1)}%`);
    };
    addEventListener("scroll", onScroll, { passive: true });
    if (fine) addEventListener("pointermove", onMove, { passive: true });
    onScroll();
    return () => {
      io.disconnect(); clearInterval(clock); cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll); removeEventListener("pointermove", onMove);
    };
  }, []);

  const time = now?.toLocaleTimeString(locale === "he" ? "he-IL" : "en-GB", { hour: "2-digit", minute: "2-digit" });
  return (
    <>
      <div className="ambient-layer" aria-hidden="true" />
      <div className="light-field" aria-hidden="true"><i /><i /><i /></div>
      <ParticleNetwork />
      <MotionToggle />
      <div className="live-meta" aria-hidden="true">
        <span>{time ?? "--:--"}</span>
        <span>{locale.toUpperCase()}</span>
        <span className="live-meta__env">{t(LABEL[env])}</span>
        <span>{String(progress).padStart(2, "0")}%</span>
      </div>
    </>
  );
}
