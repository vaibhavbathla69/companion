"use client";

import type { ConversationMessage } from "@companion/shared";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormEvent, useMemo, useRef, useState } from "react";
import { CompanionOrb, type CompanionOrbState } from "./companion-orb";

const initialMessages: ConversationMessage[] = [
  {
    id: "welcome" as ConversationMessage["id"],
    role: "assistant",
    content: "You made it. How has today actually been?",
    createdAt: "2026-09-22T20:30:00+01:00",
  },
];

export function CompanionExperience() {
  const [messages, setMessages] =
    useState<ConversationMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [orbState, setOrbState] = useState<CompanionOrbState>("idle");
  const [isResponding, setIsResponding] = useState(false);
  const reduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
      }),
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = input.trim();
    if (!content || isResponding) return;

    const createdAt = new Date().toISOString();
    const userMessage: ConversationMessage = {
      id: crypto.randomUUID() as ConversationMessage["id"],
      role: "user",
      content,
      createdAt,
    };
    const assistantId = crypto.randomUUID() as ConversationMessage["id"];
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsResponding(true);
    setOrbState("thinking");

    try {
      const response = await fetch("/api/conversation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          userId: "local-user",
          message: content,
          recentMessages: messages.slice(-12),
          localTime: createdAt,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });
      if (!response.ok || !response.body)
        throw new Error("Conversation request failed");

      setOrbState("speaking");
      setMessages([
        ...nextMessages,
        {
          id: assistantId,
          role: "assistant",
          content: "",
          createdAt: new Date().toISOString(),
        },
      ]);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let completeText = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        completeText += decoder.decode(value, { stream: true });
        setMessages([
          ...nextMessages,
          {
            id: assistantId,
            role: "assistant",
            content: completeText,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
      setOrbState("happy");
      window.setTimeout(() => setOrbState("idle"), 900);
    } catch {
      setMessages([
        ...nextMessages,
        {
          id: assistantId,
          role: "assistant",
          content: "I lost the thread for a second. Try that once more?",
          createdAt: new Date().toISOString(),
        },
      ]);
      setOrbState("concerned");
    } finally {
      setIsResponding(false);
      inputRef.current?.focus();
    }
  }

  return (
    <main className="companion-stage">
      <section className="presence" aria-label="Companion presence">
        <div className="time-context">
          <span>{formatter.format(new Date())}</span>
          <span className="time-dot" />
          <span>here with you</span>
        </div>
        <CompanionOrb state={orbState} intensity={0.72} />
        <p className="presence-state" aria-live="polite">
          {isResponding
            ? orbState === "thinking"
              ? "thinking"
              : "speaking"
            : "present"}
        </p>
      </section>

      <section className="conversation" aria-label="Conversation">
        <div className="conversation-stream">
          <AnimatePresence initial={false}>
            {messages.slice(-4).map((message, index, visible) => (
              <motion.div
                key={message.id}
                className={`message message-${message.role}`}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{
                  opacity: index === visible.length - 1 ? 1 : 0.48,
                  y: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.45 }}
              >
                <span className="message-speaker">
                  {message.role === "assistant" ? "Companion" : "You"}
                </span>
                <p>{message.content || "…"}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <form className="composer" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              if (!isResponding)
                setOrbState(event.target.value ? "listening" : "idle");
            }}
            onBlur={() => {
              if (!isResponding) setOrbState("idle");
            }}
            placeholder="Say what's on your mind…"
            aria-label="Message your companion"
          />
          <button
            type="submit"
            disabled={!input.trim() || isResponding}
            aria-label="Send message"
          >
            ↗
          </button>
        </form>
      </section>
    </main>
  );
}
