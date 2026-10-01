"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { orbVertex, pointsFragment, pointsVertex } from "./orbShaders";
import { ORB_PALETTES, orbState } from "@/lib/orbState";

type Props = {
  count: number;
  /** Render a single, still frame (prefers-reduced-motion). */
  still: boolean;
};

const STILL_TIME = 14.0;

/** Evenly distributed points on a unit sphere (golden-angle spiral). */
function fibonacciSphere(count: number) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * r;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(theta) * r;
    seeds[i] = Math.random();
  }
  return { positions, seeds };
}

function ringPoints(count: number, radius: number, spread: number) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + Math.random() * 0.02;
    const r = radius + (Math.random() - 0.5) * spread;
    positions[i * 3] = Math.cos(a) * r;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.4;
    positions[i * 3 + 2] = Math.sin(a) * r;
    seeds[i] = Math.random();
  }
  return { positions, seeds };
}

function dustPoints(count: number) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const r = 3 + Math.random() * 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
    positions[i * 3 + 2] = r * Math.cos(phi) - 2;
    seeds[i] = Math.random();
  }
  return { positions, seeds };
}

const RINGS = [
  { radius: 1.5, spread: 0.05, tilt: [1.2, 0.2, 0.3], speed: 0.12, share: 0.05 },
  { radius: 1.78, spread: 0.08, tilt: [1.45, -0.35, -0.2], speed: -0.08, share: 0.06 },
  { radius: 2.1, spread: 0.12, tilt: [1.05, 0.5, 0.6], speed: 0.05, share: 0.07 },
] as const;

const tmpQuat = new THREE.Quaternion();
const tmpDir = new THREE.Vector3();
const targetColors = [new THREE.Color(), new THREE.Color(), new THREE.Color()];

