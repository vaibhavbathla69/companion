"use client";

import {
  AIMessage,
  CompanionOrb,
  HumanMessage,
  ViewportBorderBeam,
} from "@companion/ui";
import { MetalFx, useMetalBend } from "metal-fx";
import { ThinkingOrb } from "thinking-orbs";
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
  const [activeMode, setActiveMode] = useState<"voice" | "keyboard">("voice");
  const [message, setMessage] = useState("");
  const [humanMessages, setHumanMessages] = useState<string[]>([]);
  const [isReviewingHistory, setIsReviewingHistory] = useState(false);
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
    if (activeMode !== "keyboard") return;
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

  return (
    <ViewportBorderBeam>
      <main className={`orb-composition-stage mode-${activeMode}`}>
        <CompanionOrb state="solving" intensity={0.8} />
        {activeMode === "keyboard" && (
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
                      { text: "where have you ", weight: 200 },
                      { text: "been?", weight: 450 },
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
