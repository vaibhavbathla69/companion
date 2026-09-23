"use client";

import { ThinkingOrb } from "thinking-orbs";
import { motion, useReducedMotion } from "framer-motion";

export type CompanionOrbState =
  | "idle"
  | "listening"
  | "thinking"
  | "solving"
  | "speaking"
  | "happy"
  | "concerned"
  | "sleeping";
export interface CompanionOrbProps {
  state?: CompanionOrbState;
  intensity?: number;
  className?: string;
}

type ThinkingOrbState =
  | "working"
  | "searching"
  | "solving"
  | "listening"
  | "connecting"
  | "weaving"
  | "composing"
  | "breathing"
  | "shaping";

const stateMap: Record<CompanionOrbState, ThinkingOrbState> = {
  idle: "breathing",
  listening: "listening",
  thinking: "searching",
  solving: "solving",
  speaking: "composing",
  happy: "shaping",
  concerned: "connecting",
  sleeping: "breathing",
};

const labelMap: Record<CompanionOrbState, string> = {
  idle: "Companion is present",
  listening: "Companion is listening",
  thinking: "Companion is thinking",
  solving: "Companion is solving",
  speaking: "Companion is speaking",
  happy: "Companion is happy",
  concerned: "Companion is concerned",
  sleeping: "Companion is sleeping",
};

const colorMap: Record<CompanionOrbState, string> = {
  idle: "#d7b99d",
  listening: "#b9c9c0",
  thinking: "#bcb2cb",
  solving: "#d7b99d",
  speaking: "#e1c3a4",
  happy: "#e6c9a1",
  concerned: "#afbdc3",
  sleeping: "#8e91a5",
};

/** Product-level boundary around thinking-orbs, so conversation state stays ours if the visual library changes. */
export function CompanionOrb({
  state = "idle",
  intensity = 0.65,
  className = "",
}: CompanionOrbProps) {
  const reduceMotion = useReducedMotion();
  const speed = Math.max(0.35, Math.min(1.7, 0.55 + intensity * 0.8));

  return (
    <motion.div
      className={`companion-orb ${className}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: reduceMotion ? 0 : 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      data-state={state}
    >
      <ThinkingOrb
        state={stateMap[state]}
        size={64}
        speed={speed}
        paused={state === "sleeping"}
        theme="dark"
        color={colorMap[state]}
        dots={0.9 + intensity * 0.25}
        dotSize={0.9 + intensity * 0.16}
        style={{ width: "74px", height: "74px" }}
        aria-label={labelMap[state]}
      />
      <div className="orb-atmosphere" aria-hidden="true" />
    </motion.div>
  );
}
