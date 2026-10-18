import { useMemo, useRef, useEffect, useState, Component, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Lightformer, Float } from "@react-three/drei";
import * as THREE from "three";
import { MODEL_PATHS } from "@/lib/models";

export type ModeId = "digital" | "canine" | "liquid";

/* Shared pointer, written outside React state (no re-render per move). */
const pointer = { x: 0, y: 0, last: 0 };
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.last = performance.now();
    },
    { passive: true },
  );
}

const damp = THREE.MathUtils.damp;

/** Error Boundary inside Canvas to prevent WebGL scene crashes */
class CanvasErrorBoundary extends Component<{ fallback?: ReactNode; children: ReactNode }, { hasError: boolean }> {
  constructor(props: { fallback?: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("3D Scene caught error:", error);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

/** Normalises any GLB to a target size, centred on its origin, with procedural fallback */
function Fit({
  url,
  size = 1,
  fallbackGeom = "box",
  children,
}: {
  url: string;
  size?: number;
  fallbackGeom?: "box" | "sphere" | "cylinder";
  children?: (o: THREE.Object3D) => ReactNode;
}) {
  try {
    const { scene } = useGLTF(url);
    const obj = useMemo(() => {
      const c = scene.clone(true);
      const box = new THREE.Box3().setFromObject(c);
      const s = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(s.x, s.y, s.z);
      const k = maxDim > 0.001 ? size / maxDim : 1;
      const center = box.getCenter(new THREE.Vector3());
      c.position.sub(center.multiplyScalar(k));
      c.scale.setScalar(k);
      c.traverse((m) => {
        if ((m as THREE.Mesh).isMesh) {
          (m as THREE.Mesh).castShadow = false;
        }
      });
      return c;
    }, [scene, size]);

    return <>{children ? children(obj) : <primitive object={obj} />}</>;
  } catch (err) {
    // Procedural fallback if model cannot be parsed
    return (
      <mesh>
        {fallbackGeom === "box" && <boxGeometry args={[size * 0.7, size * 0.7, size * 0.7]} />}
        {fallbackGeom === "sphere" && <sphereGeometry args={[size * 0.45, 16, 16]} />}
        {fallbackGeom === "cylinder" && <cylinderGeometry args={[size * 0.3, size * 0.3, size * 0.7, 16]} />}
        <meshStandardMaterial color="#888888" roughness={0.4} metalness={0.2} />
      </mesh>
    );
  }
}

/** Clamp metallic materials to a matte, carved surface */
function readable(o: THREE.Object3D) {
  o.traverse((m) => {
    const mat = (m as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
    if (mat && "metalness" in mat) {
      mat.metalness = 0.08;
      mat.roughness = 0.62;
      mat.envMapIntensity = 1.6;
      mat.needsUpdate = true;
    }
  });
  return o;
}

/* ---------- 3D Atmospheric Field ---------- */
function Field({
  mode,
  count = 180,
  spread = 7,
  color,
}: {
  mode: ModeId | "hero";
  count?: number;
  spread?: number;
  color: string;
}) {
  const ref = useRef<THREE.Points>(null);
  const { positions, seeds } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = (n: number) => (Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1;
      const a = Math.abs(r(1)),
        b = Math.abs(r(2)),
        c = Math.abs(r(3));
      if (mode === "digital") {
        p[i * 3] = Math.round((a - 0.5) * spread * 2) / 2;
        p[i * 3 + 1] = Math.round((b - 0.5) * spread) / 2;
        p[i * 3 + 2] = Math.round((c - 0.5) * 6) / 2 - 2;
      } else {
        p[i * 3] = (a - 0.5) * spread * 2;
        p[i * 3 + 1] = (b - 0.5) * spread;
        p[i * 3 + 2] = (c - 0.5) * 6 - 2;
      }
      s[i] = a;
    }
    return { positions: p, seeds: s };
  }, [count, spread, mode]);
  const base = useMemo(() => positions.slice(), [positions]);

  useFrame((st, dt) => {
    const g = ref.current?.geometry.attributes["position"] as THREE.BufferAttribute | undefined;
    if (!g) return;
    const t = st.clock.elapsedTime;
    const arr = g.array as Float32Array;
    const still = performance.now() - pointer.last > 1200;
    for (let i = 0; i < count; i++) {
      const s = seeds[i]!;
      if (mode === "liquid") {
        arr[i * 3 + 1]! += dt * (0.05 + s * 0.12);
        if (arr[i * 3 + 1]! > spread / 2) arr[i * 3 + 1] = -spread / 2;
        arr[i * 3] = base[i * 3]! + Math.sin(t * 0.4 + s * 6) * 0.08;
      } else if (mode === "canine") {
        const amp = still ? 0.01 : 0.06;
        arr[i * 3 + 1] = base[i * 3 + 1]! + Math.sin(t * 0.3 + s * 10) * amp;
      } else if (mode === "digital") {
        arr[i * 3 + 2] = base[i * 3 + 2]! + Math.sin(t * 0.8 + s * 20) * 0.04;
      } else {
        arr[i * 3] = base[i * 3]! + Math.sin(t * 0.15 + s * 8) * 0.2;
        arr[i * 3 + 1] = base[i * 3 + 1]! + Math.cos(t * 0.12 + s * 8) * 0.2;
      }
    }
    g.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={mode === "digital" ? 0.025 : 0.035}
        color={color}
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ---------- HALO: Motif per world ---------- */
function Halo({
  kind,
  radius = 1.8,
  tilt = 1.2,
  speed = 0.05,
  position = [0, 0, 0] as [number, number, number],
}: {
  kind: ModeId;
  radius?: number;
  tilt?: number;
  speed?: number;
  position?: [number, number, number];
}) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!g.current) return;
    g.current.rotation.z += dt * speed;
    g.current.rotation.x = damp(g.current.rotation.x, tilt + pointer.y * 0.08, 2, dt);
  });
  return (
    <group ref={g} position={position}>
      {kind === "digital" && (
        <mesh>
          <torusGeometry args={[radius, 0.018, 12, 160]} />
          <meshStandardMaterial color="#b9a2ff" emissive="#7c5cff" emissiveIntensity={1.2} />
        </mesh>
      )}
      {kind === "canine" && (
        <mesh>
          <torusGeometry args={[radius, 0.045, 16, 140]} />
          <meshStandardMaterial color="#4a1820" roughness={0.92} metalness={0.08} />
        </mesh>
      )}
      {kind === "liquid" && (
        <mesh>
          <torusGeometry args={[radius, 0.065, 20, 160]} />
          <meshPhysicalMaterial
            color="#ffb35c"
            roughness={0.05}
            transmission={0.88}
            thickness={0.6}
            ior={1.5}
            clearcoat={1}
          />
        </mesh>
      )}
    </group>
  );
}

/* ---------- HERO SCENE: Prismatic Metamorphic Core ---------- */
const CORE_STATES: Record<ModeId, { color: string; rough: number; metal: number; trans: number; light: string }> = {
  digital: { color: "#d8c4ff", rough: 0.05, metal: 0.15, trans: 0.95, light: "#8b5cf6" },
  canine: { color: "#cdbfa6", rough: 0.72, metal: 0.05, trans: 0.05, light: "#e8d6b0" },
  liquid: { color: "#e39a3b", rough: 0.08, metal: 0.2, trans: 0.88, light: "#ffb35c" },
};

function Core({ mode = "digital" }: { mode?: ModeId }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshPhysicalMaterial>(null);
  const light = useRef<THREE.PointLight>(null);
  const ring = useRef<THREE.Group>(null);
  const target = useMemo(() => new THREE.Color(), []);
  const ltarget = useMemo(() => new THREE.Color(), []);

  useFrame((_, dt) => {
    const s = CORE_STATES[mode] || CORE_STATES.digital;
    if (mat.current) {
      target.set(s.color);
      mat.current.color.lerp(target, 1 - Math.exp(-4 * dt));
      mat.current.roughness = damp(mat.current.roughness, s.rough, 4, dt);
      mat.current.metalness = damp(mat.current.metalness, s.metal, 4, dt);
      mat.current.transmission = damp(mat.current.transmission, s.trans, 4, dt);
    }
    if (light.current) {
      ltarget.set(s.light);
      light.current.color.lerp(ltarget, 1 - Math.exp(-4 * dt));
    }
    if (mesh.current) {
      mesh.current.rotation.y += dt * (mode === "liquid" ? 0.35 : mode === "digital" ? 0.22 : 0.08);
      mesh.current.rotation.x = damp(mesh.current.rotation.x, pointer.y * 0.35, 3, dt);
      mesh.current.rotation.z = damp(mesh.current.rotation.z, -pointer.x * 0.25, 3, dt);
    }
    if (ring.current) {
      ring.current.rotation.z += dt * 0.08;
      ring.current.rotation.x = damp(ring.current.rotation.x, 1.2 + pointer.y * 0.15, 2, dt);
    }
  });

  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshPhysicalMaterial
          ref={mat}
          color="#bfd4e6"
          roughness={0.06}
          transmission={0.95}
          thickness={2.2}
          ior={1.6}
          iridescence={0.35}
          clearcoat={1}
          envMapIntensity={1.6}
          flatShading
        />
      </mesh>
      <group ref={ring}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 3]}>
            <torusGeometry args={[2.0 + i * 0.15, 0.005, 8, 120]} />
            <meshBasicMaterial color="#e9e4da" transparent opacity={0.25} />
          </mesh>
        ))}
      </group>
      <pointLight ref={light} position={[2, 2, 3]} intensity={28} color="#8b5cf6" />
    </group>
  );
}

