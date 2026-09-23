"use client";

import { Liquid } from "liquid-gooey";
import type { ReactNode } from "react";

export function TypingLiquidBar({ children }: { children: ReactNode }) {
  return (
    <Liquid
      className="typing-liquid-bar"
      fill="#202020"
      blur={6}
      contrast={18}
      shadow="0 2px 18px rgb(0 0 0 / 0.35)"
      aria-label="Typing bar"
    >
      <Liquid.Item effect="bend" transition="bouncy">
        <div className="typing-liquid-bar-content">{children}</div>
      </Liquid.Item>
    </Liquid>
  );
}
