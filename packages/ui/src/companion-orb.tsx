"use client";

import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Mesh } from "three";

export type CompanionOrbState =
  | "idle"
  | "listening"
  | "thinking"
  | "speaking"
  | "happy"
  | "concerned"
  | "sleeping";

export interface CompanionOrbProps {
  state?: CompanionOrbState;
  intensity?: number;
  className?: string;
}

const visualState: Record<
  CompanionOrbState,
  { color: string; emissive: string; speed: number; distort: number }
> = {
  idle: { color: "#d8bfa8", emissive: "#755342", speed: 0.45, distort: 0.22 },
  listening: {
    color: "#b9c9c0",
    emissive: "#48675c",
    speed: 0.7,
    distort: 0.3,
  },
  thinking: {
    color: "#bcb2cb",
    emissive: "#5d4d75",
    speed: 1.1,
    distort: 0.38,
  },
  speaking: {
    color: "#e1c3a4",
    emissive: "#8f5937",
    speed: 1.35,
    distort: 0.34,
  },
  happy: { color: "#e6c9a1", emissive: "#9c6941", speed: 0.85, distort: 0.29 },
  concerned: {
    color: "#afbdc3",
    emissive: "#435964",
    speed: 0.35,
    distort: 0.18,
  },
  sleeping: {
    color: "#8e91a5",
    emissive: "#353747",
    speed: 0.12,
    distort: 0.08,
  },
};

function OrbMesh({
  state,
  intensity,
}: Required<Pick<CompanionOrbProps, "state" | "intensity">>) {
  const mesh = useRef<Mesh>(null);
  const appearance = visualState[state];

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const breath =
      1 + Math.sin(clock.elapsedTime * appearance.speed) * 0.018 * intensity;
    mesh.current.scale.setScalar(breath);
    mesh.current.rotation.y = clock.elapsedTime * 0.035;
    mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.16) * 0.05;
  });

  return (
    <Float
      speed={appearance.speed}
      rotationIntensity={0.12 * intensity}
      floatIntensity={0.3 * intensity}
    >
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.48, 64]} />
        <MeshDistortMaterial
          color={appearance.color}
          emissive={appearance.emissive}
          emissiveIntensity={0.28 + intensity * 0.18}
          roughness={0.42}
          metalness={0.06}
          distort={appearance.distort * intensity}
          speed={appearance.speed}
        />
      </mesh>
      {(state === "happy" || state === "speaking") && (
        <Sparkles
          count={18}
          scale={4.2}
          size={1.2}
          speed={0.15}
          opacity={0.25}
          color="#f1dbc5"
        />
      )}
    </Float>
  );
}

function StaticOrb({ state }: { state: CompanionOrbState }) {
  const appearance = visualState[state];
  return (
    <div
      className="companion-orb-fallback"
      style={
        {
          "--orb-color": appearance.color,
          "--orb-glow": appearance.emissive,
        } as React.CSSProperties
      }
      role="img"
      aria-label={`Companion is ${state}`}
    />
  );
}

export function CompanionOrb({
  state = "idle",
  intensity = 0.65,
  className = "",
}: CompanionOrbProps) {
  const reduceMotion = useReducedMotion();
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const canvas = document.createElement("canvas");
        setWebgl(
          Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl")),
        );
      } catch {
        setWebgl(false);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className={`companion-orb ${className}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: reduceMotion ? 0 : 1.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      data-state={state}
    >
      {webgl && !reduceMotion ? (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 38 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <ambientLight intensity={0.35} />
          <directionalLight
            position={[3, 3, 4]}
            intensity={2.4}
            color="#fff4e9"
          />
          <pointLight position={[-3, -2, 2]} intensity={1.5} color="#829da3" />
          <OrbMesh
            state={state}
            intensity={Math.min(1, Math.max(0, intensity))}
          />
        </Canvas>
      ) : (
        <StaticOrb state={state} />
      )}
      <div className="orb-atmosphere" aria-hidden="true" />
    </motion.div>
  );
}