export function HeroScene({ mode = "digital" }: { mode?: ModeId }) {
  return (
    <Stage camera={[0, 0, typeof window !== "undefined" && window.innerWidth < 768 ? 6.2 : 7.8]}>
      <Core mode={mode} />
      <pointLight position={[-3, -1, 2]} intensity={20} color="#a91432" />
      <Field mode="hero" color="#e8b7bf" count={220} spread={9} />
    </Stage>
  );
}

/* ---------- DIGITAL SCENE: Modular System Assembly ---------- */
function DigitalAssembly() {
  const g = useRef<THREE.Group>(null);
  const cubes = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        home: new THREE.Vector3((i % 3) - 1, Math.floor(i / 3) - 1, 0).multiplyScalar(0.65),
        away: new THREE.Vector3(Math.sin(i * 2.1) * 2.5, Math.cos(i * 1.7) * 1.8, Math.sin(i) * 1.4),
      })),
    [],
  );
  const refs = useRef<(THREE.Group | null)[]>([]);

  useFrame((st, dt) => {
    const d = Math.min(1, Math.hypot(pointer.x, pointer.y));
    const k = 1 - d * 0.85;
    refs.current.forEach((m, i) => {
      if (!m) return;
      const c = cubes[i]!;
      m.position.x = damp(m.position.x, THREE.MathUtils.lerp(c.away.x, c.home.x, k), 3, dt);
      m.position.y = damp(m.position.y, THREE.MathUtils.lerp(c.away.y, c.home.y, k), 3, dt);
      m.position.z = damp(m.position.z, THREE.MathUtils.lerp(c.away.z, c.home.z, k), 3, dt);
      m.rotation.y = damp(m.rotation.y, (1 - k) * (i + 1), 2, dt);
    });
    if (g.current) {
      g.current.rotation.y = Math.sin(st.clock.elapsedTime * 0.2) * 0.35 + pointer.x * 0.25;
      g.current.rotation.x = pointer.y * 0.15;
    }
  });

  return (
    <group ref={g}>
      {/* Central AI Core node */}
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.2}>
        <group position={[0, 0, 0.3]}>
          <Fit url={MODEL_PATHS.aiCore} size={1.2} fallbackGeom="sphere" />
        </group>
      </Float>

      {/* Surrounding Modular Cubes */}
      {cubes.map((_, i) => (
        <group key={i} ref={(el) => (refs.current[i] = el)}>
          <Fit url={MODEL_PATHS.cube} size={0.48} fallbackGeom="box" />
        </group>
      ))}

      {/* Floating System node */}
      <Float speed={0.9} rotationIntensity={0.3} floatIntensity={0.3}>
        <group position={[1.8, 1.2, -0.6]} rotation={[0.2, 0.4, 0]}>
          <Fit url={MODEL_PATHS.system} size={0.7} fallbackGeom="box" />
        </group>
      </Float>

      <Halo kind="digital" radius={1.75} tilt={Math.PI / 2.3} speed={0.04} />
    </group>
  );
}

