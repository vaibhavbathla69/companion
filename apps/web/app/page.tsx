"use client";

import {
  AIMessage,
  CompanionOrb,
  HumanMessage,
  LifeStatePanel,
  ViewportBorderBeam,
} from "@companion/ui";
import { MetalFx, useMetalBend } from "metal-fx";
import { ThinkingOrb } from "thinking-orbs";
import { VoiceBeam, useMicrophone } from "voice-glow";

const lifeState = {
  date: { day: "23", month: "SEP", time: "21:18" },
  today: [
    {
      id: "client-calls",
      meta: "10:30",
      title: "Client calls",
      state: "completed" as const,
    },
    {
      id: "meet-sam",
      meta: "15:00",
      title: "Meet Sam",
      description: "about the partnership",
      state: "upcoming" as const,
    },
    {
      id: "working-on-n",
      meta: "NOW",
      title: "Working on N",
      state: "now" as const,
    },
    {
      id: "call-mum",
      meta: "22:00",
      title: "Call mum",
      state: "important" as const,
    },
  ],
  open: [
    {
      id: "sam-thread",
      meta: "SAM",
      title: "You were supposed to hear back from him today.",
      state: "important" as const,
    },
    {
      id: "website-thread",
      meta: "WEBSITE",
      title: "Still working on the new project section.",
      state: "upcoming" as const,
    },
    {
      id: "client-replies",
      meta: "CLIENTS",
      title: "3 replies waiting.",
      state: "upcoming" as const,
    },
  ],
  later: [
    {
      id: "partnership-note",
      meta: "FRI",
      title: "Send the partnership note.",
      state: "upcoming" as const,
    },
    {
      id: "dinner-mum",
      meta: "SAT",
      title: "Dinner with Mum.",
      state: "important" as const,
    },
  ],
};
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
  const inputRef = useRef<HTMLTextAreaElement>(null);
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
        <LifeStatePanel data={lifeState} referencedItemId="meet-sam" />
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
                <textarea
                  ref={inputRef}
                  id="keyboard-message"
                  rows={2}
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
                  scale={0.68}
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
