import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export function MotionToggle() {
  const { t } = useI18n();
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try { setPaused(sessionStorage.getItem('portfolio-motion') === 'paused'); } catch { /* Optional storage. */ }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    document.documentElement.dataset.motion = paused ? 'paused' : 'running';
    window.dispatchEvent(new Event('portfolio-motion'));
    try { sessionStorage.setItem('portfolio-motion', paused ? 'paused' : 'running'); } catch { /* Optional storage. */ }
  }, [paused, loaded]);
  return <button type="button" className="motion-toggle" aria-pressed={paused} onClick={() => setPaused(p => !p)}>
    {paused ? <Play aria-hidden size={14} /> : <Pause aria-hidden size={14} />}
    {t({ he: paused ? 'הפעלת תנועה' : 'השהיית תנועה', en: paused ? 'Enable motion' : 'Pause motion' })}
  </button>;
}
