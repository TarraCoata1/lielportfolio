import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const MARKS = [
  { id: "tarracoata", src: "/icons/tarracoata-512.png", x: 0, y: -1 },
  { id: "canine", src: "/icons/canine-512.png", x: 1, y: 0 },
  { id: "liquid", src: "/icons/liquid-512.png", x: 0, y: 1 },
  { id: "liel", src: "/icons/liel-512.png", x: -1, y: 0 },
];
const EASE = [0.22, 1, 0.36, 1] as const;

/** Signature entry: four identities appear around a thin ring, converge, and resolve into Liel. */
export function OpeningLoader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("liel-intro-seen");
    if (seen) return;
    setVisible(true);
    const total = seen ? 0 : reduceMotion ? 450 : 2700;
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("liel-intro-seen", "1");
      setVisible(false);
    }, total);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.2 : 0.35 } }}
          className="opening-loader"
          aria-hidden="true"
          onClick={() => setVisible(false)}
        >
          <div className="brand-loader">
            <motion.span
              className="brand-loader__ring"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.4] }}
              transition={{ duration: 2.3, times: [0, 0.2, 0.75, 1], ease: EASE }}
            />
            {!reduceMotion && MARKS.map((m, i) => (
              <motion.img
                key={m.id}
                src={m.src}
                alt=""
                className={`brand-loader__mark brand-loader__mark--${m.id}`}
                style={{ ["--mx" as string]: m.x, ["--my" as string]: m.y }}
                initial={{ opacity: 0, scale: 0.7, x: `calc(${m.x} * var(--r))`, y: `calc(${m.y} * var(--r))` }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.7, 1, 1, 0.5],
                  x: [`calc(${m.x} * var(--r))`, `calc(${m.x} * var(--r))`, `calc(${m.x} * var(--r))`, "0px"],
                  y: [`calc(${m.y} * var(--r))`, `calc(${m.y} * var(--r))`, `calc(${m.y} * var(--r))`, "0px"],
                }}
                transition={{ duration: 2.2 - i * 0.3, delay: 0.4 + i * 0.3, times: [0, 0.2, 0.7, 1], ease: EASE }}
              />
            ))}
            <motion.img
              src="/icons/liel-512.png"
              alt=""
              className="brand-loader__core"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={reduceMotion ? { duration: 0.2 } : { delay: 2.1, duration: 0.5, ease: EASE }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
