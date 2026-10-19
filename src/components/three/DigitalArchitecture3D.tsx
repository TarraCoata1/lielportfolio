import { LazyScene } from './LazyScene';

/** Compatibility entry: authored assets always mount through the shared lazy stage. */
export function DigitalArchitecture3D() {
  return <LazyScene kind="digital" fallback={null} />;
}
