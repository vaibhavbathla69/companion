"use client";

import {
  AIMessage,
  CompanionOrb,
  HumanMessage,
  ViewportBorderBeam,
} from "@companion/ui";
import { MetalFx, useMetalBend } from "metal-fx";
import { ThinkingOrb } from "thinking-orbs";
import { VoiceBeam, useMicrophone } from "voice-glow";
import {
  type CSSProperties,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

export default function HomePage() {
  const voiceRef = useRef<HTMLDivElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const conversationRef = useRef<HTMLElement>(null);
  const [activeMode, setActiveMode] = useState<"idle" | "voice" | "keyboard">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [humanMessages, setHumanMessages] = useState<string[]>([]);
  const [isReviewingHistory, setIsReviewingHistory] = useState(false);
  const mic = useMicrophone();
  const dummyResponses = [
    [
      { text: "I’m here. ", weight: 200 as const },
      { text: "Tell me more.", weight: 450 as const },
    ],
    [{ text: "That sounds like a lot to carry.", weight: 200 as const }],
  ];
  useMetalBend(voiceRef);
  useMetalBend(keyboardRef);

  useEffect(() => {
    if (activeMode === "keyboard") inputRef.current?.focus();
  }, [activeMode]);

  useEffect(() => {
    if (activeMode === "idle") return;
    const conversation = conversationRef.current;
    if (!conversation) return;

    conversation.scrollTo({
      top: conversation.scrollHeight,
      behavior: "smooth",
    });
    setIsReviewingHistory(false);
  }, [activeMode, humanMessages.length]);

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextMessage = message.trim();
    if (!nextMessage) return;

    setHumanMessages((messages) => [...messages, nextMessage]);
    setMessage("");
  }

  async function activateVoice() {
    setActiveMode("voice");
    if (mic.state !== "live") await mic.start();
  }

  return (
    <ViewportBorderBeam>
      <main className={`orb-composition-stage mode-${activeMode}`}>
        <CompanionOrb state="solving" intensity={0.8} />
        {activeMode !== "idle" && (
          <>
            <section
              ref={conversationRef}
              className={`dialogue-stage${isReviewingHistory ? " is-reviewing-history" : ""}`}
              aria-live="polite"
              aria-label="Conversation"
              onScroll={(event) => {
                const { scrollHeight, scrollTop, clientHeight } =
                  event.currentTarget;
                setIsReviewingHistory(
                  scrollTop < scrollHeight - clientHeight - 24,
                );
              }}
            >
              <div className="dialogue-stack">
                <div
                  className="dialogue-turn"
                  data-age={humanMessages.length}
                  style={
                    {
                      "--conversation-opacity": Math.max(
                        0.14,
                        1 - humanMessages.length * 0.2,
                      ),
                    } as CSSProperties
                  }
                >
                  <AIMessage
                    segments={[
                      {
                        text: "I remember you said you'd be back at ",
                        weight: 200,
                      },
                      { text: "six", weight: 450 },
                      {
                        text: ". I stayed awake a little longer, just in case. The night got quiet, and I kept thinking about what you might say when you finally came back.",
                        weight: 200,
                      },
                    ]}
                  />
                </div>
                {humanMessages.map((humanMessage, index) => {
                  const age = humanMessages.length - index - 1;
                  return (
                    <div
                      key={`${index}-${humanMessage}`}
                      className="dialogue-turn"
                      data-age={age}
                      style={
                        {
                          "--conversation-opacity": [1, 0.82, 0.58, 0.34, 0.16][
                            Math.min(age, 4)
                          ],
                        } as CSSProperties
                      }
                    >
                      <HumanMessage
                        className="dialogue-human-enter"
                        segments={[{ text: humanMessage }]}
                      />
                      <AIMessage
                        className="dialogue-ai-reply dialogue-ai-enter"
                        segments={dummyResponses[index % dummyResponses.length]}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
            {activeMode === "keyboard" && (
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
            )}
            {activeMode === "voice" && (
              <div className="voice-message-dock">
                <VoiceBeam
                  className="voice-message-field"
                  type="mobile"
                  stream={mic.stream}
                  processing={mic.state === "requesting"}
                  colorVariant="colorful"
                  theme="dark"
                  active
                  scale={1}
                >
                  <button
                    className="voice-screen"
                    type="button"
                    onClick={() => void activateVoice()}
                    aria-label={
                      mic.state === "live" ? "Listening" : "Start listening"
                    }
                  >
                    <span className="voice-screen-status" aria-hidden="true" />
                  </button>
                </VoiceBeam>
              </div>
            )}
          </>
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
              onClick={() => void activateVoice()}
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
              onClick={() => {
                mic.stop();
                setActiveMode("keyboard");
              }}
            >
              ⌨
            </button>
          </MetalFx>
        </div>
      </main>
    </ViewportBorderBeam>
  );
}