export function NeuralOrb({ count, still }: Props) {
  const tiltRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Object3D>(null);
  const ringRefs = useRef<(THREE.Object3D | null)[]>([]);
  // Uniforms are mutated through the material refs inside the render loop.
  const orbMat = useRef<THREE.ShaderMaterial>(null);
  const ringMat = useRef<THREE.ShaderMaterial>(null);
  const dustMat = useRef<THREE.ShaderMaterial>(null);
  const { gl, size } = useThree();
  const pixelRatio = gl.getPixelRatio();

  const sphere = useMemo(() => fibonacciSphere(count), [count]);
  const rings = useMemo(
    () => RINGS.map((r) => ringPoints(Math.round(count * r.share), r.radius, r.spread)),
    [count],
  );
  const dust = useMemo(() => dustPoints(Math.round(count * 0.05)), [count]);

  const orbUniforms = useMemo(() => {
    const [a, b, c] = ORB_PALETTES.hero;
    return {
      uTime: { value: still ? STILL_TIME : 0 },
      uPixelRatio: { value: pixelRatio },
      uSize: { value: count > 9000 ? 40 : 52 },
      uNoiseAmp: { value: 0.11 },
      uPointerDir: { value: new THREE.Vector3(0, 0, 1) },
      uBulge: { value: 0 },
      uColorA: { value: new THREE.Color(a) },
      uColorB: { value: new THREE.Color(b) },
      uColorC: { value: new THREE.Color(c) },
      uOpacity: { value: 1 },
    };
  }, [count, pixelRatio, still]);

  const ringUniforms = useMemo(
    () => ({
      uTime: { value: still ? STILL_TIME : 0 },
      uPixelRatio: { value: pixelRatio },
      uSize: { value: 30 },
      uColor: { value: new THREE.Color(ORB_PALETTES.hero[1]) },
      uOpacity: { value: 0.75 },
    }),
    [pixelRatio, still],
  );

  const dustUniforms = useMemo(
    () => ({
      uTime: { value: still ? STILL_TIME : 0 },
      uPixelRatio: { value: pixelRatio },
      uSize: { value: 30 },
      uColor: { value: new THREE.Color(ORB_PALETTES.hero[2]) },
      uOpacity: { value: 0.35 },
    }),
    [pixelRatio, still],
  );

  // Portrait screens: shrink so the orb never overflows the width.
  const aspect = size.width / size.height;
  const fit = aspect < 1 ? Math.max(0.62, aspect * 1.25) : 1;

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 20);
    const tilt = tiltRef.current;
    const spin = spinRef.current;
    if (!tilt || !spin || !orbMat.current || !ringMat.current || !dustMat.current) return;
    const orb = orbMat.current.uniforms;
    const ring = ringMat.current.uniforms;
    const dust = dustMat.current.uniforms;

    if (!still) {
      const t = state.clock.elapsedTime;
      orb.uTime.value = t;
      ring.uTime.value = t;
      dust.uTime.value = t;

      spin.rotation.y += dt * 0.06;
      ringRefs.current.forEach((r, i) => {
        if (r) r.rotation.y += dt * RINGS[i].speed;
      });

      // Tilt toward the cursor.
      const { pointer } = orbState;
      const tx = pointer.active ? -pointer.y * 0.35 : 0;
      const ty = pointer.active ? pointer.x * 0.5 : 0;
      tilt.rotation.x = THREE.MathUtils.damp(tilt.rotation.x, tx, 3, dt);
      tilt.rotation.y = THREE.MathUtils.damp(tilt.rotation.y, ty, 3, dt);

      // Bulge where the cursor points: a camera-facing direction moved into
      // the orb's local space.
      const px = THREE.MathUtils.clamp(pointer.x, -1, 1) * 0.85;
      const py = THREE.MathUtils.clamp(pointer.y, -1, 1) * 0.85;
      tmpDir.set(px, py, Math.sqrt(Math.max(0.05, 1 - px * px - py * py))).normalize();
      spin.getWorldQuaternion(tmpQuat).invert();
      tmpDir.applyQuaternion(tmpQuat);
      (orb.uPointerDir.value as THREE.Vector3).lerp(tmpDir, 1 - Math.exp(-8 * dt)).normalize();
      const near = pointer.active ? Math.max(0, 1 - Math.hypot(pointer.x, pointer.y) * 0.6) : 0;
      orb.uBulge.value = THREE.MathUtils.damp(orb.uBulge.value, near * 0.22, 4, dt);
    }

    // Ease the palette toward the active section's colours.
    const palette = ORB_PALETTES[orbState.palette];
    targetColors.forEach((c, i) => c.set(palette[i]));
    const k = still ? 1 : 1 - Math.exp(-2.2 * dt);
    (orb.uColorA.value as THREE.Color).lerp(targetColors[0], k);
    (orb.uColorB.value as THREE.Color).lerp(targetColors[1], k);
    (orb.uColorC.value as THREE.Color).lerp(targetColors[2], k);
    (ring.uColor.value as THREE.Color).lerp(targetColors[1], k);
    (dust.uColor.value as THREE.Color).lerp(targetColors[2], k);
  });

  return (
    <group scale={fit}>
      <group ref={tiltRef}>
        <points ref={spinRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[sphere.positions, 3]} />
            <bufferAttribute attach="attributes-aSeed" args={[sphere.seeds, 1]} />
          </bufferGeometry>
          <shaderMaterial
            ref={orbMat}
            vertexShader={orbVertex}
            fragmentShader={pointsFragment}
            uniforms={orbUniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {rings.map((ring, i) => (
          <group
            key={i}
            rotation-x={RINGS[i].tilt[0]}
            rotation-y={RINGS[i].tilt[1]}
            rotation-z={RINGS[i].tilt[2]}
          >
            <points
              ref={(el) => {
                ringRefs.current[i] = el;
              }}
            >
              <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[ring.positions, 3]} />
                <bufferAttribute attach="attributes-aSeed" args={[ring.seeds, 1]} />
              </bufferGeometry>
              <shaderMaterial
                ref={i === 0 ? ringMat : undefined}
                vertexShader={pointsVertex}
                fragmentShader={pointsFragment}
                uniforms={ringUniforms}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
              />
            </points>
          </group>
        ))}
      </group>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust.positions, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[dust.seeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={dustMat}
          vertexShader={pointsVertex}
          fragmentShader={pointsFragment}
          uniforms={dustUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
