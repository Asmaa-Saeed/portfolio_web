"use client";

import { Component, type ReactNode, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { NeuralOrb } from "./NeuralOrb";
import { orbState } from "@/lib/orbState";

type Props = {
  still: boolean;
  onReady: () => void;
  onFail: () => void;
};

class GLErrorBoundary extends Component<{ onFail: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Lets non-React code request a frame when the loop is on demand. */
function InvalidateBridge() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    orbState.invalidate = invalidate;
    return () => {
      orbState.invalidate = () => {};
    };
  }, [invalidate]);
  return null;
}

function particleCount() {
  const w = window.innerWidth;
  const cores = navigator.hardwareConcurrency ?? 8;
  if (w < 768) return 6000;
  if (cores <= 4) return 9000;
  return 14000;
}

export default function OrbCanvas({ still, onReady, onFail }: Props) {
  const [count] = useState(particleCount);
  const [hidden, setHidden] = useState(false);

  // Stop rendering entirely while the tab is in the background.
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const frameloop = hidden ? "never" : still ? "demand" : "always";

  return (
    <GLErrorBoundary onFail={onFail}>
      <Canvas
        className="!absolute inset-0"
        dpr={[1, 1.75]}
        frameloop={frameloop}
        camera={{ position: [0, 0, 5.4], fov: 45, near: 0.1, far: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.addEventListener("webglcontextlost", onFail, { once: true });
          requestAnimationFrame(onReady);
        }}
      >
        <InvalidateBridge />
        <NeuralOrb count={count} still={still} />
      </Canvas>
    </GLErrorBoundary>
  );
}
