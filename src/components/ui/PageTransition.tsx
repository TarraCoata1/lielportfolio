import { useEffect, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";

const WASH: Record<string, string> = {
  "/": "var(--burgundy)",
  "/web": "var(--digital)",
  "/dogs": "var(--canine-accent)",
  "/bar": "var(--liquid-amber)",
};

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const wash = WASH[location.pathname] ?? "var(--burgundy)";

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);

  if (reduceMotion) {
    return <div className="page-transition-frame">{children}</div>;
  }

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="page-transition-frame"
    >
      <motion.div
        className="page-wash"
        aria-hidden="true"
        style={{ background: wash }}
        initial={{ opacity: 0.28 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      />
      {children}
    </motion.div>
  );
}
