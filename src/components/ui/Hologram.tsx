import { useEffect, useRef } from "react";
import heroAsset from "@/assets/liel-hero-constellation.jpg.asset.json";

export function Hologram() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 15 : 30;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * window.devicePixelRatio;
      canvas.height = r.height * window.devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: (Math.random() * 2 + 1) * window.devicePixelRatio,
      vy: -(Math.random() * 0.3 + 0.1) * window.devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.2 * window.devicePixelRatio,
      a: Math.random() * 0.6 + 0.2,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${p.a})`;
        ctx.shadowColor = "rgba(168,85,247,0.8)";
        ctx.shadowBlur = 8;
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* glow */}
      <div
        className="absolute inset-0 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(ellipse 55% 75% at 50% 50%, rgba(124,58,237,0.22), rgba(168,85,247,0.07), transparent 70%)",
        }}
      />
      {/* particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* figure container */}
      <div className="relative w-[78%] max-w-[520px] aspect-square">
        <img
          src={heroAsset.url}
          alt="Liel — holographic portrait"
          className="absolute inset-0 w-full h-full object-contain animate-flicker select-none"
          style={{
            filter:
              "drop-shadow(0 0 14px rgba(168,85,247,0.55)) drop-shadow(0 0 36px rgba(124,58,237,0.25)) brightness(0.95) contrast(1.1)",
          }}
          draggable={false}
        />
        {/* scan lines */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-60"
          style={{
            background:
              "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(168,85,247,0.07) 3px, rgba(168,85,247,0.07) 4px)",
          }}
        />
        {/* scan beam */}
        <div
          className="absolute left-0 right-0 h-[3px] animate-scan-beam pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(168,85,247,0.55), transparent)",
            filter: "blur(1.5px)",
          }}
        />
        {/* HUD brackets */}
        <span className="hud-bracket tl" />
        <span className="hud-bracket tr" />
        <span className="hud-bracket bl" />
        <span className="hud-bracket br" />
      </div>

      {/* HUD labels */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] tracking-[0.3em] text-[rgba(168,85,247,0.5)]">
        [ LIEL.SYS · v2.2 ]
      </div>
      <div className="absolute top-4 right-4 font-mono text-[0.55rem] tracking-widest text-[rgba(168,85,247,0.45)]">
        [ 31.7683°N · 35.2137°E ]
      </div>
    </div>
  );
}
