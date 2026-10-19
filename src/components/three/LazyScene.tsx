import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useMotionPreference } from '@/hooks/use-motion-preference';
import { useI18n } from '@/components/i18n/I18nContext';
import type { ModeId } from './Scenes';
import type { ModelKey } from '@/lib/models';

const Scene = lazy(() => import('./Scenes').then(m => ({ default: m.AuthoredScene })));
const MODELS: Record<ModeId, ModelKey[]> = {
  digital: ['aiCore', 'code', 'system', 'cube', 'balldigital'],
  canine: ['dogHead', 'dog', 'clicker', 'whistle', 'bone', 'collar', 'ball'],
  liquid: ['shaker', 'jigger', 'ice', 'whiskey', 'coupe'],
};
const LABELS: Record<ModelKey, { he: string; en: string }> = {
  aiCore: { he: 'ליבת AI', en: 'AI core' }, code: { he: 'קוד', en: 'Code' }, system: { he: 'מערכת', en: 'System' }, cube: { he: 'קובייה', en: 'Cube' }, balldigital: { he: 'כדור דיגיטלי', en: 'Digital sphere' },
  dogHead: { he: 'דיוקן כלב', en: 'Dog portrait' }, dog: { he: 'כלב', en: 'Dog' }, clicker: { he: 'קליקר', en: 'Clicker' }, whistle: { he: 'משרוקית', en: 'Whistle' }, bone: { he: 'עצם', en: 'Bone' }, collar: { he: 'קולר', en: 'Collar' }, ball: { he: 'כדור', en: 'Ball' },
  shaker: { he: 'שייקר', en: 'Shaker' }, jigger: { he: 'ג׳יגר', en: 'Jigger' }, ice: { he: 'קרח', en: 'Ice' }, whiskey: { he: 'בקבוק ויסקי', en: 'Whiskey bottle' }, coupe: { he: 'כוס קופה', en: 'Coupe glass' },
};
class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function LazyScene({ kind, mode = 'digital', fallback }: { kind: 'hero' | ModeId; mode?: ModeId; fallback: ReactNode }) {
  const { t } = useI18n();
  const world = kind === 'hero' ? mode : kind;
  const models = MODELS[world];
  const wrap = useRef<HTMLDivElement>(null);
  const progress = useRef(0.45);
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(false);
  const [available, setAvailable] = useState(false);
  const [index, setIndex] = useState(0);
  const [manual, setManual] = useState<number | null>(null);
  const [readyModel, setReadyModel] = useState<ModelKey | null>(null);
  const [failed, setFailed] = useState(false);
  const paused = useMotionPreference();
  const selected = manual ?? index;
  const ready = readyModel !== null;
  const onReady = useCallback((model: ModelKey) => setReadyModel(model), []);
  const onError = useCallback(() => setFailed(true), []);
  useEffect(() => { setFailed(false); }, [selected, world]);
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    setAvailable(Boolean(gl));
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    const el = wrap.current;
    if (!el) return;
    const prefetch = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setNear(true); prefetch.disconnect(); } }, { rootMargin: '200px' });
    const visibility = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    prefetch.observe(el); visibility.observe(el);
    return () => { prefetch.disconnect(); visibility.disconnect(); };
  }, []);
  useEffect(() => {
    if (!active || paused) return;
    const el = wrap.current;
    const track = el;
    if (!track) return;
    const update = () => {
      const rect = track.getBoundingClientRect();
      const p = Math.max(0, Math.min(0.9999, (innerHeight - rect.top) / Math.max(innerHeight + rect.height, 1)));
      progress.current = p;
      setIndex(previous => { const next = Math.floor(p * models.length); return previous === next ? previous : next; });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [active, paused, models.length]);
  return <div ref={wrap} className="authored-stage" aria-busy={!failed && readyModel !== models[selected]}>
    <div className="authored-stage__canvas" aria-hidden="true">
      {(!ready || failed || !available) && <div className="authored-stage__fallback">{fallback}</div>}
      {near && available && <SceneBoundary key={world} onError={onError}><Suspense fallback={null}><Scene model={models[selected]} progress={progress} active={active} paused={paused} onReady={onReady} onError={onError} /></Suspense></SceneBoundary>}
    </div>
    <div className="authored-stage__caption"><span>{t(LABELS[readyModel ?? models[selected]])}</span><span>{String((readyModel ? models.indexOf(readyModel) : selected) + 1).padStart(2, '0')} / {models.length}</span></div>
    {failed && <p role="status">{t({ he: "האובייקט לא נטען. אפשר לבחור אובייקט אחר.", en: "This object could not load. Choose another object." })}</p>}
    <div className="authored-stage__controls" role="group" aria-label={t({ he: 'בחירת אובייקט', en: 'Choose an object' })}>
      {models.map((model, i) => <button key={model} type="button" aria-label={t(LABELS[model])} aria-pressed={selected === i} onClick={() => setManual(i)}><span /></button>)}
      {manual !== null && <button type="button" className="authored-stage__auto" onClick={() => setManual(null)}>{t({ he: 'לפי גלילה', en: 'Follow scroll' })}</button>}
    </div>
  </div>;
}
