"use client";

import {
  AIMessage,
  CompanionOrb,
  HumanMessage,
  ViewportBorderBeam,
} from "@companion/ui";
import { MetalFx, useMetalBend } from "metal-fx";
import { ThinkingOrb } from "thinking-orbs";
import { type FormEvent, useEffect, useRef, useState } from "react";

export default function HomePage() {
  const voiceRef = useRef<HTMLDivElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeMode, setActiveMode] = useState<"voice" | "keyboard">("voice");
  const [message, setMessage] = useState("");
  const [humanMessages, setHumanMessages] = useState<string[]>([]);
  useMetalBend(voiceRef);
  useMetalBend(keyboardRef);

  useEffect(() => {
    if (activeMode === "keyboard") inputRef.current?.focus();
  }, [activeMode]);

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextMessage = message.trim();
    if (!nextMessage) return;

    setHumanMessages((messages) => [...messages, nextMessage]);
    setMessage("");
  }

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
            {humanMessages.map((humanMessage, index) => (
              <HumanMessage
                key={`${index}-${humanMessage}`}
                className="dialogue-human-enter"
                segments={[{ text: humanMessage }]}
              />
            ))}
            <form className="keyboard-message-field" onSubmit={submitMessage}>
              <label className="sr-only" htmlFor="keyboard-message">
                Message
              </label>
              <input
                ref={inputRef}
                id="keyboard-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                aria-label="Type a message"
              />
            </form>
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
