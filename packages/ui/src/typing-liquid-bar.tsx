"use client";

import { Liquid } from "liquid-gooey";
export function TypingLiquidBar() {
  return (
    <div className="typing-liquid-bar" aria-label="Typing bar">
      <Liquid
        className="typing-liquid-bar-liquid"
        fill="#202020"
        blur={6}
        contrast={18}
        shadow="0 2px 18px rgb(0 0 0 / 0.35)"
      >
        <Liquid.Item effect="bend" transition="bouncy">
          <div className="typing-liquid-bar-content" />
        </Liquid.Item>
      </Liquid>
    </div>
  );
}
