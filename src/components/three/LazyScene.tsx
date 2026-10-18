import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import type { ModeId } from "./Scenes";

const Hero = lazy(() => import("./Scenes").then((m) => ({ default: m.HeroScene })));
const Digital = lazy(() => import("./Scenes").then((m) => ({ default: m.DigitalScene })));
const Canine = lazy(() => import("./Scenes").then((m) => ({ default: m.CanineScene })));
const Liquid = lazy(() => import("./Scenes").then((m) => ({ default: m.LiquidScene })));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Mounts a 3D scene only on the client, only when near the viewport, with a static fallback. */
export function LazyScene({ kind, mode = "digital", fallback }: { kind: "hero" | ModeId; mode?: ModeId; fallback: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "on" | "off">("idle");
  useEffect(() => {
    if (!hasWebGL()) return setState("off");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setState("on");
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="absolute inset-0" aria-hidden="true">
      {state !== "on" ? (
        fallback
      ) : (
        <Suspense fallback={fallback}>
          {kind === "hero" ? <Hero mode={mode} /> : kind === "digital" ? <Digital /> : kind === "canine" ? <Canine /> : <Liquid />}
        </Suspense>
      )}
    </div>
  );
}
