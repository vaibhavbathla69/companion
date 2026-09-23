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
      strength={0.32}
      brightness={0.58}
      saturation={0}
      glowSize={0.62}
      borderRadius={0}
    >
      <div className="viewport-border-beam-content">{children}</div>
    </BorderBeam>
  );
}
