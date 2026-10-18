import { useEffect, useRef, useState, type ElementType } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/\\";

type Props = {
  text: string;
  /** ms to fully resolve */
  duration?: number;
  /** delay before starting */
  delay?: number;
  className?: string;
  as?: ElementType;
  /** trigger when element enters viewport (default true) */
  triggerOnView?: boolean;
};

/**
 * Fast "decoder" scramble — alphanumeric churn that locks into the
 * target text. Preserves whitespace and HTML-significant characters.
 */
export function TextScramble({
  text,
  duration = 550,
  delay = 0,
  className,
  as: Tag = "span",
  triggerOnView = true,
}: Props) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    startedRef.current = false;
    setOut(text);
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    let io: IntersectionObserver | null = null;

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const startedAt = performance.now() + delay;
      const chars = Array.from(text);
      const tick = (now: number) => {
        const elapsed = now - startedAt;
        if (elapsed < 0) {
          raf = requestAnimationFrame(tick);
          return;
        }
        const progress = Math.min(1, elapsed / duration);
        const locked = Math.floor(progress * chars.length);
        const next = chars
          .map((c, i) => {
            if (i < locked) return c;
            if (c === " " || c === "\n" || c === "\t") return c;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        setOut(next);
        if (progress < 1) raf = requestAnimationFrame(tick);
        else setOut(text);
      };
      raf = requestAnimationFrame(tick);
    };

    if (!triggerOnView) {
      start();
    } else {
      const el = ref.current;
      if (!el || typeof IntersectionObserver === "undefined") {
        start();
      } else {
        io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (e.isIntersecting) {
                start();
                io?.disconnect();
                break;
              }
            }
          },
          { threshold: 0.2 },
        );
        io.observe(el);
      }
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [text, duration, delay, triggerOnView]);

  return <Tag ref={ref as never} className={className}>{out}</Tag>;
}
