"use client";

import { CompanionOrb, ViewportBorderBeam } from "@companion/ui";
import { MetalFx } from "metal-fx";

export default function HomePage() {
  return (
    <ViewportBorderBeam>
      <main className="orb-composition-stage">
        <CompanionOrb state="solving" intensity={0.8} />
        <div
          className="input-mode-buttons"
          role="group"
          aria-label="Input mode"
        >
          <MetalFx
            preset="silver"
            strength={1}
            theme="dark"
            variant="button"
            innerShadow
          >
            <button
              className="input-mode-button"
              type="button"
              aria-label="Voice input"
            >
              <span aria-hidden="true">◉</span>
              <span>Voice</span>
            </button>
          </MetalFx>
          <MetalFx
            preset="silver"
            strength={1}
            theme="dark"
            variant="button"
            innerShadow
          >
            <button
              className="input-mode-button"
              type="button"
              aria-label="Keyboard input"
            >
              <span aria-hidden="true">⌨</span>
              <span>Keyboard</span>
            </button>
          </MetalFx>
        </div>
      </main>
    </ViewportBorderBeam>
  );
}
