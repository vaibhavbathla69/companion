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
      borderRadius={0}
    >
      <div className="viewport-border-beam-content">
        {children}
        <div className="viewport-border-beam-fallback" aria-hidden="true" />
      </div>
    </BorderBeam>
  );
}
