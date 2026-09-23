import type { HTMLAttributes } from "react";

export type DialogueWeight = 200 | 300 | 450 | 500 | 600;

export interface DialogueSegment {
  text: string;
  weight?: DialogueWeight;
}

export interface DialogueProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  segments: DialogueSegment[];
  speaker: "ai" | "human";
}

/** Renders structured dialogue as one sentence with selectively weighted spans. */
export function Dialogue({
  segments,
  speaker,
  className = "",
  ...props
}: DialogueProps) {
  return (
    <p
      className={`dialogue dialogue-${speaker} ${className}`.trim()}
      {...props}
    >
      {segments.map((segment, index) => (
        <span
          key={`${index}-${segment.text}`}
          style={{ fontWeight: segment.weight }}
        >
          {segment.text}
        </span>
      ))}
    </p>
  );
}

export function AIMessage(props: Omit<DialogueProps, "speaker">) {
  return <Dialogue speaker="ai" {...props} />;
}

export function HumanMessage(props: Omit<DialogueProps, "speaker">) {
  return <Dialogue speaker="human" {...props} />;
}
