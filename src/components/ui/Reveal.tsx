import { useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "scale" | "fade";
  margin?: `${string}px` | string;
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
  margin = "0px 0px -60px 0px",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // Margin allows items slightly above viewport bottom to trigger without lag
  const inView = useInView(ref, { once, margin: margin as any });

  const isVisible = reduceMotion || inView;

  return (
    <div
      ref={ref}
      data-visible={isVisible}
      data-direction={direction}
      style={{
        transitionDelay: reduceMotion ? "0ms" : `${delay}s`,
      }}
      className={`precision-reveal ${className}`}
    >
      {children}
    </div>
  );
}
