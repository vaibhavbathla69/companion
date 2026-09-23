"use client";

import { AIMessage, CompanionOrb, ViewportBorderBeam } from "@companion/ui";
import { MetalFx, useMetalBend } from "metal-fx";
import { ThinkingOrb } from "thinking-orbs";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const voiceRef = useRef<HTMLDivElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeMode, setActiveMode] = useState<"voice" | "keyboard">("voice");
  const [message, setMessage] = useState("");
  useMetalBend(voiceRef);
  useMetalBend(keyboardRef);

  useEffect(() => {
    if (activeMode === "keyboard") inputRef.current?.focus();
  }, [activeMode]);

  return (
    <ViewportBorderBeam>
      <main className={`orb-composition-stage mode-${activeMode}`}>
        <CompanionOrb state="solving" intensity={0.8} />
        {activeMode === "keyboard" && (
          <div className="dialogue-stage" aria-live="polite">
            <AIMessage
              segments={[
                { text: "where have you ", weight: 200 },
                { text: "been?", weight: 450 },
              ]}
            />
            <label className="keyboard-message-field">
              <span className="sr-only">Message</span>
              <input
                ref={inputRef}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="say something"
                aria-label="Type a message"
              />
            </label>
          </div>
        )}
        <div
          className="input-mode-buttons"
          role="group"
          aria-label="Input mode"
          data-active-mode={activeMode}
        >
          <MetalFx
            ref={voiceRef}
            preset="chromatic"
            variant="circle"
            innerShadow
            strength={0}
            disableGlow
            reflectionTargets={[keyboardRef]}
          >
            <button
              className="input-mode-button"
              type="button"
              aria-label="Voice input"
              aria-pressed={activeMode === "voice"}
              onClick={() => setActiveMode("voice")}
            >
              <ThinkingOrb
                state="composing"
                size={32}
                dots={1}
                dotSize={1}
                theme="dark"
                color="#ffffff"
              />
            </button>
          </MetalFx>
          <MetalFx
            ref={keyboardRef}
            preset="chromatic"
            variant="circle"
            innerShadow
            strength={0}
            disableGlow
            reflectionTargets={[voiceRef]}
          >
            <button
              className="input-mode-button"
              type="button"
              aria-label="Keyboard input"
              aria-pressed={activeMode === "keyboard"}
              onClick={() => setActiveMode("keyboard")}
            >
              ⌨
            </button>
          </MetalFx>
        </div>
      </main>
    </ViewportBorderBeam>
  );
}