export function DigitalScene() {
  return (
    <Stage camera={[0, 0, 5.4]}>
      <DigitalAssembly />
      <pointLight position={[-3, 2, 3]} intensity={25} color="#a78bfa" />
      <pointLight position={[3, -2, -1]} intensity={18} color="#38bdf8" />
      <Field mode="digital" color="#c4b5fd" count={160} />
    </Stage>
  );
}

/* ---------- CANINE SCENE: Observational Focus & Gear ---------- */
function CanineObserver() {
  const head = useRef<THREE.Group>(null);
  const key = useRef<THREE.SpotLight>(null);
  const { viewport } = useThree();

  useFrame((_, dt) => {
    const still = performance.now() - pointer.last > 1200;
    if (head.current) {
      const ty = still ? pointer.x * 0.55 : 0.12;
      const tx = still ? -pointer.y * 0.22 : 0.04;
      head.current.rotation.y = damp(head.current.rotation.y, ty, still ? 2.2 : 0.8, dt);
      head.current.rotation.x = damp(head.current.rotation.x, tx, still ? 2.2 : 0.8, dt);
    }
    if (key.current) key.current.intensity = damp(key.current.intensity, still ? 100 : 55, 1.5, dt);
  });

  return (
    <>
      <group ref={head} position={[viewport.width > 6 ? 0.35 : 0, 0, 0]}>
        <Fit url={MODEL_PATHS.dogHead} size={2.3} fallbackGeom="sphere">
          {(o) => <primitive object={readable(o)} />}
        </Fit>
      </group>

      {/* Floating Training Clicker */}
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.25}>
        <group position={[-1.4, -0.7, 0.6]} rotation={[0.4, 0.6, 0]}>
          <Fit url={MODEL_PATHS.clicker} size={0.48} fallbackGeom="box" />
        </group>
      </Float>

      {/* Floating Training Whistle */}
      <Float speed={0.7} rotationIntensity={0.35} floatIntensity={0.25}>
        <group position={[-1.6, 0.8, -0.4]} rotation={[0.2, 0.8, -0.3]}>
          <Fit url={MODEL_PATHS.whistle} size={0.52} fallbackGeom="cylinder" />
        </group>
      </Float>

      {/* Floating Bone */}
      <Float speed={0.6} rotationIntensity={0.35} floatIntensity={0.3}>
        <group position={[1.7, -0.85, 0.4]} rotation={[0.2, -0.5, 0.5]}>
          <Fit url={MODEL_PATHS.bone} size={0.75} fallbackGeom="cylinder">
            {(o) => <primitive object={readable(o)} />}
          </Fit>
        </group>
      </Float>

      {/* Floating Tactical Collar */}
      <Float speed={0.5} rotationIntensity={0.25} floatIntensity={0.2}>
        <group position={[1.8, 0.9, -0.5]} rotation={[0.5, -0.3, 0.2]}>
          <Fit url={MODEL_PATHS.collar} size={0.8} fallbackGeom="cylinder" />
        </group>
      </Float>

      <Halo
        kind="canine"
        radius={1.6}
        tilt={0.12}
        speed={0.015}
        position={[viewport.width > 6 ? 0.35 : 0, 0.15, -0.9]}
      />

      <spotLight ref={key} position={[2.5, 3.5, 5]} angle={0.55} penumbra={1} intensity={60} decay={1} color="#f6e7cc" />
      <directionalLight position={[-3, 1, 4]} intensity={0.9} color="#e9dcc6" />
      <directionalLight position={[0, 2.5, -4]} intensity={2.4} color="#a8323f" />
    </>
  );
}

