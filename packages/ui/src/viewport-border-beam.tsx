"use client";

import { BorderBeam } from "border-beam";
import type { ReactNode } from "react";

/** A restrained monochrome perimeter effect for a full-screen companion view. */
export function ViewportBorderBeam({ children }: { children: ReactNode }) {
  return (
    <BorderBeam
      className="viewport-border-beam"
      size="md"
      colorVariant="mono"
      theme="dark"
      staticColors
      strength={0.62}
      brightness={0.78}
      saturation={0}
      glowSize={0.8}
      borderRadius={0}
    >
      <div className="viewport-border-beam-content">{children}</div>
    </BorderBeam>
  );
}
