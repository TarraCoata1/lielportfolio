import { useEffect, useRef } from "react";
import { useMotionPreference } from "@/hooks/use-motion-preference";

/**
 * LIELWAINBERG.COM — Atmospheric Ambient Particle Engine
 * 
 * Features:
 * - 4 Contextual Modes: Digital (neural lattice), Canine (organic embers), Liquid (rising champagne bubbles), Liel (ambient stardust).
 * - Smooth color & physics morphing between sections.
 * - Fluid pointer physics (displacement & attraction).
 * - Zero layout thrashing: eliminates DOM querying and element masking.
 * - Auto-pausing on background tabs & reduced-motion accessibility.
 */

type Mode = "liel" | "digital" | "canine" | "liquid";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  alpha: number;
  baseAlpha: number;
  seed: number;
  speed: number;
}

const PALETTES: Record<Mode, { r: number; g: number; b: number; connectDist: number; maxSpeed: number }> = {
  liel: { r: 214, g: 58, b: 86, connectDist: 0, maxSpeed: 0.35 },
  digital: { r: 167, g: 139, b: 250, connectDist: 100, maxSpeed: 0.65 },
  canine: { r: 216, g: 182, b: 170, connectDist: 0, maxSpeed: 0.28 },
  liquid: { r: 255, g: 179, b: 92, connectDist: 0, maxSpeed: 0.8 },
};

export function ParticleNetwork() {
  const paused = useMotionPreference();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    if (paused) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let animId = 0;
    let lastTime = performance.now();
    let particles: Particle[] = [];

    // Current interpolated color & properties
    let currentMode: Mode = "liel";
    let curR = 214, curG = 58, curB = 86;
    let curConnect = 0;
    let curLiquid = 0;

    const mouse = { x: -2000, y: -2000, lastMove: 0, active: false };

    const updateDimensions = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, isFinePointer ? 1.5 : 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale density: mobile ~30, desktop ~85
      const count = isFinePointer
        ? Math.min(60, Math.max(24, Math.round((width * height) / 18000)))
        : Math.min(24, Math.max(12, Math.round((width * height) / 32000)));

      particles = Array.from({ length: count }, () => {
        const seed = Math.random() * Math.PI * 2;
        const baseSize = 0.8 + Math.random() * 1.6;
        const baseAlpha = 0.25 + Math.random() * 0.45;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: baseSize,
          baseSize,
          alpha: baseAlpha,
          baseAlpha,
          seed,
          speed: 0.5 + Math.random() * 0.8,
        };
      });
    };

    const getTargetMode = (): Mode => {
      const env = document.documentElement.dataset.env;
      if (env === "digital" || env === "canine" || env === "liquid") return env;
      return "liel";
    };

    const draw = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      targetModeCheck: {
        const target = getTargetMode();
        currentMode = target;
        const pal = PALETTES[target];
        // Exponential smoothing for transition between worlds
        const lerpFactor = 1 - Math.exp(-4 * dt);
        curR += (pal.r - curR) * lerpFactor;
        curG += (pal.g - curG) * lerpFactor;
        curB += (pal.b - curB) * lerpFactor;
        curConnect += (pal.connectDist - curConnect) * lerpFactor;
        curLiquid += ((target === "liquid" ? 1 : 0) - curLiquid) * lerpFactor;
      }

      ctx.clearRect(0, 0, width, height);

      const r = Math.round(curR);
      const g = Math.round(curG);
      const b = Math.round(curB);
      const still = performance.now() - mouse.lastMove > 1400;

      // 1. Update and draw particles
      const count = particles.length;
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        if (!p) continue;

        if (!prefersReducedMotion.matches) {
          // Mode-specific physics
          if (curLiquid > 0.05) {
            // Rising effervescence with slight sinusoidal wobble
            p.vy = - (0.45 + p.speed * 0.7) * (1 + curLiquid * 0.6);
            p.vx = Math.sin(now * 0.002 + p.seed) * 0.35;
          } else if (currentMode === "canine") {
            // Slow breathing ground state; dampens when still
            const amp = still ? 0.08 : 0.22;
            p.vx = Math.sin(now * 0.0008 + p.seed) * amp;
            p.vy = Math.cos(now * 0.0006 + p.seed) * amp;
          } else if (currentMode === "digital") {
            // Precise geometric flow
            p.vx = Math.cos(p.seed) * 0.32;
            p.vy = Math.sin(p.seed) * 0.32;
          } else {
            // Natural cosmic drift
            p.vx = Math.sin(now * 0.0004 + p.seed) * 0.25;
            p.vy = Math.cos(now * 0.0003 + p.seed) * 0.25;
          }

          // Pointer interaction: gentle repulsion
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            const radius = currentMode === "digital" ? 140 : 100;
            if (dist < radius && dist > 1) {
              const force = (1 - dist / radius) * (currentMode === "digital" ? 45 : 25) * dt;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
          }

          p.x += p.vx * 60 * dt;
          p.y += p.vy * 60 * dt;

          // Wrap around edges cleanly
          if (p.x < -10) p.x = width + 10;
          else if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          else if (p.y > height + 10) p.y = -10;
        }

        // Pulse alpha gently
        const pulse = Math.sin(now * 0.0015 + p.seed) * 0.12;
        const alpha = Math.max(0.08, Math.min(0.85, p.baseAlpha + pulse));

        ctx.beginPath();
        const renderSize = curLiquid > 0.1 ? p.size * (1 + curLiquid * 0.35) : p.size;
        ctx.arc(p.x, p.y, renderSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();

        // Liquid micro-bubbles get a subtle ring highlight
        if (curLiquid > 0.3) {
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.8 * curLiquid})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // 2. Connective lines for Digital mode (neural lattice)
      if (curConnect > 10 && !prefersReducedMotion.matches) {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < count; i++) {
          const pi = particles[i];
          if (!pi) continue;
          for (let j = i + 1; j < count; j++) {
            const pj = particles[j];
            if (!pj) continue;
            const dist = Math.hypot(pi.x - pj.x, pi.y - pj.y);
            if (dist < curConnect) {
              const lineAlpha = (1 - dist / curConnect) * 0.18;
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha})`;
              ctx.beginPath();
              ctx.moveTo(pi.x, pi.y);
              ctx.lineTo(pj.x, pj.y);
              ctx.stroke();
            }
          }
        }
      }

      if (!prefersReducedMotion.matches && !document.hidden) {
        animId = requestAnimationFrame(draw);
      }
    };

    const start = () => {
      cancelAnimationFrame(animId);
      lastTime = performance.now();
      if (!document.hidden) {
        if (prefersReducedMotion.matches) {
          draw(performance.now());
        } else {
          animId = requestAnimationFrame(draw);
        }
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isFinePointer) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.lastMove = performance.now();
      mouse.active = true;
    };

    const onPointerLeave = () => {
      mouse.active = false;
      mouse.x = -2000;
      mouse.y = -2000;
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        start();
      }
    };

    const onResize = () => {
      updateDimensions();
      start();
    };

    updateDimensions();
    start();

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange, { passive: true });
    prefersReducedMotion.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      prefersReducedMotion.removeEventListener("change", start);
    };
  }, [paused]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-network"
      aria-hidden="true"
    />
  );
}
