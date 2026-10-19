import { Component, Suspense, useDeferredValue, useEffect, useMemo, useRef, type ReactNode, type RefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { MODEL_PATHS, type ModelKey } from '@/lib/models';

export type ModeId = 'digital' | 'canine' | 'liquid';
export type SceneProps = { model: ModelKey; progress: RefObject<number>; active: boolean; paused: boolean; onReady: (model: ModelKey) => void; onError: () => void };

class ModelBoundary extends Component<{ children: ReactNode; onError: () => void; resetKey: ModelKey }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  componentDidUpdate(previous: Readonly<{ resetKey: ModelKey }>) { if (previous.resetKey !== this.props.resetKey && this.state.failed) this.setState({ failed: false }); }
  render() { return this.state.failed ? null : this.props.children; }
}

function AuthoredObject({ model, progress, paused, onReady }: SceneProps) {
  const { scene } = useGLTF(MODEL_PATHS[model]);
  const group = useRef<THREE.Group>(null);
  const shown = useRef(progress.current);
  const entrance = useRef(1);
  useEffect(() => { entrance.current = paused ? 1 : 0.94; }, [model, paused]);
  const invalidate = useThree(state => state.invalidate);
  const object = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = 2.65 / Math.max(size.x, size.y, size.z, 0.001);
    clone.scale.multiplyScalar(scale);
    clone.position.sub(center.multiplyScalar(scale));
    return clone;
  }, [scene]);
  useEffect(() => { onReady(model); }, [object, model, onReady]);
  useFrame((_, delta) => {
    if (!group.current) return;
    entrance.current = paused ? 1 : THREE.MathUtils.damp(entrance.current, 1, 14, Math.min(delta, 0.05));
    group.current.scale.setScalar(entrance.current);
    if (entrance.current < 0.9999) invalidate();
    const target = paused ? 0.45 : progress.current;
    shown.current = paused ? target : THREE.MathUtils.damp(shown.current, target, 12, Math.min(delta, 0.05));
    if (!paused && Math.abs(target - shown.current) > 0.0001) invalidate();
    const p = shown.current;
    // All positions stay inside the dedicated stage; scroll is reversible.
    group.current.position.set(Math.sin(p * Math.PI * 2) * 0.28, Math.cos(p * Math.PI * 2) * 0.18, 0);
    group.current.rotation.set(-0.08 + p * 0.16, -0.4 + p * 1.1, Math.sin(p * Math.PI * 2) * 0.045);
  });
  return <group ref={group}><primitive object={object} dispose={null} /></group>;
}

function ScrollRender({ active, paused }: { active: boolean; paused: boolean }) {
  const invalidate = useThree(s => s.invalidate);
  useEffect(() => {
    if (!active || paused) { invalidate(); return; }
    const render = () => { if (!document.hidden) invalidate(); };
    window.addEventListener('scroll', render, { passive: true });
    window.addEventListener('resize', render);
    document.addEventListener('visibilitychange', render);
    render();
    return () => { window.removeEventListener('scroll', render); window.removeEventListener('resize', render); document.removeEventListener('visibilitychange', render); };
  }, [active, paused, invalidate]);
  return null;
}

export function AuthoredScene(props: SceneProps) {
  return <Canvas camera={{ position: [0, 0, 6.4], fov: 38 }} dpr={[1, 1.35]} frameloop={props.active ? 'demand' : 'never'} gl={{ alpha: true, antialias: true, powerPreference: 'default' }} onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); }}>
    <ScrollRender active={props.active} paused={props.paused} />
    <ambientLight intensity={0.7} />
    <directionalLight position={[3, 4, 5]} intensity={2.5} />
    <directionalLight position={[-3, 0, 2]} intensity={0.8} />
    <Environment resolution={64}>
      <Lightformer position={[0, 4, 2]} intensity={3} scale={[5, 3, 1]} />
      <Lightformer position={[-4, 1, 1]} rotation-y={Math.PI / 2} intensity={2} scale={[3, 5, 1]} />
    </Environment>
    <DeferredObject {...props} />
  </Canvas>;
}

/** Defer inside the R3F reconciler, where model loading actually suspends. */
function DeferredObject(props: SceneProps) {
  const displayedModel = useDeferredValue(props.model);
  return <ModelBoundary resetKey={props.model} onError={props.onError}>
    <Suspense fallback={null}><AuthoredObject {...props} model={displayedModel} /></Suspense>
  </ModelBoundary>;
}