export function CanineScene() {
  return (
    <Stage camera={[0, 0.2, 5]} env="forest">
      <CanineObserver />
      <Field mode="canine" color="#d9b8a6" count={100} />
    </Stage>
  );
}

/* ---------- LIQUID SCENE: Hospitality Tools in Suspension ---------- */
function LiquidBar() {
  const a = useRef<THREE.Group>(null);
  const b = useRef<THREE.Group>(null);
  const c = useRef<THREE.Group>(null);

  useFrame((st, dt) => {
    const t = st.clock.elapsedTime;
    if (a.current) {
      a.current.position.y = Math.sin(t * 0.7) * 0.06;
      a.current.rotation.y += dt * 0.12;
    }
    if (b.current) {
      b.current.position.y = 0.2 + Math.sin(t * 1.1 + 1) * 0.1;
      b.current.rotation.z = Math.sin(t * 0.9) * 0.12 + pointer.x * 0.15;
    }
    if (c.current) {
      c.current.position.y = -0.7 + Math.sin(t * 1.6 + 2) * 0.05;
      c.current.rotation.x += dt * 0.3;
      c.current.rotation.y += dt * 0.2;
    }
  });

  return (
    <>
      <Halo kind="liquid" radius={1.5} tilt={1.35} speed={0.03} position={[-0.3, -0.05, -0.2]} />

      {/* Coupe Glass */}
      <group ref={a} position={[-0.3, -0.1, 0]}>
        <Fit url={MODEL_PATHS.coupe} size={2.0} fallbackGeom="cylinder" />
      </group>

      {/* Shaker */}
      <group ref={b} position={[1.7, 0.2, -0.8]} rotation={[0, 0, -0.25]}>
        <Fit url={MODEL_PATHS.shaker} size={2.1} fallbackGeom="cylinder" />
      </group>

      {/* Ice Cube */}
      <group ref={c} position={[-1.3, -0.7, 0.6]}>
        <Fit url={MODEL_PATHS.ice} size={0.55} fallbackGeom="box" />
      </group>

      {/* Jigger */}
      <Float speed={0.9} rotationIntensity={0.5} floatIntensity={0.4}>
        <group position={[1.35, -1.05, 0.7]} rotation={[0.3, 0, 0.35]}>
          <Fit url={MODEL_PATHS.jigger} size={0.65} fallbackGeom="cylinder" />
        </group>
      </Float>

      {/* Whiskey Bottle */}
      <Float speed={0.5} rotationIntensity={0.15} floatIntensity={0.2}>
        <group position={[-2.3, 0.35, -1.4]} rotation={[0, 0.6, 0.08]}>
          <Fit url={MODEL_PATHS.whiskey} size={1.9} fallbackGeom="cylinder" />
        </group>
      </Float>

      <pointLight position={[2, 3, 2]} intensity={45} color="#ffb35c" />
      <pointLight position={[-3, -1, 2]} intensity={14} color="#ff7a3c" />
    </>
  );
}

