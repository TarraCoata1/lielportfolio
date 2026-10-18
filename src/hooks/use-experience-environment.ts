import { useEffect, useState } from "react";

export type ExperienceEnv = "liel" | "work" | "digital" | "canine" | "liquid";

/** One section geometry signal drives lighting, particles and cursor across routes. */
export function useExperienceEnvironment(fallback: ExperienceEnv = "liel") {
  const [environment, setEnvironment] = useState<ExperienceEnv>(fallback);
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".portfolio-page > section, .portfolio-page > footer, [data-facet]"));
    const update = () => {
      frame = 0;
      const probe = innerHeight * 0.46;
      let next = fallback;
      let smallest = Infinity;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top > probe || rect.bottom <= probe || rect.height >= smallest) continue;
        smallest = rect.height;
        const facet = section.dataset.facet;
        next = facet === "digital" || facet === "canine" || facet === "liquid" ? facet
          : section.matches("#digital-architecture, #tech-stack, .tech-section") ? "digital"
          : section.matches("#projects, #testimonials") ? "work" : "liel";
      }
      if (root.dataset.env !== next) root.dataset.env = next;
      setEnvironment(next);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
    };
  }, [fallback]);
  return environment;
}
