import { useEffect, useRef, useState } from "react";

/** Aurora-inspired lagging ring, without trails, click bursts or hiding native selection. */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let x = -100, y = -100, rx = -100, ry = -100, frame = 0, last = 0;
    let visible = false;
    const paint = (time: number) => {
      frame = 0;
      const dt = Math.min((time - (last || time - 16)) / 1000, 0.05); last = time;
      const damping = 1 - Math.exp(-22 * dt);
      rx += (x - rx) * damping; ry += (y - ry) * damping;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      if (visible && Math.hypot(x - rx, y - ry) > 0.15) frame = requestAnimationFrame(paint);
    };
    const hide = () => {
      visible = false; cancelAnimationFrame(frame); frame = 0;
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
    };
    const move = (e: PointerEvent) => {
      if (!fine.matches || reduce.matches || !(e.target instanceof Element)) return;
      x = e.clientX; y = e.clientY;
      const text = e.target.closest("input, textarea, select, [contenteditable=true]");
      if (text) { hide(); return; }
      if (!visible) { rx = x; ry = y; last = 0; }
      visible = true;
      if (dot.current) dot.current.style.opacity = "1";
      if (ring.current) ring.current.style.opacity = "1";
      const local = e.target.closest<HTMLElement>("[data-facet], [data-env], [data-w]");
      const env = local?.dataset.facet ?? local?.dataset.w ?? local?.dataset.env ?? document.documentElement.dataset.env ?? "liel";
      document.documentElement.dataset.cursor = env;
      ring.current?.classList.toggle("is-hot", !!e.target.closest("a,button,summary,[role=tab]"));
      ring.current?.classList.toggle("is-gallery", !!e.target.closest(".gallery-image, .project-story__image"));
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const configure = () => { setEnabled(fine.matches && !reduce.matches); hide(); };
    configure(); fine.addEventListener("change", configure); reduce.addEventListener("change", configure);
    addEventListener("pointermove", move, { passive: true }); document.addEventListener("pointerleave", hide);
    addEventListener("blur", hide);
    return () => {
      hide(); fine.removeEventListener("change", configure); reduce.removeEventListener("change", configure);
      removeEventListener("pointermove", move); document.removeEventListener("pointerleave", hide); removeEventListener("blur", hide);
      delete document.documentElement.dataset.cursor;
    };
  }, []);
  if (!enabled) return null;
  return <><div ref={ring} className="lw-cursor lw-cursor__ring" aria-hidden><span /></div><div ref={dot} className="lw-cursor lw-cursor__dot" aria-hidden><span /></div></>;
}
