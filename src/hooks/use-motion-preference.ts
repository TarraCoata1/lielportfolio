import { useEffect, useState } from 'react';

/** One preference shared by the atmosphere and every WebGL stage. */
export function useMotionPreference() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPaused(query.matches || document.documentElement.dataset.motion === 'paused');
    sync();
    query.addEventListener('change', sync);
    window.addEventListener('portfolio-motion', sync);
    return () => { query.removeEventListener('change', sync); window.removeEventListener('portfolio-motion', sync); };
  }, []);
  return paused;
}