export function LiquidScene() {
  return (
    <Stage camera={[0, 0, 5.5]} env="night">
      <LiquidBar />
      <Field mode="liquid" color="#ffc27a" count={140} />
    </Stage>
  );
}

/* ---------- Shared Stage with Lighting & Context-Loss Recovery ---------- */
const ENV = {
  studio: ["#ffffff", "#9cc2ff", "#e9e4da"],
  forest: ["#f1e4c8", "#7d8f6a", "#d8c9a8"],
  night: ["#ffc27a", "#ff7a3c", "#6b4a2a"],
} as const;

function Stage({
  children,
  camera,
  env = "studio",
}: {
  children: ReactNode;
  camera: [number, number, number];
  env?: "studio" | "forest" | "night";
}) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const visible = useRef(true);
  const invalidateRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setIsMobile(window.innerWidth < 768);

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0]!;
        visible.current = e.isIntersecting;
        if (e.isIntersecting) invalidateRef.current?.();
      },
      { rootMargin: "100px" },
    );
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <CanvasErrorBoundary>
        <Canvas
          dpr={isMobile ? [1, 1.25] : [1, 1.75]}
          camera={{ position: camera, fov: 40 }}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: "high-performance",
          }}
          frameloop={reduceMotion ? "demand" : "always"}
          onCreated={(s) => {
            invalidateRef.current = () => s.invalidate();
            const orig = s.gl.render.bind(s.gl);
            s.gl.render = (sc, cam) => {
              if (visible.current || reduceMotion) orig(sc, cam);
            };
          }}
        >
          <ambientLight intensity={0.35} />
          <Environment resolution={128} environmentIntensity={0.8}>
            <Lightformer intensity={2.2} position={[0, 5, -2]} scale={[10, 4, 1]} color={ENV[env][0]} />
            <Lightformer intensity={1.4} position={[-5, 1, 1]} rotation-y={Math.PI / 2} scale={[12, 1.2, 1]} color={ENV[env][1]} />
            <Lightformer intensity={1.1} position={[5, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} color={ENV[env][2]} />
            <Lightformer form="ring" intensity={1.6} position={[2, 2, 5]} scale={2} color="#ffffff" />
          </Environment>
          {children}
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}

// Preload high-priority models quietly
if (typeof window !== "undefined") {
  [
    MODEL_PATHS.cube,
    MODEL_PATHS.dogHead,
    MODEL_PATHS.shaker,
    MODEL_PATHS.coupe,
  ].forEach((path) => {
    try {
      useGLTF.preload(path);
    } catch {
      // Ignore preload errors gracefully
    }
  });
}
