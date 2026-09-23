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
      {children}
    </BorderBeam>
  );
}
