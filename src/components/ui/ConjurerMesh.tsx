import { useEffect, useRef } from "react";

/**
 * Mouse-reactive wireframe cube rendered to canvas. Lightweight
 * 3D-projected mesh that subtly rotates with pointer movement —
 * conjurer/system-interface visual cue.
 */
export function ConjurerMesh({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Cube vertices (centered, unit cube * scale)
    const verts: [number, number, number][] = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
    ];
    const edges: [number, number][] = [
      [0,1],[1,2],[2,3],[3,0],
      [4,5],[5,6],[6,7],[7,4],
      [0,4],[1,5],[2,6],[3,7],
    ];

    let targetRx = 0.3;
    let targetRy = 0.6;
    let rx = targetRx;
    let ry = targetRy;
    let auto = 0;

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      targetRy = nx * 1.6 + 0.6;
      targetRx = ny * 1.2 + 0.3;
    };
    window.addEventListener("pointermove", onMove);

    const tick = () => {
      auto += 0.0025;
      rx += (targetRx - rx) * 0.06;
      ry += (targetRy + auto - ry) * 0.06;

      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h) * 0.32;
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const cosY = Math.cos(ry), sinY = Math.sin(ry);

      const projected = verts.map(([x, y, z]) => {
        // rotateY
        let X = x * cosY - z * sinY;
        let Z = x * sinY + z * cosY;
        // rotateX
        let Y = y * cosX - Z * sinX;
        Z = y * sinX + Z * cosX;
        const persp = 3 / (3 + Z);
        return { x: cx + X * scale * persp, y: cy + Y * scale * persp, z: Z };
      });

      // edges
      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        const pa = projected[a];
        const pb = projected[b];
        const depth = (pa.z + pb.z) / 2;
        const alpha = 0.25 + Math.max(0, 0.55 - depth * 0.25);
        ctx.strokeStyle = `rgba(168,85,247,${alpha.toFixed(3)})`;
        ctx.shadowColor = "rgba(168,85,247,0.6)";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }
      // vertices
      ctx.shadowBlur = 10;
      for (const p of projected) {
        ctx.fillStyle = "rgba(216,180,254,0.9)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
